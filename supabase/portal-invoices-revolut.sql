-- Live invoices + Revolut payment reconciliation for Jeroen & Paws.
-- Run this in Supabase SQL editor after supabase/portal-dashboard.sql.

create table if not exists public.portal_invoices (
  id uuid primary key default gen_random_uuid(),
  portal_client_id uuid references public.portal_clients(id) on delete set null,
  invoice_number text not null unique,
  client_name text,
  client_email text,
  dog_names text[] not null default '{}',
  issued_on date not null default current_date,
  due_on date,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'EUR',
  status text not null default 'pending' check (status in ('draft', 'sent', 'pending', 'paid', 'overdue', 'refunded')),
  payment_reference text not null unique,
  revolut_transaction_id text unique,
  paid_on timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portal_invoices_client_id_idx on public.portal_invoices(portal_client_id);
create index if not exists portal_invoices_status_idx on public.portal_invoices(status);
create index if not exists portal_invoices_due_on_idx on public.portal_invoices(due_on);
create index if not exists portal_invoices_payment_reference_idx on public.portal_invoices(payment_reference);

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
  dog_names,
  issued_on,
  due_on,
  amount_cents,
  currency,
  status,
  payment_reference
) values (
  'INV-2026-0001',
  'Test Client',
  'client@example.com',
  array['Test Dog'],
  current_date,
  current_date + interval '14 days',
  6000,
  'EUR',
  'pending',
  'INV-2026-0001'
) on conflict (invoice_number) do nothing;