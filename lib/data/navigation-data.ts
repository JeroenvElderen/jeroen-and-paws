export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/#faq" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "fb", href: "https://facebook.com/jeroenandpaws" },
  { label: "ig", href: "https://instagram.com/jeroenandpaws" },
  { label: "wa", href: "https://wa.me/447000000000" },
];
