---
eyebrow: Dev
title: Dev Planning
subtitle: What happens before writing code
group: Project Management
order: 20
summary: "Before writing code: requirements, documents, diagrams, and ADR — what to write and when, before touching the code."
---

Every feature starts long before the first commit: understand what is wanted, decide how it will look, and leave it written where the team will find it. What changes cheapest is what doesn't exist in code yet — and a written problem gets solved in one meeting; the same problem discovered in production, in several.

## Requirements

A requirement answers a single question: what must the system do, and how will we know it does it? Writing it forces the ambiguities to be resolved before code resolves them — code always resolves them its own way.

- **Functional** — what it must do: behavior observable from the outside ("the user can reset their password"). They are written as user stories with acceptance criteria (Given/When/Then) so that "done" is verifiable and not an opinion.
- **Non-functional** — how it must do it: performance, security, availability, limits ("99.9% availability", "response < 200 ms"). They are not optional: they are usually what breaks the project in production when nobody wrote them down.
- **The minimum that is needed** — not everything deserves a document: for a small task, a bullet in the issue is enough; the full format pays off when more than one person is involved or when "done" starts to be debated.

## Documents

The right document is the one people read without being reminded. Practical rule: if it lives in the repo, it lives next to the code it describes.

- **One-pager** — a single page summarizing the what and why of a feature: context, goal, scope, and out of scope. The cheap format that fits in the issue description or in `docs/`.
- **Full spec** — when several teams, interfaces, or money are involved: behaviors, edge cases, and success metrics. Reviewed in a PR like any other code ([dev-vcs](../dev-vcs/)).
- **Where it lives** — in the repo (`docs/` or next to the feature), versioned and reviewed in a PR. The tools where the team keeps the rest of its documentation (wikis, docs-as-code) are in [dev-project-management](../dev-project-management/).

## Diagrams (graphs)

Drawing is for communicating, not archiving: a diagram is understood in a meeting and goes stale in three months if nobody updates it. Use it while it resolves a conversation; if it only documents, it is usually unnecessary.

- **Mermaid** — diagrams as code inside the markdown: flows, sequences, and graphs (nodes + edges) that live in the repo and are reviewed in PR, with no drawing tool. The cheapest graph to maintain.
- **UML** — the common vocabulary: use cases (who uses what), sequence (what happens over time), and classes (structure). Enough for most teams, without "modeling" ceremony.
- **C4** — architecture in four levels (context, containers, components, code) to explain the system to different audiences; the natural complement to the patterns in [dev-architectures](../dev-architectures/).

## ADR

An _Architecture Decision Record_ is the note that answers "why did we decide this?" six months later, when the chat is gone. One per expensive-to-revert decision — not per technical choice.

```adr
# ADR-001: Postgres instead of MongoDB

## Context
What was going on and what pressures existed (data volume, team, deadlines).

## Decision
We chose X because... (and which option is discarded).

## Consequences
What we gain, what we give up, and what to watch for.
```

- **Format** — context / decision / consequences; it fits in half a page. Without it the decision is lost; with too much text, nobody writes it.
- **When to write one** — when the discarded option was also reasonable (framework swap, database choice, sync vs. async). If only one option was viable, there is no decision to record.
- **Where it lives** — in `docs/adr/` with a sequential number, created in a PR; from there the patterns of [dev-architectures](../dev-architectures/) and the principles of [dev-principles](../dev-principles/) are linked.
