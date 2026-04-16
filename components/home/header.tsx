import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-amber-100/10 bg-[#10141f]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <Link href="/" className="text-base font-semibold tracking-[0.08em] text-stone-50">
          Jeroen &amp; Paws
        </Link>
        <nav className="flex items-center gap-5 text-sm text-stone-300">
          <Link href="/services" className="transition hover:text-white">
            Services
          </Link>
          <Link href="/model-improvements" className="transition hover:text-white">
            Care standards
          </Link>
        </nav>
      </div>
    </header>
  );
}