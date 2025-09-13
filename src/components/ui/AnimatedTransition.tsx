import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function AnimatedTransition({ children, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({ children, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`bg-gradient-card backdrop-blur-lg border border-brand-200/20 dark:border-slate-700/30 rounded-xl shadow-card hover:shadow-hover transition-shadow ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedPresenceProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
