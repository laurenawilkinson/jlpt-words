import { SettingsProvider } from './providers/SettingsProvider';
import { AppHeader } from './components/AppHeader/AppHeader';
import { StudyPage } from './components/Study/StudyPage';
import { AppFooter } from './components/AppFooter';
import { WordsProvider } from './providers/WordsProvider';
import { useState } from 'preact/hooks';
import type { PageKey } from './types';
import { KnownWordsPage } from './components/KnownWords/KnownWordsPage';

export const App = () => {
  const [page, setPage] = useState<PageKey>('study');

  return (
    <SettingsProvider>
      <AppHeader activePage={page} setActivePage={setPage} />
      <div className="flex min-h-screen flex-col">
        <WordsProvider>
          {page === 'study' ? (
            <StudyPage />
          ) : page === 'known' ? (
            <KnownWordsPage />
          ) : null}
        </WordsProvider>
        <AppFooter />
      </div>
    </SettingsProvider>
  );
};
