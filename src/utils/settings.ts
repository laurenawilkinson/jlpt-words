import { z } from 'zod';
import type { Settings } from '@/types';
import { JLPT_LEVELS } from './jlptLevel';

const LOCAL_SETTINGS_KEY = 'settings';
const DEFAULT_SETTINGS: Settings = {
  words: 3,
  showFurigana: true,
  showRomaji: false,
  showMeaning: false,
  jlptLevels: ['N5'],
};
export const MIN_WORDS = 1;
export const MAX_WORDS = 10;
const settingsSchema = z.object({
  words: z.number().min(MIN_WORDS).max(MAX_WORDS),
  showFurigana: z.boolean(),
  showRomaji: z.boolean(),
  showMeaning: z.boolean(),
  jlptLevels: z.array(z.enum(JLPT_LEVELS)),
});

export const getAppSettings = (): Settings => {
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

export const setAppSettings = (newSettings: Settings): Settings => {
  const settings = settingsSchema.parse(newSettings);
  const sortedSettings: Settings = {
    ...settings,
    jlptLevels: settings.jlptLevels.sort((a, b) => a.localeCompare(b)),
  };
  localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(sortedSettings));
  return settings;
};
