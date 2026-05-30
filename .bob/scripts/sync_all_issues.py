#!/usr/bin/env python3
"""
Sync All GitHub Issues with Repository State - Flexible Issue Sync Tool
Updates all issues to reflect current implementation status from JSON/YAML configuration.

Usage:
    # Sync from JSON file:
    python sync_all_issues.py --repo owner/repo --sync sync-config.json
    
    # Use built-in example:
    python sync_all_issues.py --repo owner/repo --use-example
    
    # Export example configuration:
    python sync_all_issues.py --export-example sync-config.json
"""

import os
import sys
import json
import argparse
import requests
from typing import List, Dict, Optional


def create_status_comment(repo: str, status: str, issue: Dict, token: str, commit_url: Optional[str] = None) -> bool:
    """Create a status update comment on an issue"""
    
    url = f"https://api.github.com/repos/{repo}/issues/{issue['number']}/comments"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    if status == "completed":
        commit_ref = f"[{commit_url.split('/')[-1]}]({commit_url})" if commit_url else "recent commit"
        files_list = "\n".join([f"- {f}" for f in issue.get('files', [])])
        
        comment = f"""✅ **Implementation Complete**

This issue has been implemented in {commit_ref}.

**Status:** Complete
{f"**Files Created:**\n{files_list}\n" if issue.get('files') else ""}
**Next Steps:**
- Review implementation
- Close issue if approved
"""
    
    elif status == "ready":
        resources = issue.get('resources', [])
        resources_list = "\n".join([f"- {r}" for r in resources]) if resources else "- Check project documentation"
        
        comment = f"""🟢 **Ready for Implementation**

**Status:** Ready to start
**Dependencies:** All dependencies met

**Available Resources:**
{resources_list}

**Next Steps:**
- Assign to developer
- Create feature branch
- Begin implementation
"""
    
    elif status == "blocked":
        blocked_by = issue.get("blocked_by", [])
        blocked_list = ", ".join([f"#{num}" for num in blocked_by])
        comment = f"""🔴 **Blocked - Waiting on Dependencies**

**Status:** Blocked  
**Blocked By:** {blocked_list}

This issue cannot start until the blocking issues are completed.

**Next Steps:**
- Monitor blocking issues
- Will automatically become ready when dependencies are met
"""
    
    else:  # pending
        comment = f"""⏳ **Pending - Awaiting Prerequisites**

**Status:** Pending
**Priority:** Will be scheduled in upcoming sprints

**Next Steps:**
- Will be prioritized after current sprint
- Check project board for scheduling
"""
    
    data = {"body": comment}
    
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to update Issue #{issue['number']}: {e}")
        return False


def add_labels(repo: str, issue_number: int, labels: List[str], token: str) -> bool:
    """Add labels to an issue"""
    
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/labels"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    data = {"labels": labels}
    
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return True
    except requests.exceptions.RequestException:
        return False


def load_sync_config(filepath: str) -> Dict:
    """Load sync configuration from JSON or YAML file"""
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
        
        return data
    
    except FileNotFoundError:
        print(f"❌ Error: File not found: {filepath}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error loading file: {e}")
        sys.exit(1)


def get_example_config() -> Dict:
    """Return example sync configuration"""
    return {
        "commit_url": "https://github.com/owner/repo/commit/abc123",
        "statuses": {
            "completed": [
                {"number": 1, "title": "Example completed issue", "files": ["src/main.py", "src/config.py"]}
            ],
            "ready": [
                {"number": 2, "title": "Example ready issue", "resources": ["docs/spec.md", "docs/api.md"]}
            ],
            "blocked": [
                {"number": 3, "title": "Example blocked issue", "blocked_by": [1, 2]}
            ],
            "pending": [
                {"number": 4, "title": "Example pending issue"}
            ]
        }
    }


def main():
    parser = argparse.ArgumentParser(
        description="Sync GitHub issues with repository state",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Sync from JSON file:
  python sync_all_issues.py --repo owner/repo --sync sync-config.json
  
  # Use built-in example:
  python sync_all_issues.py --repo owner/repo --use-example
  
  # Export example configuration:
  python sync_all_issues.py --export-example sync-config.json
        """
    )
    parser.add_argument("--repo", help="GitHub repository (owner/repo)")
    parser.add_argument("--token", help="GitHub Personal Access Token (or set GITHUB_PERSONAL_ACCESS_TOKEN env var)")
    parser.add_argument("--sync", help="Path to JSON/YAML file containing sync configuration")
    parser.add_argument("--use-example", action="store_true", help="Use built-in example configuration")
    parser.add_argument("--export-example", help="Export example configuration to specified file and exit")
    
    args = parser.parse_args()
    
    # Handle export-example mode
    if args.export_example:
        try:
            with open(args.export_example, 'w') as f:
                json.dump(get_example_config(), f, indent=2)
            print(f"✅ Example configuration exported to: {args.export_example}")
            print(f"📝 Edit this file to customize your sync configuration, then run:")
            print(f"   python {sys.argv[0]} --repo owner/repo --sync {args.export_example}")
        except Exception as e:
            print(f"❌ Error exporting configuration: {e}")
            sys.exit(1)
        return
    
    # Validate required arguments
    if not args.repo:
        print("❌ Error: --repo is required (unless using --export-example)")
        parser.print_help()
        sys.exit(1)
    
    if not args.sync and not args.use_example:
        print("❌ Error: Either --sync or --use-example is required")
        parser.print_help()
        sys.exit(1)
    
    # Get token from args or environment
    token = args.token or os.getenv("GITHUB_PERSONAL_ACCESS_TOKEN")
    if not token:
        print("❌ Error: GitHub token required. Use --token or set GITHUB_PERSONAL_ACCESS_TOKEN")
        sys.exit(1)
    
    print(f"🔄 Syncing GitHub Issues with Repository State")
    print(f"📦 Repository: {args.repo}")
    print()
    
    # Load configuration
    if args.use_example:
        print("   Using built-in example configuration")
        config = get_example_config()
    else:
        print(f"   Loading from file: {args.sync}")
        config = load_sync_config(args.sync)
    
    commit_url = config.get('commit_url')
    issues_status = config.get('statuses', {})
    
    total_issues = sum(len(issues) for issues in issues_status.values())
    success_count = 0
    
    for status, issues in issues_status.items():
        print(f"\n📊 Updating {status.upper()} issues ({len(issues)})...")
        
        for issue in issues:
            if create_status_comment(args.repo, status, issue, token, commit_url):
                print(f"  ✅ #{issue['number']}: {issue.get('title', 'No title')[:50]}...")
                
                # Add appropriate labels
                label_map = {
                    "completed": ["status:done"],
                    "ready": ["status:ready"],
                    "blocked": ["status:blocked"],
                    "pending": ["status:pending"]
                }
                if status in label_map:
                    add_labels(args.repo, issue['number'], label_map[status], token)
                
                success_count += 1
            else:
                print(f"  ❌ #{issue['number']}: Failed")
    
    print()
    print("=" * 60)
    print(f"✅ Successfully updated {success_count}/{total_issues} issues")
    print("=" * 60)
    print()
    print("📊 Summary:")
    for status, issues in issues_status.items():
        status_emoji = {"completed": "✅", "ready": "🟢", "blocked": "🔴", "pending": "⏳"}
        print(f"  {status_emoji.get(status, '📋')} {status.capitalize()}: {len(issues)} issues")


if __name__ == "__main__":
    main()

# Made with Bob
