# SDLC Discovery and Gap Analysis Skill

## Purpose
Use a focused "Grill Me" discovery pattern to clarify what the user wants,
map the request to the Software Development Life Cycle (SDLC), select the
right Bob modes and skills, and detect when SDD or architecture-review
coverage is missing.

This skill is intentionally cross-cutting. Use it before SDD, architecture
review, or GitHub issue generation when the user's goal, lifecycle phase,
artifacts, constraints, or expected output are unclear.

## Expertise Areas
- SDLC phase classification
- Requirements and architecture-review scoping
- Targeted stakeholder questioning
- Mode and skill selection
- Missing capability and resource detection
- Handoff to Configuration Gap Detector

## Grill Me Discovery Pattern

### 1. Classify the User Request
Identify the strongest SDLC phase signal:

| SDLC Phase | User Intent Signals | Likely Modes / Skills |
| --- | --- | --- |
| Planning | vision, business goal, roadmap, feasibility, stakeholders | SDD, Business Alignment |
| Requirements | requirements, user stories, acceptance criteria, scope | SDD, Requirements Management |
| Analysis | gaps, constraints, risks, domain rules, trade-offs | SDD, Requirements Traceability |
| Architecture / Design | architecture, patterns, APIs, data flow, ADRs, diagrams | Architecture Review, Architecture Patterns, Documentation Review |
| Implementation | prompt for coding, task breakdown, files to change | SDD, GitHub Issue Generator |
| Testing / Validation | test cases, coverage, verification, traceability | Requirements Traceability, GitHub Issue Traceability |
| Deployment / Operations | 12-factor, config, logs, runbooks, cloud readiness | 12-Factor Compliance, Documentation Review |
| Maintenance | technical debt, migration, refactoring, supportability | Maintainability & Technical Debt |
| AI Integration and Usage | AI-assisted coding, model/tool selection, prompt workflows, guardrails, human review, generated-code provenance | SDD, Documentation Review, Security & Threat Modeling, Configuration Gap Detector |

If multiple phases apply, name the primary phase and secondary phases before
choosing skills.

### 2. Grill Me Questions
Ask only the questions needed to make the next step reliable. Prefer three to
five targeted questions. Do not ask a long questionnaire when assumptions are
safe.

Use these question groups:

**Goal and Outcome**
- What decision or deliverable do you need from Bob: requirements, review
  findings, an implementation prompt, issues, or a traceability report?
- What business outcome or stakeholder need should this support?

**Lifecycle Phase**
- Which SDLC phase are we in now: planning, requirements, design,
  implementation, testing, deployment, or maintenance?
- Are we creating new artifacts, reviewing existing artifacts, or preparing
  implementation work?

**Artifacts and Evidence**
- What artifacts should Bob inspect: repository files, requirements docs,
  ADRs, diagrams, issues, tests, deployment config, or runbooks?
- Are there source-of-truth documents or constraints that must not be changed?

**AI Integration and Usage**
- Which AI tools, models, agents, MCP servers, or coding assistants are part
  of the workflow?
- What guardrails, human review, generated-code provenance, and validation
  evidence are required?
- Should AI usage be documented as requirements, architecture decisions,
  prompts, test evidence, or operational controls?

**Constraints and Quality Attributes**
- Which constraints matter most: security, performance, scalability,
  compliance, cost, timeline, maintainability, or operations?
- Are there domain-specific standards, regulations, or architecture principles
  Bob must apply?

**Expected Output**
- Should the output be a specification, prioritized findings, a gap report,
  architecture recommendations, a prompt, or GitHub issue-ready tasks?
- What level of detail is needed: executive summary, engineering detail, or
  implementation-ready traceability?

### 3. Select Modes and Skills
Map the clarified request to the smallest useful skill set:

- Use SDD for requirements, specifications, prompt crafting, and lifecycle
  traceability.
- Use Architecture Review for design validation, architecture trade-offs,
  and multi-domain review.
- Use focused review skills when the user names a specific concern such as
  security, scalability, patterns, documentation, 12-factor, business
  alignment, or technical debt.
- Use Requirements Traceability when the work depends on forward or backward
  links across requirements, design, implementation, issues, and tests.
- Use GitHub Issue Traceability when output must become GitHub issues.
- Use Security & Threat Modeling and Documentation Review when AI integration
  introduces tool access, data exposure, generated-code provenance, prompt
  governance, or human approval requirements.

State the selected phase, mode, and skill set before doing substantial work.

### 4. Detect Missing Skills or Resources
Before finalizing the response, check whether the current Bob configuration
covers the request. A gap exists when:

- The user asks for a domain not covered by existing skills, such as regulated
  medical devices, automotive safety, financial compliance, AI governance,
  data architecture, privacy engineering, accessibility, platform engineering,
  or product management.
- The task requires AI governance, model evaluation, prompt lifecycle
  management, agent safety, data-use controls, or generated-code compliance
  beyond the current SDD and architecture-review guidance.
- The work requires a lifecycle stage not covered well enough by current SDD
  or architecture-review guidance.
- The task requires an authoritative standard or framework that is not listed
  in the relevant skill or mode documentation.
- The expected output needs a specialized template, scoring model, or audit
  method that existing skills do not define.

If a gap exists, do not invent a full new process inside the current answer.
Recommend switching to Configuration Gap Detector and provide:

```markdown
## Configuration Gap
- Missing capability:
- Why existing skills are insufficient:
- Recommended addition: Mode or Skill
- Candidate resources:
- Suggested next step:
```

If no gap exists, state: "The current configuration is sufficient. No new Mode
or Skill is required."

## Output Format

Use this compact handoff format when discovery is needed:

```markdown
## Discovery
- SDLC phase:
- User outcome:
- Source artifacts:
- Key constraints:
- Selected mode:
- Selected skills:

## Grill Me Questions
1. ...
2. ...
3. ...

## Gap Check
- Current coverage:
- Missing capability or resource:
- Next step:
```

When enough context already exists, skip the questions and provide the
classification, selected skills, assumptions, and next action.

## Resources

Use these resources when a task requires stronger grounding:

- ISO/IEC/IEEE 29148: Requirements engineering and requirements specification
  guidance.
- SWEBOK Guide: Software engineering knowledge areas and lifecycle framing.
- IREB CPRE: Requirements engineering terminology and practice.
- C4 Model: Architecture communication across context, container, component,
  and code views.
- arc42: Practical architecture documentation template.
- Architecture Decision Records (ADRs): Lightweight architecture decision
  capture.
- OWASP ASVS and OWASP Top 10: Application security requirements and review.
- NIST Secure Software Development Framework (SSDF): Secure development
  practices.
- IBM Bob documentation and IBM spec-driven development guidance: product and
  SDD framing for AI-assisted lifecycle work.
- NIST AI Risk Management Framework and NIST Generative AI Profile: AI
  governance, trustworthiness, human oversight, and validation framing.
- OWASP Top 10 for Large Language Model Applications: LLM, agent, prompt,
  data exposure, and generated-output risk baseline.
- The Twelve-Factor App: Cloud-native operational design principles.

For the full source map, including why AI Integration and Usage was added as
an SDLC topic, see
[`../documentation/KNOWLEDGE_SOURCES.md`](../documentation/KNOWLEDGE_SOURCES.md).

## Related Skills
- requirements-management-skill.md
- requirements-traceability-skill.md
- architecture-patterns-skill.md
- documentation-review-skill.md
- github-issue-traceability-skill.md
