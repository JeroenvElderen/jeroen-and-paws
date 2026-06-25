import {
  Camera,
  CheckCircle2,
  Heart,
  PawPrint,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

import { businessInfo, labels } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import {
  ContactForm,
  type SelectedServiceDetails,
} from "@/components/site/sections/contact-form";
import { ContactInfo } from "@/components/site/sections/contact-info";
import { ButtonLink } from "@/components/site/ui/button-link";
import { SectionLabel } from "@/components/site/ui/section-label";

const reassuranceItems = [
  {
    title: "Experienced",
    text: "Years of experience with dogs of all breeds, ages, and personalities.",
    icon: PawPrint,
  },
  {
    title: "Trusted",
    text: "Positive methods, patience, and a calm approach.",
    icon: Heart,
  },
  {
    title: "Professional",
    text: "High-quality care, updates, and attention to detail.",
    icon: Camera,
  },
  {
    title: "Safety first",
    text: "Your dog's comfort, wellbeing, and safety always come first.",
    icon: ShieldCheck,
  },
];

export function ContactPageContent({
  selectedService,
}: {
  selectedService?: SelectedServiceDetails;
}) {
  return (
    <SiteShell activePage="contact">
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#080b10] px-6 py-24 sm:px-8 lg:flex lg:items-center lg:py-28">
        <Image
          src="/images/dogs/Johnny/Johnny.jpeg"
          alt="Happy dog enjoying a calm outdoor session with Jeroen & Paws"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center] opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,0.96)_0%,rgba(8,11,16,0.78)_38%,rgba(8,11,16,0.28)_74%,rgba(8,11,16,0.66)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080b10] to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="max-w-xl">
            <SectionLabel icon={labels.process}>Get in touch</SectionLabel>
            <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-[-0.04em] text-[#fff7e8] sm:text-6xl lg:text-7xl">
              Let’s create something beautiful{" "}
              <span className="text-[#a78bfa]">together.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-white">
              Have a question or ready to book? I’d love to hear from you.
            </p>
            <ButtonLink href="#message" className="mt-9">
              Send a Message
            </ButtonLink>
          </div>
        </div>
      </section>

      <section
        id="message"
        className="bg-[#f8f6f2] px-6 py-20 text-[#241832] sm:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <ContactForm selectedService={selectedService} />
          <ContactInfo />
        </div>
      </section>
      
      <section className="relative overflow-hidden bg-[#160f25] px-6 py-16 text-center sm:px-8">
        <div className="absolute -right-12 bottom-0 text-[#8b5cf6]/10">
          <PawPrint aria-hidden="true" className="h-56 w-56" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-[#c4b5fd]">
            You and your dog are in good hands
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {reassuranceItems.map(({ title, text, icon: Icon }) => (
              <article
                key={title}
                className="border-[#8b5cf6]/25 px-6 md:border-l md:first:border-l-0"
              >
                <Icon
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 text-[#a78bfa]"
                />
                <h2 className="mt-6 text-sm font-extrabold uppercase tracking-[0.2em] text-white">
                  {title}
                </h2>
                <p className="mx-auto mt-4 max-w-48 text-sm leading-7 text-[#efe7ff]">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-[#080b10] lg:grid-cols-2">
        <div className="flex items-center px-6 py-16 sm:px-8 lg:justify-end lg:py-24">
          <div className="w-full max-w-xl lg:pr-16">
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#fff7e8] sm:text-5xl">
              Not sure where to start? Let’s{" "}
              <span className="text-[#a78bfa]">chat.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-[#f5ead8]">
              Every dog is different. A quick conversation helps me understand
              your needs and create the best experience for your dog.
            </p>
            <ul className="mt-8 space-y-3 text-sm font-semibold text-[#f5ead8]">
              {[
                "No obligation",
                "Friendly advice",
                "Tailored to you and your dog",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-4 w-4 text-[#a78bfa]"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={`https://wa.me/${businessInfo.whatsappNumber}`}
              className="mt-9"
            >
              Book a Free Chat
            </ButtonLink>
          </div>
        </div>
        <div className="relative min-h-[420px] lg:min-h-[560px]">
          <Image
            src="/images/dogs/pancho/pancho2.jpeg"
            alt="Dog sitting peacefully outdoors during a Jeroen & Paws care session"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080b10]/20 to-transparent" />
        </div>
      </section>
    </SiteShell>
  );
}
