---
layout: ../../../layouts/Layout.astro
eyebrow: Dev / Back-Roadmap
title: Back Stack
subtitle: A framework per use case, not one for everything
---

## Overview

| Framework           | Language   | Primary Use                                             | Examples                                                       |
| ------------------- | ---------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| **Actix-web**       | Rust       | 24/7 high-availability systems                          | Payment processors, game servers, trading                      |
| **Axum** / **Loco** | Rust       | Internal microservices                                  | Auth service, API gateway, job queue workers                   |
| **Fastify**         | Javascript | REST APIs in JS/TS teams                                | BFF, public APIs, services with lots of CRUD                   |
| **Spring Boot**     | Java (JVM) | Enterprise / corporate backend                          | Banking, ERPs, healthcare systems, Fortune 500                 |
| **Express**         | Javascript | Rapid prototyping, legacy APIs and simple microservices | MVPs, middlewares, lightweight microservices, educational projects |
| **FastAPI**         | Python     | Serving ML/AI models                                    | Inference endpoints, data pipelines, LLM APIs                  |
| **Django**          | Python     | Web apps with lots of CRUD and admin                    | CMSs, internal portals, operational dashboards                 |
| **Hono**            | Javascript | Serverless / edge                                       | CDN middleware, edge auth, Workers APIs                         |
| **Laravel**         | PHP        | Traditional web portals, e-commerce and SaaS monoliths  | Online stores, CMSs (WordPress), SaaS platforms, REST APIs     |

## Benchmarks (approx.)

Indicative throughput numbers (requests/second) and learning curve — useful for relative comparison, not as absolute figures: they depend on hardware, payload, and test type.

| Framework       | RPS approx.                 | Learning Curve |
| --------------- | --------------------------- | -------------- |
| **Actix-web**   | ~300k                       | Hard           |
| **Axum**        | ~280k                       | Hard           |
| **Fastify**     | ~80k                        | Easy           |
| **Spring Boot** | ~50k                        | Hard           |
| **Express**     | ~35k                        | Very easy      |
| **FastAPI**     | ~30k                        | Easy           |
| **Django**      | ~15k                        | Medium         |
| **Hono**        | varies by runtime (edge)    | Easy           |
| **Laravel**     | ~15k                        | Easy           |
