# Jeroen & Paws

A Next.js website for Jeroen & Paws, a personalised dog walking, training, day care, boarding, home check-in, and custom dog-care service.

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Microsoft Graph email delivery for contact-form submissions
- Vitest for unit tests

## Local development

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Useful scripts

```bash
npm run dev          # Start the local dev server
npm run build        # Build the production app
npm run start        # Start the built app
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript without emitting files
npm run test         # Run Vitest tests
```

## Site structure

- `/` — homepage and primary conversion CTAs
- `/services` — service cards, pricing, booking notes, service-area guidance, and process
- `/about` — Jeroen, values, story, and trust content
- `/contact` — free meet-and-greet/contact form, contact cards, and FAQ
- `/privacy` — privacy notice for enquiry and care-plan information
- `/policies` — practical booking notes and care expectations

## Environment variables

For the full calendar, Supabase, Outlook, and Microsoft Graph setup guide, see `docs/calendar-outlook-supabase-setup.md`.

### Public site, chat, and portal settings

```bash
NEXT_PUBLIC_SITE_URL=https://jeroenandpaws.com
NEXT_PUBLIC_WHATSAPP_NUMBER=00353872473099
NEXT_PUBLIC_WHATSAPP_CHAT_URL=https://wa.me/353872473099
NEXT_PUBLIC_LIVE_CHAT_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=Jeroen & Paws <onboarding@yourdomain.com>
ADMIN_CALENDAR_FEED_TOKEN=
```

`NEXT_PUBLIC_WHATSAPP_NUMBER` is preferred when you want service-card buttons to create prefilled WhatsApp messages. If `NEXT_PUBLIC_WHATSAPP_CHAT_URL` is used, messages are appended only for WhatsApp-compatible URLs.

The portal dashboard and calendars read from the Supabase tables/views created by `supabase/portal-dashboard.sql`. Add your project URL and anon key for customer portal reads, and add `SUPABASE_SERVICE_ROLE_KEY` server-side so backend calendar, Outlook sync, and private `.ics` feeds can read/write booking data. Do not expose the service-role key to the browser. The schema also installs an `auth.users` trigger that creates or links matching `public.portal_clients` rows, so customer portal accounts appear in the app tables after signup.

### Contact form email setup

The contact form posts to `/api/contact` and sends email through Microsoft Graph using Azure app credentials. Booking requests are delivered to the notification inbox, and the visitor's email address is set as `Reply-To` so replying in Outlook goes directly back to the person who submitted the form.

```bash
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

Email routing defaults to `CONTACT_NOTIFICATION_EMAIL` for delivery, then falls back to `ADMIN_EMAIL`, `JEROEN_AND_PAWS_EMAIL`, or the public business email. The sender mailbox defaults to `BOOKING_NOTIFICATION_EMAIL`, then falls back to `JEROEN_AND_PAWS_EMAIL`, `OUTLOOK_CALENDAR_EMAIL`, or the legacy `NEXT_PUBLIC_OUTLOOK_CALENDAR_EMAIL` fallback.

In Microsoft Entra/Azure, the app registration must be allowed to send mail with Microsoft Graph for the sender mailbox used above. For calendar sync, the same app also needs Microsoft Graph calendar permissions for `OUTLOOK_CALENDAR_EMAIL`. Website-created bookings can be pushed to Outlook through `/api/outlook/bookings/[id]`, and Outlook-created events that start with `[JP]` can be imported through `/api/outlook/sync`.


### Resend confirmation email setup

Portal signups now send the branded confirmation email through Resend instead of Supabase's built-in mailer. The app asks Supabase Admin Auth to generate the signup confirmation link, renders `supabase/email-templates/confirm-signup.html`, replaces `{{ .ConfirmationURL }}` with that link, and sends the email through Resend.

To enable this flow:

1. Create a Resend API key and verify the sending domain/address you want to use.
2. Add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `SUPABASE_SERVICE_ROLE_KEY` to the server environment.
3. In Supabase Authentication → URL Configuration, allow `/portal` or your production portal URL as a redirect URL.
4. Send a test signup from `/portal`. If delivery fails, check the application logs for the Resend or Supabase Admin Auth error message.

Portal signups show the login form after account creation instead of opening the dashboard immediately, and the login screen includes a Resend-powered confirmation action if the email does not arrive. Only after the confirmation button is clicked does the visitor land back on the customer portal.

## Contact-form safeguards

- Zod validation with maximum field lengths
- Honeypot field for simple bot submissions
- Basic in-memory rate limiting per forwarded IP
- Friendly user-facing fallback messages
- Microsoft Graph request timeouts and token caching
- Optional confirmation email to the person who submitted the form

## SEO notes

The app includes global metadata, Open Graph/Twitter metadata, local PetService JSON-LD, sitemap generation, robots configuration, service-section anchors, privacy/terms pages, and FAQ content on the contact page.
