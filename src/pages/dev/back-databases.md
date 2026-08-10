---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Back Databases
subtitle: Bases de datos y cuándo usar cada una
---

## Bases de datos

| Name           | Type              | Feature                             | Use                                     |
| -------------- | ----------------- | ----------------------------------- | --------------------------------------- |
| **SQLite**     | SQL               | Embedded, serverless, archivo único | Apps móviles, escritorio                |
| **PostgreSQL** | SQL               | ACID, extensible, flexible          | Aplicaciones web                        |
| **MongoDB**    | Document Store    | Esquema flexible, sharding          | APIs REST, catálogos, CMS               |
| **Cassandra**  | Wide Column Store | Sin punto único de fallo, escalable | IoT, time-series, alta disponibilidad   |
| **Redis**      | Key-Value         | In-memory, rápido, TTL              | Caché, sesiones, real-time              |
| **Neo4j**      | Graph Database    | Consultas de relaciones (Cypher)    | Redes sociales, recomendaciones, fraude |
| **Qdrant**     | Vector Database   | Búsqueda vectorial, embeddings      | RAG, búsqueda semántica, ML/AI          |

## Comparativa

| Característica          | SQLite       | PostgreSQL  | MongoDB       | Cassandra        | Redis            | Neo4j      | Qdrant        |
| ----------------------- | ------------ | ----------- | ------------- | ---------------- | ---------------- | ---------- | ------------- |
| **ACID**                | ✅ Sí        | ✅ Sí       | ⚠️ Config.    | ❌ Eventual      | ⚠️ Limitado      | ✅ Sí      | ⚠️ Eventual   |
| **JOINs**               | ✅ Sí        | ✅ Sí       | ⚠️ $lookup    | ❌ No            | ❌ No            | ✅ Nativo  | ❌ No         |
| **Escalabilidad**       | ❌ Local     | ⚠️ Vertical | ✅ Horizontal | ✅✅ Masiva      | ✅ Horizontal    | ⚠️ Medio   | ✅ Horizontal |
| **Reads/s**             | ⚡⚡⚡ Ultra | ⚡⚡ Rápido | ⚡⚡ Rápido   | ⚡⚡⚡ Ultra     | ⚡⚡⚡⚡ Extremo | ⚡ Medio   | ⚡⚡⚡ Ultra  |
| **Writes/s**            | ⚡⚡ Rápido  | ⚡⚡ Rápido | ⚡⚡⚡ Ultra  | ⚡⚡⚡⚡ Extremo | ⚡⚡⚡⚡ Extremo | ⚡ Medio   | ⚡⚡ Rápido   |
| **Esquema flexible**    | ❌ No        | ⚠️ JSONB    | ✅ Sí         | ⚠️ Semi          | ✅ Sí            | ❌ No      | ⚠️ Semi       |
| **Alta disponibilidad** | ❌ No        | ⚠️ Réplica  | ✅ Réplica    | ✅✅ Nativa      | ✅ Sentinel      | ⚠️ Cluster | ✅ Cluster    |

### Cómo elegir

- **SQL relacional** (SQLite, PostgreSQL) cuando importa ACID y JOINs — la mayoría de las apps con datos estructurados. SQLite si es embebido/local, PostgreSQL si es una app web con servidor propio.
- **MongoDB** cuando el esquema cambia seguido o no está definido de entrada.
- **Cassandra** cuando el volumen y la disponibilidad importan más que ACID — escritura masiva, IoT, time-series.
- **Redis** para todo lo que necesite velocidad extrema y no tiene que sobrevivir para siempre: caché, sesiones, colas simples.
- **Neo4j** cuando la pregunta central es sobre relaciones entre entidades (quién conoce a quién, qué recomendarle a quién).
- **Qdrant** cuando se necesita buscar por similitud semántica en vez de por igualdad exacta — RAG, embeddings.

### ACID

- **Atomic** — la transacción se aplica entera o no se aplica nada.
- **Consistency** — la data pasa de un estado válido a otro válido.
- **Isolation** — transacciones concurrentes no se pisan entre sí.
- **Durability** — una vez confirmada, la transacción sobrevive a un crash.

## ORMs / Query Builders

| Name        | Lenguaje   | Tipo | Base de datos           |
| ----------- | ---------- | ---- | ----------------------- |
| **Prisma**  | TypeScript | ORM  | PostgreSQL, MySQL, etc. |
| **TypeORM** | TypeScript | ORM  | Multi-DB                |

## Recursos

**BaaS**:

- [turso.tech](https://turso.tech) (SQLite en el borde)
- [PlanetScale](https://planetscale.com) (MySQL serverless).

- [sqlbolt.com](https://sqlbolt.com) — practicar SQL interactivamete.
