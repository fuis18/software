---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Back Roadmap
subtitle: The learning order for backend
---

## Roadmap

### 0. Concepts

- **Request/response cycle** — a client requests something via HTTP, the server processes it and returns a response with a status code.
- **Verbs and status codes** — what each verb implies (read, create, modify, delete) and what each status code range communicates (2xx, 4xx, 5xx).
- **Stateless vs. stateful** — why HTTP doesn't "remember" anything between requests and what mechanisms exist to simulate that memory (session, token).
- **Serving an API** — how a response is structured (JSON, REST) so that any client can consume it without coupling to a specific framework.

### 1. Frameworks

Starting point: choose the framework based on the use case (high availability, microservices, enterprise, ML, CRUD, edge) rather than personal preference. See [back-stack](../back-stack/).

### 2. MVC Pattern

Model-View-Controller: splits the app into three layers — **Model** (data and business logic), **View** (what is returned to the client, usually JSON in an API) and **Controller** (receives the request, coordinates Model and View). It's the conceptual foundation on which most backend frameworks rest before moving to more specific architectures.

### 3. Databases + ORMs

With the framework and pattern resolved, the next decision is where and how to persist data. See [back-databases](../back-databases/).

### 4. Auth

Identity and authentication once there is an API and data to protect. See [dev-auth](../dev-auth/).

### 5. Testing

Final step: cover what has already been built with tests. See [ops-ci](../ops/ops-ci/).

## REST API Design

### URL Conventions

The URL identifies resources; HTTP verbs express the action on them.

- **Nouns, not verbs** — `/users/42` not `/getUser?id=42`: the action comes from the HTTP verb, the path only identifies the resource.
- **Hierarchy in moderation** — `/users/42/orders` for direct relationships; more than two levels of nesting is usually a sign of a poorly modeled endpoint.
- **State lives outside the path** — the same URL always represents the same resource; what varies between requests (filters, page) goes in query params, not in the path.

### Filters, Sorting, and Pagination

Any list that can grow needs all three, and they go as **query params**:

| Query param        | Use                                                           |
| ------------------ | ------------------------------------------------------------- |
| `?status=active`   | Filter by resource attributes                                 |
| `?sort=-createdAt` | Sort (the `-` reverses the direction)                         |
| `?page=2&limit=20` | Offset-based pagination: simple, allows jumping to any page   |
| `?cursor=abc`      | Cursor-based pagination: stable under concurrent insertions   |

- **Offset vs. cursor** — offset gets corrupted if rows are inserted while paginating; cursor ("from this last element") doesn't, at the cost of only moving forward/backward without jumping. Offset for admin panels, cursor for feeds.
- **Default limit** — every list without an explicit `limit` should have a maximum enforced by the server: returning a hundred thousand rows because nobody set pagination is an accident waiting to happen in production.

### Idempotency

A method is idempotent when repeating it leaves the same result as running it once.

| Verb   | Idempotent? | Why                                                  |
| ------ | ----------- | ---------------------------------------------------- |
| GET    | Yes         | Reading doesn't mutate anything                      |
| PUT    | Yes         | Always replaces the entire resource with the same one |
| DELETE | Yes         | Deleting something already deleted leaves the same state |
| POST   | No          | Each call creates a new resource                     |

- **Why it matters** — retries: if the network fails after a timeout, the client doesn't know if the server processed the request; it can retry safely only if the verb is idempotent.
- **Critical POST** — when a POST represents a payment or another operation that must not be duplicated, an idempotency key is added (`Idempotency-Key`): the server stores the response from the first execution and returns that same one on retries.

## Architecture

### Principles

- **Separation of concerns** — each piece handles one thing.
- **Coupling vs. cohesion** — high cohesion within each module, low coupling between modules.
- **Backpressure** — a slow consumer shouldn't overflow the producer.
- **Failing gracefully** — predictable and manageable errors, not crashes.
- **Observability** — logs, metrics, and traces to understand what happens in production.
- **Safe evolution** — incremental changes without breaking what already works.
- **N-Layer Architecture** — separate the app into layers (presentation, logic, data).
- **KISS / YAGNI / DRY** — see [dev-principles](../dev-principles/).

### SOLID

| Principle                   | Core Idea                                                              |
| --------------------------- | ---------------------------------------------------------------------- |
| **S** Single Responsibility | A class should have a single responsibility.                           |
| **O** Open/Closed           | Code should be extensible without modifying existing code.             |
| **L** Liskov                | A child class should be usable in place of the parent class without breaking. |
| **I** Interface Segregation | Several small interfaces are better than one giant interface.          |
| **D** Dependency Inversion  | Depend on abstractions, not concrete implementations.                  |

### Architectural Styles

| Style                 | Core Idea                                                      |
| --------------------- | -------------------------------------------------------------- |
| **Clean Architecture** | Business rules at the center, dependencies pointing inward.   |
| **Hexagonal**         | Port-adapter: the domain doesn't know about infrastructure.   |
| **Onion**             | Concentric layers with the domain at the core.                 |
| **DDD**               | Model the business domain with its own language.              |
| **MVC**               | Model / View / Controller — see step 2 of the roadmap.        |

### Resources

- ArchView — System Design Patterns Diagrams
- Software Architecture Diagram Examples
- Awesome Software and Architecture Design Patterns
- Digital Platform Architect — Architecture Styles & Patterns
