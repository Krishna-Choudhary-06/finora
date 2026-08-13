import { prisma } from './db';
export async function logAudit(event: string, actor?: string, context?: string, metadata?: any) {
  try {
    await prisma.auditEvent.create({
      data: { event, actor, context, metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : null }
    });
  } catch (err) {
    console.error('Failed to log audit event:', err);
  }
}