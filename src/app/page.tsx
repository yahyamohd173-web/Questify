import Link from 'next/link';

const features = [
  ['⚔️', 'Daily Quests', 'Turn everyday tasks into clear quests you can actually finish.'],
  ['📈', 'Skill Progress', 'Track growth across knowledge, health, discipline, creativity and more.'],
  ['🔥', 'Streaks', 'Build consistency and keep your momentum visible.'],
  ['🏆', 'Achievements', 'Celebrate milestones as your character develops.'],
  ['✨', 'XP & Levels', 'Earn XP from completed quests and keep moving forward.'],
  ['🤖', 'AI Insights', 'Get useful reflections about your progress and next steps.'],
];

const skills = ['Knowledge', 'Health', 'Communication', 'Discipline', 'Productivity', 'Creativity', 'Finance', 'Emotional Intelligence', 'Relationships', 'Confidence'];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 -z-0 h-[620px] bg-gradient-to-br from-violet-950/50 via-slate-950 to-fuchsia-950/30" />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="rounded-xl bg-violet-600 px-3 py-2">Q</span>
          Questify
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">Log in</Link>
          <Link href="/signup" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-950 hover:bg-slate-200">Start Quest</Link>
        </div>
      </nav>

      <section className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:pt-24">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-200">Your life, gamified.</div>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">Level up your <span className="text-violet-300">real life.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Questify turns personal growth into an RPG. Complete quests, earn XP, protect your streak and build the skills that matter to you.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-xl bg-violet-600 px-6 py-3.5 font-bold hover:bg-violet-500">Create your character →</Link>
            <Link href="#features" className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-slate-200 hover:bg-white/10">Explore Questify</Link>
          </div>
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            <Stat value="10" label="life skills" />
            <Stat value="XP" label="every quest" />
            <Stat value="∞" label="room to grow" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-violet-950/20 sm:p-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-xs font-semibold uppercase tracking-widest text-violet-300">Character</p><h2 className="mt-1 text-2xl font-extrabold">Level-up dashboard</h2></div>
              <div className="rounded-xl bg-violet-500/10 px-4 py-2 text-center"><p className="text-[10px] text-slate-500">LEVEL</p><p className="text-xl font-black text-violet-300">12</p></div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex justify-between text-sm"><span className="font-semibold">Daily XP</span><span className="text-slate-400">720 / 1000</span></div>
              <div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 w-[72%] rounded-full bg-violet-500" /></div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Progress name="Discipline" value={74} />
              <Progress name="Knowledge" value={68} />
              <Progress name="Health" value={61} />
              <Progress name="Confidence" value={55} />
            </div>
            <div className="mt-4 rounded-2xl border border-amber-400/10 bg-amber-400/5 px-4 py-3 text-sm"><span className="font-semibold">🔥 9 day streak</span><span className="float-right text-amber-200">Keep going</span></div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-white/10 bg-white/[0.02] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">The system</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Make your progress visible.</h2>
          <p className="mt-4 max-w-2xl text-slate-400">Everything is designed around small actions, visible progress and consistency.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([icon, title, description]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05]">
                <div className="text-3xl">{icon}</div>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">Your skill tree</p><h2 className="mt-3 text-4xl font-black sm:text-5xl">One character. Every area of life.</h2><p className="mt-4 text-slate-400">Choose what matters to you and build a balanced progression system around it.</p></div>
          <div className="flex flex-wrap gap-2">{skills.map((skill, index) => <span key={skill} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200">{['⚔️','❤️','💬','🛡️','⚡','🎨','💰','🧠','🤝','✨'][index]} {skill}</span>)}</div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8"><div className="mx-auto max-w-4xl rounded-3xl border border-violet-400/10 bg-violet-500/10 p-8 text-center sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">Start today</p><h2 className="mt-3 text-4xl font-black sm:text-5xl">Your next level starts with one quest.</h2><p className="mx-auto mt-4 max-w-2xl text-slate-300">Create your character and turn your next small action into progress.</p><Link href="/signup" className="mt-7 inline-flex rounded-xl bg-white px-7 py-3.5 font-bold text-slate-950 hover:bg-slate-200">Begin your quest →</Link></div></section>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-slate-500">Questify — Life Level Up</footer>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="text-2xl font-black">{value}</div><div className="mt-1 text-xs text-slate-500">{label}</div></div>;
}

function Progress({ name, value }: { name: string; value: number }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="flex justify-between text-sm"><span className="font-semibold">{name}</span><span className="text-xs text-slate-500">{value}%</span></div><div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full bg-violet-500" style={{ width: `${value}%` }} /></div></div>;
}
