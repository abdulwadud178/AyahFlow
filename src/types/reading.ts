export interface Verse {
  number: number;
  arabic: string;
  translation: string;
  transliteration?: string;
  tafseer?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  totalVerses: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Reciter {
  id: string;
  name: string;
  style: string;
}

export type ScriptStyle = "indo-pak" | "madina" | "kitab-tajweed" | "kitab-old" | "word-by-word";
export type DisplayMode = "arabic" | "translation" | "both";
