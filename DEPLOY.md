# Deploying GrowMos to Vercel (First Deploy)

## Prerequisites

- A [Vercel account](https://vercel.com) (free tier is fine)
- A [Neon account](https://neon.tech) (free tier is fine) — replaces Docker Postgres
- The project pushed to a GitHub repository

---

## Step 1 — Push to GitHub

If not already done:

```bash
git remote add origin https://github.com/<your-username>/growmos-next.git
git push -u origin main
```

---

## Step 2 — Create a Neon database

1. Go to https://neon.tech → **New Project** → name it `growmos`
2. Choose region closest to your users
3. Copy the **Connection string** — it looks like:
   ```
   postgres://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   Keep this for Step 4.

---

## Step 3 — Set up Vercel Blob (for image uploads)

1. In your Vercel dashboard → **Storage** → **Create Database** → choose **Blob**
2. Name it `growmos-blob`, click **Create**
3. Vercel auto-generates `BLOB_READ_WRITE_TOKEN` — it will be injected automatically
   into your project once you link the store to the project in Step 4.

---

## Step 4 — Import project to Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository** → select `growmos-next`
3. Framework preset will be detected as **Next.js** — leave defaults
4. Open **Environment Variables** and add each one below:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Neon connection string from Step 2 |
| `AUTH_SECRET` | A random 32+ character string (generate with `openssl rand -base64 32`) |
| `ADMIN_PASSWORD` | Your chosen admin password |
| `SMTP_HOST` | `mail.growmos.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `hello@growmos.com` |
| `SMTP_PASS` | Your cPanel email password |
| `CONTACT_TO` | `hello@growmos.com` |
| `IMAP_HOST` | `mail.growmos.com` |
| `IMAP_PORT` | `993` |
| `IMAP_USER` | `hello@growmos.com` |
| `IMAP_PASS` | Your cPanel email password |
| `EMAIL_FROM_NAME` | `GrowMos` |
| `NEXT_PUBLIC_BASE_URL` | `https://your-project.vercel.app` (update after deploy) |

> `BLOB_READ_WRITE_TOKEN` is set automatically if you linked the Blob store.
> If not, copy it from the Blob store dashboard and add it manually.

5. Click **Deploy**

---

## Step 5 — Initialize the database

After the first deploy succeeds, run the DB migration once:

```
https://your-project.vercel.app/api/init
```

Open that URL in the browser — you should get:

```json
{ "success": true, "message": "Database initialized." }
```

This creates all tables (posts, subscribers, contact_submissions, etc.).

---

## Step 6 — Update NEXT_PUBLIC_BASE_URL

1. In Vercel → **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_BASE_URL` to your actual Vercel URL (or custom domain)
3. Redeploy: **Deployments** → ⋯ → **Redeploy**

---

## Step 7 — Add a custom domain (optional)

1. Vercel → **Settings** → **Domains** → add `growmos.com` and `www.growmos.com`
2. In cPanel DNS (or wherever the domain is managed), add the records Vercel shows:
   - `A` record for `growmos.com` → Vercel IP
   - `CNAME` for `www` → `cname.vercel-dns.com`
3. Update `NEXT_PUBLIC_BASE_URL` to `https://growmos.com` and redeploy

---

## Verify the deploy

| Check | URL |
|---|---|
| Home page | `/` |
| Blog | `/blog` |
| Contact form | `/contact` |
| Admin login | `/admin/login` |
| DB health | `/api/init` (safe to re-run; uses `CREATE TABLE IF NOT EXISTS`) |

---

## What's NOT needed on Vercel

- The `Dockerfile` and `docker-compose.yml` are for local dev only — Vercel ignores them.
- No separate server process; everything runs as serverless functions.
