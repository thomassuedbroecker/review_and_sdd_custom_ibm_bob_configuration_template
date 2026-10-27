# 🔍 Configuration Gap Detector Mode

## Overview

The **Configuration Gap Detector** mode (`config-gap-detector`) checks whether the current modes and skills are sufficient for a task. If they are not, it researches authoritative sources and proposes one minimal new mode or skill. It applies the
[`sdd-sdlc-discovery-gap-analysis`](../../skills/sdd-sdlc-discovery-gap-analysis/SKILL.md) skill, including the Grill Me discovery pattern.

Mode definition: [`config-gap-detector-mode.yaml`](./config-gap-detector-mode.yaml)

## When to Use

- A task seems outside the scope of existing modes
- Results are incomplete or unsatisfactory
- New domain requirements emerge (for example IoT, blockchain, ML systems)
- SDLC-stage or non-functional workflow gaps are suspected
- Periodic configuration health checks
- Before complex, unfamiliar tasks

## Required Skill

| Skill | Purpose |
|---|---|
| [`sdd-sdlc-discovery-gap-analysis`](../../skills/sdd-sdlc-discovery-gap-analysis/SKILL.md) | Grill Me discovery, SDLC phase classification, missing-capability checks |

The mode reads the skill file first. If it is missing, the mode stops and asks you to provide it.

## Process

0. Read the skill file.
1. **Verify configuration fit** against `*-mode.yaml` files and available skills. If everything is covered, state: "The current configuration is sufficient. No new Mode or Skill is required."
2. **Explain what is missing**, briefly and with evidence.
3. **Research** authoritative sources (standards bodies, official documentation, industry references) using browser capabilities.
4. **Propose one Mode or Skill**: a Mode for role, scope, or behavior; a Skill for task-specific know-how.
5. Keep the proposal minimal and incremental.

## Proposal Structure

Name, Type, Purpose, When to Use, Responsibilities, Inputs, Outputs, Constraints, Research Sources, Industry Standards.

## Constraints

- Evidence-based gap identification only
- Research-backed proposals with cited sources
- No duplication of existing capabilities
- User approval required before implementation
- No code unless explicitly requested

## Usage Example

```
User: "We need to review an IoT firmware update pipeline. Is the current configuration sufficient?"
```

## Related Documentation

- [Main README](./README.md)
- [Configuration gap detector usage diagram](./references/diagramms/configuration-gap-detector-usage.md)
- [Knowledge sources](./knowledge-sources.md)
