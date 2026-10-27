# Review & SDD Expert Bob Configuration

Experimental template / personal reference implementation for IBM Bob SDLC workflow configuration.

## Overview

IBM Bob offers powerful out-of-the-box modes tailored to support the entire software development lifecycle. These modes demonstrate how easily you can specialize and optimize IBM Bob for your specific engineering workflows. In this configuration, the setup is optimized from my perspective for architecture review and spec-driven development (SDD).

The **Review & SDD Expert Bob Configuration** transforms IBM Bob into a specialized assistant for architecture reviews and requirements management. By providing custom-tailored modes and reusable skills, this template enables teams to conduct thorough technical evaluations and implement robust, spec-driven development practices. **The modes included in this repository template** are specifically tuned to bridge the gap between initial system architecture design and precise, specification-compliant code generation.

Additionally, the optional **GitHub issue generator** can convert to-do lists into
GitHub issues when you explicitly request it. The repository includes Python scripts
for batch operations and a legacy GitHub MCP configuration for interactive use.
The legacy MCP package is deprecated and should be replaced before production use.
This repository is intended to be used as a template. Create your own GitHub repository from this template, then clone your repository and open its root folder in IBM Bob. This gives you an independent workspace that you can customize and version-control for your own use.

The custom SDD workflow:

![](./references/images/custom_sdd_workflow_in_bob.jpg)

Usage example on YouTube:

[![Use IBM Bob with custom Specification Driven Development (SDD) Modes and GitHub Integration](https://img.youtube.com/vi/33zFrqwhKOI/0.jpg)](https://www.youtube.com/watch?v=33zFrqwhKOI)


📚 **[View Full Documentation](architecture-review-readme.md)**

## What It Does

- **11 Custom Modes**: Including orchestrator review mode, 7 focused review modes, spec-driven development mode, configuration gap detector, and GitHub issue generator
- **11 Reusable Skills** (located in [`SKILLS/`](../../SKILLS/)): Comprehensive coverage of architecture review domains, SDLC discovery and gap analysis, requirements management, requirements traceability analysis, and GitHub issue traceability
- **Comprehensive Architecture Reviews**: Conduct multi-dimensional reviews using specialized skills covering security, scalability, patterns, maintainability, and more
- **Spec-Driven Development**: Manage requirements, craft prompts, and maintain traceability throughout the development lifecycle
- **Adaptive Configuration**: Use the Grill Me discovery pattern to clarify SDLC intent, detect gaps, and propose new capabilities based on emerging requirements
- **Modular Skills**: Use individual skills independently or combine them for comprehensive reviews

## Traceability Boundary

Traceability matrices in this template are realized only through GitHub issues,
Markdown documents, and code entries such as requirement comments, commit
references, affected files, and tests. External ALM systems, databases,
spreadsheet-only trackers, or proprietary traceability repositories are not
supported sources of truth unless you add a dedicated integration.

## Why Use It?

- ✅ Ensure consistent, repeatable review methodology across projects
- ✅ Reduce time spent on manual architecture reviews and documentation
- ✅ Catch issues early with comprehensive coverage of architecture concerns
- ✅ Customize easily for organization-specific requirements and standards
- ✅ Integrate seamlessly with existing SDLC processes
- ✅ Scale expertise across teams with reusable skills


## Setup & Installation

### Prerequisites

- IBM Bob installed
- Git installed for the recommended GitHub repository workflow
- Node.js and npm installed only when using the optional GitHub MCP integration
- Python 3 and the `requests` package installed only when using the optional
  GitHub issue-management scripts
- A GitHub token configured only when generating GitHub issues

### Recommended: Create Your Own GitHub Repository

1. Select **Use this template** on GitHub and create your own repository.
2. Clone your new repository to your local machine.
3. Open the cloned repository root folder in IBM Bob.
4. The preconfigured modes and skills will appear in IBM Bob's mode selector.

### Alternative: Use a Local Copy

1. Download this repository as a ZIP file.
2. Extract the ZIP file. The extracted folder name depends on the repository
   name and selected branch.
3. Open the extracted repository root folder in IBM Bob.

## Add Repositories for Inspection or Usage

The provided IBM Bob modes are currently configured at project scope. To make
another local repository available to these modes, clone or copy it into the
[`repos/`](./repos/) folder:

```bash
git clone <repository-url> repos/<repository-name>
```

```text
<template-repository-name>/
├── .bob/
├── repos/
│   ├── your-application/
│   └── another-repository/
└── README.md
```

Keep the template repository as the IBM Bob workspace root. Add the
repositories that you want to inspect, review, or use as nested folders under
`repos/`.

## How to Use

### 1. Explore Pre-existing Configuration
Review the available modes and skills to understand capabilities:
- Browse the 11 specialized skills in [`SKILLS/sdd-*/`](../../SKILLS/) — each folder contains a `SKILL.md` and a `README.md`
- Study the [Architecture Review documentation](architecture-review-readme.md)
- Review [Spec-Driven Development guide](sdd-readme.md)
- Review the [knowledge source map](knowledge-sources.md)
  to understand where mode and skill guidance comes from
- Review the [GitHub issue-management scripts](references/scripts/README.md) when
  generating or synchronizing issues

---

## 🎯 Available Modes

| Mode | Purpose |
| --- | --- |
| 🏛️ Architecture Review | Orchestrates comprehensive and focused reviews |
| 🔒 Security & Threat Modeling | Reviews security architecture and threats |
| 📈 Scalability & Performance | Assesses capacity, bottlenecks, and performance |
| 🎨 Architecture Patterns | Reviews architectural patterns and design choices |
| 🔧 Maintainability & Technical Debt | Identifies maintainability risks and technical debt |
| 📚 Documentation Review | Reviews documentation, license notices, and provenance evidence |
| ☁️ 12-Factor Compliance | Assesses cloud-native readiness |
| 🎯 Business Alignment | Connects architecture decisions to business goals |
| 🧭 Spec-Driven Development | Structures requirements, specifications, and prompts |
| 🔍 Configuration Gap Detector | Proposes missing capabilities when the current setup is insufficient |
| 📋 GitHub Issue Generator | Converts todo lists and findings into GitHub issues |

The configuration also includes **11 reusable skills**: seven architecture
review skills, one SDLC discovery and gap-analysis skill, one
requirements-management skill, one requirements-traceability analysis skill,
and one GitHub issue traceability skill. Each skill lives in its own folder
under [`SKILLS/`](../../SKILLS/) as `SKILLS/sdd-<name>/SKILL.md` with a
companion `README.md` summary. See the table below for the full list.

| Skill folder | Purpose |
|---|---|
| [`SKILLS/sdd-sdlc-discovery-gap-analysis/`](../../SKILLS/sdd-sdlc-discovery-gap-analysis/) | Grill Me discovery, SDLC phase classification, missing-capability checks |
| [`SKILLS/sdd-requirements-management/`](../../SKILLS/sdd-requirements-management/) | Requirements elicitation, documentation, prioritization, and traceability |
| [`SKILLS/sdd-requirements-traceability/`](../../SKILLS/sdd-requirements-traceability/) | Forward, backward, and bidirectional traceability analysis |
| [`SKILLS/sdd-github-issue-traceability/`](../../SKILLS/sdd-github-issue-traceability/) | Complete SDLC traceability framework for GitHub issues |
| [`SKILLS/sdd-security-threat-modeling/`](../../SKILLS/sdd-security-threat-modeling/) | Security gaps, threat analysis, and STRIDE methodology |
| [`SKILLS/sdd-scalability-performance/`](../../SKILLS/sdd-scalability-performance/) | System capacity, bottleneck detection, and performance optimization |
| [`SKILLS/sdd-architecture-patterns/`](../../SKILLS/sdd-architecture-patterns/) | Architectural patterns, best practices, and anti-pattern detection |
| [`SKILLS/sdd-maintainability-technical-debt/`](../../SKILLS/sdd-maintainability-technical-debt/) | Code quality, technical debt quantification, and refactoring strategies |
| [`SKILLS/sdd-documentation-review/`](../../SKILLS/sdd-documentation-review/) | Documentation quality, ADRs, diagrams, license notices, and provenance |
| [`SKILLS/sdd-twelve-factor-compliance/`](../../SKILLS/sdd-twelve-factor-compliance/) | 12-factor methodology and cloud-native readiness |
| [`SKILLS/sdd-business-alignment/`](../../SKILLS/sdd-business-alignment/) | Business goals, quality attributes, and stakeholder analysis |

Traceability matrices are intentionally limited to GitHub issues, Markdown
documents, and code entries. See the [SDLC traceability guide](references/guides/SDLC_TRACEABILITY_GUIDE.md)
for the supported traceability carriers and matrix format.

## Configuration Visuals

![architecture-review](images/architecture-review.png)

![configuration-gap-detector](images/configuration-gap-detector.png)

![skills-review](images/skills-review.png)

![spec-driven-development-overview](images/spec-driven-development-overview.png)

---

## 💡 Usage Examples

Add code or a repository to your IBM Bob IDE, then follow the examples.

For this template, add the repository that you want to inspect or use under
[`repos/`](./repos/). The nested repository layout is required because the
provided modes are currently configured at IBM Bob project scope.

### Example 1: Pre-Production Review

```
User: "Review security, scalability, and 12-factor compliance before production"

Bob will:
1. Read 3 relevant skill files
2. Apply each skill's methodology
3. Analyze codebase against checklists
4. Provide prioritized findings
5. Recommend critical fixes

Output:
✅ Achieved: OAuth2 implemented, auto-scaling configured
⚠️ Concerns: No rate limiting, logs not centralized
❌ Not Achieved: Missing circuit breakers
💡 Recommendations: [Prioritized action items]
```

### Example 2: Technical Debt Assessment

```
User: "Analyze technical debt and maintainability"

Bob will:
1. Read maintainability-technical-debt-skill.md
2. Analyze code complexity and coupling
3. Detect code duplication
4. Assess test coverage
5. Quantify technical debt
6. Provide refactoring roadmap

Output: Prioritized technical debt backlog with effort estimates
```

### Example 3: Security Audit

```
User: "Perform STRIDE threat modeling and check OWASP Top 10"

Bob will:
1. Read security-threat-modeling-skill.md
2. Identify security gaps and attack vectors
3. Check for OWASP Top 10 vulnerabilities
4. Assess authentication/authorization
5. Provide risk ratings and remediation steps

Output: Security assessment report with prioritized fixes
```

### Example 4: Convert Todo List to GitHub Issues

```
User: "Convert my current todo list into GitHub issues"

Bob will:
1. Read the active todo list from current task
2. Analyze each task for context and requirements
3. Check for existing similar issues in GitHub
4. Create well-structured GitHub issues with:
   - Clear, action-oriented titles
   - Detailed descriptions with context
   - Acceptance criteria
   - Appropriate labels (type, priority, area)
5. Establish issue relationships and dependencies
6. Provide summary with issue links

Output: List of created GitHub issues with numbers and links
```

---

## 🎓 Best Practices

### Mode Selection Strategy

1. **Start with Plan mode** for new projects
   - Create detailed implementation plan
   - Break down into clear steps
   - Get user approval

2. **Switch to Code/Advanced mode** for implementation
   - Execute approved plan
   - Make code changes
   - Run tests

3. **Use Architecture Review mode** for validation
   - Review completed work
   - Identify issues early
   - Ensure quality standards

4. **Use Ask mode** for explanations
   - Understand concepts
   - Get recommendations
   - Learn technologies

### Effective Review Requests

#### ✅ Good Examples

**Specific and focused**:
```
"Review security for a healthcare application that needs HIPAA compliance"
```

**With context**:
```
"Analyze scalability for an e-commerce platform expecting 10x growth"
```

**Prioritized**:
```
"Focus on security and 12-factor compliance first, then performance"
```

#### ❌ Avoid These

- "Review the system" (too vague)
- "Check everything" (no context)
- "Do all reviews at once and fix all issues" (unrealistic scope)

---

## 🔧 Customization

### Adding Organization-Specific Requirements

Skills follow the convention `SKILLS/sdd-<name>/SKILL.md` with a companion
`README.md`. Each mode lives in its own `*-mode.yaml` file in `Modes/SDD/`
and references skills using this path pattern.

1. **Modify existing skills**

   Edit `SKILLS/sdd-<name>/SKILL.md` to add:
   - Internal compliance requirements
   - Company-specific patterns
   - Custom quality attributes
   - Organization standards
   - License notice and content-provenance requirements

2. **Create new skills**

   ```bash
   # Create a new skill folder following the naming convention
   mkdir -p SKILLS/sdd-custom-compliance
   cp SKILLS/sdd-security-threat-modeling/SKILL.md \
      SKILLS/sdd-custom-compliance/SKILL.md
   # Add a README summary
   touch SKILLS/sdd-custom-compliance/README.md
   ```

   Then customize `SKILL.md`:
   - Purpose and expertise areas
   - Review process and checklists
   - Output format
   - Key questions and best practices

3. **Update mode configuration**

   Update the relevant `Modes/SDD/*-mode.yaml` file so that the
   mode explicitly references the new skill path
   (`SKILLS/sdd-custom-compliance/SKILL.md`) when it should be part of a
   standard workflow. For license notice or provenance checks, prefer extending
   the existing Documentation Review skill unless a dedicated legal/compliance
   workflow is required.

### Skill Structure Template

```markdown
# [Skill Name]

## Purpose
[What this skill evaluates]

## Expertise Areas
- [Area 1]
- [Area 2]

## Review Process
### 1. [Step Name]
- [Checklist item]
- [Question to ask]

## Output Format
### ✅ Achieved
[What's working well]

### ⚠️ Concerns
[Areas needing attention]

### ❌ Not Achieved
[Critical gaps]

### 💡 Recommendations
[Actionable improvements]
```

---

## 📖 Documentation

### Quick References

| Document | Purpose |
|----------|---------|
| **README.md** | Main documentation (this file) |
| **[`SKILLS/sdd-*/`](../../SKILLS/)** | All SDD skill folders — each contains `SKILL.md` and `README.md` |
| **[`*-mode.yaml`](./)** | One YAML file per mode slug (12 total) — each references `SKILLS/sdd-*/SKILL.md` paths |
| **[references/SDD-UPDATE.md](references/SDD-UPDATE.md)** | 📋 Change record — validated update log for all modes and skills |
| **[architecture-review-readme.md](architecture-review-readme.md)** | Architecture review details |
| **[knowledge-sources.md](knowledge-sources.md)** | Mode and skill knowledge-source map |
| **[resource-licenses.md](resource-licenses.md)** | License and terms map for external mode resources |
| **[references/guides/QUICK-START.md](references/guides/QUICK-START.md)** | Quick start guide |
| **[references/guides/CREATING-AGENTS-MD.md](references/guides/CREATING-AGENTS-MD.md)** | Guide for creating agents.md files |
| **[sdd-readme.md](sdd-readme.md)** | Spec-driven development guide |
| **[github-issue-generator-mode.md](github-issue-generator-mode.md)** | GitHub issue generator mode |
| **[references/scripts/README.md](references/scripts/README.md)** | GitHub issue-management scripts |
| **[github-mcp-setup.md](github-mcp-setup.md)** | GitHub MCP server setup |

## 📂 References

All mode-related supplemental material belongs in `references/`
(mode-level) or `SKILLS/sdd-<name>/references/` (skill-level).

| Location | What belongs here |
|---|---|
| `Modes/SDD/references/` | Reference docs, change records, knowledge maps |
| `Modes/SDD/references/diagramms/` | Architecture diagrams (.drawio + .md) |
| `Modes/SDD/references/guides/` | How-to and quick-start guides |
| `Modes/SDD/references/images/` | Mode-related screenshots and images |
| `Modes/SDD/references/mcp/` | MCP server configuration |
| `Modes/SDD/references/scripts/` | Python scripts and shell wrappers |
| `SKILLS/sdd-<name>/references/` | Skill-specific reference files |

### Mode References (`references/`)

| File | Used by | Purpose |
|---|---|---|
| [`references/SDD-UPDATE.md`](references/SDD-UPDATE.md) | All modes & skills | Change record — validated update log (2025-09-14) |
| [`references/impact-reference.md`](references/impact-reference.md) | 🔍 License Impact Analysis | Risk consequence matrix, technical debt categories, health score methodology |
| [`references/ai-generated-code-reference.md`](references/ai-generated-code-reference.md) | 🔍 License Impact Analysis | AI-generated code trust classification and evidence inspection guidelines |
| [`references/jurisdiction-impact-reference.md`](references/jurisdiction-impact-reference.md) | 🔍 License Impact Analysis | Country/region impact matrices, court decision patterns, penalty/remedy exposure |

### Mode Scripts (`references/scripts/`)

The `references/scripts/` folder contains mode-related Python scripts and shell wrappers used by the
📋 **GitHub Issue Generator** mode. Full usage documentation is in
[`references/scripts/README.md`](references/scripts/README.md).

| Script | Purpose |
|---|---|
| [`references/scripts/create_github_issues.py`](references/scripts/create_github_issues.py) | Batch-create GitHub issues from a JSON/YAML template |
| [`references/scripts/run_issue_creator.sh`](references/scripts/run_issue_creator.sh) | Shell wrapper for `create_github_issues.py` |
| [`references/scripts/update_issue_status.py`](references/scripts/update_issue_status.py) | Add comments or close individual/multiple issues |
| [`references/scripts/run_update_issues.sh`](references/scripts/run_update_issues.sh) | Shell wrapper for `update_issue_status.py` |
| [`references/scripts/sync_all_issues.py`](references/scripts/sync_all_issues.py) | Sync all issues with current repository state |
| [`references/scripts/run_sync_all_issues.sh`](references/scripts/run_sync_all_issues.sh) | Shell wrapper for `sync_all_issues.py` |
| [`references/scripts/check_markdown_links.py`](references/scripts/check_markdown_links.py) | Validate local Markdown links and heading anchors |
| [`references/scripts/README.md`](references/scripts/README.md) | Full usage guide, configuration formats, and examples |

### Skill References (`SKILLS/sdd-*/references/`)

| Skill folder | References file | Purpose |
|---|---|---|
| [`SKILLS/sdd-documentation-review/references/`](../../SKILLS/sdd-documentation-review/references/) | `KNOWLEDGE_SOURCES.md` | Knowledge sources and evidence basis for the Documentation Review skill |

## Documentation Validation

After changing Markdown documentation, validate local links and heading anchors:

```bash
python3 Modes/SDD/references/scripts/check_markdown_links.py
```

## Limitations

This template does not replace architecture review boards, security review, legal review, or formal ALM tooling. It provides a Git-native, Markdown-based structure for improving consistency, traceability, and review preparation when working with IBM Bob.

## License and Third-Party Notices

This repository is distributed under the Apache License, Version 2.0. See
[LICENSE](./LICENSE) for the full license text.

- [License documentation](./LICENSE_DOCUMENTATION.md)
- [Third-party dependency notices](./THIRD_PARTY_NOTICES.md)
- [Content provenance register](./CONTENT_PROVENANCE.md)
- [Mode resource license map](resource-licenses.md)

---

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

The mode includes three critical reference files:

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

This mode has access to:
- **Read tools**: File reading, searching, listing, code definitions
- **Edit tools**: File modifications and creation
- **Command tools**: CLI execution for dependency analysis, SBOM generation, etc.

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

# SDD Modes & Skills — Update Record

**Date**: 2025-09-14  
**Scope**: `Modes/SDD/` and `SKILLS/sdd-<name>/`  
**Status**: ✅ Validated — no stale paths, no broken references, no files outside boundaries

---

## Summary of Changes

The SDD skill files have been migrated from a flat `Modes/SDD/skills/` folder into
individual, self-contained skill packages under the shared `SKILLS/` catalog. The mode
YAML and all README files have been updated to reference the new locations. No files
were moved outside the `Modes/SDD/` or `SKILLS/sdd-<name>/` boundaries.

---

## Folder Structure (After)

```
Modes/SDD/
├── README.md
├── *-mode.yaml                            ← one file per mode slug (12 total)
├── architecture-review-readme.md
├── github-issue-generator-mode.md
├── github-mcp-setup.md
├── knowledge-sources.md
├── resource-licenses.md
├── sdd-readme.md
├── images/
│   ├── architecture-review.png
│   ├── configuration-gap-detector.png
│   ├── skills-review.png
│   └── spec-driven-development-overview.png
├── mcp/
│   └── mcp.json
└── references/                            ← ALL mode-related supplemental material
    ├── SDD-UPDATE.md                        (change record)
    ├── ai-generated-code-reference.md       (🔍 License Impact Analysis)
    ├── impact-reference.md                  (🔍 License Impact Analysis)
    ├── jurisdiction-impact-reference.md     (🔍 License Impact Analysis)
    ├── diagramms/                           ← architecture diagrams
    │   ├── architecture-review-system.drawio
    │   ├── architecture-review-system.md
    │   ├── configuration-gap-detector-usage.drawio
    │   ├── configuration-gap-detector-usage.md
    │   ├── custom-modes-overview.drawio
    │   ├── custom-modes-overview.md
    │   └── spec-driven-development-overview.md
    ├── guides/                              ← how-to and quick-start guides
    │   ├── CREATING-AGENTS-MD.md
    │   ├── QUICK-START.md
    │   ├── SDD-QUICK-START.md
    │   ├── SDD-SUMMARY.md
    │   ├── SDLC_TRACEABILITY_GUIDE.md
    │   ├── architecture-review-guide.md
    │   ├── architecture-review-template.md
    │   ├── architecture-review.md
    │   ├── custom-modes-usage-guide.md
    │   ├── sdd-interactive-guide.md
    │   └── spec-driven-development.md
    └── scripts/                             ← issue-management tooling (📋 GitHub Issue Generator)
        ├── README.md
        ├── check_markdown_links.py
        ├── create_github_issues.py
        ├── run_issue_creator.sh
        ├── run_sync_all_issues.sh
        ├── run_update_issues.sh
        ├── sync_all_issues.py
        └── update_issue_status.py

SKILLS/
├── sdd-architecture-patterns/             ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-business-alignment/                ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-documentation-review/             ← NEW ✅
│   ├── SKILL.md
│   ├── README.md
│   └── references/
│       └── KNOWLEDGE_SOURCES.md           (skill-related evidence map)
├── sdd-github-issue-traceability/         ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-maintainability-technical-debt/    ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-requirements-management/          ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-requirements-traceability/        ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-scalability-performance/          ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-sdlc-discovery-gap-analysis/      ← NEW ✅
│   ├── SKILL.md
│   └── README.md
├── sdd-security-threat-modeling/         ← NEW ✅
│   ├── SKILL.md
│   └── README.md
└── sdd-twelve-factor-compliance/         ← NEW ✅
    ├── SKILL.md
    └── README.md
```

---

## Storage Convention

| Location | What belongs here |
|---|---|
| `Modes/SDD/` | `*-mode.yaml` files (one per slug) and top-level `.md` docs |
| `Modes/SDD/references/` | All mode-related supplemental material |
| `Modes/SDD/references/diagramms/` | Architecture diagrams (.drawio + .md) |
| `Modes/SDD/references/guides/` | How-to and quick-start guides |
| `Modes/SDD/references/images/` | Mode-related screenshots and images |
| `Modes/SDD/references/mcp/` | MCP server configuration |
| `Modes/SDD/references/scripts/` | Python scripts and shell wrappers |
| `SKILLS/sdd-<name>/SKILL.md` | Full skill instructions (canonical skill file) |
| `SKILLS/sdd-<name>/README.md` | Short summary: purpose, key areas, when to use, references |
| `SKILLS/sdd-<name>/references/` | Skill-specific reference files (knowledge maps, templates, checklists) |

---

## Mode Changes — split from `specifiction-driven-development-mode.yaml`

All 12 custom modes now live in individual `*-mode.yaml` files.

| Mode | Slug | File |
|---|---|---|
| 🏛️ Architecture Review | `arch-review` | `arch-review-mode.yaml` |
| 🧭 Spec-Driven Development | `sdd` | `sdd-mode.yaml` |
| 🔒 Security & Threat Modeling | `security-review` | `security-review-mode.yaml` |
| 📈 Scalability & Performance | `scalability-review` | `scalability-review-mode.yaml` |
| 🎨 Architecture Patterns | `patterns-review` | `patterns-review-mode.yaml` |
| 🔧 Maintainability & Technical Debt | `maintainability-review` | `maintainability-review-mode.yaml` |
| 📚 Documentation Review | `documentation-review` | `documentation-review-mode.yaml` |
| ☁️ 12-Factor Compliance | `twelve-factor-review` | `twelve-factor-review-mode.yaml` |
| 🎯 Business Alignment | `business-alignment-review` | `business-alignment-review-mode.yaml` |
| 🔍 Configuration Gap Detector | `config-gap-detector` | `config-gap-detector-mode.yaml` |
| 📋 GitHub Issue Generator | `github-issue-generator` | `github-issue-generator-mode.yaml` |
| 🔍 License Impact Analysis | `license-impact-analysis` | `license-impact-analysis-mode.yaml` |

**Cumulative path changes across all moves:**

| Old path | New path |
|---|---|
| `.bob/custom_modes.yaml` (single file) | `Modes/SDD/*-mode.yaml` (one per slug) |
| `.bob/scripts/` | `Modes/SDD/references/scripts/` |
| `.bob/mcp.json` | `Modes/SDD/references/mcp/mcp.json` |
| `Modes/SDD/documentation/RESOURCE_LICENSES.md` | `Modes/SDD/resource-licenses.md` |
| `Modes/SDD/documentation/KNOWLEDGE_SOURCES.md` | `Modes/SDD/knowledge-sources.md` |
| `Modes/SDD/documentation/guides/` | `Modes/SDD/references/guides/` |
| `Modes/SDD/documentation/diagramms/` | `Modes/SDD/references/diagramms/` |
| `Modes/SDD/images/` | `Modes/SDD/references/images/` |
| `Modes/SDD/mcp/` | `Modes/SDD/references/mcp/` |
| `Modes/SDD/scripts/` | `Modes/SDD/references/scripts/` |
| `Modes/SDD/guides/` | `Modes/SDD/references/guides/` |
| `Modes/SDD/diagramms/` | `Modes/SDD/references/diagramms/` |

---

## Skill Changes — `SKILLS/sdd-<name>/`

All 11 skills migrated from `Modes/SDD/skills/<name>-skill.md` to `SKILLS/sdd-<name>/SKILL.md`.

| Skill folder | SKILL.md | README.md | references/ | Notes |
|---|---|---|---|---|
| `sdd-architecture-patterns` | ✅ 242 lines | ✅ | — | Renamed from `SKLL.md` typo |
| `sdd-business-alignment` | ✅ 97 lines | ✅ | — | |
| `sdd-documentation-review` | ✅ 380 lines | ✅ | ✅ `KNOWLEDGE_SOURCES.md` | Stale `../documentation/` link fixed |
| `sdd-github-issue-traceability` | ✅ 521 lines | ✅ | — | |
| `sdd-maintainability-technical-debt` | ✅ 298 lines | ✅ | — | README was empty — populated |
| `sdd-requirements-management` | ✅ 587 lines | ✅ | — | Created from `requirements-management-skill.md` |
| `sdd-requirements-traceability` | ✅ 165 lines | ✅ | — | README had wrong content — corrected |
| `sdd-scalability-performance` | ✅ 215 lines | ✅ | — | |
| `sdd-sdlc-discovery-gap-analysis` | ✅ 196 lines | ✅ | — | Stale `../documentation/` link fixed |
| `sdd-security-threat-modeling` | ✅ 167 lines | ✅ | — | |
| `sdd-twelve-factor-compliance` | ✅ 343 lines | ✅ | — | |

Every `README.md` now contains:
- **Purpose** — what the skill evaluates
- **Key Areas** — bullet list of covered domains
- **When to Use** — trigger conditions
- **`## References`** — documents the `references/` convention and what to add there

---

## Validation Results

| Check | Result |
|---|---|
| All 12 mode YAML files present in `Modes/SDD/` | ✅ |
| All 11 `SKILLS/sdd-*/SKILL.md` present and non-empty | ✅ |
| All 11 `SKILLS/sdd-*/README.md` present with `## References` section | ✅ |
| `SKILLS/sdd-documentation-review/references/KNOWLEDGE_SOURCES.md` present | ✅ |
| Zero stale `documentation/` path references in mode YAML files | ✅ |
| Zero stale `specifiction-driven-development-mode.yaml` references | ✅ |
| Zero stale `images/`, `mcp/`, `scripts/` references outside `references/` | ✅ |
| Zero stale `*-skill.md` filename references in YAML | ✅ |
| `Modes/SDD/references/diagramms/` contains 7 files | ✅ |
| `Modes/SDD/references/guides/` contains 11 files | ✅ |
| `Modes/SDD/references/images/` contains mode images | ✅ |
| `Modes/SDD/references/mcp/` contains `mcp.json` | ✅ |
| `Modes/SDD/references/scripts/` contains 8 scripts/files | ✅ |

