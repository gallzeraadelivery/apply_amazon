import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';
if (existsSync('.env.development')) {
  console.log('Existing .env.development preserved. Use private/dev-access.txt or your password manager.');
  process.exit(0);
}
const password = randomBytes(24).toString('base64url');
mkdirSync('private', { recursive: true, mode: 0o700 });
writeFileSync(resolve('private/dev-access.txt'), `GD Apply — desenvolvimento local\n\nEndereço: http://127.0.0.1:8080\nE-mail: dev@example.test\nSenha inicial: ${password}\n\nConta local isolada. Não é a conta de produção. Troque a senha no primeiro acesso.\n`, { mode: 0o600, flag: 'wx' });
writeFileSync(resolve('.env.development'), `NODE_ENV=development\nHOST=127.0.0.1\nPORT=8080\nAPP_ORIGIN=http://127.0.0.1:8080\nDB_PATH=./data/development.sqlite\nMASTER_KEY=${randomBytes(32).toString('hex')}\nADMIN_EMAIL=dev@example.test\nADMIN_PASSWORD=${password}\n`, { mode: 0o600, flag: 'wx' });
console.log('Local configuration ready. Initial login: private/dev-access.txt. Start with npm run dev.');
