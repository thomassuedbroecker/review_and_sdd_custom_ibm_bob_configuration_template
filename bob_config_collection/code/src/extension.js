'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vscode = require('vscode');
const { loadCatalog } = require('./lib/catalog');
const install = require('./lib/install');
const { downloadCollection, readCachedSource } = require('./lib/github');
const { modeDocumentation, skillDocumentation, modeDocuments, DOC_KIND_LABEL } = require('./lib/docs');

// --- sidebar webview ------------------------------------------------------------

// Builds the full HTML catalog panel (groups → mode cards with tag pills and
// Install buttons, plus Skills and Other Configurations sections).
function buildWebviewHtml(catalog, installedSlugs, nonce, installedSkills = []) {
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // tag pill colours (group label → hue)
  const groupHues = {};
  let hueStep = 0;
  const HUES = [200, 160, 270, 30, 340, 90, 0];
  const groupHue = (label) => {
    if (!groupHues[label]) groupHues[label] = HUES[hueStep++ % HUES.length];
    return groupHues[label];
  };

  const pill = (text, hue) =>
    `<span class="pill" style="--h:${hue}">${esc(text)}</span>`;

  let modeCount = 0;
  const groupSections = catalog.groups.map((g) => {
    const hue = groupHue(g.label);
    const cards = g.modes.map((m) => {
      modeCount++;
      const installed = installedSlugs.includes(m.slug);
      const btnLabel = installed ? 'Update' : 'Install';
      const desc = m.description || '';
      const truncated = desc.length > 110 ? desc.slice(0, 107) + '…' : desc;
      const related = modeDocuments(catalog, m);
      const docList = `
          <details class="docs">
            <summary>Documentation (${related.length + 1})</summary>
            <ul>
              <li><a class="doc-link" href="#" data-cmd="bobConfigImporter.showModeDoc" data-slug="${esc(m.slug)}">Mode overview: intent, when to use, skills, definition</a></li>
              ${related.map((d) => `<li><a class="doc-link" href="#" title="${esc(DOC_KIND_LABEL[d.kind])}: ${esc(d.rel)}" data-cmd="bobConfigImporter.openDocFile" data-group="${esc(g.id)}" data-rel="${esc(d.rel)}">${esc(d.label)}</a><span class="doc-kind">${esc(DOC_KIND_LABEL[d.kind])}</span></li>`).join('')}
            </ul>
          </details>`;
      return `
      <div class="card">
        <div class="card-body">
          <div class="card-name"><a class="doc-link" href="#" title="Read documentation" data-cmd="bobConfigImporter.showModeDoc" data-slug="${esc(m.slug)}">${esc(m.name || m.slug)}</a></div>
          <div class="card-desc">${esc(truncated)}</div>${docList}
          <div class="card-footer">
            <div class="pills">${pill(g.label, hue)}${pill(installed ? 'Installed' : 'Custom Mode', installed ? 120 : 270)}</div>
            <div class="actions">
              <button class="btn-docs" data-cmd="bobConfigImporter.showModeDoc" data-slug="${esc(m.slug)}">Docs</button>
              <button class="btn-install" data-cmd="bobConfigImporter.installMode" data-slug="${esc(m.slug)}" title="Installs this mode and the skills it reads">${btnLabel}</button>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
    return `
    <details open>
      <summary><span class="group-icon">⊞</span>${esc(g.label)}<span class="group-count">${g.modes.length}</span></summary>
      ${cards}
    </details>`;
  }).join('');

  const skillCards = catalog.skills.map((s) => {
    const desc = s.description || '';
    const truncated = desc.length > 110 ? desc.slice(0, 107) + '…' : desc;
    return `
    <div class="card">
      <div class="card-body">
        <div class="card-name"><a class="doc-link" href="#" title="Read documentation" data-cmd="bobConfigImporter.showSkillDoc" data-slug="${esc(s.id)}">${esc(s.id)}</a></div>
        <div class="card-desc">${esc(truncated)}</div>
        <div class="card-footer">
          <div class="pills">${pill('Skill', 200)}</div>
          <div class="actions">
            <button class="btn-docs" data-cmd="bobConfigImporter.showSkillDoc" data-slug="${esc(s.id)}">Docs</button>
            <button class="btn-install" data-cmd="bobConfigImporter.installSkill" data-slug="${esc(s.id)}">${installedSkills.includes(s.id) ? 'Update' : 'Install'}</button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  const totalSkills = catalog.skills.length;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Bob Config Importer</title>
<style nonce="${nonce}">
  :root {
    --bg: var(--vscode-sideBar-background, #1e1e1e);
    --surface: var(--vscode-editor-background, #252526);
    --border: var(--vscode-widget-border, #3c3c3c);
    --fg: var(--vscode-foreground, #ccc);
    --fg-muted: var(--vscode-descriptionForeground, #999);
    --accent: var(--vscode-button-background, #0e639c);
    --accent-fg: var(--vscode-button-foreground, #fff);
    --accent-hover: var(--vscode-button-hoverBackground, #1177bb);
    --radius: 6px;
    font-family: var(--vscode-font-family, system-ui, sans-serif);
    font-size: var(--vscode-font-size, 13px);
    color: var(--fg);
    background: var(--bg);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { padding: 8px; }

  /* toolbar */
  .toolbar { display:flex; gap:6px; margin-bottom:10px; flex-wrap:wrap; }
  .toolbar button {
    background: var(--vscode-button-secondaryBackground, #3a3d41);
    color: var(--vscode-button-secondaryForeground, #ccc);
    border: none; border-radius: var(--radius);
    padding: 4px 10px; cursor: pointer; font-size: 12px;
  }
  .toolbar button:hover { background: var(--vscode-button-secondaryHoverBackground, #45494e); }

  /* summary bar */
  .summary-bar { font-size: 12px; color: var(--fg-muted); margin-bottom: 10px; }

  /* section headers */
  details { margin-bottom: 6px; }
  summary {
    display: flex; align-items: center; gap: 6px;
    cursor: pointer; padding: 6px 4px;
    font-weight: 600; font-size: 13px;
    border-bottom: 1px solid var(--border);
    list-style: none; user-select: none;
  }
  summary::-webkit-details-marker { display:none; }
  details[open] summary::before { content: '▼'; font-size: 10px; color: var(--fg-muted); }
  details:not([open]) summary::before { content: '▶'; font-size: 10px; color: var(--fg-muted); }
  .group-icon { font-size: 14px; }
  .group-count {
    margin-left: auto; background: var(--vscode-badge-background, #4d4d4d);
    color: var(--vscode-badge-foreground, #fff);
    border-radius: 10px; padding: 1px 7px; font-size: 11px; font-weight: 400;
  }

  /* cards */
  .card {
    border-bottom: 1px solid var(--border);
    padding: 10px 4px 10px 4px;
  }
  .card:last-child { border-bottom: none; }
  .card-name { font-weight: 600; margin-bottom: 4px; }
  .card-desc { font-size: 12px; color: var(--fg-muted); line-height: 1.5; margin-bottom: 8px; }
  .card-footer { display:flex; align-items:center; justify-content:space-between; gap:6px; flex-wrap:wrap; }
  .pills { display:flex; gap:4px; flex-wrap:wrap; }
  .pill {
    font-size: 11px; padding: 2px 8px; border-radius: 12px;
    border: 1px solid hsl(var(--h), 40%, 50%);
    color: hsl(var(--h), 55%, 70%);
    background: transparent;
  }

  /* install button */
  .btn-install {
    background: var(--accent); color: var(--accent-fg);
    border: none; border-radius: var(--radius);
    padding: 4px 14px; cursor: pointer; font-size: 12px; white-space: nowrap;
    flex-shrink: 0;
  }
  .btn-install:hover { background: var(--accent-hover); }

  /* docs button and link */
  .actions { display:flex; gap:6px; flex-shrink:0; }
  .btn-docs {
    background: var(--vscode-button-secondaryBackground, #3a3d41);
    color: var(--vscode-button-secondaryForeground, #ccc);
    border: none; border-radius: var(--radius);
    padding: 4px 14px; cursor: pointer; font-size: 12px; white-space: nowrap;
  }
  .btn-docs:hover { background: var(--vscode-button-secondaryHoverBackground, #45494e); }
  .doc-link { color: var(--vscode-textLink-foreground, #3794ff); text-decoration: none; }
  .doc-link:hover { text-decoration: underline; }
  details.docs { margin: 0 0 8px 0; }
  details.docs summary { border-bottom: none; padding: 2px 0; font-weight: 400; font-size: 12px; color: var(--fg-muted); }
  details.docs ul { list-style: none; padding: 4px 0 0 14px; }
  details.docs li { font-size: 12px; line-height: 1.7; }
  .doc-kind { margin-left: 6px; font-size: 11px; color: var(--fg-muted); }
</style>
</head>
<body>
<div class="toolbar">
  <button data-cmd="bobConfigImporter.browseDocs">📖 Docs</button>
  <button data-cmd="bobConfigImporter.installGroup">⊞ Full Group</button>
  <button data-cmd="bobConfigImporter.installOther">📦 Other</button>
  <button data-cmd="bobConfigImporter.selectSource">⚙ Source</button>
  <button data-cmd="bobConfigImporter.refreshCollection">↺ Refresh</button>
</div>
<div class="summary-bar">${modeCount} modes · ${totalSkills} skills</div>
<details open>
  <summary><span class="group-icon">≡</span>Modes<span class="group-count">${modeCount}</span></summary>
  ${groupSections}
</details>
<details>
  <summary><span class="group-icon">📚</span>Skills<span class="group-count">${totalSkills}</span></summary>
  ${skillCards}
</details>
<script nonce="${nonce}">
  const vscode = acquireVsCodeApi();
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cmd]');
    if (!btn) return;
    e.preventDefault();
    const msg = { command: btn.dataset.cmd };
    if (btn.dataset.slug) msg.slug = btn.dataset.slug;
    if (btn.dataset.rel) { msg.group = btn.dataset.group; msg.rel = btn.dataset.rel; }
    vscode.postMessage(msg);
  });
</script>
</body>
</html>`;
}

class BobConfigWebviewProvider {
  constructor(context) {
    this._context = context;
    this._view = undefined;
    this._disposed = false;
  }

  resolveWebviewView(webviewView) {
    this._view = webviewView;
    webviewView.webview.options = { enableScripts: true };
    webviewView.webview.onDidReceiveMessage(
      (msg) => {
        if (this._disposed) return;
        const args = msg.rel ? [msg.group, msg.rel] : msg.slug ? [msg.slug] : [];
        vscode.commands.executeCommand(msg.command, ...args);
      },
      undefined,
      this._context.subscriptions,
    );
    // Mark disposed when the view is permanently removed (e.g. on extension uninstall).
    webviewView.onDidDispose(() => { this._disposed = true; this._view = undefined; });
    this._refresh();
  }

  // Called after a successful import to update installed badges.
  refresh() { this._refresh(); }

  dispose() { this._disposed = true; this._view = undefined; }

  async _refresh() {
    if (this._disposed || !this._view) return;
    const nonce = crypto.randomBytes(16).toString('base64');
    try {
      const source = await resolveCollection(this._context);
      // Guard again after the async gap — the view may have been disposed while we waited.
      if (this._disposed || !this._view) return;
      const catalog = loadCatalog(source.dir);
      const folders = vscode.workspace.workspaceFolders || [];
      const targetRoot = folders[0]?.uri.fsPath ?? '';
      const installedSlugs = targetRoot ? install.existingModeSlugs(catalog, targetRoot) : [];
      const installedSkills = targetRoot ? install.existingSkillIds(catalog, targetRoot) : [];
      this._view.webview.html = buildWebviewHtml(catalog, installedSlugs, nonce, installedSkills);
    } catch (err) {
      if (this._disposed || !this._view) return;
      this._view.webview.html = `<body style="padding:12px;font-family:sans-serif;color:#c00">Error loading collection:<br>${err.message}</body>`;
    }
  }
}

const CONFIG = 'bobConfigImporter';
const CACHE_MAX_AGE_MS = 60 * 60 * 1000;
const DOC_SCHEME = 'bob-config-doc';

// --- documentation preview -----------------------------------------------------

// Serves generated Markdown as read-only virtual documents for the preview.
class DocProvider {
  constructor() {
    this.docs = new Map();
    this.emitter = new vscode.EventEmitter();
    this.onDidChange = this.emitter.event;
  }

  provideTextDocumentContent(uri) {
    return this.docs.get(uri.path) ?? '';
  }

  async show(name, markdown) {
    const uri = vscode.Uri.from({ scheme: DOC_SCHEME, path: `/${name}.md` });
    this.docs.set(uri.path, markdown);
    this.emitter.fire(uri);
    await vscode.commands.executeCommand('markdown.showPreview', uri);
  }
}

const docProvider = new DocProvider();
const DOC_BUTTON = { iconPath: new vscode.ThemeIcon('book'), tooltip: 'Read documentation' };

function showDocs(catalog, item) {
  if (item.slug) {
    const mode = catalog.groups.flatMap((g) => g.modes).find((m) => m.slug === item.slug);
    return docProvider.show(`mode-${mode.slug}`, modeDocumentation(catalog, mode));
  }
  return docProvider.show(`skill-${item.id}`, skillDocumentation(catalog, catalog.skillById.get(item.id)));
}

// Multi-select picker whose items carry a "Read documentation" button. The
// picker stays open while the documentation preview is shown.
function pickWithDocs(catalog, { title, items, canPickMany = true }) {
  return new Promise((resolve) => {
    const qp = vscode.window.createQuickPick();
    qp.title = title;
    qp.placeholder = 'Select with the checkbox, use the book icon to read the documentation first';
    qp.canSelectMany = canPickMany;
    qp.matchOnDescription = true;
    qp.matchOnDetail = true;
    qp.ignoreFocusOut = true;
    qp.items = items.map((i) => (i.kind === vscode.QuickPickItemKind.Separator ? i : { ...i, buttons: [DOC_BUTTON] }));
    if (canPickMany) qp.selectedItems = qp.items.filter((i) => i.picked);
    let result;
    qp.onDidTriggerItemButton((e) => showDocs(catalog, e.item));
    qp.onDidAccept(() => {
      result = canPickMany ? [...qp.selectedItems] : [...qp.activeItems];
      qp.hide();
    });
    qp.onDidHide(() => {
      qp.dispose();
      resolve(result);
    });
    qp.show();
  });
}

// --- collection source ----------------------------------------------------------

function settings() {
  const c = vscode.workspace.getConfiguration(CONFIG);
  return {
    source: c.get('source', 'github'),
    repository: c.get('githubRepository'),
    ref: c.get('githubRef', 'main'),
    collectionPath: c.get('githubCollectionPath', 'bob_config_collection'),
    localPath: c.get('localCollectionPath', ''),
  };
}

// The packaged extension ships dist/collection; when run from source
// (F5 in bob_config_collection/code) the parent collection folder is used.
function bundledCollection(context) {
  const dist = path.join(context.extensionPath, 'dist', 'collection');
  return fs.existsSync(dist) ? dist : path.resolve(context.extensionPath, '..');
}

function githubCacheDir(context, s) {
  const key = `${s.repository}@${s.ref}`.replace(/[^A-Za-z0-9_.@-]/g, '_');
  return path.join(context.globalStorageUri.fsPath, 'github', key);
}

async function fromGithub(context, s, force) {
  const dir = githubCacheDir(context, s);
  const cached = readCachedSource(dir, s);
  if (!force && cached && Date.now() - Date.parse(cached.downloadedAt) < CACHE_MAX_AGE_MS) return dir;
  await vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification, title: `Loading Bob collection from ${s.repository}@${s.ref}` },
    () => downloadCollection({ ...s, destDir: dir }),
  );
  return dir;
}

async function resolveCollection(context, { force = false } = {}) {
  const s = settings();
  if (s.source === 'local') {
    const base = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? '';
    const dir = path.resolve(base, s.localPath || 'bob_config_collection');
    if (!fs.existsSync(path.join(dir, 'modes')) && !fs.existsSync(path.join(dir, 'skills'))) {
      throw new Error(`local collection not found: ${dir}`);
    }
    return { dir, label: `local folder ${dir}` };
  }
  if (s.source === 'github') {
    try {
      return { dir: await fromGithub(context, s, force), label: `GitHub ${s.repository}@${s.ref}` };
    } catch (err) {
      const cachedDir = githubCacheDir(context, s);
      const fallback = readCachedSource(cachedDir, s) ? 'Use cached copy' : 'Use bundled collection';
      const choice = await vscode.window.showWarningMessage(
        `Could not load the collection from GitHub: ${err.message}`, fallback, 'Cancel');
      if (choice === 'Use cached copy') return { dir: cachedDir, label: `cached GitHub ${s.repository}@${s.ref}` };
      if (choice !== 'Use bundled collection') return undefined;
    }
  }
  return { dir: bundledCollection(context), label: 'collection bundled with the extension' };
}

async function getCatalog(context) {
  const source = await resolveCollection(context);
  if (!source) return undefined;
  return { catalog: loadCatalog(source.dir), sourceLabel: source.label };
}

// --- workspace target -------------------------------------------------------------

async function pickTargetRoot() {
  const folders = vscode.workspace.workspaceFolders || [];
  if (!folders.length) {
    vscode.window.showErrorMessage('Open the Bob workspace folder first; configurations are installed into its .bob/ folder.');
    return undefined;
  }
  if (folders.length === 1) return folders[0].uri.fsPath;
  const pick = await vscode.window.showWorkspaceFolderPick({ placeHolder: 'Workspace folder to install into (.bob/)' });
  return pick?.uri.fsPath;
}

// --- confirm & apply --------------------------------------------------------------

async function confirmAndApply(targetRoot, plan, what, { confirm = true } = {}) {
  const changed = plan.filter((p) => p.status === 'changed');
  const created = plan.filter((p) => p.status === 'new');
  if (!changed.length && !created.length) {
    vscode.window.showInformationMessage(`${what}: already up to date with the collection.`);
    return;
  }
  if (changed.length && confirm) {
    const list = changed.slice(0, 8).map((p) => p.dest).join('\n');
    const more = changed.length > 8 ? `\n… and ${changed.length - 8} more` : '';
    const ok = await vscode.window.showWarningMessage(
      `${what}: ${changed.length} existing file(s) will be replaced by the collection version.`,
      { modal: true, detail: `${list}${more}` },
      'Replace');
    if (ok !== 'Replace') return;
  }
  const written = install.applyPlan(targetRoot, plan);
  const modesNote = plan.filter((p) => p.added || p.updated)
    .map((p) => ` Modes added: ${p.added.length}, updated: ${p.updated.length}.`).join('');
  vscode.window.showInformationMessage(
    `${what}: wrote ${written.length} file(s) into .bob/.${modesNote}`, 'Open .bob folder')
    .then((open) => {
      if (open) vscode.commands.executeCommand('revealInExplorer', vscode.Uri.file(path.join(targetRoot, '.bob')));
    });
}

// --- pickers ----------------------------------------------------------------------

function modeItems(catalog, installedSlugs = [], preselect = []) {
  return catalog.groups.flatMap((g) => [
    { label: g.label, kind: vscode.QuickPickItemKind.Separator },
    ...g.modes.map((m) => ({
      label: m.name || m.slug,
      description: `${m.slug}${installedSlugs.includes(m.slug) ? ' · installed' : ''}`,
      detail: [m.description, m.skills.length ? `Skills: ${m.skills.join(', ')}` : ''].filter(Boolean).join(' — '),
      slug: m.slug,
      picked: preselect.includes(m.slug),
    })),
  ]);
}

function skillItems(catalog, preselect = []) {
  const usedBy = new Map();
  for (const g of catalog.groups) for (const m of g.modes) for (const s of m.skills) {
    usedBy.set(s, [...(usedBy.get(s) || []), m.slug]);
  }
  return catalog.skills.map((s) => ({
    label: s.id,
    description: s.hasSkillFile ? (usedBy.has(s.id) ? `used by ${usedBy.get(s.id).join(', ')}` : 'standalone') : 'missing SKILL.md',
    detail: s.description,
    picked: preselect.includes(s.id),
    id: s.id,
  }));
}

async function pickModes(catalog, sourceLabel, installedSlugs, preselect = []) {
  const picks = await pickWithDocs(catalog, {
    title: `Import Bob modes — source: ${sourceLabel}`, items: modeItems(catalog, installedSlugs, preselect),
  });
  return picks?.map((p) => p.slug);
}

async function pickSkills(catalog, sourceLabel, preselect = []) {
  const picks = await pickWithDocs(catalog, {
    title: `Import Bob skills — source: ${sourceLabel}`, items: skillItems(catalog, preselect),
  });
  return picks?.map((p) => p.id);
}

async function pickGroup(catalog) {
  if (catalog.groups.length === 1) return catalog.groups[0];
  const pick = await vscode.window.showQuickPick(
    catalog.groups.map((g) => ({ label: g.label, description: `${g.modes.length} modes`, group: g })),
    { title: 'Select a mode group' });
  return pick?.group;
}

// --- commands -------------------------------------------------------------------

function command(context, fn) {
  return async (...args) => {
    try {
      const loaded = await getCatalog(context);
      if (!loaded) return;
      const targetRoot = await pickTargetRoot();
      if (!targetRoot) return;
      await fn(loaded.catalog, loaded.sourceLabel, targetRoot, ...args);
    } catch (err) {
      vscode.window.showErrorMessage(`Bob Config Importer: ${err.message}`);
    }
  };
}

async function importModes(catalog, sourceLabel, targetRoot, preselectedSlug) {
  const preselect = preselectedSlug ? [preselectedSlug] : [];
  const slugs = await pickModes(catalog, sourceLabel, install.existingModeSlugs(catalog, targetRoot), preselect);
  if (!slugs?.length) return;
  const needed = install.skillsForModes(catalog, slugs);
  let skills = [];
  if (needed.length) {
    const choice = await vscode.window.showQuickPick(
      [
        { label: `Install the ${needed.length} referenced skill(s) too`, detail: needed.join(', '), value: true },
        { label: 'Modes only', detail: 'The modes will tell you when a referenced skill file is missing.', value: false },
      ],
      { title: 'The selected modes read these skills' });
    if (!choice) return;
    if (choice.value) skills = needed;
  }
  const plan = [...install.planModes(catalog, targetRoot, slugs), ...install.planSkills(catalog, targetRoot, skills)];
  await confirmAndApply(targetRoot, plan, 'Import modes');
}

async function importSkills(catalog, sourceLabel, targetRoot) {
  const ids = await pickSkills(catalog, sourceLabel);
  if (!ids?.length) return;
  await confirmAndApply(targetRoot, install.planSkills(catalog, targetRoot, ids), 'Import skills');
}

async function importOther(catalog, sourceLabel, targetRoot) {
  const group = await pickGroup(catalog);
  if (!group) return;
  const entries = install.supportEntries(catalog, group.id);
  if (!entries.length) {
    vscode.window.showInformationMessage(`${group.label} has no other configurations.`);
    return;
  }
  const picks = await vscode.window.showQuickPick(
    entries.map((e) => ({ label: e.label, description: `→ ${e.to}`, detail: `${e.files.length} file(s)`, id: e.id })),
    { canPickMany: true, title: `Import other configurations — ${group.label} — source: ${sourceLabel}` });
  if (!picks?.length) return;
  const plan = install.planSupport(catalog, targetRoot, group.id, picks.map((p) => p.id));
  await confirmAndApply(targetRoot, plan, 'Import other configurations');
}

async function importGroup(catalog, sourceLabel, targetRoot) {
  const group = await pickGroup(catalog);
  if (!group) return;
  const slugs = group.modes.map((m) => m.slug);
  const plan = [
    ...install.planModes(catalog, targetRoot, slugs),
    ...install.planSkills(catalog, targetRoot, install.skillsForModes(catalog, slugs)),
    ...install.planSupport(catalog, targetRoot, group.id, install.supportEntries(catalog, group.id).map((e) => e.id)),
  ];
  await confirmAndApply(targetRoot, plan, `Import ${group.label} (${sourceLabel})`);
}

// --- direct installs (sidebar): no pickers, no confirmation ------------------------
// The collection is the leading configuration, so existing files are replaced.

function directCommand(context, webviewProvider, fn) {
  return async (...args) => {
    try {
      const loaded = await getCatalog(context);
      if (!loaded) return;
      const folder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
      if (!folder) {
        vscode.window.showErrorMessage('Open the Bob workspace folder first; configurations are installed into its .bob/ folder.');
        return;
      }
      await fn(loaded.catalog, folder, ...args);
      webviewProvider.refresh();
    } catch (err) {
      vscode.window.showErrorMessage(`Bob Config Importer: ${err.message}`);
    }
  };
}

const NO_CONFIRM = { confirm: false };

async function installMode(catalog, targetRoot, slug) {
  const plan = [...install.planModes(catalog, targetRoot, [slug]), ...install.planSkills(catalog, targetRoot, install.skillsForModes(catalog, [slug]))];
  await confirmAndApply(targetRoot, plan, `Mode ${slug}`, NO_CONFIRM);
}

async function installSkill(catalog, targetRoot, id) {
  await confirmAndApply(targetRoot, install.planSkills(catalog, targetRoot, [id]), `Skill ${id}`, NO_CONFIRM);
}

async function installGroup(catalog, targetRoot) {
  const plan = catalog.groups.flatMap((group) => {
    const slugs = group.modes.map((m) => m.slug);
    return [
      ...install.planModes(catalog, targetRoot, slugs),
      ...install.planSkills(catalog, targetRoot, install.skillsForModes(catalog, slugs)),
      ...install.planSupport(catalog, targetRoot, group.id, install.supportEntries(catalog, group.id).map((e) => e.id)),
    ];
  });
  await confirmAndApply(targetRoot, plan, 'Full group', NO_CONFIRM);
}

async function installOther(catalog, targetRoot) {
  const plan = catalog.groups.flatMap((group) =>
    install.planSupport(catalog, targetRoot, group.id, install.supportEntries(catalog, group.id).map((e) => e.id)));
  await confirmAndApply(targetRoot, plan, 'Other configurations', NO_CONFIRM);
}

// Read documentation without installing; Enter or the book icon opens it.
async function browseDocs(context) {
  try {
    const loaded = await getCatalog(context);
    if (!loaded) return;
    const { catalog, sourceLabel } = loaded;
    const items = [
      ...modeItems(catalog),
      { label: 'Skills', kind: vscode.QuickPickItemKind.Separator },
      ...skillItems(catalog),
    ];
    const picks = await pickWithDocs(catalog, {
      title: `Bob documentation — source: ${sourceLabel}`, items, canPickMany: false,
    });
    if (picks?.length) await showDocs(catalog, picks[0]);
  } catch (err) {
    vscode.window.showErrorMessage(`Bob Config Importer: ${err.message}`);
  }
}

// Opens the documentation of one mode or skill directly (used by the sidebar webview).
async function openDoc(context, kind, key) {
  try {
    const loaded = await getCatalog(context);
    if (!loaded) return;
    const item = kind === 'mode' ? { slug: key } : { id: key };
    await showDocs(loaded.catalog, item);
  } catch (err) {
    vscode.window.showErrorMessage(`Bob Config Importer: ${err.message}`);
  }
}

// Opens one documentation file of a mode group in the Markdown preview.
async function openDocFile(context, groupId, rel) {
  try {
    const loaded = await getCatalog(context);
    if (!loaded) return;
    const group = loaded.catalog.groups.find((g) => g.id === groupId);
    const file = group && path.resolve(group.dir, rel);
    if (!file || path.relative(group.dir, file).startsWith('..') || !fs.existsSync(file)) {
      throw new Error(`documentation file not found: ${groupId}/${rel}`);
    }
    await vscode.commands.executeCommand('markdown.showPreview', vscode.Uri.file(file));
  } catch (err) {
    vscode.window.showErrorMessage(`Bob Config Importer: ${err.message}`);
  }
}

async function selectSource() {
  const current = settings().source;
  const pick = await vscode.window.showQuickPick([
    { label: 'GitHub repository', description: settings().repository, detail: 'Latest modes and skills from a public GitHub repository (default).', value: 'github' },
    { label: 'Bundled', detail: 'The collection packaged into this extension version (works offline).', value: 'bundled' },
    { label: 'Local folder', detail: 'A bob_config_collection folder on disk (setting: localCollectionPath).', value: 'local' },
  ].map((i) => ({ ...i, picked: i.value === current })), { title: 'Bob collection source' });
  if (!pick) return;
  const config = vscode.workspace.getConfiguration(CONFIG);
  await config.update('source', pick.value, vscode.ConfigurationTarget.Global);
  if (pick.value === 'github') {
    const repo = await vscode.window.showInputBox({
      title: 'GitHub repository (owner/name) that contains bob_config_collection/',
      value: settings().repository,
      validateInput: (v) => (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(v) ? undefined : 'Use owner/name'),
    });
    if (repo) await config.update('githubRepository', repo, vscode.ConfigurationTarget.Global);
  }
}

function activate(context) {
  const register = (id, handler) => context.subscriptions.push(vscode.commands.registerCommand(`${CONFIG}.${id}`, handler));
  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(DOC_SCHEME, docProvider));

  // Sidebar webview panel
  const webviewProvider = new BobConfigWebviewProvider(context);
  context.subscriptions.push(webviewProvider);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('bobConfigImporter.mainView', webviewProvider),
  );

  register('browseDocs', () => browseDocs(context));
  register('showModeDoc', (slug) => openDoc(context, 'mode', slug));
  register('showSkillDoc', (id) => openDoc(context, 'skill', id));
  register('openDocFile', (groupId, rel) => openDocFile(context, groupId, rel));
  register('importModes', command(context, async (catalog, sourceLabel, targetRoot, preselectedSlug) => {
    await importModes(catalog, sourceLabel, targetRoot, preselectedSlug);
    webviewProvider.refresh();
  }));
  register('importSkills', command(context, async (catalog, sourceLabel, targetRoot) => {
    await importSkills(catalog, sourceLabel, targetRoot);
    webviewProvider.refresh();
  }));
  register('installMode', directCommand(context, webviewProvider, installMode));
  register('installSkill', directCommand(context, webviewProvider, installSkill));
  register('installGroup', directCommand(context, webviewProvider, installGroup));
  register('installOther', directCommand(context, webviewProvider, installOther));
  register('importOther', command(context, importOther));
  register('importGroup', command(context, async (catalog, sourceLabel, targetRoot) => {
    await importGroup(catalog, sourceLabel, targetRoot);
    webviewProvider.refresh();
  }));
  register('selectSource', selectSource);
  register('refreshCollection', async () => {
    try {
      const source = await resolveCollection(context, { force: true });
      if (source) {
        vscode.window.showInformationMessage(`Bob collection loaded from ${source.label}.`);
        webviewProvider.refresh();
      }
    } catch (err) {
      vscode.window.showErrorMessage(`Bob Config Importer: ${err.message}`);
    }
  });
}

function deactivate() {
  // Synchronous cleanup only — async work in _refresh() is already guarded
  // by the _disposed flag so any in-flight promise resolves harmlessly.
}

module.exports = { activate, deactivate };
