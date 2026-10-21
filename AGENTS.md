# Continuidade do projeto

Estas orientações valem para todo o repositório e para trabalho em qualquer computador.

- Comece lendo README.md, docs/CONTINUAR-EM-OUTRO-PC.md e docs/ESTADO-DO-PROJETO.md.
- Confira git status e o remoto antes de alterar arquivos; preserve trabalho não relacionado do usuário.
- O usuário autorizou salvar a evolução neste GitHub. Ao terminar uma tarefa, revise o diff, atualize as orientações afetadas, valide, crie um commit dos arquivos da tarefa e faça push para o remoto existente, salvo instrução contrária. Não force push nem altere o histórico.
- Registre o que foi feito, como foi validado, limitações e próximos passos em docs/ESTADO-DO-PROJETO.md. Diferencie código no Git de versão realmente implantada.
- Se push ou validação falhar, informe exatamente o que ficou somente local ou sem verificação. Não declare sucesso sem conferir o resultado.
- O repositório é público. Nunca versionar .env, private/, chaves SSH, HAR bruto, cookies, tokens, documentos, bancos SQLite ou backups de produção. Dados sanitizados exigem revisão antes de entrar no Git.
- Nunca transportar segredos por logs, argumentos de processo, commits ou URLs. Usar conexão SSH existente ou orientar transferência privada; manter o servidor e os arquivos locais como fontes dos segredos, não o GitHub.
- Não reutilizar chaves, cookies, tokens, sessões ou identidades de HARs para autenticar ou reproduzir verificações de terceiros.
- O conector Apex está implementado; testes usam respostas controladas. Sem login real do operador, não afirmar integração autenticada validada.
- A conexão manual Amazon com PKCE e a leitura de perfil/etapas foram implementadas com base no serviço próprio amazonteste e validadas em uma conta autorizada. Alterações diretas de onboarding continuam indisponíveis. Não confundir testes controlados com validação real, transformar correspondências de HAR em contrato de API pública ou implementar falsos sucessos/bypasses.
- Não testar alterações em contas externas sem escopo e autorização correspondentes. Operações reais devem exigir confirmação no painel e nunca ter repetição automática após resultado incerto.
- Para código da aplicação, usar npm run check e npm test. Documentação pura dispensa repetir a suíte inteira; conferir comandos e links pertinentes.
- deploy/prepare-domain.sh é somente o bootstrap histórico do domínio; não reexecutá-lo num host já configurado.
- Publicar somente quando a tarefa autorizar. Preservar /opt/gd-apply/.env, volume SQLite, MASTER_KEY e serviços de outros projetos. Validar Nginx antes de recarregar e manter backup.
- Não depender de caminhos locais Y: ou Z: em novas ferramentas. Usar caminhos relativos ao checkout ou parâmetros explícitos.
