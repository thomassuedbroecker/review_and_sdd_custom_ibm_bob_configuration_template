# Security & Threat Modeling Review Skill

## Purpose
Identify security gaps, potential attack vectors, and provide actionable security recommendations.

## Expertise Areas
- OWASP Top 10 (2025 edition) vulnerabilities
- STRIDE threat modeling (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)
- Authentication and authorization mechanisms
- Data protection and encryption
- Network security and segmentation
- Compliance requirements (GDPR, HIPAA, PCI-DSS, SOC2, ISO 27001)
- Security testing and penetration testing
- Secure coding practices
- Zero Trust Architecture

## Context Efficiency & Task Handoff

Apply these rules whenever you use this skill, so the task stays within a small,
focused context:

- **Resume from a handoff first.** If `task-handoff.md` exists in the workspace
  root or in the target repository (`repos/<name>/`), read it before anything
  else, continue from its "Next steps", and do not redo work listed under "Done".
- **Load only what you need.** Read this skill once per task and do not copy it
  into outputs. Search before reading, read only the relevant file ranges, and
  skip generated or vendored content (`dist/`, `node_modules/`, lock files,
  binaries, large logs) unless it is the subject of the task.
- **Keep evidence compact.** Cite findings as `path:line` with a one-line
  excerpt instead of quoting whole files, diffs, or command output.
- **Parallelize independent work.** When the scope splits into independent
  parts (components, repositories, features, or review areas), delegate them as
  parallel subtasks where the tool supports it. Give each subtask a
  self-contained brief: scope, skill file to read, output file, and return
  format (a short summary of findings, not raw evidence). Merge only the
  returned summaries.
- **Hand off instead of overflowing.** When the work is too large for one
  context, is split into subtasks, or ends unfinished, create or update
  `task-handoff.md` (keep it under ~60 lines; it replaces conversation history
  for the next task). Writing the handoff file is allowed in read-only reviews;
  never edit the reviewed code.

```markdown
# Task Handoff
- Goal and scope:
- SDLC phase, mode, skills:
- Done (output files, evidence refs):
- Open items and blockers:
- Decisions and assumptions:
- Next steps (ordered):
```

## Review Process

### 1. Authentication & Authorization
- How are users authenticated?
- What authentication mechanisms are used (OAuth, SAML, JWT, etc.)?
- How are passwords/secrets stored and managed?
- Is multi-factor authentication (MFA) implemented?
- How is authorization enforced (RBAC, ABAC, etc.)?
- Are there proper session management controls?

### 2. Data Protection
- What data is considered sensitive?
- How is data encrypted at rest?
- How is data encrypted in transit (TLS/SSL)?
- Are encryption keys properly managed?
- Is there data masking/tokenization for sensitive data?
- How is data backup secured?
- What is the data retention policy?

### 3. Network Security
- What is the network architecture?
- Are there proper network segmentation and isolation?
- Are firewalls and security groups configured correctly?
- Is there a DMZ for public-facing services?
- How is internal vs. external traffic controlled?
- Are there intrusion detection/prevention systems?

### 4. STRIDE Threat Modeling
Analyze each threat category:

**Spoofing Identity**
- Can attackers impersonate legitimate users?
- Are there weak authentication mechanisms?
- Is there proper identity verification?

**Tampering with Data**
- Can data be modified in transit or at rest?
- Are there integrity checks?
- Is there audit logging for data changes?

**Repudiation**
- Can users deny performing actions?
- Is there comprehensive audit logging?
- Are logs tamper-proof?

**Information Disclosure**
- Can sensitive information be exposed?
- Are there proper access controls?
- Is there data leakage through logs or errors?

**Denial of Service**
- Can the system be overwhelmed?
- Are there rate limiting and throttling?
- Is there DDoS protection?

**Elevation of Privilege**
- Can users gain unauthorized access?
- Are there privilege escalation vulnerabilities?
- Is the principle of least privilege enforced?

### 5. OWASP Top 10 Assessment (2025 Edition)
Check for:
1. **A01 Broken Access Control**: Unauthorized access to resources; now also covers SSRF (unvalidated server-side request targets, CWE-918)
2. **A02 Security Misconfiguration**: Default configs, unnecessary features, missing hardening
3. **A03 Software Supply Chain Failures**: Vulnerable or compromised dependencies, build tools, and update/distribution channels (expands the former "Vulnerable Components")
4. **A04 Cryptographic Failures**: Weak encryption, exposed secrets
5. **A05 Injection**: SQL, NoSQL, OS command injection
6. **A06 Insecure Design**: Missing security controls in design
7. **A07 Authentication Failures**: Weak authentication mechanisms
8. **A08 Software or Data Integrity Failures**: Unsigned code, insecure CI/CD
9. **A09 Security Logging and Alerting Failures**: Insufficient logging and missing alerting
10. **A10 Mishandling of Exceptional Conditions**: Improper error and exception handling, fail-open behavior, crash-driven vulnerabilities (new in 2025)

Reference: OWASP Top 10:2025 — <https://top10.owasp.org/2025>. SSRF is no
longer a standalone category; it is mapped under A01 Broken Access Control.

### 6. Compliance Requirements
Assess compliance with:
- **GDPR**: Data privacy, consent, right to be forgotten
- **HIPAA**: Healthcare data protection
- **PCI-DSS**: Payment card data security
- **SOC2**: Security, availability, confidentiality
- **ISO 27001**: Information security management

### 7. Security Testing
- Are there automated security scans (SAST, DAST)?
- Is there regular penetration testing?
- Are there security code reviews?
- Is there dependency vulnerability scanning?
- Are there security regression tests?

## Output Format

### ✅ Achieved
- List security controls in place
- Highlight strong authentication/authorization
- Note compliance requirements met
- Identify good security practices

### ⚠️ Concerns
- Potential security gaps
- Areas needing hardening
- Compliance risks
- Security technical debt

### ❌ Not Achieved
- Critical security vulnerabilities
- Missing security controls
- Unaddressed threat vectors
- Compliance violations

### 🔒 Threat Model Summary
| Threat Category | Likelihood | Impact | Current Mitigation | Status |
|----------------|-----------|--------|-------------------|--------|
| Spoofing | High/Med/Low | High/Med/Low | [Description] | ✅/⚠️/❌ |
| Tampering | High/Med/Low | High/Med/Low | [Description] | ✅/⚠️/❌ |
| Repudiation | High/Med/Low | High/Med/Low | [Description] | ✅/⚠️/❌ |
| Info Disclosure | High/Med/Low | High/Med/Low | [Description] | ✅/⚠️/❌ |
| DoS | High/Med/Low | High/Med/Low | [Description] | ✅/⚠️/❌ |
| Privilege Escalation | High/Med/Low | High/Med/Low | [Description] | ✅/⚠️/❌ |

### 💡 Recommendations
For each security issue:
- **Priority**: Critical/High/Medium/Low
- **Attack Vector**: How the vulnerability can be exploited
- **Impact**: Potential damage if exploited
- **Mitigation**: Specific remediation steps
- **Effort**: Implementation complexity
- **References**: OWASP, CWE, CVE numbers

## Key Questions to Answer
1. What are the most critical security risks?
2. Are authentication and authorization robust?
3. Is sensitive data properly protected?
4. Are there compliance gaps?
5. Is the system resilient to common attacks?
6. Are security controls tested regularly?
7. Is there a security incident response plan?

## Security Checklist
- [ ] Strong authentication mechanisms
- [ ] Proper authorization controls
- [ ] Data encryption at rest and in transit
- [ ] Secure secret management
- [ ] Input validation and sanitization
- [ ] Output encoding
- [ ] Secure session management
- [ ] Comprehensive audit logging
- [ ] Rate limiting and throttling
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Dependency vulnerability scanning
- [ ] Dependency versions pinned via lock files
- [ ] SBOM available for releases (SPDX or CycloneDX)
- [ ] Build and CI/CD pipeline integrity protected (signed artifacts, least-privilege tokens)
- [ ] Error and exception handling fails securely (no fail-open paths, no sensitive data in error output)
- [ ] Regular security testing
- [ ] Incident response plan
- [ ] Security training for developers