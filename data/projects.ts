enum ProjectStatus {
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  images: string[];
  features?: string[];
  technicalDetails?: string;
  challenges?: string;
  outcome?: string;
  isPinned: boolean;
  type: string;
  timeline: string;
  status: ProjectStatus;
  lastUpdated: Date;
  github?: string;
  deploymentUrl?: string;
}

export const projects: IProject[] = [
  {
    id: "this-very-portfolio",
    name: "This very portfolio",
    description:
      "Modern portfolio website built with Next.js, TypeScript and Tailwind CSS. Features responsive design, animated UI components, and project showcases. Uses Framer Motion for smooth transitions.",
    technologies: [
      "Next.js",
      "Typescript",
      "Tailwind CSS",
      "Framer Motion",
      "React",
      "shadcn/ui",
    ],
    images: ["/images/this-portfolio/hero.png"],
    isPinned: true,
    type: "Website",
    timeline: "2025",
    status: ProjectStatus.IN_PROGRESS,
    lastUpdated: new Date("04.25.2025"),
    github: "https://github.com/jlwnd/portfolio-v2",
    deploymentUrl: "https://jlewandowski.dev",
  },
  {
    id: "leftovers",
    name: "Leftovers",
    description:
      "This is the fullstack application, developed from scratch by myself during my internship at Moodup.",
    technologies: [
      "React",
      "NestJS",
      "Typescript",
      "PostgreSQL",
      "Styled Components",
      "Docker",
      "AWS",
    ],
    images: [
      "/images/leftovers/home-page.png",
      "/images/leftovers/sign-up.png",
      "/images/leftovers/my-recipes.png",
      "/images/leftovers/create-recipe.png",
    ],
    isPinned: true,
    type: "Web Application",
    timeline: "2024",
    status: ProjectStatus.COMPLETED,
    lastUpdated: new Date("09.02.2024"),
    github: "https://github.com/jlwnd/leftovers-frontend",
  },
  {
    id: "prestika",
    name: "Prestika",
    description:
      "Custom made website for my neighbour's business connected to Sanity.io CMS for easy content managment.",
    technologies: ["React", "Sanity.io", "Tailwind CSS"],
    images: [
      "/images/prestika/hero.png",
      "/images/prestika/prestika1.png",
      "/images/prestika/prestika2.png",
    ],
    isPinned: true,
    type: "Website",
    timeline: "2022",
    status: ProjectStatus.COMPLETED,
    lastUpdated: new Date("01.24.2023"),
    deploymentUrl: "https://prestika.pl",
  },
  {
    id: "sautu",
    name: "Sautu",
    description:
      "A simple website for a local sauna selling company, built with HTML and CSS. The site showcases the company's range of saunas, provides information about available models, and features a gallery of completed installations. Designed to help customers learn about sauna options and easily get in touch for inquiries.",
    technologies: ["HTML", "CSS"],
    images: [
      "/images/sautu/hero.png",
      "/images/sautu/saunas.png",
      "/images/sautu/gallery.png",
    ],
    type: "Website",
    timeline: "2025",
    isPinned: false,
    status: ProjectStatus.COMPLETED,
    lastUpdated: new Date("08.25.2025"),
    deploymentUrl: "https://www.sautu.pl",
  },
];
