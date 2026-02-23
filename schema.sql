-- Baby Tracker schema (MVP)
-- Paste into Supabase SQL Editor

create extension if not exists "uuid-ossp";

create table if not exists babies (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Baby',
  dob date,
  created_at timestamptz not null default now()
);

create table if not exists sleep_sessions (
  id uuid primary key default uuid_generate_v4(),
  baby_id uuid not null references babies(id) on delete cascade,
  start_time timestamptz not null,
  end_time timestamptz,
  method text not null default 'live',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists sleep_events (
  id uuid primary key default uuid_generate_v4(),
  sleep_session_id uuid not null references sleep_sessions(id) on delete cascade,
  type text not null,
  event_time timestamptz not null default now(),
  note text
);

create table if not exists feeding_sessions (
  id uuid primary key default uuid_generate_v4(),
  baby_id uuid not null references babies(id) on delete cascade,
  start_time timestamptz not null,
  end_time timestamptz,
  amount numeric,
  unit text default 'ml',
  method text default 'bottle',
  notes text,
  created_at timestamptz not null default now()
);

-- Future: multi-caregiver sharing
-- create table caregiver_access (
--   baby_id uuid references babies(id) on delete cascade,
--   user_id uuid references auth.users(id) on delete cascade,
--   role text not null default 'editor',
--   primary key (baby_id, user_id)
-- );

alter table babies enable row level security;
alter table sleep_sessions enable row level security;
alter table sleep_events enable row level security;
alter table feeding_sessions enable row level security;

create policy "babies_select_own" on babies
for select using (auth.uid() = user_id);

create policy "babies_insert_own" on babies
for insert with check (auth.uid() = user_id);

create policy "babies_update_own" on babies
for update using (auth.uid() = user_id);

create policy "sleep_select_own" on sleep_sessions
for select using (
  exists (
    select 1 from babies b
    where b.id = sleep_sessions.baby_id and b.user_id = auth.uid()
  )
);

create policy "sleep_insert_own" on sleep_sessions
for insert with check (
  exists (
    select 1 from babies b
    where b.id = sleep_sessions.baby_id and b.user_id = auth.uid()
  )
);

create policy "sleep_update_own" on sleep_sessions
for update using (
  exists (
    select 1 from babies b
    where b.id = sleep_sessions.baby_id and b.user_id = auth.uid()
  )
);

create policy "events_select_own" on sleep_events
for select using (
  exists (
    select 1 from sleep_sessions s
    join babies b on b.id = s.baby_id
    where s.id = sleep_events.sleep_session_id and b.user_id = auth.uid()
  )
);

create policy "events_insert_own" on sleep_events
for insert with check (
  exists (
    select 1 from sleep_sessions s
    join babies b on b.id = s.baby_id
    where s.id = sleep_events.sleep_session_id and b.user_id = auth.uid()
  )
);

create policy "feed_select_own" on feeding_sessions
for select using (
  exists (
    select 1 from babies b
    where b.id = feeding_sessions.baby_id and b.user_id = auth.uid()
  )
);

create policy "feed_insert_own" on feeding_sessions
for insert with check (
  exists (
    select 1 from babies b
    where b.id = feeding_sessions.baby_id and b.user_id = auth.uid()
  )
);

create policy "feed_update_own" on feeding_sessions
for update using (
  exists (
    select 1 from babies b
    where b.id = feeding_sessions.baby_id and b.user_id = auth.uid()
  )
);
