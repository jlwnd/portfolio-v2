import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jakub-lewandowski.dev";

  const routes = ["", "/projects", "/resume"];

  const sitemapEntries: MetadataRoute.Sitemap = routes.flatMap((route) => [
    {
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}${route}`,
          pl: `${baseUrl}/pl${route}`,
        },
      },
    },
  ]);

  const pdfUrl: MetadataRoute.Sitemap[number] = {
    url: `${baseUrl}/docs/CV.pdf`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  };

  return [...sitemapEntries, pdfUrl];
}
