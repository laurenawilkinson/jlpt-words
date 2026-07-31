// Usage: node add-ids.mjs data.json

import fs from 'fs';
import crypto from 'crypto';

const [, , filePath] = process.argv;

if (!filePath) {
  console.error('Usage: node add-ids.mjs <file.json>');
  process.exit(1);
}

function generateId() {
  return crypto.randomUUID();
}

const raw = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(raw);

if (!Array.isArray(data)) {
  console.error('Expected the JSON to be an array of entries.');
  process.exit(1);
}

let addedCount = 0;

const withIds = data.map((entry) => {
  if (entry.id) {
    return entry; // already has an id, leave it untouched
  }
  addedCount += 1;
  return { id: generateId(), ...entry };
});

fs.writeFileSync(filePath, JSON.stringify(withIds, null, 2), 'utf-8');

console.log(
  `Added ids to ${addedCount} new entr${addedCount === 1 ? 'y' : 'ies'} ` +
    `(${withIds.length - addedCount} already had one). Wrote result to ${filePath}`
);
