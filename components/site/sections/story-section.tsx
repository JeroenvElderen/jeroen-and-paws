import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function StorySection() {
  return (
    <section className="bg-[#111821] px-6 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="motion-media relative min-h-[360px] overflow-hidden rounded-3xl shadow-xl shadow-black/35">
          <PlaceholderImage
            alt="Ollie enjoying attentive Jeroen & Paws care"
            src="/images/dogs/ollie/ollie1.jpeg"
          />
        </div>
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#fff7e8]">
            About me
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-[#b9aa99]">
            <p>
              Hi, I&apos;m Jeroen — a certified canine specialist with over
              seven years of experience. I work with both companion and working
              dogs using proven, ethical training methods.
            </p>
            <p>
              I provide personalised training, thoughtful care, and a safe,
              enriching environment for every dog I welcome, from customised
              walks to structured day care and boarding.
            </p>
            <p>
              Exceptional care doesn&apos;t just meet your dog&apos;s needs — it
              helps them become their best self. That&apos;s what I deliver.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
