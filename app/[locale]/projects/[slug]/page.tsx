import { ProjectContent } from "@/components/projects/project-content";
import { ProjectDetails } from "@/components/projects/project-details";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectHeader } from "@/components/projects/project-header";
import { ProjectLinks } from "@/components/projects/project-links";
import { getProject, getSiteSettings } from "@/lib/queries";
import { localizedUrl } from "@/lib/site";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const [project, site] = await Promise.all([
    getProject(slug, locale),
    getSiteSettings(),
  ]);
  if (!project) return {};

  const url = localizedUrl(locale, `/projects/${project.slug}`);
  const languages = Object.fromEntries(
    (project.translations ?? [])
      .filter((tr) => tr.slug)
      .map((tr) => [tr.language, localizedUrl(tr.language, `/projects/${tr.slug}`)]),
  );

  return {
    title: `${project.name} | ${site.name}`,
    description: project.description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "article",
      url,
      title: `${project.name} | ${site.name}`,
      description: project.description,
      ...(project.images[0] && { images: [{ url: project.images[0] }] }),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const project = await getProject(slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-1 w-full max-w-[95vw] md:max-w-[90vw] mx-auto px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <ProjectHeader project={project} />
        {project.images.length > 0 && (
          <ProjectGallery images={project.images} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <ProjectContent project={project} />
          </div>
          <div className="space-y-8">
            <ProjectDetails project={project} />
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
