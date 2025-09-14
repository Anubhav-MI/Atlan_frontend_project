import { useRef } from "react";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import {
  type DayId,
  type ScheduledItem,
  type Activity,
} from "../../store/planStore";

interface ShareableCardProps {
  items: ScheduledItem[];
  activities: Activity[];
  onClose: () => void;
}

function DaySection({
  items,
  activities,
  day,
}: {
  items: ScheduledItem[];
  activities: Activity[];
  day: DayId;
}) {
  const dayItems = items
    .filter((i) => i.day === day)
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) || a.start.localeCompare(b.start)
    );

  return (
    <div className="space-y-3">
      <h3 className="font-semibold capitalize text-xl text-brand-600">{day}</h3>
      {dayItems.map((it) => {
        const activity = activities.find((a) => a.id === it.activityId);
        return (
          <div
            key={it.id}
            className="border border-brand-100 dark:border-slate-700/30 rounded-lg p-4 flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 text-sm flex items-center gap-2">
                <span className="text-xl" aria-hidden>
                  {activity?.icon || "•"}
                </span>
                <span className="font-medium">
                  {activity?.title || it.activityId}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{it.start}</span>
                <span>•</span>
                <span>{it.durationMin} min</span>
                {it.mood && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{it.mood}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ShareableCard({
  items,
  activities,
  onClose,
}: ShareableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        backgroundColor: "#ffffff",
      });

      // Try Web Share API first
      if (navigator.share) {
        const blob = await fetch(dataUrl).then((res) => res.blob());
        const file = new File([blob], "weekend-plan.png", {
          type: "image/png",
        });

        try {
          await navigator.share({
            title: "My Weekend Plan",
            text: "Check out my weekend plan!",
            files: [file],
          });
          return;
        } catch (err) {
          // Fall back to download if share fails
          console.log("Share failed, falling back to download", err);
        }
      }

      // Download fallback
      const link = document.createElement("a");
      link.download = "weekend-plan.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-brand-600">Weekend Plan</h2>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-4 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 focus:ring-2 focus:ring-brand-500/40"
              >
                Share/Download
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </motion.button>
            </div>
          </div>

          <div
            ref={cardRef}
            className="space-y-8 bg-gradient-to-br from-brand-50 to-white dark:from-slate-800 dark:to-slate-900 p-8 rounded-xl"
          >
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-brand-600">
                My Weekend Plan
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <DaySection
                day="saturday"
                items={items}
                activities={activities}
              />
              <DaySection day="sunday" items={items} activities={activities} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
