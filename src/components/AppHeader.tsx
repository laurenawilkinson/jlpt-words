import { cn } from '@/utils/cn';
import { IconSettings } from '@tabler/icons-preact';
import { SettingsMenu } from './SettingsMenu/SettingsMenu';
import IconButton from './UI/IconButton';
import { useRef, useState } from 'preact/hooks';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useSettings } from '@/providers/SettingsProvider';

export const AppHeader = () => {
  const { settings, updateSettings } = useSettings();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(settingsMenuRef, () => setShowSettingsMenu(false), {
    ignoreSelectors: ['#settingsToggle'],
  });

  return (
    <header className="absolute top-4 right-4">
      <div className="relative">
        <IconButton
          id="settingsToggle"
          aria-label="Settings"
          onClick={() => setShowSettingsMenu((prev) => !prev)}
        >
          <IconSettings />
        </IconButton>
        <SettingsMenu
          className={cn('absolute top-full right-0 z-10 transition-opacity', {
            'invisible opacity-0': !showSettingsMenu,
          })}
          ref={settingsMenuRef}
          settings={settings}
          updateSettings={updateSettings}
        />
      </div>
    </header>
  );
};
