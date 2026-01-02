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
        'rounded-xl px-3 py-1 font-semibold tracking-wide',
        {
          'bg-red-400': level === 'N1',
          'bg-orange-400': level === 'N2',
          'bg-yellow-400': level === 'N3',
          'bg-lime-400': level === 'N4',
          'bg-green-400': level === 'N5',
        },
        className
      )}
    >
      {level}
    </span>
  );
};
