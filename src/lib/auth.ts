import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function verifyAuth(req: NextRequest): { id: string } | null {
  let token;

  if (req.headers.get('authorization') && req.headers.get('authorization')?.startsWith('Bearer')) {
    token = req.headers.get('authorization')?.split(' ')[1];
  }

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkeyforeliteopsglobalenterprise2026') as { id: string };
    return decoded;
  } catch (err) {
    return null;
  }
}
