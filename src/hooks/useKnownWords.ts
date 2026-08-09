import type { Word } from '@/types';
import {
  getLocalKnownWordIds,
  setLocalKnownWordIds,
  type KnownWordIds,
} from '@/utils/words';
import { useMemo, useState } from 'preact/hooks';

export const useKnownWords = (words: Word[]) => {
  const [knownWordIds, setKnownWordIds] = useState<KnownWordIds>(
    getLocalKnownWordIds()
  );

  const knownWords = useMemo(
    () => words.filter((word) => knownWordIds.includes(word.id)),
    [words, knownWordIds]
  );

  const isKnownWord = (wordId: string) => {
    return knownWordIds.includes(wordId);
  };

  const addKnownWord = (wordId: string) => {
    const currentIds = getLocalKnownWordIds();
    const newIds = Array.from(new Set(currentIds).add(wordId));
    setKnownWordIds(newIds);
    setLocalKnownWordIds(newIds);
  };

  const removeKnownWord = (wordId: string) => {
    const currentIds = getLocalKnownWordIds();
    const newIds = currentIds.filter((id) => id !== wordId);
    setKnownWordIds(newIds);
    setLocalKnownWordIds(newIds);
  };

  return {
    knownWords,
    knownWordIds,
    isKnownWord,
    addKnownWord,
    removeKnownWord,
  };
};
