'use strict';

// Downloads the installable part of a bob_config_collection (modes/, skills/,
// and the collection's own install layout) from a public GitHub repository.

const fs = require('fs');
const path = require('path');
const { LAYOUT_PATH } = require('./catalog');

const SOURCE_FILE = '.source.json';
const CONCURRENCY = 8;

function validate({ repository, ref, collectionPath }) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) {
    throw new Error(`invalid GitHub repository "${repository}" (expected owner/name)`);
  }
  if (!ref || /\s|\.\./.test(ref)) throw new Error(`invalid Git ref "${ref}"`);
  if (collectionPath.split('/').some((seg) => seg === '..' || seg === '')) {
    throw new Error(`invalid collection path "${collectionPath}"`);
  }
}

function isInstallable(rel) {
  return rel.startsWith('modes/') || rel.startsWith('skills/') || rel === LAYOUT_PATH;
}

function encodePath(p) {
  return p.split('/').map(encodeURIComponent).join('/');
}

// Returns metadata of a previous download in destDir, if it matches the request.
function readCachedSource(destDir, { repository, ref, collectionPath }) {
  try {
    const meta = JSON.parse(fs.readFileSync(path.join(destDir, SOURCE_FILE), 'utf8'));
    if (meta.repository === repository && meta.ref === ref && meta.collectionPath === collectionPath) return meta;
  } catch {
    // no or unreadable cache
  }
  return undefined;
}

async function downloadCollection({ repository, ref = 'main', collectionPath = 'bob_config_collection', destDir, fetchImpl = fetch }) {
  validate({ repository, ref, collectionPath });
  const headers = { 'User-Agent': 'bob-config-importer', Accept: 'application/vnd.github+json' };
  const treeUrl = `https://api.github.com/repos/${repository}/git/trees/${encodeURIComponent(ref)}?recursive=1`;
  const res = await fetchImpl(treeUrl, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${repository}@${ref}`);
  const tree = await res.json();
  if (tree.truncated) throw new Error(`GitHub tree listing for ${repository}@${ref} is truncated`);

  const prefix = `${collectionPath}/`;
  const files = (tree.tree || [])
    .filter((e) => e.type === 'blob' && e.path.startsWith(prefix))
    .map((e) => e.path.slice(prefix.length))
    .filter((rel) => isInstallable(rel) && !rel.split('/').includes('..'));
  if (!files.some((f) => f.startsWith('modes/') || f.startsWith('skills/'))) {
    throw new Error(`no ${collectionPath}/modes or ${collectionPath}/skills found in ${repository}@${ref}`);
  }

  const staging = `${destDir}.download-${process.pid}`;
  fs.rmSync(staging, { recursive: true, force: true });
  try {
    let next = 0;
    const worker = async () => {
      while (next < files.length) {
        const rel = files[next++];
        const url = `https://raw.githubusercontent.com/${repository}/${encodePath(ref)}/${encodePath(prefix + rel)}`;
        const r = await fetchImpl(url, { headers: { 'User-Agent': headers['User-Agent'] } });
        if (!r.ok) throw new Error(`download failed (${r.status}): ${prefix}${rel}`);
        const file = path.join(staging, ...rel.split('/'));
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
      }
    };
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));
    const meta = { repository, ref, collectionPath, downloadedAt: new Date().toISOString(), files: files.length };
    fs.writeFileSync(path.join(staging, SOURCE_FILE), JSON.stringify(meta, null, 2) + '\n');
    fs.rmSync(destDir, { recursive: true, force: true });
    fs.mkdirSync(path.dirname(destDir), { recursive: true });
    fs.renameSync(staging, destDir);
    return meta;
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
  }
}

module.exports = { downloadCollection, readCachedSource };
