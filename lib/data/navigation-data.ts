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
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/#faq" },
  { label: "Happy Clients", href: "/#reviews" },
  { label: "Contacts", href: "/#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "f", href: "https://facebook.com" },
  { label: "ig", href: "https://instagram.com" },
  { label: "x", href: "https://x.com" },
  { label: "yt", href: "https://youtube.com" },
];
