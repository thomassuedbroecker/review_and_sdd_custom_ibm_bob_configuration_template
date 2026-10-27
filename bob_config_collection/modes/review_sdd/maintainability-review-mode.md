# 🔧 Maintainability & Technical Debt Mode

## Overview

The **Maintainability & Technical Debt** mode (`maintainability-review`) identifies maintainability risks, quantifies technical debt, and proposes refactoring strategies. It applies the
[`sdd-maintainability-technical-debt`](../../skills/sdd-maintainability-technical-debt/SKILL.md) skill and reports findings in the shared
✅ Achieved / ⚠️ Concerns / ❌ Not Achieved / 💡 Recommendations format.

Mode definition: [`maintainability-review-mode.yaml`](./maintainability-review-mode.yaml)

## When to Use

- Technical debt assessments
- Code quality reviews
- Refactoring planning
- Evaluating long-term maintainability concerns

For multi-domain reviews use [`arch-review`](./architecture-review-readme.md) instead.

## Expertise

- Code complexity (cyclomatic, cognitive)
- Dependency management and coupling analysis
- Code duplication detection
- Test coverage and quality
- Refactoring strategies and technical debt quantification
- Static analysis and linting

## Required Skill

| Skill | Purpose |
|---|---|
| [`sdd-maintainability-technical-debt`](../../skills/sdd-maintainability-technical-debt/SKILL.md) | Code quality, technical debt, refactoring strategies |

The mode reads the skill file first. If it is missing, the mode stops and asks you to provide it.

## Review Process

1. Read the skill file.
2. Analyze complexity, coupling and cohesion, duplication, and test coverage; quantify debt (time/cost); identify refactoring opportunities.
3. Prioritize debt by impact and provide specific refactoring strategies.

## Usage Example

```
User: "Analyze technical debt and maintainability of repos/my-app"
```

## Escalation

If the review needs knowledge not covered (for example legacy system modernization, monolith-to-microservices migration patterns), the mode switches to
[`config-gap-detector`](./config-gap-detector-mode.md).

## Related Documentation

- [Main README](./README.md)
- [Architecture Review](./architecture-review-readme.md)
- [Knowledge sources](./knowledge-sources.md)
