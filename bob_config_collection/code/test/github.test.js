'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { downloadCollection, readCachedSource } = require('../src/lib/github');
const { loadCatalog } = require('../src/lib/catalog');

const MODE = 'customModes:\n  - slug: demo\n    name: Demo\n    roleDefinition: read SKILLS/sdd-demo/SKILL.md\n';

function fakeFetch(files, calls = []) {
  return async (url) => {
    calls.push(url);
    if (url.startsWith('https://api.github.com/')) {
      return {
        ok: true,
        json: async () => ({
          truncated: false,
          tree: [
            { type: 'tree', path: 'bob_config_collection' },
            ...Object.keys(files).map((p) => ({ type: 'blob', path: p })),
          ],
        }),
      };
    }
    const rel = decodeURIComponent(url.replace('https://raw.githubusercontent.com/owner/repo/main/', ''));
    if (!(rel in files)) return { ok: false, status: 404 };
    return { ok: true, arrayBuffer: async () => Buffer.from(files[rel]) };
  };
}

test('downloads only installable collection files and caches the source', async () => {
  const dest = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'bob-gh-')), 'cache');
  const calls = [];
  const files = {
    'bob_config_collection/modes/demo/demo-mode.yaml': MODE,
    'bob_config_collection/skills/sdd-demo/SKILL.md': '# Demo\n\n## Purpose\nDemo skill.\n',
    'bob_config_collection/code/src/extension.js': 'ignored',
    'README.md': 'ignored',
  };
  const meta = await downloadCollection({ repository: 'owner/repo', ref: 'main', destDir: dest, fetchImpl: fakeFetch(files, calls) });
  assert.equal(meta.files, 2);
  assert.ok(!calls.some((u) => u.includes('extension.js') || u.endsWith('README.md')));
  assert.ok(readCachedSource(dest, { repository: 'owner/repo', ref: 'main', collectionPath: 'bob_config_collection' }));
  assert.equal(readCachedSource(dest, { repository: 'other/repo', ref: 'main', collectionPath: 'bob_config_collection' }), undefined);

  const catalog = loadCatalog(dest);
  assert.deepEqual(catalog.groups[0].modes[0].skills, ['sdd-demo']);
  fs.rmSync(path.dirname(dest), { recursive: true, force: true });
});

test('rejects invalid input and repositories without a collection', async () => {
  const dest = path.join(os.tmpdir(), 'bob-gh-unused');
  await assert.rejects(downloadCollection({ repository: 'not a repo', destDir: dest, fetchImpl: fakeFetch({}) }), /invalid GitHub repository/);
  await assert.rejects(downloadCollection({ repository: 'owner/repo', collectionPath: '../x', destDir: dest, fetchImpl: fakeFetch({}) }), /invalid collection path/);
  await assert.rejects(downloadCollection({ repository: 'owner/repo', destDir: dest, fetchImpl: fakeFetch({ 'README.md': 'x' }) }), /no bob_config_collection/);
});
