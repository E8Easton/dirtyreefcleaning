# Reef Cleaning (dirtyreefcleaning.com)

Production build mirror of the Reef Cleaning marketing site (Vite + React SPA originally deployed on Replit).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy (Netlify)

- **Build command:** `npm run build` (refreshes assets from live site)
- **Publish directory:** `dist`
- SPA routing is configured in `netlify.toml`.

Connect the GitHub repo in the Netlify dashboard and set the custom domain when ready to cut over from Replit.

1. [Netlify → dirtyreefcleaning-reef](https://app.netlify.com/projects/dirtyreefcleaning-reef) → **Project configuration** → **Build & deploy** → **Link repository** → choose `E8Easton/dirtyreefcleaning`.
2. Build settings (already in repo): command `npm run build`, publish `dist`.
3. When ready to go live on your domain: **Domain management** → add `dirtyreefcleaning.com` → update DNS at your registrar → remove the custom domain from Replit.

**Live preview:** https://dirtyreefcleaning-reef.netlify.app

## SEO

Every `npm run build` regenerates:

- **Per-page titles & meta descriptions** for `/`, `/lincoln`, and `/kearney` (see `seo/site-config.js`)
- **JSON-LD** (`CleaningService`, `WebSite`, `FAQPage`, breadcrumbs, service catalog)
- **`/sitemap.xml`** and **`/robots.txt`**
- **`seo-head.js`** — keeps title/canonical in sync when the SPA changes routes

After deploy, in [Google Search Console](https://search.google.com/search-console):

1. Add property `https://dirtyreefcleaning.com`
2. Submit sitemap: `https://dirtyreefcleaning.com/sitemap.xml`
3. Request indexing for `/`, `/lincoln`, and `/kearney`
4. Match **Google Business Profile** name, phone `(402) 235-6046`, and service areas to the site

Validate structured data: [Rich Results Test](https://search.google.com/test/rich-results)

## Supabase (backend)

Contact form and lead storage will use Supabase. See `supabase/migrations/` and `.env.example`.

After creating a Supabase project:

1. Copy `.env.example` to `.env` and fill in URL + anon key.
2. Run migrations: `supabase db push` (with [Supabase CLI](https://supabase.com/docs/guides/local-development) linked to your project).

## Routes

- `/` — Home
- `/lincoln` — Lincoln location
- `/kearney` — Kearney location

## Note on source code

This repo contains the **compiled** frontend from the live site. Editable React/TypeScript source lives in the original Replit project; export that from Replit to replace `dist/` with a full Vite source tree when you are ready to maintain components directly.
