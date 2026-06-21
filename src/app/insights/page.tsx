'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface Insight {
  type: 'positive' | 'neutral' | 'suggestion';
  message: string;
  icon: string;
}

export default function Insights() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/insights', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      setInsights(data.data.insights);
      setStats(data.data.stats);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
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

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'from-green-500/20 to-emerald-500/20';
      case 'suggestion':
        return 'from-yellow-500/20 to-orange-500/20';
      default:
        return 'from-blue-500/20 to-cyan-500/20';
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'border-green-500/50';
      case 'suggestion':
        return 'border-yellow-500/50';
      default:
        return 'border-blue-500/50';
    }
  };

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
      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-12">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-4xl font-bold">AI Insights</h1>
              <p className="text-purple-200">Personalized analysis of your growth</p>
            </div>
          </div>

          {/* Statistics Overview */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-4 gap-4 mb-12"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4">
                <p className="text-sm text-gray-400">This Month</p>
                <p className="text-3xl font-bold text-purple-400">{stats.thisMonthXp}</p>
                <p className="text-xs text-gray-500">XP earned</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4">
                <p className="text-sm text-gray-400">Best Skill</p>
                <p className="text-2xl font-bold">{stats.bestSkill.name}</p>
                <p className="text-xs text-purple-300">{Math.round(stats.bestSkill.progress)}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4">
                <p className="text-sm text-gray-400">Needs Work</p>
                <p className="text-2xl font-bold">{stats.lowestSkill.name}</p>
                <p className="text-xs text-orange-300">{Math.round(stats.lowestSkill.progress)}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4">
                <p className="text-sm text-gray-400">Activities</p>
                <p className="text-3xl font-bold text-green-400">{stats.thisMonthActivities}</p>
                <p className="text-xs text-gray-500">this month</p>
              </div>
            </motion.div>
          )}

          {/* Insights Cards */}
          <div className="space-y-4">
            {insights.length > 0 ? (
              insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.1 }}
                  className={`bg-gradient-to-r ${getInsightColor(
                    insight.type
                  )} border-2 ${getBorderColor(insight.type)} rounded-lg p-6 backdrop-blur-md`}
                >
                  <div className="flex items-start gap-4">
                    <p className="text-4xl mt-1">{insight.icon}</p>
                    <p className="text-lg leading-relaxed">{insight.message}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 text-center"
              >
                <p className="text-xl text-gray-300">Keep logging activities to get personalized insights!</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
