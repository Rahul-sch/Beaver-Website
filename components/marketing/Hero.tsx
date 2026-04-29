"use client";

import { motion } from "framer-motion";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/Button";
import { AvatarCluster } from "@/components/ui/Avatar";
import { PhoneFrame } from "@/components/demo/PhoneFrame";
import { DemoApp } from "@/components/demo/DemoApp";
import { DemoResetButton } from "@/components/demo/DemoResetButton";
import { Section } from "@/components/ui/Section";
import { easeOutExpo, stagger } from "@/lib/motion";

const HEAD_LINE_1 = "Beaver —";
const HEAD_LINE_2 = "to do better";

const wordVariants = {
  initial: { y: "110%", opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

function HeroCTAs() {
  return (
    <motion.div variants={wordVariants} className="flex flex-wrap items-center gap-3">
      <SignUpButton mode="modal">
        <Button>
          <AppleGlyph /> Join the waitlist
        </Button>
      </SignUpButton>
      <Button
        variant="ghost"
        onClick={() => {
          const el = document.querySelector("#demo");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Try the demo
      </Button>
    </motion.div>
  );
}

export function Hero() {
  return (
    <Section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <motion.div
            variants={stagger(0.1, 0.05)}
            initial="initial"
            animate="enter"
            className="flex flex-col items-start gap-6"
          >
            <motion.div
              variants={wordVariants}
              className="flex items-center gap-2 rounded-pill border border-border bg-surface-2 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Tasks · Together
            </motion.div>
            <h1 className="text-[44px] font-extrabold leading-[1.05] tracking-tight md:text-[72px]">
              <span className="block overflow-hidden">
                <Words text={HEAD_LINE_1} />
              </span>
              <span className="block overflow-hidden text-text-muted md:mt-1">
                <Words text={HEAD_LINE_2} delay={0.15} />
              </span>
            </h1>
            <motion.p
              variants={wordVariants}
              className="max-w-[480px] text-[16px] leading-relaxed text-text-muted md:text-[17px]"
            >
              Build your dam, one task at a time. Daily lists, live group lists, and trusted friends — together they turn your todos into a streak you don&apos;t want to break.
            </motion.p>
            <HeroCTAs />
            <motion.div
              variants={wordVariants}
              className="flex items-center gap-3 pt-2"
            >
              <AvatarCluster
                size={28}
                people={[
                  { name: "Anish S", color: "#0A84FF" },
                  { name: "Priya M", color: "#30D158" },
                  { name: "Jay K", color: "#FF9F0A" },
                  { name: "Leo B", color: "#BF5AF2" },
                ]}
              />
              <p className="text-[13px] text-text-muted">
                <span className="font-semibold text-text">2,400+</span> beavers on the waitlist
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div id="demo" className="relative flex flex-col items-center md:items-end">
          <motion.div
            initial={{ y: 24, opacity: 0, rotate: -2 }}
            animate={{ y: 0, opacity: 1, rotate: -2 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.2 }}
            className="relative"
            style={{ rotate: "-2deg" }}
          >
            <PhoneFrame width={340}>
              <DemoApp />
            </PhoneFrame>
            {/* Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(60% 50% at 60% 40%, rgba(10,132,255,0.30), rgba(0,0,0,0) 70%)",
                filter: "blur(20px)",
              }}
            />
          </motion.div>
          <div className="mt-5 md:self-center">
            <DemoResetButton />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap gap-x-3">
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          custom={i}
          className="inline-block"
          transition={{ duration: 0.7, ease: easeOutExpo, delay: delay + i * 0.06 }}
          initial="initial"
          animate="enter"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

function AppleGlyph() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
      <path d="M11.6 8.4c-0.02-2 1.6-2.95 1.7-3.02-0.93-1.36-2.38-1.55-2.9-1.57-1.24-0.13-2.42 0.73-3.05 0.73-0.64 0-1.62-0.71-2.66-0.69-1.37 0.02-2.63 0.8-3.34 2.02-1.42 2.46-0.36 6.1 1.03 8.1 0.68 0.99 1.49 2.09 2.55 2.05 1.02-0.04 1.4-0.66 2.64-0.66 1.23 0 1.58 0.66 2.66 0.64 1.1-0.02 1.79-1 2.46-1.99 0.78-1.14 1.1-2.25 1.12-2.31-0.02-0.01-2.15-0.83-2.21-3.3zM9.46 2.74c0.56-0.68 0.94-1.62 0.83-2.56-0.81 0.03-1.78 0.54-2.36 1.21-0.52 0.6-0.97 1.55-0.85 2.47 0.9 0.07 1.82-0.46 2.38-1.13z" />
    </svg>
  );
}
