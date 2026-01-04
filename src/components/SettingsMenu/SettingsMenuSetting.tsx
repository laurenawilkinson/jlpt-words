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
        'flex w-full justify-between gap-1 py-1.5 text-sm',
        isVertical ? 'flex-col' : 'items-center'
      )}
    >
      <strong class="mb-1 font-medium">{label}</strong>
      <div>{children}</div>
    </div>
  );
};
