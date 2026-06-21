import { Camera, Heart, Mail, PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "./home-page.module.css";

const navItems = ["Home", "About", "Portfolio", "Experience", "Contact"];

const portfolioCards = [
  { title: "Adventures", src: "/images/dogs/Nola/Nola-1.jpg" },
  { title: "Connection", src: "/images/dogs/Johnny/Johnny.jpeg" },
  { title: "Portraits", src: "/images/dogs/lakta/lakta1.jpg" },
  { title: "Stories", src: "/images/dogs/aslan/aslan.jpg" },
];

const steps = [
  {
    title: "Connect",
    text: "We get to know you and your dog. We plan the perfect session for you both.",
    icon: PawPrint,
  },
  {
    title: "Session",
    text: "A relaxed outdoor session where your dog can be themselves. No pressure, just fun.",
    icon: Camera,
  },
  {
    title: "Memories",
    text: "Beautiful, timeless images you’ll cherish for a lifetime.",
    icon: Heart,
  },
];

export function HomePage() {
  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/images/dogs/aslan/aslan.jpg"
          alt="Jeroen photographing a dog in the mountains"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <header className={styles.header}>
          <Link href="/" className={styles.logoLink} aria-label="Jeroen And Paws home">
            <Image
              src="/logo3.svg"
              alt="Jeroen And Paws"
              width={150}
              height={89}
              priority
              className={styles.logo}
            />
          </Link>
          <nav className={styles.nav} aria-label="Homepage navigation">
            {navItems.map((item) => (
              <a
                key={item}
                href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                className={item === "Home" ? styles.activeNavLink : styles.navLink}
              >
                {item}
              </a>
            ))}
          </nav>
          <a href="#contact" className={styles.headerButton}>
            Book a session
          </a>
        </header>

        <div className={styles.heroContent}>
          <h1>
            Dog photography
            <br />
            for people who see
            <br />
            their dogs as <span>family.</span>
          </h1>
          <p>Natural, emotional photography across Ireland and the Netherlands.</p>
          <a href="#contact" className={styles.primaryButton}>
            Book your session <PawPrint aria-hidden="true" />
          </a>
        </div>
      </section>

      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutPhoto}>
            <Image
              src="/images/dogs/aslan/aslan.jpg"
              alt="A relaxed outdoor dog photography session at sunset"
              fill
              sizes="(min-width: 768px) 540px, 100vw"
            />
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.sectionKicker}>About me</p>
            <h2>
              Every dog has a story
              <br />
              worth <span>remembering.</span>
            </h2>
            <p>
              I&apos;m Jeroen, a dog photographer with a passion for capturing real moments
              and the unique bond between dogs and their humans. My sessions are relaxed,
              natural and focused on what matters most — connection.
            </p>
            <a href="#contact" className={styles.secondaryButton}>
              More about me <PawPrint aria-hidden="true" />
            </a>
          </div>
        </div>
        <PawPrint className={styles.aboutPaw} aria-hidden="true" />
      </section>

      <section id="portfolio" className={styles.portfolioSection}>
        <div className={styles.sectionInner}>
          <div className={styles.portfolioHeading}>
            <div>
              <p className={styles.darkKicker}>Portfolio</p>
              <h2>Moments. Connection. Memories.</h2>
            </div>
            <a href="#portfolio" className={styles.outlineButton}>
              View full portfolio <PawPrint aria-hidden="true" />
            </a>
          </div>
          <div className={styles.portfolioGrid}>
            {portfolioCards.map((card) => (
              <article key={card.title} className={styles.portfolioCard}>
                <Image src={card.src} alt={`${card.title} dog photography gallery`} fill sizes="(min-width: 1024px) 270px, 50vw" />
                <div className={styles.cardShade} />
                <div className={styles.cardText}>
                  <h3>{card.title}</h3>
                  <p>See gallery <span aria-hidden="true">→</span></p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className={styles.experienceSection}>
        <p className={styles.sectionKicker}>The experience</p>
        <h2>
          A simple process,
          <br />
          <span>beautiful</span> results.
        </h2>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className={styles.stepCard}>
                <div className={styles.stepIcon}>
                  <Icon aria-hidden="true" />
                </div>
                <p className={styles.stepNumber}>0{index + 1}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.testimonialSection}>
        <Image
          src="/images/dogs/kaiser/kaiser1.jpeg"
          alt="Soulful dog portrait"
          fill
          sizes="100vw"
          className={styles.testimonialImage}
        />
        <div className={styles.testimonialOverlay} />
        <div className={styles.testimonialContent}>
          <p className={styles.quoteMark}>“</p>
          <blockquote>
            Jeroen has a unique way of capturing the soul of your dog. The photos are
            absolutely breathtaking.
          </blockquote>
          <p className={styles.quoteAuthor}>— Marleen</p>
          <div className={styles.dots} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <footer id="contact" className={styles.footerSection}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Image src="/logo3.svg" alt="Jeroen And Paws" width={112} height={66} className={styles.footerLogo} />
            <p>Natural dog photography across Ireland &amp; the Netherlands.</p>
            <div className={styles.socials}>
              <span aria-hidden="true">◎</span>
              <span aria-hidden="true">f</span>
              <Mail aria-hidden="true" />
            </div>
          </div>
          <div className={styles.footerCta}>
            <h2>
              Ready to capture
              <br />
              your story <span>together?</span>
            </h2>
            <p>Let’s create something beautiful.</p>
            <Link href="/contact" className={styles.primaryButton}>
              Book your session <PawPrint aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.footerPhoto}>
            <Image src="/images/dogs/aslan/aslan.jpg" alt="Dog photography session in the mountains" fill sizes="320px" />
          </div>
        </div>
      </footer>
    </main>
  );
}
