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

## How to Choose

- **Jira** when the team lives in tickets and sprints and needs the direct link to code (PRs, commits, releases).
- **Asana** when you want to organize projects and objectives with more flexibility than a pure agile board.
- **Monday** when the priority is a simple visual tool that anyone in the organization can use.

> The tool doesn't define the methodology: first define how you want to work (sprints, kanban, continuous flow) and then choose the platform that best supports it.
