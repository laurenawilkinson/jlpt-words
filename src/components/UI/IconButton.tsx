import { type ComponentChildren } from 'preact';
import { type ComponentPropsWithoutRef, type ElementType } from 'preact/compat';
import { cn } from '@/utils/cn';

type IconButtonBaseProps<T extends ElementType> = {
  as?: T;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: ComponentChildren;
};

type PolymorphicProps<T extends ElementType> = IconButtonBaseProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof IconButtonBaseProps<T>>;

export const IconButton = <T extends ElementType = 'button'>({
  as,
  size = 'md',
  className,
  children,
  ...props
}: PolymorphicProps<T>) => {
  const Component: ElementType = as ?? 'button';

  const sizeClass = {
    sm: 'h-7 w-7 [&>svg]:h-4 [&>svg]:w-4',
    md: 'h-10 w-10 [&>svg]:h-6 [&>svg]:w-6',
    lg: 'h-12 w-12 [&>svg]:h-6 [&>svg]:w-6',
  }[size];

  return (
    <Component
      className={cn(
        'text-muted inline-flex cursor-pointer items-center justify-center rounded-full transition-colors duration-150 ease-in-out',
        'hover:bg-zinc-100/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50',
        sizeClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default IconButton;
