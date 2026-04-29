"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { easeStandard } from "@/lib/motion";

const faqs = [
  {
    q: "Wait — what is Beaver, exactly?",
    a: "A todo app that's social by default. Make daily lists. Pick a few trusted friends. They see your streaks, cheer your wins, and call you out when you slip.",
  },
  {
    q: "Is this just a hype waitlist?",
    a: "Nope. The iOS app is in TestFlight and launching publicly soon. Join the waitlist and we'll send you an invite when your spot opens.",
  },
  {
    q: "Will Beaver be available on Android / web?",
    a: "iOS first. Android is on the roadmap. The web version of the app (beyond this demo) ships post-launch.",
  },
  {
    q: "Can my friends see my whole list?",
    a: "Only what you choose to share. Trusted friends see your streaks and the lists you opt in to. Private lists stay private.",
  },
  {
    q: "How does Screen Time work?",
    a: "Beaver uses Apple's Screen Time API on iOS. We never see what you watched — only categories and minutes, fully on-device.",
  },
];

export function FAQ() {
  return (
    <Section id="faq" className="py-24 md:py-28">
      <Reveal>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
          FAQ
        </p>
        <h2 className="mt-2 max-w-2xl text-[36px] font-extrabold leading-tight tracking-tight md:text-[48px]">
          Stuff people ask.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-2 md:grid-cols-1">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.04}>
            <FAQItem q={f.q} a={f.a} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-card border border-border bg-surface">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[16px] font-semibold tracking-tight md:text-[17px]">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: easeStandard }}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-surface-2 text-text-muted"
          aria-hidden
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1 L5.5 10 M1 5.5 L10 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: easeStandard }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[15px] leading-relaxed text-text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
