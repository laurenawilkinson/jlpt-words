import { cn } from '@/utils/cn';
import type { Icon } from '@tabler/icons-preact';
import type { ButtonHTMLAttributes } from 'preact';

type NavItemVariant = 'study' | 'known' | 'saved' | 'default';

interface AppHeaderNavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Icon;
  label: string;
  variant?: NavItemVariant;
  active: boolean;
}

export const AppHeaderNavItem = ({
  icon: IconComponent,
  label,
  variant = 'default',
  active,
  ...props
}: AppHeaderNavItemProps) => {
  const variantClasses: Record<NavItemVariant, string> = {
    default: 'bg-neutral-200',
    study: 'bg-study/10 text-study',
    known: 'bg-known/10 text-known',
    saved: 'bg-saved/10 text-saved',
  };

  return (
    <button
      className={cn(
        'text-foreground-secondary inline-flex size-12 cursor-pointer flex-col items-center justify-center rounded-2xl text-center text-sm font-medium transition-colors duration-150',
        'sm:h-16 sm:w-18',
        'focus-visible:focus-ring',
        active ? variantClasses[variant] : 'hover:bg-neutral-300/50'
      )}
      {...props}
    >
      <IconComponent className="shrink-0" size={24} aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};
