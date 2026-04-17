import type { UserProfile, UserSettings } from "./types";

export const DUMMY_PROFILE: UserProfile = {
  id: "u1",
  name: "Ibrahim Al-Farsi",
  sanctuaryTitle: "The Sanctuary",
  country: "Egypt",
  gender: "male",
  email: "ibrahim@example.com",
  avatarUrl: "https://i.pravatar.cc/120?img=15",
  streakDays: 12,
  versesRead: 1248,
  quranCompletions: 1,
  joinedDate: "2024-01-10",
  weeklyActivity: [60, 80, 45, 100, 70, 90, 55],
  milestones: [
    { id: "m1", label: "Juz' 1",       sublabel: "First chapter complete",      emoji: "📘", unlocked: true  },
    { id: "m2", label: "Early Riser",  sublabel: "Fajr streak 7 days",          emoji: "🌅", unlocked: true  },
    { id: "m3", label: "30 Day Streak",sublabel: "مُبْتَدِئ · Beginner", emoji: "🌱", unlocked: false },
    { id: "m4", label: "100 Days",     sublabel: "مُنْتَظِم · Consistent",      emoji: "📗", unlocked: false },
    { id: "m5", label: "Qur'an ×1",    sublabel: "Full completion",           emoji: "🕋", unlocked: false },
    { id: "m6", label: "Reflector",    sublabel: "مُتَدَبِّر · Understanding", emoji: "📚", unlocked: false },
  ],
};

export const DUMMY_SETTINGS: UserSettings = {
  fontSize: "medium",
  quranScript: "uthmani",
  dailyGoalMinutes: 20,
  reciter: "Mishary Al-Afasy",
  notificationsEnabled: true,
  notificationTime: "05:30",
  theme: "dark",
  showTranslation: true,
  showTransliteration: false,
  showTafseer: true,
  language: "English",
  appearanceMode: "dark",
};

export const LEVELS = [
  { emoji: "🌱", arabic: "مُبْتَدِئ",          latin: "Mubtadi'",    title: "Beginner",          req: "30 Days Streak" },
  { emoji: "📘", arabic: "مُنْتَظِم",          latin: "Muntazim",    title: "Consistent",        req: "100 Days Streak" },
  { emoji: "📗", arabic: "مُجْتَهِد",          latin: "Mujtahid",    title: "Striving",          req: "200 Days Streak" },
  { emoji: "🌙", arabic: "حَافِظُ الطَّرِيق",  latin: "Hafiz al-Tariq",title:"On the Path",      req: "365 Days + Full Qur'an" },
  { emoji: "✨", arabic: "قَارِئ",             latin: "Qāri'",       title: "Reader",            req: "Completed Qur'an 2×" },
  { emoji: "🕋", arabic: "خَاشِع",             latin: "Khāshi'",     title: "Devoted",           req: "Qur'an in 7 Days" },
  { emoji: "⚡", arabic: "سَرِيع",             latin: "Sarī'",       title: "Fast Reciter",      req: "Qur'an in 3 Days" },
  { emoji: "📚", arabic: "مُتَدَبِّر",          latin: "Mutadabbir",  title: "Reflector",         req: "Qur'an with Understanding" },
  { emoji: "💎", arabic: "مُتَعَلِّم",          latin: "Muta'allim",  title: "Learner / Seeker",  req: "Tafsir + Regular Completion" },
  { emoji: "🔥", arabic: "مُتْقِن",             latin: "Mutqin",      title: "Mastery",           req: "All of the above" },
];
