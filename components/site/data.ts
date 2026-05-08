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
  Handshake,
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
  Sparkles,
  Star,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";

export type PageName = "home" | "about" | "services" | "faq" | "contact";

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

export const navItems: Array<{ label: string; href: string; page: PageName }> = [
  { label: "Home", href: "/", page: "home" },
  { label: "Services", href: "/services", page: "services" },
  { label: "About me", href: "/about", page: "about" },
  { label: "Questions", href: "/faq", page: "faq" },
  { label: "Contact", href: "/contact", page: "contact" },
];

export const stats = [
  { value: "100+", label: "Satisfied pet owners" },
  { value: "5k+", label: "Walks and visits" },
  { value: "7+", label: "Years of experience" },
];

export const trustHighlights: IconCard[] = [
  {
    title: "Personalised training",
    description: "Support tailored to your companion's needs, personality, behaviour goals, and confidence level.",
    icon: GraduationCap,
  },
  {
    title: "Flexible care options",
    description: "Walking, daycare, home check-ins, boarding, and custom plans shaped around your companion's routine.",
    icon: CalendarCheck,
  },
  {
    title: "Photo updates",
    description: "Clear updates and lots of photos help you feel connected and reassured while your companion is with me.",
    icon: Camera,
  },
  {
    title: "Safe and secure",
    description: "Secure equipment, attentive supervision, gradual group introductions, and dog-safe routes keep care calm and protected.",
    icon: ShieldCheck,
  },
  {
    title: "Home-like comfort",
    description: "Day care and boarding are designed to feel warm, cosy, structured, and genuinely reassuring.",
    icon: Home,
  },
  {
    title: "Experienced specialist",
    description: "Certified in Animal Care with experience across police, sled, guide, reactive, anxious, puppy, and family companions.",
    icon: Dog,
  },
];

export const servicePreviews = [
  {
    title: "Daily strolls",
    description: "Personalised walks matched to your companion's pace and routine.",
    price: "From €18",
    alt: "Dog enjoying a neighbourhood walk",
  },
  {
    title: "Home check-ins",
    description: "Comforting drop-ins that keep your companion relaxed and well looked after.",
    price: "From €18",
    alt: "Person greeting a dog inside a home",
  },
  {
    title: "Overnight stays",
    description: "A homely stay where your companion rests comfortably and feels safe.",
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
  {
    text: "Jeroen has been fantastic walking and looking after our 10 month old Corgi. He sends lots of great photos, takes her on fun walks and plays and relaxes with her depending on her mood.",
    name: "Tom",
    pet: "Dog owner",
  },
];

export const teamMembers = [
  {
    name: "Jeroen",
    role: "Certified canine specialist",
    alt: "Jeroen's profile",
    bio: "With over seven years of experience and formal certification in Animal Care, Jeroen works with companion and working dogs using proven, ethical training methods.",
  },
  {
    name: "Police, sled, and guide dog experience",
    role: "Working-dog background",
    alt: "Compass - Alaskan Husky",
    bio: "Jeroen's background includes police dogs, sled dogs, and guide dogs, giving him a deep understanding of diverse temperaments, needs, and training styles.",
  },
  {
    name: "Every companion is family",
    role: "Personal care promise",
    alt: "Companion dog receiving attentive care",
    bio: "No dog is just another booking. Every companion is welcomed into a safe, structured, nurturing space where they can feel understood and thrive.",
  },
];

export const values: IconCard[] = [
  {
    title: "Safety first",
    description: "Secure equipment, careful observation, gradual introductions, and calm structure guide every walk, play session, and stay.",
    icon: ShieldCheck,
  },
  {
    title: "Personal understanding",
    description: "I take time to understand each dog's personality, energy level, learning style, routine, quirks, and confidence needs.",
    icon: PawPrint,
  },
  {
    title: "Clear communication",
    description: "You receive updates, photos, and honest feedback so you always know how your dog is doing.",
    icon: MessageCircleHeart,
  },
];

export const walkPlans: PricingPlan[] = [
  {
    title: "Daily strolls",
    description: "Personalised walks matched to your companion's pace and routine.",
    price: "€18",
    unit: "+",
    icon: Timer,
    features: ["Solo walks", "Routine friendly", "Photo updates", "Dog-safe routes", "Fresh water check"],
  },
  {
    title: "Solo journeys",
    description: "One-to-one walks that provide calm, focused attention just for your companion.",
    price: "€70",
    unit: "+",
    icon: Route,
    featured: true,
    features: ["1-to-1 care", "Confidence building", "Calm pace", "Dedicated attention", "Tailored enrichment"],
  },
  {
    title: "Group adventures",
    description: "Fun, confidence-building outings where companions explore and play together.",
    price: "€45",
    unit: "+",
    icon: Users,
    features: ["Social play", "Safe packs", "Adventure routes", "Small matched groups", "Careful introductions"],
  },
];

export const sittingPlans: PricingPlan[] = [
  {
    title: "Home check-ins",
    description: "Comforting drop-ins that keep your companion relaxed and well looked after.",
    price: "€18",
    unit: "+",
    icon: HandHeart,
    features: ["Feeding", "Fresh water", "Home comfort", "Medication if needed", "Photo updates"],
  },
  {
    title: "Daytime care",
    description: "Stimulating, reassuring days perfect for companions who love company.",
    price: "€25",
    unit: "+",
    icon: Sparkles,
    features: ["Playtime", "Rest breaks", "Structured day", "Companionship", "Safe supervision"],
  },
  {
    title: "Overnight stays",
    description: "A homely stay where your companion rests comfortably and feels safe.",
    price: "€70",
    unit: "/night",
    icon: Moon,
    featured: true,
    features: ["Overnight care", "Cosy spaces", "24/7 presence", "Regular routine", "Peace-of-mind updates"],
  },
];

export const specialtyPlans: PricingPlan[] = [
  {
    title: "Training help",
    description: "Supportive guidance to build good habits and boost your companion's confidence.",
    price: "€35",
    unit: "+",
    icon: GraduationCap,
    featured: true,
    features: ["Positive methods", "Behaviour goals", "Owner support", "Confidence building", "Ethical training"],
  },
  {
    title: "Custom solutions",
    description: "Tailored care shaped around your companion's personality and lifestyle.",
    price: "Custom",
    unit: "",
    icon: Heart,
    features: ["Flexible plan", "Built for you", "Mix and match", "Special routines", "Individual requirements"],
  },
];

export const processSteps = [
  { title: "Meet and greet", description: "We get to know your companion's personality, routine, needs, habits, and preferences before any service begins." },
  { title: "Build the plan", description: "Choose walking, training, day care, boarding, check-ins, or a custom mix that fits your companion's lifestyle." },
  { title: "Enjoy peace of mind", description: "Your companion receives attentive care, updates, photos, and calm support designed around their comfort." },
];

export const neighborhoods = ["Local neighbourhoods", "Surrounding areas", "Dog-safe routes", "Nearby parks", "Home visits", "Custom availability"];

export const contactCards = [
  { title: "Email", body: "Jeroen@jeroenandpaws.com", detail: "I respond within 24 hours.", href: "mailto:Jeroen@jeroenandpaws.com", icon: Mail },
  { title: "Phone", body: "+353872473099", detail: "Call or text any time.", href: "tel:+353872473099", icon: Phone },
  { title: "Hours", body: "Mon-Sun, 8am-22pm", detail: "Day care, walks, check-ins, boarding, and training by arrangement.", icon: Clock },
  { title: "Service area", body: "Local neighbourhoods\nand surrounding areas", detail: "Not sure if your address is included? Just ask and I'll confirm availability.", icon: MapPin },
];

export const faqs = [
  { question: "What services do you offer for dogs?", answer: "I provide walking, training, day care, boarding, and home check-in services, each shaped around your companion's unique personality and needs." },
  { question: "How experienced are you with dog care?", answer: "I have over seven years of hands-on experience and formal certification in Animal Care, with a background spanning police, sled, guide, and family companions." },
  { question: "What makes your approach different?", answer: "I take a personal approach to every companion. No dog is just another booking; each one is treated like family in a caring, safe, and supportive space." },
  { question: "Can you accommodate dogs with special requirements?", answer: "Absolutely. Whether your companion needs extra guidance, reassurance, medication, dietary support, or a particular routine, I adapt my approach to suit them." },
  { question: "How do you keep dogs safe during walks and playtime?", answer: "I use secure equipment, stay attentive to surroundings, follow dog-safe routes, monitor behaviour carefully, and introduce group activities gradually." },
  { question: "Do you meet dogs before their first booking?", answer: "Yes. I offer an introductory meet-and-greet so we can understand your companion's personality, needs, habits, and preferences before any service begins." },
  { question: "What should I bring for day care or boarding?", answer: "Please bring your dog's regular food, any medication, and something familiar such as a favourite blanket or toy to help them settle in comfortably." },
  { question: "How do you handle nervous or anxious dogs?", answer: "With patience, calm communication, thoughtful pacing, and structured routines. I build trust step by step so anxious companions feel safe and supported." },
  { question: "What training methods do you use?", answer: "Every dog learns differently, so I use positive, balanced, ethical training tailored to your dog's needs and focused on confidence and trust." },
  { question: "How do walks and visits work?", answer: "Walks and home visits are flexible, with options for relaxed strolls, structured enrichment, quick check-ins, or extra company depending on what your dog needs." },
  { question: "Can my dog be walked off-lead?", answer: "Off-lead walks are possible only once a dog demonstrates solid recall and calm behaviour, and once written permission has been given." },
  { question: "How many dogs do you take at once?", answer: "Group sizes stay intentionally small, and dogs are thoughtfully matched by temperament, age, and play style so everyone feels safe." },
  { question: "Do you provide photo or text updates?", answer: "Yes. I send regular updates so you have peace of mind whether your dog is walking, relaxing, learning, or enjoying new experiences." },
  { question: "Do you work with puppies?", answer: "Absolutely. Puppies need patience, structure, and positive experiences, so I offer walks, socialisation support, and beginner training." },
  { question: "What areas do you cover?", answer: "I currently cover local neighbourhoods and surrounding areas. If you're unsure whether your address is included, just ask and I'll confirm availability." },
  { question: "How far in advance should I book?", answer: "Boarding and day care can fill up quickly, especially on weekends and holidays, so booking early is the best way to secure your spot." },
  { question: "What if my dog has medication or dietary needs?", answer: "That's no problem. Just provide clear instructions for medication schedules, dietary restrictions, sensitive stomachs, or any other care notes." },
  { question: "Do you offer custom care plans?", answer: "Yes. Every dog is different, and I can create a tailored plan for companions with specific requirements, routines, or behaviours." },
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
  comfort: Handshake,
  weather: CloudSun,
};
