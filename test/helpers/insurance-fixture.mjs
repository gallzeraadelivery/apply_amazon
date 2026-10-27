export function insuranceFixture() {
  const calls = [], control = { html: '<h2>Sample insurance terms</h2><p>Review this synthetic agreement.</p>', signed: false, status: 'Not Started', mode: 'normal' };
  const fetchImpl = async (url, opts = {}) => {
    calls.push({ url, opts });
    if (url.endsWith('/ap/exchangetoken/cookies')) return Response.json({ response: { tokens: { cookies: { '.amazon.com': [{ Name: 'session', Value: 'synthetic-session' }] } } } });
    if (url.endsWith('/home-menu')) return new Response('portal');
    if (url.endsWith('/onboarding-status')) { if (control.mode === 'readback-failed' && control.signed) throw Error('synthetic'); return Response.json({ taskStatusMap: { COMMERCIAL_INSURANCE: control.signed && control.mode !== 'pending' ? 'Complete' : control.status } }); }
    if (url.endsWith('/agreement/InsuranceAgreement')) return Response.json({ agreementDocumentContent: control.html });
    if (url.endsWith('/csrf-token')) return Response.json({ token: 'synthetic-csrf' });
    if (url.endsWith('/get-csrf-token')) return new Response('{}', { headers: { 'anti-csrftoken-a2z': 'synthetic-anti' } });
    if (url.endsWith('/InsuranceAgreement/signed')) {
      if (control.mode === 'network') throw Error('synthetic');
      control.signed = true;
      if (control.mode === 'html') return new Response('<html>login</html>', { headers: { 'content-type': 'text/html' } });
      if (control.mode === 'rejected') return Response.json({ success: false });
      return new Response(null, { status: 200 });
    }
    if (url.endsWith('/auth/register')) return Response.json({ response: { success: { tokens: { bearer: { refresh_token: 'synthetic-refresh' } } } } });
    throw Error('unexpected fixture path');
  };
  return { fetchImpl, calls, control };
}
