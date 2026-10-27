# 📚 Documentation Review Mode

## Overview

The **Documentation Review** mode (`documentation-review`) reviews architecture documentation quality, diagrams, license notices, and content-provenance evidence. It applies the
[`sdd-documentation-review`](../../skills/sdd-documentation-review/SKILL.md) skill and reports findings in the shared
✅ Achieved / ⚠️ Concerns / ❌ Not Achieved / 💡 Recommendations format.

Mode definition: [`documentation-review-mode.yaml`](./documentation-review-mode.yaml)

## When to Use

- Documentation quality reviews
- ADR validation
- Diagram completeness checks
- License and provenance documentation checks
- Preparing documentation for architecture review boards

For license risk, SBOM, and jurisdiction analysis use [`license-impact-analysis`](./license-impact-analysis-mode.md) instead.

## Expertise

- Architecture Decision Records (ADRs)
- C4 and UML diagrams
- API documentation (OpenAPI, AsyncAPI)
- Runbooks and operational guides
- License documentation, third-party notices, content provenance registers
- Documentation-as-code, Mermaid, PlantUML

## Required Skill

| Skill | Purpose |
|---|---|
| [`sdd-documentation-review`](../../skills/sdd-documentation-review/SKILL.md) | Documentation quality, ADRs, diagrams, license notices, provenance |

The mode reads the skill file first. If it is missing, the mode stops and asks you to provide it.

## Review Process

1. Read the skill file.
2. Check ADRs, C4/sequence/deployment diagrams, API documentation, and runbooks.
3. Review repository licensing documentation: `LICENSE`, `THIRD_PARTY_NOTICES.md`, `CONTENT_PROVENANCE.md`, [`resource-licenses.md`](./resource-licenses.md), and [`knowledge-sources.md`](./knowledge-sources.md).
4. Identify documentation gaps and recommend improvements.

## Usage Example

```
User: "Review the documentation of repos/my-app for an architecture board"
```

## Escalation

If the review needs knowledge not covered (for example legal interpretation, regulatory compliance documentation, accessibility documentation standards), the mode switches to
[`config-gap-detector`](./config-gap-detector-mode.md).

## Related Documentation

- [Main README](./README.md)
- [Architecture Review](./architecture-review-readme.md)
- [Resource licenses](./resource-licenses.md)
- [Knowledge sources](./knowledge-sources.md)
