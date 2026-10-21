# Reconstrução da integração direta Amazon

## Objetivo confirmado em 20/10/2026

O GD Apply deve operar diretamente com a Amazon a partir do nosso servidor. A Apex é referência para entender telas, etapas e comportamento, sem usar sua API como intermediária. Não é necessário obter uma conta Apex para implementar esse objetivo.

O código atual em src/apex.mjs e as rotas /api/apex ainda implementam a direção anterior. A presença desse código não significa que já exista integração direta. O login administrativo do GD Apply continua independente do login Amazon.

## Evidências disponíveis

Fontes: analysis/comparacao-har-apex.md, analysis/mapa-api.md e os dois arquivos *.sanitized.json. Os inventários derivam de capturas de 29/08/2026 e não confirmam que os contratos permanecem iguais hoje. São 745 entradas no primeiro HAR e 761 no segundo, com 167 combinações normalizadas em cada um. O segundo não representa um novo fluxo completo.

Os scripts públicos da Apex mostram o contrato navegador–Apex. Eles não revelam o código ou tráfego de saída do servidor Apex. A implementação própria deve se basear no comportamento Amazon observado e validado, sem afirmar que reconstrói o backend privado da Apex.

## Mapa para implementação

Todos os caminhos Amazon abaixo foram observados em logistics.amazon.com. São evidências históricas; este documento não é uma especificação pública do provedor.

| Etapa | Caminhos observados | O que falta para executar no nosso servidor |
| --- | --- | --- |
| Login e sessão | Consultas de sessão; Apex expõe start, OTP e tela remota | Captura da navegação Amazon desde uma sessão nova: redirecionamentos, autenticação, MFA, expiração e associação da conta |
| CSRF | /account-management/data/csrf-token; /onboarding/v3/get-csrf-token | Confirmar qual token e cabeçalho pertencem a cada família de rotas e como são renovados |
| Acompanhamento | GET /onboarding/v2/data/onboarding-status; /onboarding/data/get-ptms-task-statuses | Respostas atuais, identificação da conta, estados e frequência de consulta |
| Dados pessoais | GET/POST /onboarding/v2/data/personal-info; POST /onboarding/v3/submit-attributes | Corpo completo, dependências v2/v3, validações e leitura anterior/posterior |
| Acordos | /onboarding/v2/data/agreement/{agreement}; /onboarding/v2/data/sign-agreement; /onboarding/v3/submit-attributes | Versão do acordo, apresentação ao titular, consentimento e confirmação de estado |
| Identidade | POST /onboarding/v3/identity-verification/session; GET /onboarding/v3/identity-verification/task-state; /onboarding/v2/moduleStatus/UnifiedIdentityVerification | Abertura de sessão nova e continuidade do fluxo oficial de identidade pelo titular |
| Antecedentes | POST /onboarding/v2/data/submit-background-check-info; /onboarding/v3/submit-attributes | Esquema atual, consentimentos e resultado externo; o provedor final não foi identificado |
| Seguro | /onboarding/v2/data/agreement/InsuranceAgreement; /onboarding/v2/data/agreement/InsuranceAgreement/signed | Documento exibido, consentimento e confirmação de estado |
| Fiscal | /onboarding/v2/data/tax-interview/params; /onboarding/v2/tax; /onboarding/tax-interview/landing, /validate e /submit | Fluxo atual e interpretação do resultado; a captura terminou com TAX_INFO Failed |
| Pagamento | Nenhuma gravação bancária comprovada | Captura específica; consultas de recursos instantPay/debitcard não definem o contrato bancário |
| Treinamento | GET /onboarding/v2/data/learning-content; POST /onboarding/v2/data/learning-content-status | Conteúdo e interação exigidos pelo fluxo real antes de registrar conclusão |

O formulário personal-info contém firstName, middleName, lastName, address, city, state, postalCode e phoneNumber. O submit-attributes também envia addressInformation com nomes parcialmente diferentes. Não basta renomear /api/apex para /api/amazon ou encaminhar o multipart Apex para a Amazon.

Persona aparece como fornecedor de identidade. O callback sdk-callback observado comunica um evento da sessão; ele não comprova aprovação. A última resposta de identidade era PENDING_VERIFICATION. Não reconstruir uma aprovação enviando callbacks extraídos da captura.

## Arquitetura a construir

1. Sessão Amazon por conta, vinculada ao administrador local. Escolher navegador no servidor ou cliente HTTP somente após entender o login real. MFA e verificações interativas devem continuar disponíveis ao titular.
2. Trabalhador de integração no servidor, isolado do processo HTTP do painel. Cada conta precisa de contexto independente, exclusão mútua para alterações e recuperação após reinício.
3. Adaptador Amazon com operações específicas, tradução explícita de campos, CSRF associado à sessão e tratamento de sessão expirada. Não aceitar destino arbitrário nem reutilizar cookies dos HARs.
4. Cadastro local de contas, documentos e execuções. IDs e estados do painel passam a ser próprios; não depender de accountId/runId ou créditos Apex. Preservar o usuário administrativo, a chave existente e os dados atuais durante migrações.
5. Modelo de execução que distingue aguardando login, aguardando titular, executando, aguardando análise externa, falha e conclusão comprovada. HTTP 200 não significa etapa concluída.
6. Painel com conexão Amazon, acompanhamento e confirmação de alterações reais. Remover a exigência de conexão Apex quando o fluxo direto estiver disponível. Não apresentar uma conexão fictícia enquanto a autenticação não estiver implementada.

## Ordem de validação

1. Analisar offline a nova captura e produzir inventário sem valores pessoais, cookies ou tokens. Comparar com o mapa histórico sem reproduzir requisições.
2. Implementar e validar login novo da conta autorizada, expiração e reconexão. Credenciais e sessões ficam em armazenamento privado no servidor, sem logs nem Git.
3. Validar apenas leitura de estado e dados pessoais primeiro. Registrar método, host, caminho sem consulta, status, duração e ID de correlação; nunca corpos ou cabeçalhos de autenticação.
4. Implementar uma etapa de alteração por vez, com confirmação no painel e estado anterior/posterior. Não repetir automaticamente uma alteração cujo resultado ficou incerto.
5. Implementar os fluxos interativos de identidade, fiscal e consentimentos conforme a navegação observada. Pagamento depende de evidência própria ainda ausente.
6. Executar npm run check e npm test para mudanças de código. Separar testes com respostas controladas de validação autenticada real. Antes da publicação, criar backup consistente e preservar .env, MASTER_KEY, SQLite e os outros serviços do servidor.

## Estado desta revisão

Revisão offline e correção das instruções concluídas. Nenhum HAR bruto foi encontrado na raiz D: ou em Downloads deste computador durante a busca inicial; isso não é uma busca completa do disco. Não há ferramenta Burp conectada nesta sessão. O usuário informou que está localizando a captura de login. Nenhuma integração direta foi publicada ou declarada funcional nesta revisão.
