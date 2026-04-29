"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

const features = [
  {
    title: "Live group lists",
    body: "Real-time lists you share with a group. Cross out a task and everyone sees it move.",
    icon: ListIcon,
  },
  {
    title: "Today's Dam",
    body: "Every task is a log. Build to Perfect, climb dam pts, keep the streak alive.",
    icon: StreakIcon,
  },
  {
    title: "Auto Check & Remind",
    body: "Beaver auto-checks habits the moment they're done and remembers to ping you when they aren't.",
    icon: HeartIcon,
  },
  {
    title: "Notify Members",
    body: "Group members hear about updates instantly. Recent Activity feed keeps the dam transparent.",
    icon: BellIcon,
  },
  {
    title: "Screen Time",
    body: "Weekly bars + top apps per day. Tap a day to see where it actually went.",
    icon: ChartIcon,
  },
  {
    title: "Blocked Apps",
    body: "Block what pulls you off-task. Tap an app to request an unblock — your trusted friends decide.",
    icon: ShieldIcon,
  },
];

export function FeaturesGrid() {
  return (
    <Section id="friends" className="py-24 md:py-32">
      <Reveal>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
          What&apos;s in the dam
        </p>
        <h2 className="mt-2 max-w-2xl text-[36px] font-extrabold leading-tight tracking-tight md:text-[52px]">
          Solo lists are fine. Group dams hit different.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] text-text-muted md:text-[17px]">
          The full feature set, packed into one little app.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -3, borderColor: "#2A2B30" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="group h-full rounded-card border border-border bg-surface p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-tile bg-accent-soft text-accent">
                <f.icon />
              </span>
              <h3 className="mt-5 text-[20px] font-bold tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-text-muted">{f.body}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ListIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="4" cy="6" r="1.5" fill="currentColor" />
      <circle cx="4" cy="14" r="1.5" fill="currentColor" />
      <line x1="8" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function StreakIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 18 c-4 0 -6 -3 -6 -6 c0 -3 3 -4 3 -7 c0 0 2 2 2 4 c1 -2 3 -3 3 -5 c2 2 4 5 4 8 c0 3 -2 6 -6 6 z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 16 s-6 -3.5 -6 -8 a3.5 3.5 0 0 1 6 -2 a3.5 3.5 0 0 1 6 2 c0 4.5 -6 8 -6 8 z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 14 L15 14 M7 14 V9 a3 3 0 0 1 6 0 v5 M9 17 a1.5 1.5 0 0 0 2 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 16 L8 11 L11 13 L17 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5 L17 5 L17 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 3 L16 5 V10 c0 3.5 -2.5 6 -6 7 c-3.5 -1 -6 -3.5 -6 -7 V5 L10 3 z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 10.5 L9.5 12.5 L13 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
