import { ProjectsFilter } from "@/components/projects/projects-filter";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ProjectsHeader } from "@/components/projects/projects-header";
import { getProjects } from "@/lib/queries";
import { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Projects | Jakub Lewandowski - Fullstack Developer",
  description:
    "A showcase of technical projects including Go CLI tools, backend systems, and full-stack applications built with modern technologies.",
  keywords: [
    "Backend development",
    "Go CLI tools",
    "NestJS",
    "React projects",
    "Next.js portfolio",
    "web development",
    "fullstack developer",
    "Jakub Lewandowski",
    "AI/ML",
    "machine learning",
    "artificial intelligence",
    "neural networks",
    "LLM",
    "large language models",
    "natural language processing",
    "cloud computing",
    "AWS",
    "Google Cloud",
    "cloud infrastructure",
    "DevOps",
  ],
  openGraph: {
    title: "Projects | Jakub Lewandowski - Fullstack Developer",
    description:
      "A showcase of technical projects including Go CLI tools, backend systems, and full-stack applications built with modern technologies.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jakub Lewandowski's Projects",
      },
    ],
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex-1 container mx-auto px-4 py-16 md:py-24">
      <ProjectsHeader />
      <ProjectsFilter />
      <ProjectsGrid projects={projects} />
    </div>
  );
}
