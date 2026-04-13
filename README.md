# PulseTube — YouTube music streaming app

Full-stack web app for searching and streaming music via **YouTube Data API v3** (metadata) and the **YouTube IFrame Player API** (playback only — no downloading).

UI is inspired by Spotify / YouTube Music: dark theme, sidebar, search, mini and expanded player, playlists, likes, and recently played.

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Frontend | React 18, Vite 5, Tailwind CSS, Framer Motion, React Router |
| Backend | Node.js, Express, JWT auth |
| Database | MongoDB, Mongoose |
| External APIs | YouTube Data API v3, YouTube embedded player |

---

## Prerequisites

- **Node.js** 18 or newer (`node -v`)
- **npm** (comes with Node)
- **MongoDB** — local (`mongod`) or [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Google Cloud** project with **YouTube Data API v3** enabled and an **API key** (Credentials → API key; use “Public data” when creating the key for search/trending)

---

## Quick start

```bash
git clone https://github.com/HANSAJA122/yt-music-streaming-app.git
cd yt-music-streaming-app
npm install
cp .env.example .env
```

Edit **`.env`** (see [Environment variables](#environment-variables)), then:

```bash
npm run dev
```

- **App:** [http://localhost:5173](http://localhost:5173) (Vite default; change in `frontend/vite.config.js` if needed)
- **API health:** `http://localhost:<PORT>/api/health` (default `PORT` from `.env`, often `5000` or `5001`)

---

## Environment variables

Copy `.env.example` to **`.env`** at the **repository root** (recommended). The backend loads root `.env` and `backend/.env` if present.

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | optional | Backend HTTP port (default `5000`). In dev, Vite proxies `/api` → `http://127.0.0.1:$PORT`. |
| `MONGO_URI` | **yes** | MongoDB connection string, e.g. `mongodb://127.0.0.1:27017/pulsetube` or Atlas `mongodb+srv://...` |
| `JWT_SECRET` | **yes** | Secret for signing JWTs (use a long random string in production) |
| `JWT_EXPIRES_IN` | optional | JWT lifetime (default `7d`) |
| `YOUTUBE_API_KEY` | **yes** for search/feeds | Real YouTube Data API v3 key — not a placeholder |
| `FRONTEND_URL` | optional | CORS origin (default `http://localhost:5173`) |
| `VITE_API_URL` | optional in dev | Base URL for API calls in **production** builds; in `npm run dev`, the app uses same-origin `/api` + Vite proxy |

**Security:** Do not commit `.env`. It is listed in `.gitignore`. Never put `YOUTUBE_API_KEY` or `JWT_SECRET` in frontend source.

**YouTube API key:** In Google Cloud Console → APIs & Services → enable **YouTube Data API v3** → Credentials → create an **API key**. Restrict the key (HTTP referrers / IP) for production.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Runs backend + frontend together (workspace) |
| `npm run dev:backend` | API only (`nodemon`) |
| `npm run dev:frontend` | UI only (Vite) |
| `npm run build` | Production build of the frontend |
| `npm start` | Start backend only (after `npm install`; set `NODE_ENV=production` as needed) |

---

## Project layout

```text
.
├── backend/src/          # Express app, routes, Mongoose models, YouTube service
├── frontend/src/         # React UI, contexts, API client
├── .env.example          # Template for secrets (safe to commit)
├── package.json          # npm workspaces (frontend + backend)
└── README.md
```

---

## API overview (authenticated unless noted)

Base path: **`/api`**

| Method | Path | Notes |
|--------|------|--------|
| GET | `/api/health` | Public — liveness check |
| POST | `/api/auth/signup` | Body: `name`, `email`, `password` |
| POST | `/api/auth/login` | Body: `email`, `password` |
| GET | `/api/auth/me` | Bearer JWT |
| GET | `/api/music/search` | Query: `q`, `filter` (`song` \| `artist` \| `album` \| `playlist`) |
| GET | `/api/music/trending` | Bearer JWT |
| GET | `/api/music/recommended` | Query: optional `seed` |
| … | `/api/library/*` | Playlists, likes, recently played — Bearer JWT |

---

## Troubleshooting

| Problem | What to check |
|---------|----------------|
| Backend exits on start | `MONGO_URI` set and MongoDB reachable (`mongosh` / Compass) |
| “Cannot reach API” / endless auth | Run `npm run dev` so **both** servers start; dev uses Vite **proxy** to `PORT` |
| Search / home never loads | Replace placeholder `YOUTUBE_API_KEY` with a real key; restart dev server |
| Atlas `bad auth` | Correct username/password in URI; URL-encode special characters in password (`@` → `%40`); no `<` `>` around password |
| Login stays on `/auth` | Should redirect after success; hard-refresh; clear `localStorage` if token is corrupt |

---

## Git and GitHub

This repo’s default branch is **`main`**.

```bash
git add -A
git commit -m "Your message"
git push -u origin main
```

If **`git push`** asks for credentials over HTTPS, use a [Personal Access Token](https://github.com/settings/tokens) (classic) with `repo` scope as the password, or set up [SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) and use:

`git@github.com:HANSAJA122/yt-music-streaming-app.git`

---

## Production notes

- Serve the frontend build (`frontend/dist`) behind HTTPS; point `VITE_API_URL` at your public API URL when building.
- Harden CORS, add rate limiting, validate inputs, and monitor YouTube API quota.
- Rotate `JWT_SECRET` and database credentials for production.

---

## YouTube / legal

- Playback is **embedding only** via the official YouTube player — **no** downloading or circumventing YouTube.
- Metadata comes from **YouTube Data API v3**; comply with [YouTube API Services Terms of Service](https://developers.google.com/youtube/terms/api-services-terms-of-service).

---

## License

No license file is bundled by default; add one (e.g. MIT) if you plan to open-source the project formally.
