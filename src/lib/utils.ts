import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PROGRESS_COLORS, SKILL_PROGRESS_PER_MINUTE, XP_REWARDS, XP_PER_LEVEL } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProgressColor(progress: number): string {
  const colorRange = PROGRESS_COLORS.find((range) => progress >= range.min && progress <= range.max);
  return colorRange?.color || '#ef4444';
}

export function calculateSkillProgress(durationMinutes: number): number {
  return Math.min(durationMinutes * SKILL_PROGRESS_PER_MINUTE, 100);
}

export function calculateXpReward(durationMinutes: number): number {
  if (durationMinutes < 30) return XP_REWARDS.shortSession;
  if (durationMinutes <= 60) return XP_REWARDS.mediumSession;
  return XP_REWARDS.longSession;
}

export function calculateLevelFromXp(totalXp: number): number {
  let level = 1;
  for (let i = 2; i <= 100; i++) {
    const xpRequired = XP_PER_LEVEL[i as keyof typeof XP_PER_LEVEL];
    if (xpRequired && totalXp >= xpRequired) level = i;
    else break;
  }
  return level;
}

export function getXpForNextLevel(currentXp: number): number {
  const currentLevel = calculateLevelFromXp(currentXp);
  const nextLevelXp = XP_PER_LEVEL[(currentLevel + 1) as keyof typeof XP_PER_LEVEL];
  return nextLevelXp ? nextLevelXp - currentXp : 0;
}

export function getXpInCurrentLevel(totalXp: number): number {
  const currentLevel = calculateLevelFromXp(totalXp);
  const currentLevelXp = XP_PER_LEVEL[currentLevel as keyof typeof XP_PER_LEVEL] || 0;
  return totalXp - currentLevelXp;
}

export function getTotalXpForCurrentLevel(totalXp: number): number {
  const currentLevel = calculateLevelFromXp(totalXp);
  const currentLevelXp = XP_PER_LEVEL[currentLevel as keyof typeof XP_PER_LEVEL] || 0;
  const nextLevelXp = XP_PER_LEVEL[(currentLevel + 1) as keyof typeof XP_PER_LEVEL] || currentLevelXp;
  return nextLevelXp - currentLevelXp;
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getCurrentMonthYear(): { month: number; year: number } {
  const now = new Date();
  return { month: now.getMonth() + 1, year: now.getFullYear() };
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isActivityToday(activityDate: Date): boolean {
  return isToday(new Date(activityDate));
}

export function daysDifference(date1: Date, date2: Date): number {
  const diffTime = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
