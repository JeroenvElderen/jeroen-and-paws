// Value cards shown on the About page. Editing this file changes that visible website content.
import { GraduationCap, Heart, MessageCircleHeart } from "lucide-react";
import type { IconCard } from "./types";

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
