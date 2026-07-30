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
          'hover:bg-primary-50 focus-visible:ring-ring focus:outline-none disabled:pointer-events-none disabled:opacity-50',
          active && 'bg-primary-100 hover:bg-primary-200',
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
