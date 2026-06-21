'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { SKILL_CATEGORIES } from '@/lib/constants';

export default function Activities() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    durationMinutes: '',
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/activities', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setActivities(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch activities:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.name || !formData.durationMinutes || selectedSkills.length === 0) {
      setError('Please fill in all required fields and select at least one skill');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          durationMinutes: parseInt(formData.durationMinutes),
          skillIds: selectedSkills,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create activity');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setFormData({ name: '', description: '', durationMinutes: '' });
      setSelectedSkills([]);
      fetchActivities();

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    } finally {
      setLoading(false);
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">📝 Log New Activity</h1>
          <p className="text-purple-200 mb-12">Record your progress and watch your skills improve</p>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-300 font-medium">Activity logged successfully! Your skills improved.</p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-300 font-medium">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Activity Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Activity Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Morning Run, Study Session"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add any notes about this activity..."
                  rows={3}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Duration (minutes) *</label>
                <input
                  type="number"
                  name="durationMinutes"
                  value={formData.durationMinutes}
                  onChange={handleChange}
                  placeholder="60"
                  min="1"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              {/* Skills Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-4">Select Skills *</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {SKILL_CATEGORIES.map((category) => (
                    <motion.button
                      key={category.id}
                      type="button"
                      onClick={() => toggleSkill(category.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg border-2 transition flex items-center gap-2 text-left ${
                        selectedSkills.includes(category.name)
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/20 bg-white/10 hover:border-purple-500/50'
                      }`}
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{category.name}</p>
                        <p className="text-xs text-gray-400">{category.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging Activity...' : 'Log Activity'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Recent Activities */}
        {activities.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold mb-6">📋 Recent Activities</h2>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-gray-400">{activity.durationMinutes} minutes • {activity.xpReward} XP</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-purple-400 font-medium">+{activity.xpReward} XP</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
