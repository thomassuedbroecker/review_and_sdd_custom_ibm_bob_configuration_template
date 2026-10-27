# AI-Generated Code License Reference

Use this reference only when reviewing AI-generated or AI-assisted code, AI provenance evidence, or user-provided resources about AI copyright and licensing.

## Source Trustworthiness

Classify sources before relying on them:

| Source type | Trust level | Use |
| --- | --- | --- |
| Statutes, regulations, court opinions, and official government guidance | High | Use for binding or official legal baseline, with jurisdiction and date. |
| Official standards and compliance specifications, such as SPDX and CycloneDX | High | Use for software supply-chain evidence and machine-readable compliance expectations. |
| Vendor documentation for AI tools, code-reference features, terms, or indemnity | Medium-High | Use for tool behavior and contractual controls; do not generalize beyond that vendor/version. |
| Peer-reviewed academic papers | Medium-High | Use for empirical risk signals, not legal conclusions. |
| Preprints and SSRN/arXiv papers | Medium | Useful for emerging evidence; state that they may not be peer-reviewed or final. |
| Law-firm articles and practitioner commentary | Medium | Useful secondary analysis; not binding law. |
| Blogs, news, Reddit, and general web summaries | Low-Medium | Use only for orientation unless corroborated by stronger sources. |

## Current Legal Baseline To Phrase Carefully

- United States: official Copyright Office guidance and court decisions require human authorship for copyright protection. Purely autonomous AI output may be uncopyrightable, but AI-assisted works can contain protectable human-authored selection, arrangement, modification, or creative expression. Evaluate repository evidence of human contribution; do not assume from tool use alone.
- European Union: copyright originality generally turns on the author's own intellectual creation. The EU AI Act imposes obligations on general-purpose AI model providers, including copyright-policy and training-content-summary obligations, but those provider duties do not by themselves prove that downstream application code is compliant or non-compliant.
- Open Source AI: as of June 7, 2026, the OSI Open Source AI Definition 1.0 is the primary open-source-community anchor. Treat "open weights", "source available", and "open model" as marketing or access terms until the evidence shows modifiable data information, code, parameters, and terms that grant use, study, modification, and sharing freedoms.
- Training-data and fair-use/TDM questions are evolving. Treat claims about model training legality as jurisdiction-specific and unresolved unless backed by a binding authority.
- AI-generated code does not automatically create a derivative work of training data. The practical repository risk is strongest when the output is copied, near-verbatim, substantially similar, or traceable to licensed source code whose obligations were not followed.

## Evidence To Inspect In Repositories

- AI-use policy, engineering standards, or contribution guidance covering coding assistants.
- Prompt logs, AI review notes, accepted-suggestion records, or generated-code declarations.
- Similarity or public-code-match evidence from tools such as GitHub Copilot code referencing, license scanners, or source-code search.
- Human authorship evidence: design notes, edits, tests, review comments, commit history, and selection/arrangement decisions.
- AI tool terms evidence: output ownership, IP indemnity, public-code matching settings, data retention/training opt-out, and enterprise controls.
- SBOM, SPDX, third-party notices, and dependency manifests for generated or AI-assisted components.
- Model/data evidence when AI artifacts are shipped: model cards, dataset cards, data provenance, weight/license terms, eval data licenses, prompt/template licenses, embedding-store source data, and generated asset rights.

## Recommended Finding Language

Use cautious, evidence-bound language:

- Prefer: "The repository lacks evidence that AI-assisted code was reviewed for public-code similarity or license obligations."
- Prefer: "If generated code closely matches GPL or other restricted source code, additional obligations may apply depending on the copied expression, license, use, and jurisdiction."
- Avoid: "All AI-generated code is uncopyrightable."
- Avoid: "AI-generated snippets automatically force the project under the licenses of model training data."
- Avoid: "Copyleft obligations apply solely because a coding assistant was used."

## Law / Standard Mapping Output

When requested, map each issue as:

| Law / Standard / Guidance | Source Type | Repository File Section | Evidence | Risk Interpretation | Confidence |
| --- | --- | --- | --- | --- | --- |

Include source URLs in the report and mark the assessment as AI-assisted, not legal advice.

## Useful Source Anchors

- U.S. Copyright Office AI initiative and registration guidance: https://www.copyright.gov/ai/
- U.S. Copyright Office copyright basics and human authorship FAQ: https://copyright.gov/what-is-copyright/
- U.S. Copyright Act, 17 U.S.C. section 106: https://www.law.cornell.edu/uscode/text/17/106
- EU AI Act, Regulation (EU) 2024/1689: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- EU AI Act Service Desk and GPAI guidance: https://ai-act-service-desk.ec.europa.eu/
- OSI Open Source AI Definition 1.0: https://opensource.org/ai/open-source-ai-definition
- European Parliament, Generative AI and Copyright study: https://www.europarl.europa.eu/thinktank/en/document/IUST_STU(2025)774095
- SPDX License List: https://spdx.org/licenses
- SPDX specifications: https://spdx.dev/use/specifications/
- CycloneDX specification overview: https://cyclonedx.org/specification/overview
- GitHub SBOM export API: https://docs.github.com/en/rest/dependency-graph/sboms
- GitHub Copilot code referencing documentation: https://docs.github.com/en/copilot
- LiCoEval paper: https://arxiv.org/abs/2408.02487
- Developer perspectives paper: https://arxiv.org/abs/2411.10877

## User-Provided Resource Assessment Pattern

When a user supplies a resource list, answer with:

- Trusted: official statutes/regulations, courts, government agencies, standards bodies.
- Useful but secondary: law-firm articles, vendor docs, academic studies.
- Needs caution: broad claims without source, claims that convert risk into certainty, claims that ignore jurisdiction, or claims that say AI output automatically imports all training-data licenses.
