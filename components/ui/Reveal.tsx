"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.25,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <motion.div
      ref={ref}
      initial={{ y, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y, opacity: 0 }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
