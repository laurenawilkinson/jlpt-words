import { IconBook } from '@tabler/icons-preact';
import type { Settings, Word } from '@/types';
import { FlashcardLevel } from './FlashcardLevel';
import IconButton from './UI/IconButton';
import { useState } from 'preact/hooks';
import { cn } from '@/utils/cn';

interface FlashcardProps {
  word: Word;
  showFurigana: boolean;
  showRomaji: boolean;
  showMeaning: boolean;
  jpFont: Settings['jpFont'];
}

export const Flashcard = ({
  word,
  showFurigana,
  showRomaji,
  showMeaning: alwaysShowMeaning,
  jpFont,
}: FlashcardProps) => {
  const [showMeaning, setShowMeaning] = useState(false);
  const jpFontClass = {
    'font-jp-sans': jpFont === 'sans',
    'font-jp-serif': jpFont === 'serif',
  };

  return (
    <div
      className={cn(
        'bg-surface shadow-flashcard relative flex h-64 w-full max-w-sm flex-col items-center justify-center rounded-3xl p-4 sm:h-96 sm:min-w-80 sm:flex-1',
        {
          'hover:shadow-flashcard-lg transition-all hover:-translate-y-0.5':
            !alwaysShowMeaning,
        }
      )}
    >
      {!alwaysShowMeaning && (
        <button
          aria-label="Show Meaning"
          className="absolute h-full w-full cursor-pointer rounded-3xl focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-0"
          onClick={() => {
            setShowMeaning(!showMeaning);
          }}
        ></button>
      )}
      <FlashcardLevel className="absolute top-5" level={word.jlpt} />
      {word.furigana && showFurigana && (
        <p className={cn('text-xl font-bold', jpFontClass)}>{word.furigana}</p>
      )}
      <h2
        className={cn('text-3xl font-bold break-keep sm:text-5xl', jpFontClass)}
      >
        {word.jp}
      </h2>
      {showRomaji && <p>{word.romaji}</p>}
      <p
        className={cn(
          'mt-2 text-xl font-bold text-rose-400 transition-opacity',
          !alwaysShowMeaning && !showMeaning && 'opacity-0'
        )}
      >
        {word.en}
      </p>
      <div className="absolute bottom-0 flex w-full justify-center p-4 sm:p-6">
        <IconButton
          as="a"
          aria-label="Dictionary"
          href={`https://jisho.org/search/${encodeURIComponent(word.jp)}`}
          target="_blank"
        >
          <IconBook />
        </IconButton>
      </div>
    </div>
  );
};
