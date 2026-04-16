import { Header } from "@/components/home/header";
import { dataModelImprovements } from "@/lib/data/site-data";

export default function ModelImprovementsPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <section className="mx-auto w-full max-w-4xl px-6 py-14 sm:px-10 lg:px-12">
        <h1 className="text-4xl font-semibold">Data model improvement plan</h1>
        <p className="mt-3 text-stone-600">
          These changes keep your existing Supabase shape but make future pricing,
          reporting, and booking workflows easier to maintain.
        </p>

        <ul className="mt-8 list-disc space-y-3 pl-5 text-stone-700">
          {dataModelImprovements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}