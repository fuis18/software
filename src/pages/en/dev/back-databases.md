---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Back Databases
subtitle: Databases and when to use each one
---

## Databases

| Name           | Type              | Feature                             | Use                                     |
| -------------- | ----------------- | ----------------------------------- | --------------------------------------- |
| **SQLite**     | SQL               | Embedded, serverless, single file   | Mobile apps, desktop                    |
| **PostgreSQL** | SQL               | ACID, extensible, flexible          | Web applications                       |
| **MongoDB**    | Document Store    | Flexible schema, sharding           | REST APIs, catalogs, CMS               |
| **Cassandra**  | Wide Column Store | No single point of failure, scalable | IoT, time-series, high availability   |
| **Redis**      | Key-Value         | In-memory, fast, TTL                | Cache, sessions, real-time             |
| **Neo4j**      | Graph Database    | Relationship queries (Cypher)       | Social networks, recommendations, fraud |
| **Qdrant**     | Vector Database   | Vector search, embeddings           | RAG, semantic search, ML/AI            |

## Comparison

| Feature               | SQLite       | PostgreSQL  | MongoDB       | Cassandra        | Redis            | Neo4j      | Qdrant        |
| --------------------- | ------------ | ----------- | ------------- | ---------------- | ---------------- | ---------- | ------------- |
| **ACID**              | ✅ Yes       | ✅ Yes      | ⚠️ Config.    | ❌ Eventual      | ⚠️ Limited       | ✅ Yes     | ⚠️ Eventual   |
| **JOINs**             | ✅ Yes       | ✅ Yes      | ⚠️ $lookup    | ❌ No            | ❌ No            | ✅ Native  | ❌ No         |
| **Scalability**       | ❌ Local     | ⚠️ Vertical | ✅ Horizontal | ✅✅ Massive      | ✅ Horizontal    | ⚠️ Medium  | ✅ Horizontal |
| **Reads/s**           | ⚡⚡⚡ Ultra | ⚡⚡ Fast   | ⚡⚡ Fast     | ⚡⚡⚡ Ultra      | ⚡⚡⚡⚡ Extreme  | ⚡ Medium  | ⚡⚡⚡ Ultra   |
| **Writes/s**          | ⚡⚡ Fast    | ⚡⚡ Fast   | ⚡⚡⚡ Ultra   | ⚡⚡⚡⚡ Extreme  | ⚡⚡⚡⚡ Extreme  | ⚡ Medium  | ⚡⚡ Fast     |
| **Flexible schema**   | ❌ No        | ⚠️ JSONB    | ✅ Yes        | ⚠️ Semi          | ✅ Yes           | ❌ No      | ⚠️ Semi       |
| **High availability** | ❌ No        | ⚠️ Replica  | ✅ Replica    | ✅✅ Native      | ✅ Sentinel      | ⚠️ Cluster | ✅ Cluster    |

### How to Choose

- **Relational SQL** (SQLite, PostgreSQL) when ACID and JOINs matter — most apps with structured data. SQLite for embedded/local, PostgreSQL for a web app with its own server.
- **MongoDB** when the schema changes frequently or isn't defined upfront.
- **Cassandra** when volume and availability matter more than ACID — mass writes, IoT, time-series.
- **Redis** for anything that needs extreme speed and doesn't need to survive forever: cache, sessions, simple queues.
- **Neo4j** when the core question is about relationships between entities (who knows whom, what to recommend to whom).
- **Qdrant** when you need to search by semantic similarity instead of exact equality — RAG, embeddings.

### ACID

- **Atomic** — the transaction is applied entirely or not at all.
- **Consistency** — data moves from one valid state to another valid state.
- **Isolation** — concurrent transactions don't interfere with each other.
- **Durability** — once confirmed, the transaction survives a crash.

## ORMs / Query Builders

| Name        | Language   | Type | Database                 |
| ----------- | ---------- | ---- | ------------------------ |
| **Prisma**  | TypeScript | ORM  | PostgreSQL, MySQL, etc.  |
| **TypeORM** | TypeScript | ORM  | Multi-DB                 |

## Resources

**BaaS**:

- [turso.tech](https://turso.tech) (SQLite at the edge)
- [PlanetScale](https://planetscale.com) (serverless MySQL).

- [sqlbolt.com](https://sqlbolt.com) — practice SQL interactively.
