# GitHub Issue Management Scripts

This directory contains flexible scripts for comprehensive GitHub issue management: creating, updating, and syncing issues.

## Overview

Three main capabilities:
1. **Issue Creation**: Batch create issues from JSON/YAML templates
2. **Issue Updates**: Add comments and update issue status
3. **Issue Sync**: Sync all issues with repository state

## Files

### Issue Creation
- `create_github_issues.py` - Create issues from templates or built-in examples
- `run_issue_creator.sh` - Shell wrapper for issue creation

### Issue Updates
- `update_issue_status.py` - Update individual or multiple issues
- `run_update_issues.sh` - Shell wrapper for issue updates

### Issue Sync
- `sync_all_issues.py` - Sync all issues with repository state
- `run_sync_all_issues.sh` - Shell wrapper for issue sync

### Documentation
- `README.md` - This file
- `check_markdown_links.py` - Validate local Markdown links and heading anchors

## Prerequisites

- Python 3.6+
- `requests` library: `pip install requests`
- (Optional) `pyyaml` library for YAML support: `pip install pyyaml`
- GitHub Personal Access Token with `public_repo` scope for public
  repositories or `repo` scope when private repository access is required

## Setup

1. Create a `.env` file in the project root with your GitHub token:
   ```bash
   GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here
   ```

2. Install Python dependencies:
   ```bash
   pip install requests pyyaml
   ```

## Usage

Run the commands in this section from the repository root. Relative template,
update, sync, and export paths are resolved from your current working directory.

### 1. Issue Creation

#### Export Example Template

```bash
.bob/scripts/run_issue_creator.sh --export-example my-issues.json
```

#### Create Issues from Template

```bash
# Using shell wrapper (recommended)
.bob/scripts/run_issue_creator.sh --repo owner/repo --template my-issues.json

# Direct Python execution
python3 .bob/scripts/create_github_issues.py --repo owner/repo --template my-issues.json --token YOUR_TOKEN
```

#### Use Built-in Example

```bash
.bob/scripts/run_issue_creator.sh --repo owner/repo --use-example
```

#### Dry Run (Preview Without Creating)

```bash
.bob/scripts/run_issue_creator.sh --repo owner/repo --template my-issues.json --dry-run
```

#### Batch Size Control

```bash
.bob/scripts/run_issue_creator.sh --repo owner/repo --template my-issues.json --batch-size 5
```

### 2. Issue Updates

#### Update from JSON File

```bash
.bob/scripts/run_update_issues.sh --repo owner/repo --updates updates.json
```

#### Update Single Issue

```bash
.bob/scripts/run_update_issues.sh --repo owner/repo --issue 123 --comment "Work completed"
```

#### Close Multiple Issues

```bash
.bob/scripts/run_update_issues.sh --repo owner/repo --close 123,124,125
```

#### Add Comment and Close

```bash
.bob/scripts/run_update_issues.sh --repo owner/repo --issue 123 --comment "Done" --close-issue
```

### 3. Issue Sync

#### Export Example Sync Configuration

```bash
.bob/scripts/run_sync_all_issues.sh --export-example sync-config.json
```

#### Sync from Configuration File

```bash
.bob/scripts/run_sync_all_issues.sh --repo owner/repo --sync sync-config.json
```

#### Use Built-in Example

```bash
.bob/scripts/run_sync_all_issues.sh --repo owner/repo --use-example
```

## Configuration Formats

### Issue Creation Template (JSON)

```json
{
  "issues": [
    {
      "number": 1,
      "title": "[FEATURE] Implement user authentication",
      "body": "## Context\n...\n\n## Acceptance Criteria\n- [ ] ...",
      "labels": ["feature", "priority:high", "backend"],
      "milestone": null,
      "assignees": []
    }
  ]
}
```

**Fields:**
- `number` (int): Issue number for ordering
- `title` (string, required): Issue title
- `body` (string): Issue description in Markdown
- `labels` (array): List of label names
- `milestone` (string, optional): Milestone name
- `assignees` (array, optional): GitHub usernames

### Issue Update Configuration (JSON)

```json
{
  "updates": [
    {
      "issue": 123,
      "comment": "Work completed in commit abc123",
      "close": false
    },
    {
      "issue": 124,
      "comment": "Closing as duplicate",
      "close": true
    }
  ]
}
```

**Fields:**
- `issue` (int, required): Issue number
- `comment` (string, required): Comment text
- `close` (boolean): Whether to close the issue

### Issue Sync Configuration (JSON)

```json
{
  "commit_url": "https://github.com/owner/repo/commit/abc123",
  "statuses": {
    "completed": [
      {
        "number": 1,
        "title": "Feature X",
        "files": ["src/main.py", "src/config.py"]
      }
    ],
    "ready": [
      {
        "number": 2,
        "title": "Feature Y",
        "resources": ["docs/spec.md"]
      }
    ],
    "blocked": [
      {
        "number": 3,
        "title": "Feature Z",
        "blocked_by": [1, 2]
      }
    ],
    "pending": [
      {
        "number": 4,
        "title": "Feature W"
      }
    ]
  }
}
```

**Fields:**
- `commit_url` (string, optional): URL to commit for completed issues
- `statuses` (object): Issues organized by status
  - `completed`: Issues that are done
  - `ready`: Issues ready to start
  - `blocked`: Issues waiting on dependencies
  - `pending`: Issues not yet scheduled

## Integration with GitHub Issue Generator Mode

The GitHub Issue Generator mode can use all these scripts for comprehensive issue management:

### Workflow 1: Create Issues

```
1. Export template:
   execute_command(".bob/scripts/run_issue_creator.sh --export-example issues.json")

2. Customize template with project's issues

3. Dry run:
   execute_command(".bob/scripts/run_issue_creator.sh --repo owner/repo --template issues.json --dry-run")

4. Create issues:
   execute_command(".bob/scripts/run_issue_creator.sh --repo owner/repo --template issues.json")
```

### Workflow 2: Update Issues

```
1. Create update configuration with issue numbers and comments

2. Update issues:
   execute_command(".bob/scripts/run_update_issues.sh --repo owner/repo --updates updates.json")
```

### Workflow 3: Sync Repository State

```
1. Export sync template:
   execute_command(".bob/scripts/run_sync_all_issues.sh --export-example sync-config.json")

2. Customize with current repository state

3. Sync all issues:
   execute_command(".bob/scripts/run_sync_all_issues.sh --repo owner/repo --sync sync-config.json")
```

## Best Practices

1. **Always dry-run first** to preview issues before creating them
2. **Use meaningful issue numbers** for ordering and cross-references
3. **Include detailed descriptions** with context and acceptance criteria
4. **Apply appropriate labels** for filtering and organization
5. **Check for duplicates** before running the script
6. **Use batch-size** to avoid rate limiting on large issue sets

## Documentation Link Check

Run the dependency-free checker from the repository root after editing
documentation:

```bash
python3 .bob/scripts/check_markdown_links.py
```

The checker validates local Markdown link targets and heading anchors. It skips
external URLs because they require network access and may change independently.

## Troubleshooting

### Authentication Errors

- Verify `GITHUB_PERSONAL_ACCESS_TOKEN` in `.env` file
- Check that the token has `public_repo` scope for public repositories or
  `repo` scope when private repository access is required
- Ensure token hasn't expired

### Rate Limiting

- Reduce `--batch-size` value
- Add delays between batches
- Use authenticated requests (token configured)

### Template Errors

- Validate JSON/YAML syntax
- Ensure all required fields are present
- Check for special characters in strings

## Complete Examples

### Example 1: Create Project Issues

**issues.json:**
```json
{
  "issues": [
    {
      "number": 1,
      "title": "[EPIC] User Authentication System",
      "body": "## Overview\nImplement complete authentication\n\n## Child Issues\n- #2\n- #3",
      "labels": ["epic", "priority:critical"]
    },
    {
      "number": 2,
      "title": "Implement login endpoint",
      "body": "## Context\nPart of #1\n\n## Acceptance Criteria\n- [ ] POST /api/login\n- [ ] JWT tokens",
      "labels": ["feature", "backend", "priority:high"]
    },
    {
      "number": 3,
      "title": "Add authentication tests",
      "body": "## Context\nTest suite for #2\n\n## Acceptance Criteria\n- [ ] Unit tests\n- [ ] Integration tests",
      "labels": ["test", "priority:high"]
    }
  ]
}
```

**Command:**
```bash
.bob/scripts/run_issue_creator.sh --repo myorg/myproject --template issues.json
```

### Example 2: Update Issue Status

**updates.json:**
```json
{
  "updates": [
    {
      "issue": 2,
      "comment": "✅ Login endpoint implemented in commit abc123\n\n**Changes:**\n- Added POST /api/login\n- JWT token generation\n- Input validation",
      "close": false
    },
    {
      "issue": 3,
      "comment": "✅ All tests passing\n\n**Coverage:** 95%\n\nClosing as complete.",
      "close": true
    }
  ]
}
```

**Command:**
```bash
.bob/scripts/run_update_issues.sh --repo myorg/myproject --updates updates.json
```

### Example 3: Sync Repository State

**sync-config.json:**
```json
{
  "commit_url": "https://github.com/myorg/myproject/commit/abc123",
  "statuses": {
    "completed": [
      {
        "number": 2,
        "title": "Implement login endpoint",
        "files": ["src/auth/login.py", "src/auth/jwt.py"]
      },
      {
        "number": 3,
        "title": "Add authentication tests",
        "files": ["tests/test_auth.py"]
      }
    ],
    "ready": [
      {
        "number": 4,
        "title": "Implement password reset",
        "resources": ["docs/auth-spec.md", "docs/api-reference.md"]
      }
    ],
    "blocked": [
      {
        "number": 5,
        "title": "Add OAuth integration",
        "blocked_by": [2, 4]
      }
    ],
    "pending": [
      {
        "number": 6,
        "title": "Implement 2FA"
      }
    ]
  }
}
```

**Command:**
```bash
.bob/scripts/run_sync_all_issues.sh --repo myorg/myproject --sync sync-config.json
```

## Made with Bob
