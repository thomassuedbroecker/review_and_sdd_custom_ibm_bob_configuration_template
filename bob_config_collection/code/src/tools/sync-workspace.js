#!/usr/bin/env node
'use strict';

// Updates a Bob workspace's .bob/ from the collection (the leading configuration).
//
//   node src/tools/sync-workspace.js --target <workspace> [--all] [--check] [--collection <dir>]
//
// Default: only modes whose slug already exists in <workspace>/.bob/custom_modes.yaml
// are replaced (overlap), together with the skills those modes reference.
// --all     also add every other mode and every skill of the collection
// --check   write nothing; exit 1 and list the files that differ

const path = require('path');
const { loadCatalog } = require('../lib/catalog');
const install = require('../lib/install');

function parseArgs(argv) {
  const args = { all: false, check: false, collection: path.resolve(__dirname, '..', '..', '..') };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--all') args.all = true;
    else if (a === '--check') args.check = true;
    else if (a === '--target') args.target = argv[++i];
    else if (a === '--collection') args.collection = argv[++i];
    else throw new Error(`unknown argument: ${a}`);
  }
  if (!args.target) throw new Error('missing --target <workspace>');
  return { ...args, target: path.resolve(args.target), collection: path.resolve(args.collection) };
}

function planSync({ target, collection, all }) {
  const catalog = loadCatalog(collection);
  const available = catalog.groups.flatMap((g) => g.modes.map((m) => m.slug));
  const existing = new Set(install.existingModeSlugs(catalog, target));
  const slugs = all ? available : available.filter((s) => existing.has(s));
  const skills = all ? catalog.skills.map((s) => s.id) : install.skillsForModes(catalog, slugs);
  return {
    slugs,
    skills,
    plan: [...install.planModes(catalog, target, slugs), ...install.planSkills(catalog, target, skills)],
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { slugs, skills, plan } = planSync(args);
  const drift = plan.filter((p) => p.status !== 'unchanged');
  console.log(`Collection: ${args.collection}\nTarget:     ${args.target}`);
  console.log(`Modes (${slugs.length}): ${slugs.join(', ') || '-'}`);
  console.log(`Skills (${skills.length}): ${skills.join(', ') || '-'}`);
  for (const p of drift) console.log(`  ${p.status.padEnd(7)} ${p.dest}`);
  if (args.check) {
    console.log(drift.length ? `${drift.length} file(s) differ from the collection.` : 'In sync with the collection.');
    process.exitCode = drift.length ? 1 : 0;
    return;
  }
  const written = install.applyPlan(args.target, plan);
  console.log(`Wrote ${written.length} file(s).`);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error(err.message);
    process.exitCode = 2;
  }
}

module.exports = { planSync };
