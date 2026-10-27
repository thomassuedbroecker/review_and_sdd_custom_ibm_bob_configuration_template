'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { loadCatalog, loadLayout } = require('../src/lib/catalog');
const install = require('../src/lib/install');

const COLLECTION = path.resolve(__dirname, '..', '..');

function tmpWorkspace() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'bob-ws-'));
}

const block = (slug, extra = 'x') => [`  - slug: ${slug}`, `    name: ${extra}`];

test('rewritePaths maps collection paths to the .bob workspace layout', () => {
  const layout = loadLayout();
  const text = [
    'read SKILLS/sdd-a/SKILL.md',
    'run Modes/SDD/references/scripts/run_issue_creator.sh',
    'see Modes/SDD/knowledge-sources.md',
    'config Modes/SDD/references/mcp/mcp.json',
    'modes in Modes/SDD/',
  ].join('\n');
  assert.equal(install.rewritePaths(text, layout, 'review_sdd'), [
    'read .bob/skills/sdd-a/SKILL.md',
    'run .bob/scripts/run_issue_creator.sh',
    'see .bob/documentation/KNOWLEDGE_SOURCES.md',
    'config .bob/mcp.json',
    'modes in .bob/',
  ].join('\n'));
});

test('upsertModes creates a file from scratch', () => {
  const r = install.upsertModes('', [{ slug: 'a', block: block('a') }]);
  assert.equal(r.text, 'customModes:\n  - slug: a\n    name: x\n');
  assert.deepEqual(r.added, ['a']);
});

test('upsertModes replaces in place, keeps other modes and order, appends new ones', () => {
  const existing = '# my modes\ncustomModes:\n  - slug: a\n    name: old\n\n  - slug: mine\n    name: keep\n';
  const r = install.upsertModes(existing, [{ slug: 'a', block: block('a', 'new') }, { slug: 'b', block: block('b') }]);
  assert.equal(r.text, '# my modes\ncustomModes:\n  - slug: a\n    name: new\n\n  - slug: mine\n    name: keep\n\n  - slug: b\n    name: x\n');
  assert.deepEqual(r.updated, ['a']);
  assert.deepEqual(r.added, ['b']);
});

test('upsertModes re-indents for files that use unindented list items and keeps footers', () => {
  const existing = 'customModes:\n- slug: a\n  name: old\nother: value\n';
  const r = install.upsertModes(existing, [{ slug: 'a', block: block('a', 'new') }]);
  assert.equal(r.text, 'customModes:\n- slug: a\n  name: new\nother: value\n');
});

test('upsertModes accepts an empty list and rejects foreign files', () => {
  assert.equal(install.upsertModes('customModes: []\n', [{ slug: 'a', block: block('a') }]).text, 'customModes:\n  - slug: a\n    name: x\n');
  assert.throws(() => install.upsertModes('foo: bar\n', []), /customModes/);
});

test('mergeMcp adds collection servers and keeps the user\'s other servers', () => {
  const merged = JSON.parse(install.mergeMcp(
    JSON.stringify({ mcpServers: { mine: { command: 'a' }, github: { command: 'old' } } }),
    JSON.stringify({ mcpServers: { github: { command: 'new' } } })));
  assert.deepEqual(merged.mcpServers, { mine: { command: 'a' }, github: { command: 'new' } });
  assert.deepEqual(JSON.parse(install.mergeMcp(undefined, '{"mcpServers":{"x":{}}}')).mcpServers, { x: {} });
});

test('installing modes, referenced skills and support files into an empty workspace', () => {
  const catalog = loadCatalog(COLLECTION);
  const ws = tmpWorkspace();
  const slugs = ['security-review', 'github-issue-generator'];
  const skills = install.skillsForModes(catalog, slugs);
  assert.ok(skills.includes('sdd-security-threat-modeling'));
  const plan = [
    ...install.planModes(catalog, ws, slugs),
    ...install.planSkills(catalog, ws, skills),
    ...install.planSupport(catalog, ws, 'review_sdd', ['scripts', 'mcp']),
  ];
  assert.ok(plan.every((p) => p.status === 'new'));
  install.applyPlan(ws, plan);

  const modes = fs.readFileSync(path.join(ws, '.bob/custom_modes.yaml'), 'utf8');
  assert.match(modes, /^customModes:\n {2}- slug: security-review\n/);
  assert.match(modes, /\n {2}- slug: github-issue-generator\n/);
  assert.doesNotMatch(modes, /SKILLS\/|Modes\/SDD/, 'no collection-relative paths remain');
  for (const ref of modes.match(/\.bob\/skills\/[A-Za-z0-9_-]+\/SKILL\.md/g)) {
    assert.ok(fs.existsSync(path.join(ws, ref)), `${ref} was installed`);
  }
  assert.ok(fs.existsSync(path.join(ws, '.bob/scripts/run_issue_creator.sh')));
  assert.ok(JSON.parse(fs.readFileSync(path.join(ws, '.bob/mcp.json'), 'utf8')).mcpServers);

  // Re-planning the same install is a no-op.
  const again = [...install.planModes(catalog, ws, slugs), ...install.planSkills(catalog, ws, skills)];
  assert.ok(again.every((p) => p.status === 'unchanged'));
  fs.rmSync(ws, { recursive: true, force: true });
});

test('supportEntries covers every non-mode file of a group exactly once', () => {
  const catalog = loadCatalog(COLLECTION);
  for (const g of catalog.groups) {
    const files = install.supportEntries(catalog, g.id).flatMap((e) => e.files).sort();
    assert.deepEqual(files, [...g.supportFiles].sort());
  }
});
