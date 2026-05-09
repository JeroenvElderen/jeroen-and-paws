This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Contact form email setup

The contact form posts to `/api/contact` and sends email through Microsoft Graph using the Azure app credentials already configured for the site. Booking requests are delivered to your notification inbox, and the visitor's email address is set as `Reply-To` so replying in Outlook goes directly back to the person who submitted the form.

The code reads these existing Vercel environment variables:

```bash
AZURE_TENANT_ID
AZURE_CLIENT_ID
AZURE_CLIENT_SECRET
BOOKING_NOTIFICATION_EMAIL
CONTACT_NOTIFICATION_EMAIL
ADMIN_EMAIL
JEROEN_AND_PAWS_EMAIL
NEXT_PUBLIC_OUTLOOK_CALENDAR_EMAIL
```

Email routing defaults to `CONTACT_NOTIFICATION_EMAIL` for delivery, then falls back to `ADMIN_EMAIL` or `JEROEN_AND_PAWS_EMAIL`. The sender mailbox defaults to `BOOKING_NOTIFICATION_EMAIL`, then falls back to `JEROEN_AND_PAWS_EMAIL` or `NEXT_PUBLIC_OUTLOOK_CALENDAR_EMAIL`.

In Microsoft Entra/Azure, the app registration must be allowed to send mail with Microsoft Graph for the sender mailbox used above.
