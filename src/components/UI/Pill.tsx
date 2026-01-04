import { forwardRef } from 'preact/compat';
import type { JSX } from 'preact';
import type { ComponentChildren } from 'preact';
import { cn } from '@/utils/cn';

type IconButtonProps = JSX.IntrinsicElements['button'] & {
  children: ComponentChildren;
  className?: string;
  isSelected?: boolean;
};

const Pill = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className = '', isSelected, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'text-muted inline-flex cursor-pointer items-center justify-center rounded-md p-1 font-semibold transition-colors duration-150 ease-in-out',
          'hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Pill;
