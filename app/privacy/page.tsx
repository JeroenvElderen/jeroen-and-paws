import { businessInfo, labels } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { PageHero } from "@/components/site/sections/page-hero";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Jeroen & Paws uses contact, booking, and pet-care information submitted through the website.",
};

export default function PrivacyPage() {
  return (
    <SiteShell activePage="contact">
      <PageHero
        icon={labels.faq}
        label="Privacy"
        title="How your enquiry information is used"
        text="Jeroen & Paws only asks for details needed to reply to enquiries, prepare safe care plans, and arrange dog walking, training, day care, boarding, or home visits."
      />
      <section className="bg-[#111821] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-7 text-[#d8cab8]">
          <PolicyBlock title="Information collected">
            Contact forms may collect your name, email address, phone number,
            pet name, service interest, pet routine, behaviour notes, medication
            notes, availability, and any message you choose to send.
          </PolicyBlock>
          <PolicyBlock title="How it is used">
            This information is used to respond to your enquiry, assess whether
            a service is suitable, prepare a safe meet-and-greet, and
            communicate about requested care. It is not sold or shared for
            third-party marketing.
          </PolicyBlock>
          <PolicyBlock title="Email handling">
            Website enquiries are delivered to the Jeroen & Paws notification
            inbox. Your email address may be used as the reply-to address so
            Jeroen can respond directly.
          </PolicyBlock>
          <PolicyBlock title="Retention and updates">
            Enquiry and booking details are kept only as long as needed for
            care, administration, safety, and legal obligations. To request an
            update or deletion, contact {businessInfo.email}.
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
    <article className="motion-card motion-card-dark rounded-3xl bg-[#0b1017] p-7 ring-1 ring-white/10">
      <h2 className="text-2xl font-extrabold text-[#fff7e8]">{title}</h2>
      <p className="mt-3 leading-8">{children}</p>
    </article>
  );
}
