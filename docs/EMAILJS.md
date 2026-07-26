# EmailJS setup (quote forms → your inbox)

Forms on `/lincoln` and `/kearney` save to **Supabase** and email **lincoln@dirtyreefcleaning.com** via EmailJS.

## 1. Create EmailJS account

1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Email Services** → connect your inbox (Gmail recommended) or SMTP
3. **Email Templates** → create template **Reef Quote** with fields:

| Template variable | Maps from form |
|-------------------|----------------|
| `{{to_email}}` | Your inbox |
| `{{from_name}}` | Customer name |
| `{{reply_to}}` / `{{customer_email}}` | Customer email |
| `{{phone}}` | Phone |
| `{{service}}` | Service type |
| `{{address}}` | Address |
| `{{preferred_date}}` | Preferred date |
| `{{notes}}` | Notes |
| `{{location}}` | `lincoln` or `kearney` |
| `{{subject}}` | Email subject line |

Set **To Email** in the template to `{{to_email}}` or fixed `lincoln@dirtyreefcleaning.com`.

4. Copy **Public Key**, **Service ID**, and **Template ID**.

## 2. Environment variables

Local (`.env`):

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
QUOTE_INBOX_EMAIL=lincoln@dirtyreefcleaning.com
```

Netlify → **Project configuration → Environment variables** (same keys, plus Supabase):

```env
VITE_SUPABASE_URL=https://apydcaakiuajfzhiyfgt.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
QUOTE_INBOX_EMAIL=lincoln@dirtyreefcleaning.com
```

Run `npm run build` locally so `dist/reef-config.js` picks up `.env`.

## 3. Supabase table

In [Supabase SQL Editor](https://supabase.com/dashboard) for project `apydcaakiuajfzhiyfgt`, run `supabase/migrations/20260726220000_contact_submissions.sql`.

## 4. Test

```bash
netlify dev
```

Submit a quote on `/lincoln` — check inbox and Supabase **contact_submissions** table.
