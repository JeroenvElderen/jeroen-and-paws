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
  image: { src: string; alt: string; bgColor: string };
};

export type HomepageSectionFive = {
  title: string;
  subtitle: string;
  members: HomepageSectionFiveMember[];
};

export const sectionThree: HomepageSectionThree = {
  visuals: [
    {
      title: "We Make Your Pets Happy and Healthy",
      paragraphs: [
        "We are a small firm with 15 dedicated employees that provide all kinds of pet care services in New York.",
        "We know how much you adore your pet and care about it with all our attention and love for animals.",
        "Our dedicated team of vets, groomers, pet sitters and other specialists will provide all kinds of services and look after your pet. We find an approach to every animal. You can rest assured that your fluffy family member will stay healthy and happy.",
      ],
      cta: { label: "More About Us", href: "/services" },
      image: {
        src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=80",
        alt: "White dog smiling on a pink background",
      },
    },
    {
      title: "Why You Need Our Help",
      intro: "You may be out for a while or too busy to give your pet the care it deserves, and our services will come in handy:",
      highlights: [
        "You will be sure your pet is eating the right food;",
        "Our staff will make sure your pet is healthy;",
        "We take your dogs for a walk on schedule;",
        "No need to ask your friends to stay with your pet;",
        "We'll give your pets a bath and groom them on time.",
      ],
      footerPrefix: "We can provide",
      footerAccent: "one-time or regular",
      footerSuffix: "care for your pet.",
      image: {
        src: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1200&q=80",
        alt: "Rabbit on a blue background",
      },
    },
  ],
};

export const sectionFour: HomepageSectionFour = {
  title: "Need to Call a Pet Sitter or Schedule a Visit to a Vet or Groomer?",
  phoneLabel: "Call us",
  phoneNumber: "+ 1 (234) 567 89 00",
  primaryCta: { label: "Contact Us", href: "/services" },
  secondaryCta: { label: "Order Services", href: "/services" },
};

export const sectionFive: HomepageSectionFive = {
  title: "Meet Our Team",
  subtitle: "Each member of our Best.Pet family loves animals and is trained to look after them.",
  members: [
    {
      name: "Alina Maisner",
      role: "Pet Sitter",
      image: {
        src: "https://images.unsplash.com/photo-1614436163996-25cee5f54290?auto=format&fit=crop&w=1000&q=80",
        alt: "Pet sitter smiling while holding a cat",
        bgColor: "#f5b7ca",
      },
    },
    {
      name: "Jessica Shimmer",
      role: "Veterinarian",
      image: {
        src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80",
        alt: "Veterinarian in a white coat",
        bgColor: "#61d8e5",
      },
    },
    {
      name: "Mary Douglas",
      role: "Groomer",
      image: {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
        alt: "Groomer smiling with a dog",
        bgColor: "#bcaee9",
      },
    },
  ],
};