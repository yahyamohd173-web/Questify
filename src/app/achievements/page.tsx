'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Trophy } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlockedAt: string;
  unlocked: boolean;
}

export default function Achievements() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/badges', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      setBadges(data.data);
    } catch (error) {
      console.error('Failed to fetch badges:', error);
    } finally {
      setLoading(false);
    }
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

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const lockedBadges = badges.filter((b) => !b.unlocked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">🏆 Achievements</h1>
          <p className="text-purple-200 mb-12">
            Unlock badges by reaching milestones in your personal growth journey
          </p>

          {/* Unlocked Badges */}
          {unlockedBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold">
                  Unlocked ({unlockedBadges.length})
                </h2>
              </div>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {unlockedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 rounded-lg p-6 text-center hover:border-yellow-400 transition"
                  >
                    <p className="text-5xl mb-3">{badge.icon}</p>
                    <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                    <p className="text-sm text-yellow-200 mb-3">{badge.description}</p>
                    <p className="text-xs text-yellow-300">
                      🔓 Unlocked
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Locked Badges */}
          {lockedBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-6 h-6 text-gray-400" />
                <h2 className="text-2xl font-bold">Locked ({lockedBadges.length})</h2>
              </div>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {lockedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="bg-white/5 border-2 border-white/10 rounded-lg p-6 text-center opacity-50 hover:opacity-75 transition"
                  >
                    <p className="text-5xl mb-3 opacity-50">❓</p>
                    <h3 className="font-bold text-lg mb-2 text-gray-400">???</h3>
                    <p className="text-sm text-gray-500 mb-3">Keep improving to unlock</p>
                    <p className="text-xs text-gray-600">🔒 Locked</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
