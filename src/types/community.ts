export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  xp: number;
  points: number;
  streak: number;
  avatarUrl?: string;
  isCurrentUser?: boolean;
}

export interface CommunityStats {
  vsAveragePercent: number;
  barakahPoolCount: number;
  barakahPoolLabel: string;
}

export interface CurrentUserMeta {
  name: string;
  streakDays: number;
  points: number;
  rank: number;
  avatarUrl?: string;
}

export type LeaderboardTab = "Global" | "Local" | "Friends";
export type CommunityPageView = "leaderboard" | "hub";
export type NavItem = "home" | "read" | "search" | "community" | "profile";
