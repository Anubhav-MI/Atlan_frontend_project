import { useMemo, useState } from "react";
import { Button } from "../../components/ui/Button";
import {
  selectRemoveItem,
  selectUpdateItem,
  selectActivities,
  type DayId,
  usePlanStore,
} from "../../store/planStore";

function DayColumn({ day }: { day: DayId }) {
  const allItems = usePlanStore((s) => s.plan.items);
  const items = useMemo(
    () =>
      allItems
        .filter((i) => i.day === day)
        .slice()
        .sort((a, b) => a.start.localeCompare(b.start)),
    [allItems, day]
  );
  const updateItem = usePlanStore(selectUpdateItem);
  const removeItem = usePlanStore(selectRemoveItem);
  const activities = usePlanStore(selectActivities);
  const reorderInDay = usePlanStore((s) => s.reorderInDay);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  return (
    <div className="rounded-xl border p-3 bg-white dark:bg-slate-900 shadow-card flex flex-col gap-2 min-h-64">
      <h3 className="font-semibold capitalize">{day}</h3>
      {items.length === 0 && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          No items yet
        </div>
      )}
      <ul
        className="space-y-2"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const overLi = (e.target as HTMLElement).closest(
            "li"
          ) as HTMLElement | null;
          const overId = overLi?.getAttribute("data-id");
          const id = draggedId || e.dataTransfer.getData("text/plain");
          if (!id) return;
          const ordered = items.map((x) => x.id);
          const from = ordered.indexOf(id);
          let to = overId ? ordered.indexOf(overId) : ordered.length - 1;
          if (from === -1 || to === -1) return;
          if (from === to) return;
          ordered.splice(to, 0, ordered.splice(from, 1)[0]);
          reorderInDay(day, ordered);
          setDraggedId(null);
        }}
      >
        {items.map((it) => (
          <li
            key={it.id}
            data-id={it.id}
            className="border rounded-lg p-2 flex items-center gap-2 bg-white dark:bg-slate-800 flex-wrap"
          >
            <span
              role="button"
              aria-label="Drag to reorder"
              title="Drag to reorder"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", it.id);
                e.dataTransfer.effectAllowed = "move";
                setDraggedId(it.id);
              }}
              onDragEnd={() => setDraggedId(null)}
              className="select-none cursor-grab px-2 text-gray-500"
            >
              ≡
            </span>
            <input
              type="time"
              value={it.start}
              onChange={(e) => updateItem(it.id, { start: e.target.value })}
              className="border rounded-md px-2 py-1 text-sm dark:bg-slate-800 dark:border-slate-700"
              aria-label="Start time"
            />
            <input
              type="number"
              value={it.durationMin}
              onChange={(e) =>
                updateItem(it.id, { durationMin: Number(e.target.value) })
              }
              className="border rounded-md px-2 py-1 w-24 text-sm dark:bg-slate-800 dark:border-slate-700"
              aria-label="Duration (min)"
            />
            <div className="flex-1 min-w-[160px] text-sm flex items-center gap-2">
              <span aria-hidden>
                {activities.find((a) => a.id === it.activityId)?.icon || "•"}
              </span>
              {activities.find((a) => a.id === it.activityId)?.title ||
                it.activityId}
            </div>
            <select
              value={it.mood || ""}
              onChange={(e) =>
                updateItem(it.id, { mood: e.target.value as any })
              }
              className="border rounded-md px-2 py-1 text-sm dark:bg-slate-800 dark:border-slate-700"
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
              className="border rounded-md px-2 py-1 text-sm dark:bg-slate-800 dark:border-slate-700"
              aria-label="Move to day"
            >
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
            <Button variant="secondary" onClick={() => removeItem(it.id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ScheduleBoard() {
  const allItems = usePlanStore((s) => s.plan.items);
  const count = useMemo(() => allItems.length, [allItems]);
  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600">Total items: {count}</div>
      <div className="grid md:grid-cols-2 gap-3">
        <DayColumn day="saturday" />
        <DayColumn day="sunday" />
      </div>
    </div>
  );
}

export default ScheduleBoard;
