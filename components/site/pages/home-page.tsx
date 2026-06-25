import { Camera, Heart, PawPrint } from "lucide-react";
import Image from "next/image";

import { SiteShell } from "@/components/site/layout/site-shell";
import { ButtonLink } from "@/components/site/ui/button-link";

const portfolioCards = [
  { title: "Adventures", src: "/images/dogs/Nola/Nola-1.jpg" },
  { title: "Connection", src: "/images/dogs/Johnny/Johnny.jpeg" },
  { title: "Portraits", src: "/images/dogs/lakta/lakta1.jpg" },
  { title: "Stories", src: "/images/dogs/aslan/aslan.jpg" },
];

const steps = [
  [PawPrint, "01", "Connect", "We get to know you and your dog, then plan the right care or session for you both."],
  [Camera, "02", "Session", "A relaxed outdoor experience where your dog can be themselves. No pressure, just fun."],
  [Heart, "03", "Memories", "Beautiful updates, care, and images you can trust and remember."],
] as const;

export function HomePage() {
  return (
    <SiteShell activePage="home">
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#080b10] px-6 py-24 sm:px-8 lg:py-32">
        <Image src="/images/dogs/aslan/aslan.jpg" alt="Jeroen photographing a dog in the mountains" fill priority sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.94),rgba(8,11,16,.52),rgba(8,11,16,.2))]" />
        <div className="relative mx-auto max-w-6xl pt-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">Jeroen &amp; Paws</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight text-[#fff7e8] sm:text-7xl">Dog care and photography for people who see dogs as <span className="text-[#a78bfa]">family.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#f5e9d5]">Natural, calm, companion-first care with training, walks, day care, boarding, and memorable outdoor sessions shaped around your dog.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/contact">Book a Free Meet &amp; Greet</ButtonLink>
            <ButtonLink href="/experience" variant="outline">See the experience</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[440px] overflow-hidden rounded-xl shadow-2xl shadow-black/10"><Image src="/images/dogs/kaiser/kaiser1.jpeg" alt="A relaxed outdoor dog care session" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" /></div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">About the care</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">Every dog has a story worth <span className="text-[#7c3aed]">understanding.</span></h2>
            <p className="mt-6 leading-8 text-[#4f4857]">I help dogs feel calm, understood, and cared for through positive training, enriching walks, and safe boarding. Every dog is supported at their own pace.</p>
            <ButtonLink href="/about" className="mt-8">More about me</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-[#100d19] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">Portfolio</p><h2 className="mt-3 text-4xl font-semibold text-[#fff7e8] sm:text-5xl">Moments. Connection. <span className="text-[#a78bfa]">Memories.</span></h2></div><ButtonLink href="/experience" variant="outline">View experience</ButtonLink></div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">{portfolioCards.map((card) => <article key={card.title} className="relative min-h-72 overflow-hidden rounded-xl text-white"><Image src={card.src} alt={`${card.title} dog photography gallery`} fill sizes="(min-width: 1024px) 270px, 50vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-0 p-5"><h3 className="text-xl font-semibold">{card.title}</h3><p className="mt-2 text-sm text-[#f5e9d5]">See gallery →</p></div></article>)}</div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto max-w-6xl text-center"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">The process</p><h2 className="mt-3 text-4xl font-semibold">A simple process, <span className="text-[#7c3aed]">beautiful</span> results.</h2><div className="mt-14 grid gap-8 md:grid-cols-3">{steps.map(([Icon, number, title, text]) => <article key={title}><div className="mx-auto grid size-16 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]"><Icon /></div><p className="mt-5 text-xs font-black text-[#8b5cf6]">{number}</p><h3 className="mt-2 font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#4f4857]">{text}</p></article>)}</div></div>
      </section>
    </SiteShell>
  );
}
