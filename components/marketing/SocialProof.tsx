"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Avatar } from "@/components/ui/Avatar";

const quotes = [
  {
    name: "Anish S.",
    handle: "co-founder, Beaver",
    quote: "I keep telling people Beaver is the only todo app I haven't deleted. The friends bit is the unlock.",
    color: "#0A84FF",
  },
  {
    name: "Priya M.",
    handle: "ML engineer",
    quote: "My streak is 21 days. My roommates' shared list got me to actually take out the trash. Witchcraft.",
    color: "#30D158",
  },
  {
    name: "Jay K.",
    handle: "designer",
    quote: "The cross-out animation should be illegal. I check things off just to feel it.",
    color: "#FF9F0A",
  },
];

export function SocialProof() {
  return (
    <Section className="py-24 md:py-28">
      <Reveal>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
          What beavers say
        </p>
        <h2 className="mt-2 max-w-2xl text-[32px] font-extrabold leading-tight tracking-tight md:text-[44px]">
          Words from the dam.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 0.06}>
            <figure className="flex h-full flex-col gap-5 rounded-card border border-border bg-surface p-6">
              <p className="text-[15px] leading-relaxed text-text">“{q.quote}”</p>
              <figcaption className="mt-auto flex items-center gap-3">
                <Avatar name={q.name} color={q.color} size={32} />
                <div>
                  <p className="text-[14px] font-semibold">{q.name}</p>
                  <p className="text-[12px] text-text-dim">{q.handle}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
