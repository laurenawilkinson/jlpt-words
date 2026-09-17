import { cn } from '@/utils/cn';
import { forwardRef, type HTMLAttributes } from 'preact/compat';

export const WordList = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...rest }, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-surface border-border-soft grid grid-cols-1 rounded-2xl border sm:grid-cols-[auto_1fr_1fr_auto] sm:gap-x-6',
      className
    )}
    {...rest}
  >
    {children}
  </div>
));
