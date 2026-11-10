---
eyebrow: Dev
title: Back Databases
subtitle: Bases de datos y cuándo usar cada una
group: Backend
order: 12
summary: Bases de datos y cuándo usar cada una, comparadas en ACID, JOINs, escalabilidad y disponibilidad, y ORMs.
---

Dos familias, dos lógicas: SQL mantiene todos los datos consistentes bajo un solo modelo relacional; NoSQL se separa en modelos de datos especializados, cada uno dominando su propio nicho.

## SQL (Relacional)

La familia relacional comparte tablas, SQL y transacciones ACID; los motores se diferencian en despliegue (embebido vs. servidor), extensibilidad y en cómo escalan.

- **SQLite** — Embebida y sin servidor: toda la base de datos es un archivo local con ACID completo, incluso ante caídas, y sin proceso de servidor que levantar. La base de datos más extendida del mundo (iOS, Android, navegadores, apps de escritorio) y la base de bases de datos en el borde como Turso o Cloudflare D1. Elígelo para móvil, escritorio, edge, apps local-first o prototipar — no para muchos escritores concurrentes.
- **PostgreSQL** — Servidor object-relational completo con concurrencia MVCC, planificador de consultas competente y extensiones para casi todo (PostGIS, pgvector, TimescaleDB), más JSONB cuando parte del dato tiene forma de documento. Escala en vertical con réplicas de lectura en vez de sharding de serie. Elígelo por defecto para aplicaciones web con datos estructurados y margen para crecer.
- **MariaDB** — Fork completamente open-source (GPL) de MySQL creado por su autor original como sustituto comunitario drop-in: mismo protocolo de red y clientes, así que las apps y ORMs existentes migran sin cambiar código. Trae sus propios storage engines y Galera para clúster multi-primario síncrono. Elígelo como alternativa a MySQL cuando quieres licencia abierta o alta disponibilidad multi-master de serie.

| Característica | SQLite | PostgreSQL | MariaDB |
| --- | --- | --- | --- |
| **ACID** | ✅ Sí | ✅ Sí | ✅ Sí (InnoDB) |
| **JOINs** | ✅ Sí | ✅ Sí | ✅ Sí |
| **Escalabilidad** | ❌ Local | ⚠️ Vertical | ⚠️ Vertical + Galera |
| **Reads/s** | ⚡⚡⚡ Ultra | ⚡⚡ Rápido | ⚡⚡ Rápido |
| **Writes/s** | ⚡⚡ Rápido | ⚡⚡ Rápido | ⚡⚡⚡ Ultra |
| **Esquema flexible** | ❌ No | ⚠️ JSONB | ⚠️ JSON |
| **Alta disponibilidad** | ❌ No | ⚠️ Réplica | ✅ Galera (multi-primario) |

### ACID

Lo que garantiza cada motor de esta sección — el contrato que la sección NoSQL negocia más abajo (BASE).

- **Atomicidad** — la transacción se aplica entera o no se aplica nada.
- **Consistencia** — la data pasa de un estado válido a otro válido.
- **Aislamiento** — transacciones concurrentes no interfieren entre sí.
- **Durabilidad** — una vez confirmada, la transacción sobrevive a una caída.

## NoSQL

NoSQL no es un modelo: son cuatro familias clásicas — más una quinta, más reciente — cada una con su propio modelo de datos. Donde SQL ofrece ACID, estos motores aceptan el contrato BASE (explicado más abajo), renunciando a parte del modelo relacional para dominar su propio nicho.

- **Almacén de documentos** (MongoDB) — El modelo: documentos JSON/BSON agrupados en colecciones, sin esquema fijo. Optimiza leer un agregado entero en una sola llamada y evolucionar el esquema sin migraciones; a cambio ceden los JOINs entre colecciones (solo `$lookup`) y las transacciones, que existen pero no son el camino por defecto. Elígelo cuando la forma del dato cambia más rápido que los despliegues: APIs REST, catálogos, CMS.
- **Clave-Valor** (Redis) — El modelo: pares clave → valor opaco con TTL opcional, viviendo en memoria. Optimiza lecturas sub-milisegundo y throughput extremo, a cambio de no poder consultar por nada que no sea la clave. Elígelo como capa de velocidad delante de la base de datos principal: caché, sesiones, colas, rate limiting.
- **Almacén de columna ancha (wide column)** (Cassandra) — El modelo: tablas particionadas por clave con columnas agrupadas, escritas por columna y no por fila, y todos los nodos aceptando escrituras (sin punto único de fallo). Optimiza escrituras masivas y escala horizontal lineal, a cambio de que las consultas deben seguir la clave de partición y no hay transacciones entre particiones. Elígelo para IoT, time-series y logs. No confundir con los engines columnares analíticos (ClickHouse, Redshift): ese mundo va en [ops-data-modeling](../../ops/ops-data-modeling/).
- **Base de datos de grafo** (Neo4j) — El modelo: nodos y relaciones como ciudadanos de primera clase, consultados con Cypher. Optimiza recorridos entre entidades («quién conoce a quién») que en SQL serían JOINs encadenados, a cambio de escala masiva y procesamiento por lotes. Elígelo cuando la pregunta central son relaciones: redes sociales, recomendaciones, detección de fraude.
- **Base de datos vectorial** (Qdrant) — Quinta familia, más nueva, nacida con los embeddings de IA: guarda representaciones numéricas en vez de entidades y busca por similitud (coseno) en vez de por igualdad exacta, y a veces es solo un motor de búsqueda encima de una base existente (pgvector sobre PostgreSQL), no un almacén aparte. Elígelo cuando la consulta es «¿qué se parece a esto?» y no «¿dónde está esto exacto?»: RAG, búsqueda semántica, ML/AI.

### BASE

El equivalente a ACID: lo que estos motores aceptan a cambio.

- **Basically Available (disponibilidad básica)** — El sistema siempre responde, aunque la respuesta pueda estar obsoleta: responder gana a servir el dato más fresco posible.
- **Soft state (estado blando)** — El estado puede cambiar con el tiempo sin nuevas peticiones (TTL que caducan, cachés, réplicas convergiendo): nada es permanente por defecto.
- **Eventual consistency (consistencia eventual)** — Sin escrituras nuevas, todas las réplicas convergen al mismo valor; lo que no se garantiza es *cuándo*. El trueque: cedes consistencia fuerte a cambio de disponibilidad y tolerancia a particiones (CAP).

| Característica | MongoDB | Cassandra | Redis | Neo4j | Qdrant |
| --- | --- | --- | --- | --- | --- |
| **ACID** | ⚠️ Config. | ❌ Eventual | ⚠️ Limitado | ✅ Sí | ⚠️ Eventual |
| **JOINs** | ⚠️ $lookup | ❌ No | ❌ No | ✅ Nativo | ❌ No |
| **Escalabilidad** | ✅ Horizontal | ✅✅ Masiva | ✅ Horizontal | ⚠️ Medio | ✅ Horizontal |
| **Reads/s** | ⚡⚡ Rápido | ⚡⚡⚡ Ultra | ⚡⚡⚡⚡ Extremo | ⚡ Medio | ⚡⚡⚡ Ultra |
| **Writes/s** | ⚡⚡⚡ Ultra | ⚡⚡⚡⚡ Extremo | ⚡⚡⚡⚡ Extremo | ⚡ Medio | ⚡⚡ Rápido |
| **Esquema flexible** | ✅ Sí | ⚠️ Semi | ✅ Sí | ❌ No | ⚠️ Semi |
| **Alta disponibilidad** | ✅ Réplica | ✅✅ Nativa | ✅ Sentinel | ⚠️ Cluster | ✅ Cluster |

## ORMs / Query Builders

| Nombre | Lenguaje | Tipo | Base de datos |
| --- | --- | --- | --- |
| **Prisma** | TypeScript | ORM | PostgreSQL, MySQL, etc. |
| **TypeORM** | TypeScript | ORM | Multi-DB |

## Recursos

**BaaS**:

- [turso.tech](https://turso.tech) — SQLite en el borde.
- [PlanetScale](https://planetscale.com) — MySQL serverless.

**Práctica**:

- [sqlbolt.com](https://sqlbolt.com) — practicar SQL interactivamente.
