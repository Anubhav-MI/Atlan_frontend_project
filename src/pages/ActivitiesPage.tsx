import { ActivityList } from "../features/activities/ActivityList";

export function ActivitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Weekend Activities
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Browse and select activities to add to your weekend plan
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900/60 backdrop-blur rounded-xl shadow-card p-6 border border-transparent dark:border-slate-700/30">
        <ActivityList />
      </div>
    </div>
  );
}
