"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { APP_STORE_URL } from "@/lib/links";

interface AppStoreButtonProps {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<NonNullable<AppStoreButtonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

export function AppStoreButton({
  label = "Join the waitlist",
  className,
  size = "md",
}: AppStoreButtonProps) {
  return (
    <motion.a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill bg-accent font-medium tracking-tight text-white shadow-[0_0_0_1px_rgba(10,132,255,0.4),0_10px_30px_-10px_rgba(10,132,255,0.55)] hover:bg-accent-hover",
        sizeClasses[size],
        className
      )}
    >
      <AppleGlyph /> {label}
    </motion.a>
  );
}

function AppleGlyph() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
      <path d="M11.6 8.4c-0.02-2 1.6-2.95 1.7-3.02-0.93-1.36-2.38-1.55-2.9-1.57-1.24-0.13-2.42 0.73-3.05 0.73-0.64 0-1.62-0.71-2.66-0.69-1.37 0.02-2.63 0.8-3.34 2.02-1.42 2.46-0.36 6.1 1.03 8.1 0.68 0.99 1.49 2.09 2.55 2.05 1.02-0.04 1.4-0.66 2.64-0.66 1.23 0 1.58 0.66 2.66 0.64 1.1-0.02 1.79-1 2.46-1.99 0.78-1.14 1.1-2.25 1.12-2.31-0.02-0.01-2.15-0.83-2.21-3.3zM9.46 2.74c0.56-0.68 0.94-1.62 0.83-2.56-0.81 0.03-1.78 0.54-2.36 1.21-0.52 0.6-0.97 1.55-0.85 2.47 0.9 0.07 1.82-0.46 2.38-1.13z" />
    </svg>
  );
}
