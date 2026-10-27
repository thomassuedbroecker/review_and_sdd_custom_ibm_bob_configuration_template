'use strict';

// Builds the Markdown documentation shown for a mode or skill before it is
// installed. Pure functions: no VS Code dependency.

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { rewritePaths } = require('./install');

// Reads a scalar or folded/literal block value of a top-level mode key.
function readValue(block, key) {
  const start = block.findIndex((l) => new RegExp(`^ {4}${key}:`).test(l));
  if (start === -1) return '';
  const inline = block[start].replace(new RegExp(`^ {4}${key}:`), '').trim();
  if (!/^[>|][+-]?$/.test(inline)) return inline.replace(/^(['"])(.*)\1$/, '$2');
  const folded = inline.startsWith('>');
  const lines = [];
  for (const line of block.slice(start + 1)) {
    if (line.trim() !== '' && !/^ {5,}/.test(line)) break;
    lines.push(line.trim());
  }
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  if (!folded) return lines.join('\n');
  // Folded: join consecutive lines with a space, keep blank lines as paragraph breaks.
  return lines.reduce((acc, l) => (l === '' ? `${acc}\n\n` : acc === '' || acc.endsWith('\n') ? acc + l : `${acc} ${l}`), '');
}

function readList(block, key) {
  const start = block.findIndex((l) => new RegExp(`^ {4}${key}:\\s*$`).test(l));
  if (start === -1) return [];
  const items = [];
  for (const line of block.slice(start + 1)) {
    const m = line.match(/^ {6}- (.+)$/);
    if (!m) break;
    items.push(m[1].trim());
  }
  return items;
}

function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : undefined;
}

// All Markdown documents a reader can open for a mode, as
// [{ kind, label, rel }] with rel relative to the mode group folder:
//   guide      <slug>-mode.md next to the mode file
//   reference  files the mode definition tells Bob to load (<sourcePrefix>references/*.md)
//   overview   top-level *.md of the group (README, readmes, knowledge sources, licenses)
//   guides     references/guides/*.md of the group
function modeDocuments(catalog, mode) {
  const group = catalog.groups.find((g) => g.id === mode.groupId);
  const docs = [];
  const add = (kind, rel) => {
    if (!docs.some((d) => d.rel === rel) && fs.existsSync(path.join(group.dir, rel))) {
      docs.push({ kind, label: path.posix.basename(rel), rel });
    }
  };
  add('guide', `${mode.slug}-mode.md`);
  const prefix = group.layout.sourcePrefix;
  if (prefix) {
    const re = new RegExp(`${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([A-Za-z0-9_./-]+\\.md)`, 'g');
    for (const m of mode.text.matchAll(re)) add('reference', m[1]);
  }
  const others = fs.readdirSync(group.dir).filter((f) => f.endsWith('.md') && !f.endsWith('-mode.md')).sort();
  for (const f of others) add('overview', f);
  const guidesDir = path.join(group.dir, 'references', 'guides');
  if (fs.existsSync(guidesDir)) {
    for (const f of fs.readdirSync(guidesDir).filter((n) => n.endsWith('.md')).sort()) add('guides', `references/guides/${f}`);
  }
  return docs;
}

const DOC_KIND_LABEL = {
  guide: 'Mode guide',
  reference: 'Reference files this mode loads',
  overview: 'Group overview',
  guides: 'Guides',
};

function modeDocumentation(catalog, mode) {
  const group = catalog.groups.find((g) => g.id === mode.groupId);
  const installed = rewritePaths(mode.block.join('\n'), catalog.layout, mode.groupId);
  const extra = readIfExists(path.join(group.dir, `${mode.slug}-mode.md`));
  const out = [
    `# ${mode.name || mode.slug}`,
    '',
    `Mode \`${mode.slug}\` · group **${group.label}** · source file \`modes/${group.id}/${mode.file}\``,
    '',
  ];
  if (mode.description) out.push(`> ${mode.description}`, '');
  const whenToUse = readValue(mode.block, 'whenToUse');
  if (whenToUse) out.push('## When to use', '', whenToUse, '');
  const groups = readList(mode.block, 'groups');
  if (groups.length) out.push('## Tool groups', '', groups.map((g) => `\`${g}\``).join(', '), '');
  out.push('## Skills used', '');
  if (mode.skills.length) {
    for (const id of mode.skills) {
      const skill = catalog.skillById.get(id);
      out.push(`- **${id}**${skill.description ? ` — ${skill.description}` : ''}`);
    }
  } else {
    out.push('_This mode does not reference a skill._');
  }
  out.push('');
  const roleDefinition = readValue(mode.block, 'roleDefinition');
  if (roleDefinition) out.push('## Role definition', '', roleDefinition, '');
  if (extra) out.push('## Additional documentation', '', extra.trim(), '');
  const related = modeDocuments(catalog, mode);
  if (related.length) {
    out.push('## Related documentation', '', 'Open a document in the Markdown preview:', '');
    for (const kind of Object.keys(DOC_KIND_LABEL)) {
      const items = related.filter((d) => d.kind === kind);
      if (!items.length) continue;
      out.push(`**${DOC_KIND_LABEL[kind]}**`, '');
      for (const d of items) out.push(`- [\`${d.rel}\`](${pathToFileURL(path.join(group.dir, d.rel)).href})`);
      out.push('');
    }
  }
  out.push(
    '## Mode definition as installed',
    '',
    `Written to \`${catalog.layout.modesFile}\`, with collection paths rewritten to the workspace layout.`,
    '',
    '```yaml',
    installed,
    '```',
    '');
  return out.join('\n');
}

function skillDocumentation(catalog, skill) {
  const usedBy = catalog.groups.flatMap((g) => g.modes.filter((m) => m.skills.includes(skill.id)).map((m) => `\`${m.slug}\``));
  const readme = skill.files.includes('README.md') ? readIfExists(path.join(skill.dir, 'README.md')) : undefined;
  const body = skill.hasSkillFile ? readIfExists(path.join(skill.dir, 'SKILL.md')) : undefined;
  const out = [
    `# Skill: ${skill.id}`,
    '',
    `Installs to \`${catalog.layout.skills.target}${skill.id}/\` · ${skill.files.length} file(s) · used by ${usedBy.length ? usedBy.join(', ') : 'no mode (standalone)'}`,
    '',
  ];
  if (skill.description) out.push(`> ${skill.description}`, '');
  out.push('## Files', '', ...skill.files.map((f) => `- \`${f}\``), '');
  if (readme) out.push('## README.md', '', readme.trim(), '');
  out.push('## SKILL.md', '', body ? body.trim() : '_SKILL.md is missing in this skill folder._', '');
  return out.join('\n');
}

module.exports = { modeDocumentation, skillDocumentation, modeDocuments, DOC_KIND_LABEL, readValue, readList };
