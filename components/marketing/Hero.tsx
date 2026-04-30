"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
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
      <AppStoreButton label="Join the waitlist" />
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

