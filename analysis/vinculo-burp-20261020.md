# Vínculo acompanhado pelo Burp — 20/10/2026

## Evidência nova

Após o usuário realizar o vínculo, o histórico HTTP foi consultado pelo MCP burp-suite 1.1.2 através do bridge local já configurado. Acesso somente de leitura; nenhuma requisição capturada foi reenviada. Registros brutos ficaram em private/, ignorado pelo Git. Este relatório exclui e-mail, senha, cookies, tokens e IDs de conta/tentativa.

Horários abaixo convertidos de Date das respostas HTTP para America/Cuiaba (-04:00). Correspondem ao relógio do servidor remoto, não a uma medição independente de duração.

| Horário local | Requisição navegador → apply.apexbot.app | Resultado observado |
| --- | --- | --- |
| 20/10 23:16:42 | POST /api/amazon-server-login/start | HTTP 202; state=connecting; mode=server; success=false; reused=false; expiresInSeconds=180 |
| 20/10 23:16:43 a 23:16:52 | Sete GET /api/amazon-server-login/{attemptId} | HTTP 200; state=connecting; success=false |
| 20/10 23:16:54 | GET /api/amazon-server-login/{attemptId} | HTTP 200; state=success; success=true; accountStatus=connected; accountId presente |

O POST inicial contém os campos email, password e reconnectAccountId. Nenhum valor desses campos foi exportado. needsOtp, needsApproval, fallback e credentialsError estavam false em todas as nove respostas estruturadas da tentativa. Não houve solicitação de OTP nessa tentativa; isso não garante que outras contas ou novas tentativas dispensem MFA.

## O que isso esclarece

O usuário operou pelo navegador, mas o fluxo escolhido executa o login no servidor da Apex: o navegador envia as credenciais ao endpoint start e acompanha a tentativa por polling. A captura desta tentativa não mostra o fluxo manual signin-url → nova aba Amazon → sessionRef descrito no frontend de referência. Os dois modos existem no código, mas não devem ser confundidos.

O servidor Apex declarou vínculo concluído após aproximadamente 12 segundos entre a resposta inicial e a final. Isso é evidência de conclusão no contrato Apex, não uma captura independente da autenticação Amazon ou de aprovação do onboarding.

## Limite da captura

O filtro de requisições com cabeçalho Host de domínio amazon.com não retornou itens nesta consulta ao histórico. Os dados consultados evidenciam navegador → Apex, sem revelar tráfego de saída do servidor Apex. Duas entradas retornadas pela busca ampla não puderam ser interpretadas como objetos JSON completos; elas não foram usadas como evidência de estados da tentativa. Não afirmar que uma busca no histórico observa todas as conexões existentes fora desse proxy.

## Consequência para a reconstrução própria

O componente equivalente a construir no nosso servidor é um trabalhador de autenticação Amazon por conta, acompanhado por tentativa e estado. O contrato local pode ter iniciar/consultar/fornecer MFA/cancelar; não precisa chamar a Apex. A captura confirma a interface externa e o ciclo de estados da referência, mas não revela a URL completa de autenticação, cookies novos, desafios, navegação interna, mecanismo de navegador ou troca de tokens usados pelo trabalhador Apex.

Para obter essa parte, acompanhar o modo manual que abre a Amazon no navegador, caso disponível na interface de referência, ou realizar um login Amazon autorizado em navegador sob captura. O objetivo é observar a navegação e os redirecionamentos reais. Não tentar capturar tráfego interno do servidor de terceiros sem acesso autorizado, nem importar a senha/sessão capturada para testar contas automaticamente.
