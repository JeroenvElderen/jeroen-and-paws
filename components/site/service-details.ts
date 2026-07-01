// Service detail page content for each individual service page. Edit this file to change service hero copy, included items, steps, images, and service-specific pricing links.
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  Heart,
  Home,
  MapPin,
  PawPrint,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  customCareImages,
  customCarePlans,
  dayCareAndOvernightPlans,
  groupAdventureImages,
  groupAdventurePlans,
  homeVisitImages,
  homeVisitPlans,
  trainingImages,
  trainingPlans,
  walksAndSoloAdventurePlans,
  dailyStrollImages,
  overnightSupportImages,
  type PricingPlan,
} from "@/components/site/data";

export type ServiceDetail = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  intro: string;
  ctaLabel: string;
  heroImage: string;
  heroAlt: string;
  featureImage: string;
  featureAlt: string;
  priceFrom: string;
  priceUnit: string;
  includedTitle: string;
  includedIntro: string;
  included: Array<{ title: string; text: string; icon: LucideIcon }>;
  steps: Array<{ title: string; text: string }>;
  perfectFor: string[];
  reassurance: string;
  closingTitle: string;
  closingText: string;
  plans: PricingPlan[];
};

const sharedIncluded = [
  {
    title: "Personal plan",
    text: "Care is shaped around your dog's routine, temperament, energy, and preferences.",
    icon: MapPin,
  },
  {
    title: "Calm handling",
    text: "Patient, confident handling keeps every experience safe, steady, and reassuring.",
    icon: ShieldCheck,
  },
  {
    title: "Photo updates",
    text: "You'll receive thoughtful updates, so you never have to wonder how the day went.",
    icon: Camera,
  },
  {
    title: "Care & trust",
    text: "Reliable, professional support from someone who treats your dog like family.",
    icon: Heart,
  },
];

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "dog-walking",
    title: "Dog Walking",
    eyebrow: "Our services",
    headline: "More than a walk. A better day for your dog.",
    subheadline: "Enriching walks tailored to your dog's needs.",
    intro:
      "From gentle neighbourhood strolls to fuller solo adventures, every walk is planned with care, safety, and joy.",
    ctaLabel: "Book a walk",
    heroImage: dailyStrollImages.hero,
    heroAlt: "Dog enjoying an enriching outdoor walk",
    featureImage: dailyStrollImages.feature,
    featureAlt: "Happy dog running along a woodland path",
    priceFrom: "€18",
    priceUnit: "/ walk",
    includedTitle: "Every walk is thoughtfully planned.",
    includedIntro: "I take care of the details so your dog gets the best possible experience.",
    included: [
      { title: "Tailored routes", text: "Routes matched to energy, confidence, age, and personality.", icon: Route },
      { title: "Enrichment & sniffs", text: "Plenty of time to sniff, explore, and engage natural instincts.", icon: PawPrint },
      ...sharedIncluded.slice(1),
    ],
    steps: [
      { title: "Meet & get to know", text: "We begin with a short meet-and-greet to learn about routine, quirks, and preferences." },
      { title: "Walk time", text: "Your dog enjoys a safe, enriching walk with sniffs, movement, and calm guidance." },
      { title: "Care & updates", text: "I'll send a summary and photos so you know they had the best time." },
      { title: "Tired dog, happy heart", text: "A fulfilled dog comes home relaxed, happy, and ready to rest." },
    ],
    perfectFor: ["Have lots of energy", "Need mental stimulation", "Love to explore", "Are home alone during the day", "Need leash confidence", "Just need a break"],
    reassurance: "Every dog is unique. If you're not sure whether this service is the right fit, I'm happy to help.",
    closingTitle: "Let's create better days together.",
    closingText: "Spaces are limited so every dog gets the attention, structure, and kindness they deserve.",
    plans: walksAndSoloAdventurePlans,
  },
  {
    slug: "home-check-ins",
    title: "Home Check-ins",
    eyebrow: "At-home care",
    headline: "Comfort, company, and reassurance at home.",
    subheadline: "Gentle visits that keep your dog settled while you're away.",
    intro:
      "Home check-ins cover the essentials with calm companionship, fresh water, feeding if needed, toilet breaks, and reassuring updates.",
    ctaLabel: "Book a visit",
    heroImage: homeVisitImages.hero,
    heroAlt: "Dog relaxing during a reassuring home visit",
    featureImage: homeVisitImages.feature,
    featureAlt: "Relaxed dog receiving attentive care",
    priceFrom: "€18",
    priceUnit: "/ visit",
    includedTitle: "Thoughtful care without leaving home.",
    includedIntro: "Perfect for dogs who feel safest in their own familiar space.",
    included: [
      { title: "Fresh essentials", text: "Water, feeding if required, toilet breaks, and comfort checks.", icon: Home },
      { title: "Calm company", text: "Unhurried attention that helps your dog feel seen and settled.", icon: Heart },
      ...sharedIncluded,
    ],
    steps: [
      { title: "Understand the routine", text: "We discuss keys, feeding, medication notes, and your dog's comfort cues." },
      { title: "Visit & settle", text: "I arrive calmly, handle essentials, and spend meaningful time with your dog." },
      { title: "Update you", text: "You'll receive photos and notes so you know everything is okay." },
      { title: "Home stays calm", text: "Your dog remains in a familiar environment with reliable care." },
    ],
    perfectFor: ["Prefer familiar spaces", "Need midday toilet breaks", "Need feeding support", "Are recovering or older", "Prefer one-to-one care", "Need calm company"],
    reassurance: "If your dog needs extra instructions, medication support, or a slower approach, we can shape the visit around them.",
    closingTitle: "Care that keeps home feeling like home.",
    closingText: "Reliable check-ins offer comfort for your dog and complete peace of mind for you.",
    plans: homeVisitPlans,
  },
  {
    slug: "dog-training",
    title: "Dog Training",
    eyebrow: "Positive training",
    headline: "Clear guidance for calmer, happier habits.",
    subheadline: "Personalised training that builds confidence and communication.",
    intro:
      "Training sessions use positive, practical support for real-life goals, from puppy foundations to behaviour reinforcement.",
    ctaLabel: "Book training",
    heroImage: trainingImages.hero,
    heroAlt: "Dog training session in an outdoor setting",
    featureImage: trainingImages.feature,
    featureAlt: "Focused dog during personalised training",
    priceFrom: "€35",
    priceUnit: "/ session",
    includedTitle: "Training that feels supportive, not stressful.",
    includedIntro: "We focus on practical progress at a pace your dog can understand.",
    included: [
      { title: "Clear goals", text: "Sessions are shaped around the habits and confidence you want to build.", icon: CheckCircle2 },
      { title: "Owner coaching", text: "You'll learn simple, repeatable steps to continue progress at home.", icon: Users },
      ...sharedIncluded,
    ],
    steps: [
      { title: "Talk through goals", text: "We identify your priorities, your dog's triggers, and what success looks like." },
      { title: "Train with clarity", text: "We practise positive, understandable exercises with calm repetition." },
      { title: "Build consistency", text: "You receive next steps you can use between sessions." },
      { title: "Grow confidence", text: "Your dog learns with more trust, communication, and emotional safety." },
    ],
    perfectFor: ["Need puppy foundations", "Need leash manners", "Need confidence", "Need behaviour reinforcement", "Need owner guidance", "Learn best one-to-one"],
    reassurance: "Training is always adapted to the dog in front of me, with patience and realistic goals.",
    closingTitle: "Let's make everyday life easier together.",
    closingText: "Positive training helps dogs and owners understand each other with more confidence.",
    plans: trainingPlans,
  },
  {
    slug: "group-walks",
    title: "Group Walks",
    eyebrow: "Social adventures",
    headline: "Carefully matched outings with gentle social time.",
    subheadline: "Small-group adventures for dogs who love company and exploring.",
    intro:
      "Group walks are matched thoughtfully so dogs enjoy outdoor time, enrichment, and companionship in a safe, supervised way.",
    ctaLabel: "Book a group walk",
    heroImage: groupAdventureImages.hero,
    heroAlt: "Dog enjoying a group adventure outdoors",
    featureImage: groupAdventureImages.feature,
    featureAlt: "Dog exploring during a structured group outing",
    priceFrom: "€45",
    priceUnit: "/ outing",
    includedTitle: "Social time with structure and care.",
    includedIntro: "Every group is chosen with temperament, safety, and comfort in mind.",
    included: [
      { title: "Matched groups", text: "Dogs are grouped thoughtfully by personality, confidence, and energy.", icon: Users },
      { title: "Guided adventure", text: "Purposeful movement, restful pauses, and lots of enriching outdoor time.", icon: Route },
      ...sharedIncluded.slice(1),
    ],
    steps: [
      { title: "Meet first", text: "We make sure your dog is comfortable and suited to a group environment." },
      { title: "Match carefully", text: "I choose compatible companions and keep group sizes manageable." },
      { title: "Explore together", text: "Dogs enjoy guided movement, sniffing, and positive social moments." },
      { title: "Return fulfilled", text: "Your dog comes home enriched, exercised, and ready to relax." },
    ],
    perfectFor: ["Are social and playful", "Enjoy outdoor adventures", "Need enrichment", "Benefit from structure", "Have good manners", "Love company"],
    reassurance: "If a group walk is not the right fit, a solo walk or custom option may suit your dog better.",
    closingTitle: "A better adventure, carefully guided.",
    closingText: "Group outings are designed to feel safe, enriching, and genuinely enjoyable.",
    plans: groupAdventurePlans,
  },
  {
    slug: "daytime-care-overnight-stays",
    title: "Daytime Care & Overnight Stays",
    eyebrow: "Longer care",
    headline: "A calm home-from-home for longer days and nights.",
    subheadline: "Structured care with play, rest, comfort, and familiar routines.",
    intro:
      "Whether your dog needs daytime supervision or overnight care, stays are calm, attentive, and shaped around what helps them settle.",
    ctaLabel: "Book care",
    heroImage: overnightSupportImages.hero,
    heroAlt: "Dog resting comfortably during an overnight stay",
    featureImage: overnightSupportImages.feature,
    featureAlt: "Relaxed dog enjoying home-from-home care",
    priceFrom: "€25",
    priceUnit: "/ day",
    includedTitle: "Comfort, rhythm, and individual attention.",
    includedIntro: "Longer care is structured around movement, rest, meals, and reassurance.",
    included: [
      { title: "Settled routine", text: "Meals, rest, play, and walks are paced around your dog's normal rhythm.", icon: CalendarDays },
      { title: "Home comfort", text: "A warm, calm environment designed to help your dog feel secure.", icon: Home },
      ...sharedIncluded,
    ],
    steps: [
      { title: "Meet & plan", text: "We talk through routines, sleep habits, feeding, and comfort needs." },
      { title: "Arrive calmly", text: "Your dog gets time to settle, sniff, and ease into the space." },
      { title: "Enjoy the day", text: "Care includes a balanced mix of activity, rest, attention, and updates." },
      { title: "Go home happy", text: "Your dog returns cared for, relaxed, and emotionally supported." },
    ],
    perfectFor: ["Need supervision", "Prefer home-style care", "Need play and rest", "Have familiar routines", "Need overnight support", "Need regular updates"],
    reassurance: "Meet-and-greets help make sure longer care feels right before a first stay.",
    closingTitle: "Relax knowing your dog is cared for like family.",
    closingText: "Day and overnight care are intentionally limited so every dog gets individual attention.",
    plans: dayCareAndOvernightPlans,
  },
  {
    slug: "custom-care",
    title: "Custom Care",
    eyebrow: "Tailored support",
    headline: "Bespoke care for routines that need something different.",
    subheadline: "Flexible support shaped around your dog, schedule, and goals.",
    intro:
      "If your dog needs a service outside the standard options, we can create a calm, practical plan around their exact requirements.",
    ctaLabel: "Plan custom care",
    heroImage: customCareImages.hero,
    heroAlt: "Dog receiving bespoke personalised care",
    featureImage: customCareImages.feature,
    featureAlt: "Dog enjoying tailored care outdoors",
    priceFrom: "Custom",
    priceUnit: "quote",
    includedTitle: "One plan, shaped around your dog.",
    includedIntro: "Ideal for specialist routines, combined services, or dogs needing extra thought.",
    included: [
      { title: "Flexible design", text: "Combine walking, visits, training, overnight, or specialist support.", icon: Sparkles },
      { title: "Unique needs", text: "Medication, multiple dogs, late pickup, behaviour goals, and more can be discussed.", icon: ShieldCheck },
      ...sharedIncluded,
    ],
    steps: [
      { title: "Tell me everything", text: "We discuss your schedule, your dog's needs, and any special requirements." },
      { title: "Shape the plan", text: "I recommend a bespoke care approach that feels clear and realistic." },
      { title: "Confirm details", text: "We agree timings, expectations, updates, and pricing before care begins." },
      { title: "Adapt as needed", text: "The plan can evolve as your dog's routine or needs change." },
    ],
    perfectFor: ["Have specialist needs", "Need multiple services", "Need medication support", "Have unusual schedules", "Need behaviour support", "Need a bespoke quote"],
    reassurance: "Custom care starts with an honest conversation so we can find the safest, most comfortable fit.",
    closingTitle: "Let's build the right care from the ground up.",
    closingText: "Tell me what your dog needs and I'll help shape a thoughtful plan around them.",
    plans: customCarePlans,
  },
];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
