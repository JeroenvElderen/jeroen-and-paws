import {
  Baby,
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
  KeyRound,
  Mail,
  MapPin,
  MessageCircleHeart,
  Moon,
  PawPrint,
  Phone,
  Route,
  ShieldCheck,
  ShieldHalf,
  Sparkles,
  Star,
  Timer,
  UserCheck,
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

export const navItems: Array<{ label: string; href: string; page: PageName }> = [
  { label: "Home", href: "/", page: "home" },
  { label: "About", href: "/about", page: "about" },
  { label: "Services", href: "/services", page: "services" },
  { label: "Contact", href: "/contact", page: "contact" },
];

export const stats = [
  { value: "500+", label: "Happy Pet Families" },
  { value: "15K+", label: "Walks Completed" },
  { value: "5.0", label: "Google Rating" },
];

export const trustHighlights: IconCard[] = [
  {
    title: "Insured & Bonded",
    description: "Every walker is fully insured, bonded, and background-checked. Your pet's safety is never a question mark.",
    icon: UserCheck,
  },
  {
    title: "GPS-Tracked Walks",
    description: "Get real-time updates and a map of every walk. You'll know exactly where your dog explored and for how long.",
    icon: Route,
  },
  {
    title: "Photo Updates",
    description: "We send photos and a summary after every visit. Because you shouldn't have to wonder how your pet's day went.",
    icon: Camera,
  },
  {
    title: "Secure Key Storage",
    description: "Keys are stored in a locked safe when not in use. We take access to your home as seriously as you do.",
    icon: KeyRound,
  },
  {
    title: "Pet First Aid Certified",
    description: "All team members are trained in pet first aid and CPR. If something unexpected happens, we're ready.",
    icon: GraduationCap,
  },
  {
    title: "Consistent Walkers",
    description: "Your dog gets the same walker every time. Familiarity builds trust, and trust makes for happier walks.",
    icon: CalendarCheck,
  },
];

export const servicePreviews = [
  {
    title: "Dog Walking",
    description: "Solo or small group walks through local parks and trails. 30 or 60 minute options.",
    price: "From $22/walk",
    alt: "Happy dog on a leash walk through a local park",
  },
  {
    title: "Pet Sitting",
    description: "Drop-in visits for feeding, playtime, medication, litter boxes, and plenty of attention.",
    price: "From $25/visit",
    alt: "Pet sitter visiting a dog at home",
  },
  {
    title: "Overnight Stays",
    description: "In-home overnight care so your pet keeps their routine while you're away.",
    price: "From $65/night",
    alt: "Comfortable pet care during an overnight stay",
  },
];

export const testimonials = [
  {
    text: "Milo used to have terrible separation anxiety. After two weeks with Jeroen, he actually gets excited when he sees him pull up. The GPS tracking and photos give me total peace of mind at work.",
    name: "Jessica Thornton",
    pet: "Pet parent to Milo (Golden Retriever)",
  },
  {
    text: "We travel for work about once a month and Marcus does the overnight stays. Our two cats are always calm and well-fed when we get home. He even sends us nightly video updates.",
    name: "David & Rachel Kim",
    pet: "Pet parents to Luna & Cleo (Cats)",
  },
  {
    text: "Best dog walking service in your area, hands down. They actually learn your dog's quirks and adjust. My reactive pup is calmer on walks now than she's ever been. Worth every penny.",
    name: "Marcus Rivera",
    pet: "Pet parent to Pepper (Australian Shepherd)",
  },
];

export const teamMembers = [
  {
    name: "Jeroen",
    role: "Founder & Lead Walker",
    alt: "Jeroen, Founder and Lead Walker",
    bio: "Former veterinary technician with 8 years of animal care experience. Jeroen has walked over 5,000 dogs since founding Jeroen & Paws. He lives with Paws, his rescue mutt, and two cats named Biscuit and Gravy.",
  },
  {
    name: "Marcus Okafor",
    role: "Senior Pet Sitter & Walker",
    alt: "Marcus Okafor, Senior Pet Sitter and Walker",
    bio: "Marcus grew up on a small farm outside Fort Collins and has been around animals his entire life. He specializes in overnight stays and is our go-to for anxious or reactive dogs. Proud dad to a greyhound named Jet.",
  },
  {
    name: "Emily Torres",
    role: "Walker & Cat Care Specialist",
    alt: "Emily Torres, Walker and Cat Care Specialist",
    bio: "Emily joined Jeroen & Paws after three years as a dog trainer. She has a knack for reading animal body language and adjusting her approach. At home, she's got two senior cats and a very energetic beagle named Nugget.",
  },
];

export const values: IconCard[] = [
  {
    title: "Trust First",
    description:
      "You're handing us the keys to your home and the care of your family member. We earn that trust through transparency, consistency, and accountability every single day.",
    icon: Handshake,
  },
  {
    title: "Every Pet Matters",
    description:
      "Whether it's a 10-pound chihuahua or a 100-pound Great Dane, every animal gets our full attention. We learn their routines, quirks, and favorite spots.",
    icon: PawPrint,
  },
  {
    title: "Rain or Shine",
    description:
      "Local weather is unpredictable. Your pet's routine shouldn't be. We show up on schedule, every time, regardless of conditions.",
    icon: CloudSun,
  },
];

export const walkPlans: PricingPlan[] = [
  {
    title: "30-Minute Walk",
    description: "A quick stretch and bathroom break. Great for midday energy burns.",
    price: "$22",
    unit: "/ walk",
    icon: Timer,
    features: ["Solo walk", "GPS route tracking", "Photo update", "Fresh water provided", "Paw wipe before re-entry"],
  },
  {
    title: "60-Minute Walk",
    description: "The full experience. Longer trails, more sniffing, and a happier pup at the end.",
    price: "$35",
    unit: "/ walk",
    icon: Route,
    featured: true,
    features: ["Everything in 30-minute walk", "Extended trail routes", "Socialization opportunities", "Post-walk treat", "Detailed behavior report"],
  },
  {
    title: "Puppy Package",
    description: "Short, frequent visits for puppies under 1 year. Builds routine and socialization skills.",
    price: "$30",
    unit: "/ visit",
    icon: Baby,
    features: ["20-minute walk + play", "Potty reinforcement", "Command practice", "Puppy-safe routes", "Daily notes"],
  },
];

export const sittingPlans: PricingPlan[] = [
  {
    title: "Drop-In Visit",
    description: "A 30-minute home visit for feeding, play, medication, and companionship.",
    price: "$25",
    unit: "/ visit",
    icon: HandHeart,
    features: ["Food and water", "Playtime", "Medication if needed", "Litter or yard cleanup", "Photo update"],
  },
  {
    title: "Overnight Stay",
    description: "Your pet gets company through the night and their normal routine while you're away.",
    price: "$65",
    unit: "/ night",
    icon: Moon,
    featured: true,
    features: ["Evening and morning care", "Home security checks", "Mail collection", "Plants watered", "Nightly update"],
  },
  {
    title: "Cat Care Visit",
    description: "Low-stress cat care with feeding, litter, medication, and enrichment.",
    price: "$20",
    unit: "/ visit",
    icon: Sparkles,
    features: ["Feeding and water", "Litter cleaning", "Medication if needed", "Play and enrichment", "Quiet companionship"],
  },
];

export const processSteps = [
  { title: "Free Meet & Greet", description: "We come to your home, meet your pet, learn their routine, and answer every question." },
  { title: "Choose Your Plan", description: "Pick the service and schedule that fits your pet's energy level and your week." },
  { title: "Tails Start Wagging", description: "Your dedicated walker arrives on time, sends updates, and keeps your pet happy." },
];

export const neighborhoods = ["City Center", "Old Town", "Riverside", "North Park", "South Park", "Lakeside", "West End", "East End", "Garden District", "Market Quarter", "Oak Village", "Meadow Heights"];

export const contactCards = [
  { title: "Call or Text", body: "(303) 555-1234", detail: "We respond to texts within 30 minutes during business hours.", href: "tel:+13035551234", icon: Phone },
  { title: "Email", body: "hello@jeroenandpaws.com", detail: "We'll get back to you within a few hours, usually sooner.", href: "mailto:hello@jeroenandpaws.com", icon: Mail },
  { title: "Office", body: "By appointment\nin your area", detail: "We come to you for meet-and-greets.", icon: MapPin },
  { title: "Hours", body: "Monday - Sunday: 7:00 AM - 7:00 PM", detail: "Overnight stays extend beyond regular hours.", icon: Clock },
  { title: "Fully Insured", body: "All walkers and sitters carry liability insurance and are bonded.", detail: "Your pet and your home are protected.", icon: ShieldHalf },
];

export const faqs = [
  { question: "How does the first meet-and-greet work?", answer: "We come to your home, meet your pet, review their routine, discuss behavior or medical notes, and answer questions. It takes about 20-30 minutes and has no cost or commitment." },
  { question: "Will my dog always have the same walker?", answer: "Yes. Your dog is paired with a dedicated walker. If your regular walker is unavailable, we introduce a backup beforehand." },
  { question: "What happens if the weather is bad?", answer: "We walk rain or shine. In dangerous ice or lightning, we switch to a shorter walk or indoor play and let you know immediately." },
  { question: "Are your walkers insured and background-checked?", answer: "Every team member carries liability insurance, is bonded, has passed a background check, and is pet first aid and CPR certified." },
  { question: "Can you handle special needs or medications?", answer: "Absolutely. Our team includes a former vet tech and a certified dog trainer, and we can administer medications or manage special routines." },
  { question: "What's your cancellation policy?", answer: "We ask for 24 hours notice. Same-day cancellations are charged at 50% of the service rate, while emergencies are handled with flexibility." },
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
