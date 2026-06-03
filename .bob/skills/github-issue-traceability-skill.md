# GitHub Issue Traceability Skill

## Purpose
Enable complete SDLC traceability from business goals through requirements, GitHub issues, implementation, and testing. This skill bridges requirements management with issue tracking to ensure every line of code is justified by a requirement and validated by tests.

## Expertise Areas
- GitHub issue structuring for traceability
- Requirement-to-issue mapping
- Issue hierarchy design (Epic → Feature → Task → Test)
- Traceability metadata management
- Git commit message conventions
- Code comment standards for traceability
- Test-to-requirement linking
- Traceability validation and auditing

## Traceability Chain

The complete traceability chain this skill supports:

```
BUSINESS GOAL → REQUIREMENT → EPIC → FEATURE → TASK → GIT COMMIT → CODE → TEST → VALIDATION
```

### Chain Components

1. **BUSINESS GOAL**: Strategic objective or business capability
   - Documented in: Business requirements, product vision
   - Example: "Improve user authentication security"

2. **REQUIREMENT**: Specific, testable requirement with unique ID
   - Format: REQ-XXX-YYY or NFR-XXX-YYY
   - Documented in: Requirements specification (SDD output)
   - Example: REQ-AUTH-001 "System shall support OAuth 2.0 authentication"

3. **EPIC**: Large body of work spanning multiple features
   - GitHub Issue Type: Epic
   - Title Format: [EPIC] Title (REQ-XXX)
   - Maps to: 1-5 requirements
   - Example: "[EPIC] User Authentication System (REQ-AUTH-001)"

4. **FEATURE**: Specific functionality within an epic
   - GitHub Issue Type: Feature
   - Title Format: [FEATURE] Title (REQ-XXX-YYY) - Part of #EpicNumber
   - Maps to: 1-3 requirements
   - Example: "[FEATURE] OAuth 2.0 Integration (REQ-AUTH-002) - Part of #1"

5. **TASK**: Implementation work for a feature
   - GitHub Issue Type: Task
   - Title Format: [TASK] Title (REQ-XXX-YYY.Z) - Part of #FeatureNumber
   - Maps to: Specific aspect of a requirement
   - Example: "[TASK] Implement JWT token validation (REQ-AUTH-002.1) - Part of #2"

6. **GIT COMMIT**: Code changes implementing a task
   - Commit Message Format: [#IssueNumber] Description
   - Example: "[#3] Implement JWT token validation for OAuth flow"

7. **CODE**: Implementation with traceability comments
   - Comment Format: // REQ-XXX-YYY: Description
   - Example: `// REQ-AUTH-002.1: JWT token validation logic`

8. **TEST**: Validation of requirements and features
   - GitHub Issue Type: Test
   - Title Format: [TEST] Title (REQ-XXX-YYY) - Validates #FeatureNumber
   - Test Code Comments: // Tests REQ-XXX-YYY
   - Example: "[TEST] OAuth integration tests (REQ-AUTH-002) - Validates #2"

9. **VALIDATION**: Confirmation that requirement is met
   - Documented in: Test results, acceptance criteria sign-off
   - Links back to: Original requirement and business goal

## Issue Structure for Traceability

### Epic Issue Template

```markdown
# [EPIC] Epic Title (REQ-XXX)

## Business Context
[Why this epic is needed - link to business goal]

## Traceability
- **Requirement IDs**: REQ-XXX-001, REQ-XXX-002, REQ-XXX-003
- **Source Document**: [Link to requirements specification]
- **Business Goal**: [Link to business objective]
- **Child Issues**: #A, #B, #C (features)
- **Success Metrics**: [How we measure success]

## Epic Description
[Detailed description of the epic scope]

## Features
- [ ] #A - Feature 1 (REQ-XXX-001)
- [ ] #B - Feature 2 (REQ-XXX-002)
- [ ] #C - Feature 3 (REQ-XXX-003)

## Acceptance Criteria
- [ ] All child features completed
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Business goals achieved

## Dependencies
- Blocked by: [External dependencies]
- Blocks: [What depends on this]

## Definition of Done
- [ ] All features implemented and tested
- [ ] End-to-end traceability verified
- [ ] Stakeholder acceptance obtained
```

### Feature Issue Template

```markdown
# [FEATURE] Feature Title (REQ-XXX-YYY) - Part of #EpicNumber

## Context
[Why this feature is needed and its business value]

## Traceability
- **Requirement ID**: REQ-XXX-YYY
- **Source Document**: [Link to requirements specification]
- **Parent Issue**: #N (epic)
- **Child Issues**: #A, #B (tasks), #C (tests)
- **Related Issues**: #X, #Y (dependencies)
- **Affected Files**: 
  - src/auth/oauth.py
  - src/auth/jwt.py
  - config/auth.yml
- **Test Coverage**: #C (test issue)

## Feature Description
[Detailed description of the feature]

## Acceptance Criteria
- [ ] Criterion 1 (maps to REQ-XXX-YYY aspect 1)
- [ ] Criterion 2 (maps to REQ-XXX-YYY aspect 2)
- [ ] Criterion 3 (maps to REQ-XXX-YYY aspect 3)

## Technical Details
[Implementation approach, APIs, data models]

## Implementation Notes
- Code comments must include: // REQ-XXX-YYY: [description]
- Git commits must reference: [#IssueNumber] commit message
- Tests must validate requirement REQ-XXX-YYY

## Tasks
- [ ] #A - Implementation task 1 (REQ-XXX-YYY.1)
- [ ] #B - Implementation task 2 (REQ-XXX-YYY.2)
- [ ] #C - Test suite (REQ-XXX-YYY)

## Dependencies
- Blocked by: #X, #Y (must be completed first)
- Blocks: #Z (depends on this feature)
- Related: #W (parallel work)

## Definition of Done
- [ ] Code implemented with REQ-XXX-YYY comments
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Code reviewed and approved
- [ ] Merged with commit referencing this issue
- [ ] Documentation updated
- [ ] Traceability verified (requirement → code → test)
```

### Task Issue Template

```markdown
# [TASK] Task Title (REQ-XXX-YYY.Z) - Part of #FeatureNumber

## Context
[Why this task is needed - technical context]

## Traceability
- **Requirement ID**: REQ-XXX-YYY.Z
- **Source Document**: [Link to requirements specification]
- **Parent Issue**: #N (feature)
- **Related Issues**: #X (dependencies)
- **Affected Files**:
  - src/specific/module.py
  - tests/test_module.py
- **Test Coverage**: Covered by #TestIssue

## Task Description
[Specific implementation work to be done]

## Acceptance Criteria
- [ ] Specific criterion 1
- [ ] Specific criterion 2
- [ ] Specific criterion 3

## Technical Details
- File: src/specific/module.py
- Function: implement_feature()
- API: POST /api/endpoint
- Database: Add table/column

## Implementation Checklist
- [ ] Add code with // REQ-XXX-YYY.Z: comments
- [ ] Write unit tests
- [ ] Update documentation
- [ ] Commit with [#IssueNumber] reference

## Dependencies
- Blocked by: #X (prerequisite)
- Blocks: #Y (depends on this)

## Definition of Done
- [ ] Code implemented with traceability comments
- [ ] Tests passing
- [ ] Code reviewed
- [ ] Committed with issue reference
- [ ] Traceability verified
```

### Test Issue Template

```markdown
# [TEST] Test Title (REQ-XXX-YYY) - Validates #FeatureNumber

## Context
[What is being tested and why]

## Traceability
- **Requirement ID**: REQ-XXX-YYY
- **Source Document**: [Link to requirements specification]
- **Validates Issue**: #N (feature being tested)
- **Related Issues**: #X (implementation tasks)
- **Test Files**:
  - tests/test_feature.py
  - tests/integration/test_feature_integration.py

## Test Description
[What aspects of the requirement are being validated]

## Test Scenarios
- [ ] Scenario 1: [Happy path]
- [ ] Scenario 2: [Error handling]
- [ ] Scenario 3: [Edge cases]
- [ ] Scenario 4: [Performance]
- [ ] Scenario 5: [Security]

## Acceptance Criteria
- [ ] All test scenarios implemented
- [ ] Tests reference REQ-XXX-YYY in comments
- [ ] Code coverage meets target (e.g., 80%)
- [ ] Tests pass in CI/CD pipeline

## Test Implementation
```python
# tests/test_feature.py
# Tests REQ-XXX-YYY: Feature description

def test_scenario_1():
    # REQ-XXX-YYY: Test happy path
    pass

def test_scenario_2():
    # REQ-XXX-YYY: Test error handling
    pass
```

## Coverage Target
- Unit test coverage: 90%
- Integration test coverage: 80%
- Requirements validated: REQ-XXX-YYY

## Definition of Done
- [ ] All test scenarios implemented
- [ ] Tests include REQ-XXX-YYY comments
- [ ] Tests pass locally and in CI/CD
- [ ] Coverage targets met
- [ ] Traceability verified
```

## Git Commit Message Convention

### Format
```
[#IssueNumber] Brief description (REQ-XXX-YYY)

Detailed description of changes:
- Change 1
- Change 2
- Change 3

Implements: #IssueNumber
Requirement: REQ-XXX-YYY
```

### Examples

```
[#3] Implement JWT token validation (REQ-AUTH-002.1)

Added JWT token validation logic for OAuth 2.0 flow:
- Created JWTValidator class
- Added token expiration checking
- Implemented signature verification
- Added error handling for invalid tokens

Implements: #3
Requirement: REQ-AUTH-002.1
```

```
[#5] Add OAuth integration tests (REQ-AUTH-002)

Comprehensive test suite for OAuth 2.0 integration:
- Happy path authentication flow
- Token refresh scenarios
- Error handling tests
- Security validation tests

Validates: #2
Requirement: REQ-AUTH-002
```

## Code Comment Standards

### Requirement References in Code

```python
# REQ-AUTH-002.1: JWT token validation
class JWTValidator:
    """
    Validates JWT tokens for OAuth 2.0 authentication.
    
    Implements requirement REQ-AUTH-002.1:
    "System shall validate JWT tokens including signature verification,
    expiration checking, and claim validation."
    
    Related Issue: #3
    """
    
    def validate_token(self, token: str) -> bool:
        # REQ-AUTH-002.1: Verify token signature
        if not self._verify_signature(token):
            return False
        
        # REQ-AUTH-002.1: Check token expiration
        if self._is_expired(token):
            return False
        
        # REQ-AUTH-002.1: Validate required claims
        return self._validate_claims(token)
```

### Test References

```python
# tests/test_jwt_validator.py
# Tests REQ-AUTH-002.1: JWT token validation

class TestJWTValidator:
    """
    Test suite for JWT token validation.
    
    Validates requirement REQ-AUTH-002.1
    Related Issue: #5
    """
    
    def test_valid_token(self):
        """REQ-AUTH-002.1: Valid token should pass validation"""
        # Test implementation
        pass
    
    def test_expired_token(self):
        """REQ-AUTH-002.1: Expired token should fail validation"""
        # Test implementation
        pass
    
    def test_invalid_signature(self):
        """REQ-AUTH-002.1: Invalid signature should fail validation"""
        # Test implementation
        pass
```

## Traceability Validation

### Validation Checklist

- [ ] Every requirement has at least one GitHub issue
- [ ] Every epic/feature/task references a requirement ID
- [ ] Every GitHub issue includes traceability metadata
- [ ] Parent-child relationships are established
- [ ] Git commits reference issue numbers
- [ ] Code includes requirement ID comments
- [ ] Tests reference requirements they validate
- [ ] All acceptance criteria are testable
- [ ] Traceability chain is complete and bidirectional

### Traceability Matrix Example

| Req ID | Epic | Feature | Task | Commit | Code File | Test | Status |
|--------|------|---------|------|--------|-----------|------|--------|
| REQ-AUTH-001 | #1 | #2, #4 | #3, #6 | abc123 | auth/oauth.py | #5 | ✅ |
| REQ-AUTH-002 | #1 | #2 | #3 | abc123 | auth/jwt.py | #5 | ✅ |
| REQ-AUTH-003 | #1 | #4 | #6 | def456 | auth/mfa.py | #7 | 🔄 |

## Integration with SDD Mode

When working in SDD mode, prepare requirements for GitHub issue generation:

1. **Assign Unique IDs**: Every requirement gets REQ-XXX-YYY format
2. **Define Hierarchy**: Group requirements into logical epics and features
3. **Document Traceability**: Link requirements to business goals
4. **Specify Acceptance Criteria**: Make requirements testable
5. **Identify Dependencies**: Note blocking relationships
6. **Prepare Metadata**: Include all information needed for issue creation

### SDD Output Format for Issue Generation

```markdown
# Requirements Ready for GitHub Issues

## Epic: User Authentication System (REQ-AUTH-001)

### Business Goal
Improve user authentication security and support modern authentication methods.

### Requirements
- REQ-AUTH-001: System shall support OAuth 2.0 authentication
- REQ-AUTH-002: System shall validate JWT tokens
- REQ-AUTH-003: System shall support multi-factor authentication

### Suggested Issue Structure

**Epic #1**: [EPIC] User Authentication System (REQ-AUTH-001)
- **Feature #2**: [FEATURE] OAuth 2.0 Integration (REQ-AUTH-002) - Part of #1
  - **Task #3**: [TASK] Implement JWT validation (REQ-AUTH-002.1) - Part of #2
  - **Test #5**: [TEST] OAuth integration tests (REQ-AUTH-002) - Validates #2
- **Feature #4**: [FEATURE] Multi-Factor Authentication (REQ-AUTH-003) - Part of #1
  - **Task #6**: [TASK] Implement TOTP support (REQ-AUTH-003.1) - Part of #4
  - **Test #7**: [TEST] MFA integration tests (REQ-AUTH-003) - Validates #4

### Files to be Affected
- src/auth/oauth.py
- src/auth/jwt.py
- src/auth/mfa.py
- config/auth.yml
- tests/test_auth.py

### Dependencies
- OAuth library integration (external)
- Database schema updates (internal)
```

## Best Practices

### DO:
✅ Always include requirement IDs in issue titles
✅ Establish clear parent-child relationships
✅ Include complete traceability metadata in every issue
✅ Reference issue numbers in commit messages
✅ Add requirement ID comments in code
✅ Link tests to requirements they validate
✅ Maintain bidirectional traceability
✅ Validate traceability before merging
✅ Use consistent naming conventions
✅ Document affected files in issues

### DON'T:
❌ Create issues without requirement IDs
❌ Skip traceability metadata sections
❌ Forget to link parent/child issues
❌ Commit without issue references
❌ Write code without requirement comments
❌ Create tests without requirement links
❌ Break the traceability chain
❌ Use inconsistent ID formats
❌ Ignore dependencies and blockers
❌ Skip traceability validation

## Success Metrics

Track traceability effectiveness:
- **Requirement Coverage**: % of requirements with GitHub issues
- **Issue Traceability**: % of issues with complete traceability metadata
- **Commit Traceability**: % of commits referencing issues
- **Code Traceability**: % of code with requirement comments
- **Test Coverage**: % of requirements with test validation
- **Chain Completeness**: % of complete traceability chains
- **Validation Success**: % of traceability audits passing

## Integration with Other Skills

- **requirements-management-skill.md**: Source of requirements with IDs
- **requirements-traceability-skill.md**: Validation and audit of traceability
- **architecture-patterns-skill.md**: Architectural decisions linked to requirements
- **security-threat-modeling-skill.md**: Security requirements traceability
- **documentation-review-skill.md**: Documentation of traceability approach

---

**Skill Version**: 1.0  
**Last Updated**: 2026-06-03  
**Maintained By**: Requirements Engineering Team  
**Related Skills**: requirements-management-skill.md, requirements-traceability-skill.md  
**Related Modes**: sdd, github-issue-generator