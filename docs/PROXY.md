# Proxy obrigatório no admin

## Configurar

1. Entre no painel GD Apply e abra **Proxy · Admin**.
2. Informe HTTP ou HTTPS, host e porta. Não coloque usuário/senha dentro do host.
3. Escolha sem autenticação, informar credenciais, ou manter as já salvas no mesmo endereço.
4. Salve. Qualquer alteração invalida o teste anterior, mesmo que o endereço pareça igual.
5. Clique em **Testar proxy e consultar IP**. Somente um teste concluído com sucesso libera as chamadas do servidor para Amazon, Apex e Google OCR.
6. Confira o IP e o horário apresentados. Configure o mesmo proxy no perfil AdsPower antes de abrir o login Amazon.

O cadastro é global para esta instância administrativa. Não é um proxy por conta. HTTP/HTTPS com CONNECT e autenticação Basic são suportados; SOCKS não é aceito nesta versão. Usuário e senha são criptografados no SQLite com a MASTER_KEY. Não são devolvidos pela API nem preenchidos na tela após salvar.

Se você mudar o host/porta/protocolo, precisa informar novamente as credenciais ou escolher sem autenticação. A opção manter credenciais não permite transportá-las silenciosamente a outro endereço.

## O que é garantido pelo código

- Login Apex, registro de conexão Amazon, consultas de perfil/etapas, atualização de dados, envio confirmado de documentos e Google OCR usam o mesmo transporte obrigatório de proxy.
- Sem cadastro ou sem teste válido para a revisão atual, a chamada é bloqueada antes de sair do backend.
- Falha no proxy não provoca tentativa direta, repetição automática ou uso de NO_PROXY/HTTP_PROXY do ambiente.
- O teste usa HTTPS para api.ipify.org pelo mesmo transporte. Não envia senha ou token Apex a esse observador.
- O cliente Apex exige um transporte explícito e não possui fetch direto padrão.
- TLS do destino e do proxy HTTPS continuam sendo verificados; não há opção para desativar validação de certificado.
- Alterar/remover o proxy bloqueia novas chamadas até novo cadastro/teste. Uma chamada já iniciada pode terminar usando a revisão antiga; o histórico identifica a revisão usada.

Isso é uma garantia do conector desta aplicação, não um firewall de saída de todo o servidor. Outros containers/processos não são afetados.

## Como interpretar o IP

O endereço exibido é o **IP observado no último teste**, com horário. Não é uma medição do IP de cada operação nem prova do que a Amazon viu. Proxies rotativos podem fornecer outro IP ao mudar o destino ou abrir uma nova conexão. Para manter o mesmo IP durante um fluxo, configure um proxy fixo ou a sessão persistente do seu provedor e confira as condições dele.

O teste não faz conexão direta para comparar com o IP do servidor, pois isso contrariaria a política de saída. Confira o IP observado com as informações do seu provedor.

## Limite Apex → Amazon

O proxy controla **GD Apply → Amazon/Apex/Google OCR**, não as chamadas que a Apex eventualmente executa no servidor dela. O painel informa explicitamente que **Apex → Amazon não foi verificado**. Para controlar esse trecho, a Apex precisa aceitar configuração do proxy ou precisamos controlar e instrumentar o processo/navegador que acessa a Amazon.

O login oficial Amazon abre no navegador do operador. Configure o mesmo proxy no AdsPower; o backend não muda o proxy do navegador. O painel exige confirmação disso antes de gerar o link, mas essa confirmação não mede a rede do navegador. O retorno fica vinculado à revisão do proxy: alterar a configuração exige gerar outro link. O teste não autentica uma conta nem reutiliza cookies de HAR.

## Histórico e testes

O admin registra destino/caminho, revisão e endereço do proxy sem credenciais, resultado do transporte e IP/horário do último teste. O IP tem o nome exit_ip_snapshot para não ser confundido com medição da operação. O registro de envio não comprova sucesso de negócio.

Foram adicionados testes de criptografia, bloqueio antes de cadastro/teste, falha de teste, alteração concorrente de configuração e túnel HTTP CONNECT real em ambiente local descartável. O teste de falha confirma que o destino não recebe uma nova requisição direta. Esses testes não substituem testar o proxy real do operador no servidor publicado.

## Rotas administrativas

- GET /api/admin/proxy — configuração pública ao admin autenticado, sem credenciais.
- PUT /api/admin/proxy — salva protocol, host, port e authMode (none/basic/keep); username/password somente no envio de novas credenciais.
- DELETE /api/admin/proxy — remove o cadastro e bloqueia o conector.
- POST /api/admin/proxy/test — testa o IP e aprova somente a revisão testada.
- GET /api/admin/proxy/events — últimas 40 observações de rede do usuário administrativo.

Todas exigem sessão local e troca da senha inicial; escritas também exigem Origin e CSRF. A configuração privada deve ficar fora do Git. O observador de IP é fixo; o navegador não pode fornecer uma URL arbitrária para o teste.
