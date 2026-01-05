import { z } from 'zod';
import type { Settings } from '@/types';
import { JLPT_LEVELS } from './jlptLevel';

const LOCAL_SETTINGS_KEY = 'settings';
export const JP_FONTS: Settings['jpFont'][] = ['sans', 'serif'];
export const JP_FONT_LABELS: Record<Settings['jpFont'], string> = {
  sans: 'Sans (ゴシック)',
  serif: 'Serif (明朝)',
};
const DEFAULT_SETTINGS: Settings = {
  words: 3,
  showFurigana: true,
  showRomaji: false,
  showMeaning: false,
  jlptLevels: ['N5'],
  jpFont: 'sans',
};
export const MIN_WORDS = 1;
export const MAX_WORDS = 10;
const settingsSchema = z.object({
  words: z.number().min(MIN_WORDS).max(MAX_WORDS),
  showFurigana: z.boolean(),
  showRomaji: z.boolean(),
  showMeaning: z.boolean(),
  jlptLevels: z.array(z.enum(JLPT_LEVELS)),
  jpFont: z.enum(JP_FONTS),
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
