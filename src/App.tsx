import { useState } from 'preact/hooks';
import { IconBrandGithub, IconHelpCircle } from '@tabler/icons-preact';
import { cn } from './utils/cn';
import IconButton from './components/UI/IconButton';
import { SettingsProvider } from './providers/SettingsProvider';
import { AppHeader } from './components/AppHeader';
import { AppContent } from './components/AppContent';

export const App = () => {
  const [showCredits, setShowCredits] = useState(false);

  return (
    <SettingsProvider>
      <AppHeader />
      <div className="flex min-h-screen flex-col">
        <AppContent />
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
    </SettingsProvider>
  );
};
