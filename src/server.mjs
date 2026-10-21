import { createApp } from './app.mjs';
const app = createApp({
  ocrProvider: process.env.OCR_PROVIDER || 'local', geminiApiKey: process.env.GEMINI_API_KEY, geminiModel: process.env.GEMINI_OCR_MODEL || 'gemini-3.8-flash',
  dbPath: process.env.DB_PATH || './data/app.sqlite', masterKey: process.env.MASTER_KEY,
  adminEmail: process.env.ADMIN_EMAIL, adminPassword: process.env.ADMIN_PASSWORD,
  origin: process.env.APP_ORIGIN || 'https://apply.gdapps.online', production: process.env.NODE_ENV !== 'development',
});
const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || (process.env.NODE_ENV === 'development' ? '127.0.0.1' : '0.0.0.0');
app.server.listen(port, host, () => console.log(JSON.stringify({ event: 'listening', host, port })));
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => { app.close(); process.exit(0); });
