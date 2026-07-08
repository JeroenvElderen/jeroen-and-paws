-- Client portal realtime data model additions.
-- Run after supabase/portal-dashboard.sql. Realtime must also be enabled for these tables in Supabase.

alter table public.portal_clients
  add column if not exists first_name text,
  add column if not exists phone text,
  add column if not exists address text,
  add column if not exists avatar_url text,
  add column if not exists status text not null default 'active',
  add column if not exists updated_at timestamptz not null default now();

update public.portal_clients
set first_name = split_part(trim(full_name), ' ', 1)
where first_name is null or first_name = '';

drop trigger if exists portal_clients_set_updated_at on public.portal_clients;
create trigger portal_clients_set_updated_at
before update on public.portal_clients
for each row execute function public.set_updated_at();

create table if not exists public.portal_client_activity (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.portal_clients(id) on delete cascade,
  activity_type text not null default 'update',
  title text not null,
  body text,
  created_at timestamptz not null default now()
);

alter table public.portal_client_activity enable row level security;

-- Explicit API grants for Supabase PostgREST roles. RLS still limits rows to the
-- signed-in portal client, while these privileges allow PostgREST to reach RLS.
grant usage on schema public to anon, authenticated, service_role;
grant select on public.portal_clients, public.portal_dogs, public.portal_bookings, public.portal_session_updates, public.portal_gallery_items, public.portal_client_activity to authenticated;
-- Server-side Outlook sync uses the Supabase service role through PostgREST.
-- PostgREST checks table privileges before RLS, so grant service_role access
-- to every base table/view the sync reads or writes.
grant select on public.portal_clients, public.portal_dogs, public.portal_bookings to service_role;
grant select, insert, update on public.portal_outlook_imports to service_role;
grant insert, delete on public.portal_dogs to authenticated;
grant update (full_name, email, first_name, phone, address, avatar_url, status) on public.portal_clients to authenticated;
grant update (name, breed, age, status, profile_photo_url, hero_photo_url, notes) on public.portal_dogs to authenticated;

alter table public.portal_dogs enable row level security;

drop policy if exists "Clients can read their dogs" on public.portal_dogs;
drop policy if exists "Clients can add their dogs" on public.portal_dogs;
drop policy if exists "Clients can update their dogs" on public.portal_dogs;
drop policy if exists "Clients can delete their dogs" on public.portal_dogs;

create policy "Clients can read their dogs"
on public.portal_dogs
for select
using (
  client_id in (
    select id
    from public.portal_clients
    where auth_user_id = auth.uid()
  )
);

create policy "Clients can add their dogs"
on public.portal_dogs
for insert
with check (
  client_id in (
    select id
    from public.portal_clients
    where auth_user_id = auth.uid()
  )
);

create policy "Clients can update their dogs"
on public.portal_dogs
for update
using (
  client_id in (
    select id
    from public.portal_clients
    where auth_user_id = auth.uid()
  )
)
with check (
  client_id in (
    select id
    from public.portal_clients
    where auth_user_id = auth.uid()
  )
);

create policy "Clients can delete their dogs"
on public.portal_dogs
for delete
using (
  client_id in (
    select id
    from public.portal_clients
    where auth_user_id = auth.uid()
  )
);

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_clients' and policyname = 'Clients can update their own portal profile') then
    execute 'create policy "Clients can update their own portal profile" on public.portal_clients for update using (auth.uid() = auth_user_id) with check (auth.uid() = auth_user_id)';
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_client_activity' and policyname = 'Clients can read their activity') then
    execute 'create policy "Clients can read their activity" on public.portal_client_activity for select using (exists (select 1 from public.portal_clients c where c.id = client_id and c.auth_user_id = auth.uid()))';
  end if;
end $$;

create or replace view public.portal_dashboard
with (security_invoker = true) as
select
  c.id as client_id,
  c.full_name as client_name,
  coalesce(nullif(c.first_name, ''), split_part(trim(c.full_name), ' ', 1)) as client_first_name,
  c.created_at as client_since,
  c.avatar_url,
  coalesce(dogs.dog_names, 'your dog') as dog_names,
  dogs.dog_photo_url,
  dogs.hero_photo_url,
  b.id as upcoming_booking_id,
  b.service_name,
  b.starts_at,
  b.ends_at,
  b.location,
  b.status as booking_status,
  coalesce(b.cover_image_url, dogs.dog_photo_url) as booking_image_url,
  coalesce(u.title, g.title) as latest_update_title,
  u.body as latest_update_body,
  coalesce(u.image_url, g.image_url, b.cover_image_url, dogs.dog_photo_url) as latest_update_image_url,
  coalesce(u.shared_at, g.created_at) as latest_update_shared_at
from public.portal_clients c
left join lateral (
  select string_agg(d.name, ' and ' order by d.created_at) as dog_names,
         (array_agg(d.profile_photo_url order by d.created_at))[1] as dog_photo_url,
         (array_agg(coalesce(d.hero_photo_url, d.profile_photo_url) order by d.created_at))[1] as hero_photo_url
  from public.portal_dogs d where d.client_id = c.id
) dogs on true
left join lateral (
  select * from public.portal_bookings b
  where b.client_id = c.id and b.starts_at >= now() and b.status not in ('cancelled', 'completed', 'no_show')
  order by b.starts_at asc limit 1
) b on true
left join lateral (
  select * from public.portal_session_updates u
  where u.client_id = c.id order by u.shared_at desc limit 1
) u on true
left join lateral (
  select gi.*, coalesce(pb.service_name, 'Session gallery') as title
  from public.portal_gallery_items gi
  left join public.portal_bookings pb on pb.id = gi.booking_id
  where gi.client_id = c.id order by gi.created_at desc limit 1
) g on true
where c.auth_user_id = auth.uid();

create or replace view public.portal_gallery
with (security_invoker = true) as
select
  gi.id,
  b.service_name as title,
  d.name as dog_name,
  gi.image_url,
  gi.alt_text,
  gi.delivered_at,
  gi.created_at,
  b.starts_at as session_date
from public.portal_gallery_items gi
join public.portal_clients c on c.id = gi.client_id
join public.portal_dogs d on d.id = gi.dog_id
left join public.portal_bookings b on b.id = gi.booking_id
where c.auth_user_id = auth.uid();

create or replace view public.portal_profile
with (security_invoker = true) as
select
  c.id as client_id,
  c.full_name,
  c.email,
  c.phone,
  c.address,
  c.avatar_url,
  c.created_at,
  dogs.dog_names,
  dogs.dog_photo_url,
  coalesce(dogs.items, '[]'::jsonb) as dogs,
  coalesce(activity.items, '[]'::jsonb) as recent_activity
from public.portal_clients c
left join lateral (
  select string_agg(d.name, ' and ' order by d.created_at) as dog_names,
         (array_agg(d.profile_photo_url order by d.created_at))[1] as dog_photo_url,
         jsonb_agg(to_jsonb(d) order by d.created_at) as items
  from public.portal_dogs d where d.client_id = c.id
) dogs on true
left join lateral (
  select jsonb_agg(to_jsonb(a) order by a.created_at desc) as items
  from (select * from public.portal_client_activity a where a.client_id = c.id order by a.created_at desc limit 10) a
) activity on true
where c.auth_user_id = auth.uid();

grant select on public.portal_dashboard, public.portal_gallery, public.portal_profile to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.portal_clients;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.portal_dogs;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.portal_bookings;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.portal_session_updates;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.portal_gallery_items;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.portal_client_activity;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.portal_outlook_imports;
exception when duplicate_object then null;
end $$;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_clients' and policyname = 'Backend admin can read clients') then
    execute 'create policy "Backend admin can read clients" on public.portal_clients for select using ((auth.jwt() ->> ''email'') = ''jeroen@jeroenandpaws.com'')';
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_dogs' and policyname = 'Backend admin can read dogs') then
    execute 'create policy "Backend admin can read dogs" on public.portal_dogs for select using ((auth.jwt() ->> ''email'') = ''jeroen@jeroenandpaws.com'')';
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_bookings' and policyname = 'Backend admin can read bookings') then
    execute 'create policy "Backend admin can read bookings" on public.portal_bookings for select using ((auth.jwt() ->> ''email'') = ''jeroen@jeroenandpaws.com'')';
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_session_updates' and policyname = 'Backend admin can read session updates') then
    execute 'create policy "Backend admin can read session updates" on public.portal_session_updates for select using ((auth.jwt() ->> ''email'') = ''jeroen@jeroenandpaws.com'')';
  end if;
end $$;
-- Backend bookings management: allow the authenticated business account to create
-- bookings directly from the backend dashboard. Realtime publication above makes
-- newly inserted bookings appear in the backend bookings tab immediately.
grant insert on public.portal_bookings to authenticated;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_bookings' and policyname = 'Backend admin can create bookings') then
    execute 'create policy "Backend admin can create bookings" on public.portal_bookings for insert with check ((auth.jwt() ->> ''email'') = ''jeroen@jeroenandpaws.com'')';
  end if;
end $$;