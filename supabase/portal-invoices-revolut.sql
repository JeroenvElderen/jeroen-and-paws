-- Live invoices + Revolut payment reconciliation for Jeroen & Paws.
-- Run this in Supabase SQL editor after supabase/portal-dashboard.sql.

create table if not exists public.portal_invoices (
  id uuid primary key default gen_random_uuid(),
  portal_client_id uuid references public.portal_clients(id) on delete set null,
  invoice_number text not null unique,
  client_name text,
  client_email text,
  client_address text,
  client_phone text,
  dog_names text[] not null default '{}',
  issued_on date not null default current_date,
  due_on date,
  service_period_start date,
  service_period_end date,
  line_items jsonb not null default '[]'::jsonb,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'EUR',
  status text not null default 'pending' check (status in ('draft', 'sent', 'pending', 'paid', 'overdue', 'refunded')),
  payment_reference text not null unique,
  payment_title text,
  payment_url text,
  revolut_order_id text unique,
  revolut_transaction_id text unique,
  service_name text,
  duration_minutes integer,
  billing_days integer,
  paid_on timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portal_invoices_client_id_idx on public.portal_invoices(portal_client_id);
create index if not exists portal_invoices_status_idx on public.portal_invoices(status);
create index if not exists portal_invoices_due_on_idx on public.portal_invoices(due_on);
create index if not exists portal_invoices_payment_reference_idx on public.portal_invoices(payment_reference);
create index if not exists portal_invoices_revolut_order_id_idx on public.portal_invoices(revolut_order_id);
create index if not exists portal_invoices_client_email_idx on public.portal_invoices(lower(client_email));

alter table public.portal_invoices
  add column if not exists client_address text,
  add column if not exists service_period_start date,
  add column if not exists service_period_end date,
  add column if not exists client_phone text,
  add column if not exists payment_title text,
  add column if not exists payment_url text,
  add column if not exists revolut_order_id text,
  add column if not exists revolut_transaction_id text,
  add column if not exists service_name text,
  add column if not exists duration_minutes integer,
  add column if not exists billing_days integer,
  add column if not exists paid_on timestamptz,
  add column if not exists notes text,
  add column if not exists line_items jsonb not null default '[]'::jsonb;

create or replace function public.set_portal_invoices_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists portal_invoices_updated_at on public.portal_invoices;
create trigger portal_invoices_updated_at
before update on public.portal_invoices
for each row execute function public.set_portal_invoices_updated_at();

create or replace function public.link_unmatched_portal_invoices()
returns trigger
language plpgsql
as $$
begin
  update public.portal_invoices
  set portal_client_id = new.id
  where portal_client_id is null
    and (
      lower(coalesce(client_email, '')) = lower(new.email)
      or (
        coalesce(client_email, '') = ''
        and lower(coalesce(client_name, '')) = lower(new.full_name)
      )
    );

  return new;
end;
$$;

drop trigger if exists portal_clients_link_unmatched_invoices on public.portal_clients;
create trigger portal_clients_link_unmatched_invoices
after insert or update of email, full_name on public.portal_clients
for each row execute function public.link_unmatched_portal_invoices();

alter table public.portal_invoices enable row level security;

drop policy if exists "Admins can manage invoices" on public.portal_invoices;
create policy "Admins can manage invoices"
on public.portal_invoices
for all
to authenticated
using (auth.jwt() ->> 'email' = 'jeroen@jeroenandpaws.com')
with check (auth.jwt() ->> 'email' = 'jeroen@jeroenandpaws.com');

drop policy if exists "Clients can view their invoices" on public.portal_invoices;

create policy "Clients can view their invoices"
on public.portal_invoices
for select
to authenticated
using (
  portal_client_id in (
    select id
    from public.portal_clients
    where auth_user_id = auth.uid()
  )
);

do $$
begin
  alter publication supabase_realtime add table public.portal_invoices;
exception
  when duplicate_object then null;
end $$;

-- Example seed invoice. Edit values or delete after testing.
insert into public.portal_invoices (
  invoice_number,
  client_name,
  client_email,
  client_address,
  dog_names,
  issued_on,
  due_on,
  service_period_start,
  service_period_end,
  line_items,
  amount_cents,
  currency,
  status,
  payment_reference
) values (
  'INV-2026-0001',
  'Test Client',
  'client@example.com',
  'A98 R275, Ireland',
  array['Test Dog'],
  current_date,
  current_date + interval '14 days',
  current_date,
  current_date + interval '14 days',
  '[{"description":"Example dog care services","quantity":1,"unitAmountCents":6000}]'::jsonb,
  6000,
  'EUR',
  'pending',
  'INV-2026-0001'
) on conflict (invoice_number) do nothing;