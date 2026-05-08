import { ButtonLink } from "@/components/site/ui/button-link";

export function CtaSection({ title, text }: { title: string; text: string }) {
  return (
    <section className="border-y border-[#d1a34d]/20 bg-[#0c1017] px-6 py-20 text-center text-[#fff7e8] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#d8cab8]">
          {text}
        </p>
        <ButtonLink href="/contact" variant="light" className="mt-8">
          Book a Walk
        </ButtonLink>
      </div>
    </section>
  );
}
