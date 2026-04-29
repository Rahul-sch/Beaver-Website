"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { TaskRow } from "./TaskRow";
import { useDemoStore } from "@/lib/store";
import type { List } from "@/lib/types";
import { easeStandard } from "@/lib/motion";
import { useMemo, useState } from "react";

export function ListCard({ list }: { list: List }) {
  const expandedListId = useDemoStore((s) => s.expandedListId);
  const toggleExpand = useDemoStore((s) => s.toggleExpand);
  const allTasks = useDemoStore((s) => s.tasks);
  const tasks = useMemo(
    () =>
      allTasks
        .filter((t) => t.listId === list.id)
        .sort((a, b) => a.order - b.order),
    [allTasks, list.id]
  );
  const remaining = useMemo(
    () => allTasks.filter((t) => t.listId === list.id && !t.done).length,
    [allTasks, list.id]
  );
  const addTask = useDemoStore((s) => s.addTask);

  const expanded = expandedListId === list.id;
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 380, damping: 36 }}
      className="overflow-hidden rounded-card border border-border bg-surface"
    >
      <button
        onClick={() => toggleExpand(list.id)}
        className="flex w-full items-start justify-between gap-3 p-3.5 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {list.emoji && <span className="text-[15px]">{list.emoji}</span>}
            <h3 className="text-[17px] font-bold tracking-tight text-text">
              {list.name}
            </h3>
          </div>
          <p className="mt-0.5 text-[12px] text-text-dim">
            {list.kind === "daily" ? "Daily" : list.kind === "weekly" ? "Weekly" : "Once"}
            <span className="mx-1.5">·</span>
            {remaining === 0 ? "All done" : `${remaining} task${remaining === 1 ? "" : "s"} left`}
          </p>
        </div>
        <div className="flex items-center gap-2 text-text-dim">
          <ShareIcon />
          <motion.span
            animate={{ rotate: expanded ? 0 : 180 }}
            transition={{ duration: 0.3, ease: easeStandard }}
            className="grid place-items-center"
            aria-hidden
          >
            <ChevronUp />
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: easeStandard }}
            className="overflow-hidden border-t border-border"
          >
            <div className="px-4 py-2">
              <LayoutGroup id={`list-${list.id}`}>
                <motion.ul layout className="flex flex-col">
                  {tasks.map((t) => (
                    <TaskRow key={t.id} task={t} />
                  ))}
                </motion.ul>
              </LayoutGroup>

              {adding ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addTask(list.id, draft);
                    setDraft("");
                    setAdding(false);
                  }}
                  className="mt-1 flex items-center gap-2 py-2"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border border-[#3a3a40]" />
                  <input
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={() => {
                      if (draft.trim()) addTask(list.id, draft);
                      setDraft("");
                      setAdding(false);
                    }}
                    placeholder="New task…"
                    className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-text-dim"
                  />
                </form>
              ) : (
                <button
                  onClick={() => setAdding(true)}
                  className="mt-1 flex items-center gap-3 py-2 text-[14px] text-text-dim hover:text-text-muted"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border border-dashed border-[#3a3a40] text-[12px]">
                    +
                  </span>
                  Add task
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 2 L9 11 M5.5 5.5 L9 2 L12.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 9 L3.5 14.5 A1.5 1.5 0 0 0 5 16 L13 16 A1.5 1.5 0 0 0 14.5 14.5 L14.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 10 L8 5 L13 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
