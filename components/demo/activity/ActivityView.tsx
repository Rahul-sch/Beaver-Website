"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDemoStore } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import { popIn } from "@/lib/motion";

export function ActivityView() {
  const friends = useDemoStore((s) => s.friends);
  const user = useDemoStore((s) => s.user);
  const accept = useDemoStore((s) => s.acceptFriend);
  const [query, setQuery] = useState("");

  const incoming = friends.filter((f) => f.status === "incoming");
  const trusted = friends.filter((f) => f.trusted && f.status === "friend");
  const filtered = trusted.filter((f) =>
    query.trim() ? f.name.toLowerCase().includes(query.toLowerCase()) : true
  );

  return (
    <div className="h-full pb-28">
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-[26px] font-extrabold tracking-tight">Activity</h1>
          <div className="flex items-center gap-2">
            <span className="rounded-pill bg-surface-3 px-2.5 py-1 text-[11px] font-semibold text-text-muted">
              Free
            </span>
            {user && (
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-semibold">{firstLast(user.name)}</span>
                <Avatar name={user.name} color={user.avatarColor} size={26} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 px-4">
        {/* Incoming Requests */}
        <div className="rounded-card border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold">Incoming Requests</h3>
            <span className="text-[13px] text-text-dim">{incoming.length}</span>
          </div>
          {incoming.length === 0 ? (
            <p className="mt-3 text-center text-[13px] text-text-muted">
              No incoming requests
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {incoming.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between gap-3 rounded-tile bg-surface-2 p-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar name={f.name} color={f.avatarColor} size={32} />
                    <div>
                      <p className="text-[14px] font-semibold">{f.name}</p>
                      <p className="text-[12px] text-text-dim">{f.handle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => accept(f.id)}
                    className="rounded-pill bg-accent px-3 py-1 text-[12px] font-semibold text-white"
                  >
                    Accept
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Trusted friends */}
        <div className="rounded-card border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold">Trusted Friends</h3>
            <button className="text-[14px] font-semibold text-accent">Add</button>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or add by email…"
            className="mt-3 h-10 w-full rounded-tile border border-border bg-surface-2 px-3 text-[13px] outline-none placeholder:text-text-dim focus:border-accent"
          />

          <div className="mt-3 grid grid-cols-2 gap-2">
            <AnimatePresence initial>
              {filtered.map((f, i) => (
                <motion.div
                  key={f.id}
                  variants={popIn}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-2 rounded-tile bg-surface-2 px-2.5 py-2"
                >
                  <Avatar name={f.name} color={f.avatarColor} size={28} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold">{f.name}</p>
                    <p className="truncate text-[11px] text-text-dim">{f.handle}</p>
                  </div>
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-label="online"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-4">
            <h4 className="text-[16px] font-bold">Friends</h4>
            <p className="mt-1 text-center text-[13px] text-text-muted">
              No friends available to add
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function firstLast(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts.at(-1)?.[0]}`;
}
