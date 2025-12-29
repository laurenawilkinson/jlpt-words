export type JLPT = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type Word = {
  jp: string;
  reading: string;
  romaji: string;
  en: string;
  jlpt: JLPT;
};
