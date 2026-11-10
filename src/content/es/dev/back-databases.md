---
eyebrow: Dev
title: Back Databases
subtitle: Bases de datos y cuándo usar cada una
group: Backend
order: 12
summary: Bases de datos y cuándo usar cada una, comparadas en BASE, JOINs, escalabilidad y disponibilidad, y ORMs.
---

Dos familias, dos lógicas: SQL mantiene todos los datos consistentes bajo un solo modelo relacional; NoSQL se separa en modelos especializados, cada uno dominando su nicho.

## Los dos contratos

- **ACID (SQL)** — transacción entera o nada, datos siempre válidos, concurrentes sin interferirse, confirmado = sobrevive a caídas.
- **BASE (NoSQL)** — siempre responde (aunque el dato esté obsoleto), el estado es temporal (TTL, réplicas convergiendo) y sin escrituras nuevas todas las réplicas convergen — eventualmente. Trueque: consistencia fuerte ↔ disponibilidad y partición (CAP).

## SQL (relacional)

- **SQLite** — Embebida: toda la BD es un archivo local, sin servidor.
- **PostgreSQL** — Servidor object-relational, extensiones para todo (PostGIS, pgvector), JSONB.
- **MariaDB** — Fork open-source (GPL) de MySQL, drop-in y con Galera multi-primario.

| Característica          | SQLite                               | PostgreSQL                            | MariaDB                              |
| ----------------------- | ------------------------------------ | ------------------------------------- | ------------------------------------ |
| **Uso principal**       | Móvil, escritorio, edge, local-first | Web con datos estructurados (default) | SaaS multiregión, migrar desde MySQL |
| **ACID**                | ✅ Sí                                | ✅ Sí                                 | ✅ Sí (InnoDB)                       |
| **JOINs**               | ✅ Sí                                | ✅ Sí                                 | ✅ Sí                                |
| **Escalabilidad**       | ❌ Local                             | ⚠️ Vertical                           | ⚠️ Vertical + Galera                 |
| **Reads/s**             | ⚡⚡⚡ Ultra                         | ⚡⚡ Rápido                           | ⚡⚡ Rápido                          |
| **Writes/s**            | ⚡⚡ Rápido                          | ⚡⚡ Rápido                           | ⚡⚡⚡ Ultra                         |
| **Esquema flexible**    | ❌ No                                | ⚠️ JSONB                              | ⚠️ JSON                              |
| **Alta disponibilidad** | ❌ No                                | ⚠️ Réplica                            | ✅ Galera (multi-primario)           |

## NoSQL

- **Documentos** (MongoDB) — JSON sin esquema fijo; lee el agregado entero de una llamada. JOINs solo vía `$lookup`.
- **Clave-valor** (Redis) — Clave → valor en memoria, lecturas sub-milisegundo; solo consultas por clave.
- **Columna ancha** (Cassandra) — Tablas particionadas por clave; todos los nodos aceptan escrituras. Consultas atadas a la clave de partición. Los engines columnares analíticos (ClickHouse, Redshift) van en [ops-data-modeling](../../ops/ops-data-modeling/).
- **Grafo** (Neo4j) — Nodos y relaciones de primera clase (Cypher); recorre relaciones sin JOINs encadenados. Caso único: es ACID, su NoSQL está en el modelo, no en el contrato.
- **Vectorial** (Qdrant) — Embeddings, busca por similitud (coseno); a veces es solo pgvector sobre PostgreSQL.

| Característica          | MongoDB                   | Cassandra              | Redis                  | Neo4j                                 | Qdrant                  |
| ----------------------- | ------------------------- | ---------------------- | ---------------------- | ------------------------------------- | ----------------------- |
| **Uso principal**       | Catálogos, CMS, APIs REST | IoT, time-series, logs | Caché, sesiones, colas | Redes sociales, fraude, recomendación | RAG, búsqueda semántica |
| **BASE**                | ⚠️ Eventual (por defecto) | ✅ Nativo              | ⚠️ Eventual (réplicas) | ❌ Es ACID                            | ⚠️ Eventual             |
| **JOINs**               | ⚠️ $lookup                | ❌ No                  | ❌ No                  | ✅ Nativo                             | ❌ No                   |
| **Escalabilidad**       | ✅ Horizontal             | ✅✅ Masiva            | ✅ Horizontal          | ⚠️ Medio                              | ✅ Horizontal           |
| **Reads/s**             | ⚡⚡ Rápido               | ⚡⚡⚡ Ultra           | ⚡⚡⚡⚡ Extremo       | ⚡ Medio                              | ⚡⚡⚡ Ultra            |
| **Writes/s**            | ⚡⚡⚡ Ultra              | ⚡⚡⚡⚡ Extremo       | ⚡⚡⚡⚡ Extremo       | ⚡ Medio                              | ⚡⚡ Rápido             |
| **Esquema flexible**    | ✅ Sí                     | ⚠️ Semi                | ✅ Sí                  | ❌ No                                 | ⚠️ Semi                 |
| **Alta disponibilidad** | ✅ Réplica                | ✅✅ Nativa            | ✅ Sentinel            | ⚠️ Cluster                            | ✅ Cluster              |

## ¿SQL o NoSQL?

Datos de forma estable, consultas que cruzan entidades, cero datos obsoletos → SQL. Modelo que cambia rápido, acceso por clave o similitud, escala distribuida → la NoSQL del nicho. En la práctica se combinan: PostgreSQL como fuente de verdad + Redis como caché, o JSONB/pgvector para no operar más motores.

## ORMs — uno por lenguaje del Top 5

Mismo criterio que en [back-stack](../back-stack/): el mejor representante por lenguaje, sin repetir.

| ORM        | Lenguaje   | Combina con     | Nota                                              |
| ---------- | ---------- | --------------- | ------------------------------------------------- |
| **ODB**    | C++        | Drogon          | Genera código desde headers; maduro pero de nicho |
| **SeaORM** | Rust       | Actix-web, Axum | Async nativo; estándar de facto del ecosistema    |
| **GORM**   | Go         | net/http, Gin   | El más usado de Go; sqlc para queries críticas    |
| **Prisma** | TypeScript | Fastify, Hono   | Schema declarativo + cliente tipado autogenerado  |

Contraparte ligera si prefieres SQL sin ocultar: **Drizzle** (TS) y **sqlx** (Rust, verificado en compilación).

## Recursos

**BaaS**:

- [turso.tech](https://turso.tech) — SQLite en el borde.
- [PlanetScale](https://planetscale.com) — MySQL serverless.

**Práctica**:

- [sqlbolt.com](https://sqlbolt.com) — practicar SQL interactivamente.
