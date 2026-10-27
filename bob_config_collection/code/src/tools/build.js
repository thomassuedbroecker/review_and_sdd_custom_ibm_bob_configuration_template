#!/usr/bin/env node
'use strict';

// Prepares bob_config_collection/code for `vsce package`:
//   - copies ../modes, ../skills and the install layout into dist/collection/
//     (the offline "bundled" source of the extension)
//   - copies the repository LICENSE next to package.json (required by vsce)
// Fails if the collection does not load cleanly.

const fs = require('fs');
const path = require('path');
const { loadCatalog, LAYOUT_PATH } = require('../lib/catalog');

const codeDir = path.resolve(__dirname, '..', '..');
const collectionDir = path.resolve(codeDir, '..');
const distCollection = path.join(codeDir, 'dist', 'collection');
const SKIP = new Set(['__pycache__', '.DS_Store']);

const catalog = loadCatalog(collectionDir);
const problems = [];
for (const g of catalog.groups) for (const m of g.modes) {
  for (const s of m.missingSkills) problems.push(`mode ${m.slug} references missing skill ${s}`);
}
for (const s of catalog.skills) if (!s.hasSkillFile) problems.push(`skill ${s.id} has no SKILL.md`);
if (problems.length) {
  console.error(`Collection is not consistent:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}

fs.rmSync(distCollection, { recursive: true, force: true });
const filter = (src) => !SKIP.has(path.basename(src));
for (const dir of ['modes', 'skills']) {
  fs.cpSync(path.join(collectionDir, dir), path.join(distCollection, dir), { recursive: true, filter });
}
const layoutDest = path.join(distCollection, ...LAYOUT_PATH.split('/'));
fs.mkdirSync(path.dirname(layoutDest), { recursive: true });
fs.copyFileSync(path.join(codeDir, 'src', 'config', 'install-layout.json'), layoutDest);

const license = path.resolve(collectionDir, '..', 'LICENSE');
if (!fs.existsSync(license)) {
  console.error(`LICENSE not found at ${license}`);
  process.exit(1);
}
fs.copyFileSync(license, path.join(codeDir, 'LICENSE'));

const modeCount = catalog.groups.reduce((n, g) => n + g.modes.length, 0);
console.log(`Bundled ${modeCount} modes in ${catalog.groups.length} group(s) and ${catalog.skills.length} skills into ${path.relative(codeDir, distCollection)}/`);
