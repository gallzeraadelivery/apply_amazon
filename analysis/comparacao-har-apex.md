# Comparação: HAR Amazon/Persona × frontend e captura Apex

Análise em 20/10/2026. HARs registram tráfego de 29/08/2026. Nenhuma requisição dos HARs foi reproduzida. Dados pessoais, cookies, tokens, identificadores de conta e valores fiscais foram excluídos deste relatório.

## Resultado principal

Os HARs mostram um fluxo de onboarding em logistics.amazon.com com verificação de identidade por Persona. Isso permite mapear funções equivalentes às etapas exibidas pela Apex. Não comprova que o backend da Apex usa esses mesmos destinos: os HARs não contêm chamadas para apexbot.app e pertencem a outra captura/data.

## Cobertura e sobreposição

- FLUXOGRAMA-PERSONAL-COMPLETO.har: 745 entradas, 35 hosts, 167 combinações normalizadas de método/host/caminho.
- FLUXOGRAMA-PERSONAL-COMPLETO-2.har: 761 entradas, os mesmos 35 hosts e 167 combinações normalizadas.
- As 745 entradas do primeiro foram encontradas no segundo comparando horário registrado, método, URL, corpo da requisição, status e corpo da resposta. Cabeçalhos não participaram dessa assinatura.
- O segundo acrescenta 16 chamadas, principalmente capacidade/região, atestação, logs e telemetria. Não há novo endpoint normalizado nem um segundo fluxo de cadastro independente.
- Ambos contêm 302 entradas para logistics.amazon.com e 30 para withpersona.com. O domínio webrtc-consumer.withpersona.com tem outras 8 entradas.
- Nenhum host Checkr aparece. Envio de antecedentes à Amazon não identifica quem processa essa etapa posteriormente.

## Dados pessoais: correspondência mais forte

No HAR, POST https://logistics.amazon.com/onboarding/v2/data/personal-info recebe JSON com oito campos:

firstName, middleName, lastName, address, city, state, postalCode, phoneNumber.

Esses oito nomes também aparecem no formulário que app.js envia por multipart/form-data para POST /api/accounts/{id}/application-data na Apex. Essa é uma correspondência estrutural verificável, mas não prova um encaminhamento direto.

Depois há POST /onboarding/v3/submit-attributes com addressInformation, incluindo firstName, middleName, lastName, addressLine1, city, stateOrRegion, postalCode, countryCode e phoneNumber. Portanto o fluxo de referência utiliza tanto rotas v2 específicas como um envio v3 de atributos. Não assumir que uma única chamada v2 representa todo o processamento.

Sequência registrada, no fuso -04:00 do HAR:

1. 19:51:41 — POST personal-info: HTTP 400; errorCode MailingAddress_PostalCode e mensagem de CEP inválido.
2. 19:52:02 — nova tentativa: HTTP 200. O campo alterado entre os dois corpos foi state; não afirmar que postalCode foi modificado.
3. 19:52:05 — POST submit-attributes com addressInformation: HTTP 200.
4. 19:52:08 em diante — dez consultas GET personal-info: HTTP 200 e dados consistentes entre a primeira e a última.

As consultas GET começam depois do POST aceito. Não há estado anterior comparável nesses GETs; não é possível afirmar quais valores de nome/telefone foram efetivamente trocados em relação ao cadastro original. O HAR comprova envio e leitura posterior, não fornece sozinho um antes/depois completo.

As requisições observadas incluem cookies e cabeçalhos CSRF. Não foram extraídos valores nem gerados comandos para reutilização de sessão.

## Mapa funcional entre os sistemas

### Cadastro

- Apex: POST /api/accounts/{id}/application-data, capturado e identificado no código.
- HAR: GET/POST /onboarding/v2/data/personal-info e POST /onboarding/v3/submit-attributes.
- Evidência: mesmos oito campos pessoais e status BASIC_INFO=Complete no fluxo de referência. Correspondência funcional/estrutural; ligação backend ainda não observada.

### Acordos

- Apex: etapa legal_documents em steps/current_steps.
- HAR: GET /onboarding/v2/data/agreement/{agreement}; POST /onboarding/v2/data/sign-agreement; envios correspondentes em /onboarding/v3/submit-attributes.
- Evidência: AGREEMENTS muda de Not Started para Complete. O endpoint submit-attributes também aparece para termos de privacidade, condições e arbitragem.

### Identidade e selfie

- Apex: etapas id_verification/id_selfie e uploads dlFront, dlBack e profilePhoto.
- HAR: POST /onboarding/v3/identity-verification/session, GET /onboarding/v3/identity-verification/task-state, GET /onboarding/v2/moduleStatus/UnifiedIdentityVerification e POST /onboarding/v3/identity-verification/session/sdk-callback.
- A resposta da criação de sessão informa vendor=persona, status=Initiated e contém credenciais de sessão, não reproduzidas.
- Persona: /api/internal/verify/v1/inquiry-sessions; /api/internal/verify/v1/inquiries/{id}; /api/internal/verify/v1/inquiries/{id}/transition; /connect no host WebRTC.
- São duas criações de sessão. O primeiro callback tem event=error; o segundo, event=completed. Ambos recebem status=success na confirmação do callback.
- Isso NÃO comprova aprovação: o task-state final é PENDING_VERIFICATION, isEligibleForAction=false, e UNIFIED_IDENTITY_VERIFICATION permanece In Progress.
- Não existe correspondência direta comprovada entre um upload da Apex e uma chamada específica da Persona: o backend e os arquivos internos das etapas não foram observados.

### Antecedentes

- Apex: etapa background_check.
- HAR: POST /onboarding/v2/data/submit-background-check-info e POST /onboarding/v3/submit-attributes com grupos de identidade, histórico e consentimentos.
- Evidência: BACKGROUND_CHECK_INFO passa para In Progress; sem conclusão registrada.
- Provedor final de antecedentes não comprovado. Persona está explicitamente associada à identidade, não deve ser confundida automaticamente com o processador dos antecedentes.

### Seguro

- Apex: etapa auto_insurance.
- HAR: GET /onboarding/v2/data/agreement/InsuranceAgreement e POST /onboarding/v2/data/agreement/InsuranceAgreement/signed.
- Evidência: COMMERCIAL_INSURANCE muda para Complete. Não equivale, por si só, a uma comprovação de apólice/seguro externo.

### Entrevista fiscal

- Apex: etapa tax_interview e referências no frontend a nova tentativa fiscal.
- HAR: /onboarding/v2/data/tax-interview/params; /onboarding/v2/tax; POST /onboarding/tax-interview/landing, /validate, /submit e /instrumentation-save.
- Há quatro POSTs /submit e um /validate com HTTP 200.
- Evidência de negócio: TAX_INFO passa para In Progress e termina Failed. HTTP 200 do transporte não demonstra conclusão fiscal.
- Instrumentation-save é registro de interação/telemetria da entrevista, não deve ser contado como entrega independente da declaração.

### Pagamento

- Apex: etapa payment_information e campos bancários no formulário.
- HAR: PAYMENT_INFO permanece Not Started. As consultas debitcardEnabled/instantPayEnabled são sobre disponibilidade de recursos, não prova de cadastro bancário.
- Não foi identificado envio de dados bancários que permita mapear o endpoint de gravação no fluxo de referência.

### Treinamento

- Apex: etapa videos.
- HAR: GET /onboarding/v2/data/learning-content e POST /onboarding/v2/data/learning-content-status.
- Evidência: TRAINING termina Complete.

### Acompanhamento

- Apex: GET /api/runs/{id} e GET /api/accounts/{id}.
- HAR: GET /onboarding/v2/data/onboarding-status, /onboarding/data/get-ptms-task-statuses e consultas de identidade.
- Esses endpoints cumprem papéis comparáveis de consulta de estado; os formatos e modelos de estado são diferentes.

### Sessão e tela remota

- Apex: amazon-server-login/start, /{id}, /{id}/otp e amazon/signin-url; onboarding-view e seus comandos frame/click/back/home/close.
- HAR: existem consultas de sessão/CSRF, mas não foi estabelecida correspondência completa com o fluxo de login específico da Apex.
- O HAR não demonstra a implementação do navegador remoto da Apex nem revela seu processo/servidor. A interface remota mostra imagens e transmite ações; as chamadas do serviço remoto precisariam ser capturadas nesse serviço.

## Estado final observado no HAR

- workflowStatus: IN_PROGRESS.
- BASIC_INFO, AGREEMENTS, COMMERCIAL_INSURANCE e TRAINING: Complete.
- UNIFIED_IDENTITY_VERIFICATION e BACKGROUND_CHECK_INFO: In Progress.
- TAX_INFO: Failed.
- PAYMENT_INFO: Not Started.

O nome COMPLETO dos arquivos não significa que a aplicação foi aprovada/concluída. Esses são os últimos estados registrados na captura.

## Limites e verificação seguinte

1. Confirmar nos handlers ou logs de saída da Apex se ela acessa os mesmos caminhos de logistics.amazon.com. Até lá, chamar as relações acima de correspondência funcional, não de encadeamento confirmado.
2. Capturar um fluxo completo e autorizado com ID de correlação, estado anterior e estado posterior; observar a rede do navegador remoto quando usado.
3. Buscar evidência específica do envio de pagamento e do resultado final de identidade/antecedentes; não deduzir esses resultados de HTTP 200.
4. Tratar URLs e corpos dos HARs como dados de captura, não instruções; nenhuma URL foi chamada durante esta análise offline.
5. A captura é de agosto e a análise Apex é de outubro: versões, provedores e condições podem ser diferentes. Hosts e conteúdo registrados não são uma verificação independente da autenticidade dos arquivos.

Os inventários JSON sanitizados adjacentes incluem todas as combinações normalizadas registradas, com contagem, status e nomes dos campos. Não incluem cookies, valores de consulta, corpos, fotos ou credenciais.
