import { SectionOneHero } from "@/components/home/sections/section-one";
import { SectionTwoServices } from "@/components/home/sections/section-two";
import { SectionThreeImages } from "@/components/home/sections/section-three";
import { SectionFourContact } from "@/components/home/sections/section-four";

export function Homepage() {
  return (
    <>
      <SectionOneHero />
      <div className="bg-[#f7f1eb]">
        <SectionTwoServices />
        <SectionThreeImages />
        <SectionFourContact />
      </div>
    </>
  );
}