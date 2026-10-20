// Read-only projection for the account detail. Never authorize an application
// action or write confirmation states from this module.
const finished = new Set(['complete', 'pending_review', 'review']);
const attention = new Set(['action_required', 'blocked', 'failed', 'error', 'consider']);
const rowOf = value => typeof value === 'string' ? { status: value } : value || {};
const at = value => Date.parse(value || '') || 0;
const clock = value => Math.max(at(value?.updated_at), at(value?.finished_at), at(value?.started_at));
const groupKey = key => ['tax_interview', 'payment_information'].includes(key) ? 'getting_paid' : key;

export function buildDetailProgress({ keys = [], confirmed = {}, run = null, attempts = [], requesting = false, readError = false, now = Date.now() } = {}) {
  const ordered = [...attempts].sort((a,b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
  const active = ['running', 'queued'].includes(run?.status);
  const executing = run?.status === 'running' ? ordered.find(step => step.status === 'running') : null;
  const waiting = active && run?.status === 'queued' && run?.wait_reason === 'amazon';
  const next = active ? ordered.find(step => step.status === 'queued') : null;
  const currentKey = groupKey(executing?.step_key || (waiting ? run?.current_step : next?.step_key) || '');
  const phase = requesting ? 'requesting' : executing ? 'running' : waiting ? 'waiting' : active ? 'queued' : 'idle';
  const rows = keys.map(key => {
    const source = rowOf(confirmed[key]);
    const sourceStatus = String(source.status || '');
    const members = ordered.filter(step => groupKey(step.step_key) === key);
    const latestAt = Math.max(0,...members.map(clock));
    const sourceAt = clock(source);
    const hasBothPaymentParts = key !== 'getting_paid' || members.some(s => s.step_key === 'getting_paid')
      || ['tax_interview','payment_information'].every(part => members.some(s => s.step_key === part));
    const submitted = hasBothPaymentParts && members.length > 0 && members.every(step => finished.has(step.status));
    const newerAttempt = submitted && latestAt > sourceAt;
    let state = sourceStatus === 'complete' ? 'complete'
      : ['pending_review','review','in_progress'].includes(sourceStatus) ? 'review'
      : attention.has(sourceStatus) ? 'attention'
      : sourceStatus === 'pending' ? 'pending'
      : 'unknown';
    let note = null;
    if (!requesting && phase === 'running' && currentKey === key) {
      state = 'running';
      if (attention.has(sourceStatus)) note = 'previousAttention';
    } else if (!requesting && phase === 'waiting' && currentKey === key) {
      state = 'waiting';
      if (attention.has(sourceStatus)) note = 'previousAttention';
    } else if (newerAttempt && !['complete','pending_review','review'].includes(sourceStatus)) {
      // Execution success is not independent proof of Amazon approval.
      state = 'submitted';
      note = attention.has(sourceStatus) ? 'previousAttention' : 'confirming';
    } else if (newerAttempt && sourceStatus === 'complete' && members.some(step => step.status !== 'complete')) {
      state = 'submitted';
      note = 'confirming';
    } else if (state === 'unknown' || (state === 'pending' && active && members.some(step => step.status === 'queued'))) {
      state = active && members.some(step => step.status === 'queued') ? 'upcoming' : sourceStatus === 'queued' ? 'upcoming' : 'unknown';
    }
    return { key, state, sourceStatus, note, sourceAt, attemptAt: latestAt, current: currentKey === key && ['running','waiting'].includes(phase) };
  });
  const completeCount = rows.filter(row => row.state === 'complete').length;
  const reviewCount = rows.filter(row => ['review','submitted'].includes(row.state)).length;
  const attentionRow = rows.find(row => row.state === 'attention');
  const fallback = attentionRow || rows.find(row => ['review','submitted','pending','unknown'].includes(row.state)) || rows.at(-1);
  return {
    rows, phase, active, currentKey: currentKey || fallback?.key || null,
    completeCount, reviewCount, total: rows.length,
    percent: rows.length ? Math.round(100 * completeCount / rows.length) : 0,
    nextAttemptAt: waiting && at(run?.next_attempt_at) ? run.next_attempt_at : null,
    retryDue: waiting && at(run?.next_attempt_at) <= now,
    readError: Boolean(readError)
  };
}

const words = {
  'pt-BR': {
    requesting: 'Solicitando início…', queued: 'Aplicação na fila', running: 'Em execução',
    waiting: 'Aguardando liberação da Amazon', retryDue: 'Aguardando nova checagem',
    upcoming: 'Aguardando sua vez', next: 'Próxima etapa', submitted: 'Envio concluído',
    confirming: 'Aguardando confirmação da Amazon', previousAttention: 'A última confirmação ainda pede atenção.',
    updated: 'Ficha atualizada às {time}', unavailable: 'Atualização temporariamente indisponível. Última informação preservada.',
    scheduled: 'Nova checagem prevista para {time}', current: 'Agora: {step}',
    sendingSelfie: 'Enviando selfie…', confirmed: 'CONFIRMADO',
    summary: '{done} de {total} etapas confirmadas', reviews: '{count} aguardando confirmação ou análise',
    preparing: 'Preparando a próxima etapa', latest: 'Última confirmação'
  },
  'en-US': {
    requesting: 'Requesting start…', queued: 'Application queued', running: 'Running',
    waiting: 'Waiting for Amazon to release this step', retryDue: 'Waiting for the next check',
    upcoming: 'Waiting its turn', next: 'Next step', submitted: 'Submission completed',
    confirming: 'Waiting for Amazon confirmation', previousAttention: 'The last confirmation still requires attention.',
    updated: 'View updated at {time}', unavailable: 'Updates temporarily unavailable. Last information preserved.',
    scheduled: 'Next check scheduled for {time}', current: 'Now: {step}',
    sendingSelfie: 'Sending selfie…', confirmed: 'CONFIRMED',
    summary: '{done} of {total} steps confirmed', reviews: '{count} awaiting confirmation or review',
    preparing: 'Preparing the next step', latest: 'Last confirmation'
  },
  'es-CO': {
    requesting: 'Solicitando inicio…', queued: 'Solicitud en cola', running: 'En ejecución',
    waiting: 'Esperando que Amazon habilite la etapa', retryDue: 'Esperando la próxima revisión',
    upcoming: 'Esperando su turno', next: 'Próxima etapa', submitted: 'Envío completado',
    confirming: 'Esperando confirmación de Amazon', previousAttention: 'La última confirmación todavía requiere atención.',
    updated: 'Vista actualizada a las {time}', unavailable: 'Actualización temporalmente no disponible. Se conserva la última información.',
    scheduled: 'Próxima revisión prevista para las {time}', current: 'Ahora: {step}',
    sendingSelfie: 'Enviando selfie…', confirmed: 'CONFIRMADO',
    summary: '{done} de {total} etapas confirmadas', reviews: '{count} esperando confirmación o análisis',
    preparing: 'Preparando la próxima etapa', latest: 'Última confirmación'
  }
};
export function detailProgressCopy(locale, key, values = {}) {
  let text = (words[locale] || words['pt-BR'])[key] || words['pt-BR'][key] || key;
  for (const [name,value] of Object.entries(values)) text = text.replaceAll(`{${name}}`,String(value));
  return text;
}
