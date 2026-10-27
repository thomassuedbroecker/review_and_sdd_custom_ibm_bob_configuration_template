'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { loadCatalog } = require('../src/lib/catalog');
const { modeDocumentation, skillDocumentation, readValue, readList } = require('../src/lib/docs');

const COLLECTION = path.resolve(__dirname, '..', '..');

const BLOCK = [
  '  - slug: demo',
  '    name: Demo',
  '    whenToUse: >-',
  '      First line',
  '      continues here.',
  '',
  '      Second paragraph.',
  '    groups:',
  '      - read',
  '      - edit',
  '    customInstructions: plain value',
];

test('readValue unfolds folded blocks and reads plain scalars', () => {
  assert.equal(readValue(BLOCK, 'whenToUse'), 'First line continues here.\n\nSecond paragraph.');
  assert.equal(readValue(BLOCK, 'customInstructions'), 'plain value');
  assert.equal(readValue(BLOCK, 'missing'), '');
});

test('readList reads the tool groups', () => {
  assert.deepEqual(readList(BLOCK, 'groups'), ['read', 'edit']);
});

test('every mode in the collection has documentation with skills and the installed definition', () => {
  const catalog = loadCatalog(COLLECTION);
  for (const mode of catalog.groups.flatMap((g) => g.modes)) {
    const doc = modeDocumentation(catalog, mode);
    assert.match(doc, new RegExp(`Mode \`${mode.slug}\``));
    assert.match(doc, /## When to use\n\n\S/, `${mode.slug} has a when-to-use text`);
    for (const skill of mode.skills) assert.ok(doc.includes(`**${skill}**`), `${mode.slug} lists ${skill}`);
    const yaml = doc.slice(doc.indexOf('```yaml'));
    assert.doesNotMatch(yaml, /SKILLS\//, `${mode.slug} shows workspace paths, not collection paths`);
  }
});

test('mode documentation includes an existing <slug>-mode.md', () => {
  const catalog = loadCatalog(COLLECTION);
  const mode = catalog.groups.flatMap((g) => g.modes).find((m) => m.slug === 'github-issue-generator');
  assert.match(modeDocumentation(catalog, mode), /## Additional documentation/);
});

test('every skill has documentation with its SKILL.md content and users', () => {
  const catalog = loadCatalog(COLLECTION);
  for (const skill of catalog.skills) {
    const doc = skillDocumentation(catalog, skill);
    assert.match(doc, new RegExp(`# Skill: ${skill.id}`));
    assert.match(doc, /## SKILL\.md\n\n(?!_SKILL\.md is missing)/);
    if (skill.files.includes('README.md')) assert.match(doc, /## README\.md/);
  }
  const security = skillDocumentation(catalog, catalog.skillById.get('sdd-security-threat-modeling'));
  assert.match(security, /used by .*`security-review`/);
});
