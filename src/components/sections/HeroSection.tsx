import {
  usePlanStore,
  selectActivities,
  selectAddItem,
  selectSetTheme,
} from "../../store/planStore";
import { useState } from "react";
import { motion } from "framer-motion";

function HeroPlanner() {
  const activities = usePlanStore(selectActivities);
  const addItem = usePlanStore(selectAddItem);
  const setTheme = usePlanStore(selectSetTheme);
  const [theme, setThemeLocal] = useState("default");
  const [mood, setMood] = useState("");
  const [start, setStart] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 sm:grid-cols-5 p-3 sm:p-4 rounded-xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-brand-100/20 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
      <motion.div 
        className="sm:col-span-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
          Theme
        </label>
        <div className="relative">
          <select
            value={theme}
            onChange={(e) => setThemeLocal(e.target.value)}
            className="w-full pl-4 pr-8 py-2.5 text-sm bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-brand-100/20 dark:border-slate-700/30 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-400/40 focus:border-transparent transition-shadow appearance-none"
          >
            <option value="default">✨ Default</option>
            <option value="lazy">🛋️ Lazy Weekend</option>
            <option value="adventurous">🏃‍♂️ Adventurous</option>
            <option value="family">👨‍👩‍👧‍👦 Family</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500/70">
            <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
          Mood
        </label>
        <div className="relative">
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full pl-4 pr-8 py-2.5 text-sm bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-brand-100/20 dark:border-slate-700/30 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-400/40 focus:border-transparent transition-shadow appearance-none"
          >
            <option value="">🎭 Any</option>
            <option value="happy">😊 Happy</option>
            <option value="relaxed">😌 Relaxed</option>
            <option value="energetic">⚡ Energetic</option>
            <option value="chill">🧘‍♂️ Chill</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500/70">
            <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
          Start Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full pl-4 pr-3 py-2.5 text-sm bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-brand-100/20 dark:border-slate-700/30 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-400/40 focus:border-transparent transition-shadow [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:dark:invert"
          />
        </div>
      </motion.div>

      <motion.div 
        className="flex items-end sm:col-span-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setTheme(theme as any);
            const pool = activities.filter((a) =>
              mood ? (a.moods || []).includes(mood as any) : true
            );
            const picks = pool.slice(0, 4);
            const startBase = start
              ? new Date(start + "T09:00:00")
              : new Date();
            const addBlock = (
              day: "saturday" | "sunday",
              offsetHours: number,
              aId: string
            ) => {
              const d = new Date(startBase);
              d.setHours(d.getHours() + offsetHours);
              const hh = String(d.getHours()).padStart(2, "0");
              const mm = String(d.getMinutes()).padStart(2, "0");
              addItem({
                activityId: aId,
                day,
                start: `${hh}:${mm}`,
                durationMin: 60,
                mood: mood as any,
              });
            };
            if (picks[0]) addBlock("saturday", 0, picks[0].id);
            if (picks[1]) addBlock("saturday", 2, picks[1].id);
            if (picks[2]) addBlock("sunday", 0, picks[2].id);
            if (picks[3]) addBlock("sunday", 2, picks[3].id);
          }}
          className="w-full h-[42px] rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-sm font-medium shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-300"
        >
          Plan my weekend
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-[360px] sm:h-[420px] w-full bg-center bg-cover transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop')",
        }}
      >
        <div className="h-full w-full bg-gradient-to-r from-black/60 via-black/40 to-black/20 backdrop-blur-[2px]" />
      </motion.div>

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white drop-shadow-lg mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Design your perfect weekend
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 mt-3 max-w-lg">
              Pick a vibe, add activities, and craft a memorable
              Saturday–Sunday filled with experiences you'll love.
            </p>
          </motion.div>
          <HeroPlanner />
        </div>
      </div>
    </section>
  );
}
