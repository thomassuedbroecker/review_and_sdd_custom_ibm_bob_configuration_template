# Usage

## Install the extension

Build the `.vsix` (see [build-and-test.md](build-and-test.md)), then install it
in VS Code or IBM Bob:

```bash
code --install-extension bob_config_collection/code/dist/bob-config-importer-0.1.0.vsix
```

Or use **Extensions: Install from VSIX…** in the Command Palette.

## Read the documentation before installing

Every mode and skill can be read before anything is written to your workspace:

- In **Import Modes…** and **Import Skills…**, select the **book icon** next to
  an entry. A Markdown preview opens, and the picker stays open so that you can
  continue selecting.
- **Read Mode or Skill Documentation…** lists all modes and skills of the
  current source, for reading only.

| Documentation of a… | Shows |
|---|---|
| Mode | Name, slug, group, description, *when to use*, tool groups, the skills it uses (with their purpose), role definition, `<slug>-mode.md` from the collection if present, a **Related documentation** list (mode guide, the reference files the mode loads, the group overview, and the guides, each opening in the Markdown preview), and the exact mode definition as it will be written to `.bob/custom_modes.yaml` |
| Skill | Install target, files, which modes use it, its `README.md`, and the full `SKILL.md` |

**One click, no questions.** In the sidebar, **Install** / **Update** on a mode
card writes the mode and the skills it reads into `.bob/` of the open workspace
folder; **Install** / **Update** on a skill card writes that skill. **Full Group**
installs every mode, skill and other configuration, and **Other** installs the
other configurations (scripts, MCP, guides, diagrams, images, licenses). There is
no picker, no skills question, and no replace confirmation: the collection is the
leading configuration and existing files are replaced. A notification reports
what was written. The Command Palette commands (**Import Modes…** etc.) keep their
pickers for selecting several items at once.

In the sidebar, every mode card has a **Documentation (n)** list with the same
links, so a mode's intent and its documents are one click away without
installing anything. Click the mode name or **Docs** for the overview.

The preview is generated from the selected source (GitHub, bundled, or local),
so you read exactly what would be installed.

## Import into a workspace

Open the Bob workspace folder, then start a command in one of two ways:

- **Sidebar panel**: click the **Bob Config Importer (Community)** icon in the activity bar
  (left-hand icon strip) to open the catalog panel; click **Install** on any
  mode or skill card, or use the toolbar buttons for other actions.
- **Command Palette**: press `Cmd+Shift+P` / `Ctrl+Shift+P` and search in the
  **Bob Config** category.

Everything is written below `.bob/` in that folder.
With several workspace folders open, you are asked which one to use.

| Command | What you select | What is written |
|---|---|---|
| **Import Modes…** | Modes, grouped by mode group. Installed modes are marked `installed` | `.bob/custom_modes.yaml`, plus optionally the referenced skills in `.bob/skills/<skill>/` |
| **Import Skills…** | Skills, each showing which modes use it | `.bob/skills/<skill>/` (`SKILL.md`, `README.md`, `references/`) |
| **Import Other Configurations…** | Supporting files of a mode group | See the table below |
| **Import Complete Mode Group…** | A mode group | All of its modes, referenced skills, and other configurations |

Other configurations of the `review_sdd` group:

| Selection | Target |
|---|---|
| GitHub issue scripts | `.bob/scripts/` |
| MCP server configuration | merged into `.bob/mcp.json` (collection servers win; your other servers are kept) |
| Guides / Diagrams | `.bob/documentation/guides/`, `.bob/documentation/diagramms/` |
| Images | `.bob/images/` |
| Knowledge sources / Resource licenses | `.bob/documentation/KNOWLEDGE_SOURCES.md`, `.bob/documentation/RESOURCE_LICENSES.md` |
| Mode group documentation and references | `.bob/documentation/review_sdd/` |

### What happens to existing configuration

The collection is the leading configuration:

- A mode with the same `slug` is **replaced in place**. Other modes in
  `custom_modes.yaml`, their order, and comments before the list are kept.
- A file with the same path is **replaced**. Extra files you added to a skill
  folder are kept.
- Before anything is replaced, a confirmation dialog lists the affected files.
  Files that are already identical are skipped.

Paths inside the mode definitions are rewritten on install, for example
`SKILLS/sdd-security-threat-modeling/SKILL.md` →
`.bob/skills/sdd-security-threat-modeling/SKILL.md`. See
[architecture.md](architecture.md#path-mapping).

## Collection sources

Run **Bob Config: Select Collection Source…** or edit the settings:

| Setting | Default | Meaning |
|---|---|---|
| `bobConfigImporter.source` | `github` | `github`, `bundled` (packaged into the extension, works offline), or `local` |
| `bobConfigImporter.githubRepository` | `thomassuedbroecker/review_and_sdd_custom_ibm_bob_configuration_template` | Public repository `owner/name` |
| `bobConfigImporter.githubRef` | `main` | Branch, tag, or commit SHA |
| `bobConfigImporter.githubCollectionPath` | `bob_config_collection` | Folder in the repository that contains `modes/` and `skills/` |
| `bobConfigImporter.localCollectionPath` | *(empty → `bob_config_collection`)* | For `local`: absolute path or path relative to the first workspace folder |

The GitHub source downloads only `modes/`, `skills/`, and the collection's
`code/src/config/install-layout.json`. It caches them for one hour in the
extension's global storage. **Refresh Collection** forces a new download. If
GitHub cannot be reached, you can use the cached copy or the bundled
collection. GitHub's unauthenticated API limit (60 requests per hour) applies,
and each download uses one API request.

## Use your own reusable repository

1. Create a repository from the template on GitHub and make it public.
2. Change or add modes in `bob_config_collection/modes/<group>/<slug>-mode.yaml`
   and skills in `bob_config_collection/skills/<skill>/SKILL.md`.
3. For a new mode group with its own path prefix, add an entry to
   `bob_config_collection/code/src/config/install-layout.json`. The extension
   reads this layout from your repository. Groups without an entry still work:
   skills are mapped, and supporting files go to `.bob/documentation/<group>/`.
4. Run `npm test` in `bob_config_collection/code/`, then push.
5. In VS Code, set `bobConfigImporter.githubRepository` to `<owner>/<name>`.
