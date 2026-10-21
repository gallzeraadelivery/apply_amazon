import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { randomBytes, createHash } from 'node:crypto';
import { makeAmazonAttempt, amazonSigninLink, parseAmazonReturn } from '../src/amazon.mjs';
import { createApp } from '../src/app.mjs';

const token = 'synthetic-refresh-token-for-contract-test';
async function fixture(t, upstream, extraConfig = {}) {
  const calls = [];
  const app = createApp({ dbPath: ':memory:', masterKey: randomBytes(32).toString('hex'),
    adminEmail: 'admin@example.test', adminPassword: 'initial-password-123456', production: false, origin: 'http://localhost',
    amazonFetchImpl: async (url, opts) => {
      calls.push({ url, opts });
      if (upstream) return upstream(url, opts);
      return Response.json({ response: { success: { tokens: { bearer: { refresh_token: token } } } } });
    }, ...extraConfig,
  });
  app.server.listen(0, '127.0.0.1'); await once(app.server, 'listening'); t.after(() => app.close());
  const base = `http://127.0.0.1:${app.server.address().port}`; let cookie, csrf;
  const request = async (path, method = 'GET', body, headers = {}) => {
    const r = await fetch(base + path, { method, headers: { Origin: 'http://localhost',
      ...(cookie ? { Cookie: cookie } : {}), ...(csrf ? { 'X-CSRF-Token': csrf } : {}),
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...headers }, body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined });
    if (r.headers.get('set-cookie')) cookie = r.headers.get('set-cookie').split(';')[0];
    const data = r.headers.get('content-type')?.startsWith('image/') ? Buffer.from(await r.arrayBuffer()) : await r.json(); if (data.csrf) csrf = data.csrf;
    return { status: r.status, data, headers: r.headers };
  };
  assert.equal((await request('/api/amazon/accounts')).status, 401);
  await request('/api/auth/login', 'POST', { email: 'admin@example.test', password: 'initial-password-123456' });
  await request('/api/auth/password', 'POST', { currentPassword: 'initial-password-123456', newPassword: 'updated-password-123456' });
  const start = async () => (await request('/api/amazon/connect/start', 'POST', {})).data;
  const finishBody = pending => ({ connectId: pending.connectId, label: 'Synthetic account', confirm: true,
    url: `https://www.amazon.com/ap/maplanding?serial=${new URL(new URL(pending.link).searchParams.get('openid.return_to')).searchParams.get('serial')}&openid.oa2.authorization_code=synthetic-code` });
  return { app, request, start, finishBody, calls };
}

test('PKCE return is bound to its attempt and rejects alternate destinations or ambiguous codes', () => {
  const a = makeAmazonAttempt(); const link = new URL(amazonSigninLink(a));
  assert.equal(link.searchParams.get('openid.oa2.code_challenge'), createHash('sha256').update(a.verifier).digest('base64url'));
  assert.ok(!link.href.includes(a.verifier));
  const valid = `https://www.amazon.com/ap/maplanding?serial=${a.serial}&serial=&openid.oa2.authorization_code=synthetic-code`;
  assert.equal(parseAmazonReturn(valid, a.serial), 'synthetic-code');
  for (const url of [valid.replace('www.amazon.com', 'attacker.example'), valid + '&openid.oa2.authorization_code=other', valid + '&serial=OTHER', valid.replace(`serial=${a.serial}`, 'serial=OTHER'), valid.replace('https:', 'http:')]) {
    assert.throws(() => parseAmazonReturn(url, a.serial));
  }
});

test('connection requires CSRF, origin and confirmation; encrypts credentials and consumes one-use attempt', async t => {
  const f = await fixture(t);
  assert.equal((await f.request('/api/amazon/connect/start', 'POST', {}, { 'X-CSRF-Token': '' })).status, 403);
  assert.equal((await f.request('/api/amazon/connect/start', 'POST', {}, { Origin: 'https://elsewhere.example' })).status, 403);
  const pending = await f.start(); const body = f.finishBody(pending);
  assert.equal((await f.request('/api/amazon/connect/finish', 'POST', { ...body, confirm: false })).status, 400);
  assert.equal((await f.request('/api/amazon/connect/finish', 'POST', { ...body, url: body.url.replace('serial=', 'other=') })).status, 400);
  const stored = f.app.db.prepare('SELECT verifier FROM amazon_pending').get();
  const result = await f.request('/api/amazon/connect/finish', 'POST', body);
  assert.equal(result.status, 200);
  assert.equal(f.calls[0].url, 'https://api.amazon.com/auth/register');
  assert.equal(f.calls[0].opts.redirect, 'error');
  const registration = JSON.parse(f.calls[0].opts.body);
  assert.notEqual(stored.verifier, registration.auth_data.code_verifier);
  assert.equal(new URL(pending.link).searchParams.get('openid.oa2.code_challenge'), createHash('sha256').update(registration.auth_data.code_verifier).digest('base64url'));
  assert.notEqual(f.app.db.prepare('SELECT token FROM amazon_accounts').get().token, token);
  assert.ok(!JSON.stringify(result).includes(token));
  const listed = await f.request('/api/amazon/accounts');
  assert.equal(listed.data.accounts.length, 1); assert.ok(!JSON.stringify(listed).includes(token));
  assert.equal((await f.request('/api/integrations')).data.amazon.connected, true);
  assert.equal((await f.request('/api/amazon/connect/finish', 'POST', body)).status, 410);
  assert.equal(f.calls.length, 1);
  await f.request(`/api/amazon/accounts/${result.data.account.id}`, 'DELETE', { confirm: true });
  assert.equal((await f.request('/api/amazon/accounts')).data.accounts.length, 0);
});

test('network failure never persists a token or replays the same authorization code', async t => {
  const f = await fixture(t, () => { throw new TypeError('fetch failed', { cause: { code: 'ECONNREFUSED' } }); });
  const p = await f.start(); const body = f.finishBody(p);
  assert.equal((await f.request('/api/amazon/connect/finish', 'POST', body)).data.error, 'amazon_network_econnrefused');
  assert.equal((await f.request('/api/amazon/connect/finish', 'POST', body)).status, 410);
  assert.equal(f.calls.length, 1);
  assert.equal((await f.request('/api/amazon/accounts')).data.accounts.length, 0);
});

test('expired or foreign attempts cannot be used and HTTP success without a token cannot mark connected', async t => {
  const f = await fixture(t, () => Response.json({ success: true }));
  const old = await f.start(); const oldBody = f.finishBody(old);
  const admin = f.app.db.prepare('SELECT password FROM users LIMIT 1').get();
  f.app.db.prepare('INSERT INTO users VALUES(?,?,?,0)').run('other-user', 'other@example.test', admin.password);
  f.app.db.prepare('UPDATE amazon_pending SET user_id=?').run('other-user');
  assert.equal((await f.request('/api/amazon/connect/finish', 'POST', oldBody)).status, 410);
  const expired = await f.start();
  f.app.db.prepare('UPDATE amazon_pending SET expires=0 WHERE id=?').run(expired.connectId);
  assert.equal((await f.request('/api/amazon/connect/finish', 'POST', f.finishBody(expired))).status, 410);
  assert.equal(f.calls.length, 0);
  const current = await f.start();
  assert.equal((await f.request('/api/amazon/connect/finish', 'POST', f.finishBody(current))).data.error, 'amazon_registration_rejected');
  assert.equal((await f.request('/api/integrations')).data.amazon.connected, false);
});

test('onboarding reads stay scoped to the owner and expose no credentials in partial failures', async t => {
  const f = await fixture(t, url => {
    if (url === 'https://api.amazon.com/auth/register') return Response.json({ response: { success: { tokens: { bearer: { refresh_token: token } } } } });
    return Response.json({ privateToken: token }, { status: 403 });
  });
  const pending = await f.start();
  const connected = await f.request('/api/amazon/connect/finish', 'POST', f.finishBody(pending));
  const path = `/api/amazon/accounts/${connected.data.account.id}/onboarding`;
  const result = await f.request(path);
  assert.equal(result.status, 200); assert.equal(result.data.ok, false);
  assert.equal(result.data.sources.length, 2); assert.equal(result.data.profile, null); assert.equal(result.data.onboarding, null);
  assert.ok(!JSON.stringify(result).includes(token));
  const admin = f.app.db.prepare('SELECT password FROM users LIMIT 1').get();
  f.app.db.prepare('INSERT INTO users VALUES(?,?,?,0)').run('other-owner', 'other-owner@example.test', admin.password);
  f.app.db.prepare('UPDATE amazon_accounts SET user_id=?').run('other-owner');
  const callsBefore = f.calls.length;
  assert.equal((await f.request(path)).status, 404);
  assert.equal(f.calls.length, callsBefore);
});

test('document routes enforce owner, confirmation, CSRF, exact multipart fields and distinct license sides before contacting Amazon', async t => {
  const f = await fixture(t); const pending = await f.start();
  const connected = await f.request('/api/amazon/connect/finish', 'POST', f.finishBody(pending));
  const path = `/api/amazon/accounts/${connected.data.account.id}/uploads/license`;
  const form = () => { const body = new FormData(); const file = new Blob([Buffer.from([255,216,255,224,1,2,255,217])], { type: 'image/jpeg' }); body.set('front', file, 'front.jpg'); body.set('back', file, 'back.jpg'); return body; };
  assert.equal((await f.request(path, 'POST', form())).data.error, 'confirmation_required');
  assert.equal((await f.request(path, 'POST', form(), { 'X-Confirm-Operation': 'upload-amazon', 'X-CSRF-Token': '' })).status, 403);
  assert.equal((await f.request(path, 'POST', form(), { 'X-Confirm-Operation': 'upload-amazon' })).data.error, 'duplicate_license_sides');
  const extra = form(); extra.set('accountId', 'foreign');
  assert.equal((await f.request(path, 'POST', extra, { 'X-Confirm-Operation': 'upload-amazon' })).data.error, 'invalid_upload_fields');
  const admin = f.app.db.prepare('SELECT password FROM users LIMIT 1').get();
  f.app.db.prepare('INSERT INTO users VALUES(?,?,?,0)').run('other-document-owner', 'other-document-owner@example.test', admin.password);
  f.app.db.prepare('UPDATE amazon_accounts SET user_id=?').run('other-document-owner');
  assert.equal((await f.request(path, 'POST', form(), { 'X-Confirm-Operation': 'upload-amazon' })).status, 404);
  assert.equal(f.calls.length, 1); // Only the original connection registration.
});

test('document storage is private, CSRF protected, encrypted and does not send saved drafts to Amazon', async t => {
  const f = await fixture(t); const pending = await f.start();
  const connected = await f.request('/api/amazon/connect/finish', 'POST', f.finishBody(pending));
  const base = `/api/amazon/accounts/${connected.data.account.id}/documents`;
  const raw = Buffer.from([255,216,255,224,1,2,255,217]);
  const form = () => { const fd = new FormData(); fd.set('file', new Blob([raw], { type: 'image/jpeg' }), 'private-name.jpg'); return fd; };
  assert.equal((await f.request(base + '/front', 'POST', form(), { 'X-CSRF-Token': '' })).status, 403);
  const saved = await f.request(base + '/front', 'POST', form());
  assert.equal(saved.status, 200); assert.equal(saved.data.documents[0].status, 'local');
  assert.ok(!JSON.stringify(saved.data).includes('private-name'));
  assert.equal(f.calls.length, 1);
  const image = await f.request(base + '/front');
  assert.deepEqual(image.data, raw); assert.equal(image.headers.get('cache-control'), 'no-store');
  const admin = f.app.db.prepare('SELECT password FROM users LIMIT 1').get();
  f.app.db.prepare('INSERT INTO users VALUES(?,?,?,0)').run('other-doc-user', 'other-doc-user@example.test', admin.password);
  f.app.db.prepare('UPDATE amazon_accounts SET user_id=?').run('other-doc-user');
  assert.equal((await f.request(base + '/front')).status, 404);
  assert.equal((await f.request(base + '/front', 'DELETE', {})).status, 404);
});

test('local OCR fills only document fields and form drafts stay private without changing Amazon', async t => {
  let reads = 0;
  const f = await fixture(t, undefined, { ocrRecognize: async () => { reads++; return 'LN TESTER\nFN SYNTHETIC\nMN SAMPLE\nDOB 01/02/1990\nEXP 12/31/2030\nDL NUMBER SYNTH-123\n123 EXAMPLE ST\nSAMPLE CITY, MN 12345'; } });
  const pending = await f.start(); const connected = await f.request('/api/amazon/connect/finish', 'POST', f.finishBody(pending));
  const base = `/api/amazon/accounts/${connected.data.account.id}`;
  const fd = () => { const form = new FormData(); form.set('file', new Blob([Buffer.from([255,216,255,224,1,2,255,217])], { type: 'image/jpeg' }), 'document.jpg'); return form; };
  assert.equal((await f.request(base + '/ocr', 'POST', fd(), { 'X-CSRF-Token': '' })).status, 403);
  const read = await f.request(base + '/ocr', 'POST', fd()); assert.equal(read.status, 200);
  assert.equal(read.data.fields.firstName, 'SYNTHETIC'); assert.equal(read.data.fields.middleName, 'SAMPLE'); assert.equal(reads, 1);
  const saved = await f.request(base + '/form', 'POST', { fields: { firstName: 'CORRECTED', lastName: 'TESTER' } });
  assert.equal(saved.status, 200); assert.equal((await f.request(base + '/form')).data.draft.fields.firstName, 'CORRECTED');
  assert.equal(f.calls.length, 1);
  assert.equal((await f.request(base + '/form', 'POST', { fields: { sessionToken: 'forbidden' } })).status, 400);
  const admin = f.app.db.prepare('SELECT password FROM users LIMIT 1').get();
  f.app.db.prepare('INSERT INTO users VALUES(?,?,?,0)').run('other-ocr-owner','other-ocr-owner@example.test',admin.password);
  f.app.db.prepare('UPDATE amazon_accounts SET user_id=?').run('other-ocr-owner');
  assert.equal((await f.request(base + '/ocr', 'POST', fd())).status, 404);
  assert.equal((await f.request(base + '/form')).status, 404); assert.equal(reads, 1);
});
