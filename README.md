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
