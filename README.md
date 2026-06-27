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

### Public site and chat settings

```bash
NEXT_PUBLIC_SITE_URL=https://jeroenandpaws.com
NEXT_PUBLIC_WHATSAPP_NUMBER=00353872473099
NEXT_PUBLIC_WHATSAPP_CHAT_URL=https://wa.me/353872473099
NEXT_PUBLIC_LIVE_CHAT_URL=
```

`NEXT_PUBLIC_WHATSAPP_NUMBER` is preferred when you want service-card buttons to create prefilled WhatsApp messages. If `NEXT_PUBLIC_WHATSAPP_CHAT_URL` is used, messages are appended only for WhatsApp-compatible URLs.

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

In Microsoft Entra/Azure, the app registration must be allowed to send mail with Microsoft Graph for the sender mailbox used above.

## Contact-form safeguards

- Zod validation with maximum field lengths
- Honeypot field for simple bot submissions
- Basic in-memory rate limiting per forwarded IP
- Friendly user-facing fallback messages
- Microsoft Graph request timeouts and token caching
- Optional confirmation email to the person who submitted the form

## SEO notes

The app includes global metadata, Open Graph/Twitter metadata, local PetService JSON-LD, sitemap generation, robots configuration, service-section anchors, privacy/terms pages, and FAQ content on the contact page.
