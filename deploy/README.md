# Infraestrutura — apply.gdapps.online

Preparada em 20/10/2026 no servidor 2.24.124.218, Ubuntu 24.04, usando o proxy Docker edge-nginx existente.

- DNS A confirmado para o servidor.
- Host HTTP dedicado redireciona para HTTPS.
- Certificado Let's Encrypt dedicado, com expiração informada pelo emissor em 18/01/2027.
- Renovação já coberta pelo agendamento existente de /opt/edge/renew.sh e pelo cron de Certbot encontrado no servidor; nenhum novo agendamento foi criado.
- GET /api/health retorna HTTP 200, component=gateway e applicationReady=false.
- GET / retorna o estágio infrastructure_ready e integrações não configuradas.
- Demais rotas /api/ retornam HTTP 503 application_not_deployed.
- A aplicação, autenticação e integrações Apex/Amazon ainda não estão implantadas. Não há dados de HAR ou credenciais publicados.

Configuração: /opt/edge/nginx/active.conf, bloco delimitado BEGIN/END apply.gdapps.online. Backup anterior: /opt/edge/nginx/active.conf.before-apply-20261020T210116Z.

Validação executada: nginx -t; GET HTTPS externo com certificado validado; redirecionamento HTTP 301; consulta dos agendamentos existentes.

prepare-domain.sh registra o procedimento inicial. Ele recusa duplicar um host já configurado e não deve ser usado como atualização da aplicação. Ao implantar o backend, substituir as respostas de infraestrutura pelo proxy para o serviço privado e manter os caminhos ACME/TLS.
