import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { DocumentVault } from '../src/document-vault.mjs';
import { renderAmazonDetail } from '../public/amazon-detail.mjs';

test('saved images survive reopening, are encrypted and bound to the owner/account/side', () => {
  const dir = mkdtempSync(join(tmpdir(), 'gd-vault-')); const key = randomBytes(32); const path = join(dir, 'test.sqlite');
  let db = new DatabaseSync(path);
  try {
    db.exec('PRAGMA foreign_keys=ON; CREATE TABLE amazon_accounts(id TEXT PRIMARY KEY); INSERT INTO amazon_accounts VALUES (\'account-a\'),(\'account-b\')');
    let vault = new DocumentVault(db, key); const bytes = Buffer.from('synthetic-private-image');
    vault.save('owner-a', 'account-a', 'front', 'image/jpeg', bytes);
    vault.saveForm('owner-a', 'account-a', { firstName: 'SYNTHETIC', lastName: 'TESTER' });
    assert.ok(!Buffer.from(db.prepare('SELECT body FROM amazon_documents').get().body).includes(bytes));
    vault.mark('account-a', ['front'], 'transferred');
    db.close(); db = new DatabaseSync(path); db.exec('PRAGMA foreign_keys=ON'); vault = new DocumentVault(db, key);
    assert.deepEqual(vault.read('owner-a', 'account-a', 'front').bytes, bytes);
    assert.equal(vault.readForm('owner-a', 'account-a').fields.firstName, 'SYNTHETIC');
    assert.throws(() => vault.readForm('owner-b', 'account-a'));
    assert.throws(() => vault.saveForm('owner-a', 'account-a', { ssn: 'not-allowed' }));
    assert.throws(() => vault.read('owner-b', 'account-a', 'front'));
    assert.equal(vault.list('account-a')[0].status, 'transferred');
    vault.save('owner-a', 'account-a', 'front', 'image/jpeg', bytes);
    assert.equal(vault.list('account-a')[0].status, 'transferred');
    vault.save('owner-a', 'account-a', 'front', 'image/jpeg', Buffer.from('new-image'));
    assert.equal(vault.list('account-a')[0].status, 'local');
    db.prepare('DELETE FROM amazon_accounts WHERE id=?').run('account-a');
    assert.equal(vault.list('account-a').length, 0);
  } finally { db.close(); rmSync(dir, { recursive: true }); }
});

test('account layout escapes values and distinguishes local files from provider acceptance and confirmed task progress', () => {
  const html = renderAmazonDetail({ account: { id: 'account-a', label: '<script>bad</script>' },
    result: { profile: null, onboarding: { workflowStatus: 'WAITLISTED_ON_REGION', tasks: [
      { key: 'BASIC_INFO', status: 'Complete' }, { key: 'REGION_SELECTION', status: 'Failed' } ] }, sources: [] },
    documents: [{ kind: 'front', saved_at: '2026-10-21T04:00:00Z', mime: 'image/jpeg', status: 'local' }],
  });
  assert.ok(!html.includes('<script>bad</script>')); assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('50%')); assert.ok(html.includes('Lista de espera da região'));
  assert.ok(html.includes('Salvo no painel')); assert.ok(!html.includes('Recebido pelo provedor'));
  assert.ok(html.includes('data-case-field="firstName"')); assert.ok(html.includes('case-fields-form')); assert.ok(html.includes('/documents/front'));
});
