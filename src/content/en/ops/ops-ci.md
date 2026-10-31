---
eyebrow: Ops
title: Ops CI
subtitle: Continuous integration
group: CI/CD and Release Ops
order: 13
summary: "Continuous integration: pipelines that build, test, and scan every code change before it reaches production."
---

Continuous integration automates what happens to new code from the moment a developer commits: each change is compiled, tested, and scanned in a pipeline, to catch problems before they reach production.

## Pipelines

A **pipeline** is a sequence of steps that runs automatically in response to an event (usually a push or a PR).

| Platform         | Where it lives               | Profile                                      | Artifacts                      |
| ------------------ | ------------------------ | ------------------------------------------- | ------------------------------ |
| **GitHub Actions** | Same repo as the code | CI hosted with the code, massive ecosystem | GitHub Packages (npm, Docker)  |
| **GitLab CI**      | With GitLab               | Pipeline in the same system as the repo    | Integrated Package Registry    |
| **Jenkins**        | Self-hosted              | Full control, maturity, on-premise          | Nexus / Artifactory           |

**How to choose:** if the code lives on a platform, the integrated CI is the natural choice (less to maintain); a self-hosted CI is justified by isolation requirements, compliance, or the need for custom runners close to the infrastructure.

- **Artifacts per platform** — the artifact registry is part of the platform, not a separate tool: GitHub Actions publishes to GitHub Packages (images, npm, Maven), GitLab CI to its Package Registry, and a self-hosted CI points at Nexus or Artifactory — container images, in turn, live in the registries covered in [ops-containers](../ops-containers/).

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

## Pipelines as Code

The pipeline is versioned, reviewed in PR, and runs the same locally as in CI — lightweight tools, in Go or Rust, without the JVM of Groovy Jenkinsfiles.

| Tool            | Profile                                                    |
| --------------- | ---------------------------------------------------------- |
| **Dagger**      | Programmable pipelines (Go, Python, TypeScript), every step in a container |
| **Earthly**     | CI builds with Makefile syntax, runnable locally           |
| **Woodpecker CI** | Self-hosted CI in Go, free license (maintained Drone fork) |
| **Tekton**      | Kubernetes-native CI/CD: pipelines as CRDs on the cluster  |

- **Why they exist** — a pipeline tied to a single platform's YAML or to Jenkins' Groovy script isn't portable nor reproducible outside its host; these tools treat the pipeline as real code — versioned, testable, runnable anywhere.
- **How to choose** — GitHub Actions or GitLab CI when the code already lives on that platform; Dagger or Earthly when the pipeline needs to run identically locally and in CI; Woodpecker or Tekton for free self-hosted (Tekton, on Kubernetes).
- **Jenkins today** — still valid for existing on-premise fleets, but its scripting (Groovy Jenkinsfile, JVM) is the legacy path these alternatives replace.

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

> CI turns the human "does this work?" into an objective, repeatable answer for each commit — the branching and PR discipline that feeds each commit is covered in [dev-vcs](../../dev/dev-vcs/). The next link — how it's published and deployed — is covered in [ops-cd](../ops-cd/).
