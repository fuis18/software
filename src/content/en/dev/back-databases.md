---
eyebrow: Dev
title: Back Databases
subtitle: Databases and when to use each one
group: Backend
order: 12
summary: Databases and when to use each one, compared on BASE, JOINs, scalability and availability, plus ORMs.
---

Two families, two logics: SQL keeps all data consistent under a single relational model; NoSQL splits into specialized models, each one dominating its own niche.

## The two contracts

- **ACID (SQL)** — a transaction is all or nothing, data is always valid, concurrent transactions don't interfere with each other, committed = survives crashes.
- **BASE (NoSQL)** — always responds (even if the data is stale), state is transient (TTL, replicas converging) and with no new writes all replicas converge — eventually. Trade-off: strong consistency ↔ availability and partitioning (CAP).

## SQL (relational)

- **SQLite** — Embedded: the whole DB is a local file, no server.
- **PostgreSQL** — Object-relational server, extensions for everything (PostGIS, pgvector), JSONB.
- **MariaDB** — Open-source (GPL) fork of MySQL, drop-in and with multi-primary Galera.

| Feature               | SQLite                               | PostgreSQL                            | MariaDB                              |
| --------------------- | ------------------------------------ | ------------------------------------- | ------------------------------------ |
| **Primary use**       | Mobile, desktop, edge, local-first   | Web with structured data (default)    | Multi-region SaaS, migrating from MySQL |
| **ACID**              | ✅ Yes                                | ✅ Yes                                 | ✅ Yes (InnoDB)                       |
| **JOINs**             | ✅ Yes                                | ✅ Yes                                 | ✅ Yes                                |
| **Scalability**       | ❌ Local                             | ⚠️ Vertical                           | ⚠️ Vertical + Galera                 |
| **Reads/s**           | ⚡⚡⚡ Ultra                         | ⚡⚡ Fast                             | ⚡⚡ Fast                            |
| **Writes/s**          | ⚡⚡ Fast                            | ⚡⚡ Fast                             | ⚡⚡⚡ Ultra                         |
| **Flexible schema**   | ❌ No                                | ⚠️ JSONB                              | ⚠️ JSON                              |
| **High availability** | ❌ No                                | ⚠️ Replica                            | ✅ Galera (multi-primary)            |

## NoSQL

- **Documents** (MongoDB) — JSON with no fixed schema; reads the whole aggregate in one call. JOINs only via `$lookup`.
- **Key-value** (Redis) — Key → value in memory, sub-millisecond reads; only key-based queries.
- **Wide column** (Cassandra) — Tables partitioned by key; every node accepts writes. Queries tied to the partition key. Analytical columnar engines (ClickHouse, Redshift) live in [ops-data-modeling](../../ops/ops-data-modeling/).
- **Graph** (Neo4j) — Nodes and relationships as first-class citizens (Cypher); traverses relationships without chained JOINs. Unique case: it is ACID, its NoSQL is in the model, not in the contract.
- **Vector** (Qdrant) — Embeddings, similarity search (cosine); sometimes it's just pgvector on PostgreSQL.

| Feature               | MongoDB                   | Cassandra              | Redis                  | Neo4j                                 | Qdrant                  |
| --------------------- | ------------------------- | ---------------------- | ---------------------- | ------------------------------------- | ----------------------- |
| **Primary use**       | Catalogs, CMSs, REST APIs | IoT, time-series, logs | Cache, sessions, queues | Social networks, fraud, recommendation | RAG, semantic search    |
| **BASE**              | ⚠️ Eventual (default)     | ✅ Native              | ⚠️ Eventual (replicas) | ❌ It is ACID                          | ⚠️ Eventual             |
| **JOINs**             | ⚠️ $lookup                | ❌ No                  | ❌ No                  | ✅ Native                             | ❌ No                   |
| **Scalability**       | ✅ Horizontal             | ✅✅ Massive            | ✅ Horizontal          | ⚠️ Medium                              | ✅ Horizontal           |
| **Reads/s**           | ⚡⚡ Fast                 | ⚡⚡⚡ Ultra           | ⚡⚡⚡⚡ Extreme       | ⚡ Medium                              | ⚡⚡⚡ Ultra            |
| **Writes/s**          | ⚡⚡⚡ Ultra              | ⚡⚡⚡⚡ Extreme       | ⚡⚡⚡⚡ Extreme       | ⚡ Medium                              | ⚡⚡ Fast               |
| **Flexible schema**   | ✅ Yes                     | ⚠️ Semi                | ✅ Yes                  | ❌ No                                 | ⚠️ Semi                 |
| **High availability** | ✅ Replica                | ✅✅ Native            | ✅ Sentinel            | ⚠️ Cluster                            | ✅ Cluster              |

## SQL or NoSQL?

Stable-shaped data, queries that cross entities, zero stale data → SQL. Model that changes fast, key or similarity access, distributed scale → the niche NoSQL. In practice they are combined: PostgreSQL as the source of truth + Redis as a cache, or JSONB/pgvector so you don't run more engines.

## ORMs — one per language from the Top 5

Same criteria as in [back-stack](../back-stack/): the best representative per language, no repeats.

| ORM        | Language   | Pairs with     | Note                                              |
| ---------- | ---------- | -------------- | ------------------------------------------------- |
| **ODB**    | C++        | Drogon         | Generates code from headers; mature but niche    |
| **SeaORM** | Rust       | Actix-web, Axum | Natively async; de facto standard of the ecosystem |
| **GORM**   | Go         | net/http, Gin  | The most used in Go; sqlc for critical queries    |
| **Prisma** | TypeScript | Fastify, Hono  | Declarative schema + autogenerated typed client   |

Lightweight counterpart if you prefer SQL without hiding it: **Drizzle** (TS) and **sqlx** (Rust, verified at compile time).

## Resources

**BaaS**:

- [turso.tech](https://turso.tech) — SQLite at the edge.
- [PlanetScale](https://planetscale.com) — serverless MySQL.

**Practice**:

- [sqlbolt.com](https://sqlbolt.com) — practice SQL interactively.
