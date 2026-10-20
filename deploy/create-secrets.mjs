import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';
const envPath = resolve('.env');
if (existsSync(envPath)) {
  console.log('Existing .env preserved. No credentials were changed.');
  process.exit(0);
}
const password = randomBytes(24).toString('base64url');
const secret = randomBytes(32).toString('hex');
const email = 'admin@gdapps.online';
writeFileSync(envPath, `NODE_ENV=production\nPORT=8080\nAPP_ORIGIN=https://apply.gdapps.online\nDB_PATH=/data/app.sqlite\nMASTER_KEY=${secret}\nADMIN_EMAIL=${email}\nADMIN_PASSWORD=${password}\n`, { mode: 0o600, flag: 'wx' });
mkdirSync('private', { recursive: true, mode: 0o700 });
writeFileSync(resolve('private/access.txt'), `GD Apply — acesso inicial\n\nEndereço: https://apply.gdapps.online\nE-mail: ${email}\nSenha inicial: ${password}\n\nTroque a senha no primeiro acesso. Este arquivo é privado e ignorado pelo Git. A senha da Apex é fornecida separadamente na tela Integrações.\n`, { mode: 0o600, flag: 'wx' });
console.log('Production settings generated in .env. Initial login saved to private/access.txt (both ignored by Git).');
