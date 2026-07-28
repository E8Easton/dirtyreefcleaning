# Reef Cleaning — dirtyreefcleaning.com

**Stack:** GitHub → Netlify (hosting) · Supabase (quote storage) · EmailJS (inbox alerts)  
**No Replit.** See [docs/MIGRATION-FROM-REPLIT.md](docs/MIGRATION-FROM-REPLIT.md).

## Local development

```bash
npm install
npm run build          # config, forms patch, SEO HTML
npm run dev            # http://localhost:5173 (forms need netlify dev for email fallback)
npm run dev:netlify    # functions + env (recommended for testing quotes)
```

## Quote forms

Lincoln & Kearney quote forms:

1. Save to Supabase `contact_submissions`
2. Email **lincoln@dirtyreefcleaning.com** via EmailJS

Setup: [docs/EMAILJS.md](docs/EMAILJS.md)

## Deploy (Netlify)

- **Build:** `npm run build`
- **Publish:** `dist`
- Set env vars from `.env.example` in Netlify dashboard
- Link GitHub repo for auto-deploy
- Point **dirtyreefcleaning.com** DNS to Netlify; remove domain from Replit

**Live preview:** https://dirtyreefcleaning-reef.netlify.app  

**Full stack audit:** [docs/STACK-AUDIT.md](docs/STACK-AUDIT.md) — if `dirtyreefcleaning.com` shows 404, fix DNS (A → `75.2.60.5`, CNAME `www` → `dirtyreefcleaning-reef.netlify.app`) and add the domain in Netlify.

## SEO

Per-route titles, JSON-LD, sitemap — see `seo/site-config.js`. After deploy, submit sitemap in Google Search Console.

## Optional: refresh assets from old live URL

```bash
npm run sync:live   # only if you still need to pull images/JS from the previous host
npm run build
```

## Repo layout

| Path | Purpose |
|------|---------|
| `dist/` | Static site served by Netlify |
| `seo/` | SEO generator |
| `scripts/` | Form patch, Supabase/EmailJS config |
| `netlify/functions/` | Email fallback API |
| `supabase/migrations/` | Run in Supabase SQL editor |
