"use client";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Project } from "@/types";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function FeaturedProjectsMotion({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const t = useTranslations("featuredProjects");

  if (!projects) return null;

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-diagonal-gradient relative"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeading>{t("heading")}</SectionHeading>
          <Link href="/projects">
            <Button
              variant="ghost"
              className="group mt-4 md:mt-0 hover:bg-primary/10 hover:text-primary"
            >
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
