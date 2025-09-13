import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomePage } from "./pages/HomePage";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { WeekendPlansPage } from "./pages/WeekendPlansPage";
import { AnimatedPresenceProvider } from "./components/ui/AnimatedTransition";

function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-radial from-brand-50 via-white to-brand-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
        {/* Header */}
        <header className="border-b border-brand-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="h-8 w-8 rounded bg-gradient-to-br from-brand-500 to-brand-600 text-white grid place-items-center font-semibold shadow-lg group-hover:shadow-brand-500/25"
              >
                W
              </motion.div>
              <div className="font-semibold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                Weekendly
              </div>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
              <Link
                className="hover:text-brand-500 transition-colors"
                to="/activities"
              >
                Activities
              </Link>
              <Link
                className="hover:text-brand-500 transition-colors"
                to="/weekend-plans"
              >
                Weekend Plans
              </Link>
              <a
                className="hover:text-brand-500 transition-colors"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDark((d) => !d)}
                className="ml-2 rounded-full bg-brand-50 dark:bg-slate-800 border border-brand-100 dark:border-slate-700 px-3 py-1.5 text-xs font-medium hover:border-brand-200 dark:hover:border-slate-600 transition-colors"
              >
                {dark ? "Light Mode" : "Dark Mode"}
              </motion.button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 relative">
          <AnimatedPresenceProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/weekend-plans" element={<WeekendPlansPage />} />
            </Routes>
          </AnimatedPresenceProvider>
        </main>

        {/* Footer */}
        <footer className="border-t border-brand-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Weekendly. Plan your perfect weekend.
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="text-sm text-brand-500 hover:text-brand-600 transition-colors"
              >
                Privacy
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="text-sm text-brand-500 hover:text-brand-600 transition-colors"
              >
                Terms
              </motion.a>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
