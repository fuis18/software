---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Dev Architectures
subtitle: Software architecture patterns
---

The way code and processes are organized determines how a system is scaled, deployed, and maintained. Each architecture solves a different problem — and none is "the best" on its own.

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

## Architectures Are Not Mutually Exclusive

- A **well-modularized monolith** (code separated into modules but in a single deploy) can be the best option even for medium teams.
- It's common for a system to combine patterns: a public-facing **Layered** API, with an internal **Event-Driven** flow, and **Serverless** functions for specific tasks.
- The practical rule: start simple (monolith/layered), and move pieces to other architectures when the real problem demands it — don't adopt architecture for fashion's sake.
