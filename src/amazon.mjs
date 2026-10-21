import { randomBytes, createHash, createCipheriv, createHmac, pbkdf2Sync } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { HttpError } from './apex.mjs';

// Protocol settings from the owner's existing amazonteste implementation.
// This is an observed device authorization flow, not a public API contract.
const deviceType = 'A1MPSLFC7L5AFK';
const profile = { model: 'Le X522', manufacturer: 'LeMobile', product: 'le_s2_na',
  os: 'LeEco/Le2_NA/le_s2_na:6.0.1/IFXNAOP5801910272S/61:user/release-keys' };
const userAgent = 'Dalvik/2.1.0 (Linux; U; Android 6.0.1; Le X522) RabbitAndroid/3.137.2.26.0';
export function makeAmazonAttempt() {
  const serial = randomBytes(16).toString('hex').toUpperCase();
  const verifier = randomBytes(32).toString('base64url');
  const challenge = createHash('sha256').update(verifier).digest('base64url');
  return { serial, verifier, challenge };
}
export function amazonSigninLink({ serial, challenge }) {
  const client = Buffer.from(`${serial}#${deviceType}`).toString('hex');
  const params = new URLSearchParams({
    'openid.oa2.code_challenge_method': 'S256', 'openid.oa2.code_challenge': challenge,
    'openid.oa2.prompt': 'consent', 'openid.return_to': `https://www.amazon.com/ap/maplanding?serial=${serial}`,
    'openid.assoc_handle': 'amzn_device_na', 'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    pageId: 'amzn_device_na', accountStatusPolicy: 'P1',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select', 'openid.mode': 'checkid_setup',
    'openid.ns.oa2': 'http://www.amazon.com/ap/ext/oauth/2', 'openid.oa2.client_id': `device:${client}`,
    'openid.ns.pape': 'http://specs.openid.net/extensions/pape/1.0', 'openid.oa2.scope': 'device_auth_access',
    'openid.ns': 'http://specs.openid.net/auth/2.0', 'openid.pape.max_auth_age': '0', marketPlaceId: 'ATVPDKIKX0DER',
    forceCaptcha: 'true', use_global_authentication: 'false', 'openid.oa2.response_type': 'code',
  });
  return `https://www.amazon.com/ap/signin?${params}`;
}
export function parseAmazonReturn(value, expectedSerial) {
  let url;
  try { if (typeof value !== 'string' || value.length > 16000) throw Error(); url = new URL(value.trim()); }
  catch { throw new HttpError(400, 'invalid_amazon_return', 'Cole a URL final completa da Amazon.'); }
  if (url.protocol !== 'https:' || !['www.amazon.com', 'amazon.com'].includes(url.hostname) ||
      url.port || url.username || url.password || url.hash || url.pathname !== '/ap/maplanding') {
    throw new HttpError(400, 'invalid_amazon_return', 'O retorno deve ser https://www.amazon.com/ap/maplanding.');
  }
  const serials = url.searchParams.getAll('serial').filter(Boolean);
  const codes = url.searchParams.getAll('openid.oa2.authorization_code');
  if (!serials.length || serials.some(s => s.toUpperCase() !== expectedSerial.toUpperCase())) {
    throw new HttpError(400, 'amazon_serial_mismatch', 'Esse retorno não pertence ao link atual. Use o último link gerado neste painel.');
  }
  if (codes.length !== 1 || !/^[A-Za-z0-9._~-]{1,4096}$/.test(codes[0])) {
    throw new HttpError(400, 'amazon_code_missing', 'O retorno não contém um código de autorização válido.');
  }
  return codes[0];
}
function frc(serial) {
  const context = JSON.stringify({ ApplicationName: 'com.amazon.rabbit', ApplicationVersion: '303338310',
    DeviceLanguage: 'en', DeviceName: profile.model, DeviceOSVersion: profile.os,
    IpAddress: '0.0.0.0', ScreenHeightPixels: '1920', ScreenWidthPixels: '1080', TimeZone: '00:00' });
  const iv = randomBytes(16);
  const key = pbkdf2Sync(serial, 'AES/CBC/PKCS7Padding', 1000, 32, 'sha1');
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(gzipSync(Buffer.from(context))), cipher.final()]);
  const macKey = pbkdf2Sync(serial, 'HmacSHA256', 1000, 32, 'sha1');
  const mac = createHmac('sha256', macKey).update(Buffer.concat([iv, encrypted])).digest().subarray(0, 8);
  return Buffer.concat([Buffer.from([0]), mac, iv, encrypted]).toString('base64');
}
export class AmazonClient {
  constructor({ fetchImpl = fetch, timeout = 20000 } = {}) { this.fetch = fetchImpl; this.timeout = timeout; }
  async register({ code, verifier, serial }) {
    const body = {
      requested_token_type: ['bearer', 'mac_dms', 'store_authentication_cookie', 'website_cookies'],
      cookies: { domain: '.amazon.com', website_cookies: [] },
      registration_data: { domain: 'Device', app_name: 'com.amazon.rabbit', app_version: '303338310',
        device_model: profile.model, device_serial: serial, device_type: deviceType, os_version: profile.os, software_version: '130050002' },
      device_metadata: { android_id: randomBytes(8).toString('hex'), device_os_family: 'android', device_serial: serial,
        device_type: deviceType, manufacturer: profile.manufacturer, model: profile.model, os_version: '30', product: profile.product },
      auth_data: { client_id: Buffer.from(`${serial}#${deviceType}`).toString('hex'), authorization_code: code,
        code_verifier: verifier, code_algorithm: 'SHA-256', client_domain: 'DeviceLegacy' },
      requested_extensions: ['device_info', 'customer_info'], user_context_map: { frc: frc(serial) },
    };
    let response, data;
    try {
      response = await this.fetch('https://api.amazon.com/auth/register', {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(this.timeout),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': userAgent,
          'x-amzn-identity-auth-domain': 'api.amazon.com' }, body: JSON.stringify(body),
      });
      let size = 0; const chunks = [];
      for await (const chunk of response.body ?? []) {
        size += chunk.length;
        if (size > 1024 * 1024) throw new HttpError(502, 'amazon_invalid_response', 'Resposta Amazon acima do limite. Gere um novo link.');
        chunks.push(chunk);
      }
      try { data = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
      catch { throw new HttpError(502, 'amazon_invalid_response', 'A Amazon não retornou uma resposta válida. Gere um novo link.'); }
    } catch (error) {
      if (error instanceof HttpError) throw error;
      const rawCode = error?.cause?.code;
      const code = ['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED', 'ECONNRESET', 'CERT_HAS_EXPIRED', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'UND_ERR_CONNECT_TIMEOUT'].includes(rawCode) ? rawCode : 'NETWORK';
      const timeout = ['TimeoutError', 'AbortError'].includes(error?.name);
      throw new HttpError(502, timeout ? 'amazon_timeout' : `amazon_network_${code.toLowerCase()}`,
        `Não foi possível concluir a conexão com a Amazon (${timeout ? 'TIMEOUT' : code}). Gere um novo link antes de tentar novamente.`);
    }
    const refresh = data?.response?.success?.tokens?.bearer?.refresh_token;
    if (!response.ok || typeof refresh !== 'string' || refresh.length < 10 || refresh.length > 32000) {
      throw new HttpError(424, 'amazon_registration_rejected', 'A Amazon não confirmou um token de acesso. Gere um novo link e refaça o login.');
    }
    return { refreshToken: refresh };
  }
}
