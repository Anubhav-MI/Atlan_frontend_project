import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { WeekendPlansPage } from "./pages/WeekendPlansPage";

function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 dark:text-slate-100">
        {/* Header */}
        <header className="border-b bg-white/70 dark:bg-slate-900/70 backdrop-blur sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-brand-600 text-white grid place-items-center font-semibold">
                W
              </div>
              <div className="font-semibold">Weekendly</div>
            </Link>
            <nav className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Link className="hover:text-brand-600" to="/activities">
                Activities
              </Link>
              <Link className="hover:text-brand-600" to="/weekend-plans">
                Weekend Plans
              </Link>
              <a
                className="hover:text-brand-600"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </a>
              <button
                onClick={() => setDark((d) => !d)}
                className="ml-2 rounded-md border px-2 py-1 text-xs dark:border-slate-700"
              >
                {dark ? "Light" : "Dark"}
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/weekend-plans" element={<WeekendPlansPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t bg-white/70 dark:bg-slate-900/70 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Weekendly
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
