import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Server-only Supabase client using the service role key, which
 * bypasses Row Level Security. Never import this file from a
 * "use client" component — it must only run in API routes / server
 * components, so the service role key is never sent to the browser.
 *
 * Created lazily (not at module load) so `next build` doesn't fail
 * when env vars aren't set yet; it only throws if a route handler
 * actually tries to use it without the env vars configured.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Set them in .env.local (see .env.local.example)."
    );
  }

  client = createClient(url, serviceRoleKey, { auth: { persistSession: false } });
  return client;
}

export interface RsvpRow {
  id: string;
  name: string;
  phone: string;
  events: string;
  guests: string;
  message: string | null;
  created_at: string;
}
