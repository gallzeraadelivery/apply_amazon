# Cruzamento da captura Apex — 24/10/2026

Análise passiva do histórico Burp local e dos scripts públicos atuais, sem repetir operações nem autenticar com dados capturados. Somente conclusões sanitizadas são versionadas; documentos, identidades, tokens e corpos privados não são incluídos.

## Evidências da tentativa atual

- Conta identificada internamente pelo POST /api/accounts/{id}/start de 24/10 às 15:05:03 UTC (11:05:03 America/Cuiaba). HTTP 200, run.status queued. Corpo contém somente from_step: selfie; não contém nome nem telefone.
- Histórico dessa mesma conta contém uploads dlFront, dlBack e profilePhoto, leituras de arquivos e GET de conta. Corpos binários truncados pelo MCP não permitem concluir todo o conteúdo das respectivas respostas.
- GET da conta às 14:59:12 e 15:05:04 UTC: last_known_status.application_data.basic_info mudou nos campos firstName, middleName, lastName, address, city, state e postalCode. phoneNumber não mudou entre essas leituras. São dados preparados reportados pela Apex, não confirmação independente de cadastro Amazon.
- current_name permaneceu igual entre essas duas respostas; profile_read_at mudou. Status de conta mudou de action_required para running, enquanto a execução criada respondeu queued.
- O operador informou ter visto o nome novo no app Amazon. Registrar como confirmação relatada pelo operador; não foi realizada inspeção independente do app.
- Os dois POST application-data encontrados pertencem a 20/10, não a esta tentativa. A atribuição anterior deles à sessão de 24/10 foi corrigida durante a análise.
- Não foram encontrados WebSockets no histórico consultado, chamadas onboarding-view nem get-personal-info/submit-personal-info capturadas pelo navegador. Ausência no histórico consultado não comprova ausência no backend ou em outro navegador.

## Caminhos no JavaScript público atual

O script foi baixado sem autenticação em 24/10. Não afirmar identidade byte a byte com o script executado pelo navegador: o MCP trunca as respostas e a cópia local antiga tem hash diferente.

- saveApplicationData: POST relativo /api/accounts/{id}/application-data com FormData; exige resposta de conta correspondente e faz nova leitura.
- persistCroppedDocument: POST relativo /api/accounts/{id}/file/{tipo}; frente/verso acionam OCR em /api/ocr/driver-license. O frontend preenche campos; o conteúdo do processamento servidor não está exposto no JS.
- performStartRun: no fluxo geral persiste dados antes de /start; na continuação de selfie pula esse salvamento e envia from_step selfie. Isso é compatível com o corpo capturado nesta tentativa.
- fetchAccountRequest: encaminha fetch(path, options); esses caminhos são relativos ao host Apex. O acompanhamento usa GET /api/runs/{id}; não foram encontrados construtores WebSocket, EventSource ou sendBeacon nesses dois scripts.
- onboarding-view e rotas frame/click/back/home existem no frontend atual para uma visualização controlada pelo servidor. Não foram observadas nesta captura; existência não prova uso para alterar nome.

## Destino Amazon: possibilidade, não atribuição

O conector próprio já possui logistics.amazon.com/onboarding/account/data/get-personal-info e submit-personal-info em src/amazon-personal.mjs. São candidatos funcionais conhecidos para dados pessoais; esta captura não demonstra que a Apex os usou. Preservar consulta de elegibilidade e nameEditable; não executar tentativas para forçar edição.

Para atribuir a chamada exata Apex → Amazon, é necessário tráfego/log do processo autorizado que efetua a alteração, ou captura completa desse navegador/processo. Instalar outra extensão no Burp do navegador cliente não expõe automaticamente a rede do servidor Apex. Nenhuma alteração de aplicação ou implantação foi feita nesta análise.
