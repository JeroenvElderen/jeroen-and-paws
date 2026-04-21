export type HeroSectionOne = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: Array<{ label: string; value: string }>;
  heroImage: { src: string; alt: string };
};

export const sectionOne: HeroSectionOne = {
  eyebrow: "Trusted Pet Care",
  title: "Best Pals for Your Paw Pals",
  subtitle:
    "Your trusted partner in pet care, offering tailored services to ensure the health, happiness, and well-being of your beloved furry companions.",
  primaryCta: { label: "Book Now", href: "/#contact" },
  secondaryCta: { label: "Book Now", href: "/services" },
  stats: [
    { label: "Happy families", value: "2k+" },
    { label: "Pets cared for", value: "9k+" },
    { label: "Years of experience", value: "10+" },
  ],
  heroImage: {
    src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    alt: "Happy dog outdoors during a personal walk session",
  },
};

export type HomepageSectionTwoCard = {
  title: string;
  description: string;
  iconBg: string;
  href: string;
  icon: "walk" | "day" | "overnight" | "training" | "custom" | "adventure";
  image: string;
};

export type HomepageSectionTwo = {
  cards: HomepageSectionTwoCard[];
};

export const sectionTwo: HomepageSectionTwo = {
  cards: [
    {
      title: "Pet Training",
      description: "We offer training classes to improve your pet's behavior and strengthen your bond.",
      icon: "walk",
      iconBg: "#c4b5fd",
      href: "/services",
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Veterinary Care",
      description: "Our experienced vets provide top-notch medical care to keep your furry friend healthy.",
      icon: "day",
      iconBg: "#7c3aed",
      href: "/services",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Pet Boarding",
      description: "Leave your pet with us while you're away, knowing they'll receive love and attention.",
      icon: "overnight",
      iconBg: "#b794f6",
      href: "/services",
      image: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Dog Walking",
      description: "Our trained walkers ensure your dog gets the exercise they need to stay happy.",
      icon: "training",
      iconBg: "#a78bfa",
      href: "/services",
      image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Grooming & Spa",
      description: "Pamper your pet with our grooming services, leaving them looking and feeling their best.",
      icon: "custom",
      iconBg: "#b8a3e8",
      href: "/services",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Pet Sitting",
      description: "Trust us to care for your pet in the comfort of their own home when you can't be there.",
      icon: "adventure",
      iconBg: "#9f7aea",
      href: "/services",
      image: "https://images.unsplash.com/photo-1537151672256-6caf2e9f8c95?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

export type HomepageSectionThreeVisual = {
  title: string;
  image: { src: string; alt: string };
};

export type HomepageSectionThreeFirstVisual = HomepageSectionThreeVisual & {
  paragraphs: string[];
  cta: { label: string; href: string };
};

export type HomepageSectionThreeSecondVisual = HomepageSectionThreeVisual & {
  intro: string;
  highlights: string[];
  footerPrefix: string;
  footerAccent: string;
  footerSuffix: string;
};

export type HomepageSectionThree = {
  visuals: [HomepageSectionThreeFirstVisual, HomepageSectionThreeSecondVisual];
};

export type HomepageSectionFour = {
  title: string;
  phoneLabel: string;
  phoneNumber: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type HomepageSectionFiveMember = {
  name: string;
  role: string;
  quote: string;
  image: { src: string; alt: string; bgColor: string };
};

export type HomepageSectionFive = {
  title: string;
  subtitle: string;
  members: HomepageSectionFiveMember[];
};

export type HomepageSectionSix = {
  title: string;
  logos: Array<{ src: string; alt: string }>;
};

export type HomepageSectionSeven = {
  quickLinks: Array<{ label: string; href: string }>;
  socialLinks: Array<{ label: string; href: string }>;
  contactLines: string[];
  newsletterTitle: string;
  newsletterBody: string;
};

export const sectionThree: HomepageSectionThree = {
  visuals: [
    {
      title: "We are Dedicated to the Well-Being of Your Beloved Pets",
      paragraphs: [
        "PetPals is more than just a pet care center — we're a family of passionate animal lovers.",
        "With years of experience, our team is committed to providing the highest quality care and services to your furry, feathered, or scaled companions.",
        "Your pet's happiness and health are our top priorities, and we treat them with the same love and care as if they were our own.",
      ],
      cta: { label: "About Us", href: "/#about" },
      image: {
        src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=80",
        alt: "White dog smiling on a pink background",
      },
    },
    {
      title: "Our Values",
      intro: "WELCOME TO P E T P A L S, B U D D I E S !",
      highlights: [
        "Compassion — We approach every pet with empathy and kindness, ensuring their comfort and well-being.",
        "Excellence — We strive for excellence in all we do, from medical care to daily service.",
        "Trust — Your trust is paramount, and we work tirelessly to maintain it.",
        "Community — We're proud to support the local pet-loving community.",
      ],
      footerPrefix: "Our promise:",
      footerAccent: "loving, reliable, and professional care",
      footerSuffix: "for every pet every day.",
      image: {
        src: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1200&q=80",
        alt: "Rabbit on a blue background",
      },
    },
  ],
};

export const sectionFour: HomepageSectionFour = {
  title: "Ready to Give Your Pet the Best Care? Contact Us Today!",
  phoneLabel: "Call us",
  phoneNumber: "1-800-PET-CARE",
  primaryCta: { label: "Call Us Now", href: "/#contact" },
  secondaryCta: { label: "Call Us Now", href: "/#contact" },
};

export const sectionFive: HomepageSectionFive = {
  title: "Real Stories from PetPals Families",
  subtitle: "Feedback from families who trust us with their beloved companions.",
  members: [
    {
      name: "Sarah L.",
      role: "Pet parent",
      quote: "PetPals exceeded my expectations. Their pet sitting service was truly exceptional. Thanks to their dedicated care and attention.",
      image: {
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
        alt: "Portrait of a smiling pet owner",
        bgColor: "#d6bcfa",
      },
    },
    {
      name: "Michael R.",
      role: "Dog owner",
      quote:
        "I can't praise PetPals' grooming team enough. They transformed my dog into a furry superstar and made my pup feel truly pampered.",
      image: {
        src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
        alt: "Portrait of a happy dog owner",
        bgColor: "#c4b5fd",
      },
    },
    {
      name: "Jennifer M.",
      role: "Pet owner",
      quote: "PetPals' veterinarians are absolute gems and showed immense compassion for my aging dog.",
      image: {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
        alt: "Portrait of a dog owner",
        bgColor: "#c4b5fd",
      },
    },
  ],
};

export const sectionSix: HomepageSectionSix = {
  title: "Our Partners",
  logos: [
    { src: "https://images.unsplash.com/photo-1601758125946-2e8d4a0a9a8f?auto=format&fit=crop&w=400&q=80", alt: "Partner logo one" },
    { src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80", alt: "Partner logo two" },
    { src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80", alt: "Partner logo three" },
    { src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80", alt: "Partner logo four" },
  ],
};

export const sectionSeven: HomepageSectionSeven = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/#about" },
    { label: "Contact Us", href: "/#contact" },
  ],
  socialLinks: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
  contactLines: ["123 PetCare Avenue, Cityville, USA", "1-800-PET-CARE", "Info@petpals.com"],
  newsletterTitle: "Join Our Pet Loving Community",
  newsletterBody: "Subscribe to Our Newsletter and Our Updates for Pet Tips and Care",
};
