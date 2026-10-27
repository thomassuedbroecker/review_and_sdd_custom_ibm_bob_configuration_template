# 🎯 Business Alignment Mode

## Overview

The **Business Alignment** mode (`business-alignment-review`) evaluates how well an architecture supports business goals, quality attributes, and stakeholder needs. It applies the
[`sdd-business-alignment`](../../skills/sdd-business-alignment/SKILL.md) skill and reports findings in the shared
✅ Achieved / ⚠️ Concerns / ❌ Not Achieved / 💡 Recommendations format.

Mode definition: [`business-alignment-review-mode.yaml`](./business-alignment-review-mode.yaml)

## When to Use

- Business alignment reviews
- Quality attribute validation
- Stakeholder requirement analysis
- Strategic architecture planning

For multi-domain reviews use [`arch-review`](./architecture-review-readme.md) instead.

## Expertise

- Strategic technology planning
- Quality attribute requirements (performance, security, availability, scalability)
- Stakeholder analysis
- Cost-benefit, ROI, and TCO evaluation
- Risk assessment and mitigation
- Business capability mapping and value stream analysis

## Required Skill

| Skill | Purpose |
|---|---|
| [`sdd-business-alignment`](../../skills/sdd-business-alignment/SKILL.md) | Business goals, quality attributes, stakeholder analysis |

The mode reads the skill file first. If it is missing, the mode stops and asks you to provide it.

## Review Process

1. Read the skill file.
2. Identify business objectives, map the architecture to business capabilities, evaluate quality attribute requirements, assess stakeholder concerns, and perform cost-benefit analysis.
3. Recommend alignment improvements with business impact assessments.

## Usage Example

```
User: "Assess whether the architecture of repos/my-app supports our availability and cost goals"
```

## Escalation

If the review needs knowledge not covered (for example industry-specific compliance, regulatory frameworks, domain-specific quality attributes), the mode switches to
[`config-gap-detector`](./config-gap-detector-mode.md).

## Related Documentation

- [Main README](./README.md)
- [Architecture Review](./architecture-review-readme.md)
- [Knowledge sources](./knowledge-sources.md)
