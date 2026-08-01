import type { Word } from '@/types';
import { createContext } from 'preact';
import { useContext, useEffect, useMemo, useState } from 'preact/hooks';
import { useSettings } from './SettingsProvider';
import { useDailyDateKey } from '@/hooks/useDailyDateKey';
import {
  getLocalKnownWordIds,
  getWordsForDate,
  loadWordsForLevel,
  setLocalKnownWordIds,
  type KnownWordIds,
} from '@/utils/words';

interface WordsContextValue {
  words: Word[];
  knownWords: Word[];
  dailyWords: Word[];
  isKnownWord: (wordId: string) => boolean;
  addKnownWord: (wordId: string) => void;
  removeKnownWord: (wordId: string) => void;
}

const WordsContext = createContext<WordsContextValue | null>(null);

export const WordsProvider: preact.FunctionComponent = ({ children }) => {
  const { settings } = useSettings();
  const [words, setWords] = useState<Word[]>([]);
  const [knownWordIds, setKnownWordIds] = useState<KnownWordIds>(
    getLocalKnownWordIds()
  );
  const dateKey = useDailyDateKey();

  const dailyWords = useMemo(
    () => getWordsForDate(words, settings.words, dateKey),
    [words, settings.words, dateKey]
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

  useEffect(() => {
    const fetchWordArrays = async () => {
      const wordArrays = await Promise.all(
        settings.jlptLevels.map(loadWordsForLevel)
      );
      setWords(wordArrays.flat());
    };
    fetchWordArrays();
  }, [settings.jlptLevels]);

  const value = useMemo(
    () => ({
      words,
      knownWords,
      dailyWords,
      isKnownWord,
      addKnownWord,
      removeKnownWord,
    }),
    [words, knownWords, dailyWords, isKnownWord, addKnownWord, removeKnownWord]
  );

  return (
    <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
  );
};

export const useWords = () => {
  const ctx = useContext(WordsContext);
  if (!ctx) {
    throw new Error('useWords must be used inside WordsProvider');
  }
  return ctx;
};
