---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Observability
subtitle: Metrics, logs, and traces
---

When running real software, what matters is being able to answer "what is happening?" without guessing. Observability is the three signals that enable this — metrics, logs, and traces — plus the dashboards that make them readable.

## The three signals

| Signal        | What it is                                                              | Answers             |
| ------------ | ------------------------------------------------------------------- | ---------------------- |
| **Metrics** | Aggregated numbers over time (requests/s, CPU usage, latency) | Is it performing? Is it degrading?   |
| **Logs**     | Discrete events with context (errors, requests, changes)         | What exactly happened? |
| **Traces**   | The journey of a request through services (spans)               | Where was it slow?          |

The three signals don't compete, they complement each other in a natural investigation flow — and in that order is how they're typically used:

- **Metrics** see the symptom at an aggregate level: the spike, the drop, the slope. They're cheap to collect and evaluate because they come pre-aggregated — it's the first thing looked at and what triggers an alert.
- **Traces** connect the symptom to the cause: once the metric says "latency went up," the trace shows _in which specific request_, and within that request, _in which service and which call_ the time was spent.
- **Logs** give the detail of a specific event — once the service and exact moment are identified (thanks to the trace), the log tells _what happened there_: the stack trace, the error message, the payload. Without that prior context (metric → trace), searching logs blindly is looking for a needle in a haystack; with context, you know exactly where to look.

**Why more than one signal is needed:** each answers a question the others can't. A metric says something is wrong but doesn't say why; a log says exactly what happened but only if you already know where to look; a trace connects both by showing the path the request took. A system with only one of the three has a structural blind spot.

## Collection

Each signal has its own collection model — and choosing the right tool depends on understanding that model, not just comparing features.

### Prometheus

**Profile:** the metrics standard — models everything as time series, and instead of each service pushing its data, Prometheus does _scraping_: it periodically connects to an endpoint each service exposes and reads the current values.

- **Strengths:** the _pull_ model simplifies operations greatly (no need to worry about each service knowing where to send data, or a centralized collector receiving load from thousands of sources at once); PromQL is a very expressive query language for time series (rates, percentiles, aggregations); it's the de facto standard in the Kubernetes world, with exporters for practically any system.
- **Use cases:** infrastructure and application monitoring in general, the foundation of alerts for almost any modern stack, especially strong in Kubernetes environments.
- **Weaknesses:** the pull model isn't ideal for short-duration jobs (a batch job that ends before the next scrape may not be recorded, though _Pushgateway_ exists as a patch for this case); Prometheus alone isn't designed for very long data retention (that's what separate _remote storage_ solutions like Thanos or Mimir are for).

### OpenTelemetry

**Profile:** not a storage backend, but a unified instrumentation and transport framework — the "glue" that standardizes how the three signals are generated and sent, without tying them to a specific vendor.

- **Strengths:** instrument the application once and send the result to any compatible backend (Prometheus, a SaaS, ELK), avoiding vendor lock-in; unifies the vocabulary between metrics, logs, and traces — something each system previously resolved on its own with different formats.
- **Use cases:** any organization wanting to avoid _vendor lock-in_ in its observability layer, or needing to correlate the three signals consistently across services written in different languages.
- **Weaknesses:** still a relatively young standard — the coverage and maturity of automatic instrumentation varies by language and framework; adds an extra configuration layer (collectors, exporters) that needs to be understood.

### ELK / OpenSearch

**Profile:** a log stack — ingestion, indexing, search, and visualization, typically Elasticsearch/OpenSearch (storage + search), Logstash or Fluentd (ingestion), and Kibana/OpenSearch Dashboards (visualization).

- **Strengths:** very powerful full-text search over large log volumes, ability to index and correlate structured fields within each log, dashboards and visualizations built on that same data.
- **Use cases:** centralizing logs from many services in a single searchable place, forensic incident investigation (searching "all lines with this request ID" across all services).
- **Weaknesses:** log volume can grow very fast and become expensive to store and index without a clear retention/sampling policy; without the discipline of structuring logs (consistent fields, sufficient context), it degrades quickly to hard-to-use plain text.

### Datadog

**Profile:** all-in-one SaaS — covers metrics, logs, traces, dashboards, and alerts within a single managed platform, without the team having to operate the observability infrastructure.

- **Strengths:** very fast integration (agents and integrations for practically any system), native correlation between the three signals within the same UI without having to piece together different tools, zero operational load (no need to scale or maintain the observability backend).
- **Use cases:** teams prioritizing adoption speed and not wanting to invest engineering time in operating their own observability stack.
- **Weaknesses:** cost — bills per host, per log volume, per custom metric, and can scale fast and unpredictably with system growth; vendor lock-in, since migrating from an all-in-one SaaS to another solution requires reinstrumenting or at least reconfiguring significantly.

| Platform           | Type                                    | Use                                                           |
| -------------------- | --------------------------------------- | ------------------------------------------------------------- |
| **Prometheus**       | Metrics (scraping, time series)   | The metrics standard, with PromQL                           |
| **OpenTelemetry**    | Unified telemetry framework       | Generate and transport the three signals in a standardized way |
| **ELK / OpenSearch** | Logs (ingestion + search + dashboard) | Centralize and search logs                                  |
| **Datadog**          | All-in-one SaaS                        | End-to-end managed observability                    |
| **Grafana**          | Dashboard visualization             | Dashboards and alerts on any source                   |

> In practice, many stacks combine pieces: OpenTelemetry for unified instrumentation, Prometheus as the metrics backend, ELK for logs, and a SaaS like Datadog when you don't want to operate any of this — the choice isn't always "a single tool for everything."

## Dashboards and Alerts

- **Dashboards** — group the relevant series into a view: the screen someone opens when "something seems off." A good dashboard doesn't show everything you _could_ measure, but what's needed to answer the question someone will have at 3am.
- **Grafana** is the open-stack visualization standard: queries PromQL directly against Prometheus, builds dashboards on metrics, logs, and traces from any source, and defines alerts — the natural complement to Prometheus covered above.
- **Alerts** — the difference between observing and acting: rules on metrics that notify when something goes out of range. An observability platform without alerts is just a place where data goes to die without anyone looking in time. The "what gets alerted and to whom" is covered in [ops-incident](../ops-incident/).

### Principles

- **Metrics over logs for alerting** — numbers are stable, cheap to evaluate continuously, and come pre-aggregated; evaluating an alert condition on raw logs is slower and more expensive. Logs are for investigating _after_ the metric already signaled something is happening, not for detecting it in the first place.
- **Baselines** — there's no reliable alert without knowing the system's normal value: a "CPU at 80%" alert means nothing if you don't know whether that system normally runs at 30% or 75%. Without baselines, alerts end up being arbitrary thresholds that generate noise (false positives) or dangerous silence (false negatives).
- **Live dashboards** — if a view isn't looked at, it's not a dashboard, it's decoration: a dashboard nobody opens isn't generating value, just consuming maintenance every time a metric it represents changes.

> Observability isn't added at the end: it's designed alongside the system. A request without a trace and a log without context don't help when the service goes down — and the definitive health reading is completed with [ops-reliability](../ops-reliability/) practices.
