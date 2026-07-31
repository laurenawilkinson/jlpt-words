import seedrandom from 'seedrandom';
import { isKana, toRomaji } from 'wanakana';
import type { JlptLevel, JsonWord, Word } from '@/types';
import z from 'zod';

const LOCAL_KNOWN_KEY = 'known-words';

const words: Record<JlptLevel, Word[]> = {
  N1: [],
  N2: [],
  N3: [],
  N4: [],
  N5: [],
};

export function getWordsForDate(
  words: Word[],
  count: number,
  dateKey: string
): Word[] {
  const rng = seedrandom(dateKey);

  const shuffled = [...words].sort(() => rng() - 0.5);
  return shuffled.slice(0, count);
}

export function transformWords(level: JlptLevel, words?: JsonWord[]): Word[] {
  if (!words || !Array.isArray(words)) return [];

  return words.map((word) => ({
    id: word.id,
    jp: word.jp,
    en: word.en,
    furigana: word.furigana,
    jlpt: level,
    romaji: toRomaji(isKana(word.jp) ? word.jp : word.furigana),
  }));
}

export async function loadWordsForLevel(level: JlptLevel): Promise<Word[]> {
  const cachedWords = words[level];
  if (cachedWords.length > 0) return cachedWords;

  const res = await fetch(`/data/${level}.json`);
  if (!res.ok) throw new Error(`Failed to load ${level} words`);
  try {
    const data: JsonWord[] = await res.json();
    const formatted: Word[] = transformWords(level, data);
    // Save words in memory
    words[level] = formatted;

    return formatted;
  } catch {
    console.error(`Error parsing ${level} words`);
    return [];
  }
}

const knownWordsSchema = z.array(z.string()).default([]);

export type KnownWordIds = string[];

export const getLocalKnownWordIds = (): KnownWordIds => {
  const localKnown = localStorage.getItem(LOCAL_KNOWN_KEY);

  if (!localKnown) return [];

  try {
    const parsed = JSON.parse(localKnown);
    const validated = knownWordsSchema.parse(parsed);

    return validated;
  } catch {
    localStorage.removeItem(LOCAL_KNOWN_KEY);
    return [];
  }
};

export const setLocalKnownWordIds = (newIds: KnownWordIds) => {
  const validated = knownWordsSchema.parse(newIds);
  localStorage.setItem(LOCAL_KNOWN_KEY, JSON.stringify(validated));
};
