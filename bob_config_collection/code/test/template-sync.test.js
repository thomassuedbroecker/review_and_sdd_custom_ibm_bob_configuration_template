'use strict';

// The template's out-of-the-box .bob/ must match the leading collection for
// every overlapping mode and the skills those modes reference.
// Fix a failure with: npm run sync:template

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { planSync } = require('../src/tools/sync-workspace');

const COLLECTION = path.resolve(__dirname, '..', '..');
const TEMPLATE = path.resolve(COLLECTION, '..');

test('template .bob/ is in sync with bob_config_collection', { skip: !fs.existsSync(path.join(TEMPLATE, '.bob', 'custom_modes.yaml')) }, () => {
  const { slugs, plan } = planSync({ target: TEMPLATE, collection: COLLECTION, all: false });
  assert.ok(slugs.length > 0, 'template shares modes with the collection');
  const drift = plan.filter((p) => p.status !== 'unchanged').map((p) => `${p.status} ${p.dest}`);
  assert.deepEqual(drift, [], 'run `npm run sync:template` in bob_config_collection/code');
});
