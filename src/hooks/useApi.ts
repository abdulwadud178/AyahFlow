import { useState, useEffect } from 'react';
import { getChapters, getVersesByChapter, getRandomVerse, getDefaultIds, loadResources, hasApiCredentials } from '../lib/api';
import type { Surah, Verse } from '../types/reading';
import type { AyahOfDay } from '../types/types';
import { MOCK_VERSES } from '../data/readingData';

// Hook for chapters list
export function useChapters() {
  const [chapters, setChapters] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only attempt API call if credentials are available
    if (!hasApiCredentials()) {
      setLoading(false);
      return;
    }

    getChapters()
      .then(setChapters)
      .catch((err) => {
        console.error('Failed to load chapters:', err);
        setError(err.message);
        // Could set fallback chapters here
      })
      .finally(() => setLoading(false));
  }, []);

  return { chapters, loading, error };
}

// Hook for verses of a chapter
export function useVerses(chapterId: number) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chapterId) return;

    // Always attempt to load verses, with fallback if no credentials
    const loadVerses = async () => {
      setLoading(true);
      setError(null);

      if (!hasApiCredentials()) {
        // Provide fallback verses - use MOCK_VERSES for chapter 18, generic message for others
        if (chapterId === 18) {
          setVerses(MOCK_VERSES);
        } else {
          const fallbackVerses: Verse[] = [
            {
              number: 1,
              arabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`,
              translation: `This surah is not available in demo mode. Please configure API credentials to access all chapters.`,
              transliteration: `Bismillāhir-raḥmānir-raḥīm`,
              tafseer: `API credentials are required to access verses from this chapter.`,
            }
          ];
          setVerses(fallbackVerses);
        }
        setLoading(false);
        return;
      }

      try {
        const ids = await getDefaultIds();
        const apiVerses = await getVersesByChapter(chapterId, {
          translationId: ids.translationId,
          recitationId: ids.recitationId,
          tafsirId: ids.tafsirId,
          words: true,
          perPage: 50,
        });
        setVerses(apiVerses);
      } catch (err) {
        console.error(`Failed to load verses for chapter ${chapterId}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Provide fallback verses on error - use MOCK_VERSES for chapter 18, error message for others
        if (chapterId === 18) {
          setVerses(MOCK_VERSES);
        } else {
          const fallbackVerses: Verse[] = [
            {
              number: 1,
              arabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`,
              translation: `Failed to load verses. Please check your API credentials.`,
              transliteration: `Bismillāhir-raḥmānir-raḥīm`,
              tafseer: `API call failed. Please verify your credentials and try again.`,
            }
          ];
          setVerses(fallbackVerses);
        }
      } finally {
        setLoading(false);
      }
    };

    loadVerses();
  }, [chapterId]);

  return { verses, loading, error };
}

// Hook for ayah of the day
export function useAyahOfDay() {
  const [ayah, setAyah] = useState<AyahOfDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only attempt API call if credentials are available
    if (!hasApiCredentials()) {
      setLoading(false);
      return;
    }

    getDefaultIds()
      .then((ids) => getRandomVerse(ids.translationId))
      .then((randomAyah) => {
        if (randomAyah) {
          setAyah(randomAyah);
        } else {
          // Fallback to static ayah
          setAyah({
            arabicText: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا\nإِنَّ مَعَ الْعُسْرِ يُسْرًا",
            translation: '"For indeed, with hardship will be ease. Indeed, with hardship will be ease."',
            source: "[ Surah Ash-Sharh 94:5–6 ]",
          });
        }
      })
      .catch((err) => {
        console.error('Failed to load ayah of the day:', err);
        setError(err.message);
        // Fallback to static ayah
        setAyah({
          arabicText: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا\nإِنَّ مَعَ الْعُسْرِ يُسْرًا",
          translation: '"For indeed, with hardship will be ease. Indeed, with hardship will be ease."',
          source: "[ Surah Ash-Sharh 94:5–6 ]",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return { ayah, loading, error };
}

// Hook for initializing resources at app startup
export function useApiResources() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Only attempt API call if credentials are available
    if (!hasApiCredentials()) {
      setLoaded(true);
      return;
    }

    loadResources()
      .then(() => setLoaded(true))
      .catch((err) => {
        console.error('Failed to load API resources:', err);
        setLoaded(true); // Still mark as loaded to not block the app
      });
  }, []);

  return loaded;
}