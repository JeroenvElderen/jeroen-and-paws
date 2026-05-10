import { bookingPolicies, businessInfo, labels } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { PageHero } from "@/components/site/sections/page-hero";

export const metadata = {
  title: "Terms of Service",
  description:
    "Booking notes, care expectations, and service policies for Jeroen & Paws dog walking, training, day care, boarding, and home visits.",
};

export default function TermsPage() {
  return (
    <SiteShell activePage="contact">
      <PageHero
        icon={labels.faq}
        label="Terms"
        title="Booking notes and care expectations"
        text="These practical notes help every service begin with clear expectations, safe routines, and calm communication."
      />
      <section className="bg-[#111821] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-7">
          <article className="rounded-3xl bg-[#0b1017] p-7 ring-1 ring-white/10">
            <h2 className="text-2xl font-extrabold text-[#fff7e8]">
              Booking policies
            </h2>
            <ul className="mt-5 space-y-3 text-[#d8cab8]">
              {bookingPolicies.map((policy) => (
                <li key={policy} className="rounded-2xl bg-[#111821] px-5 py-4">
                  {policy}
                </li>
              ))}
            </ul>
          </article>
          <PolicyBlock title="Meet-and-greet first">
            New recurring care, boarding, day care, and training requests
            usually begin with a free meet-and-greet so Jeroen can understand
            your dog’s personality, routine, and safety needs.
          </PolicyBlock>
          <PolicyBlock title="Health and safety">
            Owners should share accurate vaccination, medication, veterinary,
            reactivity, behaviour, and emergency-contact details before care
            begins. Services may be adjusted if a plan is not safe for your dog,
            Jeroen, or other companions.
          </PolicyBlock>
          <PolicyBlock title="Changes and availability">
            Availability is confirmed by appointment. Please share schedule
            changes, cancellations, or special requests as early as possible.
            Final quotes may vary by distance, dates, duration, number of dogs,
            and additional care requirements.
          </PolicyBlock>
          <PolicyBlock title="Contact">
            Questions about these terms can be sent to {businessInfo.email} or
            by calling {businessInfo.phoneDisplay}.
          </PolicyBlock>
        </div>
      </section>
    </SiteShell>
  );
}

function PolicyBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-3xl bg-[#0b1017] p-7 text-[#d8cab8] ring-1 ring-white/10">
      <h2 className="text-2xl font-extrabold text-[#fff7e8]">{title}</h2>
      <p className="mt-3 leading-8">{children}</p>
    </article>
  );
}
