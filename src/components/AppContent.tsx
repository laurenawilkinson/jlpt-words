import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Flashcard } from './Flashcard';
import { useWords } from '@/providers/WordsProvider';
import { useDailyDateKey } from '@/hooks/useDailyDateKey';
import { useSettings } from '@/providers/SettingsProvider';

export const AppContent = () => {
  const { settings } = useSettings();
  const { dailyWords, isKnownWord, addKnownWord, removeKnownWord } = useWords();
  const dateKey = useDailyDateKey();

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-6 text-center sm:py-12">
      <h1 className="mb-2 text-2xl font-medium sm:text-3xl">Today's Study</h1>
      <p className="text-foreground-secondary font-jp-sans mt-2 font-semibold tracking-wide">
        {format(dateKey, 'M月d日（EEE）', { locale: ja })}
      </p>
      <div className="mt-10 flex w-full flex-col items-center gap-6 sm:mt-14 sm:flex-row sm:flex-wrap sm:justify-center sm:px-8">
        {dailyWords.map((word) => (
          <Flashcard
            key={word.id}
            word={word}
            showFurigana={settings.showFurigana}
            showRomaji={settings.showRomaji}
            showMeaning={settings.showMeaning}
            jpFont={settings.jpFont}
            isKnown={isKnownWord(word.id)}
            toggleIsKnown={(known) =>
              known ? removeKnownWord(word.id) : addKnownWord(word.id)
            }
          />
        ))}
      </div>
    </div>
  );
};
