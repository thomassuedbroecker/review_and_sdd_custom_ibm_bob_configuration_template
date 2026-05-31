#!/bin/bash
# Sync All GitHub Issues with Repository State
# Loads .env and runs the Python script
#
# Usage:
#   ./run_sync_all_issues.sh --repo owner/repo --sync sync-config.json
#   ./run_sync_all_issues.sh --repo owner/repo --use-example
#   ./run_sync_all_issues.sh --export-example sync-config.json

set -e

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"

# Check if we're just exporting an example (doesn't need .env)
if [[ "$*" == *"--export-example"* ]]; then
    python3 "$SCRIPT_DIR/sync_all_issues.py" "$@"
    exit 0
fi

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

# Run the Python script while preserving caller-relative sync paths
python3 "$SCRIPT_DIR/sync_all_issues.py" "$@"

# Made with Bob
