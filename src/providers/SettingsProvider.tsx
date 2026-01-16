import { createContext } from 'preact';
import { useCallback, useContext, useMemo, useState } from 'preact/hooks';
import { getAppSettings, setAppSettings } from '@/utils/settings';
import type { Settings } from '@/types';

type SettingsContextValue = {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider: preact.FunctionComponent = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(getAppSettings());

  const updateSettings = useCallback((updatedSettings: Partial<Settings>) => {
    setSettings((prev) => setAppSettings({ ...prev, ...updatedSettings }));
  }, []);

  const value = useMemo(
    () => ({ settings, updateSettings }),
    [settings, updateSettings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }
  return ctx;
};
