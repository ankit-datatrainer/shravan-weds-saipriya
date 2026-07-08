# Shravan Kumar weds Sai Priya — Wedding Invitation Website

An animated Indian-wedding-themed invitation site built with Next.js 14, Tailwind CSS, Framer Motion and Lucide icons. RSVPs are stored in Supabase (Postgres) and managed from a password-protected `/admin` dashboard.

## Sections
- 3D double-door opening card, background music
- Hero with shloka, couple names, parents, hashtag, photo
- Save the Date with scratch-to-reveal card + live countdown
- Events Schedule (Sangeet, Wedding) with themed falling flowers & flying birds
- Venue with Google Maps directions
- RSVP form → Supabase, with an admin dashboard to view/edit/delete responses

## Run locally
```bash
npm install
cp .env.local.example .env.local   # then fill in the real values, see below
npm run dev
```

## Customize
All wedding details (names, parents, dates, venues, events, hashtag) live in one file: `lib/config.ts`.

## Supabase setup (RSVP storage)

1. Open your project's SQL Editor: `https://supabase.com/dashboard/project/<your-project-ref>/sql/new`
2. Paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql) — creates the `rsvps` table with Row Level Security enabled and no public policies (only your server's service role key can read/write it).
3. Go to Project Settings → API and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role secret key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ keep this secret — never expose it to the browser or commit it to git)
4. Put both in `.env.local` (copy from `.env.local.example`).

The service role key is only ever read server-side, inside `app/api/rsvp/route.ts` and `app/api/rsvp/[id]/route.ts` — it's never sent to the browser.

### Admin dashboard
Visit `/admin` (redirects to `/admin/login` if not authenticated). Default credentials are set in `app/api/auth/route.ts` — change the hardcoded username/password there before going live.

## Deploy on the Hostinger VPS (alongside the existing wealth-app)

This VPS already runs another app (`wealth-app`, in `/var/www/wealth-app`, on port 3001).
This app is kept fully isolated from it: its own directory, its own PM2 process, its own
port (**3002**), and its own Nginx server block keyed to its own subdomain. Neither app's
config file, PM2 process, or port ever needs to be touched to deploy the other.

Target subdomain: `shravan-weds-saipriya.moondropsmanpower.com`

### 1. DNS — add the subdomain record

In Hostinger → **hPanel → Domains → moondropsmanpower.com → DNS / Nameservers**, add:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `shravan-weds-saipriya` | `46.28.44.107` (this VPS's IP — confirm in hPanel → VPS → Overview) | Default / 14400 |

That's the only DNS change needed. Propagation is usually a few minutes, sometimes up to an hour.
Verify with `nslookup shravan-weds-saipriya.moondropsmanpower.com` once added — it should resolve
to the VPS IP before you run Certbot in step 5.

### 2. SSH in and set up the app in its own directory

```bash
ssh root@46.28.44.107
mkdir -p /var/www/shravan-weds-saipriya
cd /var/www/shravan-weds-saipriya
git clone https://github.com/ankit-datatrainer/shravan-weds-saipriya.git .
npm install
```

(Node.js + PM2 are already installed on this VPS since `wealth-app` is running — skip that step.
If starting fresh: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - && sudo apt-get install -y nodejs && sudo npm install -g pm2`.)

### 3. Create `.env.local` on the server

```bash
nano /var/www/shravan-weds-saipriya/.env.local
```
Paste (fill in the real Supabase service role key from `.env.local.example` locally):
```
SUPABASE_URL=https://kpufckltoixyvyccnbew.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your real service role key>
NEXT_PUBLIC_SITE_URL=https://shravan-weds-saipriya.moondropsmanpower.com
```

### 4. Build and start with PM2 on port 3002

```bash
cd /var/www/shravan-weds-saipriya
npm run build
pm2 start ecosystem.config.js
pm2 save
```
Check both apps are running side by side: `pm2 list` should show `wealth-app` and
`shravan-weds-saipriya` as two separate processes. If you haven't run `pm2 startup` yet on
this VPS (so PM2 survives a reboot), run it once and follow the printed instructions —
it covers all PM2 processes on the box, not per-app.

### 5. Add the Nginx server block

```bash
scp deploy/nginx.conf root@46.28.44.107:/etc/nginx/sites-available/shravan-weds-saipriya.conf
# or on the server directly: nano /etc/nginx/sites-available/shravan-weds-saipriya.conf
# and paste the contents of deploy/nginx.conf from this repo

ln -s /etc/nginx/sites-available/shravan-weds-saipriya.conf /etc/nginx/sites-enabled/
nginx -t              # must say "syntax is ok" / "test is successful"
systemctl reload nginx
```
`nginx -t` validates *all* server blocks, including whatever serves `wealth-app` — if it
passes, both are still fine. This new file only matches requests where the Host header is
`shravan-weds-saipriya.moondropsmanpower.com`, so it cannot intercept traffic meant for
`wealth-app`'s domain/port.

At this point `http://shravan-weds-saipriya.moondropsmanpower.com` should load the site
(once DNS has propagated).

### 6. Enable HTTPS

```bash
apt-get install -y certbot python3-certbot-nginx   # skip if already installed for wealth-app
certbot --nginx -d shravan-weds-saipriya.moondropsmanpower.com
```
Certbot edits only the `shravan-weds-saipriya.conf` file it's told about — it won't touch
`wealth-app`'s certificate or config.

### Redeploying after future changes
```bash
cd /var/www/shravan-weds-saipriya
git pull
npm install        # only if dependencies changed
npm run build
pm2 restart shravan-weds-saipriya
```
`pm2 restart` only restarts this named process — `wealth-app` keeps running untouched.
