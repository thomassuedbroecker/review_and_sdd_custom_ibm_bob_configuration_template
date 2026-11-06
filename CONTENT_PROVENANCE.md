# Content Provenance Register

## Purpose

This register records the provenance status of distributable repository
content. It avoids treating missing evidence as proof of ownership. Maintainers
should replace each unresolved status with the verified origin, author, and
applicable license or ownership statement.

## Register

| Content | Repository Location | Current Evidence | Status |
| --- | --- | --- | --- |
| IBM Bob custom mode configuration | `.bob/custom_modes.yaml` | Created with assistance from IBM Bob and authored by Thomas Suedbroecker | Confirmed by maintainer: AI-assisted mode configuration authored, reviewed, and accepted by Thomas Suedbroecker; licensed under Apache-2.0 |
| Reusable skill documents | `.bob/skills/` | Created with assistance from IBM Bob and authored by Thomas Suedbroecker | Confirmed by maintainer: AI-assisted skill documents authored, reviewed, and accepted by Thomas Suedbroecker; licensed under Apache-2.0 |
| GitHub issue-management scripts | `.bob/scripts/` | Created for this repository with AI assistance and maintained by Thomas Suedbroecker | Confirmed by maintainer: AI-assisted scripts authored, reviewed, and accepted by Thomas Suedbroecker; no third-party source incorporated; licensed under Apache-2.0 |
| CLI automation scripts | `automations/` | Created for this repository with AI assistance and maintained by Thomas Suedbroecker | Confirmed by maintainer: AI-assisted scripts authored, reviewed, and accepted by Thomas Suedbroecker; no third-party source incorporated; licensed under Apache-2.0 |
| Agent routing configuration | `AGENTS.md` | Created for this repository with AI assistance and maintained by Thomas Suedbroecker | Confirmed by maintainer: AI-assisted agent configuration authored, reviewed, and accepted by Thomas Suedbroecker; no third-party source incorporated; licensed under Apache-2.0 |
| Guides and documentation | `.bob/documentation/` | Created for this repository with AI assistance and maintained by Thomas Suedbroecker; external links are references rather than incorporated material | Confirmed by maintainer: AI-assisted documentation authored, reviewed, and accepted by Thomas Suedbroecker; no third-party source incorporated except where separately recorded; licensed under Apache-2.0 |
| Draw.io source diagrams | `.bob/documentation/diagramms/*.drawio` | Created with assistance from IBM Bob and optimized by Thomas Suedbroecker | Confirmed by maintainer: AI-assisted diagram sources optimized and accepted by Thomas Suedbroecker; licensed under Apache-2.0 |
| Rendered PNG images | `.bob/images/*.png` | Rendered from AI-assisted diagram material and accepted by Thomas Suedbroecker; mappings are recorded below | Confirmed by maintainer: rendered diagram assets reviewed and accepted by Thomas Suedbroecker; licensed under Apache-2.0 |
| README workflow JPEG | `images/custom_sdd_workflow_in_bob.jpg` | Repository image used by `README.md`; no separate editable source file is present in the repository | Confirmed by maintainer: AI-assisted workflow visual reviewed and accepted by Thomas Suedbroecker; licensed under Apache-2.0 |
| Python-oriented `.gitignore` template | `.gitignore` | Adapted from GitHub's `Python.gitignore` template with repository-specific entries appended | Confirmed: adapted from `https://github.com/github/gitignore/blob/main/Python.gitignore`; upstream license: CC0-1.0; repository-specific additions licensed under Apache-2.0 |
| GitHub MCP npm dependency | `.bob/mcp.json` | Runtime dependency reviewed in `THIRD_PARTY_NOTICES.md` | Recorded |
| Task-history export hook and hook registration | `.bob/hooks/export-task-history.mjs`, `.bob/settings.json` | Copied unchanged from [`custom-ibm-bob-intro-workshop-template`](https://github.com/thomassuedbroecker/custom-ibm-bob-intro-workshop-template) (same maintainer); byte-identical to the upstream `.bob/hooks/export-task-history.mjs` on 2026-11-06 | Confirmed: copied from a repository licensed under Apache-2.0; no modifications |
| Leading mode and skill collection | `bob_config_collection/modes/`, `bob_config_collection/skills/` | Source of the overlapping `.bob/` modes and skills (see `README.md`, *Two Ways to Use This Repository*); committed by Thomas Suedbroecker | Pending maintainer confirmation: same origin as `.bob/custom_modes.yaml` and `.bob/skills/` is expected |
| VS Code extension source, tests, and docs | `bob_config_collection/code/` (except `node_modules/`, `dist/`) | Committed by Thomas Suedbroecker; npm devDependencies (`@vscode/vsce`, `sharp`) are build tools and are not bundled into the `.vsix` | Pending maintainer confirmation: record authorship and AI-assistance status |
| Extension icons | `bob_config_collection/code/images/icon*.svg`, `icon*.png` | Hand-written SVG with inline design comments; PNGs rendered from the SVGs by `src/tools/render-icon.js` | Pending maintainer confirmation: record authorship and AI-assistance status |
| README extension screenshot | `images/custom_extension_in_bob.png` | Screenshot of the extension running in IBM Bob, used by `README.md` | Pending maintainer confirmation: record authorship; confirm no third-party or client content is visible |

## Rendered Image Map

| Rendered PNG | Editable Source or Design Definition | Maintenance Note |
| --- | --- | --- |
| `.bob/images/architecture-review.png` | `.bob/documentation/diagramms/architecture-review-system.drawio` | Export the Draw.io source after architecture-review diagram changes |
| `.bob/images/configuration-gap-detector.png` | `.bob/documentation/diagramms/configuration-gap-detector-usage.drawio` | Export the Draw.io source after configuration-gap workflow changes |
| `.bob/images/skills-review.png` | `.bob/documentation/diagramms/custom-modes-overview.drawio` | Export the Draw.io source after mode or review-skill diagram changes |
| `.bob/images/spec-driven-development-overview.png` | `.bob/documentation/diagramms/spec-driven-development-overview.md` | The repository does not contain an editable Draw.io source. Treat the PNG as a maintainer-accepted standalone rendered asset and use the Markdown design definition when regenerating it. |
| `images/custom_sdd_workflow_in_bob.jpg` | No editable source file present in this repository | Treat the JPEG as a maintainer-accepted standalone workflow visual. Replace or add an editable source if the workflow image is regenerated. |
| `bob_config_collection/code/images/icon.png`, `icon-color.png` | `bob_config_collection/code/images/icon.svg`, `icon-color.svg` | Regenerate with `npm run icon` in `bob_config_collection/code/` |

## Maintainer Confirmation Checklist

For future additions or provenance changes:

1. Record whether the material was created for this repository, adapted from
   another source, or generated with an AI-assisted tool.
2. Record the author or source URL.
3. Record the applicable license and required attribution.
4. For images, map each PNG file to its editable source or document how it was
   produced.
5. Preserve any required third-party notices in
   [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

## Confirmation Formats

Replace an unresolved status with the applicable factual statement after the
maintainer has verified it:

```text
Confirmed by maintainer: original repository content authored by <name>;
licensed under Apache-2.0.
```

```text
Confirmed by maintainer: created for this repository by <name> with assistance
from <tool>; human-reviewed and accepted; no third-party source incorporated;
licensed under Apache-2.0.
```

```text
Confirmed: adapted from <source URL>; original license: <license>; required
attribution recorded in THIRD_PARTY_NOTICES.md.
```

## AI-Assisted Material

The license and content-provenance review documented in this repository was
supported by AI tooling. The resulting documentation is a maintainer review
aid and requires human verification and acceptance.

The conceptual knowledge sources used by the Bob modes and skills are mapped
in [`.bob/documentation/KNOWLEDGE_SOURCES.md`](./.bob/documentation/KNOWLEDGE_SOURCES.md).
That file records standards, frameworks, product documentation, and local
workflow sources separately from artifact authorship and license provenance.
External resource license and terms boundaries are mapped in
[`.bob/documentation/RESOURCE_LICENSES.md`](./.bob/documentation/RESOURCE_LICENSES.md).

If AI-assisted tools contributed substantial content, record the tool, the
human review and acceptance process, any relevant public-code match or
similarity scan, and the resulting ownership or license review decision.

This register is a repository-maintenance aid and not legal advice.
