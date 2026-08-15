'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const features = [
  ['⚔️', 'Daily Quests', 'Turn real-life tasks into quests and build momentum one day at a time.'],
  ['📈', 'Skill Progress', 'See Knowledge, Health, Discipline, Creativity and other skills grow.'],
  ['🔥', 'Streaks', 'Protect your momentum with visible streaks and meaningful milestones.'],
  ['🏆', 'Achievements', 'Unlock badges and celebrate the habits that become part of who you are.'],
  ['✨', 'XP & Levels', 'Earn experience from completed activities and level up your character.'],
  ['🤖', 'AI Insights', 'Understand your patterns and get practical ideas for what to improve next.'],
];

const skills = ['Knowledge', 'Health', 'Communication', 'Discipline', 'Productivity', 'Creativity', 'Financial Growth', 'Emotional Intelligence', 'Relationships', 'Confidence'];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07080d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,.18),transparent_30%),radial-gradient(circle_at_20%_30%,rgba(236,72,153,.10),transparent_28%)]" />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-black"><span className="rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-500 px-2.5 py-1.5">Q</span>Questify</Link>
        <div className="flex items-center gap-2"><Link href="/login" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">Log in</Link><Link href="/signup" className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900">Start Quest</Link></div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-14 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pt-20">
        <div>
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="mb-6 inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3.5 py-2 text-xs font-semibold text-violet-200">⚡ Your life, gamified.</motion.div>
          <motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.05}} className="max-w-4xl text-5xl font-black leading-[.95] tracking-[-.05em] sm:text-7xl lg:text-[6.2rem]">Level up your <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">real life.</span></motion.h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Questify turns everyday growth into an RPG. Complete quests, earn XP, protect your streak, unlock achievements, and watch your real-life skills move forward.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/signup" className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3.5 font-bold shadow-xl shadow-violet-900/30 hover:-translate-y-0.5">Create your character →</Link><Link href="#features" className="rounded-2xl border border-white/10 bg-white/[.04] px-6 py-3.5 font-bold text-slate-200 hover:bg-white/[.08]">See how it works</Link></div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">{[['10','life skills'],['100','levels'],['∞','potential']].map(([v,l])=><div key={l} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><div className="text-2xl font-black">{v}</div><div className="mt-1 text-xs text-slate-400">{l}</div></div>)}</div>
        </div>
        <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} className="relative"><div className="absolute -inset-8 rounded-[3rem] bg-violet-500/10 blur-3xl"/><div className="relative rounded-[2rem] border border-white/10 bg-white/[.05] p-4 shadow-2xl backdrop-blur-xl sm:p-6"><div className="rounded-[1.5rem] border border-white/10 bg-[#0d0f17] p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-300">Character</p><h2 className="mt-1 text-2xl font-black">Your Level-Up Dashboard</h2></div><div className="rounded-xl bg-violet-500/15 px-3 py-2 text-right"><div className="text-xs text-slate-400">LEVEL</div><div className="text-xl font-black text-violet-200">12</div></div></div><div className="mt-6 rounded-2xl border border-white/10 bg-white/[.025] p-4"><div className="flex justify-between text-sm"><span className="font-semibold">Daily XP</span><span className="text-slate-400">720 / 1000</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"/></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{['Discipline','Knowledge','Health','Confidence'].map((s,i)=><div key={s} className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><div className="flex justify-between text-sm"><span className="font-semibold">{s}</span><span className="text-xs text-slate-500">{[74,68,61,55][i]}%</span></div><div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-indigo-300" style={{width:`${[74,68,61,55][i]}%`}}/></div></div>)}</div><div className="mt-5 flex justify-between rounded-2xl border border-amber-300/10 bg-amber-300/5 px-4 py-3"><span className="text-sm font-semibold">🔥 9 day streak</span><span className="text-xs text-amber-200">Keep going</span></div></div></div></div>
      </section>

      <section id="features" className="relative z-10 border-y border-white/10 bg-white/[.018] px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">The system</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Everything you need to make progress feel visible.</h2><p className="mt-4 text-slate-400">Questify is designed to make growth easier to see, easier to measure, and more motivating to continue.</p></div><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map(([icon,title,desc])=><motion.article key={title} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="rounded-3xl border border-white/10 bg-white/[.035] p-7 transition hover:-translate-y-1 hover:bg-white/[.055]"><div className="text-3xl">{icon}</div><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{desc}</p></motion.article>)}</div></div></section>

      <section className="relative z-10 px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-fuchsia-300">Your skill tree</p><h2 className="mt-3 text-4xl font-black sm:text-5xl">10 areas. One character.</h2><p className="mt-4 text-slate-400">Instead of obsessing over a single metric, Questify gives you a wider view of personal growth.</p></div><div className="flex flex-wrap gap-2">{skills.map((skill,i)=><span key={skill} className="rounded-full border border-white/10 bg-white/[.035] px-4 py-2.5 text-sm text-slate-200">{['⚔️','❤️','💬','🛡️','⚡','🎨','💰','🧠','🤝','✨'][i]} {skill}</span>)}</div></div></section>

      <section className="relative z-10 px-5 pb-24 sm:px-8"><div className="mx-auto max-w-5xl rounded-[2rem] border border-violet-300/10 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-transparent p-8 text-center shadow-2xl sm:p-14"><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-200">Start today</p><h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black sm:text-5xl">Your next level is built one quest at a time.</h2><p className="mx-auto mt-4 max-w-2xl text-slate-300">Create your account, choose your first skill to improve, and start earning XP from real progress.</p><Link href="/signup" className="mt-8 inline-flex rounded-2xl bg-white px-7 py-3.5 font-bold text-slate-900">Begin your quest →</Link></div></section>
      <footer className="relative z-10 border-t border-white/10 px-5 py-8 text-center text-xs text-slate-500 sm:px-8">Questify — Life Level Up · Built for consistent progress.</footer>
    </main>
  );
}
