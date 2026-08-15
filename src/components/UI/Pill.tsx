import { forwardRef } from 'preact/compat';
import type { JSX } from 'preact';
import type { ComponentChildren } from 'preact';
import { cn } from '@/utils/cn';

type IconButtonProps = JSX.IntrinsicElements['button'] & {
  children: ComponentChildren;
  active?: boolean;
};

const Pill = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, active, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center rounded-md p-1 font-medium transition-colors duration-150 ease-in-out',
          'hover:bg-primary-soft focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-50',
          active && 'bg-primary-soft hover:bg-primary-soft-hover',
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
