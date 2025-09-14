import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { activitiesCatalog, CATEGORIES, MOODS } from "./data";
import { Button } from "../../components/ui/Button";
import {
  selectAddItem,
  selectSetActivities,
  selectActivities,
  usePlanStore,
  type DayId,
} from "../../store/planStore";

function timeNowRounded(): string {
  const d = new Date();
  const m = d.getMinutes();
  const rounded = Math.ceil(m / 15) * 15;
  d.setMinutes(rounded % 60);
  d.setHours(d.getHours() + Math.floor(rounded / 60));
  return d.toTimeString().slice(0, 5);
}

export function ActivityList() {
  const activities = usePlanStore(selectActivities);
  const setActivities = usePlanStore(selectSetActivities);
  const addItem = usePlanStore(selectAddItem);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [mood, setMood] = useState<string>("all");
  const [targetDay, setTargetDay] = useState<DayId>("saturday");

  useEffect(() => {
    if (!activities || activities.length === 0)
      setActivities(activitiesCatalog);
  }, [activities, setActivities]);

  const filtered = useMemo(() => {
    return activities.filter((a) => {
      if (query && !a.title.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (category !== "all" && a.category !== category) return false;
      if (mood !== "all" && !(a.moods || []).includes(mood as any))
        return false;
      return true;
    });
  }, [activities, query, category, mood]);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-brand-100/20 dark:border-slate-700/30">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[240px]">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search activities..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900/60 rounded-xl text-sm border border-brand-100/20 dark:border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-brand-400/40 transition-shadow"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-3 pr-8 py-2.5 bg-white dark:bg-gray-900/60 rounded-xl text-sm border border-brand-100/20 dark:border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-brand-400/40 transition-shadow capitalize"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c}
                </option>
              ))}
            </select>

            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="pl-3 pr-8 py-2.5 bg-white dark:bg-gray-900/60 rounded-xl text-sm border border-brand-100/20 dark:border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-brand-400/40 transition-shadow capitalize"
            >
              <option value="all">All moods</option>
              {MOODS.map((m) => (
                <option key={m} value={m} className="capitalize">
                  {m}
                </option>
              ))}
            </select>

            <select
              value={targetDay}
              onChange={(e) => setTargetDay(e.target.value as DayId)}
              className="pl-3 pr-8 py-2.5 bg-white dark:bg-gray-900/60 rounded-xl text-sm border border-brand-100/20 dark:border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-brand-400/40 transition-shadow"
            >
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No activities found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          filtered.map((a) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-white dark:bg-gray-800/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-brand-100/20 dark:border-slate-700/30 hover:border-brand-200/30 dark:hover:border-slate-600/40"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-50 dark:bg-brand-900/30 rounded-xl text-2xl group-hover:scale-110 transition-transform duration-300">
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                    {a.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 capitalize">
                      {a.category}
                    </span>
                    {a.moods?.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 capitalize"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      addItem({
                        activityId: a.id,
                        day: targetDay,
                        start: timeNowRounded(),
                        durationMin: a.defaultDurationMin || 60,
                      })
                    }
                    className="w-full py-2 bg-gradient-to-r from-brand-500 to-brand-400 hover:from-brand-600 hover:to-brand-500 text-white rounded-lg text-sm font-medium group-hover:shadow-md transition-all duration-300"
                  >
                    Add to {targetDay}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default ActivityList;
