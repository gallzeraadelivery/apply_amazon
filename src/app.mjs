import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, randomUUID, createHash, scryptSync, timingSafeEqual, createCipheriv, createDecipheriv } from 'node:crypto';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ApexClient, HttpError, applicationForm, redact } from './apex.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const hash = value => createHash('sha256').update(value).digest('hex');
function passwordHash(password) { const salt = randomBytes(16).toString('hex'); return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`; }
function verifyPassword(password, stored) {
  const [salt, encoded] = stored.split(':'); const a = scryptSync(password, salt, 64); const b = Buffer.from(encoded, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}
function validPassword(value) { return typeof value === 'string' && value.length >= 14 && value.length <= 200; }
function seal(value, key) {
  const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', key, iv);
  const body = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  return [iv, cipher.getAuthTag(), body].map(b => b.toString('base64')).join('.');
}
function unseal(value, key) {
  const [iv, tag, body] = value.split('.').map(s => Buffer.from(s, 'base64'));
  const cipher = createDecipheriv('aes-256-gcm', key, iv); cipher.setAuthTag(tag);
  return Buffer.concat([cipher.update(body), cipher.final()]).toString('utf8');
}
async function bytes(req, max = 16 * 1024 * 1024) {
  let size = 0; const chunks = [];
  for await (const part of req) { size += part.length; if (size > max) throw new HttpError(413, 'body_too_large', 'Envio acima do limite permitido.'); chunks.push(part); }
  return Buffer.concat(chunks);
}
async function jsonBody(req) {
  if (!(req.headers['content-type'] ?? '').startsWith('application/json')) throw new HttpError(415, 'json_required', 'Envie um corpo JSON.');
  try { const value = JSON.parse((await bytes(req, 64 * 1024)).toString()); if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(); return value; }
  catch (e) { if (e instanceof HttpError) throw e; throw new HttpError(400, 'invalid_json', 'JSON inválido.'); }
}
const uuid = value => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

export function createApp(config) {
  const { dbPath, masterKey, adminEmail, adminPassword, origin, production = true, fetchImpl } = config;
  if (!/^[a-f0-9]{64}$/i.test(masterKey ?? '') || !adminEmail || !validPassword(adminPassword)) throw new Error('Configure MASTER_KEY, ADMIN_EMAIL e ADMIN_PASSWORD (mínimo 14 caracteres).');
  const key = Buffer.from(masterKey, 'hex'); const allowedOrigin = new URL(origin).origin;
  if (production && !allowedOrigin.startsWith('https://')) throw new Error('Produção requer HTTPS.');
  if (dbPath !== ':memory:') mkdirSync(dirname(dbPath), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(dbPath);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
    CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,password TEXT NOT NULL,must_change INTEGER NOT NULL DEFAULT 1);
    CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),csrf TEXT NOT NULL,expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS integrations (user_id TEXT PRIMARY KEY REFERENCES users(id),token TEXT NOT NULL,email TEXT NOT NULL,connected_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id TEXT,action TEXT NOT NULL,target TEXT,status TEXT NOT NULL,created_at TEXT NOT NULL);
  `);
  if (!db.prepare('SELECT id FROM users LIMIT 1').get()) db.prepare('INSERT INTO users VALUES(?,?,?,1)').run(randomUUID(), adminEmail.toLowerCase(), passwordHash(adminPassword));
  const apex = new ApexClient({ fetchImpl }); const attempts = new Map();
  const failedHash = passwordHash(randomBytes(32).toString('hex'));
  let busy = false;
  const audit = (user, action, target, status) => db.prepare('INSERT INTO audit(user_id,action,target,status,created_at) VALUES(?,?,?,?,?)').run(user?.id ?? null, action, target ?? null, status, new Date().toISOString());
  const tokenFor = user => {
    const row = db.prepare('SELECT token FROM integrations WHERE user_id=?').get(user.id);
    if (!row) throw new HttpError(409, 'apex_not_connected', 'Conecte sua conta Apex na aba Integrações.');
    try { return unseal(row.token, key); } catch { throw new HttpError(503, 'integration_key_error', 'Não foi possível abrir a sessão armazenada. Reconecte a Apex.'); }
  };
  const statusFor = user => {
    const row = db.prepare('SELECT email,connected_at FROM integrations WHERE user_id=?').get(user.id);
    return { apex: { connected: Boolean(row), ...(row ?? {}), mode: 'live' }, amazon: { connected: false, mode: 'unavailable', reason: 'Credenciais e contrato de integração autorizada ainda não fornecidos. HARs não são credenciais de API.' } };
  };
  const server = http.createServer(async (req, res) => {
    const requestId = randomUUID(); let user; let pathname = '';
    const send = (status, data, headers = {}) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...headers }); res.end(JSON.stringify(data)); };
    res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Frame-Options', 'DENY'); res.setHeader('X-Request-Id', requestId);
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; object-src 'none'");
    try {
      const url = new URL(req.url, allowedOrigin); pathname = url.pathname;
      if (req.method === 'GET' && pathname === '/api/health') return send(200, { status: 'ok', component: 'application', applicationReady: true });
      if (req.method === 'GET' && ['/', '/app.mjs', '/style.css'].includes(pathname)) {
        const name = pathname === '/' ? 'index.html' : pathname.slice(1);
        const types = { 'index.html': 'text/html; charset=utf-8', 'app.mjs': 'text/javascript; charset=utf-8', 'style.css': 'text/css; charset=utf-8' };
        res.writeHead(200, { 'Content-Type': types[name] }); return res.end(readFileSync(resolve(root, 'public', name)));
      }
      const unsafe = !['GET', 'HEAD', 'OPTIONS'].includes(req.method);
      if (unsafe && req.headers.origin !== allowedOrigin) throw new HttpError(403, 'invalid_origin', 'Origem da solicitação inválida.');
      const cookieName = production ? '__Host-gd_session' : 'gd_session';
      const cookie = (req.headers.cookie ?? '').split(';').map(s => s.trim()).find(s => s.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
      const session = cookie ? db.prepare('SELECT s.*,u.email,u.password,u.must_change FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.id=? AND s.expires>?').get(hash(cookie), Date.now()) : null;
      if (session) user = { id: session.user_id, email: session.email, mustChangePassword: Boolean(session.must_change) };
      if (pathname === '/api/auth/login' && req.method === 'POST') {
        const ip = production ? String(req.headers['x-real-ip'] ?? req.socket.remoteAddress) : req.socket.remoteAddress;
        const now = Date.now();
        for (const [k, entry] of attempts) if (entry.until < now) attempts.delete(k);
        if (attempts.size > 10000 || (attempts.get(ip)?.count ?? 0) >= 8) throw new HttpError(429, 'login_limited', 'Muitas tentativas. Aguarde 15 minutos.');
        const data = await jsonBody(req);
        if (typeof data.email !== 'string' || typeof data.password !== 'string' || data.email.length > 254 || data.password.length > 200) throw new HttpError(400, 'invalid_login', 'Informe e-mail e senha.');
        const row = db.prepare('SELECT * FROM users WHERE email=?').get(data.email.trim().toLowerCase());
        const valid = verifyPassword(data.password, row?.password ?? failedHash);
        if (!row || !valid) { const entry = attempts.get(ip) ?? { count: 0, until: now + 900000 }; entry.count++; attempts.set(ip, entry); throw new HttpError(401, 'bad_credentials', 'E-mail ou senha inválidos.'); }
        attempts.delete(ip); db.prepare('DELETE FROM sessions WHERE expires<?').run(now);
        const raw = randomBytes(32).toString('hex'); const csrf = randomBytes(32).toString('hex');
        db.prepare('INSERT INTO sessions VALUES(?,?,?,?)').run(hash(raw), row.id, csrf, now + 12 * 3600000);
        audit({ id: row.id }, 'auth.login', null, 'success');
        return send(200, { user: { email: row.email, mustChangePassword: Boolean(row.must_change) }, csrf }, { 'Set-Cookie': `${cookieName}=${raw}; HttpOnly; Path=/; SameSite=Strict; Max-Age=43200${production ? '; Secure' : ''}` });
      }
      if (!user) throw new HttpError(401, 'login_required', 'Entre para continuar.');
      if (unsafe && req.headers['x-csrf-token'] !== session.csrf) throw new HttpError(403, 'invalid_csrf', 'Sessão de segurança inválida. Atualize a página.');
      if (req.method === 'GET' && pathname === '/api/auth/session') return send(200, { user, csrf: session.csrf });
      if (req.method === 'POST' && pathname === '/api/auth/logout') {
        db.prepare('DELETE FROM sessions WHERE id=?').run(session.id);
        return send(200, { success: true }, { 'Set-Cookie': `${cookieName}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0${production ? '; Secure' : ''}` });
      }
      if (req.method === 'POST' && pathname === '/api/auth/password') {
        const data = await jsonBody(req);
        if (!validPassword(data.newPassword) || data.newPassword === data.currentPassword || typeof data.currentPassword !== 'string' || data.currentPassword.length > 200) throw new HttpError(400, 'weak_password', 'Use uma nova senha com 14 a 200 caracteres.');
        if (!verifyPassword(data.currentPassword, session.password)) throw new HttpError(400, 'wrong_password', 'Senha atual inválida.');
        db.prepare('UPDATE users SET password=?,must_change=0 WHERE id=?').run(passwordHash(data.newPassword), user.id);
        db.prepare('DELETE FROM sessions WHERE user_id=? AND id<>?').run(user.id, session.id);
        audit(user, 'auth.password_changed', null, 'success'); return send(200, { success: true });
      }
      if (user.mustChangePassword) throw new HttpError(403, 'password_change_required', 'Troque a senha inicial antes de usar as integrações.');
      if (req.method === 'GET' && pathname === '/api/integrations') return send(200, statusFor(user));
      if (req.method === 'POST' && pathname === '/api/integrations/apex/connect') {
        const data = await jsonBody(req);
        if (typeof data.email !== 'string' || !data.email.includes('@') || data.email.length > 254 || typeof data.password !== 'string' || !data.password || data.password.length > 200) throw new HttpError(400, 'invalid_login', 'Informe as credenciais da sua conta Apex.');
        const auth = await apex.login(data.email.trim(), data.password);
        db.prepare('INSERT INTO integrations VALUES(?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET token=excluded.token,email=excluded.email,connected_at=excluded.connected_at').run(user.id, seal(auth.token, key), data.email.trim(), new Date().toISOString());
        audit(user, 'apex.connected', null, 'success'); return send(200, statusFor(user));
      }
      if (req.method === 'DELETE' && pathname === '/api/integrations/apex') {
        db.prepare('DELETE FROM integrations WHERE user_id=?').run(user.id); audit(user, 'apex.disconnected', null, 'success'); return send(200, statusFor(user));
      }
      if (pathname.startsWith('/api/amazon/')) throw new HttpError(503, 'amazon_not_configured', 'Integração Amazon indisponível: acesso autorizado ainda não configurado.');
      if (req.method === 'GET' && pathname === '/api/audit') return send(200, { events: db.prepare('SELECT action,target,status,created_at FROM audit WHERE user_id=? ORDER BY id DESC LIMIT 100').all(user.id) });
      if (req.method === 'GET' && pathname === '/api/apex/accounts') return send(200, redact(await apex.request('/api/accounts?include_archived=1', { token: tokenFor(user) })));
      if (req.method === 'GET' && pathname === '/api/apex/credits') return send(200, redact(await apex.request('/api/credits', { token: tokenFor(user) })));
      let match = pathname.match(/^\/api\/apex\/accounts\/([^/]+)(?:\/(application-data|start|documents))?$/);
      if (match) {
        const [, id, operation] = match;
        if (!uuid(id)) throw new HttpError(400, 'invalid_account_id', 'ID de conta inválido.');
        const token = tokenFor(user);
        if (req.method === 'GET' && !operation) return send(200, redact(await apex.request(`/api/accounts/${id}`, { token })));
        if (req.method === 'POST' && operation && ['application-data', 'start', 'documents'].includes(operation)) {
          // Mutations are serialized. Never retry a potentially accepted upstream operation.
          if (busy) throw new HttpError(409, 'operation_in_progress', 'Uma operação já está em andamento. Aguarde.');
          busy = true;
          try {
            let body; let upstreamPath = `/api/accounts/${id}/${operation}`;
            if (operation === 'documents') {
              const kind = url.searchParams.get('kind');
              if (!['dlFront', 'dlBack', 'profilePhoto'].includes(kind)) throw new HttpError(400, 'invalid_document', 'Tipo de documento inválido.');
              if (req.headers['x-confirm-operation'] !== 'upload') throw new HttpError(400, 'confirmation_required', 'Confirme o envio do documento.');
              const payload = await bytes(req, 9 * 1024 * 1024);
              let form;
              try { form = await new Request('https://localhost/upload', { method: 'POST', headers: { 'content-type': req.headers['content-type'] ?? '' }, body: payload }).formData(); }
              catch { throw new HttpError(400, 'invalid_upload', 'Upload multipart inválido.'); }
              const file = form.get('file');
              if (!(file instanceof Blob) || !file.size || file.size > 8 * 1024 * 1024 || !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) throw new HttpError(400, 'invalid_file', 'Envie JPG, PNG ou PDF de até 8 MB.');
              const head = Buffer.from(await file.slice(0, 8).arrayBuffer());
              const valid = file.type === 'application/pdf' ? head.subarray(0, 5).toString() === '%PDF-' : file.type === 'image/jpeg' ? head[0] === 255 && head[1] === 216 && head[2] === 255 : head.toString('hex') === '89504e470d0a1a0a';
              if (!valid) throw new HttpError(400, 'file_signature_mismatch', 'O conteúdo não corresponde ao tipo do arquivo.');
              // The captured Apex client uses the field "image"; kind belongs in the URL.
              body = new FormData(); body.set('image', file, `document.${file.type === 'application/pdf' ? 'pdf' : file.type === 'image/png' ? 'png' : 'jpg'}`);
              upstreamPath = `/api/accounts/${id}/file/${kind}`;
            } else {
              const data = await jsonBody(req);
              if (data.confirm !== true) throw new HttpError(400, 'confirmation_required', 'Confirme explicitamente a operação.');
              body = operation === 'application-data' ? applicationForm(data.fields) : {};
            }
            audit(user, `apex.${operation}`, id, 'requested');
            const result = await apex.request(upstreamPath, { token, method: 'POST', body });
            audit(user, `apex.${operation}`, id, 'http_success');
            return send(200, { data: redact(result), notice: 'A Apex respondeu com sucesso HTTP. Acompanhe o estado para confirmar o resultado da operação.' });
          } catch (error) { audit(user, `apex.${operation}`, id, 'not_confirmed'); throw error; }
          finally { busy = false; }
        }
      }
      match = pathname.match(/^\/api\/apex\/runs\/([^/]+)$/);
      if (req.method === 'GET' && match) {
        if (!uuid(match[1])) throw new HttpError(400, 'invalid_run_id', 'ID de execução inválido.');
        return send(200, redact(await apex.request(`/api/runs/${match[1]}`, { token: tokenFor(user) })));
      }
      throw new HttpError(404, 'not_found', 'Rota não encontrada.');
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      if (status === 500) console.error(JSON.stringify({ requestId, event: 'internal_error', route: pathname, type: error.name }));
      if (!res.headersSent) send(status, { error: error instanceof HttpError ? error.code : 'internal_error', message: error instanceof HttpError ? error.message : 'Erro interno. Consulte o identificador da solicitação.', requestId });
      else res.end();
    }
  });
  server.requestTimeout = 45000; server.headersTimeout = 15000;
  return { server, db, close: () => { server.close(); server.closeAllConnections(); db.close(); } };
}
