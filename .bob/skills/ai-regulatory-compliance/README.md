# Skill: `ai-regulatory-compliance`

> **For IT service consultants** — produces an auditor-ready AI Regulatory Compliance
> Provenance document for client projects that used AI-assisted development.

> **Scope: how the application was BUILT with AI — not how it operates with AI.**
> The document covers the AI coding assistant (e.g. IBM Bob), its sessions, permissions,
> the data it could access and the human review of its output. AI features that the built
> application uses at runtime (agents, LLM calls, categorisation, end-user disclosures)
> are **out of scope** and need a separate assessment. See *Scope* in `SKILL.md`.

---

## What this skill does

When activated, this skill guides Bob through a structured 6-step process that:

1. Verifies a `task-history/` folder of exported AI session files exists
2. Extracts structural metadata (session count, dates, file sizes) — **without reading any JSON content**
3. Interviews the consultant for project and client facts
4. Walks through a regulatory checklist covering **EU AI Act** and **GDPR** articles
5. Generates a self-contained **HTML provenance artifact** in `.bob/artifacts/`
6. Delivers a Markdown compliance summary with remediation actions for any gaps

---

## Regulations covered

### EU AI Act — Regulation (EU) 2024/1689

| Article | Official Title | Enforcement Date | Status |
|---|---|---|---|
| **Art. 50** | Transparency Obligations for Providers and Deployers of Certain AI Systems | 2 Aug 2026 — all AI tiers | 🔴 **Already in force** |
| **Art. 13** | Transparency and Provision of Information to Deployers | 2 Dec 2027 (Annex III) · 2 Aug 2028 (Annex I) | 🟡 Future obligation |
| **Art. 14** | Human Oversight | 2 Dec 2027 (Annex III) · 2 Aug 2028 (Annex I) | 🟡 Future obligation |
| **Art. 16** | Obligations of Providers of High-Risk AI Systems | 2 Dec 2027 (Annex III) · 2 Aug 2028 (Annex I) | 🟡 Future obligation |

> ⚠️ **Art. 50 is already legally binding** (since 2 August 2026). If the system interacts
> directly with end users, the disclosure obligation applies **today**.
>
> Art. 13, 14, and 16 are future obligations — but preparing compliance evidence **now**
> is the correct approach. Retroactive documentation of a completed project is far harder
> than maintaining the audit trail during development. The `task-history/` folder is exactly
> the kind of evidence Art. 13 will require.

Official text: <https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689>

### GDPR — Regulation (EU) 2016/679

| Article | Official Title | In Force |
|---|---|---|
| **Art. 5** | Principles relating to processing of personal data | 25 May 2018 |
| **Art. 22** | Automated individual decision-making, including profiling | 25 May 2018 |
| **Art. 25** | Data protection by design and by default | 25 May 2018 |

Official text: <https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679>

> GDPR articles are **conditionally applied** — if no personal data was processed by
> the AI tool, those checklist items are marked ✓ with the note
> *"No personal data processed — article not triggered."*

---

## Skill file location

```
.bob/skills/ai-regulatory-compliance/
├── SKILL.md          ← procedural instructions Bob follows (this is the skill)
├── README.md         ← this file
└── SAMPLE-PROMPT.md  ← ready-to-use prompts for consultants
```

---

## How to activate

The skill auto-activates when you say something like:

- *"Generate the AI regulatory compliance document for this project"*
- *"Produce the EU AI Act provenance report"*
- *"Create the GDPR and AI Act compliance checklist for the client"*
- *"Run the ai-regulatory-compliance skill"*
- *"/ai-regulatory-compliance"*

---

## Prerequisites

Before running the skill, the following must be in place:

| Requirement | Details |
|---|---|
| `task-history/` folder | Must exist at the workspace root |
| Numbered sub-folders | Each named `<NN>-<title>/` (e.g. `01-init-setup/`) |
| JSON export per session | Each sub-folder contains one `bob-task-<id>-<YYYY-MM-DD>.json` |
| Consultant availability | The consultant must answer ~10 project/client questions interactively |

The skill **does not** require:
- Running tests or build tools
- Reading source code
- Opening any JSON file

---

## Workflow overview

```
Step 0  Verify task-history/ exists and has the correct structure
Step 1  Extract structural metadata from task-history/ (folder names, file sizes, dates)
Step 2  Interview the consultant for client/project facts (ask_followup_question)
Step 3  Walk the regulatory checklist — EU AI Act Art. 50 → 13 → 14 → 16 → GDPR Art. 5 → 22 → 25
Step 4  Define the provenance document structure (12 mandatory sections)
Step 5  Generate the HTML artifact → .bob/artifacts/<project-slug>-ai-regulatory-compliance.html
Step 6  Deliver a Markdown compliance summary with remediation actions
```

---

## Output artifact

A self-contained HTML file written to:

```
.bob/artifacts/<project-slug>-ai-regulatory-compliance.html
```

The document always contains these sections in order:

1. Header (badges, metadata grid)
2. Executive Summary
3. AI-Assisted Project Metrics
4. Built Application (Object of Development) — no runtime-AI description
5. AI Tool Provenance
6. Session Timeline
7. Regulatory Compliance Checklist (EU AI Act + GDPR)
8. Data Privacy & Ethical Use Statement
9. Limitations & Known Gaps
10. Remediation Actions
11. **Legal Reference Appendix** ← always present, verbatim from the skill
12. Footer (dynamic generation date, consultant placeholder, disclaimer)

---

## Checklist items at a glance

### EU AI Act Art. 50 (all AI tiers — earliest enforcement 2 Aug 2026)
- End users informed they interact with an AI system
- AI-generated content disclosed as AI-generated
- Deep-fake / synthetic media disclosures in place (if applicable)

### EU AI Act Art. 13 (high-risk systems)
- AI tool name and version documented
- Development / engagement period documented
- Intended purpose described
- Capabilities and limitations stated
- Data types processed described
- Session audit trail retained in `task-history/`

### EU AI Act Art. 14 (high-risk systems)
- Human oversight mode documented
- Review and approval process described
- Explicit statement: no AI output deployed without human review

### EU AI Act Art. 16 (high-risk systems)
- Risk classification stated
- Post-deployment monitoring described
- Responsible person / team identifiable

### GDPR Art. 5 (if personal data processed)
- Personal data identified and documented
- Legal basis for processing stated
- Data minimisation demonstrated

### GDPR Art. 22 (if automated decisions affect persons)
- No solely automated decisions with legal effect — OR lawful basis documented
- Human intervention mechanism in place
- Data subjects informed of automated decision-making

### GDPR Art. 25 (if personal data involved in system design)
- Privacy-by-design measures documented
- Privacy by default demonstrated
- Technical and organisational measures described

---

## Key constraints

| Constraint | Reason |
|---|---|
| Never read JSON content from `task-history/` | Structural metadata only — content may be confidential |
| Never execute build tools, tests, or linters | Skill is code-tool-free; safe for non-developer consultants |
| Never hardcode dates | All timestamps resolved dynamically at runtime |
| Never fabricate values | Unverified fields shown as `[consultant to confirm]` in amber |
| Legal Reference Appendix is mandatory | Provides verified article citations and law URLs in every output |

---

## Legal reference sources used in this skill

All article texts were verified against live sources before being embedded in the skill:

| Source | Verified articles |
|---|---|
| `artificialintelligenceact.eu` | EU AI Act Art. 13, 14, 16, 50 |
| `gdpr-info.eu` | GDPR Art. 5, 22, 25 |
| `eur-lex.europa.eu` | Official texts for both regulations |

> **Disclaimer:** This skill and its outputs reference EU regulations for transparency purposes.
> They do not constitute legal advice. Consult qualified legal counsel to determine the full
> applicability of these regulations to a specific system and deployment context.

---

## task-history/ — Structure and Maintenance

The `task-history/` folder is the **audit trail** for all AI-assisted work in the project.
Every completed Bob task session is exported as a JSON file and placed into a numbered folder.
This folder is the primary evidence source for this skill.

### Folder structure

```
task-history/
├── 01-init-setup-bob/
│   └── bob-task-18fe7f75426085f1c6231844d61a65ae-2026-08-20.json
├── 02-initial-spec-drive-dev-plan/
│   └── bob-task-<id>-<date>.json
├── ...
└── 61-verify-task-export/
    └── bob-task-9f4ffb0856d4c846b74c35799cf5debc-2026-09-30.json
```

### Folder naming convention

```
<NUMBER>-<TASK-TITLE-SLUGIFIED>/
```

| Part | Rule | Example |
|---|---|---|
| `NUMBER` | Two-digit zero-padded sequence, increment by 1 per task | `01`, `02`, … `61` |
| `TASK-TITLE-SLUGIFIED` | Lowercase words separated by hyphens; short but recognisable | `init-setup-bob` |

Full example: `42-task-fix-conversation-inspector-id-handling-ui-clarity/`

The JSON file inside follows the Bob export naming convention:

```
bob-task-<session-id>-<YYYY-MM-DD>.json
```

### File size reference

| Size range | Typical session type |
|---|---|
| 100–300 KB | Short setup or configuration task |
| 300 KB – 2 MB | Standard implementation task |
| 2 MB – 10 MB | Complex multi-file refactoring or evaluation task |

### What this skill reads from task-history/

The task-history JSON files are the **primary evidence source** for this skill.
The skill reads them in two passes:

**Pass 1 — structural metadata (from directory listing):**

| What is read | How it is used |
|---|---|
| Folder names (`01-init-setup-bob/`) | Session titles and phase grouping |
| JSON filename date (`2026-08-20`) | First/last session date, development span |
| JSON file size (from `rtk ls`) | Largest session proxy metric |
| Total folder count | Total AI sessions metric |

**Pass 2 — session content (targeted fields from JSON files):**

| Field extracted | Maps to checklist item |
|---|---|
| Task title / first `user` message | Art. 13 — development record, intended purpose |
| `model` field | Art. 13 — AI tool and model transparency |
| Bob modes in session headers | Art. 13 — tool provenance |
| Filenames from `write_file` / `apply_diff` calls | Art. 13 — system description |
| Human follow-up messages after tool calls | Art. 14 — human oversight evidence |
| `execute_command` calls with `pytest` / `ruff` | Art. 16 — quality assurance evidence |
| Privacy-related terms in messages | GDPR Art. 5 / 25 — data handling evidence |
| `usage` / `cost` field | Metrics table — total AI spend |

> ⚠️ **Confidentiality:** Only the specific fields above are extracted.
> Conversation text is never quoted verbatim — findings are summarised as
> structured evidence. Personal data found in sessions is never reproduced.

---

## Current process — Manual

Today, every entry in `task-history/` is created **manually** by the developer
after completing a Bob task session.

**1. Finish the Bob task**
Complete all work within the current Bob task. Confirm the task is done before exporting.

**2. Export the session from Bob**
In the Bob IDE, use the export function to save the task session as a JSON file.
The file is named automatically: `bob-task-<session-id>-<YYYY-MM-DD>.json`

**3. Determine the next sequence number**
```bash
ls task-history/ | tail -1
# → 61-verify-task-export/   →   next number: 62
```

**4. Create the numbered folder**
```bash
mkdir task-history/62-my-task-title/
```

**5. Move the exported JSON into the folder**
```bash
mv ~/Downloads/bob-task-<id>-<date>.json task-history/62-my-task-title/
```

**6. Commit to git**
```bash
git add task-history/62-my-task-title/
git commit -m "task-history: add session 62 — my-task-title"
```

---

## Future automation — Bob `Stop` hook (concept)

> **Status: not implemented.** All entries are currently created manually.
> This section documents how effort could be reduced in the future.

### How it would work

Bob fires a `Stop` event automatically after every task loop completes.
A hook script registered to that event could:

1. Read the session ID and date from the Bob event payload
2. Derive the next sequence number by counting existing folders
3. Read the task title from a convention file (`.bob/current-task-title`)
4. Create the numbered folder: `task-history/<NN>-<slug>/`
5. Optionally stage the folder with `git add`

### Bob `Stop` event payload

```json
{
  "session_id": "task-abc123",
  "cwd": "/path/to/workspace",
  "hook_event_name": "Stop",
  "last_assistant_message": "All steps completed."
}
```

### Existing `Stop` hook in this project

A `Stop` hook is already registered in `.bob/settings.json`:

```json
"Stop": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "sh .bob/hooks/rtk-stop.sh",
        "timeout": 10
      }
    ]
  }
]
```

The existing `rtk-stop.sh` logs the stop event and runs `rtk gain`.
It does **not** create `task-history/` folders today.
A future implementation would add a second handler or extend this script.

### Sketch of a future `task-history-stop.sh`

```bash
#!/bin/sh
# task-history-stop.sh — concept sketch, NOT YET IMPLEMENTED
#
# Limitations:
#   - Bob does not expose the JSON export path to hooks — the user must
#     still export from the IDE and move the file manually.
#   - The hook runs non-interactively; the task title must come from
#     .bob/current-task-title (written at session start via a SessionStart hook).

set -eu

PAYLOAD=$(cat)
SESSION_ID=$(echo "$PAYLOAD" | python3 -c "import sys,json; print(json.load(sys.stdin).get('session_id','unknown'))")

# Next sequence number
LAST=$(ls -d task-history/[0-9]* 2>/dev/null | sort | tail -1 \
       | grep -oE '[0-9]+$' || echo "0")
NEXT=$(printf "%02d" $((LAST + 1)))

# Task title from convention file
TITLE_FILE=".bob/current-task-title"
if [ -f "$TITLE_FILE" ]; then
  TITLE=$(cat "$TITLE_FILE" | tr '[:upper:]' '[:lower:]' | tr ' _' '-' | tr -cd 'a-z0-9-')
else
  TITLE="session-${SESSION_ID:0:8}"
fi

mkdir -p "task-history/${NEXT}-${TITLE}"
echo "task-history: created task-history/${NEXT}-${TITLE} — place the Bob JSON export inside"
exit 0
```

### What would still be manual even with the hook

| Step | With hook | Without hook |
|---|---|---|
| Folder creation | ✓ Automated | Manual |
| Sequence numbering | ✓ Automated | Manual |
| Task title | Read from `.bob/current-task-title` | Manual folder naming |
| JSON export from Bob IDE | Still manual — Bob does not expose the path | Manual |
| Moving JSON into folder | Still manual | Manual |
| Git commit | Could be added to hook | Manual |
| **Total effort** | ~1 min | ~5 min |

### Complementary `SessionStart` hook for title capture

```bash
# At session start, write the task title into a convention file
# so the Stop hook can read it without interaction.
# Set CURRENT_TASK_TITLE env var before starting Bob.
echo "${CURRENT_TASK_TITLE:-untitled}" > .bob/current-task-title
```
