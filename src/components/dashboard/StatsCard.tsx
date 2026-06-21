'use client';

import { motion } from 'framer-motion';

interface StatsCardProps {
  icon: string;
  title: string;
  value: string;
  subtitle: string;
}

export default function StatsCard({ icon, title, value, subtitle }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 hover:border-purple-500/50 transition"
    >
      <p className="text-4xl mb-3">{icon}</p>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </motion.div>
  );
}
