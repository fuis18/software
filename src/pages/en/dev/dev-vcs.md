---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Dev VCS
subtitle: Version control
---

Git stores the full history of every change in the project and enables parallel work without stepping on each other: every commit is a recoverable snapshot, every branch an isolated flow, and every PR a review gate before merging. Version control is the cross-cutting practice that supports everything else — CI/CD, GitOps, and infrastructure itself versioned as code.

## Git Concepts

- **Commit** — a timeless snapshot of the project with a message, author, and parents; history is immutable and every commit knows where it came from.
- **Branch** — a lightweight pointer to a commit: creating one costs as much as typing its name, and the real cost lies in merging it.
- **Merge vs rebase** — merge preserves the real history as a graph; rebase rewrites commits on top of the new base to leave a linear one.
- **Remote and clones** — the copy of the repo on the forge (origin) is synced with push/pull; every clone is complete, with the entire history.
- **Tags** — mark named points in history (v1.0), the basis of releases and semantic versioning.

## Branching Flows

| Flow             | Structure                                                    | When                                   |
| ---------------- | ------------------------------------------------------------ | -------------------------------------- |
| **Trunk-based**  | everything on trunk, branches shorter than a day, flags      | mature CI, continuous deployment       |
| **GitHub Flow**  | main + one branch per feature + PR                           | the default for web projects           |
| **GitFlow**      | main + develop + release/hotfix branches                     | packaged software released in versions |
| **Release Flow** | stable main + one long-lived branch per release line         | several supported versions in parallel |

- **Trunk-based** — the continuous deployment path: integrate into trunk several times a day and protect unfinished work behind feature flags; requires fast CI and good test coverage.
- **GitHub Flow** — the simple default for teams deploying to production from main: short branch, PR, merge, deploy.
- **GitFlow** — heavy for web products with continuous deployment, still the right fit for libraries or software packaged and distributed by versions.
- **Release Flow** — main never breaks; every supported version has its branch, from which hotfixes are backported.

## Pull Requests

The PR is the integration unit: it proposes the diff, discusses it, triggers the pipeline, and, after approval, gets merged.

- **Code review** — a minimum of one approval and mandatory green checks (tests, quality gates) before merging; review is for catching bugs and sharing context, not policing style.
- **Small PRs** — reviewed in minutes and merged the same day; giant PRs stall and hide bugs.
- **Convention** — the commit message and PR description document the why, and the entire history stays searchable.

## Monorepo vs Polyrepo

| Approach      | Structure                                  | Strong at                                             |
| ------------- | ------------------------------------------ | ----------------------------------------------------- |
| **Monorepo**  | one repo for many services and libraries   | atomic changes, shared tooling and dependencies       |
| **Polyrepo**  | one repo per service                       | independent releases, simple permissions and lifecycles |

- **Monorepo** — a change touching two services is versioned, reviewed, and deployed as a unit; the cost lies in tooling (incremental builds, path-based CI).
- **Polyrepo** — each service has its own pace and pipeline; the cost lies in coordinating cross-repo changes (versioning dependencies by hand).

## Forges

| Forge               | Model                                   | Profile                                                     |
| ------------------- | --------------------------------------- | ----------------------------------------------------------- |
| **GitHub**          | Freemium, proprietary                   | The standard: Actions, Packages, the largest ecosystem      |
| **GitLab**          | Freemium + self-hosted Community Edition | All-in-one: repo, CI/CD, registries, and security scanning  |
| **Codeberg**        | 100% free (Forgejo), donation-funded    | Forge without a corporation, backed by its foundation       |
| **Forgejo / Gitea** | Free (MIT)                              | Lightweight self-hosted, single binary, low footprint       |
| **Radicle**         | Free, p2p (Rust)                        | Decentralized forge, no central server                      |

- **How to choose** — GitHub is the default network where most of the ecosystem lives; GitLab (CE) or Forgejo when self-hosting is required; Codeberg when the only criterion is the free license; Radicle to experiment with peer-to-peer forges.

## Tooling

| Tool             | Profile                                                     |
| ---------------- | ----------------------------------------------------------- |
| **git**          | Official CLI — everything goes through here                 |
| **lazygit**      | Full-featured TUI for daily work                            |
| **gitui** 🦀     | Fast Rust TUI, minimal footprint                            |
| **delta** 🦀     | Diffs and merges with syntax highlighting                   |
| **jj** 🦀        | Next-generation VCS built on git's repo format              |
| **gitoxide** 🦀  | Git rewritten in Rust, the base of modern tooling           |

- **jj** — eliminates git's broken states (index, stash): the working copy is an editable commit and conflicts are resolved without special branches; it works over the same repo format, so it coexists with git and current forges.
- **delta** — integrates as git's pager and turns diffs into readable output, with syntax highlighting and per-file structure.

> The repo is the source of truth for the whole cycle: every push triggers CI in [ops-ci](../../ops/ops-ci/), the merge into main opens the door to [ops-cd](../../ops/ops-cd/) deployment strategies, and infrastructure lives versioned in git under [ops-iac](../../ops/ops-iac/).
