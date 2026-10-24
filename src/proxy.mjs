import { ProxyAgent } from 'undici';
import { isIP } from 'node:net';
import { HttpError } from './apex.mjs';

export const IP_CHECK_URL = 'https://api.ipify.org?format=json';
export function proxyConfig(input, previous) {
  if (!input || !['http', 'https'].includes(input.protocol)) throw new HttpError(400, 'invalid_proxy', 'Selecione um proxy HTTP ou HTTPS.');
  const host = typeof input.host === 'string' ? input.host.trim().replace(/^\[|\]$/g, '') : '';
  const port = Number(input.port);
  if (!host || host.length > 253 || /[\s/@?#\\]/.test(host) || !Number.isInteger(port) || port < 1 || port > 65535) throw new HttpError(400, 'invalid_proxy', 'Informe apenas o host e uma porta entre 1 e 65535.');
  let url;
  try { url = new URL(`${input.protocol}://${isIP(host) === 6 ? `[${host}]` : host}:${port}`); }
  catch { throw new HttpError(400, 'invalid_proxy', 'Endereço do proxy inválido.'); }
  const config = { protocol: input.protocol, host: url.hostname.replace(/^\[|\]$/g, ''), port, username: '', password: '' };
  if (input.authMode === 'keep') {
    if (!previous || previous.protocol !== config.protocol || previous.host !== config.host || previous.port !== port) throw new HttpError(400, 'proxy_credentials_required', 'Ao trocar o endereço, informe novamente as credenciais ou selecione sem autenticação.');
    config.username = previous.username; config.password = previous.password;
  } else if (input.authMode === 'basic') {
    if (typeof input.username !== 'string' || !input.username || input.username.length > 512 || /[:\r\n\x00]/.test(input.username) || typeof input.password !== 'string' || !input.password || input.password.length > 1024 || /[\r\n\x00]/.test(input.password)) throw new HttpError(400, 'invalid_proxy_credentials', 'Informe usuário e senha válidos do proxy.');
    config.username = input.username; config.password = input.password;
  } else if (input.authMode !== 'none') throw new HttpError(400, 'invalid_proxy_auth', 'Escolha o modo de autenticação do proxy.');
  return config;
}
export const proxyEndpoint = config => `${config.protocol}://${isIP(config.host) === 6 ? `[${config.host}]` : config.host}:${config.port}`;
export function createProxyTransport({ getConfig, fetchImpl = fetch, testFetchImpl = fetchImpl, onEvent = () => {}, agentFactory = options => new ProxyAgent(options) }) {
  let current;
  const events = (config, userId, target, result) => onEvent({ userId, target, result, revision: config?.revision ?? null, endpoint: config ? proxyEndpoint(config) : null, exitIp: config?.lastTest?.ip ?? null, checkedAt: config?.lastTest?.checkedAt ?? null });
  async function routedFetch(url, options, userId, testing = false, provider = 'Apex', requestFetch = fetchImpl) {
    const config = getConfig();
    if (!config || (!testing && (!config.lastTest?.success || config.lastTest.revision !== config.revision))) {
      events(config, userId, testing ? 'ipify' : provider, 'blocked');
      throw new HttpError(503, config ? 'proxy_not_tested' : 'proxy_required', config ? 'Teste o proxy salvo antes de conectar ou sincronizar.' : 'Cadastre e teste um proxy no admin. Conexões externas diretas estão bloqueadas.');
    }
    if (!current || current.revision !== config.revision) {
      if (current) void current.agent.close().catch(() => {});
      const token = config.username ? `Basic ${Buffer.from(`${config.username}:${config.password}`, 'utf8').toString('base64')}` : undefined;
      current = { revision: config.revision, agent: agentFactory({ uri: proxyEndpoint(config), ...(token ? { token } : {}), proxyTunnel: true, connectTimeout: 10000 }) };
    }
    const target = testing ? 'ipify' : `${provider} ${new URL(url).hostname}${new URL(url).pathname}`;
    events(config, userId, target, 'dispatched_via_proxy');
    try {
      const response = await requestFetch(url, { ...options, dispatcher: current.agent, redirect: options?.redirect === 'manual' ? 'manual' : 'error' });
      events(config, userId, target, `http_${response.status}`);
      return { response, config };
    } catch {
      events(config, userId, target, 'transport_failed');
      throw new HttpError(502, 'proxy_connection_failed', 'A conexão pelo proxy falhou. Não houve tentativa direta nem repetição automática.');
    }
  }
  return {
    assertReady: () => { const c = getConfig(); if (!c || !c.lastTest?.success || c.lastTest.revision !== c.revision) throw new HttpError(503, c ? 'proxy_not_tested' : 'proxy_required', 'Cadastre e teste o proxy no admin antes de continuar.'); return c.revision; },
    fetch: async (url, options, userId, provider, requestFetch) => (await routedFetch(url, options, userId, false, provider, requestFetch)).response,
    test: async userId => {
      const { response, config } = await routedFetch(IP_CHECK_URL, { signal: AbortSignal.timeout(15000), headers: { Accept: 'application/json' } }, userId, true, 'ipify', testFetchImpl);
      let size = 0; const chunks = [];
      for await (const chunk of response.body ?? []) { size += chunk.length; if (size > 4096) throw new HttpError(502, 'invalid_proxy_test', 'Resposta de teste inválida.'); chunks.push(chunk); }
      let ip;
      try { ip = JSON.parse(Buffer.concat(chunks).toString()).ip; } catch {}
      if (!response.ok || typeof ip !== 'string' || !isIP(ip)) throw new HttpError(502, 'invalid_proxy_test', 'O teste não confirmou um endereço IP válido.');
      return { revision: config.revision, success: true, ip, checkedAt: new Date().toISOString(), observer: 'ipify', scope: 'GD Apply → serviço de teste; não verifica Apex → Amazon' };
    },
    close: () => { if (current) void current.agent.destroy().catch(() => {}); },
  };
}
