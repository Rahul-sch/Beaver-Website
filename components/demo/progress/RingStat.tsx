"use client";

import { motion, animate, useMotionValue, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { easeOutExpo } from "@/lib/motion";

export function RingStat({
  pct,
  size = 80,
  thickness = 6,
}: {
  pct: number;
  size?: number;
  thickness?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, pct, {
      duration: 1.1,
      ease: easeOutExpo,
    });
    return () => controls.stop();
  }, [pct, inView, count]);

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} className="-rotate-90">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#1F2024"
          strokeWidth={thickness}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#0A84FF"
          strokeWidth={thickness}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: pct / 100 } : { pathLength: 0 }}
          transition={{ duration: 1.1, ease: easeOutExpo }}
          pathLength={1}
        />
      </svg>
      <motion.span className="absolute text-[18px] font-bold tracking-tight text-text">
        {display}
      </motion.span>
    </div>
  );
}
