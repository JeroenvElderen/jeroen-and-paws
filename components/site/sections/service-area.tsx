import { Check, MapPin } from "lucide-react";

import { neighborhoods } from "@/components/site/data";

export function ServiceArea() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="flex min-h-[350px] items-center justify-center rounded-3xl bg-gradient-to-br from-[#211a14] to-[#141a21]">
        <MapPin aria-hidden="true" className="h-20 w-20 text-[#d1a34d]/30" />
      </div>
      <div>
        <h3 className="text-2xl font-extrabold text-[#fff7e8]">
          Neighborhoods We Serve
        </h3>
        <ul className="mt-6 grid grid-cols-2 gap-3 text-[#d8cab8]">
          {neighborhoods.map((neighborhood) => (
            <li key={neighborhood} className="flex items-center gap-2">
              <Check aria-hidden="true" className="h-4 w-4 text-[#d1a34d]" />
              {neighborhood}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
