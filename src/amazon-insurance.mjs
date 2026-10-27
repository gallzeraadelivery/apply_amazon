import { createHash } from 'node:crypto';
import { AmazonUploadClient } from './amazon-upload.mjs';
import { HttpError } from './apex.mjs';

const origin = 'https://logistics.amazon.com';
const agreementPath = '/onboarding/v2/data/agreement/InsuranceAgreement';
const complete = status => status === 'Complete';
export class AmazonInsuranceClient extends AmazonUploadClient {
  async state(jar, signal) {
    const data = await this.webJson('/onboarding/v2/data/onboarding-status', jar, signal);
    const status = data.taskStatusMap?.COMMERCIAL_INSURANCE;
    if (!['Not Started', 'In Progress', 'Complete'].includes(status)) throw new HttpError(424, 'insurance_unavailable', 'A Amazon não retornou uma etapa de seguro reconhecida. Continue pelo aplicativo oficial.');
    return { status, confirmed: complete(status) };
  }
  async document(jar, signal) {
    const data = await this.webJson(agreementPath, jar, signal);
    const html = data.agreementDocumentContent;
    if (typeof html !== 'string' || !html.trim() || html.length > 500000 || /<(?:script|iframe|object|embed|form|img|svg|math)\b/i.test(html)) throw new HttpError(424, 'insurance_terms_unavailable', 'Não foi possível apresentar os termos completos com segurança. Continue pelo aplicativo oficial.');
    return { html, digest: createHash('sha256').update(html, 'utf8').digest('hex') };
  }
  async review(refresh) {
    const signal = AbortSignal.timeout(this.timeout), jar = await this.webSession(refresh, signal);
    const state = await this.state(jar, signal);
    if (state.confirmed) return { ...state, alreadyComplete: true };
    return { ...state, ...await this.document(jar, signal) };
  }
  async accept(refresh, digest) {
    const signal = AbortSignal.timeout(this.timeout), jar = await this.webSession(refresh, signal);
    const before = await this.state(jar, signal);
    if (before.confirmed) return { accepted: false, confirmed: true, alreadyComplete: true, status: before.status, notice: 'A Amazon já informa o seguro concluído. Nenhum novo aceite foi enviado.' };
    const terms = await this.document(jar, signal);
    if (terms.digest !== digest) throw new HttpError(409, 'insurance_terms_changed', 'Os termos mudaram. Carregue e revise a versão atual antes de aceitar. Nenhum aceite foi enviado.');
    const headers = await this.headers(jar, signal), url = origin + agreementPath + '/signed';
    headers.Cookie = jar.header(url);
    const response = await this.request(url, { method: 'POST', headers, body: JSON.stringify({ InsuranceAgreement: true }) }, 'insurance-sign', signal);
    jar.update(response.headers, url);
    // Captured contract: HTTP 200 with an empty body. Never infer success from HTML or other responses.
    let size = 0;
    for await (const chunk of response.body ?? []) { size += chunk.length; if (size > 4096) { await response.body?.cancel().catch(() => {}); break; } }
    if (response.status !== 200 || size !== 0 || /text\/html/i.test(response.headers.get('content-type') || '')) throw new HttpError(424, 'insurance_acceptance_unconfirmed', 'A resposta não confirmou o aceite. Consulte a etapa antes de tentar novamente. Não houve repetição automática.');
    let state = null;
    try { state = await this.state(jar, signal); } catch { /* Accepted receipt differs from confirmed task state. */ }
    return { accepted: true, confirmed: state?.confirmed === true, status: state?.status ?? null, notice: state?.confirmed ? 'Aceite recebido e etapa de seguro confirmada como concluída pela Amazon.' : 'Aceite recebido pela Amazon, mas a conclusão da etapa ainda não foi confirmada. Consulte antes de repetir.' };
  }
}
