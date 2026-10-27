# Jurisdiction and Country Impact Reference

Use this reference when a license review involves countries, international
distribution, public-sector procurement, AI/copyright questions, cross-border
contributors, or country-specific business impact.

This is a review aid, not legal advice. Laws, official policies, and court
positions change. Verify current official sources before making country-level
claims.

## Source Priority

| Source Type | Trust Level | Use |
| --- | --- | --- |
| Statutes, regulations, treaties, court decisions, government IP offices | High | Binding or official country baseline, penalties, remedies, and enforcement authority. |
| WIPO Lex and WIPO treaty/resources pages | High | Cross-country law discovery, official-law navigation, and selected IP judgments. |
| EU Commission, national procurement, or national open-source policy pages | High for policy | Public-sector and government-policy impact. |
| OSI, SPDX, OpenChain, CycloneDX | High for open-source practice | License identifiers, license approval, SBOM, and compliance process. |
| Vendor docs and terms | Medium-High | Tool or platform behavior; not a jurisdiction-wide legal rule. |
| Law-firm, consultant, academic, or news sources | Medium | Secondary context only; verify against official sources. |

## Evidence Standard

Country-specific license analysis must identify:

- Country or region.
- Law, regulation, treaty, official guidance, court decision, or policy.
- Source type and URL or citation.
- Date checked.
- Repository trigger, such as distribution, dependency inclusion, source
  delivery, public-sector procurement, AI-generated code, copied code,
  patents, moral rights, export/encryption, data, or model licensing.
- Practical impact on the repository.
- Penalty or remedy exposure, such as injunction, damages, statutory damages,
  legal costs, license termination, distribution stop, procurement exclusion,
  customer contract breach, source-disclosure obligation, or audit failure.
- Confidence level and uncertainty drivers.

If the user asks for penalties, damages, or court decisions, do not answer with
generic risk language alone. State whether available evidence shows a statutory
penalty, civil remedy, criminal exposure, contractual penalty, procurement
consequence, or no specific penalty identified from the reviewed sources.

## Global Baseline

- Software is generally protected by copyright in most countries; WIPO notes
  that computer-program copyright protection is broadly established and
  harmonized by international treaties.
- Open-source licenses operate mainly through copyright permission conditions,
  but country impact can also involve contract law, patent law, moral rights,
  public-sector procurement, consumer protection, export controls, encryption
  controls, data protection, and AI-output ownership.
- Do not assume a U.S.-centric fair-use, patent, or work-for-hire analysis
  applies worldwide.

## Country / Region Impact Matrix

Use this as a starting map. Always verify current law and facts.

| Country / Region | License Topics to Check | Typical Impact on Repository Review | Official Source Anchors |
| --- | --- | --- | --- |
| Global / WIPO member states | Software copyright protection, treaty membership, local IP laws | Establishes whether software rights and license obligations are likely recognized cross-border; use WIPO Lex to find local law. | https://www.wipo.int/en/web/copyright/activities/software, https://www.wipo.int/en/web/wipolex/index |
| United States | Copyright registration, human authorship, fair use, DMCA, software patents, government works, AI-generated content guidance, statutory damages | Strong impact on copyrightability, AI-assisted output claims, public-code similarity risk, patent exposure, injunction/damages analysis, and due-diligence evidence. | https://www.copyright.gov/, https://www.copyright.gov/ai/, https://www.copyright.gov/title17/92chap5.html, https://www.uspto.gov/ |
| European Union | Copyright directives, EUPL, public-sector open-source strategy, AI Act, database rights, GDPR/data licensing interfaces, IP enforcement remedies | Impacts public-sector reuse, EUPL compatibility, AI governance evidence, database/data use, procurement acceptance, injunctions, damages, and costs under national implementations. | https://digital-strategy.ec.europa.eu/en/factpages/eu-open-source-strategy, https://commission.europa.eu/news-and-media/news/commission-adopts-new-rules-open-source-software-distribution-2021-12-08_en, https://eur-lex.europa.eu/eli/reg/2024/1689/oj, https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32004L0048 |
| Germany | EU copyright baseline plus strong moral-rights and author-rights tradition; public-sector open-source policy may apply | Check contributor ownership, employment-created works, public-sector delivery, and attribution/author-rights issues. | Use WIPO Lex and official German ministry or legal gazette sources for current law. |
| France | EU copyright baseline plus author-rights tradition; public-sector reuse and software procurement policy may apply | Check contributor rights, moral rights, public-sector reuse, and attribution handling. | Use WIPO Lex and official French government/IP sources for current law. |
| United Kingdom | UK copyright, CDPA software provisions, database rights, computer-generated works, UK IPO guidance | Impacts ownership, assignment, AI-generated/computer-generated work questions, and customer procurement. | https://www.gov.uk/government/organisations/intellectual-property-office |
| China | Copyright Law, Regulations on Computer Software Protection, registration practices, local publication/enforcement context | Check software copyright ownership, local registration/evidence needs, distribution, localization, and enforcement risk. | https://www.wipo.int/wipolex/edocs/lexdocs/laws/en/cn/cn002en.html, https://wipolex-res.wipo.int/edocs/lexdocs/laws/en/cn/cn070en.html |
| Japan | Copyright Act treatment of programs, exceptions, assignment, AI/data-mining issues, strict local enforcement context | Check program copyright, AI/data-use assumptions, local exception limits, and customer distribution. | Use WIPO Lex and official Japanese government law translation/IP sources for current law. |
| India | Copyright Act treatment of computer programs, assignment rules, procurement and outsourcing contracts | Check contributor/employment assignment, contractor IP chain, SaaS/offshore delivery, and customer audit terms. | Use WIPO Lex and official Indian copyright/government sources for current law. |
| Brazil | Software Protection Law No. 9.609/98, INPI software registration, copyright law, commercialization rules | Check local registration evidence, ownership, localization, and distribution to Brazilian customers or public entities. | https://www.gov.br/inpi/en/services/software/laws-and-regulations |
| Canada | Copyright Act, fair dealing, moral rights, open-government/open-source procurement context | Check attribution, moral rights waiver/assignment, public-sector reuse, and commercial distribution. | Use WIPO Lex and official Canadian IP/copyright sources for current law. |
| Australia | Copyright Act, government procurement, moral rights, encryption/export or data considerations | Check public-sector delivery, assignment, attribution, and software/data bundling. | Use WIPO Lex and official Australian IP/copyright sources for current law. |

## Grill Me Country Questions

Use these when country impact is unclear:

1. Which countries matter: developer location, company location, hosting,
   customers, public-sector buyers, contributors, or redistribution targets?
2. Is the software shipped as source, binary, container, SaaS, SDK, plugin, AI
   model/tool, documentation, or data package?
3. Are contributors employees, contractors, open-source contributors, or
   third-party vendors in different countries?
4. Is the concern copyright ownership, copyleft, attribution, patents,
   trademarks, moral rights, standards text, data/model licensing, AI output,
   export controls, or public procurement?
5. Is this for legal triage, engineering remediation, customer due diligence,
   release approval, or a procurement/security questionnaire?

## Country Impact Output Pattern

```markdown
| Country / Region | Trigger | Official Source Checked | Law / Policy Topic | Likely Impact | Penalty / Remedy Exposure | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| United States | Public GitHub distribution and AI-assisted code | U.S. Copyright Office AI guidance, U.S. Copyright Act remedies | Copyrightability, infringement remedies, AI authorship | Need human authorship/review evidence and public-code similarity checks | Injunctions and damages may be available for infringement; statutory damages depend on registration and facts | Medium |
| European Union | Public-sector reuse and AI workflow | EU Open Source Strategy, EU AI Act, IP Enforcement Directive | Public-sector open source policy, AI governance, IP remedies | Need EUPL/public-sector compatibility review and AI governance evidence | National courts may grant injunctions, damages, evidence preservation, costs, or corrective measures under national law | Medium |
```

## Court Decision / Enforcement Output Pattern

```markdown
| Country / Region | Decision / Enforcement Action | Court / Authority | Date | License / Right | Practical Impact | Relevance to This Repository | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| United States | Jacobsen v. Katzer | U.S. Court of Appeals for the Federal Circuit | 2008 | Artistic License / copyright license conditions | Open-source license conditions can support copyright remedies when breached | Relevant if repository redistributes code under conditional open-source license terms | Medium |
| United States | BusyBox GPL enforcement default judgment against Westinghouse | U.S. District Court / Software Freedom Conservancy reported enforcement | 2010 | GPL / BusyBox copyright | Distribution of non-compliant GPL software can lead to injunction and distribution stop | Relevant if GPL code is distributed without license text or corresponding source | Medium |
| Germany | GPL source and license-text enforcement decisions | German regional courts, verify exact decision before citing | Various | GPL / copyright | Missing GPL license text or corresponding source can support injunctive relief | Relevant if software is distributed in Germany or to German customers with GPL components | Low until exact judgment is verified |
```

## Impact Translation Rules

- Legal impact by country: identify the right at issue, such as copyright,
  contract, patent, moral rights, database rights, public procurement, data
  protection, export/encryption, or AI-specific obligations.
- Penalty and remedy impact by country: distinguish civil remedies, statutory
  damages, criminal penalties, administrative fines, procurement consequences,
  contract penalties, and practical compliance consequences. Do not imply a
  penalty exists without source support.
- Court-decision impact by country: state whether a decision is binding,
  persuasive, fact-specific, settled, default judgment, injunction, settlement,
  or secondary report. Explain why the decision is comparable or not comparable
  to the repository facts.
- Operational impact by country: identify what blocks work, such as source
  delivery, notices, SBOM, contributor assignment, local registration evidence,
  procurement questionnaires, or legal review.
- Business impact by country: identify sales/procurement friction, enterprise
  customer trust, public-sector eligibility, localization obligations, or
  partner-contract risk.
- Security impact by country: identify SBOM, vulnerability disclosure,
  dependency provenance, export/encryption, supply-chain disclosure, or
  government procurement controls.

## Required Caution Language

Use uncertainty language:

- "For this jurisdiction, the repository evidence suggests..."
- "This is a compliance triage finding, not a legal determination."
- "Verify with local counsel before release, procurement submission, or
  enforcement-sensitive action."
- "The country impact depends on distribution model, contract terms, and the
  exact copied/adapted material."
