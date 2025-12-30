import renderIcon from './components/icon';
import './style.css';
import IconSettings from './assets/icons/settings.svg?raw';
import { getWordsForDate, loadWordsForLevel } from './utils/words';
import { getSettings } from './utils/settings';
import type { Word } from './types';
import renderFlashcards from './components/flashcards';

// Global state
let settings = getSettings();
let todaysWords: Word[] = [];

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

const refreshWords = async () => {
  const wordArrays = await Promise.all(
    settings.jlptLevels.map(loadWordsForLevel)
  );

  todaysWords = getWordsForDate(wordArrays.flat(), settings.words);

  renderFlashcards({ words: todaysWords, settings });
};

refreshWords();
