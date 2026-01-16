import { cn } from '@/utils/cn';
import type { ComponentChildren } from 'preact';

interface SettingsMenuSettingProps {
  label: string;
  children: ComponentChildren;
  isVertical?: boolean;
}

export const SettingsMenuSetting = ({
  label,
  children,
  isVertical,
}: SettingsMenuSettingProps) => {
  return (
    <div
      class={cn(
        'flex w-full justify-between gap-x-1 gap-y-2 py-1.5 text-sm',
        isVertical ? 'flex-col' : 'items-center'
      )}
    >
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
};
