import { useEffect, useRef, useState } from 'preact/hooks';
import { getAppSettings, setAppSettings } from './utils/settings';
import type { Settings, Word } from './types';
import { getWordsForDate, loadWordsForLevel } from './utils/words';
import { Flashcard } from './components/Flashcard';
import {
  IconBrandGithub,
  IconHelpCircle,
  IconSettings,
} from '@tabler/icons-preact';
import { useDailyDateKey } from './hooks/useDailyDateKey';
import { format } from 'date-fns';
import { SettingsMenu } from './components/SettingsMenu/SettingsMenu';
import { cn } from './utils/cn';
import IconButton from './components/UI/IconButton';
import { useClickOutside } from './hooks/useClickOutside';

export const App = () => {
  const [settings, setSettings] = useState(getAppSettings());
  const [todaysWords, setTodaysWords] = useState<Word[]>([]);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const dateKey = useDailyDateKey();
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(settingsMenuRef, () => setShowSettingsMenu(false));

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
              'invisible opacity-0': !showSettingsMenu,
            })}
            ref={settingsMenuRef}
            settings={settings}
            updateSettings={updateSettings}
          />
        </div>
      </header>
      <div className="flex min-h-screen flex-col">
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
          <div className="mt-10 flex w-full flex-col items-center gap-6 sm:mt-14 sm:flex-row sm:flex-wrap sm:justify-center">
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
        <footer className="text-muted flex flex-row-reverse items-center justify-center gap-2 p-4 text-center text-xs sm:justify-start">
          <IconButton
            aria-label="About"
            className="hidden sm:inline-flex"
            onClick={() => setShowCredits(!showCredits)}
          >
            <IconHelpCircle />
          </IconButton>
          <div
            className={cn(
              'flex items-center gap-2 transition-all',
              showCredits ? 'sm:-translate-x-2' : 'sm:invisible sm:opacity-0'
            )}
          >
            <a href="https://www.flaticon.com/free-icons/japan" target="_blank">
              Images by Freepik
            </a>
            &bull;
            <a
              className="inline-flex items-center gap-1"
              href="https://github.com/laurenawilkinson/jlpt-words"
              target="_blank"
            >
              <IconBrandGithub size={16} /> Source on Github
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};
