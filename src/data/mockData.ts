import type {
  UserProfile,
  DailyGoal,
  LastReading,
  Challenge,
  AyahOfDay,
  SpiritualStats,
} from "../types/types";

// ─── Replace these with your API calls ───────────────────────────────────────

export const mockUser: UserProfile = {
  name: "Abdullah",
  streakCount: 12,
};

export const mockDailyGoal: DailyGoal = {
  versesRead: 7,
  versesGoal: 10,
  tagline: "Wisdom Unfolding",
};

export const mockLastReading: LastReading = {
  surahName: "Surah Al-Kahf",
  surahNumber: 18,
  verseNumber: 18,
  surahLabel: "18th Surah",
};

export const mockChallenges: Challenge[] = [
  {
    id: "cave-sanctuary",
    tag: "Friday Ritual",
    tagType: "friday",
    name: "The Cave Sanctuary",
    description: "Read Surah Al-Kahf before the sunset prayer.",
    participants: "+8k",
    avatars: [
      { initial: "A", bg: "#2d5016" },
      { initial: "M", bg: "#1a3a2a" },
    ],
  },
  {
    id: "night-vigil",
    tag: "Night Vigil",
    tagType: "night",
    name: "After Isha Recitation",
    description: "Recite 3 surahs between Isha and Fajr prayers.",
    participants: "+5k",
    avatars: [
      { initial: "S", bg: "#3a2060" },
      { initial: "R", bg: "#2a1550" },
    ],
  },
  {
    id: "juz30",
    tag: "Weekly Journey",
    tagType: "weekly",
    name: "Juz 30 in 7 Days",
    description: "Complete the 30th Juz across 7 consecutive days.",
    participants: "+3k",
    avatars: [
      { initial: "K", bg: "#1a3a20" },
      { initial: "H", bg: "#162e1a" },
    ],
  },
];

export const mockAyah: AyahOfDay = {
  arabicText: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا\nإِنَّ مَعَ الْعُسْرِ يُسْرًا",
  translation:
    '"For indeed, with hardship will be ease. Indeed, with hardship will be ease."',
  source: "[ Surah Ash-Sharh 94:5–6 ]",
};

export const mockStats: SpiritualStats = {
  totalHasanat: 12450,
  divineTimeHours: 14.2,
  weeklyData: [
    { day: "M", value: 40 },
    { day: "T", value: 65 },
    { day: "W", value: 30 },
    { day: "T", value: 80 },
    { day: "F", value: 100 },
    { day: "S", value: 55 },
    { day: "S", value: 70 },
  ],
};
