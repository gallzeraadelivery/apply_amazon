import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import net from 'node:net';
import { once } from 'node:events';
import { createApp } from '../src/app.mjs';
import { proxyConfig, createProxyTransport, IP_CHECK_URL } from '../src/proxy.mjs';

const initial = 'proxy-initial-password-123';
async function admin(t, fetchImpl) {
  const calls = [];
  const app = createApp({ dbPath: ':memory:', masterKey: 'a'.repeat(64), adminEmail: 'admin@example.test', adminPassword: initial, origin: 'http://localhost', production: false, fetchImpl: async (url, options) => {
    calls.push({ url, options });
    if (fetchImpl) return fetchImpl(url, options);
    return new Response(JSON.stringify(url === IP_CHECK_URL ? { ip: '203.0.113.22' } : url.endsWith('/api/auth/login') ? { token: 'fake-session-token' } : { user: {} }), { status: 200 });
  } });
  app.server.listen(0, '127.0.0.1'); await once(app.server, 'listening'); t.after(() => app.close());
  const base = `http://127.0.0.1:${app.server.address().port}`;
  let cookie = ''; let csrf = '';
  const request = async (path, method = 'GET', body) => {
    const r = await fetch(base + path, { method, headers: { Origin: 'http://localhost', 'Content-Type': 'application/json', Cookie: cookie, 'X-CSRF-Token': csrf }, body: body ? JSON.stringify(body) : undefined });
    if (r.headers.get('set-cookie')) cookie = r.headers.get('set-cookie').split(';')[0];
    const data = await r.json(); if (data.csrf) csrf = data.csrf;
    return { status: r.status, data };
  };
  await request('/api/auth/login', 'POST', { email: 'admin@example.test', password: initial });
  await request('/api/auth/password', 'POST', { currentPassword: initial, newPassword: 'proxy-updated-password-456' });
  return { request, calls, db: app.db };
}
const config = { protocol: 'http', host: 'proxy.example.test', port: 8080, authMode: 'basic', username: 'fixture-user', password: 'fixture-password' };
const login = { email: 'operator@example.test', password: 'fake-apex-password' };

test('admin encrypts proxy credentials and blocks all Apex traffic until this revision is tested', async t => {
  const f = await admin(t);
  assert.equal((await f.request('/api/integrations/apex/connect', 'POST', login)).data.error, 'proxy_required');
  assert.equal(f.calls.length, 0);
  const saved = await f.request('/api/admin/proxy', 'PUT', config);
  assert.equal(saved.status, 200); assert.equal(saved.data.verified, false);
  assert.ok(!JSON.stringify(saved.data).includes(config.username)); assert.ok(!JSON.stringify(saved.data).includes(config.password));
  const stored = f.db.prepare('SELECT config FROM proxy_settings').get().config;
  assert.ok(!stored.includes(config.password)); assert.ok(!stored.includes(config.username));
  assert.equal((await f.request('/api/integrations/apex/connect', 'POST', login)).data.error, 'proxy_not_tested');
  assert.equal(f.calls.length, 0);
  const tested = await f.request('/api/admin/proxy/test', 'POST', {});
  assert.equal(tested.data.lastTest.ip, '203.0.113.22'); assert.equal(tested.data.verified, true);
  assert.equal((await f.request('/api/integrations/apex/connect', 'POST', login)).status, 200);
  assert.ok(f.calls.every(c => c.options.dispatcher));
  const events = (await f.request('/api/admin/proxy/events')).data.events;
  assert.ok(events.some(e => e.result === 'dispatched_via_proxy' && e.exit_ip_snapshot === '203.0.113.22'));
  assert.ok(!JSON.stringify(events).includes(config.password));
  await f.request('/api/admin/proxy', 'PUT', { ...config, authMode: 'keep', username: '', password: '' });
  assert.equal((await f.request('/api/admin/proxy')).data.verified, false);
  const before = f.calls.length;
  assert.equal((await f.request('/api/apex/credits')).data.error, 'proxy_not_tested'); assert.equal(f.calls.length, before);
  await f.request('/api/admin/proxy', 'DELETE');
  assert.equal((await f.request('/api/apex/credits')).data.error, 'proxy_required'); assert.equal(f.calls.length, before);
});

test('failed IP test revokes verification and cannot trigger an unproxied request', async t => {
  let failing = false;
  const f = await admin(t, async () => { if (failing) throw new Error('private upstream diagnostics'); return new Response('{"ip":"203.0.113.22"}'); });
  await f.request('/api/admin/proxy', 'PUT', config);
  assert.equal((await f.request('/api/admin/proxy/test', 'POST', {})).data.verified, true);
  failing = true;
  const result = await f.request('/api/admin/proxy/test', 'POST', {});
  assert.equal(result.data.error, 'proxy_connection_failed'); assert.ok(!JSON.stringify(result).includes('private upstream'));
  assert.equal((await f.request('/api/admin/proxy')).data.verified, false);
  const count = f.calls.length;
  assert.equal((await f.request('/api/integrations/apex/connect', 'POST', login)).data.error, 'proxy_not_tested');
  assert.equal(f.calls.length, count);
});

test('a stale successful test cannot approve a newly saved proxy', async t => {
  let resolveFetch; let started;
  const requested = new Promise(resolve => { started = resolve; });
  const f = await admin(t, () => new Promise(resolve => { resolveFetch = resolve; started(); }));
  await f.request('/api/admin/proxy', 'PUT', config);
  const testRequest = f.request('/api/admin/proxy/test', 'POST', {}); await requested;
  await f.request('/api/admin/proxy', 'PUT', { ...config, host: 'another-proxy.example.test' });
  resolveFetch(new Response('{"ip":"203.0.113.22"}'));
  assert.equal((await testRequest).data.error, 'proxy_changed_during_test');
  assert.equal((await f.request('/api/admin/proxy')).data.verified, false);
});

test('proxy configuration rejects URL injection and cannot silently move saved credentials', () => {
  const previous = proxyConfig(config);
  for (const host of ['http://proxy.example', 'user:pass@proxy.example', 'proxy.example/path', 'proxy.example\r\nBad: 1']) assert.throws(() => proxyConfig({ ...config, host }));
  assert.throws(() => proxyConfig({ ...config, protocol: 'socks5' }));
  assert.throws(() => proxyConfig({ ...config, host: 'different.example', authMode: 'keep' }, previous));
  assert.equal(proxyConfig({ ...config, authMode: 'keep' }, previous).password, config.password);
  assert.throws(() => proxyConfig({ ...config, port: 65536 }));
});

test('actual HTTP CONNECT uses proxy auth only at the proxy and never falls back when it fails', async t => {
  let hits = 0; let connectHits = 0; let targetAuth; let proxyAuth;
  const sockets = new Set();
  const target = http.createServer((req, res) => { hits++; targetAuth = req.headers['proxy-authorization']; res.end('{"ok":true}'); });
  const proxy = http.createServer();
  for (const server of [target, proxy]) {
    server.on('connection', socket => { sockets.add(socket); socket.on('close', () => sockets.delete(socket)); });
    server.listen(0, '127.0.0.1'); await once(server, 'listening');
  }
  t.after(() => { for (const socket of sockets) socket.destroy(); target.close(); proxy.close(); });
  const targetPort = target.address().port;
  proxy.on('connect', (req, downstream, head) => {
    connectHits++; proxyAuth = req.headers['proxy-authorization'];
    if (req.url !== `127.0.0.1:${targetPort}`) return downstream.destroy();
    const upstream = net.connect(targetPort, '127.0.0.1', () => { downstream.write('HTTP/1.1 200 Connection Established\r\n\r\n'); if (head.length) upstream.write(head); upstream.pipe(downstream); downstream.pipe(upstream); });
    sockets.add(upstream); upstream.on('error', () => downstream.destroy()); downstream.on('close', () => upstream.destroy());
  });
  let selected = { protocol: 'http', host: '127.0.0.1', port: proxy.address().port, username: 'testuser', password: 'testpass', revision: 'one', lastTest: { success: true, revision: 'one' } };
  const transport = createProxyTransport({ getConfig: () => selected }); t.after(() => transport.close());
  const r = await transport.fetch(`http://127.0.0.1:${targetPort}/probe`, { signal: AbortSignal.timeout(3000) });
  assert.equal((await r.json()).ok, true); assert.equal(connectHits, 1); assert.equal(hits, 1);
  assert.equal(proxyAuth, `Basic ${Buffer.from('testuser:testpass').toString('base64')}`); assert.equal(targetAuth, undefined);
  // The configured proxy is now the non-proxy HTTP server: CONNECT cannot succeed.
  selected = { ...selected, port: targetPort, revision: 'two', lastTest: { success: true, revision: 'two' } };
  await assert.rejects(transport.fetch(`http://127.0.0.1:${targetPort}/must-not-go-direct`, { signal: AbortSignal.timeout(500) }), e => e.code === 'proxy_connection_failed');
  assert.equal(hits, 1, 'failure must not retry directly at the destination');
});
