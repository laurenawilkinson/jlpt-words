import type { Word } from '@/types';
import { cn } from '@/utils/cn';
import Button from '../UI/Button';
import { FlashcardLevel } from '../FlashcardLevel';
import { useSettings } from '@/providers/SettingsProvider';
import { JP_FONT_CLASSES } from '@/utils/settings';
import IconButton from '../UI/IconButton';
import { IconX } from '@tabler/icons-preact';

interface KnownWordItemProps {
  className?: string;
  word: Word;
  onRemove: () => void;
}

export const KnownWordItem = ({
  className,
  word,
  onRemove,
}: KnownWordItemProps) => {
  const { settings } = useSettings();
  return (
    <div
      className={cn(
        // mobile: badge, jp+romaji block, icon button
        'group grid grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-1 px-4 py-6',
        // sm+: subgrid into the parent's 4 tracks
        'sm:col-span-4 sm:grid-cols-subgrid sm:items-center sm:gap-6 sm:px-6',
        className
      )}
    >
      <FlashcardLevel
        size="sm"
        level={word.jlpt}
        className="[&]:w-fit sm:[&]:w-auto"
      />

      {/* jp word + romaji share one column; row on sm+, stacked on mobile */}
      <div className="flex flex-col gap-1 sm:contents">
        <div className="flex flex-row items-baseline gap-3">
          <p
            className={cn(
              'text-xl font-medium',
              JP_FONT_CLASSES[settings.jpFont]
            )}
          >
            <ruby>
              {word.jp}
              {word.furigana && (
                <rt className="text-foreground-secondary mb-1 text-sm font-normal">
                  {word.furigana}
                </rt>
              )}
            </ruby>
          </p>
          <p className="text-foreground-tertiary text-sm">({word.romaji})</p>
        </div>
        <p>{word.en}</p>
      </div>

      <IconButton onClick={onRemove} className="sm:hidden" aria-label="Remove">
        <IconX />
      </IconButton>
      <Button
        variant="outline"
        onClick={onRemove}
        className="hidden transition-all ease-out sm:inline-flex sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
      >
        Remove
      </Button>
    </div>
  );
};
