import seedrandom from 'seedrandom';
import { isKana, toRomaji } from 'wanakana';
import type { JlptLevel, JlptWord, Word } from '../types';

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

export function transformWords(level: JlptLevel, words?: JlptWord[]): Word[] {
  if (!words || !Array.isArray(words)) return [];

  return words.map((word) => ({
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
  const data: JlptWord[] = await res.json();
  const formatted: Word[] = transformWords(level, data);
  // Save words in memory
  words[level] = formatted;

  return formatted;
}
