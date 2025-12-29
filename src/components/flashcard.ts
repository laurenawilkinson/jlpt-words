import IconBook from '../assets/icons/book.svg?raw';
import type { JlptLevel } from '../types';
import renderIcon from './icon';
import renderJlptLevel from './jlptLevel';

interface FlashcardProps {
  jlpt: JlptLevel;
  vocab: string;
  furigana?: string;
  meaning: string;
  romaji: string;
}

const renderFlashcard = ({
  jlpt,
  vocab,
  furigana,
  meaning,
  romaji,
}: FlashcardProps): HTMLElement => {
  const el = document.createElement('div');
  el.className =
    'relative flex flex-col justify-center items-center rounded-4xl border border-gray-300 sm:min-w-80 max-w-sm w-full sm:flex-1 h-96';

  const jlptEl = renderJlptLevel({ level: jlpt });
  jlptEl.classList.add('absolute', 'top-5');

  const furiganaEl = document.createElement('span');
  furiganaEl.className = 'font-bold text-xl';
  furiganaEl.textContent = furigana || '';

  const vocabEl = document.createElement('h2');
  vocabEl.className = 'font-bold text-6xl';
  vocabEl.textContent = vocab;

  const romajiEl = document.createElement('span');
  romajiEl.className = 'font-bold text-xl opacity-60';
  romajiEl.textContent = romaji;

  const linkEl = document.createElement('a');
  linkEl.className =
    'absolute bottom-5 font-semibold flex gap-1.5 items-center opacity-50';
  linkEl.href = `https://jisho.org/search/${encodeURIComponent(vocab)}`;
  linkEl.target = '_blank';
  const linkIconEl = renderIcon({ raw: IconBook, size: 24 });
  linkEl.append(linkIconEl, 'Dictionary');

  const nodes = [
    jlptEl,
    ...(furigana ? [furiganaEl] : []),
    vocabEl,
    romajiEl,
    linkEl,
  ];

  el.append(...nodes);

  return el;
};

export default renderFlashcard;
