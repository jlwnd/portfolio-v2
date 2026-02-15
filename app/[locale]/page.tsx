import { About } from "@/components/sections/about/about";
import { FeaturedProjects } from "@/components/sections/featured-projects/featured-projects";
import { Hero } from "@/components/sections/hero/hero";
import { Skills } from "@/components/sections/skills/skills";
import { Timeline } from "@/components/sections/timeline/timeline";
import {
  getAboutMeContent,
  getFeaturedProjects,
  getSkills,
} from "@/lib/queries";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 86400;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const skillsPageContent = await getSkills(locale);
  const aboutContent = await getAboutMeContent(locale);
  const featuredProjects = await getFeaturedProjects(locale);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <Hero locale={locale} />
        <About
          skillsPageContent={skillsPageContent}
          aboutContent={aboutContent}
        />
        <Skills skillsPageContent={skillsPageContent} />
        <Timeline locale={locale} />
        <FeaturedProjects projects={featuredProjects} />
      </main>
    </div>
  );
}
