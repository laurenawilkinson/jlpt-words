import type { JlptLevel } from '@/types';

export const JLPT_LEVELS: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

export const JLPT_LEVEL_VAR: Record<JlptLevel, string> = {
  N5: 'var(--jlpt-n5)',
  N4: 'var(--jlpt-n4)',
  N3: 'var(--jlpt-n3)',
  N2: 'var(--jlpt-n2)',
  N1: 'var(--jlpt-n1)',
};
