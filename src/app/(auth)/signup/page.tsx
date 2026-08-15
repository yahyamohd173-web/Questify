'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (!name || !email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: formData.password }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.error || 'Unable to create your account.');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      setSuccess(true);
      setTimeout(() => router.replace('/dashboard'), 700);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🎮</div>
            <h1 className="text-4xl font-bold text-white mb-2">Questify</h1>
            <p className="text-purple-200">Create your account and start your journey.</p>
          </div>

          {success && <div className="mb-6 p-4 bg-green-500/15 border border-green-500/40 rounded-xl flex items-center gap-3"><CheckCircle className="text-green-400" size={20} /><p className="text-green-200 text-sm">Account created! Opening your dashboard...</p></div>}
          {error && <div className="mb-6 p-4 bg-red-500/15 border border-red-500/40 rounded-xl flex items-start gap-3"><AlertCircle className="text-red-400 mt-0.5 shrink-0" size={20} /><p className="text-red-200 text-sm">{error}</p></div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input type="text" autoComplete="name" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setError(''); }} placeholder="Your name" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input type="email" autoComplete="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setError(''); }} placeholder="you@example.com" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <div className="relative"><input type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={formData.password} onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setError(''); }} placeholder="At least 8 characters" className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white" aria-label="Toggle password visibility">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
              <div className="relative"><input type={showConfirm ? 'text' : 'password'} autoComplete="new-password" value={formData.confirmPassword} onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }); setError(''); }} placeholder="Repeat your password" className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" /><button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white" aria-label="Toggle confirmation visibility">{showConfirm ? <EyeOff size={19} /> : <Eye size={19} />}</button></div>
            </div>
            <button type="submit" disabled={loading || success} className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <Loader2 className="animate-spin" size={18} />}{loading ? 'Creating account...' : success ? 'Account created' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-gray-300 text-sm mt-6">Already have an account? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">Log in</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
