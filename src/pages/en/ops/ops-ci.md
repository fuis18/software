---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops CI
subtitle: Continuous integration
---

Continuous integration automates what happens to new code from the moment a developer commits: each change is compiled, tested, and scanned in a pipeline, to catch problems before they reach production.

## Pipelines

A **pipeline** is a sequence of steps that runs automatically in response to an event (usually a push or a PR).

| Platform         | Where it lives               | Profile                                      |
| ------------------ | ------------------------ | ------------------------------------------- |
| **GitHub Actions** | Same repo as the code | CI hosted with the code, massive ecosystem |
| **GitLab CI**      | With GitLab               | Pipeline in the same system as the repo    |
| **Jenkins**        | Self-hosted              | Full control, maturity, on-premise          |

**How to choose:** if the code lives on a platform, the integrated CI is the natural choice (less to maintain); a self-hosted CI is justified by isolation requirements, compliance, or the need for custom runners close to the infrastructure.

## Typical phases

| Phase        | What it does                                                     |
| ----------- | ------------------------------------------------------------ |
| **Build**   | Compiles/packages: from code to artifact (image, bundle)  |
| **Test**    | Runs automated tests against the change                 |
| **Scan**    | Security/quality analysis on code and dependencies |
| **Publish** | Pushes the verified artifact to the registry                   |
| **Alert**   | Failure visible and notified if any step doesn't pass             |

- **Reproducible build** — the same commit always produces the same artifact; no surprises between environments.
- **Deploy is not CI** — the step of deploying to production is continuous delivery (see [ops-cd](../ops-cd/)); CI ends with the validated artifact.

## Runner Farm

Pipelines run on **runners**, and "runner farm" is the management of those executors: how many, what size, and where.

| Bias         | What it implies                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| **Autoscale** | Start a runner when there's a queue, shut them down when there isn't — don't pay for idle runners |
| **Types**     | Runners by task: secure mode with isolation vs. powerful runner with GPU           |
| **Security** | The runner runs other people's work: it's decided what it can see and do (secrets)         |

> The pipeline inherits the permissions of whoever triggered it: secrets in protected variables, isolated runners, and never third-party code with access to production credentials.

## Automated Testing in the Pipeline

The pipeline executes tests in levels, from cheapest to most expensive — each level runs before moving to the next:

| **Level**       | **Tools** | **Primary use**                                      |
| --------------- | ---------------- | ------------------------------------------------------ |
| **Unit**        | Vitest / Jest    | Validates isolated functions, hooks, and utilities.         |
| **Integration** | Testing Library  | Verifies interaction between components and UI.        |
| **E2E**         | Playwright       | Simulates complete user flows in real environments. |
| **Automation**  | Stagehand        | AI/script-driven browser automation.    |

**Quality Gates:** Deployment to production is automatically blocked if any test fails, or if code scanning and coverage don't meet the minimum required threshold.

### Stable selectors in E2E

For UI tests not to break with every change, the selector priority is as follows (applies to testing libraries and browser automation):

1. **Roles (ARIA)** — most stable.
2. **Text / labels / placeholders**.
3. **data-testid** — when there's no other option.
4. **CSS selectors** — last resort, they break easily.

> CI turns the human "does this work?" into an objective, repeatable answer for each commit. The next link — how it's published and deployed — is covered in [ops-cd](../ops-cd/).
