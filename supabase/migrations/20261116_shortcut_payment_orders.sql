-- Run once in the Supabase SQL Editor for the Jeroen & Paws project.
-- The primary key is the atomic reservation lock for each weekly billing group.
create table if not exists public.shortcut_payment_orders (
  billing_reference text primary key,
  amount integer not null check (amount between 1 and 1000000),
  currency text not null default 'EUR' check (currency = 'EUR'),
  description text not null check (char_length(description) between 5 and 255),
  status text not null default 'creating'
    check (status in ('creating', 'ready', 'needs_review')),
  order_id text,
  payment_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint shortcut_payment_orders_reference_length
    check (char_length(billing_reference) between 8 and 255),
  constraint shortcut_payment_orders_ready_fields
    check (status <> 'ready' or (order_id is not null and payment_url is not null))
);

create unique index if not exists shortcut_payment_orders_order_id_unique
  on public.shortcut_payment_orders (order_id)
  where order_id is not null;

alter table public.shortcut_payment_orders enable row level security;

-- Only the server-side Supabase service role should access this table.
revoke all on table public.shortcut_payment_orders from anon, authenticated;
grant select, insert, update on table public.shortcut_payment_orders to service_role;

create or replace function public.shortcut_payment_orders_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists shortcut_payment_orders_updated_at on public.shortcut_payment_orders;
create trigger shortcut_payment_orders_updated_at
before update on public.shortcut_payment_orders
for each row execute function public.shortcut_payment_orders_set_updated_at();

-- No automatic deletion of reservation rows: deleting them could allow
-- a later retry to create a duplicate Revolut order.
