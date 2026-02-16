"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { HeroPageContent } from "@/types";
import { useTranslations } from "next-intl";

export function HeroMotion({ hero }: { hero: HeroPageContent }) {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="container px-4 mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <Image
          src={hero.imageUrl}
          alt={t("imageAlt")}
          width={280}
          height={280}
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-4xl md:text-6xl font-bold"
        >
          {hero.title}
        </motion.h1>

        <div className="flex flex-wrap justify-center items-center gap-3 text-muted-foreground">
          {hero.techStack.map((tech: string, index: number) => (
            <React.Fragment key={tech}>
              {index > 0 && (
                <span className="hidden md:block h-1 w-1 rounded-full bg-muted-foreground" />
              )}
              <span className="text-md">{tech}</span>
            </React.Fragment>
          ))}
        </div>

        <Button size="lg" asChild>
          <a href="#projects">{t("viewProjects")}</a>
        </Button>
      </motion.div>
    </div>
  );
}
