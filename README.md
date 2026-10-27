# Apply Amazon

Painel e backend próprios para integrar diretamente com a Amazon e acompanhar operações de onboarding no nosso servidor. A Apex é referência funcional para análise; sua API não é a integração desejada.

O painel inicia na conexão manual Amazon. O conector Apex anterior permanece em telas identificadas como Apex e não é necessário para conectar a Amazon. Consulte [reconstrução da integração direta](docs/INTEGRACAO-DIRETA-AMAZON.md) para o mapa de evidências e etapas seguintes.

## Continuar em outro computador

Comece pelo [guia de continuidade](docs/CONTINUAR-EM-OUTRO-PC.md). Ele cobre uso do site, clonagem, configuração local e SSH. Consulte também [estado e pendências](docs/ESTADO-DO-PROJETO.md), [operação e backup](docs/OPERACAO-E-BACKUP.md) e [histórico](CHANGELOG.md).

As orientações permanentes estão em [AGENTS.md](AGENTS.md): manter a evolução documentada e salvar as alterações da tarefa no Git autorizado, sem incluir segredos. O repositório é público.

## Estado atual

- [Proxy obrigatório no admin](docs/PROXY.md) para chamadas deste backend à Amazon, Apex e Google OCR, com credenciais criptografadas, teste do IP e bloqueio de conexão direta. O login oficial aberto no AdsPower exige configurar o proxy no próprio perfil do navegador.

- Login administrativo próprio, troca obrigatória da senha inicial e sessões HttpOnly/Secure.
- Conector Apex implementado com chamadas HTTP reais, ativado somente depois do login válido do operador na Apex. Testes de contrato usam respostas controladas; chamadas autenticadas reais dependem de credenciais ainda não fornecidas.
- Consulta de contas, créditos, detalhes e execuções; salvamento de cadastro, upload de documentos e solicitação de início de execução com confirmação explícita.
- Tokens Apex criptografados no SQLite com AES-256-GCM; a senha Apex não é persistida. Auditoria local não registra corpos nem credenciais.
- Conexão manual Amazon com PKCE: gerar link, fazer login na Amazon, colar o retorno e confirmar. Verifier e refresh token criptografados, tentativas de dez minutos e troca do código sem repetição automática. Validação autenticada real depende de uma tentativa nova realizada pelo titular.
- Leitura direta do perfil e das etapas do onboarding disponível por conta conectada. Campos pessoais são apresentados somente ao usuário local dono da conexão; tokens e cookies não são devolvidos. Alterações de onboarding continuam indisponíveis; conectar a conta não significa aprovar o cadastro.

- Análise offline dos HARs preservada em `analysis/`. Os fluxos de referência não comprovam o encadeamento interno Apex–Amazon.

## Executar

Requer Node.js 22.18+ com `node:sqlite`. Execute `npm ci --ignore-scripts` para instalar a versão fixada do Undici usada no proxy. Gere uma chave de 32 bytes em hexadecimal e uma senha administrativa aleatória com pelo menos 14 caracteres. Copie `.env.example` para `.env` e configure os valores reais fora do Git.

Produção: `docker compose up -d --build`. O build executa testes antes de gerar a imagem de produção, sem usuário root. O volume SQLite e a MASTER_KEY precisam ser preservados nas atualizações e backups.

Desenvolvimento: execute `npm run dev:setup` e `npm run dev`. Isso usa `.env.development`, credenciais em `private/dev-access.txt` e banco isolado em `data/development.sqlite`. Abra http://127.0.0.1:8080. Não use a senha ou a chave de produção localmente. Se o PowerShell bloquear npm.ps1, use npm.cmd no lugar de npm; não é necessário mudar a política de execução do computador.

Verificação: `npm run check` e `npm test`. Os testes incluem autenticação/CSRF, troca inicial, criptografia, isolamento de credenciais, contratos multipart, falhas sem repetição automática e serialização de operações.

## API do painel

- Seguro: `POST /api/amazon/accounts/{id}/insurance/review` consulta a etapa e os termos atuais; `POST /api/amazon/accounts/{id}/insurance/accept` recebe `{reviewId,confirm:true}` depois da revisão explícita no painel. Confirmação de dez minutos, vinculada à conta, conteúdo dos termos e revisão do proxy; uso único mesmo após falha. [Orientações do seguro e captura Persona](docs/SEGURO-E-CAPTURA-PERSONA.md).

- POST `/api/amazon/connect/start`: gera tentativa e link de login; exige sessão, Origin e CSRF.
- POST `/api/amazon/connect/finish`: `{connectId,url,label,confirm:true}`; recebe somente o retorno do link gerado nesta tentativa. A tentativa é consumida antes da troca do código, inclusive quando o resultado é incerto. Gere um link novo para tentar novamente.
- GET `/api/amazon/accounts`: lista conexões do usuário, sem tokens.
- GET `/api/amazon/accounts/{id}/onboarding`: consulta perfil e etapas atuais, com `checkedAt`, `sources`, `profile` e `onboarding`. HTTP 200 pode representar resultado parcial: conferir `ok` e cada fonte. Nenhum estado anterior é apresentado como leitura nova em caso de falha.
- POST `/api/amazon/accounts/{id}/uploads/license`: multipart com exatamente `front` e `back`, JPG/PNG até 8 MB por imagem. Requer `X-Confirm-Operation: upload-amazon`, Origin e CSRF. Envia para a etapa de documento da Persona somente quando Amazon informa elegibilidade e a sessão atual pede documento.
- POST `/api/amazon/accounts/{id}/uploads/profile-photo`: multipart com exatamente `file` e as mesmas proteções. Transfere a foto para URL S3 emitida pela Amazon e exige confirmação de associação ao perfil.
- DELETE `/api/amazon/accounts/{id}`: `{confirm:true}`; remove a credencial deste painel, sem revogação remota automática.

Na aba **Amazon direta**, gere um link e abra o login. Copie a URL final `/ap/maplanding` mesmo se a página final exibir erro; somente a resposta da troca no backend confirma a conexão. Não use links ou códigos das capturas anteriores. A implementação usa configurações do serviço próprio amazonteste, sem proxy Burp e sem enviar a senha Amazon ao painel. A compatibilidade atual desse fluxo de dispositivo ainda precisa de validação com conta autorizada.

Nas conexões salvas, **Consultar perfil e etapas** lê o perfil por access token e abre uma sessão web temporária para ler o onboarding. Cookies respeitam domínio/caminho, expiração e uma lista restrita de destinos de SSO. A consulta tem orçamento de 30 segundos e não faz polling automático. A primeira conexão e a primeira leitura autenticada real foram validadas em 20/10/2026; isso não garante disponibilidade permanente do serviço externo.

**Abrir aplicação** mantém as cores originais do GD Apply (verde e fundo claro) e organiza etapas na lateral, documentos no topo, formulário abaixo e histórico separado. **Salvar imagem** guarda uma cópia criptografada no SQLite e não envia ao provedor. As imagens continuam visíveis ao reabrir a conta, com ações de ampliar, baixar, trocar ou remover. O armazenamento foi solicitado explicitamente pelo usuário; os arquivos permanecem fora do Git.

Ao anexar frente/verso, a leitura automática local preenche os campos reconhecidos para revisão. Correções digitadas enquanto a leitura ocorre são preservadas. Também há **Reler dados** nos documentos salvos. O OCR não preenche dados ausentes com valores inventados e não lê código de barras da imagem; o parser aceita códigos AAMVA quando presentes como texto legível.

O container inclui [Tesseract](https://tesseract-ocr.github.io/tessdoc/Command-Line-Usage.html) com idioma inglês. Imagens entram por stdin, texto sai por stdout, sem envio a provedor externo ou registro do texto em logs. A leitura aceita JPG/PNG de até 8 MB e 6 megapixels, uma por vez, com limite de 25 segundos. Fotos com baixa qualidade, reflexo ou rotação podem exigir preenchimento manual. Desenvolvimento fora do container requer o executável Tesseract e dados `eng` instalados; não há dependência npm de OCR.

**Salvar dados no painel** mantém um rascunho criptografado por conta, separado dos valores retornados pela Amazon. Essa ação não atualiza o cadastro externo nem libera alterações de nome proibidas pelo provedor.

Frente, verso e foto de perfil usam AES-256-GCM com associação autenticada ao usuário, conta, tipo e formato. O GET da imagem exige sessão e propriedade da conta, não permite cache e usa nomes de arquivo genéricos. A exclusão da conexão remove suas imagens do banco ativo por cascade; backups existentes seguem o procedimento privado de retenção. Preservar MASTER_KEY é necessário para recuperar as imagens, assim como os tokens.

Os botões de envio pedem confirmação separada e distinguem **salvo no painel**, **recebido pelo provedor** e **envio não confirmado**. Envio aceito não significa aprovação. Selfie/liveness continua no fluxo oficial. Os contratos de upload foram testados com respostas controladas; a aceitação real depende da etapa liberada e dos arquivos escolhidos pelo titular. Não repetir envio após resultado incerto sem consultar o estado.

- GET `/api/amazon/accounts/{id}/documents`: metadados dos arquivos salvos, sem corpos ou nomes originais.
- GET `/api/amazon/accounts/{id}/documents/{front|back|profile}`: imagem privada para exibição/download.
- POST na mesma rota: multipart com exatamente `file`; salva somente no painel, com Origin e CSRF.
- DELETE na mesma rota: remove a cópia do banco ativo, sem remover arquivos já recebidos pelo provedor.
- POST `/api/amazon/accounts/{id}/personal-info`: `{confirm:true,savedAt}` envia a versão salva de nome, endereço e telefone diretamente ao endpoint atual Amazon; exige sessão, propriedade, Origin e CSRF. Retorna `accepted` e `confirmed` separadamente. Não envia e-mail, nascimento, número/validade da carteira ou SSN por essa operação.
- POST `/api/amazon/accounts/{id}/ocr`: multipart `file`; retorna campos reconhecidos, sem salvar a imagem ou o texto bruto. Exige propriedade da conta, Origin e CSRF.
- GET/POST `/api/amazon/accounts/{id}/form`: consulta/salva `{fields:{...}}` no rascunho criptografado local. Campos aceitos são explícitos; SSN e credenciais não fazem parte deste formulário.

- `/api/auth/login`, `/api/auth/session`, `/api/auth/logout`, `/api/auth/password`: autenticação local.
- `/api/integrations`: estado das conexões; `/api/integrations/apex/connect`: login remoto; DELETE `/api/integrations/apex`: remoção do token local.
- GET `/api/apex/accounts`, `/api/apex/accounts/{id}`, `/api/apex/credits`, `/api/apex/runs/{id}`: consultas Apex.
- POST `/api/apex/accounts/{id}/application-data`: `{confirm:true,fields:{...}}`.
- POST `/api/apex/accounts/{id}/documents?kind=dlFront|dlBack|profilePhoto`: multipart `file`, com cabeçalho X-Confirm-Operation=upload. O conector traduz para o campo `image` esperado pela Apex.
- POST `/api/apex/accounts/{id}/start`: `{confirm:true}`; não gera dados ou modifica etapas para pular verificações.
- GET `/api/audit`: últimas operações do usuário.
- GET `/api/health`: disponibilidade da aplicação. Isso não afirma disponibilidade/autenticação dos provedores.
- `/api/admin/proxy` (GET/PUT/DELETE), `/api/admin/proxy/test` (POST), `/api/admin/proxy/events` (GET): cadastro obrigatório, teste e observações de rede.

Todas as rotas de operação exigem sessão local. Escritas exigem Origin e token CSRF corretos. O destino Apex é fixo; o backend não aceita URLs arbitrárias. Os dados retornados ao navegador têm campos sensíveis de acesso removidos. Formulários de cadastro continuam contendo dados pessoais autorizados e devem ser usados apenas na conta correta.

## Limites

Não há API pública/documentada Amazon fornecida neste projeto. HARs não substituem credenciais ou autorização. Não há reprodução de sessões dos HARs, geração de identidades, reenvio de callbacks de verificação nem bypasses. O conector não marca um trabalho como concluído só porque recebeu HTTP 200.

Pagamentos/checkout, edição de preços e operações restantes de onboarding não são recursos desta versão direta. OCR local, cofre de imagens e envio de dados pessoais estão disponíveis conforme as rotas acima; envio não equivale a aprovação.

## Arquivos

- `analysis/mapa-api.md`: rotas identificadas no frontend e no histórico do Burp.
- `analysis/comparacao-har-apex.md`: comparação do fluxo de referência com o frontend Apex.
- `analysis/*.sanitized.json`: inventários com caminhos normalizados, contagens, status e nomes de campos, sem valores dos corpos ou credenciais.
- `analysis/app.js` e `analysis/detail-progress.js`: cópias dos scripts públicos analisados; não são a implementação do nosso backend.
- `analysis/analisar-hars.ps1`: análise offline dos arquivos locais de referência.
- `deploy/`: registro e procedimento inicial de configuração do domínio.

## Dados e credenciais

HARs originais, cookies, tokens, chaves privadas, documentos e capturas brutas não fazem parte deste repositório. A integração futura precisa de credenciais válidas e de uma forma autorizada de acesso a cada serviço. Endpoints encontrados em capturas não representam um contrato de API pública.

## Ajuste dos anexos e cadastro direto

Ao escolher frente, verso ou foto, ajuste posição, zoom e rotação antes de usar o recorte. O arquivo JPEG confirmado é a prévia, a imagem salva e o arquivo usado pelo envio. A guia oval não é incluída na foto. Imagens salvas podem ser ajustadas novamente. Carteiras passam pelo OCR após confirmar o recorte.

Depois de revisar, use **Salvar dados no painel**; o nome salvo aparece no cabeçalho ao reabrir. **Enviar dados à Amazon** pede confirmação e envia a mesma versão salva de nome, endereço e telefone. O caminho atual foi reconstruído do serviço próprio: `get-personal-info` e `submit-personal-info` sob `/onboarding/account/data/`. Resposta HTML ou HTTP 200 sem confirmação estruturada não significa sucesso. Não há repetição automática. Documentos usam seus próprios botões; foto de perfil não substitui selfie/liveness.

## Leitura Google da carteira

Produção usa Gemini, com a mesma API e credencial autorizadas do serviço dlgenerator. Configure `OCR_PROVIDER=gemini`, `GEMINI_API_KEY` e `GEMINI_OCR_MODEL` somente no ambiente do servidor. A imagem recortada é enviada diretamente pelo backend ao Google; chave não vai ao navegador nem à URL. O modelo retorna campos estruturados com datas validadas e nomes separados. Não há fallback silencioso para leitura local, repetição automática ou envio à Amazon nesta leitura. Correções manuais continuam preservadas. `OCR_PROVIDER=local` mantém Tesseract para desenvolvimento. A qualidade precisa ser conferida nas imagens reais; leitura não equivale a verificação de identidade.

## Preparação de selfies

A aplicação possui três anexos locais: frente, rosto para sua esquerda e rosto para sua direita. São cópias criptografadas por conta e posição, com revisão e ajuste. Não acionam OCR nem o envio de foto de perfil. A interface não envia essas imagens à Persona: falta capturar e validar o contrato da sessão oficial. Não substituem a verificação de presença exigida pelo provedor.

## Remover telefone de Login e Segurança

No detalhe da conexão Amazon, use **Consultar telefone na Amazon**. A consulta identifica a conta pelo perfil remoto e lê o formulário de Login e Segurança por sessão nova e pelo proxy administrativo. Se a página oferecer adicionar telefone, nenhuma exclusão é disponibilizada. Se oferecer remoção, o operador confirma a conta e o efeito sobre acesso/recuperação antes do envio.

POST `/api/amazon/accounts/{id}/phone/prepare` retorna somente nome remoto, estado e identificador opaco de tentativa. A sessão e os campos do formulário ficam em memória no servidor, com tentativa válida por dois minutos, vinculada ao usuário, conta e revisão do proxy. POST `/api/amazon/accounts/{id}/phone/remove` recebe `{confirm:true,attemptId}` e consome a tentativa antes do envio único. Cookies e tokens não são devolvidos ao navegador.

O backend usa somente o formulário oficial `auth-remove-phone-claim` com `appAction=REMOVE_MOBILE_PHONE`; não envia telefone vazio, não inventa tokens, não contorna senha/MFA e não repete operações incertas. Sucesso exige nova leitura CNEP com **Adicionar telefone**, após estado anterior **Editar telefone**. Isso não afirma alteração no contato do Flex ou em fatores MFA independentes.
