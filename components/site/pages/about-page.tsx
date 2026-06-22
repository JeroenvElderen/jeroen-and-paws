import { Coffee, Heart, Mountain, PawPrint, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "./home-page.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Care approach", href: "#my-story" },
  { label: "Contact", href: "/contact" },
];

const values = [
  {
    title: "Dogs first",
    text: "Your dog’s comfort and happiness always come first. We go at their pace.",
    icon: PawPrint,
  },
  {
    title: "Positive guidance",
    text: "Kind, practical support built around real life and your dog’s personality.",
    icon: Heart,
  },
  {
    title: "Reliable care",
    text: "Walking, training, day care, and boarding routines that keep your dog settled and supported.",
    icon: ShieldCheck,
  },
];

const personalNotes = [
  {
    title: "Outdoor lover",
    text: "Mountains, forests, and wide open spaces.",
    icon: PawPrint,
    src: "/images/dogs/Nola/Nola-1.jpg",
    alt: "A dog enjoying an outdoor walk in soft mountain light",
  },
  {
    title: "Coffee addict",
    text: "Good coffee fuels patient, focused days.",
    icon: Coffee,
    src: "/images/dogs/Johnny/Johnny.jpeg",
    alt: "Happy dog enjoying attentive care",
  },
  {
    title: "Adventurer",
    text: "Always up for the next trail, stroll, or enrichment walk.",
    icon: Mountain,
    src: "/images/dogs/lakta/lakta1.jpg",
    alt: "Dog walking through a natural outdoor trail",
  },
];

export function AboutPageContent() {
  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.aboutHero}>
        <Image
          src="/images/dogs/aslan/aslan.jpg"
          alt="Jeroen caring for a dog outdoors"
          fill
          priority
          sizes="100vw"
          className={styles.aboutHeroImage}
        />
        <div className={styles.aboutHeroOverlay} />
        <header className={styles.header}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Jeroen And Paws home"
          >
            <Image
              src="/logo3.svg"
              alt="Jeroen And Paws"
              width={150}
              height={89}
              priority
              className={styles.logo}
            />
          </Link>
          <nav className={styles.nav} aria-label="About page navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  item.label === "About" ? styles.activeNavLink : styles.navLink
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className={styles.headerButton}>
            Book a meet & greet <PawPrint aria-hidden="true" />
          </Link>
        </header>

        <div className={styles.aboutHeroContent}>
          <p className={styles.darkKicker}>About me</p>
          <h1>
            Hi, I’m <span>Jeroen.</span>
            <br />
            Dog trainer. Walker. Carer.
            <br />
            Dog lover.
          </h1>
          <p>
            I help dogs feel calm, understood, and cared for through positive
            training, enriching walks, and safe boarding. Every dog is supported
            at their own pace.
          </p>
          <Link href="#my-story" className={styles.primaryButton}>
            More about my care <PawPrint aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="my-story" className={styles.aboutStorySection}>
        <div className={styles.aboutStoryGrid}>
          <div className={styles.aboutStoryPhoto}>
            <Image
              src="/images/dogs/aslan/aslan.jpg"
              alt="A calm outdoor dog care moment in the mountains"
              fill
              sizes="(min-width: 900px) 540px, 100vw"
            />
          </div>
          <div className={styles.aboutStoryCopy}>
            <p className={styles.sectionKicker}>My story</p>
            <h2>
              Every dog needs care
              <br />
              built on <span>trust.</span>
            </h2>
            <p>
              My journey with dogs started with my own companion. I wanted to
              understand what makes dogs feel secure, confident, and happy—the
              routines, the communication, and the trust behind every good
              relationship.
            </p>
            <p>
              That passion grew into a mission: to help other dog parents give
              their dogs calm guidance, meaningful exercise, and dependable
              care.
            </p>
            <p>
              Today, I support dogs and their humans with training, walking, day
              care, and boarding shaped around each dog’s needs, pace, and
              personality.
            </p>
          </div>
        </div>
        <PawPrint className={styles.aboutStoryPaw} aria-hidden="true" />
      </section>
      
      <section className={styles.aboutValuesSection}>
        <div className={styles.aboutValuesGrid}>
          <div className={styles.aboutValuesIntro}>
            <p className={styles.darkKicker}>What matters to me</p>
            <h2>
              More than a service.
              <br />
              It’s about <span>connection.</span>
            </h2>
            <p>
              Great care happens when dogs feel safe and humans feel at ease.
              That’s why every walk, training session, and stay is calm,
              structured, and focused on what matters most—your dog’s wellbeing.
            </p>
          </div>
          <div className={styles.aboutValueCards}>
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className={styles.aboutValueCard}>
                  <Icon aria-hidden="true" />
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.aboutPersonalSection}>
        <div className={styles.aboutPersonalGrid}>
          <div className={styles.aboutPersonalIntro}>
            <p className={styles.sectionKicker}>Beyond the leash</p>
            <h2>
              A little more
              <br />
              about me.
            </h2>
            <p>
              When I’m not working with dogs, you’ll probably find me outdoors
              with my own dog, exploring new places and enjoying a quiet trail.
            </p>
            <p>
              I love nature, good coffee and road trips with no fixed
              destination.
            </p>
            <Link href="/contact" className={styles.secondaryButton}>
              Let’s talk care <PawPrint aria-hidden="true" />
            </Link>
          </div>
          {personalNotes.map((note) => {
            const Icon = note.icon;
            return (
              <article key={note.title} className={styles.aboutPersonalCard}>
                <div className={styles.aboutPersonalPhoto}>
                  <Image
                    src={note.src}
                    alt={note.alt}
                    fill
                    sizes="(min-width: 900px) 260px, 100vw"
                  />
                </div>
                <div className={styles.aboutPersonalMeta}>
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{note.title}</h3>
                    <p>{note.text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.aboutFinalCta}>
        <Image
          src="/images/dogs/kaiser/kaiser1.jpeg"
          alt="Dog looking across a misty mountain landscape"
          fill
          sizes="100vw"
          className={styles.aboutFinalImage}
        />
        <div className={styles.aboutFinalOverlay} />
        <div className={styles.aboutFinalContent}>
          <h2>
            Let’s create a care plan
            <br />
            <span>together.</span>
          </h2>
          <p>
            I’d love to hear about your dog and help you choose the support that
            fits them best.
          </p>
          <Link href="/contact" className={styles.primaryButton}>
            Book a meet & greet <PawPrint aria-hidden="true" />
          </Link>
        </div>
      </section>
      </main>
  );
}
