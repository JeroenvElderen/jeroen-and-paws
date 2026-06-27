import { Check, MapPin } from "lucide-react";

import { businessInfo, serviceAreas } from "@/components/site/data";

export function ServiceArea() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="motion-card motion-card-dark flex min-h-[350px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#24163f] to-[#141a21] p-8 text-center">
        <MapPin
          aria-hidden="true"
          className="motion-icon h-20 w-20 text-[#8b5cf6]/40"
        />
        <p className="mt-6 max-w-sm text-lg font-bold leading-8 text-[#fff7e8]">
          {businessInfo.serviceAreaSummary}
        </p>
        <p className="mt-3 text-sm font-semibold text-[#988b7b]">
          Share your address or preferred route when you enquire.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-extrabold text-[#fff7e8]">
          Areas and care types we can confirm
        </h3>
        <p className="mt-3 leading-7 text-[#b9aa99]">
          Because each dog’s routine is different, availability is confirmed by
          appointment after a quick chat about distance, timing, temperament,
          and care requirements.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 text-[#d8cab8] sm:grid-cols-2">
          {serviceAreas.map((area) => (
            <li key={area} className="flex items-center gap-2">
              <Check aria-hidden="true" className="h-4 w-4 text-[#8b5cf6]" />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
