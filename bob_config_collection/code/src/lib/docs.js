'use strict';

// Builds the Markdown documentation shown for a mode or skill before it is
// installed. Pure functions: no VS Code dependency.

const fs = require('fs');
const path = require('path');
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

module.exports = { modeDocumentation, skillDocumentation, readValue, readList };
