# SkillNetwork — Student Skill Exchange Network

LinkedIn for your college. Students create skill profiles, and AI recommends hackathon teammates, study groups, mentors, internships, and clubs.

## Features

- **3D Skill Network** — Interactive Three.js graph showing connected skills on the hero
- **AI Match Demo** — Type a request like "Need a frontend developer for hackathon" and get instant teammate recommendations
- **Campus Profiles** — Student cards with skills, projects, clubs, and availability
- **Explore Categories** — Hackathons, study groups, mentors, internships, clubs
- **Modern UI** — Glass morphism, gradient accents, smooth animations

## Quick Start

This project now has a real backend (`backend/`, FastAPI) — signup/login and
the users list are no longer faked in `localStorage`. Run both:

```bash
# Terminal 1 — backend
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # then set a real JWT_SECRET, see backend/README.md
uvicorn app.main:app --reload --port 8000

# Terminal 2 — frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The frontend talks to
the backend at `http://localhost:8000/api` (configured via `.env` →
`VITE_API_URL`).

On first run the backend seeds 6 demo accounts — try logging in with
`priya@example.edu` / `demo1234`, or sign up your own.

See `backend/README.md` for API details, deployment notes, and how to switch
from SQLite to Postgres.

## Tech Stack

**Frontend**
- React 19 + TypeScript + Vite
- Three.js / React Three Fiber (3D network visualization)
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)

**Backend**
- FastAPI + SQLAlchemy (SQLite by default)
- JWT auth (`python-jose`) + bcrypt password hashing (`passlib`)

## Project Structure

```
src/
  components/     # UI sections (Hero, AI Match, Profiles, etc.)
  context/        # AuthContext — talks to the backend API
  lib/            # api.ts (backend client), matching.ts, github.ts
  types/          # TypeScript interfaces
backend/
  app/            # FastAPI app: routes, models, auth, seed data
```

## Next Steps

- College email verification on signup
- College-specific subnetworks
- Real-time chat for team formation
- Mobile app
- Move AI matching (`src/lib/matching.ts`) server-side so it can scale beyond
  simple keyword overlap
