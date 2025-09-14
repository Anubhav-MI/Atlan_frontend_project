import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  selectRemoveItem,
  selectUpdateItem,
  selectActivities,
  type DayId,
  type Mood,
  usePlanStore,
} from "../../store/planStore";

function DayColumn({ day }: { day: DayId }) {
  const allItems = usePlanStore((s) => s.plan.items);
  const items = useMemo(
    () =>
      allItems
        .filter((i) => i.day === day)
        .slice()
        .sort(
          (a, b) =>
            (a.order ?? 0) - (b.order ?? 0) || a.start.localeCompare(b.start)
        ),
    [allItems, day]
  );
  const updateItem = usePlanStore(selectUpdateItem);
  const removeItem = usePlanStore(selectRemoveItem);
  const activities = usePlanStore(selectActivities);
  const reorderInDay = usePlanStore((s) => s.reorderInDay);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-brand-100 dark:border-slate-800 p-6 bg-gradient-card dark:bg-slate-900/60 backdrop-blur shadow-card flex flex-col gap-4 min-h-[500px]"
    >
      <h3 className="font-semibold capitalize text-xl text-brand-600">{day}</h3>
      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-center">
            Drop activities here to start planning your {day}
          </div>
        </motion.div>
      )}
      <div
        className="space-y-3 flex-1"
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.currentTarget.classList.add("drag-over");
        }}
        onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
          e.currentTarget.classList.remove("drag-over");
        }}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.currentTarget.classList.remove("drag-over");

          const droppedId = draggedId || e.dataTransfer.getData("text/plain");
          if (!droppedId) return;

          // Find the drop target element
          const dropTarget = (e.target as HTMLElement).closest(
            "[data-id]"
          ) as HTMLElement | null;
          const dropTargetId = dropTarget?.getAttribute("data-id");

          // Get current ordered items for this day
          const orderedItems = items
            .slice()
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          const orderedIds = orderedItems.map((x) => x.id);

          // Find the positions
          const fromIndex = orderedIds.indexOf(droppedId);
          const dropTargetIndex = dropTargetId
            ? orderedIds.indexOf(dropTargetId)
            : orderedIds.length;

          if (fromIndex === -1) return; // Item not found
          if (fromIndex === dropTargetIndex) return; // Same position

          // Remove from old position and insert at new position
          orderedIds.splice(fromIndex, 1);
          orderedIds.splice(dropTargetIndex, 0, droppedId);

          // Update the store
          reorderInDay(day, orderedIds);
          setDraggedId(null);
        }}
      >
        <AnimatePresence>
          {items.map((it) => (
            <motion.div
              key={it.id}
              data-id={it.id}
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="border border-brand-100 dark:border-slate-700/30 rounded-lg p-4 flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur flex-wrap shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                role="button"
                aria-label="Drag to reorder"
                title="Drag to reorder"
                draggable
                onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                  e.dataTransfer.setData("text/plain", it.id);
                  e.dataTransfer.effectAllowed = "move";
                  setDraggedId(it.id);
                }}
                onDragEnd={() => setDraggedId(null)}
                className="select-none cursor-grab px-2 text-brand-400 hover:text-brand-500"
              >
                ≡
              </div>

              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <input
                  type="time"
                  value={it.start}
                  onChange={(e) => updateItem(it.id, { start: e.target.value })}
                  className="border rounded-md px-3 py-1.5 text-sm bg-white/80 dark:bg-slate-900/60 backdrop-blur border-brand-100 dark:border-slate-700/30"
                  aria-label="Start time"
                />
                <input
                  type="number"
                  value={it.durationMin}
                  onChange={(e) =>
                    updateItem(it.id, { durationMin: Number(e.target.value) })
                  }
                  className="border rounded-md px-3 py-1.5 w-24 text-sm bg-white/80 dark:bg-slate-900/60 backdrop-blur border-brand-100 dark:border-slate-700/30"
                  aria-label="Duration (min)"
                />
                <div className="flex-1 text-sm flex items-center gap-2">
                  <span className="text-xl" aria-hidden>
                    {activities.find((a) => a.id === it.activityId)?.icon ||
                      "•"}
                  </span>
                  <span className="font-medium">
                    {activities.find((a) => a.id === it.activityId)?.title ||
                      it.activityId}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={it.mood || ""}
                  onChange={(e) => {
                    const value = e.target.value as Mood | "";
                    updateItem(it.id, { mood: value || undefined });
                  }}
                  className="border rounded-md px-3 py-1.5 text-sm bg-white/80 dark:bg-slate-900/60 backdrop-blur border-brand-100 dark:border-slate-700/30"
                  aria-label="Mood"
                >
                  <option value="">Mood</option>
                  <option value="happy">Happy</option>
                  <option value="relaxed">Relaxed</option>
                  <option value="energetic">Energetic</option>
                  <option value="chill">Chill</option>
                </select>
                <select
                  value={it.day}
                  onChange={(e) =>
                    updateItem(it.id, { day: e.target.value as DayId })
                  }
                  className="border rounded-md px-3 py-1.5 text-sm bg-white/80 dark:bg-slate-900/60 backdrop-blur border-brand-100 dark:border-slate-700/30"
                  aria-label="Move to day"
                >
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeItem(it.id)}
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function ScheduleBoard() {
  const allItems = usePlanStore((s) => s.plan.items);
  const count = useMemo(() => allItems.length, [allItems]);

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Total items: {count}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <DayColumn day="saturday" />
        <DayColumn day="sunday" />
      </div>
    </div>
  );
}

export default ScheduleBoard;
