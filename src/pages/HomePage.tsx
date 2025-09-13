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
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatedCard className="p-8 group">
            <span className="inline-block text-4xl mb-4">🎯</span>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent mb-3">
              Plan Your Activities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[80px]">
              Browse through our curated list of weekend activities. From
              outdoor adventures to cozy indoor experiences, find the perfect
              activities for your weekend.
            </p>
            <Link
              to="/activities"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-medium shadow-lg shadow-brand-500/25 hover:shadow-brand-500/50 transition-shadow group-hover:scale-[1.02]"
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

          <AnimatedCard className="p-8 group">
            <span className="inline-block text-4xl mb-4">📅</span>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent mb-3">
              View Your Plans
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[80px]">
              Check your scheduled activities, manage your weekend plans, and
              make adjustments to create the perfect weekend schedule.
            </p>
            <Link
              to="/weekend-plans"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-medium shadow-lg shadow-brand-500/25 hover:shadow-brand-500/50 transition-shadow group-hover:scale-[1.02]"
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

        {/* Quick Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg font-semibold text-brand-500 mb-4">
            Why Choose Weekendly?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="p-4">
              <div className="text-2xl mb-2">⚡️</div>
              <h4 className="font-medium mb-1">Quick Planning</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Plan your entire weekend in minutes with our intuitive interface
              </p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="font-medium mb-1">Curated Activities</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Hand-picked activities for every type of weekend warrior
              </p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🔄</div>
              <h4 className="font-medium mb-1">Flexible Schedule</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Easily adjust and rearrange your plans with drag-and-drop
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedTransition>
  );
}
