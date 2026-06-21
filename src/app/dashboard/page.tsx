'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Settings, Flame } from 'lucide-react';
import SkillProgressCard from '@/components/dashboard/SkillProgressCard';
import XPBar from '@/components/dashboard/XPBar';
import StatsCard from '@/components/dashboard/StatsCard';
import { DashboardStats } from '@/types';
import { SKILL_CATEGORIES } from '@/lib/constants';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      setUser(JSON.parse(userData));

      const response = await fetch('/api/dashboard/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      setStats(data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!stats || !user) {
    return <div>Error loading dashboard</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">🎮 Questify</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => router.push('/profile')}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">Welcome back, {user.name}! 👋</h2>
          <p className="text-purple-200">Keep up the momentum and level up today</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatsCard
              icon="⭐"
              title="Level"
              value={stats.level.toString()}
              subtitle={`${stats.totalXp} XP`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatsCard
              icon="🔥"
              title="Daily Streak"
              value={stats.dailyStreak.toString()}
              subtitle={`${stats.monthlyStreak} month streak`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatsCard
              icon="✅"
              title="Activities"
              value={stats.totalActivities.toString()}
              subtitle={`${stats.todayActivities} today`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatsCard
              icon="⚡"
              title="XP Bar"
              value={`${stats.totalXp}`}
              subtitle="Keep grinding"
            />
          </motion.div>
        </div>

        {/* XP Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <XPBar level={stats.level} currentXp={stats.totalXp} />
        </motion.div>

        {/* Skills Grid */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">📊 Life Skills</h3>
            <button
              onClick={() => router.push('/activities')}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition font-medium"
            >
              + Log Activity
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <SkillProgressCard skill={skill} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
