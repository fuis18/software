---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Data Modeling
subtitle: Logical design for analytics — star schemas and analytical engines
---

While transactional databases (see [back-databases](../../dev/back-databases/)) are designed to serve a single request quickly, analytical data is read in bulk and aggregated: millions of rows, grouped and summed. That difference shapes a separate logical design — facts and dimensions — and a separate set of engines built for columnar, read-heavy workloads.

## Star Schema (Facts & Dimensions)

The star schema is the logical design of an analytical (OLAP) data model: a central **fact table** surrounded by **dimension tables**, like the points of a star.

### Fact Tables

The center of the schema: rows that record a measurable event (a sale, a click, a log entry), each with:

- **Measures** — numeric, additive values to aggregate (amount, quantity, duration).
- **Grain** — the level of detail each row represents (one row per order line, per event). The grain defines what questions the fact can answer; a coarser or finer grain is a redesign.
- **Foreign keys** to the dimension tables — plus degenerate dimensions (attributes that stay in the fact, like an invoice number).

Measures can be **additive** (safe to sum across any dimension), **semi-additive** (summable across some dimensions but not time, like a balance), or **non-additive** (not summable at all, like a ratio).

### Dimension Tables

The context that gives facts meaning — who, what, where, when: customers, products, stores, dates — with descriptive attributes. Dimensions tend to be:

- **Denormalized** — all attributes in one table (hierarchies flattened: `country`, `region`, and `city` in the same row instead of separate tables), because in analytics join speed and simplicity beat normalization.
- **Conformed** — a shared dimension used by multiple facts (the same `date` dimension across sales and inventory) so metrics stay consistent across the warehouse.

**Star vs. snowflake:** the snowflake schema normalizes dimensions into sub-tables, saving a little space at the cost of more joins. In practice the star wins: storage is cheap, and the extra joins slow down the queries that matter.

## Materialized Views

A **materialized view** stores the result of a query as a table, kept up to date as the source changes: aggregations computed once and served instantly instead of recomputed on every request. They are the bridge between batch models and real-time:

- **Batch** — the view is refreshed periodically by the orchestration, see [ops-dataops](../ops-dataops/).
- **Streaming** — **RisingWave** maintains materialized views continuously as data arrives: SQL defined once, results always current, without managing the incremental computation by hand.

## Analytical Engines

The modern analytical stack is **columnar**: storage and processing organized by column, which makes full-column aggregations orders of magnitude faster than row-based engines.

| Engine | Profile | Use |
|---|---|---|
| [DuckDB](https://duckdb.org/) | Embedded OLAP, no server | Local analytics: SQL directly over Parquet/Arrow files, zero infrastructure — the SQLite of analytics. |
| [ClickHouse](https://clickhouse.com/) | Server OLAP, columnar | Ultra-fast aggregations at scale with real-time ingestion — the warehouse server workhorse. |
| [RisingWave](https://risingwave.com/) | Streaming database | Continuous materialized views over streams (Kafka): SQL defined once, always current. |
| [Apache Arrow](https://arrow.apache.org/) | In-memory columnar format | Zero-copy interchange between engines (Polars, DuckDB, DataFusion) without serialization. |
| [Parquet](https://parquet.apache.org/) | On-disk columnar format | Compressed analytic files with predicate pushdown — the lakehouse file standard. |
| [Polars](https://pola.rs/) | DataFrame library (Rust) | Fast columnar data processing in Python/Rust with lazy execution — the scripting side of analytics. |

Arrow and Parquet are the same columnar idea at two moments: Arrow in memory, Parquet on disk. Most engines above read both directly, and they share the ecosystem with engines like DataFusion (see [ops-modern-data-stack](../ops-modern-data-stack/)).

## Related

- [ops-modern-data-stack](../ops-modern-data-stack/) — the platform layers around these engines.
- [back-databases](../../dev/back-databases/) — transactional engines and when to choose each.
- [ops-dataops](../ops-dataops/) — pipelines, orchestration, and event streams that feed the models.
- [ops-storage](../ops-storage/) — block, file, and object storage underneath the warehouse.