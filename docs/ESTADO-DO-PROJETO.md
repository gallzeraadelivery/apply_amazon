# Estado do projeto

Atualizado em 22/10/2026, fuso America/Cuiaba.

## Objetivo

Backend e painel próprios que executam a integração diretamente com a Amazon no nosso servidor. A Apex serve como referência funcional de análise, sem dependência da sua API para a conexão manual Amazon implementada. Esse objetivo foi esclarecido pelo usuário em 20/10/2026; o conector Apex anterior permanece em telas separadas. Operações diretas de onboarding continuam pendentes. O mapa de reconstrução está em docs/INTEGRACAO-DIRETA-AMAZON.md.

## O que existe

- Aplicação Node.js com SQLite e Undici fixado em package-lock.json para proxy obrigatório. Instalar dependências com npm ci --ignore-scripts.
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
- Versão da aplicação publicada: `7779a50` (proxy obrigatório), em 22/10/2026. Registros abaixo descrevem a evolução e as validações de cada publicação.
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

- Substituir a dependência Apex pelo fluxo direto Amazon. Validar o conector Apex deixou de ser o próximo passo do projeto.
- Integração direta Amazon: conexão manual e leitura de perfil/etapas publicadas e validadas com a conta autorizada. Alterações de onboarding continuam indisponíveis, retornando erro explícito.
- Checkout/pagamentos, preços, exclusão/arquivamento, login Amazon intermediado, OCR automático e tela remota não são recursos do nosso painel atual.
- Módulo administrativo adicional da Apex e toda a lógica do backend externo não foram analisados.
- Não foi capturado o tráfego de saída do backend Apex. Confirmar integração real exige código/logs desse backend ou rede do navegador remoto.

## Como atualizar este registro

### 21/10/2026 — Cores originais e leitura automática da carteira

- Corrigida a interpretação da referência: estrutura mantida, paleta original verde/clara restaurada, sem ampliar o trabalho visual solicitado.
- Adicionado OCR local ao anexar a frente/verso, campos editáveis e botão Reler dados para imagens salvas. Resultados não apagam correções feitas durante a leitura e respostas antigas não preenchem outra conta/imagem.
- Parser adaptado do serviço próprio; motor Tesseract nativo no container, entrada/saída em memória por pipes, sem OCR externo, logs de texto reconhecido ou gravação automática da imagem. Limite de 25 segundos, 6 megapixels e uma leitura por vez.
- Rascunho do formulário salvo localmente com AES-GCM e contexto do usuário/conta. Não há envio automático dos dados reconhecidos para a Amazon. Imagem e formulário continuam com salvamentos próprios.
- Check e 31 testes locais aprovados, incluindo parser, datas inválidas, execução sem shell, limites, OCR isolado, ausência de chamadas Amazon e persistência privada do formulário. Visual conferido em navegador com dados de demonstração e paleta original.
- Publicado commit 03c0f21 no container gd-apply-app. Os 31 testes passaram também no build Linux; nginx -t aprovado. Backup privado anterior em /opt/backups/gd-apply/20261021T043223Z.
- Leitor nativo validado em container isolado, sem rede, credenciais ou volume de produção, sob os mesmos limites de CPU/memória: os três campos de nome e outros oito campos foram reconhecidos na imagem sintética. A imagem de teste foi removida do servidor; nenhum documento pessoal foi usado como teste.
- Smoke HTTPS confirmou saúde, conexão preservada, paleta original servida, código de leitura automática e proteção de correções manuais publicados, e HTTP 401 para acesso ao rascunho sem sessão. Não foi salvo rascunho de teste na conta real.
- Próximo passo: anexar uma carteira nítida ou usar Reler dados em uma imagem já salva, revisar os campos reconhecidos e salvar o rascunho local. A precisão em cada documento real depende da qualidade da imagem.

### 21/10/2026 — Layout por conta e imagens persistentes

- Usuário solicitou layout semelhante à referência e confirmou explicitamente manter as imagens salvas ao reabrir a conta.
- Nova tela Abrir aplicação: tema escuro, etapas e progresso da consulta na lateral, três cartões de documentos, dados pessoais em leitura e histórico real da conta. Não há ações fictícias de início, geração de dados ou aprovação.
- Implementado cofre de imagens no SQLite: AES-256-GCM com AAD para usuário/conta/tipo/formato, sessão/propriedade para cada leitura, cache desabilitado e remoção em cascade com a conexão. Chave de produção preservada. Backups privados passam a incluir as imagens criptografadas.
- Salvar imagem é uma ação local; enviar à Amazon exige confirmação separada. Metadados distinguem cópia local, transferência confirmada e resultado incerto. Imagens novas não herdam a confirmação de uma versão anterior.
- Adicionada leitura opcional dos campos pessoais de personal-info, sem SSN, tokens ou outros campos fora da lista explícita. Falha nessa consulta não apaga um mapa válido de etapas.
- Check e 28 testes locais passaram. Layout conferido visualmente no navegador com dados de demonstração; persistência após reabertura, criptografia, vinculação de contexto, isolamento e cache testados.
- Publicado commit 0355de4 no container gd-apply-app, preservando banco, chave e conexão Amazon. Backup privado anterior em /opt/backups/gd-apply/20261021T041848Z. Os 28 testes passaram também no build Linux; nginx -t aprovado.
- Smoke HTTPS confirmou módulo JavaScript servido com MIME correto, uma conexão preservada, leitura real de 17 etapas e dados pessoais opcionais, e HTTP 401 para documentos sem sessão. O cofre estava vazio: nenhum documento de teste ou imagem da referência foi anexado à conta real.
- Próximo passo: abrir a aplicação, anexar os arquivos do titular e usar Salvar imagem para manter as prévias visíveis ao reabrir. Enviar ao provedor continua sendo uma confirmação separada.

### Documentos e fotos — implementação posterior à leitura direta

- Analisadas as rotas do serviço próprio e distinguido o envio de carteira via Amazon/Persona v3 da foto de perfil via S3. A rota antiga Alexandria/driverLicense-info não foi reutilizada.
- Implementadas rotas multipart por conta, confirmação explícita, Origin/CSRF, limites e assinatura de JPG/PNG, rejeição de frente/verso iguais e campos repetidos. Arquivos transitórios em memória, sem OCR, armazenamento local ou registro de imagens/dados nos logs.
- Frente/verso só são enviados quando task-state permite ação e a sessão Persona pede documento. Não há selfie estática, callback de conclusão, alteração de status ou repetição automática. Foto de perfil exige confirmação própria da Amazon após o PUT.
- Painel inclui prévias e confirmação vinculada à conta selecionada. Em falha ou etapa não liberada, informa o problema; não marca onboarding como aprovado.
- Check e 25 testes locais aprovados, incluindo contrato multipart, confirmação, isolamento por proprietário, sessão não elegível, etapa de selfie, destinos S3 e ausência de repetição após falha. Upload externo real ainda não executado: depende de arquivos do titular e confirmação no painel.
- Publicado o commit dfc5136 no GD Apply. Limite Nginx do domínio ajustado para 20 MB, acomodando duas imagens de 8 MB; nginx -t aprovado antes do reload. Banco, chave e conexão existente preservados.
- Backup privado anterior: /opt/backups/gd-apply/20261021T040438Z. Os 25 testes passaram também no build Linux. Smoke HTTPS confirmou saúde, login, conexão preservada, conteúdo da nova tela servido e rejeição da rota sem confirmação (HTTP 400), sem envio externo.
- Ainda não houve upload real ou inspeção visual autenticada com documentos do titular. Próximo passo: selecionar as imagens no painel e confirmar o envio; somente o retorno real validará a aceitação pelo provedor.

### 20/10/2026 — Leitura direta do perfil e das etapas

- Implementado src/amazon-read.mjs: troca temporária para access token, GET de perfil, sessão web com cookies em memória e GET do mapa de etapas. Nenhum dado de onboarding alterado.
- Nova rota GET /api/amazon/accounts/{id}/onboarding valida propriedade da conta e serializa consultas por usuário. Resultados de perfil/etapas independentes, falhas explícitas, campos pessoais selecionados e nenhuma credencial no retorno.
- Adicionado botão Consultar perfil e etapas às conexões salvas, com horário de consulta e estados recebidos da Amazon. Sem consulta automática ou armazenamento de perfil no banco.
- Check e 19 testes locais passaram, incluindo isolamento de proprietário, cookies por domínio/caminho, bloqueio de redirects externos, resultados parciais e ausência de falsos sucessos por HTTP 200.
- Validação real de leitura executada no container usando a conexão autorizada: perfil recebido e 17 etapas válidas. Nenhum nome, contato, token ou cookie foi incluído neste registro. O módulo foi executado temporariamente antes da publicação.
- Publicado commit d73c3c4 no container gd-apply-app, preservando a conexão existente. Backup anterior em /opt/backups/gd-apply/20261021T035524Z; 19 testes passaram também no build Linux e nginx -t foi aprovado.
- Rota HTTPS autenticada validada após publicação: ok=true nas duas fontes e 17 etapas recebidas. Nenhum dado pessoal foi exposto nos logs de verificação. Interface verificada pelo código servido, sem inspeção visual autenticada nesta etapa.
- Próximo passo: usuário consultar o painel e orientar a próxima etapa de implementação; alterações externas exigem escopo e confirmação.

### 20/10/2026 — Primeira conexão Amazon direta confirmada

- O titular concluiu uma tentativa nova no GD Apply. O banco de produção contém uma conexão salva às 23:48:58 (America/Cuiaba), com evento amazon.connected em success.
- Verificação somente de leitura confirmou que a credencial armazenada pode ser decriptada com a chave de produção. Nenhum token, identidade ou dado pessoal foi exportado.
- A rota publicada somente salva a conta após resposta de sucesso da Amazon contendo refresh token; portanto a troca autenticada do código foi validada nesta tentativa real, sem API Apex ou serviço amazonteste.
- Não foram consultados perfil ou estado de onboarding com a nova credencial. Próximo passo: implementar consultas diretas de leitura e validar a sessão, mantendo alterações externas fora desta etapa.

### 20/10/2026 — Conexão manual direta no GD Apply

- Implementado src/amazon.mjs e rotas locais para tentativa PKCE, conclusão e remoção de conexões. Adaptado o fluxo do serviço próprio, sem dependência da API Apex ou proxy Burp; sem rotação de perfis de dispositivo.
- Painel inicia em Amazon direta: gerar link, abrir Amazon, colar retorno, confirmar e listar conexões. A senha Amazon fica na página Amazon. Tokens e verifiers são criptografados; códigos não são repetidos após resultado incerto.
- Verificação inicial no container GD Apply: DNS e TLS de api.amazon.com funcionaram; nenhuma variável de proxy configurada. Isso não comprova a troca autenticada.
- Check e 13 testes passaram localmente, incluindo contrato PKCE, Origin/CSRF, isolamento, expiração, falhas sem repetição e ausência de tokens nas respostas. Não houve uso de códigos históricos ou login externo automático.
- Backup privado anterior à publicação: /opt/backups/gd-apply/20261021T034509Z. Mesmo servidor físico, container e dados separados do amazonteste.
- Publicado o commit 14237c3 no container gd-apply-app. Os 13 testes também passaram no build Linux; nginx -t aprovado. HTTPS: health ok, login administrativo válido, nova rota gerou link www.amazon.com/ap/signin e listagem retornou zero conexões. O smoke não abriu o login Amazon nem trocou códigos.
- Próximo passo funcional: titular concluir uma tentativa nova e validar a confirmação real da Amazon; onboarding direto ainda não implementado. A interface foi conferida pelo conteúdo servido, sem verificação visual autenticada nesta etapa.

### 20/10/2026 — Serviço próprio de conexão manual localizado

- O usuário identificou amazonteste.gdapps.online como serviço próprio já existente. Seu backend está em /opt/amazup, container amazup-web; código consultado somente em leitura.
- Localizado fluxo PKCE próprio: connect/start gera tentativa e link Amazon; connect/finish valida retorno e tenta trocar código com verifier, salvando refresh token somente depois do sucesso.
- Histórico Burp contém três start HTTP 200 seguidos de três finish HTTP 502 com errorCode=NETWORK. Não há confirmação de sessão salva nessas tentativas.
- Análise em analysis/amazonteste-conexao-manual.md. URL de retorno, credenciais e capturas brutas não foram versionadas nem reproduzidas.
- Próximo passo: diagnosticar transporte de saída/proxy/CA do serviço próprio e validar uma conexão nova antes de adaptar o fluxo para o GD Apply. Nenhuma alteração ou publicação de aplicação nesta revisão.

### 20/10/2026 — Vínculo observado pelo Burp MCP

- MCP burp-suite 1.1.2 respondeu pelo bridge local configurado. Histórico consultado somente em leitura após o usuário realizar o vínculo.
- POST amazon-server-login/start retornou HTTP 202 em modo server; oito consultas acompanharam a passagem de connecting para success, com accountStatus=connected e accountId presente na resposta final. Nenhum OTP foi solicitado nessa tentativa.
- Intervalo entre respostas inicial/final de aproximadamente 12 segundos. A captura é navegador → Apex e não mostra a autenticação interna do servidor Apex na Amazon.
- Evidências sanitizadas em analysis/vinculo-burp-20261020.md; material bruto em private/, sem versionamento. Nenhuma requisição reproduzida, mudança na aplicação ou publicação.
- Próximo passo: observar a navegação Amazon pelo modo manual que abre nova aba, ou um login Amazon direto autorizado, para reconstruir o trabalhador no nosso servidor sem API Apex.

### 20/10/2026 — HARs recebidos e reanalisados

- Os dois arquivos fornecidos foram lidos offline. SHA-256 idêntico aos inventários anteriores: 745 e 761 entradas, ambas capturas de 29/08/2026.
- Confirmadas em memória as correspondências de token JSON → X-CSRF-Token e cabeçalho de resposta → anti-csrftoken-a2z nas dez chamadas selecionadas do segundo HAR. Nenhum valor secreto foi exportado.
- Confirmado que personal-info pode retornar HTTP 200 sem corpo; registrados os esquemas de consulta e implicações para o adaptador direto em analysis/revisao-hars-recebidos.md.
- A única chamada encontrada nos prefixos web de login Amazon é GET /ap/signin com HTTP 404; não há sequência completa de login/MFA nesses caminhos. O contexto de autenticação anterior permanece desconhecido.
- Validação: comparação de hashes e inspeção estrutural local; nenhuma requisição externa ou publicação. Próximo passo: obter a navegação de autenticação desde uma sessão nova, identificando se ocorre em navegador ou aplicativo nativo.

### 20/10/2026 — Objetivo corrigido para integração direta

- Revisados os dois inventários sanitizados, a comparação HAR/Apex, o mapa de API e a implementação atual.
- A integração desejada é GD Apply → Amazon, com execução no nosso servidor; a API Apex não deve ser requisito.
- Registrado o mapa de reconstrução em docs/INTEGRACAO-DIRETA-AMAZON.md, distinguindo endpoints observados de autenticação e contratos ainda incompletos.
- Usuário está localizando uma captura de login para complementar as evidências. Não houve reprodução das sessões antigas, alteração de código de produção nem publicação nesta etapa.

### 20/10/2026 — Acesso administrativo atualizado

- E-mail e senha do administrador atualizados diretamente no banco de produção, preservando o usuário e suas integrações. Credenciais não são registradas no Git.
- Backup SQLite consistente criado antes da alteração; sessões anteriores revogadas.
- Login HTTPS validado com HTTP 200 e sem exigência de troca da senha escolhida. Arquivo privado de acesso deste computador atualizado.
- Não houve alteração de código nem nova implantação. A configuração de bootstrap continua sendo somente o registro inicial e não representa a senha atual do banco.
- Próximo passo: usar as novas credenciais no painel.

Ao concluir cada tarefa, acrescentar data, mudança, testes executados, implantação efetiva e próximo passo. Não registrar senhas, tokens nem dados pessoais. Diferenciar testes com respostas controladas de chamadas reais e preservar o histórico de limitações até que evidência nova as resolva.


### 20/10/2026 — Continuidade em outros computadores

- Adicionados AGENTS.md, regra sempre ativa, guias de clonagem, operação, backup e histórico.
- Adicionado setup local independente; desenvolvimento vinculado ao loopback.
- Analisador HAR passou a receber caminhos por parâmetro e usar o diretório do script como saída padrão, sem caminhos fixos Y:/Z:.
- Alterações de continuidade não exigem reconfigurar nem recriar produção.
- Validação de continuidade: nove testes passaram no Windows e em um build Linux separado, incluindo geração isolada e preservação das credenciais de desenvolvimento. Analisador HAR executado com uma captura descartável por parâmetro. O helper local entra somente na etapa de testes do build, sem ir à imagem de produção. A aplicação online não foi substituída nesta tarefa.
- Backup privado consistente de banco e configuração criado sem parar o app em `/opt/backups/gd-apply/20261020T213200Z`; PRAGMA integrity_check retornou ok. Os dados e a chave não foram enviados ao Git. Restauração não foi executada.

### 21/10/2026 — Consulta de aplicação em análise pelo Burp

- Leitura do histórico via bridge local; sem replay, escrita externa ou alteração de produção. Dados brutos permanecem somente em private/.
- Resposta Apex GET /api/accounts/{id}, Date 21/10/2026 04:24:46 GMT, contém status e automatic_status pending_review, manual_status_override nulo e uma execução também pending_review.
- Etapas id_verification, id_selfie e background_check estão pending_review; basic_info, legal_documents, tax_interview, auto_insurance, payment_information e videos estão complete no contrato Apex.
- O frontend de referência inclui pending_review/review no conjunto de etapas consideradas finalizadas para apresentação do progresso. Portanto progresso visual completo não equivale a aprovação.
- Limite: esta consulta retornou estados armazenados pela Apex; não capturou uma resposta direta Amazon correspondente. A resposta de detalhes mais recente no histórico (04:39:41 GMT) refere-se a outra conta em ready. Não atribuir automaticamente a resposta anterior à tela atual nem afirmar sincronização em tempo real.
- Próximo passo: atualizar a consulta no navegador sob o proxy para obter nova resposta e, quando disponível, comparar com leitura direta autorizada da mesma conta Amazon.

### 21/10/2026 — Comparação da conta apresentada como aprovada

- Nova resposta Apex de detalhe, Date 04:42:10 GMT, contém status=complete, automatic_status=complete e manual_status_override=null. Estado distinto da conta pending_review anterior.
- No prefixo legível da resposta: id_verification, id_selfie, background_check, basic_info, legal_documents, tax_interview, auto_insurance, payment_information e videos estão complete. A chave adicional driver_license permanece pending_review.
- A consulta de execução às 04:42:11 GMT ainda informa pending_review. Portanto o estado agregado da conta e o histórico da execução podem divergir; não usar apenas apply_runs para determinar aprovação.
- Limite técnico: o MCP truncou esses itens em aproximadamente 5.000 caracteres, tornando o envelope individual JSON incompleto. Foram lidos somente campos completos no prefixo disponível; nenhum trecho ausente foi inferido. Evidência é da resposta Apex, sem confirmação direta Amazon.
- Correção da observação anterior sobre progresso: em analysis/detail-progress.js, finished inclui pending_review para interpretar tentativas submetidas, mas percent usa exclusivamente completeCount. Não afirmar que esse módulo calcula 100% contando revisões como aprovações.
- Nenhuma alteração de conta, código ou implantação. Próximo passo: usar status de conta, etapa e execução separadamente e comparar com dados diretos da Amazon quando houver consulta autorizada da mesma conta.

### 21/10/2026 — Enquadramento de anexos e envio direto do cadastro revisado

- Implementado editor local antes do anexo: arrastar, zoom, posição acessível por controles, encaixar, rotação de 90 graus, cancelar e confirmar; guia oval para foto de perfil e quadro da carteira. JPEG confirmado alimenta prévia, OCR, cofre criptografado e envio. Imagens salvas podem ser ajustadas novamente; cancelamento preserva a versão anterior.
- Nome completo salvo da DL passa a identificar o cabeçalho ao reabrir a conta, sem apresentar o rascunho como confirmação de alteração remota.
- POST local /api/amazon/accounts/{id}/personal-info envia somente nome, endereço e telefone da versão salva após confirmação, propriedade, Origin e CSRF. Serializa com uploads e bloqueia mudança do rascunho durante envio.
- Referência atual é o código do serviço próprio, não a rota v2 antiga do HAR: get-personal-info e submit-personal-info em /onboarding/account/data, cabeçalhos Rabbit e dois mecanismos CSRF. Não força elegibilidade nameEditable; consulta o valor atual da Amazon. Sem fallback de escrita ou repetição automática.
- Resposta estruturada success=true distingue aceitação; uma nova leitura compara os campos e distingue confirmação. HTML, erros e respostas incertas não são apresentados como cadastro atualizado. E-mail, nascimento, dados da habilitação, SSN e dados bancários não são enviados pelo botão de dados pessoais; os documentos mantêm envio separado. Não implementados contratos fiscais, bancários ou callbacks artificiais.
- Validação local: 36 testes passaram, incluindo mapeamento do endpoint atual, proteção de versão salva, isolamento, CSRF, campos permitidos, bloqueio atual de nome, leitura divergente, falha de rede sem repetição e geometria do recorte. Editor testado no navegador com imagem sintética; nenhuma imagem ou nome real foi enviado como teste.
- Implantação: pendente de build e verificações de produção nesta tarefa. Aceitação real de alteração cadastral e documentos ainda não validada com dados reais.

### 21/10/2026 — Publicação do enquadramento e cadastro direto

- Commit d0a9f50 implantado em /opt/gd-apply; 36 testes também passaram no build Linux. Container running/healthy; nginx -t aprovado.
- Backup privado anterior: /opt/backups/gd-apply/20261021T050008Z. Imagem de retorno: gd-apply-app:before-crop-personal-20261021. Preservados .env, MASTER_KEY e volume existente.
- Smoke HTTPS: health 200; módulo do recorte 200 com MIME JavaScript; rota de envio sem sessão 401; login administrativo válido; uma conexão preservada; requisição com confirm=false rejeitada com 400 confirmation_required antes de chamar a Amazon.
- Editor validado no navegador local com arquivo sintético: modal, zoom, rotação, JPEG gerado e cancelamento. Guia de perfil disponível. Nenhuma alteração cadastral ou documento real foi enviado nesta tarefa. A confirmação de aceitação real continua dependendo do envio revisado no painel e da resposta do provedor.

### 21/10/2026 — Consulta da leitura existente no dlgenerator

- Inspeção somente de leitura do projeto /srv/dlgenerator e do container dlgenerator-app, sem chamadas de extração nem transmissão de documentos.
- A rota autenticada POST /api/extract-dl recebe image/mimeType e chama Google Gemini generateContent com imagem e instrução para retornar campos em JSON. Não utiliza Google Cloud Vision OCR nem Document AI.
- Conferido o código implantado: rota de extração e generateContent presentes; endpoint vision.googleapis.com ausente. Credencial Gemini configurada no ambiente, sem proxy base URL configurado; nenhum valor de chave foi exibido, copiado para o GD Apply ou versionado.
- O serviço existente realiza extração por modelo multimodal, portanto difere do requisito de OCR puro. Nenhuma mudança de código, credencial ou produção do GD Apply nesta consulta. Não afirmar disponibilidade de cota, validade da chave ou precisão sem teste autorizado.

### 21/10/2026 — Leitura Gemini autorizada com a credencial do dlgenerator

- Usuário autorizou usar o mesmo Gemini e a mesma credencial existente do dlgenerator. Credencial transferida internamente no servidor para o ambiente privado do GD Apply, sem valor em logs, argumentos, Git ou navegador; serviço de origem preservado.
- Modelo gemini-3.8-flash, primeiro da implementação anterior, conferido na listagem autenticada de modelos disponíveis. Adaptador próprio usa host oficial fixo, chave no cabeçalho e saída JSON com esquema dos campos do formulário, sem o parser heurístico local.
- Sem ferramentas externas ou instruções vindas da imagem; campos ausentes devem retornar vazios. Validação de tipos, comprimentos, datas e ZIP; fotos limitadas a 8 MB/6 MP, resposta limitada e timeout de 30 segundos. Falha/quota não gera repetição automática ou fallback silencioso para Tesseract.
- Correções manuais, revisão, cofre e envio cadastral separado continuam preservados. Leitura não altera a Amazon nem verifica autenticidade. Aviso no formulário identifica o processamento Google.
- 39 testes locais passaram: contrato estruturado, segredo somente em cabeçalho, falhas sanitizadas, limites, isolamento/CSRF da rota e ausência de persistência automática no rascunho.
- Backup privado anterior: /opt/backups/gd-apply/20261021T051019Z. Implantação e teste real da API com imagem sintética ainda pendentes neste registro.

### 21/10/2026 — Gemini publicado e validado pela API real

- Commit 113c0dd implantado. Os 39 testes passaram também no build Linux; nginx -t aprovado, serviço saudável e conexão existente preservada.
- Teste HTTPS autenticado do endpoint OCR com PNG sintético, sem documento real: HTTP 200, engine google-gemini, aproximadamente cinco segundos, 11 campos reconhecidos. Nome, nome do meio e sobrenome comparados com os valores sintéticos esperados e corretos.
- Rascunho salvo comparado antes/depois e preservado. Nenhum cadastro, documento ou alteração de nome foi enviado à Amazon. Não houve persistência da imagem pelo OCR.
- Conferência privada dos ambientes dos containers confirmou a mesma credencial do dlgenerator e OCR_PROVIDER=gemini/GEMINI_OCR_MODEL=gemini-3.8-flash, sem imprimir valores secretos. Serviço de origem não foi alterado.
- Imagem de retorno: gd-apply-app:before-gemini-20261021; backup anterior em /opt/backups/gd-apply/20261021T051019Z. Retorno ao provedor local exige ajustar OCR_PROVIDER explicitamente.
- Próximo passo: atualizar a página e usar Reler dados nas imagens já salvas, revisando a precisão em uma DL real. Não declarar precisão garantida a partir do teste sintético.

### 21/10/2026 — Evidência de selfie Persona nos HARs existentes

- Releitura offline dos HARs fornecidos confirmou que a foto de verificação/selfie aparece na Persona, distinta da foto de perfil account-management implementada atualmente. Não atribuir o endpoint S3 de foto de perfil ao fluxo de selfie mostrado na referência.
- No segundo HAR, entrada 210 retorna etapa biométrica inicial; entrada 216 recebe POST /api/internal/verify/v1/inquiries/{id}/transition e passa a uma etapa government_id. Entradas 283 e 297 também usam transition; a resposta 297 identifica next-step.type=selfie e status=pending.
- Corpos de envio das entradas 216, 283 e 297 não estão presentes em postData; possuem metadados _requestBodyStatus/comment e tamanhos de aproximadamente 2,5 MB, 2,6 MB e 559 KB. Portanto não é possível deduzir seus campos multipart ou afirmar que representam um envio completo de selfie somente pela URL e pelo tamanho.
- Há chamadas a webrtc-consumer.withpersona.com/connect e callbacks Amazon; isso evidencia participação do fluxo Persona, não aprovação nem autorização para fabricar poses/callbacks.
- Nenhuma chamada externa, reprodução de sessão ou alteração de produção. Próximo passo: nova captura autorizada do fluxo oficial incluindo os corpos de requisição relevantes, sem publicar tokens, imagens ou biometria; preservar selfie/liveness no fluxo oficial.

### 21/10/2026 — Preparação de três anexos de selfie

- A pedido do usuário, adicionados três anexos distintos: selfie-front (frente), selfie-left (rosto para a própria esquerda) e selfie-right (rosto para a própria direita). Ordem declarada pelo usuário, ainda não validada como contrato da sessão Persona.
- Prévia, guia oval, ajuste, download, substituição e remoção reaproveitam a proteção existente. Cofre AES-GCM vincula usuário, conta, tipo e MIME; imagens persistem ao reabrir. Não há geração de poses, modificação de identidade ou reaproveitamento automático de uma foto nos três espaços.
- Nenhuma selfie é enviada ao Gemini/OCR ou ao endpoint de foto de perfil. Não há botão de envio Persona: a interface explicita preparação local e captura oficial pendente. Campos multipart e requisitos da sessão serão definidos por evidência nova; imagens estáticas não são apresentadas como cumprimento de liveness.
- 41 testes passaram, incluindo três espaços criptografados distintos, ordem da interface, CSRF e salvamento sem chamadas Google/Amazon/Persona. Nenhuma imagem real anexada como teste. Implantação pendente neste registro.

### 21/10/2026 — Três anexos de selfie publicados

- Commit 0ae1984 implantado; 41 testes passaram também no build Linux. Nginx validado e GD Apply saudável.
- Backup anterior: /opt/backups/gd-apply/20261021T052309Z; imagem de retorno gd-apply-app:before-selfie-slots-20261021.
- Smoke autenticado HTTPS confirmou as três rotas de imagem reconhecidas (404 para arquivos ainda não anexados), módulo publicado com os três espaços, health 200 e uma conexão preservada. Nenhuma selfie real enviada, copiada ou alterada na validação.
- Entrega é preparação local: envio oficial Persona continua pendente de captura e validação. Não marcar identidade como concluída a partir desses anexos.

### 21/10/2026 — Layout somente DL acima e três selfies abaixo

- Removidos da tela de detalhe o cartão avulso de foto de perfil e seu botão de envio. Primeira seção contém apenas DL frente/verso em duas colunas; as três selfies permanecem na seção seguinte. Layout de uma coluna preservado em telas estreitas.
- Cópias e rotas existentes de foto de perfil preservadas; nenhuma imagem foi apagada. Não houve mudança nos envios nem habilitação de selfie Persona.
- npm run check e 41 testes passaram. Backup anterior /opt/backups/gd-apply/20261021T052556Z. Implantação em andamento.

- Publicação concluída: e2163c8 implantado, 41 testes aprovados no build Linux e nginx -t válido. Smoke HTTPS confirmou dupla DL, ausência do cartão/botão de foto de perfil, presença das três selfies e health 200.

### 24/10/2026 — Conferência real do nome na conta indicada pelo operador

- Usuário indicou uma conta para validar se o nome revisado da DL efetivamente muda na Amazon. Identificador, nome completo e credenciais omitidos deste registro público.
- Consulta HTTPS autenticada encontrou duas conexões; uma delas possui rascunho cujo nome completo corresponde exatamente ao indicado. Nome salvo localmente difere do nome retornado pelo perfil Amazon e pelo onboarding.
- Nova consulta direta ao endpoint atual /onboarding/account/data/get-personal-info, usando a credencial criptografada da conexão no servidor, retornou nameEditable=false com campos de nome presentes. Evidência atual de 24/10, independente do HAR antigo.
- Nenhum POST de alteração foi executado; endereço, telefone, documentos e etapas permaneceram intactos. A conta consultada está WAITLISTED_ON_REGION. Não inferir que a lista de espera causa o bloqueio: são dois estados observados, sem prova causal.
- Código da referência Apex mostra salvamento application-data seguido de nova leitura da própria Apex; não revela o endpoint interno usado por seu servidor para trocar o nome na Amazon. O serviço próprio anterior contém submitLegalName via submit-attributes/name, mas isso não comprova que esse caminho possa ser usado quando o cadastro atual bloqueia a edição, nem autoriza forçar nameEditable.
- Resultado: alteração real do nome não validada nesta conta; pré-condição atual de edição está bloqueada. Necessário seguir o procedimento oficial de correção ou realizar teste autorizado numa conta em que a Amazon permita essa operação. Sem alteração de código ou implantação nesta conferência.

### 22/10/2026 — Proxy obrigatório no admin

- Atualizado checkout por fast-forward até 45b57e7 antes de integrar o proxy; preservados conexão manual Amazon, perfil/etapas, dados cadastrais, cofre de documentos, três selfies e Gemini OCR das atualizações do outro computador.
- Proxy HTTP/HTTPS global, CONNECT e autenticação Basic, credenciais AES-GCM no SQLite, teste fixo HTTPS ipify, revisão invalidada a cada salvamento e histórico sem corpos/cookies/tokens.
- Backend Amazon, Apex e Google OCR passam pelo transporte obrigatório. Sem configuração/teste ou em falha não há fallback direto. Redirect manual Amazon permanece disponível para o fluxo controlado de cookies, sem seguir destinos automaticamente.
- Login oficial abre no navegador: mesmo proxy deve ser configurado no AdsPower. Confirmação no painel não mede o IP do navegador. Retorno PKCE vinculado à revisão; trocar proxy exige novo link, e bloqueio de configuração não consome o código.
- IP exibido é fotografia do teste, não prova do IP visto por Amazon em cada chamada ou da saída Apex → Amazon. Proxies rotativos podem variar.
- npm run check e 47 testes locais aprovados; suíte HTTP/CONNECT precisou de acesso ao loopback fora do sandbox de rede. Prévia visual conferida com conta descartável sem dados reais.
- Backup privado de produção criado em /opt/backups/gd-apply/20261022T180106Z. Commit 7779a50 publicado: 47 testes aprovados no build Linux, nginx -t válido, container healthy e HTTPS health 200. Imagem de retorno gd-apply-app:before-proxy-20261022 e backup Nginx /opt/edge/nginx/active.conf.before-apply-app-20261022T181347Z.
- Próximo passo do operador: cadastrar o proxy real no admin e testar IP. Nenhuma credencial de proxy fornecida, nenhuma chamada autenticada real Amazon/Apex feita nesta tarefa.

- Smoke pós-publicação: API administrativa sem sessão retorna 401; módulo público contém a nova tela e confirmação AdsPower; migração proxy_revision presente. .env idêntico ao backup; preservados 1 usuário, 2 conexões Amazon, 1 documento e 1 rascunho. proxy_settings tem zero registros: saídas externas bloqueadas até o operador cadastrar e testar o proxy real. Nenhum teste com conta externa foi executado.
