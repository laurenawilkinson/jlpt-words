import { cn } from '@/utils/cn';
import { flashcardContainerClasses } from './Flashcard';

interface FlashcardPlaceholderProps {
  showFurigana?: boolean;
  showRomaji?: boolean;
  showMeaning?: boolean;
}

export const FlashcardPlaceholder = ({
  showFurigana,
  showRomaji,
  showMeaning,
}: FlashcardPlaceholderProps) => {
  return (
    <div className={flashcardContainerClasses}>
      <div className="bg-surface-alt absolute top-5 h-8 w-11 rounded-lg" />

      <div className="relative mt-8 sm:mt-5">
        {showFurigana && (
          <div className="bg-surface-alt absolute right-0 bottom-full left-0 mx-auto mb-1.5 h-6 w-20 rounded-lg p-1 sm:h-8" />
        )}
        <div className="bg-surface-alt h-9 w-44 rounded-lg sm:h-12" />
      </div>
      {showRomaji && (
        <div className="bg-surface-alt mt-1 h-5 w-14 rounded-lg sm:mt-2 sm:h-6" />
      )}

      <div
        className={cn(
          'bg-surface-alt mt-3 h-8 w-52 rounded-lg sm:mt-5 sm:h-9',
          !showMeaning && 'opacity-0'
        )}
      />
    </div>
  );
};
