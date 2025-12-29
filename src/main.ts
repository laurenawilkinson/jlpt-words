import renderFlashcard from './components/flashcard';
import './style.css';
import type { JlptLevel, JlptWord, Word } from './types';
import { getWordsForDate, transformWords } from './utils/words';

const loadWordsForLevel = async (level: JlptLevel): Promise<Word[]> => {
  const res = await fetch(`/data/${level}.json`);
  if (!res.ok) throw new Error(`Failed to load ${level} words`);
  const data: JlptWord[] = await res.json();
  return transformWords(level, data);
};

const displayDate = () => {
  const el = document.getElementById('todaysDate');
  if (!el) return;

  el.innerText = '29 December 2025';
};

displayDate();

const displayFlashcards = async () => {
  const el = document.getElementById('flashcards');
  if (!el) return;

  const words = await loadWordsForLevel('N5');
  const todaysWords = getWordsForDate(words, 3);

  for (const word of todaysWords) {
    el.appendChild(
      renderFlashcard({
        jlpt: word.jlpt,
        vocab: word.jp,
        furigana: word.furigana,
        meaning: word.en,
        romaji: word.romaji,
      })
    );
  }
};

displayFlashcards();
