import test from 'node:test';
import assert from 'node:assert/strict';
import { AmazonCookieJar, AmazonReadClient } from '../src/amazon-read.mjs';

const refresh = 'synthetic-refresh-only';
const access = 'synthetic-access-only';
function upstream(log, override) {
  return async (url, options) => {
    log.push({ url, options });
    const custom = await override?.(url, options); if (custom) return custom;
    if (url === 'https://api.amazon.com/auth/token') return Response.json({ access_token: access });
    if (url === 'https://tas-na-extern.amazon.com/person') return Response.json({ person: {
      displayName: 'Synthetic Driver', email: 'driver@example.test', phoneNumber: 'synthetic-phone', token: 'must-not-return', ssn: 'must-not-return' } });
    if (url.endsWith('/ap/exchangetoken/cookies')) return Response.json({ response: { tokens: { cookies: {
      '.amazon.com': [{ Name: 'at-main', Value: 'synthetic-cookie' }] } } } });
    if (url.endsWith('/onboarding/v2/home-menu')) return new Response('portal', { status: 200,
      headers: { 'Set-Cookie': 'portal=synthetic-portal; Path=/; Secure; HttpOnly' } });
    if (url.endsWith('/onboarding/v2/data/onboarding-status')) return Response.json({ workflowStatus: 'IN_PROGRESS',
      taskStatusMap: { BASIC_INFO: 'Complete', TAX_INFO: 'Failed', UNIFIED_IDENTITY_VERIFICATION: 'In Progress' }, vendorDataTextMap: { secret: 'must-not-return' } });
    throw Error('Unexpected destination');
  };
}

test('reads profile and stages through distinct credentials without returning secrets or guessing completion', async () => {
  const log = []; const result = await new AmazonReadClient({ fetchImpl: upstream(log) }).read(refresh);
  assert.equal(result.ok, true);
  assert.equal(result.profile.displayName, 'Synthetic Driver');
  assert.equal(result.onboarding.tasks.find(t => t.key === 'TAX_INFO').status, 'Failed');
  assert.equal(result.onboarding.tasks.find(t => t.key === 'UNIFIED_IDENTITY_VERIFICATION').status, 'In Progress');
  assert.ok(!JSON.stringify(result).match(/synthetic-(?:cookie|portal|access|refresh)|must-not-return/));
  const person = log.find(x => x.url.endsWith('/person'));
  assert.equal(person.options.headers['x-amz-access-token'], access);
  const status = log.find(x => x.url.endsWith('/onboarding-status'));
  assert.equal(status.options.method, undefined);
  assert.match(status.options.headers.Cookie, /at-main=synthetic-cookie/);
  assert.match(status.options.headers.Cookie, /portal=synthetic-portal/);
  assert.equal(status.options.headers['x-amz-access-token'], undefined);
  assert.ok(log.every(c => c.options.redirect === 'manual'));
  assert.equal(log.filter(c => c.options.method === 'POST').length, 2); // Authentication exchanges only.
});

test('cookie jar isolates host-only/domain/path cookies and respects deletion', () => {
  const jar = new AmazonCookieJar();
  jar.set('base', 'test', 'amazon.com');
  jar.update(new Headers({ 'Set-Cookie': 'portal=test; Path=/onboarding; Secure' }), 'https://logistics.amazon.com/onboarding/home');
  assert.match(jar.header('https://logistics.amazon.com/onboarding/data'), /portal=test/);
  assert.ok(!jar.header('https://www.amazon.com/onboarding/data').includes('portal'));
  assert.ok(!jar.header('https://logistics.amazon.com/onboarding-other').includes('portal'));
  assert.equal(jar.header('https://attacker.example/'), '');
  jar.update(new Headers({ 'Set-Cookie': 'portal=gone; Path=/onboarding; Max-Age=0' }), 'https://logistics.amazon.com/onboarding/home');
  assert.ok(!jar.header('https://logistics.amazon.com/onboarding/data').includes('portal'));
  jar.update(new Headers({ 'Set-Cookie': 'stolen=no; Domain=attacker.example; Path=/' }), 'https://logistics.amazon.com/');
  assert.ok(!jar.header('https://attacker.example/').includes('stolen'));
});

test('does not forward cookies to foreign redirect destinations; profile still renders as partial result', async () => {
  const log = []; const result = await new AmazonReadClient({ fetchImpl: upstream(log, url => {
    if (url.endsWith('/home-menu')) return new Response(null, { status: 302, headers: { Location: 'https://attacker.example/' } });
  }) }).read(refresh);
  assert.equal(result.ok, false); assert.ok(result.profile); assert.equal(result.onboarding, null);
  assert.equal(result.sources[1].error, 'amazon_read_sso_redirect');
  assert.ok(!log.some(c => c.url.startsWith('https://attacker.example')));
});

test('HTTP 200 without tasks does not become a successful onboarding reading', async () => {
  const result = await new AmazonReadClient({ fetchImpl: upstream([], url => {
    if (url.endsWith('/onboarding-status')) return Response.json({ workflowStatus: 'IN_PROGRESS' });
  }) }).read(refresh);
  assert.equal(result.ok, false); assert.equal(result.onboarding, null);
  assert.equal(result.sources[1].error, 'amazon_read_missing_tasks');
});

test('untrusted error bodies never reach the user and unauthorized profile does not hide valid stages', async () => {
  const result = await new AmazonReadClient({ fetchImpl: upstream([], url => {
    if (url.endsWith('/person')) return Response.json({ secret: refresh }, { status: 403 });
  }) }).read(refresh);
  assert.equal(result.profile, null); assert.ok(result.onboarding);
  assert.equal(result.sources[0].error, 'amazon_read_http_403');
  assert.ok(!JSON.stringify(result).includes(refresh));
});
