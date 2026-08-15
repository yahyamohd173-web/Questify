import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;

    if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    if (!secret) return NextResponse.json({ error: 'Server authentication is not configured. Add JWT_SECRET in Vercel Environment Variables.' }, { status: 500 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });

    const valid = await verifyPassword(password, user.password);
    if (!valid) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });

    const token = jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn: '30d' });
    const { password: _, ...safeUser } = user;
    const response = NextResponse.json({ message: 'Login successful.', user: safeUser }, { status: 200 });
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Unable to log in right now. Please try again.' }, { status: 500 });
  }
}
