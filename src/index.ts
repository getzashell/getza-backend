import type { Request, Response } from 'express';
require('./loadEnv');
const app = require('./app').default;
const { connectWithRetry } = require('./db');
const { startDbHealthInterval } = require('./db/health');

const PORT = Number(process.env.PORT) || 4000;

// Debug route — BEFORE requireDb so it always works
app.get('/api/debug-pg', async (req: Request, res: Response) => {
  const { PrismaClient } = require('@prisma/client');
  const debugPrisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
    log: ['error', 'warn'],
  });
  try {
    const result = await debugPrisma.$queryRaw`SELECT version() as v`;
    res.json({ ok: true, version: (result as any)[0]?.v });
  } catch (err: any) {
    res.json({ 
      error: err.message, 
      code: err.code, 
      meta: err.meta 
    });
  } finally {
    await debugPrisma.$disconnect().catch(()=>{});
  }
});

app.get('/api/db-test', (req: Request, res: Response) => {
  res.json({
    ts: Date.now(),
    dbUrl: process.env.DATABASE_URL ? 'set' : 'not set',
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
    console.warn('DB connection failed — will retry in background');
    startDbHealthInterval(); // always start retries
  }
})();

module.exports = { app, server };
