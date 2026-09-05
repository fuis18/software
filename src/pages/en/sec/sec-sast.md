---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec SAST
subtitle: Static code analysis and quality
---

Static analysis (SAST, Static Application Security Testing) reviews **source code without executing it**: it finds vulnerabilities, bugs, and bad practices before the software is built — the earliest link in [sec-supplychain](../sec-supplychain/).

## SonarQube

The reference platform for static analysis: combines code quality and security in a single continuous evaluation.

| Concept         | What it does                                                        |
| --------------- | ------------------------------------------------------------------- |
| **SonarQube**   | Server that analyzes code and accumulates metrics per project       |
| **Quality Gate**| Target threshold: the pipeline fails if the code doesn't meet it    |
| **SonarLint**   | IDE extension that applies the same rules while you code            |

- **What it analyzes** — bugs, vulnerabilities, code smells, duplication, and test coverage, in over 30 languages.
- **How it works** — the pipeline runs `sonar-scanner` in the Scan phase of [ops-ci](../../ops/ops-ci/); results are uploaded to the server, which compares against the previous version and decides if the Quality Gate passes.
- **Quality Gates as policy** — "nothing gets merged with critical vulnerabilities or decreasing coverage" stops being a verbal agreement and becomes an automatic blocker.
- **Managed alternative** — SonarCloud offers the same SaaS service for public and open source repos.

## Other Tools

| Tool        | What it does                                                          |
| ----------- | --------------------------------------------------------------------- |
| **Semgrep** | Simple rules on code patterns, fast and easy to extend               |
| **CodeQL**  | SQL-like queries on code treated as a database                        |

- **Semgrep** defines readable rules (pattern → alert) without understanding the full compiler: ideal for writing custom rules for project-specific dangerous patterns.
- **CodeQL** (GitHub) converts code into a queryable database: lets you search for variants of the same vulnerability across the entire repository with a single query.

## DAST: The Dynamic Counterpart

SAST looks at code; DAST (Dynamic AST) attacks the application **while running**: it sends real payloads against a deployed instance and observes the responses.

- **OWASP ZAP** in headless mode or Burp Suite Enterprise are the DAST standards; they run against the staging environment within the pipeline.
- **Complement, not replacement** — SAST finds where the vulnerable line of code is; DAST confirms it's exploitable from the outside. The offensive vocabulary of both is in [sec-vulnerabilities](../sec-vulnerabilities/).

> The natural progression: SonarLint in the IDE → SonarQube/Semgrep on every PR → image scanning with Trivy ([sec-supplychain](../sec-supplychain/)) → DAST against staging. Each layer catches what the previous one missed.
