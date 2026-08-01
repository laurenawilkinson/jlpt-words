import { cn } from '@/utils/cn';
import { type HTMLAttributes } from 'preact/compat';

export const AppContent = ({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex-1 p-4', className)} {...rest}>
      {children}
    </div>
  );
};
