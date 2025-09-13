import { useEffect, useMemo, useState } from "react";
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
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search activities"
          className="border border-transparent dark:border-slate-700/30 rounded-md px-3 py-2 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white dark:bg-slate-900/60 backdrop-blur"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-transparent dark:border-slate-700/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white dark:bg-slate-900/60 backdrop-blur"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="border border-transparent dark:border-slate-700/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white dark:bg-slate-900/60 backdrop-blur"
        >
          <option value="all">All moods</option>
          {MOODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={targetDay}
          onChange={(e) => setTargetDay(e.target.value as DayId)}
          className="border border-transparent dark:border-slate-700/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white dark:bg-slate-900/60 backdrop-blur"
        >
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-2 gap-3">
        {filtered.map((a) => (
          <li
            key={a.id}
            className="rounded-xl border border-transparent dark:border-slate-700/30 bg-white dark:bg-slate-900/60 backdrop-blur p-4 shadow-card hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden>
                {a.icon}
              </span>
              <div>
                <div className="font-medium dark:text-white">{a.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {a.category}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Button
                onClick={() =>
                  addItem({
                    activityId: a.id,
                    day: targetDay,
                    start: timeNowRounded(),
                    durationMin: a.defaultDurationMin || 60,
                  })
                }
              >
                Add to {targetDay}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityList;
