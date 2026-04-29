"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useDemoStore } from "@/lib/store";
import { easeOutExpo, layoutSpring } from "@/lib/motion";
import type { Task } from "@/lib/types";

export function TaskRow({ task }: { task: Task }) {
  const toggle = useDemoStore((s) => s.toggleTask);
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      layout="position"
      transition={layoutSpring}
      className="flex items-center gap-3 py-2"
    >
      <Checkbox
        checked={task.done}
        onClick={() => toggle(task.id)}
        reduceMotion={!!reduceMotion}
      />
      <button
        onClick={() => toggle(task.id)}
        className="relative flex-1 text-left"
      >
        <motion.span
          animate={{
            color: task.done ? "#5A5A62" : "#F5F5F7",
            opacity: task.done ? 0.55 : 1,
          }}
          transition={{ duration: 0.25, ease: easeOutExpo }}
          className="block text-[15px] leading-snug"
        >
          {task.title}
        </motion.span>
        {/* strikethrough line */}
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] w-full -translate-y-1/2 overflow-visible"
          style={{ width: "100%" }}
        >
          <motion.line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="#5A5A62"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: task.done ? 1 : 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : task.done
                  ? { duration: 0.25, ease: easeOutExpo, delay: 0.12 }
                  : { duration: 0.18, ease: easeOutExpo }
            }
            style={{ pathLength: task.done ? 1 : 0 }}
          />
        </svg>
      </button>
    </motion.li>
  );
}

function Checkbox({
  checked,
  onClick,
  reduceMotion,
}: {
  checked: boolean;
  onClick: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 700, damping: 28 }}
      className="relative grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border"
      style={{ borderColor: checked ? "#0A84FF" : "#3a3a40" }}
      aria-checked={checked}
      role="checkbox"
    >
      <motion.span
        className="absolute inset-0 rounded-[5px]"
        animate={{ backgroundColor: checked ? "#0A84FF" : "rgba(10,132,255,0)" }}
        transition={{ duration: 0.18 }}
      />
      <svg
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="none"
        className="relative"
        aria-hidden
      >
        <motion.path
          d="M3 8.4 L6.4 11.6 L13 5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.22, ease: [0.65, 0, 0.35, 1], delay: checked ? 0.06 : 0 }
          }
          style={{ pathLength: checked ? 1 : 0 }}
        />
      </svg>
    </motion.button>
  );
}
