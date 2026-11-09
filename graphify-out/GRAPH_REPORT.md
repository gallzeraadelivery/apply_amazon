# GD Apply — grafo do código

Base: commit `f34f7fe`. Extração estrutural local pelo Graphify de 17 módulos JavaScript versionados em `src/` e `public/`: 193 nós, 489 relações e 13 comunidades.

- [Grafo interativo](graph.html): explore funções, classes e relações.
- [Dados do grafo](graph.json): consulte ou importe a estrutura.

O painel chama a API Node.js, que consulta o SQLite e usa o proxy para integrações externas. OCR local é executado no backend sem passar pelo proxy. A selfie permanece no fluxo oficial Amazon/Persona. Relações estáticas não verificam comportamento em produção nem confirmam aceitação pelo provedor.

Nenhum HAR, banco, imagem, credencial ou arquivo privado entrou na extração. Para atualizar, execute a extração Graphify novamente sobre os módulos JavaScript versionados dessas duas pastas.
