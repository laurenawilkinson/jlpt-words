import { IconBook, IconLeaf } from '@tabler/icons-preact';
import type { Settings, Word } from '@/types';
import { FlashcardLevel } from './FlashcardLevel';
import { useState } from 'preact/hooks';
import { cn } from '@/utils/cn';
import ToggleButton from './UI/ToggleButton';

interface FlashcardProps {
  word: Word;
  showFurigana: boolean;
  showRomaji: boolean;
  showMeaning: boolean;
  jpFont: Settings['jpFont'];
  isKnown: boolean;
  toggleIsKnown: (known: boolean) => void;
}

export const Flashcard = ({
  word,
  showFurigana,
  showRomaji,
  showMeaning: alwaysShowMeaning,
  jpFont,
  isKnown,
  toggleIsKnown,
}: FlashcardProps) => {
  const [showMeaning, setShowMeaning] = useState(false);
  const jpFontClass = {
    'font-jp-sans': jpFont === 'sans',
    'font-jp-serif': jpFont === 'serif',
    'font-jp-kawaii': jpFont === 'kawaii',
  };

  return (
    <div
      className={cn(
        'bg-surface group border-border relative flex h-64 w-full max-w-sm flex-col items-center justify-center rounded-4xl border p-4 shadow-md sm:h-96 sm:min-w-80 sm:flex-1',
        {
          'transition-all hover:-translate-y-0.5 hover:shadow-lg':
            !alwaysShowMeaning,
        }
      )}
    >
      {!alwaysShowMeaning && (
        <button
          aria-label="Show Meaning"
          className="focus-visible:ring-ring absolute h-full w-full cursor-pointer rounded-[inherit] focus-visible:outline-0"
          onClick={() => {
            setShowMeaning(!showMeaning);
          }}
        ></button>
      )}
      <FlashcardLevel className="absolute top-5" level={word.jlpt} />
      <h2
        className={cn(
          'relative mt-5 text-3xl font-bold break-keep sm:text-5xl',
          jpFontClass
        )}
      >
        {word.furigana && showFurigana && (
          <span
            className={cn(
              'text-foreground-secondary absolute right-0 bottom-full left-0 text-lg font-bold sm:pb-1.5 sm:text-xl',
              jpFontClass
            )}
          >
            {word.furigana}
          </span>
        )}
        {word.jp}
      </h2>
      {showRomaji && (
        <p className="text-foreground-tertiary text-sm sm:mt-2 sm:text-base">
          {word.romaji}
        </p>
      )}
      <p
        className={cn(
          'text-foreground-secondary mt-3 font-medium transition-all duration-300 ease-out sm:mt-5 sm:text-xl',
          !alwaysShowMeaning && !showMeaning
            ? 'pointer-events-none translate-y-2 opacity-0'
            : 'translate-y-0 opacity-100'
        )}
      >
        <a
          className="focus-visible:focus-ring flex items-center gap-2 rounded-full px-4 py-1 transition-colors hover:bg-neutral-50"
          href={`https://jisho.org/search/${encodeURIComponent(word.jp)}`}
          target="_blank"
        >
          {word.en}
          <IconBook size={20} className="text-foreground-tertiary" />
        </a>
      </p>
      <div
        className={cn(
          'absolute bottom-4 flex justify-center',
          !isKnown &&
            'pointer-events-none translate-y-2 opacity-0 transition-all duration-300',
          'group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100'
        )}
      >
        <ToggleButton
          color="matcha"
          pressed={isKnown}
          onClick={() => toggleIsKnown(isKnown)}
        >
          <IconLeaf />
          {isKnown ? 'Known' : 'I know this'}
        </ToggleButton>
      </div>
    </div>
  );
};
