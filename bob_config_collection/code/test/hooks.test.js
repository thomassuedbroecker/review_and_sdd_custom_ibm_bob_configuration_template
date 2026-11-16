'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { loadCatalog } = require('../src/lib/catalog');
const install = require('../src/lib/install');

const COLLECTION = path.resolve(__dirname, '..', '..');

function tmpWorkspace() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'bob-ws-'));
}

const HOOK = {
  id: 'demo',
  file: 'demo.mjs',
  events: ['Stop'],
  registration: { type: 'command', command: 'node .bob/hooks/demo.mjs', timeout: 15 },
};

test('mergeHookSettings creates a settings file from scratch', () => {
  const merged = JSON.parse(install.mergeHookSettings(undefined, [HOOK]));
  assert.deepEqual(merged, { hooks: { Stop: [{ hooks: [HOOK.registration] }] } });
});

test('mergeHookSettings keeps other settings and hooks, updates the matching command in place', () => {
  const existing = JSON.stringify({
    other: { key: true },
    hooks: {
      Stop: [
        { hooks: [{ type: 'command', command: 'node mine.js' }] },
        { hooks: [{ type: 'command', command: 'node .bob/hooks/demo.mjs', timeout: 5, env: { A: '1' } }] },
      ],
      SessionStart: [{ hooks: [{ type: 'command', command: 'echo hi' }] }],
    },
  });
  const merged = JSON.parse(install.mergeHookSettings(existing, [HOOK]));
  assert.deepEqual(merged.other, { key: true });
  assert.deepEqual(merged.hooks.SessionStart, [{ hooks: [{ type: 'command', command: 'echo hi' }] }]);
  assert.equal(merged.hooks.Stop.length, 2, 'no duplicate entry is appended');
  assert.deepEqual(merged.hooks.Stop[0].hooks[0], { type: 'command', command: 'node mine.js' });
  assert.deepEqual(merged.hooks.Stop[1].hooks[0],
    { type: 'command', command: 'node .bob/hooks/demo.mjs', timeout: 15, env: { A: '1' } },
    'timeout updated, user-added keys kept');
});

test('mergeHookSettings is idempotent and rejects a non-object hooks key', () => {
  const once = install.mergeHookSettings('{}', [HOOK]);
  assert.equal(install.mergeHookSettings(once, [HOOK]), once);
  assert.throws(() => install.mergeHookSettings('{"hooks": []}', [HOOK]), /"hooks" is not an object/);
});

test('the collection hook manifest is consistent', () => {
  const catalog = loadCatalog(COLLECTION);
  assert.ok(catalog.hooks.length >= 1, 'collection ships at least one hook');
  const ids = catalog.hooks.map((h) => h.id);
  assert.equal(new Set(ids).size, ids.length, 'hook ids are unique');
  for (const h of catalog.hooks) assert.ok(h.hasFile, `${h.id}: ${h.file} exists in hooks/`);
});

test('installing collection hooks writes the scripts and registers them in the settings file', () => {
  const catalog = loadCatalog(COLLECTION);
  const ws = tmpWorkspace();
  const ids = catalog.hooks.map((h) => h.id);
  const plan = install.planHooks(catalog, ws, ids);
  assert.ok(plan.every((p) => p.status === 'new'));
  install.applyPlan(ws, plan);

  for (const h of catalog.hooks) {
    assert.ok(fs.existsSync(path.join(ws, catalog.layout.hooks.target, h.file)), `${h.file} was installed`);
  }
  const settings = JSON.parse(fs.readFileSync(path.join(ws, catalog.layout.hooks.settingsFile), 'utf8'));
  for (const h of catalog.hooks) for (const event of h.events) {
    assert.ok(settings.hooks[event].some((e) => e.hooks.some((r) => r.command === h.registration.command)),
      `${h.id} is registered on ${event}`);
  }
  assert.deepEqual(install.existingHookIds(catalog, ws), ids);

  const again = install.planHooks(catalog, ws, ids);
  assert.ok(again.every((p) => p.status === 'unchanged'), 'second install is a no-op');
  assert.deepEqual(install.planHooks(catalog, ws, []), [], 'empty selection plans nothing');
  assert.throws(() => install.planHooks(catalog, ws, ['nope']), /hook "nope" not found/);
  fs.rmSync(ws, { recursive: true, force: true });
});
