import type { Surah, Verse, Reciter } from '../types/reading';
import type { AyahOfDay } from '../types/types';

// API Configuration
const API_ENV = import.meta.env.VITE_QURAN_API_ENV || 'testing';
const CLIENT_ID = import.meta.env.VITE_QURAN_API_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_QURAN_API_CLIENT_SECRET;

const BASE_URL = API_ENV === 'production'
  ? 'https://apis.quran.foundation/content/api/v4'
  : '/api/quran'; // Use proxy in development

const OAUTH_URL = API_ENV === 'production'
  ? 'https://oauth2.quran.foundation/oauth2/token'
  : '/api/oauth/oauth2/token'; // Use proxy in development

// Token management
let accessToken: string | null = null;
let tokenExpiry: number | null = null;

// Authentication
async function getAccessToken(): Promise<string> {
  // Check if we have a valid token
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Quran API credentials not configured. Please set VITE_QURAN_API_CLIENT_ID and VITE_QURAN_API_CLIENT_SECRET in .env');
  }

  try {
    const response = await fetch(OAUTH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&scope=content',
    });

    if (!response.ok) {
      throw new Error(`Auth failed: ${response.status}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min early
    if (!accessToken) {
      throw new Error('No access token received');
    }
    return accessToken;
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw error;
  }
}

// Check if API credentials are available
export function hasApiCredentials(): boolean {
  return !!(CLIENT_ID && CLIENT_SECRET);
}

// Generic API call with auth headers
async function apiCall<T = any>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const token = await getAccessToken();

  // Handle proxy URLs in development vs direct URLs in production
  let urlString: string;
  if (BASE_URL.startsWith('/')) {
    // Development: using proxy, construct relative URL
    urlString = `${BASE_URL}${endpoint}`;
  } else {
    // Production: using absolute URL
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    urlString = url.toString();
  }

  // For proxy URLs, add query params manually
  if (BASE_URL.startsWith('/') && params) {
    const paramString = new URLSearchParams(params).toString();
    urlString += (urlString.includes('?') ? '&' : '?') + paramString;
  }

  const response = await fetch(urlString, {
    headers: {
      'x-auth-token': token,
      'x-client-id': CLIENT_ID,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Resource endpoints (cache these at startup)
let cachedResources: {
  translations: any[];
  recitations: any[];
  tafsirs: any[];
  languages: string[];
  chapters: any[];
} | null = null;

export async function loadResources() {
  if (cachedResources) return cachedResources;

  try {
    const [translations, recitations, tafsirs, languages, chapters] = await Promise.all([
      apiCall<{ translations: any[] }>('/resources/translations'),
      apiCall<{ recitations: any[] }>('/resources/recitations'),
      apiCall<{ tafsirs: any[] }>('/resources/tafsirs'),
      apiCall<{ languages: string[] }>('/resources/languages'),
      apiCall<{ chapters: any[] }>('/chapters'),
    ]);

    cachedResources = {
      translations: translations.translations || [],
      recitations: recitations.recitations || [],
      tafsirs: tafsirs.tafsirs || [],
      languages: languages.languages || [],
      chapters: chapters.chapters || [],
    };

    return cachedResources;
  } catch (error) {
    console.error('Failed to load resources:', error);
    // Return empty arrays as fallback
    return {
      translations: [],
      recitations: [],
      tafsirs: [],
      languages: [],
      chapters: [],
    };
  }
}

// Chapters API
export async function getChapters(): Promise<Surah[]> {
  try {
    const resources = await loadResources();
    return resources.chapters.map((chapter: any) => ({
      number: chapter.id,
      name: chapter.name_arabic,
      englishName: chapter.name_simple,
      totalVerses: chapter.verses_count,
      revelationType: chapter.revelation_place === 'makkah' ? 'Meccan' : 'Medinan',
    }));
  } catch (error) {
    console.error('Failed to fetch chapters:', error);
    // Fallback to static data
    return [
      { number: 1, name: 'الفاتحة', englishName: 'Al-Fatihah', totalVerses: 7, revelationType: 'Meccan' },
      { number: 2, name: 'البقرة', englishName: 'Al-Baqarah', totalVerses: 286, revelationType: 'Medinan' },
      // Add more as needed
    ];
  }
}

export async function getChapter(id: number): Promise<Surah | null> {
  try {
    const chapter = await apiCall<{ chapter: any }>(`/chapters/${id}`);
    return {
      number: chapter.chapter.id,
      name: chapter.chapter.name_arabic,
      englishName: chapter.chapter.name_simple,
      totalVerses: chapter.chapter.verses_count,
      revelationType: chapter.chapter.revelation_place === 'makkah' ? 'Meccan' : 'Medinan',
    };
  } catch (error) {
    console.error(`Failed to fetch chapter ${id}:`, error);
    return null;
  }
}

// Verses API
export async function getVersesByChapter(
  chapterId: number,
  options: {
    translationId?: number;
    recitationId?: number;
    tafsirId?: number;
    words?: boolean;
    perPage?: number;
  } = {}
): Promise<Verse[]> {
  try {
    const params: Record<string, string> = {};

    if (options.translationId) params.translations = options.translationId.toString();
    if (options.recitationId) params.audio = options.recitationId.toString();
    if (options.tafsirId) params.tafsirs = options.tafsirId.toString();
    if (options.words) params.words = 'true';
    if (options.perPage) params.per_page = options.perPage.toString();

    const response = await apiCall<{ verses: any[] }>(`/verses/by_chapter/${chapterId}`, params);

    return response.verses.map((verse: any) => ({
      number: verse.verse_number,
      arabic: verse.text_uthmani || verse.text_imlaei || verse.text_indopak || '',
      translation: verse.translations?.[0]?.text || 'Translation not available',
      transliteration: verse.words?.map((w: any) => w.transliteration?.text).join(' ') || '',
      tafseer: verse.tafsirs?.[0]?.text || 'Tafsir not available',
    }));
  } catch (error) {
    console.error(`Failed to fetch verses for chapter ${chapterId}:`, error);
    // Return empty array as fallback
    return [];
  }
}

// Random verse for Ayah of the Day
export async function getRandomVerse(translationId?: number): Promise<AyahOfDay | null> {
  try {
    const params: Record<string, string> = {};
    if (translationId) params.translations = translationId.toString();

    const response = await apiCall<{ verse: any }>(`/verses/random`, params);
    const verse = response.verse;

    return {
      arabicText: verse.text_uthmani || verse.text_imlaei || '',
      translation: verse.translations?.[0]?.text || 'Translation not available',
      source: `[ ${verse.verse_key} ]`,
    };
  } catch (error) {
    console.error('Failed to fetch random verse:', error);
    return null;
  }
}

// Recitations
export async function getReciters(): Promise<Reciter[]> {
  try {
    const resources = await loadResources();
    return resources.recitations.map((recitation: any) => ({
      id: recitation.id.toString(),
      name: recitation.reciter_name,
      style: recitation.style || 'Murattal',
    }));
  } catch (error) {
    console.error('Failed to fetch reciters:', error);
    return [];
  }
}

// Translations
export async function getTranslations(): Promise<any[]> {
  try {
    const resources = await loadResources();
    return resources.translations;
  } catch (error) {
    console.error('Failed to fetch translations:', error);
    return [];
  }
}

// Utility function to get default IDs
export async function getDefaultIds() {
  const resources = await loadResources();

  // Find English translation
  const englishTranslation = resources.translations.find((t: any) =>
    t.language_name?.toLowerCase() === 'english'
  );

  // Find a default recitation
  const defaultRecitation = resources.recitations.find((r: any) =>
    r.reciter_name?.includes('Mishary') || r.reciter_name?.includes('Alfasy')
  );

  // Find a default tafsir
  const defaultTafsir = resources.tafsirs.find((t: any) =>
    t.language_name?.toLowerCase() === 'english'
  );

  return {
    translationId: englishTranslation?.id || 131, // Fallback to known ID
    recitationId: defaultRecitation?.id || 7,
    tafsirId: defaultTafsir?.id || 169,
  };
}