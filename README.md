# Apply Amazon

Painel e backend próprios para integrar diretamente com a Amazon e acompanhar operações de onboarding no nosso servidor. A Apex é referência funcional para análise; sua API não é a integração desejada.

O painel inicia na conexão manual Amazon. O conector Apex anterior permanece em telas identificadas como Apex e não é necessário para conectar a Amazon. Consulte [reconstrução da integração direta](docs/INTEGRACAO-DIRETA-AMAZON.md) para o mapa de evidências e etapas seguintes.

## Continuar em outro computador

Comece pelo [guia de continuidade](docs/CONTINUAR-EM-OUTRO-PC.md). Ele cobre uso do site, clonagem, configuração local e SSH. Consulte também [estado e pendências](docs/ESTADO-DO-PROJETO.md), [operação e backup](docs/OPERACAO-E-BACKUP.md) e [histórico](CHANGELOG.md).

As orientações permanentes estão em [AGENTS.md](AGENTS.md): manter a evolução documentada e salvar as alterações da tarefa no Git autorizado, sem incluir segredos. O repositório é público.

## Estado atual

- Login administrativo próprio, troca obrigatória da senha inicial e sessões HttpOnly/Secure.
- Conector Apex implementado com chamadas HTTP reais, ativado somente depois do login válido do operador na Apex. Testes de contrato usam respostas controladas; chamadas autenticadas reais dependem de credenciais ainda não fornecidas.
- Consulta de contas, créditos, detalhes e execuções; salvamento de cadastro, upload de documentos e solicitação de início de execução com confirmação explícita.
- Tokens Apex criptografados no SQLite com AES-256-GCM; a senha Apex não é persistida. Auditoria local não registra corpos nem credenciais.
- Conexão manual Amazon com PKCE: gerar link, fazer login na Amazon, colar o retorno e confirmar. Verifier e refresh token criptografados, tentativas de dez minutos e troca do código sem repetição automática. Validação autenticada real depende de uma tentativa nova realizada pelo titular.
- Leitura direta do perfil e das etapas do onboarding disponível por conta conectada. Campos pessoais são apresentados somente ao usuário local dono da conexão; tokens e cookies não são devolvidos. Alterações de onboarding continuam indisponíveis; conectar a conta não significa aprovar o cadastro.
- Análise offline dos HARs preservada em `analysis/`. Os fluxos de referência não comprovam o encadeamento interno Apex–Amazon.

## Executar

Requer Node.js 22.18+ com `node:sqlite`; sem dependências npm externas. Gere uma chave de 32 bytes em hexadecimal e uma senha administrativa aleatória com pelo menos 14 caracteres. Copie `.env.example` para `.env` e configure os valores reais fora do Git.

Produção: `docker compose up -d --build`. O build executa testes antes de gerar a imagem de produção, sem usuário root. O volume SQLite e a MASTER_KEY precisam ser preservados nas atualizações e backups.

Desenvolvimento: execute `npm run dev:setup` e `npm run dev`. Isso usa `.env.development`, credenciais em `private/dev-access.txt` e banco isolado em `data/development.sqlite`. Abra http://127.0.0.1:8080. Não use a senha ou a chave de produção localmente. Se o PowerShell bloquear npm.ps1, use npm.cmd no lugar de npm; não é necessário mudar a política de execução do computador.

Verificação: `npm run check` e `npm test`. Os testes incluem autenticação/CSRF, troca inicial, criptografia, isolamento de credenciais, contratos multipart, falhas sem repetição automática e serialização de operações.

## API do painel

- POST `/api/amazon/connect/start`: gera tentativa e link de login; exige sessão, Origin e CSRF.
- POST `/api/amazon/connect/finish`: `{connectId,url,label,confirm:true}`; recebe somente o retorno do link gerado nesta tentativa. A tentativa é consumida antes da troca do código, inclusive quando o resultado é incerto. Gere um link novo para tentar novamente.
- GET `/api/amazon/accounts`: lista conexões do usuário, sem tokens.
- GET `/api/amazon/accounts/{id}/onboarding`: consulta perfil e etapas atuais, com `checkedAt`, `sources`, `profile` e `onboarding`. HTTP 200 pode representar resultado parcial: conferir `ok` e cada fonte. Nenhum estado anterior é apresentado como leitura nova em caso de falha.
- POST `/api/amazon/accounts/{id}/uploads/license`: multipart com exatamente `front` e `back`, JPG/PNG até 8 MB por imagem. Requer `X-Confirm-Operation: upload-amazon`, Origin e CSRF. Envia para a etapa de documento da Persona somente quando Amazon informa elegibilidade e a sessão atual pede documento.
- POST `/api/amazon/accounts/{id}/uploads/profile-photo`: multipart com exatamente `file` e as mesmas proteções. Transfere a foto para URL S3 emitida pela Amazon e exige confirmação de associação ao perfil.
- DELETE `/api/amazon/accounts/{id}`: `{confirm:true}`; remove a credencial deste painel, sem revogação remota automática.

Na aba **Amazon direta**, gere um link e abra o login. Copie a URL final `/ap/maplanding` mesmo se a página final exibir erro; somente a resposta da troca no backend confirma a conexão. Não use links ou códigos das capturas anteriores. A implementação usa configurações do serviço próprio amazonteste, sem proxy Burp e sem enviar a senha Amazon ao painel. A compatibilidade atual desse fluxo de dispositivo ainda precisa de validação com conta autorizada.

Nas conexões salvas, **Consultar perfil e etapas** lê o perfil por access token e abre uma sessão web temporária para ler o onboarding. Cookies respeitam domínio/caminho, expiração e uma lista restrita de destinos de SSO. A consulta tem orçamento de 30 segundos e não faz polling automático. A primeira conexão e a primeira leitura autenticada real foram validadas em 20/10/2026; isso não garante disponibilidade permanente do serviço externo.

**Documentos e fotos** permite conferir prévias da frente/verso da carteira e foto de perfil antes de confirmar o envio para a conta selecionada. As imagens são transitórias em memória, sem gravação local, OCR ou transformação. Envio aceito não significa aprovação. Selfie/liveness continua no fluxo oficial; nenhum callback de conclusão ou pose é gerado. Os contratos de upload foram testados com respostas controladas; a aceitação real depende da etapa liberada e dos arquivos escolhidos pelo titular. Não repetir envio após resultado incerto sem consultar o estado.

- `/api/auth/login`, `/api/auth/session`, `/api/auth/logout`, `/api/auth/password`: autenticação local.
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
