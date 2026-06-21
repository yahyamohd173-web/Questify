import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { getCurrentMonthYear, getProgressColor } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Missing authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    const userId = decoded.userId;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get current month year
    const { month, year } = getCurrentMonthYear();

    // Get user skills
    const userSkills = await prisma.userSkill.findMany({
      where: {
        userId,
        month,
        year,
      },
      include: {
        skill: true,
      },
    });

    // Format skills with colors
    const skills = userSkills.map((us) => ({
      id: us.skill.id,
      name: us.skill.name,
      description: us.skill.description,
      icon: us.skill.icon,
      progress: us.progress,
      color: getProgressColor(us.progress),
    }));

    // Get streaks
    const streaks = await prisma.streak.findMany({
      where: { userId },
    });

    const dailyStreak = streaks.find((s) => s.type === 'daily')?.count || 0;
    const monthlyStreak = streaks.find((s) => s.type === 'monthly')?.count || 0;

    // Get today's activities
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayActivities = await prisma.activity.count({
      where: {
        userId,
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Get total activities
    const totalActivities = await prisma.activity.count({
      where: { userId },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          totalXp: user.totalXp,
          level: user.level,
          dailyStreak,
          monthlyStreak,
          todayActivities,
          totalActivities,
          skills,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard' },
      { status: 500 }
    );
  }
}
