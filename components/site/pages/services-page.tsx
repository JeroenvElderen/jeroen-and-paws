import {
  customCarePlans,
  dailyStrollPlans,
  daytimeCarePlans,
  groupAdventurePlans,
  homeVisitPlans,
  labels,
  overnightSupportPlans,
  soloJourneyPlans,
  trainingPlans,
} from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { CtaSection } from "@/components/site/sections/cta-section";
import { PageHero } from "@/components/site/sections/page-hero";
import {
  PricingCards,
  GuaranteeBanner,
} from "@/components/site/sections/pricing-section";
import { ProcessSection } from "@/components/site/sections/process-section";
import { SectionHeader } from "@/components/site/sections/section-header";
import { ServiceArea } from "@/components/site/sections/service-area";

const serviceSections = [
  {
    icon: labels.dog,
    label: "Daily Strolls",
    title: "Daily strolls from 30 to 60 minutes",
    text: "Choose a standard 30-minute stroll or an extended 60-minute stroll for movement, enrichment, and neighbourhood exploring.",
    plans: dailyStrollPlans,
    background: "bg-[#111821]",
  },
  {
    icon: labels.homeVisit,
    label: "Home Visits",
    title: "Essential and extended home visits",
    text: "Fresh water, feeding, outdoor breaks, calm interaction, and reassurance when your companion needs care at home.",
    plans: homeVisitPlans,
    background: "bg-[#080b10]",
  },
  {
    icon: labels.daytimeCare,
    label: "Daytime Care",
    title: "Half-day and full-day daytime care",
    text: "Relaxed daytime stays with gentle activity, enrichment, rest, attention, and calm supervision.",
    plans: daytimeCarePlans,
    background: "bg-[#111821]",
  },
  {
    icon: labels.overnight,
    label: "Overnight Support",
    title: "Calm overnight stays",
    text: "Overnight care in a calm home setting with familiar routines, cosy spaces, and peace of mind.",
    plans: overnightSupportPlans,
    background: "bg-[#080b10]",
  },
  {
    icon: labels.groupAdventure,
    label: "Group Adventures",
    title: "2-hour, half-day, and full-day adventures",
    text: "Guided group outings with movement, gentle social engagement, purposeful play, varied walks, and downtime.",
    plans: groupAdventurePlans,
    background: "bg-[#111821]",
  },
  {
    icon: labels.soloJourney,
    label: "Solo Journeys",
    title: "Half-day and full-day solo journeys",
    text: "One-to-one journeys paced around your companion, from half-day outings to full-day exploring.",
    plans: soloJourneyPlans,
    background: "bg-[#080b10]",
  },
  {
    icon: labels.training,
    label: "Training",
    title: "Introductory, standard, puppy, and extended training",
    text: "Focused one-to-one training support for foundations, puppies, behaviour reinforcement, slower pacing, and unique goals.",
    plans: trainingPlans,
    background: "bg-[#111821]",
  },
  {
    icon: labels.customCare,
    label: "Custom Care",
    title: "One custom and tailored care card",
    text: "All custom and tailored requests are grouped into one flexible option for unique routines, specialist needs, behaviour support, and bespoke plans.",
    plans: customCarePlans,
    background: "bg-[#080b10]",
  },
];

export function ServicesPageContent() {
  return (
    <SiteShell activePage="services">
      <PageHero
        icon={labels.services}
        label="Our services"
        title="Pick the perfect fit"
        text="Explore fixed Jeroen & Paws services as individual cards, with one flexible custom and tailored care card for unique routines, goals, and specialist needs."
      />
      {serviceSections.map(({ icon, label, title, text, plans, background }) => (
        <section key={label} className={`${background} px-6 py-20 sm:px-8`}>
          <div className="mx-auto max-w-6xl">
            <SectionHeader icon={icon} label={label} title={title} text={text} />
            <PricingCards plans={plans} />
          </div>
        </section>
      ))}
      <section className="bg-[#111821] px-6 py-16 sm:px-8">
        <GuaranteeBanner />
      </section>
      <section className="bg-[#111821] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.process}
            label="How It Works"
            title="A calm start for every companion"
            text="A thoughtful meet-and-greet helps Jeroen understand your dog’s routine, personality, and needs before care begins."
          />
          <ProcessSection />
        </div>
      </section>
      <section className="bg-[#080b10] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.area}
            label="Service Area"
            title="Complete care for your companion"
            text="From energising walks to reassuring overnight stays, each service is shaped around your companion’s routine and personality."
          />
          <ServiceArea />
        </div>
      </section>
      <CtaSection
        title="Welcome to your companion’s second home"
        text="Reach out and let’s explore the walking, training, day care, boarding, or custom options that suit your dog best."
      />
    </SiteShell>
  );
}
