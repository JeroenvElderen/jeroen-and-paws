import { Footer } from "@/components/site/layout/footer";
import { Header } from "@/components/site/layout/header";
import { SectionStack } from "@/components/site/layout/section-stack";
import { ScrollCue } from "@/components/site/ui/scroll-cue";
import type { PageName } from "@/components/site/data";

export function SiteShell({
  activePage,
  children,
}: {
  activePage: PageName;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header activePage={activePage} />
      <main id="main-content">{children}</main>
      <SectionStack />
      <Footer />
      <ScrollCue />
    </>
  );
}
