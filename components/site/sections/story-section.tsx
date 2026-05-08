import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function StorySection() {
  return (
    <section className="bg-slate-900 px-6 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl shadow-xl shadow-black/40 ring-1 ring-white/10">
          <PlaceholderImage alt="Jeroen's profile" />
        </div>
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white">Exceptional care doesn’t just meet your dog’s needs — it helps them become their best self.</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
            <p>Hi, I&apos;m Jeroen — a certified canine specialist with over 7 years of experience, working with both companion and working dogs using proven, ethical training methods.</p>
            <p>I provide personalized training, thoughtful care, and a safe, enriching environment for every dog I welcome. From customized walks to structured day care and boarding, your dog receives consistency and dedication.</p>
            <p>I prioritize safety, emotional well-being, and clear communication — keeping you informed and your dog happy, relaxed, and thriving.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
