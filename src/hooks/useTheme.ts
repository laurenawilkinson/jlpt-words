import type { AppTheme } from '@/types';
import { useEffect } from 'preact/hooks';

export function useTheme(theme: AppTheme) {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const resolvedTheme =
        theme === 'system'
          ? media.matches
            ? 'tokyo-nights'
            : 'sakura'
          : theme;

      root.dataset.theme = resolvedTheme;
    };

    applyTheme();

    if (theme === 'system') {
      media.addEventListener('change', applyTheme);

      return () => {
        media.removeEventListener('change', applyTheme);
      };
    }
  }, [theme]);
}
