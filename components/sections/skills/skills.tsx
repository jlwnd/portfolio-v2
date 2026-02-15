import { SectionHeading } from "@/components/ui/section-heading";
import { SkillsMotion } from "./skills-motion";
import { SkillsPageContent } from "@/types";
import { useTranslations } from "next-intl";

export function Skills({
  skillsPageContent,
}: {
  skillsPageContent: SkillsPageContent;
}) {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 mx-auto">
        <SectionHeading>{t("heading")}</SectionHeading>
        <SkillsMotion skills={skillsPageContent.skills} />
      </div>
    </section>
  );
}
