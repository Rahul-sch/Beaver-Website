"use client";

import { motion } from "framer-motion";
import { useDemoStore } from "@/lib/store";
import type { Group, GroupActivity } from "@/lib/types";
import { easeOutExpo } from "@/lib/motion";

export function GroupsView() {
  const groups = useDemoStore((s) => s.groups);
  const activity = useDemoStore((s) => s.groupActivity);

  if (groups.length === 0) {
    return (
      <div className="px-4 pt-4">
        <div className="rounded-card border border-dashed border-border-strong p-6 text-center text-[14px] text-text-dim">
          No groups yet — tap the + button to create one.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-4 pt-1">
      {groups.map((g) => (
        <GroupCard
          key={g.id}
          group={g}
          activity={activity.filter((a) => a.groupId === g.id)}
        />
      ))}
    </div>
  );
}

function GroupCard({
  group,
  activity,
}: {
  group: Group;
  activity: GroupActivity[];
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: easeOutExpo }}
      className="overflow-hidden rounded-card border border-border bg-surface"
    >
      <div className="border-b border-border px-4 py-3.5">
        <h3 className="text-[20px] font-extrabold tracking-tight text-text">
          {group.name}
        </h3>
        <p className="mt-0.5 text-[12px] text-text-dim">
          {group.role}
          <span className="mx-1.5">·</span>
          {group.listCount} {group.listCount === 1 ? "list" : "lists"}
        </p>
      </div>
      <ul className="divide-y divide-border/60">
        {activity.map((a, i) => (
          <motion.li
            key={a.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: easeOutExpo,
              delay: i * 0.05,
            }}
            className="flex items-center gap-3 px-4 py-2.5"
          >
            <ActivityIcon kind={a.kind} />
            <div className="min-w-0 flex-1 truncate text-[13px] text-text">
              {a.kind === "list-created" ? (
                <>
                  <span className="font-semibold">New list:</span>{" "}
                  <span>{a.target}</span>
                </>
              ) : (
                <>
                  <span className="text-text">{a.actorEmail}</span>{" "}
                  <span className="text-text">updated</span>{" "}
                  <span>{a.target}</span>
                </>
              )}
            </div>
            <span className="shrink-0 text-[12px] text-text-dim">{a.agoLabel}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function ActivityIcon({ kind }: { kind: GroupActivity["kind"] }) {
  if (kind === "list-created") {
    return (
      <span className="grid h-6 w-6 shrink-0 place-items-center text-accent">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="2" y="3" width="11" height="2" rx="0.7" stroke="currentColor" strokeWidth="1.4" />
          <rect x="2" y="7" width="11" height="2" rx="0.7" stroke="currentColor" strokeWidth="1.4" />
          <rect x="2" y="11" width="7" height="2" rx="0.7" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="13" cy="12" r="2.4" fill="#0A84FF" />
          <path d="M13 11 L13 13 M12 12 L14 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center text-warn">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M2 14 L4.5 13 L12 5.5 L10.5 4 L3 11.5 L2 14 Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M10.5 4 L12 5.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </span>
  );
}
