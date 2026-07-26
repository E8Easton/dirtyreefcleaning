-- Contact / quote submissions (Lincoln & Kearney forms)
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  location text not null check (location in ('lincoln', 'kearney', 'general')),
  name text not null,
  email text,
  phone text,
  message text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Public can insert (anon contact forms); no public read
create policy "Anyone can submit contact form"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

create policy "Service role reads submissions"
  on public.contact_submissions
  for select
  to service_role
  using (true);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
