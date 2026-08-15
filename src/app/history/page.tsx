'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyData {
  month: string;
  year: number;
  skills: { [key: string]: number };
  totalActivities: number;
  totalXpGained: number;
  level: number;
}

export default function History() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    fetchMonthlyHistory();
  }, []);

  const fetchMonthlyHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      const response = await fetch('/api/history', { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setMonthlyData(data.data || []);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading history...</div>;
  }

  const chartData = monthlyData.map((data) => ({
    month: `${data.month} ${data.year}`,
    activities: data.totalActivities,
    xp: data.totalXpGained,
    ...Object.entries(data.skills).reduce((acc, [skill, progress]) => {
      acc[skill] = Math.round(progress);
      return acc;
    }, {} as Record<string, number>),
  }));

  const skillNames = monthlyData.length > 0 ? Object.keys(monthlyData[monthlyData.length - 1].skills) : [];
  const colors = ['#8b5cf6', '#ec4899', '#22c55e', '#06b6d4', '#f59e0b', '#ef4444', '#3b82f6', '#14b8a6', '#f97316', '#a855f7'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <nav className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">📊 Your Growth History</h1>
          <p className="text-purple-200 mb-12">Track your progress over time and see how you&apos;ve evolved</p>

          {monthlyData.length === 0 ? (
            <div className="text-center py-12 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <p className="text-xl text-gray-300">No monthly data yet. Log some activities to build your history!</p>
            </div>
          ) : (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Activity &amp; XP Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="activities" stroke="#a78bfa" strokeWidth={2} dot={{ fill: '#a78bfa' }} name="Activities" />
                    <Line type="monotone" dataKey="xp" stroke="#f472b6" strokeWidth={2} dot={{ fill: '#f472b6' }} name="XP Gained" />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Skills Over Time</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} />
                    <Legend />
                    {skillNames.map((skill, index) => <Bar key={skill} dataKey={skill} fill={colors[index % colors.length]} name={skill} />)}
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold mb-6">Monthly Summaries</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {monthlyData.map((data, index) => (
                    <motion.div key={`${data.month}-${data.year}-${index}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.1 }} className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div><h3 className="text-xl font-bold">{data.month} {data.year}</h3><p className="text-sm text-purple-300">Level {data.level}</p></div>
                        <div className="text-right"><p className="text-2xl font-bold text-purple-400">{data.totalXpGained}</p><p className="text-xs text-gray-400">XP Gained</p></div>
                      </div>
                      <div className="mb-4 pb-4 border-b border-white/10"><p className="text-sm text-gray-300">{data.totalActivities} activities logged</p></div>
                      <div className="space-y-2">
                        {Object.entries(data.skills).sort(([, a], [, b]) => b - a).slice(0, 5).map(([skill, progress]) => (
                          <div key={skill} className="flex justify-between items-center"><p className="text-xs text-gray-300">{skill}</p><p className="text-xs font-bold text-purple-300">{Math.round(progress)}%</p></div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
