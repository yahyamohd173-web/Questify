'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">🎮 Questify</h1>
        <div className="flex gap-4">
          <Link href="/login" className="px-6 py-2 rounded-lg hover:bg-purple-700 transition">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            Level Up Your Life
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-purple-200 mb-8"
          >
            Track your personal growth like a real-life RPG. Improve your skills, earn badges, and watch yourself evolve every single day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 justify-center mb-12 flex-wrap"
          >
            <Link
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:opacity-90 transition"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 border-2 border-purple-400 rounded-lg font-bold text-lg hover:bg-purple-400 hover:bg-opacity-10 transition"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <p className="text-4xl font-bold text-purple-400">10</p>
              <p className="text-gray-300">Skill Categories</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <p className="text-4xl font-bold text-purple-400">∞</p>
              <p className="text-gray-300">Growth Potential</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <p className="text-4xl font-bold text-purple-400">24/7</p>
              <p className="text-gray-300">Tracking</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '📊', title: 'Real-time Progress', desc: 'Watch your skills improve as you log activities' },
              { icon: '🎮', title: 'Gamification', desc: 'Earn XP, levels, badges, and maintain streaks' },
              { icon: '📈', title: 'Monthly Reports', desc: 'Track your growth trends over time' },
              { icon: '🤖', title: 'AI Insights', desc: 'Get personalized recommendations' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-8 hover:bg-white/20 transition"
              >
                <p className="text-5xl mb-4">{feature.icon}</p>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Life?</h2>
        <Link
          href="/signup"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:opacity-90 transition"
        >
          Start Your Journey Now
        </Link>
      </section>
    </div>
  );
}
