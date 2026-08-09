import type { JlptLevel } from '@/types';
import { cn } from '@/utils/cn';

interface FlashcardLevelProps {
  className?: string;
  level: JlptLevel;
  size?: 'sm' | 'md';
}

export const FlashcardLevel = ({
  className,
  level,
  size = 'md',
}: FlashcardLevelProps) => {
  return (
    <span
      className={cn(
        'bg-primary-50 text-primary rounded-lg px-3 py-1 font-medium tracking-wide select-none',
        { 'px-3 py-1': size === 'md', 'px-2 py-1 text-sm': size === 'sm' },
        className
      )}
    >
      {level}
    </span>
  );
};
