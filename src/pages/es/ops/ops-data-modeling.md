---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Data Modeling
subtitle: Diseño lógico para analítica — esquema de estrella y motores analíticos
---

Mientras que las bases de datos transaccionales (ver [back-databases](../../dev/back-databases/)) están diseñadas para responder una consulta puntual rápido, la data analítica se lee en masa y se agrega: millones de filas, agrupadas y sumadas. Esa diferencia define un diseño lógico aparte — hechos y dimensiones — y un set de motores propios construidos para cargas de trabajo columnares y de mucha lectura.

## Esquema de Estrella (Hechos y Dimensiones)

El esquema de estrella es el diseño lógico de un modelo analítico (OLAP): una **tabla de hechos** central rodeada de **tablas de dimensiones**, como los puntos de una estrella.

### Tablas de Hechos

El centro del esquema: filas que registran un evento medible (una venta, un clic, una entrada de log), cada una con:

- **Medidas** — valores numéricos y aditivos para agregar (monto, cantidad, duración).
- **Grano** — el nivel de detalle que representa cada fila (una fila por línea de pedido, por evento). El grano define qué preguntas puede responder el hecho; un grano más grueso o fino es un rediseño.
- **Claves foráneas** a las tablas de dimensiones — además de dimensiones degeneradas (atributos que se quedan en el hecho, como un número de factura).

Las medidas pueden ser **aditivas** (seguras de sumar a través de cualquier dimensión), **semi-aditivas** (sumables a través de algunas dimensiones pero no del tiempo, como un saldo) o **no aditivas** (no sumables en absoluto, como una proporción).

### Tablas de Dimensiones

El contexto que les da sentido a los hechos — quién, qué, dónde, cuándo: clientes, productos, tiendas, fechas — con atributos descriptivos. Las dimensiones tienden a ser:

- **Desnormalizadas** — todos los atributos en una sola tabla (jerarquías aplanadas: `país`, `región` y `ciudad` en la misma fila en vez de tablas separadas), porque en analítica la velocidad y la simplicidad de los joins pesan más que la normalización.
- **Conformadas** — una dimensión compartida usada por varios hechos (la misma dimensión `fecha` en ventas e inventario) para que las métricas se mantengan consistentes en todo el warehouse.

**Estrella vs. copo de nieve:** el esquema de copo de nieve normaliza las dimensiones en sub-tablas, ahorrando un poco de espacio al costo de más joins. En la práctica gana la estrella: el almacenamiento es barato y los joins extra frenan las consultas que importan.

## Vistas Materializadas

Una **vista materializada** guarda el resultado de una consulta como una tabla, manteniéndose al día a medida que cambia la fuente: agregaciones calculadas una vez y servidas al instante en vez de recalcularse en cada pedido. Son el puente entre los modelos por lotes y el tiempo real:

- **Por lotes** — la vista se refresca periódicamente desde la orquestación, ver [ops-dataops](../ops-dataops/).
- **Streaming** — **RisingWave** mantiene vistas materializadas de forma continua a medida que llegan los datos: SQL definido una vez, resultados siempre actuales, sin administrar la computación incremental a mano.

## Motores Analíticos

El stack analítico moderno es **columnar**: almacenamiento y procesamiento organizados por columna, lo que hace las agregaciones de columna completa órdenes de magnitud más rápidas que los motores por filas.

| Motor | Perfil | Uso |
|---|---|---|
| [DuckDB](https://duckdb.org/) | OLAP embebido, sin servidor | Analítica local: SQL directo sobre archivos Parquet/Arrow, cero infraestructura — el SQLite de la analítica. |
| [ClickHouse](https://clickhouse.com/) | OLAP de servidor, columnar | Agregados ultrarrápidos a escala con ingesta en tiempo real — el caballo de batalla del warehouse. |
| [RisingWave](https://risingwave.com/) | Base de datos de streaming | Vistas materializadas continuas sobre streams (Kafka): SQL definido una vez, siempre actual. |
| [Apache Arrow](https://arrow.apache.org/) | Formato columnar en memoria | Intercambio zero-copy entre motores (Polars, DuckDB, DataFusion) sin serialización. |
| [Parquet](https://parquet.apache.org/) | Formato columnar en disco | Archivos analíticos comprimidos con predicate pushdown — el estándar de archivo del lakehouse. |
| [Polars](https://pola.rs/) | Librería de dataframes (Rust) | Procesamiento de datos columnar rápido en Python/Rust con ejecución lazy — el lado scripting de la analítica. |

Arrow y Parquet son la misma idea columnar en dos momentos: Arrow en memoria, Parquet en disco. La mayoría de los motores de arriba leen ambos directamente, y comparten ecosistema con motores como DataFusion (ver [ops-modern-data-stack](../ops-modern-data-stack/)).

## Relacionados

- [ops-modern-data-stack](../ops-modern-data-stack/) — las capas de plataforma alrededor de estos motores.
- [back-databases](../../dev/back-databases/) — motores transaccionales y cuándo elegir cada uno.
- [ops-dataops](../ops-dataops/) — pipelines, orquestación y streams de eventos que alimentan los modelos.
- [ops-storage](../ops-storage/) — block, file y object storage por debajo del warehouse.