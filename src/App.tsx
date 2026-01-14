import { SettingsProvider } from './providers/SettingsProvider';
import { AppHeader } from './components/AppHeader';
import { AppContent } from './components/AppContent';
import { AppFooter } from './components/AppFooter';

export const App = () => {
  return (
    <SettingsProvider>
      <AppHeader />
      <div className="flex min-h-screen flex-col">
        <AppContent />
        <AppFooter />
      </div>
    </SettingsProvider>
  );
};
