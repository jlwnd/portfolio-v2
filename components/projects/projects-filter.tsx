"use client";

import { Button } from "@/components/ui/button";
import { useProjects } from "@/store/projects.store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const ProjectsFilter = () => {
  const { toggleFilter, filters, allProjects } = useProjects();
  const [technologies, setTechnologies] = useState<string[]>([]);
  const t = useTranslations("projects");

  useEffect(() => {
    const techs = Array.from(
      new Set(allProjects.flatMap((p) => p.technologies))
    ).sort();
    setTechnologies([t("filterAll"), ...techs]);
  }, [allProjects, t]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-8"
    >
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Button
            key={tech}
            variant={filters.includes(tech) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter(tech)}
            className="capitalize"
          >
            {tech}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};
