# 📈 Scalability & Performance Mode

## Overview

The **Scalability & Performance** mode (`scalability-review`) assesses system capacity, bottlenecks, and performance optimization. It applies the
[`sdd-scalability-performance`](../../skills/sdd-scalability-performance/SKILL.md) skill and reports findings in the shared
✅ Achieved / ⚠️ Concerns / ❌ Not Achieved / 💡 Recommendations format.

Mode definition: [`scalability-review-mode.yaml`](./scalability-review-mode.yaml)

## When to Use

- Performance analysis and scalability assessments
- Capacity planning ahead of expected growth
- Investigating performance issues and optimization opportunities

For multi-domain reviews use [`arch-review`](./architecture-review-readme.md) instead.

## Expertise

- Horizontal and vertical scaling strategies
- Load balancing and distribution
- Caching (CDN, application, database)
- Database optimization and indexing
- Asynchronous processing and message queues
- Benchmarking, profiling, capacity planning, SLA/SLO definition

## Required Skill

| Skill | Purpose |
|---|---|
| [`sdd-scalability-performance`](../../skills/sdd-scalability-performance/SKILL.md) | System capacity, performance optimization, bottleneck analysis |

The mode reads the skill file first. If it is missing, the mode stops and asks you to provide it.

## Review Process

1. Read the skill file.
2. Analyze current load and capacity, identify bottlenecks, evaluate scaling, caching, database, and asynchronous-processing strategies.
3. Report metrics and benchmarks where available, with specific optimization recommendations.

## Usage Example

```
User: "Analyze scalability for an e-commerce platform expecting 10x growth"
```

## Escalation

If the review needs knowledge not covered (for example edge computing optimization, real-time streaming performance, GPU acceleration), the mode switches to
[`config-gap-detector`](./config-gap-detector-mode.md).

## Related Documentation

- [Main README](./README.md)
- [Architecture Review](./architecture-review-readme.md)
- [Knowledge sources](./knowledge-sources.md)
