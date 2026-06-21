'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, LogOut } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  level: number;
  totalXp: number;
  createdAt: string;
}

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        router.push('/login');
        return;
      }

      const userData = JSON.parse(user);
      setProfile(userData);
      setFormData({
        name: userData.name || '',
        bio: userData.bio || '',
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
        setEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
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

  if (!profile) {
    return <div>Error loading profile</div>;
  }

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
          {/* Profile Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
                <div className="flex items-center gap-2 text-purple-300">
                  <Mail className="w-4 h-4" />
                  <p className="text-sm">{profile.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold text-purple-400">{profile.level}</p>
                <p className="text-sm text-gray-400">Level</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 py-6 border-t border-white/10">
              <div>
                <p className="text-sm text-gray-400">Total XP</p>
                <p className="text-2xl font-bold text-purple-300">{profile.totalXp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Member Since</p>
                <p className="text-sm font-medium">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-sm font-medium">🟢 Active</p>
              </div>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Profile Settings</h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                >
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Bio</p>
                  <p className="text-white">{profile.bio || 'No bio yet'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-4">⚠️ Danger Zone</h2>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
