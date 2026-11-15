import { ProjectsFilter } from "@/components/projects/projects-filter";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ProjectsHeader } from "@/components/projects/projects-header";
import { getProjects, getSiteSettings } from "@/lib/queries";
import { languageAlternates, localizedUrl } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const site = await getSiteSettings();

  return {
    title: t("projectsTitle"),
    description: t("projectsDescription"),
    alternates: {
      canonical: localizedUrl(locale, "/projects"),
      languages: languageAlternates("/projects"),
    },
    openGraph: {
      url: localizedUrl(locale, "/projects"),
      title: t("projectsTitle"),
      description: t("projectsDescription"),
      type: "website",
      ...(site.ogImageUrl && {
        images: [
          {
            url: site.ogImageUrl,
            width: 1200,
            height: 630,
            alt: t("projectsImageAlt"),
          },
        ],
      }),
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await getProjects(locale);

  return (
    <div className="flex-1 container mx-auto px-4 py-16 md:py-24">
      <ProjectsHeader />
      <ProjectsFilter />
      <ProjectsGrid projects={projects} />
    </div>
  );
}
