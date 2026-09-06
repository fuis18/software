---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Dev Project Management
subtitle: Software project management tools
---

Software development is also coordination: who does what, in what order, and when it's ready. Project management tools organize work into tasks, sprints, and tracking, regardless of the methodology the team uses (Scrum, Kanban, or something custom).

## Platforms

| Platform  | Profile                           | Excels in                                                |
| --------- | --------------------------------- | -------------------------------------------------------- |
| **Asana** | Flexible project management       | Tasks, timelines, custom workflows, large teams          |
| **Jira**  | The standard for dev teams        | Issues, Scrum/Kanban sprints, development integration    |
| **Monday** | Visual work management           | Visual boards, no-code, adaptable to any team            |

- **Asana** — designed to organize work by projects and objectives: lists, boards, timelines, and automations. Very flexible for different types of teams, not just software.
- **Jira** — the reference tool in development: _issues_ with states, sprint boards, backlog, and reports, integrated into the CI/CD flow and repos (each PR can reference a ticket). It's the heaviest to set up and the most powerful when the team already works with agile methodology. In the operations flow it appears as the natural integrator of [ops-incident](../../ops/ops-incident/) alerts.
- **Monday** — work on very accessible visual boards, with automations and views without writing code. Fast to adopt for non-technical teams that work alongside the development team.

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

- **Jira** when the team lives in tickets and sprints and needs the direct link to code (PRs, commits, releases).
- **Asana** when you want to organize projects and objectives with more flexibility than a pure agile board.
- **Monday** when the priority is a simple visual tool that anyone in the organization can use.

> The tool doesn't define the methodology: first define how you want to work (sprints, kanban, continuous flow) and then choose the platform that best supports it.
