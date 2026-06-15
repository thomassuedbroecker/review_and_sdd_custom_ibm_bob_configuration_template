# AI Agents Configuration — Review & SDD Expert Bob

## Workspace Constraint

This template is the IBM Bob workspace root.
Repositories to review must be cloned under `repos/` before referencing them in any prompt.
Never open a sub-repository as the workspace root.

## Mode Routing

| Intent | Mode |
|---|---|
| Multi-domain or orchestrated architecture review | `arch-review` |
| Security, threat modeling, OWASP, STRIDE | `security-review` |
| Performance, capacity, scaling, caching | `scalability-review` |
| Design patterns, anti-patterns, SOLID, API design | `patterns-review` |
| Technical debt, code complexity, refactoring | `maintainability-review` |
| ADRs, diagrams, API docs, license, content provenance | `documentation-review` |
| 12-factor / cloud-native readiness | `twelve-factor-review` |
| Business goals, quality attributes, stakeholder alignment | `business-alignment-review` |
| Requirements, specifications, prompt engineering, traceability | `sdd` |
| Task outside all existing mode scopes | `config-gap-detector` |
| Convert todos, findings, or specs into GitHub issues | `github-issue-generator` |

Multi-area requests → prefer `arch-review`; it orchestrates across all review skills.
Unclear scope or SDLC phase → apply the Grill Me pattern from `.bob/skills/sdlc-discovery-gap-analysis-skill.md` first.

## Hard Rules

1. **Read the skill file before producing findings.** Skills live in `.bob/skills/`; each mode's `customInstructions` names the required file.
2. **Traceability runs through GitHub issues, Markdown, and code only.** Do not imply support for external ALM or proprietary trackers.
3. **Unknown domain → escalate.** Switch to `config-gap-detector`, state the gap, and wait for user approval before proposing a new mode or skill.
