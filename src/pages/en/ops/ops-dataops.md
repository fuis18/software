---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops DataOps
subtitle: Pipelines and data flows
---

Data doesn't just live in databases: it moves. From the source system to analytical warehouses, transforming along the way, with orchestration and event streams as transport.

## Job Orchestration

Scheduling, chaining, and monitoring data jobs that run at intervals.

- **Why it exists:** moving and transforming data is almost never a single step — it's a chain of steps with dependencies (you can't transform before extracting, you can't load before transforming), and each step can fail. Orchestration is the layer that knows what runs after what, what to retry if something fails, and what to notify if something doesn't recover.

### Airflow

**Profile:** models the workflow as a DAG (directed acyclic graph) — each node is a task, each connection is a dependency, and the engine decides the execution order respecting that graph.

- **Strengths:** expresses complex dependencies explicitly and visually (what runs first, what can run in parallel), configurable retries and alerts per task, mature ecosystem with operators to connect practically any system (databases, APIs, cloud services).
- **Use cases:** classic ETL pipelines running on cron (every hour, every night), any workflow with step dependencies needing visibility into what ran, what failed, and why.
- **Weaknesses:** designed for interval-scheduled jobs, not real-time streaming (that requires a different tool, like Kafka or Spark Streaming); a poorly designed DAG (with tasks too large or unclear dependencies) can become hard to debug when it fails midway.

### dbt

**Profile:** doesn't orchestrate infrastructure or connect systems — transforms data that _already is_ in the warehouse, with versioned, tested, and modular SQL, treated with the same discipline as application code.

- **Strengths:** brings software engineering practices to analytical SQL — version control, automated tests on data (is this column ever null?, is this ID unique?), automatically generated documentation and lineage of transformations.
- **Use cases:** the transformation layer within an ELT flow — once raw data is loaded into the warehouse, dbt defines how it's modeled and cleaned toward the tables analytics/BI consumes.
- **Weaknesses:** doesn't move data toward or from the warehouse (that's solved by another ingestion tool) nor orchestrates anything outside its own transformations — typically lives _inside_ a larger pipeline, often triggered by Airflow itself.

**How they relate:** it's common for Airflow to orchestrate the complete pipeline, and one of the steps in that DAG is "run dbt" — Airflow decides _when_ and _in what order_ everything runs, dbt decides _how_ the data is transformed once it's already in the warehouse.

| Platform  | Profile                              | Use                              |
| ----------- | ----------------------------------- | -------------------------------- |
| **Airflow** | Scheduled job DAGs        | Orchestrate ETL pipelines by cron |
| **dbt**     | Versioned SQL transformations | Pipeline inside the warehouse    |

## Event Streams

Data flowing in real time between systems, without waiting for a nightly job.

- **Why it exists:** there are data where the value drops drastically if you have to wait for the next scheduled job — a fraudulent transaction that needs to be blocked in the moment, a user event that triggers an immediate notification. Streams solve the case where "the event matters now," not in the next batch.

### Kafka

**Profile:** a distributed log — not a traditional queue that deletes the message when read, but an append-only record where events are retained for a configurable time, and different consumers can read the same stream independently, each at their own pace.

- **Strengths:** decouples producers from consumers (the publisher doesn't know or care who reads), allows re-reading history (a new consumer can "catch up" by reading from the beginning of the log), scales horizontally to very high volumes of events per second.
- **Use cases:** central event bus between microservices, real-time analytics pipelines, any scenario with multiple consumers needing to see the same data flow without competing for messages.
- **Weaknesses:** operating your own Kafka cluster is a real operational burden (though managed versions exist); it's not a database — querying the current state of something requires processing the stream or dumping it to a query-capable store, not its native strength.

### Spark

**Profile:** distributed processing engine covering both batch and streaming under the same programming model — unlike Kafka (which is transport), Spark is compute: it takes data (from a stream, from files, from a database) and processes it at scale.

- **Strengths:** the same conceptual code works for processing an enormous historical dataset (batch) or a continuous stream (structured streaming), in-memory distributed processing making it fast for heavy transformations on large datasets.
- **Use cases:** large-scale data transformations and aggregations that don't fit comfortably in a single process, near-real-time computation on Kafka streams (read from the stream, aggregate, write the result).
- **Weaknesses:** heavier to operate and learn than simpler tools when data volume doesn't justify it — not worth it for small transformations that dbt or a simple script solves better.

**The line between orchestrating and waiting:** batch jobs (via Airflow) when data can wait until the next scheduled interval; streams (via Kafka, processed with Spark or another consumer) when the event matters as soon as it happens. Many architectures use both: Kafka as real-time transport, and an Airflow job that periodically dumps that stream to an analytical store for historical queries.

| Platform | Profile                    | Use                                                  |
| ---------- | ------------------------- | ---------------------------------------------------- |
| **Kafka**  | Distributed stream/log    | Events, analytics, high-scale queues             |
| **Spark**  | Distributed processing | Batch and streaming computation on large datasets |

## ETL / ELT and Lakehouse

The path of data from source to where it's analyzed — and how the final destination is organized.

| Approach       | What it does                                          | When                                  |
| ------------- | ------------------------------------------------- | --------------------------------------- |
| **ETL**       | Extract → transform before loading             | When the destination is slow or expensive       |
| **ELT**       | Load first and transform inside the destination   | Powerful warehouses/lakes               |
| **Lakehouse** | A single store for raw and structured data | Direct analysis on complete data |

- **ETL vs. ELT — why the order changed:** ETL was born in an era where the destination store (the traditional warehouse) was expensive and limited, so transforming _before_ loading minimized what had to be stored and processed there. ELT reverses the order because modern warehouses/lakes are powerful and cheap enough to load raw data first and transform afterward, within the same store — which is exactly the model dbt enables (transforms _inside_ the warehouse, not before arriving).
- **Lakehouse — why it exists:** for years you chose between a _data warehouse_ (structured, fast to query, but rigid and expensive for raw data) or a _data lake_ (cheap, flexible, stores anything, but slow and weak for analytical queries). The lakehouse seeks to combine both: stores raw data with the flexibility of a lake, but adds structure and efficient query capability on top, without needing two separate systems.

### Typical architecture

1. **Ingestion** — data enters from sources (databases, events, files) via streams (Kafka) or batch (Airflow-orchestrated jobs).
2. **Transformation** — cleaned and modeled, orchestrated and versioned — typically dbt inside the warehouse (ELT) or an explicit step before loading (ETL), with Spark if volume demands it.
3. **Consumption** — analytics, BI, data science read from the lakehouse or the already-transformed warehouse, without touching the original raw data.

Each step of this architecture corresponds to one of the pieces described above: ingestion decides between scheduled orchestration or real-time streams, transformation decides between ETL and ELT based on when it's best to clean the data, and the final result lives in the storage form (warehouse, lake, or lakehouse) that best serves the needed consumption.

> DataOps is ops applied to data: just as pipelines give code (CI/CD) its flows, they give data its flows — reproducible, versioned, and monitored. The durable state these flows write is backed up in [ops-backup](../ops-backup/).
