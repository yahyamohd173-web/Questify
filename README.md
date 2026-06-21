# Questify - Life Level Up

A modern full-stack web application that tracks personal growth and self-improvement through daily activities using RPG-style gamification.

## 🎮 Project Overview

Questify is your personal RPG character progression dashboard. Log daily activities, improve 10 different life skills, earn badges, maintain streaks, and watch yourself level up in real-life.

### Core Features

- **10 Skill Categories**: Knowledge, Health, Communication, Discipline, Productivity, Creativity, Financial Growth, Emotional Intelligence, Relationships, Confidence
- **Daily Activity Logging**: Automatically calculate progress based on activity duration
- **XP & Level System**: Traditional RPG progression with 100 levels
- **Gamification**: Badges, achievements, and streak tracking
- **Monthly Reset**: Progress bars reset monthly with permanent historical snapshots
- **AI Insights**: Personalized analysis of your growth patterns
- **Beautiful Dashboard**: Modern, responsive UI with dark/light mode

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js with Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Charts**: Recharts
- **Styling**: Tailwind CSS with glassmorphism effects

## 📋 Project Structure

```
questify/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/             # Authentication pages
│   │   ├── dashboard/          # Main dashboard
│   │   ├── activities/         # Activity logging
│   │   ├── history/            # Monthly history
│   │   ├── profile/            # User profile
│   │   ├── api/                # API routes
│   │   │   ├── auth/
│   │   │   ├── activities/
│   │   │   ├── skills/
│   │   │   └── insights/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/             # Reusable components
│   │   ├── dashboard/
│   │   ├── shared/
│   │   └── ui/
│   ├── lib/                    # Utilities and helpers
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── calculations.ts
│   └── types/                  # TypeScript types
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                     # Static assets
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yahyamohd173-web/Questify.git
   cd Questify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database URL and JWT secret
   ```

4. **Setup database**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

## 📚 API Routes (To Be Implemented)

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh token

### Activities
- `POST /api/activities` - Create activity
- `GET /api/activities` - Get user activities
- `GET /api/activities/today` - Get today's activities
- `DELETE /api/activities/:id` - Delete activity

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill progress

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/stats` - Get dashboard stats

### History
- `GET /api/history` - Get monthly snapshots
- `GET /api/history/:month/:year` - Get specific month data

### Insights
- `GET /api/insights` - Get AI insights

## 🎯 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup with Next.js and Tailwind CSS
- [x] Database schema with Prisma
- [x] TypeScript types
- [ ] Authentication system

### Phase 2: Core Features
- [ ] User dashboard
- [ ] Activity logging
- [ ] Skill calculation
- [ ] XP and level system

### Phase 3: Advanced Features
- [ ] Streak tracking
- [ ] Badges and achievements
- [ ] Monthly history and charts
- [ ] AI insights

### Phase 4: Polish
- [ ] Dark/Light mode
- [ ] Mobile optimization
- [ ] Performance improvements
- [ ] Deployment

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and structure.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🌟 Acknowledgments

Inspired by:
- Habitica (gamification)
- Duolingo (UI/UX)
- RPG progression systems

---

**Happy Leveling Up! 🚀**
