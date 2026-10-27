# Architecture

## Components

```text
bob_config_collection/
├── modes/<group>/*-mode.yaml        leading mode definitions (one mode per file)
├── modes/<group>/references/...     supporting files of a mode group
├── skills/<skill>/SKILL.md          leading skills (+ README.md, references/)
└── code/
    ├── src/extension.js             VS Code UI: commands, pickers, confirmation
    ├── src/lib/catalog.js           scans a collection folder → modes, skills, support files
    ├── src/lib/install.js           plans file writes: path rewrite, mode upsert, MCP merge
    ├── src/lib/github.js            downloads a collection from a public GitHub repository
    ├── src/lib/docs.js              builds the Markdown documentation of a mode or skill (preview before install)
    ├── src/config/install-layout.json   collection path → workspace path mapping
    ├── src/tools/build.js           validates and bundles the collection for packaging
    └── src/tools/sync-workspace.js  CLI: updates a workspace .bob/ (template sync)
```

The extension and the CLI use the same `catalog` and `install` modules. A
template sync and an extension import therefore produce identical files.

```text
 source (GitHub | bundled | local) ──► catalog ──► install.plan* ──► confirm ──► applyPlan ──► <workspace>/.bob/
                                          ▲
                              install-layout.json
```

Every `plan*` function returns the list of files it would write, with a status
of `new`, `changed`, or `unchanged`, and touches nothing on disk. The extension
uses that list for its confirmation dialog, and `sync-workspace --check` uses it
to detect drift.

## Path mapping

Mode files in the collection use collection-relative paths. On install they
are rewritten to the workspace layout defined in `src/config/install-layout.json`
(longest match first):

| Collection path | Workspace path |
|---|---|
| `SKILLS/<skill>/…` | `.bob/skills/<skill>/…` |
| `Modes/SDD/references/scripts/…` | `.bob/scripts/…` |
| `Modes/SDD/references/mcp/mcp.json` | `.bob/mcp.json` (merged) |
| `Modes/SDD/references/guides/…` | `.bob/documentation/guides/…` |
| `Modes/SDD/references/diagramms/…` | `.bob/documentation/diagramms/…` |
| `Modes/SDD/references/images/…` | `.bob/images/…` |
| `Modes/SDD/knowledge-sources.md` | `.bob/documentation/KNOWLEDGE_SOURCES.md` |
| `Modes/SDD/resource-licenses.md` | `.bob/documentation/RESOURCE_LICENSES.md` |
| `Modes/SDD/<other>` | `.bob/documentation/review_sdd/<other>` |
| `Modes/SDD/` (bare) | `.bob/` |

The same table decides where **Import Other Configurations…** copies the
supporting files. Only mode definitions are rewritten; supporting files
(scripts, guides) are copied byte for byte.

`exampleSkills` lists skill names that mode text mentions only as examples
(for example `sdd-custom-compliance` in the gap detector). They are not
reported as missing.

A collection in another repository can ship its own
`code/src/config/install-layout.json`, which takes precedence over the bundled
one.

## custom_modes.yaml upsert

`install.upsertModes` edits the YAML as text so that formatting, comments, and
the folded (`>-`) blocks of other modes stay exactly as they are:

1. Split the file into the header (up to `customModes:`), the list items, and
   any following top-level keys.
2. Replace an item with the same `slug` in place; append new items.
3. Re-indent collection blocks if the target uses a different list indentation.

## Template sync rules

- **Leading side:** `bob_config_collection/`.
- **Scope (default):** modes that exist in both places, plus every skill those
  modes reference. Modes that exist only in `.bob/` are not touched.
- **Enforcement:** `test/template-sync.test.js` and `npm run sync:check` fail
  while `.bob/` differs from the collection.

## Known limitations

- Only public GitHub repositories are supported; there is no token setting.
- The importer only adds and replaces files. It never deletes modes, skills,
  or files.
- Global (user-level) Bob modes are not targeted. Everything is installed into
  the workspace `.bob/` folder.
