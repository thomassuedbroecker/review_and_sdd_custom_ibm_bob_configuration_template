# IBM Bob Config Importer

VS Code extension that installs IBM Bob **modes**, **skills**, and **other
configurations** (scripts, MCP configuration, guides) from a
`bob_config_collection` into the `.bob/` folder of the open workspace.

By default it loads the collection from the public GitHub repository
[thomassuedbroecker/review_and_sdd_custom_ibm_bob_configuration_template](https://github.com/thomassuedbroecker/review_and_sdd_custom_ibm_bob_configuration_template).
You can point it at your own repository created from that template, use the
collection bundled with the extension (offline), or use a local folder.

Commands (Command Palette, category **Bob Config**):

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

Install it in VS Code or IBM Bob:

```bash
code --install-extension dist/bob-config-importer-0.1.0.vsix
```

Or run **Extensions: Install from VSIX…** from the Command Palette and select
the file. The `.vsix` contains the collection as it was when you packaged it
(source **bundled**). By default, the extension still loads the latest
collection from GitHub. Details: [docs/build-and-test.md](docs/build-and-test.md).

## Folder structure

| Folder | Content |
|---|---|
| `src/` | Extension and tooling code (`extension.js`, `lib/`, `config/`, `tools/`) |
| `docs/` | Documentation: [usage](docs/usage.md), [build and test](docs/build-and-test.md), [architecture](docs/architecture.md) |
| `test/` | Unit and integration tests (`npm test`) |
