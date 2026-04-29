import type {
  BlockedApp,
  Friend,
  List,
  ScreenTimeDay,
  Task,
} from "./types";

const now = () => Date.now();

export const seedLists: List[] = [
  {
    id: "list-trading",
    name: "Trading work",
    kind: "daily",
    emoji: "📈",
    isGroup: false,
    memberIds: [],
    ownerId: "u-self",
    createdAt: now() - 1000 * 60 * 60 * 24 * 14,
  },
  {
    id: "list-beaver",
    name: "Beaver Tasks",
    kind: "daily",
    emoji: "🦫",
    isGroup: false,
    memberIds: [],
    ownerId: "u-self",
    createdAt: now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: "list-workout",
    name: "Workouts",
    kind: "weekly",
    emoji: "💪",
    isGroup: false,
    memberIds: [],
    ownerId: "u-self",
    createdAt: now() - 1000 * 60 * 60 * 24 * 30,
  },
  {
    id: "list-roommates",
    name: "Roommates",
    kind: "weekly",
    emoji: "🏠",
    isGroup: true,
    memberIds: ["f-anish", "f-thiru", "u-self"],
    ownerId: "u-self",
    createdAt: now() - 1000 * 60 * 60 * 24 * 21,
  },
];

export const seedTasks: Task[] = [
  // Trading work — 1 task left
  {
    id: "t-trading-1",
    listId: "list-trading",
    title: "To look at notes",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 4,
    order: 0,
  },
  {
    id: "t-trading-2",
    listId: "list-trading",
    title: "Review pre-market movers",
    done: true,
    completedAt: now() - 1000 * 60 * 60 * 6,
    createdAt: now() - 1000 * 60 * 60 * 8,
    order: 1,
  },
  {
    id: "t-trading-3",
    listId: "list-trading",
    title: "Update P&L journal",
    done: true,
    completedAt: now() - 1000 * 60 * 60 * 5,
    createdAt: now() - 1000 * 60 * 60 * 8,
    order: 2,
  },

  // Beaver Tasks — 6 tasks left
  {
    id: "t-beaver-1",
    listId: "list-beaver",
    title: "Ship the new onboarding flow",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 0,
  },
  {
    id: "t-beaver-2",
    listId: "list-beaver",
    title: "Reply to feedback in TestFlight",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 1,
  },
  {
    id: "t-beaver-3",
    listId: "list-beaver",
    title: "Polish friend chip animations",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 2,
  },
  {
    id: "t-beaver-4",
    listId: "list-beaver",
    title: "Write copy for App Store",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 3,
  },
  {
    id: "t-beaver-5",
    listId: "list-beaver",
    title: "Add streak emoji",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 4,
  },
  {
    id: "t-beaver-6",
    listId: "list-beaver",
    title: "Push to waitlist",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 3,
    order: 5,
  },
  {
    id: "t-beaver-7",
    listId: "list-beaver",
    title: "Launch the marketing site",
    done: true,
    completedAt: now() - 1000 * 60 * 30,
    createdAt: now() - 1000 * 60 * 60 * 24,
    order: 6,
  },

  // Workouts
  {
    id: "t-w-1",
    listId: "list-workout",
    title: "Push day",
    done: true,
    completedAt: now() - 1000 * 60 * 60 * 24,
    createdAt: now() - 1000 * 60 * 60 * 30,
    order: 0,
  },
  {
    id: "t-w-2",
    listId: "list-workout",
    title: "Pull day",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 24,
    order: 1,
  },
  {
    id: "t-w-3",
    listId: "list-workout",
    title: "Leg day",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 24,
    order: 2,
  },

  // Roommates (group)
  {
    id: "t-r-1",
    listId: "list-roommates",
    title: "Take out trash",
    done: true,
    completedAt: now() - 1000 * 60 * 60 * 12,
    createdAt: now() - 1000 * 60 * 60 * 48,
    order: 0,
  },
  {
    id: "t-r-2",
    listId: "list-roommates",
    title: "Restock kitchen",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 24,
    order: 1,
  },
  {
    id: "t-r-3",
    listId: "list-roommates",
    title: "Clean common area",
    done: false,
    createdAt: now() - 1000 * 60 * 60 * 24,
    order: 2,
  },
];

export const seedFriends: Friend[] = [
  {
    id: "f-anish",
    name: "Anishh S",
    handle: "teambeaver@gmail.com",
    avatarColor: "#0A84FF",
    trusted: true,
    status: "friend",
    streak: 12,
  },
  {
    id: "f-thiru",
    name: "Thiruvasagam",
    handle: "thiruvasagam@gmail.com",
    avatarColor: "#C68A5A",
    trusted: true,
    status: "friend",
    streak: 7,
  },
  {
    id: "f-priya",
    name: "Priya M",
    handle: "priya.m@beaver.app",
    avatarColor: "#30D158",
    trusted: true,
    status: "friend",
    streak: 21,
  },
  {
    id: "f-jay",
    name: "Jay K",
    handle: "jay.k@beaver.app",
    avatarColor: "#FF9F0A",
    trusted: true,
    status: "friend",
    streak: 3,
  },
  {
    id: "f-sam",
    name: "Sam R",
    handle: "sam.r@beaver.app",
    avatarColor: "#BF5AF2",
    trusted: false,
    status: "incoming",
  },
  {
    id: "f-leo",
    name: "Leo B",
    handle: "leo.b@beaver.app",
    avatarColor: "#FF453A",
    trusted: false,
    status: "incoming",
  },
];

export const seedScreenTime: ScreenTimeDay[] = [
  {
    day: "M",
    minutes: 123,
    topApps: [
      { name: "YouTube", minutes: 19 },
      { name: "YouTube Music", minutes: 17 },
      { name: "Messages", minutes: 14 },
    ],
  },
  { day: "T", minutes: 16, topApps: [{ name: "Safari", minutes: 16 }] },
  { day: "W", minutes: 0, topApps: [] },
  { day: "Th", minutes: 0, topApps: [] },
  { day: "F", minutes: 0, topApps: [] },
  { day: "Sa", minutes: 0, topApps: [] },
  { day: "Su", minutes: 0, topApps: [] },
];

export const seedBlockedApps: BlockedApp[] = [
  { name: "Instagram", iconKey: "instagram" },
  { name: "TikTok", iconKey: "tiktok" },
  { name: "X", iconKey: "x" },
];

export function makeSeed() {
  return {
    lists: seedLists.map((l) => ({ ...l })),
    tasks: seedTasks.map((t) => ({ ...t })),
    friends: seedFriends.map((f) => ({ ...f })),
    screenTime: seedScreenTime.map((s) => ({ ...s })),
    blockedApps: seedBlockedApps.map((b) => ({ ...b })),
  };
}
