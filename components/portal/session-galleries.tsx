import {
  ArrowLeft,
  ArrowRight,
  Bell,
  ChevronDown,
  ChevronRight,
  Download,
  Filter,
  Heart,
  ImageIcon,
  PawPrint,
} from "lucide-react";
import Image from "next/image";

const recentSessions = [
  {
    title: "Golden Hour Dunes",
    date: "12 Jun 2026",
    photos: "68 photos",
    cover: "/images/dogs/ace.jpg",
    active: true,
  },
  {
    title: "Forest Adventure",
    date: "31 May 2026",
    photos: "72 photos",
    cover: "/images/dogs/shadow.jpg",
    active: false,
  },
  {
    title: "Heathland Walk",
    date: "18 May 2026",
    photos: "55 photos",
    cover: "/images/dogs/kaiser.jpg",
    active: false,
  },
  {
    title: "Bluebell Woods",
    date: "26 Apr 2026",
    photos: "62 photos",
    cover: "/images/dogs/lola.jpeg",
    active: false,
  },
  {
    title: "Lakeside Escape",
    date: "11 Apr 2026",
    photos: "60 photos",
    cover: "/images/dogs/nola.jpeg",
    active: false,
  },
] as const;

const galleryPhotos = [
  ["/images/dogs/ace.jpg", "Teddy walking through warm evening dunes"],
  ["/images/dogs/lakta.jpeg", "Golden dog sitting in long grass"],
  ["/images/dogs/lakta1.jpeg", "Golden dog looking over the dunes"],
  ["/images/dogs/lakta2.jpeg", "Golden dog smiling at sunset"],
  ["/images/dogs/compass.jpeg", "Dog resting in beach grass"],
  ["/images/dogs/nola.jpg", "Dog running down a sandy path"],
  ["/images/dogs/honey.jpg", "Happy dog portrait after a session"],
  ["/images/dogs/lola1.jpeg", "Dog standing in evening light"],
  ["/images/dogs/kaiser/kaiser1.jpeg", "Dog waiting on a woodland path"],
  ["/images/dogs/kaiser/kaiser2.jpeg", "Dog profile in golden light"],
  ["/images/dogs/compass1.jpeg", "Dog looking up from a forest walk"],
  ["/images/dogs/nola1.jpg", "Dog standing near the shoreline"],
] as const;

const pastSessions = [
  ["/images/dogs/echostevie.jpg", "Autumn Trails", "5 Oct 2025", "57 photos"],
  ["/images/dogs/ace.jpg", "Beach Day", "22 Aug 2025", "49 photos"],
  ["/images/dogs/lola/lola1.jpeg", "Bluebell Woods", "3 Jun 2025", "62 photos"],
] as const;

function GalleryPanel({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`rounded-xl border border-[#24163f]/10 bg-white shadow-[0_18px_55px_rgba(29,23,40,0.08)] ${className}`}>
      {children}
    </section>
  );
}

export function SessionGalleries({
  onBackToDashboard,
}: {
  onBackToDashboard: () => void;
}) {
  return (
    <div className="px-4 py-6 text-[#17132a] sm:px-8 lg:px-10 lg:py-10">
      <header className="mx-auto flex max-w-6xl items-start justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#4d2e91]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Dashboard
          </button>
          <h1 className="font-serif text-4xl leading-tight text-[#241f30]">
            Session Galleries <PawPrint aria-hidden="true" className="inline size-6 text-[#8b5cf6]" />
          </h1>
          <p className="mt-3 text-sm text-[#17132a]">Relive every moment from Teddy&apos;s latest adventures.</p>
        </div>
        <div className="flex items-center gap-5">
          <button aria-label="Notifications" className="relative text-[#2f1b59]">
            <Bell className="size-6" />
            <span className="absolute -right-1 -top-2 grid size-5 place-items-center rounded-full bg-[#17132a] text-[0.65rem] font-black text-white">2</span>
          </button>
          <div className="relative size-14 overflow-hidden rounded-full ring-2 ring-[#ead9b8]">
            <Image src="/images/dogs/ace.jpg" alt="Teddy profile photo" fill sizes="56px" className="object-cover" />
          </div>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-6xl space-y-6">
        <GalleryPanel className="p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-serif text-2xl text-[#241f30]">Recent Sessions</h2>
            <a href="#past-sessions" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#3f2581]">
              View all sessions <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {recentSessions.map((session) => (
              <article
                key={session.title}
                className={`overflow-hidden rounded-xl border bg-white ${session.active ? "border-[#4d2e91] shadow-[0_12px_28px_rgba(77,46,145,0.15)]" : "border-[#24163f]/10"}`}
              >
                <div className="relative h-40">
                  <Image src={session.cover} alt={`${session.title} session`} fill sizes="220px" className="object-cover" />
                  {session.active ? (
                    <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-[#4d2e91] text-white">
                      <ImageIcon aria-hidden="true" className="size-4" />
                    </span>
                  ) : null}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-[#25203d]">{session.title}</h3>
                  <p className="mt-2 text-xs text-[#5f5769]">{session.date}</p>
                  <p className="mt-1 text-xs text-[#5f5769]">{session.photos}</p>
                </div>
              </article>
            ))}
          </div>
        </GalleryPanel>

        <GalleryPanel className="p-5 sm:p-7">
          <div className="flex flex-col gap-5 border-b border-[#24163f]/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-8 text-sm font-medium">
              <a href="#" className="border-b-2 border-[#4d2e91] pb-4 text-[#3f2581]">All Photos</a>
              <a href="#" className="pb-4 text-[#5f5769]">Favourites</a>
              <a href="#" className="pb-4 text-[#5f5769]">Recently Added</a>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#5f5769]">
              <button type="button" className="inline-flex items-center gap-2 text-[#3f2581]">
                <Filter aria-hidden="true" className="size-4" />
                Filter
              </button>
              <span className="hidden h-6 w-px bg-[#24163f]/15 sm:block" />
              <button type="button" className="inline-flex items-center gap-2">
                Sort by: <span className="font-bold text-[#241f30]">Newest</span>
                <ChevronDown aria-hidden="true" className="size-4 text-[#3f2581]" />
              </button>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-serif text-2xl text-[#241f30]">Golden Hour Dunes</h2>
              <span className="rounded-full bg-[#f0e8f8] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#4d2e91]">
                68 photos
              </span>
            </div>
            <div className="flex gap-3">
              <button type="button" className="rounded border border-[#4d2e91]/30 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#3f2581]">
                Select photos
              </button>
              <button type="button" aria-label="Download gallery" className="grid size-11 place-items-center rounded border border-[#4d2e91]/30 text-[#3f2581]">
                <Download aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryPhotos.map(([src, alt], index) => (
              <figure key={`${src}-${index}`} className="group relative aspect-[1.22] overflow-hidden rounded-lg bg-[#eee6df]">
                <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 250px, (min-width: 640px) 45vw, 92vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <button
                  type="button"
                  aria-label="Add photo to favourites"
                  className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-[#4d2e91] opacity-0 shadow-lg transition group-hover:opacity-100"
                >
                  <Heart aria-hidden="true" className="size-4" />
                </button>
              </figure>
            ))}
          </div>

          <div className="mt-7 flex justify-center">
            <button type="button" className="inline-flex items-center gap-3 rounded border border-[#4d2e91]/30 px-8 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#3f2581]">
              Load more photos <ChevronDown aria-hidden="true" className="size-4" />
            </button>
          </div>
        </GalleryPanel>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <GalleryPanel className="p-6 sm:p-7">
            <h2 className="font-serif text-2xl text-[#241f30]">Gallery In Progress</h2>
            <p className="mt-3 text-sm text-[#5f5769]">More memories are on the way.</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-[9rem_1fr] sm:items-center">
              <div className="relative h-40 overflow-hidden rounded-lg">
                <Image src="/images/dogs/compass2.jpeg" alt="Dog in a meadow during an active photo session" fill sizes="144px" className="object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#25203d]">Spring Meadows</h3>
                <p className="mt-3 text-sm text-[#342c3f]">Session date: 25 June 2026</p>
                <span className="mt-4 inline-flex rounded bg-[#ede6f4] px-4 py-2 text-xs font-bold text-[#4d2e91]">Editing in progress</span>
                <button type="button" className="mt-5 block rounded border border-[#4d2e91]/30 px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#3f2581]">
                  View session
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-4 rounded-xl bg-[#f4eef8] p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#4d2e91]">
                <PawPrint aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="font-serif text-lg text-[#241f30]">Tip</p>
                <p className="mt-1 text-sm leading-6 text-[#5f5769]">Photos are typically ready within 2-3 weeks after your session.</p>
              </div>
            </div>
          </GalleryPanel>

          <GalleryPanel id="past-sessions" className="p-6 sm:p-7">
            <h2 className="font-serif text-2xl text-[#241f30]">Past Sessions</h2>
            <p className="mt-3 text-sm text-[#5f5769]">View and revisit Teddy&apos;s previous adventures.</p>

            <div className="mt-6 divide-y divide-[#24163f]/10">
              {pastSessions.map(([src, title, date, count]) => (
                <article key={title} className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="relative h-16 overflow-hidden rounded-lg">
                    <Image src={src} alt={`${title} session preview`} fill sizes="88px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#25203d]">{title}</h3>
                    <p className="mt-1 text-sm text-[#5f5769]">{date}</p>
                  </div>
                  <a href="#" className="flex items-center gap-4 text-sm text-[#5f5769]">
                    <span>{count}</span>
                    <ChevronRight aria-hidden="true" className="size-5 text-[#3f2581]" />
                  </a>
                </article>
              ))}
            </div>
          </GalleryPanel>
        </div>

        <footer className="pb-4 text-center text-sm text-[#5f5769]">
          <p className="inline-flex items-center gap-2">
            <Heart aria-hidden="true" className="size-4 text-[#4d2e91]" />
            Thank you for trusting me to capture Teddy&apos;s adventures.
          </p>
          <p className="mt-3 font-serif text-xl text-[#3f2581]">Jeroen <PawPrint aria-hidden="true" className="inline size-4" /></p>
        </footer>
      </div>
    </div>
  );
}
