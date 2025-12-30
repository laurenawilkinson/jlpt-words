import IconBook from '../assets/icons/book.svg?raw';
import type { Settings, Word } from '../types';
import renderIcon from './icon';
import renderJlptLevel from './jlptLevel';

interface FlashcardProps {
  word: Word;
  settings: Settings;
}

const renderFlashcard = ({ word, settings }: FlashcardProps): HTMLElement => {
  const el = document.createElement('div');
  el.className =
    'relative flex flex-col justify-center items-center rounded-4xl border border-gray-300 sm:min-w-80 max-w-sm w-full sm:flex-1 h-96';

  const jlptEl = renderJlptLevel({ level: word.jlpt });
  jlptEl.classList.add('absolute', 'top-5');

  const furiganaEl = document.createElement('span');
  furiganaEl.className = 'font-bold text-xl';
  furiganaEl.textContent = word.furigana || '';
  const showFurigana = word.furigana && settings.showFurigana;

  const vocabEl = document.createElement('h2');
  vocabEl.className = 'font-bold text-6xl';
  vocabEl.textContent = word.jp;

  const romajiEl = document.createElement('span');
  romajiEl.className = 'font-bold text-xl opacity-60';
  romajiEl.textContent = word.romaji;
  const showRomaji = settings.showRomaji;

  const linkEl = document.createElement('a');
  linkEl.className =
    'absolute bottom-5 font-semibold flex gap-1.5 items-center opacity-50';
  linkEl.href = `https://jisho.org/search/${encodeURIComponent(word.jp)}`;
  linkEl.target = '_blank';
  const linkIconEl = renderIcon({ raw: IconBook, size: 24 });
  linkEl.append(linkIconEl, 'Dictionary');

  const nodes = [
    jlptEl,
    ...(showFurigana ? [furiganaEl] : []),
    vocabEl,
    ...(showRomaji ? [romajiEl] : []),
    linkEl,
  ];

  el.append(...nodes);

  return el;
};

export default renderFlashcard;
