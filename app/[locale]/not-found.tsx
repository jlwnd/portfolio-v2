"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("notFound");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-animated-gradient p-4">
      <div className="absolute inset-0 bg-animated-dots opacity-20"></div>

      <div className="max-w-md w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-8 mx-auto">
            <div className="text-[120px] md:text-[180px] font-bold text-primary/10 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl md:text-6xl font-bold text-primary animate-pulse-slow">
                404
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                {t("backToHome")}
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("goBack")}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute w-[300px] h-[300px] -top-32 -right-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute w-[300px] h-[300px] -bottom-32 -left-32 bg-primary/5 rounded-full blur-3xl"></div>
    </div>
  );
}
