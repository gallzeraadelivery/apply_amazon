# Continuar em outro computador

## Usar o sistema já online

Abra https://apply.gdapps.online em qualquer computador. Use seu e-mail e a senha atual do painel. Não é preciso instalar Git, Node, Burp ou copiar banco de dados para usar a aplicação publicada.

O e-mail administrativo inicial é `admin@gdapps.online`. A senha inicial foi salva somente no arquivo privado do computador que fez a implantação e deixa de valer depois que você a altera. Guarde a senha atual em um gerenciador de senhas. O GitHub não contém senhas nem uma forma de recuperá-las.

Primeiro cadastre e teste o proxy em **Proxy · Admin**. Para o login oficial Amazon, configure também o mesmo proxy no perfil AdsPower e confirme a opção na aba Amazon direta. Chamadas do backend à Amazon, Apex e Google OCR usam o proxy obrigatório; abrir o login no navegador depende da configuração do próprio navegador. Leia [PROXY.md](PROXY.md) para interpretar o IP e os limites. O conector Apex é opcional e usa uma conta separada do login GD Apply. Nenhuma sessão de HAR é reutilizada.

## Baixar o projeto para desenvolver

Instale Git e Node.js 22.18 ou mais recente da série 22; para administrar o servidor, instale também o cliente OpenSSH. Docker é necessário no servidor ou se optar por desenvolvimento em container. As dependências estão fixadas em package-lock.json; use npm ci.

No terminal, escolha uma pasta local e execute:

```sh
git clone https://github.com/gallzeraadelivery/apply_amazon.git
cd apply_amazon
npm ci --ignore-scripts
npm run dev:setup
npm run check
npm test
npm run dev
```

Abra http://127.0.0.1:8080. O acesso de desenvolvimento está em `private/dev-access.txt`; troque essa senha no primeiro acesso. O script gera uma chave local e um SQLite isolado em `data/development.sqlite`. O servidor de desenvolvimento escuta apenas em 127.0.0.1.

Não copie .env de produção para desenvolver. Não é preciso conhecer ou copiar a MASTER_KEY de produção para trabalhar no código. Se a configuração de desenvolvimento já existe, dev:setup a preserva. Se você já mudou a senha local, use a atual; o arquivo de acesso registra somente a senha inicial.

Os diretórios `private/` e `data/`, além de `.env` e `.env.development`, são ignorados pelo Git. Antes de continuar, leia AGENTS.md e ESTADO-DO-PROJETO.md.

## Acesso SSH ao servidor

Servidor: `2.24.124.218`; sistema observado: Ubuntu 24.04. O acesso atual usa root, alias `amazon-prod` e uma chave já autorizada no servidor.

No novo computador, prefira gerar uma chave nova e autorizar sua chave pública a partir de uma sessão administrativa confiável. Alternativamente, transfira a chave existente por um canal privado e confiável. Nunca coloque chaves no Git nem no chat. Uma chave pública sozinha não concede acesso; a privada deve permanecer protegida no computador autorizado.

Exemplo de entrada em `~/.ssh/config` (no Windows, normalmente `%USERPROFILE%\.ssh\config`):

```sshconfig
Host amazon-prod
  HostName 2.24.124.218
  User root
  IdentityFile ~/.ssh/automacaoamazon_deploy_ed25519
  IdentitiesOnly yes
```

Use o nome real da chave instalada no novo PC se for diferente. Em Linux/macOS, configure permissões 700 no diretório .ssh e 600 na chave/config. No Windows, use uma ACL privada para o usuário; não aplique comandos Unix de permissões.

Confira a impressão digital do servidor por um canal confiável antes do primeiro acesso. Não desative StrictHostKeyChecking e não aceite uma mudança inesperada de chave. Depois de autorizar o host, teste:

```sh
ssh -o BatchMode=yes -o StrictHostKeyChecking=yes amazon-prod hostname
```

O nome retornado na implantação foi `srv1912597`. Se o comando falhar, resolva acesso/chave antes de publicar; não gere novas credenciais da aplicação para tentar corrigir SSH.

## Atualizar o código local

```sh
git status
git pull --ff-only
```

Se houver alterações locais, preserve-as e resolva conflitos conscientemente. Não use reset --hard nem force push para descartar trabalho.

## Publicar uma atualização

Consulte OPERACAO-E-BACKUP.md. A produção usa `/opt/gd-apply`, `.env` privado e volume SQLite persistente. O servidor foi provisionado por pacote, não por clone Git; git pull local não atualiza a aplicação online.

## Analisar HARs neste computador

Os arquivos originais precisam ser transferidos privadamente. Para gerar inventários usando PowerShell 7, forneça seus caminhos reais:

```powershell
./analysis/analisar-hars.ps1 -HarFiles @('C:/capturas/primeiro.har', 'C:/capturas/segundo.har') -OutputDirectory './private/har-analysis'
```

Não há dependência das unidades Y: ou Z: do computador original. A saída é uma extração de metadados, não uma garantia universal de anonimização; revise também caminhos, nomes de parâmetros e nomes de arquivos antes de publicar novos inventários. Os HARs nunca devem entrar no Git público.

## Pedido pronto para continuar com outro agente

> Este é o projeto GD Apply. Leia AGENTS.md, README.md e docs/ESTADO-DO-PROJETO.md. Confira git status e o remoto antes de alterar arquivos. O site está em apply.gdapps.online; produção em /opt/gd-apply no servidor cadastrado como amazon-prod. Preserve .env, MASTER_KEY e o volume de dados. Não reutilize sessões de HAR. Ao concluir a tarefa, atualize a documentação, valide, faça commit e push sem incluir segredos. Informe separadamente o que foi implantado e o que ficou apenas no Git.
