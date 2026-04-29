"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { useDemoStore } from "@/lib/store";
import { easeOutExpo } from "@/lib/motion";
import type { DamState, ScreenTimeDay } from "@/lib/types";
import { DamProgressBar } from "./DamProgressBar";

export function ProgressView() {
  const lists = useDemoStore((s) => s.lists);
  const tasks = useDemoStore((s) => s.tasks);
  const screenTime = useDemoStore((s) => s.screenTime);
  const selectedDay = useDemoStore((s) => s.selectedScreenTimeDay);
  const setSelectedDay = useDemoStore((s) => s.setSelectedScreenTimeDay);
  const damStats = useDemoStore((s) => s.damStats);

  const personalListIds = useMemo(
    () => new Set(lists.filter((l) => !l.isGroup).map((l) => l.id)),
    [lists]
  );

  const { total, done, pctBuilt, damPts, state } = useMemo(() => {
    const personal = tasks.filter((t) => personalListIds.has(t.listId));
    const total = personal.length;
    const done = personal.filter((t) => t.done).length;
    const pctBuilt = total === 0 ? 0 : Math.round((done / total) * 100);
    const damPts = done * 10;
    const state: DamState =
      pctBuilt === 0 ? "leaky" : pctBuilt >= 100 ? "perfect" : "solid";
    return { total, done, pctBuilt, damPts, state };
  }, [tasks, personalListIds]);

  const stateLabel = state === "leaky" ? "Leaky" : state === "perfect" ? "Perfect" : "Solid";
  const stateChip =
    state === "leaky"
      ? "bg-warn/15 text-warn"
      : state === "perfect"
        ? "bg-[#BF5AF2]/20 text-[#BF5AF2]"
        : "bg-success/15 text-success";

  const selectedDayApps =
    screenTime.find((d) => d.day === selectedDay)?.topApps ?? [];

  return (
    <div className="h-full pb-28">
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-[26px] font-extrabold tracking-tight">Progress</h1>
          <span className="rounded-pill bg-surface-3 px-2.5 py-1 text-[11px] font-semibold text-text-muted">
            Free
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 px-4">
        {/* Today's Dam */}
        <div className="rounded-card border border-border bg-surface p-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-bold tracking-tight">Today&apos;s Dam</h2>
              <p className="text-[12px] text-text-dim">{formatDate()}</p>
            </div>
            <div className="text-right">
              <p className="flex items-center justify-end gap-1 text-[20px] font-extrabold tracking-tight">
                <BoltIcon />
                <CountUp to={damPts} />
              </p>
              <p className="text-[11px] text-text-dim">dam pts</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-text">
              <CountUp to={pctBuilt} />% built
            </p>
            <span
              className={`rounded-pill px-2.5 py-1 text-[11px] font-bold ${stateChip}`}
            >
              {stateLabel}
            </span>
          </div>
          <p className="mt-2 text-[12px] text-text-dim">dam progress</p>
          <div className="mt-2">
            <DamProgressBar pct={pctBuilt} state={state} />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            <DeltaTile icon={<TasksIcon />} value={`+${damStats.delta.tasks}`} label="Tasks" />
            <DeltaTile icon={<PercentIcon />} value={`+${damStats.delta.completionPct}%`} label="Completion" />
            <DeltaTile icon={<PhoneIcon />} value={`+${damStats.delta.screen}`} label="Screen" />
            <DeltaTile icon={<FlameIcon />} value={`${damStats.streakMultiplier.toFixed(1)}x`} label="Streak" />
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            <BigStreak value={damStats.dayStreak} />
            <SmallStat icon={<TasksIcon />} label="Tasks" value={`${done}/${total}`} />
            <SmallStat icon={<DamIcon />} label="Perfect Dams" value={`${damStats.perfectDams}`} />
            <SmallStat icon={<WarnIcon />} label="Overdue" value={`${damStats.overdue}`} />
          </div>
        </div>

        {/* Screen Time */}
        <div className="rounded-card border border-border bg-surface p-4">
          <h3 className="text-[18px] font-bold">Screen Time</h3>
          <p className="text-[12px] text-text-muted">
            Total weekly usage with top 3 apps per day.
          </p>
          <ScreenTimeChart
            days={screenTime}
            selected={selectedDay}
            onSelect={setSelectedDay}
          />
          {selectedDayApps.length > 0 && (
            <div className="mt-4 rounded-tile bg-surface-2 p-3">
              <p className="text-[13px] font-semibold text-text">
                {dayFullName(selectedDay)}&apos;s top apps
              </p>
              <ul className="mt-1.5 space-y-1">
                {selectedDayApps.slice(0, 3).map((a) => (
                  <li key={a.name} className="flex items-center justify-between text-[13px]">
                    <span className="text-text">{a.name}</span>
                    <span className="text-text-muted">{a.minutes}m</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CountUp({ to }: { to: number }) {
  // Cheap "count up" — just renders the final value; the parent ring/stat already has the wow.
  return <>{to}</>;
}

function DeltaTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-tile bg-surface-2 px-1.5 py-2.5">
      <span className="text-text-muted">{icon}</span>
      <span className="mt-1 text-[15px] font-bold tracking-tight">{value}</span>
      <span className="text-[10px] text-text-dim">{label}</span>
    </div>
  );
}

function BigStreak({ value }: { value: number }) {
  return (
    <div className="flex flex-col items-start justify-center rounded-tile px-1 py-2">
      <span className="text-[28px] font-extrabold leading-none tracking-tight">
        {value}
      </span>
      <span className="text-[10px] text-text-dim">day streak</span>
    </div>
  );
}

function SmallStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-tile bg-surface-2 px-2 py-2.5">
      <span className="text-text-muted">{icon}</span>
      <span className="mt-1 text-[15px] font-bold tracking-tight">{value}</span>
      <span className="text-[10px] text-text-dim">{label}</span>
    </div>
  );
}

function ScreenTimeChart({
  days,
  selected,
  onSelect,
}: {
  days: ScreenTimeDay[];
  selected: ScreenTimeDay["day"];
  onSelect: (d: ScreenTimeDay["day"]) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const max = Math.max(15, ...days.map((d) => d.minutes));
  return (
    <div ref={ref} className="mt-4 flex h-[110px] items-end gap-3">
      {days.map((d, i) => {
        const h = d.minutes === 0 ? 4 : Math.max(8, (d.minutes / max) * 100);
        const isSelected = selected === d.day;
        return (
          <button
            key={d.day}
            onClick={() => onSelect(d.day)}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <span className="text-[11px] text-text-muted">
              {d.minutes ? `${d.minutes}m` : "0m"}
            </span>
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
                background:
                  d.minutes > 0
                    ? "#0A84FF"
                    : isSelected
                      ? "#1F2024"
                      : "#1F2024",
                opacity: d.minutes === 0 && !isSelected ? 0.5 : 1,
              }}
              className="w-full max-w-[18px] rounded-tile"
            />
            <span
              className={`text-[11px] ${
                isSelected ? "font-semibold text-text" : "text-text-muted"
              }`}
            >
              {d.day}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function dayFullName(d: ScreenTimeDay["day"]) {
  return (
    {
      M: "Monday",
      T: "Tuesday",
      W: "Wednesday",
      Th: "Thursday",
      F: "Friday",
      Sa: "Saturday",
      Su: "Sunday",
    } as const
  )[d];
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function BoltIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="#0A84FF" aria-hidden>
      <path d="M8 1 L2 9 L6.5 9 L5 15 L12 6 L7.5 6 L8 1 Z" />
    </svg>
  );
}
function TasksIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 7.4 L6.4 9.4 L9.6 5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PercentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <line x1="3" y1="11" x2="11" y2="3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="4" cy="4" r="1.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="1.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="3.5" y="1.5" width="7" height="11" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
      <line x1="6" y1="10.5" x2="8" y2="10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function FlameIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 13 c-3 0 -4.5 -2 -4.5 -4.5 c0 -2 2 -2.5 2 -5 c0 0 1.5 1.5 1.5 3 c0.7 -1.5 2 -2 2 -3.5 c1.5 1.5 3 4 3 6 c0 2 -1 4 -4 4 z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function DamIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 11 L12 11 M3 11 L4 5 L7 4 L10 5 L11 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 6.5 L9 6.5 M5 8.5 L9 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function WarnIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 1.5 L13 12 L1 12 L7 1.5 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="7" y1="6" x2="7" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="10.6" r="0.7" fill="currentColor" />
    </svg>
  );
}
