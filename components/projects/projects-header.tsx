"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const ProjectsHeader = () => {
  const t = useTranslations("projects");

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          {t("heading")}
        </h1>
        <p className="text-muted-foreground max-w-2xl">{t("description")}</p>
      </motion.div>
    </div>
  );
};
