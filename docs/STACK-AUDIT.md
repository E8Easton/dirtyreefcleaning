# Stack audit — Reef Cleaning (Jul 2026)

## Executive summary

| Layer | Status | Notes |
|-------|--------|--------|
| **GitHub** | OK | [E8Easton/dirtyreefcleaning](https://github.com/E8Easton/dirtyreefcleaning) — `master`, full `dist/` + build scripts |
| **Netlify (`.netlify.app`)** | OK | https://dirtyreefcleaning-reef.netlify.app → **HTTP 200**, site loads |
| **Custom domain** | **BROKEN** | https://dirtyreefcleaning.com → **HTTP 404** (DNS still not on Netlify) |
| **Replit** | **Still in DNS path** | Apex resolves to `34.111.179.208` (Google), not Netlify `75.2.60.5` |
| **Supabase** | OK (if SQL ran) | Project `apydcaakiuajfzhiyfgt`, table `contact_submissions` |
| **EmailJS** | **Not on Netlify** | Netlify has **zero env vars**; production needs rebuild after setting keys |
| **Replit in code** | None | Only docs + optional `sync:live` script |

**Why you see errors on “your domain”:** The site **is live on Netlify**, but **Namecheap DNS still points the apex domain at the old host** (Replit/Google), which returns 404. GitHub and Netlify are fine; DNS + Netlify domain setup must be finished.

---

## 1. GitHub (source of truth)

- Repo: `https://github.com/E8Easton/dirtyreefcleaning`
- Branch: `master`
- Build locally: `npm run build` → writes `dist/`, patches forms, SEO, WebP assets
- `dist/reef-config.js` is **gitignored** — generated at build from env (correct)

**Action:** In Netlify → **Build & deploy → Link repository** → `E8Easton/dirtyreefcleaning`, branch `master`, build command `npm run build`, publish `dist`.

---

## 2. Netlify (hosting)

- Site: **dirtyreefcleaning-reef** (`6de3f089-531d-45c6-a6dc-077217851ea8`)
- Admin: https://app.netlify.com/projects/dirtyreefcleaning-reef
- Config: `netlify.toml` — SPA redirects, functions, `npm run build`

**Deploys so far:** Mostly CLI `--no-build` uploads. For long-term: **Git push → auto build** with env vars set in Netlify.

**Known issue:** Netlify **Simple Analytics** extension can break local/CI `netlify deploy` (plugin install). Disable that extension or rely on Git-triggered builds on Netlify’s servers.

---

## 3. Custom domain & DNS (fix this first)

### Current DNS (checked)

| Host | Result |
|------|--------|
| `dirtyreefcleaning.com` | **A → 34.111.179.208** (old stack — 404) |
| `www.dirtyreefcleaning.com` | **No record** (NXDOMAIN) |

### Required at Namecheap (Advanced DNS)

| Type | Host | Value |
|------|------|--------|
| **A** | `@` | `75.2.60.5` |
| **CNAME** | `www` | `dirtyreefcleaning-reef.netlify.app` |

Remove: old **A** to `34.111.179.208`, **Domain Redirect**, conflicting parking records.

### Netlify dashboard

1. **Domain management** → Add `dirtyreefcleaning.com` and `www.dirtyreefcleaning.com`
2. Wait for **DNS verification** + **HTTPS certificate**
3. Optional: primary domain `www`, redirect apex → www

After propagation: `dirtyreefcleaning.com` should return **200** and `Server: Netlify` (like the `.netlify.app` URL).

---

## 4. Supabase (backend)

- URL: `https://apydcaakiuajfzhiyfgt.supabase.co`
- Forms POST to `contact_submissions` (anon insert RLS)
- Migration: `supabase/migrations/20260726220000_contact_submissions.sql`

**Verify:** Table Editor → submit test quote → new row.

No Replit database is used.

---

## 5. Email (EmailJS)

Forms: save Supabase → send email to **lincoln@dirtyreefcleaning.com**.

**Problem:** Netlify project has **no environment variables** in the dashboard. Last deploy’s `reef-config.js` only had keys because it was built **on your PC** with `.env`, not on Netlify.

**Fix — Netlify → Environment variables (Production):**

```
VITE_SUPABASE_URL=https://apydcaakiuajfzhiyfgt.supabase.co
VITE_SUPABASE_ANON_KEY=<your anon key>
VITE_EMAILJS_PUBLIC_KEY=<from EmailJS>
VITE_EMAILJS_SERVICE_ID=<from EmailJS>
VITE_EMAILJS_TEMPLATE_ID=<from EmailJS>
QUOTE_INBOX_EMAIL=lincoln@dirtyreefcleaning.com
EMAILJS_PUBLIC_KEY=<same as VITE_* for server function fallback>
EMAILJS_SERVICE_ID=...
EMAILJS_TEMPLATE_ID=...
```

Then: **Deploys → Trigger deploy → Clear cache and deploy** (must run `npm run build`).

Setup details: [docs/EMAILJS.md](./EMAILJS.md)

---

## 6. Replit — what to disconnect

| Item | Action |
|------|--------|
| Custom domain on Replit | Remove `dirtyreefcleaning.com` |
| Repl deployment | Pause / stop (optional) |
| `npm run sync:live` | **Do not use** — pulls assets from live URL (was Replit); GitHub + `npm run build` is canonical |
| Code references | None in runtime; only migration docs |

---

## 7. Quick verification checklist

```text
[ ] https://dirtyreefcleaning-reef.netlify.app — loads (200)
[ ] https://dirtyreefcleaning.com — loads (200) after DNS fix
[ ] https://dirtyreefcleaning.com/lincoln — loads
[ ] Netlify env vars set → redeploy → view source includes EmailJS in reef-config (or test form)
[ ] Test quote → Supabase row + inbox email
[ ] Replit domain removed
[ ] GitHub linked to Netlify for auto-deploy
```

---

## Architecture (target)

```text
User → Namecheap DNS → Netlify (static dist + functions)
                    → Supabase (quote storage)
                    → EmailJS → lincoln@dirtyreefcleaning.com
Code → GitHub → Netlify build (npm run build)
```

Replit is **not** in this path.
