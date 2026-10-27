import test from 'node:test';
import assert from 'node:assert/strict';
import { AmazonInsuranceClient } from '../src/amazon-insurance.mjs';
import { insuranceFixture } from './helpers/insurance-fixture.mjs';
import { renderAmazonDetail } from '../public/amazon-detail.mjs';
const signs = f => f.calls.filter(c => c.url.endsWith('/InsuranceAgreement/signed'));
test('insurance presents current terms, signs exact captured payload with fresh CSRF and verifies task', async () => {
  const f = insuranceFixture(), c = new AmazonInsuranceClient(f), review = await c.review('synthetic');
  assert.equal(review.html, f.control.html); assert.equal(signs(f).length, 0);
  const r = await c.accept('synthetic', review.digest);
  assert.equal(r.accepted, true); assert.equal(r.confirmed, true);
  assert.deepEqual(JSON.parse(signs(f)[0].opts.body), { InsuranceAgreement: true });
  assert.equal(signs(f)[0].opts.headers['X-CSRF-Token'], 'synthetic-csrf');
  assert.equal(signs(f)[0].opts.headers['anti-csrftoken-a2z'], 'synthetic-anti');
  assert.ok(!JSON.stringify(r).includes('synthetic-session'));
});
test('changed or unusable terms and unknown eligibility never sign; already complete never signs again', async () => {
  const f = insuranceFixture(), c = new AmazonInsuranceClient(f), r = await c.review('synthetic');
  f.control.html += '<p>Changed</p>'; await assert.rejects(c.accept('synthetic', r.digest), e => e.code === 'insurance_terms_changed');
  for (const html of ['', '<script>bad()</script>', '<img src="https://example.test/a">']) { f.control.html = html; await assert.rejects(c.review('synthetic')); }
  f.control.status = 'Unknown'; await assert.rejects(c.review('synthetic'));
  f.control.status = 'Complete'; assert.equal((await c.accept('synthetic', r.digest)).alreadyComplete, true);
  assert.equal(signs(f).length, 0);
});
test('receipt differs from completion and failed or unexpected submission is never retried', async () => {
  for (const mode of ['pending', 'readback-failed', 'network', 'html', 'rejected']) {
    const f = insuranceFixture(), c = new AmazonInsuranceClient(f), r = await c.review('synthetic'); f.control.mode = mode;
    if (['pending', 'readback-failed'].includes(mode)) { const result = await c.accept('synthetic', r.digest); assert.equal(result.accepted, true); assert.equal(result.confirmed, false); }
    else await assert.rejects(c.accept('synthetic', r.digest));
    assert.equal(signs(f).length, 1);
  }
});
test('account renders an explicit review action and escapes provider receipt text', () => {
  const html = renderAmazonDetail({ account: { id: 'synthetic', label: 'Demo' }, insurance: { notice: '<script>test</script>', status: 'In Progress' } });
  assert.ok(html.includes('data-review-insurance')); assert.ok(html.includes('&lt;script&gt;test&lt;/script&gt;'));
  assert.ok(html.includes('O envio ainda não está conectado à Persona'));
});
