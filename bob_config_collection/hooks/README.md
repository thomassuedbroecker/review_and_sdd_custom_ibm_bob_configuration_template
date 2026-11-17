# Hooks

Reusable IBM Bob lifecycle hooks of this collection. Each hook is declared in
[`hooks.json`](./hooks.json) (id, script file, events, and the registration
that goes into `.bob/settings.json`), which is what the
**Bob Config Importer (Community)** extension and `npm run sync:template` read.
Currently one hook:

| Hook | Event | Purpose |
|---|---|---|
| [`export-task-history.mjs`](./export-task-history.mjs) | `Stop` (optionally `SessionStart`) | Exports the Bob task conversation to `task-history/` in the workspace root |

> 🔒 **Privacy:** the exports contain the **complete conversation** of a task
> (prompts, responses, file contents quoted in messages). Treat `task-history/`
> like source code with secrets: review before committing or sharing. Run the
> hook only in a trusted workspace.

## `export-task-history.mjs`

Exports an IBM Bob task (session) from local Bob storage into a
versionable folder structure at the workspace root:

```text
task-history/
└── <NN>_<task_title_slug>/
    ├── bob-task-<id>-<YYYY-MM-DD>.json   # task metadata + messages (export payload)
    ├── ui_messages.json                  # UI message stream
    └── api_conversation_history.json     # raw API conversation
```

These exports are the required evidence input for the
[`ai-regulatory-compliance`](../skills/ai-regulatory-compliance/README.md)
skill, which generates an AI Regulatory Compliance Provenance document from
`task-history/`.

### How it works

1. **Reads the hook payload from stdin** (JSON with `session_id`, `cwd`,
   `hook_event_name`), with a 500 ms timeout so it never hangs.
2. **Loads the task from Bob storage**, trying two sources in order:
   - **SQLite** `~/.bob/db/bob.db` (read-only, queried via `python3`): task row
     plus all messages of the task.
   - **Legacy fallback:** file-based task folders under the editor's
     `globalStorage` (`IBM Bob`, `IBM Bob - Insiders`, or `Code` on
     macOS, Windows, and Linux).
3. **Writes the export** into `task-history/<NN>_<slug>/` in the workspace root:
   - Folder numbering continues from the highest existing `<NN>_` prefix.
   - A re-export of the same session reuses its existing folder; an export from
     an earlier day is replaced (the dated JSON file is rewritten).
   - When a task that was first exported with a generic title (for example
     `01_unnamed_task`) later has a meaningful title, the folder is renamed
     in place and keeps its number.

Event behavior:

- **`Stop`** (the registered event): exports the task that just ended.
- **`SessionStart`**: exports the most recent *previous* task of the workspace
  (the new session itself is excluded).
- **Manual run** from the workspace root, optionally with an explicit task id:

  ```bash
  node .bob/hooks/export-task-history.mjs [taskId]
  ```

The hook never fails the Bob session: all errors are logged to stderr and the
process exits with code `0`.

Notes on the task data available at `Stop`:

- The task row can still have an empty `title` / `first_message` while the
  session is running. The first export is then written to a generic folder such
  as `01_unnamed_task` and is renamed by a later export once a title exists.
  The `firstMessage` field of an already written export is not backfilled.
- The task `status` is recorded as stored by Bob (for example `running` when
  exported at `Stop`); it is never invented.

### Registration

The hook runs from the workspace copy in `.bob/hooks/` and is registered in
[`.bob/settings.json`](../../.bob/settings.json) (workspace scope, merged on top
of any global hooks in `~/.bob/settings/settings.json`):

> **Folder trust (Bob Shell):** workspace hooks in `.bob/settings.json` only run
> in a trusted folder; in an untrusted folder they are skipped silently and no
> export is written. Global hooks are not affected by folder trust.

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node .bob/hooks/export-task-history.mjs",
            "timeout": 15
          }
        ]
      }
    ]
  }
}
```

To use it in another Bob workspace, install it with the
**Bob Config Importer (Community)** extension (Hooks section of the sidebar, or
**Bob Config: Import Hooks…**): it copies the script to `.bob/hooks/` and merges
the registration from [`hooks.json`](./hooks.json) into that workspace's
`.bob/settings.json` (an existing entry with the same command is updated; your
other settings and hooks are kept). Alternatively, copy the file and add the
registration above by hand.

### Requirements

- **Node.js** — the script uses ES modules, top-level `await`, and `node:`
  imports (Node.js ≥ 18).
- **`python3`** on the `PATH` — only for reading the SQLite database
  `~/.bob/db/bob.db`. Without it, the hook falls back to the legacy
  file-based storage discovery.
- No npm dependencies; the script uses only the Node.js standard library.

### Relationship to `.bob/hooks/`

As everywhere in this repository, `bob_config_collection/` is the **leading
configuration** and `.bob/` holds the workspace copy. Like modes and skills,
hooks are covered by `npm run sync:template` (which also keeps the
registration in [`.bob/settings.json`](../../.bob/settings.json) up to date)
and by the **Bob Config Importer (Community)** extension — after changing a
hook here, run the sync; `test/template-sync.test.js` fails while the copies
differ.
