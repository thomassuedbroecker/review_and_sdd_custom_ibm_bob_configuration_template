# 📋 GitHub Issue Generator Mode

## Overview

The **GitHub Issue Generator** mode transforms todo lists and task breakdowns from any Bob mode into well-structured GitHub issues. It provides two powerful approaches:

1. **GitHub MCP Server**: Interactive, real-time issue creation via Model Context Protocol
2. **Python Scripts**: Flexible batch operations for creating, updating, and syncing issues

Both approaches integrate seamlessly to provide comprehensive GitHub issue management.

## Purpose

This mode bridges the gap between planning/review activities and issue tracking by:
- Converting todo lists into actionable GitHub issues
- Maintaining context and technical details from source tasks
- Organizing issues with proper labels, priorities, and relationships
- Avoiding duplicate issues through intelligent checking
- Creating structured issue backlogs ready for team collaboration

## Prerequisites

### For GitHub MCP Server (Method 1)

1. **GitHub MCP Server Configured**
   - See [GITHUB_MCP_SETUP.md](./GITHUB_MCP_SETUP.md) for setup instructions
   - GitHub MCP server must be configured in `.bob/settings.json`

2. **GitHub Personal Access Token**
   - Create a token with `repo` scope
   - Add to `.env` file as `GITHUB_PERSONAL_ACCESS_TOKEN`
   - Token must have write access to the target repository

3. **Repository Context**
   - Must be working within a Git repository
   - Repository must be accessible with your GitHub token

### For Python Scripts (Method 2)

1. **Python Environment**
   - Python 3.6 or higher
   - `requests` library: `pip install requests`
   - (Optional) `pyyaml` library: `pip install pyyaml`

2. **GitHub Personal Access Token**
   - Same as MCP method above
   - Add to `.env` file as `GITHUB_PERSONAL_ACCESS_TOKEN`

3. **Scripts Available**
   - Located in `.bob/scripts/` directory
   - All scripts have executable permissions
   - Complete documentation in `.bob/scripts/README.md`

## When to Use

### Use GitHub MCP Server When:
- Creating 1-20 issues interactively
- Need real-time feedback and validation
- Working with simple, straightforward issue structures
- Want immediate issue creation without configuration files

### Use Python Scripts When:
- Creating 20+ issues in batch
- Need complex issue templates with custom fields
- Want to update or sync existing issues
- Require programmatic control over issue management
- Need to track repository state across many issues
- Want to export/import issue configurations

### Common Use Cases:
- ✅ Convert todo lists from any Bob mode into GitHub issues
- ✅ Create issues from Architecture Review findings
- ✅ Generate issues from Spec-Driven Development requirements
- ✅ Transform code review findings into trackable issues
- ✅ Batch create issues for project plans
- ✅ Update issue status based on repository state
- ✅ Sync all issues with current implementation progress
- ✅ Migrate tasks from other modes into GitHub issue tracking

## Key Features

### Method 1: GitHub MCP Server

#### 1. Intelligent Todo List Analysis
- Reads todo lists from current task context
- Understands task priorities and dependencies
- Groups related tasks logically
- Extracts technical details and acceptance criteria

### 2. Smart Issue Creation
- Generates clear, action-oriented issue titles
- Creates detailed descriptions with context
- Includes acceptance criteria for each issue
- Adds technical implementation notes
- Applies appropriate labels automatically

### 3. Duplicate Prevention
- Searches existing issues before creating new ones
- Avoids creating duplicate issues
- References existing issues when appropriate
- Updates existing issues if they cover the same scope

### 4. Issue Organization
- Applies type labels (bug, enhancement, feature, documentation)
- Sets priority labels (critical, high, medium, low)
- Adds area labels (frontend, backend, infrastructure, security)
- Establishes issue relationships and dependencies
- Groups issues by milestone or epic when appropriate

### 5. Batch Operations
- Efficiently creates multiple issues at once
- Provides progress updates for large batches
- Handles failures gracefully
- Reports success/failure for each issue

## Usage Examples

### Example 1: Convert Current Todo List

```
User: "Convert my current todo list into GitHub issues"

Bob will:
1. Read the active todo list from the current task
2. Analyze each task for context and requirements
3. Check for existing similar issues
4. Create GitHub issues with proper structure
5. Apply appropriate labels and priorities
6. Provide a summary with issue links
```

### Example 2: Architecture Review Findings

```
User: "Create GitHub issues from the security review findings"

Bob will:
1. Read the security review findings
2. Group findings by severity and type
3. Create issues for each finding with:
   - Clear title describing the security concern
   - Detailed description with threat analysis
   - Remediation steps as acceptance criteria
   - Security and priority labels
4. Link related security issues
5. Provide summary with issue numbers
```

### Example 3: SDD Requirements

```
User: "Generate GitHub issues for all functional requirements in the spec"

Bob will:
1. Read the SDD specification
2. Extract functional requirements
3. Create issues for each requirement with:
   - Requirement ID in title
   - Full requirement description
   - Acceptance criteria from spec
   - Traceability information
4. Apply feature and priority labels
5. Establish requirement dependencies
```

## Issue Structure

Each generated issue follows this template:

```markdown
## Context
[Brief explanation of why this task is needed]

## Task Description
[Detailed description of what needs to be done]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Details
[Any relevant technical information, file paths, or implementation notes]

## Dependencies
[List any blocking issues or prerequisites]

## Related Issues
[Links to related issues if applicable]
```

## Label Categories

### Type Labels
- `bug` - Something isn't working
- `enhancement` - Improve existing functionality
- `feature` - New functionality
- `documentation` - Documentation improvements
- `refactor` - Code restructuring
- `test` - Testing improvements

### Priority Labels
- `critical` - Must be fixed immediately
- `high` - Important, should be addressed soon
- `medium` - Normal priority
- `low` - Nice to have

### Area Labels
- `frontend` - Frontend/UI related
- `backend` - Backend/API related
- `infrastructure` - DevOps/Infrastructure
- `security` - Security related
- `performance` - Performance optimization

## Workflow Integration

### From Plan Mode
1. Create detailed plan in Plan mode
2. Switch to GitHub Issue Generator mode
3. Convert plan tasks to issues
4. Switch to Code mode to implement

### From Architecture Review Mode
1. Conduct architecture review
2. Generate findings and recommendations
3. Switch to GitHub Issue Generator mode
4. Create issues for each finding
5. Prioritize and assign issues

### From SDD Mode
1. Define requirements and specifications
2. Create acceptance criteria
3. Switch to GitHub Issue Generator mode
4. Generate issues for each requirement
5. Establish traceability

## Best Practices

### 1. Clear Task Descriptions
- Ensure todo items have sufficient context
- Include technical details in task descriptions
- Specify acceptance criteria when possible

### 2. Logical Grouping
- Group related tasks before conversion
- Use consistent naming conventions
- Establish clear dependencies

### 3. Priority Setting
- Mark critical tasks clearly
- Use priority indicators in todo lists
- Consider dependencies when prioritizing

### 4. Avoid Duplication
- Review existing issues before batch creation
- Use consistent terminology
- Reference existing issues when appropriate

### 5. Maintain Context
- Include links to specifications or documentation
- Reference architecture decisions
- Note any assumptions or constraints

## Troubleshooting

### GitHub MCP Not Configured

**Error**: "GitHub MCP server not available"

**Solution**:
1. Check `.bob/settings.json` for GitHub MCP configuration
2. Verify `GITHUB_PERSONAL_ACCESS_TOKEN` in `.env` file
3. Restart VS Code to load environment variables
4. See [GITHUB_MCP_SETUP.md](./GITHUB_MCP_SETUP.md) for detailed setup

### Authentication Failed

**Error**: "GitHub authentication failed"

**Solution**:
1. Verify token in `.env` file is correct
2. Check token hasn't expired
3. Ensure token has `repo` scope
4. Regenerate token if necessary

### Permission Denied

**Error**: "Permission denied to create issues"

**Solution**:
1. Verify token has write access to repository
2. Check if repository requires SSO authorization
3. Ensure you're a collaborator on the repository
4. For organization repos, verify organization permissions

### Rate Limit Exceeded

**Error**: "GitHub API rate limit exceeded"

**Solution**:
1. Wait for rate limit to reset (usually 1 hour)
2. Reduce batch size for issue creation
3. Use authenticated requests (token should be configured)
4. Consider GitHub Enterprise for higher limits

## Advanced Usage

### Custom Labels

You can request custom labels when creating issues:

```
User: "Create issues with custom labels: sprint-1, team-alpha"
```

### Milestone Assignment

Assign issues to milestones:

```
User: "Create issues and assign to milestone 'v2.0'"
```

### Assignee Setting

Assign issues to team members:

```
User: "Create issues and assign to @username"
```

### Issue Templates

Use custom issue templates:

```
User: "Create issues using the bug report template"
```

## Integration with Other Modes

### Orchestrator Mode
The Orchestrator can automatically switch to GitHub Issue Generator mode when issue creation is needed:

```
User: "Plan the feature and create GitHub issues"

Orchestrator will:
1. Switch to Plan mode to create detailed plan
2. Switch to GitHub Issue Generator to create issues
3. Provide summary of created issues
```

### Configuration Gap Detector
If GitHub Issue Generator encounters limitations, it can switch to Configuration Gap Detector to propose enhancements:

```
Example: "Need to create issues in multiple repositories"
→ Switches to config-gap-detector to propose multi-repo support
```

## Output Format

After creating issues, the mode provides:

```markdown
## GitHub Issues Created

### Summary
Created 5 issues in repository owner/repo

### Issues

1. **#123** - Implement user authentication
   - Priority: High
   - Labels: feature, backend, security
   - Link: https://github.com/owner/repo/issues/123

2. **#124** - Add input validation
   - Priority: Medium
   - Labels: enhancement, security
   - Link: https://github.com/owner/repo/issues/124

[... additional issues ...]

### Next Steps
- Review and prioritize issues in GitHub
- Assign issues to team members
- Add issues to project board
- Begin implementation
```

## Configuration

The mode is configured in `.bob/custom_modes.yaml`:

```yaml
- slug: github-issue-generator
  name: 📋 GitHub Issue Generator
  description: Convert todo lists into GitHub issues
  groups:
    - read
    - edit
    - command
    - mcp
```

## Related Documentation

- [GitHub MCP Setup Guide](./GITHUB_MCP_SETUP.md)
- [Architecture Review Mode](./README-ARCHITECTURE-REVIEW.md)
- [Spec-Driven Development Mode](./SDD-README.md)
- [Main README](../../README.md)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review GitHub MCP server documentation
3. Verify GitHub token permissions
4. Consult VS Code Output panel for error messages

## Version History

- **v1.0.0** (2026-05-30) - Initial release
  - Todo list to GitHub issues conversion
  - GitHub MCP integration
  - Duplicate detection
  - Label and priority management
  - Batch issue creation
