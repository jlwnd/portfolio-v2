import { routing } from "@/i18n/routing";
import { getProjectsForSitemap } from "@/lib/queries";
import { languageAlternates, localizedUrl } from "@/lib/site";
import { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages = ["", "/projects"].flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified: now,
      alternates: { languages: languageAlternates(path) },
    })),
  );

  const projects = await getProjectsForSitemap();
  const projectPages = projects.map((project) => ({
    url: localizedUrl(project.language, `/projects/${project.slug}`),
    lastModified: new Date(project.updatedAt),
    alternates: {
      languages: Object.fromEntries(
        (project.translations ?? [])
          .filter((tr) => tr.slug)
          .map((tr) => [tr.language, localizedUrl(tr.language, `/projects/${tr.slug}`)]),
      ),
    },
  }));

  return [...staticPages, ...projectPages];
}
