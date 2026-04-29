import type { Easing, Transition, Variants } from "framer-motion";

export const easeOutExpo: Easing = [0.22, 1, 0.36, 1];
export const easeStandard: Easing = [0.4, 0, 0.2, 1];
export const easeInOut: Easing = [0.65, 0, 0.35, 1];

export const fadeUp: Variants = {
  initial: { y: 24, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.4, ease: easeStandard } },
};

export const popIn: Variants = {
  initial: { scale: 0.85, opacity: 0 },
  enter: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
  exit: { scale: 0.85, opacity: 0, transition: { duration: 0.18 } },
};

export const stagger = (delayChildren = 0.05, staggerChildren = 0.06): Variants => ({
  initial: {},
  enter: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

export const slideX = (dir: 1 | -1 = 1): Variants => ({
  initial: { x: dir * 24, opacity: 0 },
  enter: { x: 0, opacity: 1, transition: { duration: 0.32, ease: easeStandard } },
  exit: { x: -dir * 24, opacity: 0, transition: { duration: 0.22, ease: easeStandard } },
});

export const tabSwap: Variants = {
  initial: { y: 8, opacity: 0 },
  enter: { y: 0, opacity: 1, transition: { duration: 0.22, ease: easeStandard } },
  exit: { y: -8, opacity: 0, transition: { duration: 0.18, ease: easeStandard } },
};

export const layoutSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 36,
};
