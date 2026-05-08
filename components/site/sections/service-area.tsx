import { Check, MapPin } from "lucide-react";

import { neighborhoods } from "@/components/site/data";

export function ServiceArea() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="flex min-h-[350px] items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-100 to-sky-100">
        <MapPin aria-hidden="true" className="h-20 w-20 text-emerald-700/30" />
      </div>
      <div>
        <h3 className="text-2xl font-extrabold text-slate-950">Neighborhoods We Serve</h3>
        <ul className="mt-6 grid grid-cols-2 gap-3 text-slate-700">
          {neighborhoods.map((neighborhood) => (
            <li key={neighborhood} className="flex items-center gap-2">
              <Check aria-hidden="true" className="h-4 w-4 text-emerald-700" />
              {neighborhood}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
