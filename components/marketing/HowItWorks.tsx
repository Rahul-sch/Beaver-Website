"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useDemoStore } from "@/lib/store";
import type { TabKey } from "@/lib/types";
import { PhoneFrame } from "@/components/demo/PhoneFrame";
import { DemoApp } from "@/components/demo/DemoApp";
import { easeOutExpo } from "@/lib/motion";

const steps: { tab: TabKey; eyebrow: string; title: string; body: string }[] = [
  {
    tab: "tasks",
    eyebrow: "01 — Lists",
    title: "Daily lists. Live group lists.",
    body: "Personal Beaver Tasks for what only you can do. Live lists inside groups for the things you do together — flatmates, co-founders, training partners. Tick a box, watch it cross out.",
  },
  {
    tab: "progress",
    eyebrow: "02 — Today's Dam",
    title: "Build your dam, day by day.",
    body: "Every task is a log on the dam. Hit your list and the bar fills, dam pts climb, and your day goes from Leaky to Solid to Perfect. Streaks, screen time, and overdue all in one place.",
  },
  {
    tab: "activity",
    eyebrow: "03 — Activity",
    title: "Closed friends. Holding them Accountable.",
    body: "Pick a tight circle of trusted friends. Block the apps that pull you off-track — tap to request unblock when you actually need them. Nothing leaks through unless you let it.",
  },
];

export function HowItWorks() {
  return (
    <Section id="features" className="relative py-24 md:py-32">
      <Reveal>
        <h2 className="max-w-2xl text-[36px] font-extrabold leading-tight tracking-tight md:text-[52px]">
          Three taps to a better day.
        </h2>
        <p className="mt-3 max-w-xl text-[15px] text-text-muted md:text-[17px]">
          Scroll through. The phone follows along.
        </p>
      </Reveal>

      <div className="relative mt-16 grid gap-12 md:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-[28vh] md:gap-[40vh]">
          {steps.map((s) => (
            <Step key={s.tab} {...s} />
          ))}
        </div>
        <div className="hidden md:block">
          <div className="sticky top-28">
            <div
              className="relative"
              style={{ filter: "drop-shadow(0 30px 80px rgba(10,132,255,0.20))" }}
            >
              <PhoneFrame width={300}>
                <DemoApp showSplash={false} />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Step({
  tab,
  eyebrow,
  title,
  body,
}: {
  tab: TabKey;
  eyebrow: string;
  title: string;
  body: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, margin: "-25% 0px -25% 0px" });
  const setActive = useDemoStore((s) => s.setActiveTab);

  useEffect(() => {
    if (inView) setActive(tab);
  }, [inView, setActive, tab]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      viewport={{ once: true, amount: 0.4 }}
      className="max-w-xl"
    >
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-[28px] font-extrabold leading-tight tracking-tight md:text-[42px]">
        {title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-text-muted md:text-[17px]">
        {body}
      </p>
    </motion.div>
  );
}
