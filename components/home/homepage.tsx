import Image from "next/image";
import Link from "next/link";
import { Check, CircleDot, Quote, ShieldCheck, Sparkles, Star } from "lucide-react";

import {
  sectionFive,
  sectionFour,
  sectionOne,
  sectionSeven,
  sectionSix,
  sectionThree,
  sectionTwo,
} from "@/lib/data/homepage-data";

export function Homepage() {
  const [storyOne, storyTwo] = sectionThree.visuals;

  return (
    <div className="premium-shell px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-[92rem] gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-[#2b1848] via-[#1d1231] to-[#130c22] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] sm:p-12">
          <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#8b5cf6]/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-4 h-52 w-52 rounded-full bg-[#ff5f93]/15 blur-3xl" />

          <p className="relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#fae9ff]">
            <Sparkles className="h-3.5 w-3.5" />
            {sectionOne.eyebrow}
          </p>

          <h1 className="relative mt-6 max-w-xl text-4xl font-black leading-tight text-white sm:text-6xl">{sectionOne.title}</h1>
          <p className="relative mt-5 max-w-2xl text-lg text-[#dec5ff] sm:text-xl">{sectionOne.subtitle}</p>

          <div className="relative mt-8 flex flex-wrap gap-4">
            <Link href={sectionOne.primaryCta.href} className="rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] px-8 py-3 text-base font-bold text-white">
              {sectionOne.primaryCta.label}
            </Link>
            <Link href={sectionOne.secondaryCta.href} className="rounded-full border border-white/35 bg-white/5 px-8 py-3 text-base font-bold text-[#f4e9ff]">
              View services
            </Link>
          </div>

          <div className="relative mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            {sectionOne.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/5 px-4 py-4">
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="text-sm text-[#d8beff]">{stat.label}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="grid gap-6">
          <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/20">
            <Image src={sectionOne.heroImage.src} alt={sectionOne.heroImage.alt} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11081d] via-[#11081d55] to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#1e1233]/85 p-4 backdrop-blur">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#e4cbff]"><ShieldCheck className="h-4 w-4" /> Trusted by local families</p>
              <p className="mt-2 text-lg font-semibold text-white">Reliable, insured and human-first pet care.</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-[#1b112d]/90 p-6">
            <h2 className="text-xl font-extrabold text-white">Care commitments</h2>
            <ul className="mt-4 grid gap-3 text-[#dfc6ff]">
              {[
                "Real-time photo and walk updates",
                "Meet-and-greet before first booking",
                "Flexible plans for weekdays and weekends",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 text-[#a78bfa]" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section id="services" className="mx-auto mt-6 w-full max-w-[92rem] rounded-[2rem] border border-white/15 bg-[#140d23]/80 p-7 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d6b9ff]">What we do</p>
            <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">New service layout, easier to scan</h2>
          </div>
          <Link href="/services" className="text-sm font-semibold text-[#c7a7ff]">See all services →</Link>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sectionTwo.cards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#21143a]/80">
              <div className="relative h-44">
                <Image src={card.image} alt={card.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#d9c0ff]">{card.description}</p>
                <Link href={card.href} className="mt-4 inline-flex text-sm font-semibold text-[#bc97ff]">Learn more →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto mt-6 grid w-full max-w-[92rem] gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-white/15 bg-[#150e25]/80 p-7 sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d8bcff]">About us</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">{storyOne.title}</h2>
          {storyOne.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[#ddc6ff]">{paragraph}</p>
          ))}
          <Link href={storyOne.cta.href} className="mt-6 inline-flex rounded-full border border-white/25 px-6 py-2.5 font-semibold text-[#f6ecff]">{storyOne.cta.label}</Link>
        </article>

        <article className="grid gap-6">
          <div className="relative min-h-[16rem] overflow-hidden rounded-[2rem] border border-white/15">
            <Image src={storyOne.image.src} alt={storyOne.image.alt} fill className="object-cover" />
          </div>
          <div className="rounded-[2rem] border border-white/15 bg-[#150e25]/80 p-7">
            <h3 className="text-2xl font-extrabold text-white">{storyTwo.title}</h3>
            <p className="mt-2 text-sm text-[#ddc5ff]">{storyTwo.intro}</p>
            <ul className="mt-4 space-y-2 text-sm text-[#ddc5ff]">
              {storyTwo.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2"><CircleDot className="mt-1 h-4 w-4 text-[#a78bfa]" />{highlight}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="mx-auto mt-6 w-full max-w-[92rem] rounded-[2rem] border border-white/15 bg-gradient-to-r from-[#311a53] to-[#1a1130] p-8 text-center sm:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#e5cfff]">Contact</p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">{sectionFour.title}</h2>
        <p className="mt-4 text-xl text-[#e4cbff]">{sectionFour.phoneLabel}: <span className="font-bold text-white">{sectionFour.phoneNumber}</span></p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={sectionFour.primaryCta.href} className="rounded-full bg-white px-8 py-3 font-bold text-[#2a1846]">{sectionFour.primaryCta.label}</Link>
          <Link href={sectionFour.secondaryCta.href} className="rounded-full border border-white/30 px-8 py-3 font-bold text-white">Email Team</Link>
        </div>
      </section>

      <section id="reviews" className="mx-auto mt-6 w-full max-w-[92rem] rounded-[2rem] border border-white/15 bg-[#140d23]/80 p-7 sm:p-10">
        <h2 className="text-3xl font-black text-white">{sectionFive.title}</h2>
        <p className="mt-2 text-[#dcc4ff]">{sectionFive.subtitle}</p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {sectionFive.members.map((member) => (
            <article key={member.name} className="rounded-[1.4rem] border border-white/15 bg-[#201438] p-5">
              <p className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#8b5cf6]/20 text-[#cfb4ff]"><Quote className="h-4 w-4" /></p>
              <p className="mt-4 text-sm text-[#e3ceff]">{member.quote}</p>
              <p className="mt-4 font-bold text-white">{member.name}</p>
              <p className="text-xs text-[#bda0ec]">{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="mx-auto mt-6 w-full max-w-[92rem] rounded-[2rem] border border-white/15 bg-[#130c22]/85 p-7 sm:p-10">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <h3 className="text-lg font-extrabold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#ddc5ff]">
              {sectionSeven.quickLinks.map((link) => (
                <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Social</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#ddc5ff]">
              {sectionSeven.socialLinks.map((link) => (
                <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Partners</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {sectionSix.logos.map((logo) => (
                <div key={logo.alt} className="relative h-20 overflow-hidden rounded-xl border border-white/15">
                  <Image src={logo.src} alt={logo.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Stay in touch</h3>
            <p className="mt-3 text-sm text-[#ddc5ff]">{sectionSeven.newsletterBody}</p>
            <button type="button" className="mt-4 rounded-full bg-[#8b5cf6] px-5 py-2.5 text-sm font-semibold text-white">Subscribe</button>
            <p className="mt-4 text-xs text-[#bda0ec] inline-flex items-center gap-2"><Star className="h-3.5 w-3.5" /> Premium updates every week</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
