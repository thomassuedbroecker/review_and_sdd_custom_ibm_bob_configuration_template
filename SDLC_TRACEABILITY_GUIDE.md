# SDLC Traceability Guide

## Overview

This guide documents the complete Software Development Life Cycle (SDLC) traceability framework implemented in this Bob configuration. It ensures every line of code is justified by a requirement, tracked through GitHub issues, and validated by tests.

## Traceability Chain

The complete traceability chain connects business goals to validated code:

```
BUSINESS GOAL → REQUIREMENT → EPIC → FEATURE → TASK → GIT COMMIT → CODE → TEST → VALIDATION
```

### Why Traceability Matters

1. **Compliance**: Meet regulatory requirements (FDA, ISO, SOC2, etc.)
2. **Quality**: Ensure all requirements are implemented and tested
3. **Maintenance**: Understand why code exists and what it does
4. **Change Management**: Assess impact of changes across the system
5. **Audit Trail**: Provide evidence of requirements fulfillment
6. **Team Communication**: Clear understanding of work relationships

## Workflow Integration

### Phase 1: Requirements Definition (SDD Mode)

**Mode**: [`sdd`](.bob/custom_modes.yaml#L108-L223)  
**Skills**: 
- [`requirements-management-skill.md`](.bob/skills/requirements-management-skill.md)
- [`requirements-traceability-skill.md`](.bob/skills/requirements-traceability-skill.md)

**Process**:
1. Elicit requirements from stakeholders
2. Assign unique requirement IDs (REQ-XXX-YYY format)
3. Document functional and non-functional requirements
4. Define acceptance criteria
5. Establish requirement relationships and dependencies
6. Link requirements to business goals
7. Prepare requirements for GitHub issue generation

**Output**: Requirements specification with:
- Unique requirement IDs
- Clear acceptance criteria
- Traceability to business goals
- Suggested issue hierarchy
- Files likely to be affected

**Example**:
```markdown
## REQ-AUTH-001: OAuth 2.0 Authentication
**Priority**: Must Have
**Business Goal**: Improve authentication security
**Description**: System shall support OAuth 2.0 authentication protocol
**Acceptance Criteria**:
- [ ] Support authorization code flow
- [ ] Validate JWT tokens
- [ ] Handle token refresh
**Suggested Issues**:
- Epic: User Authentication System
- Feature: OAuth 2.0 Integration
- Tasks: Implement OAuth flow, JWT validation, Token refresh
```

### Phase 2: Issue Generation (GitHub Issue Generator Mode)

**Mode**: [`github-issue-generator`](.bob/custom_modes.yaml#L652-L1079)
**Skills**: 
- [`github-issue-traceability-skill.md`](.bob/skills/github-issue-traceability-skill.md)

**Process**:
1. Read requirements from SDD output
2. Structure issues in hierarchy (Epic → Feature → Task → Test)
3. Include complete traceability metadata in each issue
4. Establish parent-child relationships
5. Apply appropriate labels for filtering
6. Create issues using Python scripts or MCP tools

**Issue Types**:

#### Epic
- **Title Format**: `[EPIC] Title (REQ-XXX)`
- **Purpose**: Group related features
- **Maps to**: 1-5 requirements
- **Example**: `[EPIC] User Authentication System (REQ-AUTH-001)`

#### Feature
- **Title Format**: `[FEATURE] Title (REQ-XXX-YYY) - Part of #EpicNumber`
- **Purpose**: Specific functionality
- **Maps to**: 1-3 requirements
- **Example**: `[FEATURE] OAuth 2.0 Integration (REQ-AUTH-002) - Part of #1`

#### Task
- **Title Format**: `[TASK] Title (REQ-XXX-YYY.Z) - Part of #FeatureNumber`
- **Purpose**: Implementation work
- **Maps to**: Specific requirement aspect
- **Example**: `[TASK] Implement JWT validation (REQ-AUTH-002.1) - Part of #2`

#### Test
- **Title Format**: `[TEST] Title (REQ-XXX-YYY) - Validates #FeatureNumber`
- **Purpose**: Requirement validation
- **Maps to**: Requirements being tested
- **Example**: `[TEST] OAuth integration tests (REQ-AUTH-002) - Validates #2`

**Traceability Metadata** (required in every issue):
```markdown
## Traceability
- **Requirement ID**: REQ-XXX-YYY
- **Source Document**: [Link to requirements specification]
- **Parent Issue**: #N (for features/tasks)
- **Child Issues**: #A, #B, #C (for epics/features)
- **Related Issues**: #X, #Y (dependencies, blockers)
- **Affected Files**: List of files to be modified
- **Test Coverage**: Link to test issues or test cases
```

### Phase 3: Implementation (Code Mode)

**Mode**: `code` or `advanced`

**Process**:
1. Create feature branch: `feature/REQ-XXX-description`
2. Implement code with requirement ID comments
3. Commit with issue references
4. Ensure traceability in code

**Code Comment Standards**:
```python
# REQ-AUTH-002.1: JWT token validation
class JWTValidator:
    """
    Validates JWT tokens for OAuth 2.0 authentication.
    
    Implements requirement REQ-AUTH-002.1
    Related Issue: #3
    """
    
    def validate_token(self, token: str) -> bool:
        # REQ-AUTH-002.1: Verify token signature
        if not self._verify_signature(token):
            return False
        
        # REQ-AUTH-002.1: Check token expiration
        if self._is_expired(token):
            return False
        
        return True
```

**Git Commit Message Format**:
```
[#IssueNumber] Brief description (REQ-XXX-YYY)

Detailed description of changes:
- Change 1
- Change 2
- Change 3

Implements: #IssueNumber
Requirement: REQ-XXX-YYY
```

**Example**:
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

### Phase 4: Testing (Code Mode)

**Process**:
1. Create test files with requirement references
2. Implement test scenarios from acceptance criteria
3. Link tests to requirements and issues
4. Ensure test coverage

**Test Comment Standards**:
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
```

### Phase 5: Validation (Architecture Review Mode)

**Mode**: [`arch-review`](.bob/custom_modes.yaml#L2-L106)

**Process**:
1. Verify traceability chain completeness
2. Validate requirement coverage
3. Check test coverage
4. Ensure documentation is updated
5. Confirm acceptance criteria are met

## Traceability Validation Checklist

Use this checklist before merging code:

- [ ] **Requirements**: Every requirement has a unique ID (REQ-XXX-YYY)
- [ ] **Issues**: Every requirement has at least one GitHub issue
- [ ] **Hierarchy**: Parent-child relationships are established
- [ ] **Metadata**: Every issue includes complete traceability metadata
- [ ] **Commits**: All commits reference issue numbers ([#N] format)
- [ ] **Code**: Implementation includes requirement ID comments
- [ ] **Tests**: Tests reference requirements they validate
- [ ] **Coverage**: All acceptance criteria have tests
- [ ] **Documentation**: Traceability is documented
- [ ] **Validation**: End-to-end traceability chain is complete

## Traceability Matrix Example

| Req ID | Business Goal | Epic | Feature | Task | Commit | Code File | Test | Status |
|--------|---------------|------|---------|------|--------|-----------|------|--------|
| REQ-AUTH-001 | Improve security | #1 | #2, #4 | #3, #6 | abc123 | auth/oauth.py | #5, #7 | ✅ |
| REQ-AUTH-002 | Modern auth | #1 | #2 | #3 | abc123 | auth/jwt.py | #5 | ✅ |
| REQ-AUTH-003 | Enhanced security | #1 | #4 | #6 | def456 | auth/mfa.py | #7 | 🔄 |

## Tools and Scripts

### Python Scripts for Issue Management

Located in [`.bob/scripts/`](.bob/scripts/):

1. **Issue Creation**: `create_github_issues.py`
   - Create issues from JSON/YAML templates
   - Built-in example templates
   - Dry-run mode for preview
   - Batch creation with rate limiting

2. **Issue Updates**: `update_issue_status.py`
   - Add comments to issues
   - Update issue status
   - Close multiple issues
   - Batch updates

3. **Issue Sync**: `sync_all_issues.py`
   - Sync all issues with repository state
   - Update status labels
   - Track dependencies and blockers

See [`.bob/scripts/README.md`](.bob/scripts/README.md) for detailed usage.

### Shell Wrappers

- `run_issue_creator.sh` - Issue creation wrapper
- `run_update_issues.sh` - Issue update wrapper
- `run_sync_all_issues.sh` - Issue sync wrapper

## Example Workflow

### Complete Example: OAuth 2.0 Feature

#### 1. Requirements (SDD Mode)

```markdown
## REQ-AUTH-002: OAuth 2.0 Authentication
**Priority**: Must Have
**Business Goal**: Support modern authentication methods
**Description**: System shall support OAuth 2.0 authentication with JWT tokens
**Acceptance Criteria**:
- [ ] Implement authorization code flow
- [ ] Validate JWT tokens (signature, expiration, claims)
- [ ] Support token refresh mechanism
- [ ] Handle authentication errors gracefully
```

#### 2. GitHub Issues (GitHub Issue Generator Mode)

**Epic #1**: `[EPIC] User Authentication System (REQ-AUTH-001)`
- **Feature #2**: `[FEATURE] OAuth 2.0 Integration (REQ-AUTH-002) - Part of #1`
  - **Task #3**: `[TASK] Implement JWT validation (REQ-AUTH-002.1) - Part of #2`
  - **Task #4**: `[TASK] Implement token refresh (REQ-AUTH-002.2) - Part of #2`
  - **Test #5**: `[TEST] OAuth integration tests (REQ-AUTH-002) - Validates #2`

#### 3. Implementation (Code Mode)

**Branch**: `feature/REQ-AUTH-002-oauth-integration`

**Commit 1**:
```
[#3] Implement JWT token validation (REQ-AUTH-002.1)

Added JWT token validation logic:
- Created JWTValidator class
- Signature verification
- Expiration checking
- Claim validation

Implements: #3
Requirement: REQ-AUTH-002.1
```

**Code** (`src/auth/jwt.py`):
```python
# REQ-AUTH-002.1: JWT token validation
class JWTValidator:
    """
    Validates JWT tokens for OAuth 2.0 authentication.
    
    Implements requirement REQ-AUTH-002.1
    Related Issue: #3
    """
    
    def validate_token(self, token: str) -> bool:
        # REQ-AUTH-002.1: Verify signature
        if not self._verify_signature(token):
            return False
        
        # REQ-AUTH-002.1: Check expiration
        if self._is_expired(token):
            return False
        
        # REQ-AUTH-002.1: Validate claims
        return self._validate_claims(token)
```

#### 4. Testing (Code Mode)

**Test** (`tests/test_jwt_validator.py`):
```python
# Tests REQ-AUTH-002.1: JWT token validation

class TestJWTValidator:
    """
    Test suite for JWT token validation.
    
    Validates requirement REQ-AUTH-002.1
    Related Issue: #5
    """
    
    def test_valid_token(self):
        """REQ-AUTH-002.1: Valid token passes validation"""
        validator = JWTValidator()
        token = create_valid_token()
        assert validator.validate_token(token) is True
    
    def test_expired_token(self):
        """REQ-AUTH-002.1: Expired token fails validation"""
        validator = JWTValidator()
        token = create_expired_token()
        assert validator.validate_token(token) is False
    
    def test_invalid_signature(self):
        """REQ-AUTH-002.1: Invalid signature fails validation"""
        validator = JWTValidator()
        token = create_token_with_invalid_signature()
        assert validator.validate_token(token) is False
```

#### 5. Traceability Verification

**Traceability Chain**:
```
Business Goal: "Support modern authentication methods"
    ↓
Requirement: REQ-AUTH-002 "OAuth 2.0 Authentication"
    ↓
Epic: #1 "User Authentication System"
    ↓
Feature: #2 "OAuth 2.0 Integration"
    ↓
Task: #3 "Implement JWT validation"
    ↓
Commit: abc123 "[#3] Implement JWT token validation"
    ↓
Code: src/auth/jwt.py (with REQ-AUTH-002.1 comments)
    ↓
Test: #5 "OAuth integration tests"
    ↓
Validation: All acceptance criteria met ✅
```

## Best Practices

### DO:
✅ Always assign unique requirement IDs
✅ Include complete traceability metadata in issues
✅ Reference issue numbers in commit messages
✅ Add requirement ID comments in code
✅ Link tests to requirements
✅ Maintain bidirectional traceability
✅ Validate traceability before merging
✅ Use consistent naming conventions
✅ Document the traceability approach
✅ Automate traceability validation in CI/CD

### DON'T:
❌ Create issues without requirement IDs
❌ Skip traceability metadata
❌ Commit without issue references
❌ Write code without requirement comments
❌ Create tests without requirement links
❌ Break the traceability chain
❌ Use inconsistent ID formats
❌ Ignore dependencies and blockers
❌ Skip traceability validation
❌ Forget to update documentation

## Troubleshooting

### Common Issues

**Issue**: Requirement ID not found in code
- **Solution**: Add `// REQ-XXX-YYY:` comments to implementation

**Issue**: Commit doesn't reference issue
- **Solution**: Use format `[#N] Description (REQ-XXX-YYY)`

**Issue**: Test doesn't link to requirement
- **Solution**: Add `# Tests REQ-XXX-YYY:` comment in test file

**Issue**: Broken parent-child relationships
- **Solution**: Update issue descriptions with correct `Parent Issue: #N`

**Issue**: Missing traceability metadata
- **Solution**: Edit issue to include complete traceability section

## Success Metrics

Track these metrics to ensure traceability effectiveness:

- **Requirement Coverage**: % of requirements with GitHub issues (Target: 100%)
- **Issue Traceability**: % of issues with complete metadata (Target: 100%)
- **Commit Traceability**: % of commits referencing issues (Target: 95%+)
- **Code Traceability**: % of code with requirement comments (Target: 90%+)
- **Test Coverage**: % of requirements with test validation (Target: 100%)
- **Chain Completeness**: % of complete traceability chains (Target: 100%)
- **Validation Success**: % of traceability audits passing (Target: 100%)

## Related Documentation

- [Custom Modes Configuration](.bob/custom_modes.yaml)
- [Requirements Management Skill](.bob/skills/requirements-management-skill.md)
- [Requirements Traceability Skill](.bob/skills/requirements-traceability-skill.md)
- [GitHub Issue Traceability Skill](.bob/skills/github-issue-traceability-skill.md)
- [GitHub Scripts README](.bob/scripts/README.md)

## Support

For questions or issues with the traceability framework:
1. Review this guide and related documentation
2. Check the skill files for detailed methodologies
3. Consult the mode configurations for workflow guidance
4. Use the Configuration Gap Detector mode for missing capabilities

---

**Document Version**: 1.0  
**Last Updated**: 2026-06-03  
**Maintained By**: Requirements Engineering Team