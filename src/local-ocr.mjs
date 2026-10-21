import { spawn } from 'node:child_process';
import { HttpError } from './apex.mjs';
import { parseDriverLicenseText } from './dl-ocr-parser.mjs';

export function imageDimensions(bytes) {
  if (bytes.length >= 24 && bytes.subarray(0, 8).toString('hex') === '89504e470d0a1a0a') return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
  if (bytes[0] === 255 && bytes[1] === 216) {
    let pos = 2;
    while (pos + 8 < bytes.length) {
      if (bytes[pos++] !== 255) break;
      while (bytes[pos] === 255) pos++;
      const marker = bytes[pos++];
      if (marker === 0xda || marker === 0xd9) break;
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      const size = bytes.readUInt16BE(pos);
      if (size < 2 || pos + size > bytes.length) break;
      if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) return [bytes.readUInt16BE(pos + 5), bytes.readUInt16BE(pos + 3)];
      pos += size;
    }
  }
  throw new HttpError(400, 'ocr_invalid_image', 'Não foi possível ler as dimensões da imagem. Use JPG ou PNG.');
}
export async function recognizeLocally(bytes, { timeout = 25000, spawnImpl = spawn } = {}) {
  const [width, height] = imageDimensions(bytes);
  if (!width || !height || width > 8000 || height > 8000 || width * height > 6000000) throw new HttpError(400, 'ocr_image_dimensions', 'Para a leitura automática, recorte a foto da carteira ou reduza para até 6 megapixels.');
  return new Promise((resolve, reject) => {
    const child = spawnImpl('tesseract', ['stdin', 'stdout', '-l', 'eng', '--psm', '11', '--dpi', '300'],
      { shell: false, windowsHide: true, stdio: ['pipe', 'pipe', 'ignore'], env: { ...process.env, OMP_THREAD_LIMIT: '1', OMP_NUM_THREADS: '1' } });
    let text = '', finished = false;
    const finish = (error) => { if (finished) return; finished = true; clearTimeout(timer); if (error) { child.kill('SIGKILL'); reject(error); } else resolve(text); };
    const timer = setTimeout(() => finish(new HttpError(504, 'ocr_timeout', 'A leitura demorou demais. Use uma foto mais nítida ou preencha os campos manualmente.')), timeout);
    child.on('error', () => finish(new HttpError(503, 'ocr_unavailable', 'O leitor local não está disponível neste ambiente.')));
    child.stdin.on('error', () => {});
    child.stdout.on('data', chunk => { text += chunk.toString('utf8'); if (text.length > 30000) finish(new HttpError(422, 'ocr_text_limit', 'A imagem retornou texto demais. Recorte somente a carteira.')); });
    child.on('close', code => finish(code === 0 ? null : new HttpError(422, 'ocr_failed', 'Não foi possível ler esta imagem. Use outra foto ou preencha manualmente.')));
    child.stdin.end(bytes);
  });
}
export async function extractLicenseFields(bytes, recognize = recognizeLocally) {
  const fields = parseDriverLicenseText(await recognize(bytes));
  if (!Object.values(fields).some(Boolean)) throw new HttpError(422, 'ocr_no_fields', 'Não identifiquei campos legíveis. Tente uma foto da frente mais nítida ou preencha manualmente.');
  return fields;
}
