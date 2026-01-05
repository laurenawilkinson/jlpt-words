export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type JlptWord = {
  jp: string;
  en: string;
  furigana?: string;
};

export type Word = {
  jp: string;
  furigana?: string;
  romaji: string;
  en: string;
  jlpt: JlptLevel;
};

export type Settings = {
  words: number;
  showFurigana: boolean;
  showRomaji: boolean;
  showMeaning: boolean;
  jlptLevels: JlptLevel[];
};
