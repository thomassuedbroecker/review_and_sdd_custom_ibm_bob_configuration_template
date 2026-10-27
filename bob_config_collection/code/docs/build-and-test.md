# Build and Test

All commands run in `bob_config_collection/code/`.

## Prerequisites

- Node.js ≥ 18 and npm
- VS Code ≥ 1.85, or IBM Bob, to install the extension

## Generate the .vsix step by step

1. Open a terminal in the extension folder:

   ```bash
   cd bob_config_collection/code
   ```

2. Install the packaging tool (only needed once, or after `package.json` changes):

   ```bash
   npm install
   ```

3. Optional but recommended: run the tests and check the template sync:

   ```bash
   npm test
   npm run sync:check
   ```

4. Package the extension:

   ```bash
   npm run package
   ```

   This runs `npm run build` first, which:
   - checks that every skill a mode references exists and that every skill
     folder has a `SKILL.md` (the build stops on errors)
   - copies `bob_config_collection/modes/` and `bob_config_collection/skills/`
     into `dist/collection/` (the **bundled** source)
   - copies the repository `LICENSE` next to `package.json` (required by `vsce`)

   Then `vsce package` writes the extension file:

   ```text
   bob_config_collection/code/dist/bob-config-importer-<version>.vsix
   ```

5. Install the `.vsix`:

   ```bash
   code --install-extension dist/bob-config-importer-<version>.vsix
   ```

   or use **Extensions: Install from VSIX…** in VS Code or IBM Bob.

6. Verify: open a scratch workspace and confirm both access paths work:
   - **Sidebar**: the **Bob Config Importer** icon appears in the activity bar;
     clicking it opens the catalog panel with mode and skill cards.
   - **Command Palette**: `Cmd+Shift+P` → **Bob Config: Read Mode or Skill
     Documentation…**, then **Bob Config: Import Modes…**.

`dist/`, `node_modules/`, and the copied `LICENSE` are build output and are
ignored by the repository's root `.gitignore`. To package a new version,
increase `version` in `package.json` first.

## npm scripts

| Script | What it does |
|---|---|
| `npm install` | Installs the packaging tool `@vscode/vsce` (the extension itself has no runtime dependencies) |
| `npm test` | Runs all tests in `test/` with the Node.js test runner |
| `npm run build` | Validates the collection, copies `../modes`, `../skills`, and the install layout to `dist/collection/`, and copies the repository `LICENSE` |
| `npm run package` | `build`, then `vsce package` → `dist/bob-config-importer-<version>.vsix` |
| `npm run sync:check` | Exits 1 if the template's `.bob/` differs from the collection |
| `npm run sync:template` | Updates the template's `.bob/` from the collection |

`build` fails if a mode references a skill that does not exist, or a skill
folder has no `SKILL.md`.

## Tests

| File | Covers |
|---|---|
| `test/catalog.test.js` | Mode file parsing, skill references, consistency of the real collection |
| `test/install.test.js` | Path rewriting, `custom_modes.yaml` upsert, MCP merge, end-to-end install into a temporary workspace |
| `test/docs.test.js` | Generated documentation for every mode and skill (when-to-use text, skills, installed paths, SKILL.md content) |
| `test/github.test.js` | GitHub download with a fake `fetch` (filtering, caching, input validation) |
| `test/template-sync.test.js` | The template's `.bob/` matches the collection for overlapping modes and their skills |

## Template sync

The template's out-of-the-box configuration in `.bob/` is generated from the
collection:

```bash
npm run sync:template
```

`src/tools/sync-workspace.js` options:

| Option | Meaning |
|---|---|
| `--target <dir>` | Workspace whose `.bob/` is updated (required) |
| *(default)* | Only modes whose slug already exists in the target, and the skills they reference |
| `--all` | Also add all other modes and all skills of the collection |
| `--check` | Write nothing; list differing files and exit 1 if there are any |
| `--collection <dir>` | Collection folder (default: `bob_config_collection/`) |

The sync never removes modes or files. If a skill is renamed or removed in the
collection, delete the old folder in `.bob/skills/` yourself.

## Develop and debug

Open `bob_config_collection/code/` in VS Code and press **F5** (Run Extension).
Without a build, the **bundled** source falls back to the parent
`bob_config_collection/` folder, so changes to modes and skills are visible
immediately.

## Release checklist

1. Update `version` in `package.json`.
2. `npm test` and `npm run sync:check` pass.
3. `npm run package`, then install the `.vsix` and run **Import Modes…** in a
   scratch workspace.
