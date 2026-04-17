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
  eyebrow: "Safe and caring hands",
  title: "Your Pet Deserves the Best Care",
  subtitle: "Boutique-level dog care in Amsterdam with trusted professionals and tailored routines.",
  primaryCta: { label: "Order Services", href: "/services" },
  secondaryCta: { label: "Call Us", href: "tel:+31000000000" },
  stats: [
    { label: "Happy families", value: "450+" },
    { label: "Satisfaction", value: "4.9/5" },
    { label: "Care support", value: "24/7" },
  ],
  heroImage: {
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    alt: "Golden retriever smiling during a guided outdoor walk",
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
      title: "Daily Strolls",
      description: "Structured walks for exercise, fresh air, and calm enrichment.",
      icon: "walk",
      iconBg: "#8cc8f7",
      href: "/services",
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Daytime Care",
      description: "Reliable daytime supervision with rest, routine, and play.",
      icon: "day",
      iconBg: "#ff6436",
      href: "/services",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Overnight Care",
      description: "Comfortable overnight stays with a steady home-like rhythm.",
      icon: "overnight",
      iconBg: "#f4bd35",
      href: "/services",
      image: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Training Support",
      description: "Focused sessions for behaviour, confidence, and progress.",
      icon: "training",
      iconBg: "#56c6d9",
      href: "/services",
      image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Bespoke Plans",
      description: "Flexible care designed around your timing and pet needs.",
      icon: "custom",
      iconBg: "#97c8a2",
      href: "/services",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Adventure Walks",
      description: "Half-day or full-day outings for curious, active companions.",
      icon: "adventure",
      iconBg: "#ab95e9",
      href: "/services",
      image: "https://images.unsplash.com/photo-1537151672256-6caf2e9f8c95?auto=format&fit=crop&w=800&q=80",
    },
  ],
};