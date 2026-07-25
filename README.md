# ⛩️ Tango Tab: Daily Japanese Words

A new tab with daily Japanese flashcards, based on your JLPT level.

Available on Chrome, Firefox, Edge and direct on <a href="https://tango.astralux.dev">our website</a>.

## Features

### Flashcards

- Choose the amount of flashcards you want to see each day.
- Optionally display furigana, romaji, or both.
- Reveal the meaning by clicking the card, or turn on always-visible mode.
- Select from a variety of fonts to display Japanese: Sans-serif, serif or cute.

### Vocabulary

- Select one or more JLPT levels to see vocabulary tailored to those levels.
- A new set of words is picked each day. You'll see the same words no matter how many times you open a new tab, and everyone gets the same set that day.

## Local Setup

### Development

```bash
bun install
bun run dev
```

Runs the website locally with hot reload.

### Build

```bash
# Website build
bun run build

# Browser extension build
bun run build:extension
```

To test the extension build locally:

**Chrome** — go to `chrome://extensions`, enable Developer mode, click "Load unpacked", and select the `dist-extension` folder.

**Firefox** — go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select `dist-extension/manifest.json`.

## Sources

Vocabulary by JLPT level: [Tanos JLPT lists](https://www.tanos.co.uk/jlpt/)
Images: [Magnific on Flaticon](https://www.flaticon.com/free-icons/japan)
