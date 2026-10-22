# Operação, publicação e backup

## Referência de produção

- Site: https://apply.gdapps.online.
- SSH: alias amazon-prod, servidor 2.24.124.218.
- Aplicação: /opt/gd-apply; container gd-apply-app; porta 8080 dentro do Docker.
- Configuração privada: /opt/gd-apply/.env.
- Dados: volume gd-apply_apply-data; banco /data/app.sqlite dentro do container.
- Rede externa já existente: amazon_automation_web, compartilhada com o proxy.
- Proxy: edge-nginx, configuração /opt/edge/nginx/active.conf.
- Renovação HTTPS: agendamentos existentes que usam /opt/edge/renew.sh/Certbot.

O Git guarda código e orientações. Não guarda banco, sessões, senhas, documentos, .env, chaves SSH ou configuração privada de outros projetos do servidor.

## Conferir o sistema

```sh
ssh amazon-prod 'docker inspect gd-apply-app --format "{{.State.Status}} {{.State.Health.Status}}"'
ssh amazon-prod 'docker exec edge-nginx nginx -t'
```

Abra https://apply.gdapps.online/api/health. O resultado esperado é status=ok, component=application e applicationReady=true. Esse endpoint não confirma login na Apex nem funcionamento de integração Amazon.

Para investigar falha, consulte localmente os logs autorizados do container. Não cole saídas completas no Git/chat antes de verificar se contêm dados sensíveis. A aplicação registra apenas metadados de erros internos e auditoria sem corpos; não amplie logs para imprimir credenciais.

## Fazer backup antes de uma atualização

O SQLite usa WAL. Não copie apenas app.sqlite enquanto houver escritas; use a API de backup online, como faz deploy/backup-server.sh. Esse procedimento não pausa a aplicação.

A partir do checkout, em PowerShell:

```powershell
Get-Content -Raw ./deploy/backup-server.sh | ssh -o StrictHostKeyChecking=yes amazon-prod 'tr -d "\r" | sh -s'
```

Em Linux/macOS:

```sh
ssh -o StrictHostKeyChecking=yes amazon-prod 'sh -s' < deploy/backup-server.sh
```

O script cria `/opt/backups/gd-apply/<data-UTC>/app.sqlite` e `production.env`, com acesso restrito. A cópia inclui a MASTER_KEY necessária para abrir tokens criptografados. Não mostra nenhum segredo na saída e não remove backups anteriores.

Essa cópia no próprio servidor não protege contra perda do servidor. Transfira os arquivos por SSH para armazenamento privado criptografado, separado do GitHub. Em um checkout local, use no máximo private/ para uma transferência temporária, confirme que git check-ignore reconhece os arquivos e depois mova-os ao destino privado. Não use um caminho curinga para baixar ou remover backups sem conferir a data exata.

## Publicar código versionado

Faça commit e push antes de empacotar. `git archive HEAD` inclui somente o commit, não alterações ainda não commitadas nem arquivos ignorados.

No PowerShell:

```powershell
git status --short
git pull --ff-only
npm ci --ignore-scripts
npm run check
npm test
New-Item -ItemType Directory -Force ./private | Out-Null
git archive --format=tar.gz --output=./private/release.tgz HEAD
scp -o StrictHostKeyChecking=yes ./private/release.tgz amazon-prod:/opt/gd-apply/release.tgz
ssh -o StrictHostKeyChecking=yes amazon-prod 'set -eu; cd /opt/gd-apply; tar -xzf release.tgz; sh deploy/publish-app.sh'
```

Em Linux/macOS, substitua New-Item por `mkdir -p private`; os outros comandos são equivalentes.

Não envie .env na atualização. O diretório no servidor deve continuar contendo seu .env original. O build executa os testes dentro do Linux antes de iniciar o container. O volume de dados permanece montado e não deve ser removido. Nunca use `docker compose down -v` para atualizar.

O script testa a disponibilidade interna, faz backup do Nginx, substitui somente o bloco apply.gdapps.online, executa nginx -t, recarrega o proxy e verifica HTTPS. Depois de uma recriação de container, o reload do proxy atualiza a resolução do endereço interno.

Após confirmar o resultado, registre em ESTADO-DO-PROJETO.md o SHA mostrado por `git rev-parse HEAD`, o resultado dos testes e o que realmente foi publicado. Não inclua SHA do commit de documentação como se tivesse sido automaticamente implantado.

## Segredos e login

- O setup inicial gera .env e private/access.txt somente no computador que executou deploy/create-secrets.mjs.
- Não execute esse gerador em outro PC esperando recuperar a senha do servidor: ele geraria uma configuração diferente, sem ligação com o banco existente.
- A senha administrativa pode ter sido trocada; a variável ADMIN_PASSWORD só inicializa um banco vazio e não redefine a senha de usuários existentes.
- Perder MASTER_KEY impede abrir os tokens Apex existentes. Um clone Git não recupera essa chave.
- Desconectar e reconectar a Apex é uma operação do usuário no painel; não recuperar cookies de HAR como substituto.

## Recuperar dados

Faça isso somente em uma janela administrativa planejada:

1. Confirme backup escolhido, acesso ao servidor e integridade dos arquivos privados.
2. Salve uma cópia do estado atual antes de substituir qualquer coisa.
3. Pare somente o serviço app do projeto GD Apply. Não pare o proxy ou o Docker inteiro.
4. Restaure o snapshot consistente do banco no volume e a configuração correspondente, preservando proprietário node e acesso privado. Não misture um banco antigo com WAL/SHM de outra cópia.
5. Use a MASTER_KEY que corresponde ao snapshot; mantenha as outras variáveis compatíveis com o ambiente.
6. Inicie o app, confira health check, login, estado das conexões e logs. Documente o resultado.

Não há um comando automático de restauração neste repositório: a escolha do snapshot e a substituição dos dados exigem conferência do administrador. As instruções de backup não constituem uma restauração testada.

## Voltar para uma versão anterior de código

Escolha um commit conhecido e empacote-o com `git archive <SHA>` em vez de alterar o histórico main. Faça backup antes, confirme compatibilidade do banco e publique o pacote pelo mesmo procedimento. Restaurar só o Nginx não reverte uma imagem da aplicação que já foi substituída.

Os arquivos active.conf.before-apply-* são backups históricos do proxy. Não os restaure integralmente se outros projetos tiverem mudado depois: prefira recuperar apenas o bloco deste domínio com revisão e nginx -t.
