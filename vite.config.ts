import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  base: './',
  publicDir: mode === 'extension' ? false : 'public',
  build: {
    outDir: mode === 'extension' ? 'dist-extension' : 'dist',
  },
  plugins: [
    preact(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: 'strip-web-only-head-tags',
      transformIndexHtml(html) {
        if (mode !== 'extension') return html;
        return html.replace(
          /\s*<link rel="(apple-touch-icon|manifest)"[^>]*>\n?/g,
          ''
        );
      },
    },
  ],
}));
