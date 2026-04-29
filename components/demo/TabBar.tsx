"use client";

import { motion } from "framer-motion";
import { useDemoStore } from "@/lib/store";
import { cn } from "@/lib/cn";
import type { TabKey } from "@/lib/types";

const tabs: { key: TabKey; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  {
    key: "progress",
    label: "Progress",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="11" width="3" height="7" rx="0.8" fill={active ? "#0A84FF" : "#fff"} />
        <rect x="9.5" y="6" width="3" height="12" rx="0.8" fill={active ? "#0A84FF" : "#fff"} />
        <rect x="16" y="3" width="3" height="15" rx="0.8" fill={active ? "#0A84FF" : "#fff"} />
        <rect x="2" y="19" width="18" height="1.5" rx="0.5" fill={active ? "#0A84FF" : "#fff"} />
      </svg>
    ),
  },
  {
    key: "tasks",
    label: "Tasks",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="4" cy="6" r="2.4" stroke={active ? "#0A84FF" : "#fff"} strokeWidth="1.5" />
        <path d="M2.7 5.9 L3.7 7 L5.4 5" stroke={active ? "#0A84FF" : "#fff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="16" r="2.4" stroke={active ? "#0A84FF" : "#fff"} strokeWidth="1.5" />
        <line x1="9" y1="6" x2="20" y2="6" stroke={active ? "#0A84FF" : "#fff"} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="9" y1="16" x2="20" y2="16" stroke={active ? "#0A84FF" : "#fff"} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "activity",
    label: "Activity",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="9" cy="7" r="3" stroke={active ? "#0A84FF" : "#fff"} strokeWidth="1.5" />
        <path d="M3 18 c0 -3 3 -5 6 -5 s6 2 6 5" stroke={active ? "#0A84FF" : "#fff"} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 6 q2 1 2 3" stroke={active ? "#0A84FF" : "#fff"} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17.5 4 q3.5 2 3.5 5" stroke={active ? "#0A84FF" : "#fff"} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function TabBar() {
  const active = useDemoStore((s) => s.activeTab);
  const setActive = useDemoStore((s) => s.setActiveTab);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-border bg-black/80 backdrop-blur-md">
      <div className="flex items-center justify-around px-6 py-3 pb-6">
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className="relative grid place-items-center px-4 py-1"
              aria-label={t.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="tabbar-pill"
                  className="absolute inset-0 -m-1 rounded-pill bg-accent-soft"
                  transition={{ type: "spring", stiffness: 500, damping: 36 }}
                />
              )}
              <span className="relative">{t.icon(isActive)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
