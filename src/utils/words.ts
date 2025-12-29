import seedrandom from 'seedrandom';
import { isKana, toRomaji } from 'wanakana';
import type { JlptLevel, JlptWord, Word } from '../types';

export function getWordsForDate(
  words: Word[],
  count: number,
  date = new Date()
): Word[] {
  const seed = date.toISOString().slice(0, 10);
  const rng = seedrandom(seed);

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
  const res = await fetch(`/data/${level}.json`);
  if (!res.ok) throw new Error(`Failed to load ${level} words`);
  const data: JlptWord[] = await res.json();
  return transformWords(level, data);
}
