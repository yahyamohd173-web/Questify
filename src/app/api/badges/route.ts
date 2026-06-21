import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { BADGES } from '@/lib/constants';

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

    // Get user's unlocked badges
    const unlockedBadges = await prisma.badge.findMany({
      where: { userId },
    });

    // Create badge list with unlocked status
    const allBadges = BADGES.map((badge) => {
      const unlockedBadge = unlockedBadges.find((ub) => ub.category === badge.category);
      return {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        category: badge.category,
        unlockedAt: unlockedBadge?.unlockedAt.toISOString() || '',
        unlocked: !!unlockedBadge,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: allBadges,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Badges error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch badges' },
      { status: 500 }
    );
  }
}
