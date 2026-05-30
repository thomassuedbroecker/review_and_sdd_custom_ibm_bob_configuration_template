#!/usr/bin/env python3
"""
GitHub Issue Generator - Flexible Issue Creation from JSON/YAML Templates
Automatically creates GitHub Issues from structured data files or predefined templates.

Usage:
    # Using a JSON/YAML template file:
    python create_github_issues.py --repo owner/repo --template issues.json --token YOUR_TOKEN
    
    # Using predefined example template (Holiday Planner):
    python create_github_issues.py --repo owner/repo --use-example --token YOUR_TOKEN
    
Or set GITHUB_PERSONAL_ACCESS_TOKEN environment variable:
    export GITHUB_PERSONAL_ACCESS_TOKEN=your_token
    python create_github_issues.py --repo owner/repo --template issues.json
"""

import os
import sys
import json
import argparse
import time
from typing import Dict, List, Optional
import requests
from dataclasses import dataclass


@dataclass
class Issue:
    """Represents a GitHub Issue to be created"""
    number: int
    title: str
    body: str
    labels: List[str]
    milestone: Optional[str] = None
    assignees: Optional[List[str]] = None
    
    def __post_init__(self):
        if self.assignees is None:
            self.assignees = []


class GitHubIssueCreator:
    """Creates GitHub Issues using the GitHub API"""
    
    def __init__(self, repo: str, token: str, dry_run: bool = False):
        self.repo = repo
        self.token = token
        self.dry_run = dry_run
        self.base_url = f"https://api.github.com/repos/{repo}"
        self.headers = {
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json"
        }
        self.created_issues = {}  # Maps planned issue number to actual GitHub issue number
        
    def create_issue(self, issue: Issue) -> Optional[int]:
        """Create a single GitHub Issue"""
        
        if self.dry_run:
            print(f"[DRY RUN] Would create Issue #{issue.number}: {issue.title}")
            print(f"  Labels: {', '.join(issue.labels)}")
            return issue.number
        
        url = f"{self.base_url}/issues"
        data = {
            "title": issue.title,
            "body": issue.body,
            "labels": issue.labels
        }
        
        if issue.assignees:
            data["assignees"] = issue.assignees
            
        try:
            response = requests.post(url, headers=self.headers, json=data)
            response.raise_for_status()
            
            result = response.json()
            actual_number = result["number"]
            
            print(f"✅ Created Issue #{actual_number}: {issue.title}")
            self.created_issues[issue.number] = actual_number
            
            # Rate limiting - be nice to GitHub API
            time.sleep(1)
            
            return actual_number
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Failed to create Issue #{issue.number}: {issue.title}")
            print(f"   Error: {e}")
            return None
    
    def update_issue_references(self, issue_number: int, body: str) -> bool:
        """Update an issue's body to fix issue number references"""
        
        if self.dry_run:
            return True
            
        url = f"{self.base_url}/issues/{issue_number}"
        data = {"body": body}
        
        try:
            response = requests.patch(url, headers=self.headers, json=data)
            response.raise_for_status()
            return True
        except requests.exceptions.RequestException as e:
            print(f"⚠️  Failed to update references for Issue #{issue_number}: {e}")
            return False


def generate_epic_issues() -> List[Issue]:
    """Generate Epic Issues"""
    
    epics = [
        {
            "number": 1,
            "title": "[EPIC] Destination Management API",
            "requirements": ["FR-001", "FR-002", "FR-003", "FR-004"],
            "user_stories": ["US-001", "US-002", "US-003", "US-004"],
            "child_issues": list(range(10, 23)),
            "priority": "Must Have"
        },
        {
            "number": 2,
            "title": "[EPIC] Activity Management API",
            "requirements": ["FR-005", "FR-006", "FR-007"],
            "user_stories": ["US-005", "US-006", "US-007"],
            "child_issues": list(range(30, 39)),
            "priority": "Must Have"
        },
        {
            "number": 3,
            "title": "[EPIC] Travel Information API",
            "requirements": ["FR-008", "FR-009"],
            "user_stories": ["US-008", "US-009"],
            "child_issues": list(range(39, 46)),
            "priority": "Should Have"
        },
        {
            "number": 4,
            "title": "[EPIC] API Documentation & Discovery",
            "requirements": ["FR-010", "FR-011"],
            "user_stories": ["US-010", "US-011"],
            "child_issues": list(range(42, 47)),
            "priority": "Must Have"
        },
        {
            "number": 5,
            "title": "[EPIC] System Health & Monitoring",
            "requirements": ["FR-012", "FR-013", "FR-014"],
            "user_stories": ["US-012", "US-013", "US-014"],
            "child_issues": list(range(47, 56)),
            "priority": "Must Have"
        },
        {
            "number": 6,
            "title": "[EPIC] Performance & Scalability",
            "requirements": ["NFR-001", "NFR-002", "NFR-003", "NFR-004", "NFR-005", "NFR-006"],
            "user_stories": [],
            "child_issues": list(range(56, 66)),
            "priority": "Critical"
        },
        {
            "number": 7,
            "title": "[EPIC] Local Container Deployment",
            "requirements": ["DEP-001", "DEP-002", "DEP-003", "DEP-004"],
            "user_stories": [],
            "child_issues": list(range(80, 84)),
            "priority": "Must Have"
        },
        {
            "number": 8,
            "title": "[EPIC] IBM Cloud Code Engine Deployment",
            "requirements": ["DEP-005", "DEP-006", "DEP-007", "DEP-008", "DEP-009"],
            "user_stories": [],
            "child_issues": list(range(90, 95)),
            "priority": "Must Have"
        },
        {
            "number": 9,
            "title": "[EPIC] AI Integration Readiness",
            "requirements": ["AI-001", "AI-002", "AI-003", "AI-004", "AI-005", "AI-006", "AI-007"],
            "user_stories": [],
            "child_issues": list(range(100, 104)),
            "priority": "Must Have"
        }
    ]
    
    issues = []
    for epic in epics:
        body = f"""## Epic Overview
This epic covers the implementation of {epic['title'].replace('[EPIC] ', '')}.

## Goals
- Implement all related functional requirements
- Ensure complete test coverage
- Meet all acceptance criteria
- Maintain code quality standards

## Related Requirements
{chr(10).join(f'- {req}' for req in epic['requirements'])}

## User Stories
{chr(10).join(f'- {us}' for us in epic['user_stories']) if epic['user_stories'] else '- N/A (Technical Epic)'}

## Child Issues
{chr(10).join(f'- #{num}' for num in epic['child_issues'])}

## Priority
{epic['priority']}

## Success Criteria
- [ ] All child issues completed
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Code reviewed and approved

---
**Documentation**: See `repos/custom_code/requirements-specification.md` for detailed requirements.
"""
        
        labels = ["epic", "status:new"]
        if epic['priority'] == "Critical":
            labels.append("priority:critical")
        elif epic['priority'] == "Must Have":
            labels.append("priority:high")
        elif epic['priority'] == "Should Have":
            labels.append("priority:medium")
            
        issues.append(Issue(
            number=epic['number'],
            title=epic['title'],
            body=body,
            labels=labels
        ))
    
    return issues


def generate_feature_issues() -> List[Issue]:
    """Generate Feature Issues from Functional Requirements"""
    
    features = [
        {"number": 10, "title": "[FEATURE] List Destinations API Endpoint", "req": "FR-001", "us": "US-001", "epic": 1, "priority": "Must Have", "points": 3},
        {"number": 13, "title": "[FEATURE] Get Destination Details API Endpoint", "req": "FR-002", "us": "US-002", "epic": 1, "priority": "Must Have", "points": 2},
        {"number": 16, "title": "[FEATURE] Search Destinations API Endpoint", "req": "FR-003", "us": "US-003", "epic": 1, "priority": "Must Have", "points": 5},
        {"number": 19, "title": "[FEATURE] Filter Destinations API Endpoint", "req": "FR-004", "us": "US-004", "epic": 1, "priority": "Should Have", "points": 5},
        {"number": 22, "title": "[FEATURE] List Activities by Destination API Endpoint", "req": "FR-005", "us": "US-005", "epic": 2, "priority": "Must Have", "points": 3},
        {"number": 30, "title": "[FEATURE] Get Activity Details API Endpoint", "req": "FR-006", "us": "US-006", "epic": 2, "priority": "Should Have", "points": 2},
        {"number": 33, "title": "[FEATURE] Filter Activities API Endpoint", "req": "FR-007", "us": "US-007", "epic": 2, "priority": "Should Have", "points": 5},
        {"number": 36, "title": "[FEATURE] Get Travel Tips API Endpoint", "req": "FR-008", "us": "US-008", "epic": 3, "priority": "Should Have", "points": 3},
        {"number": 39, "title": "[FEATURE] Get Seasonal Information API Endpoint", "req": "FR-009", "us": "US-009", "epic": 3, "priority": "Could Have", "points": 3},
        {"number": 42, "title": "[FEATURE] OpenAPI Specification Generation", "req": "FR-010", "us": "US-010", "epic": 4, "priority": "Must Have", "points": 2},
        {"number": 45, "title": "[FEATURE] Interactive API Documentation", "req": "FR-011", "us": "US-011", "epic": 4, "priority": "Must Have", "points": 1},
        {"number": 47, "title": "[FEATURE] Health Check Endpoint", "req": "FR-012", "us": "US-012", "epic": 5, "priority": "Must Have", "points": 2},
        {"number": 50, "title": "[FEATURE] Readiness Probe Endpoint", "req": "FR-013", "us": "US-013", "epic": 5, "priority": "Must Have", "points": 2},
        {"number": 53, "title": "[FEATURE] Metrics Endpoint", "req": "FR-014", "us": "US-014", "epic": 5, "priority": "Could Have", "points": 3},
    ]
    
    issues = []
    for feature in features:
        body = f"""## Feature Description
Implement {feature['title'].replace('[FEATURE] ', '')}.

## Related Requirements
- **Requirement**: {feature['req']}
- **User Story**: {feature['us']}
- **Epic**: #{feature['epic']}

## Story Points
{feature['points']}

## Acceptance Criteria
See user story {feature['us']} in `repos/custom_code/user-stories.md` for detailed acceptance criteria.

## Technical Implementation
- Implement FastAPI endpoint
- Add Pydantic models for request/response validation
- Write unit tests (>80% coverage)
- Write integration tests
- Update OpenAPI specification
- Add endpoint documentation

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] OpenAPI spec updated
- [ ] Documentation updated
- [ ] No linter errors
- [ ] Merged to main branch

---
**Documentation**: See `repos/custom_code/requirements-specification.md` and `repos/custom_code/api-reference.md`
"""
        
        labels = ["feature", "status:new"]
        if feature['priority'] == "Must Have":
            labels.append("priority:high")
        elif feature['priority'] == "Should Have":
            labels.append("priority:medium")
        elif feature['priority'] == "Could Have":
            labels.append("priority:low")
            
        issues.append(Issue(
            number=feature['number'],
            title=feature['title'],
            body=body,
            labels=labels
        ))
    
    return issues


def generate_technical_issues() -> List[Issue]:
    """Generate Technical Issues"""
    
    technical = [
        {"number": 5, "title": "[TECH] Design and Implement Database Schema", "req": "AR-002", "epic": [1, 2], "priority": "Must Have", "effort": "5 days"},
        {"number": 6, "title": "[TECH] Set Up FastAPI Project Structure", "req": "AR-001", "epic": "All", "priority": "Must Have", "effort": "2 days"},
        {"number": 7, "title": "[TECH] Configure Pydantic Models and Validation", "req": "AR-003", "epic": "All", "priority": "Must Have", "effort": "3 days"},
        {"number": 8, "title": "[TECH] Set Up pytest Testing Framework", "req": "AR-004", "epic": "All", "priority": "Must Have", "effort": "1 day"},
        {"number": 56, "title": "[TECH] Implement API Response Time Optimization", "req": "NFR-001", "epic": 6, "priority": "Critical", "effort": "3 days"},
        {"number": 57, "title": "[TECH] Configure Async Request Handling", "req": "NFR-002", "epic": 6, "priority": "High", "effort": "2 days"},
        {"number": 58, "title": "[TECH] Optimize Application Startup Time", "req": "NFR-003", "epic": 6, "priority": "High", "effort": "2 days"},
        {"number": 59, "title": "[TECH] Implement Stateless Architecture", "req": "NFR-004, NFR-005", "epic": 6, "priority": "Critical", "effort": "3 days"},
        {"number": 60, "title": "[TECH] Configure Resource Limits and Monitoring", "req": "NFR-006", "epic": 6, "priority": "High", "effort": "2 days"},
        {"number": 61, "title": "[TECH] Implement Graceful Error Handling", "req": "NFR-008", "epic": "All", "priority": "Critical", "effort": "3 days"},
        {"number": 62, "title": "[TECH] Set Up Code Quality Tools (black, pylint, mypy)", "req": "NFR-010", "epic": "All", "priority": "High", "effort": "1 day"},
        {"number": 63, "title": "[TECH] Configure Input Validation and Security", "req": "NFR-017", "epic": "All", "priority": "Critical", "effort": "2 days"},
        {"number": 64, "title": "[TECH] Set Up Environment-Based Configuration", "req": "NFR-021", "epic": "All", "priority": "Critical", "effort": "2 days"},
        {"number": 80, "title": "[TECH] Create Dockerfile for Production", "req": "DEP-001", "epic": 7, "priority": "Must Have", "effort": "2 days"},
        {"number": 81, "title": "[TECH] Create docker-compose.yml for Development", "req": "DEP-002", "epic": 7, "priority": "Should Have", "effort": "1 day"},
        {"number": 82, "title": "[TECH] Optimize Container Image Size", "req": "DEP-003", "epic": 7, "priority": "Should Have", "effort": "1 day"},
        {"number": 90, "title": "[TECH] Configure IBM Cloud Code Engine Deployment", "req": "DEP-005", "epic": 8, "priority": "Must Have", "effort": "3 days"},
        {"number": 91, "title": "[TECH] Set Up Environment Variables for Code Engine", "req": "DEP-006", "epic": 8, "priority": "Must Have", "effort": "1 day"},
        {"number": 92, "title": "[TECH] Configure Auto-Scaling for Code Engine", "req": "DEP-008", "epic": 8, "priority": "Should Have", "effort": "2 days"},
        {"number": 100, "title": "[TECH] Ensure API-First Design Compliance", "req": "AI-001, AI-002, AI-003", "epic": 9, "priority": "Must Have", "effort": "2 days"},
        {"number": 101, "title": "[TECH] Validate OpenAPI Specification Completeness", "req": "AI-004, AI-005", "epic": 9, "priority": "Must Have", "effort": "1 day"},
        {"number": 102, "title": "[TECH] Design MCP-Compatible API Structure", "req": "AI-007", "epic": 9, "priority": "Should Have", "effort": "3 days"},
    ]
    
    issues = []
    for tech in technical:
        epic_ref = f"#{tech['epic']}" if isinstance(tech['epic'], int) else f"Multiple Epics"
        
        body = f"""## Technical Task Description
{tech['title'].replace('[TECH] ', '')}

## Related Requirements
- **Requirement**: {tech['req']}
- **Epic**: {epic_ref}

## Estimated Effort
{tech['effort']}

## Technical Details
See `repos/custom_code/requirements-specification.md` for detailed technical requirements.

## Implementation Checklist
- [ ] Research and design approach
- [ ] Implement solution
- [ ] Write tests
- [ ] Update documentation
- [ ] Code review
- [ ] Merge to main

## Definition of Done
- [ ] Implementation complete
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Code reviewed and approved
- [ ] No technical debt introduced

---
**Documentation**: See `repos/custom_code/requirements-specification.md`
"""
        
        labels = ["technical", "status:new"]
        if tech['priority'] == "Critical":
            labels.append("priority:critical")
        elif tech['priority'] in ["Must Have", "High"]:
            labels.append("priority:high")
        elif tech['priority'] == "Should Have":
            labels.append("priority:medium")
            
        issues.append(Issue(
            number=tech['number'],
            title=tech['title'],
            body=body,
            labels=labels
        ))
    
    return issues


def generate_test_issues() -> List[Issue]:
    """Generate Test Issues"""
    
    tests = [
        {"number": 11, "title": "[TEST] Unit Tests for Destination List Service", "feature": 10, "req": "FR-001", "type": "Unit"},
        {"number": 12, "title": "[TEST] Integration Tests for Destination List Endpoint", "feature": 10, "req": "FR-001", "type": "Integration"},
        {"number": 14, "title": "[TEST] Unit Tests for Get Destination Service", "feature": 13, "req": "FR-002", "type": "Unit"},
        {"number": 15, "title": "[TEST] Integration Tests for Get Destination Endpoint", "feature": 13, "req": "FR-002", "type": "Integration"},
        {"number": 17, "title": "[TEST] Unit Tests for Search Destinations Service", "feature": 16, "req": "FR-003", "type": "Unit"},
        {"number": 18, "title": "[TEST] Integration Tests for Search Destinations Endpoint", "feature": 16, "req": "FR-003", "type": "Integration"},
        {"number": 20, "title": "[TEST] Unit Tests for Filter Destinations Service", "feature": 19, "req": "FR-004", "type": "Unit"},
        {"number": 21, "title": "[TEST] Integration Tests for Filter Destinations Endpoint", "feature": 19, "req": "FR-004", "type": "Integration"},
        {"number": 23, "title": "[TEST] Unit Tests for List Activities Service", "feature": 22, "req": "FR-005", "type": "Unit"},
        {"number": 24, "title": "[TEST] Integration Tests for List Activities Endpoint", "feature": 22, "req": "FR-005", "type": "Integration"},
        {"number": 65, "title": "[TEST] Load Tests for API Performance", "feature": "All", "req": "NFR-001, NFR-002", "type": "Load"},
        {"number": 66, "title": "[TEST] Container Build and Runtime Tests", "feature": 80, "req": "DEP-001", "type": "Integration"},
        {"number": 67, "title": "[TEST] Code Engine Deployment Tests", "feature": 90, "req": "DEP-005", "type": "Integration"},
        {"number": 68, "title": "[TEST] OpenAPI Specification Validation Tests", "feature": 42, "req": "AI-004", "type": "Contract"},
    ]
    
    issues = []
    for test in tests:
        feature_ref = f"#{test['feature']}" if isinstance(test['feature'], int) else "Multiple Features"
        
        body = f"""## Test Description
{test['title'].replace('[TEST] ', '')}

## Related Items
- **Related Feature**: {feature_ref}
- **Requirement**: {test['req']}
- **Test Type**: {test['type']}

## Test Objectives
- Verify functional correctness
- Ensure error handling works properly
- Validate edge cases
- Meet coverage requirements (>80%)

## Test Implementation
- [ ] Write test cases
- [ ] Implement tests using pytest
- [ ] Ensure tests are isolated and repeatable
- [ ] Add to CI/CD pipeline
- [ ] Document test scenarios

## Acceptance Criteria
- [ ] All test cases pass
- [ ] Code coverage >80%
- [ ] Tests run in CI/CD
- [ ] Test documentation complete

---
**Documentation**: See `repos/custom_code/requirements-specification.md`
"""
        
        labels = ["test", "status:new", "priority:high"]
        if test['type'] == "Unit":
            labels.append("test:unit")
        elif test['type'] == "Integration":
            labels.append("test:integration")
        elif test['type'] == "Load":
            labels.append("test:load")
        elif test['type'] == "Contract":
            labels.append("test:contract")
            
        issues.append(Issue(
            number=test['number'],
            title=test['title'],
            body=body,
            labels=labels
        ))
    
    return issues


def load_issues_from_file(filepath: str) -> List[Issue]:
    """Load issues from a JSON or YAML file"""
    import json
    
    try:
        with open(filepath, 'r') as f:
            if filepath.endswith('.json'):
                data = json.load(f)
            elif filepath.endswith(('.yaml', '.yml')):
                try:
                    import yaml
                    data = yaml.safe_load(f)
                except ImportError:
                    print("❌ Error: PyYAML not installed. Install with: pip install pyyaml")
                    sys.exit(1)
            else:
                print(f"❌ Error: Unsupported file format. Use .json, .yaml, or .yml")
                sys.exit(1)
        
        issues = []
        for item in data.get('issues', []):
            issues.append(Issue(
                number=item.get('number', len(issues) + 1),
                title=item['title'],
                body=item.get('body', ''),
                labels=item.get('labels', []),
                milestone=item.get('milestone'),
                assignees=item.get('assignees', [])
            ))
        
        return issues
    
    except FileNotFoundError:
        print(f"❌ Error: File not found: {filepath}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error loading file: {e}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="Create GitHub Issues from templates or structured data files",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Create issues from a JSON template:
  python create_github_issues.py --repo owner/repo --template issues.json
  
  # Use the built-in Holiday Planner example:
  python create_github_issues.py --repo owner/repo --use-example
  
  # Dry run to preview issues:
  python create_github_issues.py --repo owner/repo --template issues.json --dry-run
  
  # Export example template to customize:
  python create_github_issues.py --export-example issues-template.json
        """
    )
    parser.add_argument("--repo", help="GitHub repository (owner/repo)")
    parser.add_argument("--token", help="GitHub Personal Access Token (or set GITHUB_PERSONAL_ACCESS_TOKEN env var)")
    parser.add_argument("--template", help="Path to JSON/YAML file containing issue definitions")
    parser.add_argument("--use-example", action="store_true", help="Use built-in Holiday Planner example template")
    parser.add_argument("--export-example", help="Export example template to specified file and exit")
    parser.add_argument("--dry-run", action="store_true", help="Print issues without creating them")
    parser.add_argument("--batch-size", type=int, default=10, help="Number of issues to create before pausing")
    
    args = parser.parse_args()
    
    # Handle export-example mode
    if args.export_example:
        export_example_template(args.export_example)
        return
    
    # Validate required arguments
    if not args.repo:
        print("❌ Error: --repo is required (unless using --export-example)")
        parser.print_help()
        sys.exit(1)
    
    if not args.template and not args.use_example:
        print("❌ Error: Either --template or --use-example is required")
        parser.print_help()
        sys.exit(1)
    
    # Get token from args or environment
    token = args.token or os.getenv("GITHUB_PERSONAL_ACCESS_TOKEN")
    if not token and not args.dry_run:
        print("❌ Error: GitHub token required. Use --token or set GITHUB_PERSONAL_ACCESS_TOKEN")
        sys.exit(1)
    
    print(f"🚀 GitHub Issue Creator")
    print(f"📦 Repository: {args.repo}")
    print(f"{'🔍 DRY RUN MODE' if args.dry_run else '✅ LIVE MODE'}")
    print()
    
    creator = GitHubIssueCreator(args.repo, token or "dummy-token", args.dry_run)
    
    # Generate or load issues
    print("📋 Loading issue definitions...")
    if args.use_example:
        print("   Using built-in Holiday Planner example template")
        all_issues = []
        all_issues.extend(generate_epic_issues())
        all_issues.extend(generate_technical_issues())
        all_issues.extend(generate_feature_issues())
        all_issues.extend(generate_test_issues())
    else:
        print(f"   Loading from file: {args.template}")
        all_issues = load_issues_from_file(args.template)
    
    # Sort by issue number to create in order
    all_issues.sort(key=lambda x: x.number)
    
    print(f"📊 Total issues to create: {len(all_issues)}")
    print()
    
    # Create issues in batches
    created_count = 0
    failed_count = 0
    
    for i, issue in enumerate(all_issues, 1):
        print(f"[{i}/{len(all_issues)}] Creating issue #{issue.number}...")
        
        result = creator.create_issue(issue)
        if result:
            created_count += 1
        else:
            failed_count += 1
        
        # Pause after each batch to avoid rate limiting
        if i % args.batch_size == 0 and i < len(all_issues):
            print(f"\n⏸️  Pausing after {i} issues (rate limiting)...")
            if not args.dry_run:
                time.sleep(5)
            print()
    
    print()
    print("=" * 60)
    print(f"✅ Successfully created: {created_count} issues")
    if failed_count > 0:
        print(f"❌ Failed to create: {failed_count} issues")
    print("=" * 60)
    print()
    print("📚 Next Steps:")
    print("1. Review created issues in GitHub")
    print("2. Assign issues to team members")
    print("3. Set up milestones and project boards")
    print("4. Begin implementation")
    print()
    
    if args.use_example:
        print("💡 Tip: Export the example template to customize it:")
        print(f"   python {sys.argv[0]} --export-example my-issues.json")


def export_example_template(filepath: str):
    """Export example template to a file"""
    import json
    
    # Generate example issues
    all_issues = []
    all_issues.extend(generate_epic_issues())
    all_issues.extend(generate_technical_issues())
    all_issues.extend(generate_feature_issues())
    all_issues.extend(generate_test_issues())
    
    # Convert to dict format
    issues_data = {
        "issues": [
            {
                "number": issue.number,
                "title": issue.title,
                "body": issue.body,
                "labels": issue.labels,
                "milestone": issue.milestone,
                "assignees": issue.assignees
            }
            for issue in all_issues
        ]
    }
    
    try:
        with open(filepath, 'w') as f:
            json.dump(issues_data, f, indent=2)
        print(f"✅ Example template exported to: {filepath}")
        print(f"📝 Edit this file to customize your issues, then run:")
        print(f"   python {sys.argv[0]} --repo owner/repo --template {filepath}")
    except Exception as e:
        print(f"❌ Error exporting template: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

# Made with Bob
