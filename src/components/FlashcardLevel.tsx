import type { JlptLevel } from '@/types';
import { cn } from '@/utils/cn';
import { JLPT_LEVEL_VAR } from '@/utils/jlptLevel';

interface FlashcardLevelProps {
  className?: string;
  level: JlptLevel;
}

export const FlashcardLevel = ({ className, level }: FlashcardLevelProps) => {
  return (
    <span
      className={cn(
        'bg-jlpt text-jlpt rounded-xl px-3 py-1 font-medium tracking-wide',
        className
      )}
      style={{ '--jlpt-color': JLPT_LEVEL_VAR[level] }}
    >
      {level}
    </span>
  );
};
