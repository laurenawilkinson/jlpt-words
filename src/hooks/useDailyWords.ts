import type { Word } from '@/types';
import { useDailyDateKey } from './useDailyDateKey';
import { useSettings } from '@/providers/SettingsProvider';
import { useMemo } from 'preact/hooks';
import { getWordsForDate } from '@/utils/words';

interface UseDailyWordsProps {
  words: Word[];
  knownWordIds: string[];
}

export const useDailyWords = ({ words, knownWordIds }: UseDailyWordsProps) => {
  const { settings } = useSettings();
  const dateKey = useDailyDateKey();

  const dailyWordPool = useMemo(
    () => getWordsForDate(words, dateKey),
    [words, dateKey]
  );

  const dailyWords = useMemo(
    () =>
      dailyWordPool
        .filter(
          (word) => !settings.hideKnownWords || !knownWordIds.includes(word.id)
        )
        .slice(0, settings.words),
    [dailyWordPool, settings.hideKnownWords, settings.words, knownWordIds]
  );

  return dailyWords;
};
