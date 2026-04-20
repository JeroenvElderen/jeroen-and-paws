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
  eyebrow: "Private, concierge-level care",
  title: "A Signature Care Experience for Extraordinary Pets",
  subtitle: "Premium pet care with deeply personalized routines, trusted specialists, and beautifully transparent communication.",
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
      iconBg: "#c4b5fd",
      href: "/services",
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Daytime Care",
      description: "Reliable daytime supervision with rest, routine, and play.",
      icon: "day",
      iconBg: "#7c3aed",
      href: "/services",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Overnight Care",
      description: "Comfortable overnight stays with a steady home-like rhythm.",
      icon: "overnight",
      iconBg: "#b794f6",
      href: "/services",
      image: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Training Support",
      description: "Focused sessions for behaviour, confidence, and progress.",
      icon: "training",
      iconBg: "#a78bfa",
      href: "/services",
      image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Bespoke Plans",
      description: "Flexible care designed around your timing and pet needs.",
      icon: "custom",
      iconBg: "#b8a3e8",
      href: "/services",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Adventure Walks",
      description: "Half-day or full-day outings for curious, active companions.",
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
  image: { src: string; alt: string; bgColor: string };
};

export type HomepageSectionFive = {
  title: string;
  subtitle: string;
  members: HomepageSectionFiveMember[];
};

export type HomepageSectionSixFaqItem = {
  question: string;
  answer: string;
};

export type HomepageSectionSix = {
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
  items: HomepageSectionSixFaqItem[];
};

export type HomepageSectionSevenInfo = {
  icon: "map" | "hours" | "contact";
  iconColor: string;
  title: string;
  lines: string[];
};

export type HomepageSectionSevenFormField = {
  name: string;
  placeholder: string;
  type: "text" | "tel";
};

export type HomepageSectionSeven = {
  title: string;
  subtitle: string;
  info: HomepageSectionSevenInfo[];
  formFields: HomepageSectionSevenFormField[];
  submitLabel: string;
};

export const sectionThree: HomepageSectionThree = {
  visuals: [
    {
      title: "Wellbeing-first care, designed around your pet",
      paragraphs: [
        "Our team pairs veterinary insight with white-glove hospitality so your companion receives thoughtful, consistent support.",
        "Every plan is built around your pet's temperament, energy level, health profile, and your household schedule.",
        "From enrichment to grooming and supervised rest, every touchpoint is calm, structured, and held to exceptional standards.",
      ],
      cta: { label: "More About Us", href: "/services" },
      image: {
        src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=80",
        alt: "White dog smiling on a pink background",
      },
    },
    {
      title: "Why families choose us",
      intro: "When time is tight, we preserve your pet's routine, comfort, and confidence with dependable professional care:",
      highlights: [
        "Diet, medication, and hydration guidance are followed with precision;",
        "Daily wellness checks help us spot concerns early;",
        "Walks, play, and downtime happen on a predictable rhythm;",
        "You get reliable coverage without last-minute favors;",
        "Grooming and hygiene support keep your pet polished and comfortable.",
      ],
      footerPrefix: "Choose",
      footerAccent: "one-time, ongoing, or fully bespoke",
      footerSuffix: "care with complete flexibility.",
      image: {
        src: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1200&q=80",
        alt: "Rabbit on a blue background",
      },
    },
  ],
};

export const sectionFour: HomepageSectionFour = {
  title: "Ready to book your pet's premium care plan?",
  phoneLabel: "Call us",
  phoneNumber: "+ 1 (234) 567 89 00",
  primaryCta: { label: "Contact Us", href: "/services" },
  secondaryCta: { label: "Order Services", href: "/services" },
};

export const sectionFive: HomepageSectionFive = {
  title: "Meet Our Team",
  subtitle: "Experienced handlers, certified professionals, and true animal people committed to exceptional care.",
  members: [
    {
      name: "Alina Maisner",
      role: "Pet Sitter",
      image: {
        src: "https://images.unsplash.com/photo-1614436163996-25cee5f54290?auto=format&fit=crop&w=1000&q=80",
        alt: "Pet sitter smiling while holding a cat",
        bgColor: "#d6bcfa",
      },
    },
    {
      name: "Jessica Shimmer",
      role: "Veterinarian",
      image: {
        src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80",
        alt: "Veterinarian in a white coat",
        bgColor: "#c4b5fd",
      },
    },
    {
      name: "Mary Douglas",
      role: "Groomer",
      image: {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
        alt: "Groomer smiling with a dog",
        bgColor: "#c4b5fd",
      },
    },
  ],
};

export const sectionSix: HomepageSectionSix = {
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know before entrusting us with your companion.",
  image: {
    src: "https://images.unsplash.com/photo-1544923408-75c5cef46f14?auto=format&fit=crop&w=1200&q=80",
    alt: "Blue parakeet standing on a skateboard in front of a yellow background",
  },
  items: [
    {
      question: "What services do you provide?",
      answer:
        "We provide daily walks, pet sitting, grooming support, vet visits, and tailored care plans that match your pet's age, temperament, and routine.",
    },
    {
      question: "Do you have a professional vet?",
      answer:
        "Yes. We work with licensed veterinary professionals and can schedule preventive checkups, vaccinations, and follow-up visits whenever your pet needs care.",
    },
    {
      question: "What does a pet sitter do?",
      answer:
        "A pet sitter handles feeding, hydration, walks, playtime, medication reminders, and companionship while keeping your pet comfortable in a familiar routine.",
    },
    {
      question: "Can I leave my pet at your place?",
      answer:
        "Absolutely. We offer supervised day and overnight stays with safe spaces, structured breaks, and regular updates so you know how your pet is doing.",
    },
    {
      question: "Can I order one-time pet sitting services?",
      answer:
        "Yes, one-time bookings are available for single days, evenings, or short trips. You can also switch to a recurring plan whenever you want.",
    },
    {
      question: "How much does it cost to groom my dog?",
      answer:
        "Pricing depends on breed, coat condition, and selected services. We share a clear quote in advance so you know exactly what is included.",
    },
  ],
};

export const sectionSeven: HomepageSectionSeven = {
  title: "Let's Design Your Pet's Ideal Routine",
  subtitle: "Share your pet's needs and we'll craft a refined, practical plan that fits your schedule.",
  info: [
    {
      icon: "map",
      iconColor: "#7c3aed",
      title: "Our Address",
      lines: ["2562 Francis Lewis Blvd,", "Flushing, NY 11358"],
    },
    {
      icon: "hours",
      iconColor: "#a78bfa",
      title: "Working Hours",
      lines: ["Monday - Saturday: 11 AM - 9 PM", "Sunday: 11 AM - 7 PM"],
    },
    {
      icon: "contact",
      iconColor: "#b794f6",
      title: "Our Contacts",
      lines: ["bestpet@email.com", "+ 1 (234) 567 89 00"],
    },
  ],
  formFields: [
    { name: "name", placeholder: "Enter your full name*", type: "text" },
    { name: "phone", placeholder: "Enter your phone number*", type: "tel" },
    { name: "pet", placeholder: "Pet's name and age*", type: "text" },
    { name: "service", placeholder: "Service*", type: "text" },
    { name: "date", placeholder: "Choose date", type: "text" },
  ],
  submitLabel: "Send",
};