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
          'flex w-full cursor-pointer items-center justify-between gap-2 rounded-full bg-zinc-50/70 px-3 py-2 text-zinc-700 transition hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:outline-none',
          isOpen && 'bg-zinc-50'
        )}
      >
        <span class="flex items-center gap-2">
          {selected?.label ?? <span class="text-zinc-400">{placeholder}</span>}
        </span>

        <IconChevronDown
          size={16}
          className={cn('text-zinc-400', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          class="bg-surface absolute z-20 mt-2 flex w-full flex-col gap-1 overflow-hidden rounded-xl p-2 shadow-md shadow-zinc-400/10"
        >
          {options.map((option) => (
            <li key={option.value}>
              <button
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-zinc-700 transition-colors',
                  'hover:bg-zinc-50/50 focus-visible:bg-zinc-50/50 focus-visible:outline-0',
                  'aria-selected:bg-rose-100 aria-selected:text-zinc-900 hover:aria-selected:bg-rose-200/60 focus-visible:aria-selected:bg-rose-200/70'
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
