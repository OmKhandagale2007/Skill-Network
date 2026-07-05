# Skill Network — Backend

A small FastAPI backend for the Skill Network frontend: real signup/login with
JWTs, hashed passwords, and a shared users list (SQLite by default, swappable
for Postgres later).

## What it replaces

The frontend used to fake all of this in `localStorage` (see git history of
`src/context/AuthContext.tsx`). This backend gives it a real API:

| Endpoint                | Method | Auth?       | Purpose                              |
|--------------------------|--------|-------------|---------------------------------------|
| `/api/auth/signup`       | POST   | no          | Create account, returns JWT + user   |
| `/api/auth/login`        | POST   | no          | Log in, returns JWT + user           |
| `/api/auth/me`           | GET    | Bearer JWT  | Get the logged-in user                |
| `/api/users`             | GET    | no          | List all users (for matching/profiles)|
| `/api/users/{id}`        | GET    | no          | Get one user                          |
| `/api/users/me`          | PATCH  | Bearer JWT  | Update your own profile               |
| `/api/health`            | GET    | no          | Health check                          |

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # then edit JWT_SECRET to something random
```

Generate a real secret instead of the placeholder:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Paste the output into `.env` as `JWT_SECRET=...`.

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

On first run it creates `skillnetwork.db` (SQLite) in this folder and seeds
6 demo users — same ones the old frontend demo had, including the login tip
`priya@example.edu` / `demo1234`.

Interactive API docs: http://localhost:8000/docs

## Connecting the frontend

The frontend already points at `http://localhost:8000/api` via the `.env`
file at the project root (`VITE_API_URL`). Just run both:

```bash
# terminal 1
cd backend && uvicorn app.main:app --reload --port 8000

# terminal 2 (project root)
npm install
npm run dev
```

If you deploy the backend somewhere else, update `VITE_API_URL` in the
frontend's `.env` to match (e.g. `https://your-api.example.com/api`), and add
that frontend's origin to `CORS_ORIGINS` in the backend's `.env`.

## Notes / next steps

- Swap SQLite for Postgres by changing `DATABASE_URL` in `.env` (SQLAlchemy
  handles the rest — no code changes needed).
- Passwords are hashed with bcrypt (`passlib`), never stored or returned in
  plaintext.
- JWTs expire after 7 days (`JWT_EXPIRE_MINUTES` in `app/config.py`).
- `GET /api/users` is intentionally public (no auth) since the matching
  feature and profile grid need to see everyone — same behavior the old
  localStorage version had. If you want private profiles later, gate this
  behind `get_current_user`.
