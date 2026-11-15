import { PortableTextBlock } from "@portabletext/types";

export type SiteSettings = {
  name: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  logoUrl: string;
  ogImageUrl?: string;
};

export type HeroPageContent = {
  title: string;
  imageUrl: string;
  techStack: string[];
};

export type AboutMePageContent = {
  content: PortableTextBlock[];
};

export type SkillItem = {
  name: string;
  iconUrl?: string;
};

export type SkillCategory = {
  title: string;
  skills: SkillItem[];
};

export type SkillsPageContent = {
  categories: SkillCategory[];
};

export type TimelineItem = {
  date: string;
  title: string;
  description: string;
  technologies?: string[];
};

export type ExperiencePageContent = {
  professionalExperience: TimelineItem[];
  educationalExperience: TimelineItem[];
};

export type LinkItem = {
  _key: string;
  type: "github" | "live";
  url: string;
  label?: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  featured: boolean;
  confidential?: boolean;
  type: string;
  timeline: string;
  status: string;
  technologies: string[];
  links?: LinkItem[];
  content?: PortableTextBlock[];
  images: string[];
  features?: string[];
  technicalDetails?: string;
  challenges?: string;
  outcome?: string;
};
