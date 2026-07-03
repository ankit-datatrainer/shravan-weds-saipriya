# Swapnil weds Ritu — Wedding Invitation Website

An elegant Indian-wedding-themed invitation site built with Next.js 14, Tailwind CSS, Framer Motion and Lucide icons.

## Sections
- Animated hero with shloka, couple names, parents, hashtag, floral corners and swinging temple bells
- Save the Date with live countdown to the shubh muhurat
- Events Schedule (Haldi, Mehendi & Sangeet, Wedding, Reception) — each with its own color theme
- Venue with Google Maps directions
- RSVP form with a serverless backend (`/api/rsvp`)

## Run locally
```bash
npm install
npm run dev
```

## Customize
All wedding details (names, parents, dates, venues, events, hashtag) live in one file: `lib/config.ts`.

## Collecting RSVPs
Vercel's filesystem is read-only, so the API route forwards RSVPs to a webhook.
Set the env var `RSVP_WEBHOOK_URL` (Vercel → Project → Settings → Environment Variables) to any of:
- A Google Apps Script web app that appends rows to a Google Sheet (free, recommended)
- A Formspree endpoint
- A Discord or Slack incoming webhook

Without the env var, RSVPs are logged in Vercel function logs.

## Deploy free on Vercel via GitHub
1. Push this folder to a GitHub repo.
2. On vercel.com → Add New Project → import the repo → Deploy (defaults work).
3. Add `RSVP_WEBHOOK_URL` env var if you want RSVPs collected.
