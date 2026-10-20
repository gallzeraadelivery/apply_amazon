import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

test('development bootstrap isolates secrets and preserves existing credentials', t => {
  const base = resolve(tmpdir());
  const directory = mkdtempSync(resolve(base, 'gd-apply-dev-test-'));
  t.after(() => {
    if (dirname(resolve(directory)) !== base) throw new Error('Unexpected test directory');
    rmSync(directory, { recursive: true });
  });
  const script = fileURLToPath(new URL('../deploy/create-dev-env.mjs', import.meta.url));
  const run = () => spawnSync(process.execPath, [script], { cwd: directory, encoding: 'utf8' });
  assert.equal(run().status, 0);
  const env = readFileSync(resolve(directory, '.env.development'), 'utf8');
  const credentials = readFileSync(resolve(directory, 'private/dev-access.txt'), 'utf8');
  assert.match(env, /^NODE_ENV=development$/m);
  assert.match(env, /^HOST=127\.0\.0\.1$/m);
  assert.match(env, /^DB_PATH=\.\/data\/development\.sqlite$/m);
  assert.match(env, /^MASTER_KEY=[a-f0-9]{64}$/m);
  assert.match(env, /^ADMIN_PASSWORD=[A-Za-z0-9_-]{32}$/m);
  assert.match(credentials, /dev@example\.test/);
  assert.equal(run().status, 0);
  assert.equal(readFileSync(resolve(directory, '.env.development'), 'utf8'), env);
  assert.equal(readFileSync(resolve(directory, 'private/dev-access.txt'), 'utf8'), credentials);
});
