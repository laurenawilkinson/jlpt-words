import renderFlashcard from './components/flashcard';
import './style.css';
import type { Word } from './types';
import { getWordsForDate } from './utils/words';

const loadWords = async (): Promise<Word[]> => {
  const res = await fetch('/data/words.json');
  if (!res.ok) throw new Error('Failed to load words');
  const data: Word[] = await res.json();
  return data;
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

  const words = await loadWords();
  const todaysWords = getWordsForDate(words, 3);

  for (const word of todaysWords) {
    el.appendChild(
      renderFlashcard({
        jlptLevel: word.jlpt,
        kanji: word.jp,
        reading: word.reading,
        meaning: word.en,
        romaji: word.romaji,
      })
    );
  }
};

displayFlashcards();
