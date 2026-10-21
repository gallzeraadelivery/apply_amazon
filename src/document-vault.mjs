import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

export const documentKinds = ['front', 'back', 'profile'];
export class DocumentVault {
  constructor(db, key) {
    this.db = db; this.key = key;
    db.exec(`CREATE TABLE IF NOT EXISTS amazon_documents (
      account_id TEXT NOT NULL REFERENCES amazon_accounts(id) ON DELETE CASCADE,
      kind TEXT NOT NULL, mime TEXT NOT NULL, size INTEGER NOT NULL,
      body BLOB NOT NULL, iv BLOB NOT NULL, tag BLOB NOT NULL, digest TEXT NOT NULL,
      saved_at TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'local',
      PRIMARY KEY(account_id,kind))`);
  }
  list(accountId) {
    return this.db.prepare('SELECT kind,mime,size,saved_at,status FROM amazon_documents WHERE account_id=?').all(accountId);
  }
  save(userId, accountId, kind, mime, bytes) {
    if (!documentKinds.includes(kind) || !['image/jpeg', 'image/png'].includes(mime)) throw Error('Invalid document type');
    const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', this.key, iv);
    cipher.setAAD(Buffer.from(JSON.stringify([userId, accountId, kind, mime])));
    const body = Buffer.concat([cipher.update(bytes), cipher.final()]);
    const digest = createHash('sha256').update(bytes).digest('hex'); const savedAt = new Date().toISOString();
    this.db.prepare(`INSERT INTO amazon_documents VALUES(?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(account_id,kind) DO UPDATE SET mime=excluded.mime,size=excluded.size,body=excluded.body,
      iv=excluded.iv,tag=excluded.tag,digest=excluded.digest,saved_at=excluded.saved_at,
      status=CASE WHEN amazon_documents.digest=excluded.digest THEN amazon_documents.status ELSE 'local' END`)
      .run(accountId, kind, mime, bytes.length, body, iv, cipher.getAuthTag(), digest, savedAt, 'local');
  }
  read(userId, accountId, kind) {
    const row = this.db.prepare('SELECT * FROM amazon_documents WHERE account_id=? AND kind=?').get(accountId, kind);
    if (!row) return null;
    const cipher = createDecipheriv('aes-256-gcm', this.key, row.iv);
    cipher.setAAD(Buffer.from(JSON.stringify([userId, accountId, kind, row.mime]))); cipher.setAuthTag(row.tag);
    return { mime: row.mime, bytes: Buffer.concat([cipher.update(row.body), cipher.final()]) };
  }
  mark(accountId, kinds, status) {
    if (!['local', 'sending', 'transferred', 'unconfirmed'].includes(status)) throw Error('Invalid status');
    for (const kind of kinds) this.db.prepare('UPDATE amazon_documents SET status=? WHERE account_id=? AND kind=?').run(status, accountId, kind);
  }
  delete(accountId, kind) { this.db.prepare('DELETE FROM amazon_documents WHERE account_id=? AND kind=?').run(accountId, kind); }
}
