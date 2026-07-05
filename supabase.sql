-- Run this in your Supabase SQL Editor to create the RSVPs table

CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    events TEXT NOT NULL,
    guests INTEGER NOT NULL DEFAULT 1,
    message TEXT,
    at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so guests can RSVP without logging in)
CREATE POLICY "Allow public inserts" ON public.rsvps FOR INSERT TO anon WITH CHECK (true);

-- Allow reading all RSVPs (since admin dashboard uses anon key)
-- If you want to secure this further in production, you can restrict this policy to authenticated users
CREATE POLICY "Allow public select" ON public.rsvps FOR SELECT TO anon USING (true);

-- Allow updating and deleting
CREATE POLICY "Allow public update" ON public.rsvps FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow public delete" ON public.rsvps FOR DELETE TO anon USING (true);
