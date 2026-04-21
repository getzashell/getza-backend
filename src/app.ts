import './loadEnv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import productsRouter from './routes/products';
import templatesRouter from './routes/templates';
import documentRunsRouter from './routes/documentRuns';
import checkoutRouter from './routes/checkout';
import stripeWebhookRouter from './routes/stripeWebhook';
import { attachAnonUser } from './middleware/anonUser';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import adminTemplatesRouter from './routes/adminTemplates';
import { attachSession } from './middleware/auth';
import { FRONTEND_ORIGIN } from './config';
import complianceRouter from './routes/compliance';
import { requireDb } from './middleware/requireDb';
import { errorHandler } from './middleware/errorHandler';
import { getOrCreateAppSettings } from './services/settings';
import { bootstrapAdmin } from './services/adminBootstrap';
import { checkDb, dbHealthy, startDbHealthInterval } from './db/health';
import { PrismaClient } from '@prisma/client';

const root = path.resolve(__dirname, '../../');

type RouteLayer = { route?: { path?: string; stack?: { method?: string }[] } };

const app = express();
const isDev = process.env.NODE_ENV !== 'production';

const corsOrigin = FRONTEND_ORIGIN || (isDev ? 'https://getza.co.uk' : undefined);
app.use(
  cors({
    origin: corsOrigin || true,
    credentials: true,
  })
);

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/healthz', (_req, res) =>
  res.json({
    ok: true,
    db: dbHealthy(),
    degraded: !dbHealthy(),
  })
);

app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }), stripeWebhookRouter);
app.use(express.json());
app.use(cookieParser());
app.use(attachSession);
app.use(attachAnonUser);

// Debug routes — registered before requireDb so they always work
app.get('/api/debug-env', (_req, res) => {
  res.json({
    pid: process.pid,
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    dbUrlSet: !!process.env.DATABASE_URL,
    dbUrlHost: process.env.DATABASE_URL ? process.env.DATABASE_URL.split('@')[1]?.split('/')[0] : null,
    nodeVersion: process.version,
  });
});

// Debug route that tries actual DB connection — registered before requireDb
app.get('/api/debug-pg', async (_req, res) => {
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
      meta: err.meta,
      name: err.name,
      stack: err.stack?.split('\n')[0]
    });
  } finally {
    await debugPrisma.$disconnect().catch(() => {});
  }
});

app.use(requireDb);

const logRoutes = (prefix: string, router: express.Router) => {
  if (!isDev) return;
  const layers = (router as any).stack as RouteLayer[];
  const routes =
    layers
      ?.filter((l) => l.route && l.route.stack?.length)
      .map((l) => {
        const methods = l.route?.stack?.map((s) => s.method?.toUpperCase()).filter(Boolean) ?? [];
        return `${methods.join(',')} ${prefix}${l.route?.path || ''}`;
      }) || [];
  if (routes.length) {
    console.log('[routes]', routes.join(' | '));
  }
};

app.use('/api/products', productsRouter);
logRoutes('/api/products', productsRouter);

app.use('/api/templates', templatesRouter);
logRoutes('/api/templates', templatesRouter);

app.use('/api/document-runs', documentRunsRouter);
logRoutes('/api/document-runs', documentRunsRouter);

app.use('/api/checkout', checkoutRouter);
logRoutes('/api/checkout', checkoutRouter);

app.use('/api/auth', authRouter);
logRoutes('/api/auth', authRouter);

app.use('/api/admin', adminRouter);
logRoutes('/api/admin', adminRouter);

app.use('/api/admin', adminTemplatesRouter);
logRoutes('/api/admin', adminTemplatesRouter);

app.use('/api/compliance', complianceRouter);
logRoutes('/api/compliance', complianceRouter);

app.get('/api/settings/public', async (_req, res) => {
  try {
    const settings = await getOrCreateAppSettings();
    return res.json({ developerMode: settings.developerMode });
  } catch (err) {
    console.error('Failed to fetch public settings', err);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.use(errorHandler);

checkDb()
  .then((ok) => {
    if (ok) {
      console.log('DB connected');
    } else {
      console.warn('DB connection failed. Check Neon direct DATABASE_URL and sslmode=require.');
    }
  })
  .catch((err) => {
    console.warn('DB health check failed', err);
  });

bootstrapAdmin().catch((err) => {
  console.error('Admin bootstrap failed', err);
});

startDbHealthInterval();

export default app;
export { app, bootstrapAdmin, checkDb, startDbHealthInterval };
