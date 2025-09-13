import { motion } from "framer-motion";

export function ActivitySkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-gray-200 dark:bg-slate-800 rounded-lg w-full" />
      <div className="space-y-3">
        {[1, 2, 3].map((n) => (
          <motion.div
            key={n}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: n * 0.1 }}
            className="flex gap-4 items-center p-4 rounded-lg bg-gray-100 dark:bg-slate-800/50"
          >
            <div className="h-8 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-8 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="flex-1 h-8 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-8 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mb-4" />
        <p className="text-brand-500 font-medium">Loading...</p>
      </motion.div>
    </div>
  );
}
