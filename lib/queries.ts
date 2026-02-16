import {
  AboutMePageContent,
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
      skills[]{
        name,
        "iconUrl": icon.asset->url
      }
    }
  `,
    { locale },
  );

  if (result) return result;

  return sanity.fetch<SkillsPageContent>(`
    *[_type == "skillsPage"][0]{
      skills[]{
        name,
        "iconUrl": icon.asset->url
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
    *[_type == "project" && featured == true && language == $locale] {
      "slug": slug.current,
      name,
      description,
      featured,
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
    *[_type == "project" && featured == true] {
      "slug": slug.current,
      name,
      description,
      featured,
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
    *[_type == "project" && language == $locale] {
      "slug": slug.current,
      name,
      description,
      featured,
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
    *[_type == "project"] {
      "slug": slug.current,
      name,
      description,
      featured,
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
      type,
      timeline,
      status,
      "technologies": coalesce(technologies, []),
      links,
      "images": coalesce(images[].asset->url, []),
      content,
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
      type,
      timeline,
      status,
      "technologies": coalesce(technologies, []),
      links,
      "images": coalesce(images[].asset->url, []),
      content,
      features,
      technicalDetails,
      challenges,
      outcome
    }
  `,
    { slug },
  );
};
