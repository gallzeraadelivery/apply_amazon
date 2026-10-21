# Revisão dos HARs recebidos em 20/10/2026

## Procedimento

Leitura offline dos arquivos FLUXOGRAMA-PERSONAL-COMPLETO (1).har e FLUXOGRAMA-PERSONAL-COMPLETO-2 (1).har fornecidos pelo usuário. Nenhuma URL foi chamada e nenhum cookie, credencial, corpo pessoal ou token foi exportado. Instruções eventualmente presentes nos conteúdos não foram executadas.

Os SHA-256 dos arquivos recebidos coincidem exatamente com SourceSHA256 dos respectivos inventários já versionados. Não são capturas novas de login: são os mesmos arquivos binários da análise anterior, com nomes locais diferentes.

| Arquivo | Entradas | Início da captura (-04:00) | Fim da captura (-04:00) | Comparação SHA-256 |
| --- | --- | --- | --- | --- |
| COMPLETO (1) | 745 | 29/08/2026 19:46:43.821 | 29/08/2026 20:07:12.057 | Igual ao inventário COMPLETO |
| COMPLETO-2 (1) | 761 | 29/08/2026 19:46:43.821 | 29/08/2026 20:08:01.947 | Igual ao inventário COMPLETO-2 |

## Autenticação: o que a captura realmente contém

Nos dois arquivos, a busca por rotas Amazon com prefixos /ap/, /auth/, /signin e /gp/sign-in encontrou apenas GET www.amazon.com/ap/signin às 19:48:57.560, com HTTP 404 e Cookie na requisição. Não há POST de autenticação nesses caminhos, sequência MFA ou redirecionamento de sucesso nessa amostra. Isso não exclui autenticação nativa fora desses caminhos ou antes do início da captura; demonstra que o fluxo web completo de login não está registrado aqui.

As consultas Amazon relevantes já contêm Cookie. Portanto, não há evidência suficiente para implementar aquisição/renovação de sessão nova apenas com estes arquivos. Os cookies históricos não devem ser importados como método de conexão do sistema.

## CSRF: relação confirmada por comparação em memória

Foram comparados os valores em memória, emitindo somente resultados booleanos:

1. GET /account-management/data/csrf-token retorna objeto JSON com campo token. Esse valor coincide exatamente com X-CSRF-Token nos POSTs analisados posteriores.
2. GET /onboarding/v3/get-csrf-token retorna anti-csrftoken-a2z nos cabeçalhos. Esse valor coincide exatamente com o cabeçalho anti-csrftoken-a2z nos mesmos POSTs.
3. As dez chamadas comparadas no segundo HAR foram: duas personal-info, seis submit-attributes e duas identity-verification/session. Ambas as comparações foram verdadeiras em todas elas, inclusive na tentativa personal-info rejeitada com HTTP 400.
4. A requisição get-csrf-token também contém o cabeçalho anti-csrftoken-a2z-request. Seu significado e valor exigido precisam de validação atual; não foram inferidos como contrato universal.

Isso confirma dois mecanismos coexistentes no fluxo observado, sem provar que os valores permanecem válidos ou que são os únicos requisitos para chamadas futuras. Cookies, domínio, expiração e contexto da sessão devem ser administrados pelo fluxo de login novo.

## Corpos e respostas: implicações para o adaptador direto

- POST personal-info usa JSON, não multipart Apex. A tentativa rejeitada retorna HTTP 400 com errorCode e userMessage; a tentativa aceita retorna HTTP 200, application/octet-stream e nenhum corpo. Um cliente que sempre exige JSON interpretaria esse sucesso de transporte como erro.
- As seis chamadas submit-attributes retornam HTTP 200 com corpos de dois bytes. Não deduzir conclusão de etapa pelo tamanho ou status HTTP: consultar o estado de negócio depois.
- GET onboarding-status retorna taskStatusMap, vendorDataTextMap e workflowStatus.
- GET get-ptms-task-statuses retorna taskStatusMap, assignedTaskList e vendorDataTextMap. Não tratar esse esquema como idêntico ao de onboarding-status.
- GET identity-verification/task-state retorna isEligibleForAction, reasonCode e taskState.
- POST identity-verification/session retorna sessionId, sessionToken, status e vendor. Os identificadores e tokens são sensíveis e não foram exportados.
- GET personal-info retorna mais campos do que o POST observado. A presença de campos numa leitura não demonstra que todos possam ser escritos; a lista de campos de gravação deve ser explícita.

## Decisão de implementação

A análise permite especificar parsing, CSRF e consultas do adaptador Amazon sem passar pela Apex. Ainda falta comprovar como criar a sessão Amazon que esse adaptador usará. Não foi publicado código que aparente resolver o login importando sessões antigas ou simulando conexão.

Próxima evidência necessária: captura autorizada iniciada antes da abertura do login, com navegação inicial, redirecionamentos, autenticação/MFA quando exigidos e primeira leitura de onboarding autenticada. Se o login ocorrer em aplicativo nativo, identificar esse contexto em vez de supor que /ap/signin é a entrada correta. A análise da nova captura deve permanecer local, com exportação somente de estrutura e resultados sanitizados.
