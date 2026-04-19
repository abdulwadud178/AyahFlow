import { useState, useEffect } from 'react';
import { getChapters, getVersesByChapter, getRandomVerse, getDefaultIds, loadResources, hasApiCredentials } from '../lib/api';
import type { Surah, Verse } from '../types/reading';
import type { AyahOfDay } from '../types/types';

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

    // Only attempt API call if credentials are available
    if (!hasApiCredentials()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getDefaultIds()
      .then((ids) => getVersesByChapter(chapterId, {
        translationId: ids.translationId,
        recitationId: ids.recitationId,
        tafsirId: ids.tafsirId,
        words: true,
        perPage: 50,
      }))
      .then(setVerses)
      .catch((err) => {
        console.error(`Failed to load verses for chapter ${chapterId}:`, err);
        setError(err.message);
        // Could set fallback verses here
      })
      .finally(() => setLoading(false));
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