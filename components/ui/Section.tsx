import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative w-full px-6 md:px-10", className)}>
      <div className="mx-auto max-w-[1180px]">{children}</div>
    </section>
  );
}
