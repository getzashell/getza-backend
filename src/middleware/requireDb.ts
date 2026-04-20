import { Request, Response, NextFunction } from 'express';
import { dbHealthy } from '../db/health';

export const requireDb = (_req: Request, res: Response, next: NextFunction) => {
  if (!dbHealthy()) {
    return res.status(503).json({
      error: 'Database unavailable',
      hint: 'Check Neon direct DATABASE_URL and sslmode=require',
    });
  }
  next();
};
