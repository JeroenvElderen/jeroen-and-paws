-- Jeroen & Paws Supabase schema for portal bookings, calendar feeds, and Outlook sync.
-- This file is safe to run in the Supabase SQL editor on a fresh project or over the previous portal schema.
-- It intentionally defines each object once, then uses CREATE OR REPLACE for views to avoid duplicate definitions.

create extension if not exists pgcrypto;

create table if not exists public.portal_clients (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  email text not null unique,
  calendar_feed_token text unique default encode(gen_random_bytes(24), 'hex'),
  created_at timestamptz not null default now()
);

alter table public.portal_clients
  add column if not exists calendar_feed_token text unique default encode(gen_random_bytes(24), 'hex');

update public.portal_clients
set calendar_feed_token = encode(gen_random_bytes(24), 'hex')
where calendar_feed_token is null;

alter table public.portal_clients
  alter column calendar_feed_token set default encode(gen_random_bytes(24), 'hex');

create or replace function public.sync_auth_user_to_portal_client()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.portal_clients (auth_user_id, full_name, email)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), new.email, 'Portal client'),
    new.email
  )
  on conflict (email) do update
  set
    auth_user_id = excluded.auth_user_id,
    full_name = case
      when public.portal_clients.full_name is null or public.portal_clients.full_name = '' then excluded.full_name
      else public.portal_clients.full_name
    end
  where public.portal_clients.auth_user_id is null
    or public.portal_clients.auth_user_id = excluded.auth_user_id;

  return new;
end;
$$;

drop trigger if exists sync_auth_user_to_portal_client on auth.users;
create trigger sync_auth_user_to_portal_client
after insert on auth.users
for each row execute function public.sync_auth_user_to_portal_client();

insert into public.portal_clients (auth_user_id, full_name, email)
select
  u.id,
  coalesce(nullif(u.raw_user_meta_data ->> 'full_name', ''), u.email, 'Portal client'),
  u.email
from auth.users u
where u.email is not null
on conflict (email) do update
set
  auth_user_id = excluded.auth_user_id,
  full_name = case
    when public.portal_clients.full_name is null or public.portal_clients.full_name = '' then excluded.full_name
    else public.portal_clients.full_name
  end
where public.portal_clients.auth_user_id is null
  or public.portal_clients.auth_user_id = excluded.auth_user_id;

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
  timezone text not null default 'Europe/Dublin',
  location text,
  status text not null default 'confirmed',
  source text not null default 'website',
  sync_status text not null default 'not_synced',
  sync_error text,
  outlook_event_id text unique,
  outlook_calendar_id text,
  outlook_ical_uid text,
  outlook_change_key text,
  outlook_web_link text,
  outlook_last_synced_at timestamptz,
  needs_review boolean not null default false,
  cancelled_at timestamptz,
  cover_image_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portal_bookings_valid_time check (ends_at > starts_at)
);

alter table public.portal_bookings
  add column if not exists timezone text not null default 'Europe/Dublin',
  add column if not exists source text not null default 'website',
  add column if not exists sync_status text not null default 'not_synced',
  add column if not exists sync_error text,
  add column if not exists outlook_event_id text unique,
  add column if not exists outlook_calendar_id text,
  add column if not exists outlook_ical_uid text,
  add column if not exists outlook_change_key text,
  add column if not exists outlook_web_link text,
  add column if not exists outlook_last_synced_at timestamptz,
  add column if not exists needs_review boolean not null default false,
  add column if not exists cancelled_at timestamptz;

alter table public.portal_bookings
  drop constraint if exists portal_bookings_status_check,
  add constraint portal_bookings_status_check check (status in ('requested', 'pending_confirmation', 'confirmed', 'reschedule_requested', 'cancelled', 'completed', 'no_show', 'needs_review', 'busy'));

alter table public.portal_bookings
  drop constraint if exists portal_bookings_source_check,
  add constraint portal_bookings_source_check check (source in ('website', 'outlook', 'admin_import', 'calendar_feed'));

alter table public.portal_bookings
  drop constraint if exists portal_bookings_sync_status_check,
  add constraint portal_bookings_sync_status_check check (sync_status in ('not_synced', 'pending', 'synced', 'failed', 'conflict', 'needs_review'));

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

create table if not exists public.portal_outlook_imports (
  id uuid primary key default gen_random_uuid(),
  outlook_event_id text not null unique,
  outlook_ical_uid text,
  outlook_change_key text,
  outlook_web_link text,
  subject text not null,
  service_name text not null default 'Outlook booking',
  client_name text not null default 'Client to confirm',
  dog_name text not null default 'Dog to confirm',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  timezone text not null default 'Europe/Dublin',
  location text,
  notes text,
  sensitivity text,
  status text not null default 'needs_review',
  needs_review boolean not null default true,
  linked_booking_id uuid references public.portal_bookings(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portal_outlook_imports_valid_time check (ends_at > starts_at)
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

drop trigger if exists portal_outlook_imports_set_updated_at on public.portal_outlook_imports;
create trigger portal_outlook_imports_set_updated_at
before update on public.portal_outlook_imports
for each row execute function public.set_updated_at();

create index if not exists portal_dogs_client_id_idx on public.portal_dogs(client_id);
create index if not exists portal_bookings_starts_at_idx on public.portal_bookings(starts_at);
create index if not exists portal_bookings_outlook_event_id_idx on public.portal_bookings(outlook_event_id);
create index if not exists portal_bookings_client_starts_at_idx on public.portal_bookings(client_id, starts_at);
create index if not exists portal_outlook_imports_starts_at_idx on public.portal_outlook_imports(starts_at);
create index if not exists portal_outlook_imports_linked_booking_id_idx on public.portal_outlook_imports(linked_booking_id);

alter table public.portal_clients enable row level security;
alter table public.portal_dogs enable row level security;
alter table public.portal_bookings enable row level security;
alter table public.portal_session_updates enable row level security;
alter table public.portal_gallery_items enable row level security;
alter table public.portal_outlook_imports enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_clients' and policyname = 'Clients can read their own portal profile') then
    execute 'create policy "Clients can read their own portal profile" on public.portal_clients for select using (auth.uid() = auth_user_id)';
  end if;

if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_dogs' and policyname = 'Clients can read their dogs') then
    execute 'create policy "Clients can read their dogs" on public.portal_dogs for select using (exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid()))';
  end if;

if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_bookings' and policyname = 'Clients can read their bookings') then
    execute 'create policy "Clients can read their bookings" on public.portal_bookings for select using (exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid()))';
  end if;

if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_session_updates' and policyname = 'Clients can read their updates') then
    execute 'create policy "Clients can read their updates" on public.portal_session_updates for select using (exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid()))';
  end if;

if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_gallery_items' and policyname = 'Clients can read their gallery') then
    execute 'create policy "Clients can read their gallery" on public.portal_gallery_items for select using (exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid()))';
  end if;

if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_outlook_imports' and policyname = 'Admins manage outlook imports with service role') then
    execute 'create policy "Admins manage outlook imports with service role" on public.portal_outlook_imports for all using (auth.role() = ''service_role'') with check (auth.role() = ''service_role'')';
  end if;
end $$;

create or replace view public.portal_dashboard
with (security_invoker = true) as
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
) u on true
where c.auth_user_id = auth.uid();

create or replace view public.portal_booking_list
with (security_invoker = true) as
select
  c.calendar_feed_token,
  b.id,
  b.client_id,
  c.full_name as client_name,
  c.email as client_email,
  b.dog_id,
  d.name as dog_name,
  b.service_name,
  b.starts_at,
  b.ends_at,
  b.timezone,
  b.location,
  b.status,
  b.source,
  b.sync_status,
  b.outlook_event_id,
  b.outlook_web_link,
  b.needs_review,
  coalesce(b.cover_image_url, d.profile_photo_url) as cover_image_url,
  b.notes
from public.portal_bookings b
join public.portal_clients c on c.id = b.client_id
join public.portal_dogs d on d.id = b.dog_id
where c.auth_user_id = auth.uid();

create or replace view public.portal_calendar_feed
with (security_invoker = true) as
select
  c.calendar_feed_token as feed_token,
  b.id,
  b.client_id,
  c.full_name as client_name,
  c.email as client_email,
  b.dog_id,
  d.name as dog_name,
  b.service_name,
  b.starts_at,
  b.ends_at,
  b.timezone,
  b.location,
  b.status,
  b.source,
  b.sync_status,
  b.outlook_event_id,
  b.outlook_web_link,
  b.needs_review,
  coalesce(b.cover_image_url, d.profile_photo_url) as cover_image_url,
  b.notes
from public.portal_bookings b
join public.portal_clients c on c.id = b.client_id
join public.portal_dogs d on d.id = b.dog_id
where b.status in ('confirmed', 'reschedule_requested', 'completed');

create or replace view public.admin_booking_calendar as
select
  b.id,
  b.client_id,
  c.full_name as client_name,
  c.email as client_email,
  b.dog_id,
  d.name as dog_name,
  b.service_name,
  b.starts_at,
  b.ends_at,
  b.timezone,
  b.location,
  b.status,
  b.source,
  b.sync_status,
  b.outlook_event_id,
  b.outlook_web_link,
  b.needs_review,
  coalesce(b.cover_image_url, d.profile_photo_url) as cover_image_url,
  b.notes
from public.portal_bookings b
join public.portal_clients c on c.id = b.client_id
join public.portal_dogs d on d.id = b.dog_id
union all
select
  i.id,
  null::uuid as client_id,
  i.client_name,
  null::text as client_email,
  null::uuid as dog_id,
  i.dog_name,
  i.service_name,
  i.starts_at,
  i.ends_at,
  i.timezone,
  i.location,
  i.status,
  'outlook'::text as source,
  'needs_review'::text as sync_status,
  i.outlook_event_id,
  i.outlook_web_link,
  i.needs_review,
  null::text as cover_image_url,
  i.notes
from public.portal_outlook_imports i
where i.linked_booking_id is null;
-- Profile tab live-data fields and write policies.
alter table public.portal_clients
  add column if not exists phone text,
  add column if not exists address text,
  add column if not exists profile_photo_url text;

alter table public.portal_dogs
  add column if not exists breed text,
  add column if not exists birth_date date;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_clients' and policyname = 'Clients can update their own portal profile') then
    execute 'create policy "Clients can update their own portal profile" on public.portal_clients for update using (auth.uid() = auth_user_id) with check (auth.uid() = auth_user_id)';
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_dogs' and policyname = 'Clients can add their dogs') then
    execute 'create policy "Clients can add their dogs" on public.portal_dogs for insert with check (exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid()))';
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_dogs' and policyname = 'Clients can update their dogs') then
    execute 'create policy "Clients can update their dogs" on public.portal_dogs for update using (exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid())) with check (exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid()))';
  end if;
end $$;
