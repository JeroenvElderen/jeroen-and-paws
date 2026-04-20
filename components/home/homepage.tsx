import { SectionOneHero } from "@/components/home/sections/section-one";
import { SectionTwoServices } from "@/components/home/sections/section-two";
import { SectionThreeImages } from "@/components/home/sections/section-three";
import { SectionFourContact } from "@/components/home/sections/section-four";
import { SectionFiveTeam } from "@/components/home/sections/section-five";
import { SectionSixFaq } from "@/components/home/sections/section-six";
import { SectionSevenContact } from "@/components/home/sections/section-seven";

export function Homepage() {
  return (
    <>
      <SectionOneHero />
      <div className="bg-[#f7f1eb]">
        <SectionTwoServices />
        <SectionThreeImages />
        <SectionFourContact />
        <SectionFiveTeam />
        <SectionSixFaq />
        <SectionSevenContact />
      </div>
    </>
  );
}