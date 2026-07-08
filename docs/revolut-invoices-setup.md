# Revolut live invoice setup

This app reconciles backend invoices against Revolut Business bank transactions and updates Supabase in realtime.

## 1. Supabase SQL

1. Open the Supabase SQL editor.
2. Run `supabase/portal-dashboard.sql` first if you have not already done so.
3. Run `supabase/portal-invoices-revolut.sql`.
4. In Supabase **Database > Replication**, confirm `portal_invoices` is in the `supabase_realtime` publication.

Invoices are stored in `public.portal_invoices`. The admin account `jeroen@jeroenandpaws.com` can manage all invoices. A portal client can only read invoices linked to their `portal_client_id`.

## 2. Required environment variables

Add these server-side variables in Vercel and in local `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

REVOLUT_CLIENT_ID=
REVOLUT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
REVOLUT_REFRESH_TOKEN=
REVOLUT_REDIRECT_URI=https://www.jeroenandpaws.com/api/revolut/callback
REVOLUT_JWT_ISSUER=www.jeroenandpaws.com
CRON_SECRET=
```

### Revolut variables

- `REVOLUT_CLIENT_ID`: your Revolut Business Open API client ID.
- `REVOLUT_PRIVATE_KEY`: the private key that matches the public certificate uploaded to Revolut. Keep newline characters as `\n` if your host stores it on one line.
- `REVOLUT_REFRESH_TOKEN`: long-lived refresh token from the Revolut Business OAuth flow.
- `REVOLUT_REDIRECT_URI`: callback URL registered in Revolut. Use `https://www.jeroenandpaws.com/api/revolut/callback` for production.
- `REVOLUT_JWT_ISSUER`: issuer configured in your Revolut Business app, for example `www.jeroenandpaws.com`.
- `CRON_SECRET`: a random secret used by Vercel Cron when it calls the invoice sync endpoint automatically.

## 3. How payment matching works

1. Create an invoice row with a unique `invoice_number` and `payment_reference`.
2. The Revolut checkout description is generated as the invoice number plus the dog name and service details, for example `INV-2026-0001 - Nola - Walk - 60min - 5 days`.
3. Ask the client to use the invoice number as the bank transfer reference if they pay manually.
4. Vercel Cron calls the invoice sync endpoint every 30 minutes. You can also click **Sync Revolut** in the backend invoice page.
5. The app scans recent completed Revolut credit transactions and marks matching invoices as `paid` when reference, currency, and amount match.
6. Supabase Realtime pushes the changed invoice row back to the dashboard.

## 4. Useful endpoints

- `GET /api/invoices`: returns live invoice rows from Supabase for the backend dashboard.
- `POST /api/invoices/sync`: pulls recent Revolut Business transactions and updates matching invoices.
- `GET /api/invoices/sync`: same sync action for Vercel Cron.

Production automation is configured in `vercel.json` with a Vercel Cron job that calls `GET /api/invoices/sync` every 30 minutes. Keep `CRON_SECRET` configured in Vercel so scheduled requests are authorized, and do not expose Revolut secrets to browser code.
