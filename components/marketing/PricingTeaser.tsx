"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface Tier {
  name: string;
  for: string;
  price: string;
  cadence: string;
  features: string[];
  cta: string;
  headerBg: string;
  buttonBg: string;
  featured?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Pro",
    for: "For individuals",
    price: "$4.99",
    cadence: "/ month",
    features: [
      "Unlimited personal lists",
      "Unlimited live lists",
      "Create & join groups",
      "Auto Check",
      "Remind",
      "Notify Members",
      "Recent Activity",
    ],
    cta: "Get Pro",
    headerBg: "linear-gradient(135deg, #2778FF 0%, #0A5BE6 100%)",
    buttonBg: "#7B3DFF",
  },
  {
    name: "Family",
    for: "For families",
    price: "$19.99",
    cadence: "/ month",
    features: [
      "5 full Pro accounts",
      "Pre-set family group",
      "Child screen time & habits",
      "All Pro add-ons included",
    ],
    cta: "Get Family",
    headerBg: "linear-gradient(135deg, #FF8A2B 0%, #FF5A3D 100%)",
    buttonBg: "#7B3DFF",
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
          Upgrade your plan.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] text-text-muted md:text-[17px]">
          Unlock everything Beaver has to offer.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {tiers.map((t) => (
          <Reveal key={t.name}>
            <div className="overflow-hidden rounded-card border border-border bg-surface">
              <div
                className="flex items-end justify-between px-5 py-5 text-white"
                style={{ background: t.headerBg }}
              >
                <div>
                  <h3 className="text-[24px] font-extrabold tracking-tight">{t.name}</h3>
                  <p className="text-[13px] opacity-80">{t.for}</p>
                </div>
                <p className="text-right">
                  <span className="text-[24px] font-extrabold tracking-tight">
                    {t.price}
                  </span>
                  <br />
                  <span className="text-[12px] opacity-80">{t.cadence}</span>
                </p>
              </div>
              <div className="px-5 py-5">
                <ul className="space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[14px]">
                      <CheckGreen />
                      <span className="text-text">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    "mt-6 inline-flex h-11 w-full items-center justify-center rounded-pill text-[14px] font-semibold text-white"
                  )}
                  style={{ background: t.buttonBg }}
                >
                  {t.cta}
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-10 text-center">
          <button className="text-[14px] font-semibold text-accent hover:underline">
            Restore Purchases
          </button>
          <p className="mx-auto mt-3 max-w-md text-[12px] text-text-dim">
            Subscriptions renew automatically through your Apple ID. Manage or cancel in App Store settings.
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 text-[12px]">
            <a className="text-accent hover:underline" href="#">
              Terms of Use (EULA)
            </a>
            <span className="text-text-dim">·</span>
            <a className="text-accent hover:underline" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function CheckGreen() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="shrink-0 text-success"
    >
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3.6 7.4 L6 9.6 L10.6 4.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
