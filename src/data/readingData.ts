import type { Reciter, ScriptStyle, Surah, Verse } from "../types/reading";

export const MOCK_SURAH: Surah = {
  number: 18,
  name: "الكهف",
  englishName: "Al-Kahf",
  totalVerses: 110,
  revelationType: "Meccan",
};

export const MOCK_VERSES: Verse[] = [
  {
    number: 1,
    arabic:
      "ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَنزَلَ عَلَىٰ عَبْدِهِ ٱلْكِتَـٰبَ وَلَمْ يَجْعَل لَّهُۥ عِوَجًا",
    translation:
      "[All] praise is [due] to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.",
    transliteration:
      "Al-ḥamdu lillāhi-lladhī anzala 'alā 'abdihi-l-kitāba wa lam yaj'al lahu 'iwajā",
    tafseer:
      "This verse opens Surah Al-Kahf by praising Allah for revealing the Quran in a perfect, straight manner with no crookedness or contradiction. The 'Servant' refers to Prophet Muhammad ﷺ. The emphasis on 'no deviance' refutes those who claim inconsistencies in the Quran.",
  },
  {
    number: 2,
    arabic:
      "قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ ٱلْمُؤْمِنِينَ ٱلَّذِينَ يَعْمَلُونَ ٱلصَّـٰلِحَـٰتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا",
    translation:
      "[He has made it] straight, to warn of severe punishment from Him and to give good tidings to the believers who do righteous deeds that they will have a good reward.",
    transliteration:
      "Qayyimal-liyundhira ba'san shadīdam-min ladunhu wa yubashshira-l-mu'minīna-lladhīna ya'malūna-ṣ-ṣāliḥāti anna lahum ajran ḥasanā",
    tafseer:
      "The Quran serves a dual purpose: warning and giving glad tidings. The 'severe punishment' refers to Allah's chastisement for disbelief, while the 'good reward' is Paradise for those who believe and act righteously.",
  },
  {
    number: 3,
    arabic: "مَّـٰكِثِينَ فِيهِ أَبَدًا",
    translation: "In which they will remain forever.",
    transliteration: "Mākithīna fīhi abadā",
    tafseer:
      "This verse confirms the eternal nature of the reward. The believers will dwell in Paradise permanently, emphasizing that the reward is not temporary but everlasting.",
  },
  {
    number: 4,
    arabic:
      "وَيُنذِرَ ٱلَّذِينَ قَالُوا۟ ٱتَّخَذَ ٱللَّهُ وَلَدًا",
    translation:
      "And to warn those who say, 'Allah has taken a son.'",
    transliteration:
      "Wa yundhira-lladhīna qālū-ttakhadha-llāhu waladā",
    tafseer:
      "This refers to the Christians who claim Jesus is the son of God, and the pagan Arabs who said the angels were God's daughters. The Quran strongly refutes such attributions.",
  },
  {
    number: 5,
    arabic:
      "مَّا لَهُم بِهِۦ مِنْ عِلْمٍ وَلَا لِءَابَآئِهِمْ ۚ كَبُرَتْ كَلِمَةً تَخْرُجُ مِنْ أَفْوَٰهِهِمْ ۚ إِن يَقُولُونَ إِلَّا كَذِبًا",
    translation:
      "They have no knowledge of it, nor had their fathers. Grave is the word that comes out of their mouths; they speak not except a lie.",
    transliteration:
      "Mā lahum bihī min 'ilmin wa lā li'ābā'ihim, kaburat kalimatan takhruju min afwāhihim, in yaqūlūna illā kadhhibā",
    tafseer:
      "This verse stresses that the claim of Allah having a son is completely baseless — it is a grave falsehood passed down through generations with no evidence or divine revelation to support it.",
  },
];

export const RECITERS: Reciter[] = [
  { id: "mishary", name: "Mishary Rashid Alafasy", style: "Murattal" },
  { id: "sudais", name: "Abdul Rahman Al-Sudais", style: "Murattal" },
  { id: "husary", name: "Mahmoud Khalil Al-Husary", style: "Murattal" },
  { id: "minshawi", name: "Mohamed Siddiq Al-Minshawi", style: "Mujawwad" },
  { id: "ghamdi", name: "Saad Al-Ghamdi", style: "Murattal" },
];

export const SCRIPT_STYLES: { id: ScriptStyle; label: string }[] = [
  { id: "indo-pak", label: "Indo-Pak" },
  { id: "madina", label: "Madina" },
  { id: "kitab-tajweed", label: "Tajweed" },
  { id: "kitab-old", label: "Kitab Old" },
  { id: "word-by-word", label: "Word by Word" },
];

export const SURAHS_LIST = Array.from({ length: 114 }, (_, i) => ({
  number: i + 1,
  name: `Surah ${i + 1}`,
}));

export const SURAH_NAMES: Record<number, string> = {
  1: "Al-Fatihah",
  2: "Al-Baqarah",
  3: "Ali 'Imran",
  18: "Al-Kahf",
  36: "Ya-Sin",
  55: "Ar-Rahman",
  67: "Al-Mulk",
  112: "Al-Ikhlas",
};
