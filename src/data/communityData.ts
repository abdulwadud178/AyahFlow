import type { LeaderboardUser, CommunityStats, CurrentUserMeta } from "../types/community";

export const DUMMY_TOP3: LeaderboardUser[] = [
  { rank: 1, id: "u1", name: "Yusuf A.", xp: 1850, points: 1850, streak: 0, avatarUrl: "https://i.pravatar.cc/80?img=11" },
  { rank: 2, id: "u2", name: "Amira K.", xp: 1420, points: 1420, streak: 0, avatarUrl: "https://i.pravatar.cc/80?img=47" },
  { rank: 3, id: "u3", name: "Sarah M.", xp: 1210, points: 1210, streak: 0, avatarUrl: "https://i.pravatar.cc/80?img=45" },
];

export const DUMMY_REST: LeaderboardUser[] = [
  { rank: 4, id: "u4", name: "Omar Farooq", xp: 980, points: 980, streak: 12, avatarUrl: "https://i.pravatar.cc/80?img=14" },
  { rank: 5, id: "u5", name: "Fatima Zahra", xp: 945, points: 945, streak: 8, avatarUrl: "https://i.pravatar.cc/80?img=48" },
  { rank: 6, id: "u6", name: "Ibrahim M.", xp: 810, points: 810, streak: 5, avatarUrl: "https://i.pravatar.cc/80?img=15" },
  { rank: 7, id: "u7", name: "Nour El-Din", xp: 760, points: 760, streak: 3, avatarUrl: "https://i.pravatar.cc/80?img=49" },
];

export const DUMMY_CURRENT_USER: CurrentUserMeta = {
  name: "Zaid Khalil",
  streakDays: 5,
  points: 420,
  rank: 24,
  avatarUrl: "https://i.pravatar.cc/80?img=12",
};

export const DUMMY_STATS: CommunityStats = {
  vsAveragePercent: 15,
  barakahPoolCount: 12400,
  barakahPoolLabel: "Total community prayers offered this month.",
};
