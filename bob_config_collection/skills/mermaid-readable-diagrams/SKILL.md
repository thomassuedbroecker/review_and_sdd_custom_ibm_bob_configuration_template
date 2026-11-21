---
name: mermaid-readable-diagrams
description: >-
  Create or fix Mermaid diagrams in Markdown (.md) files so they are human
  readable on GitHub and in print (PDF, A4/Letter, black-and-white). Use this
  whenever the user asks for a diagram, architecture view, sequence, flow, ER
  or state diagram, or edits a ```mermaid block in any .md file, including
  docs/m4-new-product-onboarding.md. Also use it when a diagram is "too small",
  "unreadable", "too wide", "too crowded", or "does not print well". Applies
  to every Mermaid block Bob writes, even when the user does not mention
  readability.
---

# Mermaid Readable Diagrams (GitHub + Print)

## Purpose
Every Mermaid diagram Bob writes in a `.md` file must be readable on screen in
GitHub **and** on a printout, without opening an external tool. This skill
defines one repeatable recipe so diagrams look the same everywhere.

This skill is about *diagram authoring*. It does not replace
`sdd-documentation-review` (which reviews completeness of documentation).
The Mermaid diagrams in
[`docs/m4-new-product-onboarding.md`](../../../docs/m4-new-product-onboarding.md)
and [`docs/rules-and-agents.md`](../../../docs/rules-and-agents.md) are the
reference examples in this repository.

## When to Use
- Adding a new diagram to any `.md` file.
- Reviewing or repairing an existing diagram that is crowded, tiny, or wide.
- Preparing a document for PDF export or printing.

## Hard Rules (apply to every diagram)

### 1. One message per diagram, small size
- Maximum **about 12 nodes** (flowchart), **about 6 participants and 15
  messages** (sequence), **about 8 entities** (ER). If more is needed, split
  into two diagrams (`6a`, `6b`) and say in one sentence how they connect.
- Labels: at most 3 short lines; one line is around 30 characters. Use
  `<br/>` for line breaks. Put detail into a table below the diagram, not
  into the node.
- Give every diagram a numbered heading (`## 4. Graph data model (static)`),
  and one sentence before it stating what question it answers.

### 2. Always start with an init line (large font, spacing)
The first line in the block sets theme `base` and a large font. Use the
presets below; they are proven to render on GitHub.

Flowchart:
```text
%%{init: {"theme": "base", "themeVariables": {"fontSize": "20px", "lineColor": "#566573"}, "flowchart": {"nodeSpacing": 40, "rankSpacing": 60, "padding": 14, "wrappingWidth": 300}}}%%
```

Sequence:
```text
%%{init: {"theme": "base", "themeVariables": {"fontSize": "18px", "lineColor": "#566573"}, "sequence": {"mirrorActors": false, "actorMargin": 20, "messageMargin": 44, "width": 210, "height": 60, "wrap": true, "noteMargin": 14, "messageFontSize": 17, "actorFontSize": 17, "noteFontSize": 17}}}%%
```

ER / state / class / other:
```text
%%{init: {"theme": "base", "themeVariables": {"fontSize": "20px", "lineColor": "#566573"}}}%%
```

### 3. Direction fits the page
- Default to **`flowchart TD`** (portrait page, GitHub column width).
- Use `LR` only for **at most 5 nodes in a row**; a long `LR` chain shrinks
  to unreadable text when scaled to page width.
- A diagram must be readable at about **16 cm / 6 inch width**. If it needs
  horizontal scrolling on GitHub, it will not print: split or switch to TD.
- Use `subgraph` for at most 3 groups, each with a short title.

### 4. Colour must survive black-and-white printing
- Never use colour as the *only* carrier of meaning. Combine **fill + border
  style + label text**. Standard status classes (same as the reference file):

```text
classDef done fill:#d5f5e3,stroke:#1e8449,stroke-width:2px,color:#000;
classDef prep fill:#fcf3cf,stroke:#b7950b,stroke-width:2px,color:#000;
classDef plan fill:#f2f3f4,stroke:#7f8c8d,stroke-width:2px,stroke-dasharray:6 4,color:#000;
```

- Light pastel fills with **`color:#000`** on every class, so text is black
  in GitHub light mode, dark mode and print. Do not use dark fills.
- Distinguish states with **border style** (solid / dashed / double line
  width) so grey-scale prints still differ.
- Explain the colour code in a "How to read" legend directly in the
  document (one bullet per class), not only in the diagram.
- Differentiate edge meaning by line style, not colour: `-->` normal call,
  `==>` main / secured path, `-.->` optional or asynchronous.

### 5. Syntax that renders reliably on GitHub
- Quote every label that contains spaces or punctuation:
  `id["Label with (parens)"]`. Use short ASCII ids (`mcp`, `neo`), no spaces.
- Edge labels in quotes: `A -->|"HTTPS + bearer"| B`.
- Avoid: `click`, tooltips, Font Awesome icons, `<img>`, `<b>`/HTML other
  than `<br/>`, emoji, very new beta diagram types (`architecture-beta`,
  `block-beta`, `packet-beta`), and `%%` comments inside labels. GitHub's
  Mermaid version lags behind the latest release.
- Use `autonumber` in sequence diagrams so the text can refer to "step 5".
- Use `Note over A,B:` sparingly; keep notes to one or two lines.
- Prefer `flowchart` over legacy `graph`. Use `stateDiagram-v2`.
- No trailing spaces or tabs in the block; indent with 4 spaces.

### 6. Always add a text companion
Mermaid is not accessible and not searchable in print. After each diagram:
- A **table** (state, meaning, source) or a **bullet list** of key
  rules / "static dependency rules", and
- If the diagram shows a mix of states, a status table with a **date**
  (`State 2026-11-04`).
- Optional one-line alt text as a sentence before the block:
  "Figure 3: The rule engine does not import the graph or the LLM."

### 7. Fenced block format
- Use exactly ```` ```mermaid ```` (lowercase, no attributes) and close it.
- Leave one blank line before and after the block.
- No blank first line inside the block; the `%%{init ...}%%` line comes first.

## Workflow

1. **Classify** the content: static structure (flowchart / ER), dynamic
   behaviour (sequence), lifecycle (stateDiagram-v2), or decision logic
   (flowchart with diamonds). Choose the simplest type that answers the
   question.
2. **Reduce** to the 5-12 nodes that carry the message. Move the rest to a
   table or a second diagram.
3. **Write** the block with the init preset, TD direction, quoted labels,
   status classes if states are involved.
4. **Add** heading number, one-line question, text companion, legend.
5. **Self-check** with the checklist below. If a check fails, fix before
   delivering.
6. **Validate syntax** if tooling is available: run
   `npx -y @mermaid-js/mermaid-cli -i <file>.md -o /tmp/check.md` (renders
   each block and fails on syntax errors). If it cannot run offline, say
   so and list which blocks were not machine-checked. Never claim a diagram
   "renders" without either running this or stating it was not verified.
7. **Update the index** (the table of diagrams at the top of the file) when
   adding, splitting or renumbering diagrams.

## Self-Check Checklist
- [ ] First line is a `%%{init ...}%%` preset with font size >= 18px
- [ ] <= 12 nodes (or <= 6 participants for sequence)
- [ ] Direction `TD`, or `LR` with <= 5 nodes in a row
- [ ] All labels quoted; ids short ASCII; no unsupported features
- [ ] Every status class has `color:#000` and a light fill
- [ ] Meaning is not colour-only (border style / label text differs)
- [ ] Heading number + question sentence + legend present
- [ ] Text companion (table or rules) below the diagram
- [ ] Status tables carry a date
- [ ] Block is closed; blank line before and after
- [ ] Syntax validated, or "not machine-validated" stated

## Anti-Patterns (fix on sight)
| Symptom | Fix |
|---|---|
| 20+ nodes in one block | Split by view (context / runtime / data) |
| Long `LR` chain, tiny text on GitHub | Switch to `TD`, or split |
| Red/green only distinction | Add dashed vs solid border and a label word (e.g. "planned") |
| Dark fills, white text | Light fill + `color:#000` |
| Paragraph text inside nodes | Short label; details into table |
| Unquoted labels with `()`, `:`, `/` | Quote: `id["a/b (c)"]` |
| No init line (default 16px font) | Add the preset |
| Diagram with no explanation | Add question sentence and text companion |
| `graph` legacy keyword | Use `flowchart` |

## Output Format
When delivering a diagram, respond with:

1. The Markdown section (heading, question sentence, mermaid block, legend,
   text companion).
2. A short note: diagram type chosen and why, node count, whether syntax
   was machine-validated.
3. If the original had to be split or simplified, say what moved where.

## Constraints
- Do not add external image files or non-Mermaid tooling unless the user
  asks; the diagram source must stay in the `.md` file.
- Do not change the meaning of existing diagrams while restyling; if
  content is wrong, report it instead of silently altering it.
- Follow project rules from `AGENTS.md` (traceability IDs such as REQ-/NFR-
  may appear in the text companion, not as long node labels).

## References
- Mermaid documentation, configuration and directives (init):
  https://mermaid.js.org/config/directives.html
- Mermaid theming and `themeVariables`:
  https://mermaid.js.org/config/theming.html
- Mermaid flowchart, sequence, ER, state syntax:
  https://mermaid.js.org/intro/syntax-reference.html
- GitHub Docs, "Creating diagrams" (Mermaid in Markdown):
  https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams
- WCAG 2.2, 1.4.1 Use of Color (colour not the only means of conveying
  information): https://www.w3.org/TR/WCAG22/#use-of-color
- Reference implementation in this repo:
  [`docs/m4-new-product-onboarding.md`](../../../docs/m4-new-product-onboarding.md)
