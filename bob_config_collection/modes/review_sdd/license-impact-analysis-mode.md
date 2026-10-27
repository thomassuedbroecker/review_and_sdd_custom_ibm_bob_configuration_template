# License Impact Analysis Mode

## Overview

The **License Impact Analysis** mode is a specialized Bob mode for evaluating open-source licensing, dependency compliance, repository provenance, SBOM readiness, jurisdiction-specific license impact, and governance findings with comprehensive legal, operational, business, and security impact analysis.

## When to Use This Mode

Use this mode when you need to:

- Review repository license posture and compliance gaps
- Assess SPDX metadata and third-party notices
- Evaluate dependency license risks and conflicts
- Review SBOM and provenance evidence
- Analyze jurisdiction-specific legal impacts
- Prepare for audits or due diligence
- Calculate repository health scores
- Understand AI-generated code licensing implications
- Map penalties, remedies, and court decisions

## Key Features

### Evidence-First Analysis
- Ties all findings to observed repository evidence
- Identifies jurisdiction, date checked, source type, and confidence level
- Distinguishes between binding law, official guidance, and secondary sources
- Provides proper citations for all legal references

### Comprehensive Impact Assessment
For every finding, evaluates:
- **Legal Impact**: copyright claims, license violations, compliance failures
- **Operational Impact**: release delays, remediation costs, engineering rework
- **Business Impact**: customer trust, procurement rejection, sales blockers
- **Security Impact**: provenance gaps, traceability issues, SBOM completeness
- **Jurisdiction Impact**: country-specific enforceability and obligations
- **Penalty/Remedy Exposure**: injunctions, damages, legal costs, distribution stops
- **Court Decision Evidence**: relevant case law and enforcement precedents

### Repository Health Scoring
Calculates a weighted health score (0-100) across:
- 30% Licensing
- 20% Dependency Compliance
- 15% File-Level Compliance
- 15% Third-Party Provenance
- 10% Governance
- 10% Compliance Automation

### AI-Generated Code Review
Specialized analysis for:
- AI-assisted development provenance
- Copyright and ownership implications
- Public-code similarity risks
- Human authorship evidence
- Tool terms and indemnity provisions
- OSI Open Source AI Definition compliance

### Jurisdiction-Specific Analysis
Country-by-country impact assessment including:
- Local copyright and licensing laws
- Public-sector procurement requirements
- Court decisions and enforcement precedents
- Penalties and remedies exposure
- Export controls and encryption regulations

## Reference Files

The mode loads three reference files on demand (`Modes/SDD/references/` in the collection; installed to `.bob/documentation/review_sdd/references/` with **Other → Mode group documentation and references**):

1. **[impact-reference.md](references/impact-reference.md)**
   - Risk Consequence Matrix templates
   - Technical Debt Categories
   - Remediation Priority definitions
   - Repository Health Score methodology

2. **[ai-generated-code-reference.md](references/ai-generated-code-reference.md)**
   - Source trustworthiness classifications
   - Legal baselines for AI-generated code
   - Evidence inspection guidelines
   - Recommended finding language

3. **[jurisdiction-impact-reference.md](references/jurisdiction-impact-reference.md)**
   - Country/region impact matrices
   - Court decision patterns
   - Penalty/remedy exposure frameworks
   - Global baseline considerations

## Discovery Pattern

Before conducting a substantial review, the mode uses a "Grill Me" discovery pattern to gather essential context:

1. **Distribution model**: Internal-only, SaaS, binary, source, container, SDK, etc.
2. **Jurisdictions**: Relevant countries for users, contributors, customers, procurement
3. **Dependency posture**: Vendored, downloaded, bundled, linked, runtime-only
4. **License concern**: Permissive, copyleft, attribution, patents, AI-generated code
5. **Evidence available**: What artifacts exist in the repository
6. **Output needed**: Risk readout, checklist, country table, due diligence report

## Workflow

1. **Inspect Repository Evidence**
   - License files and notices
   - Package manifests and lockfiles
   - SPDX headers and copyright statements
   - Contribution processes and governance
   - SBOM and compliance artifacts
   - AI-generated code provenance

2. **Classify Jurisdiction Scope**
   - Development, hosting, distribution locations
   - Public-sector or regulated-industry use
   - Local legal considerations

3. **Build Legal Evidence Frame**
   - Map laws to countries/regions
   - Identify source types and authority levels
   - Document remedies and penalties
   - Reference relevant court decisions

4. **Generate Findings**
   - Concrete, evidence-backed statements
   - Multi-dimensional impact analysis
   - Risk consequence matrix
   - Technical debt assessment

5. **Calculate Health Score**
   - Weighted category scoring
   - Rating classification
   - Confidence levels

6. **Provide Future Consequence Analysis**
   - 12-24 month outlook if issues remain unresolved
   - Confidence level assessment

## Priority Levels

- **P1**: Immediate action required (high legal risk, release-blocking)
- **P2**: Resolve before next release (high-severity compliance gaps)
- **P3**: Resolve during normal maintenance (medium-severity gaps)
- **P4**: Improvement opportunity (low-risk enhancements)

## Output Structure

The mode produces comprehensive reports including:

1. Executive summary
2. Detailed findings with evidence
3. Legal Evidence Map (when relevant)
4. Court Decision/Enforcement Reference table
5. Risk Consequence Matrix
6. Long-Term Technical Debt Assessment
7. Remediation Priority table
8. Repository Health Score
9. Country Impact table (when relevant)
10. Law/standard-to-file mapping (when requested)
11. Mandatory 12-24 month future consequence analysis

## Important Notes

- This mode provides **compliance triage and risk assessment**, not legal advice
- Always verify current laws and regulations from primary sources
- Uses uncertainty language when facts are not visible in the repository
- Labels all outputs as AI-assisted reviews, not legal determinations
- Recommends consultation with local counsel for jurisdiction-specific impacts

## Current Standards (as of June 7, 2026)

- SPDX 3.0.1
- CycloneDX 1.7
- GitHub SBOM export in SPDX JSON
- GitHub dependency review
- Secret scanning
- OSI Open Source AI Definition 1.0

## Tool Access

Tool groups configured in the mode: `read`, `edit`, `execute`, `mcp`, `skill`, `mode`, `subtask`, `subagent`.

- **Read / edit**: file reading, searching, listing, file modification and creation
- **Execute**: CLI execution for dependency analysis, SBOM generation, etc.
- **MCP, skill, mode, subtask, subagent**: standard Bob extension and delegation groups

## Example Use Cases

1. **Pre-Release Compliance Check**
   - Review all licensing before shipping
   - Identify blocking issues
   - Generate compliance artifacts

2. **Due Diligence Preparation**
   - Comprehensive license audit
   - Risk assessment for acquisitions
   - Evidence documentation

3. **AI-Generated Code Review**
   - Assess provenance and ownership
   - Check similarity to public code
   - Evaluate tool terms compliance

4. **International Distribution Planning**
   - Country-specific impact analysis
   - Procurement readiness assessment
   - Legal risk mapping

5. **Dependency Risk Assessment**
   - License compatibility analysis
   - Copyleft obligation mapping
   - Supply chain transparency

## Getting Started

To use this mode:

1. Switch to "🔍 License Impact Analysis" mode in Bob
2. Provide context about your repository and review needs
3. Answer discovery questions if prompted
4. Review the comprehensive analysis and recommendations
5. Follow remediation priorities to address findings
