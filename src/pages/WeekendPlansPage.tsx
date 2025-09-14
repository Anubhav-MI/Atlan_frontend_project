import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ScheduleBoard } from "../features/planner/ScheduleBoard";
import { AnimatedTransition } from "../components/ui/AnimatedTransition";
import { ShareableCard } from "../components/ui/ShareableCard";
import { usePlanStore, selectActivities } from "../store/planStore";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const QuickTip = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-brand-100/20 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 5, 0] }}
      transition={{ duration: 0.5 }}
      className="text-4xl mb-4 bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-inner"
    >
      {icon}
    </motion.div>
    <h3 className="font-semibold text-lg bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent mb-3">
      {title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export function WeekendPlansPage() {
  const [isSharing, setIsSharing] = useState(false);
  const allItems = usePlanStore((s) => s.plan.items);
  const activities = usePlanStore(selectActivities);

  return (
    <>
      <AnimatedTransition>
        <div className="min-h-screen max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col">
          {/* Header Section with gradient */}
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center relative mb-8"
          >
            <div className="absolute inset-0 bg-gradient-radial from-brand-50/80 via-transparent to-transparent dark:from-brand-950/30 -z-10 blur-2xl" />
            <div className="flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 bg-clip-text text-transparent">
                  Your Weekend Plans
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Plan and organize your perfect weekend activities with our
                intuitive drag-and-drop scheduler
              </p>
            </div>
          </motion.div>

          {/* Main Schedule Board */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-gradient-to-b from-white via-gray-50/95 to-white dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-900/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-brand-100/20 dark:border-slate-700/30"
          >
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-50/50 via-transparent to-transparent dark:from-brand-900/20 rounded-t-2xl pointer-events-none" />
            <div
              className="max-h-[calc(100vh-280px)] overflow-auto pr-3 select-none relative
                [&::-webkit-scrollbar]{w-1}
                [&::-webkit-scrollbar-track]{bg-transparent}
                [&::-webkit-scrollbar-thumb]{bg-brand-200/20 transition-opacity}
                dark:[&::-webkit-scrollbar-thumb]{bg-slate-700/40}
                [&:hover::-webkit-scrollbar-thumb]{opacity-100}
                [&::selection]{bg-transparent}
                [&::-moz-selection]{bg-transparent}"
            >
              <ScheduleBoard />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-transparent to-transparent dark:from-gray-900 rounded-b-2xl pointer-events-none" />
          </motion.div>

          {/* Quick Tips Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <QuickTip
              icon="✨"
              title="Drag & Drop"
              description="Easily rearrange activities between days with smooth animations"
              delay={0.4}
            />
            <QuickTip
              icon="⏰"
              title="Smart Timing"
              description="Set precise timings and durations for each activity in your schedule"
              delay={0.5}
            />
            <QuickTip
              icon="🎨"
              title="Mood Tracking"
              description="Add mood indicators to optimize your weekend flow and balance"
              delay={0.6}
            />
          </div>

          {/* Bottom Share Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 mb-6 flex justify-center"
          >
            <div className="flex gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsSharing(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 hover:from-brand-500 hover:via-brand-400 hover:to-brand-300 text-white rounded-2xl font-medium shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                <div className="relative flex items-center gap-4">
                  <span className="text-2xl group-hover:rotate-[20deg] transition-transform duration-500">
                    ✨
                  </span>
                  <span className="text-lg font-semibold tracking-wide">
                    Share Your Weekend Plan
                  </span>
                  <span className="text-xl opacity-90 group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => usePlanStore.getState().exportToFile()}
                  className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-brand-100/20 dark:border-gray-700/30 shadow-sm hover:shadow transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400"
                  title="Export plans"
                >
                  <span className="text-xl">💾</span>
                </motion.button>

                <label className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-brand-100/20 dark:border-gray-700/30 shadow-sm hover:shadow transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 cursor-pointer"
                  >
                    <span className="text-xl">📂</span>
                  </motion.div>
                  <input
                    type="file"
                    accept=".json"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        usePlanStore
                          .getState()
                          .importFromFile(file)
                          .catch((error) => {
                            console.error("Import failed:", error);
                            alert(
                              "Failed to import plan. Please make sure the file is valid."
                            );
                          });
                      }
                    }}
                  />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Import plans
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedTransition>

      {/* Share Modal */}
      {isSharing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <ShareableCard
              items={allItems}
              activities={activities}
              onClose={() => setIsSharing(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
