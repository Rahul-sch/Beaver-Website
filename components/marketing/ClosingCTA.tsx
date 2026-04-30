"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { BeaverGlyph } from "@/components/ui/BeaverMark";

export function ClosingCTA() {
  return (
    <Section className="pb-32 pt-12">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-card border border-border bg-surface px-8 py-16 md:px-16 md:py-20"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(10,132,255,0.18), rgba(0,0,0,0) 65%), #0B0B0D",
          }}
        >
          <div className="relative z-10 mx-auto max-w-xl text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
              <BeaverGlyph size={36} stroke="white" />
            </span>
            <h2 className="mt-6 text-[32px] font-extrabold leading-tight tracking-tight md:text-[44px]">
              Build a Perfect Dam.
            </h2>
            <p className="mt-3 text-[15px] text-text-muted md:text-[17px]">
              Join 2,400+ beavers turning the gym, the laundry, and the side project into a streak they don&apos;t want to break.
            </p>
            <div className="mx-auto mt-8 flex justify-center">
              <AppStoreButton label="Join the waitlist" size="lg" />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
