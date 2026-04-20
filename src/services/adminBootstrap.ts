import bcrypt from 'bcryptjs';
import prisma from '../db';
import { ADMIN_BOOTSTRAP_EMAIL, ADMIN_BOOTSTRAP_PASSWORD } from '../config';
import { Role } from '@prisma/client';

export const bootstrapAdmin = async () => {
  if (!ADMIN_BOOTSTRAP_EMAIL || !ADMIN_BOOTSTRAP_PASSWORD) return;

  try {
    const existing = await prisma.user.findFirst({ where: { role: Role.ADMIN } });
    if (existing) return;

    const passwordHash = await bcrypt.hash(ADMIN_BOOTSTRAP_PASSWORD, 12);
    await prisma.user.upsert({
      where: { email: ADMIN_BOOTSTRAP_EMAIL },
      update: { role: Role.ADMIN, passwordHash },
      create: {
        email: ADMIN_BOOTSTRAP_EMAIL,
        passwordHash,
        role: Role.ADMIN,
        name: 'Admin',
      },
    });
    console.log('Admin user bootstrapped');
  } catch (err) {
    console.error('Failed to bootstrap admin user', err);
  }
};
