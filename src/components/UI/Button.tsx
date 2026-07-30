import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'preact/compat';
import { type ButtonHTMLAttributes } from 'preact';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-lg',
    'font-medium',
    'transition-colors duration-150',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'select-none cursor-pointer',
    'whitespace-nowrap',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'focus-visible:focus-ring',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-background',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-5 text-base',
      },

      variant: {
        filled: '',
        outline: '',
      },

      color: {
        default: '',
        primary: '',
      },
    },

    compoundVariants: [
      {
        variant: 'filled',
        color: 'default',
        class:
          'bg-surface border border-transparent text-text shadow-xs hover:bg-neutral-100 active:bg-neutral-200',
      },
      {
        variant: 'outline',
        color: 'default',
        class:
          'bg-transparent border border-border text-text-secondary hover:bg-neutral-100 hover:border-neutral-400 active:bg-neutral-200',
      },
      {
        variant: 'filled',
        color: 'primary',
        class:
          'bg-primary-100 border border-transparent text-primary-600 hover:bg-primary-200 active:bg-primary-300',
      },
      {
        variant: 'outline',
        color: 'primary',
        class:
          'bg-transparent border border-primary-200 text-primary-500 hover:bg-primary-50 hover:border-primary-300 active:bg-primary-100',
      },
    ],

    defaultVariants: {
      size: 'md',
      variant: 'filled',
      color: 'default',
    },
  }
);
export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      class={cn(buttonVariants({ variant, color, size, className }))}
      {...props}
    />
  )
);

export default Button;
