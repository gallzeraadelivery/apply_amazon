# Mapa da API Apex — 20/10/2026

## Escopo e evidência

Análise do app.js e detail-progress.js públicos, histórico HTTP do Burp, histórico WebSocket e resultados passivos do Scanner/JS Link Finder. Não foram repetidas operações de alteração, login, pagamento ou execução. IDs e dados pessoais foram omitidos.

CAPTURADO indica que uma requisição apareceu no histórico; não comprova sucesso de negócio. CÓDIGO indica função deduzida do chamador no frontend, sem confirmação da implementação do servidor. Este inventário cobre o frontend disponível, não todas as rotas possíveis do backend. Parâmetros de consulta e variantes de uma mesma rota foram agrupados.

## Rotas observadas na captura

- POST /api/auth/login — autentica usuário do painel.
- GET /api/me — consulta usuário da sessão.
- GET /api/accounts — lista contas; include_archived solicita arquivadas.
- GET /api/accounts/{id} — consulta detalhes da conta.
- GET /api/accounts/{id}/access — consulta dados de acesso vinculados à conta; resposta sensível.
- GET /api/credits — consulta créditos.
- POST /api/accounts/{id}/file/dlFront — envia frente do documento.
- POST /api/accounts/{id}/file/dlBack — envia verso do documento.
- POST /api/accounts/{id}/file/profilePhoto — envia foto.
- GET /api/accounts/{id}/file/{tipo} — consulta arquivo enviado; query download é usada para baixar.
- POST /api/ocr/driver-license — envia documento para extração de campos; provedor de OCR não identificado.
- POST /api/accounts/{id}/application-data — salva formulário de dados pessoais, endereço, documentos e pagamento. Campos incluem firstName, middleName, lastName, phoneNumber, address, city, state, postalCode e dateOfBirth; multipart/form-data e Bearer. Duas respostas 200 foram observadas anteriormente. Isso não comprova atualização na Amazon.
- GET /api/vacancies — consulta vagas disponíveis.
- GET /api/vacancies/orders/latest — consulta último pedido de vaga.
- GET /api/runs/{id} — consulta execução, steps, current_steps e events; aceita events_cursor. Houve respostas 200 e uma 502 na amostra anterior. Estado de fila é diferente de conclusão.

## Demais rotas identificadas no código

### Autenticação do painel

- POST /api/auth/signup — cadastro; email, password e locale.
- POST /api/auth/confirm — confirmação de cadastro.
- POST /api/auth/resend-confirm — reenvio de confirmação.
- POST /api/auth/forgot — início de recuperação de senha.
- POST /api/auth/reset — redefinição com email, code e password.
- PATCH /api/me/locale — altera idioma do usuário.

### Contas e documentos

- POST /api/accounts — conecta conta usando sessionRef; não é prova do destino externo dessa sessão.
- PATCH /api/accounts/{id} — altera amazonLabel, o nome de referência no painel; não confundir com nome cadastral externo.
- DELETE /api/accounts/{id} — a interface descreve como arquivamento, preservando runs, logs e uploads; não confirmar exclusão física.
- POST /api/accounts/archive-bulk — arquivamento em lote por accountIds.
- POST /api/accounts/{id}/restore — restauração da conta arquivada.
- POST /api/accounts/restore-bulk — restauração em lote.
- POST /api/accounts/{id}/reconnect — submete nova sessionRef para reconexão.
- POST /api/accounts/{id}/connection-documents — envia documentos da conexão; pode retornar falta de créditos.
- GET /api/accounts/{id}/amazon-password — solicita senha vinculada à conta; não foi consultada nesta análise.
- GET /api/accounts/{id}/file/barcode — solicita recurso de barcode a partir do documento, segundo o chamador.
- POST /api/accounts/{id}/file/{tipo} — upload do arquivo escolhido.
- POST /api/accounts/{id}/refresh — solicita releitura do estado da conta.
- POST /api/accounts/{id}/region-refresh — solicita releitura da região.
- POST /api/accounts/refresh-all — solicita atualização em lote.
- POST /api/accounts/refresh-analysis — inicia trabalho de atualização de análise; filtro opcional owner_email.
- GET /api/accounts/refresh-analysis/{jobId} — acompanha esse trabalho.
- GET e POST /api/accounts/{id}/review-preparation — consulta/inicia preparação antes da revisão; estados incluem queued, running, complete e failed.
- POST /api/accounts/{id}/start — inicia execução após salvar dados; from_step permite retomar uma etapa. Existência e função confirmadas no código, sem chamada encontrada no filtro específico do histórico.
- GET e POST /api/accounts/{id}/tax-ssn-retry — consulta/inicia nova tentativa fiscal. Comportamento externo não validado.
- POST /api/accounts/{id}/ssn-not-found-bypass — o frontend descreve um fluxo alternativo quando SSN não é encontrado. Não foi acionado nem validado; nome da rota não comprova aceitação por terceiros.

### Login Amazon mediado pela Apex

- POST /api/amazon-server-login/start — envia email, password e reconnectAccountId à Apex; aguarda mode=server e ID da tentativa.
- GET /api/amazon-server-login/{id} — consulta tentativa, incluindo necessidade de OTP e fallback manual.
- POST /api/amazon-server-login/{id}/otp — envia code à Apex.
- DELETE /api/amazon-server-login/{id} — solicita cancelamento da tentativa.
- POST /api/amazon/signin-url — solicita URL de login; navegador abre data.url. O domínio efetivo depende da resposta e não está fixado nesse chamador.

### Onboarding remoto

Todas as rotas abaixo usam POST no frontend:

- /api/accounts/{id}/onboarding-view — abre visualização da sessão.
- /api/accounts/{id}/onboarding-view/frame — solicita imagem do estado remoto; consulta repetida aproximadamente a cada 1,2 segundo.
- /api/accounts/{id}/onboarding-view/click — envia interação: coordenadas, texto, teclas e gestos conforme os handlers.
- /api/accounts/{id}/onboarding-view/back — solicita navegação de retorno.
- /api/accounts/{id}/onboarding-view/home — solicita navegação inicial.
- /api/accounts/{id}/onboarding-view/close — solicita fechamento.

O frontend desenha data.image em um elemento img e usa data.pagePath como descrição. Isso sustenta a interpretação de controle de sessão remota, mas não identifica tecnologia, domínio real ou provedor. O botão é limitado a admin no frontend; autorização no servidor não foi testada. Nenhuma dessas chamadas apareceu no filtro específico consultado.

### Créditos, vagas e contas de origem

- POST /api/credits/checkout — solicita checkout para quantidade de créditos; abre URL retornada. Provedor de pagamento não identificado.
- POST /api/source-accounts/claim — solicita vinculação de conta por city e state.
- POST /api/vacancies/free-claim — solicita resgate de vaga, com identificação da solicitação no chamador.
- POST /api/vacancies/checkout — solicita compra/reserva por city e state; pode retornar conta já vinculada ou URL de checkout.
- PUT /api/vacancies/prices — envia lista items para alterar preços.
- POST /api/vacancies/orders/{id}/retry — nova tentativa de pedido.
- POST /api/vacancies/orders/{id}/reopen — reabertura de pedido.
- POST /api/vacancies/orders/{id}/cancel — cancelamento de pedido.
- GET /api/ops/ui.js — carrega módulo administrativo adicional; não analisado, não solicitado sem autenticação e não incluído no inventário interno desse módulo.

## O que as ferramentas demonstraram

- MCP: acesso de leitura ao histórico e configuração; não expõe código do backend ou todas as funções das extensões.
- Burp Proxy: evidencia tráfego navegador–Apex. Respostas grandes e binárias podem ser truncadas pelo MCP; ausência em uma página ampla não prova ausência no histórico. Foram usados filtros específicos adicionais.
- JS Link Finder: resultados passivos confirmam análise de app.js, detail-progress.js e leaflet.js. Os registros consultados não fornecem uma lista de links extraídos; análise direta complementou a extensão.
- WebSocket History Exporter/histórico: filtro pelo domínio da Apex não retornou mensagens; isso não exclui mensagens cujo registro não contenha o domínio, conexões de outras sessões ou outras formas de atualização.
- Logger++: instalação/carregamento confirmados anteriormente, mas suas entradas específicas não são expostas pelo MCP atual; não foram usadas como evidência independente.
- Scanner: há alertas passivos sobre CSP, cache e emails em respostas. Não comprovam exploração nem identificam destinos externos. Emails em resposta autenticada não demonstram, por si só, vazamento indevido.
- Repeater/Intruder/Collaborator: não executados; não são necessários para mapear o frontend e poderiam causar ações ou testes externos sem esclarecer a lógica interna.

## Conclusões e próximos passos

É possível explicar a intenção das APIs expostas neste frontend e confirmar quais foram acionadas. Não é possível afirmar o efeito de cada API dentro do servidor apenas pelo nome ou por HTTP 200.

Nenhuma referência literal ao Checkr foi encontrada nos dois scripts principais; o filtro específico de destinos Checkr não retornou chamadas. Isso não exclui uso no backend. Os scripts principais usam rotas relativas da Apex; URLs recebidas dinamicamente e bibliotecas adicionais exigem análise separada.

Para comprovar integração real com Amazon Flex: localizar os handlers backend de amazon-server-login, onboarding-view, application-data e start; registrar destino, método, caminho, horário, status e ID da execução das chamadas de saída, sem registrar credenciais; se houver navegador remoto, capturar sua rede e URL de navegação. Relacionar os eventos por accountId/runId. Depois comparar o estado anterior e posterior no serviço externo autorizado.

Também falta obter o módulo administrativo, revisar seus chamadores e exportar respostas completas quando o MCP truncar o conteúdo. Este documento é um mapa funcional com limites de evidência, não uma auditoria de segurança concluída.
