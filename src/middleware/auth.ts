import { NextFunction, Response } from 'express';
import crypto from 'crypto';
import prisma from '../db';
import { SESSION_COOKIE_NAME, SESSION_TTL_DAYS, IS_PROD } from '../config';
import { Role } from '@prisma/client';

const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');

export const attachSession = async (req: any, res: Response, next: NextFunction) => {
  const rawToken = req.cookies?.[SESSION_COOKIE_NAME];
  if (!rawToken) return next();

  try {
    const tokenHash = hashToken(rawToken);
    const session = await prisma.session.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!session) return next();

    const expired = session.expiresAt < new Date();
    if (expired) {
      await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
      return next();
    }

    req.user = session.user;
    req.session = session;
  } catch (err) {
    console.error('Failed to attach session', err);
  }

  next();
};

export const requireAuth = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

// optionalAuth: attaches user if session exists, but allows guest requests through
export const optionalAuth = (req: any, res: Response, next: NextFunction) => {
  // Session is already attached by attachSession middleware — just proceed
  next();
};

export const requireAdmin = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  if (req.user.role !== Role.ADMIN) return res.status(403).json({ error: 'Forbidden' });
  next();
};

export const createSession = async (userId: string, meta: { userAgent?: string; ip?: string }) => {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  const session = await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      userAgent: meta.userAgent,
      ip: meta.ip,
    },
  });

  return { session, rawToken };
};

export const destroySession = async (rawToken?: string) => {
  if (!rawToken) return;
  const tokenHash = hashToken(rawToken);
  await prisma.session.deleteMany({ where: { tokenHash } });
};

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: IS_PROD,
  path: '/',
};
