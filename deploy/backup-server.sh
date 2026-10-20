#!/bin/sh
# Run on the existing production host as its authorized administrator.
set -eu
umask 077
test -f /opt/gd-apply/.env
stamp=$(date -u +%Y%m%dT%H%M%SZ)
destination=/opt/backups/gd-apply/$stamp
mkdir -p "$destination"
chmod 700 "$destination"
docker exec -e BACKUP_ID="$stamp" -i gd-apply-app node --disable-warning=ExperimentalWarning --input-type=module <<'NODE'
import { DatabaseSync, backup } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
const id = process.env.BACKUP_ID;
if (!/^\d{8}T\d{6}Z$/.test(id)) throw new Error('Invalid backup identifier');
mkdirSync('/data/backups', { recursive: true, mode: 0o700 });
const db = new DatabaseSync('/data/app.sqlite', { readOnly: true });
try { await backup(db, `/data/backups/${id}.sqlite`); }
finally { db.close(); }
NODE
docker cp "gd-apply-app:/data/backups/$stamp.sqlite" "$destination/app.sqlite"
cp /opt/gd-apply/.env "$destination/production.env"
chmod 600 "$destination/app.sqlite" "$destination/production.env"
docker exec -e BACKUP_ID="$stamp" -i gd-apply-app node --input-type=module <<'NODE'
import { unlinkSync } from 'node:fs';
const id = process.env.BACKUP_ID;
if (!/^\d{8}T\d{6}Z$/.test(id)) throw new Error('Invalid backup identifier');
unlinkSync(`/data/backups/${id}.sqlite`);
NODE
printf 'GD Apply private backup: %s\n' "$destination"
printf 'Contains the production database and encryption key. Never upload to GitHub.\n'
