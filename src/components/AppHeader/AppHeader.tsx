import { cn } from '@/utils/cn';
import {
  IconCalendarEvent,
  IconLeaf,
  IconSettings,
} from '@tabler/icons-preact';
import { SettingsMenu } from '../SettingsMenu/SettingsMenu';
import { useRef, useState } from 'preact/hooks';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useSettings } from '@/providers/SettingsProvider';
import { AppHeaderNavItem } from './AppHeaderNavItem';
import type { PageKey } from '@/types';

interface AppHeaderProps {
  activePage: PageKey;
  setActivePage: (page: PageKey) => void;
}

export const AppHeader = ({ activePage, setActivePage }: AppHeaderProps) => {
  const { settings, updateSettings } = useSettings();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(settingsMenuRef, () => setShowSettingsMenu(false), {
    ignoreSelectors: ['#settingsToggle'],
  });

  return (
    <>
      <header className="flex w-full justify-between gap-2 p-4">
        <div className="flex items-center gap-2">
          <img
            src="/images/torii.png"
            alt="Torii Gate"
            width="68"
            height="68"
            className="size-8"
          />
          <p className="flex flex-col leading-tight">
            <span className="font-jp-sans font-semibold">単語タブ</span>
            <span className="text-foreground-secondary text-xs">
              Daily Japanese words
            </span>
          </p>
        </div>
        <nav className="flex gap-1">
          <AppHeaderNavItem
            icon={IconCalendarEvent}
            label="Today"
            variant="study"
            active={activePage === 'study'}
            onClick={() => setActivePage('study')}
          />
          <AppHeaderNavItem
            icon={IconLeaf}
            label="Known"
            variant="known"
            active={activePage === 'known'}
            onClick={() => setActivePage('known')}
          />
          <div className="relative">
            <AppHeaderNavItem
              id="settingsToggle"
              icon={IconSettings}
              label="Settings"
              active={showSettingsMenu}
              onClick={() => setShowSettingsMenu((prev) => !prev)}
            />
            <SettingsMenu
              className={cn(
                'absolute top-full right-0 z-10 transition-opacity',
                {
                  'invisible opacity-0': !showSettingsMenu,
                }
              )}
              ref={settingsMenuRef}
              settings={settings}
              updateSettings={updateSettings}
            />
          </div>
        </nav>
      </header>
    </>
  );
};
