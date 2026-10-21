# Estado do projeto

Atualizado em 20/10/2026, fuso America/Cuiaba.

## Objetivo

Backend e painel próprios que executam a integração diretamente com a Amazon no nosso servidor. A Apex serve como referência funcional de análise, sem dependência da sua API para a conexão manual Amazon implementada. Esse objetivo foi esclarecido pelo usuário em 20/10/2026; o conector Apex anterior permanece em telas separadas. Operações diretas de onboarding continuam pendentes. O mapa de reconstrução está em docs/INTEGRACAO-DIRETA-AMAZON.md.

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

- Substituir a dependência Apex pelo fluxo direto Amazon. Validar o conector Apex deixou de ser o próximo passo do projeto.
- Integração direta Amazon: conexão manual e leitura de perfil/etapas publicadas e validadas com a conta autorizada. Alterações de onboarding continuam indisponíveis, retornando erro explícito.
- Checkout/pagamentos, preços, exclusão/arquivamento, login Amazon intermediado, OCR automático e tela remota não são recursos do nosso painel atual.
- Módulo administrativo adicional da Apex e toda a lógica do backend externo não foram analisados.
- Não foi capturado o tráfego de saída do backend Apex. Confirmar integração real exige código/logs desse backend ou rede do navegador remoto.

## Como atualizar este registro

### Documentos e fotos — implementação posterior à leitura direta

- Analisadas as rotas do serviço próprio e distinguido o envio de carteira via Amazon/Persona v3 da foto de perfil via S3. A rota antiga Alexandria/driverLicense-info não foi reutilizada.
- Implementadas rotas multipart por conta, confirmação explícita, Origin/CSRF, limites e assinatura de JPG/PNG, rejeição de frente/verso iguais e campos repetidos. Arquivos transitórios em memória, sem OCR, armazenamento local ou registro de imagens/dados nos logs.
- Frente/verso só são enviados quando task-state permite ação e a sessão Persona pede documento. Não há selfie estática, callback de conclusão, alteração de status ou repetição automática. Foto de perfil exige confirmação própria da Amazon após o PUT.
- Painel inclui prévias e confirmação vinculada à conta selecionada. Em falha ou etapa não liberada, informa o problema; não marca onboarding como aprovado.
- Check e 25 testes locais aprovados, incluindo contrato multipart, confirmação, isolamento por proprietário, sessão não elegível, etapa de selfie, destinos S3 e ausência de repetição após falha. Upload externo real ainda não executado: depende de arquivos do titular e confirmação no painel.
- Limite Nginx do domínio GD Apply ajustado no procedimento de publicação para 20 MB, acomodando duas imagens de 8 MB. Publicação e smoke serão registrados após execução.

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
