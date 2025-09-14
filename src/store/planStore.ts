import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type DayId = "saturday" | "sunday";
export type Mood = "happy" | "relaxed" | "energetic" | "chill";
export type Category =
  | "food"
  | "outdoor"
  | "entertainment"
  | "learning"
  | "fitness"
  | "self-care";

export interface Activity {
  id: string;
  title: string;
  category: Category;
  icon: string;
  imageUrl?: string;
  defaultDurationMin?: number;
  moods?: Mood[];
}

export interface ScheduledItem {
  id: string;
  activityId: string;
  day: DayId;
  start: string; // 'HH:mm'
  durationMin: number;
  mood?: Mood;
  notes?: string;
  order?: number;
}

export interface WeekendPlan {
  id: string; // e.g., 'current'
  items: ScheduledItem[];
  themeId: "default" | "lazy" | "adventurous" | "family";
}

type PlanState = {
  activities: Activity[];
  plan: WeekendPlan;
  // selectors
  getItemsByDay: (day: DayId) => ScheduledItem[];
  // storage actions
  exportToFile: () => void;
  importFromFile: (file: File) => Promise<void>;
  // plan actions
  setActivities: (activities: Activity[]) => void;
  setTheme: (themeId: WeekendPlan["themeId"]) => void;
  addScheduledItem: (item: Omit<ScheduledItem, "id">) => string;
  updateScheduledItem: (id: string, partial: Partial<ScheduledItem>) => void;
  removeScheduledItem: (id: string) => void;
  clearAll: () => void;
  reorderInDay: (day: DayId, orderedIds: string[]) => void;
};

const generateId = () => Math.random().toString(36).slice(2, 10);

const STORAGE_KEY = "sun-bucket-weekend-plans";

// // Helper to check if localStorage is available
// const isStorageAvailable = () => {
//   try {
//     const test = "__storage_test__";
//     localStorage.setItem(test, test);
//     localStorage.removeItem(test);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };

// Backup plans to a file
const exportPlans = (plan: WeekendPlan) => {
  try {
    const data = JSON.stringify(plan, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `weekend-plans-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to export plans:", error);
  }
};

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      activities: [],
      plan: { id: "current", items: [], themeId: "default" },

      getItemsByDay: (day: DayId) =>
        [...get().plan.items]
          .filter((i) => i.day === day)
          .sort(
            (a, b) =>
              (a.order ?? 0) - (b.order ?? 0) || a.start.localeCompare(b.start)
          ),

      setActivities: (activities: Activity[]) => set({ activities }),
      setTheme: (themeId) =>
        set((state) => ({ plan: { ...state.plan, themeId } })),

      addScheduledItem: (item) => {
        const id = generateId();
        set((state) => {
          const dayItems = state.plan.items.filter((i) => i.day === item.day);
          const maxOrder = dayItems.reduce(
            (m, i) => Math.max(m, i.order ?? -1),
            -1
          );
          return {
            plan: {
              ...state.plan,
              items: [
                ...state.plan.items,
                { ...item, id, order: maxOrder + 1 },
              ],
            },
          };
        });
        return id;
      },

      updateScheduledItem: (id, partial) =>
        set((state) => ({
          plan: {
            ...state.plan,
            items: state.plan.items.map((it) =>
              it.id === id ? { ...it, ...partial } : it
            ),
          },
        })),

      removeScheduledItem: (id) =>
        set((state) => ({
          plan: {
            ...state.plan,
            items: state.plan.items.filter((it) => it.id !== id),
          },
        })),

      clearAll: () =>
        set({ plan: { id: "current", items: [], themeId: "default" } }),
      reorderInDay: (day, orderedIds) =>
        set((state) => ({
          plan: {
            ...state.plan,
            items: state.plan.items.map((it) =>
              it.day === day ? { ...it, order: orderedIds.indexOf(it.id) } : it
            ),
          },
        })),

      exportToFile: () => {
        const state = get();
        exportPlans(state.plan);
      },

      importFromFile: async (file: File) => {
        try {
          const text = await file.text();
          const data = JSON.parse(text) as WeekendPlan;
          // Validate the imported data
          if (!data || !data.id || !Array.isArray(data.items)) {
            throw new Error("Invalid file format");
          }
          set(() => ({
            plan: {
              ...data,
              id: "current", // Always use current as the id
              items: data.items.map((item, index) => ({
                ...item,
                id: generateId(), // Generate new IDs to avoid conflicts
                order: index,
              })),
            },
          }));
        } catch (error) {
          console.error("Failed to import plans:", error);
          throw error;
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const value = localStorage.getItem(key);
          if (value === null) return null;
          try {
            return JSON.parse(value);
          } catch {
            console.warn(`Failed to parse stored value for ${key}`);
            return null;
          }
        },
        setItem: (key, value) => {
          try {
            localStorage.setItem(key, JSON.stringify(value));
          } catch (error) {
            console.warn(`Failed to store value for ${key}:`, error);
          }
        },
        removeItem: (key) => localStorage.removeItem(key),
      })),
      partialize: (state) => ({
        plan: state.plan,
        activities: state.activities,
      }),
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log("Weekend plans restored from storage");
        }
      },
    }
  )
);

// selectors helpers
export const selectActivities = (s: PlanState) => s.activities;
export const selectPlan = (s: PlanState) => s.plan;
export const selectItemsByDay = (day: DayId) => (s: PlanState) =>
  s.getItemsByDay(day);
export const selectSetActivities = (s: PlanState) => s.setActivities;
export const selectAddItem = (s: PlanState) => s.addScheduledItem;
export const selectUpdateItem = (s: PlanState) => s.updateScheduledItem;
export const selectRemoveItem = (s: PlanState) => s.removeScheduledItem;
export const selectSetTheme = (s: PlanState) => s.setTheme;
export const selectExportToFile = (s: PlanState) => s.exportToFile;
export const selectImportFromFile = (s: PlanState) => s.importFromFile;
