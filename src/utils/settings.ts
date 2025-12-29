import { z } from 'zod';
import type { Settings } from '../types';

const LOCAL_SETTINGS_KEY = 'settings';
const DEFAULT_SETTINGS: Settings = {
  words: 3,
  showFurigana: true,
  showRomaji: false,
  jlptLevels: ['N5'],
};
const settingsSchema = z.object({
  words: z.number().min(1).max(10),
  showFurigana: z.boolean(),
  showRomaji: z.boolean(),
  jlptLevels: z.array(z.enum(['N5', 'N4', 'N3', 'N2', 'N1'])),
});

export const getSettings = (): Settings => {
  const localSettings = localStorage.getItem(LOCAL_SETTINGS_KEY);

  if (!localSettings) return DEFAULT_SETTINGS;

  try {
    const parsed = JSON.parse(localSettings);
    const validated = settingsSchema.partial().parse(parsed);

    return {
      ...DEFAULT_SETTINGS,
      ...validated,
    };
  } catch {
    // Clean up invalid settings
    localStorage.removeItem(LOCAL_SETTINGS_KEY);
    return DEFAULT_SETTINGS;
  }
};

export const setSettings = (newSettings: Settings) => {
  const settings = settingsSchema.parse(newSettings);
  localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings));
};
