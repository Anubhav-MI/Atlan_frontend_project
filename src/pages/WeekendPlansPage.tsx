import { motion } from "framer-motion";
import { ScheduleBoard } from "../features/planner/ScheduleBoard";
import { AnimatedTransition } from "../components/ui/AnimatedTransition";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function WeekendPlansPage() {
  return (
    <AnimatedTransition>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section with MakeMyTrip-inspired gradient */}
        <motion.div
          variants={pageVariants}
          className="text-center mb-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-radial from-brand-50 via-transparent to-transparent dark:from-brand-950/20 -z-10" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent mb-4">
            Your Weekend Plans
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Plan and organize your perfect weekend activities with our intuitive
            drag-and-drop scheduler
          </p>
        </motion.div>

        {/* Main Schedule Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-card backdrop-blur-lg rounded-xl shadow-card hover:shadow-lg transition-shadow p-6 border border-brand-100/20 dark:border-slate-700/30"
        >
          <div className="max-h-[calc(100vh-200px)] overflow-auto scrollbar-thin scrollbar-thumb-brand-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent pr-2">
            <ScheduleBoard />
          </div>
        </motion.div>

        {/* Quick Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="p-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-3xl mb-3 animate-float"
            >
              ✨
            </motion.div>
            <h3 className="font-semibold text-brand-500 mb-2">Drag & Drop</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Easily rearrange activities by dragging them between days
            </p>
          </div>
          <div className="p-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-3xl mb-3 animate-float"
            >
              ⏰
            </motion.div>
            <h3 className="font-semibold text-brand-500 mb-2">Smart Timing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Set precise timings and durations for each activity
            </p>
          </div>
          <div className="p-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-3xl mb-3 animate-float"
            >
              🎨
            </motion.div>
            <h3 className="font-semibold text-brand-500 mb-2">Mood Tracking</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add mood indicators to optimize your weekend flow
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatedTransition>
  );
}
