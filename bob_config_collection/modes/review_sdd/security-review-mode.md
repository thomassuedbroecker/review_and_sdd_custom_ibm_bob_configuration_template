# 🔒 Security & Threat Modeling Mode

## Overview

The **Security & Threat Modeling** mode (`security-review`) performs focused security architecture reviews and threat modeling. It applies the
[`sdd-security-threat-modeling`](../../skills/sdd-security-threat-modeling/SKILL.md) skill and reports findings in the shared
✅ Achieved / ⚠️ Concerns / ❌ Not Achieved / 💡 Recommendations format.

Mode definition: [`security-review-mode.yaml`](./security-review-mode.yaml)

## When to Use

- Security architecture reviews and STRIDE threat modeling
- OWASP Top 10 checks
- Authentication, authorization, and data-protection assessments
- Compliance preparation (GDPR, HIPAA, PCI-DSS, SOC2)
- Security is the primary concern of an architecture review

For multi-domain reviews use [`arch-review`](./architecture-review-readme.md) instead.

## Expertise

- OWASP Top 10 vulnerabilities
- STRIDE threat modeling
- Authentication and authorization mechanisms
- Data protection and encryption
- Network security and segmentation
- Compliance requirements and secure coding practices

## Required Skill

| Skill | Purpose |
|---|---|
| [`sdd-security-threat-modeling`](../../skills/sdd-security-threat-modeling/SKILL.md) | Security gaps, threat analysis, STRIDE methodology |

The mode reads the skill file first. If it is missing, the mode stops and asks you to provide it.

## Review Process

1. Read the skill file.
2. Review authentication/authorization, data protection, and network security; perform STRIDE and OWASP Top 10 checks; assess compliance needs.
3. Report findings with risk ratings (Critical, High, Medium, Low) and concrete remediation steps.

## Usage Example

```
User: "Perform STRIDE threat modeling and check OWASP Top 10 for repos/my-app"
```

## Escalation

If the review needs knowledge not covered (for example quantum-resistant cryptography, zero-trust architecture, blockchain security), the mode switches to
[`config-gap-detector`](./config-gap-detector-mode.md).

## Related Documentation

- [Main README](./README.md)
- [Architecture Review](./architecture-review-readme.md)
- [Knowledge sources](./knowledge-sources.md)
