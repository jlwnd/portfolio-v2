import {
  AboutMePageContent,
  SiteSettings,
  ExperiencePageContent,
  HeroPageContent,
  Project,
  SkillsPageContent,
} from "@/types";
import { sanity } from "./sanity";

export const getHeroContent = async (
  locale: string = "en",
): Promise<HeroPageContent> => {
  const result = await sanity.fetch<HeroPageContent>(
    `
    *[_type == "heroPage" && language == $locale][0] {
      title,
      "imageUrl": image.asset->url,
      techStack
    }
  `,
    { locale },
  );

  if (result) return result;

  return sanity.fetch<HeroPageContent>(`
    *[_type == "heroPage"][0] {
      title,
      "imageUrl": image.asset->url,
      techStack
    }
  `);
};

export const getAboutMeContent = async (
  locale: string = "en",
): Promise<AboutMePageContent> => {
  const result = await sanity.fetch<AboutMePageContent>(
    `
    *[_type == "aboutMePage" && language == $locale][0] {
      content
    }`,
    { locale },
  );

  if (result) return result;

  return sanity.fetch<AboutMePageContent>(`
    *[_type == "aboutMePage"][0] {
      content
    }`);
};

export const getSkills = async (
  locale: string = "en",
): Promise<SkillsPageContent> => {
  const result = await sanity.fetch<SkillsPageContent>(
    `
    *[_type == "skillsPage" && language == $locale][0]{
      categories[]{
        title,
        "skills": skills[]{
          name,
          "iconUrl": icon.asset->url
        }
      }
    }
  `,
    { locale },
  );

  if (result) return result;

  return sanity.fetch<SkillsPageContent>(`
    *[_type == "skillsPage"][0]{
      categories[]{
        title,
        "skills": skills[]{
          name,
          "iconUrl": icon.asset->url
        }
      }
    }
  `);
};

export const getExperience = async (
  locale: string = "en",
): Promise<ExperiencePageContent> => {
  const result = await sanity.fetch<ExperiencePageContent>(
    `
    *[_type == "experiencePage" && language == $locale][0]{
      professionalExperience,
      educationalExperience
    }
  `,
    { locale },
  );

  if (result) return result;

  return sanity.fetch<ExperiencePageContent>(`
    *[_type == "experiencePage"][0]{
      professionalExperience,
      educationalExperience
    }
  `);
};

export const getFeaturedProjects = async (
  locale: string = "en",
): Promise<Project[]> => {
  const result = await sanity.fetch<Project[]>(
    `
    *[_type == "project" && featured == true && language == $locale] | order(lastUpdated desc) {
      "slug": slug.current,
      name,
      description,
      featured,
      confidential,
      type,
      timeline,
      status,
      "technologies": coalesce(technologies, []),
      links,
      "images": coalesce(images[].asset->url, [])
    }
  `,
    { locale },
  );

  if (result && result.length > 0) return result;

  return sanity.fetch<Project[]>(`
    *[_type == "project" && featured == true] | order(lastUpdated desc) {
      "slug": slug.current,
      name,
      description,
      featured,
      confidential,
      type,
      timeline,
      status,
      "technologies": coalesce(technologies, []),
      links,
      "images": coalesce(images[].asset->url, [])
    }
  `);
};

export const getProjects = async (
  locale: string = "en",
): Promise<Project[]> => {
  const result = await sanity.fetch<Project[]>(
    `
    *[_type == "project" && language == $locale] | order(lastUpdated desc) {
      "slug": slug.current,
      name,
      description,
      featured,
      confidential,
      type,
      timeline,
      status,
      "technologies": coalesce(technologies, []),
      links,
      "images": coalesce(images[].asset->url, [])
    }
  `,
    { locale },
  );

  if (result && result.length > 0) return result;

  return sanity.fetch<Project[]>(`
    *[_type == "project"] | order(lastUpdated desc) {
      "slug": slug.current,
      name,
      description,
      featured,
      confidential,
      type,
      timeline,
      status,
      "technologies": coalesce(technologies, []),
      links,
      "images": coalesce(images[].asset->url, [])
    }
  `);
};

export const getProject = async (
  slug: string,
  locale: string = "en",
): Promise<Project> => {
  const result = await sanity.fetch<Project>(
    `
    *[_type == "project" && slug.current == $slug && language == $locale][0] {
      "slug": slug.current,
      name,
      description,
      featured,
      confidential,
      type,
      timeline,
      status,
      "technologies": coalesce(technologies, []),
      links,
      "images": coalesce(images[].asset->url, []),
      content,
      "translations": *[_type == "translation.metadata" && references(^._id)][0]
        .translations[]{ "language": _key, "slug": value->slug.current },
      features,
      technicalDetails,
      challenges,
      outcome
    }
  `,
    { slug, locale },
  );

  if (result) return result;

  return sanity.fetch<Project>(
    `
    *[_type == "project" && slug.current == $slug][0] {
      "slug": slug.current,
      name,
      description,
      featured,
      confidential,
      type,
      timeline,
      status,
      "technologies": coalesce(technologies, []),
      links,
      "images": coalesce(images[].asset->url, []),
      content,
      "translations": *[_type == "translation.metadata" && references(^._id)][0]
        .translations[]{ "language": _key, "slug": value->slug.current },
      features,
      technicalDetails,
      challenges,
      outcome
    }
  `,
    { slug },
  );
};

const UI_STRINGS_PROJECTION = `{
  metadata, nav, hero, about, skills, timeline, featuredProjects,
  projects, projectDetail, notFound, footer, localeSwitcher
}`;

type UiStrings = Record<string, Record<string, string>>;

export const getUiStrings = async (
  locale: string = "en",
): Promise<UiStrings> => {
  const result = await sanity.fetch<UiStrings | null>(
    `*[_type == "uiStrings" && language == $locale][0] ${UI_STRINGS_PROJECTION}`,
    { locale },
  );

  if (result) return result;

  const fallback = await sanity.fetch<UiStrings | null>(
    `*[_type == "uiStrings"][0] ${UI_STRINGS_PROJECTION}`,
  );
  if (!fallback) throw new Error("No uiStrings document found in Sanity");
  return fallback;
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const result = await sanity.fetch<SiteSettings | null>(`
    *[_type == "siteSettings" && _id == "siteSettings"][0] {
      name,
      email,
      githubUrl,
      linkedinUrl,
      "logoUrl": logo.asset->url,
      "ogImageUrl": ogImage.asset->url
    }
  `);
  if (!result) throw new Error("No siteSettings document found in Sanity");
  return result;
};

export type SitemapProject = {
  slug: string;
  language: string;
  updatedAt: string;
  translations?: { language: string; slug?: string }[];
};

export const getProjectsForSitemap = async (): Promise<SitemapProject[]> =>
  sanity.fetch<SitemapProject[]>(`
    *[_type == "project" && defined(slug.current) && defined(language)] {
      "slug": slug.current,
      language,
      "updatedAt": _updatedAt,
      "translations": *[_type == "translation.metadata" && references(^._id)][0]
        .translations[]{ "language": _key, "slug": value->slug.current }
    }
  `);
