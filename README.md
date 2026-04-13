# PulseTube - YouTube Music Streaming App

Modern full-stack music streaming experience inspired by Spotify and YouTube Music.

## Stack
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- APIs: YouTube Data API v3 + YouTube IFrame Player API

## Features
- Authentication: signup, login, logout using JWT
- Search songs/artists/albums/playlists via YouTube Data API
- Trending and recommended music feeds
- YouTube streaming player (mini + full)
- Player controls: play/pause, next/prev, volume, shuffle, repeat
- Personal playlists (create/list/view/add/remove tracks)
- Liked songs and recently played history
- Dark premium responsive UI
- Secure secret handling through backend env variables only

## Project Structure

```txt
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── .env.example
└── package.json
```

## Setup Instructions

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Create env file** (place it at the **project root** next to `.env.example`, or in `backend/.env` — both work)
   ```bash
   cp .env.example .env
   ```

3. **Fill `.env` values** (required for `npm run dev`; without `MONGO_URI` the API will exit on startup)
   - `PORT`: backend port (default `5000`). If you change it, set `VITE_API_URL` to the same host/port (e.g. `http://localhost:5001/api`).
   - `MONGO_URI`: local/remote MongoDB connection string (e.g. `mongodb://127.0.0.1:27017/pulsetube` or MongoDB Atlas)
   - `JWT_SECRET`: strong random string
   - `YOUTUBE_API_KEY`: YouTube Data API v3 key
   - `PORT`: must match the backend port; in **development**, the Vite dev server proxies `/api` to `http://127.0.0.1:$PORT`, so signup/search work even if `VITE_API_URL` is unset.
   - `VITE_API_URL`: required for **production builds** / `vite preview` when the API is on another origin; optional during `npm run dev` after the proxy change.

4. **Enable APIs in Google Cloud**
   - Enable **YouTube Data API v3**
   - Configure API key restrictions (HTTP referrer/IP)

## Local Run Guide

### Run backend + frontend together
```bash
npm run dev
```

### Or run separately
```bash
npm run dev:backend
npm run dev:frontend
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Production Notes
- Never expose `YOUTUBE_API_KEY` in frontend code.
- This app streams only through YouTube Player API (no downloading).
- Add HTTPS, rate limiting, refresh tokens, and stricter request validation before deployment.
- Consider Redis caching for trending/search endpoints to reduce API quota usage.

## YouTube Policy Compliance
- Streaming only via YouTube embedded player.
- No media extraction or download logic.
- Content metadata fetched using official YouTube Data API v3.
