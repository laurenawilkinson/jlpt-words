import { SettingsProvider } from './providers/SettingsProvider';
import { AppHeader } from './components/AppHeader/AppHeader';
import { AppContent } from './components/AppContent';
import { AppFooter } from './components/AppFooter';
import { WordsProvider } from './providers/WordsProvider';

export const App = () => {
  return (
    <SettingsProvider>
      <WordsProvider>
        <AppHeader />
        <div className="flex min-h-screen flex-col">
          <AppContent />
          <AppFooter />
        </div>
      </WordsProvider>
    </SettingsProvider>
  );
};
