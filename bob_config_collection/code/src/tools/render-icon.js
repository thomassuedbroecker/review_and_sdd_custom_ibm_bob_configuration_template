#!/usr/bin/env node
'use strict';

// Renders images/icon.svg to the 256x256 PNG required by the VS Code Marketplace
// (vsce rejects SVG icons). Run after editing the SVG: npm run icon
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', '..', 'images');

sharp(path.join(imagesDir, 'icon.svg'), { density: 288 })
  .resize(256, 256)
  .png()
  .toFile(path.join(imagesDir, 'icon.png'))
  .then((info) => console.log(`icon.png written (${info.width}x${info.height}, ${info.size} bytes)`))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
