import { Camera, Heart, Mail, PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = ["Home", "About", "Portfolio", "Experience", "Contact"];

const portfolio = [
  { title: "Adventures", src: "/images/dogs/Nola/Nola-1.jpg" },
  { title: "Connection", src: "/images/dogs/Johnny/Johnny.jpeg" },
  { title: "Portraits", src: "/images/dogs/lakta/lakta1.jpg" },
  { title: "Stories", src: "/images/dogs/aslan/aslan.jpg" },
];

export function HomePage() {
  return (
    <main id="main-content" className="bg-[#faf9f7] text-[#171322]">
      <section className="relative min-h-[720px] overflow-hidden bg-[#171322] text-white">
        <Image
          src="/images/dogs/aslan/aslan.jpg"
          alt="Dog photography session in the mountains"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,18,.86)_0%,rgba(12,10,18,.46)_42%,rgba(12,10,18,.14)_100%)]" />
        <header className="relative z-10 mx-auto flex max-w-[1120px] items-center justify-between px-8 py-9">
          <Link href="/" className="font-['Brush_Script_MT',cursive] text-[30px] leading-6 tracking-wide text-white">
            Jeroen<br />And Paws
          </Link>
          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[.16em] md:flex">
            {navItems.map((item) => (
              <a key={item} href={item === "Home" ? "/" : `#${item.toLowerCase()}`} className={item === "Home" ? "border-b-2 border-[#8f55d9] pb-3" : "pb-3"}>
                {item}
              </a>
            ))}
            <a href="#contact" className="rounded-full bg-[#5d348b] px-8 py-4 text-white shadow-lg shadow-black/20">Book a session</a>
          </nav>
        </header>
        <div className="relative z-10 mx-auto max-w-[1120px] px-8 pt-28">
          <h1 className="max-w-[590px] font-serif text-[46px] leading-[1.13] tracking-[-.03em] sm:text-[64px]">
            Dog photography<br />for people who see<br />their dogs as <span className="font-['Brush_Script_MT',cursive] text-[70px] font-normal text-[#a567e3] sm:text-[82px]">family.</span>
          </h1>
          <p className="mt-8 max-w-[330px] text-[17px] leading-8 text-white/90">Natural, emotional photography across Ireland and the Netherlands.</p>
          <a href="#contact" className="mt-9 inline-flex items-center gap-5 rounded-[3px] bg-[#6b3ca0] px-8 py-5 text-[12px] font-extrabold uppercase tracking-[.14em] text-white">
            Book your session <PawPrint className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section id="about" className="relative px-8 py-[72px]">
        <div className="mx-auto grid max-w-[1120px] items-center gap-16 md:grid-cols-[1fr_.95fr]">
          <div className="relative h-[390px] overflow-hidden rounded-[3px] bg-[#ddd]">
            <Image src="/images/dogs/aslan/aslan.jpg" alt="Jeroen with a dog at sunset" fill className="object-cover" />
          </div>
          <div>
            <p className="mb-5 text-[13px] font-extrabold uppercase tracking-[.22em] text-[#7b48ac]">About me</p>
            <h2 className="font-serif text-[42px] leading-[1.08] tracking-[-.03em]">Every dog has a story<br />worth <span className="text-[#7b48ac]">remembering.</span></h2>
            <p className="mt-8 max-w-[470px] text-[16px] leading-8 text-[#171322]">I&apos;m Jeroen, a dog photographer with a passion for capturing real moments and the unique bond between dogs and their humans. My sessions are relaxed, natural and focused on what matters most — connection.</p>
            <a href="#contact" className="mt-8 inline-flex items-center gap-5 rounded-[3px] bg-[#5d348b] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[.14em] text-white">More about me <PawPrint className="h-4 w-4" /></a>
          </div>
        </div>
        <PawPrint className="absolute bottom-14 right-20 h-24 w-24 rotate-12 text-[#eadff2]" />
      </section>

      <section id="portfolio" className="bg-[#170d25] px-8 py-[70px] text-white">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div><p className="mb-5 text-[13px] font-bold uppercase tracking-[.22em]">Portfolio</p><h2 className="font-serif text-[39px] tracking-[-.03em]">Moments. Connection. Memories.</h2></div>
            <a href="#portfolio" className="hidden border border-white/35 px-7 py-4 text-[11px] font-extrabold uppercase tracking-[.14em] md:inline-flex">View full portfolio</a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {portfolio.map((card) => (
              <article key={card.title} className="relative h-[320px] overflow-hidden rounded-[4px]">
                <Image src={card.src} alt={`${card.title} gallery`} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-7 left-7"><h3 className="font-serif text-2xl">{card.title}</h3><p className="mt-4 text-[11px] font-extrabold uppercase tracking-[.15em]">See gallery →</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-8 py-[70px] text-center">
        <p className="text-[13px] font-extrabold uppercase tracking-[.22em] text-[#7b48ac]">The experience</p>
        <h2 className="mt-5 font-serif text-[38px] leading-[1.12]">A simple process,<br /><span className="italic text-[#7b48ac]">beautiful</span> results.</h2>
        <div className="mx-auto mt-14 grid max-w-[780px] gap-8 md:grid-cols-3">
          {[['Connect','We get to know you and your dog. We plan the perfect session for you both.'],['Session','A relaxed outdoor session where your dog can be themselves. No pressure, just fun.'],['Memories','Beautiful, timeless images you’ll cherish for a lifetime.']].map(([title,text], i)=>(
            <div key={title}><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#eee5f4] text-[#5d348b]">{i===0?<PawPrint/>:i===1?<Camera/>:<Heart/>}</div><p className="text-xs font-bold text-[#7b48ac]">0{i+1}</p><h3 className="font-serif text-xl">{title}</h3><p className="mt-3 text-sm leading-6">{text}</p></div>
          ))}
        </div>
      </section>

      <section className="relative min-h-[405px] overflow-hidden bg-[#170d25] px-8 py-24 text-white">
        <Image src="/images/dogs/kaiser/kaiser1.jpeg" alt="Expressive dog portrait" fill className="object-cover object-right opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#170d25] via-[#170d25]/85 to-[#170d25]/20" />
        <div className="relative mx-auto max-w-[1120px]"><p className="text-6xl text-[#8f55d9]">“</p><blockquote className="max-w-[470px] font-serif text-[28px] leading-[1.45]">Jeroen has a unique way of capturing the soul of your dog. The photos are absolutely breathtaking.</blockquote><p className="mt-8 text-[12px] font-bold uppercase tracking-[.16em]">— Marleen</p></div>
      </section>

      <footer id="contact" className="px-8 py-12">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 md:grid-cols-[1fr_1.2fr_1fr]">
          <div><p className="font-['Brush_Script_MT',cursive] text-3xl leading-6 text-[#6b3ca0]">Jeroen<br />And Paws</p><p className="mt-8 leading-7">Natural dog photography<br />across Ireland & the Netherlands.</p><div className="mt-8 flex gap-7 text-[#7b48ac]"><span>◎</span><span>f</span><Mail/></div></div>
          <div className="border-y border-[#d8cfe0] py-10 md:border-x md:border-y-0 md:px-16"><h2 className="font-serif text-[38px] leading-tight">Ready to capture<br />your story <span className="italic text-[#7b48ac]">together?</span></h2><p className="mt-5">Let’s create something beautiful.</p><a href="/contact" className="mt-7 inline-flex items-center gap-4 rounded-[3px] bg-[#5d348b] px-7 py-4 text-[11px] font-extrabold uppercase tracking-[.14em] text-white">Book your session <PawPrint className="h-4 w-4" /></a></div>
          <div className="relative h-44 overflow-hidden rounded-[3px]"><Image src="/images/dogs/aslan/aslan.jpg" alt="Dog session in mountains" fill className="object-cover" /></div>
        </div>
      </footer>
    </main>
  );
}
