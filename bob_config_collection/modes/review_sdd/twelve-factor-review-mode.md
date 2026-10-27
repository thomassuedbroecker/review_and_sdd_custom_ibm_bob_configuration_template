# ☁️ 12-Factor Compliance Mode

## Overview

The **12-Factor Compliance** mode (`twelve-factor-review`) assesses cloud-native readiness against the 12-factor app methodology. It applies the
[`sdd-twelve-factor-compliance`](../../skills/sdd-twelve-factor-compliance/SKILL.md) skill and reports findings in the shared
✅ Achieved / ⚠️ Concerns / ❌ Not Achieved / 💡 Recommendations format.

Mode definition: [`twelve-factor-review-mode.yaml`](./twelve-factor-review-mode.yaml)

## When to Use

- Cloud-native readiness assessments
- 12-factor compliance checks
- Preparing applications for cloud deployment

For multi-domain reviews use [`arch-review`](./architecture-review-readme.md) instead.

## The 12 Factors

1. Codebase
2. Dependencies
3. Config
4. Backing services
5. Build, release, run
6. Processes
7. Port binding
8. Concurrency
9. Disposability
10. Dev/prod parity
11. Logs
12. Admin processes

## Required Skill

| Skill | Purpose |
|---|---|
| [`sdd-twelve-factor-compliance`](../../skills/sdd-twelve-factor-compliance/SKILL.md) | 12-factor methodology and cloud-native readiness |

The mode reads the skill file first. If it is missing, the mode stops and asks you to provide it.

## Review Process

1. Read the skill file.
2. Evaluate each factor, identify specific violations, and explain the impact of non-compliance (considering AWS, Azure, or GCP specifics).
3. Report a ✅/⚠️/❌ status per factor, with remediation steps and configuration examples, prioritized by cloud-readiness impact.

## Usage Example

```
User: "Check 12-factor compliance of repos/my-app before cloud deployment"
```

## Escalation

If the review needs knowledge not covered (for example serverless-specific factors, edge computing deployment patterns), the mode switches to
[`config-gap-detector`](./config-gap-detector-mode.md).

## Related Documentation

- [Main README](./README.md)
- [Architecture Review](./architecture-review-readme.md)
- [Knowledge sources](./knowledge-sources.md)
