---
eyebrow: Dev / Back-Roadmap
title: Back Stack
subtitle: Un framework por caso de uso, no uno para todo
group: Backend
order: 10
summary: Top 5 de frameworks de backend, benchmarks por fuente y qué resuelven serverless y edge functions.
---

## Guía rápida por caso de uso

| Si necesitas...                       | Usa primero                             | Alternativa                   |
| ------------------------------------- | --------------------------------------- | ----------------------------- |
| Máximo rendimiento, uptime 24/7       | **Drogon** (C++) / **Actix-web** (Rust) | Axum                          |
| Microservicios internos               | **Axum** (Rust)                         | Fastify, Hono                 |
| APIs de alto throughput sin fricción  | **Go (net/http)**                       | Gin, Echo, Fiber              |
| API REST en equipo JS/TS              | **Fastify**                             | Hono (Node), Express (legacy) |
| Backend enterprise / corporativo      | **Spring Boot**                         | ASP.NET Core (C#)             |
| Prototipado rápido / MVP              | **Express**                             | Django, Laravel               |
| Servir modelos ML/IA                  | **FastAPI**                             | Node + ONNX/Transformers      |
| CRUD + admin panel                    | **Django**                              | Laravel, Spring Boot          |
| Serverless / edge                     | **Hono** (Workers/Deno/Bun)             | Oak, Fresh                    |
| Portal web, e-commerce, SaaS monolith | **Laravel**                             | Django                        |
| Máxima velocidad con DX moderna en JS | **Bun** (runtime)                       | Deno                          |

## Top 5

Un framework por lenguaje — el mejor de cada uno — con Axum como excepción: cubre microservicios y ergonomía, nicho que Actix-web no atiende. Crow descartado: Drogon lo supera claramente dentro del mismo lenguaje. Spring Boot pierde su puesto ante Go: en benchmarks net/http es ~10 veces más rápido; sigue siendo la referencia enterprise en la guía por caso de uso.

| Framework            | Lenguaje | Fortaleza                                                        | Elígelo cuando...                                                              | Evítalo cuando...                                                                                                                         |
| -------------------- | -------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Drogon**           | C++      | Máximo throughput, huella mínima de memoria                      | Latencias al microsegundo (trading, infraestructura de red) y dominas C++      | El equipo no domina C++: el coste de mantenimiento cancela la ventaja                                                                     |
| **Actix-web**        | Rust     | El más rápido de Rust, maduro y probado en producción            | Sistemas 24/7 de alta disponibilidad: pagos, game servers, trading             | Quieres RAD o batería incluida: es deliberadamente bajo nivel                                                                             |
| **Go (net/http)**    | Go       | Concurrencia barata en el lenguaje, stdlib lista para producción | APIs de alto throughput con equipo pequeño; goroutines sustituyen al framework | Necesitas genéricos de rendimiento extremo o ecosistema tipo Spring: los frameworks de Go (Gin, Echo, Fiber) aportan poco sobre la stdlib |
| **Axum** (excepción) | Rust     | Ergonomía, tipado fuerte y ecosistema Tower                      | Microservicios internos, API gateways, job queue workers                       | Nadie conoce Rust: Fastify o Hono entregan lo mismo antes                                                                                 |
| **Fastify**          | JS/TS    | Mejor equilibrio rendimiento/DX en Node.js, schemas y tipado     | BFFs, APIs públicas, mucho CRUD en equipos JS/TS                               | El destino es edge/serverless: ahí gana Hono                                                                                              |

## Throughput de frameworks

Cifras orientativas: dependen del hardware, del payload y del tipo de test.

### Tests sintéticos de plaintext — TechEmpower

Respuestas triviales sobre hardware dedicado: miden el techo del framework, no una app real.

| Framework                | RPS aprox.                   | Curva de aprendizaje |
| ------------------------ | ---------------------------- | -------------------- |
| **Drogon** (C++)         | ~1M+                         | Difícil              |
| **Actix-web**            | ~700k                        | Difícil              |
| **Go (net/http)**        | ~500k                        | Fácil                |
| **Axum**                 | ~280k                        | Difícil              |
| **Bun.serve** (runtime)  | ~200k                        | Fácil                |
| **Deno.serve** (runtime) | ~90k                         | Fácil                |
| **Fastify**              | ~80k                         | Fácil                |
| **Oak**                  | ~80k (middleware estilo Koa) | Fácil                |
| **Spring Boot**          | ~50k                         | Difícil              |
| **Express**              | ~35k                         | Muy fácil            |
| **FastAPI**              | ~30k                         | Fácil                |
| **Fresh**                | ~30k (SSR + islands)         | Fácil                |
| **Django**               | ~15k                         | Medio                |
| **Laravel**              | ~15k                         | Fácil                |

Fuente: https://www.techempower.com/benchmarks/

### Carga realista — Sharkbench

Endpoints con trabajo de serialización y BD simulada: otro planeta respecto a plaintext.

| Framework                  | RPS    | Latencia media | RAM      |
| -------------------------- | ------ | -------------- | -------- |
| **Axum** (Rust)            | 26.670 | 1,2 ms         | 16,5 MB  |
| **ASP.NET Core** (C#)      | 17.041 | 1,5 ms         | 101,8 MB |
| **Express** (Node.js)      | 15.270 | 2,0 ms         | 228,4 MB |
| **Drogon** (C++)           | 6.029  | 4,3 ms         | 18,9 MB  |
| **Spring Boot MVC** (Java) | 2.962  | 1,6 ms         | 286,4 MB |
| **Gin** (Go)               | 1.640  | 3,4 ms         | 23,1 MB  |

Fuente: https://sharkbench.dev/web/cpp-drogon

### Por lenguaje (derivado de TechEmpower)

El RPS de un lenguaje es el de su framework referente, misma fuente que la tabla sintética de arriba:

| Lenguaje / Runtime | RPS aprox. (referente)   | Curva de aprendizaje |
| ------------------ | ------------------------ | -------------------- |
| **C++**            | ~1M+ (Drogon)            | Difícil              |
| **Rust**           | ~700k (Actix-web)        | Difícil              |
| **Go**             | ~500k (net/http)         | Fácil                |
| **C# (.NET)**      | ~400k (ASP.NET Core)     | Medio                |
| **Bun**            | ~200k (Bun.serve / Hono) | Fácil                |
| **Deno**           | ~90k (Deno.serve / Hono) | Fácil                |
| **Node.js**        | ~80k (Fastify)           | Fácil                |
| **Java (JVM)**     | ~50k (Spring Boot)       | Difícil              |
| **Python**         | ~30k (FastAPI)           | Fácil                |
| **PHP**            | ~15k (Laravel)           | Fácil                |

Fuente: https://www.techempower.com/benchmarks/

## Serverless y edge functions

Ejecutar código sin administrar servidores, con instancias que arrancan y mueren según demanda. Resuelve tres problemas clásicos del backend:

- **Escalar a cero:** sin tráfico, no pagas nada. Ideal para tráfico intermitente, APIs de baja utilización, cron jobs y webhooks.
- **Despliegue global:** el código corre en cientos de puntos de presencia, a milisegundos del usuario final, sin replicar infraestructura por región.
- **Sin ops:** escala automáticamente ante picos (de 10 a millones de peticiones), sin gestionar capacidad, pools de conexiones ni autoscaling groups.

El precio a pagar es el **arranque en frío**: la primera petición tras un periodo de inactividad espera a que la plataforma cree la instancia. Aquí manda el modelo de ejecución: los contenedores (Lambda) tardan cientos de milisegundos; los aislados V8 (Cloudflare Workers) arrancan en milisegundos o menos. Esa variable — no el throughput warm — decide qué plataforma elegir:

| Runtime                | Cold start (arranque en frío)                    | Warm P95     | Warm P99 | RAM aprox.      | Notas                                                                                                         |
| ---------------------- | ------------------------------------------------ | ------------ | -------- | --------------- | ------------------------------------------------------------------------------------------------------------- |
| **Cloudflare Workers** | <1–5 ms¹                                         | ~9 ms        | n/d      | <5–10 MB        | Sin cold starts percibibles (aislados V8, core de 14 kB); ~45k req/s simuladas                                |
| **Bun**                | ~90–200 ms²                                      | ~8 ms (p50)  | ~27 ms   | ~30–50 MB base  | ~42k req/s; la mejor latencia warm del ecosistema JS                                                          |
| **Deno**               | ~50–120 ms²                                      | n/d          | n/d      | n/d             | El runtime con cold start más rápido fuera del edge: 71 % más rápido que Bun y 77 % más rápido que Node en VM |
| **Node.js**            | 80–200 ms (Lambda) / hasta 800 ms–2 s sin tunear | ~12 ms (p50) | ~41 ms   | ~40–100 MB base | ~29–30k req/s; el cold start es culpa del runtime, no de Hono                                                 |

¹ Cloudflare no publica cold starts para Workers: el modelo de islas V8 los elimina en la práctica; los milisegundos restantes corresponden a la carga del script.
² Medidas en VM/Lambda; en local el arranque en frío es prácticamente instantáneo en los tres.

**Cuándo elegir este modelo:** tráfico intermitente o impredecible, audiencia geográficamente distribuida, APIs ligeras sin conexiones persistentes largas. **Cuándo evitarlo:** conexiones WebSocket de larga duración pesadas, bases de datos con pooling restrictivo (aunque Workers ofrece Durable Objects y Hyperdrive para mitigarlo) y workloads de cómputo intensivo sostenido — el límite de CPU por petición y el coste por invocación te pasan factura.

Regla práctica: para tráfico intermitente o edge, Workers es el único runtime donde el cold start deja de importar. En servidor dedicado, Bun da la mejor latencia warm y Node queda último — aunque en APIs de ~100 req/s la diferencia apenas se nota.

**Fuentes de la comparativa por runtime:**

- Benchmark de cold starts en AWS Lambda por runtime (Deno): https://deno.com/blog/aws-lambda-coldstart-benchmarks
- Comparativa de frameworks edge (Kanopy Labs): https://kanopylabs.com/blog/deno-fresh-vs-hono-vs-nitro-edge
- Benchmarks oficiales de Hono (Workers/Bun/Deno/Node): https://hono.dev/docs/concepts/benchmarks
