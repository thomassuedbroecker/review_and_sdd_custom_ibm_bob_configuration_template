# Impact Reference

## Risk Consequence Matrix

For every finding, generate:

| Finding | Likelihood | Severity | Impact if Unresolved |
| --- | --- | --- | --- |
| Missing LICENSE file | High | High | Software may legally remain under full copyright protection and redistribution rights may be unclear |
| Unknown dependency license | Medium | High | Distribution may become legally risky |
| Missing SPDX headers | High | Medium | Compliance automation becomes difficult |
| Missing third-party notices | Medium | High | Attribution obligations may be violated |
| No contribution process | Medium | Medium | Ownership and relicensing may become difficult |
| No SBOM | Medium | Medium | Audits and security investigations become slower |
| Stale or incomplete SBOM format coverage | Medium | Medium | Customers and scanners may miss services, cryptography, data, or provenance evidence required for modern supply-chain reviews |
| "Open model" claim without OSAID-style evidence | Medium | Medium-High | Customers may reject the artifact as source-available or restricted rather than Open Source AI |
| AGPL dependency | Low-Medium | High | Additional source distribution obligations may apply depending on usage model |
| AI-generated code with no provenance or human review record | Medium | Medium-High | Ownership, copyrightability, and copied-code risk may be difficult to assess during audit or customer review |
| AI output closely matching restricted or copyleft code | Low-Medium | High | Attribution, license compliance, or source disclosure obligations may be disputed depending on similarity, use, and jurisdiction |
| Country-specific law not mapped to distribution model | Medium | High | The team may miss local remedies, penalties, procurement blockers, or attribution/source obligations in target markets |
| Penalty/remedy exposure not documented | Medium | Medium-High | Legal and business stakeholders cannot judge whether the realistic consequence is an injunction, damages, legal costs, contract breach, or only remediation work |
| Court-decision evidence omitted where available | Medium | Medium | The review may overstate or understate enforceability because it lacks comparable enforcement precedent |

Use these examples as calibration, not as a fixed list. Add rows for all repository-specific findings.

For legal findings, add columns or a companion table for `Country / Region`,
`Law / Authority`, `Penalty / Remedy Exposure`, `Court / Enforcement Evidence`,
and `Confidence` when those factors affect priority.

## Technical Debt Categories

| Category | Examples | Typical Resolution Cost |
| --- | --- | --- |
| Low | Missing SPDX headers; missing copyright statements | Hours |
| Medium | Incomplete dependency inventory; missing attribution documentation; inconsistent repository licensing | Days to weeks |
| High | Unknown provenance of copied or AI-generated code; missing third-party licensing evidence; unclear contributor ownership | Weeks to months |
| Critical | No repository license; GPL/AGPL conflicts discovered late; proprietary code mixed with incompatible licenses | Months; possible code replacement; possible legal review |

Explain how unresolved licensing issues accumulate over time through dependency growth, release history, external contributions, customer commitments, and audit evidence decay.

## Remediation Priority

| Priority | Meaning |
| --- | --- |
| P1 | Immediate action required |
| P2 | Resolve before next release |
| P3 | Resolve during normal maintenance |
| P4 | Improvement opportunity |

## Repository Health Score

Calculate the score from 0 to 100:

```text
Repository Health Score =
30% Licensing
20% Dependency Compliance
15% File-Level Compliance
15% Third-Party Provenance
10% Governance
10% Compliance Automation
```

Suggested scoring anchors:

- Licensing: repository LICENSE clarity, compatibility with distribution model, license consistency across docs/packages.
- Dependency Compliance: inventory completeness, license identification, copyleft/commercial conflict handling, lockfile/package evidence.
- File-Level Compliance: SPDX headers, copyright notices, generated/vendored file treatment.
- Third-Party Provenance: NOTICE files, attribution evidence, copied-code traceability, AI-output provenance, vendored dependency origins.
- Governance: contribution process, CLA/DCO evidence, AI-use policy, ownership and relicensing clarity.
- Compliance Automation: SBOM generation, license scanning, CI checks, repeatable audit artifacts.

When SBOM maturity matters, distinguish SPDX, CycloneDX, package-manager lockfiles,
container inventories, and deployed-service inventories. GitHub dependency graph
exports may be useful evidence but do not replace license review, vendored-code
review, generated-code provenance, or runtime/container inventory.

Rating:

| Score | Meaning |
| --- | --- |
| 90-100 | Excellent |
| 75-89 | Good |
| 60-74 | Acceptable with Risks |
| 40-59 | Significant Compliance Debt |
| Below 40 | High-Risk Repository |

Show category scores and weighted math. If evidence is incomplete, score conservatively and state assumptions.

## Mandatory Final Answer

End every complete assessment with:

```text
Most likely future consequence:

[Direct 12-24 month consequence paragraph.]

Confidence: [Low|Medium|High]
```
