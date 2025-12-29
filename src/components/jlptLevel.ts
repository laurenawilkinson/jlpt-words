import type { JlptLevel } from '../types';

interface JlptLevelProps {
  level: JlptLevel;
}

const renderJlptLevel = ({ level }: JlptLevelProps) => {
  const backgroundColors: Record<JlptLevel, string> = {
    N1: 'bg-red-400',
    N2: 'bg-orange-400',
    N3: 'bg-yellow-400',
    N4: 'bg-lime-400',
    N5: 'bg-green-400',
  };
  const el = document.createElement('span');
  el.className = `rounded-xl px-3 py-1 font-semibold tracking-wide ${backgroundColors[level]}`;
  el.textContent = level;

  return el;
};

export default renderJlptLevel;
