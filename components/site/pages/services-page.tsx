import {
  CalendarDays,
  Camera,
  Heart,
  ImageIcon,
  MapPin,
  Mountain,
  PawPrint,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  customCarePlans,
  dayCareAndOvernightPlans,
  groupAdventurePlans,
  homeVisitPlans,
  trainingPlans,
  walksAndSoloAdventurePlans,
} from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import {
  GuaranteeBanner,
  PricingCards,
} from "@/components/site/sections/pricing-section";
import { ButtonLink } from "@/components/site/ui/button-link";
import { ScrollReveal } from "@/components/site/ui/scroll-reveal";

const serviceCards = [
  {
    title: "Dog Walking",
    slug: "dog-walking",
    text: "Calm, enriching walks tailored to your dog's personality, routine, and energy.",
    note: "Solo walks • Photo updates • Tailored routines",
    src: "/images/dogs/honey.jpg",
    imagePosition: "center 50%",
    icon: Mountain,
  },
  {
    title: "Home check-ins",
    slug: "home-check-ins",
    text: "Reassuring home visits to keep your dog comfortable, settled, and cared for while you're away.",
    note: "Flexible visits • Feeding • Regular updates",
    src: "/images/dogs/pancho.jpg",
    imagePosition: "center 80%",
    icon: Heart,
  },
  {
    title: "Dog Training",
    slug: "dog-training",
    text: "Positive, personalised training that builds confidence, communication, and lasting habits.",
    note: "Positive methods • Owner coaching • Behaviour support",
    src: "/images/dogs/rufus1.jpg",
    imagePosition: "center 68%",
    icon: Camera,
  },
  {
    title: "Group Walks",
    slug: "group-walks",
    text: "Carefully matched group walks that encourage socialisation, confidence, and plenty of exploration.",
    note: "Carefully matched groups • Enrichment • Photo updates",
    src: "/images/dogs/melaktacompass.jpeg",
    imagePosition: "center 80%",
    icon: PawPrint,
  },
  {
    title: "Daytime care",
    slug: "daytime-care-overnight-stays",
    text: "A calm, structured day filled with play, rest, enrichment, and plenty of individual attention.",
    note: "Play • Rest • Enrichment",
    src: "/images/dogs/millie.jpg",
    imagePosition: "center 45%",
    icon: PawPrint,
  },
  {
    title: "Overnight stays",
    slug: "daytime-care-overnight-stays",
    text: "A calm home-from-home stay where your dog can relax, settle, and feel part of the family.",
    note: "Home environment • Familiar routines • Daily updates",
    src: "/images/dogs/pancho/pancho1.jpeg",
    icon: CalendarDays,
  },
];

const included = [
  {
    title: "Meet & greet",
    text: "We take the time to get to know your dog's personality, routine, and individual needs before we begin.",
    icon: CalendarDays,
  },
  {
    title: "Tailored plan",
    text: "Every service is thoughtfully tailored to your dog's routine, personality, and lifestyle.",
    icon: MapPin,
  },
  {
    title: "Consistent care",
    text: "Calm, reliable routines that help your dog feel comfortable, confident, and settled.",
    icon: Camera,
  },
  {
    title: "Photo updates",
    text: "Regular updates and photos, so you always know how your dog's day is going.",
    icon: ImageIcon,
  },
  {
    title: "Ongoing support",
    text: "Questions before or after a booking? I'm always happy to help.",
    icon: Heart,
  },
];

const pricingSections = [
  {
    id: "walks-and-solo-adventures",
    eyebrow: "Walks & solo adventures",
    title: "Daily movement and one-to-one exploring.",
    description:
      "Choose anything from a neighbourhood stroll to a solo journey paced around your companion.",
    plans: walksAndSoloAdventurePlans,
  },
  {
    id: "home-visits",
    eyebrow: "Home check-ins",
    title: "Reassuring care at home.",
    description:
      "Drop-in visits cover essentials like water, food, toilet breaks, calm company, and updates.",
    plans: homeVisitPlans,
  },
  {
    id: "day-care-and-overnight-stays",
    eyebrow: "Day care & overnight stays",
    title: "Comfortable care for longer routines.",
    description:
      "Daytime care and overnight support keep your dog supervised, settled, and looked after.",
    plans: dayCareAndOvernightPlans,
  },
  {
    id: "group-adventures",
    eyebrow: "Group adventures",
    title: "Guided outings with gentle social time.",
    description:
      "Small-group adventure options give dogs time outdoors with structured interaction and rest.",
    plans: groupAdventurePlans,
  },
  {
    id: "training",
    eyebrow: "Training",
    title: "Positive support for real-life goals.",
    description:
      "Training sessions help with foundations, confidence, puppy skills, and steady behaviour reinforcement.",
    plans: trainingPlans,
  },
  {
    id: "custom-care",
    eyebrow: "Custom solutions",
    title: "Tailored help for unique needs.",
    description:
      "If your dog needs something outside the fixed cards, we can shape a plan around your schedule, goals, and care requirements.",
    plans: customCarePlans,
  },
];

export function ServicesPageContent() {
  return (
    <SiteShell activePage="services">
      <section className="premium-hero-orb relative isolate min-h-[calc(100svh-9rem)] overflow-hidden bg-[#080b10] px-5 py-12 sm:min-h-[calc(100svh-5rem)] sm:px-8 sm:py-24 lg:py-32">
        <Image
          src="/images/dogs/melaktacompass.jpeg"
          alt="Dog training and care in a calm outdoor setting"
          fill
          priority
          sizes="100vw"
          className="premium-hero-image object-cover object-[center_65%] opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.94),rgba(8,11,16,.52),rgba(8,11,16,.2))]" />
        <div className="relative mx-auto max-w-6xl pt-0 sm:pt-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
            Services
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-7xl">
            Care, tailored to <span className="text-[#a78bfa]">your dog&apos;s</span>{" "}
            needs.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#f5e9d5] sm:text-lg sm:leading-8">
            Whether your dog needs regular walks, home visits, day care, boarding, or training, every service is thoughtfully tailored to their personality, routine, and individual needs.
          </p>
          <ButtonLink href="/contact" className="mt-8 sm:mt-9">
            Book a Complimentary Meet &amp; Greet
          </ButtonLink>
        </div>
      </section>

      <section className="premium-cream-texture bg-[#f7f4ef] px-5 py-14 text-[#1d1728] sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
              SERVICES
            </p>
            <h2 className="mt-3 text-4xl font-semibold">
              Find the care that&apos;s{" "}
              <span className="text-[#7c3aed]">right</span> for your dog.
            </h2>
          </div>
          <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <ScrollReveal key={card.title} delay={index * 70} className="h-full">
                <Link
                  href={`/services/${card.slug}`}
                  className="motion-card motion-card-light group flex h-full flex-col overflow-hidden rounded-3xl border border-[#1d1728]/10 bg-white shadow-[0_18px_45px_rgba(31,23,32,0.12)] ring-1 ring-white/70"
                >
                  <div className="motion-media relative h-52 border-b border-[#1d1728]/10">
                    <Image
                      src={card.src}
                      alt={`${card.title} dog care service`}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      style={{
                        objectPosition: card.imagePosition ?? "center",
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="motion-icon grid size-12 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]">
                      <Icon />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#4f4857]">
                      {card.text}
                    </p>
                    <p className="mt-auto pt-5 text-sm font-semibold text-[#7c3aed]">
                      {card.note}
                    </p>
                  </div>
                </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="premium-dark-section bg-[#100d19] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
            What&apos;s included
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-5xl">
            More than dog care.{" "}
            <span className="text-[#a78bfa]">Peace of mind</span> included.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {included.map((item, index) => {
              const Icon = item.icon;

              return (
                <ScrollReveal key={item.title} delay={index * 70}>
                <div
                  className="motion-card motion-card-dark rounded-xl border border-[#8b5cf6]/20 bg-[#171f2a] p-6"
                >
                  <Icon className="motion-icon text-[#a78bfa]" />
                  <h3 className="mt-4 font-semibold text-[#fff7e8]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#d8cab8]">
                    {item.text}
                  </p>
                </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="premium-dark-section bg-[#080b10] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
              Full service menu
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[#fff7e8] sm:text-5xl">
              Every service and price option in one place.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-[#d8cab8]">
              Browse the complete care menu below, then book the card that best
              matches your dog’s routine or ask for a custom plan.
            </p>
          </div>

          {pricingSections.map((section, index) => (
            <ScrollReveal key={section.id} delay={index * 80}>
            <div id={section.id} className="scroll-mt-28">
              <div className="mb-8 max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
                  {section.eyebrow}
                </p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#fff7e8] sm:text-4xl">
                  {section.title}
                </h3>
                <p className="mt-3 leading-7 text-[#d8cab8]">
                  {section.description}
                </p>
              </div>
              <PricingCards plans={section.plans} />
            </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <GuaranteeBanner />
          </ScrollReveal>
        </div>
      </section>

      <section data-section-stack-spacing="none" className="premium-cream-texture grid bg-[#f7f4ef] text-[#1d1728] lg:grid-cols-2">
        <div className="px-5 py-14 sm:px-12 sm:py-20 lg:px-20">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
            HERE TO HELP
          </p>
          <h2 className="mt-4 text-5xl font-semibold leading-tight">
            Let&apos;s find the right care{" "}
            <span className="text-[#7c3aed]">for your dog</span>.
          </h2>
          <p className="mt-6 leading-8 text-[#4f4857]">
            Whether you&apos;re looking for walks, training, day care, or overnight care, we&apos;ll find the option that best suits your dog&apos;s routine, personality, and needs.
          </p>
          <ButtonLink href="/contact" className="mt-8">
            Book a meet &amp; greet
          </ButtonLink>
        </div>
        <ScrollReveal delay={120} className="premium-image-reveal relative min-h-[300px] sm:min-h-[440px]">
          <Image
            src="/images/dogs/pancho/pancho2.jpeg"
            alt="Dog training and care consultation"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ScrollReveal>
      </section>
    </SiteShell>
  );
}
