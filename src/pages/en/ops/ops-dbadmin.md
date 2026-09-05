---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops DB Admin
subtitle: Database administration and scaling
---

Operating a database in production is a craft of its own: keeping it up, replicating it for availability, scaling it when it grows, and changing the schema without taking down the service.

## Engines

| Engine          | Type                | Typical use                            |
| -------------- | ------------------- | ------------------------------------- |
| **PostgreSQL** | SQL                 | Web applications, structured data |
| **MySQL**      | SQL                 | Traditional web, MySQL-compatible |
| **Redis**      | Key-Value (in-memory) | Cache, sessions, queues, real-time     |
| **MongoDB**    | Document Store      | Flexible schemas, catalogs, CMS    |

The comparison of ACID, JOINs, scalability, and availability — and when to choose each from a development perspective — is in [back-databases](../../dev/back-databases/). What matters here is the operational side: keeping them alive and scalable, regardless of which was chosen.

## Replication

Copying data across more than one instance for availability and to distribute reads.

- **Why it exists:** a single database instance is a single point of failure and a read capacity ceiling — if that instance goes down, the entire system loses access to data; if it receives more reads than it can handle, there's nowhere to distribute the load. Replication solves both problems by maintaining synchronized copies of the same data.

### Primary/replica replication

**What it does:** all writes go to a primary instance; that instance propagates changes to one or more replicas, which handle reads.

- **Wins:** read availability (if one replica goes down, the others keep serving) and parallel read capacity (distributing read traffic across multiple instances instead of saturating a single one).
- **Loses:** replication lag — replicas aren't synchronized instantly with the primary, so a read from a replica may return slightly stale data. This matters especially if the application reads immediately after writing and expects to see its own change reflected.

### Failover

**What it does:** if the primary goes down, one of the replicas is promoted to new primary, automatically or with minimal intervention.

- **Wins:** high availability without depending on a human noticing the failure and acting manually.
- **Loses:** promotion isn't instantaneous — there's a window between the primary going down and a replica finishing promotion (verifying it's up to date, redirecting traffic), during which the system may be unable to write.

### Multi-primary / clusters

**What it does:** instead of a single node receiving all writes, multiple nodes accept writes simultaneously and synchronize with each other.

- **Wins:** write scaling — the ceiling of how much can be written is no longer limited to what a single node can handle.
- **Loses:** real conflict complexity — if two nodes receive different writes to the same data almost simultaneously, someone has to resolve which wins (or the system must be designed so that conflict can't occur). It's the most powerful strategy and also the hardest to operate well of the three.

| Pattern                           | What it does                                        | Wins                               | Loses                      |
| -------------------------------- | ----------------------------------------------- | ---------------------------------- | --------------------------- |
| **Primary/replica replication** | Writes to one, reads to multiple replicas | Availability, parallel reads | Replica with lag             |
| **Failover**                     | If the primary goes down, a replica takes its place   | Automatic high availability     | Promotion isn't instantaneous |
| **Multi-primary / clusters**     | Distribute writes across nodes               | Write scaling              | Conflict complexity    |

- **RPO/RTO** — how much data can be lost (_Recovery Point Objective_) and how long it takes to bring the system back (_Recovery Time Objective_); defined here, in the replication and failover design, and put into practice in [ops-backup](../ops-backup/).
- **Replication protects against a node failure; it doesn't replace backup** — an accidental deletion or data corruption is replicated too, at the same speed as any legitimate write. If someone deletes a table by mistake, that "healthy" replica loses it in seconds too. That's why replication (high availability) and backup (disaster recovery or human error recovery) are related but different problems, and neither replaces the other.

## Sharding

Distributing data across multiple databases by a key: the **horizontal scaling** strategy when a single database no longer suffices — not even with read replication or a larger primary node.

- **Why it exists:** replication distributes _reads_, but all writes still go to (or are coordinated among) a limited set of nodes. When the data or write volume exceeds what any replication configuration can sustain, the only way out is to split the data itself into smaller pieces living in separate databases — that's sharding.

| How                   | What it implies                                              |
| ---------------------- | -------------------------------------------------------- |
| **By shard key** | Each row goes to a shard based on a field (user, region) |
| **Routing**              | The app queries the correct shard by key              |
| **Tradeoff**           | Queries crossing shards become complex and expensive     |

- **The choice of shard key is everything:** a bad key (for example, one that disproportionately concentrates the most active users' data in a single shard) recreates the same bottleneck problem sharding was trying to solve, just now distributed unevenly.
- **The real cost isn't just technical:** queries that used to be a simple JOIN within a single database now require querying multiple shards and combining results in the application layer — sharding isn't free, it changes which types of queries remain cheap and which become expensive.

**When to shard:** when reads/writes exceed what a single database can handle in cost or performance, and the volume justifies the operational and routing complexity it adds — it's almost always the last tool resorted to, after exhausting replicas, better hardware, and well-thought-out indexes.

## Schema Migrations

Changing the database structure (tables, columns, indexes) without breaking the service.

- **Why it's a different problem than "just changing code":** unlike application code (which can be replaced all at once), a database schema coexists with existing data and with replicas replicating that schema — a badly applied change can't be reverted just by deploying the previous code version, because the database state has already changed.

- **Versioned migrations** — schema changes live in versioned files and are applied in order, just like code. This gives traceability of what changed the schema, when, and why, and allows reproducing the same schema in any environment by applying the same sequence. Same spirit as [ops-iac](../ops-iac/).
- **Incremental and reversible** — each change must be able to be applied and, if it fails or degrades, reverted. Large, monolithic migrations are harder to revert cleanly than a sequence of small changes, each with its own rollback path.
- **Compatibility during deploy** — new code and new schema are almost never deployed at the exact same instant: there's a window where old code and new schema (or new code and old schema) coexist. That's why the classic pattern is _additive first_: add new columns or tables without touching existing ones, deploy the code that uses them, and only then (in a separate step) remove what became obsolete — never break in a single step something that production code still needs.

> Operating a database is operating a degradable, stateful system: where the rest of infrastructure is recreated, the database persists — that's why everything related to backup lives in [ops-backup](../ops-backup/).
