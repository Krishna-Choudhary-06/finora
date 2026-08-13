import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { prisma } from './db';
import { logAudit } from './audit';
import { requireAuth } from './auth.middleware';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_example';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const email = data.email.toLowerCase();
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      // Return 200/success to avoid leaking email existence, or specific error depending on policy.
      // Usually, send a "Check your email" response or generic error.
      res.status(400).json({ error: { code: 'EMAIL_EXISTS', message: 'Email already registered' }});
      return;
    }
    
    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await prisma.$transaction(async (tx: any) => {
      return tx.user.create({
        data: {
          email,
          passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'CUSTOMER'
        }
      });
    });
    
    await logAudit('USER_REGISTERED', user.id, 'auth/register');
    res.status(201).json({ message: 'Registration successful' });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: err.errors }});
    } else {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error' }});
    }
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const email = data.email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || user.status === 'DISABLED') {
      await logAudit('LOGIN_FAILED', email, 'auth/login', { reason: 'user_not_found_or_disabled' });
      res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' }});
      return;
    }
    
    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) {
      await logAudit('LOGIN_FAILED', user.id, 'auth/login', { reason: 'invalid_password' });
      res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' }});
      return;
    }
    
    // Create session
    const sessionId = uuidv4();
    const tokenHash = await bcrypt.hash(uuidv4(), 10);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    await prisma.session.create({
      data: { id: sessionId, userId: user.id, tokenHash, expiresAt }
    });
    
    const token = jwt.sign({ userId: user.id, sessionId }, JWT_SECRET, { expiresIn: '15m' });
    
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 mins
    });
    
    await logAudit('LOGIN_SUCCESS', user.id, 'auth/login');
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: err.errors }});
    } else {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error' }});
    }
  }
});

router.get('/me', requireAuth, (req, res) => {
  const user = (req as any).user;
  res.json({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role, emailVerified: user.emailVerified });
});

router.post('/logout', requireAuth, async (req, res) => {
  const sessionId = (req as any).sessionId;
  await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
  res.clearCookie('accessToken');
  await logAudit('LOGOUT', (req as any).user.id, 'auth/logout');
  res.json({ message: 'Logged out' });
});

export default router;