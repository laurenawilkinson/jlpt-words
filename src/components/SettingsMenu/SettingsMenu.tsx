import { cn } from '@/utils/cn';
import type { Settings } from '@/types';
import { SettingsMenuSetting } from './SettingsMenuSetting';
import { SteppedNumberInput } from '../UI/SteppedNumberInput';
import { MAX_WORDS, MIN_WORDS } from '@/utils/settings';
import { Toggle } from '../UI/Toggle';
import Pill from '../UI/Pill';
import { JLPT_LEVEL_VAR, JLPT_LEVELS } from '@/utils/jlptLevel';

interface SettingsMenuProps {
  className?: string;
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const SettingsMenu = ({
  className,
  settings,
  updateSettings,
}: SettingsMenuProps) => {
  return (
    <div
      className={cn(
        'border-soft flex w-60 flex-col rounded-xl px-6 py-4 text-left shadow-sm',
        className
      )}
    >
      <SettingsMenuSetting label="Words">
        <SteppedNumberInput
          value={settings.words}
          setValue={(value) => updateSettings({ words: value })}
          min={MIN_WORDS}
          max={MAX_WORDS}
        />
      </SettingsMenuSetting>
      <SettingsMenuSetting label="Furigana">
        <Toggle
          checked={settings.showFurigana}
          onChange={(value) => updateSettings({ showFurigana: value })}
        />
      </SettingsMenuSetting>
      <SettingsMenuSetting label="Romaji">
        <Toggle
          checked={settings.showRomaji}
          onChange={(value) => updateSettings({ showRomaji: value })}
        />
      </SettingsMenuSetting>
      <SettingsMenuSetting label="JLPT Level" isVertical>
        <div className="flex gap-1">
          {JLPT_LEVELS.map((level) => (
            <Pill
              key={level}
              className={cn(
                'hover:bg-jlpt flex-1',
                settings.jlptLevels.includes(level) && 'bg-jlpt text-jlpt'
              )}
              style={{ '--jlpt-color': JLPT_LEVEL_VAR[level] }}
              onClick={() => {
                const next = settings.jlptLevels.includes(level)
                  ? settings.jlptLevels.filter((l) => l !== level)
                  : [...settings.jlptLevels, level];

                updateSettings({ jlptLevels: next });
              }}
            >
              {level}
            </Pill>
          ))}
        </div>
      </SettingsMenuSetting>
    </div>
  );
};
