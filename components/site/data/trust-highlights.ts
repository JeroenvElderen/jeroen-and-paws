// Trust highlight cards shown on the homepage. Editing this file changes that visible website content.
import { CalendarCheck, Camera, GraduationCap, Home, PawPrint, ShieldCheck } from "lucide-react";
import type { IconCard } from "./types";

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
