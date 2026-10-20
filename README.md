# Apply Amazon

Painel e backend próprio para gerenciar a conexão Apex e acompanhar operações de onboarding.

## Estado atual

- Login administrativo próprio, troca obrigatória da senha inicial e sessões HttpOnly/Secure.
- Conector Apex implementado com chamadas HTTP reais, ativado somente depois do login válido do operador na Apex. Testes de contrato usam respostas controladas; chamadas autenticadas reais dependem de credenciais ainda não fornecidas.
- Consulta de contas, créditos, detalhes e execuções; salvamento de cadastro, upload de documentos e solicitação de início de execução com confirmação explícita.
- Tokens Apex criptografados no SQLite com AES-256-GCM; a senha Apex não é persistida. Auditoria local não registra corpos nem credenciais.
- Integração direta Amazon indisponível até configurar um método de acesso autorizado; endpoints retornam 503, sem simular conclusão.
- Análise offline dos HARs preservada em `analysis/`. Os fluxos de referência não comprovam o encadeamento interno Apex–Amazon.

## Executar

Requer Node.js 22.18+ com `node:sqlite`; sem dependências npm externas. Gere uma chave de 32 bytes em hexadecimal e uma senha administrativa aleatória com pelo menos 14 caracteres. Copie `.env.example` para `.env` e configure os valores reais fora do Git.

Produção: `docker compose up -d --build`. O build executa testes antes de gerar a imagem de produção, sem usuário root. O volume SQLite e a MASTER_KEY precisam ser preservados nas atualizações e backups.

Desenvolvimento: configure NODE_ENV=development, APP_ORIGIN=http://127.0.0.1:8080, DB_PATH=./data/app.sqlite e demais variáveis do exemplo; execute `npm start`. O Node precisa receber essas variáveis pelo ambiente. Não use a senha de produção localmente.

Verificação: `npm run check` e `npm test`. Os testes incluem autenticação/CSRF, troca inicial, criptografia, isolamento de credenciais, contratos multipart, falhas sem repetição automática e serialização de operações.

## API do painel

- `/api/auth/login`, `/session`, `/logout`, `/password`: autenticação local.
- `/api/integrations`: estado das conexões; `/api/integrations/apex/connect`: login remoto; DELETE `/api/integrations/apex`: remoção do token local.
- GET `/api/apex/accounts`, `/api/apex/accounts/{id}`, `/api/apex/credits`, `/api/apex/runs/{id}`: consultas Apex.
- POST `/api/apex/accounts/{id}/application-data`: `{confirm:true,fields:{...}}`.
- POST `/api/apex/accounts/{id}/documents?kind=dlFront|dlBack|profilePhoto`: multipart `file`, com cabeçalho X-Confirm-Operation=upload. O conector traduz para o campo `image` esperado pela Apex.
- POST `/api/apex/accounts/{id}/start`: `{confirm:true}`; não gera dados ou modifica etapas para pular verificações.
- GET `/api/audit`: últimas operações do usuário.
- GET `/api/health`: disponibilidade da aplicação. Isso não afirma disponibilidade/autenticação dos provedores.

Todas as rotas de operação exigem sessão local. Escritas exigem Origin e token CSRF corretos. O destino Apex é fixo; o backend não aceita URLs arbitrárias. Os dados retornados ao navegador têm campos sensíveis de acesso removidos. Formulários de cadastro continuam contendo dados pessoais autorizados e devem ser usados apenas na conta correta.

## Limites

Não há API pública/documentada Amazon fornecida neste projeto. HARs não substituem credenciais ou autorização. Não há reprodução de sessões dos HARs, geração de identidades, reenvio de callbacks de verificação nem bypasses. O conector não marca um trabalho como concluído só porque recebeu HTTP 200.

Pagamentos/checkout, edição de preços, exclusão de contas, login Amazon intermediado, OCR automático, visualização remota e outras rotas do inventário ainda não são recursos desta versão. São descritos na análise, não expostos como um proxy genérico. Documentos são transmitidos à Apex sem armazenamento local; o contrato de aceitação dos arquivos é validado também pelo provedor.

## Arquivos

- `analysis/mapa-api.md`: rotas identificadas no frontend e no histórico do Burp.
- `analysis/comparacao-har-apex.md`: comparação do fluxo de referência com o frontend Apex.
- `analysis/*.sanitized.json`: inventários com caminhos normalizados, contagens, status e nomes de campos, sem valores dos corpos ou credenciais.
- `analysis/app.js` e `analysis/detail-progress.js`: cópias dos scripts públicos analisados; não são a implementação do nosso backend.
- `analysis/analisar-hars.ps1`: análise offline dos arquivos locais de referência.
- `deploy/`: registro e procedimento inicial de configuração do domínio.

## Dados e credenciais

HARs originais, cookies, tokens, chaves privadas, documentos e capturas brutas não fazem parte deste repositório. A integração futura precisa de credenciais válidas e de uma forma autorizada de acesso a cada serviço. Endpoints encontrados em capturas não representam um contrato de API pública.
