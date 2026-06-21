import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { calculateSkillProgress, calculateXpReward, calculateLevelFromXp, getCurrentMonthYear } from '@/lib/utils';

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

    const activities = await prisma.activity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json(
      {
        success: true,
        data: activities,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get activities error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
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

    const { name, description, durationMinutes, skillIds } = await req.json();

    if (!name || !durationMinutes || !skillIds || skillIds.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate XP reward
    const xpReward = calculateXpReward(durationMinutes);

    // Get current month/year
    const { month, year } = getCurrentMonthYear();

    // Create activity
    const activity = await prisma.activity.create({
      data: {
        userId,
        name,
        description,
        durationMinutes,
        xpReward,
      },
    });

    // Get skill names for the provided skill IDs and create mappings
    const skills = await prisma.skill.findMany({
      where: {
        name: {
          in: skillIds,
        },
      },
    });

    // Calculate skill progress
    const skillProgress = calculateSkillProgress(durationMinutes);

    // Create activity-skill mappings
    for (const skill of skills) {
      await prisma.activitySkillMap.create({
        data: {
          activityId: activity.id,
          skillId: skill.id,
          progressIncrease: skillProgress,
        },
      });

      // Update user skill progress
      const userSkill = await prisma.userSkill.findUnique({
        where: {
          userId_skillId_month_year: {
            userId,
            skillId: skill.id,
            month,
            year,
          },
        },
      });

      if (userSkill) {
        const newProgress = Math.min(userSkill.progress + skillProgress, 100);
        await prisma.userSkill.update({
          where: { id: userSkill.id },
          data: { progress: newProgress },
        });
      }
    }

    // Update user XP and level
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      const newTotalXp = user.totalXp + xpReward;
      const newLevel = calculateLevelFromXp(newTotalXp);

      await prisma.user.update({
        where: { id: userId },
        data: {
          totalXp: newTotalXp,
          level: newLevel,
        },
      });
    }

    // Update streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const streak = await prisma.streak.findUnique({
      where: {
        userId_type: {
          userId,
          type: 'daily',
        },
      },
    });

    if (streak) {
      if (!streak.lastActivityDate) {
        await prisma.streak.update({
          where: { id: streak.id },
          data: {
            count: 1,
            lastActivityDate: today,
          },
        });
      } else {
        const lastActivityDate = new Date(streak.lastActivityDate);
        lastActivityDate.setHours(0, 0, 0, 0);

        const daysDiff = Math.floor((today.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
          // Same day, no streak update needed
        } else if (daysDiff === 1) {
          // Streak continues
          await prisma.streak.update({
            where: { id: streak.id },
            data: {
              count: streak.count + 1,
              lastActivityDate: today,
            },
          });
        } else {
          // Streak broken, restart
          await prisma.streak.update({
            where: { id: streak.id },
            data: {
              count: 1,
              lastActivityDate: today,
            },
          });
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Activity logged successfully',
        data: activity,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create activity error:', error);
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}
