"use client";

import { motion } from "framer-motion";
import { BeaverGlyph } from "@/components/ui/BeaverMark";

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="absolute inset-0 z-20 grid place-items-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-white/90"
      >
        <BeaverGlyph size={88} />
      </motion.div>
    </motion.div>
  );
}
