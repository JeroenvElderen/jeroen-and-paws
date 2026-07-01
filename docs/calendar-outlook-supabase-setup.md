# Calendar, Supabase, and Outlook setup

This guide explains where every environment variable for the booking calendar, customer portal, `.ics` feeds, Microsoft Graph email, and Outlook calendar sync comes from.

## 1. Environment variables checklist

Add these values in Vercel/hosting and in `.env.local` for local testing.

```bash
# Public website
NEXT_PUBLIC_SITE_URL=https://jeroenandpaws.com
NEXT_PUBLIC_WHATSAPP_NUMBER=00353872473099
NEXT_PUBLIC_WHATSAPP_CHAT_URL=https://wa.me/353872473099
NEXT_PUBLIC_LIVE_CHAT_URL=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_CALENDAR_FEED_TOKEN=

# Microsoft / Outlook / Graph
AZURE_TENANT_ID=
AZURE_CLIENT_ID=
AZURE_CLIENT_SECRET=
BOOKING_NOTIFICATION_EMAIL=
CONTACT_NOTIFICATION_EMAIL=
ADMIN_EMAIL=
JEROEN_AND_PAWS_EMAIL=
OUTLOOK_CALENDAR_EMAIL=
NEXT_PUBLIC_OUTLOOK_CALENDAR_EMAIL=
```

`NEXT_PUBLIC_*` values are visible in the browser. Keep `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_CALENDAR_FEED_TOKEN`, `AZURE_CLIENT_SECRET`, and all other secrets server-side only.

## 2. Supabase variables

### `NEXT_PUBLIC_SUPABASE_URL`

1. Open your Supabase project.
2. Go to **Project Settings → API**.
3. Copy **Project URL**.
4. Paste it as `NEXT_PUBLIC_SUPABASE_URL`.

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`

1. Open **Project Settings → API**.
2. Under **Project API keys**, copy the **anon public** key.
3. Paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

This key is safe to use in the browser because Row Level Security controls what logged-in customers can read.

### `SUPABASE_SERVICE_ROLE_KEY`

1. Open **Project Settings → API**.
2. Under **Project API keys**, copy the **service_role** key.
3. Paste it as `SUPABASE_SERVICE_ROLE_KEY` in server-side environment variables only.

This key bypasses Row Level Security. Never put it in client-side code and never prefix it with `NEXT_PUBLIC_`.

### `ADMIN_CALENDAR_FEED_TOKEN`

Create this yourself. It protects the optional all-bookings admin `.ics` feed.

Generate one locally:

```bash
openssl rand -hex 32
```

Use the generated value as `ADMIN_CALENDAR_FEED_TOKEN`.

The customer calendar feed uses each client’s private `calendar_feed_token` from Supabase. The admin feed requires:

```txt
/api/calendar/feed?admin_token=YOUR_ADMIN_CALENDAR_FEED_TOKEN
```

## 3. Supabase SQL setup

1. Open **Supabase → SQL Editor**.
2. Open `supabase/calendar-outlook-schema.sql` from this repo.
3. Run the SQL file.
4. Confirm these tables exist:
   - `public.portal_clients`
   - `public.portal_dogs`
   - `public.portal_bookings`
   - `public.portal_outlook_imports`
   - `public.portal_session_updates`
   - `public.portal_gallery_items`
5. Confirm these views exist:
   - `public.portal_dashboard`
   - `public.portal_booking_list`
   - `public.portal_calendar_feed`
   - `public.admin_booking_calendar`

## 4. Microsoft Azure / Outlook variables

You need a Microsoft Entra app registration so the server can call Microsoft Graph.

### Create or find the app registration

1. Open the **Microsoft Azure Portal**.
2. Go to **Microsoft Entra ID → App registrations**.
3. Choose an existing app or click **New registration**.
4. Name it something like `Jeroen & Paws Website`.
5. For account type, choose the single-tenant option unless you specifically need multi-tenant access.
6. Save the app.

### `AZURE_TENANT_ID`

1. Open the app registration.
2. Go to **Overview**.
3. Copy **Directory (tenant) ID**.
4. Paste it as `AZURE_TENANT_ID`.

### `AZURE_CLIENT_ID`

1. Open the app registration.
2. Go to **Overview**.
3. Copy **Application (client) ID**.
4. Paste it as `AZURE_CLIENT_ID`.

### `AZURE_CLIENT_SECRET`

1. Open the app registration.
2. Go to **Certificates & secrets**.
3. Click **New client secret**.
4. Add a description and expiry.
5. Copy the secret **Value** immediately.
6. Paste it as `AZURE_CLIENT_SECRET`.

You cannot retrieve this value later; if you lose it, create a new secret.

## 5. Microsoft Graph permissions

In the Azure app registration:

1. Go to **API permissions**.
2. Click **Add a permission**.
3. Choose **Microsoft Graph**.
4. Add application permissions for the features you use:
   - `Mail.Send` for contact-form email.
   - `Calendars.ReadWrite` for creating/updating Outlook bookings.
   - `Calendars.Read` is enough only for read/import sync, but `Calendars.ReadWrite` is needed for two-way sync.
5. Click **Grant admin consent**.

If your tenant uses application access policies, restrict this app to the mailbox/calendar used for Jeroen & Paws bookings.

## 6. Email and calendar mailbox variables

### `OUTLOOK_CALENDAR_EMAIL`

Use the mailbox whose calendar should hold the business bookings, for example:

```bash
OUTLOOK_CALENDAR_EMAIL=bookings@jeroenandpaws.com
```

This is the calendar used by the Outlook sync API.

### `NEXT_PUBLIC_OUTLOOK_CALENDAR_EMAIL`

This is a legacy/public fallback. Use it only if you need to show the calendar email in browser-rendered UI.

### `BOOKING_NOTIFICATION_EMAIL`

The mailbox used as the sender for website booking/contact notifications.

### `CONTACT_NOTIFICATION_EMAIL`

The inbox that receives contact-form messages.

### `ADMIN_EMAIL`

Fallback admin inbox if `CONTACT_NOTIFICATION_EMAIL` is not set.

### `JEROEN_AND_PAWS_EMAIL`

General business email fallback used by contact and calendar configuration.

## 7. Outlook event naming for two-way sync

When you create a booking directly in Outlook, start the event title with `[JP]`:

```txt
[JP] Dog Walk - Teddy - Sarah
[JP] Training - Lola - Emma
[JP] Boarding - Nola - Mark
```

The import endpoint scans Outlook calendar events and imports only `[JP]` events into `portal_outlook_imports` for review.

```txt
POST /api/outlook/sync
```

Events without `[JP]` are ignored so personal calendar events do not become customer bookings.

## 8. Useful endpoints

### Read bookings

```txt
GET /api/bookings?scope=admin
GET /api/bookings?scope=portal
```

The portal route expects the customer Supabase access token in the `Authorization` header.

### Push a website booking to Outlook

```txt
POST /api/outlook/bookings/:id
```

This creates or updates the Outlook event for the Supabase booking and stores the Outlook event metadata back on the booking.

### Import Outlook-created bookings

```txt
POST /api/outlook/sync
```

This scans a date window, finds events starting with `[JP]`, and stores them in `portal_outlook_imports` for backend review.

### Download one booking as `.ics`

```txt
GET /api/calendar/booking/:id
```

### Subscribe to a customer calendar feed

```txt
GET /api/calendar/feed?token=CUSTOMER_CALENDAR_FEED_TOKEN
```

### Subscribe to the admin all-bookings feed

```txt
GET /api/calendar/feed?admin_token=ADMIN_CALENDAR_FEED_TOKEN
```

## 9. Local testing

After adding environment variables:

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
npm run dev
```

Then open:

```txt
http://localhost:3000/backend
http://localhost:3000/portal
```