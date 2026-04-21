import { SectionOneHero } from "@/components/home/sections/section-one";
import { SectionTwoServices } from "@/components/home/sections/section-two";
import { SectionThreeImages } from "@/components/home/sections/section-three";
import { SectionFourContact } from "@/components/home/sections/section-four";
import { SectionFiveTeam } from "@/components/home/sections/section-five";
import { SectionSixFaq } from "@/components/home/sections/section-six";
import { SectionSevenContact } from "@/components/home/sections/section-seven";

export function Homepage() {
  return (
    <div className="relative overflow-hidden pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_85%_12%,rgba(217,70,239,0.2),transparent_32%),radial-gradient(circle_at_50%_95%,rgba(74,222,128,0.16),transparent_30%)]" />
      <SectionOneHero />
      <SectionTwoServices />
      <SectionThreeImages />
      <SectionFourContact />
      <SectionFiveTeam />
      <SectionSixFaq />
      <SectionSevenContact />
    </div>
  );
}
