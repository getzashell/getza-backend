import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import prisma from '../db';
import { createSession, destroySession, sessionCookieOptions } from '../middleware/auth';
import { SESSION_COOKIE_NAME } from '../config';
import { requireAuth } from '../middleware/auth';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(120).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post('/signup', authLimiter, async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const { email, password, name } = parsed.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    });

    const { rawToken } = await createSession(user.id, { userAgent: req.headers['user-agent'], ip: req.ip });
    res.cookie(SESSION_COOKIE_NAME, rawToken, sessionCookieOptions);

    return res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    console.error('Signup failed', err);
    return res.status(500).json({ error: 'Failed to sign up' });
  }
});

router.post('/login', authLimiter, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const { rawToken } = await createSession(user.id, { userAgent: req.headers['user-agent'], ip: req.ip });
    res.cookie(SESSION_COOKIE_NAME, rawToken, sessionCookieOptions);

    return res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    console.error('Login failed', err);
    return res.status(500).json({ error: 'Failed to login' });
  }
});

router.post('/logout', async (req, res) => {
  const rawToken = req.cookies?.[SESSION_COOKIE_NAME];
  await destroySession(rawToken).catch(() => {});
  res.clearCookie(SESSION_COOKIE_NAME, sessionCookieOptions);
  return res.json({ ok: true });
});

router.get('/me', requireAuth, (req: any, res) => {
  const user = req.user;
  return res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
});

export default router;
