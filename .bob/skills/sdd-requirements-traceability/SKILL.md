ability matrix
   - Link design to requirement

3. **Implementation Phase**
   - Create feature branch: feature/REQ-XXX-description
   - Implement with code comments referencing REQ-XXX
   - Commit with message: [REQ-XXX] Implementation description
   - Update traceability matrix

4. **Testing Phase**
   - Create test cases referencing REQ-XXX
   - Link tests to implementation
   - Update traceability matrix

5. **Validation**
   - Run traceability analysis
   - Verify end-to-end traceability
   - Fix any gaps before merge

### Workflow 2: Traceability Audit

1. **Initial Analysis**
   - Run traceability parsing on all artifacts
   - Generate coverage report
   - Identify gaps and orphans

2. **Gap Prioritization**
   - Categorize gaps by severity
   - Assess risk for each gap
   - Create prioritized action plan

3. **Gap Resolution**
   - Fix critical gaps first
   - Document orphaned elements
   - Update broken links
   - Standardize naming conventions

4. **Validation**
   - Re-run traceability analysis
   - Verify improvements
   - Generate final report

5. **Continuous Monitoring**
   - Set up automated checks
   - Configure CI/CD validation
   - Schedule regular audits

### Workflow 3: Pull Request Review

1. **PR Submission**
   - Developer includes requirement ID in PR title/description
   - Traceability links updated in code and docs

2. **Automated Validation**
   - CI/CD runs traceability checks
   - Validates requirement ID exists
   - Checks for broken links
   - Verifies coverage maintained

3. **Manual Review**
   - Reviewer checks traceability completeness
   - Validates requirement justification
   - Ensures bidirectional links

4. **Approval**
   - All traceability checks pass
   - PR merged with traceability intact

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

Traceability analysis depends on facts only the user may know: which artifacts
are the source of truth, which requirement-ID convention applies, which
repositories and test suites are in scope, and how strict coverage must be.
Never invent these. Apply the Grill Me pattern from
`.bob/skills/sdd-sdlc-discovery-gap-analysis/SKILL.md` at any point in the
workflows above — not only at the start:

1. **Pause and ask** three to five targeted back-questions covering only the
   blocking unknowns (source artifacts, ID conventions, audit scope, coverage
   expectations, expected output format).
2. **State safe assumptions explicitly** when an answer is not available, and
   record each one in the traceability report so it can be challenged.
3. **Resume the analysis** only when every blocking unknown is answered or
   covered by a documented assumption.

## Key Questions This Skill Answers

1. **Are all requirements implemented?**
   - Which requirements have no implementation?
   - What is the implementation coverage percentage?
   - Which critical requirements are missing?

2. **Is all code justified by requirements?**
   - Which code modules lack requirement references?
   - How much orphaned code exists?
   - What is the scope creep risk?

3. **Are requirements properly tested?**
   - Which requirements lack test coverage?
   - What is the test coverage percentage?
   - Which critical requirements are untested?

4. **Is traceability consistent?**
   - Are forward and backward links matching?
   - How many broken links exist?
   - What naming inconsistencies are present?

5. **What are the traceability gaps?**
   - Which requirements are orphaned?
   - Which implementation is orphaned?
   - What broken links need fixing?

6. **How healthy is our traceability?**
   - What is the end-to-end coverage?
   - What is the trend over time?
   - Are we meeting our targets?

7. **What actions should we take?**
   - Which gaps are highest priority?
   - What is the recommended action plan?
   - What is the expected impact?

## Constraints and Requirements

### Hard Constraints
1. **Open-Source Only**: No enterprise tools required
2. **Git-Native**: All data in version control
3. **Non-Invasive**: No code structure changes required
4. **Automation-First**: Minimize manual maintenance
5. **Bidirectional**: Forward and backward traceability
6. **Unique IDs**: Stable, unique requirement identifiers
7. **Version Controlled**: Traceability data versioned with code
8. **CI/CD Compatible**: Automatable validation
9. **Human-Readable**: No special tools needed to read
10. **Incremental**: Gradual adoption supported
11. **Carrier Restriction**: Traceability matrices are realized only through
    GitHub issues, Markdown documents, and code entries. Do not use external
    ALM systems, databases, spreadsheet-only trackers, or proprietary
    traceability repositories as the source of truth unless a dedicated
    integration is added.

### Quality Requirements
- Traceability analysis must complete in <5 minutes
- Coverage calculations must be accurate to 1%
- Gap detection must identify all broken links
- Reports must be actionable and prioritized
- Validation must integrate with existing CI/CD
- Documentation must be clear and comprehensive

## Research Sources and Standards

### Industry Standards
- **IEEE 830-1998**: Software Requirements Specifications
- **ISO/IEC/IEEE 29148:2018**: Requirements engineering lifecycle
- **CMMI Requirements Management (REQM)**: Traceability process area
- **Conventional Commits**: Structured commit messages
- **Semantic Versioning**: Version tracking

### Best Practices References
- Git workflow patterns (git-scm.com)
- Agile traceability approaches (Agile Alliance)
- Requirements engineering (IREB standards)
- DevOps traceability integration
- Continuous compliance validation

### Open-Source Alternatives to Enterprise Tools
Instead of IBM DOORS, Jama, or commercial ALM platforms, use:
- Git + Markdown for requirement documentation
- Python/Shell scripts for automated analysis
- GitHub issues for workflow integration and work-item traceability
- Markdown tables for traceability matrices
- Code entries for implementation, commit, and test references
- Git hooks for validation
- CI/CD pipelines for continuous checks

---

**Skill Version**: 1.0  
**Last Updated**: 2026-05-31  
**Maintained By**: Requirements Engineering Team  
**Related Skills**: requirements-management-skill.md  
**Industry Standards**: IEEE 830, ISO/IEC/IEEE 29148, CMMI REQM
