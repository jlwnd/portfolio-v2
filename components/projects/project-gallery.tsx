"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

export const ProjectGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("projectDetail");

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-card shadow-lg shadow-primary/5">
      <div className="aspect-video h-[80%] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-secondary flex items-center justify-center"
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(142_70%_45%/0.15),transparent_70%)]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Image
                  alt="Project image"
                  src={images[currentIndex % images.length]}
                  fill
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 hover:text-primary"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">{t("previousImage")}</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 hover:text-primary"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">{t("nextImage")}</span>
        </Button>
      </div>

      <div className="flex justify-center p-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              index === currentIndex ? "bg-primary" : "bg-primary/20"
            )}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">{t("goToImage", { number: index + 1 })}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
