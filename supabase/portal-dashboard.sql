-- Supabase schema for the Jeroen & Paws realtime customer portal dashboard.
-- Run this in the Supabase SQL editor, then enable Realtime for these tables in Database > Replication.

create extension if not exists pgcrypto;

create table if not exists public.portal_clients (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.portal_dogs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.portal_clients(id) on delete cascade,
  name text not null,
  profile_photo_url text,
  hero_photo_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.portal_bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.portal_clients(id) on delete cascade,
  dog_id uuid not null references public.portal_dogs(id) on delete cascade,
  service_name text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  location text,
  status text not null default 'confirmed',
  cover_image_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portal_bookings_valid_time check (ends_at > starts_at)
);

create table if not exists public.portal_session_updates (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.portal_bookings(id) on delete cascade,
  client_id uuid not null references public.portal_clients(id) on delete cascade,
  dog_id uuid not null references public.portal_dogs(id) on delete cascade,
  title text not null,
  body text,
  image_url text,
  status text not null default 'shared',
  shared_at timestamptz not null default now()
);

create table if not exists public.portal_gallery_items (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.portal_bookings(id) on delete cascade,
  client_id uuid not null references public.portal_clients(id) on delete cascade,
  dog_id uuid not null references public.portal_dogs(id) on delete cascade,
  image_url text not null,
  alt_text text,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists portal_bookings_set_updated_at on public.portal_bookings;
create trigger portal_bookings_set_updated_at
before update on public.portal_bookings
for each row execute function public.set_updated_at();

alter table public.portal_clients enable row level security;
alter table public.portal_dogs enable row level security;
alter table public.portal_bookings enable row level security;
alter table public.portal_session_updates enable row level security;
alter table public.portal_gallery_items enable row level security;

create policy "Clients can read their own portal profile" on public.portal_clients
  for select using (auth.uid() = auth_user_id);

create policy "Clients can read their dogs" on public.portal_dogs
  for select using (
    exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid())
  );

create policy "Clients can read their bookings" on public.portal_bookings
  for select using (
    exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid())
  );

create policy "Clients can read their updates" on public.portal_session_updates
  for select using (
    exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid())
  );

create policy "Clients can read their gallery" on public.portal_gallery_items
  for select using (
    exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid())
  );

create or replace view public.portal_dashboard as
select
  c.id as client_id,
  c.full_name as client_name,
  d.id as dog_id,
  d.name as dog_name,
  coalesce(d.profile_photo_url, 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80') as dog_photo_url,
  coalesce(d.hero_photo_url, d.profile_photo_url, 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80') as hero_photo_url,
  b.id as upcoming_booking_id,
  b.service_name,
  b.starts_at,
  b.ends_at,
  b.location,
  b.status as booking_status,
  coalesce(b.cover_image_url, d.profile_photo_url, 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80') as booking_image_url,
  u.title as latest_update_title,
  u.body as latest_update_body,
  coalesce(u.image_url, b.cover_image_url, d.profile_photo_url, 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80') as latest_update_image_url,
  u.shared_at as latest_update_shared_at
from public.portal_clients c
join public.portal_dogs d on d.client_id = c.id
left join lateral (
  select * from public.portal_bookings b
  where b.client_id = c.id and b.dog_id = d.id and b.starts_at >= now()
  order by b.starts_at asc
  limit 1
) b on true
left join lateral (
  select * from public.portal_session_updates u
  where u.client_id = c.id and u.dog_id = d.id
  order by u.shared_at desc
  limit 1
) u on true;