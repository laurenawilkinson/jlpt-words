import { cn } from '@/utils/cn';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle = ({ checked, onChange, disabled }: ToggleProps) => {
  return (
    <label class="relative inline-flex cursor-pointer items-center select-none">
      <input
        type="checkbox"
        class="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
      />

      <span
        class={cn(
          'relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-150 ease-out',
          checked ? 'bg-rose-200' : 'bg-stone-200',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <span
          class={cn(
            'absolute left-1 h-4 w-4 rounded-full bg-stone-50 shadow-sm transition-transform duration-150 ease-out',
            checked ? 'translate-x-4' : 'translate-x-0'
          )}
        />
      </span>
    </label>
  );
};
