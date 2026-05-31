# Third-Party Notices

## Scope

The repository does not vendor third-party packages. The optional GitHub MCP
integration in [`.bob/settings.json`](./.bob/settings.json) downloads
`@modelcontextprotocol/server-github` at runtime with `npx`.

The table below records a point-in-time license snapshot generated on
2026-05-30 by resolving:

```text
@modelcontextprotocol/server-github@2025.4.8
```

The reviewed dependency tree contained 46 packages: 42 MIT-licensed packages
and 4 ISC-licensed packages. The configured package is currently unpinned, so
future installations may resolve a different tree.

## Python Runtime Dependencies

The optional issue-management scripts in [`.bob/scripts/`](./.bob/scripts/)
import `requests`. YAML template support also imports `PyYAML` when requested.
The setup instructions install these packages separately at runtime without
version pins. They are not vendored into this repository, and their resolved
dependency trees are not included in the npm snapshot below.

Before distributing a bundled Python environment, generate a Python dependency
inventory, review the resolved licenses, and preserve any required notices.

## Adapted Repository Template Content

The repository `.gitignore` file is adapted from GitHub's
[`Python.gitignore`](https://github.com/github/gitignore/blob/main/Python.gitignore)
template with repository-specific entries appended. The upstream
[`github/gitignore`](https://github.com/github/gitignore) repository is
distributed under CC0-1.0.

## Dependency Snapshot

| Package | Version | License |
| --- | --- | --- |
| `@modelcontextprotocol/sdk` | `1.0.1` | MIT |
| `@modelcontextprotocol/server-github` | `2025.4.8` | MIT |
| `@types/node` | `22.19.19` | MIT |
| `@types/node-fetch` | `2.6.13` | MIT |
| `asynckit` | `0.4.0` | MIT |
| `bytes` | `3.1.2` | MIT |
| `call-bind-apply-helpers` | `1.0.2` | MIT |
| `combined-stream` | `1.0.8` | MIT |
| `content-type` | `1.0.5` | MIT |
| `data-uri-to-buffer` | `4.0.1` | MIT |
| `delayed-stream` | `1.0.0` | MIT |
| `depd` | `2.0.0` | MIT |
| `dunder-proto` | `1.0.1` | MIT |
| `es-define-property` | `1.0.1` | MIT |
| `es-errors` | `1.3.0` | MIT |
| `es-object-atoms` | `1.1.2` | MIT |
| `es-set-tostringtag` | `2.1.0` | MIT |
| `fetch-blob` | `3.2.0` | MIT |
| `form-data` | `4.0.5` | MIT |
| `formdata-polyfill` | `4.0.10` | MIT |
| `function-bind` | `1.1.2` | MIT |
| `get-intrinsic` | `1.3.0` | MIT |
| `get-proto` | `1.0.1` | MIT |
| `gopd` | `1.2.0` | MIT |
| `has-symbols` | `1.1.0` | MIT |
| `has-tostringtag` | `1.0.2` | MIT |
| `hasown` | `2.0.4` | MIT |
| `http-errors` | `2.0.1` | MIT |
| `iconv-lite` | `0.7.2` | MIT |
| `inherits` | `2.0.4` | ISC |
| `math-intrinsics` | `1.1.0` | MIT |
| `mime-db` | `1.52.0` | MIT |
| `mime-types` | `2.1.35` | MIT |
| `node-domexception` | `1.0.0` | MIT |
| `node-fetch` | `3.3.2` | MIT |
| `raw-body` | `3.0.2` | MIT |
| `safer-buffer` | `2.1.2` | MIT |
| `setprototypeof` | `1.2.0` | ISC |
| `statuses` | `2.0.2` | MIT |
| `toidentifier` | `1.0.1` | MIT |
| `undici-types` | `6.21.0` | MIT |
| `universal-user-agent` | `7.0.3` | ISC |
| `unpipe` | `1.0.0` | MIT |
| `web-streams-polyfill` | `3.3.3` | MIT |
| `zod` | `3.25.76` | MIT |
| `zod-to-json-schema` | `3.25.2` | ISC |

## License Texts

The packages are downloaded from the npm registry and are not redistributed in
this repository. Their distributions contain the applicable license texts.
When packaging or redistributing these dependencies, include the corresponding
license texts and preserve required notices.

## Maintenance Note

The npm registry reports `@modelcontextprotocol/server-github@2025.4.8` as
deprecated. Replace it with a maintained integration and regenerate this
snapshot before the next release.

The direct package metadata was rechecked against the npm registry on
2026-05-31. The latest reported version remains `2025.4.8`, its reported
license remains MIT, and the package remains deprecated.
