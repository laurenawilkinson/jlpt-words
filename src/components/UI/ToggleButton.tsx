import Button from './Button';
import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'preact/compat';
import { type ButtonHTMLAttributes } from 'preact';

const toggleVariants = cva('', {
  variants: {
    color: {
      default: '',
      matcha: '',
      wisteria: '',
    },

    pressed: {
      false: 'text-foreground-secondary',
      true: '',
    },
  },

  compoundVariants: [
    {
      color: 'default',
      pressed: false,
      class: 'text-foreground-secondary hover:bg-surface-hover',
    },
    {
      color: 'default',
      pressed: true,
      class: 'bg-surface-selected text-foreground',
    },

    {
      color: 'matcha',
      pressed: true,
      class: 'text-known hover:bg-known-soft',
    },

    {
      color: 'wisteria',
      pressed: true,
      class: 'text-saved hover:bg-saved-soft',
    },
  ],

  defaultVariants: {
    color: 'default',
    pressed: false,
  },
});

export interface ToggleButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ className, color, pressed = false, children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      aria-pressed={pressed}
      className={cn(
        toggleVariants({
          color,
          pressed,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
);

export default ToggleButton;
