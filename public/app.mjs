const root = document.querySelector('#app');
const toastNode = document.querySelector('#toast');
const state = { user: null, csrf: '', page: 'amazon', amazonAccounts: [], amazonPending: null, integration: null, accounts: [], account: null, credits: null, run: null, audit: [], search: '', loaded: false, accountLoaded: false, error: '', busy: false };
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const date = v => v ? new Date(v).toLocaleString('pt-BR') : '—';
const labels = { basic_info: 'Dados pessoais', legal_documents: 'Acordos e termos', id_verification: 'Documento de identidade', id_selfie: 'Selfie e identidade', background_check: 'Antecedentes', auto_insurance: 'Seguro', tax_interview: 'Entrevista fiscal', payment_information: 'Dados de pagamento', videos: 'Treinamento' };
const statusLabels = { queued: 'Na fila', pending: 'Pendente', running: 'Em execução', complete: 'Concluído', completed: 'Concluído', failed: 'Falhou', pending_review: 'Em análise', review: 'Em análise', error: 'Erro', action_required: 'Ação necessária', IN_PROGRESS: 'Em andamento' };
const tag = (value, tone = '') => `<span class="tag ${tone}">${esc(statusLabels[value] || value || 'Não informado')}</span>`;
let toastTimer;
function toast(message) { clearTimeout(toastTimer); toastNode.textContent = message; toastNode.hidden = false; toastTimer = setTimeout(() => { toastNode.hidden = true; }, 10000); }
async function api(path, options = {}) {
  const headers = { ...(options.headers ?? {}) };
  if (options.body && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  if (state.csrf) headers['X-CSRF-Token'] = state.csrf;
  const response = await fetch(path, { ...options, headers, credentials: 'same-origin', body: options.body instanceof FormData ? options.body : options.body ? JSON.stringify(options.body) : undefined });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401 && state.user) { state.user = null; state.csrf = ''; state.accounts = []; state.amazonAccounts = []; state.amazonPending = null; state.account = null; render(); }
    throw new Error(data.message || 'Não foi possível concluir a solicitação.');
  }
  return data;
}
async function work(task) {
  if (state.busy) return;
  state.busy = true; document.body.classList.add('busy');
  document.querySelectorAll('button').forEach(b => { if (!b.disabled) { b.disabled = true; b.dataset.busyDisabled = '1'; } });
  try { await task(); } catch (error) { toast(error.message); }
  finally { state.busy = false; document.body.classList.remove('busy'); document.querySelectorAll('[data-busy-disabled]').forEach(b => { b.disabled = false; delete b.dataset.busyDisabled; }); }
}
function confirmation(title, message, button = 'Confirmar') {
  return new Promise(resolve => {
    const dialog = document.createElement('dialog'); dialog.className = 'confirm-dialog';
    dialog.innerHTML = `<div class="eyebrow">Confirmação de operação</div><h2>${esc(title)}</h2><p>${esc(message)}</p><div class="form-actions"><button class="btn" data-cancel>Cancelar</button><button class="btn primary" data-confirm>${esc(button)}</button></div>`;
    let accepted = false;
    dialog.querySelector('[data-confirm]').onclick = () => { accepted = true; dialog.close(); };
    dialog.querySelector('[data-cancel]').onclick = () => dialog.close();
    dialog.addEventListener('close', () => { dialog.remove(); resolve(accepted); });
    document.body.append(dialog); dialog.showModal();
  });
}
const wordmark = `<div class="wordmark"><span class="brandmark">G</span><div>gd<span>apply</span></div></div>`;
function authView(change = false) {
  return `<div class="auth"><section class="auth-story">${wordmark}<div><div class="eyebrow">OPERAÇÕES · AMAZON FLEX</div><h1>Um espaço para<br>cada etapa.</h1><p>Contas, documentos e acompanhamento em uma visão clara. Conecte sua conta Amazon para iniciar sua operação neste servidor.</p></div><footer class="small muted">GD APPS / APPLY WORKSPACE</footer></section><section class="auth-form-wrap"><form class="auth-form" id="${change ? 'password-form' : 'login-form'}"><div class="eyebrow">${change ? 'Primeiro acesso' : 'Seu espaço de trabalho'}</div><h2>${change ? 'Defina sua senha' : 'Bem-vindo de volta'}</h2><p class="muted">${change ? 'Troque a senha inicial antes de conectar suas integrações. Use pelo menos 14 caracteres.' : 'Entre com a conta administrativa do GD Apply.'}</p>${change ? `<label class="field">Senha atual<input name="currentPassword" type="password" autocomplete="current-password" required maxlength="200"></label><label class="field">Nova senha<input name="newPassword" type="password" autocomplete="new-password" required minlength="14" maxlength="200"></label>` : `<label class="field">E-mail<input name="email" type="email" placeholder="voce@empresa.com" autocomplete="username" required></label><label class="field">Senha<input name="password" type="password" autocomplete="current-password" placeholder="Sua senha" required maxlength="200"></label>`}<button class="btn primary wide" type="submit">${change ? 'Salvar nova senha' : 'Entrar no painel'} <span aria-hidden="true">→</span></button><div class="divider-note">${change ? 'Outras sessões serão encerradas após a troca.' : 'Sua senha Amazon é informada somente na página de login da Amazon.'}</div></form></section></div>`;
}
const navItems = [['amazon', 'a', 'Amazon direta'], ['overview', '◫', 'Visão geral Apex'], ['accounts', '▤', 'Contas Apex'], ['integrations', '⌘', 'Integrações'], ['audit', '≡', 'Atividade']];
function layout(content) {
  const pageName = state.page === 'detail' ? 'Detalhes da conta' : navItems.find(n => n[0] === state.page)?.[2];
  return `<div class="shell"><aside class="sidebar">${wordmark}<p class="navlabel">WORKSPACE</p><nav class="nav" aria-label="Principal">${navItems.map(([id, icon, name]) => `<button data-page="${id}" class="${state.page === id || (id === 'accounts' && state.page === 'detail') ? 'active' : ''}" ${state.page === id ? 'aria-current="page"' : ''}><span class="symbol" aria-hidden="true">${icon}</span>${name}</button>`).join('')}</nav><div class="sidebar-foot"><p class="small">${esc(state.user.email)}</p><p class="small muted">Administrador</p><button data-logout>Sair da conta ↗</button></div></aside><div class="workspace"><header class="topbar"><span class="breadcrumbs">Workspace &nbsp;/&nbsp; ${esc(pageName)}</span><div class="topbar-right">${tag(state.integration?.apex.connected ? 'Apex conectada' : 'Conexão pendente', state.integration?.apex.connected ? '' : 'neutral')}<button class="btn" data-logout aria-label="Sair">Sair</button><span class="avatar">GD</span></div></header><main class="content">${content}<p class="footer-note">GD Apply · ${esc(new Date().getFullYear())} &nbsp; / &nbsp; Dados consultados pela sua conexão Apex. Estados externos dependem da confirmação do provedor.</p></main></div></div>`;
}
const head = (title, subtitle, action = '') => `<div class="pagehead"><div><div class="eyebrow">OPERAÇÕES / APPLY</div><h1>${esc(title)}</h1><p class="muted">${esc(subtitle)}</p></div>${action}</div>`;
const empty = (title, text, action = '') => `<div class="empty"><div class="empty-icon" aria-hidden="true">▤</div><h3>${esc(title)}</h3><p class="muted">${esc(text)}</p>${action}</div>`;
const connectButton = `<button class="btn primary" data-page="integrations">Conectar Apex →</button>`;
function accountsTable(short = false) {
  if (!state.integration?.apex.connected) return empty('Conecte sua operação', 'Suas contas reais aparecerão aqui depois que você conectar sua conta Apex.', connectButton);
  if (!state.loaded) return empty('Dados ainda não consultados', 'Consulte a Apex para carregar as contas.', `<button class="btn" data-refresh>Consultar contas</button>`);
  const list = state.accounts.filter(a => `${a.amazon_label ?? ''} ${a.email ?? ''}`.toLowerCase().includes(state.search.toLowerCase()));
  if (!list.length) return empty(state.search ? 'Nenhuma conta corresponde à busca' : 'Nenhuma conta retornada', state.search ? 'Tente outro nome ou e-mail.' : 'A Apex não retornou contas para esta sessão.');
  return `<div class="table-wrap"><table><thead><tr><th>Conta</th><th>Região</th><th>Estado informado</th><th>Última execução</th><th></th></tr></thead><tbody>${(short ? list.slice(0, 6) : list).map(a => { const run = latestRun(a); return `<tr><td><strong>${esc(a.amazon_label || a.last_known_status?.current_name || 'Sem referência')}</strong><span class="muted">${esc(a.email || a.id)}</span></td><td>${esc(a.last_known_status?.region || '—')}</td><td>${tag(a.last_known_status?.status || a.status || 'Consultar detalhes', 'neutral')}</td><td>${run ? tag(run.status, ['failed', 'error'].includes(run.status) ? 'warning' : 'neutral') : '—'}</td><td><button class="btn" data-account="${esc(a.id)}">Abrir ↗</button></td></tr>`; }).join('')}</tbody></table></div>`;
}
function overview() {
  const connected = state.integration?.apex.connected;
  const credit = state.credits?.balance ?? state.credits?.credits ?? state.credits?.available ?? null;
  const displayCredit = typeof credit === 'number' || typeof credit === 'string' ? credit : '—';
  return head('Sua operação, em perspectiva.', 'Acompanhe contas e integrações a partir de um único lugar.', `<button class="btn" data-refresh ${!connected ? 'disabled' : ''}>↻ Atualizar</button>`)
    + (!connected ? `<div class="callout"><div><strong>Seu workspace está pronto para conectar.</strong><p>Conecte a conta Apex para consultar contas, documentos e execuções reais.</p></div>${connectButton}</div>` : '')
    + `<div class="metrics"><article class="metric"><div class="label">Contas retornadas <span>▤</span></div><strong>${state.loaded ? state.accounts.length : '—'}</strong><p>${state.loaded ? 'Na última consulta à Apex' : 'Aguardando consulta à Apex'}</p></article><article class="metric"><div class="label">Créditos Apex <span>↗</span></div><strong>${esc(displayCredit)}</strong><p>Saldo informado pela integração</p></article><article class="metric"><div class="label">Conexão Amazon <span>⌘</span></div><strong>Não ativa</strong><p>Acesso autorizado ainda não configurado</p></article></div><section class="panel"><div class="panelhead"><h2>Contas da operação</h2><button class="btn" data-page="accounts">Ver todas →</button></div>${accountsTable(true)}</section><div class="grid2"><section><div class="eyebrow">FLUXO DE TRABALHO</div><h2>Da conta ao acompanhamento.</h2><p class="muted">Consulte a conta, confira os dados, envie os documentos e acompanhe o estado retornado pela Apex. Cada alteração exige sua confirmação.</p></section><section class="panel"><div class="panelbody"><div class="eyebrow">ESTADO DAS INTEGRAÇÕES</div><div class="step"><span>Apex · API real</span>${tag(connected ? 'Conectada' : 'Aguardando conexão', connected ? '' : 'neutral')}</div><div class="step"><span>Amazon · conexão direta</span>${tag('Não configurada', 'warning')}</div><p class="status-line">Nenhuma operação Amazon é simulada ou marcada como concluída pelo painel.</p></div></section></div>`;
}
function accountsPage() {
  return head('Contas', 'Consulte os cadastros e acompanhe cada aplicação.', `<button class="btn primary" data-refresh ${!state.integration?.apex.connected ? 'disabled' : ''}>↻ Atualizar contas</button>`)
    + `<section class="panel"><div class="toolbar"><input id="account-search" type="search" aria-label="Buscar por nome ou e-mail" placeholder="Buscar por nome ou e-mail" value="${esc(state.search)}"></div><div id="account-table">${accountsTable()}</div></section>`;
}
function integrationsPage() {
  const connected = state.integration?.apex.connected;
  return head('Integrações', 'Conecte os serviços que sustentam sua operação.') + `<div class="grid2"><section class="panel"><div class="panelbody"><div class="connection-head"><div class="connection-title"><div class="connection-mark">A</div><div><h3>Apex</h3><p>apply.apexbot.app</p></div></div>${tag(connected ? 'Conectada' : 'Não conectada', connected ? '' : 'neutral')}</div><p class="integration-note">Conexão real com sua conta. A senha é enviada à Apex para autenticação e não é armazenada pelo GD Apply. O token fica criptografado no servidor.</p>${connected ? `<div class="notice">Conectada como ${esc(state.integration.apex.email)}<br>Desde ${esc(date(state.integration.apex.connected_at))}</div><button class="btn danger" data-disconnect>Desconectar conta Apex</button>` : `<form id="apex-form" class="stack"><label class="field">E-mail da sua conta Apex<input name="email" type="email" autocomplete="off" required></label><label class="field">Senha da Apex<input name="password" type="password" autocomplete="off" required maxlength="200"></label><button class="btn primary" type="submit">Conectar minha conta →</button></form>`}</div></section><section class="panel"><div class="panelbody"><div class="connection-head"><div class="connection-title"><div class="connection-mark">a</div><div><h3>Amazon Flex</h3><p>Integração direta</p></div></div>${tag(state.integration?.amazon.connected ? 'Conexão salva' : 'Pronta para conectar', 'neutral')}</div><p class="integration-note">Conecte sua conta pelo login oficial da Amazon e salve o retorno neste servidor.</p><button class="btn primary" data-page="amazon">Conectar Amazon →</button><div class="notice">Nenhuma sessão dos HARs é reutilizada. Envio direto de dados, documentos, selfie, antecedentes ou informações fiscais para a Amazon permanece indisponível.</div><p class="muted small">Você pode operar a integração Apex conectada e acompanhar o que ela informa. A conexão direta Amazon está disponível na aba Amazon direta.</p></div></section></div><section class="panel"><div class="panelhead"><h2>Segurança do workspace</h2></div><div class="panelbody"><form id="password-settings-form"><div class="form-grid"><label class="field">Senha atual<input name="currentPassword" type="password" autocomplete="current-password" required maxlength="200"></label><label class="field">Nova senha<input name="newPassword" type="password" autocomplete="new-password" required minlength="14" maxlength="200"><small>Mínimo de 14 caracteres.</small></label></div><div class="form-actions"><button class="btn" type="submit">Alterar senha do painel</button></div></form></div></section>`;
}
function latestRun(account) { return [...(account?.apply_runs ?? [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]; }
function detailPage() {
  const account = state.account;
  if (!account) return head('Conta', 'Selecione uma conta para consultar seus detalhes.') + empty('Nenhuma conta selecionada', 'Volte à lista de contas.', `<button class="btn" data-page="accounts">Ver contas</button>`);
  const basic = account.last_known_status?.application_data?.basic_info ?? {};
  const dl = account.last_known_status?.application_data?.driver_license ?? {};
  const fields = [['firstName', 'Nome'], ['middleName', 'Nome do meio'], ['lastName', 'Sobrenome'], ['phoneNumber', 'Telefone'], ['address', 'Endereço'], ['city', 'Cidade'], ['state', 'Estado / UF'], ['postalCode', 'CEP / ZIP'], ['dateOfBirth', 'Data de nascimento'], ['driversLicenseNumber', 'Número do documento'], ['driverLicenseExpirationDate', 'Validade do documento']];
  const run = state.run?.run ?? latestRun(account);
  const steps = state.run?.steps ?? [];
  return `<div class="account-back"><button class="btn" data-page="accounts">← Voltar às contas</button></div>` + head(account.amazon_label || account.last_known_status?.current_name || 'Detalhes da conta', account.email || account.id, `<button class="btn" data-open-current>↻ Consultar novamente</button>`)
    + `<div class="notice">As ações abaixo enviam dados reais para a conta selecionada na Apex. Uma resposta HTTP de sucesso não comprova conclusão no Amazon Flex.</div><div class="grid2"><section class="panel"><div class="panelhead"><h2>Dados cadastrais</h2>${tag('Apex', 'neutral')}</div><div class="panelbody"><form id="application-form"><div class="form-grid">${fields.map(([key, name]) => `<label class="field">${name}<input name="${key}" value="${esc(basic[key] ?? dl[key] ?? '')}" maxlength="500" autocomplete="off"></label>`).join('')}</div><div class="form-actions"><button class="btn primary" type="submit">Salvar dados na Apex</button><p class="muted">Confira os dados reais do titular antes de enviar.</p></div></form></div></section><div><section class="panel"><div class="panelhead"><h2>Acompanhamento</h2>${tag(run?.status || 'Sem execução', 'neutral')}</div><div class="panelbody">${run ? `<p class="small muted">Execução <span class="endpoint">${esc(run.id)}</span></p>${steps.length ? `<div class="timeline">${steps.map(s => `<div class="step"><span>${esc(labels[s.step_key] || s.step_key)}</span>${tag(s.status, ['failed', 'error'].includes(s.status) ? 'warning' : 'neutral')}</div>`).join('')}</div>` : `<p class="muted">Consulte a execução para carregar as etapas.</p>`}<button class="btn" data-poll-run="${esc(run.id)}">↻ Consultar execução</button>` : '<p class="muted">Nenhuma execução foi informada para esta conta.</p>'}<div class="form-actions"><button class="btn primary" data-start>Iniciar execução na Apex</button><p class="muted">Pode iniciar trabalho e consumir créditos. Dados do formulário devem ser salvos antes.</p></div></div></section><section class="panel"><div class="panelhead"><h2>Documentos</h2></div><div class="panelbody">${[['dlFront', 'Frente do documento'], ['dlBack', 'Verso do documento'], ['profilePhoto', 'Foto do titular']].map(([kind, label]) => `<form class="upload-row" data-upload="${kind}"><label class="field">${label}<input name="file" type="file" accept="image/jpeg,image/png,application/pdf" required><small>JPG, PNG ou PDF · até 8 MB</small></label><button class="btn" type="submit">Enviar para a Apex</button></form>`).join('')}</div></section></div></div>`;
}
function amazonPage() {
  const pending = state.amazonPending;
  return head('Conectar conta Amazon', 'Faça o login na Amazon e salve a conexão diretamente neste servidor.')
    + `<div class="grid2"><section class="panel"><div class="panelbody"><h2>1. Abrir a Amazon</h2><p>Gere um link novo e entre na sua conta na página da Amazon. Conclua os códigos e verificações que ela solicitar.</p><button class="btn primary" data-amazon-start>${pending ? 'Gerar outro link' : 'Gerar link Amazon'}</button>${pending ? `<p><a class="btn primary" href="${esc(pending.link)}" target="_blank" rel="noopener noreferrer">Abrir login Amazon ↗</a></p><p class="small muted">Link válido até ${esc(date(pending.expiresAt))}. Gerar outro link invalida o anterior.</p>` : ''}</div></section><section class="panel"><div class="panelbody"><h2>2. Salvar a conexão</h2><p>Depois do login, copie a URL final da barra de endereços, mesmo que a página final exiba “não encontrada”.</p>${pending ? `<form id="amazon-finish-form" class="stack"><label class="field">Nome para identificar a conta<input name="label" required maxlength="120" autocomplete="off"></label><label class="field">URL final da Amazon<textarea name="url" required maxlength="16000" rows="5" autocomplete="off" spellcheck="false"></textarea></label><button class="btn primary" type="submit">Confirmar e salvar conexão</button><p class="small muted">Use o retorno do link atual. A URL é enviada somente para validar esta conexão e não fica no histórico de atividade.</p></form>` : '<p class="muted">Gere o link para iniciar uma tentativa.</p>'}</div></section></div><section class="panel"><div class="panelhead"><h2>Conexões salvas</h2></div><div class="panelbody">${state.amazonAccounts.length ? state.amazonAccounts.map(a => `<div class="step"><div><strong>${esc(a.label)}</strong><p class="small muted">Conexão salva em ${esc(date(a.connected_at))}</p></div><button class="btn danger" data-amazon-remove="${esc(a.id)}">Remover deste painel</button></div>`).join('') : '<p>Nenhuma conexão Amazon salva neste painel.</p>'}<p class="muted">Salvar uma conexão não significa aprovação do cadastro. As operações de onboarding direto ainda estão em implementação.</p></div></section>`;
}
function auditPage() {
  const names = { 'auth.login': 'Entrada no painel', 'auth.password_changed': 'Senha do painel alterada', 'apex.connected': 'Apex conectada', 'apex.disconnected': 'Apex desconectada', 'apex.application-data': 'Envio de dados cadastrais', 'apex.documents': 'Envio de documento', 'apex.start': 'Início de execução' };
  const statuses = { success: 'Concluído localmente', requested: 'Solicitado', http_success: 'Resposta HTTP de sucesso', not_confirmed: 'Resultado não confirmado' };
  return head('Atividade', 'Registro das operações iniciadas neste painel.', '<button class="btn" data-refresh-audit>↻ Atualizar</button>') + `<section class="panel">${state.audit.length ? `<div class="table-wrap"><table><thead><tr><th>Operação</th><th>Resultado</th><th>Data e hora</th></tr></thead><tbody>${state.audit.map(e => `<tr><td><strong>${esc(names[e.action] || e.action)}</strong><span class="muted endpoint">${esc(e.target || 'Workspace')}</span></td><td>${esc(statuses[e.status] || e.status)}</td><td class="audit-time">${esc(date(e.created_at))}</td></tr>`).join('')}</tbody></table></div>` : empty('Nenhuma atividade retornada', 'Atualize para consultar as últimas operações deste painel.')}</section>`;
}
function render() {
  if (!state.user) { root.innerHTML = authView(); return; }
  if (state.user.mustChangePassword) { root.innerHTML = authView(true); return; }
  const content = ({ amazon: amazonPage, overview, accounts: accountsPage, detail: detailPage, integrations: integrationsPage, audit: auditPage }[state.page] ?? amazonPage)();
  root.innerHTML = layout((state.error ? `<div class="errorbox" role="alert">${esc(state.error)}</div>` : '') + content);
}
async function loadData() {
  state.error = '';
  state.integration = await api('/api/integrations');
  state.amazonAccounts = (await api('/api/amazon/accounts')).accounts;
  if (state.integration.apex.connected) {
    const results = await Promise.allSettled([api('/api/apex/accounts'), api('/api/apex/credits')]);
    if (results[0].status === 'fulfilled') {
      const data = results[0].value;
      const accounts = Array.isArray(data) ? data : data.accounts;
      if (!Array.isArray(accounts)) throw new Error('Formato de contas não reconhecido. A Apex pode ter alterado a API.');
      state.accounts = accounts; state.loaded = true;
    } else { state.error = results[0].reason.message; state.loaded = false; state.accounts = []; }
    if (results[1].status === 'fulfilled') state.credits = results[1].value;
    else { state.credits = null; state.error ||= results[1].reason.message; }
  } else { state.accounts = []; state.loaded = false; state.credits = null; }
  render();
}
async function openAccount(id) {
  const data = await api(`/api/apex/accounts/${encodeURIComponent(id)}`);
  const account = data.account ?? data;
  if (!account?.id) throw new Error('A Apex não retornou uma conta válida.');
  state.account = account; state.run = null; state.page = 'detail'; render();
  const run = latestRun(account);
  if (run?.id) { try { state.run = await api(`/api/apex/runs/${encodeURIComponent(run.id)}`); render(); } catch (e) { toast(e.message); } }
}
root.addEventListener('input', event => {
  if (event.target.id === 'account-search') { state.search = event.target.value; document.querySelector('#account-table').innerHTML = accountsTable(); }
});
root.addEventListener('click', async event => {
  const button = event.target.closest('button'); if (!button || state.busy) return;
  if (button.hasAttribute('data-amazon-start')) return work(async () => {
    state.amazonPending = await api('/api/amazon/connect/start', { method: 'POST', body: {} }); render();
  });
  if (button.dataset.amazonRemove) {
    if (!(await confirmation('Remover conexão Amazon?', 'O token será removido deste painel. Isso não revoga a autorização diretamente na Amazon.'))) return;
    return work(async () => { await api(`/api/amazon/accounts/${button.dataset.amazonRemove}`, { method: 'DELETE', body: { confirm: true } }); await loadData(); });
  }
  if (button.dataset.page) {
    state.page = button.dataset.page; state.error = ''; render();
    if (state.page === 'audit') await work(async () => { state.audit = (await api('/api/audit')).events; render(); });
    return;
  }
  if (button.hasAttribute('data-logout')) return work(async () => { await api('/api/auth/logout', { method: 'POST', body: {} }); Object.assign(state, { user: null, csrf: '', amazonAccounts: [], amazonPending: null, accounts: [], account: null, run: null, integration: null, credits: null, loaded: false }); render(); });
  if (button.hasAttribute('data-refresh')) return work(loadData);
  if (button.dataset.account) return work(() => openAccount(button.dataset.account));
  if (button.hasAttribute('data-open-current')) return work(() => openAccount(state.account.id));
  if (button.dataset.pollRun) return work(async () => { state.run = await api(`/api/apex/runs/${encodeURIComponent(button.dataset.pollRun)}`); render(); toast('Estado da execução atualizado.'); });
  if (button.hasAttribute('data-refresh-audit')) return work(async () => { state.audit = (await api('/api/audit')).events; render(); });
  if (button.hasAttribute('data-disconnect')) {
    if (!(await confirmation('Desconectar Apex?', 'O token será removido deste servidor. Isso não encerra outras sessões da sua conta na Apex.'))) return;
    return work(async () => { await api('/api/integrations/apex', { method: 'DELETE' }); state.account = null; state.run = null; await loadData(); toast('Apex desconectada.'); });
  }
  if (button.hasAttribute('data-start')) {
    if (!(await confirmation('Iniciar execução?', 'Esta ação envia uma solicitação real à Apex e pode consumir créditos. Confira se os dados e documentos já estão salvos. Não feche a página durante o envio.', 'Iniciar na Apex'))) return;
    return work(async () => {
      const result = await api(`/api/apex/accounts/${state.account.id}/start`, { method: 'POST', body: { confirm: true } });
      const id = state.account.id; await openAccount(id); toast(result.notice);
    });
  }
});
root.addEventListener('submit', async event => {
  event.preventDefault(); const form = event.target; if (state.busy) return;
  const fields = Object.fromEntries(new FormData(form));
  if (form.id === 'amazon-finish-form') {
    if (!state.amazonPending) return;
    const connectId = state.amazonPending.connectId;
    if (!(await confirmation('Conectar esta conta Amazon?', 'O servidor usará o retorno do login para solicitar e armazenar um token criptografado da conta. Confirme que esta é a conta desejada.', 'Salvar conexão'))) return;
    return work(async () => {
      try {
        const result = await api('/api/amazon/connect/finish', { method: 'POST', body: { ...fields, connectId, confirm: true } });
        toast(result.notice);
      } finally {
        form.reset(); state.amazonPending = null; await loadData();
      }
    });
  }
  if (form.id === 'login-form') return work(async () => { const data = await api('/api/auth/login', { method: 'POST', body: fields }); state.user = data.user; state.csrf = data.csrf; form.reset(); render(); if (!state.user.mustChangePassword) await loadData(); });
  if (['password-form', 'password-settings-form'].includes(form.id)) return work(async () => { await api('/api/auth/password', { method: 'POST', body: fields }); state.user.mustChangePassword = false; form.reset(); await loadData(); toast('Senha atualizada.'); });
  if (form.id === 'apex-form') return work(async () => { try { await api('/api/integrations/apex/connect', { method: 'POST', body: fields }); await loadData(); toast('Conta Apex conectada.'); } finally { const input = form.querySelector('[name=password]'); if (input) input.value = ''; } });
  if (form.id === 'application-form') {
    if (!(await confirmation('Salvar dados cadastrais?', 'Os campos serão enviados à conta selecionada na Apex. Esta ação altera dados reais. Confira nome, telefone e endereço antes de confirmar.', 'Salvar na Apex'))) return;
    return work(async () => { const result = await api(`/api/apex/accounts/${state.account.id}/application-data`, { method: 'POST', body: { fields, confirm: true } }); await openAccount(state.account.id); toast(result.notice); });
  }
  if (form.dataset.upload) {
    const file = new FormData(form).get('file');
    if (!file?.size || file.size > 8 * 1024 * 1024) return toast('Escolha um arquivo de até 8 MB.');
    if (!(await confirmation('Enviar documento?', `O arquivo ${file.name} será enviado à Apex para a conta selecionada. Confirme o titular e o tipo de documento.`, 'Enviar documento'))) return;
    return work(async () => { const body = new FormData(); body.set('file', file); const result = await api(`/api/apex/accounts/${state.account.id}/documents?kind=${form.dataset.upload}`, { method: 'POST', headers: { 'X-Confirm-Operation': 'upload' }, body }); form.reset(); toast(result.notice); });
  }
});
try { const data = await api('/api/auth/session'); state.user = data.user; state.csrf = data.csrf; render(); if (!state.user.mustChangePassword) await loadData(); }
catch (error) { if (state.user) state.error = error.message; render(); }
