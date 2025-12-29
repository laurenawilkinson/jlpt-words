import renderFlashcard from './components/flashcard';
import renderIcon from './components/icon';
import './style.css';
import IconSettings from './assets/icons/settings.svg?raw';
import { getWordsForDate, loadWordsForLevel } from './utils/words';
import { getSettings } from './utils/settings';

const settings = getSettings();

const displayDate = () => {
  const el = document.getElementById('todaysDate');
  if (!el) return;

  el.innerText = '29 December 2025';
};

displayDate();

const configureSettingsButton = () => {
  const settingsBtnEl = document.getElementById('settingsBtn');
  if (!settingsBtnEl) return;

  const iconEl = renderIcon({ raw: IconSettings, size: 24 });
  settingsBtnEl.append(iconEl);
};

configureSettingsButton();

const displayFlashcards = async () => {
  const el = document.getElementById('flashcards');
  if (!el) return;

  const words = await Promise.all(
    settings.jlptLevels.map((jlpt) => loadWordsForLevel(jlpt))
  );
  const todaysWords = getWordsForDate(
    words.flatMap((wordArr) => wordArr),
    settings.words
  );

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
