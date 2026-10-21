# Conexão manual do serviço próprio amazonteste

Revisão em 20/10/2026, America/Cuiaba. Fontes: histórico Burp consultado em leitura e código existente em /opt/amazup no servidor autorizado. Não houve reenvio do retorno Amazon, troca de código, alteração do serviço ou publicação.

## Descoberta

O serviço próprio amazonteste.gdapps.online já implementa geração de link Amazon e recebimento manual do retorno. Portanto, a reconstrução do GD Apply pode aproveitar a análise desse código próprio; não depende de descobrir o backend privado da Apex.

O endereço enviado pelo usuário é um retorno /ap/maplanding contendo código de autorização, identidade e assinatura. Não é um link público para compartilhar nem um token de sessão já salvo. Seus valores não são reproduzidos aqui. A página Amazon exibindo erro não confirma nem invalida, sozinha, a troca do código pelo backend.

## Fluxo encontrado no código

1. POST /api/connect/start autentica o usuário local, verifica origem e permissão para o propósito solicitado e remove tentativas antigas. Cria serial, verifier e challenge S256; guarda o verifier protegido junto à tentativa e devolve ok, connectId e link.
2. O link abre www.amazon.com/ap/signin com o challenge PKCE e retorno www.amazon.com/ap/maplanding. O código define parâmetros de autenticação de dispositivo. Essa configuração é implementação existente, não confirmação de contrato público ou validação atual pela Amazon.
3. O usuário conclui o login Amazon e envia a URL final por POST /api/connect/finish com connectId, url e label.
4. O backend busca a tentativa pertencente ao usuário e valida domínio, caminho, código e correspondência do serial quando presente. O verifier correspondente permanece no servidor.
5. pkceRegister tenta trocar o código junto ao verifier em api.amazon.com/auth/register. Se houver refresh token na resposta, o serviço tenta obter dados do perfil e cria a conta no banco. A tentativa é removida após salvar.
6. Contas ONBOARDING usam proteção do refresh token vinculada ao usuário e à conta. O caminho BLOCKS no código inspecionado grava o token diretamente; qualquer reaproveitamento no GD Apply deve preservar criptografia de credenciais para todas as contas.
7. Existem funções posteriores para obter access token e cookies web, mas não foram executadas nem validadas nesta revisão.

Arquivos próprios inspecionados: app/api/connect/start/route.ts, app/api/connect/finish/route.ts, lib/flex-core.ts, lib/web-login-session.ts, lib/burp-proxy.ts e instrumentation.ts. Cópias locais de análise permanecem em private/, sem publicar o código bruto ou dados de captura.

## Resultado capturado

Horários abaixo são Date das respostas HTTP convertidos para -04:00 em 20/10/2026:

| Início | Retorno para salvar | Resultado |
| --- | --- | --- |
| 23:32:50 — start HTTP 200 | 23:34:42 — finish HTTP 502 | ok=false, errorCode=NETWORK, retryWithNewLink=true |
| 23:34:49 — start HTTP 200 | 23:35:47 — finish HTTP 502 | ok=false, errorCode=NETWORK, retryWithNewLink=true |
| 23:35:59 — start HTTP 200 | 23:37:27 — finish HTTP 502 | ok=false, errorCode=NETWORK, retryWithNewLink=true |

As três respostas start contêm ok, connectId e link. As três finish contêm ok, msg, errorCode e retryWithNewLink. Onze entradas da busca ampla não eram objetos JSON completos e não foram usadas como evidência. Nenhuma dessas respostas finish comprova sessão salva.

NETWORK é uma classificação do serviço para erros de fetch/conexão, distinta de INVALID_CODE. A causa exata de transporte não foi demonstrada por essa resposta. O serviço possui configuração opcional de proxy Burp para requisições de saída via Undici, inicializada pelo instrumentation.ts. Isso é um ponto de diagnóstico, não prova de que o proxy seja a causa da falha. Não desativar validação TLS ou controles Amazon para tentar corrigi-la.

## Próximos passos

- Diagnosticar a conexão de saída do serviço próprio com metadados de erro e configuração de proxy/CA, sem repetir os códigos já usados nem registrar segredos.
- Depois da correção, validar uma tentativa nova realizada pelo titular e confirmar a gravação da conta e uma leitura autenticada.
- Adaptar o fluxo próprio de tentativas PKCE, retorno e armazenamento para o GD Apply, com autenticação/CSRF locais, isolamento por conta e credenciais criptografadas.
- Validar os contratos de leitura de onboarding separadamente. O código e a configuração de dispositivos existentes não demonstram por si só acesso atual à Amazon.
