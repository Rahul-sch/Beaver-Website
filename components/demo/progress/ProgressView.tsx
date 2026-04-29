"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useDemoStore } from "@/lib/store";
import { RingStat } from "./RingStat";
import { easeOutExpo } from "@/lib/motion";
import { useMemo } from "react";

export function ProgressView() {
  const tasks = useDemoStore((s) => s.tasks);
  const lists = useDemoStore((s) => s.lists);
  const screenTime = useDemoStore((s) => s.screenTime);
  const blocked = useDemoStore((s) => s.blockedApps);

  const { total, done, pct, dueToday, completedToday } = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    const dueToday = tasks.filter((t) => !t.done).length;
    const completedToday = tasks.filter(
      (t) =>
        t.done &&
        t.completedAt &&
        Date.now() - t.completedAt < 24 * 60 * 60 * 1000
    ).length;
    return { total, done, pct, dueToday, completedToday };
  }, [tasks]);

  return (
    <div className="h-full pb-28">
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-[26px] font-extrabold tracking-tight">Progress</h1>
          <span className="rounded-pill bg-surface-3 px-2.5 py-1 text-[11px] font-semibold text-text-muted">Free</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 px-4">
        {/* Today card */}
        <div className="rounded-card border border-border bg-surface p-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-bold tracking-tight">Today</h2>
              <p className="text-[12px] text-text-dim">{formatDate()}</p>
            </div>
            <RingStat pct={pct} />
          </div>
          <div className="mt-3 h-px bg-border" />
          <p className="mt-3 text-[13px] text-text-muted">
            {done} of {total} tasks completed
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <StatTile label="Tasks" value={`${done}/${total}`} icon={<TasksIcon />} />
            <StatTile label="Due Today" value={`${dueToday}/${total}`} icon={<ClockIcon />} />
            <StatTile label="Lists" value={`${lists.length}`} icon={<ListsIcon />} />
          </div>
        </div>

        {/* Screen Time */}
        <div className="rounded-card border border-border bg-surface p-4">
          <h3 className="text-[18px] font-bold">Screen Time</h3>
          <p className="text-[12px] text-text-muted">Total weekly usage with top 3 apps per day.</p>
          <ScreenTimeChart days={screenTime} />
          <div className="mt-4 rounded-tile bg-surface-2 p-3">
            <p className="text-[13px] font-semibold text-text">Monday top apps</p>
            <ul className="mt-1.5 space-y-1">
              {(screenTime[0]?.topApps ?? []).slice(0, 3).map((a) => (
                <li key={a.name} className="flex items-center justify-between text-[13px]">
                  <span className="text-text">{a.name}</span>
                  <span className="text-text-muted">{a.minutes}m</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Highlights */}
        <div className="rounded-card border border-border bg-surface p-4">
          <h3 className="text-[18px] font-bold">Highlights</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Highlight label="Completed Today" value={`${completedToday}/${total}`} />
            <Highlight label="Overdue" value="0" />
            <Highlight label="Active Lists" value={`${lists.length}`} />
            <Highlight label="" value="No overdue tasks right now." muted />
          </div>
        </div>

        {/* Blocked apps */}
        <div className="rounded-card border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold">Blocked Apps</h3>
            <span className="text-[12px] text-text-dim">{blocked.length}</span>
          </div>
          <p className="mt-1 text-[12px] text-text-muted">
            Tap an app to view its list, allow a 15-minute override, or reblock immediately.
          </p>
          <div className="mt-3 flex items-center justify-center rounded-tile bg-surface-2 px-4 py-4 text-[13px] text-text-muted">
            <BellOff className="mr-2 text-text-dim" />
            No apps are currently blocked.
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-tile bg-surface-2 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
        <span className="text-text-muted">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-[16px] font-bold tracking-tight text-text">{value}</div>
    </div>
  );
}

function Highlight({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      {label && <p className="text-[12px] text-text-muted">{label}</p>}
      <p className={muted ? "text-[12px] text-text-dim" : "text-[18px] font-bold tracking-tight"}>{value}</p>
    </div>
  );
}

function ScreenTimeChart({ days }: { days: { day: string; minutes: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const max = Math.max(60, ...days.map((d) => d.minutes));
  return (
    <div ref={ref} className="mt-4 flex h-[110px] items-end gap-3">
      {days.map((d, i) => {
        const h = Math.max(4, (d.minutes / max) * 100);
        return (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[11px] text-text-muted">{d.minutes ? `${d.minutes}m` : ""}</span>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{
                duration: 0.5,
                ease: easeOutExpo,
                delay: i * 0.05,
              }}
              style={{
                height: `${h}%`,
                transformOrigin: "bottom",
                background: d.minutes > 0 ? "#0A84FF" : "#1F2024",
              }}
              className="w-full max-w-[18px] rounded-tile"
            />
            <span className="text-[11px] text-text-muted">{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function TasksIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 7.4 L6 9.4 L10 4.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 4 V7 L9 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function ListsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="2" y="3" width="10" height="2" rx="0.7" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="6.5" width="10" height="2" rx="0.7" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="10" width="10" height="2" rx="0.7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function BellOff({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
      <path d="M3 11 L11 11 M5 11 V7 a2 2 0 0 1 4 0 v4 M2 2 L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
