# automations/

Bash scripts that invoke IBM Bob from the command line, designed to run
non-interactively in a terminal, CI pipeline, or scheduled job.

All scripts must be run from the **workspace root** (the folder containing `.bob/`):

```bash
# from the workspace root
automations/<script>.sh [options]
```

---

## How paths work

The scripts always run `bob` from the **workspace root**, never from inside a repo.
This is the key design decision — it keeps `.bob/skills/` reachable while still
letting Bob review an external repo:

```
workspace root  (bob runs here)
├── .bob/
│   └── skills/          ← Bob reads skill files from here (./.bob/skills/)
├── repos/
│   └── <name>/          ← source code to review (passed as absolute path in prompt)
├── automations/
│   └── run_arch_review.sh
└── reviews/             ← output files land here (created automatically)
```

| Path | How it is resolved |
|---|---|
| `.bob/skills/*.md` | Relative to workspace root — always found at `./.bob/skills/` |
| Repo source files | Absolute path (`$WORKSPACE_ROOT/repos/<name>`) embedded in the prompt |
| `--out FILE` | Made absolute before bob runs — output always lands in the workspace |

> **Why not `--include-directories`?**  
> The `--include-directories` flag in bob CLI v1.0.1 has a schema bug that causes
> `list_files` to fail. The absolute-path-in-prompt approach is the working alternative.

> **Why is `repos/` not in `.gitignore`?**  
> Bob respects `.gitignore` as a read blocklist. If `repos/` is gitignored, Bob
> cannot read any file inside it. The `.gitignore` in this workspace does **not**
> list `repos/` for this reason. Add individual repo names if you want to exclude
> specific clones from git tracking (see `.gitignore` comments).

---

## Prerequisites

| Tool | Purpose | Check |
|---|---|---|
| `bob` CLI ≥ 1.0 | IBM Bob Shell | `which bob` |
| `node` ≥ 18 | Runtime for bob | `node --version` |
| `nvm` (recommended) | Manages node versions | `nvm --version` |
| `git` | Cloning repos into `repos/` | `git --version` |

### Ensuring bob is on PATH

`bob` is installed as a Node.js global package under nvm. Activate the correct
node version before running any script:

```bash
nvm use default    # or: nvm use 22
which bob          # should print a path
bob --version      # should print e.g. 1.0.1
```

The scripts **auto-bootstrap nvm** if `bob` is not found on PATH — they source
`~/.nvm/nvm.sh` and call `nvm use default` silently. If bob is still not found
after that, the script exits with a clear error and three remediation options.

---

## Scripts

### `run_arch_review.sh` — Architecture Review

Invokes IBM Bob to run an architecture review against a cloned repository
placed inside the `repos/` folder. Bob reads skill files from `.bob/skills/`
(workspace) and source files from `repos/<name>` (absolute path).

```bash
automations/run_arch_review.sh --repo <name> [options] [PROMPT]
```

#### Required

| Parameter | Description |
|---|---|
| `--repo NAME` | Name of the subdirectory inside `repos/`. Clone the repo first: `git clone <url> repos/<name>` |

#### Options

| Flag | Default | Description |
|---|---|---|
| `--mode MODE` | `arch-review` | Review mode — see table below |
| `--output FORMAT` | `text` | Output format: `text`, `json`, or `stream-json` |
| `--max-coins N` | _(unset)_ | Abort with exit code 1 if token budget is exceeded |
| `--out FILE` | _(stdout)_ | Write output to FILE (path relative to workspace root; dirs created automatically) |
| `-y`, `--yolo` | `false` | Auto-approve all Bob tool calls — required for CI / non-interactive runs |
| `-h`, `--help` | | Print usage and exit |

#### Available modes

| Mode | Skill file(s) read | Covers |
|---|---|---|
| `arch-review` | all 7 skills | Comprehensive review — all areas |
| `security-review` | `security-threat-modeling-skill.md` | STRIDE threat model, OWASP Top 10 |
| `scalability-review` | `scalability-performance-skill.md` | Bottlenecks, scaling strategy, SLAs |
| `patterns-review` | `architecture-patterns-skill.md` | SOLID, design patterns, anti-patterns |
| `maintainability-review` | `maintainability-technical-debt-skill.md` | Technical debt, coupling, refactoring |
| `documentation-review` | `documentation-review-skill.md` | ADRs, C4 diagrams, API docs, license notices |
| `twelve-factor-review` | `twelve-factor-compliance-skill.md` | 12-factor compliance, cloud-native readiness |
| `business-alignment-review` | `business-alignment-skill.md` | Stakeholder requirements, cost-benefit |

#### Startup output

Every run prints a summary before bob starts — use it to verify paths are correct:

```
✅ bob found: /…/.nvm/versions/node/v22.22.2/bin/bob  (version 1.0.1)
🏛️  IBM Bob Architecture Review
   Workspace : /abs/path/to/workspace          ← bob runs here; .bob/skills/ resolved from here
   Repo      : /abs/path/to/workspace/repos/simple_kafka_example
   Skills    : /abs/path/to/workspace/.bob/skills/
   Mode      : arch-review
   Format    : text
   Prompt    : Conduct a comprehensive architecture review of the source code located at …
   Output    : /abs/path/to/workspace/reviews/simple_kafka_example-arch-20250615.md
```

#### Examples

```bash
# 0. One-time setup — clone the repo you want to review
git clone https://github.com/example/simple-kafka repos/simple_kafka_example

# 1. Full architecture review — print to terminal
automations/run_arch_review.sh --repo simple_kafka_example

# 2. Full review — save to a dated Markdown file
REPO=simple_kafka_example
automations/run_arch_review.sh --repo ${REPO} \
  --out reviews/${REPO}-arch-$(date +%Y%m%d).md

# 3. Focused security review — save to file
automations/run_arch_review.sh --repo simple_kafka_example \
  --mode security-review \
  --out reviews/simple_kafka_example-security-$(date +%Y%m%d).md

# 4. 12-factor compliance check
automations/run_arch_review.sh --repo simple_kafka_example \
  --mode twelve-factor-review

# 5. CI mode — non-interactive, JSON output, token budget cap
automations/run_arch_review.sh --repo simple_kafka_example \
  --yolo --output json --max-coins 500 \
  --out /tmp/review.json

# 6. Custom prompt — override the default question entirely
automations/run_arch_review.sh --repo simple_kafka_example \
  "Focus only on the Kafka consumer error handling and retry logic"
```

#### Exit codes

| Code | Meaning |
|---|---|
| `0` | Review completed successfully |
| `1` | bob not found / repo not found / invalid mode / token budget exceeded |

---

## Folder layout

```
workspace root/
├── .bob/
│   └── skills/                    ← skill files — read by bob during review
├── automations/
│   ├── README.md                  ← this file
│   └── run_arch_review.sh         ← architecture review script
├── repos/
│   └── simple_kafka_example/      ← git clone <url> repos/<name>
└── reviews/                       ← review output files (--out target)
    └── simple_kafka_example-arch-20250615.md
```

> **Tip — git-tracking of `reviews/`**: The `.gitignore` in this workspace lists `reviews/`
> so that generated review files are not committed by default. Remove or comment out that
> line if you want to version-control your review outputs.

---

## Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| `❌ 'bob' command not found` | bob not on PATH / nvm not active | `nvm use default && which bob`; or reinstall: `npm install -g @ibm/bob` |
| `❌ --repo is required` | Flag missing | Add `--repo <name>` — script lists available repos on error |
| `❌ Repository not found: …/repos/<name>` | Repo not cloned yet | `git clone <url> repos/<name>` |
| `❌ Invalid mode: '<x>'` | Typo in mode name | See the mode table above |
| `Error parsing JSON: Unexpected token '<'` | MCP GitHub token is the unexpanded placeholder `${GITHUB_PERSONAL_ACCESS_TOKEN}` (BC-002) | Set a real token value in `.bob/mcp.json` — the review itself still works; only GitHub MCP tool calls fail |
| `Error executing tool read_file: ignored by configured ignore patterns` | The repo path appears in `.gitignore` | Remove or comment out the matching line in `.gitignore`; `repos/` must not be listed there |
| Review outputs not tracked by git | `reviews/` is in `.gitignore` by design | Remove or comment out the `reviews/` line in `.gitignore` to commit review files |
| `Error executing tool list_files: params/file_filtering_options must be object` | bob CLI v1.0.1 schema bug with `--include-directories` | Script does not use `--include-directories`; this error should not appear — if it does, check you are running from the workspace root |
| Skills not applied / generic output | bob was not run from workspace root | Ensure cwd is the workspace root, not inside `repos/`; the script enforces this with `cd "$WORKSPACE_ROOT"` |
| Token budget exceeded | Prompt too large for coin cap | Increase `--max-coins` or omit the flag to use no limit |
| Output file empty or not created | Write permission issue | Check the parent directory is writable; the script creates it automatically |

---

*Made with Bob*
