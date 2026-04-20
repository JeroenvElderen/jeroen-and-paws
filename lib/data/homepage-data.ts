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
  eyebrow: "Trusted local dog care",
  title: "Professional dog care with a personal touch",
  subtitle:
    "Walking, training, day care, and boarding services tailored to your companion's personality, routine, and confidence level.",
  primaryCta: { label: "View Services", href: "/services" },
  secondaryCta: { label: "Call Jeroen", href: "tel:+447000000000" },
  stats: [
    { label: "Satisfied pet owners", value: "100+" },
    { label: "Walks and visits", value: "5k+" },
    { label: "Hands-on experience", value: "7+ years" },
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
      title: "Daily strolls",
      description: "Tailored daily walks matched to your dog's pace, routine, and personality.",
      icon: "walk",
      iconBg: "#c4b5fd",
      href: "/services",
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Group adventures",
      description: "Friendly small-pack outings for social play, confidence, and safe exploration.",
      icon: "day",
      iconBg: "#7c3aed",
      href: "/services",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Solo journeys",
      description: "One-to-one focused walks for companions who thrive with dedicated attention.",
      icon: "overnight",
      iconBg: "#b794f6",
      href: "/services",
      image: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Training help",
      description: "Calm, supportive guidance for daily habits, confidence, and better behaviour.",
      icon: "training",
      iconBg: "#a78bfa",
      href: "/services",
      image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Home check-ins",
      description: "Quick, reassuring home visits for feeding, toilet breaks, and companionship.",
      icon: "custom",
      iconBg: "#b8a3e8",
      href: "/services",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Overnight stays",
      description: "Safe and cosy overnight boarding in a calm, caring home environment.",
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
      title: "Personalised care for every companion",
      paragraphs: [
        "From daily walks to overnight boarding, each service is matched to your dog's needs, temperament, and energy.",
        "Care is calm, structured, and flexible so your companion feels safe whether they are at home or on an outing.",
        "Updates, consistency, and trust are at the center of every booking.",
      ],
      cta: { label: "Discover services", href: "/services" },
      image: {
        src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=1200&q=80",
        alt: "White dog smiling on a pink background",
      },
    },
    {
      title: "Why local families choose Jeroen & Paws",
      intro: "Owners choose Jeroen & Paws for dependable support, kind handling, and care that adapts to each dog:",
      highlights: [
        "Daily walks, solo sessions, daycare, home check-ins, and overnight boarding in one place;",
        "7+ years of practical experience supporting different breeds, ages, and confidence levels;",
        "Clear communication with regular updates and photos throughout visits;",
        "A meet-and-greet first approach to ensure comfort and trust from day one.",
      ],
      footerPrefix: "Simple promise:",
      footerAccent: "safe, caring, and consistent support",
      footerSuffix: "for your companion every time.",
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
  title: "What clients say",
  subtitle: "Feedback from local dog owners who trust Jeroen & Paws with regular care.",
  members: [
    {
      name: "Sophie",
      role: "Pet owner",
      quote:
        "Jeroen takes our dogs out every weekday and sends photos. They are always excited when it's nearly time for their walk.",
      image: {
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
        alt: "Portrait of a smiling pet owner",
        bgColor: "#d6bcfa",
      },
    },
    {
      name: "Michelle",
      role: "Pet parent",
      quote:
        "I felt at ease leaving Bonnie at home for two days. Jeroen was thoughtful from the start and I'd gladly book again.",
      image: {
        src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
        alt: "Portrait of a happy dog owner",
        bgColor: "#c4b5fd",
      },
    },
    {
      name: "Tom",
      role: "Dog owner",
      quote:
        "Fantastic with our young Corgi. Great communication, fun walks, and exactly the right balance of play and calm.",
      image: {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
        alt: "Portrait of a dog owner",
        bgColor: "#c4b5fd",
      },
    },
  ],
};

export const sectionSix: HomepageSectionSix = {
  title: "Frequently Asked Questions",
  subtitle: "Common questions from dog owners before their first booking.",
  image: {
    src: "https://images.unsplash.com/photo-1544923408-75c5cef46f14?auto=format&fit=crop&w=1200&q=80",
    alt: "Blue parakeet standing on a skateboard in front of a yellow background",
  },
  items: [
    {
      question: "What services do you offer for dogs?",
      answer:
        "We provide walking, training, day care, home check-ins, and boarding services tailored to each companion's unique personality and needs.",
    },
    {
      question: "How experienced are you with dog care?",
      answer:
        "With over seven years of hands-on experience and Animal Care certification, care is adapted to many temperaments and training styles.",
    },
    {
      question: "What makes your approach different?",
      answer:
        "Each companion receives personal attention, calm communication, and routines designed to help them feel secure and understood.",
    },
    {
      question: "Can you accommodate dogs with special requirements?",
      answer:
        "Yes. Care can be adapted for anxiety, mobility, medication, and behavior needs so each companion remains safe and comfortable.",
    },
    {
      question: "Do you meet dogs before their first booking?",
      answer:
        "Yes. An introductory meet-and-greet helps build trust, align expectations, and gather important routine details before services begin.",
    },
    {
      question: "How do you handle nervous or anxious dogs?",
      answer:
        "With patience and structured introductions. Sessions are paced gradually to build confidence in a calm, reassuring environment.",
    },
  ],
};

export const sectionSeven: HomepageSectionSeven = {
  title: "Let's plan your dog's routine",
  subtitle: "Tell us what your companion needs and we'll recommend the right care plan.",
  info: [
    {
      icon: "map",
      iconColor: "#7c3aed",
      title: "Service Area",
      lines: ["Local neighbourhood routes", "And nearby parks"],
    },
    {
      icon: "hours",
      iconColor: "#a78bfa",
      title: "Working Hours",
      lines: ["Monday - Saturday: 8 AM - 7 PM", "Sunday: By request"],
    },
    {
      icon: "contact",
      iconColor: "#b794f6",
      title: "Contact",
      lines: ["hello@jeroenandpaws.com", "+44 7000 000000"],
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
