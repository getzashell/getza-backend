require('./loadEnv');
const app = require('./app').default;
const { connectWithRetry } = require('./db');
const { bootstrapAdmin } = require('./services/adminBootstrap');
const { startDbHealthInterval } = require('./db/health');

const PORT = Number(process.env.PORT) || 4000;

// Start server FIRST, then connect DB in background
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});

// Don't exit on uncaughtException — let the server stay up
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err.message);
  // Don't exit — server is still listening
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  // Don't exit
});

// Connect DB in background, don't block server startup
(async () => {
  console.log('Connecting to DB...');
  const dbOk = await connectWithRetry();
  if (dbOk) {
    console.log('DB connected');
    await bootstrapAdmin();
    startDbHealthInterval();
  } else {
    console.warn('DB connection failed — server running without DB');
  }
})();

module.exports = { app, server };
