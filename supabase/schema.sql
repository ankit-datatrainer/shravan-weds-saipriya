-- Run this once in the Supabase SQL Editor for your project:
-- https://supabase.com/dashboard/project/kpufckltoixyvyccnbew/sql/new

create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  events text not null,
  guests text not null default '1',
  message text,
  created_at timestamptz not null default now()
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);

-- Row Level Security is enabled with NO policies attached. This means
-- the anon/public key has zero access to this table from the browser.
-- All reads and writes go through the app's own API routes, which use
-- the service role key server-side (service role always bypasses RLS).
alter table public.rsvps enable row level security;
