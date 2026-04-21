import prisma from './index';

let isHealthy = false;
let checking = false;

export const dbHealthy = () => isHealthy;

export const checkDb = async (): Promise<boolean> => {
  if (checking) return isHealthy;
  checking = true;
  try {
    await prisma.$queryRaw`SELECT 1`;
    isHealthy = true;
    checking = false;
    return true;
  } catch (err) {
    console.warn('[DB] Health check failed:', err?.message);
    isHealthy = false;
    checking = false;
    return false;
  }
};

let intervalStarted = false;
export const startDbHealthInterval = () => {
  if (intervalStarted) return;
  intervalStarted = true;
  console.log('[DB] Health check interval started');
  setInterval(() => { checkDb().catch(()=>{}); }, 30_000);
};
