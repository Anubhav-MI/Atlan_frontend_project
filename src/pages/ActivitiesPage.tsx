import { ActivityList } from "../features/activities/ActivityList";

export function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/50 via-white to-white dark:from-brand-950/10 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-radial from-brand-50 via-transparent to-transparent dark:from-brand-950/20 -z-10 blur-2xl" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 bg-clip-text text-transparent">
              Weekend Activities
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Browse through our curated collection of activities and create your
            perfect weekend plan
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/95 to-white dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-900/90 rounded-2xl -z-10" />
          <div className="backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-brand-100/20 dark:border-slate-700/30">
            <ActivityList />
          </div>
        </div>
      </div>
    </div>
  );
}
