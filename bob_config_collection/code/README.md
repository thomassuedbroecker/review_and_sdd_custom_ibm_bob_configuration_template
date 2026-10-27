# Bob Config Importer (Community)

> **⚠️ Not affiliated with or supported by IBM.**
> This is a community extension created by Thomas Suedbroecker as a personal
> reference implementation. It is **not** an official IBM product, not endorsed
> by IBM, and not supported by IBM. IBM Bob is a trademark of IBM Corporation.
> Use this extension at your own risk.

VS Code extension that installs custom **modes**, **skills**, and **other
configurations** (scripts, MCP configuration, guides) from a
`bob_config_collection` into the `.bob/` folder of an IBM Bob workspace.

By default it loads the collection from the public GitHub repository
[thomassuedbroecker/review_and_sdd_custom_ibm_bob_configuration_template](https://github.com/thomassuedbroecker/review_and_sdd_custom_ibm_bob_configuration_template).
You can point it at your own repository created from that template, use the
collection bundled with the extension (offline), or use a local folder.

## Sidebar panel

After installation a **Bob Config Importer** icon appears in the VS Code /
IBM Bob activity bar (left-hand icon strip). Click it to open the catalog panel,
which shows all available modes and skills as cards — grouped, with tag pills and
an **Install** button per item — plus a toolbar for the remaining commands. No
Command Palette required.

## Commands

All actions are also reachable via the Command Palette (category **Bob Config**):

- **Read Mode or Skill Documentation…**: read any mode or skill without installing it
- **Import Modes…**: pick modes; the skills they reference can be installed too
- **Import Skills…**: pick skills
- **Import Other Configurations…**: scripts, MCP servers, guides, diagrams, images
- **Import Complete Mode Group…**: everything of one mode group
- **Select Collection Source…** / **Refresh Collection**

In the mode and skill pickers, select the **book icon** next to an entry to
read its documentation in a Markdown preview before you install it.

The collection is the leading configuration. Existing modes with the same slug
and files with the same path are replaced after you confirm.

## Generate the extension (.vsix)

Prerequisites: Node.js ≥ 18 and npm.

```bash
cd bob_config_collection/code
npm install          # once: installs the packaging tool @vscode/vsce
npm test             # optional: all tests must pass
npm run package      # validates and bundles the collection, then packages
```

Result: `bob_config_collection/code/dist/bob-config-importer-<version>.vsix`
(the version comes from `package.json`).

Run **Extensions: Install from VSIX…** from the Command Palette and select
the file. The `.vsix` contains the collection as it was when you packaged it
(source **bundled**). By default, the extension still loads the latest
collection from GitHub. Details: [docs/build-and-test.md](docs/build-and-test.md).

## Folder structure

| Folder | Content |
|---|---|
| `src/` | Extension and tooling code (`extension.js`, `lib/`, `config/`, `tools/`) |
| `docs/` | Documentation: [usage](docs/usage.md), [build and test](docs/build-and-test.md), [architecture](docs/architecture.md) |
| `test/` | Unit and integration tests (`npm test`) |
