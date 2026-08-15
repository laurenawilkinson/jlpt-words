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
    'select-none cursor-pointer whitespace-nowrap',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:focus-ring',
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
        ghost: 'shadow-none border-transparent bg-transparent',
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
          'bg-surface border border-transparent text-foreground shadow-xs hover:bg-surface-hover active:bg-surface-active',
      },
      {
        variant: 'outline',
        color: 'default',
        class:
          'bg-transparent border border-border text-foreground-secondary hover:bg-surface-hover hover:border-ring active:bg-surface-active',
      },
      {
        variant: 'ghost',
        color: 'default',
        class:
          'text-foreground-secondary hover:bg-surface-hover active:bg-surface-active',
      },

      {
        variant: 'filled',
        color: 'primary',
        class:
          'bg-primary-soft text-primary-foreground hover:bg-primary-soft-hover active:bg-primary-soft-active',
      },
      {
        variant: 'outline',
        color: 'primary',
        class:
          'border-primary-border text-primary hover:bg-primary-soft hover:border-primary-border-hover active:bg-primary-soft-active',
      },
      {
        variant: 'ghost',
        color: 'primary',
        class:
          'text-primary hover:bg-primary-soft active:bg-primary-soft-active',
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
    VariantProps<typeof buttonVariants> {}

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
