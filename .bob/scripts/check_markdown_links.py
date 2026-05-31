#!/usr/bin/env python3
"""Check local Markdown links and heading anchors without external dependencies."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote


LINK_PATTERN = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
HEADING_PATTERN = re.compile(r"^#{1,6}\s+(.+?)\s*#*\s*$")
EXTERNAL_PREFIXES = ("http://", "https://", "mailto:", "tel:")


def heading_slug(heading: str) -> str:
    heading = re.sub(r"<[^>]+>", "", heading)
    heading = re.sub(r"[`*_~]", "", heading).strip().lower()
    heading = re.sub(r"[^\w\s-]", "", heading)
    return re.sub(r"\s+", "-", heading)


def heading_anchors(markdown_file: Path) -> set[str]:
    anchors: set[str] = set()
    seen: dict[str, int] = {}
    for line in markdown_file.read_text(encoding="utf-8").splitlines():
        match = HEADING_PATTERN.match(line)
        if not match:
            continue
        base = heading_slug(match.group(1))
        count = seen.get(base, 0)
        seen[base] = count + 1
        anchors.add(base if count == 0 else f"{base}-{count}")
    return anchors


def markdown_files(root: Path) -> list[Path]:
    return sorted(
        path
        for path in root.rglob("*.md")
        if ".git" not in path.parts
    )


def validate_link(source: Path, target: str) -> str | None:
    target = target.strip().strip("<>")
    if not target or target.startswith(EXTERNAL_PREFIXES):
        return None

    file_part, separator, anchor = target.partition("#")
    file_part = unquote(file_part.split("?", 1)[0])
    linked_path = (source.parent / (file_part or ".")).resolve()

    if not linked_path.exists():
        return f"missing target: {target}"

    if separator and linked_path.is_file() and linked_path.suffix.lower() == ".md":
        if unquote(anchor) not in heading_anchors(linked_path):
            return f"missing anchor: {target}"

    return None


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    failures: list[str] = []

    for markdown_file in markdown_files(root):
        for line_number, line in enumerate(
            markdown_file.read_text(encoding="utf-8").splitlines(), start=1
        ):
            for target in LINK_PATTERN.findall(line):
                failure = validate_link(markdown_file, target)
                if failure:
                    relative_path = markdown_file.relative_to(root)
                    failures.append(f"{relative_path}:{line_number}: {failure}")

    if failures:
        print("Markdown link check failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(f"Markdown link check passed for {len(markdown_files(root))} files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
