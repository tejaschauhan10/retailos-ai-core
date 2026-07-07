import type { Transition, Variants } from "framer-motion";

import { duration, easing } from "@/core/constants/tokens";

const secs = (ms: number) => ms / 1000;

export const transitions = {
  fast: { duration: secs(duration.fast), ease: easing.standard } satisfies Transition,
  base: { duration: secs(duration.base), ease: easing.standard } satisfies Transition,
  slow: { duration: secs(duration.slow), ease: easing.standard } satisfies Transition,
  spring: { type: "spring", stiffness: 380, damping: 32 } satisfies Transition,
} as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: transitions.base },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitions.base },
};

export const stagger = (gap = 0.06): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: 0.04 } },
});

export const drawerSlide: Variants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: transitions.base },
  exit: { x: "100%", transition: transitions.fast },
};

export const dropdownPop: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: -4 },
  show: { opacity: 1, scale: 1, y: 0, transition: transitions.fast },
};

export const modalPop: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: transitions.base },
  exit: { opacity: 0, scale: 0.98, transition: transitions.fast },
};