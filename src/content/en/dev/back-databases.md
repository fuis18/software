---
eyebrow: Dev
title: Back Databases
subtitle: Databases and when to use each one
group: Backend
order: 12
summary: Databases and when to use each one, compared on ACID, JOINs, scalability, and availability, plus ORMs.
---

Two families, two logics: SQL keeps all the data consistent under one relational model; NoSQL splits into specialized data models, each dominant in its own niche.

## SQL (Relational)

The relational family shares tables, SQL, and ACID transactions — engines differ in deployment (embedded vs. server), extensibility, and how they scale.

- **SQLite** — Embedded and serverless: the whole database is a single local file with full ACID even across crashes, and no server process to run. The most widely deployed database in the world (iOS, Android, browsers, desktop apps) and the base of edge databases like Turso or Cloudflare D1. Choose it for mobile, desktop, edge, local-first apps, or prototyping — not for many concurrent writers.
- **PostgreSQL** — A full object-relational server with MVCC concurrency, a capable query planner, and extensions for almost anything (PostGIS, pgvector, TimescaleDB), plus JSONB when part of the data is document-shaped. Scales vertically with read replicas rather than sharding out of the box. Choose it as the default for web applications with structured data and room to grow.
- **MariaDB** — A fully open-source (GPL) fork of MySQL created by its original author as a community drop-in replacement: same wire protocol and clients, so existing apps and ORMs migrate without changing code. It ships its own storage engines and Galera for synchronous multi-primary clustering. Choose it as the MySQL alternative when you want an open license or built-in multi-master high availability.

| Feature | SQLite | PostgreSQL | MariaDB |
| --- | --- | --- | --- |
| **ACID** | ✅ Yes | ✅ Yes | ✅ Yes (InnoDB) |
| **JOINs** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Scalability** | ❌ Local | ⚠️ Vertical | ⚠️ Vertical + Galera |
| **Reads/s** | ⚡⚡⚡ Ultra | ⚡⚡ Fast | ⚡⚡ Fast |
| **Writes/s** | ⚡⚡ Fast | ⚡⚡ Fast | ⚡⚡⚡ Ultra |
| **Flexible schema** | ❌ No | ⚠️ JSONB | ⚠️ JSON |
| **High availability** | ❌ No | ⚠️ Replica | ✅ Galera (multi-primary) |

### ACID

What every engine above guarantees — the contract that the NoSQL section below trades away (BASE).

- **Atomic** — the transaction is applied entirely or not at all.
- **Consistency** — data moves from one valid state to another valid state.
- **Isolation** — concurrent transactions don't interfere with each other.
- **Durability** — once confirmed, the transaction survives a crash.

## NoSQL

NoSQL is not one model but four classic families — plus a newer, fifth one — each with its own data model. Where SQL offers ACID, these engines accept the BASE contract (explained below), giving up part of the relational model to dominate their own niche.

- **Document store** (MongoDB) — The model: JSON/BSON documents grouped in collections, with no fixed schema. It optimizes reading a whole aggregate in one round trip and evolving the schema without migrations, at the cost of joins between collections (only `$lookup`) and transactions that exist but are not the default path. Choose it when the shape of the data changes faster than deployments: REST APIs, catalogs, CMSs.
- **Key-value** (Redis) — The model: opaque key → value pairs with optional TTL, held in memory. It optimizes sub-millisecond reads and extreme throughput at the cost of not being able to query by anything other than the key. Choose it as the speed layer in front of the main database: cache, sessions, queues, rate limiting.
- **Wide column store** (Cassandra) — The model: tables partitioned by key with grouped columns, written by column instead of by row, with every node accepting writes (no single point of failure). It optimizes massive writes and linear horizontal scale at the cost of queries that must follow the partition key and no cross-partition transactions. Choose it for IoT, time-series, and logs. Not to be confused with analytical columnar engines (ClickHouse, Redshift): that world is in [ops-data-modeling](../../ops/ops-data-modeling/).
- **Graph database** (Neo4j) — The model: nodes and relationships as first-class citizens, queried with Cypher. It optimizes traversals between entities ("who knows whom") that in SQL would be chained joins, at the cost of massive scale and bulk processing. Choose it when the core question is about relationships: social networks, recommendations, fraud detection.
- **Vector database** (Qdrant) — A fifth, newer family born with AI embeddings: it stores numeric representations instead of entities and searches by similarity (cosine) rather than exact equality, and sometimes it is just a search engine on top of an existing database (pgvector on PostgreSQL) rather than a separate store. Choose it when the query is "what resembles this" and not "where is this exactly": RAG, semantic search, ML/AI.

### BASE

The counterpart of ACID: what these engines accept in exchange.

- **Basically Available** — The system always answers, even if the answer may be stale: replying beats serving the freshest possible data.
- **Soft state** — The state can change over time with no new requests (TTLs expiring, caches, replicas converging): nothing is permanent by default.
- **Eventual consistency** — With no new writes, all replicas converge to the same value; what is not guaranteed is *when*. The trade-off: give up strong consistency for availability and partition tolerance (CAP).

| Feature | MongoDB | Cassandra | Redis | Neo4j | Qdrant |
| --- | --- | --- | --- | --- | --- |
| **ACID** | ⚠️ Config. | ❌ Eventual | ⚠️ Limited | ✅ Yes | ⚠️ Eventual |
| **JOINs** | ⚠️ $lookup | ❌ No | ❌ No | ✅ Native | ❌ No |
| **Scalability** | ✅ Horizontal | ✅✅ Massive | ✅ Horizontal | ⚠️ Medium | ✅ Horizontal |
| **Reads/s** | ⚡⚡ Fast | ⚡⚡⚡ Ultra | ⚡⚡⚡⚡ Extreme | ⚡ Medium | ⚡⚡⚡ Ultra |
| **Writes/s** | ⚡⚡⚡ Ultra | ⚡⚡⚡⚡ Extreme | ⚡⚡⚡⚡ Extreme | ⚡ Medium | ⚡⚡ Fast |
| **Flexible schema** | ✅ Yes | ⚠️ Semi | ✅ Yes | ❌ No | ⚠️ Semi |
| **High availability** | ✅ Replica | ✅✅ Native | ✅ Sentinel | ⚠️ Cluster | ✅ Cluster |

## ORMs / Query Builders

| Name | Language | Type | Database |
| --- | --- | --- | --- |
| **Prisma** | TypeScript | ORM | PostgreSQL, MySQL, etc. |
| **TypeORM** | TypeScript | ORM | Multi-DB |

## Resources

**BaaS**:

- [turso.tech](https://turso.tech) — SQLite at the edge.
- [PlanetScale](https://planetscale.com) — serverless MySQL.

**Practice**:

- [sqlbolt.com](https://sqlbolt.com) — practice SQL interactively.
