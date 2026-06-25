import { CalendarDays, Camera, Heart, ImageIcon, MapPin, Mountain, PawPrint } from "lucide-react";
import Image from "next/image";

import { SiteShell } from "@/components/site/layout/site-shell";
import { ButtonLink } from "@/components/site/ui/button-link";

const serviceCards = [
  { title: "Daily strolls", text: "Personalised walks matched to your companion's pace, personality, and routine.", note: "Solo walks, routine-friendly care, and photo updates.", src: "/images/dogs/Nola/Nola-1.jpg", icon: Mountain },
  { title: "Training help", text: "Supportive guidance to build good habits and boost your companion's confidence.", note: "Positive methods, behaviour goals, and owner support.", src: "/images/dogs/kaiser/kaiser1.jpeg", icon: Camera },
  { title: "Group adventures", text: "Fun, confidence-building outings where companions explore and play together.", note: "Social play, safe packs, and adventure routes.", src: "/images/dogs/Johnny/Johnny.jpeg", icon: PawPrint },
  { title: "Daytime care", text: "Stimulating, reassuring days perfect for companions who love company.", note: "Playtime, rest breaks, and a structured day.", src: "/images/dogs/lakta/lakta1.jpg", icon: PawPrint },
];

const included = [
  { title: "Meet & greet", text: "We get to know your dog's personality, routine, and needs.", icon: CalendarDays },
  { title: "Tailored plan", text: "Care and training are shaped around your companion.", icon: MapPin },
  { title: "Structured care", text: "Walks, training, daycare, and boarding stay calm and consistent.", icon: Camera },
  { title: "Photo updates", text: "Clear updates help you know your dog is happy and safe.", icon: ImageIcon },
  { title: "Ongoing support", text: "Guidance continues before, during, and after each booking.", icon: Heart },
];

export function ServicesPageContent() {
  return (
    <SiteShell activePage="services">
      <section className="relative isolate min-h-[620px] overflow-hidden bg-[#080b10] px-6 py-24 sm:px-8 lg:py-32">
        <Image src="/images/dogs/aslan/aslan.jpg" alt="Dog training and care in a calm outdoor setting" fill priority sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.94),rgba(8,11,16,.52),rgba(8,11,16,.2))]" />
        <div className="relative mx-auto max-w-6xl pt-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">Our services</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight text-[#fff7e8] sm:text-7xl">Exceptional care for <span className="text-[#a78bfa]">every</span> dog and every routine.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#f5e9d5]">From personalised training and engaging walks to reassuring day care, boarding, and home check-ins, every service is shaped around your companion’s needs.</p>
          <ButtonLink href="/contact" className="mt-9">Book a meet &amp; greet</ButtonLink>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto max-w-6xl"><div className="text-center"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">Choose your care</p><h2 className="mt-3 text-4xl font-semibold">Services designed around <span className="text-[#7c3aed]">you</span> and your dog.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{serviceCards.map((card) => { const Icon = card.icon; return <article key={card.title} className="overflow-hidden rounded-xl bg-white shadow-xl shadow-black/5"><div className="relative h-48"><Image src={card.src} alt={`${card.title} dog care service`} fill sizes="(min-width: 1024px) 270px, 100vw" className="object-cover" /></div><div className="p-6"><div className="grid size-12 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]"><Icon /></div><h3 className="mt-5 text-xl font-semibold">{card.title}</h3><p className="mt-3 text-sm leading-6 text-[#4f4857]">{card.text}</p><p className="mt-4 text-sm font-semibold text-[#7c3aed]">{card.note}</p></div></article>; })}</div></div>
      </section>

      <section className="bg-[#100d19] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">What’s included</p><h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-5xl">More than dog care. A calm <span className="text-[#a78bfa]">experience</span> you can trust.</h2><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">{included.map((item) => { const Icon = item.icon; return <div key={item.title} className="rounded-xl border border-[#8b5cf6]/20 bg-[#171f2a] p-6"><Icon className="text-[#a78bfa]" /><h3 className="mt-4 font-semibold text-[#fff7e8]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#d8cab8]">{item.text}</p></div>; })}</div></div>
      </section>

      <section className="grid bg-[#f7f4ef] text-[#1d1728] lg:grid-cols-2"><div className="px-6 py-20 sm:px-12 lg:px-20"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">Not sure yet?</p><h2 className="mt-4 text-5xl font-semibold leading-tight">Let’s talk about what <span className="text-[#7c3aed]">your dog needs</span>.</h2><p className="mt-6 leading-8 text-[#4f4857]">Considering training, walks, day care, or boarding? I’m here to help your dog feel understood, supported, and set up for success.</p><ButtonLink href="/contact" className="mt-8">Contact me</ButtonLink></div><div className="relative min-h-[440px]"><Image src="/images/dogs/pancho/pancho2.jpeg" alt="Dog training and care consultation" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div></section>
    </SiteShell>
  );
}
