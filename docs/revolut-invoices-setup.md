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
REVOLUT_JWT_ISSUER=www.jeroenandpaws.com
```

### Revolut variables

- `REVOLUT_CLIENT_ID`: your Revolut Business Open API client ID.
- `REVOLUT_PRIVATE_KEY`: the private key that matches the public certificate uploaded to Revolut. Keep newline characters as `\n` if your host stores it on one line.
- `REVOLUT_REFRESH_TOKEN`: long-lived refresh token from the Revolut Business OAuth flow.
- `REVOLUT_JWT_ISSUER`: optional; defaults to `www.jeroenandpaws.com`. Set it to the issuer configured in your Revolut Business app.

## 3. How payment matching works

1. Create an invoice row with a unique `invoice_number` and `payment_reference`.
2. Ask the client to use that reference when paying to the Revolut bank account.
3. In the backend invoice page, click **Sync Revolut**.
4. The app scans recent completed Revolut credit transactions and marks matching invoices as `paid` when reference, currency, and amount match.
5. Supabase Realtime pushes the changed invoice row back to the dashboard.

## 4. Useful endpoints

- `GET /api/invoices`: returns live invoice rows from Supabase for the backend dashboard.
- `POST /api/invoices/sync`: pulls recent Revolut Business transactions and updates matching invoices.

For production automation, call `POST /api/invoices/sync` from a Vercel Cron job or another trusted scheduler. Do not expose Revolut secrets to browser code.