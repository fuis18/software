---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Modern Data Stack
subtitle: Data platform tools and architecture
---

The Modern Data Stack (MDS) is a modular set of cloud-native, composable, and open-source tools designed to build scalable, maintainable, and AI-ready data platforms. It focuses on flexibility, real-time capabilities, and ease of integration between components.

## 0. Data Sources

The starting point of any data platform: systems that generate the raw data to be ingested (databases, SaaS applications, APIs, events, logs, or streaming sources).

## 1. Ingestion (EL/ELT)

Tools responsible for extracting and loading data from sources into storage, either in batch (ELT) or real-time (CDC/streaming).

| Tool | Profile | Use Case |
|---|---|---|
| [Vector (Datadog)](https://vector.dev/) | Event, log, and streaming ingestion | High-throughput ingestion of events, logs, and streaming data. Operational telemetry lives in [ops-observability](../ops-observability/). |
| [Estuary Flow](https://estuary.dev/) | Real-time ingestion (CDC) | Change Data Capture (CDC) with low-latency streaming, built in Rust. |
| [Meltano](https://meltano.com/) | ELT with Singer connectors | Extract and load data from SaaS APIs and databases directly into data warehouses/lakehouses. |

## 2. Storage (Warehouse/Lakehouse)

Where raw and processed data is stored in a structured, queryable format optimized for analytics and AI workloads.

| Tool | Profile | Use Case |
|---|---|---|
| [Apache DataFusion](https://datafusion.apache.org/) | High-performance query engine | Build custom data warehouses or accelerate existing engines like Spark. |
| [LanceDB / Lance](https://lancedb.com/) | Columnar format with vector support | Ultra-fast analytics for structured data with native AI/vector search capabilities. |
| [delta-rs](https://delta-io.github.io/delta-rs/) | Delta Lake reader/writer | Lightweight read/write access to Delta tables without requiring the JVM or Spark. |

## 3. Transformation & Modeling (T)

Tools that clean, model, and validate data to make it analytics-ready, with a focus on reproducibility, testing, and DataOps practices.

| Tool | Profile | Use Case |
|---|---|---|
| [SDF](https://www.sdf.com/) | Static SQL compiler | Column-level lineage, local type checking, and early error detection before deployment. |
| [SQLMesh](https://sqlmesh.readthedocs.io/) | DataOps & virtual environments | Zero-copy data previews, semantic analysis, and safe, testable schema changes. |
| [Sqruff / SQLFluff](https://sqlfluff.com/) | SQL linter and validator | Automated SQL syntax/quality validation in CI/CD pipelines, optimized for Linux environments. |

## 4. Consumption (Analytics, AI & BI)

The layer where data is exposed to end users, analysts, data scientists, or AI agents for decision-making and exploration.

| Tool | Profile | Use Case |
|---|---|---|
| [Rill](https://www.rilldata.com/) | BI-as-Code & operational analytics | Define metrics and dashboards in YAML/SQL, with direct consumption via MCP for AI agents. |
| [Marimo](https://marimo.io/) | Reactive notebooks for data science & AI | Pure `.py` files, zero hidden state, Git-friendly, and executable directly from CLI. |
| [Quarto](https://quarto.org/) | Technical publishing | Create reports, executive documents, books, and analytical portals directly from code. |
| [R Shiny](https://shiny.posit.co/) | Interactive statistical web apps | Transform R analyses into interactive web applications without writing JavaScript, CSS, or HTML. |

## 5. Cross-cutting (Architecture Support)

Supporting capabilities that ensure reliability, governance, and automation across the entire data platform. Operational observability — metrics, logs, and traces — lives in [ops-observability](../ops-observability/).

| Concern | Tool | Use Case |
|---|---|---|
| Orchestration | [Kestra](https://kestra.io/) | Reliable workflow orchestration to schedule, monitor, and coordinate data pipelines. |
| Data Quality | [Soda Core](https://www.soda.io/) | Automated data quality checks, anomaly detection, and validation across datasets. |
| Data Governance & Catalog | [OpenLineage](https://openlineage.io/) & [Marquez](https://marquezproject.ai/) | End-to-end data lineage tracking, metadata management, and data discovery. |

## MDS vs. Traditional Data Stack

| Aspect | Traditional Data Stack | Modern Data Stack (MDS) |
|---|---|---|
| Architecture | Monolithic, tightly coupled | Modular, composable, and best-of-breed |
| Deployment | On-premises heavy, JVM-dependent | Cloud-native, lightweight, often Rust/Go-based |
| Integration | ETL-heavy, rigid | ELT-first, API-driven, CDC/real-time oriented |
| Governance & Lineage | Often manual or limited | Built-in observability, lineage, and data quality |
| AI Readiness | Not optimized for vectors/LLMs | Designed with AI, MCP, and vector workloads in mind |

## Related

- [ops-data-modeling](../ops-data-modeling/) — Star schemas, materialized views, and columnar analytical engines.
- [ops-dataops](../ops-dataops/) — DataOps practices, automation, and CI/CD for data workflows.
- [ops-observability](../ops-observability/) — Monitoring, tracing, and observability for data and systems.