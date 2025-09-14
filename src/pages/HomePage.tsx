import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroSection } from "../components/sections/HeroSection";
import {
  AnimatedCard,
  AnimatedTransition,
} from "../components/ui/AnimatedTransition";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function HomePage() {
  return (
    <AnimatedTransition>
      <HeroSection />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-gradient-to-br from-brand-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Main content grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative grid md:grid-cols-2 gap-8 mb-16"
        >
          <AnimatedCard className="p-8 group bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-brand-100/20 dark:border-slate-700/30 rounded-2xl hover:shadow-xl transition-all duration-300">
            <motion.span 
              whileHover={{ scale: 1.2, rotate: 12 }}
              className="inline-block text-5xl mb-6"
            >
              🎯
            </motion.span>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent mb-4">
              Plan Your Activities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 min-h-[80px] text-lg">
              Browse through our curated list of weekend activities. From
              outdoor adventures to cozy indoor experiences, find the perfect
              activities for your weekend.
            </p>
            <Link
              to="/activities"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 text-white text-sm font-medium shadow-lg shadow-brand-500/25 hover:shadow-brand-500/50 transition-all duration-300 group-hover:scale-[1.02]"
            >
              Browse Activities
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </Link>
          </AnimatedCard>

          <AnimatedCard className="p-8 group bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-brand-100/20 dark:border-slate-700/30 rounded-2xl hover:shadow-xl transition-all duration-300">
            <motion.span 
              whileHover={{ scale: 1.2, rotate: -12 }}
              className="inline-block text-5xl mb-6"
            >
              📅
            </motion.span>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent mb-4">
              View Your Plans
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 min-h-[80px] text-lg">
              Check your scheduled activities, manage your weekend plans, and
              make adjustments to create the perfect weekend schedule.
            </p>
            <Link
              to="/weekend-plans"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 text-white text-sm font-medium shadow-lg shadow-brand-500/25 hover:shadow-brand-500/50 transition-all duration-300 group-hover:scale-[1.02]"
            >
              View Plans
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </Link>
          </AnimatedCard>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mt-24 text-center"
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent mb-8">
            Why Choose Weekendly?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-brand-100/20 dark:border-slate-700/30 transition-shadow hover:shadow-xl"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 12 }}
                className="text-4xl mb-4 inline-block"
              >
                ⚡️
              </motion.div>
              <h4 className="text-lg font-semibold mb-3 bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                Quick Planning
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-base">
                Plan your entire weekend in minutes with our intuitive interface
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-brand-100/20 dark:border-slate-700/30 transition-shadow hover:shadow-xl"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: -12 }}
                className="text-4xl mb-4 inline-block"
              >
                🎨
              </motion.div>
              <h4 className="text-lg font-semibold mb-3 bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                Curated Activities
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-base">
                Hand-picked activities for every type of weekend warrior
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-brand-100/20 dark:border-slate-700/30 transition-shadow hover:shadow-xl"
            >
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className="text-4xl mb-4 inline-block"
              >
                🔄
              </motion.div>
              <h4 className="text-lg font-semibold mb-3 bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                Flexible Schedule
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-base">
                Easily adjust and rearrange your plans with drag-and-drop
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedTransition>
  );
}
