import { CalendarDays, Camera, Heart, ImageIcon, MapPin, Mountain, PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "./home-page.module.css";

const navItems = ["Home", "About", "Services", "experience", "Contact"];

const serviceCards = [
  {
    title: "Daily strolls",
    text: "Personalised walks matched to your companion's pace, personality, and routine.",
    note: "Solo walks, routine-friendly care, and photos updates.",
    src: "/images/dogs/Nola/Nola-1.jpg",
    icon: Mountain,
  },
  {
    Title: "Training help",
    text: "Supportive guidance to build good habits and boost your companion's confidence.",
    note: "Positive methods, behaviour goals, and owner support",
    src: "/image/s/dogs/kaiser/kaiser1.jpeg",
    icon: Camera,
  },
  {
    title: "Group adventures",
    text: "Fun, confidence-building outings where companions explore and play together.",
    note: "Social play, safe packs, and adventure routes.",
    src: "/images/dogs/Johnny/Johnny.jpeg",
    icon: PawPrint,
  },
  {
    title: "Daytime care",
    text: "Stimulating, reassuring days perfect for companions who love company.",
    note: "Playtime, rest breaks, and a structured day.",
    src: "/images/dogs/lakta/lakta1.jpg",
    icon: PawPrint,
  },
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
    <main id="main-content" className={styles.page}>
      <section className={styles.servicesHero}>
        <Image
          src="/images/dogs/aslan/aslan.jpg"
          alt="Dog training and care in a calm outdoor setting"
          fill 
          priority
          sizes="100vw"
          className={styles.servicesHeroImage}
        />
        <div className={styles.servicesHeroOverlay} />
        <header className={styles.header}>
          <Link href="/" className={styles.logoLink} aria-label="Jeroen and Paws home">
            <Image src="/logo3.svg" alt="Jeroen and Paws" width={150} height={89} priority className={styles.logo} />
          </Link>
          <nav className={styles.nav} aria-label="Services navigation">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : item === "Services" ? "/services" : item === "About me" ? "/about" : item === "Questions" ? "/#questions" : `/${item.toLowerCase()}`}
                className={item === "Services" ? styles.activeNavLink : styles.navLink}
              >
                {item}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className={styles.headerButton}>Book a meet & greet <PawPrint aria-hidden="true" /></Link>
        </header>
        
        <div className={styles.servicesHeroContent}>
          <p className={styles.darkKicker}>Our services</p>
          <h1>Exceptional care for <span>every</span><br />dog and every <span>routine.</span></h1>
          <p>From personalised training and engaging walks to reassuring day care, boarding, and home check-ins, every service is shaped around your companion’s needs.</p>
          <Link href="/contact" className={styles.primaryButton}>Book a meet & greet <PawPrint aria-hidden="true" /></Link>
        </div>
      </section>

      <section className={styles.servicesCardsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.servicesIntro}>
            <p className={styles.sectionKicker}>Choose your care</p>
            <h2>Services designed around<br /><span>you</span> and your dog.</h2>
          </div>
          <div className={styles.servicesCardGrid}>
            {serviceCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className={styles.serviceCardMock}>
                  <div className={styles.serviceCardImage}>
                    <Image src={card.src} alt={`${card.title} dog care service`} fill sizes="(min-width: 1024px) 270px, 100vw" />
                  </div>
                  <div className={styles.serviceIcon}><Icon aria-hidden="true" /></div>
                  <div className={styles.serviceCardBody}>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <p className={styles.serviceNote}>{card.note}</p>
                    <Link href="/contact">Learn more <span aria-hidden="true">→</span></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.includedSection}>
        <PawPrint className={styles.includedPaw} aria-hidden="true" />
        <div className={styles.sectionInner}>
          <div className={styles.includedHeading}>
            <p className={styles.darkKicker}>What’s included</p>
            <h2>More than just dog care.<br />A calm <span>experience</span> you can trust.</h2>
          </div>
          <div className={styles.includedGrid}>
            {included.map((item) => {
              const Icon = item.icon;
              return <div key={item.title} className={styles.includedItem}><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></div>;
            })}
          </div>
        </div>
      </section>

      <section className={styles.servicesFinalSection}>
        <div className={styles.servicesFinalGrid}>
          <div>
            <p className={styles.sectionKicker}>Not sure yet?</p>
            <h2>Let’s talk about what <span>your dog needs</span>.</h2>
            <p>Considering training, walks, day care, or boarding? I’m here to help your dog feel understood, supported, and set up for success.</p>
            <Link href="/contact" className={styles.primaryButton}>Contact me <PawPrint aria-hidden="true" /></Link>
          </div>
          <div className={styles.servicesFinalImage}>
            <Image src="/images/dogs/aslan/aslan.jpg" alt="Dog training and care consultation" fill sizes="(min-width: 1024px) 670px, 100vw" />
          </div>
        </div>
      </section>
    </main>
  );
}