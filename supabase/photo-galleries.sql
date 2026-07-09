-- Real photo galleries for backend Photo Updates and published client portal galleries.
-- Run this after the existing portal dashboard SQL.

create table if not exists public.portal_galleries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.portal_clients(id) on delete cascade,
  dog_id uuid not null references public.portal_dogs(id) on delete cascade,
  title text not null default 'New gallery',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.portal_gallery_items
  add column if not exists gallery_id uuid references public.portal_galleries(id) on delete cascade,
  alter column booking_id drop not null;

create table if not exists public.portal_gallery_activity (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid references public.portal_galleries(id) on delete cascade,
  action text not null,
  body text,
  created_at timestamptz not null default now()
);

create or replace function public.set_portal_gallery_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_portal_gallery_updated_at on public.portal_galleries;
create trigger set_portal_gallery_updated_at
before update on public.portal_galleries
for each row execute function public.set_portal_gallery_updated_at();

alter table public.portal_galleries enable row level security;
alter table public.portal_gallery_activity enable row level security;

grant select on public.portal_galleries, public.portal_gallery_activity to authenticated;
grant all on public.portal_galleries, public.portal_gallery_activity to service_role;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_galleries' and policyname = 'Clients can read published galleries') then
    execute 'create policy "Clients can read published galleries" on public.portal_galleries for select using (status = ''published'' and exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid()))';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_galleries' and policyname = 'Backend admin can read galleries') then
    execute 'create policy "Backend admin can read galleries" on public.portal_galleries for select using ((auth.jwt() ->> ''email'') = ''jeroen@jeroenandpaws.com'')';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_gallery_activity' and policyname = 'Backend admin can read gallery activity') then
    execute 'create policy "Backend admin can read gallery activity" on public.portal_gallery_activity for select using ((auth.jwt() ->> ''email'') = ''jeroen@jeroenandpaws.com'')';
  end if;
end $$;

create or replace view public.portal_gallery
with (security_invoker = true) as
select
  gi.id,
  g.id as gallery_id,
  g.title,
  d.name as dog_name,
  gi.image_url,
  gi.alt_text,
  coalesce(gi.delivered_at, g.published_at) as delivered_at,
  gi.created_at,
  coalesce(b.starts_at, g.published_at, g.created_at) as session_date
from public.portal_gallery_items gi
join public.portal_galleries g on g.id = gi.gallery_id
join public.portal_clients c on c.id = g.client_id
join public.portal_dogs d on d.id = g.dog_id
left join public.portal_bookings b on b.id = gi.booking_id
where g.status = 'published' and c.auth_user_id = auth.uid();

grant select on public.portal_gallery to authenticated;

do $$
begin
  begin alter publication supabase_realtime add table public.portal_galleries; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.portal_gallery_activity; exception when duplicate_object then null; end;
end $$;