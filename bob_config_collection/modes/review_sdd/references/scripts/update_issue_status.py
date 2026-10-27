#!/usr/bin/env python3
"""
Update GitHub Issue Status - Flexible Issue Update Tool
Adds comments to issues based on JSON/YAML configuration or command-line arguments.

Usage:
    # Update from JSON file:
    python update_issue_status.py --repo owner/repo --updates updates.json
    
    # Update single issue:
    python update_issue_status.py --repo owner/repo --issue 123 --comment "Work completed"
    
    # Close issues:
    python update_issue_status.py --repo owner/repo --close 123,124,125
"""

import os
import sys
import json
import argparse
import requests
from typing import List, Dict, Optional


def update_issue(repo: str, issue_number: int, comment: str, token: str, close: bool = False) -> bool:
    """Add a comment to an issue and optionally close it"""
    
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    data = {"body": comment}
    
    try:
        # Add comment
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        print(f"✅ Added comment to Issue #{issue_number}")
        
        # Close issue if requested
        if close:
            close_url = f"https://api.github.com/repos/{repo}/issues/{issue_number}"
            close_data = {"state": "closed"}
            response = requests.patch(close_url, headers=headers, json=close_data)
            response.raise_for_status()
            print(f"   🔒 Closed Issue #{issue_number}")
        
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to update Issue #{issue_number}: {e}")
        return False


def load_updates_from_file(filepath: str) -> List[Dict]:
    """Load issue updates from JSON or YAML file"""
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
        
        return data.get('updates', [])
    
    except FileNotFoundError:
        print(f"❌ Error: File not found: {filepath}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error loading file: {e}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="Update GitHub issue status with comments and state changes",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Update from JSON file:
  python update_issue_status.py --repo owner/repo --updates updates.json
  
  # Add comment to single issue:
  python update_issue_status.py --repo owner/repo --issue 123 --comment "Work completed"
  
  # Close multiple issues:
  python update_issue_status.py --repo owner/repo --close 123,124,125
  
  # Add comment and close issue:
  python update_issue_status.py --repo owner/repo --issue 123 --comment "Done" --close-issue
        """
    )
    parser.add_argument("--repo", required=True, help="GitHub repository (owner/repo)")
    parser.add_argument("--token", help="GitHub Personal Access Token (or set GITHUB_PERSONAL_ACCESS_TOKEN env var)")
    parser.add_argument("--updates", help="Path to JSON/YAML file containing issue updates")
    parser.add_argument("--issue", type=int, help="Single issue number to update")
    parser.add_argument("--comment", help="Comment text for single issue update")
    parser.add_argument("--close", help="Comma-separated list of issue numbers to close")
    parser.add_argument("--close-issue", action="store_true", help="Close the issue after adding comment (use with --issue)")
    
    args = parser.parse_args()
    
    # Get token from args or environment
    token = args.token or os.getenv("GITHUB_PERSONAL_ACCESS_TOKEN")
    if not token:
        print("❌ Error: GitHub token required. Use --token or set GITHUB_PERSONAL_ACCESS_TOKEN")
        sys.exit(1)
    
    print(f"🔄 GitHub Issue Updater")
    print(f"📦 Repository: {args.repo}")
    print()
    
    success_count = 0
    total_count = 0
    
    # Handle updates from file
    if args.updates:
        updates = load_updates_from_file(args.updates)
        total_count = len(updates)
        print(f"📋 Loading {total_count} updates from file...")
        print()
        
        for update in updates:
            issue_num = update.get('issue')
            if not issue_num:
                print(f"⚠️  Skipping update without issue number")
                continue
            
            comment = update.get('comment', '')
            close = update.get('close', False)
            
            if update_issue(args.repo, int(issue_num), comment, token, close):
                success_count += 1
    
    # Handle single issue update
    elif args.issue and args.comment:
        total_count = 1
        if update_issue(args.repo, args.issue, args.comment, token, args.close_issue):
            success_count += 1
    
    # Handle closing issues
    elif args.close:
        issue_numbers = [int(n.strip()) for n in args.close.split(',')]
        total_count = len(issue_numbers)
        print(f"🔒 Closing {total_count} issues...")
        print()
        
        for issue_num in issue_numbers:
            comment = "Closing this issue."
            if update_issue(args.repo, issue_num, comment, token, close=True):
                success_count += 1
    
    else:
        print("❌ Error: Must specify --updates, --issue with --comment, or --close")
        parser.print_help()
        sys.exit(1)
    
    print()
    print(f"✅ Successfully updated {success_count}/{total_count} issues")


if __name__ == "__main__":
    main()

# Made with Bob
