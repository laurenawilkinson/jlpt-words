import type { Settings, Word } from '../types';
import renderFlashcard from './flashcard';

interface FlashcardsProps {
  words: Word[];
  settings: Settings;
}

const renderFlashcards = ({ words, settings }: FlashcardsProps) => {
  const container = document.getElementById('flashcards');
  if (!container) return;

  container.replaceChildren(
    ...words.map((word) => renderFlashcard({ word, settings }))
  );
};

export default renderFlashcards;
