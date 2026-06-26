import {
  Bone,
  CalendarDays,
  Camera,
  CheckCircle2,
  Heart,
  MapPin,
  MessageCircle,
  Mountain,
  PawPrint,
  Shell,
  Smile,
  Sparkles,
  Sun,
  Trees,
  Waves,
  Flower2,
} from "lucide-react";
import Image from "next/image";

import { SiteShell } from "@/components/site/layout/site-shell";
import { ButtonLink } from "@/components/site/ui/button-link";

const prepSteps = [
  [
    MessageCircle,
    "01",
    "Meet & Greet",
    "We start with a relaxed conversation about your dog's routine, personality, and what matters most to you.",
  ],
  [
    PawPrint,
    "02",
    "Understanding Your Dog",
    "Together we learn what helps your dog feel confident, comfortable, and relaxed.",
  ],
  [
    MapPin,
    "03",
    "Create a Care Plan",
    "Every visit is planned around your dog's routine, energy level, and individual needs.",
  ],
  [
    CalendarDays,
    "04",
    "Tailored to Your Dog",
    "Every experience is personalised so your dog feels safe, relaxed, and completely at ease.",
  ],
] as const;

const values = [
  [PawPrint, "At their own pace", "Every dog is different, so every outing is too."],
  [
    Heart,
    "Trust first",
    "Strong relationships always come before routines.",
  ],
  [
    Smile,
    "Calm & confident",
    "Relaxed dogs learn, explore, and enjoy more.",
  ],
  [
    Camera,
    "Regular updates",
    "You'll receive thoughtful updates and photos throughout the visit, so you always know how your dog is getting on.",
  ],
] as const;

const locations = [
  [
    Trees,
    "Quiet Forest Trails",
    "Space to sniff, explore, and unwind.",
    "/images/dogs/kaiser/kaiser2.jpeg",
  ],
  [
    Waves,
    "Coastal Walks",
    "Fresh air, views, and plenty of smells.",
    "/images/dogs/aslan/aslan.jpg",
  ],
  [
    Flower2,
    "Open Meadows",
    "Room to run, play, and simply be a dog.",
    "/images/dogs/lola/lola1.jpeg",
  ],
  [
    Shell,
    "Secret Local Spots",
    "Calm places away from busy crowds.",
    "/images/dogs/Nola/nola2.jpg",
  ],
] as const;

const flow = [
  [
    Heart,
    "Arrive",
    "We take a moment to settle in, build trust, and let your dog feel comfortable.",
  ],
  [
    PawPrint,
    "Explore",
    "Following curious noses, quiet trails, and new places at your dog's own pace.",
  ],
  [
    Sparkles,
    "Play",
    "Whether it's chasing, sniffing, exploring, or simply being a dog.",
  ],
  [
    Camera,
    "Unscripted moments",
    "Natural memories captured without interrupting the adventure.",
  ],
  [
    Bone,
    "Reward",
    "Treats, water, cuddles, and a well-earned moment to recharge.",
  ],
  [
    Sun,
    "Relax",
    "A quiet pause before heading home, happy and fulfilled.",
  ],
  [
    Heart,
    "Home again",
    "A tired dog, a happy heart, and memories to take home.",
  ],
] as const;

const faqs = [
  {
    question: "What if my dog is nervous or reactive?",
    answer:
      "That's completely okay. Every session is tailored to your dog's confidence and comfort level. We take things slowly, never force interactions, and always work at their pace.",
  },
  {
    question: "Can puppies or senior dogs join?",
    answer:
      "Absolutely. Puppies, adult dogs, and seniors are all welcome. Every walk, training session, or stay is adapted to your dog's age, energy, mobility, and individual needs.",
  },
  {
    question: "Can more than one dog be included?",
    answer:
      "Yes. If your dogs live together, they can usually join the same session. During our meet & greet, we'll decide what works best for everyone's safety and enjoyment.",
  },
  {
    question: "Where do walks and sessions take place?",
    answer:
      "Locations are carefully chosen around your dog's personality, confidence, and the service you've booked. Quiet trails, parks, and familiar areas are always preferred over busy environments.",
  },
  {
    question: "What happens before the first booking?",
    answer:
      "We begin with a relaxed meet & greet. It's a chance to get to know each other, discuss your dog's routine, answer your questions, and make sure everyone feels comfortable before we start.",
  },
];

export function ExperiencePageContent() {
  return (
    <SiteShell activePage="experience">
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#080b10] px-6 py-16 sm:min-h-[calc(100svh-5rem)] sm:px-8 sm:py-24 lg:py-32">
        <Image
          src="/images/dogs/kaiser/kaiser1.jpeg"
          alt="A happy dog during a Jeroen and Paws outdoor experience"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.94),rgba(8,11,16,.52),rgba(8,11,16,.2))]" />
        <div className="relative mx-auto max-w-6xl pt-0 sm:pt-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
            The Jeroen & Paws experience
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-7xl">
            More than d care. An Experience{" "}
            <span className="text-[#a78bfa]">your dog </span>
            will look forward to.
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[#f5e9d5] sm:text-lg sm:leading-8">
            From our first conversation to the photo updates at the end of the day, every detail is designed to make you feel confident and your dog feel completely at home.
          </p>
          <ButtonLink href="/contact" className="mt-8 sm:mt-9">
            See what to expect
          </ButtonLink>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
            BEFORE WE BEGIN
          </p>
          <h2 className="mt-3 text-4xl font-semibold">
            Every great experience starts
            <br />
            with <span className="text-[#7c3aed]">understanding </span>
             your dog.
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {prepSteps.map(([Icon, number, title, text]) => (
              <article key={title} className="relative">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]">
                  <Icon />
                </div>
                <p className="mt-5 text-xs font-black text-[#8b5cf6]">
                  {number}
                </p>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#4f4857]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-[#100d19] lg:grid-cols-2">
        <div className="relative min-h-[440px]">
          <Image
            src="/images/dogs/Johnny/Johnny.jpeg"
            alt="A dog enjoying a calm outdoor adventure"
            fill
            className="object-cover"
          />
        </div>
        <div className="px-6 py-20 sm:px-12 lg:px-20">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
            THE DAY OF THE VISIT
          </p>
          <h2 className="mt-4 text-5xl font-semibold leading-tight">
            No rushing. No pressure. 
            <br />
            Just  <span className="text-[#a78bfa]">your dog&apos;s pace.</span>
          </h2>
          <p className="mt-6 max-w-xl leading-8 text-[#d8cab8]">
            Every visit is led by your dog&apos;s pace. Whether they want to explore, sniff, play, or simply enjoy a quiet walk, I adapt the experience to help them feel relaxed, confident, and happy.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {values.map(([Icon, title, text]) => (
              <div key={title} className="flex gap-4">
                <Icon className="h-9 w-9 shrink-0 text-[#a78bfa]" />
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-[#d8cab8]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
            Adventure together
          </p>
          <h2 className="mt-3 text-4xl font-semibold">
            The location matters.{" "}
            <span className="text-[#7c3aed]">Your dog decides the adventure.</span>
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {locations.map(([Icon, title, text, img]) => (
              <article
                key={title}
                className="relative overflow-hidden rounded-xl text-left text-white"
              >
                <Image
                  src={img}
                  alt={`${title} dog experience`}
                  width={420}
                  height={260}
                  className="h-52 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <Icon className="mb-3 text-[#c4b5fd]" />
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-[#f5e9d5]">{text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-[#4f4857]">
            Every location is chosen around your do&apos;s personality, confidence, and energy—never the other way around.
          </p>
        </div>
      </section>

      <section className="grid bg-[#100d19] lg:grid-cols-2">
        <div className="px-6 py-20 sm:px-12 lg:px-20">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
            Experience that matters
          </p>
          <h2 className="mt-4 text-5xl font-semibold leading-tight">
            Experience you can trust.
            <br />
            Care your dog will feel.
          </h2>
          <p className="mt-6 leading-8 text-[#d8cab8]">
            Every dog is different. Years of hands-on experience with dogs of all breeds, ages, and personalities helps me adapt my approach to each individual dog—creating calm, safe, and enjoyable experiences every time.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Years of hands-on experience",
              "Positive reinforcement methods",
              "Calm, patient handling",
              "Understanding canine body language",
              "Safe introductions & group management",
              "Fully tailored to every dog",
            ].map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-sm text-[#f5e9d5]"
              >
                <CheckCircle2 className="h-4 w-4 text-[#a78bfa]" />
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="relative min-h-[440px]">
          <Image
            src="/images/dogs/pancho/pancho2.jpeg"
            alt="Dogs walking together in a forest"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
            The session flow
          </p>
          <h2 className="mt-3 text-4xl font-semibold">
            Every outing{" "}
            <span className="text-[#7c3aed]">unfolds naturally.</span>
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-7">
            {flow.map(([Icon, title, text]) => (
              <article key={title}>
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4f4857]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-[#f7f4ef] text-[#1d1728] lg:grid-cols-[.9fr_1.1fr]">
  <div className="px-6 py-20 sm:px-12 lg:px-20">
    <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
      Frequently Asked Questions
    </p>

    <h2 className="mt-3 text-4xl font-semibold leading-tight">
      Everything <span className="text-[#7c3aed]">you</span> need to know.
    </h2>

    <p className="mt-5 max-w-xl text-base leading-7 text-[#5d5667]">
      Still have a question? Here are the answers to the things I&apos;m asked most
      often before a first booking.
    </p>

    <div className="mt-10 divide-y divide-[#ddd5ca]">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold">
            <span>{faq.question}</span>

            <span className="text-2xl font-light text-[#7c3aed] transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#5d5667]">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  </div>

  <div className="relative min-h-[520px] overflow-hidden px-6 py-20 sm:px-12 lg:px-20">
    <Image
      src="/images/dogs/ollie/ollie1.jpeg"
      alt="A relaxed dog after a day of adventure"
      fill
      className="object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

    <div className="relative z-10 max-w-lg text-[#fff7e8]">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-[#c4b5fd]">
        Ready to get started?
      </p>

      <h2 className="mt-4 text-5xl font-semibold leading-tight">
        Every great relationship starts with{" "}
        <span className="text-[#c4b5fd]">one conversation.</span>
      </h2>

      <p className="mt-6 text-lg leading-8 text-[#f4ede3]/90">
        Book a relaxed meet & greet and let&apos;s create a care plan that&apos;s tailored
        to your dog, your routine, and your peace of mind.
      </p>

      <ButtonLink href="/contact" className="mt-8 sm:mt-10">
        Book a meet & greet
      </ButtonLink>
    </div>
  </div>
</section>
    </SiteShell>
  );
}
