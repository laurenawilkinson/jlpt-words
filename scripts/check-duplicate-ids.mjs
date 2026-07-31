// Usage: node check-duplicate-ids.mjs file1.json file2.json file3.json ...

import fs from 'fs';
import path from 'path';

const filePaths = process.argv.slice(2);

if (filePaths.length === 0) {
  console.error(
    'Usage: node check-duplicate-ids.mjs <file1.json> <file2.json> ...'
  );
  process.exit(1);
}

// Map of id -> array of { file, index, entry } locations where it was seen
const idLocations = new Map();

for (const filePath of filePaths) {
  let data;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to read/parse ${filePath}: ${err.message}`);
    process.exit(1);
  }

  if (!Array.isArray(data)) {
    console.error(`Expected ${filePath} to contain an array of entries.`);
    process.exit(1);
  }

  data.forEach((entry, index) => {
    if (!entry.id) {
      console.warn(
        `Warning: entry at ${filePath}[${index}] (jp: ${entry.jp ?? '?'}) has no id.`
      );
      return;
    }

    if (!idLocations.has(entry.id)) {
      idLocations.set(entry.id, []);
    }
    idLocations.get(entry.id).push({
      file: path.basename(filePath),
      index,
      jp: entry.jp,
    });
  });
}

// Find any id that appeared more than once
const duplicates = [...idLocations.entries()].filter(
  ([, locations]) => locations.length > 1
);

if (duplicates.length === 0) {
  console.log(`✅ No duplicate ids found across ${filePaths.length} file(s).`);
  process.exit(0);
}

console.log(`❌ Found ${duplicates.length} duplicate id(s):\n`);

for (const [id, locations] of duplicates) {
  console.log(`id: ${id}`);
  for (const loc of locations) {
    console.log(`  - ${loc.file}[${loc.index}] (jp: ${loc.jp ?? '?'})`);
  }
  console.log('');
}

process.exitCode = 1;
