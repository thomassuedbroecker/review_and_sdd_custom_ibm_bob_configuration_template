#!/bin/bash
# GitHub Issue Creator Runner
# This script loads the .env file and runs the Python issue creator
#
# Usage:
#   ./run_issue_creator.sh --repo owner/repo --template issues.json [--dry-run]
#   ./run_issue_creator.sh --repo owner/repo --use-example [--dry-run]
#   ./run_issue_creator.sh --export-example issues-template.json

set -e

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"

# Check if we're just exporting an example (doesn't need .env)
if [[ "$*" == *"--export-example"* ]]; then
    cd "$SCRIPT_DIR"
    python3 create_github_issues.py "$@"
    exit 0
fi

# Load environment variables from .env file
if [ -f "$PROJECT_ROOT/.env" ]; then
    echo "📄 Loading environment variables from .env..."
    export $(grep -v '^#' "$PROJECT_ROOT/.env" | xargs)
else
    echo "⚠️  Warning: .env file not found at $PROJECT_ROOT/.env"
    echo "Please create a .env file with GITHUB_PERSONAL_ACCESS_TOKEN"
    echo "Or use --dry-run mode to preview issues without creating them"
    
    # Allow dry-run without .env
    if [[ "$*" != *"--dry-run"* ]]; then
        exit 1
    fi
fi

# Check if token is set (unless in dry-run mode)
if [ -z "$GITHUB_PERSONAL_ACCESS_TOKEN" ] && [[ "$*" != *"--dry-run"* ]]; then
    echo "❌ Error: GITHUB_PERSONAL_ACCESS_TOKEN not found in .env file"
    echo "Use --dry-run to preview issues without authentication"
    exit 1
fi

if [ -n "$GITHUB_PERSONAL_ACCESS_TOKEN" ]; then
    echo "✅ GitHub token loaded successfully"
fi
echo ""

# Run the Python script with all arguments passed to this script
cd "$SCRIPT_DIR"
python3 create_github_issues.py "$@"

# Made with Bob
