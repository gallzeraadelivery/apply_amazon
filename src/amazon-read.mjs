import { randomUUID } from 'node:crypto';
import { HttpError } from './apex.mjs';

const webOrigin = 'https://logistics.amazon.com';
const webUA = 'Mozilla/5.0 (Linux; Android 10; Pixel 2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36';
const appUA = 'Dalvik/2.1.0 (Linux; U; Android 6.0.1; Le X522) RabbitAndroid/3.137.2.26.0';
const webHosts = new Set(['amazon.com', 'www.amazon.com', 'logistics.amazon.com']);
const text = value => typeof value === 'string' ? value.slice(0, 500) : null;
const object = value => value && typeof value === 'object' && !Array.isArray(value);

// Ephemeral, domain/path-scoped cookies; never persisted or returned to the UI.
export class AmazonCookieJar {
  constructor() { this.cookies = []; }
  set(name, value, domain, path = '/', hostOnly = false, expires = Infinity) {
    if (!/^[A-Za-z0-9!#$%&'*+.^_`|~-]{1,128}$/.test(name) || typeof value !== 'string' ||
      /[\x00-\x20\x7f;,]/.test(value) || value.length > 16000) return;
    this.cookies = this.cookies.filter(c => !(c.name === name && c.domain === domain && c.path === path));
    if (expires > Date.now()) this.cookies.push({ name, value, domain, path, hostOnly, expires });
  }
  update(headers, address) {
    const url = new URL(address);
    for (const raw of headers.getSetCookie()) {
      const [pair, ...attrs] = raw.split(';'); const eq = pair.indexOf('='); if (eq < 1) continue;
      let domain = url.hostname, path = url.pathname.slice(0, url.pathname.lastIndexOf('/')) || '/', hostOnly = true, expires = Infinity, maxAge;
      for (const attr of attrs) {
        const split = attr.indexOf('='); const name = (split < 0 ? attr : attr.slice(0, split)).trim().toLowerCase();
        const value = split < 0 ? '' : attr.slice(split + 1).trim();
        if (name === 'domain') { domain = value.toLowerCase().replace(/^\./, ''); hostOnly = false; }
        if (name === 'path' && value.startsWith('/')) path = value;
        if (name === 'max-age' && /^-?\d+$/.test(value)) maxAge = Number(value);
        if (name === 'expires' && Number.isFinite(Date.parse(value))) expires = Date.parse(value);
      }
      if (maxAge !== undefined) expires = Date.now() + maxAge * 1000;
      if (!webHosts.has(domain) || !(url.hostname === domain || url.hostname.endsWith(`.${domain}`))) continue;
      this.set(pair.slice(0, eq).trim(), pair.slice(eq + 1), domain, path, hostOnly, expires);
    }
  }
  header(address) {
    const url = new URL(address);
    if (url.protocol !== 'https:') return '';
    return this.cookies.filter(c => c.expires > Date.now() &&
      (url.hostname === c.domain || (!c.hostOnly && url.hostname.endsWith(`.${c.domain}`))) &&
      (url.pathname === c.path || url.pathname.startsWith(c.path.endsWith('/') ? c.path : `${c.path}/`)))
      .sort((a, b) => b.path.length - a.path.length).map(c => `${c.name}=${c.value}`).join('; ');
  }
}

export class AmazonReadClient {
  constructor({ fetchImpl = fetch, timeout = 30000 } = {}) { this.fetch = fetchImpl; this.timeout = timeout; }
  async request(url, options, stage, signal) {
    try { return await this.fetch(url, { ...options, redirect: 'manual', signal }); }
    catch (e) { throw new HttpError(502, signal.aborted ? 'amazon_read_timeout' : 'amazon_read_network', `Falha de ${signal.aborted ? 'tempo' : 'rede'} na leitura Amazon (${stage}).`); }
  }
  async json(response, stage) {
    if (!response.ok) {
      await response.body?.cancel();
      throw new HttpError(response.status === 401 || response.status === 403 ? 424 : 502,
        `amazon_read_http_${response.status}`, `A Amazon recusou a leitura (${stage}, HTTP ${response.status}).`);
    }
    try {
      let size = 0; const chunks = [];
      for await (const chunk of response.body ?? []) {
        size += chunk.length; if (size > 2 * 1024 * 1024) throw Error(); chunks.push(chunk);
      }
      const data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      if (!object(data)) throw Error(); return data;
    } catch { throw new HttpError(502, 'amazon_read_invalid_response', `Resposta inválida na leitura Amazon (${stage}).`); }
  }
  async profile(refreshToken, signal) {
    const tokenResponse = await this.request('https://api.amazon.com/auth/token', { method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': appUA, 'x-amzn-identity-auth-domain': 'api.amazon.com' },
      body: JSON.stringify({ app_name: 'com.amazon.rabbit', app_version: '303338310', source_token_type: 'refresh_token',
        source_token: refreshToken, requested_token_type: 'access_token' }),
    }, 'access-token', signal);
    const auth = await this.json(tokenResponse, 'access-token');
    if (typeof auth.access_token !== 'string' || !auth.access_token || /[\r\n]/.test(auth.access_token)) {
      throw new HttpError(424, 'amazon_read_no_access', 'A Amazon não forneceu acesso para consultar o perfil.');
    }
    const response = await this.request('https://tas-na-extern.amazon.com/person', { headers: {
      'x-amz-access-token': auth.access_token, 'User-Agent': appUA, Accept: 'application/json',
      'X-Flex-Client-Time': String(Date.now()), 'x-flex-instance-id': randomUUID(), 'X-Amzn-RequestId': randomUUID(),
      'X-Amzn-App-Source': 'Google Play Store', 'X-Amzn-Marketplace-Id': 'ATVPDKIKX0DER',
    } }, 'profile', signal);
    const data = await this.json(response, 'profile');
    if (!object(data.person)) throw new HttpError(502, 'amazon_read_invalid_profile', 'A Amazon não retornou o perfil esperado.');
    const p = data.person;
    return { displayName: text(p.displayName) || text(p.fullName), firstName: text(p.firstName),
      middleName: text(p.middleName), lastName: text(p.lastName), email: text(p.email), phone: text(p.phoneNumber) };
  }
  async webSession(refreshToken, signal) {
    const response = await this.request('https://www.amazon.com/ap/exchangetoken/cookies', { method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': appUA, 'x-amzn-identity-auth-domain': 'api.amazon.com' },
      body: JSON.stringify({ app_name: 'com.amazon.rabbit', app_version: '303338310', source_token_type: 'refresh_token',
        source_token: refreshToken, requested_token_type: 'auth_cookies', domain: 'www.amazon.com' }),
    }, 'web-session', signal);
    const data = await this.json(response, 'web-session');
    const cookies = data.response?.tokens?.cookies?.['.amazon.com'];
    if (!Array.isArray(cookies) || !cookies.length) throw new HttpError(424, 'amazon_read_no_cookies', 'A Amazon não abriu a sessão web para consultar as etapas.');
    const jar = new AmazonCookieJar();
    for (const c of cookies) if (object(c)) jar.set(c.Name, c.Value, 'amazon.com');
    let url = `${webOrigin}/onboarding/v2/home-menu`;
    for (let hop = 0; hop < 6; hop++) {
      const r = await this.request(url, { headers: { Cookie: jar.header(url), 'User-Agent': webUA, Accept: 'text/html' } }, 'web-session-sso', signal);
      jar.update(r.headers, url); await r.body?.cancel();
      if ([301, 302, 303, 307, 308].includes(r.status)) {
        let target; try { target = new URL(r.headers.get('location'), url); } catch { throw new HttpError(502, 'amazon_read_sso_redirect', 'Retorno inválido ao abrir a sessão Amazon.'); }
        if (target.protocol !== 'https:' || !webHosts.has(target.hostname) || target.port || target.username || target.password) {
          throw new HttpError(502, 'amazon_read_sso_redirect', 'A sessão Amazon retornou um destino não permitido.');
        }
        url = target.href; continue;
      }
      if (!r.ok || new URL(url).hostname !== 'logistics.amazon.com') throw new HttpError(424, 'amazon_read_web_login_required', 'A Amazon exige uma nova autenticação para consultar as etapas.');
      return jar;
    }
    throw new HttpError(424, 'amazon_read_sso_incomplete', 'Não foi possível concluir a abertura da sessão web Amazon.');
  }
  async webJson(path, jar, signal) {
    const url = webOrigin + path;
    const r = await this.request(url, { headers: { Cookie: jar.header(url), 'User-Agent': webUA,
      Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', Referer: `${webOrigin}/onboarding/v2/home-menu` } }, path, signal);
    jar.update(r.headers, url); return this.json(r, path);
  }
  async onboarding(refreshToken, signal) {
    const jar = await this.webSession(refreshToken, signal);
    const status = await this.webJson('/onboarding/v2/data/onboarding-status', jar, signal);
    if (!object(status.taskStatusMap) || !Object.keys(status.taskStatusMap).length) {
      throw new HttpError(502, 'amazon_read_missing_tasks', 'A Amazon não retornou um mapa válido de etapas.');
    }
    const tasks = Object.entries(status.taskStatusMap).filter(([key]) => /^[A-Z0-9_]{1,100}$/.test(key))
      .map(([key, value]) => ({ key, status: text(value) || text(value?.status) || 'Estado não reconhecido' }));
    let personalInfo = null;
    try {
      const data = await this.webJson('/onboarding/v2/data/personal-info', jar, signal);
      personalInfo = Object.fromEntries(['firstName', 'middleName', 'lastName', 'phoneNumber', 'address', 'addressLine1', 'city', 'state', 'stateOrRegion', 'postalCode', 'dateOfBirth'].map(k => [k, text(data[k])]));
    } catch { /* Optional personal fields do not erase a valid task map. */ }
    return { workflowStatus: text(status.workflowStatus), tasks, personalInfo };
  }
  async read(refreshToken) {
    const signal = AbortSignal.timeout(this.timeout); const checkedAt = new Date().toISOString();
    const values = await Promise.allSettled([this.profile(refreshToken, signal), this.onboarding(refreshToken, signal)]);
    const result = { checkedAt, profile: null, onboarding: null, sources: [] };
    for (const [i, name] of ['profile', 'onboarding'].entries()) {
      const value = values[i];
      if (value.status === 'fulfilled') { result[name] = value.value; result.sources.push({ name, ok: true }); }
      else {
        const e = value.reason;
        result.sources.push({ name, ok: false, error: e instanceof HttpError ? e.code : 'amazon_read_failed',
          message: e instanceof HttpError ? e.message : 'Não foi possível concluir esta consulta Amazon.' });
      }
    }
    return { ...result, ok: result.sources.every(s => s.ok) };
  }
}
