import { cn } from '@/utils/cn';
import { useId } from 'preact/hooks';

interface ToggleProps {
  labelId?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle = ({
  labelId,
  checked,
  onChange,
  disabled,
}: ToggleProps) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      class="relative inline-flex cursor-pointer items-center select-none"
    >
      <input
        id={id}
        aria-labelledby={labelId}
        type="checkbox"
        class="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
      />

      <span
        class={cn(
          'relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-150 ease-out',
          checked ? 'bg-primary' : 'bg-neutral-300',
          disabled && 'cursor-not-allowed opacity-50',
          'peer-focus-visible:focus-ring peer-focus-visible:ring-offset-2'
        )}
      >
        <span
          class={cn(
            'absolute left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-150 ease-out',
            checked ? 'translate-x-4' : 'translate-x-0'
          )}
        />
      </span>
    </label>
  );
};
