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
| Guides and documentation | `.bob/documentation/`, `.bob/notes/` | Some documents cite external reference links, but no artifact-level origin record exists | Maintainer confirmation required: record author and origin for each document or document group, including source URLs and applicable licenses for adapted material |
| Draw.io source diagrams | `.bob/documentation/diagramms/*.drawio` | Created with assistance from IBM Bob and optimized by Thomas Suedbroecker | Confirmed by maintainer: AI-assisted diagram sources optimized and accepted by Thomas Suedbroecker; licensed under Apache-2.0 |
| Rendered PNG images | `.bob/images/*.png` | Rendered from diagram material created with assistance from IBM Bob and optimized by Thomas Suedbroecker | AI-assisted origin recorded. Maintainer confirmation required: map each PNG to its editable source or document its rendering method |
| Python-oriented `.gitignore` template | `.gitignore` | File comments reference GitHub-maintained templates | Confirm source URL and applicable license |
| GitHub MCP npm dependency | `.bob/settings.json` | Runtime dependency reviewed in `THIRD_PARTY_NOTICES.md` | Recorded |

## Maintainer Confirmation Checklist

For each unresolved row:

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

If AI-assisted tools contributed substantial content, record the tool, the
human review and acceptance process, any relevant public-code match or
similarity scan, and the resulting ownership or license review decision.

This register is a repository-maintenance aid and not legal advice.
