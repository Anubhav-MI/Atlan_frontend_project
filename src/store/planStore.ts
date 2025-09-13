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
  // actions
  setActivities: (activities: Activity[]) => void;
  setTheme: (themeId: WeekendPlan["themeId"]) => void;
  addScheduledItem: (item: Omit<ScheduledItem, "id">) => string;
  updateScheduledItem: (id: string, partial: Partial<ScheduledItem>) => void;
  removeScheduledItem: (id: string) => void;
  clearAll: () => void;
  reorderInDay: (day: DayId, orderedIds: string[]) => void;
};

const generateId = () => Math.random().toString(36).slice(2, 10);

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
    }),
    {
      name: "weekendly-plan",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        plan: state.plan,
        activities: state.activities,
      }),
      version: 1,
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
