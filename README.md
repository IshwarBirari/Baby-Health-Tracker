# Baby Tracker (Web App MVP)

Mobile-first baby sleep & feeding tracker with:
- Supabase Auth + Postgres
- One-hand "Start/Stop" sleep tracking + disturbance event
- Feeding tracking (start/stop) with amount on stop
- History pages (sleep + feeds)
- Insights page with date-range filters + chart (Recharts)

## 1) Setup
```bash
npm install
```

Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Run dev server:
```bash
npm run dev
```

## 2) Supabase Database
Paste SQL from `supabase/schema.sql` into Supabase SQL Editor.

## 3) Notes
- This is an MVP starter. The UI is designed for single-handed mobile usage (big buttons, minimal taps).
- Add multi-caregiver sharing later via `caregiver_access` table (suggested in schema comments).
