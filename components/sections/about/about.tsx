import { TechBackground } from "@/components/ui/tech-background";
import { SectionHeading } from "@/components/ui/section-heading";
import { AboutMotion } from "./about-motion";
import { AboutMePageContent, SkillsPageContent } from "@/types";
import { useTranslations } from "next-intl";

export function About({
  skillsPageContent,
  aboutContent,
}: {
  skillsPageContent: SkillsPageContent;
  aboutContent: AboutMePageContent;
}) {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <TechBackground skills={skillsPageContent.skills} />

      <div className="container px-4 mx-auto relative z-10">
        <SectionHeading>{t("heading")}</SectionHeading>

        <AboutMotion content={aboutContent?.content} />
      </div>
    </section>
  );
}
