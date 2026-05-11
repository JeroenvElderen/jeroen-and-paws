import {
  Bone,
  CalendarCheck,
  Camera,
  CircleQuestionMark,
  Clock,
  CloudSun,
  Dog,
  GraduationCap,
  HandHeart,
  Heart,
  Home,
  Mail,
  MapPin,
  MessageCircleHeart,
  Moon,
  PawPrint,
  Phone,
  Route,
  ShieldCheck,
  ShieldHalf,
  Star,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";

export type PageName = "home" | "about" | "services" | "contact";

export type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PricingPlan = {
  title: string;
  description: string;
  price: string;
  unit: string;
  icon: LucideIcon;
  features: string[];
  featured?: boolean;
  badge?: string;
  pricePrefix?: string;
  priceNote?: string;
};

export const businessInfo = {
  name: "Jeroen & Paws",
  email: "Jeroen@jeroenandpaws.com",
  phoneDisplay: "+353 87 247 3099",
  phoneHref: "+353872473099",
  whatsappNumber: "00353872473099",
  siteUrl: "https://jeroenandpaws.com",
  serviceAreaSummary:
    "Dog walking, training, day care, boarding, and home check-ins by appointment for local dog families in Ireland.",
  responseTime: "Jeroen aims to reply within 24 hours.",
  hours: "Monday - Sunday: 8:00 AM - 10:00 PM",
};

export const serviceAreas = [
  "Local dog walking routes",
  "Home visits by appointment",
  "Day care and boarding clients",
  "Training meet-and-greets",
  "Nearby custom care plans",
  "Ireland-based enquiries",
];

export const bookingPolicies = [
  "Free meet-and-greet before new recurring care, boarding, or training plans.",
  "Final pricing depends on location, number of dogs, dates, routine, and specialist care needs.",
  "Holiday, late pickup, extra-dog, medication, or extended-travel requests may be quoted separately.",
  "Please share cancellations or changes as early as possible so care plans can be adjusted calmly.",
  "Emergency veterinary instructions, medication notes, and behaviour triggers should be shared before care begins.",
];

export const navItems: Array<{ label: string; href: string; page: PageName }> =
  [
    { label: "Home", href: "/", page: "home" },
    { label: "Services", href: "/services", page: "services" },
    { label: "About me", href: "/about", page: "about" },
    { label: "Contact", href: "/contact", page: "contact" },
    { label: "Policies", href: "/terms", page: "contact" },
  ];

export const stats = [
  { value: "100+", label: "Pet families supported" },
  { value: "5k+", label: "Walks and care visits" },
  { value: "7+", label: "Years hands-on" },
];

export const trustHighlights: IconCard[] = [
  {
    title: "Personalised care",
    description:
      "Every walk, visit, training session, day care stay, and boarding plan is shaped around your companion's routine and personality.",
    icon: PawPrint,
  },
  {
    title: "Experienced canine specialist",
    description:
      "With over seven years of hands-on experience and Animal Care certification, Jeroen supports companion and working dogs with confidence.",
    icon: GraduationCap,
  },
  {
    title: "Photo updates",
    description:
      "Receive thoughtful updates and plenty of photos so you always know your dog is happy, relaxed, and cared for.",
    icon: Camera,
  },
  {
    title: "Safe, structured routines",
    description:
      "Secure equipment, attentive handling, and carefully matched activities keep companions comfortable during walks, playtime, and stays.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible service options",
    description:
      "Choose from daily strolls, home check-ins, training help, group adventures, daytime care, overnight stays, or a custom plan.",
    icon: CalendarCheck,
  },
  {
    title: "Home-from-home comfort",
    description:
      "Boarding and day care are designed to feel warm, reassuring, and familiar, with rest breaks and care that fits each dog.",
    icon: Home,
  },
];

export const servicePreviews = [
  {
    title: "Daily strolls",
    description:
      "Personalised walks matched to your companion's pace and routine.",
    price: "From €18",
    alt: "Lola enjoying a neighbourhood walk",
    imageSrc: "/images/dogs/lola/lola1.jpeg",
  },
  {
    title: "Home check-ins",
    description:
      "Comforting drop-ins that keep your companion relaxed and well looked after.",
    price: "From €18",
    alt: "Nola relaxing during a home check-in",
    imageSrc: "/images/dogs/Nola/Nola-1.jpg",
  },
  {
    title: "Overnight stays",
    description:
      "A homely stay where your companion rests comfortably and feels safe.",
    price: "From €70/night",
    alt: "Pancho resting comfortably indoors",
    imageSrc: "/images/dogs/pancho/pancho1.jpeg",
  },
];

export const testimonials = [
  {
    text: "Jeroen is absolutely amazing with our dogs. He takes them every week day to their favourite place for a half hour walk and provides lots of photos. The dogs love him and are always visibly excited coming up to the time he arrives to take them for their walk.",
    name: "Sophie",
    pet: "Pet owner",
  },
  {
    text: "Felt so at ease leaving our dog Bonnie at home for 2 days with Jeroen looking after her. From the initial communication I found Jeroen to be so thoughtful and considerate. Would happily use Jeroen again and can highly recommend.",
    name: "Michelle",
    pet: "Pet parent",
  },
  {
    text: "Excellent service. I feel so at ease now I know Kaiser is being kept company and let out for wees and poos while I'm at work. Jeroen is so communicative every visit he sends me pictures that brighten up my day.",
    name: "Katherine",
    pet: "Pet owner",
  },
];

export const teamMembers = [
  {
    name: "Jeroen",
    role: "Certified canine specialist",
    alt: "Johnny enjoying Jeroen & Paws care",
    imageSrc: "/images/dogs/Johnny/Johnny.jpeg",
    bio: "Certified in Animal Care with over seven years of hands-on experience, Jeroen works with companion and working dogs using proven, ethical training methods.",
  },
  {
    name: "Compass",
    role: "Alaskan Husky",
    alt: "Compass, an Alaskan Husky companion",
    imageSrc: "/images/dogs/aslan/aslan.jpg",
    bio: "Compass is part of the Jeroen & Paws family and reflects the structured, active, companion-first care every dog receives.",
  },
  {
    name: "Your companion",
    role: "Welcomed like family",
    alt: "Kaiser enjoying personalised care",
    imageSrc: "/images/dogs/kaiser/kaiser1.jpeg",
    bio: "From customised walks to day care and boarding, every dog receives consistency, dedication, safety, emotional wellbeing, and clear communication.",
  },
];

export const values: IconCard[] = [
  {
    title: "Expert training backed by experience",
    description:
      "A certified Animal Care background and experience with police, sled, guide, and family companions helps every dog receive individual support.",
    icon: GraduationCap,
  },
  {
    title: "Calm, positive structure",
    description:
      "Training, walks, and care are paced around each dog's personality, energy level, and learning style so the experience feels enjoyable and clear.",
    icon: Heart,
  },
  {
    title: "Clear communication",
    description:
      "Photos, updates, and honest feedback keep you informed while your dog learns, grows, relaxes, and thrives in a safe environment.",
    icon: MessageCircleHeart,
  },
];

export const dailyStrollPlans: PricingPlan[] = [
  {
    title: "Standard stroll",
    description:
      "A refreshing 30-minute stroll — ideal for movement, fresh air, and a little enrichment during the day.",
    price: "€18",
    unit: "/ visit",
    icon: Timer,
    features: [
      "30 minutes",
      "Recurring available",
      "Fresh air and enrichment",
      "Photo updates",
      "Matched to routine",
    ],
  },
  {
    title: "Extended stroll",
    description:
      "A longer outing with extra time for sniffing, exploring, and enjoying the neighbourhood — perfect for companions who love a fuller adventure.",
    price: "€28",
    unit: "/ visit",
    icon: Dog,
    featured: true,
    features: [
      "60 minutes",
      "Recurring available",
      "Extra sniffing time",
      "Neighbourhood exploring",
      "Photo updates",
    ],
  },
];

export const homeVisitPlans: PricingPlan[] = [
  {
    title: "Essential Home Visit",
    description:
      "Fresh water, feeding if required, outdoor break, and calm interaction.",
    price: "€18",
    unit: "/ visit",
    icon: HandHeart,
    features: [
      "30 minutes",
      "Recurring available",
      "Fresh water",
      "Feeding if required",
      "Outdoor break",
    ],
  },
  {
    title: "Extended Home Visit",
    description:
      "A longer, unhurried visit offering additional time and reassurance.",
    price: "€28",
    unit: "/ visit",
    icon: Home,
    featured: true,
    features: [
      "60 minutes",
      "Recurring available",
      "Additional reassurance",
      "Calm interaction",
      "Photo updates",
    ],
  },
];

export const daytimeCarePlans: PricingPlan[] = [
  {
    title: "Half-day stay",
    description:
      "A relaxed daytime stay — ideal for companions who need a few hours of gentle activity, rest, and attention before heading home.",
    price: "€25",
    unit: "/ day",
    icon: CloudSun,
    features: [
      "4 hours",
      "Recurring available",
      "Gentle activity",
      "Rest and attention",
      "Calm supervision",
    ],
  },
  {
    title: "Full-day care",
    description:
      "A complete day of calm supervision, enrichment, and rest — perfect when you’re at work or occupied and want your companion genuinely supported throughout the day.",
    price: "€40",
    unit: "/ day",
    icon: CalendarCheck,
    featured: true,
    features: [
      "8 hours",
      "Recurring available",
      "Enrichment and rest",
      "Calm supervision",
      "Regular updates",
    ],
  },
];

export const overnightSupportPlans: PricingPlan[] = [
  {
    title: "Standard Overnight Stay",
    description: "Overnight care in a calm home setting.",
    price: "€70",
    unit: "/ night",
    icon: Moon,
    featured: true,
    features: [
      "Overnight support",
      "Calm home setting",
      "Familiar routines",
      "24-hour duration",
      "Peace of mind",
    ],
  },
];

export const groupAdventurePlans: PricingPlan[] = [
  {
    title: "2-Hour Adventure",
    description:
      "An extended group outing with time for movement and gentle social engagement.",
    price: "€45",
    unit: "/ outing",
    icon: Users,
    features: [
      "2 hours",
      "Guided activity",
      "Gentle social engagement",
      "Movement and play",
      "Small-group care",
    ],
  },
  {
    title: "Half-Day Adventure",
    description:
      "Additional time outdoors for steady interaction, relaxed walks, and restful pauses.",
    price: "€75",
    unit: "/ outing",
    icon: Route,
    featured: true,
    features: [
      "4 hours",
      "Relaxed walks",
      "Restful pauses",
      "Steady interaction",
      "Guided group outing",
    ],
  },
  {
    title: "Full-Day Adventure",
    description:
      "A full day of guided activity — varied walks, purposeful play, and downtime.",
    price: "€120",
    unit: "/ outing",
    icon: CloudSun,
    features: [
      "8 hours",
      "Varied walks",
      "Purposeful play",
      "Downtime included",
      "Guided activity",
    ],
  },
];

export const soloJourneyPlans: PricingPlan[] = [
  {
    title: "Half-Day Solo Journey",
    description: "A half-day outing paced around your companion.",
    price: "€70",
    unit: "/ journey",
    icon: Route,
    features: [
      "3 hours",
      "One-to-one care",
      "Paced around your dog",
      "Focused attention",
      "Photo updates",
    ],
  },
  {
    title: "Full-Day Solo Journey",
    description: "A full day exploring together — unhurried and engaging.",
    price: "€120",
    unit: "/ journey",
    icon: CloudSun,
    featured: true,
    features: [
      "6 hours",
      "One-to-one care",
      "Unhurried exploring",
      "Engaging activities",
      "Multi-day support available",
    ],
  },
];

export const walksAndSoloAdventurePlans: PricingPlan[] = [
  ...dailyStrollPlans,
  ...soloJourneyPlans,
];

export const dayCareAndOvernightPlans: PricingPlan[] = [
  ...daytimeCarePlans,
  ...overnightSupportPlans,
];

export const trainingPlans: PricingPlan[] = [
  {
    title: "Introductory Training Session",
    description: "A short, focused training session.",
    price: "€35",
    unit: "/ session",
    icon: GraduationCap,
    features: [
      "30 minutes",
      "Focused support",
      "Multi-day support available",
      "Foundational guidance",
      "Clear next steps",
    ],
  },
  {
    title: "Standard Training Session",
    description: "A structured session to reinforce behaviours.",
    price: "€60",
    unit: "/ session",
    icon: Dog,
    featured: true,
    features: [
      "60 minutes",
      "Recurring available",
      "Behaviour reinforcement",
      "Structured session",
      "Multi-day support available",
    ],
  },
  {
    title: "Puppy training",
    description:
      "One-to-one puppy training focused on socialisation, potty routines, and foundational cues like sit, stay, and leash manners.",
    price: "€65",
    unit: "/ session",
    icon: PawPrint,
    features: [
      "60 minutes",
      "Recurring available",
      "Socialisation",
      "Potty routines",
      "Foundational cues",
    ],
  },
  {
    title: "Extended Training Session",
    description: "An extended session for slower pacing.",
    price: "€100",
    unit: "/ session",
    icon: Timer,
    features: [
      "120 minutes",
      "Recurring available",
      "Slower pacing",
      "More practice time",
      "Multi-day support available",
    ],
  },
];

export const customCarePlans: PricingPlan[] = [
  {
    title: "Custom & tailored care",
    description:
      "One flexible option for unique schedules, preferred routes, multiple visits, medication, late pickup, extra nights, behavioural goals, specialist support, and bespoke care plans.",
    price: "Custom",
    unit: "",
    icon: ShieldCheck,
    featured: true,
    priceNote:
      "Quoted around your companion’s routine, goals, and care requirements.",
    features: [
      "One card for all custom and tailored services",
      "Walking, home, daytime, overnight, adventure, and training support",
      "Behaviour consultations and specialist support",
      "Medical or unique care needs",
      "Multi-day support available",
    ],
  },
];

export const processSteps = [
  {
    title: "Introductory meet-and-greet",
    description:
      "We get to know each other, discuss your companion's personality, and ensure they feel comfortable from the beginning.",
  },
  {
    title: "Choose the right support",
    description:
      "Pick walking, check-ins, day care, boarding, training, or a custom plan shaped around your dog's needs.",
  },
  {
    title: "Enjoy thoughtful updates",
    description:
      "Your companion receives attentive care while you receive clear communication, photos, and peace of mind.",
  },
];

export const neighborhoods = serviceAreas;

export const contactCards = [
  {
    title: "Call or Text",
    body: businessInfo.phoneDisplay,
    detail:
      "Prefer a quick hello? Call any time and Jeroen will respond within 24 hours.",
    href: `tel:${businessInfo.phoneHref}`,
    icon: Phone,
  },
  {
    title: "Email",
    body: businessInfo.email,
    detail:
      "Send a note about training, walks, day care, or boarding and Jeroen will help you explore the right options.",
    href: `mailto:${businessInfo.email}`,
    icon: Mail,
  },
  {
    title: "Appointments",
    body: "By appointment\nfor your companion",
    detail:
      "Meet-and-greets help Jeroen understand your dog's personality, routine, and needs.",
    icon: MapPin,
  },
  {
    title: "Hours",
    body: businessInfo.hours,
    detail:
      "Overnight stays and boarding are arranged around your companion's care plan.",
    icon: Clock,
  },
  {
    title: "Personalised care",
    body: "Walking, training, day care, boarding, and custom care plans.",
    detail:
      "Every companion is treated like family in a safe, supported environment.",
    icon: ShieldHalf,
  },
];

export const faqs = [
  {
    question: "What services do you offer for dogs?",
    answer:
      "Jeroen & Paws provides walking, training, day care, home check-ins, boarding, overnight stays, and custom care plans shaped around your companion's personality and needs.",
  },
  {
    question: "How experienced are you with dog care?",
    answer:
      "Jeroen has over seven years of hands-on experience and formal Animal Care certification, with a background that includes police, sled, guide, and companion dogs.",
  },
  {
    question: "What makes your approach different?",
    answer:
      "Every companion is treated like family rather than another booking. Care is personal, calm, structured, and adapted to help each dog feel safe and understood.",
  },
  {
    question: "Can you accommodate dogs with special requirements?",
    answer:
      "Absolutely. Whether your companion needs extra guidance, reassurance, medication support, or a specific routine, care can be adapted to suit them.",
  },
  {
    question: "How do you keep dogs safe during walks and playtime?",
    answer:
      "Safety comes first through secure equipment, attentive supervision, thoughtful group introductions, and activities paced around each dog's confidence.",
  },
  {
    question: "Do you meet dogs before their first booking?",
    answer:
      "Yes. An introductory meet-and-greet helps Jeroen learn about your companion and helps your dog feel comfortable from the start.",
  },
];

export const labels = {
  trust: ShieldCheck,
  services: Bone,
  testimonials: Star,
  story: PawPrint,
  team: Users,
  values: Heart,
  dog: Dog,
  homeVisit: HandHeart,
  daytimeCare: CloudSun,
  overnight: Moon,
  groupAdventure: Users,
  soloJourney: Route,
  sitting: Home,
  training: GraduationCap,
  customCare: ShieldCheck,
  process: MessageCircleHeart,
  area: MapPin,
  faq: CircleQuestionMark,
};
