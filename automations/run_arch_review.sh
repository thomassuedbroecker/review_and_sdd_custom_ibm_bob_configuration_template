#!/usr/bin/env bash
# run_arch_review.sh – Invoke IBM Bob to run an architecture review from the CLI.
#
# Usage:
#   automations/run_arch_review.sh --repo <name> [options] [PROMPT]
#
# Required:
#   --repo NAME        Name of the cloned repository inside the repos/ folder.
#                      Example: --repo my-service  →  reviews repos/my-service/
#
# Options:
#   --mode MODE        Bob chat mode (default: arch-review).
#                      Choices: arch-review, security-review, scalability-review,
#                      patterns-review, maintainability-review, documentation-review,
#                      twelve-factor-review, business-alignment-review
#   --output FORMAT    Output format: text | json | stream-json (default: text)
#   --max-coins N      Stop with exit code 1 if token budget exceeded (default: unset)
#   --out FILE         Write output to FILE instead of stdout
#   -y, --yolo         Auto-approve all Bob actions (CI / non-interactive mode)
#   -h, --help         Show this help and exit
#
# Examples:
#   # Full architecture review of repos/my-service
#   automations/run_arch_review.sh --repo my-service
#
#   # Save the review to a file
#   automations/run_arch_review.sh --repo my-service \
#     --out reviews/my-service-arch-$(date +%Y%m%d).md
#
#   # Focused security review
#   automations/run_arch_review.sh --repo my-service --mode security-review
#
#   # CI mode — auto-approve, JSON output, budget cap
#   automations/run_arch_review.sh --repo my-service \
#     --yolo --output json --max-coins 500 \
#     --out /tmp/review.json
#
#   # Custom prompt
#   automations/run_arch_review.sh --repo my-service \
#     "Focus only on the authentication module"
#
# Made with Bob

set -euo pipefail

# ── Ensure bob CLI is available ───────────────────────────────────────────────
# bob is installed as a Node.js global via nvm. A plain bash invocation may not
# have nvm initialised, so we source it here if bob is not already on PATH.
if ! command -v bob &>/dev/null; then
  # Try to load nvm from the standard locations
  NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [[ -s "$NVM_DIR/nvm.sh" ]]; then
    # shellcheck source=/dev/null
    source "$NVM_DIR/nvm.sh"
    # Use the default nvm alias if set, otherwise use the current node version
    nvm use default --silent 2>/dev/null || true
  fi
fi

# Final check — abort with a helpful message if bob is still not found
if ! command -v bob &>/dev/null; then
  echo "❌ 'bob' command not found." >&2
  echo "" >&2
  echo "   IBM Bob CLI is not on your PATH. Fix one of the following:" >&2
  echo "" >&2
  echo "   Option A — run the script from a terminal where bob is already available:" >&2
  echo "     which bob   # should print a path" >&2
  echo "" >&2
  echo "   Option B — install bob as a Node.js global (requires node ≥ 18):" >&2
  echo "     npm install -g @ibm/bob" >&2
  echo "" >&2
  echo "   Option C — if using nvm, ensure the node version with bob is active:" >&2
  echo "     nvm use default" >&2
  echo "     which bob" >&2
  exit 1
fi

BOB_BIN="$(command -v bob)"
BOB_VERSION="$(bob --version 2>/dev/null | grep -v DeprecationWarning | head -1 || echo "unknown")"
echo "✅ bob found: $BOB_BIN  (version $BOB_VERSION)"

# Resolve workspace root relative to this script's location (automations/ → parent)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WORKSPACE_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
REPOS_DIR="$WORKSPACE_ROOT/repos"

# ── Defaults ──────────────────────────────────────────────────────────────────
REPO_NAME=""
MODE="arch-review"
OUTPUT_FORMAT="text"
MAX_COINS=""
OUT_FILE=""
YOLO=false
CUSTOM_PROMPT=""

# ── Parse arguments ───────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo)
      REPO_NAME="$2"; shift 2 ;;
    --mode)
      MODE="$2"; shift 2 ;;
    --output)
      OUTPUT_FORMAT="$2"; shift 2 ;;
    --max-coins)
      MAX_COINS="$2"; shift 2 ;;
    --out)
      OUT_FILE="$2"; shift 2 ;;
    -y|--yolo)
      YOLO=true; shift ;;
    -h|--help)
      sed -n '2,/^# Made with Bob/p' "$0" | grep '^#' | sed 's/^# \?//'
      exit 0 ;;
    --)
      shift; CUSTOM_PROMPT="$*"; break ;;
    -*)
      echo "❌ Unknown option: $1" >&2
      echo "Run with --help for usage." >&2
      exit 1 ;;
    *)
      CUSTOM_PROMPT="$*"; break ;;
  esac
done

# ── Validate --repo ───────────────────────────────────────────────────────────
if [[ -z "$REPO_NAME" ]]; then
  echo "❌ --repo is required." >&2
  echo "   Usage: automations/run_arch_review.sh --repo <name> [options]" >&2
  echo "   Available repos:" >&2
  if [[ -d "$REPOS_DIR" ]]; then
    ls -1 "$REPOS_DIR" | sed 's/^/     /' >&2 || echo "     (none yet)" >&2
  else
    echo "     repos/ directory not found at $REPOS_DIR" >&2
  fi
  exit 1
fi

REPO_PATH="$REPOS_DIR/$REPO_NAME"
if [[ ! -d "$REPO_PATH" ]]; then
  echo "❌ Repository not found: $REPO_PATH" >&2
  echo "   Clone the repo first:  git clone <url> repos/$REPO_NAME" >&2
  echo "   Available repos:" >&2
  if [[ -d "$REPOS_DIR" ]]; then
    ls -1 "$REPOS_DIR" | sed 's/^/     /' >&2 || echo "     (none)" >&2
  fi
  exit 1
fi

# ── Validate --mode ───────────────────────────────────────────────────────────
VALID_MODES=(
  arch-review security-review scalability-review patterns-review
  maintainability-review documentation-review twelve-factor-review
  business-alignment-review
)
VALID=false
for m in "${VALID_MODES[@]}"; do
  [[ "$MODE" == "$m" ]] && VALID=true && break
done
if [[ "$VALID" != true ]]; then
  echo "❌ Invalid mode: '$MODE'" >&2
  echo "   Valid modes: ${VALID_MODES[*]}" >&2
  exit 1
fi

# ── Resolve prompt ────────────────────────────────────────────────────────────
# REPO_PATH is the absolute path to the repo. Skills are in .bob/skills/ which
# resolves relative to the workspace root where bob is run from.
if [[ -z "$CUSTOM_PROMPT" ]]; then
  case "$MODE" in
    arch-review)
      PROMPT="Conduct a comprehensive architecture review of the source code located at $REPO_PATH. Read the skill files from .bob/skills/ before starting: business-alignment-skill.md, security-threat-modeling-skill.md, scalability-performance-skill.md, architecture-patterns-skill.md, maintainability-technical-debt-skill.md, documentation-review-skill.md, twelve-factor-compliance-skill.md. Produce a structured findings report with ✅ Achieved, ⚠️ Concerns, ❌ Not Achieved, and 💡 Recommendations for each area." ;;
    security-review)
      PROMPT="Perform a security and threat modeling review of the source code at $REPO_PATH. Read .bob/skills/security-threat-modeling-skill.md first. Include STRIDE analysis, OWASP Top 10 check, and prioritised recommendations." ;;
    scalability-review)
      PROMPT="Review scalability and performance of the source code at $REPO_PATH. Read .bob/skills/scalability-performance-skill.md first. Identify bottlenecks, scaling gaps, and prioritised recommendations." ;;
    patterns-review)
      PROMPT="Review architecture patterns and best practices in the source code at $REPO_PATH. Read .bob/skills/architecture-patterns-skill.md first. Check SOLID principles, identify anti-patterns, and provide recommendations." ;;
    maintainability-review)
      PROMPT="Assess maintainability and technical debt in the source code at $REPO_PATH. Read .bob/skills/maintainability-technical-debt-skill.md first. Quantify debt, identify coupling issues, and provide a remediation roadmap." ;;
    documentation-review)
      PROMPT="Review documentation completeness for the source code at $REPO_PATH. Read .bob/skills/documentation-review-skill.md first. Check for ADRs, C4 diagrams, API docs, license notices, and content provenance." ;;
    twelve-factor-review)
      PROMPT="Check 12-factor app compliance for the source code at $REPO_PATH. Read .bob/skills/twelve-factor-compliance-skill.md first. Rate each factor and provide specific remediation steps for any violations." ;;
    business-alignment-review)
      PROMPT="Review business alignment and quality attributes for the source code at $REPO_PATH. Read .bob/skills/business-alignment-skill.md first. Assess stakeholder requirements, cost-benefit, and strategic fit." ;;
  esac
else
  PROMPT="Review the source code at $REPO_PATH — $CUSTOM_PROMPT"
fi

# ── Build bob command ─────────────────────────────────────────────────────────
# Bob is run from the WORKSPACE ROOT so that .bob/skills/ resolves correctly.
# The repo path is passed as an absolute path in the prompt so Bob can read it
# directly — this avoids the --include-directories schema bug (F-008) while
# keeping the skill files accessible at ./.bob/skills/ (relative to workspace).
BOB_CMD=(bob
  --chat-mode "$MODE"
  --approval-mode yolo
  --output-format "$OUTPUT_FORMAT"
  --hide-intermediary-output
)

[[ -n "$MAX_COINS" ]] && BOB_CMD+=(--max-coins "$MAX_COINS")
[[ "$YOLO" == true ]]  && BOB_CMD+=(-y)

# Positional prompt goes last
BOB_CMD+=("$PROMPT")

# Resolve output path to absolute before any potential directory change
if [[ -n "$OUT_FILE" ]]; then
  [[ "$OUT_FILE" = /* ]] || OUT_FILE="$WORKSPACE_ROOT/$OUT_FILE"
  mkdir -p "$(dirname "$OUT_FILE")"
fi

# ── Run (from workspace root so .bob/skills/ is reachable) ───────────────────
cd "$WORKSPACE_ROOT"

echo "🏛️  IBM Bob Architecture Review"
echo "   Workspace : $WORKSPACE_ROOT"
echo "   Repo      : $REPO_PATH"
echo "   Skills    : $WORKSPACE_ROOT/.bob/skills/"
echo "   Mode      : $MODE"
echo "   Format    : $OUTPUT_FORMAT"
echo "   Prompt    : ${PROMPT:0:100}…"
[[ -n "$OUT_FILE" ]] && echo "   Output    : $OUT_FILE"
echo ""

if [[ -n "$OUT_FILE" ]]; then
  "${BOB_CMD[@]}" | tee "$OUT_FILE"
  echo ""
  echo "✅ Review written to: $OUT_FILE"
else
  "${BOB_CMD[@]}"
fi
