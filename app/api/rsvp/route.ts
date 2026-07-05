import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "edge"; // Can use edge runtime with Supabase!

interface RsvpPayload {
  name?: string;
  phone?: string;
  events?: string;
  guests?: string;
  message?: string;
}

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
  const guests = Math.min(10, Math.max(1, Number(body.guests) || 1));
  const message = body.message?.trim().slice(0, 500) ?? "";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please enter your name" }, { status: 400 });
  }
  if (!phone || !/^[+0-9\s-]{7,15}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  }
  if (!events) {
    return NextResponse.json({ error: "Please select at least one event" }, { status: 400 });
  }

  const entry = { 
    id: crypto.randomUUID(),
    name, 
    phone, 
    events, 
    guests, 
    message, 
    at: new Date().toISOString() 
  };

  // Save to Supabase
  try {
    const { error } = await supabase
      .from('rsvps')
      .insert([entry]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }
  } catch (err) {
    console.error("Failed to save RSVP to Supabase", err);
    return NextResponse.json({ error: "Could not save RSVP, please try again" }, { status: 500 });
  }

  // Also keep the webhook logic if configured
  const webhook = process.env.RSVP_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch (err) {
      console.error("RSVP webhook failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
