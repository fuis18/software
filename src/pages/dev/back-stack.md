---
layout: ../../layouts/Layout.astro
eyebrow: Dev / Back-Architecture
title: Back Stack
subtitle: Un framework por caso de uso, no uno para todo
---

## Resumen

| Framework           | Lenguaje   | Uso principal                                             | Ejemplos                                                        |
| ------------------- | ---------- | --------------------------------------------------------- | --------------------------------------------------------------- |
| **Actix-web**       | Rust       | Sistemas 24/7 de alta disponibilidad                      | Procesadores de pagos, game servers, trading                    |
| **Axum** / **Loco** | Rust       | Microservicios internos                                   | Auth service, API gateway, job queue workers                    |
| **Fastify**         | Javascript | APIs REST en equipos JS/TS                                | BFF, APIs públicas, servicios con mucho CRUD                    |
| **Spring Boot**     | Java (JVM) | Backend enterprise / corporativo                          | Banca, ERPs, sistemas de salud, Fortune 500                     |
| **Express**         | Javascript | Prototipeo rápido, APIs legacy y microservicios sencillos | MVPs, middlewares, microservicios ligeros, proyectos educativos |
| **FastAPI**         | Python     | Servir modelos ML/IA                                      | Inference endpoints, pipelines de datos, LLM APIs               |
| **Django**          | Python     | Web apps con mucho CRUD y admin                           | CMSs, portales internos, dashboards operativos                  |
| **Hono**            | Javascript | Serverless / edge                                         | Middleware CDN, auth en el borde, APIs en Workers               |
| **Laravel**         | PHP        | Portales web tradicionales, e-commerce y SaaS monoliths   | Tiendas online, CMSs (WordPress), plataformas SaaS, APIs REST   |

## Benchmarks (aprox.)

Números orientativos de throughput (requests/segundo) y curva de aprendizaje — sirven para comparar en relativo, no como cifra absoluta: dependen del hardware, el payload y el tipo de test.

| Framework       | RPS aprox.                 | Curva de aprendizaje |
| --------------- | -------------------------- | -------------------- |
| **Actix-web**   | ~300k                      | Difícil              |
| **Axum**        | ~280k                      | Difícil              |
| **Fastify**     | ~80k                       | Fácil                |
| **Spring Boot** | ~50k                       | Difícil              |
| **Express**     | ~35k                       | Muy fácil            |
| **FastAPI**     | ~30k                       | Fácil                |
| **Django**      | ~15k                       | Medio                |
| **Hono**        | varía según runtime (edge) | Fácil                |
| **Laravel**     | ~15k                       | Fácil                |
