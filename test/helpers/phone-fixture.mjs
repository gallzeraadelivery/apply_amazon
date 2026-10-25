export const cnep=state=>`<form id="cnep_1a_mobile_phone_form" method="get" action="/ap/profile/mobilephone"><input type="hidden" name="appActionToken" value="synthetic-token"><input type="hidden" name="workflowState" value="synthetic-workflow"><button id="auth-cnep-${state==='absent'?'add':'edit'}-phone-button">Phone</button></form>`;
export function phoneFixture(mode='success'){
 const calls=[];let removed=mode==='absent';
 const fetchImpl=async(url,opts={})=>{
  calls.push({url,opts});const u=new URL(url);
  if(u.pathname==='/auth/register')return Response.json({response:{success:{tokens:{bearer:{refresh_token:'synthetic-refresh'}}}}});
  if(u.pathname==='/auth/token')return Response.json({access_token:'synthetic-access'});
  if(u.pathname==='/person')return Response.json({person:{displayName:'Synthetic Owner'}});
  if(u.pathname==='/ap/exchangetoken/cookies')return Response.json({response:{tokens:{cookies:{'.amazon.com':[{Name:'session',Value:'synthetic-cookie'}]}}}});
  if(u.pathname==='/onboarding/v2/home-menu')return new Response('portal');
  if(u.pathname==='/gp/css/account/info/view.html')return new Response(null,{status:302,headers:{location:mode==='foreign'?'https://evil.example/':'/ap/cnep'}});
  if(u.pathname==='/ap/cnep')return new Response(cnep(removed?'absent':'present'));
  if(u.pathname==='/ap/profile/mobilephone'&&opts.method!=='POST')return new Response(`<form id="auth-remove-phone-claim" method="post" action="${mode==='bad-action'?'https://evil.example/':'/ap/profile/mobilephone'}"><input name="appActionToken" type="hidden" value="synthetic-token"><input type="hidden" name="workflowState" value="synthetic-workflow"><input type="hidden" name="appAction" value="${mode==='bad-command'?'ADD_MOBILE_PHONE':'REMOVE_MOBILE_PHONE'}"><input type="hidden" name="deleteMobilePhone" value="irrelevant"><button type="submit" name="deleteMobilePhone" value="Submit">Remove</button></form>`);
  if(u.pathname==='/ap/profile/mobilephone'&&opts.method==='POST'){
   if(mode==='network')throw Error('synthetic-failure');
   if(mode==='challenge')return new Response(null,{status:302,headers:{location:'/ap/signin'}});
   if(mode!=='unchanged')removed=true;
   return new Response(null,{status:302,headers:{location:'/ap/cnep'}});
  }
  throw Error('Unexpected request');
 };return {fetchImpl,calls};
}
