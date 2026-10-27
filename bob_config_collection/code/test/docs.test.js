'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { loadCatalog } = require('../src/lib/catalog');
const { modeDocumentation, modeDocuments, skillDocumentation, readValue, readList } = require('../src/lib/docs');

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

test('every mode is listed in its group README and its reference files exist', () => {
  const fs = require('fs');
  const catalog = loadCatalog(COLLECTION);
  for (const group of catalog.groups) {
    const readme = fs.readFileSync(path.join(group.dir, 'README.md'), 'utf8');
    for (const mode of group.modes) {
      const name = mode.name.replace(/^\S+\s/, '');
      assert.ok(readme.includes(name), `${group.id}/README.md lists ${mode.slug} (${name})`);
      assert.ok(readme.includes(`${group.modes.length} Custom Modes`), `${group.id}/README.md states the mode count`);
      for (const ref of mode.text.match(/Modes\/SDD\/references\/[A-Za-z0-9_.-]+\.md/g) || []) {
        assert.ok(fs.existsSync(path.join(group.dir, ref.replace('Modes/SDD/', ''))), `${mode.slug} references existing ${ref}`);
      }
    }
  }
});

test('license-impact-analysis documentation includes its mode guide and installed reference paths', () => {
  const catalog = loadCatalog(COLLECTION);
  const mode = catalog.groups.flatMap((g) => g.modes).find((m) => m.slug === 'license-impact-analysis');
  const doc = modeDocumentation(catalog, mode);
  assert.match(doc, /## Additional documentation/);
  assert.match(doc, /\.bob\/documentation\/review_sdd\/references\/impact-reference\.md/);
});

test('every mode lists readable documentation files that exist', () => {
  const fs = require('fs');
  const catalog = loadCatalog(COLLECTION);
  for (const group of catalog.groups) {
    for (const mode of group.modes) {
      const docs = modeDocuments(catalog, mode);
      assert.ok(docs.some((d) => d.kind === 'overview'), `${mode.slug} links the group overview`);
      for (const d of docs) assert.ok(fs.existsSync(path.join(group.dir, d.rel)), `${mode.slug}: ${d.rel} exists`);
      assert.match(modeDocumentation(catalog, mode), /## Related documentation/);
    }
  }
});

test('license-impact-analysis links its mode guide and the three reference files', () => {
  const catalog = loadCatalog(COLLECTION);
  const mode = catalog.groups.flatMap((g) => g.modes).find((m) => m.slug === 'license-impact-analysis');
  const rels = modeDocuments(catalog, mode).map((d) => d.rel);
  for (const rel of ['license-impact-analysis-mode.md', 'references/impact-reference.md',
    'references/ai-generated-code-reference.md', 'references/jurisdiction-impact-reference.md']) {
    assert.ok(rels.includes(rel), `links ${rel}`);
  }
  assert.match(modeDocumentation(catalog, mode), /\]\(file:\/\/[^)]*impact-reference\.md\)/);
});
