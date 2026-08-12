---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops DB Admin
subtitle: Administración y escalado de bases de datos
---

Operar una base de datos en producción es un oficio aparte: mantenerla alta, replicarla para disponibilidad, escalarla cuando crece, y cambiar el esquema sin tirar el servicio.

## Motores

| Motor         | Tipo           | Uso típico                             |
| ------------- | -------------- | -------------------------------------- |
| **PostgreSQL**| SQL             | Aplicaciones web, datos estructurados  |
| **MySQL**     | SQL             | Web tradicional, compatible con MySQL  |
| **Redis**     | Key-Value (memoria) | Caché, sesiones, colas, real-time  |
| **MongoDB**   | Document Store  | Esquemas flexibles, catálogos, CMS     |

La comparación de ACID, JOINs, escalabilidad y disponibilidad — y cuándo elegir cada uno desde la perspectiva de desarrollo — está en [back-databases](dev/back-databases/). Acá importa el lado operativo: mantenerlos vivos y escalables.

## Replicación

Copiar los datos en más de una instancia para disponibilidad y para repartir lecturas.

| Patrón       | Qué hace                                        | Gana                  | Pierde      |
| ------------ | ----------------------------------------------- | --------------------- | ----------- |
| **Replicación primaria/replica** | Escrituras a una, lecturas a múltiples réplicas | Disponibilidad, lecturas paralelas | Replica con lag |
| **Failover** | Si el primario cae, una réplica toma su lugar   | Alta disponibilidad automática | Promoción no es instantánea |
| **Multi-primary / clusters** | Distribuir escrituras entre nodos | Escalado de escritura | Complejidad de conflicto |

- **RPO/RTO** — qué tanto de los datos se puede perder y cuánto tarda en volver; se define aquí y se concreta en [ops-backup](ops-backup/).
- La replicación protege de la caída de un nodo; no sustituye el backup (borrado accidental se replica también).

## Sharding

Distribuir los datos entre múltiples bases por una clave: la estrategia de **escalado horizontal** cuando una sola base ya no da.

| Cómo         | Qué implica                                |
| ------------ | ------------------------------------------ |
| **Por clave de shard** | Cada fila va a un shard según un campo (usuario, región) |
| **Ruteo**    | La app pregunta al shard correcto por clave |
| **Tradeoff** | Consultas que cruzan shards se complican y encarecen |

**Cuándo sharding:** cuando las lecturas/escrituras exceden lo que una base única aguanta en costo o performance, y el volumen justifica la complejidad operativa y de ruteo que agrega.

## Migraciones de Esquema

Cambiar la estructura de la base (tablas, columnas, índices) sin romper el servicio.

- **Migraciones versionadas** — los cambios de esquema viven en archivos versionados y se aplican en orden, igual que el código. Mismo espíritu de [ops-iac](ops-iac/).
- **Incrementales y reversibles** — cada cambio debe poder aplicarse y, si falla o se degrada, revertirse.
- **Compatibilidad durante el deploy** — el código nuevo y la base nueva avanzan en fases; clásicamente nuevas columnas (additive) antes que romper las existentes.

> Operar una base es operar un sistema degradable y con estado: donde el resto de la infraestructura se recrea, la base persiste — por eso todo lo relacionado a respaldo vive en [ops-backup](ops-backup/).