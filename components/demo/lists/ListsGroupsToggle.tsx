"use client";

import { motion } from "framer-motion";
import { useDemoStore } from "@/lib/store";
import { cn } from "@/lib/cn";

export function ListsGroupsToggle() {
  const tab = useDemoStore((s) => s.listsTab);
  const setTab = useDemoStore((s) => s.setListsTab);
  return (
    <div className="flex items-center gap-3 text-[26px] font-extrabold tracking-tight">
      {(["lists", "groups"] as const).map((k) => {
        const active = tab === k;
        return (
          <button
            key={k}
            onClick={() => setTab(k)}
            className="relative px-1"
          >
            <span
              className={cn(
                "transition-colors",
                active ? "text-text" : "text-text-dim"
              )}
            >
              {k === "lists" ? "Lists" : "Groups"}
            </span>
            {active && (
              <motion.span
                layoutId="lists-toggle-pill"
                className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full bg-text"
                transition={{ type: "spring", stiffness: 500, damping: 36 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
