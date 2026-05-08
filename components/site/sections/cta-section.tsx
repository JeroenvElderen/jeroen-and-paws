import { ButtonLink } from "@/components/site/ui/button-link";

export function CtaSection({ title, text }: { title: string; text: string }) {
  return (
    <section className="bg-violet-700 px-6 py-20 text-center text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-violet-100">{text}</p>
        <ButtonLink href="/contact" variant="light" className="mt-8">
          Book a Walk
        </ButtonLink>
      </div>
    </section>
  );
}
