---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec Threat Concepts
subtitle: Security conceptual frameworks
---

Before tools come frameworks: risk lists, attack models, and methodologies for thinking about security with structure instead of intuition. A scanner tells you _what_ it found; a framework tells you _where_ to look and *what categories you can't forget to cover*. That's why it's worth internalizing them before touching any specific tool.

## OWASP

The reference catalog of web application security risks, maintained by the OWASP community (Open Worldwide Application Security Project) and reviewed every few years to reflect how real-world attacks evolve.

| Resource       | What it is                                                  |
| -------------- | ----------------------------------------------------------- |
| **OWASP Top 10** | The 10 most critical web risks, reviewed periodically     |
| **OWASP ASVS**   | Detailed checklist of application security requirements   |

- **Top 10:** It's the industry's common vocabulary of categories: each one groups many concrete variants.
- **ASVS (Application Security Verification Standard):** It's the practical guide for auditing an application: instead of asking "is it secure?", it lets you go requirement by requirement and mark pass/fail.
- The details of the catalog and practice resources live at [sec-roadmap](../sec-roadmap/).

## MITRE ATT&CK

The catalog of tactics and techniques used by real attackers, organized by phases of the attack chain (the "kill chain"). Unlike OWASP's Top 10, which focuses on web application vulnerabilities, ATT&CK covers the full attack lifecycle, including what the attacker does _after_ gaining access.

- **Tactics** — the attacker's _objective_ at each phase: initial access (how they get in for the first time), execution (how they run code on the system), persistence (how they ensure they keep access even if the machine reboots), privilege escalation (how they go from a limited user to an administrator), lateral movement (how they jump from one machine to another within the network), exfiltration (how they steal data), etc.
- **Techniques** — the _how_ of each tactic: phishing to achieve initial access, exploitation of a known vulnerability, abuse of previously stolen valid credentials. Each technique has an ID (e.g., T1566 for phishing) that serves as a standard reference across tools and reports.
- **What it's for** — it provides a common language between offense and defense: defensive teams (blue team) map their detection rules against the catalog to see what techniques are _not_ covered, and offensive teams (red team) use it to plan attack simulations with full coverage instead of always testing the same things.

## Threat Modeling (STRIDE)

The method for anticipating threats _before_ the system or feature exists, instead of waiting for something to happen and then reacting. In practice, you draw a simple diagram of the system's components and how data flows between them (user → API → database, for example), and for each arrow in the diagram you ask: what could go wrong here?

**STRIDE** (created at Microsoft) provides a checklist of six threat categories, each associated with the security property it breaks:

| Letter | Threat               | What it violates      | Typical example                                                    |
| ------ | -------------------- | --------------------- | ------------------------------------------------------------------ |
| S      | Spoofing             | Authenticity          | Someone impersonates another user or service                        |
| T      | Tampering            | Integrity             | Modifying data in transit or in the database                       |
| R      | Repudiation          | Non-repudiation (audit) | A user denies having performed an action and there's no log to disprove it |
| I      | Information disclosure | Confidentiality     | Data leaks to someone who shouldn't see it                         |
| D      | Denial of Service    | Availability          | The system stops responding due to overload or attack              |
| E      | Elevation of privilege | Authorization       | A regular user manages to execute administrator actions            |

The idea is to walk through each component and data flow in the diagram against all six letters: not all apply every time, but forcing the question prevents the blind spot of "it never occurred to me to think about that."

### Threat modeling for DevOps

The software pipeline (CI/CD, registries, dependencies) is also an attack surface, and it's modeled with the same logic as the app: what components are there, how do code and secrets flow between them, and what can go wrong at each step?

- **Registry attack** — someone compromises the image registry (through stolen credentials or a vulnerability) and publishes a malicious image with the same name/tag used in production, so the next deploy pulls it without anyone noticing. Mitigation: image signing (to verify the image comes from where it claims) and image scanning (to detect malware or vulnerabilities before deploying), see [sec-supplychain](../sec-supplychain/).
- **Compromised pipeline** — an attacker who gains access to the CI/CD system can inject code or steal secrets (API keys, deploy credentials) into any future build, without touching the code repository itself. It's an attractive target because a single compromised pipeline affects all projects that pass through it. Mitigation: minimal permissions on the runner (the pipeline can only access what's strictly necessary), protected secrets (not stored in plaintext or in logs), and review of [ops-ci](../../ops/ops-ci/).
- **Malicious dependency** — a legitimate dependency (an npm, pip, etc. library) is replaced by a compromised version that steals secrets or installs a backdoor; this is a supply chain attack, because the attack isn't direct on your code but on something your code depends on and blindly trusts. Mitigation: SBOM (Software Bill of Materials, an inventory of what dependencies and exact versions the project uses) and dependency scanning against known vulnerability databases, see [sec-supplychain](../sec-supplychain/).

## Secrets Management

Secrets (tokens, passwords, API keys, certificates) don't get pasted into code or configuration manifests — they're managed as a separate resource with their own lifecycle and access control.

- **Never in git** — commits, repos, and logs are forever, even if the file is later deleted: git history preserves previous versions, and a repo may have been cloned by third parties before the fix. So the rule isn't "delete it quickly" but: a secret that has been uploaded once must be considered compromised and rotated (generate a new one and invalidate the old one), not just removed from the code.
- **Vault / secrets managers** — tools (like HashiCorp Vault, AWS Secrets Manager, etc.) where the secret is stored encrypted at rest and injected at runtime directly to the application that needs it, without being written in any configuration file. They also keep an audit trail of who read each secret and when, which is key for investigating an incident. In Kubernetes, the native equivalent is the Secrets layer combined with RBAC (to control which pods and users can read each secret) — see [ops-kubernetes](../../ops/ops-kubernetes/).

> Frameworks aren't decorative theory: they're the difference between "security by intuition" and "security by coverage" — knowing what attack categories exist lets you actively search for the ones that are missing, instead of limiting yourself to the ones already seen or the ones a scanner flagged by default.
