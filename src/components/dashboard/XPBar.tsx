'use client';

import { motion } from 'framer-motion';
import { getXpInCurrentLevel, getTotalXpForCurrentLevel } from '@/lib/utils';

interface XPBarProps {
  level: number;
  currentXp: number;
}

export default function XPBar({ level, currentXp }: XPBarProps) {
  const xpInLevel = getXpInCurrentLevel(currentXp);
  const totalXpForLevel = getTotalXpForCurrentLevel(currentXp);
  const progressPercent = totalXpForLevel > 0 ? (xpInLevel / totalXpForLevel) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-400">Level Progress</p>
          <p className="text-3xl font-bold">Level {level}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-purple-400">{currentXp} XP</p>
          <p className="text-sm text-gray-400">{xpInLevel} / {totalXpForLevel} to next level</p>
        </div>
      </div>

      <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden border border-white/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        />
      </div>

      <p className="text-xs text-gray-400 mt-2">{Math.round(Math.min(100, Math.max(0, progressPercent)))}% to level {level + 1}</p>
    </motion.div>
  );
}
