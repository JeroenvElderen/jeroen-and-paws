-- Mobile release configuration. Run this migration in the Supabase SQL editor.
create table if not exists public.mobile_app (
  id uuid primary key default gen_random_uuid(),
  platform text not null unique check (platform in ('android', 'ios')),
  enabled boolean not null default false,
  version text not null default '',
  build integer check (build is null or build >= 0),
  release_notes text not null default '',
  download_url text not null default '',
  store_url text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.mobile_app (platform, enabled)
values ('android', false), ('ios', false)
on conflict (platform) do nothing;

alter table public.mobile_app enable row level security;

create policy "Mobile releases are publicly readable"
  on public.mobile_app for select using (true);

create policy "Business admin can update mobile releases"
  on public.mobile_app for update to authenticated
  using ((auth.jwt() ->> 'email') = 'jeroen@jeroenandpaws.com')
  with check ((auth.jwt() ->> 'email') = 'jeroen@jeroenandpaws.com');
