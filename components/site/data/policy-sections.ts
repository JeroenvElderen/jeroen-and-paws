// Policy page content cards shown on the Policies page. Editing this file changes that visible website content.
import { CalendarCheck, Camera, Clock, Dog, Heart, Mail, Umbrella } from "lucide-react";

export const policySections = [
  {
    title: "Booking & payment",
    description:
      "Bookings are confirmed once we've agreed on a date and service. Payment is made securely through Revolut using a payment link or invoice.",
    icon: CalendarCheck,
    points: [
      "Secure payment via Revolut",
      "Payment link or invoice provided",
      "Regular bookings can be arranged in advance",
    ],
  },
  {
    title: "Rescheduling",
    description:
      "Plans change. If you need to move your booking, just let me know as early as possible and I'll do my best to find another time.",
    icon: Clock,
    points: [
      "Subject to availability",
      "Weather-related reschedules are always free",
      "I'll always try to accommodate you",
    ],
  },
  {
    title: "Weather",
    description:
      "Your dog's comfort and safety always come first. If the weather isn't suitable, we'll arrange another time whenever possible.",
    icon: Umbrella,
    points: [
      "Extreme weather may require rescheduling",
      "Your dog's wellbeing always comes first",
      "We'll work together to find another suitable time",
    ],
  },
  {
    title: "Dog wellbeing",
    description:
      "Every dog is treated with patience, kindness, and respect. Walks and visits are always tailored around their personality, pace, and individual needs.",
    icon: Dog,
    points: [
      "Please share any medical or behavioural information",
      "Water, treats, and rest breaks are always available",
      "Sessions are always dog-led and positive",
    ],
  },
  {
    title: "Photo updates",
    description:
      "During walks, day care, adventures, and boarding, I love capturing little moments from your dog's day. Photo updates are always included at no extra cost.",
    icon: Camera,
    points: [
      "Photo updates are included with every service",
      "Photos may be used by Jeroen & Paws on the website and social media",
      "Your personal information is never shared",
    ],
  },
  {
    title: "Updates & delivery",
    description:
      "You'll receive photos and updates during or shortly after your dog's visit, so you can see exactly how their day went.",
    icon: Mail,
    points: [
      "Updates are sent during or after your booking",
      "Photos are included at no extra cost",
      "No additional fees for photo updates",
    ],
  },
  {
    title: "Cancellations",
    description:
      "If you need to cancel or change your booking, please let me know as soon as possible so I can offer the space to another family.",
    icon: Heart,
    points: [
      "48 hours' notice is appreciated",
      "Emergencies are always handled with understanding",
      "Thank you for supporting a local small business",
    ],
  },
];
