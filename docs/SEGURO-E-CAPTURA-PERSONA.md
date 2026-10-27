# Seguro e captura de identidade — 27/10/2026

## Seguro no GD Apply

Na conta Amazon conectada, abra Seguro → Consultar e revisar termos do seguro. A aplicação usa a sessão atual da conta e o proxy testado, consulta COMMERCIAL_INSURANCE e busca os termos em GET /onboarding/v2/data/agreement/InsuranceAgreement.

Os termos vêm do campo agreementDocumentContent e são apresentados como texto e formatação inertes, sem executar scripts, copiar atributos ou abrir links. Conteúdo incompatível/incompleto é bloqueado para continuar no aplicativo oficial. O operador deve ler os termos, marcar a confirmação e clicar Aceitar e enviar à Amazon. A implementação não autoriza um agente a aceitar termos pelo operador.

O corpo observado na captura de 27/10 foi {"InsuranceAgreement":true}, enviado para POST /onboarding/v2/data/agreement/InsuranceAgreement/signed em logistics.amazon.com. A resposta capturada foi HTTP 200 sem corpo. Nenhum cookie, CSRF ou token da captura é reutilizado; as credenciais vêm da conexão atual criptografada no servidor.

Antes de enviar, o backend consulta os termos novamente e compara seu SHA-256 com a revisão mostrada. Mudança de conteúdo, conta, revisão do proxy, ausência de confirmação, expiração de dez minutos ou tentativa já consumida bloqueiam a ação. O identificador é consumido antes da rede; não há repetição automática após resultado incerto. Uma revisão nova invalida a anterior pendente.

Resposta HTTP 200 vazia é registrada como recebimento; uma consulta posterior a COMMERCIAL_INSURANCE precisa retornar Complete para mostrar conclusão confirmada. Falha na leitura ou etapa ainda em andamento não vira falso sucesso. Etapa já concluída não recebe novo aceite. Resultado inesperado exige consultar antes de decidir qualquer nova tentativa.

## Identidade: o que foi observado

- Amazon: POST /onboarding/v3/identity-verification/session abriu sessão para Persona.
- Persona: POST /api/internal/verify/v1/inquiries/{id}/transition, em inquiry.withpersona.com, recebeu multipart para carteira e para current_selfie. A exibição MCP truncou os corpos. Pesquisa posterior diretamente no histórico completo confirmou na requisição current_selfie quatro partes com filename: três image/jpeg e uma video, com extensão de arquivo MP4 ou MOV. Isso confirma a quantidade de mídias nesta captura, não uma regra universal do fornecedor.
- Após a selfie oficial do operador: callback /onboarding/v3/identity-verification/session/sdk-callback respondeu status success. task-state retornou PENDING_VERIFICATION e workflowStatus IN_PROGRESS. Isso confirma fluxo encaminhado, não aprovação.
- Há preparação local de três selfies e um conector de carteira já implementado com testes controlados. O corpo nativo iOS observado contém campos diferentes do multipart presumido no conector atual; não declarar equivalência nem aceitação real sem validar o contrato completo.
- Nenhum novo envio de selfies foi implementado. Preservar o fluxo oficial de presença, sem fabricar poses, timestamps, extrações do documento, resultados ou callbacks. Não enviar fotos locais como se fossem uma captura oficial validada.

A contagem de mídias da selfie foi confirmada por pesquisa no histórico completo: no mínimo três cabeçalhos image/jpeg e nenhum quarto image; um cabeçalho video e nenhum segundo; quatro partes filename e nenhuma quinta. Para fechar o contrato de frente/verso, mapear cada parte e os requisitos da sessão, inspecionar a requisição completa no Burp ou exportar privadamente as entradas selecionadas. Contar as partes de imagem reais, distinguindo-as de metadados e frames. Exportações contêm documentos e segredos: guardar fora do Git/logs/artefatos públicos. Esta tarefa não valida um contrato público da Persona ou da Amazon.

## Validação e operação

Testes usam respostas sintéticas, incluindo termos alterados, CSRF, propriedade, proxy, consumo único, erro de transporte, resposta HTML inesperada e leitura divergente. Nenhum aceite real foi executado como teste. Orientações de publicação e versão efetivamente implantada ficam em ESTADO-DO-PROJETO.md.


## Conferência adicional no histórico completo

- O corte de 5.015 caracteres era da resposta exibida pelo MCP, não prova de perda do corpo no Burp. As buscas regex do próprio Burp conseguem consultar conteúdo após esse corte.
- Endpoint da selfie: POST https://inquiry.withpersona.com/api/internal/verify/v1/inquiries/{id}/transition. Multipart com current_selfie, coleção files[], captureStartedAt, captureMethod, capturedAt e cameraProperties.
- Confirmadas três imagens JPEG e um vídeo em quatro partes de arquivo. A contagem não determina sozinha quais poses estão nas imagens, não valida os bytes/decodificação nem permite substituir captura oficial por imagens estáticas.
- As duas requisições de carteira encontradas contêm seis partes JPEG e uma de vídeo. Busca delimitada pelos campos page confirmou três imagens no grupo front e três no grupo back; ver mapeamento abaixo. Não reduzir o contrato a dois anexos arbitrários nem marcar o conector antigo como compatível com base nessa contagem.
- Nenhuma imagem ou vídeo extraído, publicado ou reenviado; nenhum callback fabricado. Continuidade: mapear o contrato nativo completo em ambiente privado e manter a verificação de presença no fluxo oficial.


## Mapeamento frente/verso no multipart iOS

O operador informou captura primeiro da frente, depois do verso com código. A análise foi somente de leitura no Burp; nenhum documento foi extraído, decodificado, alterado ou reenviado.

Endpoint: POST https://inquiry.withpersona.com/api/internal/verify/v1/inquiries/{id}/transition, multipart/form-data com boundary persona-ios-form-boundary.

- Grupo de frente: campo data[attributes][fields][current_government_id][files][][page] com valor front. Três cabeçalhos Content-Type de imagem ocorrem dentro desse grupo, antes do próximo campo page.
- Grupo de verso: mesmo campo page com valor back. Três cabeçalhos Content-Type de imagem ocorrem dentro desse grupo, antes de um eventual próximo page.
- Coleção de imagens: confirmado o nome data[attributes][fields][current_government_id][files][][frames][]. Confirmado também o campo irmão captureMethod, em camelCase.
- Total por requisição de carteira encontrada: seis image/jpeg, nenhuma sétima imagem; um cabeçalho video e nenhum segundo. Confirmada a presença do delimitador multipart de encerramento. Isso confirma estrutura/contagem no histórico, não valida a decodificação e integridade de cada arquivo.
- O vídeo faz parte do envio nativo. A função exata dele e de cada um dos três frames de cada lado não foi identificada apenas pelos cabeçalhos. Não afirmar que as imagens são duplicatas, recortes ou poses específicas.
- O verso é o lado com código descrito pelo operador; não foi decodificado nem classificado como QR ou PDF417. Campos clientExtractionRaws estão presentes, mas seus valores pessoais não são copiados para este registro.

### Diferença para o conector existente

O conector atual de carteira monta um frame por lado e usa campos capture_method/meta[from_step], enquanto o envio nativo observado possui coleção frames[], captureMethod e metadados camelCase. A captura de seis imagens e vídeo não comprova que todos sejam obrigatórios em qualquer sessão ou que arquivos estáticos adicionais possam ser fabricados para substituí-los. Portanto, esta análise não altera o conector nem o marca como validado contra o iOS. Manter a captura oficial e requisitos da sessão sem inventar metadados, mídia ou resultados.

Selfie é outro grupo, current_selfie: três JPEG e um vídeo, conforme a conferência anterior. Não confundir os seis frames da carteira com as três imagens da selfie.
