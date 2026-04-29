import type {
  BlockedApp,
  DamStats,
  Friend,
  Group,
  GroupActivity,
  List,
  ScreenTimeDay,
  Task,
} from "./types";

const now = () => Date.now();

export const seedLists: List[] = [
  {
    id: "list-beaver",
    name: "Beaver Tasks",
    kind: "daily",
    isGroup: false,
    memberIds: [],
    ownerId: "u-self",
    createdAt: now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: "list-trading",
    name: "Trading work",
    kind: "daily",
    isGroup: false,
    memberIds: [],
    ownerId: "u-self",
    createdAt: now() - 1000 * 60 * 60 * 24 * 14,
  },
  // Lists that belong to the Beaver group (visible only via group drilldown)
  {
    id: "list-bug-tv",
    name: "Bug list for TV",
    kind: "once",
    isGroup: true,
    groupId: "group-beaver",
    memberIds: ["u-self", "g-beaver-member"],
    ownerId: "u-self",
    createdAt: now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "list-suggestion",
    name: "Suggestion",
    kind: "once",
    isGroup: true,
    groupId: "group-beaver",
    memberIds: ["u-self", "g-beaver-member"],
    ownerId: "u-self",
    createdAt: now() - 1000 * 60 * 60 * 24 * 5,
  },
];

export const seedTasks: Task[] = [
  // Beaver Tasks — 6 tasks left (matching IMG_0860)
  {
    id: "t-bv-1",
    listId: "list-beaver",
    title: "Comment all code",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 0,
  },
  {
    id: "t-bv-2",
    listId: "list-beaver",
    title: "Understand code base",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 1,
  },
  {
    id: "t-bv-3",
    listId: "list-beaver",
    title:
      "Fix the enter issue so you don't have to click enter again for it to get updated",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 2,
  },
  {
    id: "t-bv-4",
    listId: "list-beaver",
    title: "Add assigning to the app",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 3,
  },
  {
    id: "t-bv-5",
    listId: "list-beaver",
    title: "Make Claude design and setup/ make website",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 4,
  },
  {
    id: "t-bv-6",
    listId: "list-beaver",
    title: "Add priority and sliding up and down animation",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 5,
  },

  // Trading work — 1 task left
  {
    id: "t-tr-1",
    listId: "list-trading",
    title: "To look at notes",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 4,
    order: 0,
  },

  // Group lists (not displayed in main list view)
  {
    id: "t-bug-1",
    listId: "list-bug-tv",
    title: "Subtitles offset on AppleTV",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 24 * 2,
    order: 0,
  },
  {
    id: "t-bug-2",
    listId: "list-bug-tv",
    title: "Casting drops after sleep",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 24 * 2,
    order: 1,
  },
  {
    id: "t-sug-1",
    listId: "list-suggestion",
    title: "Add a widget for Today's Dam",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 24 * 5,
    order: 0,
  },
];

export const seedGroups: Group[] = [
  {
    id: "group-beaver",
    name: "Beaver",
    role: "member",
    listCount: 2,
  },
];

export const seedGroupActivity: GroupActivity[] = [
  {
    id: "ga-1",
    groupId: "group-beaver",
    kind: "list-updated",
    actorEmail: "casey.river@example.com",
    target: "Bug list for TV",
    agoLabel: "2h",
  },
  {
    id: "ga-2",
    groupId: "group-beaver",
    kind: "list-updated",
    actorEmail: "morgan.lake@example.com",
    target: "Suggestion",
    agoLabel: "2h",
  },
  {
    id: "ga-3",
    groupId: "group-beaver",
    kind: "list-created",
    actorEmail: "casey.river@example.com",
    target: "Bug list for TV",
    agoLabel: "2d",
  },
];

// Empty trusted friends — matches "No friends yet" in IMG_0862
export const seedFriends: Friend[] = [];

// Wednesday-only usage with Beaver as the only top app — matches IMG_0863
export const seedScreenTime: ScreenTimeDay[] = [
  { day: "M", minutes: 0, topApps: [] },
  { day: "T", minutes: 0, topApps: [] },
  { day: "W", minutes: 5, topApps: [{ name: "Beaver", minutes: 4 }] },
  { day: "Th", minutes: 0, topApps: [] },
  { day: "F", minutes: 0, topApps: [] },
  { day: "Sa", minutes: 0, topApps: [] },
  { day: "Su", minutes: 0, topApps: [] },
];

export const seedBlockedApps: BlockedApp[] = [];

export const seedDamStats: DamStats = {
  dayStreak: 0,
  perfectDams: 0,
  overdue: 0,
  streakMultiplier: 1.0,
  delta: { tasks: 0, completionPct: 0, screen: 0 },
};

export function makeSeed() {
  return {
    lists: seedLists.map((l) => ({ ...l })),
    tasks: seedTasks.map((t) => ({ ...t })),
    groups: seedGroups.map((g) => ({ ...g })),
    groupActivity: seedGroupActivity.map((a) => ({ ...a })),
    friends: seedFriends.map((f) => ({ ...f })),
    screenTime: seedScreenTime.map((s) => ({ ...s })),
    selectedScreenTimeDay: "W" as const,
    blockedApps: seedBlockedApps.map((b) => ({ ...b })),
    damStats: { ...seedDamStats },
  };
}
