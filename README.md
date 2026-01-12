# WellnessApp (MERN) - Demo

Full-stack demo wellness app (MERN) with features for tracking, mindfulness, nutrition, goals and community.

Quick start

1. Copy `.env.example` to `.env` in the `server` folder and fill values.
2. Install and run server and client:

```bash
# from project root (this runs server and client concurrently)
npm install
npm run dev
```

Or run separately:

```bash
cd server
npm install
npm run dev

cd ../client
npm install
npm run dev
```

Seed demo data (server):

```bash
cd server
node seed.js
```

Environment variables: see `.env.example`.
