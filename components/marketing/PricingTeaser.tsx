"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "always",
    blurb: "All you need to get hooked.",
    features: ["Up to 3 lists", "1 group", "5 trusted friends", "Basic streaks"],
    cta: "Join the waitlist",
  },
  {
    name: "Pro",
    price: "$4",
    cadence: "/ month",
    blurb: "For people serious about their dams.",
    features: [
      "Unlimited lists & groups",
      "Unlimited trusted friends",
      "Screen time + Blocked Apps",
      "Custom streak rules",
      "Priority support",
    ],
    cta: "Coming with launch",
    featured: true,
  },
];

export function PricingTeaser() {
  return (
    <Section id="pricing" className="py-24 md:py-32">
      <Reveal>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
          Pricing
        </p>
        <h2 className="mt-2 max-w-2xl text-[36px] font-extrabold leading-tight tracking-tight md:text-[52px]">
          Free to start. Cheap to keep.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {tiers.map((t) => (
          <Reveal key={t.name}>
            <div
              className={cn(
                "h-full rounded-card border p-6",
                t.featured
                  ? "border-accent bg-accent-soft"
                  : "border-border bg-surface"
              )}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-[20px] font-bold">{t.name}</h3>
                {t.featured && (
                  <span className="rounded-pill bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    Coming with launch
                  </span>
                )}
              </div>
              <p className="mt-4">
                <span className="text-[36px] font-extrabold tracking-tight">{t.price}</span>
                <span className="ml-1 text-[14px] text-text-muted">{t.cadence}</span>
              </p>
              <p className="mt-1 text-[14px] text-text-muted">{t.blurb}</p>
              <ul className="mt-6 space-y-2 text-[14px]">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-text">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={cn(
                  "mt-8 inline-flex h-11 w-full items-center justify-center rounded-pill text-[14px] font-semibold transition-colors",
                  t.featured
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "border border-border-strong bg-transparent text-text hover:bg-surface-2"
                )}
              >
                {t.cta}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 text-accent">
      <path d="M3 7.4 L6 10.4 L11 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
