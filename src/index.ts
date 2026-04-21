import type { Request, Response } from 'express';
require('./loadEnv');
const app = require('./app').default;
const { connectWithRetry } = require('./db');
const { startDbHealthInterval } = require('./db/health');

const PORT = Number(process.env.PORT) || 4000;

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    ok: true, 
    ts: Date.now(),
    dbUrl: process.env.DATABASE_URL ? 
      'set (' + process.env.DATABASE_URL.split('@')[1] + ')' : 
      'NOT SET'
  });
});

app.get('/api/db-test', (req: Request, res: Response) => {
  res.json({
    ts: Date.now(),
    env: process.env.NODE_ENV,
    dbUrl: process.env.DATABASE_URL ? 'set' : 'not set',
    dbUrlHost: process.env.DATABASE_URL ? process.env.DATABASE_URL.split('@')[1].split('/')[0] : 'none'
  });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});

process.on('uncaughtException', (err: any) => {
  console.error('Uncaught exception:', err.message);
});

process.on('unhandledRejection', (err: any) => {
  console.error('Unhandled rejection:', err);
});

(async () => {
  console.log('Connecting to DB...');
  const dbOk = await connectWithRetry();
  if (dbOk) {
    console.log('DB connected');
    startDbHealthInterval();
  } else {
    console.warn('DB connection failed — server running without DB');
  }
})();

module.exports = { app, server };
