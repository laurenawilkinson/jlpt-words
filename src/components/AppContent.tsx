import { format } from 'date-fns';
import { Flashcard } from './Flashcard';
import { useSettings } from '@/providers/SettingsProvider';
import { useEffect, useState } from 'preact/hooks';
import { useDailyDateKey } from '@/hooks/useDailyDateKey';
import type { Word } from '@/types';
import { loadWordsForLevel, getWordsForDate } from '@/utils/words';

export const AppContent = () => {
  const { settings } = useSettings();
  const [todaysWords, setTodaysWords] = useState<Word[]>([]);
  const dateKey = useDailyDateKey();

  useEffect(() => {
    const fetchWordArrays = async () => {
      const wordArrays = await Promise.all(
        settings.jlptLevels.map(loadWordsForLevel)
      );
      const words = getWordsForDate(wordArrays.flat(), settings.words, dateKey);
      setTodaysWords(words);
    };
    fetchWordArrays();
  }, [settings.jlptLevels, settings.words]);

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 text-center sm:py-24">
      <img
        src="/images/torii.png"
        alt="Torii Gate"
        width="68"
        height="68"
        className="mb-2"
      />
      <h1 className="mb-4 text-5xl font-bold">JLPT Words</h1>
      <p id="todaysDate" className="font-semibold opacity-50">
        {format(dateKey, 'EEEE dd MMMM')}
      </p>
      <div className="mt-10 flex w-full flex-col items-center gap-6 px-8 sm:mt-14 sm:flex-row sm:flex-wrap sm:justify-center">
        {todaysWords.map((word) => (
          <Flashcard
            key={`${word.jp}-${word.en}`}
            word={word}
            showFurigana={settings.showFurigana}
            showRomaji={settings.showRomaji}
            showMeaning={settings.showMeaning}
            jpFont={settings.jpFont}
          />
        ))}
      </div>
    </div>
  );
};
