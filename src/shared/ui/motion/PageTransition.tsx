import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeInUp } from "./variants";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeInUp}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}