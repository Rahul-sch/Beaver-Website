export type ID = string;

export type TabKey = "tasks" | "progress" | "activity";
export type ListsTab = "lists" | "groups";
export type AuthMode = "signin" | "signup";
export type DamState = "leaky" | "solid" | "perfect";

export interface User {
  id: ID;
  name: string;
  email: string;
  avatarColor: string;
  createdAt: number;
}

export interface Task {
  id: ID;
  listId: ID;
  title: string;
  done: boolean;
  completedAt?: number;
  createdAt: number;
  order: number;
}

export interface List {
  id: ID;
  name: string;
  kind: "daily" | "weekly" | "once";
  emoji?: string;
  isGroup: boolean;
  groupId?: ID;
  memberIds: ID[];
  ownerId: ID;
  createdAt: number;
}

export interface Group {
  id: ID;
  name: string;
  role: "owner" | "member";
  listCount: number;
}

export interface GroupActivity {
  id: ID;
  groupId: ID;
  kind: "list-updated" | "list-created" | "task-completed";
  actorEmail: string;
  target: string;
  agoLabel: string;
}

export interface Friend {
  id: ID;
  name: string;
  handle: string;
  avatarColor: string;
  trusted: boolean;
  status: "friend" | "incoming" | "outgoing";
  streak?: number;
}

export interface ScreenTimeDay {
  day: "M" | "T" | "W" | "Th" | "F" | "Sa" | "Su";
  minutes: number;
  topApps: { name: string; minutes: number }[];
}

export interface BlockedApp {
  name: string;
  iconKey: string;
}

export interface DamStats {
  dayStreak: number;
  perfectDams: number;
  overdue: number;
  streakMultiplier: number;
  /** delta from yesterday — shown above each stat in the grid */
  delta: {
    tasks: number;
    completionPct: number;
    screen: number;
  };
}

export interface DemoState {
  user: User | null;
  lists: List[];
  tasks: Task[];
  groups: Group[];
  groupActivity: GroupActivity[];
  friends: Friend[];
  screenTime: ScreenTimeDay[];
  selectedScreenTimeDay: ScreenTimeDay["day"];
  blockedApps: BlockedApp[];
  damStats: DamStats;
  activeTab: TabKey;
  listsTab: ListsTab;
  expandedListId: ID | null;
}
