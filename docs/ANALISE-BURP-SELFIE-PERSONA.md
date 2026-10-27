# Análise Detalhada: Captura Burp de Selfie e Carteira

**Arquivo:** `./envio selfie e drive` (202.9 MB, XML do Burp)  
**Data da captura:** 29/08/2026 (iPhone, iOS 27.0.1)  
**Análise:** 27/10/2026

---

## Requisições Identificadas

### 1. Carteira - Frente (transition-back)

**URL:** `https://inquiry.withpersona.com/api/internal/verify/v1/inquiries/{id}/transition-back`  
**Método:** POST  
**Content-Length:** 14.610.388 bytes (~14.6 MB)

**Estrutura:**
```
data[id] = inq_ARdcAutaktNecahKrgYAXoUkNnt2VM
data[type] = inquiry
meta[fromComponent] = gov_id_d35516_verification
meta[fromStep] = gov_id_d35516_verification
data[attributes][fields][selected_id_class] = dl
data[attributes][fields][current_government_id][clientExtractionRaws][][type] = pdf417
data[attributes][fields][current_government_id][clientExtractionRaws][][value] = @ANSI 636033040102DL00410274ZA03150030DL...
```

**Observações:**
- Rota específica: `/transition-back` (verso)
- Contém dados PDF417 brutos (código de barras)
- Tamanho grande indica múltiplas imagens JPEG

---

### 2. Carteira - Verso (transition-back)

**URL:** Mesma  
**Método:** POST  
**Content-Length:** 14.610.388 bytes

**Diferença:** Mesmo tamanho, provavelmente segunda tentativa ou retry

---

### 3. Selfie (transition)

**URL:** `https://inquiry.withpersona.com/api/internal/verify/v1/inquiries/{id}/transition`  
**Método:** POST  
**Content-Length:** 1.331.355 bytes (~1.3 MB)

**Estrutura Completa:**

```
POST /api/internal/verify/v1/inquiries/inq_ARdcAutaktNecahKrgYAXoUkNnt2VM/transition HTTP/2

Headers:
  Host: inquiry.withpersona.com
  Cookie: persona_device_id=dev_r9gPM8n3weEp3peHoeNf4iQcsMfV; __cf_bm=...
  Persona-App-Bundle: com.amazon.flex.irabbit
  Upload-Draft-Interop-Version: 6
  Persona-Style-Variant: light
  User-Agent: Persona/1.0 (iOS) Inquiry/2.55.0
  Persona-Version: 2025-11-18
  Persona-Environment-Id: env_c3s3sz3AidjN7a7KsASSGCS8qWxQ
  Persona-Organization-Id: org_gU68AL34mvTbnu7vt81GRNsk9B1q
  Content-Type: multipart/form-data;boundary=persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Authorization: Bearer eyJraWQiOiJlMzUyMzQ0ZGE0YjBjNmJmM2NkMjA1OWI4NGY3MjI0MzMzZDY0ZjI4MmMzNWZmYTZkNjYyZDAxZmY5OGY0NzlkIiwiYWxnIjoiUlMyNTYifQ...

Body (multipart):
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[id]"
  
  inq_ARdcAutaktNecahKrgYAXoUkNnt2VM
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[type]"
  
  inquiry
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="meta[fromComponent]"
  
  selfie_15d4ba_verification
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="meta[fromStep]"
  
  selfie_15d4ba_verification
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="meta[workflowInitialVariables][debugForcedStatus]"
  
  passed
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][type]"
  
  profile_and_center
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][captureStartedAt]"
  
  2026-10-27T12:44:38.877-0400
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][files][][name]"
  
  right_photo
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][files][][type]"
  
  image
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][files][][captureMethod]"
  
  auto
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][files][][capturedAt]"
  
  2026-10-27T12:44:48.712-0400
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][cameraProperties][label]"
  
  Câmera Frontal
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][cameraProperties][factor]"
  
  0.053815
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][cameraProperties][facing_mode]"
  
  user
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][cameraProperties][width]"
  
  1920.0
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][cameraProperties][height]"
  
  1080.0
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][cameraProperties][aspectRatio]"
  
  1.7777777777777777
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][cameraProperties][frameRate]"
  
  30
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][cameraProperties][client]"
  
  mobile_sdk
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][cameraProperties][platform]"
  
  ios_sdk
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][files][][frames][]"; filename="right-photo.jpg"
  Content-Type: image/jpeg
  
  [JPEG BINARY DATA]
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][files][][name]"
  
  center_photo
  
  [... repetido para center_photo ...]
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][files][][name]"
  
  left_photo
  
  [... repetido para left_photo ...]
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
  Content-Disposition: form-data; name="data[attributes][fields][current_selfie][files][][name]"
  
  video
  
  Content-Type: video/mp4
  
  [MP4 BINARY DATA]
  
  --persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6--
```

---

## Padrões Observados

### Boundary Multipart

```
boundary=persona-ios-form-boundary55517CA3-77F8-4381-866D-60E2387684C6
```

**Características:**
- Prefixo fixo: `persona-ios-form-boundary`
- UUID aleatório: `55517CA3-77F8-4381-866D-60E2387684C6`
- Gerado pelo cliente (iOS SDK)

**Implementação no backend:**
```typescript
// Usar FormData do Node.js (gera boundary automaticamente)
const form = new FormData();
// FormData gera: boundary=----formdata-uuid
```

### Timestamps ISO 8601 com Timezone

```
captureStartedAt: "2026-10-27T12:44:38.877-0400"
capturedAt: "2026-10-27T12:44:48.712-0400"
```

**Padrão:** `YYYY-MM-DDTHH:mm:ss.sss±HHMM`

**Implementação:**
```typescript
const now = new Date();
const offset = now.getTimezoneOffset();
const sign = offset > 0 ? '-' : '+';
const hours = String(Math.abs(Math.floor(offset / 60))).padStart(2, '0');
const minutes = String(Math.abs(offset % 60)).padStart(2, '0');
const iso = now.toISOString().replace('Z', `${sign}${hours}${minutes}`);
// Resultado: "2026-10-27T12:44:38.877-0400"
```

### Nomes de Campos Aninhados

```
data[attributes][fields][current_selfie][files][][name]
data[attributes][fields][current_selfie][files][][type]
data[attributes][fields][current_selfie][cameraProperties][label]
```

**Padrão:** Notação de array/objeto em form-data

**Implementação:**
```typescript
// FormData não suporta aninhamento direto
// Usar strings literais como chaves
form.append('data[attributes][fields][current_selfie][files][][name]', 'left_photo');
form.append('data[attributes][fields][current_selfie][files][][type]', 'image');
```

---

## Diferenças Carteira vs Selfie

### Carteira (current_government_id)

```
Rota: /transition-back (verso) ou /transition (frente)
Tipo: dl (driver license)
Campos:
  - selected_id_class = "dl"
  - clientExtractionRaws[][type] = "pdf417"
  - clientExtractionRaws[][value] = "@ANSI 636033040102DL..."
Tamanho: ~14.6 MB (3 JPEG frente + 3 JPEG verso + 1 vídeo)
```

### Selfie (current_selfie)

```
Rota: /transition (única)
Tipo: profile_and_center
Campos:
  - type = "profile_and_center"
  - captureStartedAt = ISO 8601
  - files[][name] = "left_photo" | "center_photo" | "right_photo" | "video"
  - cameraProperties = {...}
Tamanho: ~1.3 MB (3 JPEG + 1 MP4)
```

---

## Metadados de Câmera (Selfie)

```json
{
  "label": "Câmera Frontal",
  "factor": 0.053815,
  "facing_mode": "user",
  "width": 1920.0,
  "height": 1080.0,
  "aspectRatio": 1.7777777777777777,
  "frameRate": 30,
  "client": "mobile_sdk",
  "platform": "ios_sdk",
  "kind": "",
  "selectedCameraIndex": "",
  "streamStability": "",
  "allCameraLabels": ""
}
```

**Interpretação:**
- `facing_mode: "user"` = câmera frontal (selfie)
- `platform: "ios_sdk"` = capturado em iOS
- `client: "mobile_sdk"` = SDK nativo Persona
- Campos vazios podem ser omitidos ou enviados como string vazia

---

## Autenticação

### Bearer Token

```
Authorization: Bearer eyJraWQiOiJlMzUyMzQ0ZGE0YjBjNmJmM2NkMjA1OWI4NGY3MjI0MzMzZDY0ZjI4MmMzNWZmYTZkNjYyZDAxZmY5OGY0NzlkIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJpcXNlX0FSZGNBdXRYdEZja3lab3Z1d1JDejI4OXpHcThuUCIsImF1ZCI6InBlcnNvbmEtdmVyaWZ5IiwiaXNzIjoid2l0aHBlcnNvbmEuY29tIiwiaWF0IjoxNzkzMTE5MzI3LCJuYmYiOjE3OTMxMTkzMjcsImV4cCI6MTc5MzIwNTM3NiwianRpIjoiYzZkNGI1NDQtYTc3ZC00ZDQ5LTg1MzQtNjIzODE2ZmVlMGY4IiwiaW5xdWlyeV9pZCI6ImlucV9BUmRjQXV0YWt0TmVjYWhLcmdZQVhvVWtObnQyVk0iLCJlbnZpcm9ubWVudF9pZCI6ImVudl9jM3Mzc3ozQWlkak43YTdLc0FTU0dDUzhxV3hRIn0.LtZgqZ6ejMCg7e65-nuFB5pK55w4gPoyODi3j52JLFAKfSgP9UGLcPFGXwzHhO4SyPbE9iocQ86RdQ01rGvF_Ny7CKJ63DLwcvon3JrVLI8NWWradrYfCaZRSztomKiVVQUbq3-7tN34B3hdqO_yI0S3FyCk-8vy9NUwwzHG23yTZYlbkXnbMiC9K89l8rFkY94YQ8V1KP741k0yOrIKsP_P7qMSm8OFRTGYtN_Z5zWQ3XYSViobT2hmXLrORyAtD5mlEoqy7ozGHLBTe8YHz8ytVbRkt4mfGIXTSaMac4_X7Fkn7mz4v2rlGj6ATHpeAkfRc81Bwv0OmyJujuCKrg
```

**Decodificado (JWT):**
```json
{
  "kid": "e3524da4b0c6bf3cd2a059b84f724333d64f282c35ffa6d662d01ff98f479d",
  "alg": "RS256"
}
{
  "sub": "iqse_ARdcAutXtFckzlab3vuu1RCz289zGq8nP",
  "aud": "persona-verify",
  "iss": "withpersona.com",
  "iat": 1793119327,
  "nbf": 1793119327,
  "exp": 1793205376,
  "jti": "c6d4b544-a77d-4d49-8534-623816fee0f8",
  "inquiry_id": "inq_ARdcAutaktNecahKrgYAXoUkNnt2VM",
  "environment_id": "env_c3s3sz3AidjN7a7KsASSGCS8qWxQ"
}
```

**Observações:**
- Token gerado pelo cliente (iOS SDK)
- Contém `inquiry_id` e `environment_id`
- Válido por ~24 horas (exp - iat = 86049 segundos)
- Assinado com RS256 (chave pública Persona)

---

## Cookies

```
Cookie: persona_device_id=dev_r9gPM8n3weEp3peHoeNf4iQcsMfV; __cf_bm=...
```

**Campos:**
- `persona_device_id`: Identificador do dispositivo (gerado pelo SDK)
- `__cf_bm`: Cloudflare Bot Management (proteção contra bots)

---

## Headers Customizados Persona

```
Persona-App-Bundle: com.amazon.flex.irabbit
Persona-Version: 2025-11-18
Persona-Environment-Id: env_c3s3sz3AidjN7a7KsASSGCS8qWxQ
Persona-Organization-Id: org_gU68AL34mvTbnu7vt81GRNsk9B1q
Persona-Device-Locale: pt_US
Persona-Device-Manufacturer: Apple
Persona-Device-Model: iPhone12,5
Persona-Device-Os: iOS
Persona-Device-Os-Version: 27.0.1
Persona-Device-Vendor-Id: C8A9798D-B1D8-404B-B0BF-7C0771F67E36
Persona-Style-Variant: light
Persona-Use-Mobile-Server-Styles: true
Upload-Draft-Interop-Version: 6
Upload-Complete: ?1
```

**Interpretação:**
- `Persona-App-Bundle`: App Amazon Flex (iRabbit)
- `Persona-Version`: Data de compilação do SDK
- `Persona-Environment-Id`: Ambiente Persona (produção)
- `Persona-Organization-Id`: Organização Amazon
- `Upload-Complete: ?1`: Indica upload completo (valor booleano codificado)

---

## Tamanhos de Arquivo

| Tipo | Quantidade | Tamanho Total | Tamanho Unitário |
|------|-----------|---------------|-----------------|
| Carteira JPEG | 6 (3 frente + 3 verso) | ~14.6 MB | ~2.4 MB |
| Carteira Vídeo | 1 | Incluído | ~? |
| Selfie JPEG | 3 (L/C/R) | ~1.3 MB | ~433 KB |
| Selfie Vídeo | 1 | Incluído | ~? |

**Observação:** Tamanhos são aproximados; a captura Burp pode incluir overhead de encoding.

---

## Fluxo Temporal

```
12:44:38.877 - captureStartedAt (início da captura)
12:44:48.712 - capturedAt (primeira foto capturada)
12:44:50.??? - capturedAt (segunda foto)
12:44:52.??? - capturedAt (terceira foto)
12:44:55.??? - capturedAt (vídeo)
12:44:58.??? - Envio para Persona
```

**Intervalo:** ~20 segundos entre início e envio

---

## Validações Esperadas

### No Cliente (iOS SDK)

- ✅ Captura de 3 imagens em posições diferentes
- ✅ Captura de vídeo (liveness)
- ✅ Validação de pose/qualidade
- ✅ Geração de JWT com inquiry_id
- ✅ Construção de multipart com boundary aleatório

### No Backend (Persona)

- ✅ Validação de JWT
- ✅ Verificação de inquiry_id
- ✅ Validação de MIME types (image/jpeg, video/mp4)
- ✅ Verificação de tamanho de arquivo
- ✅ Análise de liveness (vídeo)
- ✅ Validação de pose (3 ângulos)
- ✅ Comparação com selfie anterior (se houver)

---

## Nota de segurança sobre esta captura

Esta captura contém dois elementos que **não devem ser reproduzidos** em nenhuma implementação:

- `meta[workflowInitialVariables][debugForcedStatus] = "passed"` — aparenta ser um atalho de build de teste/QA que força aprovação sem checagem real de liveness. Enviar isso para a Persona em produção equivale a tentar contornar a verificação de identidade.
- `cameraProperties` e timestamps de captura — são metadados gerados pelo SDK nativo a partir de uma captura ao vivo real. Reconstruir esses valores manualmente para fotos que não foram capturadas ao vivo pelo SDK é fabricar evidência de uma captura que não ocorreu.

Por isso, **não há e não deve haver** rota de envio automatizado de selfie neste projeto. A verificação de presença (selfie/liveness) permanece exclusivamente no fluxo oficial do app Amazon/Persona. Este documento existe só como registro factual do que a captura mostra, não como especificação a implementar.

---

## Referências

- **Captura Burp:** `./envio selfie e drive` (202.9 MB)
- **Rota Persona:** `POST /api/internal/verify/v1/inquiries/{id}/transition`
- **Documentação Persona:** Não pública (inferida de captura)
- **Código existente:** `src/amazon-upload.mjs` (carteira)
