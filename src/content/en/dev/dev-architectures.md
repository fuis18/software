---
eyebrow: Dev
title: Dev Architectures
subtitle: Software architecture patterns
group: Architecture
order: 13
summary: "Software architecture at three scales: system patterns (monolith, SOA, microservices, event-driven, serverless, layered/MVC), code styles (Clean, Hexagonal, Onion, DDD), folder structure, and when to choose each one."
---

The way code and processes are organized determines how a system is scaled, deployed, and maintained. Each architecture solves a different problem — and none is "the best" on its own. Architecture shows up at three scales — the system (what gets deployed), the repo folders (how the project is laid out), and the code (how each service is organized inside) — and this page covers all three.

## The Patterns

| Name               | Description                                                                                                  | Use                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **Monolith**       | Single application where frontend, backend, and logic live in one project and process                        | Small/medium apps, MVPs, internal systems, early-stage startups                          |
| **SOA**            | System composed of independent services that communicate via network (usually with formal contracts)         | Large enterprises with integration between multiple corporate systems                    |
| **Microservices**  | Collection of small, autonomous, independently deployable services                                           | Large platforms, systems that need high scalability and distributed teams                |
| **Event-Driven**   | Components that react to events (messages) instead of direct synchronous calls                               | Systems with high concurrency, real-time processing, IoT, fintech                        |
| **Serverless**     | Independent functions that run on demand in the cloud                                                        | Lightweight APIs, backend for mobile/web apps, startups looking to reduce infrastructure |
| **Layered / MVC**  | Separation by layers: presentation, business logic, and data access                                         | Traditional web applications, structured APIs, enterprise systems                        |

## How to Choose

- **Monolith** — the correct starting point for most projects: a single process that deploys entirely and is understood at once. Extract to microservices when team size, deployment speed, or scale starts to justify the extra complexity.
- **SOA vs. Microservices** — both split the system into services; SOA thinks of them as reusable corporate units with formal contracts (often with an integration bus), while microservices think of them as small, autonomous, independently deployable business units. Microservices bring the need to observe and orchestrate communication between services: see [back-technologies](../back-technologies/) for communication methods and [ops-sdn](../../ops/ops-sdn/) for service mesh.
- **Event-Driven** — decouples producers from consumers: instead of calling another component and waiting for its response, an event is published and each interested party reacts. It's the foundation of asynchronous messaging in [back-technologies](../back-technologies/).
- **Serverless** — infrastructure disappears: functions that run on demand, scale on their own, and are billed per execution. The platforms that host them are covered in [ops-cloud](../../ops/ops-cloud/).
- **Layered / MVC** — layer separation is the foundation on which almost all others are built: separating presentation, logic, and data is what allows changing one without rewriting the others.

## Emerging Patterns

| Pattern                                | What it solves                                       | When to adopt                                                                         |
| -------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Data Mesh**                          | Decentralize data ownership by business domain       | When 5+ independent teams work on data and the central team is the bottleneck           |
| **Data Fabric**                        | Automated, metadata-driven integration               | When manual integration between sources becomes the bottleneck                         |
| **Centralized Semantic Layer**         | One source of truth for every metric                 | When marketing, finance, and ops define "revenue" in different ways                     |
| **Data MCP**                           | AI agents querying the pipeline without a custom API | When agents need warehouse data without manual endpoints                               |

- **Data Mesh vs Data Fabric** — the mesh changes the organization (domains owning their data, with their own contracts and quality); the fabric changes the infrastructure (the platform integrates on its own, driven by metadata). They don't exclude each other: they usually appear together in large platforms.
- The technical pieces of these patterns live in [ops-modern-data-stack](../../ops/ops-modern-data-stack/) (lineage, catalog, metrics), and the data protocol for agents in [ai-mcp](../../ai/ai-mcp/).

## Project Structure

The same idea at the folder scale: the repo layout should reflect the **app domain**, and it has two classic answers.

### Screaming Architecture (Feature-Based)

The folder structure should reflect the **app domain** and "scream" what it is about, not what framework it uses. In practice you group by feature instead of by technical layer — the roadmap step lives in [web-roadmap](../web-roadmap/).

```
src/
  features/
    auth/
      components/    # LoginButton, LoginForm
      hooks/         # useAuth, useUser
      services/      # loginApi, registerApi
      types/         # UserInterface
      index.ts       # Entry point (Public API)
    shopping-cart/
      components/
      store/
      index.ts
  shared/            # Global components (buttons, generic inputs)
```

### Layered folders

Grouping by technical layer, the classic alternative: `components/`, `hooks/`, `services/`, `pages/`, `utils/` — not to be confused with the **Layered / MVC** system pattern above: this one groups *files*, that one separates *system layers*.

```
src/
  components/
  hooks/
  services/
  pages/
  utils/
```

**How to choose:** Layered for simple projects where the file type rules; Screaming/Feature-Based when the app grows and several features touch the same layers, so each feature stays self-contained and can be moved or removed as a unit.

The principles behind these choices — KISS, YAGNI, and DRY — are in [dev-principles](../dev-principles/).

## Architectural Styles

How the code inside each service is organized — a finer scale than the system patterns above.

| Style                 | Core Idea                                                      |
| --------------------- | -------------------------------------------------------------- |
| **Clean Architecture** | Business rules at the center, dependencies pointing inward.   |
| **Hexagonal**         | Port-adapter: the domain doesn't know about infrastructure.   |
| **Onion**             | Concentric layers with the domain at the core.                 |
| **DDD**               | Model the business domain with its own language.              |
| **MVC**               | Model / View / Controller — see step 2 of [back-roadmap](../back-roadmap/). |

### Resources

- ArchView — System Design Patterns Diagrams
- Software Architecture Diagram Examples
- Awesome Software and Architecture Design Patterns
- Digital Platform Architect — Architecture Styles & Patterns

## Architectures Are Not Mutually Exclusive

- A **well-modularized monolith** (code separated into modules but in a single deploy) can be the best option even for medium teams.
- It's common for a system to combine patterns: a public-facing **Layered** API, with an internal **Event-Driven** flow, and **Serverless** functions for specific tasks.
- The practical rule: start simple (monolith/layered), and move pieces to other architectures when the real problem demands it — don't adopt architecture for fashion's sake.

When a system actually picks one of these patterns, the reasoning is worth writing down: requirements, documents, diagrams, and ADRs are covered in [dev-planning](../dev-planning/).
