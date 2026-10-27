'use strict';

const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const { loadCatalog } = require('./lib/catalog');
const install = require('./lib/install');
const { downloadCollection, readCachedSource } = require('./lib/github');
const { modeDocumentation, skillDocumentation } = require('./lib/docs');

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

async function confirmAndApply(targetRoot, plan, what) {
  const changed = plan.filter((p) => p.status === 'changed');
  const created = plan.filter((p) => p.status === 'new');
  if (!changed.length && !created.length) {
    vscode.window.showInformationMessage(`${what}: already up to date with the collection.`);
    return;
  }
  if (changed.length) {
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
  const open = await vscode.window.showInformationMessage(
    `${what}: wrote ${written.length} file(s) into .bob/.${modesNote}`, 'Open .bob folder');
  if (open) vscode.commands.executeCommand('revealInExplorer', vscode.Uri.file(path.join(targetRoot, '.bob')));
}

// --- pickers ----------------------------------------------------------------------

function modeItems(catalog, installedSlugs = []) {
  return catalog.groups.flatMap((g) => [
    { label: g.label, kind: vscode.QuickPickItemKind.Separator },
    ...g.modes.map((m) => ({
      label: m.name || m.slug,
      description: `${m.slug}${installedSlugs.includes(m.slug) ? ' · installed' : ''}`,
      detail: [m.description, m.skills.length ? `Skills: ${m.skills.join(', ')}` : ''].filter(Boolean).join(' — '),
      slug: m.slug,
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

async function pickModes(catalog, sourceLabel, installedSlugs) {
  const picks = await pickWithDocs(catalog, {
    title: `Import Bob modes — source: ${sourceLabel}`, items: modeItems(catalog, installedSlugs),
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
  return async () => {
    try {
      const loaded = await getCatalog(context);
      if (!loaded) return;
      const targetRoot = await pickTargetRoot();
      if (!targetRoot) return;
      await fn(loaded.catalog, loaded.sourceLabel, targetRoot);
    } catch (err) {
      vscode.window.showErrorMessage(`Bob Config Importer: ${err.message}`);
    }
  };
}

async function importModes(catalog, sourceLabel, targetRoot) {
  const slugs = await pickModes(catalog, sourceLabel, install.existingModeSlugs(catalog, targetRoot));
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
  register('browseDocs', () => browseDocs(context));
  register('importModes', command(context, importModes));
  register('importSkills', command(context, importSkills));
  register('importOther', command(context, importOther));
  register('importGroup', command(context, importGroup));
  register('selectSource', selectSource);
  register('refreshCollection', async () => {
    try {
      const source = await resolveCollection(context, { force: true });
      if (source) vscode.window.showInformationMessage(`Bob collection loaded from ${source.label}.`);
    } catch (err) {
      vscode.window.showErrorMessage(`Bob Config Importer: ${err.message}`);
    }
  });
}

function deactivate() {}

module.exports = { activate, deactivate };
