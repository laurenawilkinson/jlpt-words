import type { Word } from '@/types';
import {
  getLocalSavedWordIds,
  setLocalSavedWordIds,
  type SavedWordIds,
} from '@/utils/words';
import { useMemo, useState } from 'preact/hooks';

export const useSavedWords = (words: Word[]) => {
  const [savedWordIds, setSavedWordIds] = useState<SavedWordIds>(
    getLocalSavedWordIds()
  );

  const savedWords = useMemo(
    () => words.filter((word) => savedWordIds.includes(word.id)),
    [words, savedWordIds]
  );

  const isSavedWord = (wordId: string) => {
    return savedWordIds.includes(wordId);
  };

  const addSavedWord = (wordId: string) => {
    const currentIds = getLocalSavedWordIds();
    const newIds = Array.from(new Set(currentIds).add(wordId));
    setSavedWordIds(newIds);
    setLocalSavedWordIds(newIds);
  };

  const removeSavedWord = (wordId: string) => {
    const currentIds = getLocalSavedWordIds();
    const newIds = currentIds.filter((id) => id !== wordId);
    setSavedWordIds(newIds);
    setLocalSavedWordIds(newIds);
  };

  return {
    savedWords,
    savedWordIds,
    isSavedWord,
    addSavedWord,
    removeSavedWord,
  };
};
