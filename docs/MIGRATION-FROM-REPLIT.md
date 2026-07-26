# Leave Replit — use Netlify + GitHub + Supabase

Reef Cleaning no longer depends on Replit. This repo is the source of truth.

## 1. Netlify (hosting)

- Site: **dirtyreefcleaning-reef** (or your linked site)
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Environment variables:** Supabase + EmailJS (see `docs/EMAILJS.md`)
- Disable/remove **Simple Analytics** Netlify extension if local/CI builds fail on plugin install

## 2. GitHub

- Repo: **https://github.com/E8Easton/dirtyreefcleaning**
- Link repo in Netlify for deploy-on-push

## 3. Custom domain (disconnect Replit)

1. Netlify → **Domain management** → add `dirtyreefcleaning.com` and `www`
2. At your DNS registrar, point records to Netlify ([Netlify DNS docs](https://docs.netlify.com/domains-https/custom-domains/))
3. In **Replit** (old deployment): remove custom domain `dirtyreefcleaning.com` and stop/pause the Repl or delete deployment
4. Wait for DNS (up to 48h; often minutes). Verify SSL on Netlify

## 4. Google Search Console

- Property: `https://dirtyreefcleaning.com`
- Sitemap: `https://dirtyreefcleaning.com/sitemap.xml`
- Request indexing for `/`, `/lincoln`, `/kearney`

## 5. Google Business Profile

- Name: **Reef Cleaning**
- Phone: **(402) 235-6046**
- Website: **https://dirtyreefcleaning.com**
- Service areas: Lincoln & Kearney, NE

## 6. What we removed from Replit

- Form submissions were **console-only mocks** in the old build — now Supabase + EmailJS
- No Replit API keys or backend in this repo
- Optional: stop using Replit `npm run sync:live` (`download-site.js`) once Netlify is canonical
