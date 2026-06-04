# License Documentation

## Project License

This repository is distributed under the Apache License, Version 2.0. See
[LICENSE](./LICENSE) for the complete license text.

The repository contains IBM Bob configuration files, Python and shell scripts,
Markdown documentation, Draw.io source diagrams, and PNG images. The Apache
License 2.0 applies to the repository content unless a file or a third-party
notice states otherwise.

## Third-Party Runtime Components

The optional GitHub MCP integration configured in
[`.bob/mcp.json`](./.bob/mcp.json) invokes:

```text
@modelcontextprotocol/server-github@2025.4.8
```

This package is downloaded at runtime by `npx`. It is not vendored into this
repository. A license snapshot for the reviewed package version and its
resolved transitive dependencies is recorded in
[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

The configuration pins the reviewed package version so the runtime command
matches the dependency snapshot. The configured package is deprecated. Replace
it with a maintained integration and regenerate the dependency snapshot before
the next release.

The optional Python issue-management scripts import `requests` and support
YAML templates through an optional `PyYAML` import. These packages are also
installed separately at runtime and are not vendored into this repository.
Their versions are currently unpinned, and their resolved dependency trees are
not covered by the npm snapshot. Generate and review a Python dependency
inventory before distributing a bundled Python environment.

## Content Provenance

The repository includes documentation templates, Bob skills, diagrams, and
images. [CONTENT_PROVENANCE.md](./CONTENT_PROVENANCE.md) records the confirmed
origin and licensing status for each artifact group, including the adapted
GitHub `.gitignore` template and rendered image mappings.

External resources used by Bob modes and skills are conceptual references, not
vendored repository content. Their license and terms posture is mapped in
[`.bob/documentation/RESOURCE_LICENSES.md`](./.bob/documentation/RESOURCE_LICENSES.md).
Use that map before copying, adapting, translating, or embedding material from
IBM, NIST, OWASP, ISO/IEEE, C4, arc42, Twelve-Factor, GitHub Docs, or other
mode resources.

## Distribution Checklist

Before publishing a release:

1. Include [LICENSE](./LICENSE).
2. Review and update [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) if the
   MCP package or its dependency tree changes.
3. Review [CONTENT_PROVENANCE.md](./CONTENT_PROVENANCE.md) for new or changed
   artifact groups and update their provenance records.
4. Review [`.bob/documentation/RESOURCE_LICENSES.md`](./.bob/documentation/RESOURCE_LICENSES.md)
   for any external resource copied or adapted into repository content.
5. Generate a Python dependency inventory before bundling a Python runtime or
   vendoring `requests`, `PyYAML`, or their transitive dependencies.
6. Preserve third-party copyright and attribution notices when required.
7. Record prominent notices in modified files when redistributing modified
   third-party Apache-licensed material.

## Review Scope

The third-party dependency snapshot was generated on 2026-05-30. The
content-provenance confirmations were completed on 2026-05-31. The license and
content-provenance review was supported by AI tooling and requires maintainer
acceptance for future changes. This documentation is a repository-maintenance
aid and not legal advice.
