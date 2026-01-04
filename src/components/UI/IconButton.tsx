import { forwardRef } from 'preact/compat';
import type { JSX } from 'preact';
import type { ComponentChildren } from 'preact';
import { cn } from '@/utils/cn';

type IconButtonProps = JSX.IntrinsicElements['button'] & {
  children: ComponentChildren;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className = '', size = 'md', ...rest }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-md text-muted cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:bg-stone-100 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300';

    const sizeMap: Record<NonNullable<IconButtonProps['size']>, string> = {
      sm: 'h-7 w-7 [&>svg]:h-4 [&>svg]:w-4',
      md: 'h-10 w-10 [&>svg]:h-6 [&>svg]:w-6',
      lg: 'h-12 w-12 [&>svg]:h-6 [&>svg]:w-6',
    };

    const sizeClass = sizeMap[size];

    return (
      <button ref={ref} className={cn(base, sizeClass, className)} {...rest}>
        {children}
      </button>
    );
  }
);

export default IconButton;
