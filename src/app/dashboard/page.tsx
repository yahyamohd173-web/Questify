'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Settings, Zap, BookOpen, TrendingUp, Target, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SkillProgressCard from '@/components/dashboard/SkillProgressCard';
import XPBar from '@/components/dashboard/XPBar';
import StatsCard from '@/components/dashboard/StatsCard';
import { DashboardStats } from '@/types';

const quests = [
  { icon: '📚', title: 'Knowledge Sprint', text: 'Study or learn something for 30 minutes.', xp: 25, color: 'from-blue-500/20 to-cyan-500/10' },
  { icon: '💪', title: 'Move Your Body', text: 'Complete 30 minutes of exercise or walking.', xp: 25, color: 'from-emerald-500/20 to-green-500/10' },
  { icon: '⚔️', title: 'Discipline Check', text: 'Finish one task you have been avoiding.', xp: 25, color: 'from-violet-500/20 to-purple-500/10' },
];

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (!token || !userData) { router.push('/login'); return; }
      setUser(JSON.parse(userData));
      const response = await fetch('/api/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) { router.push('/login'); return; }
      const data = await response.json();
      setStats(data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
      router.push('/login');
    } finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full" /></div>;
  if (!stats || !user) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Unable to load your dashboard.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-x-0 top-0 -z-0 h-96 bg-gradient-to-br from-violet-950/50 via-slate-950 to-fuchsia-950/20" />
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-xl font-black"><span className="rounded-lg bg-violet-600 px-2.5 py-1.5">Q</span>Questify</Link>
          <div className="hidden items-center gap-5 text-sm md:flex"><Link href="/history" className="text-slate-400 hover:text-white">History</Link><Link href="/achievements" className="text-slate-400 hover:text-white">Achievements</Link><Link href="/insights" className="text-slate-400 hover:text-white">AI Insights</Link></div>
          <div className="flex items-center gap-2"><button onClick={() => router.push('/profile')} className="rounded-lg p-2 hover:bg-white/10" aria-label="Profile settings"><Settings className="h-5 w-5" /></button><button onClick={handleLogout} className="rounded-lg p-2 hover:bg-white/10" aria-label="Log out"><LogOut className="h-5 w-5" /></button></div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <section className="mb-8"><p className="text-sm font-semibold text-violet-300">YOUR ADVENTURE</p><h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Welcome back, {user.name}! 👋</h1><p className="mt-2 text-slate-400">Choose a quest, earn XP, and make today count.</p></section>

        <div className="mb-8 grid gap-4 md:grid-cols-4"><StatsCard icon="⭐" title="Level" value={stats.level.toString()} subtitle={`${stats.totalXp} XP`} /><StatsCard icon="🔥" title="Daily Streak" value={stats.dailyStreak.toString()} subtitle={`${stats.monthlyStreak} month streak`} /><StatsCard icon="✅" title="Activities" value={stats.totalActivities.toString()} subtitle={`${stats.todayActivities} today`} /><StatsCard icon="⚡" title="Total XP" value={`${stats.totalXp}`} subtitle="Keep progressing" /></div>

        <div className="mb-8"><XPBar level={stats.level} currentXp={stats.totalXp} /></div>

        <section className="mb-10">
          <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">Daily quests</p><h2 className="mt-1 text-2xl font-black">What will you conquer today?</h2></div><Link href="/activities" className="text-sm font-semibold text-violet-300 hover:text-violet-200">View activity log →</Link></div>
          <div className="grid gap-4 lg:grid-cols-3">
            {quests.map((quest, index) => <motion.article key={quest.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${quest.color} p-5`}><div className="flex items-start justify-between"><span className="text-3xl">{quest.icon}</span><span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-violet-200">+{quest.xp} XP</span></div><h3 className="mt-5 text-lg font-bold">{quest.title}</h3><p className="mt-1 text-sm leading-6 text-slate-400">{quest.text}</p><Link href="/activities" className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm font-semibold hover:bg-white/10">Start quest <ChevronRight className="h-4 w-4" /></Link></motion.article>)}
          </div>
        </section>

        <section className="mb-10 grid gap-4 md:grid-cols-4"><Link href="/activities" className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5 hover:bg-violet-500/15"><BookOpen className="mb-3 h-6 w-6" /><p className="font-bold">Log Activity</p><p className="mt-1 text-xs text-slate-400">Turn real effort into XP.</p></Link><Link href="/history" className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 hover:bg-blue-500/15"><TrendingUp className="mb-3 h-6 w-6" /><p className="font-bold">Growth History</p><p className="mt-1 text-xs text-slate-400">See how you are improving.</p></Link><Link href="/achievements" className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 hover:bg-amber-500/15"><Target className="mb-3 h-6 w-6" /><p className="font-bold">Achievements</p><p className="mt-1 text-xs text-slate-400">Unlock milestones.</p></Link><Link href="/insights" className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 hover:bg-emerald-500/15"><Zap className="mb-3 h-6 w-6" /><p className="font-bold">AI Insights</p><p className="mt-1 text-xs text-slate-400">Understand your progress.</p></Link></section>

        <section><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-fuchsia-300">Skill tree</p><h2 className="mt-1 text-2xl font-black">Your life skills</h2></div><button onClick={() => router.push('/activities')} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold hover:bg-violet-500">+ Log Activity</button></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{stats.skills.map((skill, index) => <motion.div key={skill.id} initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .1 + index * .04 }}><SkillProgressCard skill={skill} /></motion.div>)}</div></section>
      </main>
    </div>
  );
}
