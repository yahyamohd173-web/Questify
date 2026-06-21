// Skill Categories
export const SKILL_CATEGORIES = [
  {
    id: 'knowledge',
    name: 'Knowledge',
    description: 'Learning, studying, and gaining wisdom',
    icon: '📚',
    baseMultiplier: 1.0,
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    description: 'Physical exercise and wellness',
    icon: '💪',
    baseMultiplier: 1.0,
  },
  {
    id: 'communication',
    name: 'Communication Skills',
    description: 'Social interaction and networking',
    icon: '🗣️',
    baseMultiplier: 1.0,
  },
  {
    id: 'discipline',
    name: 'Discipline',
    description: 'Focus and habit building',
    icon: '⚔️',
    baseMultiplier: 1.0,
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Work output and task completion',
    icon: '🚀',
    baseMultiplier: 1.0,
  },
  {
    id: 'creativity',
    name: 'Creativity',
    description: 'Creative expression and innovation',
    icon: '🎨',
    baseMultiplier: 1.0,
  },
  {
    id: 'financial',
    name: 'Financial Growth',
    description: 'Money management and investments',
    icon: '💰',
    baseMultiplier: 1.0,
  },
  {
    id: 'emotional',
    name: 'Emotional Intelligence',
    description: 'Self-awareness and mindfulness',
    icon: '❤️',
    baseMultiplier: 1.0,
  },
  {
    id: 'relationships',
    name: 'Relationships',
    description: 'Social connections and community',
    icon: '👥',
    baseMultiplier: 1.0,
  },
  {
    id: 'confidence',
    name: 'Confidence',
    description: 'Self-belief and courage',
    icon: '✨',
    baseMultiplier: 1.0,
  },
];

// Progress Bar Colors
export const PROGRESS_COLORS = [
  { min: 0, max: 13, color: '#ef4444', name: 'Red' },           // Red
  { min: 14, max: 27, color: '#f97316', name: 'Orange' },       // Orange
  { min: 28, max: 48, color: '#eab308', name: 'Yellow' },       // Yellow
  { min: 49, max: 69, color: '#84cc16', name: 'Lime Green' },   // Lime Green
  { min: 70, max: 100, color: '#22c55e', name: 'Light Green' }, // Light Green
];

// XP and Level
export const XP_PER_LEVEL = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 900,
  6: 1400,
  7: 2000,
  8: 2700,
  9: 3500,
  10: 4400,
};

export const MAX_LEVEL = 100;

// Activity XP Rewards
export const XP_REWARDS = {
  shortSession: 10,      // < 30 mins
  mediumSession: 25,     // 30-60 mins
  longSession: 50,       // > 60 mins
  bonus: 5,              // Daily bonus
};

// Progress Increments (per minute of activity)
export const SKILL_PROGRESS_PER_MINUTE = 0.1; // 60 min = 6% progress

// Badge Definitions
export const BADGES = [
  {
    id: 'study-master',
    name: 'Study Master',
    description: 'Reach 100% Knowledge in a month',
    icon: '🎓',
    category: 'Knowledge',
  },
  {
    id: 'fitness-champion',
    name: 'Fitness Champion',
    description: 'Reach 100% Health & Fitness in a month',
    icon: '🏆',
    category: 'Health',
  },
  {
    id: 'consistency-king',
    name: 'Consistency King',
    description: 'Maintain a 30-day daily streak',
    icon: '👑',
    category: 'Streak',
  },
  {
    id: 'social-expert',
    name: 'Social Expert',
    description: 'Reach 100% Communication Skills in a month',
    icon: '🤝',
    category: 'Communication',
  },
  {
    id: 'productivity-beast',
    name: 'Productivity Beast',
    description: 'Reach 100% Productivity in a month',
    icon: '⚡',
    category: 'Productivity',
  },
  {
    id: 'discipline-warrior',
    name: 'Discipline Warrior',
    description: 'Reach 100% Discipline in a month',
    icon: '⚔️',
    category: 'Discipline',
  },
];

// Months for history
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
