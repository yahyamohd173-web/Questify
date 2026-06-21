// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  bio?: string;
  level: number;
  totalXp: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  user: User;
  token: string;
}

// Skill Types
export interface Skill {
  id: string;
  name: string;
  description: string;
  icon?: string;
  baseMultiplier: number;
}

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  progress: number; // 0-100
  month: number;
  year: number;
}

export interface SkillWithProgress extends Skill {
  progress: number;
  color: string;
}

// Activity Types
export interface Activity {
  id: string;
  userId: string;
  name: string;
  description?: string;
  durationMinutes: number;
  date: Date;
  xpReward: number;
}

export interface ActivityInput {
  name: string;
  description?: string;
  durationMinutes: number;
  skillIds: string[];
  date?: Date;
}

// Badge/Achievement Types
export interface Badge {
  id: string;
  userId: string;
  name: string;
  description: string;
  icon?: string;
  category: string;
  unlockedAt: Date;
}

// Streak Types
export interface Streak {
  id: string;
  userId: string;
  type: 'daily' | 'weekly' | 'monthly';
  count: number;
  lastActivityDate?: Date;
}

// Monthly Snapshot Types
export interface MonthlySnapshot {
  id: string;
  userId: string;
  month: number;
  year: number;
  skillSnapshots: Record<string, { name: string; progress: number }>;
  totalActivities: number;
  totalXpGained: number;
  level: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalXp: number;
  level: number;
  dailyStreak: number;
  monthlyStreak: number;
  todayActivities: number;
  totalActivities: number;
  skills: SkillWithProgress[];
}

// Chart Data
export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface SkillChartData {
  skillName: string;
  data: ChartDataPoint[];
}
