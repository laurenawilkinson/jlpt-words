import { IconBook } from '@tabler/icons-preact';
import type { Word } from '@/types';
import { FlashcardLevel } from './FlashcardLevel';
import IconButton from './UI/IconButton';

interface FlashcardProps {
  word: Word;
  showFurigana: boolean;
  showRomaji: boolean;
}

export const Flashcard = ({
  word,
  showFurigana,
  showRomaji,
}: FlashcardProps) => {
  return (
    <div
      className="bg-surface relative flex h-96 w-full max-w-sm flex-col items-center justify-center rounded-3xl shadow sm:min-w-80 sm:flex-1"
      style={{
        '--tw-shadow':
          '0 10px 30px var(--tw-shadow-color, rgba(180,160,170,0.08))',
        '--tw-shadow-color': 'rgba(236,72,153,0.08)',
      }}
    >
      <FlashcardLevel className="absolute top-5" level={word.jlpt} />
      {word.furigana && showFurigana && (
        <span className="text-xl font-bold">{word.furigana}</span>
      )}
      <h2 className="text-6xl font-bold">{word.jp}</h2>
      {showRomaji && <span>{word.romaji}</span>}
      <div className="absolute bottom-0 flex w-full justify-center p-6">
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
