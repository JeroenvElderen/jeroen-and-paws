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
} from "lucide-react";
import Image from "next/image";

import { SiteShell } from "@/components/site/layout/site-shell";
import { ButtonLink } from "@/components/site/ui/button-link";

const prepSteps = [
  [MessageCircle, "01", "Let's Connect", "We chat about your dog, your story, and what you're hoping to remember."],
  [PawPrint, "02", "Getting to Know Them", "I ask a few questions to understand your dog's personality and needs."],
  [MapPin, "03", "Plan the Perfect Session", "We choose the best location and time that suits your dog and brings your vision to life."],
  [CalendarDays, "04", "Tailored to Your Dog", "Every detail is planned around your dog's comfort so they can be their true self."],
] as const;

const values = [
  [PawPrint, "At their pace", "We go slow and let your dog feel comfortable."],
  [Heart, "Connection first", "Real moments and genuine interaction, not forced."],
  [Smile, "Natural & relaxed", "The best photos happen when everyone is relaxed."],
  [Camera, "Memories that last", "Honest, timeless images you'll cherish forever."],
] as const;

const locations = [
  [Trees, "Forests", "Woods, trails and peaceful escapes.", "/images/dogs/kaiser/kaiser2.jpeg"],
  [Mountain, "Mountains", "Breathtaking views and epic adventures.", "/images/dogs/aslan/aslan.jpg"],
  [Waves, "Beaches", "Wind, waves and happy paws.", "/images/dogs/lola/lola1.jpeg"],
  [Shell, "Hidden Spots", "Quiet places where your dog can be free.", "/images/dogs/Nola/nola2.jpg"],
] as const;

const flow = [
  [Heart, "Meet", "We say hello and your dog gets comfortable."],
  [PawPrint, "Walk", "We explore and enjoy the surroundings."],
  [Sparkles, "Play", "Time to play, sniff and be a dog."],
  [Mountain, "Explore", "New sights, smells and exciting moments."],
  [Camera, "Photos happen", "I capture the real, natural moments as they unfold."],
  [Bone, "Treats", "Rewards, cuddles and happy tails."],
  [Sun, "Sunset", "We end the day with beautiful light and full hearts."],
] as const;

const faqs = [
  "What if my dog doesn't listen?",
  "Can puppies or senior dogs join?",
  "Can reactive or nervous dogs participate?",
  "Can more than one dog be in the session?",
  "Where do sessions take place?",
];

export function ExperiencePageContent() {
  return (
    <SiteShell activePage="experience">
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#080b10] px-6 py-24 sm:px-8 lg:py-32">
        <Image src="/images/dogs/kaiser/kaiser1.jpeg" alt="A happy dog during a Jeroen and Paws outdoor experience" fill priority className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.94),rgba(8,11,16,.52),rgba(8,11,16,.2))]" />
        <div className="relative mx-auto max-w-6xl pt-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">The Jeroen & Paws experience</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-tight text-[#fff7e8] sm:text-7xl">More than beautiful care. An unforgettable day with <span className="text-[#a78bfa]">your dog.</span></h1>
          <p className="mt-7 max-w-md text-lg leading-8 text-[#f5e9d5]">From the first message to the final update, I&apos;m here to make the experience as special as the memories we create together.</p>
          <ButtonLink href="/contact" className="mt-9">Discover the experience</ButtonLink>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">Before the session</p>
          <h2 className="mt-3 text-4xl font-semibold">It starts with getting to<br />know <span className="text-[#7c3aed]">your dog.</span></h2>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {prepSteps.map(([Icon, number, title, text]) => <article key={title} className="relative"><div className="mx-auto grid size-16 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]"><Icon /></div><p className="mt-5 text-xs font-black text-[#8b5cf6]">{number}</p><h3 className="mt-2 font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#4f4857]">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="grid bg-[#100d19] lg:grid-cols-2">
        <div className="relative min-h-[440px]"><Image src="/images/dogs/Johnny/Johnny.jpeg" alt="A dog enjoying a calm outdoor adventure" fill className="object-cover" /></div>
        <div className="px-6 py-20 sm:px-12 lg:px-20">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">The day of the session</p>
          <h2 className="mt-4 text-5xl font-semibold leading-tight">No pressure.<br />No posing. No <span className="text-[#a78bfa]">stress.</span></h2>
          <p className="mt-6 max-w-xl leading-8 text-[#d8cab8]">This is your dog&apos;s adventure. They can sniff, run, play, explore and just be themselves. We follow their lead and take breaks whenever they need.</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">{values.map(([Icon,title,text])=><div key={title} className="flex gap-4"><Icon className="h-9 w-9 shrink-0 text-[#a78bfa]"/><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-[#d8cab8]">{text}</p></div></div>)}</div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto max-w-6xl text-center"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">Adventure together</p><h2 className="mt-3 text-4xl font-semibold">Beautiful places. <span className="text-[#7c3aed]">Real connection.</span></h2><div className="mt-10 grid gap-4 md:grid-cols-4">{locations.map(([Icon,title,text,img])=><article key={title} className="relative overflow-hidden rounded-xl text-left text-white"><Image src={img} alt={`${title} dog experience`} width={420} height={260} className="h-52 w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/><div className="absolute bottom-0 p-5"><Icon className="mb-3 text-[#c4b5fd]"/><h3 className="font-semibold">{title}</h3><p className="text-sm text-[#f5e9d5]">{text}</p></div></article>)}</div><p className="mt-8 text-[#4f4857]">Every location is chosen for one reason: to bring out the best in your dog.</p></div>
      </section>

      <section className="grid bg-[#100d19] lg:grid-cols-2"><div className="px-6 py-20 sm:px-12 lg:px-20"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">Experience that matters</p><h2 className="mt-4 text-5xl font-semibold leading-tight">Years of experience.<br />Hundreds of dogs.</h2><p className="mt-6 leading-8 text-[#d8cab8]">As a dog walker and trainer, I have years of hands-on experience with dogs of all breeds, ages and temperaments. This helps me create a safe, positive environment and capture the real essence of your dog.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{["Professional dog walker","Dog training background","Positive reinforcement","Body language understanding","Calm, patient approach","Safety always comes first"].map(item=><p key={item} className="flex items-center gap-2 text-sm text-[#f5e9d5]"><CheckCircle2 className="h-4 w-4 text-[#a78bfa]"/>{item}</p>)}</div></div><div className="relative min-h-[440px]"><Image src="/images/dogs/pancho/pancho2.jpeg" alt="Dogs walking together in a forest" fill className="object-cover" /></div></section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8"><div className="mx-auto max-w-6xl text-center"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">The session flow</p><h2 className="mt-3 text-4xl font-semibold">A day filled with <span className="text-[#7c3aed]">moments that matter.</span></h2><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-7">{flow.map(([Icon,title,text])=><article key={title}><div className="mx-auto grid size-14 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]"><Icon className="h-5 w-5"/></div><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#4f4857]">{text}</p></article>)}</div></div></section>

      <section className="grid bg-[#f7f4ef] text-[#1d1728] lg:grid-cols-[.9fr_1.1fr]"><div className="px-6 py-20 sm:px-12 lg:px-20"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">FAQ</p><h2 className="mt-3 text-4xl font-semibold">Questions <span className="text-[#7c3aed]">you</span> might have.</h2><div className="mt-8 divide-y divide-[#ddd5ca]">{faqs.map(q=><details key={q} className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between text-left font-medium">{q}<span className="text-[#7c3aed] group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-6 text-[#4f4857]">Yes — every plan is adapted around your dog&apos;s age, confidence, energy and needs before we begin.</p></details>)}</div></div><div className="relative min-h-[520px] overflow-hidden px-6 py-20 sm:px-12 lg:px-20"><Image src="/images/dogs/ollie/ollie1.jpeg" alt="A relaxed dog at golden hour" fill className="object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"/><div className="relative max-w-lg text-[#fff7e8]"><p className="text-xs font-black uppercase tracking-[0.35em] text-[#c4b5fd]">After the session</p><h2 className="mt-4 text-5xl font-semibold leading-tight">Your dog doesn&apos;t need to be perfect.<br />They just need to be <span className="text-[#c4b5fd]">themselves.</span></h2><ButtonLink href="/contact" className="mt-9">Book your experience</ButtonLink></div></div></section>
    </SiteShell>
  );
}