import { ProjectContent } from "@/components/projects/project-content";
import { ProjectDetails } from "@/components/projects/project-details";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectHeader } from "@/components/projects/project-header";
import { ProjectLinks } from "@/components/projects/project-links";
import { getProject } from "@/lib/queries";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const revalidate = 86400;

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
        <ProjectGallery images={project.images} />

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
