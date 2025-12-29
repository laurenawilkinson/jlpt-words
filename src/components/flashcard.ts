import type { JLPT } from '../types';
import renderJlptLevel from './jlptLevel';

interface FlashcardProps {
  jlptLevel: JLPT;
  kanji: string;
  reading: string;
  meaning: string;
  romaji: string;
}

const renderFlashcard = ({
  jlptLevel,
  kanji,
  reading,
  meaning,
  romaji,
}: FlashcardProps): HTMLElement => {
  const el = document.createElement('div');
  el.className =
    'relative flex flex-col justify-center items-center rounded-4xl border sm:min-w-80 max-w-sm w-full sm:flex-1 h-96';

  const jlptEl = renderJlptLevel({ level: jlptLevel });
  jlptEl.classList.add('absolute', 'top-5');

  const readingEl = document.createElement('span');
  readingEl.className = 'font-bold text-xl';
  readingEl.textContent = reading;

  const kanjiEl = document.createElement('h2');
  kanjiEl.className = 'font-bold text-6xl';
  kanjiEl.textContent = kanji;

  const romajiEl = document.createElement('span');
  romajiEl.className = 'font-bold text-xl';
  romajiEl.textContent = romaji;

  const linkEl = document.createElement('a');
  linkEl.className = 'absolute bottom-5 font-semibold';
  linkEl.href = `https://jisho.org/search/${encodeURIComponent(kanji)}`;
  linkEl.textContent = 'Dictionary';
  linkEl.target = '_blank';

  el.append(jlptEl, readingEl, kanjiEl, romajiEl, linkEl);

  return el;
};

export default renderFlashcard;
