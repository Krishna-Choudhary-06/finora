import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from './db';
import { env } from '../config';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_example';

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1] || req.cookies?.accessToken;
  if (!token) {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing token', requestId: req.headers['x-request-id'] }});
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string, sessionId: string };
    const session = await prisma.session.findUnique({ where: { id: payload.sessionId } });
    if (!session || session.expiresAt < new Date()) {
      res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid or expired session' }});
      return;
    }
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || user.status === 'DISABLED') {
      res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'User disabled or not found' }});
      return;
    }
    (req as any).user = user;
    (req as any).sessionId = session.id;
    next();
  } catch (err) {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid token' }});
    return;
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Insufficient role' }});
      return;
    }
    next();
  };
};