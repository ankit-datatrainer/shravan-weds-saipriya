import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";

interface RsvpPayload {
  name?: string;
  phone?: string;
  events?: string;
  guests?: string;
  message?: string;
}

function isAdmin() {
  return cookies().get("admin_session")?.value === "authenticated";
}

/** Public: guests submit their RSVP. No auth required. */
export async function POST(request: Request) {
  let body: RsvpPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const events = body.events?.trim();
  const guests = body.guests?.trim() || "1";
  const message = body.message?.trim().slice(0, 500) || null;

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please enter your name" }, { status: 400 });
  }
  if (!phone || !/^[+0-9\s-]{7,15}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  }
  if (!events) {
    return NextResponse.json({ error: "Please select at least one event option" }, { status: 400 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server is not configured yet" }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .insert({ name, phone, events, guests, message })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert failed:", error.message);
    return NextResponse.json({ error: "Could not save RSVP, please try again" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, entry: data });
}

/** Admin only: list all RSVPs for the dashboard. */
export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server is not configured yet" }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase select failed:", error.message);
    return NextResponse.json({ error: "Could not load RSVPs" }, { status: 502 });
  }

  return NextResponse.json({ rsvps: data });
}
