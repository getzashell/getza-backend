FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY src ./src
COPY tsconfig.json .
COPY prisma ./prisma
RUN npx prisma generate && npm run build
EXPOSE 4000
ENV NODE_ENV=production
ENV PORT=4000
ENV DATABASE_URL="postgresql://neondb_owner:npg_3tazongv1ANh@ep-icy-hat-abt4jwpw-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"
# Graceful DB failure - don't exit on DB unavailable
CMD ["node", "-e", "\
const app = require('./app'); \
const { connectWithRetry } = require('./db'); \
const { startDbHealthInterval } = require('./db/health'); \
const PORT = Number(process.env.PORT) || 4000; \
process.on('uncaughtException', (err) => { console.error('Uncaught:', err.message); process.exit(1); }); \
process.on('unhandledRejection', (err) => { console.error('Unhandled:', err); process.exit(1); }); \
(async () => { \
  const dbOk = await connectWithRetry(); \
  console.log(dbOk ? 'DB connected' : 'DB unavailable - starting anyway'); \
  const server = app.app.listen(PORT, '0.0.0.0', () => console.log('Listening on', PORT)); \
  server.on('error', (err) => { console.error('Server error:', err.message); process.exit(1); }); \
  startDbHealthInterval(); \
})(); \
"]
