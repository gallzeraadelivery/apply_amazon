import { buildDetailProgress, detailProgressCopy } from './detail-progress.js?v=ficha-58763';
const app = document.querySelector('#app');

const LOCALES = ['pt-BR', 'en-US', 'es-CO'];
const AUTH_COPY = {
  'pt-BR': {
    sub: 'Console privado de onboarding Amazon Flex',
    email: 'E-mail',
    password: 'Senha',
    enter: 'Entrar',
    signup: 'Criar conta',
    locale: 'Idioma',
    credits: 'créditos',
    topup: 'Recarregar',
    topupPrompt: 'Quantos créditos?',
    topupFail: 'Não deu para abrir o pagamento.',
    stockSoon: 'Conta estoque · em breve',
    usersNav: 'Usuários',
    usersTitle: 'Usuários do painel',
    usersEyebrow: 'Equipe',
    colUser: 'Usuário',
    colCredits: 'Créditos',
    colApps: 'Aplicações',
    colStatus: 'Status',
    noUsers: 'Nenhum usuário cadastrado.',
    noApps: 'Nenhuma aplicação',
    adjustTitle: 'Ajuste de crédito',
    adjustEyebrow: 'Saldo',
    delta: 'Quantidade',
    deltaPh: 'Ex.: 50 ou -10',
    applyCredits: 'Aplicar',
    adjustCredits: 'Ajustar',
    reason: 'Motivo',
    saveAdjust: 'Aplicar ajuste',
    createUserTitle: 'Criar usuário',
    createUserEyebrow: 'Novo acesso',
    name: 'Nome',
    initialPassword: 'Senha inicial',
    createUserBtn: 'Criar usuário',
    adjustFail: 'Não deu para ajustar o crédito.',
    createFail: 'Não deu para criar o usuário.',
    colActions: 'Ações',
    usersSearch: 'Buscar usuário...',
    blockUser: 'Bloquear',
    unblockUser: 'Liberar',
    resetPassword: 'Nova senha',
    deleteUser: 'Apagar',
    deleteUserConfirm: 'Apagar este usuário? O acesso some e as aplicações são arquivadas.',
    cannotEditSelf: 'Esse é o seu usuário. Altera outro.',
    userUpdated: 'Usuário atualizado.',
    passwordSet: 'Senha atualizada.',
    userDeleted: 'Usuário apagado.',
    creditQuickReason: 'ajuste admin',
    apps: 'Aplicações',
    vacancies: 'Vagas',
    connect: 'Conectar',
    connectAccount: 'Conectar conta',
    start: 'Iniciar aplicação',
    starting: 'Iniciando…',
    applying: 'Aplicando…',
    waitingAmazon: 'Aguardando a Amazon…',
    noCredits: 'Você está com 0 créditos. Recarregue para adicionar a conta.',
    connectNeedCreditB: 'Sem crédito, sem conexão 💳',
    connectNeedCreditP: 'Precisa de 1 crédito pra conectar uma conta. Recarrega no botão Recarregar em cima e volta aqui.',
    forgot: 'Esqueci a senha',
    sendReset: 'Enviar código',
    code: 'Código',
    confirm: 'Confirmar',
    sendCode: 'Enviamos um código para o seu e-mail.',
    checkSpam: 'Olha também no spam. O código vale 20 minutos.',
    resendCode: 'Reenviar código',
    backLogin: 'Voltar',
    newPassword: 'Nova senha',
    reset: 'Redefinir senha',
    resetOk: 'Senha atualizada. Entre de novo.',
    invalidCode: 'Código inválido.',
    invalidSignup: 'E-mail inválido ou senha com menos de 8 caracteres.',
    emailSendFailed: 'Não deu para enviar o e-mail. Tenta de novo.',
    emailUnverified: 'Confirme o e-mail com o código que enviamos.',
    badCredentials: 'E-mail ou senha incorretos.',
    emailInUse: 'Este e-mail já tem conta.',
    hubConnected: 'Conectadas',
    hubRunning: 'Aplicando',
    hubIdvOk: 'Identidade ok',
    hubAction: 'Atenção',
    hubTax: 'Tax',
    hubIdentidade: 'Reenviar',
    hubSession: 'Reconectar',
    hubReview: 'Em análise',
    hubBlocked: 'Desativadas',
    hubComplete: 'Concluídas',
    emptyTitle: 'Nenhuma conta ainda',
    emptyBody: 'Conecte a primeira conta Amazon para começar o onboarding.',
    all: 'Todas',
    archived: 'Arquivadas',
    refresh: 'Atualizar',
    refreshingAccounts: 'Atualizando as contas…',
    refreshingHint: 'Pode demorar um pouco.',
    refreshDone: 'Contas atualizadas.',
    grabVacancy: 'Pegar vaga',
    startReviewEyebrow: 'Última checagem',
    startReviewTitle: 'Confira e inicie',
    saveReviewTitle: 'Confira e salve',
    saveReviewAgree: 'Confirme os dados para salvar. Isso não inicia a aplicação.',
    saveConfirmBtn: 'Confirmar e salvar',
    draftUnsaved: 'Alterações não salvas.',
    removePhotoConfirm: 'Remover a foto desta conta? Você poderá anexar outra depois.',
    docSent: 'Enviado',
    docPending: 'Pendente',
    docSaving: 'Salvando…',
    docUnsaved: 'Não salvo',
    fieldFirstName: 'Nome',
    fieldMiddleName: 'Nome do meio',
    fieldLastName: 'Sobrenome',
    fieldPhone: 'Telefone',
    fieldAddress: 'Endereço',
    fieldCity: 'Cidade',
    fieldState: 'Estado',
    fieldZip: 'CEP (ZIP)',
    fieldDlExpiration: 'Validade da habilitação',
    fieldDlNumber: 'Número da habilitação (DL)',
    fieldDob: 'Data de nascimento',
    fieldSsn: 'Social / SSN',
    fieldBankType: 'Tipo de conta',
    fieldBankRouting: 'Número de roteamento',
    fieldBankAccount: 'Número da conta',
    bankChecking: 'Corrente',
    bankSavings: 'Poupança',
    considerContext: 'O resultado dos antecedentes precisa de revisão pela Amazon. Acompanhe esta etapa.',
    startNa: 'Não informado',
    startAgree: 'Ao clicar em Iniciar, você confirma que todos os dados e arquivos estão certos.',
    startDisclaimerTitle: '⚠️ Sem garantia de aprovação',
    startDisclaimer: 'Apex Apply é só uma ferramenta pra facilitar e agilizar a aplicação. A aprovação depende 100% da Amazon e dos arquivos anexados. Não nos responsabilizamos por foto ou documento em baixa qualidade.',
    startBack: 'Voltar e editar',
    startConfirmBtn: 'Li e quero iniciar',
    startConfirming: 'Confirmando…',
    startSsnNote: 'SSN provisório vale só para antecedentes. Pagamento fica em Atenção até o SSN real.',
  },
  'en-US': {
    sub: 'Private Amazon Flex onboarding console',
    email: 'Email',
    password: 'Password',
    enter: 'Sign in',
    signup: 'Create account',
    locale: 'Language',
    credits: 'credits',
    topup: 'Add credits',
    topupPrompt: 'How many credits?',
    topupFail: 'Could not open payment.',
    stockSoon: 'Stock account · coming soon',
    usersNav: 'Users',
    usersTitle: 'Panel users',
    usersEyebrow: 'Team',
    colUser: 'User',
    colCredits: 'Credits',
    colApps: 'Applications',
    colStatus: 'Status',
    noUsers: 'No users yet.',
    noApps: 'No applications',
    adjustTitle: 'Credit adjustment',
    adjustEyebrow: 'Balance',
    delta: 'Amount',
    deltaPh: 'E.g. 50 or -10',
    applyCredits: 'Apply',
    adjustCredits: 'Adjust',
    reason: 'Reason',
    saveAdjust: 'Apply adjustment',
    createUserTitle: 'Create user',
    createUserEyebrow: 'New access',
    name: 'Name',
    initialPassword: 'Initial password',
    createUserBtn: 'Create user',
    adjustFail: 'Could not adjust credits.',
    createFail: 'Could not create the user.',
    colActions: 'Actions',
    usersSearch: 'Search user...',
    blockUser: 'Block',
    unblockUser: 'Unblock',
    resetPassword: 'New password',
    deleteUser: 'Delete',
    deleteUserConfirm: 'Delete this user? Access is removed and applications are archived.',
    cannotEditSelf: 'That is your own user. Pick another.',
    userUpdated: 'User updated.',
    passwordSet: 'Password updated.',
    userDeleted: 'User deleted.',
    creditQuickReason: 'admin adjust',
    apps: 'Applications',
    vacancies: 'Spots',
    connect: 'Connect',
    connectAccount: 'Connect account',
    start: 'Start application',
    starting: 'Starting…',
    applying: 'Applying…',
    waitingAmazon: 'Waiting on Amazon…',
    noCredits: 'You have 0 credits. Top up to add the account.',
    connectNeedCreditB: 'No credits, no connect 💳',
    connectNeedCreditP: 'You need 1 credit to connect an account. Tap Add credits at the top, then come back.',
    forgot: 'Forgot password',
    sendReset: 'Send code',
    code: 'Code',
    confirm: 'Confirm',
    sendCode: 'We sent a code to your email.',
    checkSpam: 'Check spam too. The code lasts 20 minutes.',
    resendCode: 'Resend code',
    backLogin: 'Back',
    newPassword: 'New password',
    reset: 'Reset password',
    resetOk: 'Password updated. Sign in again.',
    invalidCode: 'Invalid code.',
    invalidSignup: 'Invalid email or password shorter than 8 characters.',
    emailSendFailed: 'Could not send the email. Try again.',
    emailUnverified: 'Confirm the email with the code we sent.',
    badCredentials: 'Wrong email or password.',
    emailInUse: 'This email already has an account.',
    hubConnected: 'Connected',
    hubRunning: 'Applying',
    hubIdvOk: 'Identity ok',
    hubAction: 'Attention',
    hubTax: 'Tax',
    hubIdentidade: 'Resend',
    hubSession: 'Reconnect',
    hubReview: 'In review',
    hubBlocked: 'Deactivated',
    hubComplete: 'Completed',
    emptyTitle: 'No accounts yet',
    emptyBody: 'Connect the first Amazon account to start onboarding.',
    all: 'All',
    archived: 'Archived',
    refresh: 'Refresh',
    refreshingAccounts: 'Updating accounts…',
    refreshingHint: 'This can take a little while.',
    refreshDone: 'Accounts updated.',
    grabVacancy: 'Get spot',
    startReviewEyebrow: 'Last check',
    startReviewTitle: 'Review and start',
    saveReviewTitle: 'Review and save',
    saveReviewAgree: 'Confirm the data to save. This does not start the application.',
    saveConfirmBtn: 'Confirm and save',
    draftUnsaved: 'Unsaved changes.',
    removePhotoConfirm: 'Remove this account photo? You can attach another one later.',
    docSent: 'Uploaded',
    docPending: 'Pending',
    docSaving: 'Saving…',
    docUnsaved: 'Not saved',
    fieldFirstName: 'First name',
    fieldMiddleName: 'Middle name',
    fieldLastName: 'Last name',
    fieldPhone: 'Phone',
    fieldAddress: 'Address',
    fieldCity: 'City',
    fieldState: 'State',
    fieldZip: 'ZIP',
    fieldDlExpiration: 'DL expiration',
    fieldDlNumber: 'DL number',
    fieldDob: 'Date of birth',
    fieldSsn: 'Social / SSN',
    fieldBankType: 'Account type',
    fieldBankRouting: 'Routing number',
    fieldBankAccount: 'Account number',
    bankChecking: 'Checking',
    bankSavings: 'Savings',
    considerContext: 'The background check result needs Amazon review. Follow this step for updates.',
    startNa: 'Not provided',
    startAgree: 'By tapping Start, you confirm every field and file is correct.',
    startDisclaimerTitle: '⚠️ No approval guarantee',
    startDisclaimer: 'Apex Apply is only a tool to help you apply faster. Approval is 100% up to Amazon and the files you attach. We are not responsible for low-quality uploads.',
    startBack: 'Go back and edit',
    startConfirmBtn: 'I agree, start',
    startConfirming: 'Confirming…',
    startSsnNote: 'The temporary SSN is only for background. Payment stays in Attention until the real SSN.',
  },
  'es-CO': {
    sub: 'Consola privada de onboarding Amazon Flex',
    email: 'Correo',
    password: 'Contraseña',
    enter: 'Entrar',
    signup: 'Crear cuenta',
    locale: 'Idioma',
    credits: 'créditos',
    topup: 'Recargar',
    topupPrompt: '¿Cuántos créditos?',
    topupFail: 'No se pudo abrir el pago.',
    stockSoon: 'Cuenta de stock · pronto',
    usersNav: 'Usuarios',
    usersTitle: 'Usuarios del panel',
    usersEyebrow: 'Equipo',
    colUser: 'Usuario',
    colCredits: 'Créditos',
    colApps: 'Aplicaciones',
    colStatus: 'Estado',
    noUsers: 'Ningún usuario.',
    noApps: 'Sin aplicaciones',
    adjustTitle: 'Ajuste de crédito',
    adjustEyebrow: 'Saldo',
    delta: 'Cantidad',
    deltaPh: 'Ej.: 50 o -10',
    applyCredits: 'Aplicar',
    adjustCredits: 'Ajustar',
    reason: 'Motivo',
    saveAdjust: 'Aplicar ajuste',
    createUserTitle: 'Crear usuario',
    createUserEyebrow: 'Nuevo acceso',
    name: 'Nombre',
    initialPassword: 'Contraseña inicial',
    createUserBtn: 'Crear usuario',
    adjustFail: 'No se pudo ajustar el crédito.',
    createFail: 'No se pudo crear el usuario.',
    colActions: 'Acciones',
    usersSearch: 'Buscar usuario...',
    blockUser: 'Bloquear',
    unblockUser: 'Liberar',
    resetPassword: 'Nueva contraseña',
    deleteUser: 'Borrar',
    deleteUserConfirm: '¿Borrar este usuario? El acceso desaparece y las aplicaciones se archivan.',
    cannotEditSelf: 'Ese es tu usuario. Elige otro.',
    userUpdated: 'Usuario actualizado.',
    passwordSet: 'Contraseña actualizada.',
    userDeleted: 'Usuario borrado.',
    creditQuickReason: 'ajuste admin',
    apps: 'Aplicaciones',
    vacancies: 'Cupos',
    connect: 'Conectar',
    connectAccount: 'Conectar cuenta',
    start: 'Iniciar aplicación',
    starting: 'Iniciando…',
    applying: 'Aplicando…',
    waitingAmazon: 'Esperando a Amazon…',
    noCredits: 'Tienes 0 créditos. Recarga para agregar la cuenta.',
    connectNeedCreditB: 'Sin crédito, no hay conexión 💳',
    connectNeedCreditP: 'Necesitas 1 crédito para conectar una cuenta. Recarga arriba y vuelve aquí.',
    forgot: 'Olvidé la contraseña',
    sendReset: 'Enviar código',
    code: 'Código',
    confirm: 'Confirmar',
    sendCode: 'Enviamos un código a tu correo.',
    checkSpam: 'Mira también el spam. El código vale 20 minutos.',
    resendCode: 'Reenviar código',
    backLogin: 'Volver',
    newPassword: 'Nueva contraseña',
    reset: 'Restablecer contraseña',
    resetOk: 'Contraseña actualizada. Ingresa de nuevo.',
    invalidCode: 'Código inválido.',
    invalidSignup: 'Correo inválido o contraseña de menos de 8 caracteres.',
    emailSendFailed: 'No se pudo enviar el correo. Intenta de nuevo.',
    emailUnverified: 'Confirma el correo con el código que enviamos.',
    badCredentials: 'Correo o contraseña incorrectos.',
    emailInUse: 'Este correo ya tiene una cuenta.',
    hubConnected: 'Conectadas',
    hubRunning: 'Aplicando',
    hubIdvOk: 'Identidad ok',
    hubAction: 'Atención',
    hubTax: 'Tax',
    hubIdentidade: 'Reenviar',
    hubSession: 'Reconectar',
    hubReview: 'En revisión',
    hubBlocked: 'Desactivadas',
    hubComplete: 'Completadas',
    emptyTitle: 'Ninguna cuenta todavía',
    emptyBody: 'Conecta la primera cuenta Amazon para empezar el onboarding.',
    all: 'Todas',
    archived: 'Archivadas',
    refresh: 'Actualizar',
    refreshingAccounts: 'Actualizando las cuentas…',
    refreshingHint: 'Puede tardar un poco.',
    refreshDone: 'Cuentas actualizadas.',
    grabVacancy: 'Tomar cupo',
    startReviewEyebrow: 'Última revisión',
    startReviewTitle: 'Revisa e inicia',
    saveReviewTitle: 'Revisa y guarda',
    saveReviewAgree: 'Confirma los datos para guardar. Esto no inicia la aplicación.',
    saveConfirmBtn: 'Confirmar y guardar',
    draftUnsaved: 'Cambios sin guardar.',
    removePhotoConfirm: '¿Eliminar la foto de esta cuenta? Puedes adjuntar otra después.',
    docSent: 'Enviado',
    docPending: 'Pendiente',
    docSaving: 'Guardando…',
    docUnsaved: 'Sin guardar',
    fieldFirstName: 'Nombre',
    fieldMiddleName: 'Segundo nombre',
    fieldLastName: 'Apellido',
    fieldPhone: 'Teléfono',
    fieldAddress: 'Dirección',
    fieldCity: 'Ciudad',
    fieldState: 'Estado',
    fieldZip: 'Código postal (ZIP)',
    fieldDlExpiration: 'Vencimiento de licencia',
    fieldDlNumber: 'Número de licencia (DL)',
    fieldDob: 'Fecha de nacimiento',
    fieldSsn: 'Social / SSN',
    fieldBankType: 'Tipo de cuenta',
    fieldBankRouting: 'Número de ruta',
    fieldBankAccount: 'Número de cuenta',
    bankChecking: 'Corriente',
    bankSavings: 'Ahorros',
    considerContext: 'El resultado de antecedentes necesita revisión de Amazon. Sigue esta etapa.',
    startNa: 'No informado',
    startAgree: 'Al iniciar, confirmas que todos los datos y archivos están correctos.',
    startDisclaimerTitle: '⚠️ Sin garantía de aprobación',
    startDisclaimer: 'Apex Apply es solo una herramienta para facilitar y agilizar la aplicación. La aprobación depende 100% de Amazon y de los archivos adjuntos. No nos hacemos responsables por cargas de baja calidad.',
    startBack: 'Volver y editar',
    startConfirmBtn: 'Leí y quiero iniciar',
    startConfirming: 'Confirmando…',
    startSsnNote: 'El SSN provisional vale solo para antecedentes. El pago queda en Atención hasta el SSN real.',
  },
};

const I18N_EXTRA = {
  'pt-BR': {
    logout: 'Sair',
    accountRole: 'Conta',
    adminRole: 'Admin',
    menu: 'Menu',
    auditNav: 'Auditoria',
    searchAccounts: 'Buscar conta, e-mail, região…',
    searchAccountsOwner: 'Buscar conta, região ou e-mail do usuário…',
    ownerFilterActive: 'Usuário: {email}',
    hubMine: 'Minhas',
    searchVacancies: 'Buscar região, cidade ou estado…',
    applications: 'Aplicações',
    refreshAnalysis: 'Checar análises',
    refreshAnalysisHint: 'Só o que está em análise.',
    refreshFull: 'Atualizar tudo',
    refreshFullHint: 'Relê o pacote inteiro.',
    checkingAnalysis: 'Verificando análise {done}/{total}',
    refreshAnalysisDone: '{concluded} concluíram · {idvFailed} falharam identidade · {otherFailed} falharam leitura · {still} seguem',
    refreshAnalysisEmpty: 'Nenhuma conta em análise.',
    amazonRead: 'Amazon',
    amazonReadNever: 'Amazon não lida',
    noneInFilter: 'Nenhuma conta neste filtro',
    noneInFilterBody: 'Ajuste os filtros ou a busca para ver outras contas.',
    archiveSelected: 'Arquivar selecionadas',
    restoreSelected: 'Restaurar selecionadas',
    selectVisible: 'Selecionar visíveis',
    selectedCount: 'selecionada(s)',
    awaiting: 'Aguardando',
    colAccount: 'Conta',
    colRegion: 'Região',
    colStage: 'Etapa atual',
    colUpdated: 'Atualizado',
    restore: 'Restaurar',
    step_basic_info: 'Dados',
    step_legal_documents: 'Contratos',
    step_auto_insurance: 'Seguro',
    step_videos: 'Vídeos',
    step_getting_paid: 'TAX / Pagamento',
    step_tax_interview: 'TAX / Pagamento',
    step_payment_information: 'TAX / Pagamento',
    step_driver_license: 'Driver license',
    step_id_verification: 'Driver license',
    step_id_selfie: 'Selfie',
    step_background_check: 'Antecedentes',
    step_photo_upload: 'Foto',
    st_draft: 'Rascunho',
    st_connected: 'Conectada',
    st_ready: 'Dados prontos',
    st_queued: 'Na fila',
    st_running: 'Aplicando',
    st_in_progress: 'Em andamento',
    st_pending: 'Pendente',
    st_pending_review: 'Em análise',
    st_review: 'Em análise',
    st_duplicate: 'Duplicada',
    st_action_required: 'Atenção',
    st_consider: 'Consider',
    st_complete: 'Concluída',
    st_failed: 'Falha',
    st_error: 'Atenção',
    st_blocked: 'Atenção',
    st_archived: 'Arquivada',
    archivedViewOnly: 'Consulta apenas. Continua arquivada.',
    st_offboarded: 'Desativada',
    reconnectOptionalBtn: 'Reconectar (opcional)',
    st_session_retry_pending: 'Verificação pendente',
    st_session_fresh: 'Conexão ok',
    st_session_expired: 'Reconectar',
    st_session_unknown: 'Sem conexão',
    st_session_not_monitored: 'Não monitorada',
    hsDlSent: 'Driver license enviado.',
    hsSelfieNotSent: 'A selfie ainda não foi enviada.',
    hsNeedDlFirst: 'Falta concluir o Driver license antes da selfie.',
    hsNeedFace: 'Falta a foto do rosto para a selfie.',
    hsSelfiePending: 'Selfie não enviada. Sem foto da pessoa, essa etapa fica pendente.',
    hsPayFail: 'Não deu para concluir o pagamento.',
    hsSessionBad: 'A Amazon não leu os dados. Reconecte a sessão.',
    hsNameMismatch: 'A Amazon não aceitou o nome da Driver license.',
    hsLegalDone: 'Contratos concluídos.',
    hsInsDone: 'Seguro concluído.',
    hsVidDone: 'Vídeos concluídos.',
    hsBasicSent: 'Dados pessoais enviados.',
    hsAmazonReview: 'Amazon está analisando.',
    hsNeedDl: 'Falta enviar o Driver license.',
    hsSelfieNotStarted: 'Não iniciada',
    hsAmazonRejected: 'Amazon não aceitou o documento.',
    hsDlRejected: 'A Amazon não aceitou a Driver license. Envie frente e verso nítidos.',
    hsDlExpired: 'Driver license expirada. Envie um documento válido.', hsBgEmail: 'Confira seu e-mail para as próximas etapas dos antecedentes.', hsTransport: 'Não foi possível comunicar com o serviço. Tente novamente.',
    hsIdvDeniedAfterReview: 'A Amazon recusou a verificação depois da análise.',
    hsSelfieRejected: 'A Amazon não aceitou a selfie.',
    hsTaxSkip: 'O cadastro bancário está pendente.',
    hsTaxPaymentBlocked: 'O cadastro bancário aguarda a regularização da parte fiscal.',
    hsTaxPaymentWaiting: 'O cadastro bancário aguarda a aprovação do TAX.',
    hsTaxPaymentAfterComplete: 'A parte fiscal foi concluída. O cadastro bancário ainda está pendente.',
    hsTaxWaiting: '⏳ Amazon ainda está conferindo o TAX. A conta bancária entra depois que ela aceitar. O resto já segue.',
    hsIrsNameSsn: 'O nome e o SSN não correspondem. Revise esses dados para concluir o TAX.',
    irsSsnTitle: 'SSN do TAX',
    irsSsnAsk: '⚠️ Nome e SSN não batem. Digite o SSN certo.',
    irsSsnHint: 'Só o SSN. O resto da aplicação não mexe.',
    irsSsnConfirm: 'Confirmar e enviar',
    irsSsnCancel: 'Cancelar',
    irsSsnLoading: 'Enviando o SSN…',
    irsSsnWait: 'Pode demorar um pouco.',
    irsSsnOk: '✅ SSN aceito. TAX atualizado.',
    irsSsnFail: 'Não rolou. Confere o SSN ou cancela.',
    irsSsnRetry: 'Tentar de novo',
    irsSsnNeedSession: 'Reconecte a sessão pra enviar o SSN.',
    irsSsnBad: 'Digite os 9 números do SSN.',
    irsSsnResolve: 'Resolver tax',
    irsSsnPayPending: 'TAX ok. O pagamento ainda está pendente.',
    hsBgReview: 'Antecedentes em análise.',
    prepSsnMissing: 'SSN não encontrado',
    prepPhoneMissing: 'Telefone não gerado',
    prepPhotoMissing: 'Foto não gerada',
    prepOcrFail: 'Leitura do Driver license falhou',
    prepFail: 'Preparação falhou',
    prepReady: 'Preparação pronta',
    now: 'Agora',
    progress: 'Progresso',
    currentName: 'Nome atual',
    session: 'Sessão',
    region: 'Região',
    stepsTitle: 'Etapas',
    connectedAt: 'Conectada em',
    archiveAccount: 'Arquivar conta',
    deleteForever: 'Excluir definitivamente',
    deleteForeverTitle: 'Excluir conta definitivamente',
    deleteForeverConfirm: 'Esta ação é irreversível. A conta, seus runs, etapas, eventos e arquivos enviados serão apagados. Logs financeiros e de auditoria permanecem sem vínculo com a conta.',
    deleteForeverSuccess: 'Conta excluída definitivamente.',
    appData: 'Dados da aplicação',
    docsStart: 'Documentos & início',
    readyOk: 'Prontos',
    pending: 'Pendentes',
    dlFront: 'DL frente',
    dlBack: 'DL verso',
    personPhoto: 'Foto da pessoa',
    profilePhoto: 'Foto perfil',
    docsReady: 'Driver license e foto da pessoa prontos.',
    attachDocs: 'Anexe frente e verso. A foto da pessoa é opcional.',
    attachDocsLegacy: 'Anexe frente, verso e foto.',
    personalData: 'Dados pessoais',
    ssnNotFound: 'SSN não encontrado',
    ssnBypassP: 'Antecedentes seguem com um SSN provisório. O pagamento fica para preencher o SSN real depois.',
    ssnBypassCanStart: 'Pode iniciar mesmo assim. Antecedentes usam um SSN provisório e o pagamento fica pendente.',
    startWithoutSsn: 'Iniciar sem SSN',
    payment: 'Pagamento',
    autoGenerate: 'Em branco = gera automático',
    saveData: 'Salvar dados',
    reviewHint: 'Revise os dados preenchidos.',
    generatePhone: 'Gerar',
    generatePhoneAria: 'Gerar telefone',
    docView: 'Ver',
    docDownload: 'Baixar',
    docReplace: 'Substituir',
    docAttach: 'Anexar',
    detailRefreshing: 'Atualizando…',
    panelEntering: 'Entrando…',
    panelLoading: 'Carregando suas aplicações…',
    hubConsulting: 'Consultando aplicações',
    hubConsultingHint: 'Aguarde um instante. A lista ainda está chegando.',
    panelReadFailed: 'Não foi possível carregar o painel. Seu acesso foi mantido.',
    panelTryAgain: 'Tentar novamente',
    panelLoginFailed: 'Não foi possível entrar agora. Tente novamente.',
    panelLoginLimited: 'Muitas tentativas. Aguarde um pouco antes de tentar novamente.',
    detailSaving: 'Salvando…',
    detailWorkingHint: 'Aguarde. Não feche esta tela.',
    detailUpdated: 'Aplicação atualizada.',
    detailSaved: 'Dados salvos com sucesso.',
    detailRefreshFailed: 'Não foi possível atualizar a aplicação. Tente novamente.',
    detailSaveUnconfirmed: 'Não foi possível confirmar o salvamento. Seus dados continuam nesta tela. Confira antes de tentar novamente.',
    detailSavedReadFailed: 'Dados salvos. Não foi possível recarregar a ficha. Use Atualizar para conferir.',
    reviewFilesPreparing: 'Preparando arquivos para reenviar…',
    reviewFilesReady: 'Arquivos prontos. Reenvie quando quiser.',
    reviewFilesFailed: 'Não foi possível preparar os arquivos. Tente novamente.',
    reviewFilesMissing: 'Anexe e salve a foto da pessoa para preparar o reenvio.',
    reviewFilesRetry: 'Tentar novamente',
    preparingWait: 'Preparando dados. Aguarde para iniciar.',
    canStart: 'Dados e arquivos já existem. Pode atualizar se precisar.',
    canStartBypass: 'Pode iniciar. O SSN do pagamento fica para depois.',
    fillDocs: 'Preencha os dados e anexe o Driver license.',
    continueSelfie: 'Continuar selfie',
    resendDl: 'Reenviar Driver license',
    attentionNeeded: 'Atenção necessária',
    noRunYet: 'Sem execução ainda. Inicie a aplicação para acompanhar o log em tempo real.',
    waitingRead: 'Aguardando leitura',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    cropAttach: 'Anexar',
    cropTitleId: 'Encaixar Driver license',
    cropTitlePhoto: 'Cortar imagem',
    cropTitleSelfie: 'Encaixe o rosto',
    cropHintId: 'Encaixe o cartão no molde. O que está dentro é o que a Amazon recebe.',
    cropHintPhoto: 'Arraste o quadro para mover e os cantos para ajustar o recorte.',
    cropHintSelfie: 'Encaixe o rosto no oval. O quadro é o arquivo que a Amazon recebe.',
    cropFit: 'Encaixar',
    cropUse: 'Usar este recorte',
    cropRotate: 'Girar 90',
    cropMinus: 'Afastar',
    cropPlus: 'Aproximar',
    photoKindEyebrow: 'Foto da pessoa',
    photoKindTitle: 'Anexa a que você tem',
    photoKindLead: 'As duas fotos são só exemplo. Depois você manda a sua.',
    photoKindOriginal: 'Foto original',
    photoKindOriginalHint: 'Selfie da pessoa. Boa qualidade, boa luz.',
    photoKindReference: 'Foto de referência',
    photoKindReferenceHint: 'Gerada pelo Apex Creator.',
    photoKindExampleTag: 'exemplo',
    photoKindOriginalTag: 'original',
    photoKindReferenceTag: 'referência',
    photoOriginalSureTitle: 'Tem certeza?',
    photoOriginalSureP: 'Pra dar certo, tem que ser foto original da pessoa. Boa qualidade, boa luz. Não use foto gerada pelo Apex Creator.',
    photoOriginalSureWarn: '⚠️ Essa opção depende da foto ser original e nítida.',
    photoOriginalSureYes: 'Continuar',
    photoOriginalSureBack: 'Voltar',
    addDisclaimerTitle: '⚠️ Sem garantia de aprovação',
    addDisclaimer: 'Apex Apply não garante aprovação em nenhum momento. É só uma ferramenta pra ajudar na aplicação da conta Amazon Flex. Quem decide é 100% a Amazon, com base nos arquivos que você anexou.',
    addDisclaimerBack: 'Voltar',
    addDisclaimerBtn: 'Entendi, adicionar',
    close: 'Fechar',
    ok: 'OK',
    revName: 'Nome',
    revPhone: 'Tel',
    revAddress: 'Endereço',
    revCity: 'Cidade',
    revSsn: 'SSN',
    revDl: 'DL',
    revDob: 'Nasc. / DL',
    revBank: 'Banco',
    reconnectTitle: 'Reconectar conta Amazon',
    connectTitle: 'Conectar conta Amazon',
    reconnectP: 'Entre novamente na Amazon. Dados, documentos e progresso já concluído serão preservados.',
    connectLinkedP: 'A conta já está vinculada. Envie a frente e o verso do Driver license para continuar.',
    connectNewP: 'Faça login na Amazon e envie a frente e o verso do Driver license. A foto é opcional.',
    loginAmazon: 'Login na Amazon',
    connectAuto: 'Conectar automaticamente',
    sessionConnected: 'Sessão conectada',
    sessionConnectedP: 'A conta já foi vinculada. Envie a frente e o verso do Driver license para continuar.',
    connectDesc: 'Informe e-mail e senha. O Apply faz o login em uma sessão protegida e não salva a senha.',
    amazonEmail: 'E-mail Amazon',
    amazonPassword: 'Senha Amazon',
    connecting: 'Conectando…',
    connectAmazonBtn: 'Conectar Amazon',
    otpAsked: 'Código solicitado pela Amazon',
    otpPlaceholder: 'Código OTP',
    sendOtp: 'Enviar código',
    approvalAsked: 'Aprove o acesso no celular da Amazon. Estamos aguardando.',
    loginBusyHint: 'Login seguro em andamento. Aguarde…',
    credsError: 'E-mail ou senha recusados pela Amazon.',
    manualNeeded: 'A Amazon exigiu uma etapa manual. Use o acesso manual abaixo.',
    passwordHint: 'A senha existe somente durante esta tentativa e é descartada em seguida.',
    useManual: 'Usar conexão manual',
    manualDesc: 'Fallback para CAPTCHA, aprovação de dispositivo ou challenge não automatizável.',
    openAmazonLogin: 'Abrir login da Amazon',
    copyLink: 'Copiar link',
    linkReady: 'Link pronto. Se a Amazon não abriu, copie e abra no navegador.',
    clickToOpen: 'Clique no botão para abrir a Amazon.',
    returnUrl: 'URL de retorno',
    pasteHere: 'cole aqui a URL final depois do login',
    connectManually: 'Conectar manualmente',
    sessionSaved: 'Sessão salva.',
    pasteThenConnect: 'Depois de colar a URL de retorno, conecte a sessão.',
    documents: 'Documentos',
    front: 'Frente',
    back: 'Verso',
    photo: 'Foto',
    optional: 'opcional',
    attach: 'Anexar',
    removePhoto: 'Remover foto',
    dlRequiredHint: 'Frente e verso são obrigatórios. Foto da pessoa é opcional.',
    connectSelfieSkipWarn: '⚠️ Sem a foto da pessoa, a selfie não vai. Essa etapa fica pendente e o resto da aplicação segue.',
    addAccount: 'Adicionar conta',
    addReconnect: 'Adicionar reconexão',
    reconnectSuccess: 'Conta reconectada com sucesso.',
    add: 'Adicionar',
    vacanciesTitle: 'Vagas',
    vacanciesSub: 'Pague a região. A conta entra sozinha.',
    freeTab: '🎁 Grátis para você',
    allVacanciesTab: 'Todas as vagas',
    freeBannerTitle: '{remaining} de {limit} vagas grátis restantes',
    freeBannerBody: 'Escolha qualquer combinação destas regiões. Cada retirada usa 1 escolha e o estoque é compartilhado.',
    freeRemaining: '{remaining} de {limit} restantes',
    freeLabel: 'Grátis',
    freeBenefit: 'Benefício para clientes',
    grabFree: 'Pegar grátis',
    freeReleasing: 'Liberando…',
    freeConfirmTitle: 'Confirmar vaga grátis',
    freeConfirm: 'A conta de {city} entrará em Aplicações e usará 1 das suas {limit} escolhas.',
    freeNoStock: 'Estas regiões estão esgotadas agora. A aba continua disponível e novas vagas entram automaticamente.',
    freeClaimInProgress: 'Essa retirada ainda está sendo concluída. Tente novamente em instantes.',
    vacancyConnected: 'Vaga conectada',
    paidNoAccount: 'Pagou, mas a conta não entrou',
    paymentPending: 'Pagamento pendente',
    attachDl: 'Anexar Driver license',
    retryConnect: 'Tentar conectar de novo',
    openPayment: 'Abrir pagamento',
    cancelOrder: 'Cancelar',
    vacancyOne: 'vaga',
    vacancyMany: 'vagas',
    priceUsd: 'Preço (US$)',
    releasing: 'Liberando…',
    openingPay: 'Abrindo pagamento…',
    checkingStock: 'Conferindo disponibilidade…',
    checkingStockHint: 'Confirmando se a vaga ainda está aprovada. Não feche esta tela.',
    openingPayHint: 'Vaga confirmada. Abrindo o pagamento.',
    grab: 'Pegar',
    noPrice: 'Sem preço',
    soldOut: 'Esgotada',
    seekingVacancies: 'Buscando vagas…',
    seekingHint: 'Isso pode levar uns segundos.',
    noRegionQ: 'Nenhuma região com',
    tryOtherName: 'Tenta outro nome, a cidade ou o estado.',
    noVacanciesNow: 'Nenhuma vaga agora',
    vacancyMap: 'Mapa',
    vacancyList: 'Lista',
    comeBack: 'Volte daqui a pouco.',
    priceHint: 'Preço inteiro em dólar. Ex.: 50, 60, 100, 200. Zero = não vende.',
    savePrices: 'Salvar preços',
    vacancyShareList: 'Gerar lista',
    vacancyShareCopying: 'Copiando…',
    vacancyShareEmpty: 'Nenhuma vaga disponível com valor.',
    vacancyShareCopied: 'Lista copiada ({cities} cidades).',
    vacancyShareCopyFail: 'Não deu para copiar a lista.',
    otherStates: 'Outras',
    sendingSelfie: 'Enviando selfie…',
    startingEllipsis: 'Iniciando…',
    confirmedQueue: 'Confirmado. Enviando para a fila…',
    selfieQueued: 'Selfie na fila.',
    appQueued: 'Aplicação na fila. Acompanhe aqui.',
    viewPass: 'Ver senha Amazon',
    viewOnboarding: 'Ver onboarding',
    viewOnboardingTitle: 'Sessão Amazon',
    viewOnboardingHint: 'Mesmo IP da ficha. Toque para clicar e arraste para rolar.',
    viewOnboardingWait: 'Abrindo a sessão no mesmo IP…',
    viewOnboardingBack: 'Voltar',
    viewOnboardingHome: 'Menu',
    viewOnboardingTypePlaceholder: 'Digite na tela…',
    viewOnboardingSend: 'Enviar',
    viewOnboardingBackspace: 'Apagar',
    viewOnboardingEnter: 'Enter',
    changeStatus: 'Alterar status',
    reconnectBtn: 'Reconectar conta',
    accessTitle: 'Acesso',
    accessEmailPassword: 'Senha do e-mail',
    accessAccountPassword: 'Senha da conta',
    accessOpenEmail: 'Abrir e-mail',
    accessCopy: 'Copiar',
    accessCopyAll: 'Copiar acesso',
    accessEmail: 'E-mail',
    accessMailLine: 'Acessar e-mail',
    accessMailMissingAdmin: 'Não deu para detectar o login deste e-mail.',
    hubEyebrow: 'Visão geral da operação',
    hubLead: 'Acompanhe cada conta e encontre o que precisa da sua atenção.',
    hubKpiAll: 'Aplicações não arquivadas',
    hubKpiReview: 'Identidade ou antecedentes',
    hubKpiIdvOk: 'Verificação confirmada',
    hubKpiComplete: 'Inclui concluídas arquivadas',
    hubAttentionTitle: 'Pendências e conexão',
    hubAttentionHint: 'Atalhos por situação',
    hubYourApps: 'Suas aplicações',
    hubReviewScope: 'Identidade, selfie e antecedentes. TAX aguardando validação aparece na lista geral.',
    hubShowing: 'Exibindo',
    hubClearFilter: 'Limpar filtro',
    backToApps: 'Voltar para aplicações',
    taxWaitTitle: 'TAX aguardando a Amazon',
    taxWaitBody: 'A conta bancária entra após a aceitação do TAX. As demais etapas seguem normalmente.',
    sessionRetryTitle: 'Verificação pendente',
    sessionRetryBody: 'A leitura não foi concluída. O último estado confirmado foi preservado.',
    reconnectNoticeTitle: 'Reconexão necessária',
    reconnectNoticeBody: 'A autenticação foi perdida. As etapas já confirmadas continuam visíveis.',
    offboardedNoticeTitle: 'Conta Amazon desativada',
    offboardedNoticeBody: 'Desativação identificada. Esta conta não entra em Reconectar nem em Em análise.',
    taxValidating: 'TAX em validação',
    taxWaitBank: 'A Amazon está conferindo o TAX. O preenchimento bancário aguarda essa aceitação, sem bloquear as demais etapas.',
    lastAmazonRead: 'Leitura Amazon',
    docsHint: 'Arquivos da aplicação e foto da pessoa.',
    personalHint: 'Revise as informações lidas dos documentos.',
    filledOk: 'Preenchidos',
    ringDone: 'Concluído',
    currentStage: 'Etapa atual',
    applicationStatus: 'Situação da aplicação',
    amazonConnection: 'Conexão Amazon',
    docsSection: 'Documentos',
    onlyMine: 'Somente minhas',
    opNav: 'Operação',
    accountMenu: 'Menu da conta',
    contextFollow: 'Etapas e conexão Amazon',
    adminMenuShort: 'Admin',
    adminSection: 'Administração',
    sideContextTitle: 'Toda a operação, em um lugar.',
    sideContextBody: 'Da conexão ao acompanhamento de cada aplicação.',
    docsAndData: 'Documentos e dados',
    tabPayment: 'Pagamento',
    tabHistory: 'Histórico',
    stepsOf: '{done} de {total} etapas concluídas',
    nextAction: 'Próxima ação',
    viewAccess: 'Ver acesso',
  },
  'en-US': {
    logout: 'Sign out',
    accountRole: 'Account',
    adminRole: 'Admin',
    menu: 'Menu',
    auditNav: 'Audit',
    searchAccounts: 'Search account, email, region…',
    searchAccountsOwner: 'Search account, region, or user email…',
    ownerFilterActive: 'User: {email}',
    hubMine: 'Mine',
    searchVacancies: 'Search region, city or state…',
    applications: 'Applications',
    refreshAnalysis: 'Check reviews',
    refreshAnalysisHint: 'Only accounts in review.',
    refreshFull: 'Refresh all',
    refreshFullHint: 'Reads the full Amazon package.',
    checkingAnalysis: 'Checking reviews {done}/{total}',
    refreshAnalysisDone: '{concluded} completed · {idvFailed} identity failed · {otherFailed} read failed · {still} still in review',
    refreshAnalysisEmpty: 'No accounts in review.',
    amazonRead: 'Amazon',
    amazonReadNever: 'Amazon not read',
    noneInFilter: 'No accounts in this filter',
    noneInFilterBody: 'Change the filter or search to see other accounts.',
    archiveSelected: 'Archive selected',
    restoreSelected: 'Restore selected',
    selectVisible: 'Select visible',
    selectedCount: 'selected',
    awaiting: 'Waiting',
    colAccount: 'Account',
    colRegion: 'Region',
    colStage: 'Current step',
    colUpdated: 'Updated',
    restore: 'Restore',
    step_basic_info: 'Info',
    step_legal_documents: 'Contracts',
    step_auto_insurance: 'Insurance',
    step_videos: 'Videos',
    step_getting_paid: 'TAX / Payment',
    step_tax_interview: 'TAX / Payment',
    step_payment_information: 'TAX / Payment',
    step_driver_license: 'Driver license',
    step_id_verification: 'Driver license',
    step_id_selfie: 'Selfie',
    step_background_check: 'Background',
    step_photo_upload: 'Photo',
    st_draft: 'Draft',
    st_connected: 'Connected',
    st_ready: 'Data ready',
    st_queued: 'Queued',
    st_running: 'Applying',
    st_in_progress: 'In progress',
    st_pending: 'Pending',
    st_pending_review: 'In review',
    st_review: 'In review',
    st_duplicate: 'Duplicate',
    st_action_required: 'Attention',
    st_consider: 'Consider',
    st_complete: 'Completed',
    st_failed: 'Failed',
    st_error: 'Attention',
    st_blocked: 'Attention',
    st_archived: 'Archived',
    archivedViewOnly: 'View only. It stays archived.',
    st_offboarded: 'Deactivated',
    reconnectOptionalBtn: 'Reconnect (optional)',
    st_session_retry_pending: 'Connection check pending',
    st_session_fresh: 'Connected',
    st_session_expired: 'Reconnect',
    st_session_unknown: 'No session',
    st_session_not_monitored: 'Not monitored',
    hsDlSent: 'Driver license sent.',
    hsSelfieNotSent: 'The selfie has not been sent yet.',
    hsNeedDlFirst: 'Finish the Driver license before the selfie.',
    hsNeedFace: 'A face photo is still missing for the selfie.',
    hsSelfiePending: 'Selfie not sent. Without a person photo, this step stays pending.',
    hsPayFail: 'Could not finish payment.',
    hsSessionBad: 'Amazon could not read the data. Reconnect the session.',
    hsNameMismatch: 'Amazon did not accept the Driver license name.',
    hsLegalDone: 'Contracts completed.',
    hsInsDone: 'Insurance completed.',
    hsVidDone: 'Videos completed.',
    hsBasicSent: 'Personal info sent.',
    hsAmazonReview: 'Amazon is reviewing.',
    hsNeedDl: 'Driver license still needs to be sent.',
    hsSelfieNotStarted: 'Not started',
    hsAmazonRejected: 'Amazon did not accept the document.',
    hsDlRejected: 'Amazon did not accept the Driver license. Send sharp front and back photos.',
    hsDlExpired: 'Driver license expired. Submit a valid document.', hsBgEmail: 'Check your email for the next background check steps.', hsTransport: 'Could not reach the service. Try again.',
    hsIdvDeniedAfterReview: 'Amazon rejected the verification after review.',
    hsSelfieRejected: 'Amazon did not accept the selfie.',
    hsTaxSkip: 'The bank account setup is pending.',
    hsTaxPaymentBlocked: 'The bank account setup is waiting for the tax issue to be resolved.',
    hsTaxPaymentWaiting: 'The bank account setup is waiting for tax approval.',
    hsTaxPaymentAfterComplete: 'Tax is complete. The bank account setup is still pending.',
    hsTaxWaiting: '⏳ Amazon is still reviewing tax. The bank account starts after they accept. The rest already continues.',
    hsIrsNameSsn: 'The name and SSN do not match. Review these details to complete TAX.',
    irsSsnTitle: 'TAX SSN',
    irsSsnAsk: '⚠️ Name and SSN do not match. Enter the correct SSN.',
    irsSsnHint: 'SSN only. The rest of the application stays as is.',
    irsSsnConfirm: 'Confirm and send',
    irsSsnCancel: 'Cancel',
    irsSsnLoading: 'Sending the SSN…',
    irsSsnWait: 'This may take a moment.',
    irsSsnOk: '✅ SSN accepted. TAX updated.',
    irsSsnFail: 'It did not go through. Check the SSN or cancel.',
    irsSsnRetry: 'Try again',
    irsSsnNeedSession: 'Reconnect the session to send the SSN.',
    irsSsnBad: 'Enter the 9 SSN digits.',
    irsSsnResolve: 'Fix tax',
    irsSsnPayPending: 'TAX ok. Payment is still pending.',
    hsBgReview: 'Background check in review.',
    prepSsnMissing: 'SSN not found',
    prepPhoneMissing: 'Phone not generated',
    prepPhotoMissing: 'Photo not generated',
    prepOcrFail: 'Could not read the Driver license',
    prepFail: 'Prep failed',
    prepReady: 'Prep ready',
    now: 'Now',
    progress: 'Progress',
    currentName: 'Current name',
    session: 'Session',
    region: 'Region',
    stepsTitle: 'Steps',
    connectedAt: 'Connected on',
    archiveAccount: 'Archive account',
    deleteForever: 'Delete permanently',
    deleteForeverTitle: 'Permanently delete account',
    deleteForeverConfirm: 'This action cannot be undone. The account, its runs, steps, events, and uploaded files will be deleted. Financial and audit logs remain without an account link.',
    deleteForeverSuccess: 'Account permanently deleted.',
    appData: 'Application data',
    docsStart: 'Documents & start',
    readyOk: 'Ready',
    pending: 'Pending',
    dlFront: 'DL front',
    dlBack: 'DL back',
    personPhoto: 'Person photo',
    profilePhoto: 'Profile photo',
    docsReady: 'Driver license and person photo are ready.',
    attachDocs: 'Attach front and back. Person photo is optional.',
    attachDocsLegacy: 'Attach front, back and photo.',
    personalData: 'Personal info',
    ssnNotFound: 'SSN not found',
    ssnBypassP: 'Background uses a temporary SSN. Payment waits until the real SSN.',
    ssnBypassCanStart: 'You can start anyway. Background uses a temporary SSN and payment stays pending.',
    startWithoutSsn: 'Start without SSN',
    payment: 'Payment',
    autoGenerate: 'Blank = auto generate',
    saveData: 'Save data',
    reviewHint: 'Review the filled data.',
    generatePhone: 'Generate',
    generatePhoneAria: 'Generate phone',
    docView: 'View',
    docDownload: 'Download',
    docReplace: 'Replace',
    docAttach: 'Attach',
    detailRefreshing: 'Updating…',
    panelEntering: 'Signing in…',
    panelLoading: 'Loading your applications…',
    hubConsulting: 'Checking applications',
    hubConsultingHint: 'Wait a moment. The list is still arriving.',
    panelReadFailed: 'Could not load the dashboard. You are still signed in.',
    panelTryAgain: 'Try again',
    panelLoginFailed: 'Could not sign in right now. Please try again.',
    panelLoginLimited: 'Too many attempts. Please wait before trying again.',
    detailSaving: 'Saving…',
    detailWorkingHint: 'Please wait. Keep this screen open.',
    detailUpdated: 'Application updated.',
    detailSaved: 'Data saved successfully.',
    detailRefreshFailed: 'Could not update the application. Please try again.',
    detailSaveUnconfirmed: 'Could not confirm the save. Your data is still on this screen. Check before trying again.',
    detailSavedReadFailed: 'Data saved. Could not reload the application. Use Refresh to check.',
    reviewFilesPreparing: 'Preparing files for resubmission…',
    reviewFilesReady: 'Files ready. Resubmit when you choose.',
    reviewFilesFailed: 'Could not prepare the files. Please try again.',
    reviewFilesMissing: 'Attach and save the person’s photo to prepare resubmission.',
    reviewFilesRetry: 'Try again',
    preparingWait: 'Preparing data. Wait to start.',
    canStart: 'Data and files are already there. Update if you need.',
    canStartBypass: 'You can start. Payment SSN can wait.',
    fillDocs: 'Fill the data and attach the Driver license.',
    continueSelfie: 'Continue selfie',
    resendDl: 'Resend Driver license',
    attentionNeeded: 'Needs attention',
    noRunYet: 'No run yet. Start the application to follow the live log.',
    waitingRead: 'Waiting for read',
    confirm: 'Confirm',
    cancel: 'Cancel',
    cropAttach: 'Attach',
    cropTitleId: 'Fit Driver license',
    cropTitlePhoto: 'Crop image',
    cropTitleSelfie: 'Fit the face',
    cropHintId: 'Fit the card in the frame. What is inside is what Amazon receives.',
    cropHintPhoto: 'Drag the box to move it and use the corners to resize the crop.',
    cropHintSelfie: 'Fit the face in the oval. The frame is the file Amazon receives.',
    cropFit: 'Fit',
    cropUse: 'Use this crop',
    cropRotate: 'Rotate 90',
    cropMinus: 'Zoom out',
    cropPlus: 'Zoom in',
    photoKindEyebrow: 'Person photo',
    photoKindTitle: 'Attach the one you have',
    photoKindLead: 'These two photos are just examples. You upload yours next.',
    photoKindOriginal: 'Original photo',
    photoKindOriginalHint: 'Selfie of the person. Good quality, good lighting.',
    photoKindReference: 'Reference photo',
    photoKindReferenceHint: 'Generated by Apex Creator.',
    photoKindExampleTag: 'example',
    photoKindOriginalTag: 'original',
    photoKindReferenceTag: 'reference',
    photoOriginalSureTitle: 'Are you sure?',
    photoOriginalSureP: 'This only works with an original photo of the person. Good quality, good lighting. Do not use a photo generated by Apex Creator.',
    photoOriginalSureWarn: '⚠️ This option needs an original, sharp photo.',
    photoOriginalSureYes: 'Continue',
    photoOriginalSureBack: 'Back',
    addDisclaimerTitle: '⚠️ No approval guarantee',
    addDisclaimer: 'Apex Apply does not guarantee approval at any time. It is only a tool to help with your Amazon Flex application. Amazon decides 100%, based on the files you attached.',
    addDisclaimerBack: 'Back',
    addDisclaimerBtn: 'I understand, add',
    close: 'Close',
    ok: 'OK',
    revName: 'Name',
    revPhone: 'Phone',
    revAddress: 'Address',
    revCity: 'City',
    revSsn: 'SSN',
    revDl: 'DL',
    revDob: 'DOB / DL',
    revBank: 'Bank',
    reconnectTitle: 'Reconnect Amazon account',
    connectTitle: 'Connect Amazon account',
    reconnectP: 'Sign in to Amazon again. Data, documents, and completed progress will be preserved.',
    connectLinkedP: 'The account is already linked. Send the front and back of the Driver license to continue.',
    connectNewP: 'Sign in to Amazon and send the front and back of the Driver license. Photo is optional.',
    loginAmazon: 'Amazon login',
    connectAuto: 'Connect automatically',
    sessionConnected: 'Session connected',
    sessionConnectedP: 'The account is already linked. Send the front and back of the Driver license to continue.',
    connectDesc: 'Enter email and password. Apply signs in on a protected session and does not keep the password.',
    amazonEmail: 'Amazon email',
    amazonPassword: 'Amazon password',
    connecting: 'Connecting…',
    connectAmazonBtn: 'Connect Amazon',
    otpAsked: 'Amazon asked for a code',
    otpPlaceholder: 'OTP code',
    sendOtp: 'Send code',
    approvalAsked: 'Approve this sign-in on your Amazon phone. Waiting…',
    loginBusyHint: 'Secure login in progress. Wait…',
    credsError: 'Amazon rejected the email or password.',
    manualNeeded: 'Amazon asked for a manual step. Use manual access below.',
    passwordHint: 'The password exists only for this attempt and is then discarded.',
    useManual: 'Use manual connection',
    manualDesc: 'Fallback for CAPTCHA, device approval or a challenge we cannot automate.',
    openAmazonLogin: 'Open Amazon login',
    copyLink: 'Copy link',
    linkReady: 'Link ready. If Amazon did not open, copy and open it in the browser.',
    clickToOpen: 'Tap the button to open Amazon.',
    returnUrl: 'Return URL',
    pasteHere: 'paste the final URL after login',
    connectManually: 'Connect manually',
    sessionSaved: 'Session saved.',
    pasteThenConnect: 'After pasting the return URL, connect the session.',
    documents: 'Documents',
    front: 'Front',
    back: 'Back',
    photo: 'Photo',
    optional: 'optional',
    attach: 'Attach',
    removePhoto: 'Remove photo',
    dlRequiredHint: 'Front and back are required. Person photo is optional.',
    connectSelfieSkipWarn: '⚠️ Without a person photo, the selfie will not be sent. That step stays pending and the rest of the application continues.',
    addAccount: 'Add account',
    addReconnect: 'Add reconnection',
    reconnectSuccess: 'Account reconnected successfully.',
    add: 'Add',
    vacanciesTitle: 'Spots',
    vacanciesSub: 'Pay the region. The account comes in on its own.',
    freeTab: '🎁 Free for you',
    allVacanciesTab: 'All spots',
    freeBannerTitle: '{remaining} of {limit} free spots left',
    freeBannerBody: 'Choose any combination of these regions. Each claim uses 1 choice and shares the live stock.',
    freeRemaining: '{remaining} of {limit} left',
    freeLabel: 'Free',
    freeBenefit: 'Customer benefit',
    grabFree: 'Get free',
    freeReleasing: 'Releasing…',
    freeConfirmTitle: 'Confirm free spot',
    freeConfirm: 'The {city} account will appear in Applications and use 1 of your {limit} choices.',
    freeNoStock: 'These regions are sold out right now. The tab stays available and new spots appear automatically.',
    freeClaimInProgress: 'This claim is still finishing. Try again in a moment.',
    vacancyConnected: 'Spot connected',
    paidNoAccount: 'Paid, but the account did not come in',
    paymentPending: 'Payment pending',
    attachDl: 'Attach Driver license',
    retryConnect: 'Try connecting again',
    openPayment: 'Open payment',
    cancelOrder: 'Cancel',
    vacancyOne: 'spot',
    vacancyMany: 'spots',
    priceUsd: 'Price (US$)',
    releasing: 'Releasing…',
    openingPay: 'Opening payment…',
    checkingStock: 'Checking availability…',
    checkingStockHint: 'Confirming this vacancy is still approved. Keep this screen open.',
    openingPayHint: 'Vacancy confirmed. Opening payment.',
    grab: 'Get',
    noPrice: 'No price',
    soldOut: 'Sold out',
    seekingVacancies: 'Looking for spots…',
    seekingHint: 'This can take a few seconds.',
    noRegionQ: 'No region matching',
    tryOtherName: 'Try another name, city or state.',
    noVacanciesNow: 'No spots right now',
    vacancyMap: 'Map',
    vacancyList: 'List',
    comeBack: 'Check back in a bit.',
    priceHint: 'Whole dollar price. Ex.: 50, 60, 100, 200. Zero = not for sale.',
    savePrices: 'Save prices',
    vacancyShareList: 'Generate list',
    vacancyShareCopying: 'Copying…',
    vacancyShareEmpty: 'No vacancies with a price.',
    vacancyShareCopied: 'List copied ({cities} cities).',
    vacancyShareCopyFail: 'Could not copy the list.',
    otherStates: 'Other',
    sendingSelfie: 'Sending selfie…',
    startingEllipsis: 'Starting…',
    confirmedQueue: 'Confirmed. Sending to the queue…',
    selfieQueued: 'Selfie queued.',
    appQueued: 'Application queued. Follow it here.',
    viewPass: 'View Amazon password',
    viewOnboarding: 'View onboarding',
    viewOnboardingTitle: 'Amazon session',
    viewOnboardingHint: 'Same IP as the account. Tap to click and drag to scroll.',
    viewOnboardingWait: 'Opening the session on the same IP…',
    viewOnboardingBack: 'Back',
    viewOnboardingHome: 'Menu',
    viewOnboardingTypePlaceholder: 'Type on the screen…',
    viewOnboardingSend: 'Send',
    viewOnboardingBackspace: 'Backspace',
    viewOnboardingEnter: 'Enter',
    changeStatus: 'Change status',
    reconnectBtn: 'Reconnect account',
    accessTitle: 'Access',
    hubEyebrow: 'Operations overview',
    hubLead: 'Follow each account and find what needs your attention.',
    hubKpiAll: 'Applications that are not archived',
    hubKpiReview: 'Identity or background check',
    hubKpiIdvOk: 'Verification confirmed',
    hubKpiComplete: 'Includes archived completed accounts',
    hubAttentionTitle: 'Issues and connection',
    hubAttentionHint: 'Shortcuts by status',
    hubYourApps: 'Your applications',
    hubReviewScope: 'Identity, selfie and background check. TAX waiting for review stays in the full list.',
    hubShowing: 'Showing',
    hubClearFilter: 'Clear filter',
    backToApps: 'Back to applications',
    taxWaitTitle: 'TAX waiting on Amazon',
    taxWaitBody: 'The bank account starts after TAX is accepted. The other steps continue.',
    sessionRetryTitle: 'Read pending',
    sessionRetryBody: 'The last confirmed state was kept. This is not a deactivation.',
    reconnectNoticeTitle: 'Reconnect required',
    reconnectNoticeBody: 'Authentication was lost. Confirmed steps stay visible.',
    offboardedNoticeTitle: 'Amazon account deactivated',
    offboardedNoticeBody: 'This account is not in Reconnect or In review.',
    taxValidating: 'TAX in review',
    taxWaitBank: 'Amazon is still reviewing TAX. Bank details wait for that acceptance. Other steps already continue.',
    lastAmazonRead: 'Amazon read',
    docsHint: 'Application files and the person photo.',
    personalHint: 'Review the data read from the documents.',
    filledOk: 'Filled',
    ringDone: 'Done',
    currentStage: 'Current step',
    applicationStatus: 'Application status',
    amazonConnection: 'Amazon connection',
    docsSection: 'Documents',
    onlyMine: 'Mine only',
    opNav: 'Operations',
    accountMenu: 'Account menu',
    contextFollow: 'Steps and Amazon connection',
    adminMenuShort: 'Admin',
    adminSection: 'Administration',
    sideContextTitle: 'The whole operation, in one place.',
    sideContextBody: 'From connection to following each application.',
    docsAndData: 'Documents and data',
    tabPayment: 'Payment',
    tabHistory: 'History',
    stepsOf: '{done} of {total} steps done',
    nextAction: 'Next action',
    viewAccess: 'View access',
    accessEmailPassword: 'Email password',
    accessAccountPassword: 'Account password',
    accessOpenEmail: 'Open email',
    accessCopy: 'Copy',
    accessCopyAll: 'Copy access',
    accessEmail: 'Email',
    accessMailLine: 'Open email',
    accessMailMissingAdmin: 'Could not detect the login link for this email.',
  },
  'es-CO': {
    logout: 'Salir',
    accountRole: 'Cuenta',
    adminRole: 'Admin',
    menu: 'Menú',
    auditNav: 'Auditoría',
    searchAccounts: 'Buscar cuenta, correo, región…',
    searchAccountsOwner: 'Buscar cuenta, región o correo del usuario…',
    ownerFilterActive: 'Usuario: {email}',
    hubMine: 'Mías',
    searchVacancies: 'Buscar región, ciudad o estado…',
    applications: 'Aplicaciones',
    refreshAnalysis: 'Chequear análisis',
    refreshAnalysisHint: 'Solo lo que está en análisis.',
    refreshFull: 'Actualizar todo',
    refreshFullHint: 'Vuelve a leer el paquete entero.',
    checkingAnalysis: 'Chequeando análisis {done}/{total}',
    refreshAnalysisDone: '{concluded} concluyeron · {idvFailed} fallaron identidad · {otherFailed} fallaron lectura · {still} siguen',
    refreshAnalysisEmpty: 'Ninguna cuenta en análisis.',
    amazonRead: 'Amazon',
    amazonReadNever: 'Amazon no leída',
    noneInFilter: 'Ninguna cuenta en este filtro',
    noneInFilterBody: 'Ajusta el filtro o la búsqueda para ver otras cuentas.',
    archiveSelected: 'Archivar seleccionadas',
    restoreSelected: 'Restaurar seleccionadas',
    selectVisible: 'Seleccionar visibles',
    selectedCount: 'seleccionada(s)',
    awaiting: 'En espera',
    colAccount: 'Cuenta',
    colRegion: 'Región',
    colStage: 'Etapa actual',
    colUpdated: 'Actualizado',
    restore: 'Restaurar',
    step_basic_info: 'Datos',
    step_legal_documents: 'Contratos',
    step_auto_insurance: 'Seguro',
    step_videos: 'Videos',
    step_getting_paid: 'TAX / Pago',
    step_tax_interview: 'TAX / Pago',
    step_payment_information: 'TAX / Pago',
    step_driver_license: 'Driver license',
    step_id_verification: 'Driver license',
    step_id_selfie: 'Selfie',
    step_background_check: 'Antecedentes',
    step_photo_upload: 'Foto',
    st_draft: 'Borrador',
    st_connected: 'Conectada',
    st_ready: 'Datos listos',
    st_queued: 'En cola',
    st_running: 'Aplicando',
    st_in_progress: 'En curso',
    st_pending: 'Pendiente',
    st_pending_review: 'En revisión',
    st_review: 'En revisión',
    st_duplicate: 'Duplicada',
    st_action_required: 'Atención',
    st_consider: 'Consider',
    st_complete: 'Completada',
    st_failed: 'Fallo',
    st_error: 'Atención',
    st_blocked: 'Atención',
    st_archived: 'Archivada',
    archivedViewOnly: 'Solo consulta. Sigue archivada.',
    st_offboarded: 'Desactivada',
    reconnectOptionalBtn: 'Reconectar (opcional)',
    st_session_retry_pending: 'Verificación pendiente',
    st_session_fresh: 'Conexión ok',
    st_session_expired: 'Reconectar',
    st_session_unknown: 'Sin conexión',
    st_session_not_monitored: 'Sin monitoreo',
    hsDlSent: 'Driver license enviado.',
    hsSelfieNotSent: 'La selfie todavía no se envió.',
    hsNeedDlFirst: 'Termina el Driver license antes de la selfie.',
    hsNeedFace: 'Falta la foto del rostro para la selfie.',
    hsSelfiePending: 'Selfie no enviada. Sin foto de la persona, esta etapa queda pendiente.',
    hsPayFail: 'No se pudo terminar el pago.',
    hsSessionBad: 'Amazon no leyó los datos. Reconecta la sesión.',
    hsNameMismatch: 'Amazon no aceptó el nombre de la Driver license.',
    hsLegalDone: 'Contratos listos.',
    hsInsDone: 'Seguro listo.',
    hsVidDone: 'Videos listos.',
    hsBasicSent: 'Datos personales enviados.',
    hsAmazonReview: 'Amazon está revisando.',
    hsNeedDl: 'Falta enviar el Driver license.',
    hsSelfieNotStarted: 'No iniciada',
    hsAmazonRejected: 'Amazon no aceptó el documento.',
    hsDlRejected: 'Amazon no aceptó la Driver license. Envía frente y reverso nítidos.',
    hsDlExpired: 'Driver license vencida. Envía un documento vigente.', hsBgEmail: 'Revisa tu correo para los siguientes pasos de los antecedentes.', hsTransport: 'No se pudo comunicar con el servicio. Inténtalo de nuevo.',
    hsIdvDeniedAfterReview: 'Amazon rechazó la verificación después del análisis.',
    hsSelfieRejected: 'Amazon no aceptó la selfie.',
    hsTaxSkip: 'El registro bancario está pendiente.',
    hsTaxPaymentBlocked: 'El registro bancario espera la solución del problema fiscal.',
    hsTaxPaymentWaiting: 'El registro bancario espera la aprobación del TAX.',
    hsTaxPaymentAfterComplete: 'La parte fiscal está completa. El registro bancario sigue pendiente.',
    hsTaxWaiting: '⏳ Amazon sigue revisando el TAX. La cuenta bancaria entra cuando lo acepte. El resto ya sigue.',
    hsIrsNameSsn: 'El nombre y el SSN no coinciden. Revisa estos datos para completar el TAX.',
    irsSsnTitle: 'SSN del TAX',
    irsSsnAsk: '⚠️ Nombre y SSN no coinciden. Escribe el SSN correcto.',
    irsSsnHint: 'Solo el SSN. El resto de la aplicación no cambia.',
    irsSsnConfirm: 'Confirmar y enviar',
    irsSsnCancel: 'Cancelar',
    irsSsnLoading: 'Enviando el SSN…',
    irsSsnWait: 'Puede tardar un poco.',
    irsSsnOk: '✅ SSN aceptado. TAX actualizado.',
    irsSsnFail: 'No pasó. Revisa el SSN o cancela.',
    irsSsnRetry: 'Intentar de nuevo',
    irsSsnNeedSession: 'Reconecta la sesión para enviar el SSN.',
    irsSsnBad: 'Escribe los 9 números del SSN.',
    irsSsnResolve: 'Solucionar tax',
    irsSsnPayPending: 'TAX ok. El pago sigue pendiente.',
    hsBgReview: 'Antecedentes en revisión.',
    prepSsnMissing: 'SSN no encontrado',
    prepPhoneMissing: 'Teléfono no generado',
    prepPhotoMissing: 'Foto no generada',
    prepOcrFail: 'No se pudo leer el Driver license',
    prepFail: 'La preparación falló',
    prepReady: 'Preparación lista',
    now: 'Ahora',
    progress: 'Progreso',
    currentName: 'Nombre actual',
    session: 'Sesión',
    region: 'Región',
    stepsTitle: 'Etapas',
    connectedAt: 'Conectada el',
    archiveAccount: 'Archivar cuenta',
    deleteForever: 'Eliminar definitivamente',
    deleteForeverTitle: 'Eliminar cuenta definitivamente',
    deleteForeverConfirm: 'Esta acción es irreversible. Se eliminarán la cuenta, sus ejecuciones, etapas, eventos y archivos enviados. Los registros financieros y de auditoría permanecerán sin vínculo con la cuenta.',
    deleteForeverSuccess: 'Cuenta eliminada definitivamente.',
    appData: 'Datos de la aplicación',
    docsStart: 'Documentos e inicio',
    readyOk: 'Listos',
    pending: 'Pendientes',
    dlFront: 'DL frente',
    dlBack: 'DL reverso',
    personPhoto: 'Foto de la persona',
    profilePhoto: 'Foto de perfil',
    docsReady: 'Driver license y foto de la persona listos.',
    attachDocs: 'Adjunta frente y reverso. La foto de la persona es opcional.',
    attachDocsLegacy: 'Adjunta frente, reverso y foto.',
    personalData: 'Datos personales',
    ssnNotFound: 'SSN no encontrado',
    ssnBypassP: 'Antecedentes siguen con un SSN provisional. El pago espera el SSN real.',
    ssnBypassCanStart: 'Puedes iniciar igual. Antecedentes usan un SSN provisional y el pago queda pendiente.',
    startWithoutSsn: 'Iniciar sin SSN',
    payment: 'Pago',
    autoGenerate: 'Vacío = se genera solo',
    saveData: 'Guardar datos',
    reviewHint: 'Revisa los datos llenos.',
    generatePhone: 'Generar',
    generatePhoneAria: 'Generar teléfono',
    docView: 'Ver',
    docDownload: 'Descargar',
    docReplace: 'Reemplazar',
    docAttach: 'Adjuntar',
    detailRefreshing: 'Actualizando…',
    panelEntering: 'Entrando…',
    panelLoading: 'Cargando tus solicitudes…',
    hubConsulting: 'Consultando aplicaciones',
    hubConsultingHint: 'Espera un momento. La lista todavía está llegando.',
    panelReadFailed: 'No se pudo cargar el panel. Tu acceso se mantuvo.',
    panelTryAgain: 'Intentar de nuevo',
    panelLoginFailed: 'No se pudo entrar ahora. Intenta de nuevo.',
    panelLoginLimited: 'Demasiados intentos. Espera un poco antes de intentar de nuevo.',
    detailSaving: 'Guardando…',
    detailWorkingHint: 'Espera. No cierres esta pantalla.',
    detailUpdated: 'Aplicación actualizada.',
    detailSaved: 'Datos guardados correctamente.',
    detailRefreshFailed: 'No se pudo actualizar la aplicación. Intenta de nuevo.',
    detailSaveUnconfirmed: 'No se pudo confirmar que los datos se guardaron. Siguen en esta pantalla. Revisa antes de intentar de nuevo.',
    detailSavedReadFailed: 'Datos guardados. No se pudo recargar la ficha. Usa Actualizar para revisar.',
    reviewFilesPreparing: 'Preparando archivos para reenviar…',
    reviewFilesReady: 'Archivos listos. Reenvía cuando quieras.',
    reviewFilesFailed: 'No se pudieron preparar los archivos. Intenta de nuevo.',
    reviewFilesMissing: 'Adjunta y guarda la foto de la persona para preparar el reenvío.',
    reviewFilesRetry: 'Intentar de nuevo',
    preparingWait: 'Preparando datos. Espera para iniciar.',
    canStart: 'Los datos y archivos ya están. Puedes actualizar si hace falta.',
    canStartBypass: 'Puedes iniciar. El SSN del pago queda para después.',
    fillDocs: 'Llena los datos y adjunta el Driver license.',
    continueSelfie: 'Continuar selfie',
    resendDl: 'Reenviar Driver license',
    attentionNeeded: 'Necesita atención',
    noRunYet: 'Sin ejecución aún. Inicia la aplicación para ver el registro en vivo.',
    waitingRead: 'Esperando lectura',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    cropAttach: 'Adjuntar',
    cropTitleId: 'Encajar Driver license',
    cropTitlePhoto: 'Recortar imagen',
    cropTitleSelfie: 'Encaja el rostro',
    cropHintId: 'Encaja el carnet en el molde. Lo que está adentro es lo que Amazon recibe.',
    cropHintPhoto: 'Arrastra el recuadro para moverlo y usa las esquinas para ajustar.',
    cropHintSelfie: 'Encaja el rostro en el óvalo. El recuadro es el archivo que Amazon recibe.',
    cropFit: 'Encajar',
    cropUse: 'Usar este recorte',
    cropRotate: 'Girar 90',
    cropMinus: 'Alejar',
    cropPlus: 'Acercar',
    photoKindEyebrow: 'Foto de la persona',
    photoKindTitle: 'Anexa la que tienes',
    photoKindLead: 'Las dos fotos son solo ejemplo. Después mandas la tuya.',
    photoKindOriginal: 'Foto original',
    photoKindOriginalHint: 'Selfie de la persona. Buena calidad, buena luz.',
    photoKindReference: 'Foto de referencia',
    photoKindReferenceHint: 'Generada por Apex Creator.',
    photoKindExampleTag: 'ejemplo',
    photoKindOriginalTag: 'original',
    photoKindReferenceTag: 'referencia',
    photoOriginalSureTitle: '¿Seguro?',
    photoOriginalSureP: 'Esto solo funciona con una foto original de la persona. Buena calidad, buena luz. No uses una foto generada por Apex Creator.',
    photoOriginalSureWarn: '⚠️ Esta opción necesita una foto original y nítida.',
    photoOriginalSureYes: 'Continuar',
    photoOriginalSureBack: 'Volver',
    addDisclaimerTitle: '⚠️ Sin garantía de aprobación',
    addDisclaimer: 'Apex Apply no garantiza aprobación en ningún momento. Es solo una herramienta para ayudar en la aplicación de tu cuenta Amazon Flex. Quien decide es 100% Amazon, con base en los archivos que anexaste.',
    addDisclaimerBack: 'Volver',
    addDisclaimerBtn: 'Entendí, agregar',
    close: 'Cerrar',
    ok: 'OK',
    revName: 'Nombre',
    revPhone: 'Tel',
    revAddress: 'Dirección',
    revCity: 'Ciudad',
    revSsn: 'SSN',
    revDl: 'DL',
    revDob: 'Nac. / DL',
    revBank: 'Banco',
    reconnectTitle: 'Reconectar cuenta Amazon',
    connectTitle: 'Conectar cuenta Amazon',
    reconnectP: 'Vuelve a entrar en Amazon. Los datos, documentos y pasos completados se conservarán.',
    connectLinkedP: 'La cuenta ya está vinculada. Envía el frente y el reverso del Driver license para seguir.',
    connectNewP: 'Entra a Amazon y envía el frente y el reverso del Driver license. La foto es opcional.',
    loginAmazon: 'Login en Amazon',
    connectAuto: 'Conectar automático',
    sessionConnected: 'Sesión conectada',
    sessionConnectedP: 'La cuenta ya está vinculada. Envía el frente y el reverso del Driver license para seguir.',
    connectDesc: 'Pon correo y contraseña. Apply entra en una sesión protegida y no guarda la contraseña.',
    amazonEmail: 'Correo Amazon',
    amazonPassword: 'Contraseña Amazon',
    connecting: 'Conectando…',
    connectAmazonBtn: 'Conectar Amazon',
    otpAsked: 'Amazon pidió un código',
    otpPlaceholder: 'Código OTP',
    sendOtp: 'Enviar código',
    approvalAsked: 'Aprueba el acceso en el celular de Amazon. Estamos esperando.',
    loginBusyHint: 'Login seguro en curso. Espera…',
    credsError: 'Amazon rechazó el correo o la contraseña.',
    manualNeeded: 'Amazon pidió un paso manual. Usa el acceso manual abajo.',
    passwordHint: 'La contraseña existe solo en este intento y luego se descarta.',
    useManual: 'Usar conexión manual',
    manualDesc: 'Respaldo para CAPTCHA, aprobación de dispositivo o un reto que no automatizamos.',
    openAmazonLogin: 'Abrir login de Amazon',
    copyLink: 'Copiar enlace',
    linkReady: 'Enlace listo. Si Amazon no abrió, copia y ábrelo en el navegador.',
    clickToOpen: 'Toca el botón para abrir Amazon.',
    returnUrl: 'URL de retorno',
    pasteHere: 'pega aquí la URL final después del login',
    connectManually: 'Conectar manualmente',
    sessionSaved: 'Sesión guardada.',
    pasteThenConnect: 'Después de pegar la URL de retorno, conecta la sesión.',
    documents: 'Documentos',
    front: 'Frente',
    back: 'Reverso',
    photo: 'Foto',
    optional: 'opcional',
    attach: 'Adjuntar',
    removePhoto: 'Quitar foto',
    dlRequiredHint: 'Frente y reverso son obligatorios. La foto de la persona es opcional.',
    connectSelfieSkipWarn: '⚠️ Sin la foto de la persona, la selfie no se envía. Esa etapa queda pendiente y el resto de la aplicación sigue.',
    addAccount: 'Agregar cuenta',
    addReconnect: 'Agregar reconexión',
    reconnectSuccess: 'Cuenta reconectada correctamente.',
    add: 'Agregar',
    vacanciesTitle: 'Cupos',
    vacanciesSub: 'Paga la región. La cuenta entra sola.',
    freeTab: '🎁 Gratis para ti',
    allVacanciesTab: 'Todos los cupos',
    freeBannerTitle: '{remaining} de {limit} cupos gratis restantes',
    freeBannerBody: 'Elige cualquier combinación de estas regiones. Cada retiro usa 1 elección y comparte el inventario.',
    freeRemaining: '{remaining} de {limit} restantes',
    freeLabel: 'Gratis',
    freeBenefit: 'Beneficio para clientes',
    grabFree: 'Tomar gratis',
    freeReleasing: 'Liberando…',
    freeConfirmTitle: 'Confirmar cupo gratis',
    freeConfirm: 'La cuenta de {city} entrará en Aplicaciones y usará 1 de tus {limit} elecciones.',
    freeNoStock: 'Estas regiones están agotadas ahora. La pestaña sigue disponible y los nuevos cupos entran automáticamente.',
    freeClaimInProgress: 'Este retiro todavía se está completando. Intenta de nuevo en un momento.',
    vacancyConnected: 'Cupo conectado',
    paidNoAccount: 'Pagó, pero la cuenta no entró',
    paymentPending: 'Pago pendiente',
    attachDl: 'Adjuntar Driver license',
    retryConnect: 'Intentar conectar de nuevo',
    openPayment: 'Abrir pago',
    cancelOrder: 'Cancelar',
    vacancyOne: 'cupo',
    vacancyMany: 'cupos',
    priceUsd: 'Precio (US$)',
    releasing: 'Liberando…',
    openingPay: 'Abriendo pago…',
    checkingStock: 'Comprobando disponibilidad…',
    checkingStockHint: 'Confirmando que la vacante sigue aprobada. No cierres esta pantalla.',
    openingPayHint: 'Vacante confirmada. Abriendo el pago.',
    grab: 'Tomar',
    noPrice: 'Sin precio',
    soldOut: 'Agotado',
    seekingVacancies: 'Buscando cupos…',
    seekingHint: 'Esto puede tardar unos segundos.',
    noRegionQ: 'Ninguna región con',
    tryOtherName: 'Prueba otro nombre, la ciudad o el estado.',
    noVacanciesNow: 'Ningún cupo ahora',
    vacancyMap: 'Mapa',
    vacancyList: 'Lista',
    comeBack: 'Vuelve en un rato.',
    priceHint: 'Precio entero en dólar. Ej.: 50, 60, 100, 200. Cero = no se vende.',
    savePrices: 'Guardar precios',
    vacancyShareList: 'Generar lista',
    vacancyShareCopying: 'Copiando…',
    vacancyShareEmpty: 'Ninguna vacante con precio.',
    vacancyShareCopied: 'Lista copiada ({cities} ciudades).',
    vacancyShareCopyFail: 'No se pudo copiar la lista.',
    otherStates: 'Otras',
    sendingSelfie: 'Enviando selfie…',
    startingEllipsis: 'Iniciando…',
    confirmedQueue: 'Confirmado. Enviando a la cola…',
    selfieQueued: 'Selfie en cola.',
    appQueued: 'Aplicación en cola. Síguela aquí.',
    viewPass: 'Ver contraseña Amazon',
    viewOnboarding: 'Ver onboarding',
    viewOnboardingTitle: 'Sesión Amazon',
    viewOnboardingHint: 'La misma IP de la ficha. Toca para hacer clic y arrastra para desplazarte.',
    viewOnboardingWait: 'Abriendo la sesión en la misma IP…',
    viewOnboardingBack: 'Volver',
    viewOnboardingHome: 'Menú',
    viewOnboardingTypePlaceholder: 'Escribe en la pantalla…',
    viewOnboardingSend: 'Enviar',
    viewOnboardingBackspace: 'Borrar',
    viewOnboardingEnter: 'Enter',
    changeStatus: 'Cambiar estado',
    reconnectBtn: 'Reconectar cuenta',
    accessTitle: 'Acceso',
    accessEmailPassword: 'Contraseña del correo',
    accessAccountPassword: 'Contraseña de la cuenta',
    accessOpenEmail: 'Abrir correo',
    accessCopy: 'Copiar',
    accessCopyAll: 'Copiar acceso',
    accessEmail: 'Correo',
    accessMailLine: 'Abrir correo',
    accessMailMissingAdmin: 'No se pudo detectar el login de este correo.',
    hubEyebrow: 'Visión general de la operación',
    hubLead: 'Sigue cada cuenta y encuentra lo que necesita tu atención.',
    hubKpiAll: 'Aplicaciones no archivadas',
    hubKpiReview: 'Identidad o antecedentes',
    hubKpiIdvOk: 'Verificación confirmada',
    hubKpiComplete: 'Incluye completadas archivadas',
    hubAttentionTitle: 'Pendientes y conexión',
    hubAttentionHint: 'Atajos por situación',
    hubYourApps: 'Tus aplicaciones',
    hubReviewScope: 'Identidad, selfie y antecedentes. El TAX en validación aparece en la lista general.',
    hubShowing: 'Mostrando',
    hubClearFilter: 'Limpiar filtro',
    backToApps: 'Volver a aplicaciones',
    taxWaitTitle: 'TAX esperando a Amazon',
    taxWaitBody: 'La cuenta bancaria entra después de que acepten el TAX. El resto sigue.',
    sessionRetryTitle: 'Verificación pendiente',
    sessionRetryBody: 'La lectura no terminó. Se conservó el último estado confirmado.',
    reconnectNoticeTitle: 'Hay que reconectar',
    reconnectNoticeBody: 'Se perdió la autenticación. Los pasos confirmados siguen visibles.',
    offboardedNoticeTitle: 'Cuenta Amazon desactivada',
    offboardedNoticeBody: 'Esta cuenta no entra en Reconectar ni en En revisión.',
    taxValidating: 'TAX en validación',
    taxWaitBank: 'Amazon sigue revisando el TAX. Los datos bancarios esperan esa aceptación. El resto ya sigue.',
    lastAmazonRead: 'Lectura Amazon',
    docsHint: 'Archivos de la aplicación y foto de la persona.',
    personalHint: 'Revisa los datos leídos de los documentos.',
    filledOk: 'Completos',
    ringDone: 'Listo',
    currentStage: 'Etapa actual',
    applicationStatus: 'Estado de la aplicación',
    amazonConnection: 'Conexión Amazon',
    docsSection: 'Documentos',
    onlyMine: 'Sólo mías',
    opNav: 'Operación',
    accountMenu: 'Menú de la cuenta',
    contextFollow: 'Etapas y conexión Amazon',
    adminMenuShort: 'Admin',
    adminSection: 'Administración',
    sideContextTitle: 'Toda la operación, en un lugar.',
    sideContextBody: 'De la conexión al seguimiento de cada aplicación.',
    docsAndData: 'Documentos y datos',
    tabPayment: 'Pago',
    tabHistory: 'Historial',
    stepsOf: '{done} de {total} etapas listas',
    nextAction: 'Siguiente acción',
    viewAccess: 'Ver acceso',
  },
};
for (const loc of LOCALES) Object.assign(AUTH_COPY[loc], I18N_EXTRA[loc] || {});

function currentLocale() {
  const value = state.locale || state.user?.locale || 'pt-BR';
  return LOCALES.includes(value) ? value : 'pt-BR';
}
function t(key) {
  return (AUTH_COPY[currentLocale()] || AUTH_COPY['pt-BR'])[key] || AUTH_COPY['pt-BR'][key] || key;
}
function tFill(key, vars = {}) {
  let out = t(key);
  for (const [name, value] of Object.entries(vars)) out = out.replaceAll(`{${name}}`, String(value));
  return out;
}
function amazonReadLabel(account) {
  const at = account?.last_known_status?.profile_read_at;
  return at ? `${t('amazonRead')} ${timeAgo(at)}` : t('amazonReadNever');
}
function refreshToolbarButton() {
  if (state.amazonRefreshing) {
    const job = state.amazonRefreshJob;
    const label = state.amazonRefreshScope === 'analysis' && job
      ? tFill('checkingAnalysis', { done: job.done || 0, total: job.total || 0 })
      : t('refreshingAccounts');
    return `<button class="btn primary sm" type="button" disabled><span class="spinner"></span> ${label}</button>`;
  }
  return `<button class="btn ghost sm" type="button" data-refresh-scope="analysis">${I.refresh} ${t('refresh')}</button>`;
}
function localePicker(id, selected) {
  const cur = selected || currentLocale();
  const short = { 'pt-BR': 'PT', 'en-US': 'EN', 'es-CO': 'ES' };
  return `<div class="lang-switch" id="${id}" role="group" aria-label="${t('locale')}">${LOCALES.map((code) => `<button type="button" class="lang-btn ${code === cur ? 'active' : ''}" data-locale="${code}">${short[code] || code}</button>`).join('')}</div>`;
}

function bindLocaleSwitch(id, after) {
  document.querySelector(`#${id}`)?.querySelectorAll('[data-locale]')?.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const locale = btn.dataset.locale;
      if (!locale || locale === currentLocale()) return;
      state.locale = locale;
      localStorage.setItem('apply_locale', locale);
      if (after) await after(locale);
      else if (state.token) renderApp();
      else renderLogin();
    });
  });
}

function applyModalRoot() {
  let root = document.querySelector('#applyModal');
  if (root) return root;
  root = document.createElement('div');
  root.id = 'applyModal';
  root.className = 'apply-modal hidden';
  root.innerHTML = `<div class="apply-modal-backdrop" data-modal-dismiss></div>
    <div class="apply-modal-card" role="dialog" aria-modal="true" aria-labelledby="applyModalTitle">
      <button class="apply-modal-x" type="button" data-modal-dismiss aria-label="${t('close')}">×</button>
      <h3 id="applyModalTitle"></h3>
      <p class="apply-modal-msg"></p>
      <input class="apply-modal-input hidden" />
      <div class="apply-modal-actions">
        <button type="button" class="btn ghost" data-modal-cancel>${t('cancel')}</button>
        <button type="button" class="btn primary" data-modal-ok>${t('ok')}</button>
      </div>
    </div>`;
  document.body.appendChild(root);
  return root;
}

function openApplyModal({ title = 'Apex Apply', message = '', input = null, confirmText = 'OK', cancelText = null, danger = false } = {}) {
  return new Promise((resolve) => {
    const root = applyModalRoot();
    const card = root.querySelector('.apply-modal-card');
    const titleEl = root.querySelector('#applyModalTitle');
    const msgEl = root.querySelector('.apply-modal-msg');
    const inputEl = root.querySelector('.apply-modal-input');
    const okBtn = root.querySelector('[data-modal-ok]');
    const cancelBtn = root.querySelector('[data-modal-cancel]');
    const previousFocus = document.activeElement;
    const background = document.querySelector('#app');
    const wasInert = Boolean(background?.inert);
    let finished = false;
    titleEl.textContent = title;
    msgEl.textContent = message || '';
    msgEl.classList.toggle('hidden', !message);
    okBtn.textContent = confirmText;
    okBtn.className = danger ? 'btn danger' : 'btn primary';
    cancelBtn.textContent = cancelText || 'Cancelar';
    cancelBtn.classList.toggle('hidden', !cancelText && input == null);
    if (input == null) {
      inputEl.classList.add('hidden');
      inputEl.value = '';
    } else {
      inputEl.classList.remove('hidden');
      inputEl.value = String(input);
    }
    const finish = (value) => {
      if (finished) return;
      finished = true;
      root.classList.add('hidden');
      document.removeEventListener('keydown', onKey);
      if (background) background.inert = wasInert;
      if (previousFocus?.isConnected) previousFocus.focus();
      resolve(value);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); finish(null); return; }
      if (event.key === 'Tab') {
        const controls = [...card.querySelectorAll('button:not(:disabled),input:not(:disabled),a[href]')].filter(el => el.getClientRects().length);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
      if (danger && event.key === 'Enter' && document.activeElement !== okBtn) return;
      if (event.key === 'Enter' && document.activeElement !== cancelBtn) {
        event.preventDefault();
        finish(input == null ? true : inputEl.value);
      }
    };
    root.onclick = (event) => {
      if (event.target.closest('[data-modal-dismiss]')) finish(null);
    };
    okBtn.onclick = () => finish(input == null ? true : inputEl.value);
    cancelBtn.onclick = () => finish(null);
    document.addEventListener('keydown', onKey);
    root.classList.remove('hidden');
    if (background) background.inert = true;
    (danger && cancelText ? cancelBtn : input == null ? okBtn : inputEl).focus();
  });
}

function applyAlert(message, title) {
  return openApplyModal({ title: title || 'Apex Apply', message, confirmText: 'OK' });
}
function applyConfirm(message, title) {
  return openApplyModal({ title: title || 'Apex Apply', message, confirmText: t('confirm'), cancelText: t('cancel') });
}
function applyPrompt(message, value, title) {
  return openApplyModal({ title: title || 'Apex Apply', message, input: value ?? '', confirmText: 'OK', cancelText: 'Cancelar' });
}

const STEP_LABEL = {
  basic_info: 'Dados',
  legal_documents: 'Contratos',
  auto_insurance: 'Seguro',
  videos: 'Vídeos',
  getting_paid: 'TAX / Pagamento',
  tax_interview: 'TAX / Pagamento',
  payment_information: 'TAX / Pagamento',
  driver_license: 'Driver license',
  id_verification: 'Driver license',
  id_selfie: 'Selfie',
  background_check: 'Antecedentes',
  photo_upload: 'Foto',
};

function onboardingStepLabel(key, fallback = '') {
  return t(`step_${key}`) || fallback || key;
}

const legacyOnboardingStepKeys = ['basic_info', 'legal_documents', 'driver_license', 'photo_upload', 'background_check', 'auto_insurance', 'getting_paid', 'videos'];
const unifiedOnboardingStepKeys = ['basic_info', 'legal_documents', 'id_verification', 'id_selfie', 'background_check', 'auto_insurance', 'getting_paid', 'videos'];


function taxIrsBlob(account) {
  const steps = accountStepStatuses(account);
  const tax = steps.tax_interview || {};
  return `${tax.detail || ''} ${account?.last_known_status?.tax_interview_last_error || ''}`;
}
function accountHasIrsNameSsnMismatch(account) {
  const tax = accountStepStatuses(account).tax_interview || {};
  if (String(tax.status || '') === 'complete') return false;
  if (account?.irs_name_ssn_mismatch) return true;
  return /name and tax id provided do not match irs records/i.test(taxIrsBlob(account));
}
function accountNeedsIrsSsnFix(account) {
  return Boolean(account) && accountHasIrsNameSsnMismatch(account) && sessionIsOk(account);
}
function taxSsnModalHtml(account) {
  const fix = state.taxSsnFix;
  if (!fix || fix.id !== account.id) return '';
  const phase = fix.phase || 'form';
  if (phase === 'form') {
    return `<div class="modal-backdrop tax-ssn-backdrop" data-tax-ssn-root>
      <div class="modal start-review tax-ssn-modal">
        <div class="modal-h"><div><div class="eyebrow">TAX</div><h3>${esc(t('irsSsnTitle'))}</h3></div>
          <button class="icon-btn" type="button" data-tax-ssn-cancel>×</button></div>
        <div class="notice warn-note">${I.alert}<div><b>${esc(t('irsSsnAsk'))}</b><p>${esc(t('irsSsnHint'))}</p></div></div>
        <label class="field"><span>SSN</span>
          <input id="taxSsnInput" inputmode="numeric" autocomplete="off" maxlength="11" placeholder="000000000" />
        </label>
        <p class="hint" id="taxSsnErr" hidden></p>
        <div class="form-actions">
          <button class="btn ghost" type="button" data-tax-ssn-cancel>${esc(t('irsSsnCancel'))}</button>
          <button class="btn primary" type="button" data-tax-ssn-confirm>${esc(t('irsSsnConfirm'))}</button>
        </div>
      </div></div>`;
  }
  if (phase === 'loading') {
    return `<div class="modal-backdrop tax-ssn-backdrop" data-tax-ssn-root>
      <div class="modal start-review tax-ssn-modal">
        <div class="tax-ssn-load"><span class="spinner"></span>
          <b>${esc(t('irsSsnLoading'))}</b>
          <p class="muted">${esc(t('irsSsnWait'))}</p>
        </div>
      </div></div>`;
  }
  if (phase === 'ok') {
    return `<div class="modal-backdrop tax-ssn-backdrop" data-tax-ssn-root>
      <div class="modal start-review tax-ssn-modal">
        <div class="notice ok-note">${I.check}<div><b>${esc(t('irsSsnOk'))}</b></div></div>
      </div></div>`;
  }
  return `<div class="modal-backdrop tax-ssn-backdrop" data-tax-ssn-root>
    <div class="modal start-review tax-ssn-modal">
      <div class="notice warn-note">${I.alert}<div><b>${esc(t('irsSsnFail'))}</b><p>${esc(fix.error || '')}</p></div></div>
      <div class="form-actions">
        <button class="btn ghost" type="button" data-tax-ssn-cancel>${esc(t('irsSsnCancel'))}</button>
        <button class="btn primary" type="button" data-tax-ssn-again>${esc(t('irsSsnRetry'))}</button>
      </div>
    </div></div>`;
}
function closeTaxSsnModal() {
  state.taxSsnFix = null;
  if (state.view === 'detail') renderDetail({ autoFollow: false });
}
async function confirmTaxSsnRetry() {
  const account = selectedAccount();
  if (!account) return;
  const target = accountActionContext();
  const isTarget = () => target === accountActionContext();
  if (!sessionIsOk(account)) {
    state.taxSsnFix = { id: account.id, phase: 'fail', error: t('irsSsnNeedSession') };
    renderDetail({ autoFollow: false });
    return;
  }
  const raw = String(document.querySelector('#taxSsnInput')?.value || '').replace(/\D/g, '');
  if (raw.length !== 9) {
    const err = document.querySelector('#taxSsnErr');
    if (err) { err.hidden = false; err.textContent = t('irsSsnBad'); }
    return;
  }
  const attempt = { id: account.id, phase: 'loading', error: '' };
  state.taxSsnFix = attempt;
  const isAttempt = () => isTarget() && state.taxSsnFix === attempt;
  renderDetail({ autoFollow: false });
  try {
    await api(`/api/accounts/${account.id}/tax-ssn-retry`, {
      method: 'POST',
      body: JSON.stringify({ ssn: raw }),
    });
  } catch (error) {
    if (!isAttempt()) return;
    Object.assign(attempt, { phase: 'fail', error: error.message || t('irsSsnFail') });
    renderDetail({ autoFollow: false });
    return;
  }
  if (!isAttempt()) return;
  for (let i = 0; i < 70; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (!isAttempt() || state.selectedAccountId !== account.id || attempt.phase !== 'loading') return;
    let row;
    try {
      row = await api(`/api/accounts/${account.id}/tax-ssn-retry`);
    } catch (_e) {
      if (!isAttempt()) return;
      continue;
    }
    if (!isAttempt()) return;
    if (row.phase === 'ok') {
      Object.assign(attempt, { phase: 'ok', error: '' });
      try {
        const list = await api('/api/accounts?include_archived=1');
        if (!isAttempt() || !currentAccountRead(list)) return;
        const readSteps = accountReadEvidence.get(list).steps;
        const next = (list.accounts || []).find((item) => item.id === account.id);
        if (next) {
          state.accounts = (state.accounts || []).map((item) => (item.id === next.id ? preserveConcurrentAccountSteps(item, { ...item, ...next }, readSteps.get(item.id), accountReadEvidence.get(list).sequence) : item));
        }
      } catch (_e) { /* keep modal */ }
      if (!isAttempt()) return;
      renderDetail({ autoFollow: false });
      setTimeout(() => {
        if (isAttempt() && attempt.phase === 'ok') closeTaxSsnModal();
      }, 1400);
      return;
    }
    if (row.phase === 'fail' || row.phase === 'blocked') {
      Object.assign(attempt, {
        phase: 'fail',
        error: row.code === 'SESSION_DEAD' ? t('irsSsnNeedSession') : (row.code === 'TAX_OK_PAY_PENDING' ? t('irsSsnPayPending') : t('irsSsnFail')),
      });
      renderDetail({ autoFollow: false });
      return;
    }
  }
  if (!isAttempt()) return;
  Object.assign(attempt, { phase: 'fail', error: t('irsSsnFail') });
  renderDetail({ autoFollow: false });
}

const PUBLIC_STEP_DETAIL_COPY = new Map();
for (const messageKey of Object.keys(AUTH_COPY['pt-BR']).filter((key) => /^hs[A-Z]/.test(key))) {
  PUBLIC_STEP_DETAIL_COPY.set(messageKey, messageKey);
  for (const locale of LOCALES) {
    const message = AUTH_COPY[locale][messageKey];
    if (message) PUBLIC_STEP_DETAIL_COPY.set(message, messageKey);
  }
}

// Persisted public messages remain recognizable after copy changes.
for (const [message, messageKey] of [
  ['A parte fiscal já foi. O pagamento ficou pendente. O resto segue.', 'hsTaxSkip'],
  ['Tax is done. Payment is pending. The rest continues.', 'hsTaxSkip'],
  ['La parte fiscal ya pasó. El pago quedó pendiente. El resto sigue.', 'hsTaxSkip'],
  ['O nome e o SSN não batem.', 'hsIrsNameSsn'],
  ['Name and SSN do not match.', 'hsIrsNameSsn'],
  ['El nombre y el SSN no coinciden.', 'hsIrsNameSsn'],
]) PUBLIC_STEP_DETAIL_COPY.set(message, messageKey);

function humanEventDetail(event = {}) {
  const stepKey = event.display_step_key || event.step_key || '';
  const label = stepKey ? onboardingStepLabel(stepKey) : '';
  const copy = {
    'pt-BR': {
      evQueued: 'A aplicação entrou na fila.',
      evActivity: 'Atualizamos a aplicação.',
      evRunStarted: 'Iniciamos a aplicação.',
      evRunFinished: 'Encerramos esta tentativa.',
      evSubmitted: 'Enviamos a Driver license.',
      evConfirmed: label ? `Concluímos: ${label}.` : 'Concluímos esta parte.',
      evReview: label ? `Enviamos para análise: ${label}.` : 'Enviamos esta parte para análise.',
      evReviewContinue: label ? `Enviamos para análise: ${label}. A aplicação continuou.` : 'Enviamos esta parte para análise. A aplicação continuou.',
      evContinue: label ? `Ficou pendente: ${label}. A aplicação continuou.` : 'Esta parte ficou pendente. A aplicação continuou.',
      evStarted: label ? `Começamos: ${label}.` : 'Começamos esta parte.',
      evRetry: label ? `Aguardando liberação: ${label}. Vamos conferir de novo automaticamente.` : 'Aguardando liberação. Vamos conferir de novo automaticamente.',
      evAttention: label ? `Não conseguimos concluir: ${label}.` : 'Não conseguimos concluir esta parte.',
      evNotApproved: label ? `Não foi aprovado: ${label}.` : 'Esta parte não foi aprovada.',
    },
    'en-US': {
      evQueued: 'The application joined the queue.',
      evActivity: 'We updated the application.',
      evRunStarted: 'We started the application.',
      evRunFinished: 'This attempt ended.',
      evSubmitted: 'We sent the Driver license.',
      evConfirmed: label ? `Completed: ${label}.` : 'We completed this part.',
      evReview: label ? `Sent for review: ${label}.` : 'We sent this part for review.',
      evReviewContinue: label ? `Sent for review: ${label}. The application continued.` : 'We sent this part for review. The application continued.',
      evContinue: label ? `Left pending: ${label}. The application continued.` : 'This part was left pending. The application continued.',
      evStarted: label ? `Started: ${label}.` : 'We started this part.',
      evRetry: label ? `Waiting for release: ${label}. We will check again automatically.` : 'Waiting for release. We will check again automatically.',
      evAttention: label ? `Could not complete: ${label}.` : 'We could not complete this part.',
      evNotApproved: label ? `Not approved: ${label}.` : 'This part was not approved.',
    },
    'es-CO': {
      evQueued: 'La solicitud entró en cola.',
      evActivity: 'Actualizamos la solicitud.',
      evRunStarted: 'Iniciamos la solicitud.',
      evRunFinished: 'Cerramos este intento.',
      evSubmitted: 'Enviamos la Driver license.',
      evConfirmed: label ? `Completamos: ${label}.` : 'Completamos esta parte.',
      evReview: label ? `Enviamos a revisión: ${label}.` : 'Enviamos esta parte a revisión.',
      evReviewContinue: label ? `Enviamos a revisión: ${label}. La solicitud continuó.` : 'Enviamos esta parte a revisión. La solicitud continuó.',
      evContinue: label ? `Quedó pendiente: ${label}. La solicitud continuó.` : 'Esta parte quedó pendiente. La solicitud continuó.',
      evStarted: label ? `Empezamos: ${label}.` : 'Empezamos esta parte.',
      evRetry: label ? `Esperando liberación: ${label}. Vamos a revisar de nuevo automáticamente.` : 'Esperando liberación. Vamos a revisar de nuevo automáticamente.',
      evAttention: label ? `No pudimos concluir: ${label}.` : 'No pudimos concluir esta parte.',
      evNotApproved: label ? `No fue aprobado: ${label}.` : 'Esta parte no fue aprobada.',
    },
  };
  const messages = copy[state.locale] || copy['pt-BR'];
  const legacyKey = event.message === 'Aplicação entrou na fila.' ? 'evQueued' : event.message === 'Driver license enviado.' ? 'evSubmitted' : 'evActivity';
  return messages[event.message_key] || messages[legacyKey];
}

function humanStepDetail(key, detail, status, account) {
  const text = String(detail || '').trim();
  const messageKey = PUBLIC_STEP_DETAIL_COPY.get(text);
  if (messageKey === 'hsTaxSkip') {
    const tax = account?.last_known_status?.application_steps?.tax_interview;
    const taxStatus = typeof tax === 'string' ? tax : String(tax?.status || '');
    if (taxStatus === 'complete') return t('hsTaxPaymentAfterComplete');
    if (['action_required', 'failed', 'error', 'blocked'].includes(taxStatus)) return t('hsTaxPaymentBlocked');
    if (['in_progress', 'pending_review', 'review'].includes(taxStatus)) return t('hsTaxPaymentWaiting');
    return t('hsTaxSkip');
  }
  if (messageKey) return t(messageKey);
  // Exact public legacy copy only; no interpretation of technical reasons.
  if (text === 'Name and Tax ID provided do not match IRS records') return t('hsIrsNameSsn');
  if (text === 'Ainda não confirmado.') return '';
  if (text === 'Driver license enviado.') return t('hsDlSent');
  if (text === 'Selfie não iniciada.') return t('hsSelfieNotStarted');
  return stepStatusText(status, false, key);
}
function isUnifiedIdentityAccount(account = {}) {
  const meta = account?.last_known_status || {};
  if (meta.identity_flow === 'unified' || meta.document_policy === 'front_only') return true;
  if (meta.identity_flow === 'legacy') return false;
  return false;
}

function onboardingStepsFor(account = {}) {
  const keys = isUnifiedIdentityAccount(account) ? unifiedOnboardingStepKeys : legacyOnboardingStepKeys;
  return keys.map((key) => [key, onboardingStepLabel(key)]);
}

const STATUS = {
  draft: { label: 'Rascunho', cls: 'neutral', bar: '' },
  connected: { label: 'Conectada', cls: 'connected', bar: '' },
  ready: { label: 'Dados prontos', cls: 'connected', bar: '' },
  queued: { label: 'Na fila', cls: 'running', bar: 'amber' },
  running: { label: 'Aplicando', cls: 'running', bar: 'amber' },
  in_progress: { label: 'Em andamento', cls: 'running', bar: 'amber' },
  pending: { label: 'Pendente', cls: 'neutral', bar: '' },
  pending_review: { label: 'Em análise', cls: 'review', bar: 'violet' },
  review: { label: 'Em análise', cls: 'review', bar: 'violet' },
  duplicate: { label: 'Duplicada', cls: 'duplicate', bar: 'red' },
  action_required: { label: 'Atenção', cls: 'attention', bar: 'orange' },
  consider: { label: 'Consider', cls: 'consider', bar: 'red' },
  complete: { label: 'Concluída', cls: 'complete', bar: 'green' },
  failed: { label: 'Falha', cls: 'attention', bar: 'orange' },
  error: { label: 'Atenção', cls: 'attention', bar: 'orange' },
  blocked: { label: 'Atenção', cls: 'attention', bar: 'orange' },
  archived: { label: 'Arquivada', cls: 'neutral', bar: '' },
  offboarded: { label: 'Desativada', cls: 'duplicate', bar: 'red' },
  session_fresh: { label: 'Conexão ok', cls: 'connected', bar: '' },
  session_retry_pending: { label: 'Verificação pendente', cls: 'review', bar: 'violet' },
  session_expired: { label: 'Reconectar', cls: 'attention', bar: 'orange' },
  session_unknown: { label: 'Sem conexão', cls: 'neutral', bar: '' },
  session_not_monitored: { label: 'Não monitorada', cls: 'neutral', bar: '' },
};

const state = {
  detailTab: 'documents',
  token: localStorage.getItem('apply_token'),
  user: null,
  locale: localStorage.getItem('apply_locale') || 'pt-BR',
  users: [],
  opsLoading: false,
  opsError: false,
  auditLogs: [],
  auditLoading: false,
  auditLoaded: false,
  ssnLookups: [],
  ssnLoading: false,
  ssnOcrLoading: false,
  ssnLoaded: false,
  ssnPage: 1,
  ssnLimit: 50,
  ssnTotal: 0,
  ssnTotalPages: 1,
  ssnQ: '',
  ssnSearchTimer: null,
  applicationOcrLoading: false,
  smsActivations: [],
  smsLoading: false,
  smsLoaded: false,
  smsPollTimer: null,
  smsPolling: false,
  emailCreatorItems: [],
  emailCreatorLoading: false,
  emailCreatorLoaded: false,
  emailCreatorOtp: {},
  emailCreatorOtpTimers: {},
  accounts: [],
  accountsLoadedAt: '',
  accountsLoading: false,
  detailLiveReadId: '',
  panelReadError: false,
  selectedAccountId: localStorage.getItem('apply_selected_account') || '',
  signinUrl: localStorage.getItem('apply_last_signin_url') || '',
  serverLogin: { attemptId: '', state: '', needsOtp: false, reason: '', polling: false, timer: null },
  connectPendingAccountId: localStorage.getItem('apply_connect_pending_account')
    || localStorage.getItem('apply_connect_draft_account')
    || '',
  reconnectAccountId: '',
  sourceCities: [],
  sourceCitiesLoaded: false,
  sourceCitiesLoading: false,
  sourceCitiesError: '',
  sourceCitySelection: '',
  sourceClaiming: '',
  vacancies: [],
  vacancyCampaign: null,
  vacancyMode: null,
  vacanciesLoaded: false,
  vacanciesLoading: false,
  vacancyOrder: null,
  vacancyBuying: '',
  vacancyBuyPhase: '',
  vacancyPoll: null,
  vacancyNeedDl: localStorage.getItem('apply_vacancy_need_dl') || '',
  vacanciesError: '',
  vacancyQ: '',
  showVacancyMap: false,
  amazonRefreshing: false,
  amazonRefreshScope: '',
  refreshMenuOpen: false,
  amazonRefreshJob: null,
  view: 'hub',
  filter: 'all',
  mineOnly: localStorage.getItem('apply_hub_mine') === '1',
  ownerFilter: { query: '', matched: false, accounts: [], loading: false },
  ownerFilterTimer: null,
  ownerFilterRequest: 0,
  q: '',
  trackerOpen: false,
  recentAccountId: '',
  hubPrepTimer: null,
  tableSort: { key: '', dir: '' },
  archiveSelection: new Set(),
  budgets: [
    { id: 'or', label: 'OR', value: '—', percent: 0, level: 'missing', status: 'loading' },
    { id: 'ssn', label: 'SSN', value: '—', percent: 0, level: 'missing', status: 'loading' },
  ],
  budgetsUpdatedAt: '',
  usersQ: '',
  vacancySaving: false,
};

let detailAction = null;
let reviewPreparation = null;
let posePreviewGeneration = 0;
const poseObjectUrls = new Set();
function clearPosePreviews() {
  posePreviewGeneration += 1;
  poseObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  poseObjectUrls.clear();
}


/* ===================== Núcleo / API (preservado) ===================== */
const accountReadsInFlight = new Map();
const accountReadEvidence = new WeakMap();
const accountStepReadVersions = new WeakMap();
let accountReadSequence = 0;
let accountReadEpoch = 0;
let accountVisitEpoch = 0;
function accountActionContext() {
  return JSON.stringify([accountVisitEpoch, state.token, state.user?.id, state.user?.role, state.view, state.selectedAccountId]);
}
function beginDetailAction(accountId) {
  if (detailAction || state.view !== 'detail' || accountId !== state.selectedAccountId) return null;
  document.querySelector('#detailActionFeedback')?.remove();
  const operation = { accountId, context: accountActionContext(), controller: new AbortController() };
  detailAction = operation;
  return operation;
}
function currentDetailAction(operation) {
  return detailAction === operation && operation.context === accountActionContext();
}
function showDetailActionBusy(operation, label) {
  if (!currentDetailAction(operation)) return;
  const overlay = document.createElement('div');
  overlay.id = 'detailActionBusy';
  overlay.className = 'detail-action-busy';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'polite');
  overlay.setAttribute('tabindex', '-1');
  overlay.innerHTML = `<div class="detail-action-card"><span class="spinner" aria-hidden="true"></span><h2>${esc(t(label))}</h2><p>${esc(t('detailWorkingHint'))}</p><div class="detail-action-progress" aria-hidden="true"><span></span></div></div>`;
  operation.overlay = overlay;
  operation.app = document.querySelector('#app');
  operation.wasInert = Boolean(operation.app?.inert);
  operation.previousFocus = document.activeElement;
  if (operation.app) operation.app.inert = true;
  document.body.appendChild(overlay);
  overlay.focus();
  operation.timeout = setTimeout(() => operation.controller.abort(), 120000);
}
function finishDetailAction(operation) {
  if (detailAction !== operation) return;
  clearTimeout(operation.timeout);
  operation.overlay?.remove();
  if (operation.app) operation.app.inert = operation.wasInert;
  if (operation.previousFocus?.isConnected) operation.previousFocus.focus();
  detailAction = null;
}
function cancelDetailAction() {
  const operation = detailAction;
  if (operation) {
    finishDetailAction(operation);
    operation.controller.abort();
  }
  document.querySelector('#detailActionFeedback')?.remove();
  clearReviewPreparation();
}
function showDetailActionFeedback(operation, kind, message) {
  if (!currentDetailAction(operation)) return;
  document.querySelector('#detailActionFeedback')?.remove();
  const notice = document.createElement('div');
  notice.id = 'detailActionFeedback';
  notice.className = `detail-action-feedback ${kind}`;
  notice.setAttribute('role', kind === 'success' ? 'status' : 'alert');
  notice.innerHTML = `${kind === 'success' ? I.check : I.alert}<p>${esc(t(message))}</p>`;
  document.body.appendChild(notice);
  setTimeout(() => notice.remove(), 4000);
}
async function readDetailAfterAction(operation) {
  // This non-shared GET owns the references captured immediately before dispatch.
  const reference = accountStepReferences().get(operation.accountId);
  const data = await api(`/api/accounts/${operation.accountId}`, { signal: operation.controller.signal });
  if (!currentDetailAction(operation) || !currentAccountRead(data)) throw staleAccountRead();
  if (data.account?.id !== operation.accountId) throw new Error('ACCOUNT_READ_INVALID');
  const evidence = accountReadEvidence.get(data);
  state.accounts = state.accounts.map(account => account.id === operation.accountId
    ? preserveConcurrentAccountSteps(account, { ...account, ...data.account }, reference, evidence.sequence)
    : account);
}
function accountHasPostReviewRefusal(account) {
  const step = accountStepStatuses(account).id_verification;
  return step?.status === 'failed' && /recusou a verifica[cç][aã]o depois da an[aá]lise/i.test(step.detail || '');
}
function currentReviewPreparation(entry) {
  return reviewPreparation === entry && entry.context === accountActionContext();
}
function clearReviewPreparation() {
  if (reviewPreparation) {
    clearTimeout(reviewPreparation.timer);
    clearTimeout(reviewPreparation.requestTimeout);
    reviewPreparation.controller.abort();
    reviewPreparation = null;
  }
  const box = document.querySelector('#reviewPreparationNotice');
  if (box) box.innerHTML = '';
  document.querySelectorAll('[data-start]').forEach(button => {
    if (!Object.prototype.hasOwnProperty.call(button.dataset, 'reviewDisabled')) return;
    button.disabled = button.dataset.reviewDisabled === 'true';
    delete button.dataset.reviewDisabled;
  });
}
function paintReviewPreparation(entry) {
  if (!currentReviewPreparation(entry)) return;
  const box = document.querySelector('#reviewPreparationNotice');
  const ready = ['complete', 'not_required'].includes(entry.status);
  const message = { complete: 'reviewFilesReady', failed: 'reviewFilesFailed', missing_source: 'reviewFilesMissing' }[entry.status] || 'reviewFilesPreparing';
  if (box) {
    box.innerHTML = entry.status === 'not_required' ? '' : `<div class="notice ${ready ? '' : 'warn-note'}" role="${entry.status === 'failed' ? 'alert' : 'status'}">${ready ? I.check : I.clock}<div><b>${esc(t(message))}</b>${entry.status === 'failed' ? `<button class="btn secondary sm" type="button" data-review-files-retry>${esc(t('reviewFilesRetry'))}</button>` : ''}</div></div>`;
    box.querySelector('[data-review-files-retry]')?.addEventListener('click', () => syncReviewPreparation(selectedAccount(), { retry: true }));
  }
  document.querySelectorAll('[data-start]').forEach(button => {
    if (!ready) {
      if (!Object.prototype.hasOwnProperty.call(button.dataset, 'reviewDisabled')) button.dataset.reviewDisabled = String(button.disabled);
      button.disabled = true;
    } else if (Object.prototype.hasOwnProperty.call(button.dataset, 'reviewDisabled')) {
      button.disabled = button.dataset.reviewDisabled === 'true';
      delete button.dataset.reviewDisabled;
    }
  });
}
async function pollReviewPreparation(entry, start = false, retry = false) {
  if (!currentReviewPreparation(entry)) return;
  entry.requestTimeout = setTimeout(() => entry.controller.abort(), 15000);
  try {
    const options = { signal: entry.controller.signal };
    if (start) Object.assign(options, { method: 'POST', body: JSON.stringify({ retry }) });
    let data = await api(`/api/accounts/${entry.accountId}/review-preparation`, options);
    if (!currentReviewPreparation(entry)) return;
    if (!start && data.status === 'queued') {
      data = await api(`/api/accounts/${entry.accountId}/review-preparation`, { method: 'POST', body: '{}', signal: entry.controller.signal });
      if (!currentReviewPreparation(entry)) return;
    }
    entry.status = ['queued', 'running', 'complete', 'failed', 'missing_source', 'not_required'].includes(data.status) ? data.status : 'failed';
    paintReviewPreparation(entry);
    if (['queued', 'running'].includes(entry.status)) entry.timer = setTimeout(() => pollReviewPreparation(entry), 2000);
  } catch (_error) {
    if (currentReviewPreparation(entry)) {
      entry.status = 'failed';
      paintReviewPreparation(entry);
    }
  } finally {
    clearTimeout(entry.requestTimeout);
  }
}
async function syncReviewPreparation(account, { retry = false } = {}) {
  if (state.view !== 'detail' || account?.id !== state.selectedAccountId) return;
  if (!accountHasPostReviewRefusal(account) || !account.profile_photo_path) { clearReviewPreparation(); return; }
  if (!retry && reviewPreparation && currentReviewPreparation(reviewPreparation)) { paintReviewPreparation(reviewPreparation); return; }
  clearReviewPreparation();
  const entry = { accountId: account.id, context: accountActionContext(), status: 'running', controller: new AbortController() };
  reviewPreparation = entry;
  paintReviewPreparation(entry);
  await pollReviewPreparation(entry, true, retry);
}
function invalidateAccountReads() {
  accountReadEpoch += 1;
  accountReadsInFlight.clear();
}
function accountReadContext() {
  return JSON.stringify([accountReadEpoch, state.token, state.user?.id, state.user?.role, state.locale, state.view, state.selectedAccountId]);
}
function staleAccountRead() {
  return Object.assign(new Error('Leitura substituída.'), { code: 'STALE_READ' });
}
function emptyJsonUnlessStale(error) {
  if (error?.code === 'STALE_READ') throw error;
  return {};
}
async function fetchAccountRequest(path, options = {}) {
  const method = String(options.method || 'GET').toUpperCase();
  const mutatesAccounts = !['GET', 'HEAD'].includes(method) && /^\/api\/accounts(?:\/|\?|$)/.test(path);
  // File preparation never changes application steps or starts a run.
  const invalidatesReads = mutatesAccounts && !/^\/api\/accounts\/[^/?]+\/(?:review-preparation|onboarding-view(?:\/(?:frame|click|close|back|home))?)(?:\?|$)/.test(path);
  const identity = JSON.stringify([state.token, state.user?.id]);
  const target = accountActionContext();
  const isTarget = () => target === accountActionContext();
  if (invalidatesReads) invalidateAccountReads();
  try {
    const response = await fetch(path, options);
    if (mutatesAccounts) {
      if (!isTarget()) throw staleAccountRead();
      const readJson = response.json.bind(response);
      response.json = async () => {
        const data = await readJson();
        if (!isTarget()) throw staleAccountRead();
        return data;
      };
    }
    return response;
  }
  finally {
    if (invalidatesReads && identity === JSON.stringify([state.token, state.user?.id])) invalidateAccountReads();
  }
}
const api = async (path, options = {}) => {
  const headers = { ...options.headers };
  if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  const method = String(options.method || 'GET').toUpperCase();

  const scopedRead = method === 'GET'
    && /^\/api\/(?:accounts(?:\/[^/?]+(?:\/access)?)?|runs\/[^/?]+|me)(?:\?|$)/.test(path);
  const share = scopedRead && !options.signal && !options.body;
  const context = accountReadContext();
  const key = share ? JSON.stringify([context, path, headers,
    Object.keys(options).filter(key => !['headers', 'method'].includes(key)).sort().map(key => [key, options[key]])]) : null;
  let pending = key && accountReadsInFlight.get(key);
  if (!pending) {
    // The transport owns this snapshot, including consumers that join it later.
    const evidence = scopedRead ? { context, sequence: ++accountReadSequence, steps: /^\/api\/(?:accounts(?:\?|$)|runs\/)/.test(path) ? accountStepReferences() : null } : null;
    pending = (async () => {
      const res = await fetchAccountRequest(path, { ...options, headers });
      const data = await res.json().catch(emptyJsonUnlessStale);
      if (!res.ok) throw Object.assign(new Error(data.error || 'Erro na solicitacao'), {
        status: res.status, code: data.error, apiCode: data.code || null, retryAfter: res.headers?.get('Retry-After') || null,
      });
      if (evidence && data && typeof data === 'object') accountReadEvidence.set(data, evidence);
      return data;
    })();
    if (key) {
      accountReadsInFlight.set(key, pending);
      const release = () => { if (accountReadsInFlight.get(key) === pending) accountReadsInFlight.delete(key); };
      pending.then(release, release);
    }
  }
  let data;
  try { data = await pending; }
  catch (error) {
    if (scopedRead && context !== accountReadContext()) throw staleAccountRead();
    throw error;
  }
  if (scopedRead && context !== accountReadContext()) throw staleAccountRead();
  // Only a pending request is shared; callers never share mutable response state.
  if (!share || !data || typeof data !== 'object') return data;
  const copy = JSON.parse(JSON.stringify(data));
  accountReadEvidence.set(copy, accountReadEvidence.get(data));
  return copy;
};


const esc = (value = '') => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
}[char]));









/* ===================== Ícones ===================== */
const I = {
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 12a4 4 0 0 1 4-4h3a4 4 0 0 1 0 8h-1"/><path d="M15 12a4 4 0 0 1-4 4H8a4 4 0 0 1 0-8h1"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l2 6 4-14 2 8h6"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 17l5-5-5-5"/><path d="M20 12H9"/><path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 9v4M12 17h.01"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="m5 3 14 9-14 9V3Z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  scan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"/><path d="M7 12h10M9 9h6M10 15h4"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.05.05a2 2 0 0 1-2.83 2.83l-.05-.05A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.08A1.7 1.7 0 0 0 15 4.63a1.7 1.7 0 0 0 1.88-.34l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05A1.7 1.7 0 0 0 19.4 9c.18.39.58.98 1.55 1H21a2 2 0 0 1 0 4h-.08A1.7 1.7 0 0 0 19.4 15Z"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a9 9 0 0 1-15.4 6.4L3 16"/><path d="M3 16v5h5"/><path d="M3 12A9 9 0 0 1 18.4 5.6L21 8"/><path d="M21 8V3h-5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 11V7a4 4 0 1 1 8 0v4"/><rect x="5" y="11" width="14" height="10" rx="2"/></svg>',
  ban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="m7 7 10 10"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/></svg>',
};

/* ===================== Helpers de apresentação ===================== */
function selectedAccount() {
  return state.accounts.find((account) => account.id === state.selectedAccountId) || state.accounts[0] || null;
}
function latestRun(account) {
  return [...(account.apply_runs || [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] || null;
}
function normalizeStatus(value) {
  return String(value || '').trim().toLowerCase();
}
function allApplicationStepsComplete(account, steps = {}) {
  return onboardingStepsFor(account).every(([key]) => stepStatusFromMap(steps, key) === 'complete');
}
function accountIsCompleteForDisplay(account, steps = accountStepStatuses(account)) {
  const base = normalizeStatus(account.status || latestRun(account)?.status || 'draft');
  if (base === 'consider') return false;
  const hasSteps = Object.keys(steps).length > 0;
  const blocking = new Set(['consider', 'action_required', 'blocked', 'failed', 'error', 'running', 'queued', 'pending_review', 'review']);
  const displaySteps = onboardingStepsFor(account);
  blocking.add('in_progress');
  if (hasSteps && displaySteps.some(([key]) => blocking.has(String(stepStatusFromMap(steps, key) || '')))) return false;
  if (hasSteps) return allApplicationStepsComplete(account, steps);
  return base === 'complete' || account?.last_known_status?.historical_complete;
}
function accStatus(account) {
  const base = normalizeStatus(account.status || latestRun(account)?.status || 'draft');
  if (account?.archived_at || base === 'archived') return 'archived';
  const manual = normalizeStatus(account?.manual_status_override);
  if (['complete', 'consider', 'duplicate', 'failed'].includes(manual)) return manual;
  const steps = accountStepStatuses(account);
  if (accountIsCompleteForDisplay(account, steps)) return 'complete';
  if (isDuplicateAccount(account)) return 'duplicate';
  if (isInvalidAmazonSession(account)) return 'action_required';
  if (Object.keys(steps).length) {
    const displaySteps = onboardingStepsFor(account);
    if (displaySteps.some(([key]) => String(stepStatusFromMap(steps, key) || '') === 'consider')) return 'consider';
    if (displaySteps.some(([key]) => ['action_required', 'blocked', 'failed', 'error'].includes(String(stepStatusFromMap(steps, key) || '')))) return 'action_required';
    if (displaySteps.some(([key]) => ['running', 'queued', 'in_progress'].includes(String(stepStatusFromMap(steps, key) || '')))) return 'running';
    if (displaySteps.some(([key]) => ['pending_review', 'review'].includes(String(stepStatusFromMap(steps, key) || '')))) return 'pending_review';
    if (displaySteps.some(([key]) => String(stepStatusFromMap(steps, key) || '') === 'pending')) return 'pending';
  }
  if (Object.keys(steps).length && onboardingStepsFor(account).some(([key]) => ['pending_review', 'review'].includes(String(stepStatusFromMap(steps, key) || '')))) return 'pending_review';
  return base;
}
function isInvalidAmazonSession(account) {
  const meta = account?.last_known_status || {};
  const errors = meta.profile_read_errors || {};
  const values = [
    meta.profile_read_error,
    errors.page,
    errors.status,
    errors.personal_info,
    errors.identity,
  ].map((value) => String(value || '').toLowerCase()).filter(Boolean);
  return values.some((value) => (
    value === '401'
    || value === '403'
    || value.includes('401')
    || value.includes('403')
    || value.includes('unauthorized')
    || value.includes('forbidden')
    || value.includes('invalid')
    || value.includes('desconect')
  ));
}
function sessionUiStatus(account) {
  if (['complete', 'duplicate', 'archived'].includes(accStatus(account))) return 'session_not_monitored';
  const meta = account?.last_known_status || {};
  const health = meta.amazon_session_health || {};
  if (meta.amazon_account_class === 'offboarded' || health.status === 'offboarded') return 'session_not_monitored';
  if (meta.amazon_account_class === 'credentials_dead') return 'session_expired';
  if (['reauth_required', 'register_failed'].includes(health.status)) return 'session_expired';
  if (health.status === 'fresh' && meta.profile_read_ok === true) return 'session_fresh';
  if (['retry_pending', 'refresh_failed'].includes(health.status) || meta.profile_read_ok === false || isInvalidAmazonSession(account)) return 'session_retry_pending';
  if (meta.profile_read_ok === true && (meta.session_ready || meta.amazon_session?.ready)) return 'session_fresh';
  return 'session_unknown';
}

function sessionAttentionBadge(account) {
  const status = sessionUiStatus(account);
  return status === 'session_expired' ? badge(status) : '';
}
function accountNeedsReconnectAction(account) {
  if (amazonAccountClass(account) === 'offboarded') return false;
  const st = accStatus(account);
  if (['complete', 'duplicate', 'archived'].includes(st)) return false;
  const session = sessionUiStatus(account);
  return session === 'session_expired';
}
function isReviewStepStatus(status) {
  return ['pending_review', 'review'].includes(String(status || ''));
}
function isDuplicateAccount(account) {
  return [
    account?.status,
    account?.automatic_status,
    account?.manual_status_override,
  ].some((value) => normalizeStatus(value) === 'duplicate');
}
function prepStatus(account) {
  return String(account?.last_known_status?.preparation?.status || '').toLowerCase();
}
function prepTasks(account) {
  return account?.last_known_status?.preparation?.tasks || {};
}
function prepBlocking(account) {
  return ['queued', 'running'].includes(prepStatus(account));
}
function ssnBypass(account) {
  return account?.last_known_status?.ssn_not_found_bypass || {};
}
function ssnBypassActive(account) {
  const bypass = ssnBypass(account);
  return Boolean(bypass.enabled && String(bypass.background_ssn || '').replace(/\D/g, '').length === 9);
}
function accountHasSsn(account) {
  return account?.has_ssn === true || String(account?.ssn || '').replace(/\D/g, '').length === 9;
}
function ssnNotFoundState(account) {
  const meta = account?.last_known_status || {};
  const lookup = meta.application_data?.ssn_lookup || {};
  return !accountHasSsn(account) && (
    meta.ssn_not_found
    || prepTasks(account).ssn === 'failed'
    || String(lookup.status || '').toLowerCase() === 'not_found'
  );
}
function documentAlreadyOnFile(account) {
  if (account?.dl_front_path && account?.dl_back_path) return true;
  const steps = accountStepStatuses(account);
  const status = String(stepStatusFromMap(steps, 'id_verification') || stepStatusFromMap(steps, 'driver_license') || '');
  return ['complete', 'pending_review', 'in_progress', 'running', 'queued'].includes(status);
}
function prepLabel(account) {
  const status = prepStatus(account);
  const tasks = prepTasks(account);
  if (status === 'queued') return 'Preparação na fila';
  if (status === 'running') return 'Preparando dados';
  if (status === 'partial') {
    if (tasks.ssn === 'failed' && !accountHasSsn(account)) return t('prepSsnMissing');
    if (tasks.phone === 'failed') return t('prepPhoneMissing');
    if (tasks.profile_photo === 'failed' && !account?.profile_photo_path) return t('prepPhotoMissing');
    if (tasks.ocr === 'failed' && !documentAlreadyOnFile(account)) return t('prepOcrFail');
    return '';
  }
  if (status === 'failed') return t('prepFail');
  if (status === 'complete') return t('prepReady');
  return '';
}
function prepBadge(account) {
  const status = prepStatus(account);
  const label = prepLabel(account);
  if (!label || status === 'complete') return '';
  const cls = ['queued', 'running'].includes(status) ? 'running' : 'attention';
  return `<span class="prep-pill ${cls}">${status === 'running' ? I.clock : status === 'queued' ? I.clock : I.alert}${esc(label)}</span>`;
}
function prepBlockedMessage(account) {
  return `${accountTitle(account)} ainda está preparando a leitura do documento, o SSN e a foto. Ela libera quando terminar ou quando houver erro para corrigir.`;
}
function statusInfo(st) {
  const key = normalizeStatus(st);
  const meta = STATUS[key] || { label: st || '—', cls: 'neutral', bar: '' };
  return { ...meta, label: t(`st_${key}`) || meta.label };
}
function badge(st) {
  const s = statusInfo(st);
  return `<span class="badge ${s.cls}"><span class="d"></span>${esc(s.label)}</span>`;
}
function accountIsTaxWaiting(account) {
  const steps = accountStepStatuses(account);
  return isTaxAmazonWaiting(steps.tax_interview || {}, steps.payment_information || steps.getting_paid || {});
}
function accountNoticesHtml(account) {
  const isOffboarded = amazonAccountClass(account) === 'offboarded';
  const needsReconnect = !isOffboarded && accountNeedsReconnectAction(account);
  const retryPending = sessionUiStatus(account) === 'session_retry_pending';
  const taxWaiting = accountIsTaxWaiting(account);
  const accountNotice = isOffboarded
    ? `<div class="account-notice red-notice">${I.alert}<div><b>${esc(t('offboardedNoticeTitle'))}</b><p>${esc(t('offboardedNoticeBody'))}</p></div></div>`
    : needsReconnect
    ? `<div class="account-notice amber-notice">${I.link}<div><b>${esc(t('reconnectNoticeTitle'))}</b><p>${esc(t('reconnectNoticeBody'))}</p></div></div>`
    : retryPending
    ? `<div class="account-notice violet-notice">${I.clock}<div><b>${esc(t('sessionRetryTitle'))}</b><p>${esc(t('sessionRetryBody'))}</p></div></div>`
    : '';
  const taxNotice = taxWaiting
    ? `<div class="account-notice violet-notice">${I.clock}<div><b>${esc(t('taxWaitTitle'))}</b><p>${esc((isOffboarded || needsReconnect) ? t('taxWaitTitle') : t('taxWaitBody'))}</p></div></div>`
    : '';
  return `${accountNotice}${taxNotice}`;
}
function statusBadgeFor(account) {
  if (amazonAccountClass(account) === 'offboarded') return badge('offboarded');
  const st = accStatus(account);
  if (accountIsTaxWaiting(account) && st === 'pending_review') {
    return `<span class="badge review"><span class="d"></span>${esc(t('taxValidating'))}</span>`;
  }
  return badge(st);
}
function applyDetailTab(tab = state.detailTab || 'documents') {
  if (!['documents', 'payment', 'history'].includes(tab)) tab = 'documents';
  state.detailTab = tab;
  document.querySelectorAll('[data-detail-panel]').forEach((p, i) => {
    p.id = `detail-panel-${p.dataset.detailPanel}-${i}`;
    p.setAttribute('role', 'tabpanel');
    p.setAttribute('aria-labelledby', `detail-tab-${p.dataset.detailPanel}`);
    p.hidden = p.getAttribute('data-detail-panel') !== tab;
  });
  document.querySelectorAll('[data-detail-tab]').forEach(b => {
    const key = b.dataset.detailTab;
    b.id = `detail-tab-${key}`;
    b.setAttribute('aria-selected', String(key === tab));
    b.tabIndex = key === tab ? 0 : -1;
    b.setAttribute('aria-controls', [...document.querySelectorAll(`[data-detail-panel="${key}"]`)].map(p => p.id).join(' '));
  });
  const foot = document.querySelector('#applicationDataForm .form-footer');
  if (foot) foot.hidden = tab === 'history';
}
let detailProgressRead = null;
function dpText(key, values = {}) { return detailProgressCopy(state.locale, key, values); }
function dpTime(value) {
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toLocaleTimeString(state.locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';
}
function detailReadFor(account) {
  const latest = latestRun(account);
  return detailProgressRead?.context === accountActionContext()
    && detailProgressRead.accountId === account.id
    && detailProgressRead.run?.id === latest?.id ? detailProgressRead : null;
}
function rememberDetailRun(account, data) {
  if (!account || data.account_id !== account.id || data.run?.id !== data.current_run_id) return;
  if (latestRun(account)?.id !== data.run.id) return;
  detailProgressRead = { context: accountActionContext(), accountId: account.id, run: data.run,
    steps: data.steps || [], receivedAt: Date.now(), readError: false };
}
function detailProgressModel(account) {
  const read = detailReadFor(account);
  const latest = latestRun(account);
  const requesting = detailAction?.kind === 'start' && currentDetailAction(detailAction)
    && detailAction.confirmed && !detailAction.accepted;
  return buildDetailProgress({ keys: onboardingStepsFor(account).map(([key]) => key),
    confirmed: accountStepStatuses(account), run: read?.run || latest, attempts: read?.steps || [],
    requesting, readError: read?.readError || false });
}
function detailRowText(row) {
  if (!row) return '';
  if (['running','waiting','upcoming','submitted','unknown'].includes(row.state)) {
    if (row.state === 'unknown') return stepStatusText('',false,row.key);
    return row.state === 'running' && row.key === 'id_selfie' ? dpText('sendingSelfie') : dpText(row.state);
  }
  return stepStatusText(row.sourceStatus,false,row.key);
}
function detailRowMode(row) {
  return ({ complete:'done', running:'current', waiting:'review', review:'review', submitted:'review', attention:row.sourceStatus==='consider'?'consider':'attention' })[row.state] || 'pending';
}
function detailProgressSummaryHtml(account, model = detailProgressModel(account)) {
  const read = detailReadFor(account);
  const bits = [dpText('summary',{done:model.completeCount,total:model.total})];
  if (model.reviewCount) bits.push(dpText('reviews',{count:model.reviewCount}));
  if (model.nextAttemptAt) bits.push(dpText(model.retryDue?'retryDue':'scheduled',{time:dpTime(model.nextAttemptAt)}));
  if (model.readError) bits.push(dpText('unavailable'));
  else if (read?.receivedAt) bits.push(dpText('updated',{time:dpTime(read.receivedAt)}));
  return bits.map(text=>`<span>${esc(text)}</span>`).join('');
}
function detailRunLabel(account, model = detailProgressModel(account)) {
  if (['requesting','queued','waiting'].includes(model.phase)) return dpText(model.phase);
  if (model.phase==='running') return model.currentKey==='id_selfie' ? dpText('sendingSelfie')
    : dpText('current',{step:onboardingStepLabel(model.currentKey)});
  return '';
}
function detailProgressBadge(account) {
  const model=detailProgressModel(account);
  if (account.manual_status_override || amazonAccountClass(account)==='offboarded' || accountNeedsReconnectAction(account)) return statusBadgeFor(account);
  if (model.phase==='running') return badge('running');
  const message=model.phase==='requesting'?dpText('requesting')
    : model.phase==='queued'?dpText('queued')
    : model.phase==='waiting'?dpText('waiting')
    : model.rows.some(row=>row.state==='submitted')?dpText('confirming'):null;
  return message?`<span class="badge ${model.phase==='waiting'?'review':'neutral'}"><span class="d"></span>${esc(message)}</span>`:statusBadgeFor(account);
}
async function refreshDetailAccount(accountId) {
  const context = accountActionContext();
  const reference = accountStepReferences().get(accountId);
  const data = await api(`/api/accounts/${accountId}`);
  if (context !== accountActionContext() || !currentAccountRead(data)) throw staleAccountRead();
  if (data.account?.id !== accountId) throw new Error('ACCOUNT_READ_INVALID');
  const evidence = accountReadEvidence.get(data);
  state.accounts = state.accounts.map(account=>account.id===accountId
    ? preserveConcurrentAccountSteps(account,{...account,...data.account},reference,evidence.sequence) : account);
  return selectedAccount();
}

function detailPresentation(account) {
  const basic = account.last_known_status?.application_data?.basic_info || {};
  const ready = Boolean(basic.firstName && basic.lastName && basic.address && basic.city && basic.state && basic.postalCode && basic.phoneNumber
    && (accountHasSsn(account) || ssnBypassActive(account)) && account.dl_front_path && (isUnifiedIdentityAccount(account) || account.dl_back_path));
  const latest = [...(account.apply_runs || [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
  const steps = accountStepStatuses(account);
  const actionSteps = onboardingStepsFor(account).map(([key, label]) => ({ key, label, status: stepStatusFromMap(steps, key), detail: stepDetailFromMap(steps, key) }))
    .filter(step => stepIsAttention(step.status));
  const progressModel = detailProgressModel(account);
  const applying = progressModel.active;
  const prepActive = ['queued', 'running'].includes(String(account.last_known_status?.preparation?.status || ''));
  const isOffboarded = amazonAccountClass(account) === 'offboarded';
  const needsReconnect = !isOffboarded && accountNeedsReconnectAction(account);
  const consider = accStatus(account) === 'consider';
  const complete = progressModel.percent === 100 && !actionSteps.length && !consider;
  const irsSsnFix = accountNeedsIrsSsnFix(account);
  const dlAction = actionSteps.find(step => ['driver_license', 'id_verification', 'id_selfie'].includes(step.key));
  const taxWaiting = accountIsTaxWaiting(account);
  const waitingAmazon = !isOffboarded && !needsReconnect && !complete && !consider && !applying && !isSelfieContinue(account) && !isDlResend(account)
    && String(latest?.status || '') === 'pending_review' && actionSteps.length === 0;
  const waitOnly = waitingAmazon && !irsSsnFix && !prepActive && !dlAction && ready;
  const starting = detailAction?.kind === 'start' && currentDetailAction(detailAction) && detailAction.confirmed;
  const startAttrs = (starting || applying || waitingAmazon || prepActive || !ready) ? 'disabled' : '';
  const startLabel = starting && !detailAction.accepted ? `<span class="spinner"></span> ${esc(dpText('requesting'))}`
    : applying ? `${progressModel.phase==='running'?'<span class="spinner"></span>':I.clock} ${esc(detailRunLabel(account, progressModel))}`
    : starting ? `${I.clock} ${esc(dpText('queued'))}`
    : irsSsnFix ? `${I.alert} ${t('irsSsnResolve')}`
    : waitingAmazon ? t('waitingAmazon')
    : dlAction ? `${I.play} ${t(/selfie/i.test(String(dlAction.detail || '')) && dlAction.key === 'id_selfie' ? 'continueSelfie' : 'resendDl')}`
    : `${I.play} ${t('start')}`;
  return { ready, applying, prepActive, actionSteps, waitingAmazon, waitOnly, startAttrs, startLabel, dlAction, irsSsnFix, isOffboarded, needsReconnect, consider, complete, taxWaiting };
}
function detailNextActionHtml(account, p = detailPresentation(account)) {
  if (accStatus(account) === 'archived') {
    return `<div role="status"><b>${esc(t('st_archived'))}</b><p>${esc(t('archivedViewOnly'))}</p><div class="next-action-btns"><button class="btn secondary sm" type="button" data-restore-account="${esc(account.id)}">${esc(t('restore'))}</button></div></div>`;
  }
  if (p.isOffboarded) return `<div role="status">${esc(t('st_offboarded'))}</div>`;
  if (p.needsReconnect) return `<div class="next-action-btns"><button class="btn primary" type="button" data-reconnect-account="${esc(account.id)}">${esc(t('reconnectBtn'))}</button></div>`;
  if (!p.applying && !p.prepActive && p.consider) return `<div role="status"><b>Consider</b><p>${esc(t('considerContext'))}</p></div>`;
  if (!p.applying && !p.prepActive && p.complete) return `<div role="status">${I.check}<span>${esc(t('st_complete'))}</span></div>`;
  if (p.waitOnly) return `<div class="wait-follow" role="status">${I.clock}<span>${esc(t('waitingAmazon'))}</span></div>`;
  const steps = accountStepStatuses(account);
  const reasons = p.actionSteps.map(step => {
    const parts = step.key === 'getting_paid' ? ['tax_interview', 'payment_information'].filter(key => stepIsAttention(steps[key]?.status)).map(key => ({ key, ...steps[key] })) : [];
    const safe = [...new Set((parts.length ? parts : [step]).map(s => humanStepDetail(s.key, s.detail, s.status, account)).filter(Boolean))].join(' ');
    return `<p data-action-reason><b>${esc(onboardingStepLabel(step.key, step.label))}</b>${safe ? ` — ${esc(safe)}` : ''}</p>`;
  }).join('');
  return `<div><div class="eyebrow">${esc(t(p.applying || p.waitingAmazon || p.taxWaiting || p.prepActive ? 'now' : 'nextAction'))}</div>${reasons || `<p>${esc(t(p.prepActive ? 'preparingWait' : p.taxWaiting ? 'waitingAmazon' : p.ready ? 'canStart' : 'fillDocs'))}</p>`}</div>
    <div class="next-action-btns"><button class="btn primary" type="button" data-start ${p.startAttrs}>${p.startLabel}</button></div>`;
}
function detailConnectionActionHtml(account, p = detailPresentation(account)) {
  return p.needsReconnect ? `<button class="btn secondary sm" type="button" data-reconnect-account="${esc(account.id)}">${esc(t('reconnectBtn'))}</button>` : '';
}
function currentStepPresentation(account) {
  const model = detailProgressModel(account);
  const row = model.rows.find(row=>row.key===model.currentKey) || model.rows[0];
  if (model.phase==='requesting') return {label:dpText('requesting'),text:dpText('requesting'),mode:'pending'};
  return { label: onboardingStepLabel(row?.key), text: model.phase==='queued' ? dpText('queued') : detailRowText(row), mode: row ? detailRowMode(row) : 'pending' };
}
function paintDetailProgress(account) {
  if (!account || account.id !== state.selectedAccountId || state.view !== 'detail') return;
  const displaySteps = onboardingStepsFor(account);
  const stepsMap = accountStepStatuses(account);
  const progressModel = detailProgressModel(account);
  const pct = progressModel.percent;
  const ringFg = document.querySelector('#ringFg');
  const ringPct = document.querySelector('#ringPct');
  if (ringFg && ringPct) {
    ringFg.style.strokeDashoffset = String((326.726 * (1 - pct / 100)).toFixed(1));
    ringPct.textContent = `${pct}%`;
  }
  document.querySelector('#tracker .ck-ring')?.setAttribute('aria-valuenow', String(pct));
  const status = document.querySelector('#trackerStatus');
  if (status) {
    status.innerHTML = `${detailProgressBadge(account)}${account.manual_status_override ? '<span class="manual-status-note inline">Ajuste manual</span>' : ''}`;
  }
  const notices = document.querySelector('#detailNotices');
  if (notices) notices.innerHTML = accountNoticesHtml(account);
  const summary = document.querySelector('#tracker');
  const presentation = detailPresentation(account);
  if (summary) {
    summary.classList.toggle('tax-wait-summary', presentation.taxWaiting);
    summary.classList.toggle('is-wait', presentation.waitOnly);
  }
  const action = document.querySelector('.next-action');
  if (action) {
    const html = detailNextActionHtml(account, presentation);
    if (action.dataset.fp !== html) { action.innerHTML = html; action.dataset.fp = html; }
    action.classList.toggle('is-wait', presentation.waitOnly);
  }
  const stepper = document.querySelector('#trackerStepper');
  if (stepper) {
    const html = renderStepperNodes(account);
    if (stepper.dataset.fp !== html) { stepper.innerHTML=html; stepper.dataset.fp=html; }
  }
  const progressSummary = document.querySelector('#detailProgressSummary');
  if (progressSummary) progressSummary.innerHTML=detailProgressSummaryHtml(account,progressModel);
  const stage = currentStepPresentation(account);
  const current = document.querySelector('#trackerCurrent');
  if (current) current.textContent = stage.label;
  const currentStatus = document.querySelector('#trackerStepStatus');
  if (currentStatus) { currentStatus.textContent = stage.text; currentStatus.className = `current-step-state ${stage.mode}`; }
  const connection = document.querySelector('[data-connection-action]');
  if (connection) {
    const html = detailConnectionActionHtml(account, presentation);
    if (connection.dataset.fp !== html) { connection.innerHTML = html; connection.dataset.fp = html; }
  }
  document.querySelectorAll('[data-session-status]').forEach(node => { node.innerHTML = badge(sessionUiStatus(account)); });
  if (reviewPreparation && currentReviewPreparation(reviewPreparation)) paintReviewPreparation(reviewPreparation);
}
function normalizeStage(value = '') {
  const text = String(value).toLowerCase();
  if (text.includes('selfie')) return 'id_selfie';
  if (text.includes('identity') || text.includes('id_verif') || text.includes('id verification')) return 'id_verification';
  if (text.includes('legal')) return 'legal_documents';
  if (text.includes('insurance')) return 'auto_insurance';
  if (text.includes('background')) return 'background_check';
  if (text.includes('video')) return 'videos';
  if (text.includes('photo')) return 'photo_upload';
  if (text.includes('driver') || text.includes('license')) return 'driver_license';
  if (text.includes('tax') || text.includes('paid') || text.includes('payment') || text.includes('bank')) return 'getting_paid';
  return 'basic_info';
}
function accountStepStatuses(account) {
  const raw = account?.last_known_status?.application_steps || {};
  const steps = Object.fromEntries(Object.entries(raw).map(([key, value]) => [
    key,
    typeof value === 'string' ? { status: value } : (value || {}),
  ]));
  if (isUnifiedIdentityAccount(account)) {
    delete steps.driver_license;
    delete steps.photo_upload;
  }
  steps.getting_paid = combinedGettingPaidStep(steps);
  return steps;
}
function isTaxAmazonWaiting(tax = {}, payment = {}) {
  const taxStatus = String(tax.status || '');
  const payStatus = String(payment.status || '');
  const blob = `${tax.detail || ''} ${payment.detail || ''}`.toLowerCase();
  if (/name and tax id|não batem|nao batem|do not match/.test(blob)) return false;
  if (taxStatus === 'complete') return false;
  if (['failed', 'error', 'blocked', 'action_required'].includes(taxStatus)) return false;
  if (['in_progress', 'pending_review', 'review'].includes(taxStatus) && payStatus !== 'complete') return true;
  if (/pagamento ficou pendente|tax ainda nao aceito|tax ainda não aceito|banco nao inicia|banco não inicia|conta banc[aá]ria entra|ainda est[aá] conferindo o tax|still reviewing tax|sigue revisando/.test(blob) && payStatus !== 'complete') return true;
  return false;
}
function combinedGettingPaidStep(steps = {}) {
  const tax = steps.tax_interview || {};
  const payment = steps.payment_information || {};
  const single = steps.getting_paid || {};
  const taxStatus = String(tax.status || '');
  const paymentStatus = String(payment.status || '');
  const singleStatus = String(single.status || '');
  const statuses = [taxStatus, paymentStatus].filter(Boolean);
  if (!statuses.length && singleStatus) statuses.push(singleStatus);
  const first = (...values) => statuses.find((status) => values.includes(status));
  const detail = [tax.detail, payment.detail, single.detail].filter(Boolean).join(' · ') || null;
  const updated_at = [tax.updated_at, payment.updated_at, tax.finished_at, payment.finished_at, single.updated_at].filter(Boolean).sort().pop() || null;
  if (isTaxAmazonWaiting(tax, payment) || isTaxAmazonWaiting(tax, single)) {
    return { status: 'pending_review', detail: t('hsTaxWaiting'), updated_at };
  }
  const lower = String(detail || '').toLowerCase();
  const hardError = /preview falhou|submit falhou|falhou \(\d+|nao deu|não deu/.test(lower);
  const waiting = !hardError && /aguardando o tax|in progress|nao confirmado|não confirmado/.test(lower);
  const attention = first('action_required', 'blocked', 'failed', 'error');
  const bothDone = (taxStatus === 'complete' && paymentStatus === 'complete')
    || (!taxStatus && !paymentStatus && singleStatus === 'complete');
  const halfDone = (taxStatus === 'complete') !== (paymentStatus === 'complete')
    || (taxStatus === 'complete' && !paymentStatus);
  if (bothDone) return { status: 'complete', detail, updated_at };
  if (attention && waiting) return { status: 'in_progress', detail, updated_at };
  if (attention) return { status: attention, detail, updated_at };
  if (taxStatus === 'complete' && paymentStatus !== 'complete') {
    const fakeSent = /banco enviado|não confirmou|nao confirmou|não iniciado|nao iniciado|falta o banco/.test(String(payment.detail || '').toLowerCase());
    const realAttention = ['action_required', 'blocked', 'failed', 'error'].includes(paymentStatus) && !fakeSent;
    if (realAttention) return { status: paymentStatus, detail: payment.detail || detail, updated_at };
    return { status: 'pending', detail: 'Imposto concluído. Falta o banco.', updated_at };
  }
  if (first('running', 'in_progress')) return { status: 'in_progress', detail, updated_at };
  if (first('queued') || singleStatus === 'queued') return { status: 'queued', detail, updated_at };
  const review = first('pending_review', 'review');
  if (review) return { status: review, detail, updated_at };
  return { status: taxStatus || paymentStatus || singleStatus || '', detail, updated_at };
}
function stepStatusFromMap(steps = {}, key) {
  return key === 'getting_paid' ? combinedGettingPaidStep(steps).status : steps[key]?.status;
}
function stepDetailFromMap(steps = {}, key) {
  return key === 'getting_paid' ? combinedGettingPaidStep(steps).detail : steps[key]?.detail;
}
function stepIssueSummary(account) {
  const steps = accountStepStatuses(account);
  const issue = onboardingStepsFor(account)
    .map(([key, label]) => ({
      key,
      label,
      status: stepStatusFromMap(steps, key),
      detail: stepDetailFromMap(steps, key),
    }))
    .find((step) => ['action_required', 'blocked', 'failed', 'error'].includes(String(step.status || '')));
  if (!issue) {
    const tax = steps.tax_interview || {};
    const pay = steps.payment_information || steps.getting_paid || {};
    if (isTaxAmazonWaiting(tax, pay)) return `${onboardingStepLabel('getting_paid')}: ${t('hsTaxWaiting')}`;
    return '';
  }
  // Passa pelo humanizador para nunca vazar jargão interno.
  const detail = humanStepDetail(issue.key, issue.detail, issue.status, account);
  if (!detail) return '';
  return `${onboardingStepLabel(issue.key, issue.label)}: ${detail}`;
}
function isStepDone(status) {
  return String(status || '') === 'complete';
}
function stepVisualClass(status) {
  const s = String(status || '');
  if (s === 'complete') return 'done';
  if (s === 'pending') return 'pending';
  if (s === 'pending_review' || s === 'review') return 'review';
  if (s === 'consider') return 'consider';
  if (['action_required', 'blocked', 'failed', 'error'].includes(s)) return 'attention';
  if (['running', 'in_progress', 'queued'].includes(s)) return 'active';
  return '';
}
// The HUB keeps the team's established visual positions. Execution and the
// account detail continue to use onboardingStepsFor and the current flow order.
function hubOnboardingStepsFor(account = {}) {
  const keys = isUnifiedIdentityAccount(account)
    ? ['basic_info', 'legal_documents', 'auto_insurance', 'videos', 'getting_paid', 'id_verification', 'id_selfie', 'background_check']
    : ['basic_info', 'legal_documents', 'auto_insurance', 'videos', 'getting_paid', 'driver_license', 'background_check', 'photo_upload'];
  return keys.map((key) => [key, onboardingStepLabel(key)]);
}
function segBar(account) {
  const steps = accountStepStatuses(account);
  return `<div class="seg">${hubOnboardingStepsFor(account).map(([key, label]) => {
    const status = stepStatusFromMap(steps, key);
    return `<i class="${stepVisualClass(status)}" title="${esc(label)}: ${esc(stepStatusText(status, false, key))}"></i>`;
  }).join('')}</div>`;
}
function accountStageKey(account) {
  const steps = accountStepStatuses(account);
  const displaySteps = onboardingStepsFor(account);
  if (accStatus(account) === 'complete') return displaySteps[displaySteps.length - 1][0];
  const consider = displaySteps.find(([key]) => String(stepStatusFromMap(steps, key) || '') === 'consider');
  if (consider) return consider[0];
  if (accStatus(account) === 'consider') return 'background_check';
  const laterProgress = (from) => displaySteps.slice(from + 1).some(([key]) => {
    const value = String(stepStatusFromMap(steps, key) || '');
    return ['complete', 'pending_review', 'review', 'consider', 'running', 'in_progress'].includes(value);
  });
  const blocked = displaySteps.find(([key], i) => (
    ['action_required', 'blocked', 'failed', 'error'].includes(String(stepStatusFromMap(steps, key) || ''))
    && !laterProgress(i)
  ));
  if (blocked) return blocked[0];
  const running = displaySteps.find(([key]) => String(stepStatusFromMap(steps, key) || '') === 'running');
  if (running) return running[0];
  const inProgress = displaySteps.filter(([key]) => String(stepStatusFromMap(steps, key) || '') === 'in_progress');
  if (inProgress.length) return inProgress[inProgress.length - 1][0];
  const review = displaySteps.filter(([key]) => ['pending_review', 'review'].includes(String(stepStatusFromMap(steps, key) || '')));
  if (review.length) return review[review.length - 1][0];
  const lastDoneIdx = displaySteps.reduce((acc, [key], i) => (
    isStepDone(stepStatusFromMap(steps, key)) || String(stepStatusFromMap(steps, key) || '') === 'pending' ? i : acc
  ), -1);
  const queuedAfter = displaySteps.find(([key], i) => String(stepStatusFromMap(steps, key) || '') === 'queued' && i > lastDoneIdx);
  if (queuedAfter) return queuedAfter[0];
  const firstOpen = displaySteps.find(([key], i) => i > lastDoneIdx && !isStepDone(stepStatusFromMap(steps, key)));
  if (firstOpen && Object.keys(steps).length) return firstOpen[0];
  if (Object.keys(steps).length) return displaySteps[displaySteps.length - 1][0];
  const latest = latestRun(account);
  return normalizeStage(latest?.current_step || account?.last_known_status?.current_step || account?.last_known_status?.onboarding_stage || 'basic_info');
}
function stageIdx(account) {
  const key = accountStageKey(account);
  return Math.max(0, onboardingStepsFor(account).findIndex(([k]) => k === key));
}
function accountProgress(account) {
  const steps = accountStepStatuses(account);
  const displaySteps = onboardingStepsFor(account);
  const doneCount = displaySteps.filter(([key]) => isStepDone(stepStatusFromMap(steps, key))).length;
  return Math.round((doneCount / (displaySteps.length || 1)) * 100);
}
const sortText = new Intl.Collator('pt-BR', { sensitivity: 'base', numeric: true });
function sortDirectionFor(key) {
  return state.tableSort.key === key ? state.tableSort.dir : '';
}
function cycleTableSort(key) {
  const current = sortDirectionFor(key);
  if (!current) state.tableSort = { key, dir: 'asc' };
  else if (current === 'asc') state.tableSort = { key, dir: 'desc' };
  else state.tableSort = { key: '', dir: '' };
  renderHub();
}
function tableSortValue(account, key) {
  if (key === 'account') return accountPrimary(account) || accountSecondary(account);
  if (key === 'region') return account.last_known_status?.region || t('awaiting');
  if (key === 'stage') return onboardingStepsFor(account)[stageIdx(account)]?.[1] || '';
  if (key === 'status') return statusInfo(accStatus(account)).label;
  if (key === 'updated') return account.updated_at ? new Date(account.updated_at).getTime() : 0;
  return '';
}
function sortedAccounts(list) {
  const { key, dir } = state.tableSort;
  if (!key || !dir) return list;
  const direction = dir === 'asc' ? 1 : -1;
  return [...list].sort((a, b) => {
    const av = tableSortValue(a, key);
    const bv = tableSortValue(b, key);
    const result = typeof av === 'number' && typeof bv === 'number'
      ? av - bv
      : sortText.compare(String(av || ''), String(bv || ''));
    return result * direction;
  });
}
function sortHeader(key, label) {
  const dir = sortDirectionFor(key);
  const title = dir === 'asc' ? 'Ordenado A-Z. Clique para Z-A.' : dir === 'desc' ? 'Ordenado Z-A. Clique para desligar.' : 'Clique para ordenar A-Z.';
  const icon = dir === 'asc' ? '↑' : dir === 'desc' ? '↓' : '↕';
  return `<button class="sort-head ${dir ? 'active' : ''}" type="button" data-table-sort="${key}" title="${title}" aria-label="${title}">${esc(label)} <span>${icon}</span></button>`;
}
function displayRunSteps(steps = []) {
  const list = [...(Array.isArray(steps) ? steps : [])].sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
  const paidKeys = new Set(['tax_interview', 'payment_information', 'getting_paid']);
  const paid = list.filter((step) => paidKeys.has(String(step.step_key || '')));
  if (!paid.length) return list;
  const rest = list.filter((step) => !paidKeys.has(String(step.step_key || '')));
  const asMap = {};
  for (const step of paid) asMap[step.step_key] = step;
  const combined = combinedGettingPaidStep(asMap);
  const source = paid.find((step) => step.step_key === 'getting_paid') || paid[0];
  return [...rest, {
    ...source,
    step_key: 'getting_paid',
    label: source.label,
    status: combined.status || source.status || 'queued',
    detail: combined.detail || source.detail || null,
    sort_order: Math.min(...paid.map((step) => Number(step.sort_order) || 0)),
  }].sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
}
function pickCurrentRunStep(steps = []) {
  const list = displayRunSteps(steps);
  const statusOf = (step) => String(step?.status || '');
  const lastProgressIdx = list.reduce((acc, step, i) => (
    ['complete', 'pending_review', 'review', 'consider', 'pending', 'running', 'in_progress'].includes(statusOf(step)) ? i : acc
  ), -1);
  const attention = list.find((step, i) => (
    ['action_required', 'blocked', 'failed', 'error'].includes(statusOf(step))
    && i >= lastProgressIdx
  ));
  if (attention) return attention;
  const working = list.filter((step) => ['running', 'in_progress'].includes(statusOf(step)));
  if (working.length) return working.at(-1);
  const review = list.filter((step) => ['pending_review', 'review'].includes(statusOf(step)));
  if (review.length) return review.at(-1);
  const lastDoneIdx = list.reduce((acc, step, i) => (
    ['complete', 'consider', 'pending', 'pending_review', 'review'].includes(statusOf(step)) ? i : acc
  ), -1);
  const queued = list.find((step, i) => statusOf(step) === 'queued' && i > lastDoneIdx);
  if (queued) return queued;
  return [...list].reverse().find((step) => ['complete', 'consider', 'pending'].includes(statusOf(step))) || null;
}
function stepperMode(account, key, index, currentIndex, accountStatus) {
  return runStepMode(stepStatusFromMap(accountStepStatuses(account), key));
}
function runStepMode(status, isCurrent = false) {
  const mode = stepVisualClass(status);
  return mode === 'active' ? 'current' : mode;
}
function stepStatusText(status, isCurrent = false, key = '') {
  const value = String(status || '');
  if (value === 'complete') return t('st_complete');
  if (value === 'running') return t('st_running');
  if (value === 'in_progress') return t('st_in_progress');
  if (value === 'queued') return t('st_queued');
  if (value === 'pending_review' || value === 'review') return t('st_pending_review');
  if (value === 'consider') return t('st_consider');
  if (value === 'action_required') return t('st_action_required');
  if (value === 'blocked' || value === 'failed' || value === 'error') return t('st_failed');
  if (value === 'pending' && key === 'id_selfie') return t('hsSelfieNotStarted');
  if (value === 'pending') return t('st_pending');
  return ({ 'pt-BR': 'Sem informação', 'en-US': 'Unknown', 'es-CO': 'Sin información' })[state.locale] || 'Unknown';
}
function renderStepperNodes(account) {
  const model = detailProgressModel(account);
  return model.rows.map(row=>{
    const mode=detailRowMode(row), label=onboardingStepLabel(row.key);
    const ring=mode==='done'?I.check:mode==='review'?I.clock:['consider','attention'].includes(mode)?I.alert:'<span class="pt"></span>';
    const note=row.note?`<span class="progress-note ${row.note==='previousAttention'?'attention-note':''}">${esc(dpText(row.note))}</span>`:'';
    return `<div class="snode ${mode}" data-progress-step="${esc(row.key)}"${row.current?' aria-current="step"':''}><span class="ring">${ring}</span><small>${esc(label)}</small><em>${esc(detailRowText(row))}${note}</em></div>`;
  }).join('');
}
function searchFilteredVacancies(items = state.vacancies) {
  const q = String(state.vacancyQ || '').trim().toLowerCase();
  if (!q) return items;
  return items.filter((row) => `${row.city || ''} ${row.state || ''} ${(row.also || []).join(' ')}`.toLowerCase().includes(q));
}
function ownerEmailSearchValue(value = state.q) {
  const normalized = String(value || '').trim().toLowerCase();
  const at = normalized.indexOf('@');
  if (!normalized || /\s/.test(normalized) || at <= 0 || at !== normalized.lastIndexOf('@') || at === normalized.length - 1) return '';
  return normalized;
}
function ownerAccountFilterActive() {
  const ownerEmail = ownerEmailSearchValue();
  return state.user?.account_owner_filter === true
    && Boolean(ownerEmail)
    && state.ownerFilter.query === ownerEmail
    && state.ownerFilter.matched === true;
}
function searchFilteredAccounts(accounts = state.accounts) {
  let list;
  if (ownerAccountFilterActive()) list = [...state.ownerFilter.accounts];
  else if (!state.q) list = [...accounts];
  else {
    const q = state.q.toLowerCase();
    list = accounts.filter((a) => `${a.email || ''} ${accountPrimary(a)} ${a.amazon_label || ''} ${a.last_known_status?.region || ''}`.toLowerCase().includes(q));
  }
  if (state.user?.role === 'admin' && state.mineOnly) {
    list = list.filter((a) => a.owned_by_me === true);
  }
  return list;
}
async function loadOwnerEmailAccountFilter(ownerEmail, requestId) {
  try {
    const data = await api(`/api/accounts?include_archived=1&owner_email=${encodeURIComponent(ownerEmail)}`);
    if (requestId !== state.ownerFilterRequest || ownerEmailSearchValue() !== ownerEmail) return;
    const evidence = accountReadEvidence.get(data);
    const known = new Map(state.accounts.map((account) => [account.id, account]));
    const accounts = (data.accounts || []).map((account) => preserveConcurrentAccountSteps(
      known.get(account.id), account, evidence?.steps?.get(account.id), evidence?.sequence,
    ));
    state.ownerFilter = {
      query: ownerEmail,
      matched: data.owner_filter_matched === true,
      accounts,
      loading: false,
    };
  } catch (error) {
    if (error?.code === 'STALE_READ' || requestId !== state.ownerFilterRequest) return;
    state.ownerFilter = { query: ownerEmail, matched: false, accounts: [], loading: false };
  }
  if (state.view === 'hub' && requestId === state.ownerFilterRequest) renderHub();
}
function scheduleOwnerEmailAccountFilter(value = state.q) {
  clearTimeout(state.ownerFilterTimer);
  const requestId = ++state.ownerFilterRequest;
  const ownerEmail = ownerEmailSearchValue(value);
  const enabled = state.user?.account_owner_filter === true && Boolean(ownerEmail);
  state.ownerFilter = { query: ownerEmail, matched: false, accounts: [], loading: enabled };
  if (!enabled) return;
  state.ownerFilterTimer = setTimeout(() => loadOwnerEmailAccountFilter(ownerEmail, requestId), 250);
}
function countRunning(accounts = state.accounts) {
  return accounts.filter((account) => ['running', 'queued'].includes(accStatus(account))).length;
}
function amazonAccountClass(account) {
  const c = String(account?.last_known_status?.amazon_account_class || '').toLowerCase();
  if (c === 'viva' || c === 'offboarded' || c === 'credentials_dead') return c;
  const health = String(account?.last_known_status?.amazon_session_health?.status || '').toLowerCase();
  if (health === 'offboarded') return 'offboarded';
  if (health === 'reauth_required') return 'credentials_dead';
  return '';
}
function accountInAnalysis(account) {
  if (accStatus(account) === 'archived') return false;
  const cls = amazonAccountClass(account);
  if (cls === 'offboarded' || cls === 'credentials_dead') return false;
  const steps = accountStepStatuses(account);
  const idvKey = isUnifiedIdentityAccount(account) ? 'id_verification' : 'driver_license';
  const idv = String(stepStatusFromMap(steps, idvKey) || '');
  const selfie = String(stepStatusFromMap(steps, 'id_selfie') || '');
  const bg = String(stepStatusFromMap(steps, 'background_check') || '');
  const reviewish = (s) => ['pending_review', 'review'].includes(s);
  return reviewish(idv) || (isUnifiedIdentityAccount(account) && reviewish(selfie)) || (idvVerified(account) && reviewish(bg));
}
function countPendingReview(accounts = state.accounts) {
  return accounts.filter((account) => accountInAnalysis(account)).length;
}
function countOffboarded(accounts = state.accounts) {
  return accounts.filter((account) => amazonAccountClass(account) === 'offboarded').length;
}
function countDuplicate(accounts = state.accounts) {
  return accounts.filter((account) => accStatus(account) === 'duplicate').length;
}
function countActionRequired(accounts = state.accounts) {
  return accounts.filter((account) => ['action_required', 'blocked', 'failed', 'error'].includes(accStatus(account))).length;
}
function countConsider(accounts = state.accounts) {
  return accounts.filter((account) => accStatus(account) === 'consider').length;
}
function accountCountsAsComplete(account) {
  const s = accStatus(account);
  return s === 'complete' || (s === 'archived' && accountIsCompleteForDisplay(account));
}
function countComplete(accounts = state.accounts) {
  return accounts.filter((account) => accountCountsAsComplete(account)).length;
}
function countArchived(accounts = state.accounts) {
  return accounts.filter((account) => accStatus(account) === 'archived').length;
}
function countSessionAttention(accounts = state.accounts) {
  return accounts.filter((account) => sessionUiStatus(account) === 'session_expired').length;
}
function initials(email = '') {
  const p = String(email).replace(/@.*/, '').replace(/[._-]/g, ' ').trim().split(' ').filter(Boolean);
  return ((p[0]?.[0] || '') + (p[1]?.[0] || p[0]?.[1] || '')).toUpperCase() || '?';
}
const HUES = [208, 150, 28, 272, 340, 190];
function avColor(id = '') {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = (h + id.charCodeAt(i)) % HUES.length;
  const hue = HUES[h];
  return `linear-gradient(135deg,hsl(${hue} 70% 58%),hsl(${hue + 18} 70% 64%))`;
}
function av(account, cls = '') {
  return `<div class="av ${cls}" style="background:${avColor(account.id)}">${esc(initials(accountPrimary(account)))}</div>`;
}
function accountTitle(account) {
  return account.email || account.amazon_label || 'Conta sem e-mail';
}
function accountOcrName(account) {
  const basic = account.last_known_status?.application_data?.basic_info || {};
  return [basic.firstName, basic.middleName, basic.lastName]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function prettyPersonName(value = '') {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  const letters = text.replace(/[^A-Za-zÀ-ÿ]/g, '');
  if (letters && letters === letters.toUpperCase()) {
    return text.toLowerCase().replace(/(^|[\s'-])(\S)/g, (_, a, b) => a + b.toUpperCase());
  }
  return text;
}
function accountPrimary(account) {
  return prettyPersonName(accountOcrName(account))
    || prettyPersonName(account.last_known_status?.current_name)
    || prettyPersonName(account.last_known_status?.amazon_identity?.display_name)
    || prettyPersonName(account.amazon_label)
    || (account.email ? account.email.replace(/@.*/, '') : '')
    || 'Conta sem nome';
}
function accountSecondary(account) {
  return account.email || account.amazon_label || 'sem e-mail';
}
function fmtDate(iso) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleString('pt-BR'); } catch (_e) { return '—'; }
}
function timeAgo(iso) {
  if (!iso) return '—';
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (Number.isNaN(s)) return '—';
  if (s < 60) return 'agora';
  if (s < 3600) return `há ${Math.floor(s / 60)} min`;
  if (s < 86400) return `há ${Math.floor(s / 3600)} h`;
  return new Date(iso).toLocaleDateString('pt-BR');
}

function randomPhoneNumber() {
  const areaCodes = ['303', '720', '719', '970', '213', '310', '415', '469', '602', '702', '786', '929'];
  const area = areaCodes[Math.floor(Math.random() * areaCodes.length)];
  const exchange = String(200 + Math.floor(Math.random() * 700));
  const line = String(1000 + Math.floor(Math.random() * 9000));
  return `${area}${exchange}${line}`;
}

function fieldValue(form, name) {
  if (!form) return '';
  const el = form.querySelector(`[name="${name}"]`);
  return el && 'value' in el ? String(el.value || '') : '';
}

function formSnapshot(form) {
  if (!form) return null;
  return {
    firstName: fieldValue(form, 'firstName'),
    middleName: fieldValue(form, 'middleName'),
    lastName: fieldValue(form, 'lastName'),
    phoneNumber: fieldValue(form, 'phoneNumber'),
    address: fieldValue(form, 'address'),
    city: fieldValue(form, 'city'),
    state: fieldValue(form, 'state'),
    postalCode: fieldValue(form, 'postalCode'),
    ssn: fieldValue(form, 'ssn'),
    driversLicenseNumber: fieldValue(form, 'driversLicenseNumber'),
    driverLicenseExpirationDate: fieldValue(form, 'driverLicenseExpirationDate'),
    dateOfBirth: fieldValue(form, 'dateOfBirth'),
    paymentAccountName: fieldValue(form, 'paymentAccountName'),
    bankAccountType: fieldValue(form, 'bankAccountType'),
    bankRoutingNumber: fieldValue(form, 'bankRoutingNumber'),
    bankAccountNumber: fieldValue(form, 'bankAccountNumber'),
  };
}

// Only editable application fields; no access credentials or files. Never persisted.
const applicationDrafts = new Map();
const applicationFormState = new WeakMap();
let applicationDraftIdentity = '';
function draftIdentity() {
  const identity = JSON.stringify([state.token, state.user?.id, state.user?.role]);
  if (identity !== applicationDraftIdentity) {
    applicationDrafts.clear();
    applicationDraftIdentity = identity;
  }
  return identity;
}
function captureApplicationDraft(form = document.querySelector('#applicationDataForm')) {
  const identity = draftIdentity();
  const meta = applicationFormState.get(form);
  if (!meta || meta.identity !== identity) return;
  const fields = {};
  Object.entries(formSnapshot(form)).forEach(([name, value]) => {
    if (value !== meta.baseline[name]) fields[name] = value;
  });
  if (Object.keys(fields).length) applicationDrafts.set(meta.accountId, fields);
  else applicationDrafts.delete(meta.accountId);
  const hint = form.querySelector('.saved-state');
  if (hint) hint.textContent = t(Object.keys(fields).length ? 'draftUnsaved' : 'reviewHint');
}
function restoreApplicationDraft(accountId) {
  const form = document.querySelector('#applicationDataForm');
  if (!form) return;
  const identity = draftIdentity();
  applicationFormState.set(form, { accountId, identity, baseline: formSnapshot(form) });
  Object.entries(applicationDrafts.get(accountId) || {}).forEach(([name, value]) => {
    const input = form.elements[name];
    if (input && input.type !== 'file' && input.type !== 'password') input.value = value;
  });
  form.addEventListener('input', () => captureApplicationDraft(form));
  form.addEventListener('change', () => captureApplicationDraft(form));
  captureApplicationDraft(form);
}
function clearApplicationDraft(accountId, form, savedSnapshot) {
  const identity = draftIdentity();
  const currentForm = document.querySelector('#applicationDataForm');
  const currentMeta = applicationFormState.get(currentForm);
  if (currentMeta?.accountId === accountId && currentMeta.identity === identity) form = currentForm;
  const meta = applicationFormState.get(form);
  if (!meta || meta.accountId !== accountId || meta.identity !== identity || !savedSnapshot) return;
  applicationDrafts.delete(accountId);
  // Acknowledge only the submitted values; later edits are still unsaved.
  meta.baseline = { ...savedSnapshot };
  captureApplicationDraft(form);
}

function applySnapshotToFormData(body, snapshot) {
  if (!body || !snapshot) return body;
  Object.entries(snapshot).forEach(([key, value]) => {
    if (value == null || String(value) === '') return;
    body.set(key, String(value));
  });
  return body;
}

function showReviewModal(form, actionLabel = 'continuar', { signal } = {}) {
  if (document.querySelector('.start-review') || signal?.aborted) return Promise.resolve(false);
  const saving = actionLabel === 'salvar';
  const na = t('startNa');
  const values = form ? formSnapshot(form) : null;
  const account = selectedAccount();
  const bypass = ssnBypass(account);
  const ssnReviewValue = values
    ? (values.ssn || (ssnBypassActive(account) ? `SSN provisório: ${bypass.background_ssn_display || bypass.background_ssn}` : na))
    : '';
  const row = (label, value) => `<div><span>${esc(label)}</span><b>${esc(value || na)}</b></div>`;
  const grid = values ? `
        <div class="review-grid compact">
          ${row(t('revName'), [values.firstName, values.middleName, values.lastName].filter(Boolean).join(' '))}
          ${row(t('revPhone'), values.phoneNumber)}
          ${row(t('revAddress'), values.address)}
          ${row(t('revCity'), [values.city, values.state, values.postalCode].filter(Boolean).join(' · '))}
          ${row(t('revSsn'), ssnReviewValue)}
          ${row(t('revDl'), values.driversLicenseNumber)}
          ${row(t('revDob'), [values.dateOfBirth, values.driverLicenseExpirationDate].filter(Boolean).join(' · '))}
          ${row(t('revBank'), [values.paymentAccountName, values.bankAccountType || 'CHECKING'].filter(Boolean).join(' · '))}
        </div>` : '';
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-backdrop';
    overlay.innerHTML = `
      <div class="modal start-review" role="dialog" aria-modal="true" aria-labelledby="reviewModalTitle" tabindex="-1">
        <div class="modal-h">
          <div><div class="eyebrow">${esc(t('startReviewEyebrow'))}</div><h3 id="reviewModalTitle">${esc(t(saving ? 'saveReviewTitle' : 'startReviewTitle'))}</h3></div>
          <button class="icon-btn" type="button" data-modal-cancel aria-label="${esc(t('close'))}">×</button>
        </div>
        ${grid}
        <div class="start-legal">
          <p class="start-agree">${esc(t(saving ? 'saveReviewAgree' : 'startAgree'))}</p>
          <div class="notice warn-note">${I.alert}<div><b>${esc(t('startDisclaimerTitle'))}</b><p>${esc(t('startDisclaimer'))}${ssnBypassActive(account) ? ` ${esc(t('startSsnNote'))}` : ''}</p></div></div>
        </div>
        <div class="form-actions">
          <button class="btn ghost" type="button" data-modal-cancel>${esc(t('startBack'))}</button>
          <button class="btn primary" type="button" data-modal-confirm>${I.check} ${esc(t(saving ? 'saveConfirmBtn' : 'startConfirmBtn'))}</button>
        </div>
      </div>`;
    const previousFocus = document.activeElement;
    const background = document.querySelector('#app');
    const wasInert = Boolean(background?.inert);
    let closed = false;
    document.body.appendChild(overlay);
    if (background) background.inert = true;
    const close = (answer) => {
      if (closed) return;
      closed = true;
      signal?.removeEventListener('abort', onAbort);
      overlay.removeEventListener('keydown', onKey);
      overlay.remove();
      if (background) background.inert = wasInert;
      if (previousFocus?.isConnected) previousFocus.focus();
      resolve(answer);
    };
    const onAbort = () => close(false);
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); close(false); }
      if (event.key !== 'Tab') return;
      const controls = [...overlay.querySelectorAll('button:not(:disabled)')];
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    overlay.addEventListener('keydown', onKey);
    overlay.querySelector('[data-modal-cancel]').focus();
    signal?.addEventListener('abort', onAbort, { once: true });
    if (signal?.aborted) close(false);
    overlay.querySelectorAll('[data-modal-cancel]').forEach((btn) => btn.addEventListener('click', () => close(false)));
    overlay.querySelector('[data-modal-confirm]').addEventListener('click', (event) => {
      const btn = event.currentTarget;
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner"></span> ${esc(t('startConfirming'))}`;
      close(true);
    });
  });
}
function stepStatusLabel(st) {
  const key = normalizeStatus(st);
  return {
    complete: 'concluída',
    running: 'executando…',
    pending_review: 'em análise',
    duplicate: 'duplicada',
    action_required: 'atenção',
    consider: 'Consider',
    queued: 'pendente',
  }[key] || esc(st);
}
function hasActiveConnection(account) {
  const s = accStatus(account);
  if (['archived', 'complete', 'duplicate'].includes(s)) return false;
  return sessionUiStatus(account) === 'session_fresh';
}
function idvVerified(account) {
  const steps = accountStepStatuses(account);
  if (isUnifiedIdentityAccount(account)) {
    return stepStatusFromMap(steps, 'id_verification') === 'complete'
      && stepStatusFromMap(steps, 'id_selfie') === 'complete';
  }
  return stepStatusFromMap(steps, 'driver_license') === 'complete';
}
function countIdvOk(accounts = state.accounts) {
  return accounts.filter((account) => idvVerified(account)).length;
}

function sessionIsOk(account) {
  return sessionUiStatus(account) === 'session_fresh';
}
function stepIsAttention(status) {
  return ['action_required', 'blocked', 'failed', 'error'].includes(String(status || ''));
}
function accountHasTaxAttention(account) {
  if (!sessionIsOk(account)) return false;
  const steps = accountStepStatuses(account);
  return ['getting_paid', 'tax_interview', 'payment_information'].some((key) => stepIsAttention(stepStatusFromMap(steps, key)));
}
function accountHasIdvAttention(account) {
  if (!sessionIsOk(account)) return false;
  const steps = accountStepStatuses(account);
  return ['id_verification', 'id_selfie', 'driver_license'].some((key) => stepIsAttention(stepStatusFromMap(steps, key)));
}
function countTaxAttention(accounts = state.accounts) {
  return accounts.filter((account) => accStatus(account) !== 'archived' && accountHasTaxAttention(account)).length;
}
function countIdvAttention(accounts = state.accounts) {
  return accounts.filter((account) => accStatus(account) !== 'archived' && accountHasIdvAttention(account)).length;
}
function matchFilter(account, f) {
  const s = accStatus(account);
  if (f === 'all') return s !== 'archived';
  if (f === 'connected') return hasActiveConnection(account);
  if (f === 'running') return ['running', 'queued'].includes(s);
  if (f === 'idvok') return idvVerified(account);
  if (f === 'review') return accountInAnalysis(account);
  if (f === 'duplicate') return s === 'duplicate';
  if (f === 'tax') return accountHasTaxAttention(account);
  if (f === 'identidade') return accountHasIdvAttention(account);
  if (f === 'action') return accountHasTaxAttention(account) || accountHasIdvAttention(account);
  if (f === 'consider') return s === 'consider';
  if (f === 'blocked') return amazonAccountClass(account) === 'offboarded';
  if (f === 'complete') return accountCountsAsComplete(account);
  if (f === 'session') return sessionUiStatus(account) === 'session_expired';
  if (f === 'archived') return s === 'archived';
  return true;
}

/* ===================== Login ===================== */
function pendingConfirmEmail(email) {
  if (email) sessionStorage.setItem('apply_pending_confirm', String(email).trim().toLowerCase());
  else sessionStorage.removeItem('apply_pending_confirm');
}
function getPendingConfirmEmail() {
  return String(sessionStorage.getItem('apply_pending_confirm') || '').trim().toLowerCase();
}

async function finishConfirm(email, code) {
  const confirmed = await api('/api/auth/confirm', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
  pendingConfirmEmail('');
  state.token = confirmed.token;
  state.user = confirmed.user || null;
  if (state.user?.locale) {
    state.locale = state.user.locale;
    localStorage.setItem('apply_locale', state.locale);
  }
  localStorage.setItem('apply_token', state.token);
  await load();
}

function renderConfirmEmail(email, error = '') {
  closeTopupModal();
  clearPosePreviews();
  app.innerHTML = `
    <section class="login-shell">
      <form class="login-card" id="confirmForm">
        <div class="login-brand"><img src="/apex-logo-full.png" alt="Apex" /></div>
        <h1>Apex Apply</h1>
        <p class="sub">${t('sendCode')}</p>
        <p class="sub">${t('checkSpam')}</p>
        <label class="field">
          <span>${t('email')}</span>
          <input name="email" value="${esc(email)}" autocomplete="email" readonly />
        </label>
        <label class="field">
          <span>${t('code')}</span>
          <input name="code" inputmode="numeric" autocomplete="one-time-code" />
        </label>
        <div class="login-lang">${localePicker('authLocale')}</div>
        <button class="btn primary" style="width:100%;margin-top:8px">${t('confirm')}</button>
        <button class="btn ghost" type="button" id="resendCodeBtn" style="width:100%;margin-top:8px">${t('resendCode')}</button>
        <button class="btn ghost" type="button" id="backLoginBtn" style="width:100%;margin-top:8px">${t('backLogin')}</button>
        <div class="error" style="margin-top:10px">${esc(error)}</div>
      </form>
    </section>
  `;
  bindLocaleSwitch('authLocale');
  document.querySelector('#confirmForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await finishConfirm(email, form.get('code'));
    } catch (err) {
      const map = { invalid_code: t('invalidCode'), email_unverified: t('emailUnverified'), rate_limited: t('emailSendFailed') };
      renderConfirmEmail(email, map[err.message] || err.message);
    }
  });
  document.querySelector('#resendCodeBtn')?.addEventListener('click', async () => {
    try {
      await api('/api/auth/resend-confirm', { method: 'POST', body: JSON.stringify({ email }) });
      renderConfirmEmail(email, t('checkSpam'));
    } catch (err) {
      renderConfirmEmail(email, err.message === 'email_send_failed' ? t('emailSendFailed') : err.message);
    }
  });
  document.querySelector('#backLoginBtn')?.addEventListener('click', () => {
    pendingConfirmEmail('');
    renderLogin();
  });
}

let panelLoginAttempt = null;
let panelAuthEpoch = 0;
function currentPanelLogin(attempt) {
  return panelLoginAttempt === attempt && attempt.token === state.token;
}
function paintPanelLogin(attempt, label) {
  attempt.overlay.innerHTML = `<div class="detail-action-card"><span class="spinner" aria-hidden="true"></span><h2>${esc(t(label))}</h2><p>${esc(t('detailWorkingHint'))}</p><div class="detail-action-progress" aria-hidden="true"><span></span></div></div>`;
}
function beginPanelLogin(form) {
  if (panelLoginAttempt || form !== document.querySelector('#loginForm')) return null;
  const attempt = { token: state.token, form, controller: new AbortController(), wasInert: Boolean(app.inert), previousFocus: document.activeElement };
  const overlay = document.createElement('div');
  overlay.id = 'panelLoginBusy';
  overlay.className = 'detail-action-busy';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'polite');
  overlay.setAttribute('tabindex', '-1');
  attempt.overlay = overlay;
  panelLoginAttempt = attempt;
  paintPanelLogin(attempt, 'panelEntering');
  form.querySelectorAll('button').forEach(button => { button.disabled = true; });
  form.setAttribute('aria-busy', 'true');
  app.inert = true;
  document.body.appendChild(overlay);
  overlay.focus();
  return attempt;
}
function finishPanelLogin(attempt) {
  if (panelLoginAttempt !== attempt) return;
  clearTimeout(attempt.timeout);
  attempt.overlay.remove();
  attempt.form.querySelectorAll('button').forEach(button => { button.disabled = false; });
  attempt.form.removeAttribute('aria-busy');
  app.inert = attempt.wasInert;
  if (attempt.previousFocus?.isConnected) attempt.previousFocus.focus();
  panelLoginAttempt = null;
}
function cancelPanelLogin() {
  const attempt = panelLoginAttempt;
  if (!attempt) return;
  invalidateAccountReads();
  finishPanelLogin(attempt);
  attempt.controller.abort();
}
async function submitPanelLogin(form, signup = false) {
  const fd = new FormData(form);
  const attempt = beginPanelLogin(form);
  if (!attempt) return;
  const email = String(fd.get('email') || '');
  attempt.timeout = setTimeout(() => {
    if (!currentPanelLogin(attempt)) return;
    cancelPanelLogin();
    if (state.token) showPanelReadError();
    else renderLogin(t('panelLoginFailed'), email);
  }, 30000);
  try {
    const data = await api(signup ? '/api/auth/signup' : '/api/auth/login', {
      method: 'POST', signal: attempt.controller.signal,
      body: JSON.stringify({ email, password: fd.get('password'), ...(signup ? { locale: currentLocale() } : {}) }),
    });
    if (!currentPanelLogin(attempt)) return;
    if (data.needs_confirm && signup) {
      pendingConfirmEmail(email);
      finishPanelLogin(attempt);
      renderConfirmEmail(email, t('checkSpam'));
      return;
    }
    if (!data.token) throw new Error('invalid_auth_response');
    panelAuthEpoch += 1;
    invalidateAccountReads();
    state.token = data.token;
    attempt.token = data.token;
    state.user = data.user || null;
    if (state.user?.locale) {
      state.locale = state.user.locale;
      localStorage.setItem('apply_locale', state.locale);
    }
    localStorage.setItem('apply_token', state.token);
    paintPanelLogin(attempt, 'panelLoading');
    await load(true, { signal: attempt.controller.signal });
  } catch (err) {
    if (!currentPanelLogin(attempt)) return;
    const map = { invalid_credentials: t('badCredentials'), invalid_signup: t('invalidSignup'), email_send_failed: t('emailSendFailed'), email_in_use: t('emailInUse'), invalid_code: t('invalidCode'), rate_limited: t('panelLoginLimited') };
    if (state.token) showPanelReadError();
    else renderLogin(map[err.message] || t('panelLoginFailed'), email);
  } finally {
    finishPanelLogin(attempt);
  }
}
function renderLogin(error = '', email = '') {
  cancelPanelLogin();
  document.querySelector('#panelReadError')?.remove();
  closeTopupModal();
  clearPosePreviews();
  app.innerHTML = `
    <section class="login-shell">
      <form class="login-card" id="loginForm">
        <div class="login-brand"><img src="/apex-logo-full.png" alt="Apex" /></div>
        <h1>Apex Apply</h1>
        <p class="sub">${t('sub')}</p>
        <label class="field">
          <span>${t('email')}</span>
          <input name="email" autocomplete="email" value="${esc(email)}" />
        </label>
        <label class="field">
          <span>${t('password')}</span>
          <input name="password" type="password" autocomplete="current-password" />
        </label>
        <div class="login-lang">${localePicker('authLocale')}</div>
        <button class="btn primary" style="width:100%;margin-top:8px">${t('enter')}</button>
        <button class="btn ghost" type="button" id="signupBtn" style="width:100%;margin-top:8px">${t('signup')}</button>
        <button class="btn ghost" type="button" id="forgotBtn" style="width:100%;margin-top:8px">${t('forgot')}</button>
        <div class="error" style="margin-top:10px">${esc(error)}</div>
      </form>
    </section>
  `;
  bindLocaleSwitch('authLocale');
  document.querySelector('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitPanelLogin(event.currentTarget);
  });
  document.querySelector('#signupBtn')?.addEventListener('click', async () => {
    await submitPanelLogin(document.querySelector('#loginForm'), true);
  });
  document.querySelector('#forgotBtn')?.addEventListener('click', async () => {
    if (panelLoginAttempt) return;
    const form = document.querySelector('#loginForm');
    const fd = new FormData(form);
    const email = String(fd.get('email') || '').trim();
    try {
      await api('/api/auth/forgot', { method: 'POST', body: JSON.stringify({ email }) });
      const code = await applyPrompt(t('sendCode'), '');
        if (code == null || !String(code).trim()) return;
      const password = await applyPrompt(t('newPassword'), '');
        if (password == null || !String(password).trim()) return;
      await api('/api/auth/reset', { method: 'POST', body: JSON.stringify({ email, code, password }) });
      renderLogin(t('resetOk'));
    } catch (err) {
      renderLogin(err.message);
    }
  });
}

/* ===================== Shell ===================== */
let opsUiPromise = null;
let opsDataRead = null;
function panelDataContext() {
  return JSON.stringify([panelAuthEpoch, state.token, state.user?.id, state.user?.role]);
}
function loadOpsInBackground() {
  if (state.user?.role !== 'admin') return;
  const context = panelDataContext();
  if (opsDataRead?.context === context) return opsDataRead.promise;
  const read = { context };
  const isCurrent = () => opsDataRead === read && context === panelDataContext();
  opsDataRead = read;
  state.opsLoading = true;
  state.opsError = false;
  read.promise = ensureOpsUi().then(async ops => {
    if (!isCurrent()) return;
    const { budgets, users } = await ops.loadOpsData();
    if (!isCurrent()) return;
    state.budgets = (budgets.items || state.budgets).filter(item => item.id !== 'sms' && item.label !== 'SMS');
    state.users = users.users || [];
    state.budgetsUpdatedAt = budgets.updatedAt || '';
  }).catch(() => { if (isCurrent()) state.opsError = true; }).finally(() => {
    if (!isCurrent()) return;
    state.opsLoading = false;
    opsDataRead = null;
    const budgets = document.querySelector('.budgets');
    if (budgets) budgets.innerHTML = state.budgets.map(item => window.__applyOps?.renderBudgetItem?.(item) || '').join('');
    const count = document.querySelector('[data-nav="users"] .count');
    if (count) count.textContent = state.users.length;
    // Do not repaint the hub or an administrative form already being edited.
    if (document.querySelector('[data-ops-pending]')) renderView();
  });
  return read.promise;
}
function ensureOpsUi() {
  if (state.user?.role !== 'admin') return Promise.resolve(null);
  window.__apply = {
    api,
    esc,
    adminContext: { I, accStatus, api, app, applyAlert, applyConfirm, applyPrompt, av, badge, closeTopupModal, copyTextWithFallback, esc, fmtDate, go, initials, load, mountTopupModal, normalizeStatus, openApplyModal, renderDetail, renderHub, selectedAccount, setCrumb, setOcrStatus, state, statusInfo, t },
    selectedId: () => state.selectedAccountId,
    reload: async () => { await load(false); renderDetail(); },
    cropSelfieFile: (file) => new Promise((resolve, reject) => {
      openIdMoldCropper(file, resolve, () => reject(new Error('cancel')), 'selfie');
    }),
  };
  if (window.__applyOps) return Promise.resolve(window.__applyOps);
  if (opsUiPromise) return opsUiPromise;
  const script = document.createElement('script');
  script.src = '/api/ops/ui.js?v=lookup-bal-20261008c';
  script.dataset.opsUi = '1';
  opsUiPromise = new Promise((resolve, reject) => {
    script.onload = () => { if (window.__applyOps) resolve(window.__applyOps); else { opsUiPromise = null; script.remove(); reject(new Error('Não deu para carregar esta tela.')); } };
    script.onerror = () => { opsUiPromise = null; script.remove(); reject(new Error('Não deu para carregar esta tela.')); };
  });
  document.head.appendChild(script);
  return opsUiPromise;
}

function renderApp() {
  captureApplicationDraft();
  clearDocumentPreviews();
  if (!state.token) { renderLogin(); return; }
  if (state.panelReadError && !state.accountsLoadedAt) { showPanelReadError(); return; }
  clearPosePreviews();
  const admin = state.user?.role === 'admin';
  const accountSearchPlaceholder = state.user?.account_owner_filter === true ? t('searchAccountsOwner') : t('searchAccounts');
  if (admin) ensureOpsUi().catch(() => {});
  const budgetsHtml = admin ? `
    <div class="budgets" title="Saldo das APIs">
      ${state.budgets.map((item) => window.__applyOps?.renderBudgetItem?.(item) || '').join('')}
    </div>` : `
    <div class="budgets" title="Créditos">
      <div class="budget"><b>${esc(String(state.user?.credits ?? 0))}</b><span>${t('credits')}</span></div>
    </div>
    <button class="btn primary sm" type="button" id="topupCredits" aria-label="${esc(t('topup'))}"><span>${t('topup')}</span></button>`;
  const adminNav = admin ? `
            <details class="global-admin">
              <summary aria-label="${esc(t('adminSection'))}"><span class="admin-label-full">${esc(t('adminSection'))}</span><span class="admin-label-short">${esc(t('adminMenuShort'))}</span></summary>
              <div class="global-popover">
                <button class="nav-item" type="button" data-nav="ssn">${I.search} SSN</button>
                <button class="nav-item" type="button" data-nav="users">${I.users} ${t('usersNav')} <span class="count">${state.users.length || 1}</span></button>
                <button class="nav-item" type="button" data-nav="audit">${I.clock} ${t('auditNav')}</button>
              </div>
            </details>` : '';
  app.innerHTML = `
    <div class="shell shell-top">
      <div class="main">
        <header class="topbar global-header">
          <div class="brand global-brand">
            <img class="mark" src="/apex-logo-icon.png" alt="Apex" />
            <div class="brand-copy">
              <div class="name">Apex Apply</div>
              <div class="sub">Amazon Flex</div>
            </div>
          </div>
          <nav class="global-nav" aria-label="${esc(t('opNav'))}">
            <button class="nav-item" type="button" data-nav="hub">${I.grid} ${t('apps')}</button>
            <button class="nav-item" type="button" data-nav="vacancies">${I.pin} ${t('vacancies')}</button>
            <button class="nav-item" type="button" data-nav="connect">${I.link} ${t('connectAccount')}</button>
            ${adminNav}
          </nav>
          <div class="global-actions">
            ${budgetsHtml}
            <details class="global-account">
              <summary aria-label="${esc(t('accountMenu'))}"><div class="av" style="width:34px;height:34px;border-radius:10px;font-size:11px;background:linear-gradient(135deg,#4aa8ff,#62b2ff)">${esc(initials(state.user?.name || state.user?.email || 'DG'))}</div></summary>
              <div class="global-popover">
                <div class="who"><b>${esc(state.user?.name || state.user?.email || '')}</b><span>${esc(admin ? t('adminRole') : t('accountRole'))}</span></div>
                ${localePicker('accountLocale')}
                <button class="quiet" type="button" id="logout">${I.logout} ${t('logout')}</button>
              </div>
            </details>
          </div>
          <div class="global-search-slot">
            <label class="search">${I.search}<input id="globalSearch" value="${esc(state.view === 'vacancies' ? state.vacancyQ : state.q)}" placeholder="${state.view === 'vacancies' ? t('searchVacancies') : accountSearchPlaceholder}" /></label>
          </div>
        </header>
        <div class="content" id="view"></div>
      </div>
    </div>
  `;
  document.querySelector('#logout')?.addEventListener('click', logout);
  bindLocaleSwitch('accountLocale', async (locale) => {
    try {
      const data = await api('/api/me/locale', { method: 'PATCH', body: JSON.stringify({ locale }) });
      if (data.user) {
        state.user = data.user;
        if (data.user.locale) state.locale = data.user.locale;
      }
    } catch (_err) { /* keep local choice */ }
    renderApp();
  });
  document.querySelector('#topupCredits')?.addEventListener('click', async () => {
    const raw = await applyPrompt(t('topupPrompt'), '1');
    if (raw == null) return;
    const n = Math.max(1, Math.floor(Number(raw) || 1));
    try {
      const data = await api('/api/credits/checkout', { method: 'POST', body: JSON.stringify({ credits: n }) });
      if (data.url) {
        const from = Number(state.user?.credits || 0);
        window.open(data.url, '_blank');
        watchCreditsAfterTopup(from);
      }
    } catch (err) {
      await applyAlert(err.message || t('topupFail'));
    }
  });

  document.querySelector('#globalSearch').addEventListener('input', (event) => {
    if (state.view === 'vacancies') {
      state.vacancyQ = event.target.value;
      renderVacancies();
      return;
    }
    state.q = event.target.value;
    if (state.view === 'hub') {
      scheduleOwnerEmailAccountFilter(state.q);
      renderHub();
    }
  });
  renderView();
}

function setCrumb(parts) {
  const node = document.querySelector('#crumb');
  if (!node) return;
  node.innerHTML = parts.map((p, i) => {
    const sep = i ? I.arrow : '';
    const last = i === parts.length - 1;
    const txt = last ? `<b>${esc(p[0])}</b>` : esc(p[0]);
    return sep + (p[1] ? `<a data-nav="${p[1]}">${txt}</a>` : txt);
  }).join('');
}

function renderView() {
  if (state.view !== 'hub' && state.hubPrepTimer) {
    clearTimeout(state.hubPrepTimer);
    state.hubPrepTimer = null;
  }
  if (['sms', 'emails'].includes(state.view)) state.view = 'hub';
  const navKey = state.view === 'detail' ? 'hub' : state.view;
  document.querySelectorAll('.nav-item').forEach((n) => n.classList.toggle('active', n.dataset.nav === navKey));
  document.querySelectorAll('.tab').forEach((n) => n.classList.toggle('active', n.dataset.nav === navKey));
  if (['users', 'ssn', 'audit'].includes(state.view) && (!window.__applyOps || (state.view === 'users' && state.opsLoading))) {
    const view = document.querySelector('#view');
    if (!view) return;
    view.innerHTML = state.opsError
      ? `<div data-ops-pending><p>${esc(t('panelReadFailed'))}</p><button type="button" class="btn secondary" data-retry-ops>${esc(t('panelTryAgain'))}</button></div>`
      : `<div data-ops-pending role="status"><span class="spinner" aria-hidden="true"></span> ${esc(t('panelLoading'))}</div>`;
    view.querySelector('[data-retry-ops]')?.addEventListener('click', () => { loadOpsInBackground(); renderView(); });
    return;
  }
  const shell = document.querySelector('.shell');
  if (shell) {
    shell.classList.toggle('view-hub', state.view === 'hub');
    shell.classList.toggle('view-detail', state.view === 'detail');
  }
  if (state.view === 'detail') renderDetail();
  else if (state.view === 'ssn') window.__applyOps?.renderSsn?.();
  else if (state.view === 'connect') renderConnect();
  else if (state.view === 'vacancies') renderVacancies();
  else if (state.view === 'users') window.__applyOps?.renderUsers?.();
  else if (state.view === 'audit') window.__applyOps?.renderAudit?.();
  else renderHub();
}

function renderSms() {
  state.view = 'hub';
  renderHub();
}

function renderEmailCreator() {
  state.view = 'hub';
  renderHub();
}





































/* ===================== Hub ===================== */
function renderHub() {
  captureApplicationDraft();
  setCrumb([[t('applications'), null]]);
  const view = document.querySelector('#view');
  const admin = state.user?.role === 'admin';
  if (!admin && state.filter === 'blocked') state.filter = 'all';
  const searchedAccounts = searchFilteredAccounts();
  const activeSearchedAccounts = searchedAccounts.filter((a) => accStatus(a) !== 'archived');
  let list = searchedAccounts.filter((a) => matchFilter(a, state.filter));
  list = sortedAccounts(list);
  const archivedView = state.filter === 'archived';
  const selectableIds = list
    .filter((a) => archivedView ? accStatus(a) === 'archived' : accStatus(a) !== 'archived')
    .map((a) => a.id);
  const selectedVisibleIds = selectableIds.filter((id) => state.archiveSelection.has(id));
  const allVisibleSelected = selectableIds.length > 0 && selectedVisibleIds.length === selectableIds.length;
  const selectedCount = state.archiveSelection.size;
  const ownerFilterChip = ownerAccountFilterActive()
    ? `<span class="chip active" data-owner-filter-active>${esc(tFill('ownerFilterActive', { email: state.ownerFilter.query }))}</span>`
    : '';
  const filterLabels = {
    all: t('all'), archived: t('archived'), review: t('hubReview'), idvok: t('hubIdvOk'),
    complete: t('hubComplete'), tax: t('hubTax'), identidade: t('hubIdentidade'),
    session: t('hubSession'), blocked: t('hubBlocked'),
  };
  const pad = (n) => (Number(n) < 100 ? String(n).padStart(2, '0') : String(n));
  const kpi = (k, ic, count, label, caption) => `<button type="button" class="kpi ${state.filter === k ? 'active' : ''}" data-filter="${k}" aria-pressed="${state.filter === k}" title="${esc(caption)}"><span class="kpi-label">${esc(label)}${ic}</span><strong class="num">${pad(count)}</strong><small>${esc(caption)}</small><span class="kpi-arrow">${I.arrow}</span></button>`;
  const attn = (k, count, label) => `<button type="button" class="attention-filter ${state.filter === k ? 'active' : ''}" data-filter="${k}" aria-pressed="${state.filter === k}"><strong class="num">${pad(count)}</strong><span>${esc(label)}${I.arrow}</span></button>`;
  const stats = `
    <section class="kpis" aria-label="${esc(t('applications'))}">
      ${kpi('all', I.users, activeSearchedAccounts.length, t('all'), t('hubKpiAll'))}
      ${kpi('review', I.clock, countPendingReview(activeSearchedAccounts), t('hubReview'), t('hubKpiReview'))}
      ${kpi('idvok', I.check, countIdvOk(searchedAccounts), t('hubIdvOk'), t('hubKpiIdvOk'))}
      ${kpi('complete', I.check, countComplete(searchedAccounts), t('hubComplete'), t('hubKpiComplete'))}
    </section>
    <section class="attention attn-n${admin ? 4 : 3}" aria-label="${esc(t('hubAttentionTitle'))}">
      <div class="attention-title">${I.alert}<div><b>${esc(t('hubAttentionTitle'))}</b><small>${esc(t('hubAttentionHint'))}</small></div></div>
      ${attn('tax', countTaxAttention(activeSearchedAccounts), t('hubTax'))}
      ${attn('identidade', countIdvAttention(activeSearchedAccounts), t('hubIdentidade'))}
      ${attn('session', countSessionAttention(activeSearchedAccounts), t('hubSession'))}
      ${admin ? attn('blocked', countOffboarded(searchedAccounts), t('hubBlocked')) : ''}
    </section>`;
  const chip = (k, l) => `<button type="button" class="${state.filter === k ? 'active' : ''}" data-filter="${k}">${l}</button>`;
  const bulkArchive = selectedCount === 0 ? '' : `
    <div class="bulk-archive-bar">
      <label class="bulk-select-all">
        <input type="checkbox" data-select-visible ${allVisibleSelected ? 'checked' : ''} ${selectableIds.length ? '' : 'disabled'}>
        <span>${t('selectVisible')}</span>
      </label>
      <span class="bulk-selected-count"><b>${selectedCount}</b> ${t('selectedCount')}</span>
      ${archivedView
        ? `<button class="btn primary sm" type="button" data-restore-selected ${selectedCount ? '' : 'disabled'}>${I.refresh} ${t('restoreSelected')}</button>`
        : `<button class="btn danger sm" type="button" data-archive-selected ${selectedCount ? '' : 'disabled'}>${I.trash} ${t('archiveSelected')}</button>`}
    </div>`;

  let body;
  if (!state.accounts.length) {
    body = emptyState(t('emptyTitle'), t('emptyBody'), 'connect', t('connectAccount'));
  } else if (!list.length) {
    body = emptyState(t('noneInFilter'), t('noneInFilterBody'));
  } else {
    const rows = list.map((a) => {
      const archived = accStatus(a) === 'archived';
      const idx = stageIdx(a);
      const pct = accountProgress(a);
      const region = a.last_known_status?.region;
      const blocked = prepBlocking(a);
      const prep = prepBadge(a);
      const issue = stepIssueSummary(a);
      const issueReview = issue && issue.includes(t('hsTaxWaiting'));
      const selected = state.archiveSelection.has(a.id);
      return `<tr class="${blocked && !archived ? 'prep-blocked' : ''} ${state.recentAccountId === a.id ? 'recent' : ''} ${selected ? 'bulk-selected' : ''}" ${!archived && blocked ? `data-prep-blocked="${a.id}"` : `data-open="${a.id}"`}>
        <td class="select-col">${archived === archivedView ? `<input class="row-select" type="checkbox" aria-label="${esc(accountPrimary(a))}" data-select-account="${a.id}" ${selected ? 'checked' : ''}>` : ''}</td>
        <td class="account-col"><div class="identity">${av(a)}<div><button class="account-name" type="button" data-open="${a.id}">${esc(accountPrimary(a))}</button><span class="account-email">${esc(accountSecondary(a))}</span>${prep}${sessionAttentionBadge(a)}${issue ? `<small class="row-note${issueReview ? ' review-text' : ''}">${esc(issue)}</small>` : ''}${!archived && accountNeedsReconnectAction(a) ? `<button class="row-reconnect" type="button" data-reconnect-account="${a.id}">${I.link} ${t(sessionUiStatus(a) === 'session_retry_pending' ? 'reconnectOptionalBtn' : 'reconnectBtn')}</button>` : ''}</div></div></td>
        <td class="region-col"><span class="region">${I.pin}${esc(region || t('awaiting'))}</span></td>
        <td class="stage-cell">
          <div class="stage-label"><b>${esc(onboardingStepsFor(a)[idx][1])}</b><span>${pct}%</span></div>
          ${segBar(a)}
        </td>
        <td>${statusBadgeFor(a)}${a.manual_status_override && !archived ? '<small class="manual-status-note">Ajuste manual</small>' : ''}${archived ? `<div class="archived-row-actions"><button class="btn ghost sm" type="button" data-restore-account="${a.id}">${t('restore')}</button>${admin ? `<button class="btn danger sm" type="button" data-delete-account-permanent="${a.id}">${I.trash} ${t('deleteForever')}</button>` : ''}</div>` : ''}</td>
        <td class="muted" style="font-size:13px">${amazonReadLabel(a)}</td>
        <td class="row-go">${I.arrow}</td>
      </tr>`;
    }).join('');
    body = `<div class="hub-list${state.amazonRefreshing && state.amazonRefreshScope === 'full' ? ' is-refreshing' : ''}">
      <table class="table">
        <colgroup>
          <col class="col-select" />
          <col class="col-account" />
          <col class="col-region" />
          <col class="col-stage" />
          <col class="col-status" />
          <col class="col-updated" />
          <col class="col-go" />
        </colgroup>
        <thead><tr>
          <th class="select-col"></th>
          <th>${sortHeader('account', t('colAccount'))}</th>
          <th>${sortHeader('region', t('colRegion'))}</th>
          <th>${sortHeader('stage', t('colStage'))}</th>
          <th>${sortHeader('status', t('colStatus'))}</th>
          <th>${sortHeader('updated', t('colUpdated'))}</th>
          <th></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }

  const refreshBanner = state.amazonRefreshing
    ? `<div class="hub-refresh-banner" role="status"><span class="spinner lg"></span><div><b>${state.amazonRefreshScope === 'analysis' && state.amazonRefreshJob
      ? tFill('checkingAnalysis', { done: state.amazonRefreshJob.done || 0, total: state.amazonRefreshJob.total || 0 })
      : t('refreshingAccounts')}</b><p>${t('refreshingHint')}</p></div></div>`
    : '';
  const filterBanner = !['all', 'archived'].includes(state.filter)
    ? `<div class="filter-active"><div><span>${esc(t('hubShowing'))}: <b>${esc(filterLabels[state.filter] || state.filter)}</b></span>${state.filter === 'review' ? `<small class="filter-context">${esc(t('hubReviewScope'))}</small>` : ''}</div><button type="button" data-filter="all">${esc(t('hubClearFilter'))}</button></div>`
    : '';

  if (state.accountsLoading && !state.accountsLoadedAt) {
    view.innerHTML = `
      <div class="hub-screen">
        <header class="page-title">
          <div>
            <span class="eyebrow">${esc(t('hubEyebrow'))}</span>
            <h1>${esc(t('applications'))}<span class="cyan">.</span></h1>
            <p>${esc(t('hubLead'))}</p>
          </div>
        </header>
        <section class="panel list-panel" role="status" aria-live="polite">
          <div class="empty">
            <span class="spinner lg" aria-hidden="true"></span>
            <h3>${esc(t('hubConsulting'))}</h3>
            <p>${esc(t('hubConsultingHint'))}</p>
          </div>
        </section>
      </div>`;
    return;
  }

  view.innerHTML = `
    <div class="hub-screen">
      <header class="page-title">
        <div>
          <span class="eyebrow">${esc(t('hubEyebrow'))}</span>
          <h1>${esc(t('applications'))}<span class="cyan">.</span></h1>
          <p>${esc(t('hubLead'))}</p>
        </div>
        <div class="page-actions">
          ${refreshToolbarButton()}
          <button class="btn primary" data-nav="connect">${I.plus} ${t('connectAccount')}</button>
        </div>
      </header>
      ${stats}
      <section class="panel list-panel">
        <div class="list-head">
          <div class="list-title"><h2>${esc(t('hubYourApps'))}</h2><span class="count-pill">${list.length}</span></div>
          <div class="list-tools">
          <label class="search-box">${I.search}<input id="hubSearch" type="search" aria-label="${esc(t('searchAccounts'))}" placeholder="${esc(t('searchAccounts'))}" value="${esc(state.q)}"></label>
          ${admin ? `<label class="mine"><input type="checkbox" data-mine-toggle ${state.mineOnly ? 'checked' : ''}>${esc(t('onlyMine'))}</label>` : ''}
          ${ownerFilterChip}
          </div>
          <div class="segments">${chip('all', t('all'))}${chip('archived', t('archived'))}</div>
        </div>
        ${filterBanner}${refreshBanner}${bulkArchive}${body}
      </section>
      ${vacancyDlModal()}
    </div>`;
  scheduleHubPrepRefresh();
  bindVacancyDlUi();
  if (state.vacancyNeedDl) loadAccountAccess(state.vacancyNeedDl);
  const hubSearch = document.querySelector('#hubSearch');
  hubSearch?.addEventListener('input', (event) => {
    const pos = event.target.selectionStart;
    state.q = event.target.value;
    scheduleOwnerEmailAccountFilter(state.q);
    renderHub();
    const el = document.querySelector('#hubSearch');
    if (el) {
      el.focus();
      try { el.setSelectionRange(pos, pos); } catch (_e) { /* ignore */ }
    }
  });
}

function scheduleHubPrepRefresh() {
  if (state.hubPrepTimer) {
    clearTimeout(state.hubPrepTimer);
    state.hubPrepTimer = null;
  }
  if (state.view !== 'hub' || state.amazonRefreshing) return;
  if (!state.accounts.some((account) => accStatus(account) !== 'archived' && prepBlocking(account))) return;
  state.hubPrepTimer = setTimeout(async () => {
    state.hubPrepTimer = null;
    if (state.view !== 'hub' || state.amazonRefreshing) return;
    await load(false);
    if (state.view === 'hub' && !state.amazonRefreshing) renderHub();
  }, 5000);
}

/* ===================== Detalhe ===================== */
let onboardingViewTimer = null;
function closeOnboardingView() {
  if (onboardingViewTimer) {
    clearInterval(onboardingViewTimer);
    onboardingViewTimer = null;
  }
  const id = state.selectedAccountId;
  document.querySelector('[data-onboarding-view-root]')?.remove();
  if (id) api(`/api/accounts/${id}/onboarding-view/close`, { method: 'POST', body: '{}' }).catch(() => {});
}
async function openOnboardingView() {
  const account = selectedAccount();
  if (!account || state.user?.role !== 'admin') return;
  closeOnboardingView();
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop';
  overlay.dataset.onboardingViewRoot = '1';
  overlay.innerHTML = `
    <div class="modal onboarding-view-modal">
      <div class="modal-h">
        <div><div class="eyebrow">${esc(t('viewOnboarding'))}</div><h3>${esc(t('viewOnboardingTitle'))}</h3></div>
        <button class="icon-btn" type="button" data-onboarding-close>×</button>
      </div>
      <p class="onboarding-view-meta" data-onboarding-meta>${esc(t('viewOnboardingWait'))}</p>
      <div class="onboarding-view-nav">
        <button class="btn ghost sm" type="button" data-onboarding-back>${esc(t('viewOnboardingBack'))}</button>
        <button class="btn secondary sm" type="button" data-onboarding-home>${esc(t('viewOnboardingHome'))}</button>
      </div>
      <div class="onboarding-view-input">
        <div class="onboarding-view-type-row">
          <input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-onboarding-text placeholder="${esc(t('viewOnboardingTypePlaceholder'))}" />
          <button class="btn primary sm" type="button" data-onboarding-send>${esc(t('viewOnboardingSend'))}</button>
        </div>
        <div class="onboarding-view-keys">
          <button class="btn ghost sm" type="button" data-onboarding-key="Backspace">${esc(t('viewOnboardingBackspace'))}</button>
          <button class="btn ghost sm" type="button" data-onboarding-key="Tab">Tab</button>
          <button class="btn ghost sm" type="button" data-onboarding-key="Enter">${esc(t('viewOnboardingEnter'))}</button>
        </div>
      </div>
      <div class="onboarding-view-stage is-wait" data-onboarding-stage tabindex="0">
        <img data-onboarding-frame alt="" draggable="false" />
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const img = overlay.querySelector('[data-onboarding-frame]');
  const meta = overlay.querySelector('[data-onboarding-meta]');
  const stage = overlay.querySelector('[data-onboarding-stage]');
  const textInput = overlay.querySelector('[data-onboarding-text]');
  let remoteWidth = 390;
  let remoteHeight = 844;
  let pointerGesture = null;
  let wheelTimer = null;
  let wheelPayload = null;
  let interactionQueue = Promise.resolve();
  const paint = (data) => {
    if (Number(data?.width) > 0) remoteWidth = Number(data.width);
    if (Number(data?.height) > 0) remoteHeight = Number(data.height);
    if (data?.image) {
      img.src = data.image;
      stage?.classList.remove('is-wait');
      if (meta) meta.textContent = data.pagePath || t('viewOnboardingHint');
    }
  };
  const framePoint = (event) => {
    const box = img.getBoundingClientRect();
    return {
      box,
      x: (event.clientX - box.left) / Math.max(1, box.width),
      y: (event.clientY - box.top) / Math.max(1, box.height),
    };
  };
  const sendInteraction = (payload) => {
    interactionQueue = interactionQueue
      .catch(() => null)
      .then(async () => {
        const data = await api(`/api/accounts/${account.id}/onboarding-view/click`, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        paint(data);
        return data;
      })
      .catch((err) => {
        if (meta) meta.textContent = err.message || t('viewOnboarding');
        return null;
      });
    return interactionQueue;
  };
  const sendText = () => {
    const text = String(textInput?.value || '');
    if (!text) return;
    textInput.value = '';
    sendInteraction({ action: 'type', text });
  };
  try {
    paint(await api(`/api/accounts/${account.id}/onboarding-view`, { method: 'POST', body: '{}' }));
    if (!img.getAttribute('src')) paint(await api(`/api/accounts/${account.id}/onboarding-view/frame`, { method: 'POST', body: '{}' }));
  } catch (err) {
    stage?.classList.remove('is-wait');
    if (meta) meta.textContent = err.message || t('viewOnboarding');
  }
  onboardingViewTimer = setInterval(async () => {
    if (!document.body.contains(overlay)) {
      closeOnboardingView();
      return;
    }
    try { paint(await api(`/api/accounts/${account.id}/onboarding-view/frame`, { method: 'POST', body: '{}' })); } catch { /* keep */ }
  }, 1200);
  img.addEventListener('dragstart', (event) => event.preventDefault());
  img.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    stage?.focus({ preventScroll: true });
    img.setPointerCapture?.(event.pointerId);
    pointerGesture = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
  });
  img.addEventListener('pointerup', (event) => {
    if (!pointerGesture || pointerGesture.pointerId !== event.pointerId) return;
    event.preventDefault();
    const point = framePoint(event);
    const dx = event.clientX - pointerGesture.startX;
    const dy = event.clientY - pointerGesture.startY;
    pointerGesture = null;
    if (Math.hypot(dx, dy) <= 8) {
      sendInteraction({ action: 'click', x: point.x, y: point.y });
      return;
    }
    sendInteraction({
      action: 'scroll',
      x: point.x,
      y: point.y,
      deltaX: -dx * remoteWidth / Math.max(1, point.box.width),
      deltaY: -dy * remoteHeight / Math.max(1, point.box.height),
    });
  });
  img.addEventListener('pointercancel', () => { pointerGesture = null; });
  img.addEventListener('wheel', (event) => {
    event.preventDefault();
    const point = framePoint(event);
    const next = wheelPayload || { action: 'scroll', x: point.x, y: point.y, deltaX: 0, deltaY: 0 };
    next.x = point.x;
    next.y = point.y;
    next.deltaX += event.deltaX * remoteWidth / Math.max(1, point.box.width);
    next.deltaY += event.deltaY * remoteHeight / Math.max(1, point.box.height);
    wheelPayload = next;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      if (!document.body.contains(overlay) || !wheelPayload) return;
      const payload = wheelPayload;
      wheelPayload = null;
      sendInteraction(payload);
    }, 70);
  }, { passive: false });
  stage?.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key.length === 1) {
      event.preventDefault();
      sendInteraction({ action: 'type', text: event.key });
      return;
    }
    if (['Enter', 'Backspace', 'Tab', 'Escape', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      sendInteraction({ action: 'key', key: event.key });
    }
  });
  textInput?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    sendText();
  });
  overlay.addEventListener('click', async (event) => {
    if (event.target.closest('[data-onboarding-close]') || event.target === overlay) {
      event.preventDefault();
      clearTimeout(wheelTimer);
      closeOnboardingView();
      return;
    }
    const nav = event.target.closest('[data-onboarding-back], [data-onboarding-home]');
    if (nav) {
      event.preventDefault();
      const action = nav.hasAttribute('data-onboarding-home') ? 'home' : 'back';
      try {
        paint(await api(`/api/accounts/${account.id}/onboarding-view/${action}`, { method: 'POST', body: '{}' }));
      } catch (err) {
        if (meta) meta.textContent = err.message || t('viewOnboarding');
      }
      return;
    }
    if (event.target.closest('[data-onboarding-send]')) {
      event.preventDefault();
      sendText();
      return;
    }
    const keyButton = event.target.closest('[data-onboarding-key]');
    if (keyButton) {
      event.preventDefault();
      sendInteraction({ action: 'key', key: keyButton.dataset.onboardingKey });
    }
  });
}

function renderDetail(opts = {}) {
  captureApplicationDraft();
  clearDocumentPreviews();
  clearPosePreviews();
  const poseGeneration = posePreviewGeneration;
  const view = document.querySelector('#view');
  const account = selectedAccount();
  if (!account) { view.innerHTML = emptyState('Selecione uma conta', 'Volte para Aplicações e escolha uma conta.', 'hub', 'Ver aplicações'); return; }
  if (state.detailLiveReadId === account.id && !account.last_known_status?.application_data) {
    view.innerHTML = `<button class="detail-back" type="button" data-nav="hub">${I.back}<span>${esc(t('backToApps'))}</span></button><section class="panel list-panel" role="status"><div class="empty"><span class="spinner lg" aria-hidden="true"></span><h3>${esc(t('hubConsulting'))}</h3><p>${esc(t('hubConsultingHint'))}</p></div></section>`;
    return;
  }

  setCrumb([['Aplicações', 'hub'], [account.amazon_label || accountTitle(account), null]]);
  const idx = stageIdx(account);
  const st = accStatus(account);
  const meta = account.last_known_status || {};
  const region = meta.region;
  const prep = meta.preparation || null;
  const appData = meta.application_data || {};
  const basic = appData.basic_info || {};
  const dlInfo = appData.driver_license || {};
  const paymentInfo = appData.payment_information || {};
  const unifiedIdentity = isUnifiedIdentityAccount(account);
  const presentation = detailPresentation(account);
  const { ready, applying, prepActive, actionSteps, waitingAmazon, waitOnly, startAttrs, startLabel, dlAction, irsSsnFix, isOffboarded, needsReconnect, taxWaiting } = presentation;
  const bypass = ssnBypass(account);
  const bypassActive = ssnBypassActive(account);
  const ssnNotFound = ssnNotFoundState(account);
  const runs = [...(account.apply_runs || [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const latest = runs[0] || null;
  const sessionStatus = sessionUiStatus(account);
  const displaySteps = onboardingStepsFor(account);
  const steps = accountStepStatuses(account);
  const trackerLog = latest
    ? '<div class="tlog-in" id="runProgress"></div>'
    : `<div class="tlog-in"><p class="muted" style="font-size:13px;margin:0">${t('noRunYet')}</p></div>`;

  const claimedVacancy = state.vacancyOrder?.status === 'claimed' && state.vacancyOrder.apply_account_id === account.id;
  const admin = state.user?.role === 'admin';
  const retryPending = sessionStatus === 'session_retry_pending';
  const noticeHtml = accountNoticesHtml(account);

  // anel de progresso circular (atualizado ao vivo por pollRun via #ringFg / #ringPct)
  const pct = detailProgressModel(account).percent;
  const RING_C = 326.726; // 2 * PI * 52
  const ringHtml = `
    <div class="ck-ring" role="progressbar" aria-label="${esc(t('applicationStatus'))}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">
      <svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="ckGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fb0ff"/><stop offset="1" stop-color="#2f6bff"/></linearGradient></defs>
        <circle class="tr" cx="60" cy="60" r="52"></circle>
        <circle class="fg" id="ringFg" cx="60" cy="60" r="52" stroke-dasharray="${RING_C.toFixed(1)}" stroke-dashoffset="${(RING_C * (1 - pct / 100)).toFixed(1)}"></circle>
      </svg>
      <div class="ck-ring-mid"><b id="ringPct">${pct}%</b><span>${esc(dpText('confirmed'))}</span></div>
    </div>`;

  const fileUrl = (kind, download) => `/api/accounts/${account.id}/file/${kind}${download ? '?download=1' : ''}`;
  const docTile = (name, path, label, options = {}) => {
    const generate = admin ? (window.__applyOps?.documentAction?.(name, account, unifiedIdentity) || '') : '';
    const isPhoto = name === 'profilePhoto';
    return `
    <div class="doc account-doc ${path ? 'ok' : ''}${isPhoto && path ? ' has-photo' : ''}">
      <div class="top"><b>${label}</b><span class="tag">${esc(t(path ? 'docSent' : 'docPending'))}</span></div>
      <div class="doc-preview-wrap${isPhoto && path ? ' has-photo' : ''}">
        ${documentSlotHtml(name, path ? fileUrl(name) : '', label, fileUrl(name, true))}
      </div>
      ${generate}
      <input id="account-doc-${name}" name="${name}" type="file" accept="image/*" data-doc-input="${name}"${isPhoto ? ' data-person-photo="1"' : ''} />
    </div>`;
  };
  // ===== Cockpit esquerdo: progresso + agora + ação + linha do tempo vertical + dados da conta =====
  const cockpitLeft = `
    <section class="card card-pad ck-left" id="tracker">
      <div class="ck-top">
        ${ringHtml}
        <div class="ck-now">
          <div class="eyebrow">${t('now')}</div>
          <div class="ck-step" id="trackerCurrent">${esc(displaySteps[idx][1])}</div>
          <div class="ck-status"><span id="trackerStatus">${badge(st)}</span>${account.manual_status_override ? '<span class="manual-status-note inline">Ajuste manual</span>' : ''}</div>
        </div>
      </div>
      <div class="ck-act">
        <button class="btn primary" type="button" data-start ${startAttrs}>${startLabel}</button>
        ${admin ? `<button class="btn secondary" type="button" data-open-onboarding-view>${t('viewOnboarding')}</button>` : ''}
        ${needsReconnect ? `<button class="btn secondary" type="button" data-reconnect-account>${t('reconnectBtn')}</button>` : ''}
      </div>
      ${isOffboarded ? `<div class="notice warn-note"><b>${esc(t('st_offboarded'))}</b></div>` : ''}
      <div id="reviewPreparationNotice"></div>
      <div class="ck-chips">
        <div class="ck-chip span2"><span class="k">${t('currentName')}</span><span class="v">${esc(meta.current_name || t('waitingRead'))}</span></div>
        <div class="ck-chip"><span class="k">${t('session')}</span><span class="v" data-session-status>${badge(sessionStatus)}</span></div>
        <div class="ck-chip"><span class="k">${t('region')}</span><span class="v ${region ? '' : 'warn'}"><span data-region-value>${esc(region || t('awaiting'))}</span><button type="button" class="region-refresh" data-region-refresh="${account.id}" title="Atualizar região">↻</button></span></div>
      </div>
      <div class="access-box" id="accountAccess" ${claimedVacancy ? '' : 'hidden'}>
        <div class="tl-title">${t('accessTitle')}</div>
        <div class="notice warn-note access-admin-warn" id="accountAccessMailWarn" hidden>${I.alert}<div><b>${t('accessMailMissingAdmin')}</b></div></div>
        <label class="field access-field"><span>${t('accessEmailPassword')}</span><div class="input-action"><input id="accountAccessEmailPassword" type="text" readonly autocomplete="off" data-1p-ignore data-lpignore="true" /><button class="btn ghost sm" type="button" data-access-copy="email">${t('accessCopy')}</button></div></label>
        <label class="field access-field"><span>${t('accessAccountPassword')}</span><div class="input-action"><input id="accountAccessAccountPassword" type="text" readonly autocomplete="off" data-1p-ignore data-lpignore="true" /><button class="btn ghost sm" type="button" data-access-copy="account">${t('accessCopy')}</button></div></label>
        <a class="btn secondary sm access-mail-link" id="accountAccessMailLink" hidden rel="noopener" target="_blank">${t('accessOpenEmail')}</a>
        <button class="btn secondary sm" type="button" data-access-copy-all>${t('accessCopyAll')}</button>
      </div>
      <div class="tl-title">${t('stepsTitle')}</div>
      <div class="stepper" id="trackerStepper">${renderStepperNodes(account)}</div><div class="detail-progress-summary" id="detailProgressSummary">${detailProgressSummaryHtml(account)}</div>
      <div class="ck-log">${trackerLog}</div>
      <div class="ck-foot"><span class="muted">${t('connectedAt')} ${fmtDate(account.created_at)}</span><button class="danger-link" type="button" data-delete-account="${account.id}">${I.trash} ${t('archiveAccount')}</button></div>
    </section>`;

  // ===== Cockpit direito: documentos + dados + pagamento (mesmo #applicationDataForm) =====
  const detailTab = state.detailTab || 'documents';
  const cockpitRight = `
    <form id="applicationDataForm" aria-describedby="applicationError">
      <div class="error" id="applicationError"></div>
      <section class="panel ficha-block" data-detail-panel="documents" ${detailTab === 'documents' || !detailTab ? '' : 'hidden'}>
        <div class="panel-top"><div><h2><span class="section-number">01</span>${esc(t('docsSection'))}</h2><p>${esc(t('docsHint'))}</p></div></div>
        <div class="docs">${docTile('dlFront', account.dl_front_path, t('dlFront'))}${docTile('dlBack', account.dl_back_path, t('dlBack'))}${docTile('profilePhoto', account.profile_photo_path, unifiedIdentity ? t('personPhoto') : t('profilePhoto'), { generatePoses: unifiedIdentity })}</div>
        ${account.dl_back_path ? `<div style="margin-top:10px;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button class="btn secondary sm" type="button" data-gen-barcode>${I.scan}<span>Gerar barcode</span></button><span class="hint" id="barcodeHint"></span></div>` : ''}
        <div class="ocr-status" id="ocrStatus" hidden><span></span></div>
      </section>
      <section class="panel ficha-block" data-detail-panel="documents" ${detailTab === 'documents' || !detailTab ? '' : 'hidden'}>
        <div class="panel-top"><div><h2><span class="section-number">02</span>${esc(t('personalData'))}</h2><p>${esc(t('personalHint'))}</p></div><span class="badge ${ready ? 'complete' : 'neutral'} small">${ready ? esc(t('filledOk')) : esc(t('pending'))}</span></div>
        <div class="basic-grid">
          <label class="field"><span>${esc(t('fieldFirstName'))}</span><input name="firstName" value="${esc(basic.firstName || '')}" placeholder="Nicolas" /></label>
          <label class="field"><span>${esc(t('fieldMiddleName'))}</span><input name="middleName" value="${esc(basic.middleName || '')}" placeholder="Cole" /></label>
          <label class="field"><span>${esc(t('fieldLastName'))}</span><input name="lastName" value="${esc(basic.lastName || '')}" placeholder="Elari" /></label>
          <label class="field"><span>${esc(t('fieldPhone'))}</span><div class="input-action"><input name="phoneNumber" value="${esc(basic.phoneNumber || '')}" placeholder="7205553816" /><button class="icon-btn" type="button" data-generate-phone aria-label="${esc(t('generatePhoneAria'))}">${esc(t('generatePhone'))}</button></div></label>
          <label class="field span-2"><span>${esc(t('fieldAddress'))}</span><input name="address" value="${esc(basic.address || '')}" placeholder="5835 Olive St" /></label>
          <label class="field"><span>${esc(t('fieldCity'))}</span><input name="city" value="${esc(basic.city || '')}" placeholder="Commerce City" /></label>
          <label class="field"><span>${esc(t('fieldState'))}</span><input name="state" value="${esc(basic.state || '')}" placeholder="Colorado" /></label>
          <label class="field"><span>${esc(t('fieldZip'))}</span><input name="postalCode" value="${esc(basic.postalCode || '')}" placeholder="80022" /></label>
          <label class="field"><span>${esc(t('fieldDlExpiration'))}</span><input name="driverLicenseExpirationDate" value="${esc(dlInfo.expirationDate || '')}" placeholder="MM/DD/YYYY" /></label>
          <label class="field"><span>${esc(t('fieldDlNumber'))}</span><input name="driversLicenseNumber" value="${esc(dlInfo.driversLicenseNumber || '')}" placeholder="12-345-6789" /></label>
          <label class="field"><span>${esc(t('fieldDob'))}</span><input name="dateOfBirth" value="${esc(dlInfo.dateOfBirth || '')}" placeholder="MM/DD/YYYY" /></label>
          <label class="field span-2"><span>${esc(t('fieldSsn'))}</span>${admin ? `<div class="input-action"><input name="ssn" value="${esc(account.ssn || '')}" placeholder="000000000" /><button class="icon-btn" type="button" data-lookup-ssn ${account.dl_front_path ? '' : 'disabled'} title="${account.dl_front_path ? 'Buscar SSN pela frente do Driver license' : 'Salve a frente do Driver license primeiro'}">${I.search}</button></div>` : `<input name="ssn" value="${esc(account.ssn || '')}" placeholder="000000000" />`}</label>
                </div>
        ${bypassActive ? `<div class="notice warn-note ssn-bypass-note">${I.alert}<div><b>${t('ssnNotFound')}</b><p>${t('ssnBypassP')}</p></div></div>` : ''}
        ${(!bypassActive && ssnNotFound) ? `<div class="notice warn-note ssn-bypass-note">${I.alert}<div><b>${t('ssnNotFound')}</b><p>${t('ssnBypassCanStart')}</p><div class="bypass-actions"><button class="btn secondary sm" type="button" data-enable-ssn-bypass>${I.play} ${t('startWithoutSsn')}</button></div></div></div>` : ''}
      </section>
      <section class="panel ficha-block" data-detail-panel="payment" ${detailTab === 'payment' ? '' : 'hidden'}>
        <div class="panel-top"><div><h2>${esc(t('tabPayment'))}</h2><p>${esc(taxWaiting ? t('taxWaitBank') : t('personalHint'))}</p></div></div>
        <div class="basic-grid">
          <label class="field span-2"><span>${esc(t('fieldBankType'))}</span><select name="bankAccountType"><option value="CHECKING" ${paymentInfo.bankAccountType !== 'SAVINGS' ? 'selected' : ''}>${esc(t('bankChecking'))}</option><option value="SAVINGS" ${paymentInfo.bankAccountType === 'SAVINGS' ? 'selected' : ''}>${esc(t('bankSavings'))}</option></select></label>
          <label class="field"><span>${esc(t('fieldBankRouting'))}</span><input name="bankRoutingNumber" value="${esc(paymentInfo.routingNumber || '')}" inputmode="numeric" placeholder="${t('autoGenerate')}" /></label>
          <label class="field"><span>${esc(t('fieldBankAccount'))}</span><input name="bankAccountNumber" value="${esc(paymentInfo.accountNumber || '')}" inputmode="numeric" placeholder="${t('autoGenerate')}" /></label>
                </div>
      </section>
      <footer class="form-footer">
        <span class="saved-state">${esc(t('reviewHint'))}</span>
        <button class="btn primary" type="submit">${t('saveData')}</button>
      </footer>
    </form>`;

  const heroActions = `${admin && account.has_amazon_password ? `<button class="btn ghost sm" type="button" data-view-amazon-password>${t('viewPass')}</button>` : ''}${admin ? `<button class="btn ghost sm" type="button" data-open-onboarding-view>${t('viewOnboarding')}</button><button class="btn ghost sm" type="button" data-change-account-status>${t('changeStatus')}</button><button class="btn ghost sm" type="button" data-refresh-account>${t('refresh')}</button>` : ''}`;

  const currentStage = currentStepPresentation(account);

  view.innerHTML = `
    <button class="detail-back" type="button" data-nav="hub">${I.back}<span>${esc(t('backToApps'))}</span></button>
    <header class="page-title detail-heading">
      <div class="identity-large">${av(account, 'lg')}<div><h1>${esc(accountPrimary(account) || prettyPersonName(account.amazon_label) || account.amazon_label || accountTitle(account))}</h1><p>${esc(account.email || '')}</p></div></div>
      <div class="page-actions">${heroActions}</div>
    </header>
    <div class="detail-grid">
      <aside class="detail-right" aria-label="${esc(t('contextFollow'))}">
    <section class="panel detail-summary ${taxWaiting ? 'tax-wait-summary' : ''} ${waitOnly ? 'is-wait' : ''}" id="tracker">
      <div class="summary-overview">
        <div class="progress-overview">
          ${ringHtml}
          <div class="progress-copy application-status">
            <div class="eyebrow">${esc(t('applicationStatus'))}</div>
            <div id="trackerStatus">${detailProgressBadge(account)}${account.manual_status_override ? '<span class="manual-status-note inline">Ajuste manual</span>' : ''}</div>
          </div>
        </div>
        <div class="current-stage">
          <span class="current-stage-label">${esc(t('currentStage'))}</span>
          <div class="current-stage-values"><strong id="trackerCurrent">${esc(currentStage.label)}</strong><span id="trackerStepStatus" class="current-step-state ${currentStage.mode}">${esc(currentStage.text)}</span></div>
        </div>
      </div>
      <div id="detailNotices">${noticeHtml}</div>
      <div class="next-action${waitOnly ? ' is-wait' : ''}">
        ${detailNextActionHtml(account, presentation)}
      </div>
      <div class="error" id="detailErrorFeedback" role="alert" hidden></div>
      <div id="reviewPreparationNotice"></div>
    </section>
        <details class="context-disclosure">
          <summary>${esc(t('contextFollow'))}</summary>
          <div class="context-body">
        <section class="panel steps-card">
          <div class="steps-head"><h2>${esc(t('stepsTitle'))}</h2></div>
          <div class="stepper" id="trackerStepper">${renderStepperNodes(account)}</div><div class="detail-progress-summary" id="detailProgressSummary">${detailProgressSummaryHtml(account)}</div>
        </section>
        <section class="panel connection-card">
          <h2>${esc(t('amazonConnection'))}</h2>
          <div class="ck-chips">
            <div class="ck-chip span2"><span class="k">${t('currentName')}</span><span class="v">${esc(meta.current_name || t('waitingRead'))}</span></div>
            <div class="ck-chip"><span class="k">${t('session')}</span><span class="v" data-session-status>${badge(sessionStatus)}</span></div>
            <div class="ck-chip"><span class="k">${t('region')}</span><span class="v ${region ? '' : 'warn'}"><span data-region-value>${esc(region || t('awaiting'))}</span><button type="button" class="region-refresh" data-region-refresh="${account.id}" title="Atualizar região">↻</button></span></div>
            <div class="ck-chip span2"><span class="k">${t('lastAmazonRead')}</span><span class="v">${esc(amazonReadLabel(account))}</span></div>
          </div>
          <div data-connection-action>${detailConnectionActionHtml(account, presentation)}</div>
          <div class="access-box" id="accountAccess" ${claimedVacancy ? '' : 'hidden'}>
            <div class="tl-title">${t('accessTitle')}</div>
            <div class="notice warn-note access-admin-warn" id="accountAccessMailWarn" hidden>${I.alert}<div><b>${t('accessMailMissingAdmin')}</b></div></div>
            <label class="field access-field"><span>${t('accessEmailPassword')}</span><div class="input-action"><input id="accountAccessEmailPassword" type="text" readonly autocomplete="off" data-1p-ignore data-lpignore="true" /><button class="btn ghost sm" type="button" data-access-copy="email">${t('accessCopy')}</button></div></label>
            <label class="field access-field"><span>${t('accessAccountPassword')}</span><div class="input-action"><input id="accountAccessAccountPassword" type="text" readonly autocomplete="off" data-1p-ignore data-lpignore="true" /><button class="btn ghost sm" type="button" data-access-copy="account">${t('accessCopy')}</button></div></label>
            <a class="btn secondary sm access-mail-link" id="accountAccessMailLink" hidden rel="noopener" target="_blank">${t('accessOpenEmail')}</a>
        <button class="btn secondary sm" type="button" data-access-copy-all>${t('accessCopyAll')}</button>
          </div>
          <div class="ck-foot"><span class="muted">${t('connectedAt')} ${fmtDate(account.created_at)}</span><button class="danger-link" type="button" data-delete-account="${account.id}">${I.trash} ${t('archiveAccount')}</button></div>
        </section>
          </div>
        </details>
      </aside>
      <div class="detail-main">
        <div class="ficha-tabs" role="tablist">
          <button type="button" role="tab" data-detail-tab="documents" aria-selected="${detailTab === 'documents' || !detailTab}">${esc(t('docsAndData'))}</button>
          <button type="button" role="tab" data-detail-tab="payment" aria-selected="${detailTab === 'payment'}">${esc(t('tabPayment'))}</button>
          <button type="button" role="tab" data-detail-tab="history" aria-selected="${detailTab === 'history'}">${esc(t('tabHistory'))}</button>
        </div>
        ${cockpitRight}
        <div data-detail-panel="history" ${detailTab === 'history' ? '' : 'hidden'}>
          <section class="panel" style="padding:18px">
            <div class="ck-log">${trackerLog}</div>
          </section>
        </div>
      </div>
    </div>
    ${vacancyDlModal()}${taxSsnModalHtml(account)}`;


  if (admin) {
    ensureOpsUi().then(() => {
      document.dispatchEvent(new CustomEvent('apply-detail-ready', { detail: { id: account.id } }));
    }).catch(() => {});
  }

  document.querySelector('#applicationDataForm')?.addEventListener('submit', saveApplicationData);
  const barcodeButton = document.querySelector('[data-gen-barcode]');
  if (barcodeButton) {
    barcodeButton.addEventListener('click', () => generateBarcode(account, barcodeButton, document.querySelector('#barcodeHint')));
  }
  restoreApplicationDraft(account.id);
  bindApplicationFeedback();
  document.querySelector('[data-view-amazon-password]')?.addEventListener('click', async () => {
    try {
      const result = await api(`/api/accounts/${account.id}/amazon-password`);
      if (!result.password) throw new Error('Senha Amazon não disponível.');
      await applyPrompt('Senha Amazon Flex (copie e feche):', result.password);
    } catch (error) { applyAlert(error.message); }
  });
  setupApplicationTools();
  if (admin) setTimeout(() => setupApplicationTools(), 0);
  bindVacancyDlUi();
  if (latest) {
    const follow = opts.autoFollow !== false && latestRunShouldFollow(account, latest);
    showRun(latest.id, { follow });
  }
  loadAccountAccess(account.id);
  syncReviewPreparation(account);
  applyDetailTab(detailTab);
  bindContextDisclosure();
}
function bindApplicationFeedback() {
  const source = document.querySelector('#applicationError');
  const feedback = document.querySelector('#detailErrorFeedback');
  if (!source || !feedback) return;
  const sync = () => {
    const message = source.textContent.trim();
    feedback.textContent = source.textContent;
    feedback.hidden = !message;
    // A pending read is not a reconnect requirement. Offer recovery only for
    // the explicit session rejection returned by the start endpoint.
    if (message === 'Sessão Amazon inválida. Reconecte a conta antes de iniciar a aplicação.') {
      const account = selectedAccount();
      if (account && amazonAccountClass(account) !== 'offboarded' && !account.archived_at) {
        const action = document.createElement('div');
        action.className = 'next-action-btns';
        action.innerHTML = `<button class="btn secondary" type="button" data-reconnect-account="${esc(account.id)}">${esc(t('reconnectBtn'))}</button>`;
        feedback.append(action);
      }
    }
  };
  const observer = new MutationObserver(sync);
  observer.observe(source, { childList: true, characterData: true, subtree: true });
  const nextAction = document.querySelector('.next-action');
  if (nextAction) observer.observe(nextAction, { childList: true, subtree: true });
  sync();
}
function bindContextDisclosure() {
  const node = document.querySelector('.context-disclosure');
  if (!node) return;
  if (!window.__applyContextMq) {
    window.__applyContextMq = window.matchMedia('(min-width:1001px)');
    window.__applyContextMq.addEventListener('change', (event) => {
      const current = document.querySelector('.context-disclosure');
      if (current && event.matches) current.open = true;
    });
  }
  if (window.__applyContextMq.matches) node.open = true;
}

async function generateBarcode(account, button, hint) {
  if (!account?.id || button?.disabled) return;
  const setHint = (text) => { if (hint) { hint.textContent = text || ''; } };
  if (button) button.disabled = true;
  setHint('Gerando barcode…');
  try {
    const response = await fetchAccountRequest(`/api/accounts/${account.id}/file/barcode`, {
      headers: state.token ? { Authorization: `Bearer ${state.token}` } : {},
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Não deu para gerar o barcode.');
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `barcode-${account.id}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    if ((response.headers.get('X-Barcode-Source') || '') === 'reconstructed') {
      setHint('⚠️ Gerado reconstruído (verso ilegível) — confira antes de usar.');
    } else {
      setHint('Barcode gerado e baixado. ✅');
    }
  } catch (error) {
    setHint(error?.message || 'Não deu para gerar o barcode.');
  } finally {
    if (button) button.disabled = false;
  }
}

async function loadAccountAccess(accountId, attempt = 0) {
  if (!accountId || !state.token) return;
  try {
    const data = await api(`/api/accounts/${accountId}/access`);
    const onFicha = state.view === 'detail';
    const onWelcome = state.view === 'hub' && state.vacancyNeedDl === accountId;
    if (accountId !== state.selectedAccountId || (!onFicha && !onWelcome)) return;
    if (!document.querySelector('#accountAccess') && !document.querySelector('#vacancyAccess')) return;
    paintAccountAccess(data);
  } catch (err) {
    if (err.code === 'STALE_READ' && attempt < 1 && accountId === state.selectedAccountId && (state.view === 'detail' || state.view === 'hub')) {
      return loadAccountAccess(accountId, attempt + 1);
    }
  }
}


function accessEmailForBox(box) {
  const id = box?.id === 'vacancyAccess' ? state.vacancyNeedDl : state.selectedAccountId;
  const account = state.accounts.find((item) => item.id === id) || selectedAccount();
  return String(account?.email || '').trim();
}

function accessRegionForBox(box) {
  const id = box?.id === 'vacancyAccess' ? state.vacancyNeedDl : state.selectedAccountId;
  const account = state.accounts.find((item) => item.id === id) || selectedAccount();
  return String(account?.last_known_status?.region || '').trim();
}

function paintAccountAccess(data = {}) {
  const emailPassword = String(data.email_password || '');
  const accountPassword = String(data.account_password || '');
  const mailUrl = String(data.mail_login_url || '');
  const showAdminWarn = state.user?.role === 'admin' && data.mail_login_missing;
  const fill = (box, ids) => {
    if (!box) return;
    const emailInput = box.querySelector(ids.email);
    const accountInput = box.querySelector(ids.account);
    if (emailInput) emailInput.value = emailPassword;
    if (accountInput) accountInput.value = accountPassword;
    const link = box.querySelector(ids.link);
    if (link) {
      if (mailUrl) {
        link.href = mailUrl;
        link.hidden = false;
      } else {
        link.hidden = true;
        link.removeAttribute('href');
      }
    }
    const warn = box.querySelector(ids.warn);
    if (warn) warn.hidden = !showAdminWarn;
    box.hidden = false;
    box.querySelectorAll('[data-access-copy]').forEach((button) => {
      button.onclick = () => {
        const which = button.getAttribute('data-access-copy');
        const input = box.querySelector(which === 'email' ? ids.email : ids.account);
        copyInlineText(input?.value || '', button);
      };
    });

    box.querySelectorAll('[data-access-copy-all]').forEach((button) => {
      button.onclick = () => {
        const link = box.querySelector(ids.link);
        const mailUrl = link && !link.hidden ? String(link.getAttribute('href') || '').trim() : '';
        const lines = [
          [t('region'), accessRegionForBox(box)],
          [t('accessEmail'), accessEmailForBox(box)],
          [t('accessAccountPassword'), box.querySelector(ids.account)?.value || ''],
          [t('accessEmailPassword'), box.querySelector(ids.email)?.value || ''],
          [t('accessMailLine'), mailUrl],
        ].map(([label, value]) => [label, String(value || '').trim()]).filter(([, value]) => value);
        copyInlineText(lines.map(([label, value]) => label + ': ' + value).join('\n'), button);
      };
    });
  };
  fill(document.querySelector('#accountAccess'), {
    email: '#accountAccessEmailPassword',
    account: '#accountAccessAccountPassword',
    link: '#accountAccessMailLink',
    warn: '#accountAccessMailWarn',
  });
  fill(document.querySelector('#vacancyAccess'), {
    email: '#vacancyAccessEmailPassword',
    account: '#vacancyAccessAccountPassword',
    link: '#vacancyAccessMailLink',
    warn: '#vacancyAccessMailWarn',
  });
}

/* ===================== Crop ao anexar (recorte no navegador) ===================== */
const stagedInputFiles = new WeakMap();
const photoKindByInput = new WeakMap();

function setPhotoKind(input, kind) {
  if (!input || !kind) return;
  photoKindByInput.set(input, kind);
  input.dataset.photoKind = kind;
  const form = input.form || input.closest('form');
  if (!form) return;
  let hidden = form.querySelector('input[name="photoKind"]');
  if (!hidden) {
    hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.name = 'photoKind';
    form.appendChild(hidden);
  }
  hidden.value = kind;
}

function cropKindForInput(input) {
  const name = String(input?.name || input?.getAttribute?.('data-doc-input') || '');
  return (name === 'dlFront' || name === 'dlBack') ? 'id' : 'photo';
}

const DL_ASPECT = 85.6 / 53.98;

function idMoldHole(w, h) {
  let hw = w * 0.90;
  let hh = hw / DL_ASPECT;
  if (hh > h * 0.70) {
    hh = h * 0.70;
    hw = hh * DL_ASPECT;
  }
  return { x: (w - hw) / 2, y: (h - hh) / 2, w: hw, h: hh };
}

function selfieMoldHole(w, h) {
  const side = Math.min(w, h) * 0.78;
  return { x: (w - side) / 2, y: (h - side) / 2, w: side, h: side, oval: true };
}

function drawMoldOverlay(canvas, stage, hole) {
  const w = stage.clientWidth;
  const h = stage.clientHeight;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const r = 10;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(5,8,15,.68)';
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  if (hole.oval) ctx.ellipse(hole.x + hole.w / 2, hole.y + hole.h / 2, hole.w / 2, hole.h / 2, 0, 0, Math.PI * 2);
  else if (ctx.roundRect) ctx.roundRect(hole.x, hole.y, hole.w, hole.h, r);
  else ctx.rect(hole.x, hole.y, hole.w, hole.h);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (hole.oval) ctx.ellipse(hole.x + hole.w / 2, hole.y + hole.h / 2, hole.w / 2, hole.h / 2, 0, 0, Math.PI * 2);
  else if (ctx.roundRect) ctx.roundRect(hole.x, hole.y, hole.w, hole.h, r);
  else ctx.rect(hole.x, hole.y, hole.w, hole.h);
  ctx.stroke();
  return hole;
}

function drawIdMold(canvas, stage) {
  return drawMoldOverlay(canvas, stage, idMoldHole(stage.clientWidth, stage.clientHeight));
}

function openCropper(file, onConfirm, onCancel, kind = 'photo') {
  if (kind === 'id') {
    openIdMoldCropper(file, onConfirm, onCancel, 'id');
    return;
  }
  if (kind === 'selfie') {
    openIdMoldCropper(file, onConfirm, onCancel, 'selfie');
    return;
  }
  const ov = document.createElement('div');
  ov.className = 'modal-backdrop';
  ov.innerHTML = `
    <div class="modal">
      <div class="modal-h"><div><div class="eyebrow">${t('cropAttach')}</div><h3>${t('cropTitlePhoto')}</h3></div><button class="icon-btn mini" type="button" data-x>✕</button></div>
      <div class="crop-stage"><img class="crop-img" alt="" /><div class="crop-box" hidden><i class="hd" data-h="nw"></i><i class="hd" data-h="ne"></i><i class="hd" data-h="sw"></i><i class="hd" data-h="se"></i></div></div>
      <p class="hint" style="margin-top:10px">${t('cropHintPhoto')}</p>
      <div class="crop-actions"><button class="btn ghost" type="button" data-x>${t('cancel')}</button><button class="btn secondary" type="button" data-rotate>${t('cropRotate')}</button><button class="btn primary" type="button" data-ok style="margin-left:auto">${t('cropUse')}</button></div>
    </div>`;
  document.body.appendChild(ov);
  const img = ov.querySelector('.crop-img');
  const box = ov.querySelector('.crop-box');
  let url = URL.createObjectURL(file);
  let d = { w: 0, h: 0, l: 0, t: 0 };
  let c = { x: 0, y: 0, w: 0, h: 0 };
  let drag = null;
  const pt = (e) => { const touch = e.touches ? e.touches[0] : e; return { x: touch.clientX, y: touch.clientY }; };
  const geom = () => { d = { w: img.clientWidth, h: img.clientHeight, l: img.offsetLeft, t: img.offsetTop }; };
  const clamp = () => { c.w = Math.max(40, Math.min(c.w, d.w)); c.h = Math.max(40, Math.min(c.h, d.h)); c.x = Math.max(0, Math.min(c.x, d.w - c.w)); c.y = Math.max(0, Math.min(c.y, d.h - c.h)); };
  const place = () => { box.style.left = (d.l + c.x) + 'px'; box.style.top = (d.t + c.y) + 'px'; box.style.width = c.w + 'px'; box.style.height = c.h + 'px'; };
  img.onload = () => { geom(); c = { x: d.w * 0.08, y: d.h * 0.08, w: d.w * 0.84, h: d.h * 0.84 }; clamp(); box.hidden = false; place(); };
  img.src = url;
  const down = (e, mode) => { e.preventDefault(); e.stopPropagation(); const p = pt(e); drag = { mode, sx: p.x, sy: p.y, o: { ...c } }; };
  const moveH = (e) => {
    if (!drag) return;
    const p = pt(e); const dx = p.x - drag.sx; const dy = p.y - drag.sy; const o = drag.o;
    if (drag.mode === 'move') { c.x = o.x + dx; c.y = o.y + dy; } else {
      if (drag.mode.includes('e')) c.w = o.w + dx;
      if (drag.mode.includes('s')) c.h = o.h + dy;
      if (drag.mode.includes('w')) { c.w = o.w - dx; c.x = o.x + dx; }
      if (drag.mode.includes('n')) { c.h = o.h - dy; c.y = o.y + dy; }
    }
    clamp(); place();
  };
  const up = () => { drag = null; };
  box.addEventListener('pointerdown', (e) => { if (!e.target.classList.contains('hd')) down(e, 'move'); });
  box.querySelectorAll('.hd').forEach((h) => h.addEventListener('pointerdown', (e) => down(e, h.dataset.h)));
  document.addEventListener('pointermove', moveH);
  document.addEventListener('pointerup', up);
  const close = () => { document.removeEventListener('pointermove', moveH); document.removeEventListener('pointerup', up); URL.revokeObjectURL(url); ov.remove(); };
  ov.querySelectorAll('[data-x]').forEach((b) => b.addEventListener('click', () => { close(); if (onCancel) onCancel(); }));
  ov.querySelector('[data-rotate]').addEventListener('click', () => {
    const cv = document.createElement('canvas');
    cv.width = img.naturalHeight || 1;
    cv.height = img.naturalWidth || 1;
    const ctx = cv.getContext('2d');
    ctx.translate(cv.width / 2, cv.height / 2);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    cv.toBlob((blob) => {
      if (!blob) return;
      URL.revokeObjectURL(url);
      url = URL.createObjectURL(blob);
      box.hidden = true;
      img.src = url;
    }, 'image/jpeg', 0.92);
  });
  ov.querySelector('[data-ok]').addEventListener('click', () => {
    if (!d.w || !d.h) { close(); if (onCancel) onCancel(); return; }
    const sx = img.naturalWidth / d.w;
    const sy = img.naturalHeight / d.h;
    const cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(c.w * sx));
    cv.height = Math.max(1, Math.round(c.h * sy));
    cv.getContext('2d').drawImage(img, c.x * sx, c.y * sy, c.w * sx, c.h * sy, 0, 0, cv.width, cv.height);
    cv.toBlob((blob) => {
      if (!blob) { close(); if (onCancel) onCancel(); return; }
      const name = (file.name || 'corte').replace(/\.[^.]+$/, '') + '.jpg';
      onConfirm(new File([blob], name, { type: 'image/jpeg' }));
      close();
    }, 'image/jpeg', 0.92);
  });
}

function openIdMoldCropper(file, onConfirm, onCancel, moldKind = 'id') {
  const selfie = moldKind === 'selfie';
  const ov = document.createElement('div');
  ov.className = 'modal-backdrop';
  ov.innerHTML = `
    <div class="modal crop-modal">
      <div class="modal-h"><div><div class="eyebrow">${t('cropAttach')}</div><h3>${t(selfie ? 'cropTitleSelfie' : 'cropTitleId')}</h3></div><button class="icon-btn mini" type="button" data-x>✕</button></div>
      <p class="hint" style="margin:0 0 10px">${t(selfie ? 'cropHintSelfie' : 'cropHintId')}</p>
      <div class="crop-stage crop-mold"><img class="crop-img" alt="" /><canvas class="crop-mold-canvas"></canvas></div>
      <div class="crop-actions">
        <button class="icon-btn" type="button" data-minus title="${t('cropMinus')}">−</button>
        <button class="btn ghost" type="button" data-fit>${t('cropFit')}</button>
        <button class="icon-btn" type="button" data-plus title="${t('cropPlus')}">+</button>
        <button class="btn secondary" type="button" data-rotate>${t('cropRotate')}</button>
        <button class="btn ghost" type="button" data-x>${t('cancel')}</button>
        <button class="btn primary" type="button" data-ok style="margin-left:auto">${t('cropUse')}</button>
      </div>
    </div>`;
  document.body.appendChild(ov);
  const img = ov.querySelector('.crop-img');
  const stage = ov.querySelector('.crop-stage');
  const canvas = ov.querySelector('.crop-mold-canvas');
  let url = URL.createObjectURL(file);
  let tx = 0;
  let ty = 0;
  let scale = 1;
  let minS = 1;
  let maxS = 4;
  let nw = 0;
  let nh = 0;
  let dragging = false;
  let lx = 0;
  let ly = 0;
  let pinch = 0;
  const pointers = new Map();
  const holeNow = () => drawMoldOverlay(
    canvas,
    stage,
    selfie ? selfieMoldHole(stage.clientWidth, stage.clientHeight) : idMoldHole(stage.clientWidth, stage.clientHeight),
  );
  const apply = () => { img.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`; };
  const clampPan = () => {
    const hole = holeNow();
    const iw = nw * scale;
    const ih = nh * scale;
    if (iw <= hole.w) tx = hole.x + hole.w / 2 - iw / 2;
    else {
      tx = Math.min(tx, hole.x);
      tx = Math.max(tx, hole.x + hole.w - iw);
    }
    if (ih <= hole.h) ty = hole.y + hole.h / 2 - ih / 2;
    else {
      ty = Math.min(ty, hole.y);
      ty = Math.max(ty, hole.y + hole.h - ih);
    }
  };
  const setScale = (ns, cx, cy) => {
    ns = Math.min(maxS, Math.max(minS, ns));
    if (scale > 0) {
      tx = cx - (cx - tx) * (ns / scale);
      ty = cy - (cy - ty) * (ns / scale);
    }
    scale = ns;
    clampPan();
    apply();
  };
  const fit = () => {
    const hole = holeNow();
    nw = img.naturalWidth;
    nh = img.naturalHeight;
    if (!nw || hole.w < 8) {
      requestAnimationFrame(fit);
      return;
    }
    minS = Math.max(hole.w / nw, hole.h / nh);
    maxS = minS * 4;
    scale = minS;
    tx = hole.x + hole.w / 2 - nw * scale / 2;
    ty = hole.y + hole.h / 2 - nh * scale / 2;
    apply();
  };
  const bump = (factor) => {
    const hole = holeNow();
    setScale(scale * factor, hole.x + hole.w / 2, hole.y + hole.h / 2);
  };
  const close = () => {
    stage.onpointerdown = stage.onpointermove = stage.onpointerup = stage.onpointercancel = stage.onwheel = null;
    URL.revokeObjectURL(url);
    ov.remove();
  };
  img.onload = () => requestAnimationFrame(fit);
  img.src = url;
  stage.onpointerdown = (e) => {
    stage.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
    }
  };
  stage.onpointermove = (e) => {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const pts = [...pointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (pinch) {
        const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
        const r = stage.getBoundingClientRect();
        setScale(scale * (dist / pinch), mid.x - r.left, mid.y - r.top);
      }
      pinch = dist;
      return;
    }
    if (!dragging) return;
    tx += e.clientX - lx;
    ty += e.clientY - ly;
    lx = e.clientX;
    ly = e.clientY;
    clampPan();
    apply();
  };
  stage.onpointerup = stage.onpointercancel = (e) => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = 0;
    if (!pointers.size) dragging = false;
  };
  stage.onwheel = (e) => {
    e.preventDefault();
    const r = stage.getBoundingClientRect();
    const factor = Math.exp(-e.deltaY * 0.0012);
    setScale(scale * factor, e.clientX - r.left, e.clientY - r.top);
  };
  ov.querySelector('[data-minus]').onclick = () => bump(1 / 1.12);
  ov.querySelector('[data-plus]').onclick = () => bump(1.12);
  ov.querySelector('[data-fit]').onclick = () => fit();
  ov.querySelectorAll('[data-x]').forEach((b) => b.addEventListener('click', () => { close(); if (onCancel) onCancel(); }));
  ov.querySelector('[data-rotate]').onclick = () => {
    const cv = document.createElement('canvas');
    cv.width = img.naturalHeight || 1;
    cv.height = img.naturalWidth || 1;
    const ctx = cv.getContext('2d');
    ctx.translate(cv.width / 2, cv.height / 2);
    ctx.rotate(Math.PI / 2);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    cv.toBlob((blob) => {
      if (!blob) return;
      URL.revokeObjectURL(url);
      url = URL.createObjectURL(blob);
      img.onload = () => requestAnimationFrame(fit);
      img.src = url;
    }, 'image/jpeg', 0.92);
  };
  ov.querySelector('[data-ok]').onclick = () => {
    const hole = holeNow();
    if (!nw || hole.w < 8) { close(); if (onCancel) onCancel(); return; }
    const outW = selfie ? 1024 : 1600;
    const outH = selfie ? 1024 : Math.round(1600 * 53.98 / 85.6);
    const cv = document.createElement('canvas');
    cv.width = outW;
    cv.height = outH;
    const ctx = cv.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const sx = (hole.x - tx) / scale;
    const sy = (hole.y - ty) / scale;
    const sw = hole.w / scale;
    const sh = hole.h / scale;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);
    cv.toBlob((blob) => {
      if (!blob) { close(); if (onCancel) onCancel(); return; }
      const name = (file.name || 'dl').replace(/\.[^.]+$/, '') + '.jpg';
      onConfirm(new File([blob], name, { type: 'image/jpeg' }));
      close();
    }, 'image/jpeg', 0.9);
  };
}

function openPhotoKindPicker(onPick, onCancel) {
  const ov = document.createElement('div');
  ov.className = 'modal-backdrop';
  ov.innerHTML = `
    <div class="modal photo-kind-modal">
      <div class="modal-h">
        <div>
          <div class="eyebrow">${t('photoKindEyebrow')}</div>
          <h3>${t('photoKindTitle')}</h3>
          <p>${t('photoKindLead')}</p>
        </div>
        <button class="icon-btn mini" type="button" data-x>✕</button>
      </div>
      <div class="photo-kind-choices">
        <button class="photo-kind-choice" type="button" data-kind="original">
          <div class="mini"><img src="/selfie-ex-original.jpg" alt=""><span class="ex">${t('photoKindExampleTag')}</span><span class="tag">${t('photoKindOriginalTag')}</span></div>
          <b>${t('photoKindOriginal')}</b>
          <span>${t('photoKindOriginalHint')}</span>
        </button>
        <button class="photo-kind-choice" type="button" data-kind="reference">
          <div class="mini"><img src="/selfie-ex-reference.jpg" alt=""><span class="ex">${t('photoKindExampleTag')}</span><span class="tag">${t('photoKindReferenceTag')}</span></div>
          <b>${t('photoKindReference')}</b>
          <span>${t('photoKindReferenceHint')}</span>
        </button>
      </div>
    </div>`;
  document.body.appendChild(ov);
  const close = () => ov.remove();
  ov.querySelectorAll('[data-x]').forEach((b) => b.addEventListener('click', () => { close(); if (onCancel) onCancel(); }));
  ov.addEventListener('click', (e) => { if (e.target === ov) { close(); if (onCancel) onCancel(); } });
  ov.querySelectorAll('[data-kind]').forEach((b) => b.addEventListener('click', () => {
    const kind = b.getAttribute('data-kind');
    close();
    onPick(kind);
  }));
}

function openOriginalPhotoConfirm(onYes, onBack) {
  const ov = document.createElement('div');
  ov.className = 'modal-backdrop';
  ov.innerHTML = `
    <div class="modal photo-sure-modal">
      <div class="modal-h">
        <div>
          <div class="eyebrow">${t('photoKindOriginal')}</div>
          <h3>${t('photoOriginalSureTitle')}</h3>
          <p class="hint" style="margin-top:8px">${t('photoOriginalSureP')}</p>
        </div>
        <button class="icon-btn mini" type="button" data-x>✕</button>
      </div>
      <div class="notice warn-note" style="margin:0 0 16px">${t('photoOriginalSureWarn')}</div>
      <div class="crop-actions" style="margin-top:0">
        <button class="btn ghost" type="button" data-back>${t('photoOriginalSureBack')}</button>
        <button class="btn primary" type="button" data-ok style="margin-left:auto">${t('photoOriginalSureYes')}</button>
      </div>
    </div>`;
  document.body.appendChild(ov);
  const close = () => ov.remove();
  ov.querySelectorAll('[data-x]').forEach((b) => b.addEventListener('click', () => { close(); if (onBack) onBack(); }));
  ov.querySelector('[data-back]').addEventListener('click', () => { close(); if (onBack) onBack(); });
  ov.querySelector('[data-ok]').addEventListener('click', () => { close(); onYes(); });
  ov.addEventListener('click', (e) => { if (e.target === ov) { close(); if (onBack) onBack(); } });
}

function openAddDisclaimerConfirm() {
  return new Promise((resolve) => {
    const ov = document.createElement('div');
    ov.className = 'modal-backdrop';
    ov.innerHTML = `
      <div class="modal photo-sure-modal">
        <div class="modal-h">
          <div>
            <h3>${esc(t('addDisclaimerTitle'))}</h3>
          </div>
          <button class="icon-btn mini" type="button" data-x>✕</button>
        </div>
        <div class="notice warn-note" style="margin:0 0 16px">${I.alert}<div><p>${esc(t('addDisclaimer'))}</p></div></div>
        <div class="crop-actions" style="margin-top:0">
          <button class="btn ghost" type="button" data-back>${esc(t('addDisclaimerBack'))}</button>
          <button class="btn primary" type="button" data-ok style="margin-left:auto">${I.check} ${esc(t('addDisclaimerBtn'))}</button>
        </div>
      </div>`;
    document.body.appendChild(ov);
    const close = (answer) => { ov.remove(); resolve(answer); };
    ov.querySelectorAll('[data-x]').forEach((b) => b.addEventListener('click', () => close(false)));
    ov.querySelector('[data-back]').addEventListener('click', () => close(false));
    ov.querySelector('[data-ok]').addEventListener('click', () => close(true));
    ov.addEventListener('click', (e) => { if (e.target === ov) close(false); });
  });
}

function wireCropOnAttach(input, onApplied) {
  if (!input || input.dataset.cropWired) return;
  input.dataset.cropWired = '1';
  input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    if (!file) return;
    stagedInputFiles.set(input, file);
    const isPersonPhoto = input.getAttribute('data-person-photo') === '1'
      || String(input.getAttribute('data-doc-input') || input.getAttribute('name') || input.name || '') === 'profilePhoto';
    if (!isPersonPhoto && file.type && !/^image\//.test(file.type)) { if (onApplied) onApplied(input); return; }
    const afterCrop = (cropped) => {
      stagedInputFiles.set(input, cropped);
      try {
        const dt = new DataTransfer();
        dt.items.add(cropped);
        input.files = dt.files;
      } catch (_e) { /* sem DataTransfer: mantém o arquivo original */ }
      if (onApplied) onApplied(input);
    };
    const cancel = () => { stagedInputFiles.delete(input); photoKindByInput.delete(input); input.value = ''; };
    if (!isPersonPhoto) {
      openCropper(file, afterCrop, cancel, cropKindForInput(input));
      return;
    }
    openPhotoKindPicker((kind) => {
      if (kind === 'original') {
        openOriginalPhotoConfirm(() => {
          setPhotoKind(input, 'original');
          openCropper(file, afterCrop, cancel, 'selfie');
        }, () => openPhotoKindPicker((k2) => {
          if (k2 === 'original') {
            openOriginalPhotoConfirm(() => {
              setPhotoKind(input, 'original');
              openCropper(file, afterCrop, cancel, 'selfie');
            }, cancel);
          } else {
            setPhotoKind(input, 'reference');
            openCropper(file, afterCrop, cancel, 'photo');
          }
        }, cancel));
        return;
      }
      setPhotoKind(input, 'reference');
      openCropper(file, afterCrop, cancel, 'photo');
    }, cancel);
  });
}

function attachedFile(formElement, name) {
  const input = formElement?.elements?.[name] || formElement?.querySelector?.(`[name="${name}"]`);
  return stagedInputFiles.get(input) || input?.files?.[0] || null;
}

function ensureFormDataFile(body, formElement, name) {
  const input = formElement?.elements?.[name] || formElement?.querySelector?.(`[name="${name}"]`);
  const staged = stagedInputFiles.get(input);
  if (staged) {
    body.delete(name);
    body.append(name, staged);
    return;
  }
  if (body.has(name)) return;
  const file = input?.files?.[0] || null;
  if (file) body.append(name, file);
}

function ensureDocumentFiles(body, formElement) {
  ['dlFront', 'dlBack', 'profilePhoto'].forEach((name) => ensureFormDataFile(body, formElement, name));
  const input = formElement?.elements?.profilePhoto || formElement?.querySelector?.('[name="profilePhoto"]');
  const kind = photoKindByInput.get(input) || input?.dataset?.photoKind || formElement?.querySelector?.('input[name="photoKind"]')?.value;
  if (kind === 'original' || kind === 'reference') body.set('photoKind', kind);
}

/* ===================== Vagas ===================== */
async function loadVacancies(draw = true) {
  if (state.vacanciesLoading) return;
  state.vacanciesLoading = true;
  if (draw && state.view === 'vacancies' && !state.vacanciesLoaded) renderVacancies();
  try {
    const data = await api('/api/vacancies');
    state.vacancies = data.items || [];
    state.vacancyCampaign = data.campaign || null;
    if (state.vacancyCampaign && state.vacancyCampaign.remaining > 0) {
      if (!['free', 'all'].includes(state.vacancyMode)) state.vacancyMode = 'free';
    } else {
      state.vacancyMode = null;
    }
    state.vacanciesError = '';
    const latest = await api('/api/vacancies/orders/latest').catch(() => ({ order: null }));
    state.vacancyOrder = latest.order || null;
    if (state.vacancyOrder?.status === 'claimed' && state.vacancyOrder.apply_account_id) {
      const polling = Boolean(state.vacancyPoll);
      stopVacancyPoll();
      closePayCheckoutWindow();
      if (polling) openVacancyWelcome(state.vacancyOrder.apply_account_id);
    } else if (['pending', 'paid'].includes(state.vacancyOrder?.status)) {
      startVacancyPoll();
    }
  } catch (error) {
    state.vacanciesError = error.message;
  } finally {
    state.vacanciesLoaded = true;
    state.vacanciesLoading = false;
    if (state.view === 'vacancies') renderVacancies();
  }
}

function startVacancyPoll() {
  if (state.vacancyPoll) return;
  state.vacancyPoll = setInterval(() => loadVacancies(true), 4000);
}

function stopVacancyPoll() {
  if (state.vacancyPoll) {
    clearInterval(state.vacancyPoll);
    state.vacancyPoll = null;
  }
}

function closePayCheckoutWindow() {
  try { state.payCheckoutWindow?.close(); } catch (_err) {}
  state.payCheckoutWindow = null;
}

function moneyUsd(n) {
  return `US$ ${Number(n || 0)}`;
}

function freeCampaignRows() {
  return (state.vacancyCampaign?.regions || []).map((region) => ({
    city: region.display_city || region.canonical_city,
    claim_city: region.canonical_city,
    state: region.state || '',
    count: Number(region.count || 0),
    price_usd: Number(region.price_usd || 0),
    also: region.also || [],
    lat: Number(region.lat),
    lng: Number(region.lng),
    campaign_region_id: region.id,
  }));
}


function vacancyCardTitle(city) {
  const raw = String(city || '');
  const cut = raw.indexOf(' - ');
  if (cut < 0) return `<b>${esc(raw)}</b>`;
  return `<b>${esc(raw.slice(0, cut))}</b><em>${esc(raw.slice(cut + 3))}</em>`;
}
function renderVacancies() {
  const admin = state.user?.role === 'admin';
  const freeVacancy = admin || state.user?.vacancy_free === true;
  const campaignVisible = Boolean(state.vacancyCampaign && state.vacancyCampaign.remaining > 0);
  const campaignFree = campaignVisible && state.vacancyMode !== 'all';
  setCrumb([[t('vacancies'), null]]);
  const view = document.querySelector('#view');
  const order = state.vacancyOrder;
  const groups = new Map();
  const sourceRows = campaignFree ? freeCampaignRows() : state.vacancies;
  const listed = searchFilteredVacancies(sourceRows);
  for (const item of listed) {
    const key = item.state || t('otherStates');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  const pendingPay = order?.status === 'pending';
  const orderBanner = order && order.status !== 'cancelled' ? `
    <div class="notice ${order.status === 'claimed' ? '' : 'warn-note'}" style="margin-bottom:16px">${I.info}<div>
      <b>${order.status === 'claimed' ? t('vacancyConnected') : order.status === 'failed' ? t('paidNoAccount') : t('paymentPending')}</b>
      <p>${esc(order.city)}${order.state ? `, ${esc(order.state)}` : ''} · ${Number(order.amount || 0) === 0 ? t('freeLabel') : moneyUsd(order.amount)}</p>
      ${order.status === 'claimed' && order.apply_account_id ? `<div class="vacancy-order-act"><button class="btn secondary sm" type="button" data-vacancy-open="${order.apply_account_id}">${t('viewAccess')}</button><button class="btn primary sm" type="button" data-vacancy-open-dl="${order.apply_account_id}">${t('attachDl')}</button></div>` : ''}
      ${order.status === 'failed' || order.status === 'paid' ? `<div class="vacancy-order-act"><button class="btn secondary sm" type="button" data-vacancy-retry="${order.id}">${t('retryConnect')}</button></div>` : ''}
      ${pendingPay ? `<div class="vacancy-order-act">
        <button class="btn primary sm" type="button" data-vacancy-pay="${order.id}">${t('openPayment')}</button>
        <button class="btn ghost sm" type="button" data-vacancy-cancel="${order.id}">${t('cancelOrder')}</button>
      </div>` : ''}
      ${order.error ? `<p class="hint">${esc(order.error)}</p>` : ''}
    </div></div>` : '';
  const cards = [...groups.entries()].map(([stateName, rows]) => `
    <div class="vacancy-group">
      <h3>${esc(stateName)}</h3>
      <div class="vacancy-grid">${rows.map((row) => {
        const claimCity = row.claim_city || row.city;
        const key = `${claimCity}||${row.state || ''}`;
        const buyingKey = campaignFree ? `free:${key}` : key;
        const buying = state.vacancyBuying === buyingKey;
        const sellable = row.count > 0 && (campaignFree || freeVacancy || row.price_usd >= 10);
        const action = campaignFree
          ? `data-vacancy-free="${esc(key)}"`
          : `data-vacancy-buy="${esc(key)}"`;
        return `<article class="vacancy-card">
          <div class="vacancy-loc">${I.pin}<div>${vacancyCardTitle(row.city)}<span>${esc(row.state || '')}</span></div></div>
          <div class="vacancy-meta"><strong>${row.count}</strong> ${row.count === 1 ? t('vacancyOne') : t('vacancyMany')}</div>
          ${campaignFree ? `<div class="vacancy-free-value"><b>${t('freeLabel')}</b><span>${t('freeBenefit')}</span></div>` : (admin ? `<label class="field vacancy-price"><span>${t('priceUsd')}</span><input data-vacancy-price="${esc(key)}" type="number" min="0" step="1" value="${row.price_usd || ''}" /></label>` : `<div class="vacancy-usd">${row.price_usd ? moneyUsd(row.price_usd) : '—'}</div>`)}
          ${sellable ? `<button class="btn primary" type="button" ${action} ${buying ? 'disabled' : ''}>${buying ? (campaignFree ? t('freeReleasing') : (freeVacancy ? t('releasing') : `<span class="spinner"></span> ${state.vacancyBuyPhase === 'pay' ? t('openingPay') : t('checkingStock')}`)) : (campaignFree ? t('grabFree') : (freeVacancy ? t('grab') : `${t('grab')} · ${moneyUsd(row.price_usd)}`))}</button>` : `<button class="btn ghost" type="button" disabled>${row.count ? t('noPrice') : t('soldOut')}</button>`}
        </article>`;
      }).join('')}</div>
    </div>`).join('');
  const loading = !state.vacanciesLoaded;
  const body = loading
    ? `<div class="vacancy-loading" aria-busy="true">
        <span class="spinner lg"></span>
        <h2>${t('seekingVacancies')}</h2>
        <p>${t('seekingHint')}</p>
        <div class="vacancy-grid vacancy-skel">${'<div class="sk"></div>'.repeat(8)}</div>
      </div>`
    : (listed.length ? cards : (sourceRows.length
      ? `<div class="empty"><h2>${t('noRegionQ')} “${esc(state.vacancyQ.trim())}”</h2><p>${t('tryOtherName')}</p></div>`
      : `<div class="empty"><h2>${t('noVacanciesNow')}</h2><p>${t('comeBack')}</p></div>`));
  const mapBody = `<div id="vacancyMap" class="vacancy-map" role="presentation"></div>`;
  const campaignTabs = campaignVisible ? `<div class="vacancy-mode-tabs" role="tablist">
      <button type="button" role="tab" aria-selected="${campaignFree}" class="${campaignFree ? 'active' : ''}" data-vacancy-mode="free">${t('freeTab')}</button>
      <button type="button" role="tab" aria-selected="${!campaignFree}" class="${campaignFree ? '' : 'active'}" data-vacancy-mode="all">${t('allVacanciesTab')}</button>
    </div>` : '';
  const campaignBanner = campaignVisible && campaignFree ? `<div class="vacancy-free-banner">${I.gift || I.check}<div>
      <b>${esc(tFill('freeBannerTitle', { remaining: state.vacancyCampaign.remaining, limit: state.vacancyCampaign.limit }))}</b>
      <p>${esc(t('freeBannerBody'))}</p>
      <span>${esc(tFill('freeRemaining', { remaining: state.vacancyCampaign.remaining, limit: state.vacancyCampaign.limit }))}</span>
    </div></div>` : '';
  const campaignStockNote = campaignVisible && campaignFree && sourceRows.every((row) => Number(row.count || 0) < 1)
    ? `<div class="notice warn-note vacancy-free-stock">${I.info}<div>${esc(t('freeNoStock'))}</div></div>`
    : '';
  view.innerHTML = `
    <div class="page-h vacancy-head">
      <div>
        <h2>${t('vacanciesTitle')}</h2>
        <p>${t('vacanciesSub')}</p>
      </div>
      ${!loading ? `<div class="vacancy-view-switch"><button class="btn ghost sm" type="button" data-vacancy-map>${state.showVacancyMap ? t('vacancyList') : t('vacancyMap')}</button></div>` : ''}
    </div>
    ${campaignTabs}
    ${campaignBanner}
    ${campaignStockNote}
    ${orderBanner}
    ${admin && !campaignFree && !loading && !state.showVacancyMap ? `<div class="toolbar vacancy-price-bar">
      <span class="hint">${t('priceHint')}</span>
      <button class="btn ghost sm" type="button" data-vacancy-list>${t('vacancyShareList')}</button>
      <button class="btn primary sm" type="button" data-vacancy-save>${t('savePrices')}</button>
    </div>` : ''}
    <div class="error" id="vacancyError">${esc(state.vacanciesError || '')}</div>
    ${state.showVacancyMap && !loading ? mapBody : body}`;
  document.querySelector('[data-vacancy-list]')?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    copyVacancyShareList(event.currentTarget);
  });
  document.querySelector('[data-vacancy-save]')?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    saveVacancyPrices(event.currentTarget);
  });
  if (state.showVacancyMap && !loading) renderVacancyMap(listed, campaignFree);
  if (!state.vacanciesLoaded && !state.vacanciesLoading) loadVacancies(true);
}

function renderVacancyMap(listed = [], campaignFree = false) {
  const el = document.querySelector('#vacancyMap');
  if (!el || typeof L === 'undefined') return;
  if (state._vacMap) {
    state._vacMap.remove();
    state._vacMap = null;
  }
  const map = L.map(el, { worldCopyJump: true }).setView([39.8, -98.5], 4);
  state._vacMap = map;
  L.tileLayer('/map-tiles/{z}/{x}/{y}.png?v=1', { maxZoom: 18, attribution: '' }).addTo(map);
  const icon = L.divIcon({ className: 'vac-pin', html: '<span>' + I.pin + '</span>', iconSize: [34, 42], iconAnchor: [17, 40], popupAnchor: [0, -38] });
  const layer = L.featureGroup();
  for (const row of listed) {
    const lat = Number(row.lat);
    const lng = Number(row.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    const key = (row.claim_city || row.city) + '||' + (row.state || '');
    const sellable = row.count > 0 && (campaignFree || (state.user && state.user.role === 'admin') || state.user && state.user.vacancy_free === true || row.price_usd >= 10);
    const price = campaignFree ? t('freeLabel') : (row.price_usd ? moneyUsd(row.price_usd) : '');
    const action = sellable
      ? '<button class="btn primary sm" type="button" ' + (campaignFree ? 'data-vacancy-free' : 'data-vacancy-buy') + '="' + esc(key) + '">' + (campaignFree ? t('grabFree') : t('grab') + (price ? ' · ' + price : '')) + '</button>'
      : '';
    const marker = L.marker([lat, lng], { icon });
    marker.bindPopup(
      '<div class="vacancy-pop"><b>' + esc(row.city) + '</b><span>' + esc(row.state || '') + ' · ' + row.count + ' ' + (row.count === 1 ? t('vacancyOne') : t('vacancyMany')) + (price ? ' · ' + price : '') + '</span>' + action + '</div>'
    );
    layer.addLayer(marker);
  }
  if (layer.getLayers().length) {
    layer.addTo(map);
    map.fitBounds(layer.getBounds(), { padding: [36, 36], maxZoom: 11 });
  }
  setTimeout(() => map.invalidateSize(), 80);
}

async function claimFreeVacancy(city, stateName) {
  const campaign = state.vacancyCampaign;
  if (!campaign || campaign.remaining < 1 || state.vacancyBuying) return;
  const region = (campaign.regions || []).find((item) => item.canonical_city === city && (item.state || '') === (stateName || ''));
  if (!region || Number(region.count || 0) < 1) return;
  const confirmed = await applyConfirm(
    tFill('freeConfirm', { city: region.display_city || city, limit: campaign.limit }),
    t('freeConfirmTitle'),
  );
  if (!confirmed) return;
  const key = `${city}||${stateName || ''}`;
  const storageKey = `apply_free_vacancy_request:${campaign.id}:${key}`;
  let requestId = sessionStorage.getItem(storageKey);
  if (!requestId) {
    requestId = crypto.randomUUID();
    sessionStorage.setItem(storageKey, requestId);
  }
  state.vacancyBuying = `free:${key}`;
  const error = document.querySelector('#vacancyError');
  if (error) error.textContent = '';
  renderVacancies();
  try {
    const data = await api('/api/vacancies/free-claim', {
      method: 'POST',
      body: JSON.stringify({ city, state: stateName || '', request_id: requestId }),
    });
    sessionStorage.removeItem(storageKey);
    if (state.vacancyCampaign && Number.isFinite(Number(data.remaining))) {
      state.vacancyCampaign.remaining = Number(data.remaining);
      if (state.vacancyCampaign.remaining < 1) state.vacancyMode = null;
    }
    await load(false);
    await loadVacancies(false);
    if (data.account_id) openVacancyWelcome(data.account_id);
  } catch (err) {
    const definitive = ['claim_failed', 'invalid_request', 'invalid_region', 'not_eligible', 'limit_reached', 'campaign_inactive'];
    if (definitive.includes(err.apiCode)) sessionStorage.removeItem(storageKey);
    if (error) error.textContent = err.apiCode === 'claim_in_progress' ? t('freeClaimInProgress') : err.message;
  } finally {
    state.vacancyBuying = '';
    state.vacancyBuyPhase = '';
    if (state.view === 'vacancies') renderVacancies();
  }
}

function openCheckoutTab() {
  const tab = window.open('about:blank', '_blank');
  if (tab) tab.opener = null;
  state.payCheckoutWindow = tab || null;
  return tab;
}

function sendCheckoutTab(tab, url) {
  if (!url) {
    try { tab?.close(); } catch (_err) {}
    if (state.payCheckoutWindow === tab) state.payCheckoutWindow = null;
    return false;
  }
  if (tab && !tab.closed) {
    try {
      tab.location.href = url;
      state.payCheckoutWindow = tab;
      return true;
    } catch (_err) {}
  }
  const opened = window.open(url, '_blank');
  if (opened) {
    opened.opener = null;
    state.payCheckoutWindow = opened;
    return true;
  }
  window.location.href = url;
  return true;
}


function setVacancyBuyBusy(phase) {
  const title = phase === 'pay' ? t('openingPay') : t('checkingStock');
  const hint = phase === 'pay' ? t('openingPayHint') : t('checkingStockHint');
  let overlay = document.querySelector('#vacancyBuyBusy');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'vacancyBuyBusy';
    overlay.className = 'detail-action-busy';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.setAttribute('tabindex', '-1');
    document.body.appendChild(overlay);
    overlay.focus();
  }
  overlay.innerHTML = `<div class="detail-action-card"><span class="spinner" aria-hidden="true"></span><h2>${esc(title)}</h2><p>${esc(hint)}</p><div class="detail-action-progress" aria-hidden="true"><span></span></div></div>`;
}

function clearVacancyBuyBusy() {
  document.querySelector('#vacancyBuyBusy')?.remove();
}

async function buyVacancy(city, stateName) {
  const key = `${city}||${stateName || ''}`;
  if (state.vacancyBuying) return;
  state.vacancyBuying = key;
  state.vacancyBuyPhase = 'check';
  const error = document.querySelector('#vacancyError');
  if (error) error.textContent = '';
  const tab = openCheckoutTab();
  renderVacancies();
  setVacancyBuyBusy('check');
  try {
    const data = await api('/api/vacancies/checkout', { method: 'POST', body: JSON.stringify({ city, state: stateName || '' }) });
    state.vacancyBuyPhase = 'pay';
    setVacancyBuyBusy('pay');
    if (state.view === 'vacancies') renderVacancies();
    if (data.account_id || data.status === 'claimed') {
      try { tab?.close(); } catch (_err) {}
      await load(false);
      openVacancyWelcome(data.account_id);
      return;
    }
    sendCheckoutTab(tab, data.url);
    clearVacancyBuyBusy();
    startVacancyPoll();
    await loadVacancies(true);
  } catch (err) {
    try { tab?.close(); } catch (_err) {}
    if (error) error.textContent = err.message;
  } finally {
    state.vacancyBuying = '';
    state.vacancyBuyPhase = '';
    clearVacancyBuyBusy();
    if (state.view === 'vacancies') renderVacancies();
  }
}

const VACANCY_STATE_META = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['FL', 'Florida'], ['GA', 'Georgia'],
  ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'],
  ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'], ['MD', 'Maryland'],
  ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'], ['MO', 'Missouri'],
  ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'],
  ['NM', 'New Mexico'], ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'],
  ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'],
  ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'], ['VT', 'Vermont'],
  ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
  ['DC', 'District of Columbia'],
];
const VACANCY_STATE_NAME = Object.fromEntries(VACANCY_STATE_META);
const VACANCY_STATE_ABBR = Object.fromEntries(VACANCY_STATE_META.map(([code, name]) => [name.toLowerCase(), code]));

function foldVacancyState(value = '') {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function vacancyStateAbbr(state = '') {
  const raw = String(state || '').trim();
  if (!raw) return '';
  if (/^[A-Za-z]{2}$/.test(raw)) return raw.toUpperCase();
  return VACANCY_STATE_ABBR[raw.toLowerCase()] || VACANCY_STATE_ABBR[foldVacancyState(raw).toLowerCase()] || '';
}

function vacancyShareCity(city = '', abbr = '', full = '') {
  let name = String(city || '').trim();
  const suffixes = [abbr, full].filter(Boolean);
  for (const bit of suffixes) {
    const tail = `, ${bit}`;
    if (name.toLowerCase().endsWith(tail.toLowerCase())) {
      name = name.slice(0, -tail.length).trim();
      break;
    }
  }
  return name || String(city || '').trim();
}

function buildVacancyShareList(rows = state.vacancies) {
  const typed = new Map();
  for (const input of document.querySelectorAll('[data-vacancy-price]')) {
    const [city, st] = String(input.dataset.vacancyPrice || '').split('||');
    if (!city) continue;
    typed.set(`${city}||${st || ''}`, Math.floor(Number(input.value || 0)));
  }
  const groups = new Map();
  for (const row of rows || []) {
    if (!(Number(row.count) > 0)) continue;
    const key = `${row.city}||${row.state || ''}`;
    const price = typed.has(key) ? typed.get(key) : Math.floor(Number(row.price_usd || 0));
    if (!(price > 0)) continue;
    const abbr = vacancyStateAbbr(row.state);
    if (!abbr || !VACANCY_STATE_NAME[abbr]) continue;
    const full = VACANCY_STATE_NAME[abbr];
    const city = vacancyShareCity(row.city, abbr, full);
    if (!city) continue;
    if (!groups.has(abbr)) groups.set(abbr, []);
    groups.get(abbr).push({ city, price });
  }
  const states = [...groups.keys()].sort((a, b) => VACANCY_STATE_NAME[a].localeCompare(VACANCY_STATE_NAME[b], 'en'));
  const cityN = states.reduce((n, abbr) => n + groups.get(abbr).length, 0);
  const now = new Date();
  const stamp = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;
  const blocks = states.map((abbr) => {
    const full = VACANCY_STATE_NAME[abbr].toUpperCase();
    const lines = groups.get(abbr)
      .sort((a, b) => a.city.localeCompare(b.city, 'en'))
      .map((item) => `- ${item.city} - ${item.price}$`);
    return `*${full}, ${abbr}*\n${lines.join('\n')}`;
  });
  return {
    text: `*VAGAS AMAZON FLEX*\n              *${stamp}*\n\n🇺🇸 *${states.length} ESTADOS*\n🏙️ *${cityN} CIDADES/REGIÕES*\n\n\n${blocks.join('\n\n')}`,
    states: states.length,
    cities: cityN,
  };
}

async function copyVacancyShareList(button) {
  if (state.user?.role !== 'admin') return;
  const built = buildVacancyShareList(state.vacancies);
  const error = document.querySelector('#vacancyError');
  if (error) error.textContent = '';
  if (!built.cities) {
    applyAlert(t('vacancyShareEmpty'));
    return;
  }
  const original = button?.innerHTML;
  try {
    if (button) {
      button.disabled = true;
      button.innerHTML = `<span class="spinner"></span> ${esc(t('vacancyShareCopying'))}`;
    }
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(built.text);
    else {
      const area = document.createElement('textarea');
      area.value = built.text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.left = '-9999px';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    applyAlert(tFill('vacancyShareCopied', { cities: built.cities }));
  } catch (err) {
    const msg = err.message || t('vacancyShareCopyFail');
    if (error) error.textContent = msg;
    applyAlert(msg);
  } finally {
    if (button) {
      button.disabled = false;
      button.innerHTML = original || t('vacancyShareList');
    }
  }
}

async function saveVacancyPrices(button) {
  if (state.vacancySaving) return;
  const items = [...document.querySelectorAll('[data-vacancy-price]')].map((input) => {
    const [city, stateName] = String(input.dataset.vacancyPrice || '').split('||');
    return { city, state: stateName || '', price_usd: Math.floor(Number(input.value || 0)) };
  }).filter((item) => item.city);
  const error = document.querySelector('#vacancyError');
  if (error) error.textContent = '';
  if (!items.length) {
    if (error) error.textContent = 'Nenhum preço para salvar.';
    applyAlert('Nenhum preço para salvar.');
    return;
  }
  state.vacancySaving = true;
  const original = button?.innerHTML;
  if (button) {
    button.disabled = true;
    button.textContent = 'Salvando…';
  }
  try {
    const data = await api('/api/vacancies/prices', { method: 'PUT', body: JSON.stringify({ items }) });
    state.vacancies = data.items || state.vacancies;
    renderVacancies();
    applyAlert(`Preços salvos (${items.length} cidades).`);
  } catch (err) {
    if (error) error.textContent = err.message;
    applyAlert(err.message || 'Não deu para salvar os preços.');
    if (button) {
      button.disabled = false;
      button.innerHTML = original || 'Salvar preços';
    }
  } finally {
    state.vacancySaving = false;
  }
}

async function retryVacancy(id) {
  try {
    const data = await api(`/api/vacancies/orders/${id}/retry`, { method: 'POST', body: '{}' });
    if (data.account_id) openVacancyWelcome(data.account_id);
    else await loadVacancies(true);
  } catch (err) {
    const error = document.querySelector('#vacancyError');
    if (error) error.textContent = err.message;
  }
}

async function reopenVacancyPay(id) {
  const error = document.querySelector('#vacancyError');
  if (error) error.textContent = '';
  const tab = openCheckoutTab();
  try {
    const data = await api(`/api/vacancies/orders/${id}/reopen`, { method: 'POST', body: '{}' });
    sendCheckoutTab(tab, data.url);
    startVacancyPoll();
    await loadVacancies(true);
  } catch (err) {
    try { tab?.close(); } catch (_err) {}
    if (error) error.textContent = err.message;
  }
}

async function cancelVacancyOrder(id) {
  const error = document.querySelector('#vacancyError');
  if (error) error.textContent = '';
  try {
    await api(`/api/vacancies/orders/${id}/cancel`, { method: 'POST', body: '{}' });
    stopVacancyPoll();
    state.vacancyOrder = null;
    if (state.view === 'vacancies') renderVacancies();
    await loadVacancies(true);
  } catch (err) {
    if (error) error.textContent = err.message;
  }
}

function openVacancyWelcome(accountId) {
  stopVacancyPoll();
  state.vacancyNeedDl = accountId;
  state.selectedAccountId = accountId;
  localStorage.setItem('apply_vacancy_need_dl', accountId);
  localStorage.setItem('apply_selected_account', accountId);
  load(false).then(() => {
    if (state.vacancyNeedDl !== accountId) return;
    go('hub');
  }).catch(() => go('hub'));
}

function openVacancyAccount(accountId, { needDl = true } = {}) {
  stopVacancyPoll();
  if (needDl) {
    state.vacancyNeedDl = accountId;
    localStorage.setItem('apply_vacancy_need_dl', accountId);
  } else {
    state.vacancyNeedDl = '';
    localStorage.removeItem('apply_vacancy_need_dl');
  }
  go('detail', accountId);
}

function skipVacancyDl() {
  state.vacancyNeedDl = '';
  localStorage.removeItem('apply_vacancy_need_dl');
  if (state.view === 'hub') renderHub();
  else renderDetail();
}

async function submitVacancyDl(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const error = formElement.querySelector('#vacancyDlError');
  if (error) error.textContent = '';
  try {
    const form = new FormData(formElement);
    ensureDocumentFiles(form, formElement);
    if (!attachedFile(formElement, 'dlFront') || !attachedFile(formElement, 'dlBack')) {
      throw new Error('Anexe frente e verso da Driver license.');
    }
    const accountId = state.vacancyNeedDl || selectedAccount()?.id;
    const data = await fetchAccountRequest(`/api/accounts/${accountId}/connection-documents`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${state.token}` },
      body: form,
    }).then(async (res) => {
      const payload = await res.json().catch(emptyJsonUnlessStale);
      if (res.status === 402 || payload.code === 'no_credits' || payload.error === 'no_credits') {
        document.querySelector('#topupCredits')?.click();
        throw new Error(t('noCredits'));
      }
      if (!res.ok) throw new Error(payload.error || 'Erro ao salvar');
      return payload;
    });
    state.vacancyNeedDl = '';
    localStorage.removeItem('apply_vacancy_need_dl');
    state.selectedAccountId = data.account.id;
    localStorage.setItem('apply_selected_account', data.account.id);
    state.recentAccountId = data.account.id;
    state.filter = 'all';
    await load(false);
    go('hub', data.account.id);
  } catch (err) {
    if (error) error.textContent = err.message;
  }
}

function bindVacancyDlUi() {
  const form = document.querySelector('#vacancyDlForm');
  if (!form) return;
  form.addEventListener('submit', submitVacancyDl);
  bindSelfieSkipWarn(form);
  bindPhotoClear(form);
  ['dlFront', 'dlBack', 'profilePhoto'].forEach((name) => {
    const input = form.querySelector(`[data-doc-input="${name}"]`);
    wireCropOnAttach(input, () => {
      const file = attachedFile(form, name);
      const box = form.querySelector(`[data-preview="${name}"]`);
      if (box && file) box.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="preview" />`;
      if (name === 'profilePhoto' && file) markPhotoPresent(form, true);
    });
  });
}

function vacancyDlModal() {
  if (!state.vacancyNeedDl) return '';
  const imgIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>';
  return `
    <div class="modal-backdrop vacancy-dl-modal">
      <form class="modal card-pad" id="vacancyDlForm">
        <div class="eyebrow">Quase lá</div>
        <h3>${t('accessTitle')} e ${t('attachDl')}</h3>
        <p class="hint">Frente e verso. Photo é opcional.</p>
        <div class="access-box" id="vacancyAccess">
          <div class="tl-title">${t('accessTitle')}</div>
          <div class="notice warn-note access-admin-warn" id="vacancyAccessMailWarn" hidden>${I.alert}<div><b>${t('accessMailMissingAdmin')}</b></div></div>
          <label class="field access-field"><span>${t('accessEmailPassword')}</span><div class="input-action"><input id="vacancyAccessEmailPassword" type="text" readonly autocomplete="off" data-1p-ignore data-lpignore="true" /><button class="btn ghost sm" type="button" data-access-copy="email">${t('accessCopy')}</button></div></label>
          <label class="field access-field"><span>${t('accessAccountPassword')}</span><div class="input-action"><input id="vacancyAccessAccountPassword" type="text" readonly autocomplete="off" data-1p-ignore data-lpignore="true" /><button class="btn ghost sm" type="button" data-access-copy="account">${t('accessCopy')}</button></div></label>
          <a class="btn secondary sm access-mail-link" id="vacancyAccessMailLink" hidden rel="noopener" target="_blank">${t('accessOpenEmail')}</a>
          <button class="btn secondary sm" type="button" data-access-copy-all>${t('accessCopyAll')}</button>
        </div>
        <div class="docs">
          <label class="doc upload-card"><div class="top"><b>Front</b></div><div class="doc-preview upload-zone" data-preview="dlFront"><span class="ph">${imgIcon}</span></div><input name="dlFront" type="file" accept="image/*" data-doc-input="dlFront" /></label>
          <label class="doc upload-card"><div class="top"><b>Back</b></div><div class="doc-preview upload-zone" data-preview="dlBack"><span class="ph">${imgIcon}</span></div><input name="dlBack" type="file" accept="image/*" data-doc-input="dlBack" /></label>
          <div class="doc upload-card">
            <div class="top"><b>Photo <span class="opt">opcional</span></b></div>
            <div class="doc-preview-wrap">
              <label class="doc-preview upload-zone" for="vacancy-doc-profilePhoto" data-preview="profilePhoto"><span class="ph">${imgIcon}</span></label>
              ${photoClearButton(true)}
            </div>
            <input id="vacancy-doc-profilePhoto" name="profilePhoto" type="file" accept="image/*" data-doc-input="profilePhoto" data-person-photo="1" />
          </div>
        </div>
        <div class="notice warn-note" data-selfie-skip-warn style="margin-top:12px">${I.alert}<div>${t('connectSelfieSkipWarn')}</div></div>
        <div class="form-actions"><button class="btn primary" type="submit">Salvar e continuar</button><button class="btn secondary" type="button" data-vacancy-view-access>${t('viewAccess')}</button></div>
        <div class="error" id="vacancyDlError"></div>
      </form>
    </div>`;
}

/* ===================== Conectar ===================== */
function renderConnect() {
  const reconnectAccount = state.reconnectAccountId ? state.accounts.find((account) => account.id === state.reconnectAccountId) : null;
  if (!reconnectAccount && needsCreditForNewConnect()) {
    setCrumb([[t('applications'), 'hub'], [t('connectAccount'), null]]);
    const view = document.querySelector('#view');
    view.innerHTML = `
    <div class="connect-wrap">
      <div class="page-h"><h2>${t('connectTitle')}</h2><p>${t('connectNeedCreditP')}</p></div>
      <div class="notice warn-note">${I.alert}<div>
        <b>${t('connectNeedCreditB')}</b>
        <p>${t('connectNeedCreditP')}</p>
        <button class="btn primary" type="button" id="connectNeedCredits" style="margin-top:12px">${t('topup')}</button>
      </div></div>
    </div>`;
    document.querySelector('#connectNeedCredits')?.addEventListener('click', () => document.querySelector('#topupCredits')?.click());
    return;
  }
  const stagedAccountId = reconnectAccount?.id || activePendingConnectionAccountId();
  const loginState = state.serverLogin || {};
  const loginBusy = ['created', 'connecting', 'finalizing'].includes(loginState.state);
  const manualOpen = ['manual_required', 'device_error'].includes(loginState.state);
  setCrumb([[t('applications'), 'hub'], [reconnectAccount ? t('reconnectBtn') : t('connectAccount'), null]]);
  const view = document.querySelector('#view');
  const imgIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>';
  const docTile = (name, label, icon, optional) => {
    const photo = name === 'profilePhoto';
    const zone = `<${photo ? 'label' : 'div'} class="doc-preview upload-zone" ${photo ? `for="connect-doc-${name}"` : ''} data-preview="${name}">
        <span class="ph">${icon}</span>
        <span class="upload-copy">${t('attach')}</span>
      </${photo ? 'label' : 'div'}>`;
    const body = `
      <div class="top"><b>${label}${optional ? ` <span class="opt">${t('optional')}</span>` : ''}</b></div>
      ${photo ? `<div class="doc-preview-wrap">${zone}${photoClearButton(true)}</div>` : zone}
      <input ${photo ? `id="connect-doc-${name}"` : ''} name="${name}" type="file" accept="image/*" data-doc-input="${name}"${photo ? ' data-person-photo="1"' : ''} />`;
    return photo
      ? `<div class="doc upload-card">${body}</div>`
      : `<label class="doc upload-card">${body}</label>`;
  };
  const sourceSelector = `<label class="field" style="margin-bottom:14px"><span>${esc(t('stockSoon'))}</span>
          <select disabled><option>${esc(t('stockSoon'))}</option></select>
        </label>`;
  view.innerHTML = `
    <div class="connect-wrap">
      <div class="page-h"><h2>${reconnectAccount ? t('reconnectTitle') : t('connectTitle')}</h2>
        <p>${reconnectAccount ? t('reconnectP') : (stagedAccountId ? t('connectLinkedP') : t('connectNewP'))}</p></div>
      <form id="connectForm" autocomplete="off">
        ${reconnectAccount ? '' : sourceSelector}
        <section class="card card-pad cstep">
          <div class="cstep-h"><span class="n">1</span><div><div class="eyebrow">${t('loginAmazon')}</div><h3>${t('connectAuto')}</h3></div></div>
          ${stagedAccountId && !reconnectAccount ? `<div class="notice">${I.check}<div><b>${t('sessionConnected')}</b><p>${t('sessionConnectedP')}</p></div></div>` : `
            <p class="cdesc">${t('connectDesc')}</p>
            <div class="basic-grid">
              <label class="field"><span>${t('amazonEmail')}</span><input id="serverAmazonEmail" value="" autocomplete="off" inputmode="email" autocapitalize="none" spellcheck="false" readonly data-fresh-credential data-1p-ignore data-lpignore="true" /></label>
              <label class="field"><span>${t('amazonPassword')}</span><input id="serverAmazonPassword" value="" type="password" autocomplete="new-password" readonly data-fresh-credential data-1p-ignore data-lpignore="true" /></label>
            </div>
            <div class="cline connect-amazon-row" style="margin-top:12px">
              <button class="btn primary" type="button" id="startServerAmazonLogin" ${loginBusy ? 'disabled' : ''}>${loginBusy ? t('connecting') : `${I.play} ${t('connectAmazonBtn')}`}</button>
            </div>
            ${loginState.needsOtp ? `<div class="notice warn-note" style="margin-top:12px">${I.info}<div style="width:100%"><b>${t('otpAsked')}</b><div class="input-action" style="margin-top:8px"><input id="serverAmazonOtp" inputmode="numeric" autocomplete="one-time-code" placeholder="${t('otpPlaceholder')}" /><button class="btn secondary sm" type="button" id="submitServerAmazonOtp">${t('sendOtp')}</button></div></div></div>` : ''}
            <p class="hint" id="serverLoginHint" style="margin-top:8px">${loginBusy ? t('loginBusyHint') : loginState.state === 'credentials_error' ? t('credsError') : manualOpen ? t('manualNeeded') : t('passwordHint')}</p>
          `}
          ${stagedAccountId && !reconnectAccount ? '' : `<details class="manual-amazon-login" ${manualOpen ? 'open' : ''} style="margin-top:14px">
            <summary>${t('useManual')}</summary>
            <p class="cdesc">${t('manualDesc')}</p>
            <div class="cline">
              <button class="btn secondary" type="button" id="createAmazonSession">${I.external} ${t('openAmazonLogin')}</button>
              <button class="btn ghost sm" type="button" id="copyAmazonSession" ${state.signinUrl ? '' : 'disabled'}>${I.copy} ${t('copyLink')}</button>
            </div>
            <input id="amazonSigninUrl" readonly value="${esc(state.signinUrl)}" placeholder="o link gerado aparece aqui" style="margin-top:12px" />
            <p class="hint" id="sessionHint" style="margin-top:8px">${state.signinUrl ? t('linkReady') : t('clickToOpen')}</p>
            <label class="field" style="margin-top:14px"><span>${t('returnUrl')}</span>
              <div class="input-action"><input id="amazonReturnUrl" name="sessionRef" placeholder="${t('pasteHere')}" /><button class="icon-btn" type="button" id="pasteAmazonReturn" title="Colar">${I.copy}</button></div>
            </label>
            <div class="cline" style="margin-top:12px"><button class="btn secondary" type="button" id="connectAmazonReturn">${I.check} ${t('connectManually')}</button></div>
            <p class="hint" id="connectStageHint" style="margin-top:8px">${reconnectAccount ? t('pasteThenConnect') : (stagedAccountId ? t('sessionSaved') : t('pasteThenConnect'))}</p>
          </details>`}
        </section>

        ${reconnectAccount ? '' : `<section class="card card-pad cstep">
          <div class="cstep-h"><span class="n">2</span><div><div class="eyebrow">${t('documents')}</div><h3>Driver license</h3></div></div>
          <div class="docs">
            ${docTile('dlFront', t('front'), imgIcon, false)}
            ${docTile('dlBack', t('back'), imgIcon, false)}
            ${docTile('profilePhoto', t('photo'), imgIcon, true)}
          </div>
          <label class="field ssn" style="margin-top:14px"><span>SSN <span class="opt">${t('optional')}</span></span><input name="ssn" inputmode="numeric" placeholder="000-00-0000" /></label>
          <p class="hint" style="margin-top:8px">${t('dlRequiredHint')}</p>
          ${reconnectAccount?.profile_photo_path ? '' : `<div class="notice warn-note" data-selfie-skip-warn style="margin-top:12px">${I.alert}<div>${t('connectSelfieSkipWarn')}</div></div>`}
        </section>`}

        ${reconnectAccount ? `<div class="form-actions">
          <button class="btn ghost" type="button" data-nav="hub">${t('cancel')}</button>
        </div>` : `<div class="form-actions">
          <button class="btn ghost" type="button" data-nav="hub">${t('cancel')}</button>
          ${(() => {
            const staged = state.accounts.find((item) => item.id === stagedAccountId);
            const needCredit = state.user?.role !== 'admin' && !reconnectAccount && !staged?.charged_at && Number(state.user?.credits || 0) < 1;
            if (needCredit) {
              return `<button class="btn primary" type="button" id="connectNeedCredits" style="margin-left:auto">${I.check} ${t('topup')}</button>`;
            }
            return `<button class="btn primary" type="submit" style="margin-left:auto">${I.check} ${stagedAccountId ? t('add') : (reconnectAccount ? t('addReconnect') : t('addAccount'))}</button>`;
          })()}
        </div>`}
        <div class="error" id="formError"></div>
      </form>
    </div>`;

  const connectForm = document.querySelector('#connectForm');
  if (reconnectAccount) connectForm.addEventListener('submit', (event) => event.preventDefault());
  else connectForm.addEventListener('submit', createAccount);
  if (!reconnectAccount) bindSelfieSkipWarn(connectForm);
  bindPhotoClear(connectForm);
  document.querySelector('#connectNeedCredits')?.addEventListener('click', () => {
    const err = document.querySelector('#formError');
    if (err) err.textContent = t('noCredits');
    document.querySelector('#topupCredits')?.click();
  });
  document.querySelector('#sourceCityFilter')?.addEventListener('input', (event) => {
    const query = String(event.target.value || '').trim().toLowerCase();
    document.querySelectorAll('[data-source-city-search]').forEach((option) => {
      option.hidden = query && !String(option.dataset.sourceCitySearch || '').includes(query);
    });
  });
  document.querySelectorAll('[data-source-city-option]').forEach((option) => option.addEventListener('click', () => {
    const value = option.dataset.sourceCityOption || '';
    const selected = value === '' ? null : state.sourceCities[Number(value)];
    state.sourceCitySelection = selected ? value : '';
    document.querySelectorAll('[data-source-city-option]').forEach((item) => item.classList.toggle('selected', item === option));
    const title = document.querySelector('#sourceCitySelectedTitle');
    const meta = document.querySelector('#sourceCitySelectedMeta');
    if (title) title.textContent = selected ? `${selected.city}${selected.state ? `, ${selected.state}` : ''}` : 'Selecionar cidade';
    if (meta) meta.textContent = selected ? `${selected.count} ${selected.count === 1 ? 'conta disponível' : 'contas disponíveis'}` : 'Opcional · conexão normal se vazio';
    const claimButton = document.querySelector('#claimSourceCity');
    if (claimButton) claimButton.disabled = !selected || Boolean(state.sourceClaiming);
    document.querySelector('#sourceCityDropdown')?.removeAttribute('open');
  }));
  document.querySelector('#claimSourceCity')?.addEventListener('click', () => {
    const selected = state.sourceCities[Number(state.sourceCitySelection)];
    if (selected) claimSourceAccount(selected.city, selected.state);
  });
  document.querySelectorAll('[data-fresh-credential]').forEach((input) => {
    const unlock = () => {
      input.readOnly = false;
      if (!input.dataset.credentialTouched) input.value = '';
      input.dataset.credentialTouched = '1';
    };
    input.value = '';
    input.addEventListener('pointerdown', unlock, { once: true });
    input.addEventListener('focus', unlock, { once: true });
    [80, 500].forEach((delay) => setTimeout(() => {
      if (!input.dataset.credentialTouched) input.value = '';
    }, delay));
  });
  document.querySelector('#startServerAmazonLogin')?.addEventListener('click', startServerAmazonLogin);
  document.querySelector('#submitServerAmazonOtp')?.addEventListener('click', submitServerAmazonOtp);
  document.querySelector('#createAmazonSession')?.addEventListener('click', createAmazonSession);
  document.querySelector('#copyAmazonSession')?.addEventListener('click', copyAmazonSession);
  document.querySelector('#pasteAmazonReturn')?.addEventListener('click', pasteAmazonReturn);
  document.querySelector('#connectAmazonReturn')?.addEventListener('click', connectAmazonReturn);
  if (!reconnectAccount) ['dlFront', 'dlBack', 'profilePhoto'].forEach((name) => {
    const input = document.querySelector(`#connectForm [data-doc-input="${name}"]`);
    wireCropOnAttach(input, (el) => {
      const file = attachedFile(document.querySelector('#connectForm'), name);
      const box = document.querySelector(`#connectForm [data-preview="${name}"]`);
      if (box && file) box.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="preview" />`;
      if (name === 'profilePhoto' && file) markPhotoPresent(document.querySelector('#connectForm'), true);
    });
  });
  syncSessionButtons();
  if (!stagedAccountId && !reconnectAccount && !state.sourceCitiesLoaded && !state.sourceCitiesLoading) loadSourceCities();
}

async function loadSourceCities() {
  state.sourceCities = [];
  state.sourceCitiesLoaded = true;
  state.sourceCitiesLoading = false;
}

async function claimSourceAccount(city, sourceState) {
  if (state.sourceClaiming) return;
  state.sourceClaiming = city;
  renderConnect();
  try {
    const result = await api('/api/source-accounts/claim', {
      method: 'POST', body: JSON.stringify({ city, state: sourceState || '' }),
    });
    const accountId = result.account?.id;
    if (!accountId) throw new Error('O Apply não retornou a conta vinculada.');
    state.connectPendingAccountId = accountId;
    state.selectedAccountId = accountId;
    localStorage.setItem('apply_connect_pending_account', accountId);
    localStorage.setItem('apply_selected_account', accountId);
    state.sourceCitiesLoaded = false;
    state.sourceCitySelection = '';
    await load(false);
  } catch (error) {
    state.sourceCitiesError = error.message;
  } finally {
    state.sourceClaiming = '';
    renderConnect();
  }
}

/* ===================== Acompanhamento ===================== */
function renderMonitor() {
  setCrumb([['Acompanhamento', null]]);
  const view = document.querySelector('#view');
  const groups = [
    { key: 'andamento', title: 'Em andamento', color: 'var(--amber)', test: (s) => ['running', 'queued'].includes(s) },
    { key: 'analise', title: 'Em análise (Amazon)', color: 'var(--violet)', test: (s) => ['pending_review', 'review'].includes(s) },
    { key: 'duplicada', title: 'Duplicadas', color: '#ff5b7a', test: (s) => s === 'duplicate' },
    { key: 'consider', title: 'Consider', color: 'var(--red)', test: (s) => s === 'consider' },
    { key: 'acao', title: 'Atenção', color: '#f0883c', test: (s) => ['action_required', 'blocked', 'failed', 'error'].includes(s) },
    { key: 'concluida', title: 'Concluídas', color: 'var(--green)', test: (s) => s === 'complete' },
  ];
  const card = (a) => {
    const idx = stageIdx(a);
    return `<div class="kcard" data-open="${a.id}">
      <div class="top">${av(a)}<div class="who"><b>${esc(accountTitle(a))}</b><span>${esc(a.amazon_label || 'sem rótulo')} · ${esc(a.last_known_status?.region || 'região?')}</span></div></div>
      <div class="step"><span class="nm">${I.clock} Etapa: ${esc(onboardingStepsFor(a)[idx][1])}</span></div>
      <div class="since">${amazonReadLabel(a)}</div>
    </div>`;
  };
  const cols = groups.map((g) => {
    const items = state.accounts.filter((a) => g.test(accStatus(a)));
    return `<div class="kcol">
      <div class="kh"><span class="d" style="background:${g.color}"></span><b>${g.title}</b><span class="ct">${items.length}</span></div>
      ${items.length ? items.map(card).join('') : '<p class="muted" style="font-size:12.5px;padding:10px 4px">Nada aqui.</p>'}
    </div>`;
  }).join('');

  view.innerHTML = `
    <div class="page-h"><h2>Acompanhamento</h2><p>Contas agrupadas por status real: em análise quando a Amazon aceitou o envio, e precisa de atenção quando uma etapa travou ou exige intervenção/análise manual.</p></div>
    <div class="stats" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">
      <div class="stat"><div class="ic a">${I.clock}</div><div><b>${countRunning()}</b><span>Em andamento</span></div></div>
      <div class="stat"><div class="ic v">${I.search}</div><div><b>${countPendingReview()}</b><span>Em análise</span></div></div>
      <div class="stat"><div class="ic d">${I.alert}</div><div><b>${countDuplicate()}</b><span>Duplicadas</span></div></div>
      <div class="stat"><div class="ic r">${I.alert}</div><div><b>${countConsider()}</b><span>Consider</span></div></div>
      <div class="stat"><div class="ic o">${I.alert}</div><div><b>${countActionRequired()}</b><span>Atenção</span></div></div>
      <div class="stat"><div class="ic g">${I.check}</div><div><b>${countComplete()}</b><span>Concluídas</span></div></div>
    </div>
    <div class="toolbar">
      <span class="muted" style="font-size:13px">Painel carregado ${state.accountsLoadedAt ? timeAgo(state.accountsLoadedAt) : 'agora'}. “Atualizar Amazon” consulta o status real das contas acompanhadas.</span>
      <div style="margin-left:auto">${refreshToolbarButton()}</div>
    </div>
    <div class="kan">${cols}</div>`;
}

function emptyState(title, text, nav, cta) {
  return `<div class="card"><div class="empty">
    <div class="ic">${I.grid}</div>
    <h3>${esc(title)}</h3>
    <p>${esc(text)}</p>
    ${nav ? `<button class="btn primary sm" data-nav="${nav}">${esc(cta || 'Abrir')}</button>` : ''}
  </div></div>`;
}

/* ===================== Login Amazon server-side ===================== */
function stopServerLoginPolling() {
  if (state.serverLogin.timer) clearTimeout(state.serverLogin.timer);
  state.serverLogin.timer = null;
  state.serverLogin.polling = false;
}

async function applyServerLoginStatus(status) {
  const wasReconnect = Boolean(state.reconnectAccountId);
  state.serverLogin.attemptId = status.id || state.serverLogin.attemptId;
  state.serverLogin.state = status.state || '';
  state.serverLogin.needsOtp = Boolean(status.needsOtp);
  state.serverLogin.reason = status.reason || '';
  if (status.success && status.accountId) {
    stopServerLoginPolling();
    state.connectPendingAccountId = wasReconnect ? '' : status.accountId;
    state.selectedAccountId = status.accountId;
    state.reconnectAccountId = '';
    if (wasReconnect) localStorage.removeItem('apply_connect_pending_account');
    else localStorage.setItem('apply_connect_pending_account', status.accountId);
    localStorage.setItem('apply_selected_account', status.accountId);
    await load(false);
    const connectedAccount = state.accounts.find((account) => account.id === status.accountId);
    const resumedExistingApplication = Boolean(status.reused && !isPendingConnectionDocuments(connectedAccount));
    if (wasReconnect || resumedExistingApplication) {
      state.serverLogin = { attemptId: '', state: '', needsOtp: false, reason: '', polling: false, timer: null };
      go('detail', status.accountId);
      applyAlert(wasReconnect ? t('reconnectSuccess') : 'Esta conta Amazon já existia. A sessão foi atualizada na aplicação correta.');
      return;
    }
    renderConnect();
    return;
  }
  if (['manual_required', 'credentials_error', 'device_error'].includes(status.state)) {
    stopServerLoginPolling();
    renderConnect();
    return;
  }
  if (status.needsOtp) {
    stopServerLoginPolling();
    renderConnect();
    return;
  }
  const hint = document.querySelector('#serverLoginHint');
  if (hint) hint.textContent = t('loginBusyHint');
  state.serverLogin.polling = true;
  state.serverLogin.timer = setTimeout(pollServerAmazonLogin, 1_200);
}

async function pollServerAmazonLogin() {
  const id = state.serverLogin.attemptId;
  if (!id) return;
  try {
    const status = await api(`/api/amazon-server-login/${id}`);
    await applyServerLoginStatus(status);
  } catch (error) {
    stopServerLoginPolling();
    state.serverLogin.state = 'manual_required';
    state.serverLogin.reason = 'status_unavailable';
    renderConnect();
  }
}

async function startServerAmazonLogin() {
  const emailInput = document.querySelector('#serverAmazonEmail');
  const passwordInput = document.querySelector('#serverAmazonPassword');
  const hint = document.querySelector('#serverLoginHint');
  const button = document.querySelector('#startServerAmazonLogin');
  const email = String(emailInput?.value || '').trim();
  const password = String(passwordInput?.value || '');
  if (!email.includes('@') || password.length < 6) {
    if (hint) hint.textContent = 'Informe e-mail e senha válidos da Amazon.';
    return;
  }
  if (button) { button.disabled = true; button.textContent = 'Conectando…'; }
  if (hint) hint.textContent = 'Abrindo sessão segura…';
  try {
    const result = await api('/api/amazon-server-login/start', {
      method: 'POST',
      body: JSON.stringify({ email, password, reconnectAccountId: state.reconnectAccountId || null }),
    });
    if (passwordInput) passwordInput.value = '';
    if (result.mode !== 'server') {
      state.serverLogin.state = 'manual_required';
      state.serverLogin.reason = result.reason || 'server_unavailable';
      renderConnect();
      return;
    }
    state.serverLogin.attemptId = result.id;
    await applyServerLoginStatus(result);
  } catch (error) {
    if (passwordInput) passwordInput.value = '';
    if (hint) hint.textContent = error.message;
    if (button) { button.disabled = false; button.innerHTML = `${I.play} Conectar Amazon`; }
  }
}

async function submitServerAmazonOtp() {
  const input = document.querySelector('#serverAmazonOtp');
  const hint = document.querySelector('#serverLoginHint');
  const code = String(input?.value || '').trim();
  if (!/^\d{4,8}$/.test(code)) {
    if (hint) hint.textContent = 'Digite o código numérico enviado pela Amazon.';
    return;
  }
  try {
    state.serverLogin.needsOtp = false;
    const status = await api(`/api/amazon-server-login/${state.serverLogin.attemptId}/otp`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    if (input) input.value = '';
    await applyServerLoginStatus(status);
  } catch (error) {
    if (hint) hint.textContent = error.message;
  }
}

/* ===================== Sessão Amazon manual (fallback) ===================== */
function syncSessionButtons() {
  const input = document.querySelector('#amazonSigninUrl');
  const copy = document.querySelector('#copyAmazonSession');
  const hint = document.querySelector('#sessionHint');
  if (input) input.value = state.signinUrl || '';
  if (copy) copy.disabled = !state.signinUrl;
  if (hint) hint.textContent = state.signinUrl ? 'Link pronto. Se a Amazon não abriu, copie e abra manualmente.' : 'Clique no botão para abrir a Amazon.';
}

function isPendingConnectionDocuments(account) {
  const meta = account?.last_known_status || {};
  return Boolean(
    account
    && accStatus(account) !== 'archived'
    && !account.charged_at
    && (!account.dl_front_path || !account.dl_back_path)
    && account.email
    && meta.session_ready === true
    && sessionUiStatus(account) === 'session_fresh'
  );
}

function syncPendingConnectionAccount() {
  const current = state.accounts.find((item) => item.id === state.connectPendingAccountId);
  if (isPendingConnectionDocuments(current)) {
    localStorage.setItem('apply_connect_pending_account', current.id);
    localStorage.removeItem('apply_connect_draft_account');
    return current.id;
  }
  state.connectPendingAccountId = '';
  localStorage.removeItem('apply_connect_pending_account');
  localStorage.removeItem('apply_connect_draft_account');
  if (state.user?.role === 'admin') return '';
  const pendingAccounts = state.accounts.filter(isPendingConnectionDocuments);
  if (pendingAccounts.length !== 1) return '';
  state.connectPendingAccountId = pendingAccounts[0].id;
  localStorage.setItem('apply_connect_pending_account', pendingAccounts[0].id);
  return pendingAccounts[0].id;
}

function activePendingConnectionAccountId() {
  if (!state.connectPendingAccountId) syncPendingConnectionAccount();
  const account = state.accounts.find((item) => item.id === state.connectPendingAccountId);
  return isPendingConnectionDocuments(account) ? account.id : '';
}

async function createAmazonSession() {
  const button = document.querySelector('#createAmazonSession');
  const hint = document.querySelector('#sessionHint');
  const pendingWindow = window.open('about:blank', '_blank');
  if (pendingWindow) pendingWindow.opener = null;
  button.disabled = true;
  if (hint) hint.textContent = 'Gerando link Amazon...';
  try {
    const data = await api('/api/amazon/signin-url', {
      method: 'POST',
      body: JSON.stringify({ reconnectAccountId: state.reconnectAccountId || null }),
    });
    state.signinUrl = data.url;
    localStorage.setItem('apply_last_signin_url', data.url);
    syncSessionButtons();
    if (pendingWindow) {
      pendingWindow.location.href = state.signinUrl;
      if (hint) hint.textContent = 'Amazon aberta. Se não abriu, toque em Copiar link.';
    } else {
      openAmazonSession();
      if (hint) hint.textContent = 'Link pronto. Se a Amazon não abriu, toque em Copiar link.';
    }
  } catch (err) {
    pendingWindow?.close?.();
    if (hint) hint.textContent = err.message;
  } finally {
    button.disabled = false;
  }
}

async function copyAmazonSession() {
  const hint = document.querySelector('#sessionHint');
  if (!state.signinUrl) return;
  const copied = await copyTextWithFallback(state.signinUrl, '#amazonSigninUrl');
  if (copied) {
    if (hint) hint.textContent = 'Link copiado e Amazon aberta. Depois cole a URL final de retorno.';
  } else {
    if (hint) hint.textContent = 'Não consegui copiar automático. Segure no campo do link e copie.';
  }
}

function openAmazonSession() {
  if (!state.signinUrl) return;
  window.open(state.signinUrl, '_blank', 'noopener,noreferrer');
}

async function pasteAmazonReturn() {
  const input = document.querySelector('#amazonReturnUrl');
  const error = document.querySelector('#formError');
  if (error) error.textContent = '';
  if (!input) return;
  try {
    const text = await navigator.clipboard.readText();
    input.value = text || '';
    input.focus();
  } catch (_err) {
    if (error) error.textContent = 'Não consegui ler a área de transferência. Cole a URL manualmente nesse campo.';
    input.focus();
  }
}

async function connectAmazonReturn() {
  let context = accountActionContext();
  const formElement = document.querySelector('#connectForm');
  const input = document.querySelector('#amazonReturnUrl');
  const error = document.querySelector('#formError');
  const hint = document.querySelector('#connectStageHint');
  const button = document.querySelector('#connectAmazonReturn');
  const originalButtonHtml = button?.innerHTML || `${I.check} ${t('connectManually')}`;
  if (error) error.textContent = '';
  const sessionRef = String(input?.value || '').trim();
  if (!sessionRef) {
    if (error) error.textContent = 'Cole a URL de retorno da Amazon antes de conectar.';
    input?.focus();
    return;
  }
  const controller = new AbortController();
  const requestTimer = setTimeout(() => controller.abort(), 120_000);
  try {
    if (button) {
      button.disabled = true;
      button.textContent = 'Conectando...';
    }
    const wasReconnect = Boolean(state.reconnectAccountId);
    if (hint) hint.textContent = wasReconnect ? 'Validando a nova sessão sem alterar a atual...' : 'Salvando sessão e iniciando leitura em background...';
    const form = new FormData();
    form.append('sessionRef', sessionRef);
    const accountId = state.reconnectAccountId || activePendingConnectionAccountId();
    const endpoint = accountId ? `/api/accounts/${accountId}/reconnect` : '/api/accounts';
    const data = await fetchAccountRequest(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${state.token}` },
      body: form,
      signal: controller.signal,
    }).then(async (res) => {
      const payload = await res.json().catch(emptyJsonUnlessStale);
      if (!res.ok) throw new Error(payload.error || 'Erro ao conectar sessão');
      return payload;
    });
    if (context !== accountActionContext()) return;
    state.connectPendingAccountId = wasReconnect ? '' : data.account.id;
    if (wasReconnect) localStorage.removeItem('apply_connect_pending_account');
    else localStorage.setItem('apply_connect_pending_account', data.account.id);
    state.selectedAccountId = data.account.id;
    localStorage.setItem('apply_selected_account', data.account.id);
    const idx = state.accounts.findIndex((account) => account.id === data.account.id);
    if (idx >= 0) state.accounts[idx] = data.account;
    else state.accounts.unshift(data.account);
    // This callback deliberately selected its returned account. Fence all later awaits.
    context = accountActionContext();
    if (wasReconnect) {
      state.reconnectAccountId = '';
      state.signinUrl = '';
      state.serverLogin = { attemptId: '', state: '', needsOtp: false, reason: '', polling: false, timer: null };
      localStorage.removeItem('apply_last_signin_url');
      await load(false);
      if (context !== accountActionContext()) return;
      go('detail', data.account.id);
      applyAlert(t('reconnectSuccess'));
      return;
    }
    if (hint) hint.textContent = 'Sessão salva. Pode anexar os documentos enquanto o painel lê e-mail, rótulo e região.';
    if (formElement) formElement.dataset.accountId = data.account.id;
    await load(false);
    if (context !== accountActionContext()) return;
    const connectedAccount = state.accounts.find((account) => account.id === data.account.id);
    if (data.reused && !isPendingConnectionDocuments(connectedAccount)) {
      state.connectPendingAccountId = '';
      localStorage.removeItem('apply_connect_pending_account');
      go('detail', data.account.id);
      applyAlert('Esta conta Amazon já existia. A sessão foi atualizada na aplicação correta.');
      return;
    }
    renderConnect();
  } catch (err) {
    if (err.code === 'STALE_READ' || context !== accountActionContext()) return;
    if (error) error.textContent = err.name === 'AbortError'
      ? 'A validação excedeu o tempo seguro. A conta não foi alterada; tente novamente.'
      : err.message;
    if (hint) hint.textContent = 'Revise a URL de retorno e tente conectar de novo.';
  } finally {
    clearTimeout(requestTimer);
    if (button && context === accountActionContext()) {
      button.disabled = false;
      button.innerHTML = originalButtonHtml;
    }
  }
}

/* ===================== Ações de conta (preservadas) ===================== */
async function createAccount(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const error = document.querySelector('#formError');
  error.textContent = '';
  try {
    if (state.reconnectAccountId) throw new Error('A reconexão não precisa reenviar documentos. Conclua o login Amazon acima.');
    const form = new FormData(formElement);
    ensureDocumentFiles(form, formElement);
    if (!attachedFile(formElement, 'dlFront') || !attachedFile(formElement, 'dlBack')) {
      throw new Error('Anexe a frente e o verso do Driver license.');
    }
    const stagedAccountId = state.reconnectAccountId || activePendingConnectionAccountId();
    if (!stagedAccountId) throw new Error('Conecte a conta Amazon antes de salvar o Driver license.');
    const agreed = await openAddDisclaimerConfirm();
    if (!agreed) return;
    const endpoint = stagedAccountId ? `/api/accounts/${stagedAccountId}/connection-documents` : '/api/accounts';
    const data = await fetchAccountRequest(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${state.token}` },
      body: form,
    }).then(async (res) => {
      const payload = await res.json().catch(emptyJsonUnlessStale);
      if (res.status === 402 || payload.code === 'no_credits' || payload.error === 'no_credits') {
        document.querySelector('#topupCredits')?.click();
        throw new Error(t('noCredits'));
      }
      if (!res.ok) throw new Error(payload.error || 'Erro ao salvar');
      return payload;
    });
    state.selectedAccountId = data.account.id;
    localStorage.setItem('apply_selected_account', data.account.id);
    state.recentAccountId = data.account.id;
    state.reconnectAccountId = '';
    state.connectPendingAccountId = '';
    localStorage.removeItem('apply_connect_pending_account');
    formElement.reset();
    state.filter = 'all';
    await load(false);
    go('hub', data.account.id);
  } catch (err) {
    error.textContent = err.message;
  }
}

async function saveApplicationData(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const account = selectedAccount();
  if (!account) return;
  if (state.detailLiveReadId === account.id && !account.last_known_status?.application_data) return;
  const operation = beginDetailAction(account.id);
  if (!operation) return;
  const error = document.querySelector('#applicationError');
  if (error) error.textContent = '';
  let saved = false;
  try {
    const confirmed = await showReviewModal(formElement, 'salvar', { signal: operation.controller.signal });
    if (!confirmed || !currentDetailAction(operation)) return;
    showDetailActionBusy(operation, 'detailSaving');
    const form = new FormData(formElement);
    ensureDocumentFiles(form, formElement);
    const savedSnapshot = formSnapshot(formElement);
    applySnapshotToFormData(form, savedSnapshot);
    const response = await fetchAccountRequest(`/api/accounts/${account.id}/application-data`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${state.token}` },
      body: form,
      signal: operation.controller.signal,
    });
    const payload = await response.json();
    if (!currentDetailAction(operation)) return;
    if (!response.ok || payload.account?.id !== account.id) throw new Error('SAVE_NOT_CONFIRMED');
    saved = true;
    clearApplicationDraft(account.id, formElement, savedSnapshot);
    clearReviewPreparation();
    await readDetailAfterAction(operation);
    paintDetailAfterRun({ autoFollow: true });
    showDetailActionFeedback(operation, 'success', 'detailSaved');
  } catch (_error) {
    const message = saved ? 'detailSavedReadFailed' : 'detailSaveUnconfirmed';
    if (currentDetailAction(operation) && error) error.textContent = t(message);
    showDetailActionFeedback(operation, saved ? 'warning' : 'error', message);
  } finally {
    finishDetailAction(operation);
  }
}

function setOcrStatus(message, mode = '') {
  const box = document.querySelector('#ocrStatus');
  if (!box) return;
  box.hidden = !message;
  box.className = `ocr-status ${mode}`.trim();
  box.innerHTML = `${I.scan}<span>${esc(message)}</span>`;
}

function setApplicationFormLocked(locked) {
  state.applicationOcrLoading = locked;
  const form = document.querySelector('#applicationDataForm');
  if (!form) return;
  form.classList.toggle('form-locked', locked);
  form.querySelectorAll('input, button').forEach((el) => {
    el.disabled = locked;
  });
}

function fillApplicationFields(fields = {}) {
  const form = document.querySelector('#applicationDataForm');
  if (!form) return;
  captureApplicationDraft(form);
  const edited = applicationDrafts.get(applicationFormState.get(form)?.accountId) || {};
  const map = {
    firstName: fields.firstName,
    middleName: fields.middleName,
    lastName: fields.lastName,
    address: fields.address,
    city: fields.city,
    state: fields.state,
    postalCode: fields.postalCode,
    driversLicenseNumber: fields.driversLicenseNumber,
    dateOfBirth: fields.dateOfBirth,
    driverLicenseExpirationDate: fields.expirationDate,
  };
  Object.entries(map).forEach(([name, value]) => {
    const input = form.elements[name];
    if (input && !Object.prototype.hasOwnProperty.call(edited, name) && value !== undefined && value !== null && String(value).trim() !== '') input.value = value;
  });
  captureApplicationDraft(form);
}

let activeApplicationOcr = null;
async function runDriverLicenseOcr(form = document.querySelector('#applicationDataForm')) {
  if (!form?.isConnected || (state.applicationOcrLoading && activeApplicationOcr?.form.isConnected)) return;
  const operation = { form, context: accountActionContext() };
  activeApplicationOcr = operation;
  const isCurrent = () => activeApplicationOcr === operation && form.isConnected && operation.context === accountActionContext();
  const front = attachedFile(form, 'dlFront');
  const back = attachedFile(form, 'dlBack');
  if (!front && !back) {
    setOcrStatus('Anexe o Driver license para preencher os dados automaticamente.');
    return;
  }
  setApplicationFormLocked(true);
  setOcrStatus('Lendo o Driver license. Os campos ficam bloqueados durante a leitura…', 'loading');
  const body = new FormData();
  if (front) body.append('dlFront', front);
  if (back) body.append('dlBack', back);
  try {
    const payload = await fetch('/api/ocr/driver-license', {
      method: 'POST',
      headers: { Authorization: `Bearer ${state.token}` },
      body,
    }).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'tente novamente');
      return data;
    });
    if (!isCurrent()) return;
    fillApplicationFields(payload.fields || {});
    const confidence = payload.fields?.confidence ? ` Confiança: ${Math.round(Number(payload.fields.confidence) * 100)}%.` : '';
    setOcrStatus(`Dados lidos do Driver license. Confira antes de salvar ou iniciar.${confidence}`, 'ok');
  } catch (err) {
    if (isCurrent()) setOcrStatus(`Não conseguimos ler o documento: ${err.message}. Você pode preencher manualmente.`, 'error');
  } finally {
    if (isCurrent()) setApplicationFormLocked(false);
    if (activeApplicationOcr === operation) { state.applicationOcrLoading = false; activeApplicationOcr = null; }
  }
}

function setupApplicationTools() {
  const form = document.querySelector('#applicationDataForm');
  if (!form) return;
  // Anexar -> recorte -> grava na hora. Sem Salvar extra.
  ['dlFront', 'dlBack', 'profilePhoto'].forEach((name) => {
    const input = form.querySelector(`#account-doc-${name}`)
      || form.querySelector(`[data-doc-input="${name}"]`)
      || form.elements[name];
    wireCropOnAttach(input, () => {
      void persistCroppedDocument(form, name);
    });
  });
  bindPhotoClear(form, { persist: true });
}

async function persistCroppedDocument(form, name) {
  const account = selectedAccount();
  const file = attachedFile(form, name);
  const input = form?.querySelector(`[data-doc-input="${name}"]`) || form?.elements[name];
  if (!account || !file || !input || !form.isConnected || applicationFormState.get(form)?.accountId !== account.id) return;
  const operation = { context: accountActionContext() };
  documentUploads.set(input, operation);
  const isCurrent = () => documentUploads.get(input) === operation && operation.context === accountActionContext() && form.isConnected;
  const error = document.querySelector('#applicationError');
  if (error) error.textContent = '';
  const localUrl = URL.createObjectURL(file);
  documentObjectUrls.add(localUrl);
  paintDocumentSlot(form, name, localUrl, 'docSaving');
  const body = new FormData();
  body.append('image', file);
  if (name === 'profilePhoto') {
    const kind = photoKindByInput.get(input) || input?.dataset?.photoKind || form?.querySelector?.('input[name="photoKind"]')?.value;
    if (kind === 'original' || kind === 'reference') body.append('photoKind', kind);
  }
  try {
    const response = await fetchAccountRequest(`/api/accounts/${account.id}/file/${name}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${state.token}` },
      body,
    });
    const payload = await response.json().catch(emptyJsonUnlessStale);
    if (!isCurrent()) return;
    if (!response.ok || (payload.account?.id && payload.account.id !== account.id)) throw new Error(payload.error || 'Não deu para salvar o arquivo.');
    if (payload.account?.id === account.id) {
      const idx = state.accounts.findIndex((row) => row.id === account.id);
      if (idx >= 0) state.accounts[idx] = { ...state.accounts[idx], ...payload.account };
    }
    if (name === 'dlFront' || name === 'dlBack') await runDriverLicenseOcr(form);
    if (!isCurrent()) return;
    stagedInputFiles.delete(input);
    try { input.value = ''; } catch (_e) { /* keep preview */ }
    paintDocumentSlot(form, name, `/api/accounts/${account.id}/file/${name}?t=${Date.now()}`, 'docSent');
    URL.revokeObjectURL(localUrl);
    documentObjectUrls.delete(localUrl);
  } catch (err) {
    if (!isCurrent()) return;
    paintDocumentSlot(form, name, localUrl, 'docUnsaved');
    if (error) error.textContent = err.message;
  } finally {
    if (!isCurrent()) { URL.revokeObjectURL(localUrl); documentObjectUrls.delete(localUrl); }
  }
}





async function enableSsnNotFoundBypass() {
  const account = selectedAccount();
  const error = document.querySelector('#applicationError');
  if (error) error.textContent = '';
  if (!account) return;
  const button = document.querySelector('[data-enable-ssn-bypass]');
  if (button) {
    button.disabled = true;
    button.innerHTML = `${I.clock} Ativando...`;
  }
  try {
    const form = document.querySelector('#applicationDataForm');
    if (form) await saveApplicationDataForStart(form, account.id);
    const dlNumber = form?.querySelector('input[name="driversLicenseNumber"]')?.value || '';
    await api(`/api/accounts/${account.id}/ssn-not-found-bypass`, {
      method: 'POST',
      body: JSON.stringify({ driversLicenseNumber: dlNumber }),
    });
    await load(false);
    renderDetail();
    setOcrStatus('Pronto. Os antecedentes seguem com um SSN provisório e o pagamento fica pendente até você informar o SSN real.', 'ok');
  } catch (err) {
    if (error) error.textContent = err.message;
    if (button) {
      button.disabled = false;
      button.innerHTML = `${I.play} ${t('startWithoutSsn')}`;
    }
  }
}

async function persistApplicationDataForStart(accountId, formElement, snapshot) {
  const snap = snapshot || formSnapshot(formElement);
  if (!formElement && !snap) return;
  const form = formElement ? new FormData(formElement) : new FormData();
  if (formElement) ensureDocumentFiles(form, formElement);
  applySnapshotToFormData(form, snap);
  if (![...form.keys()].length) return;
  await fetchAccountRequest(`/api/accounts/${accountId}/application-data`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${state.token}` },
    body: form,
  }).then(async (res) => {
    const payload = await res.json().catch(emptyJsonUnlessStale);
    if (!res.ok) throw new Error(payload.error || 'Erro ao salvar dados');
    if (payload.account?.id === accountId) clearApplicationDraft(accountId, formElement, snap);
    return payload;
  });
  if (accountId === state.selectedAccountId) clearReviewPreparation();
}

async function saveApplicationDataForStart(formElement, accountId) {
  return persistApplicationDataForStart(accountId, formElement, formSnapshot(formElement));
}

function bindSelfieSkipWarn(root) {
  if (!root) return;
  const input = root.querySelector('[name="profilePhoto"]');
  const warn = root.querySelector('[data-selfie-skip-warn]');
  if (!input || !warn) return;
  const sync = () => {
    const hasFile = Boolean(attachedFile(root, 'profilePhoto'));
    const hasImg = Boolean(root.querySelector('[data-preview="profilePhoto"] img'));
    warn.hidden = hasFile || hasImg;
  };
  input.addEventListener('change', sync);
  sync();
}

function photoSlotIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>';
}

function photoClearButton(hidden) {
  return `<button type="button" class="photo-clear" data-clear-photo="profilePhoto"${hidden ? ' hidden' : ''} aria-label="${esc(t('removePhoto'))}" title="${esc(t('removePhoto'))}">${docIcon(I.trash)}</button>`;
}

function docIcon(svg) { return svg.replace('<svg ', '<svg aria-hidden="true" focusable="false" '); }
function documentSlotHtml(name, src, label, downloadUrl = src) {
  const aria = key => `aria-label="${esc(t(key))}" title="${esc(t(key))}"`;
  const attach = `<button type="button" class="doc-attach" data-doc-attach="${name}" ${aria('docAttach')}><span class="ph">${docIcon(I.upload)}<span>${esc(t('docAttach'))}</span></span></button>`;
  return `<div class="doc-preview" data-preview="${name}">${src ? `<span class="doc-shot"><img src="${esc(src)}" alt="${esc(label)}" loading="lazy" />${name === 'profilePhoto' ? photoClearButton(false) : ''}</span>` : attach}</div>${src ? `<div class="doc-actions"><a class="doc-action" href="${esc(src)}" target="_blank" rel="noopener" ${aria('docView')}>${docIcon(I.eye)}</a><a class="doc-action" href="${esc(downloadUrl)}" ${aria('docDownload')}>${docIcon(I.download)}</a><button type="button" class="doc-action replace" data-doc-attach="${name}" ${aria('docReplace')}>${docIcon(I.upload)}</button></div>` : ''}`;
}

const documentUploads = new WeakMap();
const documentObjectUrls = new Set();
function clearDocumentPreviews() {
  documentObjectUrls.forEach(url => URL.revokeObjectURL(url));
  documentObjectUrls.clear();
}
function paintDocumentSlot(form, name, src, status = 'docSent') {
  const input = form?.elements[name];
  const doc = input?.closest('.account-doc');
  const wrap = doc?.querySelector('.doc-preview-wrap');
  if (!wrap) return;
  const label = doc.querySelector('.top b')?.textContent || '';
  const accountId = applicationFormState.get(form)?.accountId;
  const download = status === 'docSent' ? `/api/accounts/${accountId}/file/${name}?download=1` : src;
  wrap.innerHTML = documentSlotHtml(name, src, label, download);
  doc.classList.toggle('ok', status === 'docSent');
  doc.querySelector('.tag').textContent = t(status);
  wrap.setAttribute('aria-busy', String(status === 'docSaving'));
  wrap.querySelectorAll('button').forEach(button => { button.disabled = status === 'docSaving'; });
  if (name === 'profilePhoto') markPhotoPresent(form, Boolean(src));
  bindPhotoClear(form, { persist: true });
}

function markPhotoPresent(root, present) {
  if (!root) return;
  const box = root.querySelector('[data-preview="profilePhoto"]');
  const wrap = box?.closest('.doc-preview-wrap');
  const doc = box?.closest('.doc');
  wrap?.classList.toggle('has-photo', present);
  doc?.classList.toggle('has-photo', present);
  const btn = root.querySelector('[data-clear-photo="profilePhoto"]');
  if (btn) btn.hidden = !present;
}

function emptyProfilePhotoPreview(root) {
  if (!root) return;
  const box = root.querySelector('[data-preview="profilePhoto"]');
  const input = root.querySelector('[name="profilePhoto"]') || root.querySelector('[data-doc-input="profilePhoto"]');
  if (input) {
    stagedInputFiles.delete(input);
    try { input.value = ''; } catch (_e) { /* keep going */ }
  }
  if (box) {
    if (box.classList.contains('upload-zone')) {
      box.innerHTML = `<span class="ph">${photoSlotIcon()}</span><span class="upload-copy">${t('attach')}</span>`;
    } else {
      box.innerHTML = `<span class="ph">${I.upload}<span>Anexar arquivo</span></span>`;
    }
  }
  const doc = box?.closest('.doc');
  if (doc) {
    doc.classList.remove('ok');
    const tag = doc.querySelector('.tag');
    if (tag) tag.textContent = 'Pendente';
  }
  markPhotoPresent(root, false);
  const warn = root.querySelector('[data-selfie-skip-warn]');
  if (warn) warn.hidden = false;
  const ocr = document.querySelector('#ocrStatus span');
  if (ocr && root.id === 'applicationDataForm') ocr.textContent = t('attachDocs');
}

function bindPhotoClear(root, { persist = false } = {}) {
  if (!root) return;
  root.querySelectorAll('[data-clear-photo]').forEach((btn) => {
    if (btn.dataset.clearWired) return;
    btn.dataset.clearWired = '1';
    btn.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (btn.disabled) return;
      if (!persist) {
        emptyProfilePhotoPreview(root);
        bindSelfieSkipWarn(root);
        return;
      }
      const account = selectedAccount();
      const error = document.querySelector('#applicationError');
      if (error) error.textContent = '';
      if (!account) {
        emptyProfilePhotoPreview(root);
        return;
      }
      btn.disabled = true;
      const target = accountActionContext();
      try {
        if (!await openApplyModal({ title: t('removePhoto'), message: t('removePhotoConfirm'), confirmText: t('removePhoto'), cancelText: t('cancel'), danger: true })) return;
        if (target !== accountActionContext() || !root.isConnected) return;
        const response = await fetchAccountRequest(`/api/accounts/${account.id}/file/profilePhoto`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${state.token}` },
        });
        const payload = await response.json().catch(() => ({}));
        if (target !== accountActionContext() || !root.isConnected) return;
        if (!response.ok) throw new Error(payload.error || 'Não deu para remover a foto.');
        const idx = state.accounts.findIndex((row) => row.id === account.id);
        if (idx >= 0) {
          state.accounts[idx] = { ...state.accounts[idx], ...(payload.account || {}), profile_photo_path: null };
        }
        emptyProfilePhotoPreview(root);
        clearReviewPreparation();
        paintDocumentSlot(root, 'profilePhoto', '', 'docPending');
        paintDetailProgress(selectedAccount());
        root.querySelector('[data-doc-attach="profilePhoto"]')?.focus();
        return;
      } catch (err) {
        if (target === accountActionContext() && root.isConnected && error) error.textContent = err.message;
      } finally {
        btn.disabled = false;
        if (btn.isConnected && target === accountActionContext()) btn.focus();
      }
    });
  });
}

function isSelfieContinue(account) {
  if (!account || !isUnifiedIdentityAccount(account)) return false;
  if (!account.profile_photo_path) return false;
  if (isDlResend(account)) return false;
  const selfie = String(stepStatusFromMap(accountStepStatuses(account), 'id_selfie') || '');
  if (['action_required', 'blocked', 'failed', 'error'].includes(selfie)) return true;
  return selfie === 'pending';
}

function needsCreditForNewConnect() {
  return state.user?.role !== 'admin' && !activePendingConnectionAccountId() && Number(state.user?.credits || 0) < 1;
}

function isDlResend(account) {
  if (!account) return false;
  const status = String(stepStatusFromMap(accountStepStatuses(account), 'id_verification') || stepStatusFromMap(accountStepStatuses(account), 'driver_license') || '');
  return ['action_required', 'blocked', 'failed', 'error'].includes(status);
}

async function startRun(accountId) {
  const operation = beginDetailAction(accountId);
  if (!operation) return;
  operation.kind = 'start';
  try { await performStartRun(accountId, operation); }
  finally {
    const current = currentDetailAction(operation);
    finishDetailAction(operation);
    if (current && operation.confirmed) paintDetailProgress(selectedAccount());
  }
}
async function performStartRun(accountId, operation) {
  if (!accountId) return;
  const target = accountActionContext();
  const isTarget = () => target === accountActionContext();
  const formElement = document.querySelector('#applicationDataForm');
  const snapshot = formSnapshot(formElement);
  const error = document.querySelector('#applicationError');
  if (error) error.textContent = '';
  const account = selectedAccount();
  const selfieOnly = isSelfieContinue(account);
  const dlResend = isDlResend(account);
  if (accountHasPostReviewRefusal(account) && account.profile_photo_path && (!reviewPreparation || !currentReviewPreparation(reviewPreparation) || !['complete', 'not_required'].includes(reviewPreparation.status))) {
    syncReviewPreparation(account);
    return;
  }
  const confirmed = await showReviewModal(formElement, 'iniciar a aplicação', { signal: operation.controller.signal });
  if (!confirmed || !isTarget()) return;
  operation.confirmed = true;
  paintDetailProgress(account);
  const buttons = [...document.querySelectorAll('[data-start]')];
  buttons.forEach((button) => {
    button.disabled = true;
    button.dataset.prevHtml = button.innerHTML;
    button.innerHTML = `<span class="spinner"></span> ${esc(dpText('requesting'))}`;
  });
  state.trackerOpen = true;
  document.querySelector('#tracker')?.classList.add('open');
  const box = document.querySelector('#runProgress') || document.querySelector('#tracker .tlog-in');
  if (box) box.innerHTML = `<p class="muted" style="font-size:13px;margin:0">${I.clock} ${esc(dpText('requesting'))}</p>`;
  try {
    if (!selfieOnly) await persistApplicationDataForStart(accountId, formElement, snapshot);
    if (!isTarget()) return;
    if (box) box.innerHTML = `<p class="muted" style="font-size:13px;margin:0">${I.clock} ${esc(dpText('requesting'))}</p>`;
    const startBody = selfieOnly ? { from_step: 'selfie' } : dlResend ? { from_step: 'id_verification' } : {};
    const ssnAtStart = String(snapshot?.ssn || '').replace(/\D/g, '');
    if (!selfieOnly && ssnAtStart.length === 9) startBody.ssn = ssnAtStart;
    const result = await api(`/api/accounts/${accountId}/start`, {
      method: 'POST',
      body: JSON.stringify(startBody),
    });
    if (!isTarget()) return;
    if (result?.run?.id) {
      const current = selectedAccount();
      current.apply_runs = [result.run,...(current.apply_runs || []).filter(run=>run.id!==result.run.id)];
      operation.accepted = true;
      operation.runId = result.run.id;
      detailProgressRead = null;
      paintDetailProgress(current);
    }
    await readDetailAfterAction(operation);
    if (!isTarget()) return;
    renderDetail();
    const runId = result?.run?.id || selectedAccount()?.apply_runs?.[0]?.id;
    if (runId) showRun(runId);
  } catch (err) {
    if (!isTarget()) return;
    // A timeout/error does not prove the action did nothing. Re-read; never resend.
    try { await readDetailAfterAction(operation); } catch (_) { /* Preserve the accepted attempt; never resend on a read failure. */ }
    if (!isTarget()) return;
    renderDetail();
    if (operation.accepted && operation.runId) {
      showRun(operation.runId);
      return;
    }
    const noCredits = String(err.message || '') === 'no_credits';
    const currentError = document.querySelector('#applicationError') || error;
    if (currentError) currentError.textContent = noCredits ? t('noCredits') : err.message;
    else if (!noCredits) throw err;
    if (noCredits) document.querySelector('#topupCredits')?.click();
    buttons.forEach((button) => {
      button.disabled = false;
      if (button.dataset.prevHtml) button.innerHTML = button.dataset.prevHtml;
    });
    const currentBox = document.querySelector('#runProgress') || document.querySelector('#tracker .tlog-in');
    if (currentBox) currentBox.innerHTML = `<p class="muted" style="font-size:13px;margin:0">${esc(noCredits ? t('noCredits') : err.message)}</p>`;
  }
}

function latestRunShouldFollow(account, latest) {
  const runStatus = String(latest?.status || '');
  if (['queued', 'running'].includes(runStatus)) return true;
  if (runStatus !== 'pending_review') return false;
  const keys = onboardingStepsFor(account).map((row) => row[0]);
  const map = accountStepStatuses(account);
  const reviewIdx = keys.findIndex((key) => isReviewStepStatus(stepStatusFromMap(map, key)));
  if (reviewIdx < 0) return true;
  return keys.some((key, i) => i > reviewIdx && String(stepStatusFromMap(map, key) || '') === 'queued');
}

function paintDetailAfterRun({ autoFollow = false } = {}) {
  const main = document.querySelector('.main');
  const y = main ? main.scrollTop : 0;
  renderDetail({ autoFollow });
  if (main) main.scrollTop = y;
}

let pollGen = 0;
let displayedRunHistory = null;
function historyCopy(key) {
  const copy = {
    'pt-BR': { title: 'Histórico desta tentativa', more: 'Ver mais', loading: 'Carregando…', empty: 'Nenhuma atualização registrada.', error: 'Histórico indisponível no momento.' },
    'en-US': { title: 'History of this attempt', more: 'Show more', loading: 'Loading…', empty: 'No updates recorded.', error: 'History is temporarily unavailable.' },
    'es-CO': { title: 'Historial de este intento', more: 'Ver más', loading: 'Cargando…', empty: 'No hay actualizaciones registradas.', error: 'El historial no está disponible en este momento.' },
  };
  return (copy[state.locale] || copy['pt-BR'])[key];
}
function historyIsCurrent(history) {
  return history === displayedRunHistory && history.gen === pollGen
    && history.accountId === state.selectedAccountId && history.token === state.token
    && history.view === state.view && history.user === JSON.stringify([state.user?.id, state.user?.role]);
}
function runHistoryFor(runId, gen) {
  const previous = displayedRunHistory;
  const identity = { runId, gen, accountId: state.selectedAccountId, token: state.token, view: state.view, user: JSON.stringify([state.user?.id, state.user?.role]) };
  const same = previous && ['runId', 'accountId', 'token', 'view', 'user'].every(key => previous[key] === identity[key]);
  if (same && previous.gen === gen) return previous;
  displayedRunHistory = { ...(same ? previous : { events: [], cursor: null, expanded: false, error: false }), ...identity, loading: false };
  return displayedRunHistory;
}
function mergeHistoryEvents(newRows, previousRows) {
  const seen = new Set();
  return [...newRows, ...previousRows].filter((row, index) => {
    const key = row.id || `${row.created_at}:${row.message_key}:${index}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function paintRunHistory(history) {
  const box = document.querySelector('#runProgress');
  if (!box || !historyIsCurrent(history)) return;
  const rows = history.events.length
    ? `<div class="events">${history.events.map(ev => `<div class="ev" data-event-id="${esc(ev.id || '')}"><span class="ed"></span><div>${esc(humanEventDetail(ev))}<div class="et">${fmtDate(ev.created_at)}</div></div></div>`).join('')}</div>`
    : history.error ? '' : `<p class="muted">${esc(historyCopy('empty'))}</p>`;
  const html = `<div class="ck-divider-label">${esc(historyCopy('title'))}</div>${rows}`
    + (history.error ? `<p class="muted" role="status">${esc(historyCopy('error'))}</p>` : '')
    + (history.cursor ? `<button type="button" class="btn" data-history-more ${history.loading ? 'disabled' : ''}>${esc(historyCopy(history.loading ? 'loading' : 'more'))}</button>` : '');
  if (box.dataset.fp === html) return;
  box.innerHTML = html;
  box.dataset.fp = html;
  box.querySelector('[data-history-more]')?.addEventListener('click', () => loadMoreRunHistory(history));
}
async function loadMoreRunHistory(history) {
  if (!historyIsCurrent(history) || history.loading || !history.cursor) return;
  history.loading = true;
  paintRunHistory(history);
  try {
    const data = await api(`/api/runs/${history.runId}?events_cursor=${encodeURIComponent(history.cursor)}`);
    if (!historyIsCurrent(history)) return;
    if (data.run?.id !== history.runId || data.account_id !== history.accountId || data.events_error) throw new Error('history unavailable');
    history.events = mergeHistoryEvents(history.events, data.events || []);
    history.cursor = data.events_has_more === true ? data.events_next_cursor || null : null;
    history.expanded = true;
    history.error = false;
  } catch (_) {
    if (historyIsCurrent(history)) history.error = true;
  } finally {
    if (historyIsCurrent(history)) { history.loading = false; paintRunHistory(history); }
  }
}

function showRun(runId, opts = {}) {
  const follow = opts.follow !== false;
  pollGen += 1;
  return pollRun(runId, pollGen, { follow });
}

function mergeCurrentStepEvidence(previousSteps = {}, nextSteps = {}) {
  const steps = { ...previousSteps };
  for (const [key, value] of Object.entries(nextSteps)) {
    const step = typeof value === 'string' ? { status: value } : value;
    const previous = steps[key];
    const previousTime = Date.parse(previous?.updated_at || previous?.finished_at || '') || 0;
    const nextTime = Date.parse(step?.updated_at || step?.finished_at || '') || 0;
    if (previous && previousTime && nextTime < previousTime) continue;
    if (previous && !nextTime && previous.status !== step?.status) continue;
    steps[key] = step;
  }
  return steps;
}

function accountStepReferences() {
  return new Map(state.accounts.map(account => [account.id, account.last_known_status?.application_steps]));
}
function currentAccountRead(data) {
  return accountReadEvidence.get(data)?.context === accountReadContext();
}
function sameStepEvidence(previous, next) {
  if (previous === next) return true;
  if (!previous || !next) return false;
  const before = typeof previous === 'string' ? { status: previous } : previous;
  const after = typeof next === 'string' ? { status: next } : next;
  return ['status', 'detail', 'updated_at', 'finished_at'].every(key => (before[key] || '') === (after[key] || ''));
}
function preserveConcurrentAccountSteps(current, next, reference, readSequence, observedSteps = next.last_known_status?.application_steps || {}) {
  const currentSteps = current?.last_known_status?.application_steps || {};
  const application_steps = { ...(next.last_known_status?.application_steps || {}) };
  const currentVersions = accountStepReadVersions.get(currentSteps);
  const versions = new Map();
  // Fence only steps actually changed since this GET began. A fresh source read
  // may legitimately have an older profile clock than a local attempt failure.
  // Transport order also lets a later GET supersede an older poll that arrived first.
  for (const key of new Set([...Object.keys(reference || {}), ...Object.keys(currentSteps), ...Object.keys(application_steps)])) {
    const currentVersion = currentVersions?.get(key) || 0;
    const preserveCurrent = currentVersion > readSequence || (current && !currentVersion && !sameStepEvidence(currentSteps[key], reference?.[key]));
    if (preserveCurrent) {
      if (Object.prototype.hasOwnProperty.call(currentSteps, key)) application_steps[key] = currentSteps[key];
      else delete application_steps[key];
    }
    // An unchanged confirmation is still newer evidence; locally retained steps are not.
    const observed = sameStepEvidence(application_steps[key], observedSteps[key]);
    versions.set(key, !preserveCurrent && observed ? readSequence : currentVersion);
  }
  accountStepReadVersions.set(application_steps, versions);
  return { ...next, last_known_status: { ...(next.last_known_status || {}),
    application_steps } };
}

async function pollRun(runId, gen, opts = {}) {
  const follow = opts.follow !== false;
  const targetId = state.selectedAccountId;
  const targetToken = state.token;
  const targetView = state.view;
  const targetUser = JSON.stringify([state.user?.id, state.user?.role]);
  const runReference = selectedAccount()?.apply_runs;
  const isTarget = () => gen === pollGen && targetId === state.selectedAccountId
    && targetToken === state.token && targetView === state.view
    && targetUser === JSON.stringify([state.user?.id, state.user?.role]);
  let data;
  try {
    data = await api(`/api/runs/${runId}`);
  } catch (_err) {
    const current = selectedAccount();
    const read = current && detailReadFor(current);
    if (isTarget() && current && latestRun(current)?.id===runId) {
      if (read) read.readError=true;
      else detailProgressRead={context:accountActionContext(),accountId:current.id,run:latestRun(current),steps:[],receivedAt:null,readError:true};
      paintDetailProgress(current);
    }
    if (isTarget()) setTimeout(() => { if (isTarget()) pollRun(runId, gen, { follow }); }, 1200);
    return;
  }
  const box = document.querySelector('#runProgress');
  if (!box || !isTarget() || !currentAccountRead(data)) return;
  if (data.run?.id !== runId) return;
  if (data.account_id ? data.account_id !== targetId : !selectedAccount()?.apply_runs?.some(run => run.id === runId)) return;
  const runSteps = data.steps || [];
  const account = selectedAccount();
  if (account && account.apply_runs === runReference) {
    // Do not overwrite a newer account read while this poll was in flight.
    account.apply_runs = account.apply_runs.map(run => run.id === runId ? { ...run, ...data.run } : run);
  }
  if (account && data.current_steps && data.account_id === account.id) {
    const merged = mergeCurrentStepEvidence(account.last_known_status?.application_steps, data.current_steps);
    const candidate = { ...account, last_known_status: { ...account.last_known_status, application_steps: merged } };
    const reference = accountReadEvidence.get(data)?.steps?.get(account.id);
    const application_steps = preserveConcurrentAccountSteps(account, candidate, reference, accountReadEvidence.get(data).sequence, data.current_steps).last_known_status.application_steps;
    account.last_known_status = { ...(account.last_known_status || {}), application_steps };
  }
  rememberDetailRun(account,data);
  syncReviewPreparation(account);
  const stepper = document.querySelector('#trackerStepper');
  if (stepper) {
    const html = renderStepperNodes(account);
    if (stepper.dataset.fp !== html) {
      stepper.innerHTML = html;
      stepper.dataset.fp = html;
    }
  }
  const currentStep = pickCurrentRunStep(Object.entries(accountStepStatuses(account)).map(([step_key, step]) => ({ step_key, ...step })));
  const current = document.querySelector('#trackerCurrent');
  if (current && currentStep) current.textContent = onboardingStepLabel(currentStep.step_key, currentStep.label);
  paintDetailProgress(account);
  const history = runHistoryFor(runId, gen);
  history.error = Boolean(data.events_error);
  if (!history.error) {
    history.events = history.expanded ? mergeHistoryEvents(data.events || [], history.events) : data.events || [];
    if (!history.expanded) history.cursor = data.events_has_more === true ? data.events_next_cursor || null : null;
  }
  paintRunHistory(history);
  const runStatus = String(data.run?.status || '');
  const reviewStep = runSteps.find((step) => ['pending_review', 'review'].includes(String(step.status || '')));
  const queuedAfterReview = Boolean(reviewStep && runSteps.some((step) => (
    String(step.status || '') === 'queued'
    && Number(step.sort_order || 0) > Number(reviewStep.sort_order || 0)
  )));
  const stillGoing = ['queued', 'running'].includes(runStatus)
    || (runStatus === 'pending_review' && queuedAfterReview);
  if (stillGoing) {
    setTimeout(() => { if (isTarget()) pollRun(runId, gen, { follow }); }, 900);
    return;
  }
  if (!follow) return;
  try { await refreshDetailAccount(targetId); } catch (_err) { /* keep last paint */ }
  if (!isTarget()) return;
  paintDetailAfterRun();
}

function logout() {
  detailProgressRead = null;
  applicationDrafts.clear();
  applicationDraftIdentity = '';
  panelAuthEpoch += 1;
  cancelPanelLogin();
  cancelDetailAction();
  accountVisitEpoch += 1;
  invalidateAccountReads();
  closeTopupModal();
  clearPosePreviews();
  localStorage.removeItem('apply_token');
  localStorage.removeItem('apply_selected_account');
  state.token = null;
  state.user = null;
  state.accounts = [];
  state.accountsLoadedAt = '';
  state.users = [];
  state.opsLoading = false;
  state.opsError = false;
  opsDataRead = null;
  state.budgets = state.budgets.map(item => ({ ...item, value: '—', percent: 0, status: 'loading' }));
  state.budgetsUpdatedAt = '';
  state.panelReadError = false;
  state.selectedAccountId = '';
  state.view = 'hub';
  renderLogin();
}

let creditWatchTimer = 0;
async function refreshCredits() {
  if (!state.token || !state.user) return null;
  try {
    const data = await api('/api/credits');
    const next = Number(data?.credits || 0);
    if (Number(state.user.credits || 0) !== next) {
      state.user.credits = next;
      renderApp();
    }
    return next;
  } catch {
    return null;
  }
}
function watchCreditsAfterTopup(from) {
  const started = Number(from || 0);
  let ticks = 0;
  window.clearInterval(creditWatchTimer);
  creditWatchTimer = window.setInterval(async () => {
    ticks += 1;
    const now = await refreshCredits();
    if (now != null && now > started) {
      window.clearInterval(creditWatchTimer);
      creditWatchTimer = 0;
    }
    if (ticks >= 90) {
      window.clearInterval(creditWatchTimer);
      creditWatchTimer = 0;
    }
  }, 2000);
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') refreshCredits();
});
window.addEventListener('focus', () => { refreshCredits(); });


let quietPanelRetry = 0;
function scheduleQuietPanelRetry() {
  if (quietPanelRetry) return;
  quietPanelRetry = window.setTimeout(() => {
    quietPanelRetry = 0;
    if (!state.token || !state.accountsLoadedAt || state.view === 'connect') return;
    load(false).then((ok) => {
      if (!ok || state.view !== 'hub') return;
      renderHub();
    });
  }, 8000);
}

function showPanelReadError() {
  state.panelReadError = true;
  document.querySelector('#panelReadError')?.remove();
  const notice = document.createElement('div');
  notice.id = 'panelReadError';
  notice.className = 'detail-action-feedback warning';
  notice.setAttribute('role', 'alert');
  notice.innerHTML = `<p>${esc(t('panelReadFailed'))}</p><button class="btn secondary sm" type="button" data-retry-panel>${esc(t('panelTryAgain'))}</button>`;
  notice.querySelector('[data-retry-panel]').addEventListener('click', () => load());
  if (!document.querySelector('.shell')) {
    app.innerHTML = `<section class="login-shell"><div class="login-card"><h1>Apex Apply</h1><p>${esc(t('panelReadFailed'))}</p></div></section>`;
  }
  document.body.appendChild(notice);
}

async function load(draw = true, options = {}) {
  let context = accountReadContext();
  const previousIdentity = JSON.stringify([state.token, state.user?.id, state.user?.role]);
  try {
    const me = await api('/api/me', options);
    if (context !== accountReadContext()) return;
    state.user = me.user || null;
    context = accountReadContext();
    if (!state.accountsLoadedAt) state.accountsLoading = true;
    if (draw && (!document.querySelector('.shell') || state.accountsLoading)) renderApp();
    const accountsRead = api('/api/accounts?include_archived=1', options);
    if (state.user?.role === 'admin') loadOpsInBackground();
    else { state.budgets = []; state.users = []; state.budgetsUpdatedAt = ''; }
    const data = await accountsRead;
    if (context !== accountReadContext() || !currentAccountRead(data)) return;
    const readSteps = accountReadEvidence.get(data).steps;
    const sameIdentity = previousIdentity === JSON.stringify([state.token, state.user?.id, state.user?.role]);
    const known = new Map(sameIdentity ? state.accounts.map(account => [account.id, account]) : []);
    state.accounts = (data.accounts || []).map(account => preserveConcurrentAccountSteps(known.get(account.id), account, readSteps.get(account.id), accountReadEvidence.get(data).sequence));
    syncPendingConnectionAccount();
    const selectableAccountIds = new Set(state.accounts.filter((account) => accStatus(account) !== 'archived').map((account) => account.id));
    state.archiveSelection = new Set([...state.archiveSelection].filter((id) => selectableAccountIds.has(id)));
    state.accountsLoadedAt = new Date().toISOString();
    state.accountsLoading = false;
    if (!state.accounts.some((account) => account.id === state.selectedAccountId)) {
      state.selectedAccountId = state.accounts[0]?.id || '';
      if (state.selectedAccountId) localStorage.setItem('apply_selected_account', state.selectedAccountId);
    }
    state.panelReadError = false;
    document.querySelector('#panelReadError')?.remove();
    if (draw) renderApp();
    return true;
  } catch (_err) {
    if (_err.code === 'STALE_READ' || context !== accountReadContext()) return;
    if (!state.accountsLoadedAt) state.accountsLoading = false;
    if (_err.status === 401) logout();
    else if (!state.accountsLoadedAt) {
      if (document.querySelector('.shell') && state.view === 'hub') renderHub();
      showPanelReadError();
    }
    else scheduleQuietPanelRetry();
    return false;
  }
}

/* ===================== Navegação ===================== */
function closeGlobalMenu(node, restore = false) {
  node.open = false;
  if (restore) node.querySelector(':scope > summary')?.focus();
}
document.addEventListener('keydown', event => {
  const menu = event.target.closest('.global-account[open], .global-admin[open]');
  if (menu && event.key === 'Escape') { event.preventDefault(); closeGlobalMenu(menu, true); return; }
  const tab = event.target.closest('[data-detail-tab]');
  if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const tabs = [...document.querySelectorAll('[data-detail-tab]')];
  const index = tabs.indexOf(tab);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  applyDetailTab(tabs[next].dataset.detailTab);
  tabs[next].focus();
});
document.addEventListener('focusin', event => {
  document.querySelectorAll('.global-account[open], .global-admin[open]').forEach(node => {
    if (!node.contains(event.target)) closeGlobalMenu(node);
  });
});
document.addEventListener('click', event => {
  document.querySelectorAll('.global-account[open], .global-admin[open]').forEach(node => {
    if (!node.contains(event.target)) closeGlobalMenu(node, node.contains(document.activeElement));
  });
  const attach = event.target.closest('[data-doc-attach]');
  if (attach) {
    event.preventDefault();
    const input = document.getElementById(`account-doc-${attach.dataset.docAttach}`);
    if (!attach.disabled && input && !input.disabled) input.click();
  }
});
function go(viewName, id) {
  captureApplicationDraft();
  if (viewName !== state.view || (id && id !== state.selectedAccountId)) {
    cancelDetailAction();
    accountVisitEpoch += 1;
    invalidateAccountReads();
  }
  const fromDetail = state.view === 'detail';
  if (viewName !== 'connect' && state.reconnectAccountId) {
    const attemptId = state.serverLogin.attemptId;
    stopServerLoginPolling();
    state.serverLogin = { attemptId: '', state: '', needsOtp: false, reason: '', polling: false, timer: null };
    if (attemptId) api(`/api/amazon-server-login/${attemptId}`, { method: 'DELETE' }).catch(() => {});
  }
  state.view = viewName;
  if (viewName !== 'connect') state.reconnectAccountId = '';
  if (viewName === 'connect' && !id) {
    state.reconnectAccountId = '';
    syncPendingConnectionAccount();
    if (state.connectPendingAccountId) state.signinUrl = '';
  }
  if (viewName === 'detail') state.trackerOpen = false;
  if (id && id !== state.selectedAccountId) state.detailTab = 'documents';
  if (id) {
    state.selectedAccountId = id;
    localStorage.setItem('apply_selected_account', id);
  }
  if (viewName === 'hub' && fromDetail) {
    load(false).then(() => {
      if (state.view !== 'hub') return;
      renderApp();
      window.scrollTo(0, 0);
    }).catch(() => {
      renderApp();
      window.scrollTo(0, 0);
    });
    return;
  }
  renderApp();
  window.scrollTo(0, 0);
  if (viewName === 'detail' && state.selectedAccountId) {
    const accountId = state.selectedAccountId;
    const gen = accountVisitEpoch;
    state.detailLiveReadId = accountId;
    if (!state.accounts.find((account) => account.id === accountId)?.last_known_status?.application_data) renderDetail();
    refreshDetailAccount(accountId).then(() => {
      if (gen !== accountVisitEpoch || state.view !== 'detail' || state.selectedAccountId !== accountId) return;
      state.detailLiveReadId = '';
      renderDetail();
    }).catch(() => {
      if (gen === accountVisitEpoch && state.detailLiveReadId === accountId) state.detailLiveReadId = '';
    });
  }
}

document.addEventListener('click', (event) => {
  const nav = event.target.closest('[data-nav]');
  if (nav) { event.preventDefault(); go(nav.dataset.nav); return; }
  const vMap = event.target.closest('[data-vacancy-map]');
  if (vMap) {
    event.preventDefault();
    state.showVacancyMap = !state.showVacancyMap;
    if (state.view === 'vacancies') renderVacancies();
    return;
  }
  const vMode = event.target.closest('[data-vacancy-mode]');
  if (vMode) {
    event.preventDefault();
    const mode = vMode.dataset.vacancyMode;
    if (['free', 'all'].includes(mode)) {
      state.vacancyMode = mode;
      if (state.view === 'vacancies') renderVacancies();
    }
    return;
  }
  const vFree = event.target.closest('[data-vacancy-free]');
  if (vFree) {
    event.preventDefault();
    const [city, stateName] = String(vFree.dataset.vacancyFree || '').split('||');
    claimFreeVacancy(city, stateName);
    return;
  }
  const vBuy = event.target.closest('[data-vacancy-buy]');
  if (vBuy) {
    event.preventDefault();
    const [city, stateName] = String(vBuy.dataset.vacancyBuy || '').split('||');
    buyVacancy(city, stateName);
    return;
  }
  const vSave = event.target.closest('[data-vacancy-save]');
  if (vSave) { event.preventDefault(); saveVacancyPrices(vSave); return; }
  const vList = event.target.closest('[data-vacancy-list]');
  if (vList) { event.preventDefault(); copyVacancyShareList(vList); return; }
  const vRetry = event.target.closest('[data-vacancy-retry]');
  if (vRetry) { event.preventDefault(); retryVacancy(vRetry.dataset.vacancyRetry); return; }
  const vPay = event.target.closest('[data-vacancy-pay]');
  if (vPay) { event.preventDefault(); reopenVacancyPay(vPay.dataset.vacancyPay); return; }
  const vCancel = event.target.closest('[data-vacancy-cancel]');
  if (vCancel) { event.preventDefault(); cancelVacancyOrder(vCancel.dataset.vacancyCancel); return; }
  const vOpenDl = event.target.closest('[data-vacancy-open-dl]');
  if (vOpenDl) { event.preventDefault(); openVacancyAccount(vOpenDl.dataset.vacancyOpenDl, { needDl: true }); return; }
  const vOpen = event.target.closest('[data-vacancy-open]');
  if (vOpen) { event.preventDefault(); openVacancyAccount(vOpen.dataset.vacancyOpen, { needDl: false }); return; }
  const vViewAccess = event.target.closest('[data-vacancy-view-access]');
  if (vViewAccess) { event.preventDefault(); skipVacancyDl(); return; }
  const refreshMenu = event.target.closest('[data-refresh-menu]');
  if (refreshMenu) {
    event.preventDefault();
    event.stopPropagation();
    state.refreshMenuOpen = !state.refreshMenuOpen;
    renderView();
    return;
  }
  const refreshScope = event.target.closest('[data-refresh-scope]');
  if (refreshScope) {
    event.preventDefault();
    event.stopPropagation();
    state.refreshMenuOpen = false;
    startAmazonRefresh(refreshScope.dataset.refreshScope);
    return;
  }
  if (state.refreshMenuOpen && !event.target.closest('.refresh-wrap')) {
    state.refreshMenuOpen = false;
    if (state.view === 'hub') renderHub();
  }
  const refreshList = event.target.closest('[data-refresh-list]');
  if (refreshList) { startAmazonRefresh('full'); return; }
  const tableSort = event.target.closest('[data-table-sort]');
  if (tableSort) { event.preventDefault(); cycleTableSort(tableSort.dataset.tableSort); return; }
  const refreshAudit = event.target.closest('[data-refresh-audit]');
  if (refreshAudit) { window.__applyOps?.loadAuditLogs?.(true); return; }
  const refreshSsn = event.target.closest('[data-refresh-ssn]');
  if (refreshSsn) { window.__applyOps?.loadSsnLookups?.(true); return; }
  const ssnPage = event.target.closest('[data-ssn-page]');
  if (ssnPage) {
    const page = Number(ssnPage.dataset.ssnPage);
    if (Number.isFinite(page) && page >= 1 && page <= state.ssnTotalPages) {
      state.ssnPage = page;
      window.__applyOps?.loadSsnLookups?.(true, 'list');
    }
    return;
  }
  const ssnTopup = event.target.closest('[data-ssn-topup]');
  if (ssnTopup) { (window.__applyOps?.showLookupBalances || window.__applyOps?.showSsnTopup)?.(); return; }
  const budgetSsn = event.target.closest('[data-budget-ssn]');
  if (budgetSsn) { window.__applyOps?.showLookupBalances?.(); return; }
  const copyText = event.target.closest('[data-copy-text]');
  if (copyText) { copyInlineText(copyText.dataset.copyText, copyText); return; }
  const editLabel = event.target.closest('[data-edit-label]');
  if (editLabel) { event.preventDefault(); event.stopPropagation(); editAccountLabel(editLabel.dataset.editLabel); return; }
  const deleteBtn = event.target.closest('[data-delete-account]');
  if (deleteBtn) { event.preventDefault(); event.stopPropagation(); deleteAccount(deleteBtn.dataset.deleteAccount); return; }
  const permanentDeleteBtn = event.target.closest('[data-delete-account-permanent]');
  if (permanentDeleteBtn) { event.preventDefault(); event.stopPropagation(); window.__applyOps?.permanentlyDeleteAccount?.(permanentDeleteBtn.dataset.deleteAccountPermanent, permanentDeleteBtn); return; }
  const restoreBtn = event.target.closest('[data-restore-account]');
  if (restoreBtn) { event.preventDefault(); event.stopPropagation(); restoreAccount(restoreBtn.dataset.restoreAccount); return; }
  const selectVisible = event.target.closest('[data-select-visible]');
  if (selectVisible) {
    event.stopPropagation();
    const archivedView = state.filter === 'archived';
    const visibleIds = sortedAccounts(searchFilteredAccounts().filter((account) => (
      matchFilter(account, state.filter)
      && (archivedView ? accStatus(account) === 'archived' : accStatus(account) !== 'archived')
    ))).map((account) => account.id);
    if (selectVisible.checked) visibleIds.forEach((id) => state.archiveSelection.add(id));
    else visibleIds.forEach((id) => state.archiveSelection.delete(id));
    renderHub();
    return;
  }
  const selectAccount = event.target.closest('[data-select-account]');
  if (selectAccount) {
    event.stopPropagation();
    if (selectAccount.checked) state.archiveSelection.add(selectAccount.dataset.selectAccount);
    else state.archiveSelection.delete(selectAccount.dataset.selectAccount);
    renderHub();
    return;
  }
  const archiveSelected = event.target.closest('[data-archive-selected]');
  if (archiveSelected) { event.preventDefault(); event.stopPropagation(); archiveSelectedAccounts(archiveSelected); return; }
  const restoreSelected = event.target.closest('[data-restore-selected]');
  if (restoreSelected) { event.preventDefault(); event.stopPropagation(); restoreSelectedAccounts(restoreSelected); return; }
  const changeStatus = event.target.closest('[data-change-account-status]');
  if (changeStatus) { event.preventDefault(); window.__applyOps?.showStatusOverrideModal?.(); return; }
  const openOnboarding = event.target.closest('[data-open-onboarding-view]');
  if (openOnboarding) { event.preventDefault(); openOnboardingView(); return; }
  const prepBlockedRow = event.target.closest('[data-prep-blocked]');
  if (prepBlockedRow) {
    event.preventDefault();
    const account = state.accounts.find((item) => item.id === prepBlockedRow.dataset.prepBlocked);
    if (account) applyAlert(prepBlockedMessage(account));
    return;
  }
  const reconnect = event.target.closest('[data-reconnect-account]');
  if (reconnect) {
    event.preventDefault();
    event.stopPropagation();
    reconnectAccount(reconnect.dataset.reconnectAccount || state.selectedAccountId);
    return;
  }
  const open = event.target.closest('[data-open]');
  if (open) {
    const account = state.accounts.find((item) => item.id === open.dataset.open);
    if (isPendingConnectionDocuments(account)) {
      state.connectPendingAccountId = account.id;
      localStorage.setItem('apply_connect_pending_account', account.id);
      go('connect');
      return;
    }
    go('detail', open.dataset.open);
    return;
  }
  const trackerToggle = event.target.closest('[data-tracker-toggle]');
  if (trackerToggle) { state.trackerOpen = !state.trackerOpen; document.querySelector('#tracker')?.classList.toggle('open', state.trackerOpen); return; }
  const taxSsnCancel = event.target.closest('[data-tax-ssn-cancel]');
  if (taxSsnCancel) { event.preventDefault(); closeTaxSsnModal(); return; }
  const taxSsnAgain = event.target.closest('[data-tax-ssn-again]');
  if (taxSsnAgain) {
    event.preventDefault();
    if (state.selectedAccountId) state.taxSsnFix = { id: state.selectedAccountId, phase: 'form', error: '' };
    renderDetail({ autoFollow: false });
    return;
  }
  const taxSsnConfirm = event.target.closest('[data-tax-ssn-confirm]');
  if (taxSsnConfirm) { event.preventDefault(); confirmTaxSsnRetry(); return; }
  const detailTabBtn = event.target.closest('[data-detail-tab]');
  if (detailTabBtn) {
    event.preventDefault();
    applyDetailTab(detailTabBtn.getAttribute('data-detail-tab') || 'documents');
    return;
  }
  const start = event.target.closest('[data-start]');
  if (start) {
    if (start.disabled || detailAction) return;
    const acc = selectedAccount();
    if (acc && accountNeedsIrsSsnFix(acc)) {
      event.preventDefault();
      state.taxSsnFix = { id: acc.id, phase: 'form', error: '' };
      renderDetail({ autoFollow: false });
      return;
    }
    const liveRun = [...(acc?.apply_runs || [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
    if (acc && ['queued', 'running'].includes(String(liveRun?.status || ''))) {
      state.trackerOpen = true;
      document.querySelector('#tracker')?.classList.add('open');
      return;
    }
    startRun(state.selectedAccountId);
    return;
  }

  const lookupSsn = event.target.closest('[data-lookup-ssn]');
  if (lookupSsn) { event.preventDefault(); window.__applyOps?.lookupSsnFromDriverLicense?.(); return; }
  const enableSsnBypass = event.target.closest('[data-enable-ssn-bypass]');
  if (enableSsnBypass) { event.preventDefault(); enableSsnNotFoundBypass(); return; }
  const phone = event.target.closest('[data-generate-phone]');
  if (phone) {
    const input = document.querySelector('#applicationDataForm input[name="phoneNumber"]');
    if (input) { input.value = randomPhoneNumber(); input.dispatchEvent(new Event('input', { bubbles: true })); }
    return;
  }
  const refresh = event.target.closest('[data-refresh-account]');
  if (refresh) { refreshAccount(state.selectedAccountId); return; }
  const regionBtn = event.target.closest('[data-region-refresh]');
  if (regionBtn) { refreshRegion(regionBtn.dataset.regionRefresh, regionBtn); return; }
  const run = event.target.closest('[data-run]');
  if (run) { showRun(run.dataset.run); return; }
  const mineToggle = event.target.closest('[data-mine-toggle]');
  if (mineToggle) {
    if (state.user?.role !== 'admin') return;
    state.mineOnly = !state.mineOnly;
    localStorage.setItem('apply_hub_mine', state.mineOnly ? '1' : '0');
    renderHub();
    return;
  }
  const filter = event.target.closest('[data-filter]');
  if (filter) {
    state.filter = filter.dataset.filter;
    state.archiveSelection.clear();
    renderHub();
    return;
  }
});

function reconnectAccount(accountId) {
  if (!accountId) return;
  stopServerLoginPolling();
  state.serverLogin = { attemptId: '', state: '', needsOtp: false, reason: '', polling: false, timer: null };
  state.reconnectAccountId = accountId;
  state.signinUrl = '';
  localStorage.removeItem('apply_last_signin_url');
  go('connect', accountId);
}

async function startAmazonRefresh(scope) {
  if (state.amazonRefreshing) return;
  state.refreshMenuOpen = false;
  if (scope === 'analysis') return refreshAnalysisList();
  return refreshAccountsList();
}

async function refreshAnalysisList() {
  if (state.amazonRefreshing) return;
  state.amazonRefreshing = true;
  state.amazonRefreshScope = 'analysis';
  state.amazonRefreshJob = { total: 0, done: 0, concluded: 0, failed: 0, still: 0, sessionFailed: 0, status: 'running' };
  if (state.view === 'hub') renderHub();
  try {
    const ownerEmail = ownerEmailSearchValue();
    const started = await api('/api/accounts/refresh-analysis', { method: 'POST', body: JSON.stringify(ownerEmail ? { owner_email: ownerEmail, include_archived: true } : {}) });
    state.amazonRefreshJob = started;
    if (state.view === 'hub') renderHub();
    if (!started?.total) {
      applyAlert(t('refreshAnalysisEmpty'));
      return;
    }
    const jobId = started.jobId;
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let job;
      try {
        job = await api(`/api/accounts/refresh-analysis/${jobId}`);
      } catch (pollError) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        job = await api(`/api/accounts/refresh-analysis/${jobId}`);
      }
      state.amazonRefreshJob = job;
      if (state.view === 'hub') renderHub();
      if (job.status === 'done' || (job.total && job.done >= job.total)) break;
    }
    await load(false);
    const job = state.amazonRefreshJob || {};
    applyAlert(tFill('refreshAnalysisDone', {
      concluded: job.concluded || 0,
      idvFailed: job.failed || 0,
      otherFailed: job.sessionFailed || 0,
      still: job.still || 0,
    }));
  } catch (err) {
    applyAlert(err.message || 'Erro ao atualizar as contas.');
  } finally {
    state.amazonRefreshing = false;
    state.amazonRefreshScope = '';
    state.amazonRefreshJob = null;
    if (state.view === 'hub') renderHub();
    else if (state.view === 'detail') renderDetail();
  }
}

async function refreshAccountsList(button) {
  if (state.amazonRefreshing) return;
  state.amazonRefreshing = true;
  state.amazonRefreshScope = 'full';
  if (state.view === 'hub') renderHub();
  else if (button) {
    button.disabled = true;
    button.innerHTML = `<span class="spinner"></span> ${t('refreshingAccounts')}`;
  }
  try {
    const result = await api('/api/accounts/refresh-all', { method: 'POST', body: '{}' });
    await load(false);
    if (result?.failed) {
      const skippedSpecial = [
        result.skippedConsider ? `${result.skippedConsider} Consider` : '',
        result.skippedDuplicate ? `${result.skippedDuplicate} duplicada(s)` : '',
      ].filter(Boolean).join(' e ');
      applyAlert(`${result.updated || 0} conta(s) atualizada(s). ${result.skipped || 0} protegida(s) ignorada(s)${skippedSpecial ? ` (${skippedSpecial})` : ''}. ${result.failed} falharam por sessão/token e ficaram marcadas no painel.`);
    } else {
      applyAlert(t('refreshDone'));
    }
  } catch (err) {
    applyAlert(err.message || 'Erro ao atualizar as contas.');
  } finally {
    state.amazonRefreshing = false;
    state.amazonRefreshScope = '';
    if (state.view === 'hub') renderHub();
    else if (state.view === 'detail') renderDetail();
    else if (button) {
      button.disabled = false;
      button.innerHTML = `${I.refresh} ${t('refresh')}`;
    }
  }
}





















async function copyInlineText(text, button) {
  if (!text) return;
  const copied = await copyTextWithFallback(text);
  if (copied) {
    if (button) {
      const old = button.innerHTML;
      button.innerHTML = 'OK';
      setTimeout(() => { button.innerHTML = old; }, 900);
    }
  } else {
    await applyPrompt('Copiar', text);
  }
}

async function copyTextWithFallback(text, selector) {
  if (!text) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_err) {}
  const input = selector ? document.querySelector(selector) : null;
  const element = input || document.createElement('textarea');
  if (!input) {
    element.value = text;
    element.setAttribute('readonly', '');
    element.style.position = 'fixed';
    element.style.left = '-9999px';
    element.style.top = '0';
    document.body.appendChild(element);
  }
  element.removeAttribute('readonly');
  element.focus();
  element.select();
  element.setSelectionRange?.(0, element.value.length);
  element.setAttribute('readonly', '');
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch (_err) {
    ok = false;
  }
  if (!input) element.remove();
  return ok;
}

function closeTopupModal() {
  document.querySelector('.topup-backdrop')?.remove();
}

function mountTopupModal(html) {
  closeTopupModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop topup-backdrop';
  overlay.innerHTML = html;
  document.body.appendChild(overlay);
  overlay.querySelectorAll('[data-topup-close]').forEach((btn) => btn.addEventListener('click', closeTopupModal));
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeTopupModal();
  });
  return overlay;
}









async function editAccountLabel(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  if (!account) return;
  const value = await applyPrompt('Novo nome de referência:', account.amazon_label || '');
  if (value === null) return;
  try {
    await api(`/api/accounts/${accountId}`, {
      method: 'PATCH',
      body: JSON.stringify({ amazonLabel: value }),
    });
    await load(false);
    if (state.view === 'detail') renderDetail();
    else renderHub();
  } catch (err) {
    applyAlert(err.message || 'Erro ao editar referência.');
  }
}



























async function deleteAccount(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  if (!account) return;
  const label = account.amazon_label || account.email || 'esta conta';
  const ok = await applyConfirm(`Arquivar ${label}? A conta sai da lista, mas runs, logs e uploads ficam preservados e podem ser restaurados.`);
  if (!ok) return;
  try {
    await api(`/api/accounts/${accountId}`, { method: 'DELETE', body: '{}' });
    state.accounts = state.accounts.filter((item) => item.id !== accountId);
    if (state.selectedAccountId === accountId) {
      state.selectedAccountId = state.accounts[0]?.id || '';
      if (state.selectedAccountId) localStorage.setItem('apply_selected_account', state.selectedAccountId);
      else localStorage.removeItem('apply_selected_account');
      state.view = 'hub';
    }
    await load(false);
    renderApp();
  } catch (err) {
    applyAlert(err.message || 'Erro ao arquivar conta.');
  }
}

async function archiveSelectedAccounts(button) {
  const ids = [...state.archiveSelection].filter((id) => state.accounts.some((account) => account.id === id && accStatus(account) !== 'archived'));
  if (!ids.length) return;
  if (!await applyConfirm(`Arquivar ${ids.length} conta(s) ${t('selectedCount')}? Contas com aplicação em andamento serão ignoradas. Runs, logs e uploads ficam preservados.`)) return;
  if (button) button.disabled = true;
  try {
    const result = await api('/api/accounts/archive-bulk', {
      method: 'POST',
      body: JSON.stringify({ accountIds: ids, reason: 'bulk_manual' }),
    });
    (result.archivedIds || []).forEach((id) => state.archiveSelection.delete(id));
    await load(false);
    renderHub();
    const ignored = Number(result.skipped || 0) + Number(result.missing || 0) + Number(result.failed || 0);
    applyAlert(`${result.archived || 0} conta(s) arquivada(s).${ignored ? ` ${ignored} ignorada(s) por aplicação em andamento, estado atual ou falha.` : ''}`);
  } catch (err) {
    applyAlert(err.message || 'Erro ao arquivar contas selecionadas.');
  } finally {
    if (button?.isConnected) button.disabled = false;
  }
}

async function restoreAccount(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  if (!account) return;
  const label = account.amazon_label || account.email || 'esta conta';
  if (!await applyConfirm(`Restaurar ${label} para a lista ativa?`)) return;
  try {
    await api(`/api/accounts/${accountId}/restore`, { method: 'POST', body: '{}' });
    state.filter = 'all';
    await load(false);
    renderHub();
  } catch (err) {
    applyAlert(err.message || 'Erro ao restaurar conta.');
  }
}



async function restoreSelectedAccounts(button) {
  const ids = [...state.archiveSelection].filter((id) => state.accounts.some((account) => account.id === id && accStatus(account) === 'archived'));
  if (!ids.length) return;
  if (!await applyConfirm(`Restaurar ${ids.length} conta(s) ${t('selectedCount')} para as listas ativas? Dados, runs, logs e uploads permanecem preservados.`)) return;
  if (button) button.disabled = true;
  try {
    const result = await api('/api/accounts/restore-bulk', {
      method: 'POST',
      body: JSON.stringify({ accountIds: ids }),
    });
    (result.restoredIds || []).forEach((id) => state.archiveSelection.delete(id));
    await load(false);
    renderHub();
    const ignored = Number(result.skipped || 0) + Number(result.missing || 0) + Number(result.conflicts || 0) + Number(result.failed || 0);
    applyAlert(`${result.restored || 0} conta(s) restaurada(s).${ignored ? ` ${ignored} ignorada(s) por estado atual, duplicidade ou falha.` : ''}`);
  } catch (err) {
    applyAlert(err.message || 'Erro ao restaurar contas selecionadas.');
  } finally {
    if (button?.isConnected) button.disabled = false;
  }
}

async function refreshAccount(accountId) {
  if (!accountId) return;
  const operation = beginDetailAction(accountId);
  if (!operation) return;
  showDetailActionBusy(operation, 'detailRefreshing');
  try {
    await api(`/api/accounts/${accountId}/refresh`, { method: 'POST', body: '{}', signal: operation.controller.signal });
    if (!currentDetailAction(operation)) return;
    await readDetailAfterAction(operation);
    paintDetailAfterRun({ autoFollow: true });
    showDetailActionFeedback(operation, 'success', 'detailUpdated');
  } catch (_error) {
    showDetailActionFeedback(operation, 'error', 'detailRefreshFailed');
    if (_error?.message && _error.message !== 'Erro na solicitacao') applyAlert(_error.message);
  } finally {
    finishDetailAction(operation);
  }
}

async function refreshRegion(accountId, btn) {
  if (!accountId) return;
  const valEl = document.querySelector('[data-region-value]');
  if (btn) { btn.disabled = true; btn.classList.add('spinning'); }
  if (valEl) valEl.textContent = 'Lendo região...';
  try {
    const res = await api(`/api/accounts/${accountId}/region-refresh`, { method: 'POST', body: '{}' });
    if (res?.ok && res.region) {
      await load(false);
      renderDetail();
    } else {
      if (valEl) { valEl.textContent = res?.error || 'Não consegui ler a região'; valEl.classList.add('warn'); }
      if (btn) { btn.disabled = false; btn.classList.remove('spinning'); }
    }
  } catch (e) {
    if (valEl) { valEl.textContent = 'Falha ao ler a região'; valEl.classList.add('warn'); }
    if (btn) { btn.disabled = false; btn.classList.remove('spinning'); }
  }
}

if (state.token) load();
else renderLogin();
