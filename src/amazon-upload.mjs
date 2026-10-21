import { AmazonReadClient } from './amazon-read.mjs';
import { HttpError } from './apex.mjs';

const origin = 'https://logistics.amazon.com';
const persona = 'https://withpersona.com/api/internal/verify/v1';
export async function validateUploadImage(file) {
  if (!(file instanceof Blob) || !file.size || file.size > 8 * 1024 * 1024 || !['image/jpeg', 'image/png'].includes(file.type)) {
    throw new HttpError(400, 'invalid_image', 'Envie uma imagem JPG ou PNG de até 8 MB.');
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const valid = file.type === 'image/png' ? bytes.length > 24 && bytes.subarray(0, 8).toString('hex') === '89504e470d0a1a0a' && bytes.subarray(12, 16).toString() === 'IHDR'
    : bytes.length > 4 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 && bytes.at(-2) === 255 && bytes.at(-1) === 217;
  if (!valid) throw new HttpError(400, 'invalid_image_signature', 'O arquivo não corresponde a uma imagem JPG/PNG válida.');
  return new Blob([bytes], { type: file.type });
}
export function trustedStorageUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && !u.username && !u.password && !u.port && !u.hash &&
      /^(?:[a-z0-9.-]+\.)?s3(?:[.-][a-z0-9-]+)?\.amazonaws\.com$/.test(u.hostname);
  } catch { return false; }
}
export class AmazonUploadClient extends AmazonReadClient {
  async headers(jar, signal) {
    const csrf = await this.webJson('/account-management/data/csrf-token', jar, signal);
    const url = `${origin}/onboarding/v3/get-csrf-token`;
    const h = { Cookie: jar.header(url), Accept: 'application/json', 'anti-csrftoken-a2z-request': 'true', 'User-Agent': 'RabbitAndroid/3.139.2.7.0' };
    const anti = await this.request(url, { headers: h }, 'upload-security', signal);
    jar.update(anti.headers, url);
    const token = anti.headers.get('anti-csrftoken-a2z'); await anti.body?.cancel();
    if (!anti.ok || typeof csrf.token !== 'string' || !csrf.token || !token || /[\r\n]/.test(csrf.token + token)) {
      throw new HttpError(424, 'amazon_upload_csrf', 'A Amazon não liberou a autorização de segurança do envio.');
    }
    return { Cookie: jar.header(origin + '/onboarding/v3/identity-verification/session'),
      'User-Agent': 'RabbitAndroid/3.139.2.7.0', Accept: 'application/json', Origin: origin,
      Referer: origin + '/onboarding/v2/home-menu', 'Content-Type': 'application/json;charset=UTF-8',
      'X-CSRF-Token': csrf.token, 'X-CSRF-Attempt': '1', 'anti-csrftoken-a2z': token };
  }
  async uploadProfile(refresh, image) {
    const signal = AbortSignal.timeout(this.timeout); const jar = await this.webSession(refresh, signal);
    const params = await this.webJson('/account-management/data/get-photo-upload-url', jar, signal);
    if (params.success !== true || !trustedStorageUrl(params.data)) throw new HttpError(424, 'amazon_photo_unavailable', 'A Amazon não liberou o envio da foto de perfil.');
    const h = await this.headers(jar, signal);
    const response = await this.request(params.data, { method: 'PUT', headers: { 'Content-Type': image.type }, body: image }, 'photo-storage', signal);
    await response.body?.cancel();
    if (!response.ok) throw new HttpError(502, 'amazon_photo_storage_failed', 'O armazenamento não confirmou o envio. Consulte as etapas antes de tentar novamente.');
    const url = `${origin}/account-management/data/complete-photo-upload?presignedUrl=${encodeURIComponent(params.data)}`;
    h.Cookie = jar.header(url);
    const completed = await this.request(url, { method: 'POST', headers: h }, 'photo-confirmation', signal);
    const data = await this.json(completed, 'photo-confirmation');
    if (data.success !== true) throw new HttpError(424, 'amazon_photo_not_confirmed', 'A foto foi transferida, mas a Amazon não confirmou a associação ao perfil. Consulte as etapas antes de repetir.');
    return { transferred: true, notice: 'Foto de perfil recebida pela Amazon. Isso não conclui a selfie ou a verificação de identidade.' };
  }
  async uploadLicense(refresh, front, back) {
    const signal = AbortSignal.timeout(this.timeout); const jar = await this.webSession(refresh, signal);
    const h = await this.headers(jar, signal);
    const taskResponse = await this.request(`${origin}/onboarding/v3/identity-verification/task-state`, { headers: h }, 'identity-eligibility', signal);
    const task = await this.json(taskResponse, 'identity-eligibility');
    if (task.isEligibleForAction !== true) throw new HttpError(409, 'amazon_identity_not_ready', 'A Amazon ainda não liberou uma ação de identidade nesta conta. Consulte as etapas e conclua os requisitos anteriores. Nenhum documento foi enviado.');
    const sessionResponse = await this.request(`${origin}/onboarding/v3/identity-verification/session`, { method: 'POST', headers: h, body: '{}' }, 'identity-session', signal);
    const session = await this.json(sessionResponse, 'identity-session');
    const id = session.sessionId; const token = session.sessionToken;
    if (session.vendor?.toLowerCase() !== 'persona' || !/^inq_[A-Za-z0-9_-]{1,120}$/.test(id || '') || typeof token !== 'string' || !token || /[\r\n]/.test(token)) {
      throw new HttpError(424, 'amazon_identity_session_unavailable', 'A Amazon não retornou uma sessão Persona utilizável. Continue no fluxo oficial de identidade.');
    }
    const ph = { Authorization: `Bearer ${token.replace(/^Bearer\s+/i, '')}`, Accept: 'application/json',
      'Persona-Version': '2025-11-18', 'User-Agent': 'Persona/1.0 (Android) Inquiry/2.38.0' };
    const query = await this.request(`${persona}/inquiries/${id}`, { headers: ph }, 'identity-step', signal);
    const inquiry = await this.json(query, 'identity-step');
    const attrs = inquiry.data?.attributes; const step = attrs?.['next-step'] ?? attrs?.nextStep;
    const name = step?.name;
    const stepType = [step?.type, step?.name, step?.component].filter(v => typeof v === 'string').join(' ');
    if (!name || !/^[A-Za-z0-9_-]{1,120}$/.test(name) || !/government.?id|gov.?id|driver.?license/i.test(stepType)) {
      throw new HttpError(409, 'persona_document_step_unavailable', 'A sessão não está na etapa de envio da carteira. Continue no fluxo oficial. Nenhuma imagem foi enviada.');
    }
    const config = step.config ?? {};
    const documentKey = config.fieldKeyDocument ?? config.field_key_document ?? config['field-key-document'] ?? 'current_government_id';
    const classKey = config.fieldKeyIdclass ?? config.fieldKeyIdClass ?? config.field_key_idclass ?? config['field-key-idclass'] ?? 'selected_id_class';
    if (![documentKey, classKey].every(v => /^[A-Za-z0-9_-]{1,100}$/.test(v))) throw new HttpError(502, 'persona_invalid_fields', 'A Persona retornou campos incompatíveis com o envio.');
    const form = new FormData();
    form.set('data[id]', id); form.set('data[type]', 'inquiry');
    form.set('meta[from_step]', name); form.set('meta[from_component]', name);
    form.set(`data[attributes][fields][${classKey}]`, 'dl');
    const prefix = `data[attributes][fields][${documentKey}][files][]`;
    for (const [side, file] of [['front', front], ['back', back]]) {
      form.append(`${prefix}[page]`, side); form.append(`${prefix}[capture_method]`, 'upload');
      form.append(`${prefix}[type]`, 'image'); form.append(`${prefix}[frames][]`, file, `${side}.${file.type === 'image/png' ? 'png' : 'jpg'}`);
    }
    const sent = await this.request(`${persona}/inquiries/${id}/transition`, { method: 'POST', headers: ph, body: form }, 'identity-documents', signal);
    const receipt = await this.json(sent, 'identity-documents');
    if (receipt.data?.id !== id || !receipt.data?.attributes) throw new HttpError(502, 'persona_upload_not_confirmed', 'As imagens foram transmitidas, mas a confirmação não foi reconhecida. Consulte as etapas antes de repetir o envio.');
    return { transferred: true, notice: 'Frente e verso recebidos pela Persona para processamento. Consulte as etapas para acompanhar. Selfie e aprovação continuam no fluxo oficial.' };
  }
}
