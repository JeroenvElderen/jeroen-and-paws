import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function StorySection() {
  return (
    <section className="bg-white px-6 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl shadow-xl shadow-emerald-950/10">
          <PlaceholderImage alt="Jeroen, founder of Jeroen & Paws, with his rescue dog Paws" />
        </div>
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-950">It Started With a Rescue Named Paws</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
            <p>In 2019, our founder Jeroen adopted a nervous rescue mutt named Paws. He needed daily exercise and socialization, but every dog walking service he tried felt impersonal.</p>
            <p>Jeroen started walking Paws himself, then his neighbor&apos;s dog, then three more dogs on the block. Within six months, he&apos;d built a small community of pet owners who trusted him with their animals.</p>
            <p>Today, we walk over 50 dogs a week across the area. But the philosophy hasn&apos;t changed: every pet gets the same attention and care that Paws got on that first walk.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
