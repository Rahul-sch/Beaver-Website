"use client";

import { useDemoStore } from "@/lib/store";

export function DemoResetButton() {
  const reset = useDemoStore((s) => s.resetDemo);
  return (
    <button
      onClick={reset}
      className="text-xs uppercase tracking-[0.16em] text-text-muted hover:text-text transition-colors"
    >
      Reset demo
    </button>
  );
}
