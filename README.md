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

## Deploy on a Hostinger VPS

This app runs as a normal Node.js server (`next start`), so any VPS works. Steps for Hostinger:

1. **SSH into your VPS** and install Node.js 20 LTS + PM2:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

2. **Clone the repo:**
   ```bash
   git clone https://github.com/ankit-datatrainer/shravan-weds-saipriya.git
   cd shravan-weds-saipriya
   npm install
   ```

3. **Create `.env.local`** on the server with your real `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_SITE_URL` (your domain).

4. **Build and start with PM2** (uses the included `ecosystem.config.js`):
   ```bash
   npm run build
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup   # follow the printed instructions to auto-start on reboot
   ```
   The app listens on port 3000.

5. **Point Nginx at it** (Hostinger's panel or a manual Nginx config). Example server block:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable HTTPS** with Certbot:
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

### Redeploying after changes
```bash
git pull
npm install        # only if dependencies changed
npm run build
pm2 restart shravan-weds-saipriya
```
