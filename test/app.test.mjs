import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { randomBytes } from 'node:crypto';
import { createApp } from '../src/app.mjs';
import { ApexClient, applicationForm, redact } from '../src/apex.mjs';

const accountId = '625567a5-18ac-4b13-9655-aeb24b47a7cd';
const runId = '21de151a-0fc7-40b1-90fc-cd909af5e995';
const initialPassword = 'temporary-test-password-123';
const updatedPassword = 'new-long-test-password-456';
const upstreamToken = 'test-token-not-a-real-credential';
function response(data, status = 200) { return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } }); }
async function fixture(t, override) {
  const calls = [];
  const mock = async (url, options) => {
    calls.push({ url, ...options });
    const custom = await override?.(url, options); if (custom) return custom;
    if (url.startsWith('https://api.ipify.org')) return response({ ip: '203.0.113.10' });
    if (url.endsWith('/api/auth/login')) return response({ token: upstreamToken, user: { email: 'operator@example.test' } });
    if (url.endsWith('/api/me')) return response({ user: { id: 'remote-user' } });
    if (url.includes('/api/accounts?')) return response({ accounts: [{ id: accountId, amazon_label: 'Test account', token: 'private', last_known_status: { application_data: { basic_info: { firstName: 'Test', ssn: 'private' } } } }] });
    if (url.endsWith(`/api/accounts/${accountId}/start`)) return response({ run: { id: runId, status: 'queued' } });
    if (url.endsWith(`/api/accounts/${accountId}/application-data`)) return response({ account: { id: accountId } });
    if (url.includes(`/api/accounts/${accountId}/file/`)) return response({ account: { id: accountId } });
    return response({ balance: 12 });
  };
  const app = createApp({ dbPath: ':memory:', masterKey: randomBytes(32).toString('hex'), adminEmail: 'admin@example.test', adminPassword: initialPassword, origin: 'http://localhost', production: false, fetchImpl: mock });
  app.server.listen(0, '127.0.0.1'); await once(app.server, 'listening');
  t.after(() => app.close());
  const base = `http://127.0.0.1:${app.server.address().port}`;
  let cookie = ''; let csrf = '';
  async function request(path, { method = 'GET', body, origin = 'http://localhost', csrfOverride, headers = {} } = {}) {
    const opts = { method, headers: { Origin: origin, ...(cookie ? { Cookie: cookie } : {}), ...headers } };
    if (csrfOverride !== false && csrf) opts.headers['X-CSRF-Token'] = csrfOverride ?? csrf;
    if (body instanceof FormData) opts.body = body;
    else if (body) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
    const r = await fetch(`${base}${path}`, opts);
    if (r.headers.get('set-cookie')) cookie = r.headers.get('set-cookie').split(';')[0];
    const data = await r.json(); if (data.csrf) csrf = data.csrf;
    return { status: r.status, headers: r.headers, data };
  }
  async function login() { return request('/api/auth/login', { method: 'POST', body: { email: 'admin@example.test', password: initialPassword } }); }
  async function ready() {
    await login();
    await request('/api/auth/password', { method: 'POST', body: { currentPassword: initialPassword, newPassword: updatedPassword } });
  }
  async function configureProxy() {
    await request('/api/admin/proxy', { method: 'PUT', body: { host: 'proxy.example.test', port: 8080, protocol: 'http', authMode: 'none' } });
    return request('/api/admin/proxy/test', { method: 'POST', body: {} });
  }
  async function connect() { await configureProxy(); return request('/api/integrations/apex/connect', { method: 'POST', body: { email: 'operator@example.test', password: 'apex-test-password' } }); }
  return { app, request, login, ready, connect, calls };
}

test('authentication, forced password change, CSRF and logout protect the application', async t => {
  const f = await fixture(t);
  assert.equal((await f.request('/api/apex/accounts')).status, 401);
  assert.equal((await f.login()).data.user.mustChangePassword, true);
  assert.equal((await f.request('/api/integrations')).data.error, 'password_change_required');
  assert.equal((await f.request('/api/auth/password', { method: 'POST', csrfOverride: false, body: { currentPassword: initialPassword, newPassword: updatedPassword } })).status, 403);
  assert.equal((await f.request('/api/auth/password', { method: 'POST', origin: 'https://other.example', body: { currentPassword: initialPassword, newPassword: updatedPassword } })).status, 403);
  assert.equal((await f.request('/api/auth/password', { method: 'POST', body: { currentPassword: initialPassword, newPassword: updatedPassword } })).status, 200);
  assert.equal((await f.request('/api/auth/session')).data.user.mustChangePassword, false);
  const logout = await f.request('/api/auth/logout', { method: 'POST', body: {} });
  assert.match(logout.headers.get('set-cookie'), /HttpOnly/);
  assert.equal((await f.request('/api/auth/session')).status, 401);
  assert.equal(f.calls.length, 0);
});

test('real Apex contract is mapped; tokens are encrypted and never sent to the browser', async t => {
  const f = await fixture(t); await f.ready();
  assert.equal((await f.request('/api/apex/accounts')).data.error, 'apex_not_connected');
  const connected = await f.connect(); assert.equal(connected.status, 200);
  assert.equal(connected.data.apex.connected, true); assert.equal(connected.data.amazon.connected, false);
  assert.ok(!JSON.stringify(connected.data).includes(upstreamToken));
  const stored = f.app.db.prepare('SELECT token FROM integrations').get().token;
  assert.notEqual(stored, upstreamToken); assert.ok(stored.includes('.'));
  const accounts = await f.request('/api/apex/accounts'); assert.equal(accounts.status, 200);
  assert.equal(accounts.data.accounts[0].id, accountId);
  assert.ok(!JSON.stringify(accounts.data).includes('private'));
  assert.ok(f.calls.every(c => c.url.startsWith('https://apply.apexbot.app/api/') || c.url.startsWith('https://api.ipify.org')));
  assert.ok(f.calls.every(c => c.dispatcher));
  assert.equal(f.calls.at(-1).headers.Authorization, `Bearer ${upstreamToken}`);
  assert.equal((await f.request('/api/amazon/onboarding')).data.error, 'amazon_not_configured');
  await f.request('/api/integrations/apex', { method: 'DELETE' });
  assert.equal((await f.request('/api/apex/accounts')).data.error, 'apex_not_connected');
});

test('failed Apex authentication cannot create a connected integration', async t => {
  const f = await fixture(t, url => url.endsWith('/api/auth/login') ? response({ error: 'invalid_credentials' }, 401) : null);
  await f.ready(); const r = await f.connect();
  assert.equal(r.status, 424); assert.equal(r.data.error, 'apex_http_401');
  assert.equal(f.app.db.prepare('SELECT COUNT(*) AS n FROM integrations').get().n, 0);
});

test('personal updates require confirmation, whitelist fields and forward multipart once', async t => {
  const f = await fixture(t); await f.ready(); await f.connect();
  const path = `/api/apex/accounts/${accountId}/application-data`;
  const fields = { firstName: 'Test', lastName: 'Operator', phoneNumber: '2025550100' };
  assert.equal((await f.request(path, { method: 'POST', body: { fields } })).status, 400);
  assert.equal((await f.request(path, { method: 'POST', body: { confirm: true, fields: { ...fields, role: 'admin' } } })).status, 400);
  const r = await f.request(path, { method: 'POST', body: { confirm: true, fields } });
  assert.equal(r.status, 200); assert.equal(r.data.data.account.id, accountId);
  const upstream = f.calls.filter(c => c.url.endsWith('/application-data'));
  assert.equal(upstream.length, 1); assert.ok(upstream[0].body instanceof FormData);
  assert.equal(upstream[0].body.get('phoneNumber'), fields.phoneNumber);
  assert.equal(upstream[0].headers['Content-Type'], undefined);
  const events = (await f.request('/api/audit')).data.events;
  assert.ok(events.some(e => e.status === 'http_success'));
  assert.ok(!JSON.stringify(events).includes(fields.phoneNumber));
  assert.equal((await f.request('/api/apex/accounts/not-an-id')).status, 400);
});

test('upstream mutation failure is reported as unconfirmed and is never retried', async t => {
  const f = await fixture(t, url => url.endsWith('/start') ? response({ error: 'gateway_error' }, 502) : null);
  await f.ready(); await f.connect();
  const r = await f.request(`/api/apex/accounts/${accountId}/start`, { method: 'POST', body: { confirm: true } });
  assert.equal(r.status, 502); assert.equal(r.data.error, 'apex_http_502');
  assert.equal(f.calls.filter(c => c.url.endsWith('/start')).length, 1);
  assert.equal((await f.request('/api/audit')).data.events[0].status, 'not_confirmed');
});

test('document upload validates signatures and forwards only the selected document', async t => {
  const f = await fixture(t); await f.ready(); await f.connect();
  const path = `/api/apex/accounts/${accountId}/documents?kind=dlFront`;
  const bad = new FormData(); bad.set('file', new Blob(['not an image'], { type: 'image/png' }), 'bad.png');
  assert.equal((await f.request(path, { method: 'POST', body: bad, headers: { 'X-Confirm-Operation': 'upload' } })).data.error, 'file_signature_mismatch');
  const good = new FormData(); good.set('file', new Blob(['%PDF-1.7\nfixture'], { type: 'application/pdf' }), 'sample.pdf');
  const r = await f.request(path, { method: 'POST', body: good, headers: { 'X-Confirm-Operation': 'upload' } });
  assert.equal(r.status, 200);
  const call = f.calls.find(c => c.url.endsWith('/file/dlFront'));
  assert.deepEqual([...call.body.keys()], ['image']);
});

test('provider refuses redirects/HTML contracts and redacts nested secrets', async () => {
  const client = new ApexClient({ fetchImpl: async (_url, options) => { assert.equal(options.redirect, 'error'); return new Response('<html>SPA fallback</html>', { status: 200 }); } });
  await assert.rejects(client.request('/api/me'), e => e.code === 'invalid_apex_response');
  await assert.rejects(client.request('https://other.example/api/me'), /Invalid upstream/);
  assert.deepEqual(redact({ data: [{ token: 'x', password: 'x', ssn: 'x', firstName: 'Allowed' }] }), { data: [{ firstName: 'Allowed' }] });
  assert.throws(() => applicationForm({ unexpected: 'field' }));
});

test('concurrent mutations cannot launch two executions', async t => {
  let release; let started;
  const running = new Promise(resolve => { started = resolve; });
  const gate = new Promise(resolve => { release = resolve; });
  const f = await fixture(t, async url => { if (url.endsWith('/start')) { started(); await gate; return response({ run: { id: runId, status: 'queued' } }); } });
  await f.ready(); await f.connect();
  const path = `/api/apex/accounts/${accountId}/start`;
  const first = f.request(path, { method: 'POST', body: { confirm: true } });
  await running;
  const second = await f.request(path, { method: 'POST', body: { confirm: true } });
  assert.equal(second.status, 409); release(); assert.equal((await first).status, 200);
  assert.equal(f.calls.filter(c => c.url.endsWith('/start')).length, 1);
});
