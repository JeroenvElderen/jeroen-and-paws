import { dataModelImprovements } from "@/lib/data/site-data";

export default function ModelImprovementsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-muted/70 text-foreground">
      <section className="mx-auto w-full max-w-4xl px-6 py-14 sm:px-10 lg:px-12">
        <h1 className="text-4xl font-semibold">Data model improvement plan</h1>
        <p className="mt-3 text-muted-foreground">
          These changes keep your existing Supabase shape but make future pricing,
          reporting, and booking workflows easier to maintain.
        </p>

        <ul className="mt-8 list-disc space-y-3 pl-5 text-muted-foreground">
          {dataModelImprovements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
