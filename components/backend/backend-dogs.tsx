"use client";

import { Cake, CalendarDays, CheckCircle2, ChevronDown, Dog, Edit3, Filter, Mail, Mars, MoreVertical, PawPrint, Phone, Plus, Search, StickyNote, UserRound, Venus, Weight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Card } from "./card";

const statCards = [
  ["total", "Total Dogs", Dog, "purple"],
  ["active", "Active Dogs", CheckCircle2, "green"],
  ["bookings", "With Recent Bookings", CalendarDays, "orange"],
  ["birthdays", "Live Rows", Cake, "violet"],
] as const;

const toneClasses = {
  purple: "bg-[#f0e9fb] text-[#5b2aa0]",
  green: "bg-green-100 text-green-700",
  orange: "bg-orange-100 text-orange-600",
  violet: "bg-[#f2eafd] text-[#5b2aa0]",
} as const;

type BackendDog = {
  id: string;
  name: string;
  gender: "male" | "female" | "unknown";
  owner: string;
  phone: string;
  email: string;
  breed: string;
  age: string;
  status: string;
  lastDate: string | null;
  lastService: string;
  notes: number;
  notesText: string;
  image: string;
};

const fallbackDogImage = "/images/dogs/kaiser.jpg";

const fallbackDogRows: BackendDog[] = [
  { id: "max", name: "Max", gender: "male", owner: "Sarah Johnson", phone: "+353 87 123 4567", email: "sarah.j@email.com", breed: "Golden Retriever", age: "3 years", status: "Active", lastDate: "2024-05-25T00:00:00.000Z", lastService: "Dog Walk", notes: 2, notesText: "Gets excited around other dogs. Loves tennis balls!", image: fallbackDogImage },
];

type DogsApiResponse = {
  dogs?: BackendDog[];
  isFallback?: boolean;
};

function getSupabaseRealtimeConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return url && key ? { url, key } : null;
}

function formatDisplayDate(value: string | null) {
  if (!value) return "No date yet";

  return new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

function DogProfileImage({ alt, className, height, src, width }: { alt: string; className: string; height: number; src: string; width: number }) {
  const [imageSrc, setImageSrc] = useState(src || fallbackDogImage);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImageSrc(fallbackDogImage)}
    />
  );
}

export function BackendDogs({ accessToken }: { accessToken: string }) {
  const [dogRows, setDogRows] = useState<BackendDog[]>(fallbackDogRows);
  const [selectedDogId, setSelectedDogId] = useState(fallbackDogRows[0]?.id ?? "");
  const [isLoadingDogs, setIsLoadingDogs] = useState(true);
  const [dogError, setDogError] = useState<string | null>(null);

  const loadDogs = useCallback(async () => {
    try {
      const response = await fetch("/api/dogs", { cache: "no-store", headers: { Authorization: `Bearer ${accessToken}` } });
      if (!response.ok) throw new Error(`Dogs API returned ${response.status}`);
      const payload = (await response.json()) as DogsApiResponse;
      const nextDogs = payload.dogs?.length ? payload.dogs : fallbackDogRows;
      setDogRows(nextDogs);
      setSelectedDogId((current) => nextDogs.some((dog) => dog.id === current) ? current : nextDogs[0]?.id ?? "");
      setDogError(payload.isFallback ? "Showing placeholder dogs until Supabase data is available." : null);
    } catch (error) {
      setDogError(error instanceof Error ? error.message : "Unable to load dogs.");
    } finally {
      setIsLoadingDogs(false);
    }
  }, [accessToken]);

  useEffect(() => {
    queueMicrotask(() => void loadDogs());
  }, [loadDogs]);

  useEffect(() => {
    const config = getSupabaseRealtimeConfig();
    if (!config || !accessToken) return;

    let isActive = true;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    const socket = new WebSocket(`${config.url.replace(/^http/, "ws")}/realtime/v1/websocket?apikey=${encodeURIComponent(config.key)}&vsn=1.0.0`);
    socket.addEventListener("open", () => {
      if (!isActive || socket.readyState !== WebSocket.OPEN) {
        socket.close();
        return;
      }

      socket.send(JSON.stringify({ topic: "realtime:backend-dogs", event: "phx_join", payload: { config: { postgres_changes: ["portal_dogs", "portal_clients", "portal_bookings", "portal_session_updates"].map((table) => ({ event: "*", schema: "public", table })) }, access_token: accessToken }, ref: "1" }));
      heartbeat = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ topic: "phoenix", event: "heartbeat", payload: {}, ref: String(Date.now()) }));
        }
      }, 25000);
    });
    socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data as string) as { event?: string };
        if (message.event === "postgres_changes") void loadDogs();
      } catch {
        // Ignore non-JSON realtime frames.
      }
    });

    return () => {
      isActive = false;
      if (heartbeat) clearInterval(heartbeat);
      if (socket.readyState === WebSocket.OPEN) socket.close();
    };
  }, [accessToken, loadDogs]);

  const selectedDog = useMemo(() => dogRows.find((dog) => dog.id === selectedDogId) ?? dogRows[0] ?? fallbackDogRows[0], [dogRows, selectedDogId]);
  const activeDogs = dogRows.filter((dog) => dog.status === "Active").length;
  const dogStats = {
    total: { value: String(dogRows.length), detail: "Synced from Supabase" },
    active: { value: String(activeDogs), detail: `${dogRows.length ? Math.round((activeDogs / dogRows.length) * 100) : 0}% of total` },
    bookings: { value: String(dogRows.filter((dog) => dog.lastService !== "No bookings yet").length), detail: "Dogs with booking history" },
    birthdays: { value: String(dogRows.length), detail: "Live table rows" },
  };

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div><h1 className="font-serif text-3xl">Dogs <PawPrint className="inline size-6 text-[#6c38c2]" /></h1><p className="mt-1 text-sm text-[#6d667a]">View and manage all dogs in your care.</p></div>
        <button className="rounded-lg bg-[#4f2c91] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25"><Plus className="mr-2 inline size-4" />Add New Dog</button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(([key, label, Icon, tone]) => (
          <Card key={label} className="p-6"><div className="flex items-center gap-6"><span className={`grid size-14 place-items-center rounded-full ${toneClasses[tone]}`}><Icon className="size-7" /></span><div><p className="text-sm text-[#6d667a]">{label}</p><p className="mt-1 font-serif text-3xl">{dogStats[key].value}</p><p className="mt-2 text-sm text-[#6d667a]">{dogStats[key].detail}</p></div></div></Card>
        ))}
      </div>

      <div className="mt-6 grid gap-5 2xl:grid-cols-[1fr_23rem]">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[#151124]/10 p-5 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-[#151124]/10 px-4 py-3 text-sm text-[#858093] lg:max-w-lg"><Search className="size-5" /><input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search dogs by name, breed, or owner..." /></label>
            <div className="flex flex-wrap gap-3"><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Statuses <ChevronDown className="ml-6 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Breeds <ChevronDown className="ml-6 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm"><Filter className="mr-2 inline size-4" />Filters</button></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-[#fbf9fd] text-xs font-semibold text-[#4f2c91]"><tr>{["Dog", "Owner", "Breed", "Age", "Status", "Last Service", "Notes", ""].map((h)=><th key={h} className="px-5 py-4">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-[#151124]/10">
                {dogRows.map((dog) => (
                  <tr key={dog.id} onClick={() => setSelectedDogId(dog.id)} className={`cursor-pointer align-middle transition ${selectedDog.id === dog.id ? "bg-[#f6f0ff]" : "bg-white hover:bg-[#fbf9fd]"}`}>
                    <td className="px-5 py-4"><div className="flex items-center gap-4"><DogProfileImage key={dog.image} src={dog.image} alt={`${dog.name} profile`} width={44} height={44} className="size-11 rounded-full object-cover" /><p className="font-semibold">{dog.name} {dog.gender === "male" ? <Mars className="inline size-4 text-blue-500" /> : dog.gender === "female" ? <Venus className="inline size-4 text-pink-500" /> : null}</p></div></td>
                    <td className="px-5 py-4"><p className="font-semibold">{dog.owner}</p><p className="mt-1 text-[#6d667a]">{dog.phone}</p></td>
                    <td className="px-5 py-4">{dog.breed}</td><td className="px-5 py-4">{dog.age}</td>
                    <td className="px-5 py-4"><span className={`rounded-md px-3 py-1 text-xs font-medium ${dog.status === "Active" ? "bg-green-100 text-green-700" : "bg-zinc-200 text-zinc-600"}`}>{dog.status}</span></td>
                    <td className="px-5 py-4"><p>{formatDisplayDate(dog.lastDate)}</p><p className="mt-1 text-[#6d667a]">{dog.lastService}</p></td>
                    <td className="px-5 py-4"><StickyNote className="mr-1 inline size-4 text-[#4f4863]" />{dog.notes}</td>
                    <td className="px-5 py-4"><button aria-label={`Actions for ${dog.name}`} className="rounded-lg border border-[#151124]/10 p-2 text-[#4f4863]"><MoreVertical className="size-5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4 border-t border-[#151124]/10 p-5 text-sm text-[#6d667a] sm:flex-row sm:items-center sm:justify-between"><p>{isLoadingDogs ? "Loading live dogs…" : `Showing 1 to ${dogRows.length} of ${dogRows.length} dogs`}{dogError ? ` · ${dogError}` : ""}</p><div className="flex gap-2">{["←", "1", "2", "3", "...", "6", "→"].map((p)=><button key={p} className={`grid size-9 place-items-center rounded-md border border-[#151124]/10 ${p === "1" ? "border-[#5b2aa0] text-[#5b2aa0]" : "text-[#4f4863]"}`}>{p}</button>)}</div></div>
        </Card>

        <Card className="overflow-hidden p-5">
          <div className="flex justify-end"><X className="size-5 text-[#4f4863]" /></div>
          <div className="flex items-center gap-4"><DogProfileImage key={selectedDog.image} src={selectedDog.image} alt={`${selectedDog.name} profile`} width={74} height={74} className="size-[74px] rounded-full object-cover" /><div><h2 className="font-serif text-2xl">{selectedDog.name} {selectedDog.gender === "male" ? <Mars className="inline size-4 text-blue-500" /> : selectedDog.gender === "female" ? <Venus className="inline size-4 text-pink-500" /> : null}</h2><p className="text-sm text-[#6d667a]">{selectedDog.breed}</p><span className={`mt-2 inline-block rounded-md px-3 py-1 text-xs font-medium ${selectedDog.status === "Active" ? "bg-green-100 text-green-700" : "bg-zinc-200 text-zinc-600"}`}>{selectedDog.status}</span></div></div>
          <div className="mt-8 flex border-b border-[#151124]/10 text-sm font-semibold text-[#4f4863]"><button className="border-b-2 border-[#5b2aa0] px-4 pb-3 text-[#5b2aa0]">Overview</button><button className="px-4 pb-3">Info</button><button className="px-4 pb-3">History</button><button className="px-4 pb-3">Notes</button></div>
          <div className="mt-5 space-y-5 text-sm">
            {[ [UserRound, "Owner", selectedDog.owner], [Phone, "Phone", selectedDog.phone], [Mail, "Email", selectedDog.email], [Cake, "Age", selectedDog.age], [Weight, "Breed", selectedDog.breed], [CalendarDays, "Last Service", `${formatDisplayDate(selectedDog.lastDate)}\n${selectedDog.lastService}`], [CalendarDays, "Live Status", isLoadingDogs ? "Refreshing from Supabase…" : "Synced from Supabase realtime"], [StickyNote, "Notes", selectedDog.notesText] ].map(([Icon, label, value]) => <div key={String(label)} className="grid grid-cols-[1.2rem_5rem_1fr] gap-3 text-[#4f4863]"><Icon className="size-4 text-[#6c38c2]" /><span>{label as string}</span><span className="whitespace-pre-line text-[#4f4863]">{value as string}</span></div>)}
          </div>
          <button className="mt-7 w-full rounded-lg bg-[#4f2c91] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25">View Dog Profile →</button>
          <button className="mt-3 w-full rounded-lg border border-[#151124]/10 px-5 py-3 text-sm font-semibold text-[#4f4863]"><Edit3 className="mr-2 inline size-4" />Edit Dog Info</button>
        </Card>
      </div>
    </div>
  );
}