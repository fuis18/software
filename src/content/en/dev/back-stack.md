---
eyebrow: Dev / Back-Roadmap
title: Back Stack
subtitle: A framework per use case, not one for everything
group: Backend
order: 10
summary: Top 5 of backend frameworks, benchmarks by source, and what serverless and edge functions solve.
---

## Quick guide by use case

| If you need...                          | Use first                                | Alternative                   |
| --------------------------------------- | ---------------------------------------- | ----------------------------- |
| Maximum performance, 24/7 uptime        | **Drogon** (C++) / **Actix-web** (Rust)  | Axum                          |
| Internal microservices                  | **Axum** (Rust)                          | Fastify, Hono                 |
| Frictionless high-throughput APIs       | **Go (net/http)**                        | Gin, Echo, Fiber              |
| REST API in a JS/TS team                | **Fastify**                              | Hono (Node), Express (legacy) |
| Enterprise / corporate backend          | **Spring Boot**                          | ASP.NET Core (C#)             |
| Rapid prototyping / MVP                 | **Express**                              | Django, Laravel               |
| Serving ML/AI models                    | **FastAPI**                              | Node + ONNX/Transformers      |
| CRUD + admin panel                      | **Django**                               | Laravel, Spring Boot          |
| Serverless / edge                       | **Hono** (Workers/Deno/Bun)              | Oak, Fresh                    |
| Web portal, e-commerce, SaaS monolith   | **Laravel**                              | Django                        |
| Max speed with modern DX in JS          | **Bun** (runtime)                        | Deno                          |

## Top 5

One framework per language — the best of each — with Axum as the exception: it covers microservices and ergonomics, a niche Actix-web doesn't serve. Crow discarded: Drogon clearly beats it within the same language. Spring Boot loses its spot to Go: in net/http benchmarks it's ~10 times faster; it remains the enterprise reference in the use-case guide.

| Framework            | Language | Strength                                                       | Choose it when...                                                             | Avoid it when...                                                                                                                        |
| -------------------- | -------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Drogon**           | C++      | Maximum throughput, minimal memory footprint                    | Microsecond latencies (trading, network infrastructure) and you master C++   | The team doesn't master C++: maintenance cost cancels out the advantage                                                                 |
| **Actix-web**        | Rust     | The fastest in Rust, mature and proven in production           | 24/7 high-availability systems: payments, game servers, trading               | You want RAD or batteries included: it's deliberately low-level                                                                         |
| **Go (net/http)**    | Go       | Cheap concurrency in the language, production-ready stdlib     | High-throughput APIs with a small team; goroutines replace the framework      | You need extreme-performance generics or a Spring-like ecosystem: Go frameworks (Gin, Echo, Fiber) add little over the stdlib           |
| **Axum** (exception) | Rust     | Ergonomics, strong typing and the Tower ecosystem              | Internal microservices, API gateways, job queue workers                       | Nobody knows Rust: Fastify or Hono deliver the same sooner                                                                              |
| **Fastify**          | JS/TS    | Best performance/DX balance in Node.js, schemas and typing     | BFFs, public APIs, lots of CRUD in JS/TS teams                                | The target is edge/serverless: Hono wins there                                                                                          |

## Framework throughput

Rough figures: they depend on the hardware, the payload, and the test type.

### Synthetic plaintext tests — TechEmpower

Trivial responses on dedicated hardware: they measure the framework's ceiling, not a real app.

| Framework                | Approx. RPS                  | Learning curve |
| ------------------------ | ---------------------------- | -------------- |
| **Drogon** (C++)         | ~1M+                         | Hard           |
| **Actix-web**            | ~700k                        | Hard           |
| **Go (net/http)**        | ~500k                        | Easy           |
| **Axum**                 | ~280k                        | Hard           |
| **Bun.serve** (runtime)  | ~200k                        | Easy           |
| **Deno.serve** (runtime) | ~90k                         | Easy           |
| **Fastify**              | ~80k                         | Easy           |
| **Oak**                  | ~80k (Koa-style middleware)  | Easy           |
| **Spring Boot**          | ~50k                         | Hard           |
| **Express**              | ~35k                         | Very easy      |
| **FastAPI**              | ~30k                         | Easy           |
| **Fresh**                | ~30k (SSR + islands)         | Easy           |
| **Django**               | ~15k                         | Medium         |
| **Laravel**              | ~15k                         | Easy           |

Source: https://www.techempower.com/benchmarks/

### Realistic load — Sharkbench

Endpoints with serialization work and a simulated database: a different planet from plaintext.

| Framework                  | RPS    | Avg. latency | RAM      |
| -------------------------- | ------ | ------------ | -------- |
| **Axum** (Rust)            | 26,670 | 1.2 ms       | 16.5 MB  |
| **ASP.NET Core** (C#)      | 17,041 | 1.5 ms       | 101.8 MB |
| **Express** (Node.js)      | 15,270 | 2.0 ms       | 228.4 MB |
| **Drogon** (C++)           | 6,029  | 4.3 ms       | 18.9 MB  |
| **Spring Boot MVC** (Java) | 2,962  | 1.6 ms       | 286.4 MB |
| **Gin** (Go)               | 1,640  | 3.4 ms       | 23.1 MB  |

Source: https://sharkbench.dev/web/cpp-drogon

### By language (derived from TechEmpower)

A language's RPS is that of its reference framework, same source as the synthetic table above:

| Language / Runtime | Approx. RPS (reference)  | Learning curve |
| ------------------ | ------------------------ | -------------- |
| **C++**            | ~1M+ (Drogon)            | Hard           |
| **Rust**           | ~700k (Actix-web)        | Hard           |
| **Go**             | ~500k (net/http)         | Easy           |
| **C# (.NET)**      | ~400k (ASP.NET Core)     | Medium         |
| **Bun**            | ~200k (Bun.serve / Hono) | Easy           |
| **Deno**           | ~90k (Deno.serve / Hono) | Easy           |
| **Node.js**        | ~80k (Fastify)           | Easy           |
| **Java (JVM)**     | ~50k (Spring Boot)       | Hard           |
| **Python**         | ~30k (FastAPI)           | Easy           |
| **PHP**            | ~15k (Laravel)           | Easy           |

Source: https://www.techempower.com/benchmarks/

## Serverless and edge functions

Run code without managing servers, with instances that start and die on demand. It solves three classic backend problems:

- **Scale to zero:** no traffic, you pay nothing. Ideal for intermittent traffic, low-usage APIs, cron jobs, and webhooks.
- **Global deployment:** the code runs in hundreds of points of presence, milliseconds from the end user, without replicating infrastructure per region.
- **No ops:** scales automatically on spikes (from 10 to millions of requests), with no capacity management, connection pools, or autoscaling groups.

The price to pay is the **cold start**: the first request after an idle period waits for the platform to create the instance. The execution model rules here: containers (Lambda) take hundreds of milliseconds; V8 isolates (Cloudflare Workers) start in milliseconds or less. That variable — not warm throughput — decides which platform to choose:

| Runtime                | Cold start                                        | Warm P95     | Warm P99 | Approx. RAM     | Notes                                                                                                          |
| ---------------------- | ------------------------------------------------- | ------------ | -------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| **Cloudflare Workers** | <1–5 ms¹                                          | ~9 ms        | N/A      | <5–10 MB        | No perceptible cold starts (V8 isolates, 14 kB core); ~45k req/s simulated                                     |
| **Bun**                | ~90–200 ms²                                       | ~8 ms (p50)  | ~27 ms   | ~30–50 MB base  | ~42k req/s; the best warm latency in the JS ecosystem                                                          |
| **Deno**               | ~50–120 ms²                                       | N/A          | N/A      | N/A             | The runtime with the fastest cold start outside the edge: 71% faster than Bun and 77% faster than Node in VM    |
| **Node.js**            | 80–200 ms (Lambda) / up to 800 ms–2 s without tuning | ~12 ms (p50) | ~41 ms   | ~40–100 MB base | ~29–30k req/s; the cold start is the runtime's fault, not Hono's                                               |

¹ Cloudflare doesn't publish cold starts for Workers: the V8 isolate model eliminates them in practice; the remaining milliseconds correspond to script loading.
² Measured in VM/Lambda; locally the cold start is practically instant in all three.

**When to choose this model:** intermittent or unpredictable traffic, geographically distributed audience, lightweight APIs without long-lived persistent connections. **When to avoid it:** heavy long-lived WebSocket connections, databases with restrictive pooling (though Workers offers Durable Objects and Hyperdrive to mitigate it), and sustained compute-intensive workloads — the per-request CPU limit and the cost per invocation will bill you.

Rule of thumb: for intermittent traffic or edge, Workers is the only runtime where the cold start stops mattering. On a dedicated server, Bun gives the best warm latency and Node comes last — though in ~100 req/s APIs the difference is barely noticeable.

**Sources for the runtime comparison:**

- AWS Lambda cold start benchmark by runtime (Deno): https://deno.com/blog/aws-lambda-coldstart-benchmarks
- Edge framework comparison (Kanopy Labs): https://kanopylabs.com/blog/deno-fresh-vs-hono-vs-nitro-edge
- Official Hono benchmarks (Workers/Bun/Deno/Node): https://hono.dev/docs/concepts/benchmarks
