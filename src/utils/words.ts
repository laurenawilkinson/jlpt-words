import seedrandom from 'seedrandom';
import type { Word } from '../types';

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
