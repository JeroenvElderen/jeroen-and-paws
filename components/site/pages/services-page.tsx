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

const serviceCards = [
  {
    title: "Dog Walking",
    slug: "dog-walking",
    text: "Calm, enriching walks tailored to your dog's personality, routine, and energy.",
    note: "Solo walks • Photo updates • Tailored routines",
    src: "/images/dogs/Nola/Nola-1.jpg",
    icon: Mountain,
  },
  {
    title: "Home check-ins",
    slug: "home-check-ins",
    text: "Reassuring home visits to keep your dog comfortable, settled, and cared for while you're away.",
    note: "Flexible visits • Feeding • Regular updates",
    src: "/images/dogs/lola/lola1.jpeg",
    icon: Heart,
  },
  {
    title: "Dog Training",
    slug: "dog-training",
    text: "Positive, personalised training that builds confidence, communication, and lasting habits.",
    note: "Positive methods • Owner coaching • Behaviour support",
    src: "/images/dogs/kaiser/kaiser1.jpeg",
    icon: Camera,
  },
  {
    title: "Group Walks",
    slug: "group-walks",
    text: "Carefully matched group walks that encourage socialisation, confidence, and plenty of exploration.",
    note: "Carefully matched groups • Enrichment • Photo updates",
    src: "/images/dogs/Johnny/Johnny.jpeg",
    icon: PawPrint,
  },
  {
    title: "Daytime care",
    slug: "daytime-care-overnight-stays",
    text: "A calm, structured day filled with play, rest, enrichment, and plenty of individual attention.",
    note: "Play • Rest • Enrichment",
    src: "/images/dogs/lakta/lakta1.jpg",
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
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#080b10] px-6 py-24 sm:px-8 lg:py-32">
        <Image
          src="/images/dogs/aslan/aslan.jpg"
          alt="Dog training and care in a calm outdoor setting"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.94),rgba(8,11,16,.52),rgba(8,11,16,.2))]" />
        <div className="relative mx-auto max-w-6xl pt-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
            Services
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight text-[#fff7e8] sm:text-7xl">
            Care, tailored to <span className="text-[#a78bfa]">your dog&apos;s</span>{" "}
            needs.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#f5e9d5]">
            Whether your dog needs regular walks, home visits, day care, boarding, or training, every service is thoughtfully tailored to their personality, routine, and individual needs.
          </p>
          <ButtonLink href="/contact" className="mt-9">
            Book a Complimentary Meet &amp; Greet
          </ButtonLink>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
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
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.title}
                  href={`/services/${card.slug}`}
                  className="group overflow-hidden rounded-xl bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative h-48">
                    <Image
                      src={card.src}
                      alt={`${card.title} dog care service`}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="grid size-12 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]">
                      <Icon />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#4f4857]">
                      {card.text}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-[#7c3aed]">
                      {card.note}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#100d19] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
            What&apos;s included
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-5xl">
            More than dog care.{" "}
            <span className="text-[#a78bfa]">Peace of mind</span> included.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {included.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#8b5cf6]/20 bg-[#171f2a] p-6"
                >
                  <Icon className="text-[#a78bfa]" />
                  <h3 className="mt-4 font-semibold text-[#fff7e8]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#d8cab8]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#080b10] px-6 py-20 sm:px-8">
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

          {pricingSections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-28">
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
          ))}

          <GuaranteeBanner />
        </div>
      </section>

      <section className="grid bg-[#f7f4ef] text-[#1d1728] lg:grid-cols-2">
        <div className="px-6 py-20 sm:px-12 lg:px-20">
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
        <div className="relative min-h-[440px]">
          <Image
            src="/images/dogs/pancho/pancho2.jpeg"
            alt="Dog training and care consultation"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>
    </SiteShell>
  );
}
