import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { SKILL_CATEGORIES } from '@/lib/constants';
import { getCurrentMonthYear } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Initialize skills for the user
    const { month, year } = getCurrentMonthYear();
    
    // Create all skills first if they don't exist
    for (const skillCategory of SKILL_CATEGORIES) {
      await prisma.skill.upsert({
        where: { name: skillCategory.name },
        update: {},
        create: {
          name: skillCategory.name,
          description: skillCategory.description,
          icon: skillCategory.icon,
          baseMultiplier: skillCategory.baseMultiplier,
        },
      });
    }

    // Get all skills
    const skills = await prisma.skill.findMany();

    // Create user skills with 0 progress
    for (const skill of skills) {
      await prisma.userSkill.create({
        data: {
          userId: user.id,
          skillId: skill.id,
          progress: 0,
          month,
          year,
        },
      });
    }

    // Initialize streaks
    await prisma.streak.create({
      data: {
        userId: user.id,
        type: 'daily',
        count: 0,
      },
    });

    await prisma.streak.create({
      data: {
        userId: user.id,
        type: 'weekly',
        count: 0,
      },
    });

    await prisma.streak.create({
      data: {
        userId: user.id,
        type: 'monthly',
        count: 0,
      },
    });

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      {
        message: 'User created successfully',
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
