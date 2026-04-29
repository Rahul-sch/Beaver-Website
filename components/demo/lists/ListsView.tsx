"use client";

import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { ListsGroupsToggle } from "./ListsGroupsToggle";
import { ListCard } from "./ListCard";
import { GroupsView } from "./GroupsView";

export function ListsView() {
  const lists = useDemoStore((s) => s.lists);
  const listsTab = useDemoStore((s) => s.listsTab);
  const addList = useDemoStore((s) => s.addList);

  const personalLists = lists.filter((l) => !l.isGroup);

  const [showFab, setShowFab] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <div className="relative h-full pb-24">
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <ListsGroupsToggle />
          <span className="rounded-pill bg-surface-3 px-2.5 py-1 text-[11px] font-semibold text-text-muted">
            Free
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={listsTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="mt-5"
        >
          {listsTab === "lists" ? (
            <div className="flex flex-col gap-3 px-4">
              <LayoutGroup id="lists-cards">
                {personalLists.map((l) => (
                  <motion.div
                    key={l.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32 }}
                  >
                    <ListCard list={l} />
                  </motion.div>
                ))}
              </LayoutGroup>

              {personalLists.length === 0 && (
                <div className="rounded-card border border-dashed border-border-strong p-6 text-center text-[14px] text-text-dim">
                  No lists yet — tap the + button to add one.
                </div>
              )}
            </div>
          ) : (
            <GroupsView />
          )}
        </motion.div>
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setShowFab((v) => !v)}
        className="absolute bottom-24 right-5 grid h-12 w-12 place-items-center rounded-full bg-accent text-white"
        style={{ boxShadow: "0 12px 24px -8px rgba(10,132,255,0.6)" }}
        aria-label={listsTab === "groups" ? "Add group" : "Add list"}
      >
        <motion.svg
          animate={{ rotate: showFab ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden
        >
          <path d="M11 4 L11 18 M4 11 L18 11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </motion.svg>
      </motion.button>

      {/* Edit FAB (left) */}
      <button
        className="absolute bottom-24 left-5 grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-text-muted"
        aria-label="Edit"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M2 14 L4 12 L11.5 4.5 L13.5 6.5 L6 14 L2 14 Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {showFab && listsTab === "lists" && (
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            addList(draft, false);
            setDraft("");
            setShowFab(false);
          }}
          className="absolute bottom-40 left-4 right-4 flex items-center gap-2 rounded-pill border border-border bg-surface-2 px-4 py-2"
        >
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="New list…"
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-text-dim"
          />
          <button
            type="submit"
            className="rounded-pill bg-accent px-3 py-1 text-[13px] font-semibold text-white"
          >
            Add
          </button>
        </motion.form>
      )}
    </div>
  );
}
