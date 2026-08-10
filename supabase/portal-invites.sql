-- Code-only self-registration for new Jeroen & Paws portal clients.
-- Run this after supabase/portal-dashboard.sql in the Supabase SQL editor.

create extension if not exists pgcrypto;

alter table public.portal_clients
  add column if not exists phone text;

alter table public.portal_clients
  alter column email drop not null;

create unique index if not exists portal_clients_email_unique_present
  on public.portal_clients (lower(email))
  where email is not null and email <> '';

update public.portal_clients set phone = regexp_replace(phone, '[^0-9+]', '', 'g') where phone is not null;

create unique index if not exists portal_clients_phone_unique_present
  on public.portal_clients (regexp_replace(phone, '[^0-9+]', '', 'g'))
  where phone is not null and phone <> '';

create table if not exists public.portal_invites (
  id uuid primary key default gen_random_uuid(),
  code text not null unique default encode(gen_random_bytes(16), 'hex'),
  expires_at timestamptz not null default (now() + interval '30 days'),
  used_at timestamptz,
  used_by_auth_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Remove columns from the earlier existing-client invite design, if that draft was applied.
alter table public.portal_invites
  drop constraint if exists portal_invites_has_contact,
  drop column if exists client_id,
  drop column if exists full_name,
  drop column if exists email,
  drop column if exists phone;

create index if not exists portal_invites_code_unused_idx
  on public.portal_invites (code)
  where used_at is null;

alter table public.portal_invites enable row level security;

-- Invite records are checked and consumed only through service-role API routes.
drop policy if exists "No public invite access" on public.portal_invites;
create policy "No public invite access" on public.portal_invites
  for all
  using (false)
  with check (false);

-- Short-lived server-only records for Bird Verify OTP attempts and rate limiting.
create table if not exists public.portal_auth_challenges (
  id uuid primary key default gen_random_uuid(),
  otp_code_hash text not null,
  otp_expires_at timestamptz not null default (now() + interval '10 minutes'),
  invite_id uuid references public.portal_invites(id) on delete set null,
  phone text not null,
  email text,
  phone_hash text not null,
  ip_hash text not null,
  full_name text not null,
  attempts integer not null default 0 check (attempts >= 0),
  expires_at timestamptz not null default (now() + interval '10 minutes'),
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.portal_auth_challenges
  add column if not exists email text,
  add column if not exists otp_code_hash text,
  add column if not exists otp_expires_at timestamptz,
  drop column if exists bird_verification_id,
  drop column if exists client_id,
  drop column if exists auth_user_id,
  drop column if exists mode;

create index if not exists portal_auth_challenges_phone_rate_idx on public.portal_auth_challenges (phone_hash, created_at desc);
create index if not exists portal_auth_challenges_ip_rate_idx on public.portal_auth_challenges (ip_hash, created_at desc);
alter table public.portal_auth_challenges enable row level security;
drop policy if exists "No public challenge access" on public.portal_auth_challenges;
create policy "No public challenge access" on public.portal_auth_challenges for all using (false) with check (false);

create table if not exists public.portal_registration_attempts (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid references public.portal_invites(id) on delete cascade,
  ip_hash text not null,
  created_at timestamptz not null default now()
);
create index if not exists portal_registration_attempts_ip_idx on public.portal_registration_attempts (ip_hash, created_at desc);
alter table public.portal_registration_attempts enable row level security;
drop policy if exists "No public registration attempt access" on public.portal_registration_attempts;
create policy "No public registration attempt access" on public.portal_registration_attempts for all using (false) with check (false);

create or replace function public.sync_auth_user_to_portal_client()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  normalized_phone text := nullif(new.phone, '');
  normalized_email text := nullif(new.email, '');
begin
  update public.portal_clients
  set auth_user_id = new.id,
      full_name = coalesce(nullif(public.portal_clients.full_name, ''), nullif(new.raw_user_meta_data ->> 'full_name', ''), normalized_email, normalized_phone, 'Portal client'),
      email = coalesce(public.portal_clients.email, normalized_email),
      phone = coalesce(public.portal_clients.phone, normalized_phone)
  where auth_user_id is null
    and (
      (normalized_email is not null and lower(email) = lower(normalized_email))
      or (normalized_phone is not null and regexp_replace(phone, '[^0-9+]', '', 'g') = regexp_replace(normalized_phone, '[^0-9+]', '', 'g'))
    );

  if not found then
    insert into public.portal_clients (auth_user_id, full_name, email, phone)
    values (
      new.id,
      coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), normalized_email, normalized_phone, 'Portal client'),
      normalized_email,
      normalized_phone
    );
  end if;

  return new;
end;
$$;

-- Registration codes are generated in the backend in the form
-- DOGNAMES-Jeroen&Paws-YEAR and remain single-use.
