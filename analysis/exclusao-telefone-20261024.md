# Exclusão de telefone — captura fornecida em 24/10/2026

Análise offline do XML Burp fornecido pelo operador (2.438 itens). Nenhuma chamada foi repetida. Arquivo bruto permanece fora do Git; cookies, tokens, números, contas e parâmetros de sessão omitidos.

## Sequência observada

| Entrada (índice zero) | Método e caminho em www.amazon.com | Resultado |
| --- | --- | --- |
| 1256 | GET /ap/cnep | HTTP 200; formulário de telefone apresenta auth-cnep-edit-phone-button |
| 1285 | GET /ap/profile/mobilephone | HTTP 200; formulário auth-remove-phone-claim e formulário de troca presentes |
| 1349 | POST /ap/profile/mobilephone | HTTP 302 para /ap/cnep |
| 1352 | GET /ap/cnep | HTTP 200; botão passou a auth-cnep-add-phone-button, sem botão de editar telefone |

O POST contém appAction=REMOVE_MOBILE_PHONE. Os nomes de campos são appActionToken, appAction, openid.return_to, prevRID, workflowState e deleteMobilePhone. deleteMobilePhone aparece duas vezes no envio do navegador, com os valores de controle irrelevant e Submit. Nenhum número vazio é enviado como substituto da ação de exclusão.

A página posterior passa de Editar para Adicionar telefone. Isso confirma a remoção no fluxo de Login & Security desta sessão capturada; não comprova remoção de contatos do onboarding Flex ou de fatores MFA independentes.

Na página de gerenciamento também existe um formulário separado com changeMobilePhone e newMobilePhoneNumber. Esse formulário não foi submetido na sequência analisada; não afirmar que a captura valida troca ou inclusão de número.

O horário do POST no arquivo é 25/10/2026 01:13:15 UTC, equivalente a 24/10/2026 21:13:15 America/Cuiaba. As duas primeiras tentativas de abrir CNEP redirecionam para signin; a sequência de remoção acima ocorre depois da autenticação.

## Limites

Os valores appActionToken/workflowState e demais parâmetros são próprios da sessão e não devem ser reutilizados. A evidência descreve o formulário oficial observado, não uma API pública independente de autenticação. Não houve alteração de código de produção nem nova exclusão nesta análise.
