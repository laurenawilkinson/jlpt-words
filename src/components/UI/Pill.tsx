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
    const base =
      'inline-flex items-center font-semibold p-1 justify-center rounded-md text-muted cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:bg-stone-100 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300';

    return (
      <button ref={ref} className={cn(base, className)} {...rest}>
        {children}
      </button>
    );
  }
);

export default Pill;
