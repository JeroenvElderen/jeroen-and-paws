-- Live website page activity tracker for the backend dashboard.
-- Run after supabase/portal-dashboard.sql.

create table if not exists public.site_page_visits (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  path text not null default '/',
  title text,
  referrer text,
  user_agent text,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (visitor_id, path)
);

create index if not exists site_page_visits_last_seen_at_idx on public.site_page_visits(last_seen_at desc);
create index if not exists site_page_visits_path_idx on public.site_page_visits(path);

create or replace function public.set_site_page_visits_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_page_visits_updated_at on public.site_page_visits;
create trigger site_page_visits_updated_at
before update on public.site_page_visits
for each row execute function public.set_site_page_visits_updated_at();

alter table public.site_page_visits enable row level security;

drop policy if exists "Backend admin can read page visits" on public.site_page_visits;
create policy "Backend admin can read page visits"
on public.site_page_visits
for select
to authenticated
using (auth.jwt() ->> 'email' = 'jeroen@jeroenandpaws.com');