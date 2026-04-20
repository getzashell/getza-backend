import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { markDbUnhealthy } from './health';

export class DbUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DbUnavailableError';
  }
}

export async function prismaSafe<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    const message = err?.message || '';
    const isConnError =
      err instanceof PrismaClientKnownRequestError ||
      message.includes('Closed') ||
      message.includes('ECONNRESET') ||
      message.includes('ECONNREFUSED') ||
      message.includes('connection') ||
      message.includes('timeout');
    if (isConnError) {
      markDbUnhealthy(err);
      throw new DbUnavailableError('Database unavailable');
    }
    throw err;
  }
}
