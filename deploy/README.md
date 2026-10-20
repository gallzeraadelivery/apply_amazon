# Infraestrutura — apply.gdapps.online

Preparada em 20/10/2026 no servidor 2.24.124.218, Ubuntu 24.04, usando o proxy Docker edge-nginx existente.

- DNS A confirmado para o servidor.
- Host HTTP dedicado redireciona para HTTPS.
- Certificado Let's Encrypt dedicado, com expiração informada pelo emissor em 18/01/2027.
- Renovação já coberta pelo agendamento existente de /opt/edge/renew.sh e pelo cron de Certbot encontrado no servidor; nenhum novo agendamento foi criado.
- A aplicação GD Apply está publicada no container `gd-apply-app`, sem usuário root e com sistema de arquivos somente leitura, exceto o volume de dados.
- GET /api/health retorna HTTP 200, component=application e applicationReady=true. Isso não afirma autenticação ou disponibilidade dos provedores externos.
- GET / serve a tela de login. APIs de operação exigem autenticação, troca inicial da senha e CSRF para escritas.
- O conector Apex está implementado, mas depende do login real do operador na tela Integrações. Não houve teste autenticado na conta Apex, pois essas credenciais ainda não foram fornecidas.
- A integração direta Amazon está indisponível e responde explicitamente com erro; sessões dos HARs não são reutilizadas.
- Não há HARs nem credenciais publicados. O acesso administrativo inicial foi salvo somente em `private/access.txt`, ignorado pelo Git.

Configuração: /opt/edge/nginx/active.conf, bloco delimitado BEGIN/END apply.gdapps.online. Backup anterior: /opt/edge/nginx/active.conf.before-apply-20261020T210116Z.

Validação executada: oito testes de contrato/segurança locais e no build Linux; conferência visual local e da tela publicada; nginx -t; GET HTTPS externo com certificado validado; login inicial com cookies Secure/HttpOnly; bloqueio das integrações antes de trocar a senha; redirecionamento HTTP 301; consulta dos agendamentos existentes. Os testes do conector usam respostas controladas, não contas externas.

prepare-domain.sh registra o procedimento inicial e não deve ser reexecutado para atualização. publish-app.sh publica a aplicação, testa a imagem e substitui somente o bloco dedicado do domínio. Backup anterior à publicação da aplicação: `/opt/edge/nginx/active.conf.before-apply-app-20261020T212316Z`.

Fontes implantadas: `/opt/gd-apply`. Configuração privada: `/opt/gd-apply/.env`, modo 600. Dados persistentes: volume `gd-apply_apply-data`. Preserve o banco e a MASTER_KEY nos backups; perder a chave impede recuperar os tokens criptografados. Atualizações não devem substituir .env nem recriar/remover o volume.

A senha inicial deve ser trocada pelo usuário no primeiro acesso. Depois, conectar a conta Apex pelo formulário específico e validar primeiro as consultas de leitura antes de iniciar alterações reais. O painel não usa dados de demonstração em produção.
