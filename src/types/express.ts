import 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      anonUserId?: string;
      user?: import('@prisma/client').User;
      session?: import('@prisma/client').Session;
    }
  }
}

export {};
