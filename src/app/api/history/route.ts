import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';

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

    // Get all monthly snapshots
    const snapshots = await prisma.monthlySnapshot.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const formattedData = snapshots.map((snapshot) => ({
      month: `Month ${snapshot.month}`,
      year: snapshot.year,
      skills: snapshot.skillSnapshots,
      totalActivities: snapshot.totalActivities,
      totalXpGained: snapshot.totalXpGained,
      level: snapshot.level,
    }));

    return NextResponse.json(
      {
        success: true,
        data: formattedData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('History error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
