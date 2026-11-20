#!/usr/bin/env bash
# release-vsix.sh – Build the Bob Config Importer .vsix, create its SHA-256
# checksum, render the release notes, and (with --publish) attach both files
# to a GitHub Release.
#
# Usage (from bob_config_collection/code/):
#   src/tools/release-vsix.sh [options]
#   npm run release -- [options]
#
# Options:
#   -c, --config FILE      Release configuration (default: docs/release/release.conf)
#   -v, --version X.Y.Z    Release number without "v" (overrides RELEASE_VERSION)
#   -t, --title TEXT       Release title (overrides RELEASE_TITLE)
#   -n, --notes-file FILE  Markdown release comment (overrides RELEASE_CHANGES)
#       --publish          Upload to GitHub. Without it, the script is a dry run:
#                          it builds and prepares everything locally only.
#       --update-notes     Also replace title and notes of an existing release
#       --skip-tests       Do not run npm test
#       --allow-tag-mismatch
#                          Publish although the existing tag is not on HEAD
#   -y, --yes              Do not ask for confirmation before uploading
#   -h, --help             Show this help and exit
#
# Examples:
#   # Dry run with the values from docs/release/release.conf
#   src/tools/release-vsix.sh
#
#   # Release 2.5.0 with its own release comment, then upload
#   src/tools/release-vsix.sh -v 2.5.0 -n docs/release/notes-2.5.0.md --publish
#
# Behaviour:
#   - package.json "version" must equal the release number. The script does not
#     change or commit files; it tells you what to fix.
#   - Release exists on GitHub  → files are uploaded (replacing same-named assets).
#   - Release does not exist    → it is created for tag v<version> on HEAD.
#
# Requirements: bash, git, node, npm, shasum, unzip, awk; gh (authenticated) for --publish.

set -euo pipefail

# ── Paths ────────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CODE_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${CODE_DIR}"

# ── Output helpers ───────────────────────────────────────────────────────────
info() { printf '▶ %s\n' "$*"; }
ok()   { printf '✔ %s\n' "$*"; }
warn() { printf '⚠ %s\n' "$*" >&2; }
die()  { printf '✖ %s\n' "$*" >&2; exit 1; }
usage() { sed -n '2,/^$/p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; }

# ── Arguments ────────────────────────────────────────────────────────────────
CONFIG_FILE="docs/release/release.conf"
ARG_VERSION="" ARG_TITLE="" ARG_NOTES_FILE=""
PUBLISH="false" UPDATE_NOTES_FLAG="" SKIP_TESTS="false"
ALLOW_TAG_MISMATCH="false" ASSUME_YES="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    -c|--config)       CONFIG_FILE="${2:?--config needs a file}"; shift 2 ;;
    -v|--version)      ARG_VERSION="${2:?--version needs a value}"; shift 2 ;;
    -t|--title)        ARG_TITLE="${2:?--title needs a value}"; shift 2 ;;
    -n|--notes-file)   ARG_NOTES_FILE="${2:?--notes-file needs a file}"; shift 2 ;;
    --publish)         PUBLISH="true"; shift ;;
    --update-notes)    UPDATE_NOTES_FLAG="true"; shift ;;
    --skip-tests)      SKIP_TESTS="true"; shift ;;
    --allow-tag-mismatch) ALLOW_TAG_MISMATCH="true"; shift ;;
    -y|--yes)          ASSUME_YES="true"; shift ;;
    -h|--help)         usage; exit 0 ;;
    *)                 die "Unknown option: $1 (see --help)" ;;
  esac
done

# ── Configuration ────────────────────────────────────────────────────────────
RELEASE_VERSION="" RELEASE_TITLE="" RELEASE_CHANGES="" RELEASE_CHANGES_FILE=""
RELEASE_NOTES_TEMPLATE="docs/release/release-notes-template.md"
PREVIOUS_TAG="" UPDATE_EXISTING_NOTES="false"

[[ -f "${CONFIG_FILE}" ]] || die "Config file not found: ${CONFIG_FILE}"
# shellcheck source=/dev/null
source "${CONFIG_FILE}"

# A version given on the command line also resets a title that was built from
# the config's version, unless a title is given too.
if [[ -n "${ARG_VERSION}" ]]; then
  RELEASE_VERSION="${ARG_VERSION}"
  [[ -n "${ARG_TITLE}" ]] || RELEASE_TITLE="v${RELEASE_VERSION}"
fi
[[ -n "${ARG_TITLE}" ]]      && RELEASE_TITLE="${ARG_TITLE}"
[[ -n "${ARG_NOTES_FILE}" ]] && RELEASE_CHANGES_FILE="${ARG_NOTES_FILE}"
[[ -n "${UPDATE_NOTES_FLAG}" ]] && UPDATE_EXISTING_NOTES="true"

[[ "${RELEASE_VERSION}" =~ ^[0-9]+\.[0-9]+\.[0-9]+([-+][0-9A-Za-z.-]+)?$ ]] \
  || die "Release number must look like 2.4.1 (got: '${RELEASE_VERSION}')"
TAG="v${RELEASE_VERSION}"
[[ -n "${RELEASE_TITLE}" ]] || RELEASE_TITLE="${TAG}"

if [[ -n "${RELEASE_CHANGES_FILE}" ]]; then
  [[ -f "${RELEASE_CHANGES_FILE}" ]] || die "Release comment file not found: ${RELEASE_CHANGES_FILE}"
  RELEASE_CHANGES="$(cat "${RELEASE_CHANGES_FILE}")"
fi
[[ -n "${RELEASE_CHANGES//[[:space:]]/}" ]] \
  || die "Release comment is empty: set RELEASE_CHANGES or RELEASE_CHANGES_FILE, or use --notes-file"
[[ -f "${RELEASE_NOTES_TEMPLATE}" ]] || die "Notes template not found: ${RELEASE_NOTES_TEMPLATE}"

# ── Prerequisites ────────────────────────────────────────────────────────────
for cmd in git node npm shasum unzip awk; do
  command -v "${cmd}" >/dev/null 2>&1 || die "Required command not found: ${cmd}"
done
if [[ "${PUBLISH}" == "true" ]]; then
  command -v gh >/dev/null 2>&1 || die "GitHub CLI 'gh' not found (needed for --publish)"
  gh auth status >/dev/null 2>&1 || die "gh is not logged in: run 'gh auth login'"
fi

# ── Consistency checks ───────────────────────────────────────────────────────
PKG_VERSION="$(node -p "require('./package.json').version")"
PKG_NAME="$(node -p "require('./package.json').name")"
[[ "${PKG_VERSION}" == "${RELEASE_VERSION}" ]] || die "package.json version is ${PKG_VERSION}, release is ${RELEASE_VERSION}.
  Fix: npm version ${RELEASE_VERSION} --no-git-tag-version, then commit and push."

HEAD_SHA="$(git rev-parse HEAD)"
if [[ -n "$(git status --porcelain -- .)" ]]; then
  if [[ "${PUBLISH}" == "true" ]]; then
    die "Uncommitted changes in bob_config_collection/code/. Commit them before publishing."
  fi
  warn "Uncommitted changes in bob_config_collection/code/ (allowed in a dry run)."
fi

REMOTE_URL="$(git remote get-url origin)"
REPO="$(printf '%s\n' "${REMOTE_URL}" | sed -E 's#^(git@github\.com:|https://github\.com/)##; s#\.git$##')"
[[ "${REPO}" =~ ^[^/]+/[^/]+$ ]] || die "Cannot read owner/name from origin URL: ${REMOTE_URL}"

TAG_EXISTS="false"
if git rev-parse -q --verify "refs/tags/${TAG}" >/dev/null; then
  TAG_EXISTS="true"
  TAG_SHA="$(git rev-parse "${TAG}^{commit}")"
  if [[ "${TAG_SHA}" != "${HEAD_SHA}" ]]; then
    msg="Tag ${TAG} points to ${TAG_SHA:0:7}, but you build from HEAD ${HEAD_SHA:0:7}."
    if [[ "${PUBLISH}" == "true" && "${ALLOW_TAG_MISMATCH}" != "true" ]]; then
      die "${msg}
  Check 'git diff ${TAG} HEAD'. If only the version changed, rerun with --allow-tag-mismatch."
    fi
    warn "${msg}"
  fi
elif [[ "${PUBLISH}" == "true" ]]; then
  [[ -n "$(git branch -r --contains "${HEAD_SHA}")" ]] \
    || die "HEAD ${HEAD_SHA:0:7} is not pushed. Run 'git push' first, so the new tag points to a commit on GitHub."
fi

if [[ -z "${PREVIOUS_TAG}" ]]; then
  PREVIOUS_TAG="$(git describe --tags --abbrev=0 --exclude "${TAG}" HEAD 2>/dev/null || true)"
fi

# ── Build ────────────────────────────────────────────────────────────────────
VSIX="dist/${PKG_NAME}-${RELEASE_VERSION}.vsix"
SHA_FILE="${VSIX}.sha256"
NOTES_OUT="dist/release-notes-${RELEASE_VERSION}.md"

info "Release ${TAG}: \"${RELEASE_TITLE}\""
if [[ ! -d node_modules ]]; then
  info "Installing build tools (npm ci)"
  npm ci
fi
if [[ "${SKIP_TESTS}" != "true" ]]; then
  info "Running tests"
  npm test
fi
info "Packaging"
npm run package
[[ -f "${VSIX}" ]] || die "Expected package not found: ${VSIX}"

# Capture the listing first: "unzip | grep -q" fails under pipefail (SIGPIPE).
VSIX_LISTING="$(unzip -l "${VSIX}")"
[[ "${VSIX_LISTING}" == *"extension/LICENSE.txt"* ]] || die "${VSIX} contains no LICENSE.txt"
VSIX_VERSION="$(unzip -p "${VSIX}" extension/package.json | node -e \
  "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).version))")"
[[ "${VSIX_VERSION}" == "${RELEASE_VERSION}" ]] || die "${VSIX} has version ${VSIX_VERSION}"
ok "Built ${VSIX} (LICENSE.txt included)"

# Checksum: run inside dist/ so the file lists the bare file name.
( cd dist && shasum -a 256 "$(basename "${VSIX}")" > "$(basename "${SHA_FILE}")" \
          && shasum -a 256 -c "$(basename "${SHA_FILE}")" >/dev/null ) \
  || die "Checksum creation or verification failed"
[[ -s "${SHA_FILE}" ]] || die "Checksum file is empty: ${SHA_FILE}"
ok "Checksum ${SHA_FILE}: $(cut -d' ' -f1 "${SHA_FILE}")"

# ── Release notes ────────────────────────────────────────────────────────────
R_VERSION="${RELEASE_VERSION}" R_TAG="${TAG}" R_PREVIOUS_TAG="${PREVIOUS_TAG:-${TAG}}" \
R_REPO="${REPO}" R_CHANGES="${RELEASE_CHANGES}" \
awk '
  function repl(s, key, val,   out, i) {
    out = ""
    while ((i = index(s, key)) > 0) { out = out substr(s, 1, i - 1) val; s = substr(s, i + length(key)) }
    return out s
  }
  {
    line = $0
    line = repl(line, "{{VERSION}}",      ENVIRON["R_VERSION"])
    line = repl(line, "{{TAG}}",          ENVIRON["R_TAG"])
    line = repl(line, "{{PREVIOUS_TAG}}", ENVIRON["R_PREVIOUS_TAG"])
    line = repl(line, "{{REPO}}",         ENVIRON["R_REPO"])
    line = repl(line, "{{CHANGES}}",      ENVIRON["R_CHANGES"])
    print line
  }' "${RELEASE_NOTES_TEMPLATE}" > "${NOTES_OUT}"
[[ -n "${PREVIOUS_TAG}" ]] || warn "No previous tag found; the changelog link compares ${TAG} with itself."
ok "Release notes ${NOTES_OUT}"

# ── Publish ──────────────────────────────────────────────────────────────────
RELEASE_EXISTS="false"
if [[ "${PUBLISH}" == "true" ]] && gh release view "${TAG}" --repo "${REPO}" >/dev/null 2>&1; then
  RELEASE_EXISTS="true"
fi

if [[ "${PUBLISH}" != "true" ]]; then
  cat <<EOF

Dry run finished – nothing was uploaded.
  Package:  ${CODE_DIR}/${VSIX}
  Checksum: ${CODE_DIR}/${SHA_FILE}
  Notes:    ${CODE_DIR}/${NOTES_OUT}
  Tag:      ${TAG} ($( [[ "${TAG_EXISTS}" == "true" ]] && echo exists || echo "will be created on HEAD"))
Review the notes, then rerun with --publish.
EOF
  exit 0
fi

echo
if [[ "${RELEASE_EXISTS}" == "true" ]]; then
  info "GitHub Release ${TAG} exists in ${REPO}: the two files will be uploaded (same-named assets replaced)."
  [[ "${UPDATE_EXISTING_NOTES}" == "true" ]] && info "Its title and notes will be replaced with ${NOTES_OUT}."
else
  info "GitHub Release ${TAG} will be created in ${REPO} (tag on ${HEAD_SHA:0:7}) with the two files."
fi
info "This is public and visible to everyone who can see the repository."

if [[ "${ASSUME_YES}" != "true" ]]; then
  read -r -p "Continue? [y/N] " answer
  [[ "${answer}" =~ ^[Yy]$ ]] || die "Aborted – nothing was uploaded."
fi

if [[ "${RELEASE_EXISTS}" == "true" ]]; then
  gh release upload "${TAG}" "${VSIX}" "${SHA_FILE}" --repo "${REPO}" --clobber
  if [[ "${UPDATE_EXISTING_NOTES}" == "true" ]]; then
    gh release edit "${TAG}" --repo "${REPO}" --title "${RELEASE_TITLE}" --notes-file "${NOTES_OUT}"
  fi
else
  if [[ "${TAG_EXISTS}" == "true" ]]; then
    git ls-remote --exit-code --tags origin "refs/tags/${TAG}" >/dev/null \
      || die "Tag ${TAG} exists only locally. Run 'git push origin ${TAG}' first."
    gh release create "${TAG}" "${VSIX}" "${SHA_FILE}" --repo "${REPO}" \
      --title "${RELEASE_TITLE}" --notes-file "${NOTES_OUT}" --verify-tag
  else
    gh release create "${TAG}" "${VSIX}" "${SHA_FILE}" --repo "${REPO}" \
      --title "${RELEASE_TITLE}" --notes-file "${NOTES_OUT}" --target "${HEAD_SHA}"
  fi
fi

ok "Published. Assets of ${TAG}:"
gh release view "${TAG}" --repo "${REPO}" --json assets,url \
  -q '(.assets[] | "  \(.name)  \(.size) bytes"), "  \(.url)"'
