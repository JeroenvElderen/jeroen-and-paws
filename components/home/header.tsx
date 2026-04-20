import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/35 bg-[#0f1f66]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <Link href="/" className="text-base font-semibold tracking-[0.08em] text-primary-foreground">
          Jeroen &amp; Paws
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[#dce2f8]">
          <Link href="/services" className="transition hover:text-primary-foreground">
            Services
          </Link>
          <Link href="/model-improvements" className="transition hover:text-primary-foreground">
            Care standards
          </Link>
        </nav>
      </div>
    </header>
  );
}