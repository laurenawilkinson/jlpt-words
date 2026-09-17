import type { Word } from '@/types';
import { createContext } from 'preact';
import { useContext, useEffect, useMemo, useState } from 'preact/hooks';
import { useSettings } from './SettingsProvider';
import { loadWordsForLevel } from '@/utils/words';
import { useKnownWords } from '@/hooks/useKnownWords';
import { useDailyWords } from '@/hooks/useDailyWords';
import { useSavedWords } from '@/hooks/useSavedWords';

interface WordsContextValue {
  words: Word[];
  loadingWords: boolean;
  dailyWords: Word[];

  knownWords: Word[];
  isKnownWord: (wordId: string) => boolean;
  addKnownWord: (wordId: string) => void;
  removeKnownWord: (wordId: string) => void;

  savedWords: Word[];
  isSavedWord: (wordId: string) => boolean;
  addSavedWord: (wordId: string) => void;
  removeSavedWord: (wordId: string) => void;
}

const WordsContext = createContext<WordsContextValue | null>(null);

export const WordsProvider: preact.FunctionComponent = ({ children }) => {
  const { settings } = useSettings();
  const [words, setWords] = useState<Word[]>([]);
  const [loadingWords, setLoadingWords] = useState(true);

  const {
    knownWords,
    knownWordIds,
    isKnownWord,
    addKnownWord,
    removeKnownWord,
  } = useKnownWords(words);

  const { savedWords, isSavedWord, addSavedWord, removeSavedWord } =
    useSavedWords(words);

  const dailyWords = useDailyWords({
    words,
    knownWordIds,
  });

  useEffect(() => {
    const fetchWordArrays = async () => {
      setLoadingWords(true);
      try {
        const wordArrays = await Promise.all(
          settings.jlptLevels.map(loadWordsForLevel)
        );
        setWords(wordArrays.flat());
      } catch {
        console.error('Failed to load words');
      } finally {
        setLoadingWords(false);
      }
    };
    fetchWordArrays();
  }, [settings.jlptLevels]);

  const value: WordsContextValue = useMemo(
    () => ({
      words,
      loadingWords,
      dailyWords,
      knownWords,
      isKnownWord,
      addKnownWord,
      removeKnownWord,
      savedWords,
      isSavedWord,
      addSavedWord,
      removeSavedWord,
    }),
    [
      words,
      loadingWords,
      dailyWords,
      knownWords,
      isKnownWord,
      addKnownWord,
      removeKnownWord,
      savedWords,
      isSavedWord,
      addSavedWord,
      removeSavedWord,
    ]
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
