import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/utils/cn';
import { IconChevronDown } from '@tabler/icons-preact';
import type { ComponentChild } from 'preact';
import { useRef, useState } from 'preact/hooks';

export type SelectOption<T extends string> = {
  value: T;
  label: ComponentChild;
};

type SelectProps<T extends string> = {
  className?: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
};

export const Select = <T extends string>({
  className,
  value,
  options,
  onChange,
  placeholder,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} class={cn('relative text-sm', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        class={cn(
          'border-border-soft focus-visible:focus-ring flex w-full cursor-pointer items-center justify-between gap-2 rounded-full border px-3 py-2 transition-colors hover:bg-neutral-50',
          isOpen && 'bg-surface'
        )}
      >
        <span class="flex items-center gap-2">
          {selected?.label ?? (
            <span class="text-foreground-tertiary">{placeholder}</span>
          )}
        </span>

        <IconChevronDown
          size={16}
          className={cn('text-foreground-secondary', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          class="bg-surface absolute z-20 mt-2 flex w-full flex-col gap-1 overflow-hidden rounded-xl p-2 shadow-md"
        >
          {options.map((option) => (
            <li key={option.value}>
              <button
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors',
                  'focus-visible:focus-ring hover:bg-neutral-50',
                  'aria-selected:bg-primary-100 hover:aria-selected:bg-primary-200 focus-visible:aria-selected:bg-primary-200'
                )}
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
