# Custom Modes Overview Diagram

This document explains the [`custom-modes-overview.drawio`](custom-modes-overview.drawio)
diagram that visualizes the architecture-review subset of the modes defined in
[`Modes/SDD/*-mode.yaml`](../../).

## Diagram Purpose

The diagram provides a comprehensive visual representation of:
- The main Architecture Review mode (orchestrator)
- All 7 specialized review modes
- The 7 focused review skill files they utilize
- The SDLC discovery and gap-analysis skill used before reviews when scope or lifecycle phase is unclear
- The relationships between modes and skills

## Target Audience

**Primary Users:** Developers and programmers who maintain the [`Modes/SDD/*-mode.yaml`](../../) file

**Use Cases:**
- Understanding the architecture-review mode subset
- Verifying the depicted review modes are properly defined
- Identifying relationships between modes and skills
- Onboarding new team members to the review system
- Planning mode enhancements or additions

## Diagram Structure

### Main Orchestrator Mode

**Architecture Review (arch-review)**
- Central orchestrator that can use all 7 focused review skills
- Uses SDLC discovery and gap analysis before the review when the user intent,
  lifecycle phase, source artifacts, or output expectations are unclear
- Conducts comprehensive reviews across all areas
- Supports focused reviews using specific skills
- Enables iterative reviews, one skill at a time

### Specialized Review Modes

The diagram shows 7 specialized modes, each focusing on a specific aspect:

1. **Security and Threat Modeling (security-review)**
   - OWASP Top 10, STRIDE threat modeling
   - Authentication, authorization, data protection
   - Compliance requirements (GDPR, HIPAA, PCI-DSS, SOC2)

2. **Scalability and Performance (scalability-review)**
   - Horizontal/vertical scaling strategies
   - Load balancing, caching, optimization
   - Performance benchmarking and capacity planning

3. **Architecture Patterns (patterns-review)**
   - Microservices, CQRS, Event Sourcing, DDD
   - SOLID principles and design patterns
   - API design (REST, GraphQL, gRPC)

4. **Maintainability and Technical Debt (maintainability-review)**
   - Code complexity and coupling analysis
   - Test coverage and refactoring strategies
   - Technical debt quantification

5. **Documentation Review (documentation-review)**
   - Architecture Decision Records (ADRs)
   - C4 Model and UML diagrams
   - API documentation and runbooks
   - License notices and content provenance evidence

6. **12-Factor Compliance (twelve-factor-review)**
   - Cloud-native principles (all 12 factors)
   - Configuration, processes, logs
   - Dev/prod parity and disposability

7. **Business Alignment (business-alignment-review)**
   - Strategic technology planning
   - Quality attribute requirements
   - Stakeholder analysis and ROI evaluation

### Review Skills

The architecture-review subset uses these skills from the
[`.bob/skills/`](../../../../skills/) directory:

1. [`sdd-sdlc-discovery-gap-analysis/SKILL.md`](../../../../skills/sdd-sdlc-discovery-gap-analysis/SKILL.md)
2. [`sdd-business-alignment/SKILL.md`](../../../../skills/sdd-business-alignment/SKILL.md)
3. [`sdd-security-threat-modeling/SKILL.md`](../../../../skills/sdd-security-threat-modeling/SKILL.md)
4. [`sdd-scalability-performance/SKILL.md`](../../../../skills/sdd-scalability-performance/SKILL.md)
5. [`sdd-architecture-patterns/SKILL.md`](../../../../skills/sdd-architecture-patterns/SKILL.md)
6. [`sdd-maintainability-technical-debt/SKILL.md`](../../../../skills/sdd-maintainability-technical-debt/SKILL.md)
7. [`sdd-documentation-review/SKILL.md`](../../../../skills/sdd-documentation-review/SKILL.md)
8. [`sdd-twelve-factor-compliance/SKILL.md`](../../../../skills/sdd-twelve-factor-compliance/SKILL.md)

## Visual Elements

### Color Coding

- **Blue (#4A90E2)**: Main orchestrator mode
- **Purple (#7B68EE)**: Specialized review modes
- **Green (#50C878)**: Review skill files
- **Gray (#f5f5f5)**: Container backgrounds

### Connection Types

- **Solid arrows**: Direct orchestration relationship
- **Dashed arrows**: "uses" relationship between modes and skills

## Mode Capabilities

All modes share these capabilities:
- **Groups**: read, edit, command, mcp
- **Structured Output**: Achieved, Concerns, Not Achieved, Recommendations
- **Priority Levels**: Critical, High, Medium, Low
- **Evidence-Based**: Specific examples and code references

Documentation Review also checks repository license and provenance evidence:
[`LICENSE_DOCUMENTATION.md`](../../../../../LICENSE_DOCUMENTATION.md),
[`THIRD_PARTY_NOTICES.md`](../../../../../THIRD_PARTY_NOTICES.md),
[`CONTENT_PROVENANCE.md`](../../../../../CONTENT_PROVENANCE.md),
[`RESOURCE_LICENSES.md`](../../resource-licenses.md), and
[`KNOWLEDGE_SOURCES.md`](../../knowledge-sources.md).

## Usage Patterns

### Complete Review
Use the **Architecture Review** mode to conduct comprehensive reviews across all 7 areas.

### Focused Review
Use specialized modes for deep analysis in specific areas:
- Security concerns → Security and Threat Modeling
- Performance issues → Scalability and Performance
- Design decisions → Architecture Patterns
- Code quality → Maintainability and Technical Debt
- Documentation gaps → Documentation Review
- Cloud readiness → 12-Factor Compliance
- Business alignment → Business Alignment

### Iterative Review
Start with Architecture Review and work through skills one at a time based on priority.

## Maintenance Notes

When updating [`Modes/SDD/*-mode.yaml`](../../):
1. Ensure architecture-review mode changes are reflected in the diagram
2. Verify skill file references are correct
3. Update relationships if new modes or skills are added
4. Keep color coding consistent for visual clarity
5. Update this documentation to reflect changes

## Related Files

- Configuration: [`Modes/SDD/*-mode.yaml`](../../)
- Skills Directory: [`.bob/skills/`](../../../../skills/)
- Architecture Review Guide: [`documentation/guides/architecture-review-guide.md`](../guides/architecture-review-guide.md)
- System Diagram: [`architecture-review-system.drawio`](architecture-review-system.drawio)
