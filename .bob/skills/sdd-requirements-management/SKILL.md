# Requirements Management Skill

## Purpose
Elicit, document, analyze, and validate software requirements to ensure they are complete, consistent, testable, and aligned with business objectives.

## Expertise Areas
- Requirements elicitation techniques (interviews, workshops, observation)
- Requirements documentation standards (IEEE 830, IREB)
- Requirements analysis and modeling
- Requirements prioritization (MoSCoW, Kano, WSJF)
- Requirements traceability
- Stakeholder management
- User story writing and acceptance criteria
- Use case modeling
- Non-functional requirements specification
- Requirements validation and verification
- Agile backlog refinement, story splitting, and sprint planning (Scrum, iterative delivery)

## Context Efficiency & Task Handoff

Apply these rules whenever you use this skill, so the task stays within a small,
focused context:

- **Resume from a handoff first.** If `task-handoff.md` exists in the workspace
  root or in the target repository (`repos/<name>/`), read it before anything
  else, continue from its "Next steps", and do not redo work listed under "Done".
- **Load only what you need.** Read this skill once per task and do not copy it
  into outputs. Search before reading, read only the relevant file ranges, and
  skip generated or vendored content (`dist/`, `node_modules/`, lock files,
  binaries, large logs) unless it is the subject of the task.
- **Keep evidence compact.** Cite findings as `path:line` with a one-line
  excerpt instead of quoting whole files, diffs, or command output.
- **Parallelize independent work.** When the scope splits into independent
  parts (components, repositories, features, or review areas), delegate them as
  parallel subtasks where the tool supports it. Give each subtask a
  self-contained brief: scope, skill file to read, output file, and return
  format (a short summary of findings, not raw evidence). Merge only the
  returned summaries.
- **Hand off instead of overflowing.** When the work is too large for one
  context, is split into subtasks, or ends unfinished, create or update
  `task-handoff.md` (keep it under ~60 lines; it replaces conversation history
  for the next task). Writing the handoff file is allowed in read-only reviews;
  never edit the reviewed code.

```markdown
# Task Handoff
- Goal and scope:
- SDLC phase, mode, skills:
- Done (output files, evidence refs):
- Open items and blockers:
- Decisions and assumptions:
- Next steps (ordered):
```

## Back-Questioning (Grill Me)

Requirements work regularly hits facts only the user can supply: unnamed
stakeholders, unstated business goals, unmeasured quality targets, undefined
priorities, or unclear scope. Never invent these. Apply the Grill Me pattern
from `.bob/skills/sdd-sdlc-discovery-gap-analysis/SKILL.md` at any point in
this skill's workflow — not only at the start:

1. **Pause and ask** three to five targeted back-questions covering only the
   blocking unknowns (goal and outcome, stakeholders, lifecycle phase, source
   artifacts, constraints, expected output).
2. **State safe assumptions explicitly** when an answer is not available, and
   record each one in the Assumptions and Dependencies section of the output
   so stakeholders can challenge it.
3. **Resume the workflow** only when every blocking unknown is answered or
   covered by a documented assumption.

Typical triggers in this skill: stakeholder analysis without named
stakeholders, NFRs without measurable targets, prioritization without a
business-value signal, and validation without an identified approver.
In an agile context, also ask about whatever is missing among: sprint length,
team capacity or velocity, the number of sprints or the target release date,
the estimation unit, and the team's Definition of Ready and Definition of Done.

## Review Process

### 1. Stakeholder Analysis
**Identify and analyze all stakeholders:**
- Who are the primary users of the system?
- Who are the secondary stakeholders (managers, administrators, etc.)?
- What are their goals, needs, and pain points?
- What are their technical skill levels?
- What are their priorities and constraints?
- Who has decision-making authority?
- Who will be impacted by the system?

**Stakeholder Matrix:**
| Stakeholder | Role | Interest | Influence | Priority |
|-------------|------|----------|-----------|----------|
| End Users | Primary | High | Medium | Critical |
| Product Owner | Decision Maker | High | High | Critical |
| Development Team | Implementer | Medium | High | High |
| Operations | Maintainer | Medium | Medium | High |

### 2. Requirements Elicitation
**Techniques to gather requirements:**

**Interviews:**
- Conduct one-on-one or group interviews
- Prepare structured questions
- Document responses and insights
- Follow up on unclear points

**Workshops:**
- Facilitate collaborative sessions
- Use brainstorming techniques
- Create shared understanding
- Resolve conflicts early

**Observation:**
- Watch users in their environment
- Identify unstated needs
- Understand workflows
- Discover pain points

**Document Analysis:**
- Review existing documentation
- Analyze current systems
- Study business processes
- Identify gaps and opportunities

**Prototyping:**
- Create mockups or prototypes
- Gather feedback iteratively
- Validate assumptions
- Refine requirements

### 3. Functional Requirements Documentation

**Format: User Stories**
```
As a [user role]
I want [goal/desire]
So that [benefit/value]

Acceptance Criteria:
- Given [context]
  When [action]
  Then [expected outcome]
```

**Format: Use Cases**
```
Use Case: [Name]
Actor: [Primary actor]
Preconditions: [What must be true before]
Main Flow:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
Alternative Flows:
  - [Alternative scenario]
Postconditions: [What is true after]
```

**Checklist for Functional Requirements:**
- [ ] Clear and unambiguous description
- [ ] Testable and verifiable
- [ ] Traceable to business objective
- [ ] Prioritized (Must/Should/Could/Won't)
- [ ] Acceptance criteria defined
- [ ] Dependencies identified
- [ ] Assumptions documented
- [ ] Unique identifier assigned

### 4. Non-Functional Requirements (NFRs)

**Performance Requirements:**
- Response time targets (e.g., < 200ms for 95% of requests)
- Throughput requirements (e.g., 1000 transactions/second)
- Resource utilization limits (CPU, memory, disk)
- Concurrent user capacity
- Data volume handling

**Security Requirements:**
- Authentication mechanisms (OAuth, SAML, MFA)
- Authorization model (RBAC, ABAC)
- Data encryption (at rest, in transit)
- Audit logging requirements
- Compliance requirements (GDPR, HIPAA, PCI-DSS)
- Security testing requirements

**Scalability Requirements:**
- Horizontal scaling capability
- Vertical scaling limits
- Geographic distribution
- Load balancing strategy
- Auto-scaling triggers

**Usability Requirements:**
- Accessibility standards (WCAG 2.1 Level AA)
- User interface guidelines
- Learning curve expectations
- Error message clarity
- Help and documentation

**Reliability Requirements:**
- Uptime targets (e.g., 99.9% availability)
- Mean Time Between Failures (MTBF)
- Mean Time To Recovery (MTTR)
- Backup and recovery procedures
- Disaster recovery requirements

**Maintainability Requirements:**
- Code quality standards
- Documentation requirements
- Modularity and extensibility
- Technology stack constraints
- Upgrade and migration paths

**Checklist for NFRs:**
- [ ] Specific and measurable
- [ ] Realistic and achievable
- [ ] Testable with clear metrics
- [ ] Prioritized by importance
- [ ] Trade-offs identified
- [ ] Monitoring approach defined

### 5. Requirements Analysis

**Completeness Check:**
- Are all user scenarios covered?
- Are all system interfaces defined?
- Are all data requirements specified?
- Are all business rules documented?
- Are error conditions addressed?
- Are edge cases considered?

**Consistency Check:**
- Do requirements contradict each other?
- Are terms used consistently?
- Are priorities aligned?
- Do NFRs support functional requirements?

**Feasibility Analysis:**
- Technical feasibility: Can it be built with available technology?
- Economic feasibility: Is it cost-effective?
- Operational feasibility: Can it be operated and maintained?
- Schedule feasibility: Can it be delivered on time?

**Risk Analysis:**
- What requirements are high-risk?
- What are the technical risks?
- What are the business risks?
- What mitigation strategies exist?

### 6. Requirements Prioritization

**MoSCoW Method:**
- **Must Have**: Critical for project success
- **Should Have**: Important but not critical
- **Could Have**: Nice to have if time permits
- **Won't Have**: Out of scope for this release

**Kano Model:**
- **Basic Needs**: Expected features (dissatisfiers if missing)
- **Performance Needs**: More is better (satisfiers)
- **Excitement Needs**: Unexpected delighters

**WSJF (Weighted Shortest Job First):**
```
WSJF = (Business Value + Time Criticality + Risk Reduction) / Job Size
```

**Priority Matrix:**
| Requirement | Business Value | Technical Complexity | Priority | Release |
|-------------|----------------|---------------------|----------|---------|
| FR-001 | High | Low | Must Have | 1.0 |
| FR-002 | Medium | High | Should Have | 1.1 |
| FR-003 | Low | Low | Could Have | 2.0 |

### 7. Requirements Traceability

**Traceability Matrix:**
| Req ID | Business Goal | Design Element | Implementation | Test Case | Status |
|--------|---------------|----------------|----------------|-----------|--------|
| FR-001 | Goal-1 | Component-A | Module-X | TC-001 | ✅ |
| FR-002 | Goal-1 | Component-B | Module-Y | TC-002 | 🔄 |
| NFR-001 | Goal-2 | Architecture | Config | TC-003 | ⏳ |

**Traceability Boundary:**
In this Bob configuration, traceability matrices must be realized only through
GitHub issues, Markdown documents, and code entries. Use Markdown tables for
the matrix view, GitHub issues for executable work tracking, and code entries
for implementation, commit, and test references.

**Traceability Links:**
- **Forward Traceability**: Requirements → Design → Implementation → Tests
- **Backward Traceability**: Tests → Implementation → Design → Requirements
- **Bidirectional Traceability**: Both forward and backward

### 8. Requirements Validation

**Validation Techniques:**

**Reviews and Inspections:**
- Peer review of requirements documents
- Stakeholder review sessions
- Technical feasibility reviews
- Compliance reviews

**Prototyping:**
- Create UI mockups
- Build proof-of-concepts
- Demonstrate workflows
- Gather feedback

**Test Case Derivation:**
- Can test cases be written?
- Are acceptance criteria testable?
- Can requirements be verified?

**Validation Checklist:**
- [ ] Stakeholders approve requirements
- [ ] Requirements are complete
- [ ] Requirements are consistent
- [ ] Requirements are testable
- [ ] Requirements are feasible
- [ ] Requirements are unambiguous
- [ ] Requirements are traceable
- [ ] Acceptance criteria are clear

### 9. Requirements Change Management

**Change Request Process:**
1. **Submit Change Request**
   - Describe proposed change
   - Justify the change
   - Assess impact

2. **Impact Analysis**
   - Technical impact
   - Schedule impact
   - Cost impact
   - Risk impact

3. **Review and Approval**
   - Change control board review
   - Stakeholder approval
   - Priority assessment

4. **Implementation**
   - Update requirements
   - Update traceability
   - Communicate changes
   - Update documentation

**Change Tracking:**
| Change ID | Requirement | Description | Impact | Status | Approved By |
|-----------|-------------|-------------|--------|--------|-------------|
| CR-001 | FR-005 | Add export feature | Medium | Approved | Product Owner |
| CR-002 | NFR-003 | Increase capacity | High | Pending | Architecture |

### 10. Agile Sprint Planning (Sprint-Sectioned Output)

Use sprint-sectioned output when the user works in an agile context (Scrum,
sprints, iterations, increments, backlog), or when the specification is too
large to handle in one piece (roughly more than 15 requirements or more than
two epics). In the second case, offer the sprint split and do not impose it.
The requirements stay the single source of truth. Sprints are a delivery view
on top of them and do not replace REQ/NFR IDs.

**Planning parameters (ask before planning, or record them as assumptions):**
- Sprint length (default assumption: 2 weeks)
- Team capacity or velocity per sprint in the chosen estimation unit (story
  points or ideal days). Without a known velocity, state an assumed value and
  mark it as an assumption.
- Capacity buffer for unplanned work and bugs (default assumption: 20%)
- Number of sprints or the target release date
- Whether a Sprint 0 is needed (setup, architecture spike, CI/CD, environments)
- The team's Definition of Ready (DoR) and Definition of Done (DoD)

**Step 1: Build the product backlog.**
- Derive one or more user stories (`US-XXX`) from every REQ/NFR and keep the
  link: each story names the REQ/NFR IDs it implements.
- Check every story against INVEST (Independent, Negotiable, Valuable,
  Estimable, Small, Testable).
- Split any story that is larger than about half of one sprint's capacity.
  Split by workflow step, business rule, data variation, CRUD operation,
  happy path before error paths, or interface (API before UI). Do not split
  by technical layer.
- When uncertainty blocks estimation, add a time-boxed spike (`SPIKE-XXX`).
- Express an NFR as acceptance criteria on the affected stories. When it needs
  its own work (for example monitoring or load-test setup), express it as an
  enabler story (`EN-XXX`).

**Step 2: Estimate and order.**
- Estimate each story. Order the backlog by dependencies first, then by
  priority (MoSCoW or WSJF), and pull risky items and spikes forward.
- Sprint 1 (or Sprint 0) should deliver a walking skeleton: a thin end-to-end
  slice that proves the architecture.

**Step 3: Allocate stories to sprints.**
- Fill each sprint up to capacity minus the buffer. Never plan above capacity.
- Give each sprint one sprint goal that describes a usable, demonstrable
  increment. The goal states an outcome, not a list of stories.
- A story must not depend on a story in a later sprint. If it does, move the
  dependency earlier or move the story later.
- Keep everything beyond the planned horizon in the unscheduled backlog. Plan
  roughly 2–4 sprints in detail. Plan later sprints only at goal level, because
  their contents will change.

**Step 4: Re-plan after each sprint.**
- Record the sprint review outcome, the actual velocity, and any carry-over
  stories in that sprint's section.
- Feed changed requirements through Change Management (section 9), then
  re-order the backlog and re-plan the remaining sprints.

**Handling many requirements (context efficiency):**
- Split the output into files: `<spec-dir>/backlog.md` holds the planning
  parameters, the ranked backlog, the sprint roadmap, and the assumptions, and
  `<spec-dir>/sprints/sprint-NN.md` holds one file per sprint. The
  requirements specification stays in its own file. When the user has given
  no `<spec-dir>`, propose `specs/<project>/`.
- Allocation (Steps 1–3) runs once over the whole backlog, because sprints
  depend on each other. After the roadmap is fixed, detail each sprint
  separately. Independent sprints can be detailed as parallel subtasks, one
  sprint file per subtask.
- Generate sprint by sprint. When the context gets tight, write
  `task-handoff.md` with the last completed sprint and the next sprint to
  detail.

**Traceability in sprints (within the carrier boundary):**
- Each sprint becomes a GitHub milestone named `Sprint NN – <sprint goal>`,
  with the sprint end date as the due date. Each story, task, and test issue
  also gets a `sprint:NN` label.
- An epic may span several sprints. Its features and stories carry the
  milestone of the sprint they are delivered in.
- A carry-over story moves to the next milestone, and the sprint file records
  why it was carried over.
- Sprint, story, and REQ links live only in GitHub issues, Markdown, and code
  references. Never reference Jira sprints, Azure Boards iterations, or
  similar external trackers as the source of truth.

## Output Format

### Requirements Document Structure

```markdown
# Requirements Specification: [Project Name]

## Document Information
- **Version**: 1.0
- **Date**: YYYY-MM-DD
- **Author**: [Name]
- **Status**: Draft / Review / Approved

## 1. Introduction

### 1.1 Purpose
[Purpose of this document]

### 1.2 Scope
[What is included and excluded]

### 1.3 Definitions and Acronyms
| Term | Definition |
|------|------------|
| API | Application Programming Interface |

### 1.4 References
- [Related documents]

## 2. Overall Description

### 2.1 Product Perspective
[How this fits into the larger system]

### 2.2 Product Functions
[High-level capabilities]

### 2.3 User Characteristics
[Who will use the system]

### 2.4 Constraints
- Technical constraints
- Business constraints
- Regulatory constraints

### 2.5 Assumptions and Dependencies
- [Assumption 1]
- [Dependency 1]

## 3. Functional Requirements

### 3.1 [Feature Area 1]

#### FR-001: [Requirement Name]
- **Priority**: Must Have / Should Have / Could Have / Won't Have
- **Description**: [Clear description]
- **User Story**: As a [user], I want [goal] so that [benefit]
- **Acceptance Criteria**:
  - [ ] Given [context], when [action], then [outcome]
  - [ ] Given [context], when [action], then [outcome]
- **Dependencies**: [List of dependent requirements]
- **Assumptions**: [Any assumptions]
- **Notes**: [Additional information]

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
#### NFR-001: Response Time
- **Description**: System response time for user interactions
- **Metric**: 95% of requests complete within 200ms
- **Priority**: Critical
- **Test Method**: Load testing with 1000 concurrent users

### 4.2 Security Requirements
#### NFR-002: Authentication
- **Description**: User authentication mechanism
- **Metric**: Support OAuth 2.0 and MFA
- **Priority**: Critical
- **Compliance**: GDPR, SOC2

### 4.3 Scalability Requirements
#### NFR-003: Concurrent Users
- **Description**: System capacity for concurrent users
- **Metric**: Support 10,000 concurrent users
- **Priority**: High
- **Test Method**: Load testing and capacity planning

### 4.4 Usability Requirements
#### NFR-004: Accessibility
- **Description**: Accessibility compliance
- **Metric**: WCAG 2.1 Level AA compliance
- **Priority**: High
- **Test Method**: Automated accessibility testing

### 4.5 Reliability Requirements
#### NFR-005: Availability
- **Description**: System uptime
- **Metric**: 99.9% uptime (8.76 hours downtime/year)
- **Priority**: Critical
- **Test Method**: Monitoring and incident tracking

## 5. System Features

### 5.1 [Feature Name]
- **Description**: [Feature description]
- **Priority**: [Must/Should/Could/Won't]
- **Functional Requirements**: FR-001, FR-002, FR-003
- **Non-Functional Requirements**: NFR-001, NFR-002

## 6. External Interface Requirements

### 6.1 User Interfaces
- [UI requirements]

### 6.2 Hardware Interfaces
- [Hardware requirements]

### 6.3 Software Interfaces
- [Integration requirements]

### 6.4 Communication Interfaces
- [Network protocols, APIs]

## 7. Quality Attributes

### 7.1 Maintainability
- Code quality standards
- Documentation requirements
- Modularity requirements

### 7.2 Portability
- Platform independence
- Browser compatibility
- Mobile support

### 7.3 Testability
- Test coverage requirements
- Automated testing requirements
- Test data requirements

## 8. Appendices

### Appendix A: Traceability Matrix
[Requirements traceability as Markdown tables linked to GitHub issues and code entries]

### Appendix B: Glossary
[Terms and definitions]

### Appendix C: Analysis Models
[Diagrams and models]
```

### Sprint-Sectioned Delivery Plan Structure (Agile)

Use this structure together with the requirements specification when section 10
applies. For large backlogs, split it into `backlog.md` (everything before the
first sprint section, plus the unscheduled backlog and the assumptions) and one
`sprints/sprint-NN.md` file per sprint section.

```markdown
# Sprint Plan: [Project Name]

## Planning Parameters
- **Sprint length**: 2 weeks
- **Capacity**: 30 SP per sprint (assumed velocity), 20% buffer → 24 SP plannable
- **Horizon**: Sprints 0–3 in detail; Sprints 4+ at goal level
- **Estimation unit**: Story points (Fibonacci)
- **Definition of Ready**: story linked to REQ/NFR, acceptance criteria written, estimated, dependencies known
- **Definition of Done**: code reviewed, tests passing, acceptance criteria verified, docs updated, REQ IDs in code/tests

## Product Backlog (ranked)
| Rank | ID | Title | Implements | Priority | Estimate | Depends on | Sprint |
|------|----|-------|-----------|----------|----------|------------|--------|
| 1 | SPIKE-001 | Evaluate OAuth provider | REQ-AUTH-001 | Must | 3 | – | 0 |
| 2 | US-001 | Log in with OAuth | REQ-AUTH-001, NFR-002 | Must | 8 | SPIKE-001 | 1 |
| 3 | EN-001 | Auth latency monitoring | NFR-001 | Should | 3 | US-001 | 1 |

## Sprint Roadmap
| Sprint | Dates | Sprint Goal | Stories | Planned SP | Key REQs | Milestone |
|--------|-------|-------------|---------|------------|----------|-----------|
| 0 | YYYY-MM-DD – YYYY-MM-DD | Team can build, test, and deploy a skeleton | SPIKE-001, EN-000 | 8 | – | Sprint 00 – Walking skeleton |
| 1 | … | Users can log in with OAuth | US-001, EN-001 | 11 | REQ-AUTH-001 | Sprint 01 – OAuth login |

## Sprint 01 — [Sprint Goal]

### Sprint Goal
[One outcome sentence: what users or stakeholders can do at the end of the sprint]

### Committed Stories
#### US-001: Log in with OAuth (REQ-AUTH-001, NFR-002) — 8 SP
As a registered user
I want to log in with my company account
So that I do not manage a separate password

**Acceptance Criteria:**
- Given a valid company account, when I log in, then I reach the dashboard
- Given a revoked account, when I log in, then access is denied with a clear message
- NFR-002: Tokens are validated on every request

### Enablers and Spikes
- EN-001: Auth latency monitoring (NFR-001) — 3 SP

### Dependencies and Risks
- Depends on: SPIKE-001 (Sprint 00)
- Risk: provider sandbox availability → mitigation: mock provider in CI

### Sprint Definition of Done (additions to the team DoD)
- OAuth flow covered by an integration test

### Traceability
| Story | Implements | Milestone | Issue | Test |
|-------|-----------|-----------|-------|------|
| US-001 | REQ-AUTH-001, NFR-002 | Sprint 01 | #TBD | #TBD |

### Sprint Review and Carry-over (fill in after the sprint)
- Delivered: …
- Actual velocity: … SP
- Carry-over: [story → Sprint NN, reason]

## Sprint 02 — [Sprint Goal]
…

## Unscheduled Backlog
[Ranked stories beyond the planning horizon, with Implements and Estimate]

## Assumptions
[Every assumed planning parameter, such as velocity, capacity, or dates]
```

## Key Questions This Skill Answers

1. **What needs to be built?**
   - Functional capabilities
   - System features
   - User workflows

2. **Why does it need to be built?**
   - Business justification
   - User needs
   - Value proposition

3. **Who will use it?**
   - User personas
   - Stakeholder groups
   - Access levels

4. **How well must it perform?**
   - Performance targets
   - Quality attributes
   - Success metrics

5. **What are the constraints?**
   - Technical limitations
   - Business constraints
   - Regulatory requirements

6. **How will we know it's done?**
   - Acceptance criteria
   - Test cases
   - Definition of Done

7. **What is delivered in which sprint?**
   - Sprint goals and increments
   - Story-to-requirement mapping per sprint
   - Capacity fit and carry-over

## Best Practices

### DO:
✅ Involve stakeholders early and often
✅ Use clear, unambiguous language
✅ Make requirements testable and verifiable
✅ Prioritize ruthlessly
✅ Maintain traceability
✅ Document assumptions and constraints
✅ Use visual models to complement text
✅ Review and validate regularly
✅ Manage changes systematically
✅ Keep requirements at appropriate level of detail

### DON'T:
❌ Use vague terms like "fast", "user-friendly", "robust"
❌ Mix requirements with design decisions
❌ Assume stakeholders understand technical terms
❌ Document everything as "must have"
❌ Ignore non-functional requirements
❌ Skip validation with stakeholders
❌ Let requirements become stale
❌ Forget to trace requirements to implementation
❌ Overlook edge cases and error conditions
❌ Write requirements in isolation

## Common Pitfalls

### Pitfall 1: Vague Requirements
❌ **Bad**: "The system should be fast"
✅ **Good**: "The system shall respond to user search queries within 200ms for 95% of requests under normal load (1000 concurrent users)"

### Pitfall 2: Solution-Focused Requirements
❌ **Bad**: "The system shall use Redis for caching"
✅ **Good**: "The system shall cache frequently accessed data to achieve sub-200ms response times"

### Pitfall 3: Missing Acceptance Criteria
❌ **Bad**: "Users can log in"
✅ **Good**: 
```
Users can log in
Acceptance Criteria:
- Given valid credentials, when user submits login form, then user is authenticated and redirected to dashboard
- Given invalid credentials, when user submits login form, then error message is displayed
- Given locked account, when user attempts login, then account locked message is displayed
```

### Pitfall 4: Ignoring Non-Functional Requirements
❌ **Bad**: Only documenting functional features
✅ **Good**: Documenting performance, security, scalability, usability, and reliability requirements

### Pitfall 5: No Prioritization
❌ **Bad**: Everything is "critical" or "must have"
✅ **Good**: Clear prioritization using MoSCoW or similar method

### Pitfall 6: Sprints as a Dumping Ground
❌ **Bad**: Distributing all requirements evenly across sprints with no sprint goal, capacity check, or dependency order
✅ **Good**: Each sprint has one outcome goal, is planned below capacity, respects dependencies, and every story links back to a REQ/NFR ID

## Integration with Other Skills

- **Architecture Patterns**: Validate that requirements align with architectural decisions
- **Security & Threat Modeling**: Ensure security requirements are comprehensive
- **Scalability & Performance**: Define performance and scalability requirements
- **Documentation Review**: Ensure requirements are well-documented
- **12-Factor Compliance**: Align requirements with cloud-native principles

## Tools and Techniques

### Requirements Management Tools
- GitHub issues for issue-based traceability
- Markdown documents for requirements and traceability matrices
- Code entries for implementation, commit, and test references
- External tools such as Jira, Azure DevOps, IBM DOORS, Confluence, Notion,
  Miro, or Mural may be source inputs or workshop aids, but they are not
  supported traceability sources of truth in this configuration.

### Modeling Techniques
- Use Case Diagrams (UML)
- User Story Mapping
- Event Storming
- Domain Modeling (DDD)
- Process Flow Diagrams

### Prioritization Frameworks
- MoSCoW (Must, Should, Could, Won't)
- Kano Model
- WSJF (Weighted Shortest Job First)
- Value vs. Effort Matrix

### Agile Planning References
- The Scrum Guide (2020) — sprint goal, sprint planning, Definition of Done (https://scrumguides.org)
- INVEST criteria for user stories (Bill Wake)
- Story-splitting patterns (Richard Lawrence, Humanizing Work)
- User Story Mapping (Jeff Patton) for release and sprint slicing

### Validation Techniques
- Requirements Reviews
- Prototyping
- Acceptance Test-Driven Development (ATDD)
- Behavior-Driven Development (BDD)

## Success Metrics

Track requirements management effectiveness:
- **Requirements Stability**: % of requirements that don't change after baseline
- **Requirements Coverage**: % of requirements with test cases
- **Defect Traceability**: % of defects traced to requirements issues
- **Stakeholder Satisfaction**: Feedback on requirements quality
- **Time to Clarity**: Average time to get clear, approved requirements
- **Rework Rate**: % of work redone due to unclear requirements
- **Sprint Goal Achievement** (agile): % of sprints that met their sprint goal
- **Planning Accuracy** (agile): planned vs. delivered story points per sprint

---

**Skill Version**: 1.1  
**Last Updated**: 2026-11-19  
**Maintained By**: Requirements Engineering Team
