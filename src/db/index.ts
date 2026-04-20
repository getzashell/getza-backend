import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// Retry logic for Neon cold-start / serverless spin-up
let connectAttempts = 0;
const connectWithRetry = async () => {
  while (connectAttempts < 5) {
    try {
      await prisma.$connect();
      console.log('✅ DB connected');
      return true;
    } catch (err: any) {
      connectAttempts++;
      console.warn(`⚠️  DB connection attempt ${connectAttempts} failed: ${err.message}`);
      if (connectAttempts >= 5) {
        console.error('❌ DB connection failed after 5 attempts');
        return false;
      }
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { connectWithRetry };
export default prisma;
