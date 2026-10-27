'use strict';

// Scans a bob_config_collection folder (modes/<group>/*-mode.yaml and
// skills/<skill>/) and describes what can be installed into a Bob workspace.

const fs = require('fs');
const path = require('path');

const MODE_SUFFIX = '-mode.yaml';
const IGNORED_NAMES = new Set(['__pycache__', '.DS_Store', 'node_modules']);

const LAYOUT_PATH = 'code/src/config/install-layout.json';

// A collection may ship its own layout (a reusable repository created from the
// template); otherwise the layout bundled with this code is used.
function loadLayout(collectionDir) {
  const own = collectionDir && path.join(collectionDir, LAYOUT_PATH);
  const file = own && fs.existsSync(own) ? own : path.join(__dirname, '..', 'config', 'install-layout.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// Groups without a layout entry: no path rewriting, files go to documentation.
function defaultGroupLayout(id) {
  return {
    label: id,
    groupRoot: '.bob/',
    paths: [{ id: 'documentation', label: 'Mode group documentation and references', from: '', to: `.bob/documentation/${id}/` }],
  };
}

// Recursively lists files below dir as sorted POSIX paths relative to dir.
function listFiles(dir) {
  const out = [];
  const walk = (current, rel) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (IGNORED_NAMES.has(entry.name)) continue;
      const childRel = rel ? `${rel}/${entry.name}` : entry.name;
      const childAbs = path.join(current, entry.name);
      if (entry.isDirectory()) walk(childAbs, childRel);
      else if (entry.isFile()) out.push(childRel);
    }
  };
  walk(dir, '');
  return out.sort();
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !IGNORED_NAMES.has(e.name))
    .map((e) => e.name)
    .sort();
}

function unquote(value) {
  return value.trim().replace(/^(['"])(.*)\1$/, '$2');
}

// A collection mode file holds exactly one mode:
//   customModes:
//     - slug: <slug>
//       ...
// Returns the list-item block (indented by two spaces) plus display metadata.
function parseModeFile(text, file = '<mode>') {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const root = lines.findIndex((l) => /^customModes:\s*$/.test(l));
  if (root === -1) throw new Error(`${file}: missing top-level "customModes:" key`);
  const block = lines.slice(root + 1);
  while (block.length && block[block.length - 1].trim() === '') block.pop();
  while (block.length && block[0].trim() === '') block.shift();
  const first = block[0] || '';
  const slugMatch = first.match(/^ {2}- slug:\s*(.+)$/);
  if (!slugMatch) throw new Error(`${file}: expected "  - slug: <slug>" as the first mode line`);
  if (block.slice(1).some((l) => /^ {2}- /.test(l))) {
    throw new Error(`${file}: contains more than one mode; expected exactly one`);
  }
  const scalar = (key) => {
    const m = block.find((l) => new RegExp(`^ {4}${key}:`).test(l));
    if (!m) return '';
    const value = m.replace(new RegExp(`^ {4}${key}:`), '').trim();
    return /^[>|][+-]?$/.test(value) ? '' : unquote(value);
  };
  return { slug: unquote(slugMatch[1]), name: scalar('name'), description: scalar('description'), block };
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Skill folder names referenced as <skills prefix><name>/ inside a mode file.
function findSkillRefs(text, layout) {
  const re = new RegExp(`${escapeRegExp(layout.skills.sourcePrefix)}([A-Za-z0-9_-]+)/`, 'g');
  const refs = new Set();
  for (const m of text.matchAll(re)) refs.add(m[1]);
  return [...refs].sort();
}

// Skill summary: frontmatter description, else first line of the "## Purpose" section.
function describeSkill(text) {
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    const d = fm[1].match(/^description:\s*(.+)$/m);
    if (d) return unquote(d[1]);
  }
  const purpose = text.match(/^## Purpose\s*\n+([^\n]+)/m);
  return purpose ? purpose[1].trim() : '';
}

function loadCatalog(collectionDir, layout = loadLayout(collectionDir)) {
  const examples = new Set(layout.exampleSkills || []);
  const skillsDir = path.join(collectionDir, layout.skills.collectionDir);
  const skills = listDirs(skillsDir).map((id) => {
    const dir = path.join(skillsDir, id);
    const files = listFiles(dir);
    const skillFile = path.join(dir, 'SKILL.md');
    const hasSkillFile = files.includes('SKILL.md');
    return {
      id,
      dir,
      files,
      hasSkillFile,
      description: hasSkillFile ? describeSkill(fs.readFileSync(skillFile, 'utf8')) : '',
    };
  });
  const skillById = new Map(skills.map((s) => [s.id, s]));

  const groups = listDirs(path.join(collectionDir, 'modes')).map((id) => {
    const dir = path.join(collectionDir, 'modes', id);
    const files = listFiles(dir);
    const modes = files
      .filter((f) => !f.includes('/') && f.endsWith(MODE_SUFFIX))
      .map((f) => {
        const text = fs.readFileSync(path.join(dir, f), 'utf8');
        const mode = parseModeFile(text, `modes/${id}/${f}`);
        const refs = findSkillRefs(text, layout);
        return {
          ...mode,
          groupId: id,
          file: f,
          text,
          skills: refs.filter((r) => skillById.has(r)),
          missingSkills: refs.filter((r) => !skillById.has(r) && !examples.has(r)),
        };
      });
    const supportFiles = files.filter((f) => !(modes.some((m) => m.file === f)));
    const groupLayout = layout.groups[id] || defaultGroupLayout(id);
    return { id, dir, label: groupLayout.label, layout: groupLayout, modes, supportFiles };
  });

  return { collectionDir, layout, groups, skills, skillById };
}

module.exports = { LAYOUT_PATH, loadLayout, loadCatalog, listFiles, parseModeFile, findSkillRefs, describeSkill, MODE_SUFFIX };
