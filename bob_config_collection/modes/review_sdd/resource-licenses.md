# Mode Resource License and Terms Map

## Purpose

This document records the license or terms posture for external resources used
as conceptual references by the IBM Bob modes and skills. These resources are
not vendored into this repository and should not be copied into Apache-2.0
repository content unless the applicable license or terms are reviewed first.

Use this file together with:

- [`../../LICENSE_DOCUMENTATION.md`](../../LICENSE_DOCUMENTATION.md)
- [`../../THIRD_PARTY_NOTICES.md`](../../THIRD_PARTY_NOTICES.md)
- [`../../CONTENT_PROVENANCE.md`](../../CONTENT_PROVENANCE.md)
- [`KNOWLEDGE_SOURCES.md`](KNOWLEDGE_SOURCES.md)

This is a repository-maintenance aid and not legal advice.

## Usage Rules

1. Treat external references as **conceptual sources** unless a file explicitly
   records copied or adapted content.
2. Cite and link external resources instead of reproducing substantial text.
3. Before copying, adapting, translating, or embedding external material,
   verify the current license, attribution, share-alike, trademark, and
   version requirements.
4. Do not copy proprietary standards text or IBM documentation text into this
   Apache-2.0 repository without a separate permission or terms review.
5. Preserve license notices when packaging runtime dependencies or vendored
   examples.

## External Resource License Map

| Resource | Referenced By | License / Terms Posture | Repository Rule |
| --- | --- | --- | --- |
| IBM Bob documentation | SDD, architecture review, AI Integration and Usage | IBM website and product documentation terms apply; not treated as open-source content here | Link and cite only. Do not copy substantive text into this repository. |
| IBM Think: Spec-driven development | SDD and AI Integration and Usage | IBM website terms apply | Link and cite only. Paraphrase sparingly and verify current text before product claims. |
| IBM Bob launch announcement | SDD and AI Integration and Usage | IBM newsroom/site terms apply | Link and cite only. Use as product-positioning context, not as redistributable source text. |
| NIST AI Risk Management Framework | AI Integration and Usage | NIST Technical Series/publication terms; many NIST-authored works are not subject to U.S. copyright, with citation and foreign-rights notes | Cite the official NIST publication. Check for third-party authored material before copying. |
| NIST Generative AI Profile | AI Integration and Usage | NIST Technical Series/publication terms; verify publication status and citation | Cite the official NIST publication. Check version/date before compliance-facing guidance. |
| NIST Secure Software Development Framework | Security review, SDD, AI Integration and Usage | NIST publication terms; verify current SP 800-218 status and citation | Cite and link. Avoid embedding long normative text. |
| OWASP Top 10 | Security review | OWASP project material commonly uses Creative Commons Attribution-ShareAlike terms; verify the specific project/version | Link and cite. If adapting text/checklists, preserve attribution and assess share-alike obligations. |
| OWASP ASVS | Security review | OWASP ASVS is distributed under Creative Commons Attribution-ShareAlike terms; verify current version/license | Link and cite. If adapting requirements text, preserve attribution and assess share-alike obligations. |
| OWASP Threat Modeling | Security review | OWASP site/project terms vary by project; verify the specific page or repository | Link and cite. Avoid copying process text without license review. |
| OWASP Top 10 for Large Language Model Applications | AI Integration and Usage | Project repository states Creative Commons Attribution-ShareAlike 4.0 International | Link and cite. If adapting LLM risk text, preserve attribution and assess share-alike obligations. |
| ISO/IEC/IEEE 29148 | Requirements management and SDD | Copyrighted standard sold/licensed by standards bodies | Cite only. Do not reproduce standard text or tables. |
| IEEE 830 historical SRS guidance | Requirements management | Copyrighted IEEE standard/history; verify source before use | Cite only. Do not reproduce standard text. |
| IREB CPRE | Requirements management | IREB materials have their own terms; verify before copying | Link and cite. Use only high-level terminology unless license permits more. |
| SWEBOK | SDLC and software engineering framing | IEEE Computer Society material; terms vary by edition/access path | Cite only. Do not copy body text into repository docs. |
| C4 Model | Architecture review and documentation review | Official C4 website and example diagrams are licensed CC BY 4.0 | Link and cite. If adapting examples/diagrams, provide attribution and change notices. |
| arc42 | Architecture review and documentation review | arc42 template is licensed CC BY-SA 4.0 | Link and cite. If adapting template text, provide attribution and assess share-alike obligations. |
| Architecture Decision Records | Architecture review and documentation review | ADR resources vary by source; adr.github.io is an index of community material | Link to specific ADR sources. Verify license before copying templates. |
| The Twelve-Factor App | 12-factor review | Current public repository indicates CC BY 4.0 for manifesto content | Link and cite. If adapting text, provide attribution and change notices. |
| GitHub REST issues API documentation | GitHub Issue Generator | GitHub Docs content repository documents CC BY 4.0 for documentation/content folders, with GitHub terms also applying | Link and cite. Avoid copying large sections; preserve attribution when adapting. |
| GitHub dependency graph and SBOM export documentation | Documentation Review and license/provenance review | GitHub Docs content repository documents CC BY 4.0 for documentation/content folders, with GitHub terms also applying | Link and cite. Use as evidence for available GitHub SBOM export capability; verify current behavior before release claims. |
| SPDX specifications | Documentation Review and license/provenance review | SPDX specifications are open standards with Linux Foundation/SPDX project license terms; verify the specific version and page before copying text | Link and cite. Use SPDX terms and identifiers without reproducing long specification text. |
| CycloneDX specifications | Documentation Review and license/provenance review | CycloneDX is an OWASP project; specification and site terms should be verified for the exact page/version | Link and cite. Use as an SBOM evidence model and avoid embedding long specification text. |
| npm registry/package metadata | Documentation Review, GitHub Issue Generator runtime dependency review | npm package metadata and registry terms apply; package license fields are package-provided evidence, not legal determinations | Use direct metadata as point-in-time evidence. Regenerate snapshots before release or bundling. |
| PyPI project metadata | Documentation Review and Python runtime dependency review | PyPI project metadata and package license fields are package-provided evidence, not legal determinations | Use direct metadata as point-in-time evidence. Regenerate exact-version dependency inventories before bundling Python environments. |
| GitHub MCP server | GitHub Issue Generator and MCP setup | Runtime package license is documented separately in `THIRD_PARTY_NOTICES.md` | Do not vendor without regenerating notices and preserving license text. |

## High-Risk Resource Handling

| Resource Type | Risk | Required Action |
| --- | --- | --- |
| Copyrighted standards | Standards text is not redistributable by default | Cite only; require separate permission before copying. |
| Creative Commons ShareAlike resources | Adapted material may trigger attribution and share-alike obligations | Prefer links and original wording avoidance; record attribution if adapted. |
| Vendor documentation | Product terms may restrict copying or imply trademark requirements | Link and cite only; verify terms for screenshots, logos, or copied text. |
| Runtime packages | Package tree may change over time | Pin versions for reviewed snapshots or regenerate notices before release. |
| AI-assisted content | Similarity/provenance may be questioned during audit | Keep maintainer acceptance, human review, and similarity-scan evidence when available. |

## Release Checklist Additions

Before publishing a release:

1. Confirm that external resources are only linked or cited unless adaptation is
   recorded in `CONTENT_PROVENANCE.md`.
2. Recheck licenses for any external resource whose text, checklist, template,
   diagram, or table was copied or adapted.
3. Regenerate `THIRD_PARTY_NOTICES.md` when `.bob/mcp.json`, Python dependency
   instructions, or script packaging changes.
4. Preserve attribution for any CC BY or CC BY-SA resource that was adapted.
5. Record AI-assisted source-review evidence when substantial generated content
   is added.
