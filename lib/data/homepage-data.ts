export type HeroSectionOne = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const sectionOne: HeroSectionOne = {
  eyebrow: "Safe and caring hands",
  title: "Your Pet Deserves the Best Care",
  subtitle: "We offer professional dog care services in Amsterdam.",
  primaryCta: { label: "Order Services", href: "/services" },
  secondaryCta: { label: "Call Us", href: "tel:+31000000000" },
};