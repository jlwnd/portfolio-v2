"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function AboutMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const t = useTranslations("about");

  return (
    <div ref={ref} className="max-w-3xl mx-auto mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="prose prose-lg dark:prose-invert"
      >
        <p>{t("intro")}</p>

        <p>{t("p1")}</p>

        <p>
          {t("p2currently")}{" "}
          <a
            href="https://blockwise.pl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            BlockWise
          </a>{" "}
          {t("p2role")}
        </p>

        <p>{t("p3")}</p>
      </motion.div>
    </div>
  );
}
