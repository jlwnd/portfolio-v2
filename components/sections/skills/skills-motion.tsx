"use client";

import { SkillCard } from "@/components/ui/skill-card";
import { SkillCategory } from "@/types";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

export function SkillsMotion({ categories }: { categories: SkillCategory[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (!categories?.length) return null;

  return (
    <div ref={ref} className="mt-12 space-y-12">
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: categoryIndex * 0.15, duration: 0.5 }}
        >
          <h3 className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {category.title}
            <span className="h-px flex-1 bg-primary/15" aria-hidden />
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {(category.skills ?? []).map((skill) => (
              <SkillCard key={skill.name}>
                <div className="mx-auto mb-4 flex justify-center">
                  {skill.iconUrl ? (
                    <img
                      src={skill.iconUrl}
                      alt=""
                      className="h-10 w-10 object-contain invert"
                    />
                  ) : (
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-foreground/40 text-sm font-bold text-foreground"
                      aria-hidden
                    >
                      {skill.name
                        .split(/\s+/)
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="text-center font-medium">{skill.name}</p>
              </SkillCard>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
