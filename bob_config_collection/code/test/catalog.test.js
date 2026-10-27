'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { loadCatalog, parseModeFile, findSkillRefs, describeSkill, loadLayout } = require('../src/lib/catalog');

const COLLECTION = path.resolve(__dirname, '..', '..');

test('parseModeFile extracts slug, name, description and the list-item block', () => {
  const mode = parseModeFile('customModes:\n  - slug: demo\n    name: 🧪 Demo\n    description: A demo mode\n    groups:\n      - read\n\n');
  assert.equal(mode.slug, 'demo');
  assert.equal(mode.name, '🧪 Demo');
  assert.equal(mode.description, 'A demo mode');
  assert.deepEqual(mode.block, ['  - slug: demo', '    name: 🧪 Demo', '    description: A demo mode', '    groups:', '      - read']);
});

test('parseModeFile rejects files without exactly one mode', () => {
  assert.throws(() => parseModeFile('modes:\n  - slug: x\n'), /customModes/);
  assert.throws(() => parseModeFile('customModes:\n  - slug: a\n  - slug: b\n'), /more than one mode/);
});

test('findSkillRefs ignores wildcard references', () => {
  const refs = findSkillRefs('read SKILLS/sdd-a/SKILL.md and SKILLS/sdd-*/SKILL.md and SKILLS/sdd-b/', loadLayout());
  assert.deepEqual(refs, ['sdd-a', 'sdd-b']);
});

test('describeSkill prefers frontmatter, then the Purpose section', () => {
  assert.equal(describeSkill('---\nname: x\ndescription: From frontmatter\n---\n# X'), 'From frontmatter');
  assert.equal(describeSkill('# X\n\n## Purpose\nFrom purpose.\n'), 'From purpose.');
});

test('the real collection is consistent', () => {
  const catalog = loadCatalog(COLLECTION);
  assert.ok(catalog.groups.length >= 1, 'at least one mode group');
  const slugs = catalog.groups.flatMap((g) => g.modes.map((m) => m.slug));
  assert.equal(new Set(slugs).size, slugs.length, 'mode slugs are unique');
  for (const skill of catalog.skills) assert.ok(skill.hasSkillFile, `${skill.id} has SKILL.md`);
  for (const g of catalog.groups) {
    for (const m of g.modes) {
      assert.equal(m.file, `${m.slug}-mode.yaml`, `${m.file} is named after its slug`);
      assert.deepEqual(m.missingSkills, [], `${m.slug} references only existing skills`);
    }
  }
});
