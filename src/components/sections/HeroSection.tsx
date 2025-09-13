import {
  usePlanStore,
  selectActivities,
  selectAddItem,
  selectSetTheme,
} from "../../store/planStore";
import { useState } from "react";

function HeroPlanner() {
  const activities = usePlanStore(selectActivities);
  const addItem = usePlanStore(selectAddItem);
  const setTheme = usePlanStore(selectSetTheme);
  const [theme, setThemeLocal] = useState("default");
  const [mood, setMood] = useState("");
  const [start, setStart] = useState("");

  return (
    <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 sm:grid-cols-5 p-3 sm:p-4 rounded-xl bg-white/80 dark:bg-slate-900/70 backdrop-blur border border-transparent dark:border-slate-700/30 shadow-card">
      <div className="sm:col-span-2">
        <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">
          Theme
        </label>
        <select
          value={theme}
          onChange={(e) => setThemeLocal(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white/80 dark:bg-slate-900/60 backdrop-blur dark:border-slate-700/30"
        >
          <option value="default">Default</option>
          <option value="lazy">Lazy Weekend</option>
          <option value="adventurous">Adventurous</option>
          <option value="family">Family</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">
          Mood
        </label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white/80 dark:bg-slate-900/60 backdrop-blur dark:border-slate-700/30"
        >
          <option value="">Any</option>
          <option value="happy">Happy</option>
          <option value="relaxed">Relaxed</option>
          <option value="energetic">Energetic</option>
          <option value="chill">Chill</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">
          Start
        </label>
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white/80 dark:bg-slate-900/60 backdrop-blur dark:border-slate-700/30"
        />
      </div>
      <div className="flex items-end sm:col-span-1">
        <button
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
          className="w-full h-[38px] rounded-md bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-sm font-medium shadow"
        >
          Plan my weekend
        </button>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative">
      <div
        className="h-[320px] sm:h-[380px] w-full bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop')",
        }}
      >
        <div className="h-full w-full bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-white drop-shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Design your perfect weekend
            </h1>
            <p className="text-sm sm:text-base text-white/90 mt-1">
              Pick a vibe, add activities, and craft a memorable
              Saturday–Sunday.
            </p>
          </div>
          <HeroPlanner />
        </div>
      </div>
    </section>
  );
}
