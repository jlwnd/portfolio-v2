import { SectionHeading } from "@/components/ui/section-heading";
import { TimelineMotion } from "./timeline-motion";
import { getExperience } from "@/lib/queries";
import { getTranslations } from "next-intl/server";

export async function Timeline({ locale }: { locale: string }) {
  const experiencePageContent = await getExperience(locale);
  const t = await getTranslations("timeline");

  return (
    <section id="timeline" className="py-20 md:py-32 bg-mesh-gradient relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>

      <div className="container px-4 mx-auto relative z-10">
        <SectionHeading>{t("heading")}</SectionHeading>
        <TimelineMotion experiencePageContent={experiencePageContent} />
      </div>
    </section>
  );
}
