# Bob Skills

This directory contains reusable skill definitions used by Bob custom modes. Skills provide structured methodologies, checklists, and output patterns for specific domains such as architecture review and requirements management.

## Available Skills

### 1. Business Alignment (`business-alignment-skill.md`)
**Purpose**: Evaluate how well the architecture supports organizational goals and quality attributes.

**Key Areas**:
- Strategic technology planning
- Quality attribute requirements
- Stakeholder analysis
- Cost-benefit analysis
- Risk assessment

**When to Use**: Strategic reviews, quality attribute validation, stakeholder requirement analysis

---

### 2. Security & Threat Modeling (`security-threat-modeling-skill.md`)
**Purpose**: Identify security gaps, potential attack vectors, and provide security recommendations.

**Key Areas**:
- OWASP Top 10 vulnerabilities
- STRIDE threat modeling
- Authentication/authorization
- Data protection and encryption
- Compliance (GDPR, HIPAA, PCI-DSS)

**When to Use**: Security reviews, compliance assessments, threat modeling sessions

---

### 3. Scalability & Performance (`scalability-performance-skill.md`)
**Purpose**: Evaluate system capacity, identify bottlenecks, and provide performance optimization recommendations.

**Key Areas**:
- Horizontal/vertical scaling
- Load balancing strategies
- Caching mechanisms
- Database optimization
- Performance benchmarking

**When to Use**: Performance analysis, capacity planning, scalability assessments

---

### 4. Architecture Patterns (`architecture-patterns-skill.md`)
**Purpose**: Evaluate pattern usage, identify anti-patterns, and recommend appropriate architectural patterns.

**Key Areas**:
- Microservices vs. Monolith
- CQRS, Event Sourcing, DDD
- SOLID principles
- Design patterns
- API design (REST, GraphQL, gRPC)

**When to Use**: Pattern reviews, design principle validation, architectural decision evaluation

---

### 5. Maintainability & Technical Debt (`maintainability-technical-debt-skill.md`)
**Purpose**: Identify maintainability issues, quantify technical debt, and provide refactoring recommendations.

**Key Areas**:
- Code complexity analysis
- Coupling and cohesion
- Code duplication
- Test coverage
- Technical debt quantification

**When to Use**: Technical debt assessments, code quality reviews, refactoring planning

---

### 6. Documentation Review (`documentation-review-skill.md`)
**Purpose**: Evaluate documentation completeness, clarity, currency, license notice coverage, and content-provenance evidence.

**Key Areas**:
- Architecture Decision Records (ADRs)
- C4 Model diagrams
- UML diagrams
- API documentation
- Runbooks and operational guides
- Repository license documentation, third-party notices, resource-license maps, and content provenance

**When to Use**: Documentation quality reviews, ADR validation, diagram completeness checks, release documentation checks, license/provenance evidence reviews

**Source Basis**: Documentation and provenance review is grounded in local
repository evidence (`LICENSE_DOCUMENTATION.md`, `THIRD_PARTY_NOTICES.md`,
`CONTENT_PROVENANCE.md`, `../documentation/RESOURCE_LICENSES.md`), plus the
mode and skill evidence map in
[`../documentation/KNOWLEDGE_SOURCES.md#license-and-provenance-evidence-source-basis`](../documentation/KNOWLEDGE_SOURCES.md#license-and-provenance-evidence-source-basis).

---

### 7. 12-Factor Compliance (`twelve-factor-compliance-skill.md`)
**Purpose**: Evaluate compliance with 12-factor app methodology and provide cloud-native recommendations.

**Key Areas**:
- Codebase, Dependencies, Config
- Backing Services, Build/Release/Run
- Processes, Port Binding, Concurrency
- Disposability, Dev/Prod Parity
- Logs, Admin Processes

**When to Use**: Cloud-native readiness assessments, 12-factor compliance checks, deployment reviews

---

### 8. Requirements Management (`requirements-management-skill.md`)
**Purpose**: Elicit, document, analyze, and validate software requirements to ensure they are complete, consistent, testable, and aligned with business objectives.

**Key Areas**:
- Requirements elicitation techniques
- Requirements documentation standards
- Requirements analysis and modeling
- Requirements prioritization (MoSCoW, Kano, WSJF)
- Basic requirements traceability
- Stakeholder management
- User story writing and acceptance criteria

**When to Use**: Project planning, requirements gathering, specification creation, stakeholder analysis, requirements validation

---

### 9. SDLC Discovery and Gap Analysis (`sdlc-discovery-gap-analysis-skill.md`)
**Purpose**: Use the Grill Me discovery pattern to clarify the user's SDLC phase, desired outcome, source artifacts, constraints, and missing skill or resource needs before starting SDD or architecture-review work.

**Key Areas**:
- SDLC phase classification
- AI integration and usage classification
- Targeted stakeholder questioning
- Mode and skill selection
- SDD and architecture-review gap detection
- Handoff to Configuration Gap Detector

**When to Use**: Ambiguous user requests, early SDD conversations, architecture-review scoping, missing-capability checks, mode/skill selection

**Source Basis**: AI Integration and Usage is grounded in IBM Bob, IBM SDD,
NIST AI RMF, NIST Generative AI Profile, OWASP LLM Top 10, and NIST SSDF
references documented in
[`../documentation/KNOWLEDGE_SOURCES.md#ai-integration-and-usage-source-basis`](../documentation/KNOWLEDGE_SOURCES.md#ai-integration-and-usage-source-basis).

---

### 10. Requirements Traceability Analysis (`requirements-traceability-skill.md`)
**Purpose**: Provide comprehensive requirements traceability analysis using GitHub issues, Markdown documents, and code entries, enabling complete, validated traceability chains from requirements through design to implementation.

**Key Areas**:
- Forward traceability (requirements → design → implementation → tests)
- Backward traceability (tests → implementation → design → requirements)
- Bidirectional traceability validation
- Orphan detection (requirements, design, implementation)
- Coverage metrics and reporting
- Git-based traceability workflows
- Traceability gap detection
- Automated parsing and validation
- Markdown matrix views over GitHub issue and code-entry references

**When to Use**: Traceability audits, coverage analysis, gap detection, git workflow integration, pull request validation, compliance reporting, requirements tracking across branches

**Boundary**: External ALM systems, databases, spreadsheet-only trackers, and
proprietary traceability repositories are not supported sources of truth unless
a dedicated integration is added.

---

### 11. GitHub Issue Traceability (`github-issue-traceability-skill.md`)
**Purpose**: Structure GitHub issues with complete SDLC traceability from business goals through requirements, Markdown specifications, code entries, tests, and validation.

**Key Areas**:
- GitHub issue hierarchy design (Epic → Feature → Task → Test)
- Requirement-to-issue mapping
- Traceability metadata management
- Git commit and code comment traceability conventions
- Test-to-requirement linking

**When to Use**: GitHub issue generation, issue backlog structuring, requirement-to-issue mapping, SDLC traceability enforcement

---

## How to Use Skills

### In Architecture Review Mode

When using the 🏛️ Architecture Review mode, Bob will automatically:

1. **Use SDLC discovery** when the review scope, lifecycle phase, source artifacts, or output format are unclear
2. **Read the relevant skill file(s)** based on your request
3. **Apply the skill's methodology** to your codebase
4. **Follow the skill's checklist** and review process
5. **Provide structured output** using the skill's format

### In Spec-Driven Development Mode

When using the 🧭 Spec-Driven Development mode, Bob will automatically:

1. **Use the Grill Me discovery pattern** when the SDLC phase, artifacts, constraints, or desired output are unclear
2. **Read the requirements-management skill** when requirements expertise is needed
3. **Apply requirements elicitation, prioritization, validation, and traceability guidance**
4. **Help structure specifications and prompts**
5. **Provide actionable outputs for planning, design, implementation, and validation**

### Example Requests

**Complete Review (All Review Skills)**:
```
"Conduct a comprehensive architecture review using all relevant skills"
```

**Focused Review (Single Skill)**:
```
"Review security using the security-threat-modeling skill"
"Check 12-factor compliance"
"Analyze scalability and performance"
```

**Multi-Skill Review**:
```
"Review security, scalability, and 12-factor compliance"
"Focus on maintainability and documentation"
```

**Iterative Review**:
```
"Start with security review, then we'll do performance"
```

**Spec-Driven Development**:
```
"Help me define requirements for a new project"
"Review this specification for completeness and testability"
"Turn these notes into structured functional and non-functional requirements"
"Grill me to figure out which SDLC phase and skills apply"
```

## Skill Structure

Each skill file contains:

### 1. Purpose
Clear statement of what the skill evaluates

### 2. Expertise Areas
List of specific knowledge domains covered

### 3. Review Process
Step-by-step methodology with:
- What to analyze
- Questions to ask
- Checklists to follow
- Metrics to consider

### 4. Output Format
Structured format including:
- ✅ **Achieved**: What's working well
- ⚠️ **Concerns**: Areas needing attention
- ❌ **Not Achieved**: Critical gaps
- 💡 **Recommendations**: Actionable improvements

### 5. Key Questions
Critical questions the skill answers

### 6. Best Practices
Guidelines and common pitfalls

## Customizing Skills

Skills can be customized for your organization:

1. **Add Organization-Specific Sections**
   - Internal compliance requirements
   - Company-specific patterns
   - Custom quality attributes

2. **Modify Checklists**
   - Add/remove checklist items
   - Adjust priorities
   - Include tool-specific checks

3. **Extend Methodologies**
   - Add additional review steps
   - Include custom metrics
   - Reference internal standards

4. **Update Output Formats**
   - Add custom sections
   - Modify scoring criteria
   - Include organization templates

## Skill Reusability

Skills are designed to be reusable across:

- **Different Projects**: Apply same methodology to any codebase
- **Different Modes**: Reference skills from other custom modes
- **Different Teams**: Share consistent review practices
- **Different Contexts**: Adapt to various review scenarios

## Creating New Skills

To create a new skill:

1. **Copy an existing skill** as a template
2. **Define the purpose** and expertise areas
3. **Create the review process** with checklists
4. **Define the output format** with examples
5. **Add key questions** and best practices
6. **Test the skill** on a real project
7. **Update this README** with the new skill

## Skill Maintenance

Keep skills up-to-date:

- **Regular Reviews**: Review skills quarterly
- **Industry Updates**: Incorporate new best practices
- **Team Feedback**: Gather feedback from users
- **Tool Updates**: Update for new tools and technologies
- **Version Control**: Track changes in Git

## Benefits of Skill-Based Reviews

✅ **Consistency**: Same methodology across all reviews
✅ **Reusability**: Use skills across projects and teams
✅ **Modularity**: Focus on specific areas as needed
✅ **Scalability**: Easy to add new skills
✅ **Knowledge Sharing**: Codified expertise
✅ **Training**: Onboard new architects faster
✅ **Quality**: Comprehensive, structured reviews

---

**Last Updated**: 2026-05-31
**Version**: 1.3
**Skills Count**: 11
