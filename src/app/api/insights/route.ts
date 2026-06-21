import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { getCurrentMonthYear } from '@/lib/utils';

interface Insight {
  type: 'positive' | 'neutral' | 'suggestion';
  message: string;
  icon: string;
}

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

    const { month, year } = getCurrentMonthYear();

    // Get current month skills
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

    // Get activities this month
    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month, 0);

    const activities = await prisma.activity.findMany({
      where: {
        userId,
        date: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    });

    // Get last month skills for comparison
    const lastMonth = month === 1 ? 12 : month - 1;
    const lastMonthYear = month === 1 ? year - 1 : year;

    const lastMonthSkills = await prisma.userSkill.findMany({
      where: {
        userId,
        month: lastMonth,
        year: lastMonthYear,
      },
      include: {
        skill: true,
      },
    });

    // Calculate insights
    const insights: Insight[] = [];

    // Best skill
    const bestSkill = userSkills.reduce((prev, current) =>
      current.progress > prev.progress ? current : prev
    );

    const lowestSkill = userSkills.reduce((prev, current) =>
      current.progress < prev.progress ? current : prev
    );

    const totalXpThisMonth = activities.reduce((sum, a) => sum + a.xpReward, 0);

    // Generate insights
    if (bestSkill.progress === 100) {
      insights.push({
        type: 'positive',
        message: `🎉 Amazing! You've mastered ${bestSkill.skill.name} (100%)! Keep this streak going!`,
        icon: '⭐',
      });
    } else if (bestSkill.progress >= 80) {
      insights.push({
        type: 'positive',
        message: `You're crushing it in ${bestSkill.skill.name} (${Math.round(
          bestSkill.progress
        )}%)! Keep it up!`,
        icon: '📈',
      });
    }

    if (lowestSkill.progress < 20) {
      insights.push({
        type: 'suggestion',
        message: `📍 ${lowestSkill.skill.name} needs some love (${Math.round(
          lowestSkill.progress
        )}%). Try logging more activities in this area!`,
        icon: '🎯',
      });
    }

    if (totalXpThisMonth > 500) {
      insights.push({
        type: 'positive',
        message: `🔥 You've earned ${totalXpThisMonth} XP this month! That's incredible dedication!`,
        icon: '💪',
      });
    } else if (totalXpThisMonth < 100) {
      insights.push({
        type: 'suggestion',
        message: `Let's get moving! Log more activities this month to reach your full potential.`,
        icon: '🚀',
      });
    }

    if (activities.length > 20) {
      insights.push({
        type: 'positive',
        message: `Consistency is key! You've logged ${activities.length} activities this month. You're a machine!`,
        icon: '⚡',
      });
    }

    // Compare with last month
    const lastMonthTotal = lastMonthSkills.reduce((sum, s) => sum + s.progress, 0);
    const thisMonthTotal = userSkills.reduce((sum, s) => sum + s.progress, 0);

    if (thisMonthTotal > lastMonthTotal + 50) {
      insights.push({
        type: 'positive',
        message: `📊 Your overall growth is accelerating! Keep pushing harder!`,
        icon: '🎆',
      });
    }

    if (insights.length === 0) {
      insights.push({
        type: 'neutral',
        message: 'Keep logging activities and your progress will shine through!',
        icon: '✨',
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          insights,
          stats: {
            thisMonthXp: totalXpThisMonth,
            thisMonthActivities: activities.length,
            bestSkill: {
              name: bestSkill.skill.name,
              progress: bestSkill.progress,
            },
            lowestSkill: {
              name: lowestSkill.skill.name,
              progress: lowestSkill.progress,
            },
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Insights error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}
