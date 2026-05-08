import { Camera, Clock, Mail, PawPrint, Phone, Star } from "lucide-react";
import Link from "next/link";

const footerSections = [
  { title: "Our services", links: ["Daily strolls", "Solo journey", "Group adventures", "Daytime care", "Home check-ins", "Overnight stay", "Training", "Custom solutions"].map((label) => ({ label, href: "/services" })) },
  { title: "Company info", links: [{ label: "About", href: "/about" }, { label: "Pricing", href: "/services" }, { label: "Contact", href: "/contact" }] },
  { title: "Support", links: [{ label: "FAQ", href: "/faq" }, { label: "Help", href: "/contact" }] },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.75fr_0.7fr_1.05fr]">
          <div>
            <div className="inline-flex items-center gap-3 text-xl font-extrabold text-white">
              <PawPrint aria-hidden="true" className="h-6 w-6 fill-violet-300 text-violet-300" />
              Jeroen & Paws
            </div>
            <p className="mt-4 max-w-sm leading-7 text-slate-400">Thoughtful walking, training, day care, boarding, and home check-ins where every companion is understood, celebrated, and genuinely cared for.</p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Star, href: "https://www.facebook.com/", label: "Follow us on Facebook" },
                { Icon: Camera, href: "https://www.instagram.com/", label: "Join us on Instagram" },
              ].map(({ Icon, href, label }) => (
                <Link key={label} href={href} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-violet-600" aria-label={label}>
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-white">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-violet-200">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-bold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="tel:+353872473099" className="inline-flex gap-2 hover:text-violet-200"><Phone className="h-4 w-4" /> +353872473099</Link></li>
              <li><Link href="mailto:Jeroen@jeroenandpaws.com" className="inline-flex gap-2 hover:text-violet-200"><Mail className="h-4 w-4" /> Jeroen@jeroenandpaws.com</Link></li>
              <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0" /> Mon-Sun, 8am-22pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Jeroen & Paws. All rights reserved.</p>
          <div className="flex gap-4"><Link href="#">Privacy</Link><Link href="#">Cookies</Link><Link href="#">Legal</Link></div>
        </div>
      </div>
    </footer>
  );
}
