import { CheckCircle2, Clock3, Database, Mail, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";

import { businessInfo } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";

export const metadata = {
  title: "Delete Your Account",
  description:
    "How to request deletion of your Jeroen & Paws account and associated personal data.",
};

const deletionEmail = `mailto:${businessInfo.email}?subject=${encodeURIComponent("Delete my account")}&body=${encodeURIComponent("Hello Jeroen & Paws,\n\nPlease delete my account and associated personal data.\n\nThe email address or phone number linked to my account is: \n\nThank you.")}`;

export default function DeleteAccountPage() {
  return (
    <SiteShell activePage="contact">
      <main>
        <section className="premium-hero-orb relative isolate overflow-hidden bg-[#080b10] px-5 py-16 sm:px-8 sm:py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.24),transparent_32%),radial-gradient(circle_at_15%_85%,rgba(167,139,250,0.12),transparent_28%)]" />
          <div className="mx-auto max-w-4xl">
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.24em] text-[#a78bfa]">
              <ShieldCheck className="size-5" aria-hidden="true" />
              Jeroen &amp; Paws account privacy
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#fff7e8] sm:text-6xl">
              Request account
              <span className="block text-[#a78bfa]">and data deletion.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8cab8]">
              You can request deletion of your Jeroen &amp; Paws customer account
              and the personal data associated with it at any time.
            </p>
          </div>
        </section>

        <section className="premium-cream-texture bg-[#f8f6f3] px-5 py-12 text-[#2f2a3d] sm:px-8 sm:py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <section className="rounded-3xl border border-[#ded7e5] bg-white p-6 shadow-sm sm:p-9" aria-labelledby="request-steps">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#ede9fe] text-[#6d28d9]">
                  <Trash2 className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 id="request-steps" className="text-2xl font-extrabold text-[#21163a]">How to request deletion</h2>
                  <ol className="mt-5 space-y-4 leading-7">
                    <li><strong>1.</strong> Email Jeroen &amp; Paws at <Link className="font-semibold text-[#6d28d9] underline underline-offset-4" href={`mailto:${businessInfo.email}`}>{businessInfo.email}</Link> with the subject <strong>“Delete my account”.</strong></li>
                    <li><strong>2.</strong> Send the request from the email address linked to your account. If you registered by phone, include that phone number in your message.</li>
                    <li><strong>3.</strong> State that you want your account and associated data deleted. We may reply to verify that the account belongs to you before acting.</li>
                  </ol>
                  <Link href={deletionEmail} className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-[#6d28d9] px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-violet-900/15 transition hover:bg-[#5b21b6]">
                    <Mail className="size-5" aria-hidden="true" /> Email your deletion request
                  </Link>
                </div>
              </div>
            </section>

            <div className="grid gap-6 md:grid-cols-2">
              <DataCard
                icon={CheckCircle2}
                title="Data we delete or anonymise"
                items={[
                  "Your customer account and login credentials",
                  "Profile and contact details",
                  "Dog profiles, care notes, and uploaded photos",
                  "Booking details, private galleries, messages, and app data that are not required for an ongoing legal or business obligation",
                ]}
              />
              <DataCard
                icon={Database}
                title="Data we may need to keep"
                items={[
                  "Invoices, payment references, and transaction records required for tax and accounting",
                  "Records needed for a legal claim, dispute, fraud prevention, safety, or insurance obligation",
                  "A minimal record of the request and its completion",
                ]}
              />
            </div>

            <section className="rounded-3xl bg-[#21163a] p-6 text-[#e7ddf4] sm:p-9" aria-labelledby="timing">
              <div className="flex items-start gap-4">
                <Clock3 className="mt-1 size-7 shrink-0 text-[#c4b5fd]" aria-hidden="true" />
                <div>
                  <h2 id="timing" className="text-2xl font-extrabold text-white">Timing and retention</h2>
                  <p className="mt-4 leading-7">
                    We aim to acknowledge your request within 7 days and complete eligible deletion within 30 days after any required identity verification. Data that must be retained for legal, tax, accounting, insurance, safety, or dispute purposes will be kept only for the applicable required period and then deleted or anonymised. Residual copies in protected backups may remain until the normal backup cycle expires.
                  </p>
                </div>
              </div>
            </section>

            <p className="text-center text-sm leading-6 text-[#655d70]">
              Deleting your account is permanent and may remove access to bookings,
              invoices, and galleries. For more information, read our{" "}
              <Link href="/privacy" className="font-semibold text-[#6d28d9] underline underline-offset-4">privacy policy</Link>.
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

function DataCard({ icon: Icon, title, items }: { icon: typeof Database; title: string; items: string[] }) {
  return (
    <section className="rounded-3xl border border-[#ded7e5] bg-white p-6 sm:p-8">
      <Icon className="size-7 text-[#6d28d9]" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-extrabold text-[#21163a]">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm leading-6 text-[#574f61]">
        {items.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#8b5cf6]" />{item}</li>)}
      </ul>
    </section>
  );
}
