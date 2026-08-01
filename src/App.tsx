import { SettingsProvider } from './providers/SettingsProvider';
import { AppHeader } from './components/AppHeader/AppHeader';
import { AppContent } from './components/AppContent';
import { AppFooter } from './components/AppFooter';
import { WordsProvider } from './providers/WordsProvider';

export const App = () => {
  return (
    <SettingsProvider>
      <AppHeader />
      <div className="flex min-h-screen flex-col">
        <WordsProvider>
          <AppContent />
        </WordsProvider>
        <AppFooter />
      </div>
    </SettingsProvider>
  );
};
