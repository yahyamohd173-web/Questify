import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { getCurrentMonthYear, getProgressColor } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : '';
    const token = bearerToken || req.cookies.get('token')?.value;
    const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
    if (!token || !secret) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const decoded = jwt.verify(token, secret) as { userId?: string };
    if (!decoded.userId) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const { month, year } = getCurrentMonthYear();
    const userSkills = await prisma.userSkill.findMany({ where: { userId: user.id, month, year }, include: { skill: true } });
    const skills = userSkills.map((us) => ({ id: us.skill.id, name: us.skill.name, description: us.skill.description, icon: us.skill.icon, progress: us.progress, color: getProgressColor(us.progress) }));

    const streaks = await prisma.streak.findMany({ where: { userId: user.id } });
    const dailyStreak = streaks.find((s) => s.type === 'daily')?.count || 0;
    const monthlyStreak = streaks.find((s) => s.type === 'monthly')?.count || 0;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    const [todayActivities, totalActivities] = await Promise.all([
      prisma.activity.count({ where: { userId: user.id, date: { gte: today, lt: tomorrow } } }),
      prisma.activity.count({ where: { userId: user.id } }),
    ]);

    return NextResponse.json({ success: true, data: { totalXp: user.totalXp, level: user.level, dailyStreak, monthlyStreak, todayActivities, totalActivities, skills } });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
  }
}
