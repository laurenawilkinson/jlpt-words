import { cpSync, mkdirSync } from 'fs';

mkdirSync('dist-extension', { recursive: true });

// Data
cpSync('public/data', 'dist-extension/data', { recursive: true });

// Images
cpSync('public/images', 'dist-extension/images', { recursive: true });

// Icons
cpSync('public/icon-16.png', 'dist-extension/icon-16.png');
cpSync('public/icon-32.png', 'dist-extension/icon-32.png');
cpSync('extension/icon-48.png', 'dist-extension/icon-48.png');
cpSync('extension/icon-128.png', 'dist-extension/icon-128.png');

// Manifest
cpSync('extension/manifest.json', 'dist-extension/manifest.json');
