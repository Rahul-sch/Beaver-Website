"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { makeSeed } from "./seed";
import type { DemoState, ID, ListsTab, ScreenTimeDay, TabKey } from "./types";

interface DemoActions {
  setUserFromClerk: (input: {
    id: string;
    name: string;
    email: string;
    avatarColor: string;
  }) => void;
  clearUser: () => void;

  setActiveTab: (t: TabKey) => void;
  setListsTab: (t: ListsTab) => void;
  toggleExpand: (listId: ID) => void;
  setSelectedScreenTimeDay: (d: ScreenTimeDay["day"]) => void;

  toggleTask: (taskId: ID) => void;
  addTask: (listId: ID, title: string) => void;
  addList: (name: string, isGroup?: boolean) => void;

  acceptFriend: (friendId: ID) => void;
  searchFriends: (q: string) => void;

  resetDemo: () => void;
}

const initialSeed = makeSeed();

const initialState: DemoState = {
  user: null,
  ...initialSeed,
  activeTab: "tasks",
  listsTab: "lists",
  expandedListId: "list-beaver",
};

export const useDemoStore = create<DemoState & DemoActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUserFromClerk: ({ id, name, email, avatarColor }) =>
        set({
          user: {
            id,
            name,
            email,
            avatarColor,
            createdAt: Date.now(),
          },
        }),

      clearUser: () => set({ user: null }),

      setActiveTab: (t) => set({ activeTab: t }),
      setListsTab: (t) => set({ listsTab: t }),
      toggleExpand: (listId) =>
        set((s) => ({ expandedListId: s.expandedListId === listId ? null : listId })),
      setSelectedScreenTimeDay: (d) => set({ selectedScreenTimeDay: d }),

      toggleTask: (taskId) => {
        const t = get().tasks.find((x) => x.id === taskId);
        if (!t) return;
        if (!t.done) {
          set((s) => ({
            tasks: s.tasks.map((x) =>
              x.id === taskId
                ? { ...x, done: true, completedAt: Date.now() }
                : x
            ),
          }));
          // After animation, send to bottom
          setTimeout(() => {
            set((s) => {
              const max = Math.max(
                0,
                ...s.tasks.filter((x) => x.listId === t.listId).map((x) => x.order)
              );
              return {
                tasks: s.tasks.map((x) =>
                  x.id === taskId ? { ...x, order: max + 1 } : x
                ),
              };
            });
          }, 600);
        } else {
          set((s) => ({
            tasks: s.tasks.map((x) =>
              x.id === taskId
                ? { ...x, done: false, completedAt: undefined }
                : x
            ),
          }));
        }
      },

      addTask: (listId, title) => {
        const trimmed = title.trim();
        if (!trimmed) return;
        const id = `t-${Math.random().toString(36).slice(2, 9)}`;
        set((s) => {
          const max = Math.max(
            -1,
            ...s.tasks.filter((t) => t.listId === listId).map((t) => t.order)
          );
          return {
            tasks: [
              ...s.tasks,
              {
                id,
                listId,
                title: trimmed,
                done: false,
                createdAt: Date.now(),
                order: max + 1,
              },
            ],
          };
        });
      },

      addList: (name, isGroup = false) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const id = `list-${Math.random().toString(36).slice(2, 9)}`;
        set((s) => ({
          lists: [
            ...s.lists,
            {
              id,
              name: trimmed,
              kind: "daily",
              isGroup,
              memberIds: isGroup ? ["u-self"] : [],
              ownerId: "u-self",
              createdAt: Date.now(),
            },
          ],
          expandedListId: id,
        }));
      },

      acceptFriend: (friendId) =>
        set((s) => ({
          friends: s.friends.map((f) =>
            f.id === friendId
              ? { ...f, status: "friend", trusted: true, streak: 0 }
              : f
          ),
        })),

      searchFriends: () => {
        // No-op for the demo — search is purely visual
      },

      resetDemo: () => {
        const fresh = makeSeed();
        set({
          ...fresh,
          activeTab: "tasks",
          listsTab: "lists",
          expandedListId: "list-beaver",
        });
      },
    }),
    {
      name: "beaver-demo-v2",
      storage: createJSONStorage(() => localStorage),
      version: 2,
    }
  )
);
