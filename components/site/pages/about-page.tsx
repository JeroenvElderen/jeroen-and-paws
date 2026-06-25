import { Coffee, Heart, Mountain, PawPrint, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { SiteShell } from "@/components/site/layout/site-shell";
import { ButtonLink } from "@/components/site/ui/button-link";

const values = [
  [
    PawPrint,
    "Dogs first",
    "Your dog's comfort, confidence, and wellbeing always come first. Every experience moves at their pace.",
  ],
  [
    Heart,
    "Patient guidance",
    "Calm, practical support shaped around your dog's personality, routine, and individual needs.",
  ],
  [
    ShieldCheck,
    "Peace of mind",
    "Consistent care, clear communication, and regular updates, so you always know your dog is in safe hands.",
  ],
] as const;

const personalNotes = [
  [
    PawPrint,
    "Outdoors",
    "Fresh air, muddy boots, and dogs convinced we've only just started the walk.",
    "/images/dogs/Nola/Nola-1.jpg",
  ],
  [
    Coffee,
    "Coffee Enthusiast",
    "Powered by good coffee. Motivated by wagging tails. Usually in that order.",
    "/images/dogs/Johnny/Johnny.jpeg",
  ],
  [
    Mountain,
    "Adventure Seeker",
    "Always searching for the next trail. The dogs usually find it before I do.",
    "/images/dogs/lakta/lakta1.jpg",
  ],
] as const;

export function AboutPageContent() {
  return (
    <SiteShell activePage="about">
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#080b10] px-6 py-24 sm:px-8 lg:py-32">
        <Image
          src="/images/dogs/aslan/aslan.jpg"
          alt="Jeroen caring for a dog outdoors"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.94),rgba(8,11,16,.52),rgba(8,11,16,.2))]" />
        <div className="relative mx-auto max-w-6xl pt-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
            ABOUT JEROEN
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight text-[#fff7e8] sm:text-7xl">
            Hi, I’m <span className="text-[#a78bfa]">Jeroen</span>.
            Personalised care starts with getting to know every dog.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#f5e9d5]">
            Building trust takes time, and every dog deserves that time. I take a calm, personalised approach to every walk, visit, training session, and stay, creating an experience where dogs feel safe, understood, and genuinely cared for.
          </p>
          <ButtonLink href="/contact" className="mt-9">
            Book a Complimentary Meet &amp; Greet
          </ButtonLink>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[440px] overflow-hidden rounded-xl">
            <Image
              src="/images/dogs/kaiser/kaiser2.jpeg"
              alt="A calm outdoor dog care moment"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
              My story
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              Every dog needs care built on{" "}
              <span className="text-[#7c3aed]">trust.</span>
            </h2>
            <p className="mt-6 leading-8 text-[#4f4857]">
              My journey with dogs began with a simple belief: every dog deserves to feel safe, understood, and genuinely at ease. That belief led me to learn how trust is built—through patience, consistency, and understanding every dog&apos;s individual personality.
            </p>
            <p className="mt-4 leading-8 text-[#4f4857]">
              Today, those values shape everything I do. Whether we&apos;re out on a walk, working through training, or spending time together during day care or boarding, every experience is tailored to the dog in front of me.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#100d19] px-6 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
              MY APPROACH
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-5xl">
              More than a service. It&apos;s about {" "}
              <span className="text-[#a78bfa]">trust.</span>
            </h2>
            <p className="mt-6 leading-8 text-[#d8cab8]">
              Great care begins with trust. When dogs feel safe and understood, owners can leave with complete confidence. Every walk, training session, and stay is calm, consistent, and centred around your dog&apos;s wellbeing.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {values.map(([Icon, title, text]) => (
              <article
                key={title}
                className="rounded-xl border border-[#8b5cf6]/20 bg-[#171f2a] p-6"
              >
                <Icon className="text-[#a78bfa]" />
                <h3 className="mt-4 font-semibold text-[#fff7e8]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#d8cab8]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
              Beyond the leash
            </p>
            <h2 className="mt-3 text-4xl font-semibold">
              The person behind <span className="text-[#7c3aed]">Jeroen & Paws.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#4f4857]">
              When I&apos;m not caring for clients&apos; dogs, I&apos;m usually out exploring the Wicklow trails with my own dog. It&apos;s where I recharge—and where I&apos;m reminded why calm, enriching time outdoors matters so much to dogs.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {personalNotes.map(([Icon, title, text, src]) => (
              <article
                key={title}
                className="overflow-hidden rounded-xl bg-white shadow-xl shadow-black/5"
              >
                <div className="relative h-56">
                  <Image
                    src={src}
                    alt={`${title} dog care detail`}
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <Icon className="text-[#7c3aed]" />
                  <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4f4857]">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 text-[#fff7e8] sm:px-8">
        <Image
          src="/images/dogs/kaiser/kaiser1.jpeg"
          alt="Dog looking across a misty mountain landscape"
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/65" />
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl text-5xl font-semibold leading-tight">
            Let&apos;s get to know your dog.{" "}
            <span className="text-[#c4b5fd]">together.</span>
          </h2>
          <p className="mt-6 max-w-xl leading-8 text-[#f5e9d5]">
            Every great relationship starts with a conversation. Let&apos;s talk about your dog&apos;s personality, routine, and needs, and find the care that&apos;s right for them.
          </p>
          <ButtonLink href="/contact" className="mt-8">
            Book a Complimentary Meet &amp; Greet
          </ButtonLink>
        </div>
      </section>
    </SiteShell>
  );
}
