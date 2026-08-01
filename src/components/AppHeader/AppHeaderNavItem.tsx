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
    study: 'bg-study/20 text-study',
    known: 'bg-known/20 text-known',
    saved: 'bg-saved/20 text-saved',
  };

  return (
    <button
      className={cn(
        'text-foreground-secondary inline-flex h-16 w-18 cursor-pointer flex-col items-center justify-center rounded-2xl text-center text-sm transition-colors duration-150',
        active ? variantClasses[variant] : 'hover:bg-neutral-300/50'
      )}
      {...props}
    >
      <IconComponent className="shrink-0" size={24} aria-hidden="true" />
      {label}
    </button>
  );
};
