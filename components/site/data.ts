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
};

export const navItems: Array<{ label: string; href: string; page: PageName }> =
  [
    { label: "Home", href: "/", page: "home" },
    { label: "Services", href: "/services", page: "services" },
    { label: "About me", href: "/about", page: "about" },
    { label: "Contact", href: "/contact", page: "contact" },
  ];

export const stats = [
  { value: "100+", label: "Satisfied pet owners" },
  { value: "5k+", label: "Walks and visits" },
  { value: "7+", label: "Years of experience" },
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
    alt: "Dog enjoying a neighborhood walk",
  },
  {
    title: "Home check-ins",
    description:
      "Comforting drop-ins that keep your companion relaxed and well looked after.",
    price: "From €18",
    alt: "Person greeting a dog inside a home",
  },
  {
    title: "Overnight stays",
    description:
      "A homely stay where your companion rests comfortably and feels safe.",
    price: "From €70/night",
    alt: "Dog resting comfortably indoors",
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
    alt: "Jeroen's profile",
    bio: "Certified in Animal Care with over seven years of hands-on experience, Jeroen works with companion and working dogs using proven, ethical training methods.",
  },
  {
    name: "Compass",
    role: "Alaskan Husky",
    alt: "Compass - Alaskan Husky",
    bio: "Compass is part of the Jeroen & Paws family and reflects the structured, active, companion-first care every dog receives.",
  },
  {
    name: "Your companion",
    role: "Welcomed like family",
    alt: "Happy companion enjoying personalised care",
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

export const walkPlans: PricingPlan[] = [
  {
    title: "Daily strolls",
    description:
      "Personalised walks matched to your companion's pace and routine.",
    price: "€18",
    unit: "/ walk",
    icon: Timer,
    features: [
      "Solo walks",
      "Routine friendly",
      "Photo updates",
      "Matched to pace",
      "Reliable daily care",
    ],
  },
  {
    title: "Solo journeys",
    description:
      "One-to-one walks that provide calm, focused attention just for your companion.",
    price: "€70",
    unit: "/ journey",
    icon: Route,
    featured: true,
    features: [
      "1-to-1 care",
      "Confidence building",
      "Calm pace",
      "Dedicated attention",
      "Tailored route",
    ],
  },
  {
    title: "Group adventures",
    description:
      "Fun, confidence-building outings where companions explore and play together.",
    price: "€45",
    unit: "/ outing",
    icon: Users,
    features: [
      "Social play",
      "Safe packs",
      "Adventure routes",
      "Temperament matching",
      "Small groups",
    ],
  },
];

export const sittingPlans: PricingPlan[] = [
  {
    title: "Home check-ins",
    description:
      "Comforting drop-ins that keep your companion relaxed and well looked after.",
    price: "€18",
    unit: "/ visit",
    icon: HandHeart,
    features: [
      "Feeding",
      "Fresh water",
      "Home comfort",
      "Medication support",
      "Photo updates",
    ],
  },
  {
    title: "Daytime care",
    description:
      "Stimulating, reassuring days perfect for companions who love company.",
    price: "€25",
    unit: "/ day",
    icon: CloudSun,
    featured: true,
    features: [
      "Playtime",
      "Rest breaks",
      "Structured day",
      "Warm care",
      "Regular updates",
    ],
  },
  {
    title: "Overnight stays",
    description:
      "A homely stay where your companion rests comfortably and feels safe.",
    price: "€70",
    unit: "/ night",
    icon: Moon,
    features: [
      "Overnight care",
      "Cosy spaces",
      "24/7 presence",
      "Familiar routines",
      "Peace of mind",
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

export const neighborhoods = [
  "Daily strolls",
  "Solo journeys",
  "Group adventures",
  "Daytime care",
  "Home check-ins",
  "Overnight stays",
  "Training help",
  "Custom solutions",
];

export const contactCards = [
  {
    title: "Call or Text",
    body: "+353 87 247 3099",
    detail:
      "Prefer a quick hello? Call any time and Jeroen will respond within 24 hours.",
    href: "tel:+353872473099",
    icon: Phone,
  },
  {
    title: "Email",
    body: "Jeroen@jeroenandpaws.com",
    detail:
      "Send a note about training, walks, day care, or boarding and Jeroen will help you explore the right options.",
    href: "mailto:Jeroen@jeroenandpaws.com",
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
    body: "Monday - Sunday: 8:00 AM - 10:00 PM",
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
  sitting: Home,
  process: MessageCircleHeart,
  area: MapPin,
  faq: CircleQuestionMark,
};
