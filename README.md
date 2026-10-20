# Apply Amazon

Projeto em preparação para um backend próprio de integração Apex e Amazon Flex/onboarding.

## Estado atual

- Análise offline de JavaScript e capturas HAR, com inventários sanitizados.
- Mapeamento de rotas e correspondências funcionais; integração backend Apex–Amazon ainda não confirmada.
- Infraestrutura do domínio `apply.gdapps.online` preparada com HTTPS e health check do gateway.
- A aplicação e as integrações autenticadas ainda não estão implementadas nem implantadas.

## Arquivos

- `analysis/mapa-api.md`: rotas identificadas no frontend e no histórico do Burp.
- `analysis/comparacao-har-apex.md`: comparação do fluxo de referência com o frontend Apex.
- `analysis/*.sanitized.json`: inventários com caminhos normalizados, contagens, status e nomes de campos, sem valores dos corpos ou credenciais.
- `analysis/app.js` e `analysis/detail-progress.js`: cópias dos scripts públicos analisados; não são a implementação do nosso backend.
- `analysis/analisar-hars.ps1`: análise offline dos arquivos locais de referência.
- `deploy/`: registro e procedimento inicial de configuração do domínio.

## Dados e credenciais

HARs originais, cookies, tokens, chaves privadas, documentos e capturas brutas não fazem parte deste repositório. A integração futura precisa de credenciais válidas e de uma forma autorizada de acesso a cada serviço. Endpoints encontrados em capturas não representam um contrato de API pública.
