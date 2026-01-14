import type { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void,
  options?: { ignoreSelectors?: string[] }
) {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current) return;

      const path = event.composedPath();

      // If any node in the event path equals or is contained by the ref, it's an inside click.
      for (const node of path) {
        if (node === ref.current) return;
      }

      // If ignored selectors were provided, treat clicks matching them (or their children) as inside.
      const ignoredSelectors = options?.ignoreSelectors || [];
      for (const selector of ignoredSelectors) {
        for (const node of path) {
          if (node instanceof Element && node.matches(selector)) return;
        }
      }

      onOutsideClick();
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onOutsideClick, options]);
}
