import { Request, Response, NextFunction } from 'express';
import { DbUnavailableError } from '../db/prismaSafe';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof DbUnavailableError) {
    return res.status(503).json({
      error: 'Database unavailable',
      hint: 'Check Neon direct DATABASE_URL and sslmode=require',
    });
  }
  console.error('Unhandled error', err);
  return res.status(500).json({ error: 'Internal server error' });
};
