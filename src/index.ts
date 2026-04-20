require('./loadEnv');
const app = require('./app').default;
const { connectWithRetry } = require('./db');
const { bootstrapAdmin } = require('./services/adminBootstrap');
const { checkDb, startDbHealthInterval } = require('./db/health');

const PORT = process.env.PORT || 4000;

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

async function start() {
  console.log('Connecting to DB...');
  const dbOk = await connectWithRetry();
  if (!dbOk) {
    console.error('DB connection failed — exiting');
    process.exit(1);
  }
  console.log('DB connected');

  const server = app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on 0.0.0.0:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} in use`);
    } else {
      console.error('Server error', err);
    }
    process.exit(1);
  });

  bootstrapAdmin().catch((err: any) => console.error('Admin bootstrap error:', err));
  startDbHealthInterval();
}

start();
