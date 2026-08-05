import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Database,
  FileText,
  LockKeyhole,
  Mail,
  PawPrint,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";

import { businessInfo } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";

export const metadata = {
  title: "Privacy Policy | Website & Mobile App",
  description:
    "Privacy policy for the Jeroen & Paws website, customer portal, and mobile app, including data collection, app permissions, retention, and privacy rights.",
};

const effectiveDate = "5 August 2026";

const contents = [
  ["scope", "Scope"],
  ["information", "Information we collect"],
  ["permissions", "Mobile app permissions"],
  ["use", "How we use information"],
  ["sharing", "When information is shared"],
  ["retention", "Retention and security"],
  ["rights", "Your choices and rights"],
  ["children", "Children’s privacy"],
  ["changes", "Changes and contact"],
] as const;

export default function PrivacyPage() {
  return (
    <SiteShell activePage="contact">
      <section className="premium-hero-orb relative isolate overflow-hidden bg-[#080b10] px-5 py-16 sm:px-8 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.24),transparent_32%),radial-gradient(circle_at_15%_85%,rgba(167,139,250,0.12),transparent_28%)]" />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.24em] text-[#a78bfa]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              Website &amp; mobile app
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#fff7e8] sm:text-6xl">
              Privacy, explained
              <span className="block text-[#a78bfa]">clearly.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8cab8]">
              This policy explains how Jeroen &amp; Paws handles information
              across our website, customer portal, and mobile application.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm leading-6 text-[#c9bcac] backdrop-blur">
            <p className="font-bold text-[#fff7e8]">Effective {effectiveDate}</p>
            <p className="mt-2">
              Jeroen &amp; Paws is the controller of the personal information
              described here. Questions can be sent to{" "}
              <PrivacyEmail className="text-[#c4b5fd]" />.
            </p>
          </div>
        </div>
      </section>

      <section className="premium-cream-texture bg-[#f8f6f3] px-5 py-12 text-[#2f2a3d] sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#7c3aed]">
              In this policy
            </p>
            <nav aria-label="Privacy policy contents" className="mt-5">
              <ol className="space-y-3 border-l border-[#d8d0c8] text-sm font-semibold">
                {contents.map(([id, title], index) => (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      className="-ml-px block border-l-2 border-transparent py-1 pl-4 transition hover:border-[#7c3aed] hover:text-[#6d28d9]"
                    >
                      {String(index + 1).padStart(2, "0")} — {title}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-7">
            <PolicySection id="scope" icon={FileText} title="Scope">
              <p>
                This policy applies when you browse jeroenandpaws.com, submit
                an enquiry, use the customer portal or Jeroen &amp; Paws mobile
                app, make or manage a booking, receive care updates, or contact
                us. It does not govern third-party websites or services that
                have their own privacy notices.
              </p>
            </PolicySection>

            <PolicySection id="information" icon={Database} title="Information we collect">
              <PolicyList
                items={[
                  "Account and contact details, such as your name, email address, phone number, address, login identifier, and account status.",
                  "Dog and care information, including names, photos, breed, age, routines, behaviour, accessibility or medical notes, emergency instructions, and other details you provide so care can be delivered safely.",
                  "Booking and service information, such as requested services, dates, times, locations, notes, calendar entries, care updates, and booking history.",
                  "Photos and gallery content that you upload, or that we create and share while providing an agreed service.",
                  "Billing and transaction records, including invoices, payment status, amounts, and transaction references. Full payment-card details are handled by the payment provider and are not stored by us.",
                  "Messages and support information sent through forms, email, SMS, WhatsApp, or other channels you choose to use.",
                  "Technical and usage information, such as a randomly generated visitor ID stored locally, page or screen viewed, page title, referrer, session activity, IP-derived request information, device/browser details, and diagnostic or security logs.",
                ]}
              />
              <p>
                We receive information directly from you, automatically when
                you use our services, from Jeroen when care records are
                updated, and from connected providers when needed to complete a
                booking, communication, calendar sync, or payment.
              </p>
            </PolicySection>

            <PolicySection id="permissions" icon={Smartphone} title="Mobile app permissions">
              <p>
                The app may ask for device access only when a feature needs it.
                Depending on the version of the app and features you use, this
                can include:
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <PermissionCard
                  icon={Camera}
                  title="Camera & photos"
                  text="To add a dog profile image, upload care information, or share and save care updates. Only content you select or capture for the feature is processed."
                />
                <PermissionCard
                  icon={Mail}
                  title="Notifications"
                  text="To alert you about bookings, service updates, invoices, or account activity. You can turn notifications off in your device settings."
                />
              </div>
              <p className="mt-5">
                You can deny or revoke optional permissions in your device
                settings. The related feature may then be unavailable, but the
                rest of the app should continue to work. We do not access
                precise device location, contacts, microphone, or advertising
                identifiers unless a future feature clearly requests that
                access and this policy is updated first.
              </p>
            </PolicySection>

            <PolicySection id="use" icon={PawPrint} title="How we use information">
              <PolicyList
                items={[
                  "Provide accounts, bookings, personalised dog care, galleries, care updates, calendars, invoices, and customer support.",
                  "Respond to enquiries and arrange meet-and-greets, services, changes, and cancellations.",
                  "Send service messages, authentication emails, confirmations, reminders, and important account or safety notices.",
                  "Process and reconcile payments, maintain business records, and meet tax, accounting, insurance, and legal obligations.",
                  "Protect customers, dogs, staff, and services; prevent misuse; troubleshoot problems; and improve reliability and user experience.",
                  "Measure website usage with our first-party page-view system. We do not sell personal information or use it for third-party behavioural advertising.",
                ]}
              />
              <p>
                Where applicable under data-protection law, we rely on the
                performance of our contract with you, steps you ask us to take
                before a contract, compliance with legal obligations, our
                legitimate interests in operating and securing the service,
                consent where requested, and vital interests in an emergency.
              </p>
            </PolicySection>

            <PolicySection id="sharing" icon={UserRoundCheck} title="When information is shared">
              <p>
                We disclose only what is reasonably needed to providers that
                help us run the service. These may include Supabase for account,
                database, and storage services; Microsoft for email and calendar
                functions; Resend for account emails; Bird for SMS; and Revolut
                or other disclosed payment providers for payments and invoices.
                Those providers process information under their own terms and
                safeguards.
              </p>
              <p>
                Information may also be shared with professional advisers,
                insurers, emergency or veterinary contacts when necessary to
                protect welfare, and public authorities when required by law.
                If the business is reorganised or transferred, relevant records
                may transfer subject to appropriate confidentiality. We do not
                sell or rent your personal information.
              </p>
              <p>
                Some providers may process information outside Ireland or the
                European Economic Area. Where required, we use recognised
                transfer safeguards, such as an adequacy decision or approved
                contractual protections.
              </p>
            </PolicySection>

            <PolicySection id="retention" icon={LockKeyhole} title="Retention and security">
              <p>
                We keep information only for as long as it is needed for the
                purposes above. Enquiries that do not become bookings are
                periodically removed when no longer useful; active account and
                care records are generally retained while services continue;
                and transaction, tax, dispute, safety, or insurance records may
                be kept longer where law or legitimate business needs require.
                Backups and provider logs may take additional time to expire.
              </p>
              <p>
                We use access controls, authenticated accounts, encrypted
                connections, restricted administrative access, and reputable
                service providers to protect information. No internet or storage
                system can be guaranteed completely secure, so please use a
                unique password and contact us if you suspect unauthorised
                account activity.
              </p>
            </PolicySection>

            <PolicySection id="rights" icon={ShieldCheck} title="Your choices and rights">
              <p>
                Depending on your circumstances and applicable law, you may ask
                to access, correct, delete, restrict, or receive a portable copy
                of your personal information; object to certain processing; or
                withdraw consent. You may also complain to Ireland’s Data
                Protection Commission or your local supervisory authority.
              </p>
              <div className="mt-5 rounded-2xl bg-[#ece7f2] p-5 ring-1 ring-[#d9cfee]">
                <h3 className="font-extrabold text-[#21163a]">Account and data deletion</h3>
                <p className="mt-2">
                  Email <PrivacyEmail className="font-semibold text-[#6d28d9]" />
                  {" "}from the address linked to your account with the subject
                  “Delete my account”. Tell us if you want the account closed,
                  particular information deleted, or both. We may need to verify
                  your identity. We will remove or anonymise eligible data and
                  explain any information we must retain for legal, payment,
                  safety, or dispute purposes.
                </p>
              </div>
            </PolicySection>

            <PolicySection id="children" icon={UserRoundCheck} title="Children’s privacy">
              <p>
                The website, portal, and app are intended for adults arranging
                pet-care services and are not directed to children under 16. We
                do not knowingly create accounts for or collect personal
                information directly from children. If you believe a child has
                provided information, please contact us so we can review and
                delete it where appropriate.
              </p>
            </PolicySection>

            <PolicySection id="changes" icon={Mail} title="Changes and contact">
              <p>
                We may update this policy when our app, providers, or legal
                obligations change. The latest version will remain at this URL
                with a revised effective date; material changes may also be
                highlighted in the app or sent to account holders.
              </p>
              <p>
                For privacy questions or requests, contact Jeroen &amp; Paws at{" "}
                <PrivacyEmail className="font-semibold text-[#6d28d9]" /> or
                call{" "}
                <Link className="font-semibold text-[#6d28d9]" href={`tel:${businessInfo.phoneHref}`}>
                  {businessInfo.phoneDisplay}
                </Link>
                .
              </p>
            </PolicySection>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function PrivacyEmail({ className = "" }: { className?: string }) {
  return (
    <Link className={`break-all hover:underline ${className}`} href={`mailto:${businessInfo.email}`}>
      {businessInfo.email}
    </Link>
  );
}

function PolicySection({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article id={id} className="scroll-mt-28 rounded-3xl bg-white p-6 shadow-[0_18px_55px_rgba(33,22,58,0.07)] ring-1 ring-[#e5ded6] sm:p-8">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ece7f2] text-[#6d28d9]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-extrabold text-[#21163a] sm:text-3xl">{title}</h2>
      </div>
      <div className="mt-5 space-y-4 leading-7">{children}</div>
    </article>
  );
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b5cf6]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PermissionCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-[#f8f6f3] p-5 ring-1 ring-[#e5ded6]">
      <Icon className="h-6 w-6 text-[#7c3aed]" aria-hidden="true" />
      <h3 className="mt-3 font-extrabold text-[#21163a]">{title}</h3>
      <p className="mt-2 text-sm leading-6">{text}</p>
    </div>
  );
}
