"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SiteSettings } from "@/types";

export const ContactButton = ({ site }: { site: SiteSettings }) => {
  const t = useTranslations("footer");
  return (
    <motion.a
      href={`mailto:${site.email}`}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t("contactButton")}
    >
      <Mail className="h-6 w-6" />
    </motion.a>
  );
};
