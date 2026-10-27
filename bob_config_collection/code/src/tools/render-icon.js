#!/usr/bin/env node
'use strict';

// Renders both icon variants from their SVG sources.
//
// images/icon.svg       → images/icon.png
//   Transparent background, opaque black paths.
//   Used by the VS Code activity bar (masked and tinted by the theme).
//   Also referenced by package.json "icon" field for the marketplace tile,
//   but icon-color.png is the better choice there (set via galleryBanner).
//
// images/icon-color.svg → images/icon-color.png
//   Coloured version with teal gradient background.
//   Used in the extension README and the marketplace gallery tile.
//
// Run after editing either SVG: npm run icon

const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', '..', 'images');

async function render(src, dest, label) {
  const info = await sharp(path.join(imagesDir, src), { density: 288 })
    .resize(256, 256)
    .png()
    .toFile(path.join(imagesDir, dest));
  console.log(`${label}: ${dest} written (${info.width}x${info.height}, ${info.size} bytes)`);
}

render('icon.svg', 'icon.png', 'activity-bar mask')
  .then(() => render('icon-color.svg', 'icon-color.png', 'colour marketplace'))
  .catch((err) => { console.error(err.message); process.exit(1); });
