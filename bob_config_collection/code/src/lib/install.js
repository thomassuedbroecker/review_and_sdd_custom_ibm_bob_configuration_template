'use strict';

// Plans and applies installs from a loaded catalog into a Bob workspace.
// Every plan* function returns a list of file writes; nothing touches disk
// until applyPlan(), so callers can preview, confirm, or --check for drift.
//
// The collection is the leading configuration: a mode with an existing slug,
// a skill file, or a support file with the same path is replaced.

const fs = require('fs');
const path = require('path');

// --- path rewriting -----------------------------------------------------------

function mapGroupPath(rest, group) {
  if (rest === '') return group.groupRoot;
  const entry = [...group.paths]
    .sort((a, b) => b.from.length - a.from.length)
    .find((p) => rest.startsWith(p.from));
  return entry.to + rest.slice(entry.from.length);
}

// Rewrites collection-relative references (SKILLS/..., Modes/SDD/...) inside a
// mode definition to the paths they get inside a Bob workspace.
function rewritePaths(text, layout, groupId) {
  let out = text.split(layout.skills.sourcePrefix).join(layout.skills.target);
  const group = layout.groups[groupId];
  if (group) {
    const re = new RegExp(`${group.sourcePrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([A-Za-z0-9_./-]*)`, 'g');
    out = out.replace(re, (_, rest) => mapGroupPath(rest, group));
  }
  return out;
}

// --- custom_modes.yaml upsert -------------------------------------------------

function slugOf(itemLines) {
  for (const line of itemLines) {
    const m = line.match(/^\s*(?:- )?slug:\s*(.+)$/);
    if (m) return m[1].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return undefined;
}

// Splits a custom_modes.yaml text into header, mode items, and footer lines.
function splitModes(text) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\n+$/, '').split('\n');
  if (text.trim() === '') return { header: ['customModes:'], items: [], footer: [], indent: '  ' };
  const root = lines.findIndex((l) => /^customModes:\s*(\[\s*\])?\s*$/.test(l));
  if (root === -1) throw new Error('custom_modes.yaml has no top-level "customModes:" list');
  const header = lines.slice(0, root + 1);
  header[root] = 'customModes:';

  let indent;
  const items = [];
  let footerStart = lines.length;
  for (let i = root + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^\S/.test(line) && !line.startsWith('#') && !line.startsWith('- ')) {
      footerStart = i;
      break;
    }
    const item = line.match(/^(\s*)- /);
    if (item && (indent === undefined || item[1] === indent)) {
      indent = item[1];
      items.push({ lines: [line] });
    } else if (items.length) {
      items[items.length - 1].lines.push(line);
    } else {
      header.push(line);
    }
  }
  for (const item of items) {
    item.trailing = 0;
    while (item.lines.length > 1 && item.lines[item.lines.length - 1].trim() === '') {
      item.lines.pop();
      item.trailing++;
    }
    item.slug = slugOf(item.lines);
  }
  return { header, items, footer: lines.slice(footerStart), indent: indent ?? '  ' };
}

function reindent(blockLines, to) {
  const from = '  ';
  if (to === from) return blockLines;
  return blockLines.map((l) => {
    if (l.trim() === '') return l;
    if (!l.startsWith(from)) throw new Error(`cannot re-indent mode line: ${l}`);
    return to + l.slice(from.length);
  });
}

// modes: [{ slug, block }] with block lines indented as in the collection.
function upsertModes(existingText, modes) {
  const doc = splitModes(existingText);
  const added = [];
  const updated = [];
  for (const mode of modes) {
    const lines = reindent(mode.block, doc.indent);
    const existing = doc.items.find((it) => it.slug === mode.slug);
    if (existing) {
      existing.lines = lines;
      updated.push(mode.slug);
    } else {
      if (doc.items.length) doc.items[doc.items.length - 1].trailing ||= 1;
      doc.items.push({ slug: mode.slug, lines, trailing: 1 });
      added.push(mode.slug);
    }
  }
  if (doc.items.length) doc.items[doc.items.length - 1].trailing = 0;
  const body = doc.items.flatMap((it) => [...it.lines, ...Array(it.trailing).fill('')]);
  const text = [...doc.header, ...body, ...doc.footer].join('\n') + '\n';
  return { text, added, updated };
}

// --- MCP merge ----------------------------------------------------------------

function mergeMcp(existingText, incomingText) {
  const existing = existingText && existingText.trim() ? JSON.parse(existingText) : {};
  const incoming = JSON.parse(incomingText);
  const merged = { ...incoming, ...existing };
  merged.mcpServers = { ...(existing.mcpServers || {}), ...(incoming.mcpServers || {}) };
  return JSON.stringify(merged, null, 2) + '\n';
}

// --- planning -------------------------------------------------------------------

function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file) : undefined;
}

function withStatus(targetRoot, dest, content, source) {
  const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8');
  const current = readIfExists(path.join(targetRoot, dest));
  const status = current === undefined ? 'new' : current.equals(buffer) ? 'unchanged' : 'changed';
  return { dest, content: buffer, status, source };
}

function findMode(catalog, slug) {
  for (const group of catalog.groups) {
    const mode = group.modes.find((m) => m.slug === slug);
    if (mode) return mode;
  }
  throw new Error(`mode "${slug}" not found in collection`);
}

function existingModeSlugs(catalog, targetRoot) {
  const file = path.join(targetRoot, catalog.layout.modesFile);
  if (!fs.existsSync(file)) return [];
  return splitModes(fs.readFileSync(file, 'utf8')).items.map((it) => it.slug).filter(Boolean);
}

function existingSkillIds(catalog, targetRoot) {
  return catalog.skills
    .map((s) => s.id)
    .filter((id) => fs.existsSync(path.join(targetRoot, catalog.layout.skills.target, id, 'SKILL.md')));
}

function planModes(catalog, targetRoot, slugs) {
  if (!slugs.length) return [];
  const dest = catalog.layout.modesFile;
  const current = readIfExists(path.join(targetRoot, dest));
  const modes = slugs.map((slug) => {
    const mode = findMode(catalog, slug);
    const rewritten = rewritePaths(mode.block.join('\n'), catalog.layout, mode.groupId);
    return { slug, block: rewritten.split('\n') };
  });
  const result = upsertModes(current ? current.toString('utf8') : '', modes);
  return [{ ...withStatus(targetRoot, dest, result.text, `modes: ${slugs.join(', ')}`), added: result.added, updated: result.updated }];
}

function planSkills(catalog, targetRoot, ids) {
  return ids.flatMap((id) => {
    const skill = catalog.skillById.get(id);
    if (!skill) throw new Error(`skill "${id}" not found in collection`);
    return skill.files.map((f) =>
      withStatus(targetRoot, `${catalog.layout.skills.target}${id}/${f}`, fs.readFileSync(path.join(skill.dir, f)), `skill ${id}`));
  });
}

// Support entries of a group (scripts, MCP, guides, ...) with their files.
function supportEntries(catalog, groupId) {
  const group = catalog.groups.find((g) => g.id === groupId);
  if (!group || !group.layout) return [];
  const byLength = [...group.layout.paths].sort((a, b) => b.from.length - a.from.length);
  const entries = group.layout.paths.map((p) => ({ ...p, files: [] }));
  for (const file of group.supportFiles) {
    const match = byLength.find((p) => file.startsWith(p.from));
    entries.find((e) => e.id === match.id).files.push(file);
  }
  return entries.filter((e) => e.files.length);
}

function planSupport(catalog, targetRoot, groupId, entryIds) {
  const group = catalog.groups.find((g) => g.id === groupId);
  return supportEntries(catalog, groupId)
    .filter((e) => entryIds.includes(e.id))
    .flatMap((entry) => entry.files.map((file) => {
      const dest = mapGroupPath(file, group.layout);
      const source = fs.readFileSync(path.join(group.dir, file));
      if (entry.merge === 'mcp') {
        const current = readIfExists(path.join(targetRoot, dest));
        return withStatus(targetRoot, dest, mergeMcp(current && current.toString('utf8'), source.toString('utf8')), `${entry.label}`);
      }
      return withStatus(targetRoot, dest, source, entry.label);
    }));
}

// Skills referenced by the given modes, in collection order.
function skillsForModes(catalog, slugs) {
  const wanted = new Set(slugs.flatMap((s) => findMode(catalog, s).skills));
  return catalog.skills.map((s) => s.id).filter((id) => wanted.has(id));
}

function applyPlan(targetRoot, plan) {
  const written = [];
  for (const item of plan) {
    if (item.status === 'unchanged') continue;
    const file = path.join(targetRoot, item.dest);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, item.content);
    written.push(item.dest);
  }
  return written;
}

module.exports = {
  rewritePaths,
  mapGroupPath,
  splitModes,
  upsertModes,
  mergeMcp,
  existingModeSlugs,
  existingSkillIds,
  planModes,
  planSkills,
  planSupport,
  supportEntries,
  skillsForModes,
  applyPlan,
};
