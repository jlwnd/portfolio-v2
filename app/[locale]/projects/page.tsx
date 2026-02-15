import { ProjectsFilter } from "@/components/projects/projects-filter";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ProjectsHeader } from "@/components/projects/projects-header";
import { getProjects } from "@/lib/queries";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("projectsTitle"),
    description: t("projectsDescription"),
    openGraph: {
      title: t("projectsTitle"),
      description: t("projectsDescription"),
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("projectsImageAlt"),
        },
      ],
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
