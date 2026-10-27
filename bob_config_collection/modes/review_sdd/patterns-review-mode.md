# 🎨 Architecture Patterns Mode

## Overview

The **Architecture Patterns** mode (`patterns-review`) reviews architectural patterns, design principles, and trade-offs. It applies the
[`sdd-architecture-patterns`](../../skills/sdd-architecture-patterns/SKILL.md) skill and reports findings in the shared
✅ Achieved / ⚠️ Concerns / ❌ Not Achieved / 💡 Recommendations format.

Mode definition: [`patterns-review-mode.yaml`](./patterns-review-mode.yaml)

## When to Use

- Architecture pattern reviews
- Design principle (SOLID) validation
- Evaluating architectural decisions and trade-offs
- API design and service boundary reviews

For multi-domain reviews use [`arch-review`](./architecture-review-readme.md) instead.

## Expertise

- Microservices vs. monolith
- CQRS, Event Sourcing, and event-driven architecture
- Domain-Driven Design (DDD)
- SOLID principles and design patterns (GoF, enterprise)
- API design (REST, GraphQL, gRPC)
- Service mesh and API gateway patterns

## Required Skill

| Skill | Purpose |
|---|---|
| [`sdd-architecture-patterns`](../../skills/sdd-architecture-patterns/SKILL.md) | Patterns, best practices, anti-pattern detection |

The mode reads the skill file first. If it is missing, the mode stops and asks you to provide it.

## Review Process

1. Read the skill file.
2. Identify patterns in use, evaluate their appropriateness, detect anti-patterns and code smells, check SOLID adherence, review API design and service coupling.
3. Recommend pattern improvements with implementation examples.

## Usage Example

```
User: "Review the architecture patterns and service boundaries of repos/my-app"
```

## Escalation

If the review needs knowledge not covered (for example ML/AI architecture patterns, IoT device patterns, blockchain consensus patterns), the mode switches to
[`config-gap-detector`](./config-gap-detector-mode.md).

## Related Documentation

- [Main README](./README.md)
- [Architecture Review](./architecture-review-readme.md)
- [Knowledge sources](./knowledge-sources.md)
