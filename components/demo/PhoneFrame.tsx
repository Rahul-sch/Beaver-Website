"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  className,
  width = 340,
}: {
  children: ReactNode;
  className?: string;
  width?: number;
}) {
  // 19.5:9 aspect — iPhone-ish.
  const height = Math.round((width * 19.5) / 9);
  return (
    <div
      className={cn(
        "relative mx-auto select-none",
        className
      )}
      style={{ width, height }}
    >
      {/* outer bezel */}
      <div
        className="absolute inset-0 rounded-[44px] p-[3px]"
        style={{
          background:
            "linear-gradient(180deg, #2a2b30 0%, #16171a 40%, #1c1d20 100%)",
          boxShadow:
            "0 60px 120px -40px rgba(10,132,255,0.45), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* inner bezel */}
        <div className="relative h-full w-full overflow-hidden rounded-[42px] bg-[#0c0c0e] p-[2px]">
          {/* screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-black">
            {/* status bar */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-7 pt-3 text-[13px] font-semibold tracking-tight text-white">
              <span>12:30</span>
              <span className="flex items-center gap-1">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon />
              </span>
            </div>
            {/* dynamic island */}
            <div className="absolute top-2.5 left-1/2 z-30 h-7 w-[100px] -translate-x-1/2 rounded-full bg-black" />
            {/* content */}
            <div className="phone-scroll relative h-full w-full overflow-y-auto pt-12">
              {children}
            </div>
            {/* home indicator */}
            <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-1 w-[110px] -translate-x-1/2 rounded-full bg-white/35" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" aria-hidden>
      <rect x="0" y="7" width="2.5" height="3" rx="0.6" />
      <rect x="3.7" y="5" width="2.5" height="5" rx="0.6" />
      <rect x="7.4" y="3" width="2.5" height="7" rx="0.6" />
      <rect x="11.1" y="0" width="2.5" height="10" rx="0.6" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M1 4 Q7 -1 13 4" />
      <path d="M3 6 Q7 3 11 6" />
      <circle cx="7" cy="9" r="0.9" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="18" height="9" rx="2.2" stroke="currentColor" />
      <rect x="2" y="2" width="4" height="6" rx="1" fill="#FF9F0A" />
      <rect x="19" y="3.5" width="2" height="3" rx="0.7" fill="currentColor" />
    </svg>
  );
}
