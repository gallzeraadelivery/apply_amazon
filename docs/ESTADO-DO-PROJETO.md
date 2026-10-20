# Estado do projeto

Atualizado em 20/10/2026, fuso America/Cuiaba.

## Objetivo

Backend e painel próprios que usam a conta Apex do operador e, futuramente, uma integração Amazon autorizada. O usuário forneceu HARs de referência; não forneceu documentação/credenciais de API Amazon nem credenciais de login Apex para testes ao vivo.

## O que existe

- Aplicação Node.js com módulos nativos e SQLite; sem dependências npm externas.
- Login administrativo próprio, troca inicial de senha obrigatória, cookie Secure/HttpOnly/SameSite, CSRF e limitação de tentativas de login.
- Token Apex criptografado em repouso com AES-256-GCM; senha Apex não persistida.
- Consulta de contas, detalhes, créditos e execuções. Escritas para dados cadastrais, documentos e início de execução exigem confirmação.
- Auditoria local de ações, sem corpos, documentos ou credenciais.
- Interface responsiva; oito testes cobrem autenticação, CSRF, contrato de upload, criptografia, erro sem repetição automática e serialização de alterações.
- Docker sem root, volume de dados, sistema de arquivos somente leitura e health check.
- Ferramentas de desenvolvimento local com configurações independentes da produção.

## Implantação confirmada

- URL: https://apply.gdapps.online.
- Servidor: 2.24.124.218; alias SSH do computador original: amazon-prod.
- Fontes: /opt/gd-apply; container: gd-apply-app; porta interna: 8080, sem publicação direta no host.
- Volume: gd-apply_apply-data; arquivo: /data/app.sqlite no container.
- Nginx: edge-nginx; configuração: /opt/edge/nginx/active.conf, bloco exclusivo do domínio.
- HTTPS Let's Encrypt e renovação pelo agendamento já existente no servidor.
- Versão da aplicação publicada corresponde ao commit `20a8e74`. Os commits posteriores de continuidade acrescentam documentação, regras e ferramentas locais; não implicam nova publicação automática.
- Verificações na publicação: oito testes no computador e na imagem Linux, health check externo HTTP 200, cookie seguro, login inicial e bloqueio antes da troca da senha, nginx -t e container healthy.
- Login inicial: admin@gdapps.online. A senha inicial existe somente em private/access.txt no computador original e no bootstrap privado de produção. Não está no Git e pode já ter sido alterada pelo usuário.

## Análises concluídas

- Frontend público da Apex: analysis/app.js e analysis/detail-progress.js são cópias de referência, não o nosso backend.
- Burp MCP funcionou. Foram encontrados uploads, OCR, salvamento cadastral, consultas de contas, créditos, vagas e polling de execução.
- Logger++, WebSocket History Exporter, MCP Server, JS Link Finder, JS Miner, OpenAPI Parser e Source Mapper foram encontrados carregados na instância local consultada. Essa instalação local não acompanha o clone Git.
- Os registros Link Finder confirmaram análise de scripts. O MCP não expõe todos os menus internos dessas extensões. Não declarar que todas as funções delas foram executadas.
- Caminhos convencionais de .map/OpenAPI retornaram HTML, não mapas/especificação válidos. HTTP 200 isolado não prova contrato válido.
- HAR 1: 745 entradas; HAR 2: 761 entradas. As 745 entradas do primeiro se repetem no segundo por assinatura de requisição/resposta; 16 adicionais. Captura registrada em 29/08/2026.
- O fluxo de referência mostra logistics.amazon.com e vendor=persona para identidade; nenhum host Checkr observado. O estado final de referência era IN_PROGRESS, com TAX_INFO Failed, identidade/antecedentes em andamento e PAYMENT_INFO Not Started.
- Correspondências com as etapas Apex são funcionais/estruturais. Não demonstram quais destinos o backend Apex realmente chama.

## Pendente / não implementado

- Validação autenticada do conector Apex com a conta real do usuário. Fazer primeiro consultas e só depois alterações autorizadas.
- Integração direta Amazon: indisponível, retornando erro explícito. Não há API pública/credenciais concedidas neste projeto.
- Checkout/pagamentos, preços, exclusão/arquivamento, login Amazon intermediado, OCR automático e tela remota não são recursos do nosso painel atual.
- Módulo administrativo adicional da Apex e toda a lógica do backend externo não foram analisados.
- Não foi capturado o tráfego de saída do backend Apex. Confirmar integração real exige código/logs desse backend ou rede do navegador remoto.

## Como atualizar este registro

Ao concluir cada tarefa, acrescentar data, mudança, testes executados, implantação efetiva e próximo passo. Não registrar senhas, tokens nem dados pessoais. Diferenciar testes com respostas controladas de chamadas reais e preservar o histórico de limitações até que evidência nova as resolva.

### 20/10/2026 — Continuidade em outros computadores

- Adicionados AGENTS.md, regra sempre ativa, guias de clonagem, operação, backup e histórico.
- Adicionado setup local independente; desenvolvimento vinculado ao loopback.
- Analisador HAR passou a receber caminhos por parâmetro e usar o diretório do script como saída padrão, sem caminhos fixos Y:/Z:.
- Alterações de continuidade não exigem reconfigurar nem recriar produção.
- Validação de continuidade: nove testes passaram no Windows e em um build Linux separado, incluindo geração isolada e preservação das credenciais de desenvolvimento. Analisador HAR executado com uma captura descartável por parâmetro. O helper local entra somente na etapa de testes do build, sem ir à imagem de produção. A aplicação online não foi substituída nesta tarefa.
- Backup privado consistente de banco e configuração criado sem parar o app em `/opt/backups/gd-apply/20261020T213200Z`; PRAGMA integrity_check retornou ok. Os dados e a chave não foram enviados ao Git. Restauração não foi executada.
