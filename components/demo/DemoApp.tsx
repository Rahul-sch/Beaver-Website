"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDemoStore } from "@/lib/store";
import { tabSwap } from "@/lib/motion";
import { ListsView } from "./lists/ListsView";
import { ProgressView } from "./progress/ProgressView";
import { ActivityView } from "./activity/ActivityView";
import { TabBar } from "./TabBar";
import { SplashScreen } from "./SplashScreen";

export function DemoApp({ showSplash = true }: { showSplash?: boolean }) {
  const active = useDemoStore((s) => s.activeTab);
  const [splashOpen, setSplashOpen] = useState(showSplash);

  useEffect(() => {
    if (!showSplash) return;
    const t = setTimeout(() => setSplashOpen(false), 900);
    return () => clearTimeout(t);
  }, [showSplash]);

  return (
    <div className="relative h-full w-full text-text">
      <AnimatePresence>{splashOpen && <SplashScreen />}</AnimatePresence>
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={tabSwap}
            initial="initial"
            animate="enter"
            exit="exit"
            className="h-full w-full"
          >
            {active === "tasks" && <ListsView />}
            {active === "progress" && <ProgressView />}
            {active === "activity" && <ActivityView />}
          </motion.div>
        </AnimatePresence>
      </div>
      <TabBar />
    </div>
  );
}
