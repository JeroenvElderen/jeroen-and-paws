// Main navigation links shown in the website header and footer.
import type { PageName } from "./types";

export const navItems: Array<{ label: string; href: string; page: PageName }> = [
  { label: "Home", href: "/", page: "home" },
  { label: "About me", href: "/about", page: "about" },
  { label: "Services", href: "/services", page: "services" },
  { label: "Contact", href: "/contact", page: "contact" },
  { label: "Policies", href: "/policies", page: "policies" },
];
