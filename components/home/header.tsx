import Link from "next/link";
import { PawPrint } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-cyan-300/30 bg-[#081022]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-cyan-100">
          <PawPrint className="h-4 w-4 text-fuchsia-300" />
          Jeroen &amp; Paws
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1 text-sm text-cyan-100">
          <Link href="/services" className="rounded-full px-4 py-2 transition hover:bg-white/15">
            Services
          </Link>
          <Link href="/model-improvements" className="rounded-full px-4 py-2 transition hover:bg-white/15">
            Care standards
          </Link>
        </nav>
      </div>
    </header>
  );
}
