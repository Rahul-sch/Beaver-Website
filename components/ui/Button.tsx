"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-[0_0_0_1px_rgba(10,132,255,0.4),0_10px_30px_-10px_rgba(10,132,255,0.55)]",
  ghost:
    "bg-surface-2 text-text border border-border hover:border-border-strong hover:bg-surface-3",
  outline:
    "bg-transparent text-text border border-border-strong hover:bg-surface-2",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-pill",
  md: "h-11 px-5 text-[15px] rounded-pill",
  lg: "h-12 px-6 text-base rounded-pill",
};

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
  asLink?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium tracking-tight select-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
