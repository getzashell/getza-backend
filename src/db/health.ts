import prisma from './index';

let isHealthy = false;
let lastError: { time: number; message: string } | null = null;
let checking = false;

export const dbHealthy = () => isHealthy;
export const getLastDbError = () => lastError;

export const markDbUnhealthy = (err: any) => {
  isHealthy = false;
  lastError = { time: Date.now(), message: err?.message || 'Unknown DB error' };
};

export const checkDb = async (): Promise<boolean> => {
  if (checking) return isHealthy;
  checking = true;
  try {
    await prisma.$queryRaw`SELECT 1`;
    isHealthy = true;
    checking = false;
    return true;
  } catch (err) {
    markDbUnhealthy(err);
    checking = false;
    return false;
  }
};

let intervalStarted = false;
export const startDbHealthInterval = () => {
  if (intervalStarted) return;
  intervalStarted = true;
  setInterval(() => {
    checkDb().catch(() => {});
  }, 30_000);
};
