import test from 'node:test';
import assert from 'node:assert/strict';
import { AmazonUploadClient, trustedStorageUrl, validateUploadImage } from '../src/amazon-upload.mjs';

const image = () => new Blob([Buffer.from([255, 216, 255, 224, 1, 2, 255, 217])], { type: 'image/jpeg' });
const inquiryId = 'inq_synthetic';
function fixture(override) {
  const calls = [];
  const client = new AmazonUploadClient({ fetchImpl: async (url, opts) => {
    calls.push({ url, opts }); const custom = await override?.(url, opts); if (custom) return custom;
    if (url.endsWith('/ap/exchangetoken/cookies')) return Response.json({ response: { tokens: { cookies: { '.amazon.com': [{ Name: 'session', Value: 'synthetic-cookie' }] } } } });
    if (url.endsWith('/home-menu')) return new Response('portal');
    if (url.endsWith('/csrf-token')) return Response.json({ token: 'synthetic-csrf' });
    if (url.endsWith('/get-csrf-token')) return new Response('{}', { headers: { 'anti-csrftoken-a2z': 'synthetic-anti' } });
    if (url.endsWith('/task-state')) return Response.json({ isEligibleForAction: true });
    if (url.endsWith('/identity-verification/session')) return Response.json({ vendor: 'persona', sessionId: inquiryId, sessionToken: 'synthetic-persona' });
    if (url.endsWith(`/inquiries/${inquiryId}`)) return Response.json({ data: { id: inquiryId, attributes: { status: 'pending', 'next-step': { name: 'government_id', type: 'government_id' } } } });
    if (url.endsWith('/transition')) return Response.json({ data: { id: inquiryId, attributes: { status: 'pending' } } });
    if (url.endsWith('/get-photo-upload-url')) return Response.json({ success: true, data: 'https://bucket.s3.us-east-1.amazonaws.com/synthetic?signature=private' });
    if (url.startsWith('https://bucket.s3.us-east-1.amazonaws.com/')) return new Response(null, { status: 200 });
    if (url.includes('/complete-photo-upload?')) return Response.json({ success: true });
    throw Error('Unexpected request');
  } });
  return { client, calls };
}

test('validates file types, sizes and signatures and confines signed uploads to S3', async () => {
  assert.equal((await validateUploadImage(image())).type, 'image/jpeg');
  for (const file of [new Blob(['not an image'], { type: 'image/jpeg' }), new Blob(['pdf'], { type: 'application/pdf' }), new Blob([], { type: 'image/png' })]) {
    await assert.rejects(validateUploadImage(file));
  }
  assert.equal(trustedStorageUrl('https://bucket.s3.us-east-1.amazonaws.com/file?signature=private'), true);
  for (const url of ['https://evil.example/file', 'http://bucket.s3.amazonaws.com/file', 'https://s3.amazonaws.com.evil.example/file', 'https://user@s3.amazonaws.com/file']) assert.equal(trustedStorageUrl(url), false);
});

test('license upload honors eligibility, sends two real files and never sends completion/liveness callbacks', async () => {
  const f = fixture(); const result = await f.client.uploadLicense('synthetic-refresh', image(), image());
  assert.equal(result.transferred, true); assert.ok(!JSON.stringify(result).includes('synthetic-persona'));
  const sent = f.calls.find(c => c.url.endsWith('/transition'));
  const files = sent.opts.body.getAll('data[attributes][fields][current_government_id][files][][frames][]');
  assert.equal(files.length, 2);
  assert.equal(sent.opts.body.get('data[attributes][fields][current_government_id][files][][capture_method]'), 'upload');
  assert.equal(sent.opts.headers.Cookie, undefined);
  assert.ok(!f.calls.some(c => c.url.includes('sdk-callback') || c.url.includes('selfie')));
});

test('blocked identity or selfie step never receives static document images', async () => {
  const f = fixture(url => url.endsWith('/task-state') ? Response.json({ isEligibleForAction: false }) : null);
  await assert.rejects(f.client.uploadLicense('synthetic', image(), image()), e => e.code === 'amazon_identity_not_ready');
  assert.ok(!f.calls.some(c => c.url.endsWith('/identity-verification/session') || c.url.includes('withpersona.com')));
  const g = fixture(url => url.endsWith(`/inquiries/${inquiryId}`) ? Response.json({ data: { attributes: { 'next-step': { name: 'selfie', type: 'selfie' } } } }) : null);
  await assert.rejects(g.client.uploadLicense('synthetic', image(), image()), e => e.code === 'persona_document_step_unavailable');
  assert.ok(!g.calls.some(c => c.url.endsWith('/transition')));
});

test('profile photo uses raw PUT without Amazon credentials and requires association confirmation', async () => {
  const f = fixture(); assert.equal((await f.client.uploadProfile('synthetic', image())).transferred, true);
  const put = f.calls.find(c => c.opts.method === 'PUT');
  assert.equal(put.opts.headers.Cookie, undefined); assert.equal(put.opts.headers.Authorization, undefined);
  const g = fixture(url => url.includes('/complete-photo-upload?') ? Response.json({ success: false }) : null);
  await assert.rejects(g.client.uploadProfile('synthetic', image()), e => e.code === 'amazon_photo_not_confirmed');
});

test('upload failures are never retried and a generic HTTP 200 is not a document receipt', async () => {
  const f = fixture(url => url.endsWith('/transition') ? new Response('failed', { status: 502 }) : null);
  await assert.rejects(f.client.uploadLicense('synthetic', image(), image()));
  assert.equal(f.calls.filter(c => c.url.endsWith('/transition')).length, 1);
  const g = fixture(url => url.endsWith('/transition') ? Response.json({}) : null);
  await assert.rejects(g.client.uploadLicense('synthetic', image(), image()), e => e.code === 'persona_upload_not_confirmed');
});
