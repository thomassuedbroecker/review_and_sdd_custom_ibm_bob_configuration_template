# SDD Modes & Skills — Update Record

**Date**: 2025-09-14  
**Scope**: `Modes/SDD/` and `SKILLS/sdd-<name>/`  
**Status**: ✅ Validated — no stale paths, no broken references, no files outside boundaries

---

## Summary of Changes

The SDD skill files have been migrated from a flat `Modes/SDD/skills/` folder into
individual, self-contained skill packages under the shared `SKILLS/` catalog. The mode
YAML and all README files have been updated to reference the new locations. No files
were moved outside the `Modes/SDD/` or `SKILLS/sdd-<name>/` boundaries.

---

## Folder Structure (After)

```
Modes/SDD/
├── README.md
├── *-mode.yaml                            ← one file per mode slug (12 total)
├── architecture-review-readme.md
├── github-issue-generator-mode.md
├── github-mcp-setup.md
├── knowledge-sources.md
├── resource-licenses.md
├── sdd-readme.md
├── images/
│   ├── architecture-review.png
│   ├── configuration-gap-detector.png
│   ├── skills-review.png
│   └── spec-driven-development-overview.png
├── mcp/
│   └── mcp.json
└── references/                            ← ALL mode-related supplemental material
    ├── SDD-UPDATE.md                        (this file — change record)
    ├── ai-generated-code-reference.md       (🔍 License Impact Analysis)
    ├── impact-reference.md                  (🔍 License Impact Analysis)
    ├── jurisdiction-impact-reference.md     (🔍 License Impact Analysis)
    ├── diagramms/                           ← architecture diagrams
    │   ├── architecture-review-system.drawio
    │   ├── architecture-review-system.md
    │   ├── configuration-gap-detector-usage.drawio
    │   ├── configuration-gap-detector-usage.md
    │   ├── custom-modes-overview.drawio
    │   ├── custom-modes-overview.md
    │   └── spec-driven-development-overview.md
    ├── guides/                              ← how-to and quick-start guides
    │   ├── CREATING-AGENTS-MD.md
    │   ├── QUICK-START.md
    │   ├── SDD-QUICK-START.md
    │   ├── SDD-SUMMARY.md
    │   ├── SDLC_TRACEABILITY_GUIDE.md
    │   ├── architecture-review-guide.md
    │   ├── architecture-review-template.md
    │   ├── architecture-review.md
    │   ├── custom-modes-usage-guide.md
    │   ├── sdd-interactive-guide.md
    │   └── spec-driven-development.md
    └── scripts/                             ← issue-management tooling (📋 GitHub Issue Generator)
        ├── README.md
        ├── check_markdown_links.py
        ├── create_github_issues.py
        ├── run_issue_creator.sh
        ├── run_sync_all_issues.sh
        ├── run_update_issues.sh
        ├── sync_all_issues.py
        └── update_issue_status.py

SKILLS/
├── sdd-architecture-patterns/             ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-business-alignment/                ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-documentation-review/             ← NEW ✅
│   ├── SKILL.md
│   ├── README.md
│   └── references/
│       └── KNOWLEDGE_SOURCES.md           (skill-related evidence map)
├── sdd-github-issue-traceability/         ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-maintainability-technical-debt/    ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-requirements-management/          ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-requirements-traceability/        ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-scalability-performance/          ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-sdlc-discovery-gap-analysis/      ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-security-threat-modeling/         ← NEW ✅
│   ├── SKILL.md
│   └── README.md
└── sdd-twelve-factor-compliance/         ← NEW ✅
    ├── SKILL.md
    └── README.md
```

---

## Storage Convention

| Location | What belongs here |
|---|---|
| `Modes/SDD/references/` | **All new** mode-related reference files, update records, and knowledge maps |
| `Modes/SDD/references/scripts/` | Mode-related Python scripts and shell wrappers |
| `Modes/SDD/references/` | All mode-related supplemental material |
| `Modes/SDD/images/` | Mode-related diagrams and screenshots |
| `SKILLS/sdd-<name>/SKILL.md` | Full skill instructions (canonical skill file) |
| `SKILLS/sdd-<name>/README.md` | Short summary: purpose, key areas, when to use, references |
| `SKILLS/sdd-<name>/references/` | Skill-specific reference files (knowledge maps, templates, checklists) |

---

## Mode Changes — split from `specifiction-driven-development-mode.yaml`

All 12 custom modes updated.

| Mode | Slug | Change |
|---|---|---|
| 🏛️ Architecture Review | `arch-review` | All 8 skill paths updated to `SKILLS/sdd-*/SKILL.md` |
| 🧭 Spec-Driven Development | `sdd` | All 3 skill paths updated to `SKILLS/sdd-*/SKILL.md` |
| 🔒 Security & Threat Modeling | `security-review` | Skill path updated; `read_file` call updated |
| 📈 Scalability & Performance | `scalability-review` | Skill path updated; `read_file` call updated |
| 🎨 Architecture Patterns | `patterns-review` | Skill path updated; `read_file` call updated |
| 🔧 Maintainability & Technical Debt | `maintainability-review` | Skill path updated; `read_file` call updated |
| 📚 Documentation Review | `documentation-review` | Skill path updated; `read_file` call updated; `RESOURCE_LICENSES` → `Modes/SDD/resource-licenses.md`; `KNOWLEDGE_SOURCES` → `Modes/SDD/knowledge-sources.md` |
| ☁️ 12-Factor Compliance | `twelve-factor-review` | Skill path updated; `read_file` call updated |
| 🎯 Business Alignment | `business-alignment-review` | Skill path updated; `read_file` call updated |
| 🔍 Configuration Gap Detector | `config-gap-detector` | Skill path updated; now references `Modes/SDD/*-mode.yaml` files |
| 📋 GitHub Issue Generator | `github-issue-generator` | All 3 skill paths updated; script paths → `Modes/SDD/references/scripts/`; MCP config → `Modes/SDD/references/mcp/mcp.json` |
| 🔍 License Impact Analysis | `license-impact-analysis` | Reference file paths updated to `Modes/SDD/references/` |

**Path changes applied across all modes:**

| Old path | New path |
|---|---|
| `.bob/custom_modes.yaml` (single file) | `Modes/SDD/*-mode.yaml` (one per slug) |
| `.bob/scripts/` | `Modes/SDD/references/scripts/` |
| `.bob/mcp.json` | `Modes/SDD/references/mcp/mcp.json` |
| `Modes/SDD/documentation/RESOURCE_LICENSES.md` | `Modes/SDD/resource-licenses.md` |
| `Modes/SDD/documentation/KNOWLEDGE_SOURCES.md` | `Modes/SDD/knowledge-sources.md` |
| `Modes/SDD/documentation/guides/` | `Modes/SDD/references/guides/` |
| `Modes/SDD/documentation/diagramms/` | `Modes/SDD/references/diagramms/` |
| `Modes/SDD/images/` | `Modes/SDD/references/images/` |
| `Modes/SDD/mcp/` | `Modes/SDD/references/mcp/` |
| `Modes/SDD/scripts/` | `Modes/SDD/references/scripts/` |
| `Modes/SDD/images/` | `Modes/SDD/references/images/` |

---

## Skill Changes — `SKILLS/sdd-<name>/`

All 11 skills migrated from `Modes/SDD/skills/<name>-skill.md` to `SKILLS/sdd-<name>/SKILL.md`.

| Skill folder | SKILL.md | README.md | references/ | Notes |
|---|---|---|---|---|
| `sdd-architecture-patterns` | ✅ 242 lines | ✅ | — | Renamed from `SKLL.md` typo |
| `sdd-business-alignment` | ✅ 97 lines | ✅ | — | |
| `sdd-documentation-review` | ✅ 380 lines | ✅ | ✅ `KNOWLEDGE_SOURCES.md` | Stale `../documentation/` link fixed |
| `sdd-github-issue-traceability` | ✅ 521 lines | ✅ | — | |
| `sdd-maintainability-technical-debt` | ✅ 298 lines | ✅ | — | README was empty — populated |
| `sdd-requirements-management` | ✅ 587 lines | ✅ | — | Created from `requirements-management-skill.md` |
| `sdd-requirements-traceability` | ✅ 165 lines | ✅ | — | README had wrong content — corrected |
| `sdd-scalability-performance` | ✅ 215 lines | ✅ | — | |
| `sdd-sdlc-discovery-gap-analysis` | ✅ 196 lines | ✅ | — | Stale `../documentation/` link fixed |
| `sdd-security-threat-modeling` | ✅ 167 lines | ✅ | — | |
| `sdd-twelve-factor-compliance` | ✅ 343 lines | ✅ | — | |

Every `README.md` now contains:
- **Purpose** — what the skill evaluates
- **Key Areas** — bullet list of covered domains
- **When to Use** — trigger conditions
- **`## References`** — documents the `references/` convention and what to add there

---

## `SKILLS/sdd-documentation-review/references/KNOWLEDGE_SOURCES.md` Changes

| Item | Old value | New value |
|---|---|---|
| Mode Knowledge Map — skill file names | `security-threat-modeling-skill.md` etc. | `SKILLS/sdd-<name>/SKILL.md` |
| Mode Knowledge Map — config gap detector | `.bob/custom_modes.yaml` | `Modes/SDD/*-mode.yaml` files |
| Mode Knowledge Map — GitHub Issue Generator scripts | `../scripts/README.md` | `Modes/SDD/references/scripts/README.md` |
| License evidence source | `.bob/documentation/RESOURCE_LICENSES.md` | `Modes/SDD/resource-licenses.md` |
| Bob configuration evidence | `.bob/skills/README.md`, `.bob/skills/*-skill.md` | `SKILLS/sdd-*/SKILL.md`, `SKILLS/sdd-*/README.md` |
| Maintenance step 5 | `RESOURCE_LICENSES.md` (bare) | `Modes/SDD/resource-licenses.md` |
| Maintenance step 6 | `../skills/README.md` | `SKILLS/sdd-<name>/README.md` and `Modes/SDD/README.md` |
| Maintenance step 7 | `python3 .bob/scripts/check_markdown_links.py` | `python3 Modes/SDD/references/scripts/check_markdown_links.py` |

---

## `Modes/SDD/README.md` Changes

| Section | Change |
|---|---|
| What It Does | Added `SKILLS/` link for the 11 reusable skills |
| How to Use | Updated skills browse link to `SKILLS/sdd-*/` |
| Available Modes | Skills table added listing all 11 `SKILLS/sdd-<name>/` folders |
| Configuration Visuals | Image paths updated: `images/` → `references/images/` |
| Usage Examples | Skill file name mentions updated |
| Customization | Updated to `SKILLS/sdd-<name>/SKILL.md` convention with correct `cp` commands |
| Quick References | `scripts/README.md` clarified as mode-related; `documentation/` links corrected |
| 📂 References | **New section** — documents the two-convention rule with three subsections: Mode References, Mode Scripts, Skill References |
| "View Full Documentation" | `documentation/README-ARCHITECTURE-REVIEW.md` → `architecture-review-readme.md` |
| SDLC traceability guide link | `.bob/documentation/guides/` → `references/guides/` |
| Mode resource license map | `.bob/documentation/RESOURCE_LICENSES.md` → `resource-licenses.md` |

---

## `Modes/SDD/references/scripts/README.md` Changes

All code-block examples updated:

| Old | New |
|---|---|
| `.bob/scripts/run_issue_creator.sh …` | `Modes/SDD/references/scripts/run_issue_creator.sh …` |
| `.bob/scripts/run_update_issues.sh …` | `Modes/SDD/references/scripts/run_update_issues.sh …` |
| `.bob/scripts/run_sync_all_issues.sh …` | `Modes/SDD/references/scripts/run_sync_all_issues.sh …` |
| `.bob/scripts/create_github_issues.py …` | `Modes/SDD/references/scripts/create_github_issues.py …` |
| `.bob/scripts/check_markdown_links.py` | `Modes/SDD/references/scripts/check_markdown_links.py` |

---

## Validation Results

| Check | Result |
|---|---|
| All 11 `SKILLS/sdd-*/SKILL.md` present and non-empty | ✅ |
| All 11 `SKILLS/sdd-*/README.md` present with `## References` section | ✅ |
| `SKILLS/sdd-documentation-review/references/KNOWLEDGE_SOURCES.md` present | ✅ |
| All 12 mode YAML files present in `Modes/SDD/` | ✅ |
| All 11 `SKILLS/sdd-*/SKILL.md` present and non-empty | ✅ |
| Zero stale `documentation/` path references in mode YAML files | ✅ |
| Zero stale `specifiction-driven-development-mode.yaml` references | ✅ |
| Zero stale `images/`, `mcp/`, `scripts/` refs outside `references/` | ✅ |
| `Modes/SDD/references/diagramms/` contains 7 files | ✅ |
| `Modes/SDD/references/guides/` contains 11 files | ✅ |
| `Modes/SDD/references/images/` contains mode images | ✅ |
| `Modes/SDD/references/mcp/` contains `mcp.json` | ✅ |
| `Modes/SDD/references/scripts/` contains 8 scripts/files | ✅ |
