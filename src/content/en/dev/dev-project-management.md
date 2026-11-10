---
eyebrow: Dev
title: Dev Project Management
subtitle: Software project management tools
group: Project Management
order: 19
summary: "Software project management tools: Plane, Vikunja, AppFlowy, Kaneo, and Teable, team documentation, and how to choose based on how the team works."
---

Software development is also coordination: who does what, in what order, and when it's ready. Project management tools organize work into tasks, sprints, and tracking, regardless of the methodology the team uses (Scrum, Kanban, or something custom).

## Platforms

| Platform     | Profile                        | Excels in                                      |
| ------------ | ------------------------------ | ---------------------------------------------- |
| **Plane**    | All-in-one agile management    | Issues, cycles, modules, integrated docs       |
| **Vikunja**  | Task management (Go)           | Lists, kanban, Gantt, calendars, CalDAV        |
| **AppFlowy** 🦀 | Local-first workspace (Rust) | Desktop and mobile, blocks, databases          |
| **Kaneo**    | Minimalist Kanban (MIT)        | Just the board, Linear-style                   |
| **Teable**   | No-code grids on Postgres      | Tables, kanban, calendar, real-time            |

- **Plane** — the most complete all-in-one on the list: _issues_ with states, cycles (sprints), modules (projects), and integrated docs; self-hosted (AGPL) or free cloud for up to 12 members, with import from Jira.
- **Vikunja** — task management in Go (AGPL): lists, kanban, Gantt, and calendars with CalDAV sync; serves dev teams and any department that just needs to organize work.
- **AppFlowy** 🦀 — local-first workspace in Rust and Flutter (AGPL): native desktop and mobile apps with blocks and databases, working offline without sending data to a third party.
- **Kaneo** — just the board, nothing else: lightweight Kanban (MIT) for small teams that don't need the sprint machine.
- **Teable** — Monday's visual shape under a free license (AGPL): no-code grids over real Postgres (plain SQL on the data), with table, kanban, and calendar views.

### Plane in Depth

- **Workflows per project** — each issue type gets its own state flow (To Do → In Progress → Done); designed per project according to how the team works, not the other way around.
- **Automations** — no-code rules "when this, do that" (when the PR merges, move the issue to Done; if a blocker closes, notify the assignee) with triggers, conditions, and actions.
- **Views and filters** — kanban, list, spreadsheet, and calendar over the same issues; saved filters act as queries feeding each view.
- **Cycles and modules** — cycles set the sprint pace and modules group long-running topics; integrated docs keep the project's context inside the same tool.
- **Integration** — import from Jira and GitHub, and webhooks carry commits, PRs, and CI status onto the issue, with [ops-incident](../../ops/ops-incident/) alerts opening tickets automatically.

## Team Documentation

The project manager's historical counterpart is the wiki: Confluence dominated this space from within the Atlassian suite, and today there are more modern free alternatives.

| Tool         | License               | Profile                                                     |
| ------------ | --------------------- | ------------------------------------------------------------ |
| **BookStack** | MIT                   | Hierarchical wiki (book → chapter → page), self-hosted       |
| **Docmost**  | AGPL                  | Modern Notion-style editor with real-time collaboration      |
| **Wiki.js**  | AGPL                  | Content stored in git, multi-backend                         |
| **Outline**  | BSL (source-available) | Very fast and modern, SSO; not OSI open source              |

- **BookStack** — rigid, predictable structure for orderly documentation; runs light on any server.
- **Docmost** — the most current experience: blocks, real-time, and per-space permissions.
- **Wiki.js** — when the content must live versioned in git and be published as part of the flow.
- **Outline** — very polished, but its BSL license is not open source in the OSI sense (source available with commercial restrictions).
- **Docs-as-code** — the other path: documentation lives as markdown in the repo, is reviewed in PR, and published from CI (Docusaurus, MkDocs Material, mdBook 🦀) — see [dev-vcs](../dev-vcs/).

## Methodologies

| Methodology | Main use |
| ----------- | -------- |
| **AGILE**   | General philosophy: short iterations, continuous feedback, responding to change |
| **SCRUM**   | Agile framework: fixed sprints (1-4 weeks), roles (PO, SM, dev team), ceremonies |
| **Kanban**  | Continuous flow: WIP limits, visual board, no fixed sprints |
| **XP**      | Technical practices: TDD, pair programming, continuous integration, refactoring |
| **Lean**    | Waste elimination: optimize value flow, reduce inventory |
| **SAFe**    | Scale agile to large organizations: multiple teams, portfolios |

### When to use each

- **AGILE** — not a methodology but a philosophy: the 4 values of the Agile Manifesto and its 12 principles. Everything else (Scrum, Kanban, XP) are ways to implement it.
- **SCRUM** — the most used framework for building complex software: work is planned in 1-4 week sprints, with defined roles (Product Owner, Scrum Master, Development Team) and ceremonies (Sprint Planning, Daily, Review, Retro). Ideal when the team needs structure and frequent deliveries.
- **Kanban** — continuous flow without fixed sprints: work is visualized on a board, work in progress (WIP) is limited, and cycle time is measured. Ideal for support, maintenance, or when the team can't commit to fixed sprint durations.
- **XP (Extreme Programming)** — focused on quality technical practices: TDD, pair programming, continuous integration, refactoring, small releases. Complements Scrum when you want to raise code quality.
- **Lean** — inspired by Toyota: eliminate waste, optimize value flow, deliver fast, and respect people. Useful for processes that are not purely software development.
- **SAFe (Scaled Agile Framework)** — scale agile to large organizations with multiple teams: defines how to align portfolios, programs, and teams. Complex to adopt, useful when there are strong dependencies between teams.

## How to Choose

- **Plane** when the team lives in issues, cycles, and sprints and needs the direct link to code (PRs, commits, releases).
- **Vikunja** when task management spans the whole team or organization (non-dev departments included) and calendars and Gantt are needed.
- **AppFlowy** 🦀 when work has to be local-first on desktop and mobile, with data on the machine itself.
- **Kaneo** when the priority is just the Kanban board, without the sprint machine.
- **Teable** when work is organized over visual no-code tables and grids, on Postgres.
- **Forge issues** — native issues in GitHub, GitLab, or Forgejo cover the basic case for free and live next to the code (see [dev-vcs](../dev-vcs/)).

> The tool doesn't define the methodology: first define how you want to work (sprints, kanban, continuous flow) and then choose the platform that best supports it.
