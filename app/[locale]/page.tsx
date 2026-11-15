import { About } from "@/components/sections/about/about";
import { FeaturedProjects } from "@/components/sections/featured-projects/featured-projects";
import { Hero } from "@/components/sections/hero/hero";
import { Skills } from "@/components/sections/skills/skills";
import { Timeline } from "@/components/sections/timeline/timeline";
import {
  getAboutMeContent,
  getFeaturedProjects,
  getHeroContent,
  getSiteSettings,
  getSkills,
} from "@/lib/queries";
import { SITE_URL, languageAlternates, localizedUrl } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    alternates: {
      canonical: localizedUrl(locale),
      languages: languageAlternates(),
    },
  };
}

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
  const [site, hero, t] = await Promise.all([
    getSiteSettings(),
    getHeroContent(locale),
    getTranslations({ locale, namespace: "metadata" }),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: site.name,
        url: SITE_URL,
        inLanguage: locale,
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: site.name,
        jobTitle: hero.title,
        description: t("description"),
        url: SITE_URL,
        image: hero.imageUrl,
        email: `mailto:${site.email}`,
        sameAs: [site.githubUrl, site.linkedinUrl].filter(Boolean),
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
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
