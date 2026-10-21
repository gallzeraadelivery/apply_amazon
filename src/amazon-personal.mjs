import { AmazonUploadClient } from './amazon-upload.mjs';
import { HttpError } from './apex.mjs';

const origin = 'https://logistics.amazon.com';
export const personalKeys = ['firstName','middleName','lastName','addressLine1','city','state','zipCode','phoneNumber'];
export function personalPayload(fields) {
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) throw new HttpError(400,'invalid_personal_fields','Revise os dados pessoais.');
  const result = {};
  for (const k of personalKeys) {
    const v = fields[k] ?? '';
    if (typeof v !== 'string' || v.length > 200 || /[\x00-\x1f\x7f]/.test(v)) throw new HttpError(400,'invalid_personal_fields','Há campos inválidos no formulário.');
    result[k] = v.trim();
  }
  if (personalKeys.filter(k=>k!=='middleName').some(k=>!result[k])) throw new HttpError(400,'incomplete_personal_fields','Preencha nome, sobrenome, endereço, cidade, estado, ZIP e telefone antes de enviar.');
  if (!/^\d{5}(?:-\d{4})?$/.test(result.zipCode) || !/^\+?[\d ()-]{7,25}$/.test(result.phoneNumber)) throw new HttpError(400,'invalid_contact','Revise o ZIP e o telefone.');
  return result;
}
const normalize = d => ({ firstName:d.firstName, middleName:d.middleName || '', lastName:d.lastName,
  addressLine1:d.addressLine1 ?? d.address, city:d.city, state:d.state ?? d.stateOrRegion,
  zipCode:d.zipCode ?? d.postalCode, phoneNumber:d.phoneNumber });
export class AmazonPersonalClient extends AmazonUploadClient {
  async getPersonal(jar, signal) {
    const url=origin+'/onboarding/account/data/get-personal-info';
    const r=await this.request(url,{headers:{Cookie:jar.header(url),'User-Agent':'RabbitAndroid/3.139.2.7.0','X-Requested-With':'com.amazon.flex.rabbit',Accept:'application/json',Referer:origin+'/onboarding/v2/basic-info'}},'personal-info-current',signal);
    const data=await this.json(r,'personal-info-current');
    if(data.success!==true||!data.data||typeof data.data!=='object')throw new HttpError(424,'amazon_personal_unavailable','A Amazon não retornou o cadastro atual. Nenhum dado foi enviado.');
    return data.data;
  }
  async submit(refresh, fields) {
    const values=personalPayload(fields), signal=AbortSignal.timeout(this.timeout), jar=await this.webSession(refresh,signal);
    const existing=await this.getPersonal(jar,signal), current=normalize(existing);
    const nameChanged=['firstName','middleName','lastName'].some(k=>String(current[k]??'').trim()!==values[k]);
    if(existing.nameEditable===false&&nameChanged)throw new HttpError(409,'amazon_name_locked','A consulta atual da Amazon bloqueou a alteração de nome nesta conta. Nenhum dado foi enviado.');
    const headers=await this.headers(jar,signal), url=origin+'/onboarding/account/data/submit-personal-info';
    headers.Cookie=jar.header(url);headers['X-Requested-With']='com.amazon.flex.rabbit';headers.Referer=origin+'/onboarding/v2/basic-info';
    const body={firstName:values.firstName,middleName:values.middleName,lastName:values.lastName,address:values.addressLine1,city:values.city,state:values.state,postalCode:values.zipCode,phoneNumber:values.phoneNumber};
    // Eligibility is read from Amazon, never forced true by the client.
    if(typeof existing.nameEditable==='boolean')body.nameEditable=existing.nameEditable;
    const response=await this.request(url,{method:'POST',headers,body:JSON.stringify(body)},'personal-info-submit',signal);
    const result=await this.json(response,'personal-info-submit');
    if(result.success!==true)throw new HttpError(424,'amazon_personal_not_confirmed','A Amazon não confirmou o salvamento. Consulte o cadastro antes de repetir.');
    let confirmed=false;
    try {const readback=normalize(await this.getPersonal(jar,signal));confirmed=personalKeys.every(k=>String(readback[k]??'').trim().toUpperCase()===values[k].toUpperCase());} catch { /* Accepted is distinct from read-back confirmed. */ }
    return {accepted:true,confirmed,sentFields:personalKeys,notice:confirmed?'Dados pessoais enviados e conferidos em nova leitura da Amazon.':'A Amazon aceitou o envio, mas a leitura posterior não confirmou todos os campos. Consulte antes de repetir.'};
  }
}
