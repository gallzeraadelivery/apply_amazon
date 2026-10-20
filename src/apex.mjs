export const APEX_ORIGIN = 'https://apply.apexbot.app';
export class HttpError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
export const editableFields = new Set([
  'firstName', 'middleName', 'lastName', 'phoneNumber', 'address', 'city', 'state',
  'postalCode', 'dateOfBirth', 'driversLicenseNumber', 'driverLicenseExpirationDate',
  'ssn', 'paymentAccountName', 'bankAccountType', 'bankRoutingNumber', 'bankAccountNumber',
]);
export function applicationForm(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new HttpError(400, 'invalid_form', 'Formulário inválido.');
  const form = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (!editableFields.has(key) || typeof value !== 'string' || value.length > 500) {
      throw new HttpError(400, 'invalid_field', 'Campo de cadastro inválido.');
    }
    form.set(key, value);
  }
  if (!Object.keys(data).length) throw new HttpError(400, 'empty_form', 'Preencha os dados antes de salvar.');
  return form;
}
export function redact(value) {
  if (Array.isArray(value)) return value.map(redact);
  if (!value || typeof value !== 'object') return value;
  const result = {};
  for (const [key, item] of Object.entries(value)) {
    if (/(?:password|passwd|secret|token|cookie|sessionref|session_ref|authorization|ssn|routingnumber|routing_number|accountnumber|account_number|bank_account|bank_routing)/i.test(key)) continue;
    result[key] = redact(item);
  }
  return result;
}
export class ApexClient {
  constructor({ fetchImpl = fetch, timeout = 30000 } = {}) { this.fetch = fetchImpl; this.timeout = timeout; }
  async request(path, { token, method = 'GET', body } = {}) {
    if (!path.startsWith('/api/') || path.includes('://') || /[\r\n]/.test(path)) throw new Error('Invalid upstream path');
    const headers = { Accept: 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    if (body && !(body instanceof FormData)) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(body); }
    let response;
    try {
      response = await this.fetch(`${APEX_ORIGIN}${path}`, { method, headers, body, redirect: 'error', signal: AbortSignal.timeout(this.timeout) });
    } catch { throw new HttpError(502, 'apex_unreachable', 'Não foi possível alcançar a Apex. Nenhuma repetição automática foi feita.'); }
    if (Number(response.headers.get('content-length') || 0) > 12 * 1024 * 1024) throw new HttpError(502, 'response_too_large', 'Resposta da Apex excede o limite.');
    let size = 0; const chunks = [];
    for await (const chunk of response.body ?? []) {
      size += chunk.length;
      if (size > 12 * 1024 * 1024) throw new HttpError(502, 'response_too_large', 'Resposta da Apex excede o limite.');
      chunks.push(chunk);
    }
    const text = Buffer.concat(chunks).toString('utf8');
    if (!response.ok) {
      const status = response.status === 401 || response.status === 403 ? 424 : response.status === 429 ? 429 : 502;
      const msg = response.status === 401 || response.status === 403 ? 'A Apex recusou o acesso. Confira a sessão e as permissões da sua conta.' : `A Apex retornou HTTP ${response.status}. Consulte o histórico antes de repetir uma alteração.`;
      throw new HttpError(status, `apex_http_${response.status}`, msg);
    }
    if (!text.trim()) return { success: true };
    try { return JSON.parse(text); } catch { throw new HttpError(502, 'invalid_apex_response', 'A Apex não retornou uma resposta JSON válida.'); }
  }
  async login(email, password) {
    const data = await this.request('/api/auth/login', { method: 'POST', body: { email, password } });
    if (typeof data.token !== 'string' || !data.token || /[\r\n]/.test(data.token) || data.token.length > 16000) {
      throw new HttpError(502, 'invalid_apex_login', 'A Apex não confirmou uma sessão utilizável.');
    }
    await this.request('/api/me', { token: data.token });
    return { token: data.token, user: redact(data.user ?? {}) };
  }
}
