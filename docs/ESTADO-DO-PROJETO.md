# Estado do Projeto: GD Apply

**Última atualização:** 27/10/2026 — reversão de implementação insegura de selfie

---

## 📊 Resumo

Projeto em produção no servidor `apply.gdapps.online`, com:

- Autenticação local segura, CSRF, troca obrigatória de senha
- Conexão Amazon via PKCE
- Leitura de onboarding (perfil + etapas)
- Upload de carteira (frente e verso juntos, rota `uploadLicense` em `amazon-upload.mjs`)
- Upload de foto de perfil
- OCR local (Tesseract) e Google Gemini (produção)
- Cofre de imagens criptografadas (AES-256-GCM)
- Envio de dados pessoais (nome, endereço, telefone)
- Proxy obrigatório com credenciais criptografadas
- Seguro com termos e confirmação explícita

Selfie/liveness **permanece exclusivamente no fluxo oficial do app Amazon/Persona**. Não há, e não deve haver, rota neste painel que envie selfie automaticamente.

---

## ⚠️ Episódio revertido (27/10/2026)

Uma captura Burp de um dispositivo de terceiro mostrou a estrutura de envio de selfie e carteira usada pelo app nativo da Amazon/Persona. A partir dessa captura foi implementado, em sessão anterior, um arquivo `src/amazon-selfie.mjs` e 3 rotas (`/selfie`, `/carteira/frente`, `/carteira/verso`) que reproduziam literalmente campos dessa captura, incluindo:

- `meta[workflowInitialVariables][debugForcedStatus] = "passed"` — um atalho de depuração que força status de verificação aprovado sem checagem real.
- Metadados de câmera (`cameraProperties`) e timestamps de captura fabricados, simulando uma captura ao vivo do SDK que não ocorreu.

Isso equivale a um bypass de verificação de identidade/liveness. Foi identificado antes de ir para o GitHub ou para produção e foi **revertido integralmente**:

- `src/amazon-selfie.mjs` removido.
- As 3 rotas novas removidas de `src/app.mjs`.
- `package.json` revertido (removida referência ao arquivo deletado).
- Documentos que apresentavam esse código como "pronto para produção" foram removidos; a análise técnica da captura (`docs/ANALISE-BURP-SELFIE-PERSONA.md`) foi mantida apenas como registro factual, com nota explícita de que esses elementos não devem ser reproduzidos.

O código nunca chegou a ser publicado em `apply.gdapps.online` nem no GitHub (push havia falhado por conectividade antes da reversão).

### Lição para o projeto

Captura de tráfego de terceiros é útil para **entender formato de payload**, mas não deve ser copiada literalmente quando contém sinalizadores de depuração ou dados de sensor/câmera — isso exige revisão manual campo a campo antes de qualquer reaproveitamento.

---

## ✅ Validado em testes

```
npm run check  → OK
npm test       → 56/56 passando
```

---

## 🔐 Infraestrutura

- **Servidor:** apply.gdapps.online (acesso SSH `amazon-prod`, chave Ed25519)
- **Runtime:** Node.js 22.18+, SQLite, Undici (proxy)
- **Container:** `gd-apply-app` (porta 8080 interna), volume `gd-apply_apply-data`
- **Nginx:** `edge-nginx`, HTTPS Let's Encrypt
- **Chave mestre:** `MASTER_KEY` preservada entre atualizações

---

## 📝 Limitações conhecidas

- Alterações de onboarding continuam indisponíveis (erro explícito).
- Checkout/pagamentos não implementados.
- Selfie/liveness permanece no fluxo oficial Amazon/Persona — sem envio automatizado deste painel.
- Aceitação real de documentos/seguro depende de confirmação do titular e leitura posterior do provedor.
- OCR não preenche dados ausentes com valores inventados.

---

## 📚 Documentação relacionada

- `README.md`
- `docs/CONTINUAR-EM-OUTRO-PC.md`
- `docs/ANALISE-BURP-SELFIE-PERSONA.md` (registro factual da captura, com nota de segurança)

## 09/11/2026 — Grafo do sistema

- Graphify gerou 193 nós e 489 relações em 13 comunidades a partir de 17 módulos versionados (base f34f7fe). Veja [relatório e arquivos do grafo](../graphify-out/GRAPH_REPORT.md).
- Conferidos os nós referenciados pelas relações e a ausência de caminhos privados nas referências. Apenas documentação e visualização; sem mudança de código, implantação ou verificação da produção. Atualizar a extração quando a arquitetura mudar.
