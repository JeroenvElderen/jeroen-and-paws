export type HeroSectionOne = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const sectionOne: HeroSectionOne = {
  eyebrow: "Safe and caring hands",
  title: "Your Pet Deserves the Best Care",
  subtitle: "We offer professional dog care services in Amsterdam.",
  primaryCta: { label: "Order Services", href: "/services" },
  secondaryCta: { label: "Call Us", href: "tel:+31000000000" },
};

export type HomepageSectionTwoCard = {
  title: string;
  description: string;
  iconBg: string;
  href: string;
  icon: "walk" | "day" | "overnight" | "training" | "custom" | "adventure";
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
    },
    {
      title: "Daytime Care",
      description: "Reliable daytime supervision with rest, routine, and play.",
      icon: "day",
      iconBg: "#ff6436",
      href: "/services",
    },
    {
      title: "Overnight Care",
      description: "Comfortable overnight stays with a steady home-like rhythm.",
      icon: "overnight",
      iconBg: "#f4bd35",
      href: "/services",
    },
    {
      title: "Training Support",
      description: "Focused sessions for behaviour, confidence, and progress.",
      icon: "training",
      iconBg: "#56c6d9",
      href: "/services",
    },
    {
      title: "Bespoke Plans",
      description: "Flexible care designed around your timing and pet needs.",
      icon: "custom",
      iconBg: "#97c8a2",
      href: "/services",
    },
    {
      title: "Adventure Walks",
      description: "Half-day or full-day outings for curious, active companions.",
      icon: "adventure",
      iconBg: "#ab95e9",
      href: "/services",
    },
  ],
};