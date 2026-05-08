import { teamMembers } from "@/components/site/data";
import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function TeamSection() {
  return (
    <div className="grid gap-7 md:grid-cols-3">
      {teamMembers.map((member) => (
        <article key={member.name} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="relative h-80">
            <PlaceholderImage alt={member.alt} sizes="(min-width: 768px) 33vw, 100vw" />
          </div>
          <div className="p-7">
            <h3 className="text-2xl font-extrabold text-slate-950">{member.name}</h3>
            <p className="mt-1 font-extrabold text-purple-700">{member.role}</p>
            <p className="mt-4 leading-7 text-slate-600">{member.bio}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
