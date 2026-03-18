# OJT DTR System

> On-the-Job Training Daily Time Record — a Progressive Web App for tracking OJT hours with real-time cloud sync across devices.

---

## Features

- **Multi-trainee support** — manage multiple OJT trainees from a single app
- **Three views** — List, Weekly breakdown, and Calendar with color-coded status cells
- **Journal entries** — write daily notes per day directly from the calendar
- **Status tagging** — Full Day, Partial, Short, Absent, Holiday, No Work (auto-detects weekends)
- **Estimated finish date** — calculated using actual worked days only, skipping weekends and absent days
- **Cloud sync** — real-time sync across devices via Supabase (PostgreSQL)
- **Offline-first** — works without internet; changes queue and flush automatically on reconnect
- **Export** — CSV (Excel-compatible) and print-ready PDF matching the OJT logsheet format
- **PWA installable** — install to home screen on Android, iOS, or desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML / CSS / JavaScript |
| Local storage | IndexedDB (`ojt_dtr_v4`) |
| Cloud database | Supabase (PostgreSQL) |
| Hosting | GitHub Pages |
| Offline support | Service Worker + Cache API |

---

## Repository Structure

```
ojt-dtr/
├── index.html          # Main app — all UI, logic, and sync in one file
├── sw.js               # Service worker — offline caching and PWA support
├── manifest.json       # PWA manifest — name, icons, display mode
├── icon-192.png        # App icon (192×192)
├── icon-512.png        # App icon (512×512)
└── RELEASE_NOTES.md    # Version history and changelog
```

---

## Supabase Setup

**1. Create a project** at [supabase.com](https://supabase.com)

**2. Run this SQL** in the Supabase SQL Editor:

```sql
create table ojt_trainees (
  id text not null constraint ojt_trainees_pkey primary key,
  name text, company text, required numeric, color text,
  updated_at timestamptz default now()
);
create table ojt_entries (
  id text not null constraint ojt_entries_pkey primary key,
  trainee_id text references ojt_trainees(id) on delete cascade,
  date text, time_in text, time_out text, break_min integer, hours numeric,
  updated_at timestamptz default now()
);
create table ojt_journals (
  key text not null constraint ojt_journals_pkey primary key,
  trainee_id text references ojt_trainees(id) on delete cascade,
  date text, text text, updated_at timestamptz default now()
);
create table ojt_statuses (
  key text not null constraint ojt_statuses_pkey primary key,
  trainee_id text references ojt_trainees(id) on delete cascade,
  date text, status text, updated_at timestamptz default now()
);

alter table ojt_trainees enable row level security;
alter table ojt_entries  enable row level security;
alter table ojt_journals enable row level security;
alter table ojt_statuses enable row level security;

create policy "allow all" on ojt_trainees for all using (true) with check (true);
create policy "allow all" on ojt_entries  for all using (true) with check (true);
create policy "allow all" on ojt_journals for all using (true) with check (true);
create policy "allow all" on ojt_statuses for all using (true) with check (true);
```

**3. Get your credentials** — Project Settings → API → copy Project URL and anon public key

**4. Paste into `index.html`** — find these two lines near the top of the `<script>` tag and replace with your values:

```javascript
const SB_URL_DEFAULT = 'https://xxxx.supabase.co';
const SB_KEY_DEFAULT = 'eyJhbGci...';
```

---

## Deployment

**1. Fork or clone this repo**

**2. Add your Supabase credentials** to `index.html` as shown above

**3. Enable GitHub Pages** — Settings → Pages → Source: `main` branch → `/ (root)`

**4. Access your app** at `https://yourusername.github.io/ojt-dtr/`

---

## Updating the App

After pushing changes to `index.html`, bump the cache version in `sw.js` to force all devices to fetch the new files:

```javascript
const CACHE = 'ojt-dtr-v3'; // increment on every deployment
```

---

## Data Storage

All data is stored in **Supabase** as the source of truth. IndexedDB serves as a local cache for offline use. Data is **not** scoped per user — all devices sharing the same Supabase credentials share the same data pool.

---

## License

For personal and academic use. Not for Commercial Use.

---

## Changelog

See [RELEASE_NOTES.md](./RELEASE_NOTES.md)
