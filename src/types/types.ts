export interface UserProfile {
  name: string;
  avatar?: string;
  streakCount: number;
}

export interface DailyGoal {
  versesRead: number;
  versesGoal: number;
  tagline: string;
}

export interface LastReading {
  surahName: string;
  surahNumber: number;
  verseNumber: number;
  surahLabel: string;
}

export interface Challenge {
  id: string;
  tag: string;
  tagType: 'friday' | 'night' | 'weekly';
  name: string;
  description: string;
  participants: string;
  avatars: { initial: string; bg: string }[];
}

export interface AyahOfDay {
  arabicText: string;
  translation: string;
  source: string;
}

export interface SpiritualStats {
  totalHasanat: number;
  divineTimeHours: number;
  weeklyData: { day: string; value: number }[];
}