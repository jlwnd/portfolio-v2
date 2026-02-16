"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";

export function AboutMotion({ content }: { content?: PortableTextBlock[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  if (!content || content.length === 0) return null;

  return (
    <div ref={ref} className="max-w-3xl mx-auto mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="prose prose-lg dark:prose-invert"
      >
        <PortableText value={content} />
      </motion.div>
    </div>
  );
}
