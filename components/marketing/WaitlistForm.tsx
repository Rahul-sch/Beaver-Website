"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { validate } from "@/lib/auth";
import { cn } from "@/lib/cn";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [list, setList] = useLocalStorage<string[]>("waitlist", []);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate.email(email)) {
      setError("Enter a valid email.");
      return;
    }
    setError(null);
    setList((prev) => Array.from(new Set([...prev, email.trim()])));
    setDone(true);
  }

  return (
    <form onSubmit={submit} className={cn("flex w-full flex-col gap-2", compact ? "" : "max-w-md")}>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-pill border border-success/40 bg-success/10 px-4 py-3 text-[14px] text-success"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8 L7 12 L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            You&apos;re #{list.length} on the waitlist.
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="you@beaver.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              invalid={!!error}
              className="sm:flex-1"
            />
            <Button type="submit" className="shrink-0">
              Join waitlist
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden text-[12px] text-[#FF453A]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
