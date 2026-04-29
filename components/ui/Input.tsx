"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-tile border bg-surface-2 px-4 text-[15px] text-text placeholder:text-text-dim",
        "transition-colors duration-150 outline-none",
        invalid
          ? "border-[#FF453A] focus:border-[#FF453A]"
          : "border-border focus:border-accent",
        className
      )}
      {...props}
    />
  );
});
