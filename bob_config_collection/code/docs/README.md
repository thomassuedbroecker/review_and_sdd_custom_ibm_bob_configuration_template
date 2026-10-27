# Bob Config Importer — Documentation

This folder documents the code in [`bob_config_collection/code/`](../). The code
serves two jobs:

1. **VS Code extension**: install modes, skills, and other configurations from
   a collection into any IBM Bob workspace.
2. **Template sync**: keep the template repository's out-of-the-box `.bob/`
   configuration identical to the collection for the modes and skills they
   share.

| Document | Read it when you want to… |
|---|---|
| [usage.md](usage.md) | install the extension, import modes and skills, or use your own GitHub repository |
| [build-and-test.md](build-and-test.md) | run the tests, package a `.vsix`, or sync the template's `.bob/` |
| [architecture.md](architecture.md) | understand the components, the path mapping, and the sync rules |

## Repository roles

| Path | Role | Edit here? |
|---|---|---|
| `bob_config_collection/modes/`, `bob_config_collection/skills/` | **Leading** configuration (source of truth) | Yes |
| `bob_config_collection/code/src/` | Extension and sync code | Yes |
| `bob_config_collection/code/docs/` | This documentation | Yes |
| `bob_config_collection/code/test/` | Tests | Yes |
| `.bob/custom_modes.yaml` (overlapping modes), `.bob/skills/` | Out-of-the-box workspace configuration, **generated** from the collection | No. Change the collection, then run `npm run sync:template` |
| `bob_config_collection/code/dist/`, `node_modules/`, `LICENSE` | Build output (ignored by the root `.gitignore`) | No |
