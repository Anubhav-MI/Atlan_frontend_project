import { HeroSection } from "../components/sections/HeroSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900/60 backdrop-blur rounded-xl p-6 shadow-card border border-transparent dark:border-slate-700/30">
            <h2 className="text-2xl font-semibold text-brand-600 mb-3">
              Plan Your Activities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Browse through our curated list of weekend activities. From
              outdoor adventures to cozy indoor experiences, find the perfect
              activities for your weekend.
            </p>
            <a
              href="/activities"
              className="inline-block px-4 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
            >
              Browse Activities
            </a>
          </div>
          <div className="bg-white dark:bg-slate-900/60 backdrop-blur rounded-xl p-6 shadow-card border border-transparent dark:border-slate-700/30">
            <h2 className="text-2xl font-semibold text-brand-600 mb-3">
              View Your Plans
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Check your scheduled activities, manage your weekend plans, and
              make adjustments to create the perfect weekend schedule.
            </p>
            <a
              href="/weekend-plans"
              className="inline-block px-4 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
            >
              View Plans
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
