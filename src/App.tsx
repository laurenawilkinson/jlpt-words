import { useEffect, useState } from 'preact/hooks';
import { getAppSettings, setAppSettings } from './utils/settings';
import type { Settings, Word } from './types';
import { getWordsForDate, loadWordsForLevel } from './utils/words';
import { Flashcard } from './components/Flashcard';
import { IconSettings } from '@tabler/icons-preact';
import { useDailyDateKey } from './hooks/useDailyDateKey';
import { format } from 'date-fns';
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu';
import { cn } from './utils/cn';
import IconButton from './components/UI/IconButton';

export const App = () => {
  const [settings, setSettings] = useState(getAppSettings());
  const [todaysWords, setTodaysWords] = useState<Word[]>([]);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const dateKey = useDailyDateKey();

  useEffect(() => {
    console.log('fetching...');
    const fetchWordArrays = async () => {
      const wordArrays = await Promise.all(
        settings.jlptLevels.map(loadWordsForLevel)
      );
      const words = getWordsForDate(wordArrays.flat(), settings.words, dateKey);
      setTodaysWords(words);
    };
    fetchWordArrays();
  }, [settings.jlptLevels, settings.words]);

  const updateSettings = (updatedSettings: Partial<Settings>) => {
    const newSettings = setAppSettings({ ...settings, ...updatedSettings });
    setSettings(newSettings);
  };

  return (
    <>
      <header className="absolute top-4 right-4">
        <div className="relative">
          <IconButton
            aria-label="Settings"
            onClick={() => setShowSettingsMenu((prev) => !prev)}
          >
            <IconSettings />
          </IconButton>
          <SettingsMenu
            className={cn('absolute top-full right-0 z-10 transition-opacity', {
              'opacity-0': !showSettingsMenu,
            })}
            settings={settings}
            updateSettings={updateSettings}
          />
        </div>
      </header>
      <div className="flex flex-col items-center">
        <img
          src="/images/japan.png"
          alt="Japanese Flag"
          width="68"
          height="68"
          className="mb-2"
        />
        <h1 className="mb-4 text-5xl font-bold">JLPT Words</h1>
        <p id="todaysDate" className="font-semibold opacity-50">
          {format(dateKey, 'EEEE dd MMMM')}
        </p>
      </div>
      <div className="mt-10 flex w-full flex-col items-center gap-6 sm:mt-14 sm:flex-row sm:flex-wrap sm:justify-center">
        {todaysWords.map((word) => (
          <Flashcard
            key={`${word.jp}-${word.en}`}
            word={word}
            showFurigana={settings.showFurigana}
            showRomaji={settings.showRomaji}
          />
        ))}
      </div>
    </>
  );
};
