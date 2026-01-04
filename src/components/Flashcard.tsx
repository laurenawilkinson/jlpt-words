import { IconBook } from '@tabler/icons-preact';
import type { Word } from '@/types';
import { FlashcardLevel } from './FlashcardLevel';

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
    <div className="border-soft bg-surface relative flex h-96 w-full max-w-sm flex-col items-center justify-center rounded-3xl sm:min-w-80 sm:flex-1">
      <FlashcardLevel className="absolute top-5" level={word.jlpt} />
      {word.furigana && showFurigana && (
        <span className="text-xl font-bold">{word.furigana}</span>
      )}
      <h2 className="text-6xl font-bold">{word.jp}</h2>
      {showRomaji && <span>{word.romaji}</span>}
      <a
        className="absolute bottom-5 flex items-center gap-1.5 font-semibold opacity-50"
        href={`https://jisho.org/search/${encodeURIComponent(word.jp)}`}
        target="_blank"
      >
        <IconBook />
        Dictionary
      </a>
    </div>
  );
};
