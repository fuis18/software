---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops DataOps
subtitle: Pipelines y flujos de datos
---

Los datos no viven solo en las bases: se mueven. Del sistema de origen a los almacenes analíticos, transformándose en el camino, con orquestación y streams de eventos como transporte.

## Orquestación de trabajos

Programar, encadenar y monitorear jobs de datos que corren en intervalos.

| Plataforma | Perfil                          | Uso                              |
| ---------- | ------------------------------- | -------------------------------- |
| **Airflow**| DAGs de trabajos programados    | Orquestar pipelines ETL por cron |
| **dbt**    | Transformaciones versionadas en SQL | Pipeline dentro del warehouse  |

- **Airflow** modela el flujo como un grafo de tareas con dependencias: qué corre antes, qué es retryable y qué se monitorea si falla.
- **dbt** acerca la práctica de desarrollo al SQL: transformaciones en código versionado que se testean y se ejecutan sobre el warehouse.

## Streams de eventos

Datos que fluyen en tiempo real entre sistemas, sin esperar a un job nocturno.

| Plataforma | Perfil                     | Uso                              |
| ---------- | -------------------------- | -------------------------------- |
| **Kafka**  | Stream/log distribuido    | Eventos, analytics, colas de alta escala |
| **Spark**  | Procesamiento distribuido | Computación batch y streaming sobre datasets grandes |

- **Kafka** es el bus de eventos de alta escala: productores publican, consumidores leen el mismo stream, cada uno a su ritmo — con retención y relectura del histórico.
- La línea entre orquestar y esporatear: **jobs batch** cuando el dato puede esperar; **streams** cuando el evento importa en el momento.

## ETL / ELT y Lakehouse

El camino del dato desde origen hasta donde se analiza.

| Enfoque | Qué hace                                             | Cuándo                          |
| ------- | ---------------------------------------------------- | ------------------------------- |
| **ETL** | Extraer → transformar antes de cargar                | Cuando el destino es lento o caro |
| **ELT** | Cargar primero y transformar dentro del destino      | Warehouses/lakes potentes       |
| **Lakehouse** | Un solo almacén para datos crudos y estructurados | Análisis directo sobre el dato completo |

### Arquitectura típica

1. **Ingesta** — el dato entra de las fuentes (bases, eventos, archivos) vía streams o batch.
2. **Transformación** — se limpia y modela (orquestado, versionado).
3. **Consumo** — analytics, BI, data science leen desde el lakehouse o el warehouse.

> DataOps es ops aplicado al dato: lo mismo que los pipelines le dan al código (CI/CD) los flujos le dan a los datos — reproducible, versionado y monitoreado. El estado duradero que estos flujos escriben se respalda en [ops-backup](../ops-backup/).