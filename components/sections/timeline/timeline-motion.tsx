"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimelineItem } from "@/components/ui/timeline-item";
import { ExperiencePageContent } from "@/types";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function TimelineMotion({
  experiencePageContent,
}: {
  experiencePageContent: ExperiencePageContent;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const t = useTranslations("timeline");

  if (!experiencePageContent) return null;

  const { professionalExperience, educationalExperience } =
    experiencePageContent;

  return (
    <div ref={ref} className="max-w-4xl mx-auto mt-12">
      <Tabs defaultValue="professional" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="professional" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>{t("professional")}</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>{t("education")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="professional" className="mt-0">
          <div className="relative border-l-2 border-primary/30 pl-8 ml-4">
            {professionalExperience?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <TimelineItem
                  date={item.date}
                  title={item.title}
                  description={item.description}
                  icon={<Briefcase className="h-4 w-4" />}
                />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education" className="mt-0">
          <div className="relative border-l-2 border-primary/30 pl-8 ml-4">
            {educationalExperience?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <TimelineItem
                  date={item.date}
                  title={item.title}
                  description={item.description}
                  icon={<GraduationCap className="h-4 w-4" />}
                />
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
