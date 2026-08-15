import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { SKILL_CATEGORIES } from '@/lib/constants';
import { getCurrentMonthYear } from '@/lib/utils';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;

    if (!name || !email || !password) return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 });
    if (!email.includes('@') || email.length > 254) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    if (name.length > 80) return NextResponse.json({ error: 'Name is too long.' }, { status: 400 });
    if (!secret) return NextResponse.json({ error: 'Server authentication is not configured. Add JWT_SECRET in Vercel Environment Variables.' }, { status: 500 });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return NextResponse.json({ error: 'An account with this email already exists. Try logging in.' }, { status: 409 });

    const hashedPassword = await hashPassword(password);
    const { month, year } = getCurrentMonthYear();

    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({ data: { name, email, password: hashedPassword } });

      for (const skillCategory of SKILL_CATEGORIES) {
        await tx.skill.upsert({
          where: { name: skillCategory.name },
          update: { description: skillCategory.description, icon: skillCategory.icon, baseMultiplier: skillCategory.baseMultiplier },
          create: { name: skillCategory.name, description: skillCategory.description, icon: skillCategory.icon, baseMultiplier: skillCategory.baseMultiplier },
        });
      }

      const skills = await tx.skill.findMany({ select: { id: true } });
      if (skills.length) {
        await tx.userSkill.createMany({
          data: skills.map((skill) => ({ userId: createdUser.id, skillId: skill.id, progress: 0, month, year })),
          skipDuplicates: true,
        });
      }

      await tx.streak.createMany({
        data: [
          { userId: createdUser.id, type: 'daily', count: 0 },
          { userId: createdUser.id, type: 'weekly', count: 0 },
          { userId: createdUser.id, type: 'monthly', count: 0 },
        ],
        skipDuplicates: true,
      });
      return createdUser;
    });

    const token = jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn: '30d' });
    const { password: _, ...safeUser } = user;
    const response = NextResponse.json({ message: 'Account created successfully.', user: safeUser }, { status: 201 });
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 });
    return response;
  } catch (error) {
    console.error('Signup error:', error);
    const message = error instanceof Error ? error.message.toLowerCase() : '';
    if (message.includes('database') || message.includes('prisma')) return NextResponse.json({ error: 'Database is not reachable. Check the Vercel DATABASE_URL and Prisma database connection.' }, { status: 503 });
    return NextResponse.json({ error: 'Unable to create your account right now. Please try again.' }, { status: 500 });
  }
}
