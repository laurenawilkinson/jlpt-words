import type { JlptLevel } from '@/types';
import { cn } from '@/utils/cn';

interface FlashcardLevelProps {
  className?: string;
  level: JlptLevel;
}

export const FlashcardLevel = ({ className, level }: FlashcardLevelProps) => {
  return (
    <span
      className={cn(
        'bg-primary-50 text-primary rounded-lg px-3 py-1 font-medium tracking-wide',
        className
      )}
    >
      {level}
    </span>
  );
};
