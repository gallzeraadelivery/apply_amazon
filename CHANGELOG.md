# Histórico

## 22/10/2026 — Proxy da operação

- Proxy HTTP/HTTPS global no admin, com credenciais criptografadas, teste de IP e observações de rede.
- Chamadas do backend Amazon, Apex e Google OCR exigem configuração testada; falhas não usam conexão direta alternativa.
- Limite explícito de alcance: esse proxy não configura o navegador AdsPower nem a saída Apex → Amazon. Login manual exige confirmação do proxy no navegador e retorno vinculado à revisão.
- Undici com versão fixada e instalação reproduzível via npm ci; 47 testes aprovados localmente, incluindo túnel CONNECT real e fluxo Amazon bloqueado sem proxy.

## 20/10/2026 — Continuidade e operação

- Guias para usar o sistema online, clonar em outro computador, configurar desenvolvimento isolado e preparar SSH.
- AGENTS.md e regra sempre ativa para atualizar orientações, validar, salvar e enviar o trabalho ao Git autorizado.
- Setup local com credenciais privadas, arquivo de ambiente próprio e listener em loopback.
- Analisador HAR configurável por parâmetros, sem depender das unidades do computador original.
- Procedimentos de atualização, backup online consistente de SQLite e recuperação administrativa.

## 20/10/2026 — Aplicação inicial (`20a8e74`)

- Painel e backend publicados em apply.gdapps.online.
- Autenticação própria, proteção de sessão, criptografia do token e auditoria.
- Conector Apex para consultas, cadastro, documentos e execução; validação autenticada real ainda pendente.
- Integração direta Amazon explicitamente indisponível.
- Oito testes passando localmente e no build Linux; login e infraestrutura publicados verificados.

## 20/10/2026 — Análise e infraestrutura (`25e601b`)

- Inventário de rotas, comparação de HARs e documentação dos limites da evidência.
- DNS, virtual host Nginx e HTTPS preparados no servidor existente.
- Inventários sanitizados versionados; capturas brutas e credenciais excluídas do Git.
