'use client';

import { motion } from 'framer-motion';
import { SkillWithProgress } from '@/types';

interface SkillProgressCardProps {
  skill: SkillWithProgress;
}

export default function SkillProgressCard({ skill }: SkillProgressCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 hover:border-purple-500/50 transition"
    >
      {/* Icon and Title */}
      <div className="mb-4">
        <p className="text-3xl mb-2">{skill.icon}</p>
        <h4 className="font-bold text-white text-sm">{skill.name}</h4>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(skill.progress, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: skill.color }}
          />
        </div>
      </div>

      {/* Progress Text */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">{skill.description}</span>
        <span
          className="text-sm font-bold"
          style={{ color: skill.color }}
        >
          {Math.round(skill.progress)}%
        </span>
      </div>
    </motion.div>
  );
}
