import { AmazonReadClient } from './amazon-read.mjs';
import { HttpError } from './apex.mjs';

const origin = 'https://www.amazon.com';
const ua = 'Mozilla/5.0';
const fail = () => new HttpError(409,'amazon_phone_contract','O formulário de telefone mudou ou não está disponível. Continue no site oficial da Amazon.');
const decode = v => v.replace(/&(?:amp|quot|apos|lt|gt);|&#(?:x[\da-f]+|\d+);/gi, x => {
  const named = {'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>'};
  if(named[x.toLowerCase()])return named[x.toLowerCase()];
  const n=x.slice(2,-1);const code=n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n);
  return code>0&&code<=0x10ffff?String.fromCodePoint(code):'';
});
export function attributes(tag) {
  const values={};for(const m of tag.matchAll(/([\w.:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g))values[m[1].toLowerCase()]=decode(m[2]??m[3]??m[4]);return values;
}
export function phoneForms(html) {
  return [...html.matchAll(/<form\b([^>]*)>([\s\S]*?)<\/form>/gi)].map(m=>{
    const a=attributes(m[1]), fields=new URLSearchParams();
    for(const n of m[2].matchAll(/<(input|button)\b([^>]*)>/gi)){
      const f=attributes(n[2]);
      if(f.name&&f.value!==undefined&&(f.type?.toLowerCase()==='hidden'||f.name==='deleteMobilePhone'))fields.append(f.name,f.value);
    }
    return {id:a.id,action:a.action,method:(a.method||'GET').toUpperCase(),html:m[2],fields};
  });
}
export function phoneState(html) {
  const forms=phoneForms(html).filter(f=>f.id==='cnep_1a_mobile_phone_form');
  if(forms.length!==1)return 'unknown';
  const form=forms[0];
  const add=/\bid=["']auth-cnep-add-phone-button["']/.test(form.html),edit=/\bid=["']auth-cnep-edit-phone-button["']/.test(form.html);
  return add&&!edit?'absent':edit&&!add?'present':'unknown';
}
function safeUrl(address,base=origin) {
  let u;try{u=new URL(address,base)}catch{throw fail()}
  if(u.protocol!=='https:'||u.hostname!=='www.amazon.com'||u.port||u.username||u.password||!['/gp/css/account/info/view.html','/ap/cnep','/ap/profile/mobilephone'].includes(u.pathname))throw new HttpError(409,'amazon_phone_auth_required','A Amazon solicitou autenticação ou uma etapa adicional. Continue no site oficial.');
  return u;
}
export class AmazonPhoneClient extends AmazonReadClient {
  async page(address,jar,signal,options={}) {
    let url=safeUrl(address);
    for(let i=0;i<5;i++){
      const r=await this.request(url.href,{...options,headers:{'User-Agent':ua,Accept:'text/html',...options.headers,Cookie:jar.header(url.href)}},'phone',signal);jar.update(r.headers,url.href);
      if([301,302,303,307,308].includes(r.status)){
        const next=r.headers.get('location');await r.body?.cancel();if(!next)throw fail();url=safeUrl(next,url);options={};continue;
      }
      if(!r.ok){await r.body?.cancel();throw fail()}
      let size=0;const chunks=[];for await(const b of r.body??[]){size+=b.length;if(size>2*1024*1024)throw fail();chunks.push(b)}
      const html=Buffer.concat(chunks).toString('utf8');
      if(/type=["']password["']|name=["'](?:otpCode|code|verificationCode)["']/.test(html))throw new HttpError(409,'amazon_phone_auth_required','A Amazon solicitou senha ou código. Continue no site oficial.');
      return {html,url:url.href};
    }throw fail();
  }
  async prepare(refresh) {
    const signal=AbortSignal.timeout(this.timeout);
    const [jar,profile]=await Promise.all([this.webSession(refresh,signal),this.profile(refresh,signal)]);
    const amazonName=profile.displayName||[profile.firstName,profile.middleName,profile.lastName].filter(Boolean).join(' ');
    if(!amazonName)throw fail();
    const security=await this.page(origin+'/gp/css/account/info/view.html',jar,signal);
    const state=phoneState(security.html);
    if(state==='absent')return {state,amazonName};
    if(state!=='present')throw fail();
    const phoneForm=phoneForms(security.html).find(f=>f.id==='cnep_1a_mobile_phone_form');
    const link=safeUrl(phoneForm.action,security.url);
    if(link.pathname!=='/ap/profile/mobilephone'||phoneForm.method!=='GET')throw fail();
    for(const [k,v] of phoneForm.fields)link.searchParams.append(k,v);
    const page=await this.page(link.href,jar,signal);
    const remove=phoneForms(page.html).find(f=>f.id==='auth-remove-phone-claim');
    if(!remove||remove.method!=='POST')throw fail();
    const action=safeUrl(remove.action,page.url);
    if(action.pathname!=='/ap/profile/mobilephone')throw fail();
    for(const k of ['appActionToken','workflowState','appAction'])if(remove.fields.getAll(k).length!==1||!remove.fields.get(k))throw fail();
    if(remove.fields.get('appAction')!=='REMOVE_MOBILE_PHONE'||!remove.fields.has('deleteMobilePhone'))throw fail();
    return {state:'present',amazonName,session:{jar,action:action.href,referer:page.url,fields:remove.fields}};
  }
  async remove(session) {
    const signal=AbortSignal.timeout(this.timeout);
    // Only the freshly extracted removal form is submitted, once. No retry/fallback.
    try {
      await this.page(session.action,session.jar,signal,{method:'POST',headers:{Origin:origin,Referer:session.referer,'Content-Type':'application/x-www-form-urlencoded'},body:session.fields.toString()});
      const after=await this.page(origin+'/gp/css/account/info/view.html',session.jar,signal);
      const confirmed=phoneState(after.html)==='absent';
      return {confirmed,state:confirmed?'absent':'unconfirmed',notice:confirmed?'Remoção confirmada na página de Login e Segurança da Amazon. Isso não confirma alteração no contato do Flex ou MFA.':'Envio realizado, mas a remoção não foi confirmada. Consulte antes de tentar novamente.'};
    }catch(error){throw new HttpError(error.status||502,'amazon_phone_unconfirmed','A remoção não foi confirmada. Não repita automaticamente; consulte o site oficial da Amazon.');}
  }
}
