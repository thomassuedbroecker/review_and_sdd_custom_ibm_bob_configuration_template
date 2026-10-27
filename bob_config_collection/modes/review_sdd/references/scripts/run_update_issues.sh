#!/bin/bash
# Update GitHub Issues Status Script
# Loads .env and runs the Python script
#
# Usage:
#   ./run_update_issues.sh --repo owner/repo --updates updates.json
#   ./run_update_issues.sh --repo owner/repo --issue 123 --comment "Done"
#   ./run_update_issues.sh --repo owner/repo --close 123,124,125

set -e

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"

# Load environment variables from .env file
if [ -f "$PROJECT_ROOT/.env" ]; then
    echo "📄 Loading environment variables from .env..."
    export $(grep -v '^#' "$PROJECT_ROOT/.env" | xargs)
else
    echo "⚠️  Warning: .env file not found at $PROJECT_ROOT/.env"
    echo "Please create a .env file with GITHUB_PERSONAL_ACCESS_TOKEN"
    exit 1
fi

# Check if token is set
if [ -z "$GITHUB_PERSONAL_ACCESS_TOKEN" ]; then
    echo "❌ Error: GITHUB_PERSONAL_ACCESS_TOKEN not found in .env file"
    exit 1
fi

echo "✅ GitHub token loaded successfully"
echo ""

# Run the Python script while preserving caller-relative update paths
python3 "$SCRIPT_DIR/update_issue_status.py" "$@"

# Made with Bob
