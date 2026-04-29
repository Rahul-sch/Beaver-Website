"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { easeOutExpo } from "@/lib/motion";
import type { DamState } from "@/lib/types";

const FILL_BY_STATE: Record<DamState, string> = {
  leaky: "#0A84FF",
  solid: "#30D158",
  perfect: "#BF5AF2",
};

export function DamProgressBar({
  pct,
  state,
}: {
  pct: number;
  state: DamState;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const fill = FILL_BY_STATE[state];

  return (
    <div ref={ref} className="relative h-3 w-full overflow-hidden rounded-full bg-surface-3">
      <motion.div
        initial={{ width: "0%" }}
        animate={inView ? { width: `${pct}%` } : { width: "0%" }}
        transition={{ duration: 1.1, ease: easeOutExpo }}
        className="h-full rounded-full"
        style={{ background: fill }}
      />
      {/* Beaver mascot riding on the fill edge */}
      {pct > 0 && (
        <motion.div
          aria-hidden
          initial={{ left: "0%" }}
          animate={inView ? { left: `calc(${pct}% - 16px)` } : { left: "0%" }}
          transition={{ duration: 1.1, ease: easeOutExpo }}
          className="absolute top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center"
        >
          <span className="text-[18px]">🦫</span>
        </motion.div>
      )}
    </div>
  );
}
