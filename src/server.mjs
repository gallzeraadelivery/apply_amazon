import { createApp } from './app.mjs';
const app = createApp({
  dbPath: process.env.DB_PATH || './data/app.sqlite', masterKey: process.env.MASTER_KEY,
  adminEmail: process.env.ADMIN_EMAIL, adminPassword: process.env.ADMIN_PASSWORD,
  origin: process.env.APP_ORIGIN || 'https://apply.gdapps.online', production: process.env.NODE_ENV !== 'development',
});
const port = Number(process.env.PORT || 8080);
app.server.listen(port, '0.0.0.0', () => console.log(JSON.stringify({ event: 'listening', port })));
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => { app.close(); process.exit(0); });
