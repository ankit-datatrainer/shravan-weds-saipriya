import { NextResponse } from "next/server";

export const runtime = "edge";

interface RsvpPayload {
  name?: string;
  phone?: string;
  attending?: string;
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
  const attending = body.attending === "no" ? "no" : "yes";
  const guests = Math.min(10, Math.max(1, Number(body.guests) || 1));
  const message = body.message?.trim().slice(0, 500) ?? "";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please enter your name" }, { status: 400 });
  }
  if (!phone || !/^[+0-9\s-]{7,15}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  }

  const entry = { name, phone, attending, guests, message, at: new Date().toISOString() };

  // Vercel's filesystem is read-only, so RSVPs are forwarded to a webhook.
  // Set RSVP_WEBHOOK_URL in Vercel env vars to a Google Sheets Apps Script
  // web app, Formspree endpoint, or Discord/Slack webhook to collect entries.
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
      return NextResponse.json({ error: "Could not save RSVP, please try again" }, { status: 502 });
    }
  } else {
    console.log("RSVP received (no webhook configured):", entry);
  }

  return NextResponse.json({ ok: true });
}
