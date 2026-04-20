import { NextFunction, Request, Response } from 'express';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const attachAnonUser = async (req: Request, res: Response, next: NextFunction) => {
  const anonIdHeader = req.header('x-anon-id');
  if (!anonIdHeader) return next();

  if (!uuidRegex.test(anonIdHeader)) {
    console.warn('Ignoring invalid X-ANON-ID header');
    return next();
  }

  (req as any).anonUserId = anonIdHeader;
  res.setHeader('x-anon-id', anonIdHeader);
  return next();
};
