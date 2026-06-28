// Contact information cards shown on the Contact page. Editing this file changes that visible website content.
import { Clock, Mail, MapPin, Phone, ShieldHalf } from "lucide-react";
import { businessInfo } from "./business-info";

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
