> **⚠️ Community project — not affiliated with or supported by IBM.**
> IBM Bob is a trademark of IBM Corporation. Provided "AS IS" under the
> Apache License 2.0, without warranties or conditions of any kind.
> Use at your own risk.

## What's new in {{TAG}}

{{CHANGES}}

## Bob Config Importer (Community) extension

1. Download `bob-config-importer-{{VERSION}}.vsix` and
   `bob-config-importer-{{VERSION}}.vsix.sha256` below.
2. Verify: `shasum -a 256 -c bob-config-importer-{{VERSION}}.vsix.sha256`
3. Install: `code --install-extension bob-config-importer-{{VERSION}}.vsix`

The `.vsix` is not code-signed and not published on the VS Code Marketplace.
It contains the configuration collection as of this release. Imported hooks
and scripts run code on your machine; read them before installing.

**Full changelog:** https://github.com/{{REPO}}/compare/{{PREVIOUS_TAG}}...{{TAG}}
