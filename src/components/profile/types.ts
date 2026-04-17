export interface Milestone {
  id: string;
  label: string;
  sublabel: string;
  emoji: string;
  unlocked: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  sanctuaryTitle: string;
  country: string;
  gender: "male" | "female" | "prefer_not_to_say";
  email: string;
  avatarUrl?: string;
  streakDays: number;
  versesRead: number;
  quranCompletions: number;
  joinedDate: string;
  weeklyActivity: number[];
  milestones: Milestone[];
}

export interface UserSettings {
  fontSize: "small" | "medium" | "large" | "xl";
  quranScript: "uthmani" | "indopak" | "simple";
  dailyGoalMinutes: number;
  reciter: string;
  notificationsEnabled: boolean;
  notificationTime: string;
  theme: "dark" | "light" | "system";
  showTranslation: boolean;
  showTransliteration: boolean;
  showTafseer: boolean;
  language: string;
  appearanceMode: "dark" | "light" | "system";
}
