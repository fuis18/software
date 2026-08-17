---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops DataOps
subtitle: Pipelines y flujos de datos
---

Los datos no viven solo en las bases: se mueven. Del sistema de origen a los almacenes analíticos, transformándose en el camino, con orquestación y streams de eventos como transporte.

## Orquestación de trabajos

Programar, encadenar y monitorear jobs de datos que corren en intervalos.

- **Por qué existe:** mover y transformar datos casi nunca es un solo paso — es una cadena de pasos con dependencias (no se puede transformar antes de extraer, no se puede cargar antes de transformar), y cada paso puede fallar. La orquestación es la capa que sabe qué corre después de qué, qué reintentar si algo falla, y qué avisar si algo no se recupera.

### Airflow

**Perfil:** modela el flujo de trabajo como un DAG (grafo acíclico dirigido) — cada nodo es una tarea, cada conexión es una dependencia, y el motor decide el orden de ejecución respetando ese grafo.

- **Fortalezas:** expresa dependencias complejas de forma explícita y visual (qué corre antes, qué puede correr en paralelo), reintentos y alertas configurables por tarea, ecosistema maduro con operadores para conectar casi cualquier sistema (bases de datos, APIs, servicios de nube).
- **Casos de uso:** pipelines ETL clásicos que corren por cron (cada hora, cada noche), cualquier flujo de trabajo con dependencias entre pasos que necesita visibilidad de qué corrió, qué falló y por qué.
- **Debilidades:** pensado para jobs programados por intervalos, no para streaming en tiempo real (para eso hace falta otra herramienta, como Kafka o Spark Streaming); un DAG mal diseñado (con tareas demasiado grandes o dependencias poco claras) puede volverse difícil de debuggear cuando falla a mitad de camino.

### dbt

**Perfil:** no orquesta infraestructura ni conecta sistemas — transforma datos que _ya están_ dentro del warehouse, con SQL versionado, testeado y modular, tratado con la misma disciplina que el código de una aplicación.

- **Fortalezas:** trae prácticas de ingeniería de software al SQL analítico — control de versiones, tests automáticos sobre los datos (¿esta columna nunca es null?, ¿este ID es único?), documentación y linaje de las transformaciones generados automáticamente.
- **Casos de uso:** la capa de transformación dentro de un flujo ELT — una vez que el dato crudo ya está cargado en el warehouse, dbt define cómo se modela y limpia hacia las tablas que consume analytics/BI.
- **Debilidades:** no mueve datos hacia o desde el warehouse (eso lo resuelve otra herramienta de ingesta) ni orquesta nada fuera de sus propias transformaciones — típicamente vive _dentro_ de un pipeline más grande, a menudo disparado por el propio Airflow.

**Cómo se relacionan:** es común que Airflow orqueste el pipeline completo, y uno de los pasos de ese DAG sea "correr dbt" — Airflow decide _cuándo_ y _en qué orden_ corre todo, dbt decide _cómo_ se transforma el dato una vez que ya está en el warehouse.

| Plataforma  | Perfil                              | Uso                              |
| ----------- | ----------------------------------- | -------------------------------- |
| **Airflow** | DAGs de trabajos programados        | Orquestar pipelines ETL por cron |
| **dbt**     | Transformaciones versionadas en SQL | Pipeline dentro del warehouse    |

## Streams de eventos

Datos que fluyen en tiempo real entre sistemas, sin esperar a un job nocturno.

- **Por qué existe:** hay datos donde el valor cae drásticamente si hay que esperar al próximo job programado — una transacción fraudulenta que hay que bloquear en el momento, un evento de usuario que dispara una notificación inmediata. Los streams resuelven el caso donde "el evento importa en el momento", no en el próximo batch.

### Kafka

**Perfil:** un log distribuido — no es una cola tradicional que borra el mensaje al leerlo, sino un registro append-only donde los eventos quedan retenidos por un tiempo configurable, y distintos consumidores pueden leer el mismo stream de forma independiente, cada uno a su propio ritmo.

- **Fortalezas:** desacopla productores de consumidores (quien publica no sabe ni le importa quién lee), permite relectura del histórico (un consumidor nuevo puede "ponerse al día" leyendo desde el principio del log), escala horizontalmente a volúmenes muy altos de eventos por segundo.
- **Casos de uso:** bus central de eventos entre microservicios, pipelines de analytics en tiempo real, cualquier escenario con múltiples consumidores que necesitan ver el mismo flujo de datos sin competir entre sí por los mensajes.
- **Debilidades:** operar un cluster de Kafka propio es una carga operativa real (aunque existen versiones gestionadas); no es una base de datos — consultar el estado actual de algo requiere procesar el stream o volcarlo a un almacén con capacidad de query, no es su fuerte nativo.

### Spark

**Perfil:** motor de procesamiento distribuido que cubre tanto batch como streaming bajo el mismo modelo de programación — a diferencia de Kafka (que es transporte), Spark es cómputo: toma datos (de un stream, de archivos, de una base) y los procesa a gran escala.

- **Fortalezas:** el mismo código conceptual sirve para procesar un dataset histórico enorme (batch) o un stream continuo (streaming estructurado), procesamiento distribuido en memoria que lo hace rápido para transformaciones pesadas sobre datasets grandes.
- **Casos de uso:** transformaciones y agregaciones de datos a gran escala que no caben cómodamente en un solo proceso, cómputo sobre streams de Kafka en tiempo casi real (leer del stream, agregar, escribir el resultado).
- **Debilidades:** más pesado de operar y de aprender que herramientas más simples cuando el volumen de datos no lo justifica — no tiene sentido para transformaciones chicas que dbt o un script simple resuelven mejor.

**La línea entre orquestar y esperar:** jobs batch (vía Airflow) cuando el dato puede esperar al próximo intervalo programado; streams (vía Kafka, procesados con Spark u otro consumidor) cuando el evento importa apenas ocurre. Muchas arquitecturas usan ambos: Kafka como transporte en tiempo real, y un job de Airflow que periódicamente vuelca ese stream a un almacén analítico para consultas históricas.

| Plataforma | Perfil                    | Uso                                                  |
| ---------- | ------------------------- | ---------------------------------------------------- |
| **Kafka**  | Stream/log distribuido    | Eventos, analytics, colas de alta escala             |
| **Spark**  | Procesamiento distribuido | Computación batch y streaming sobre datasets grandes |

## ETL / ELT y Lakehouse

El camino del dato desde origen hasta donde se analiza — y cómo se organiza el destino final.

| Enfoque       | Qué hace                                          | Cuándo                                  |
| ------------- | ------------------------------------------------- | --------------------------------------- |
| **ETL**       | Extraer → transformar antes de cargar             | Cuando el destino es lento o caro       |
| **ELT**       | Cargar primero y transformar dentro del destino   | Warehouses/lakes potentes               |
| **Lakehouse** | Un solo almacén para datos crudos y estructurados | Análisis directo sobre el dato completo |

- **ETL vs. ELT — por qué cambió el orden:** ETL nació en una época donde el almacén de destino (el warehouse tradicional) era caro y limitado, así que transformar _antes_ de cargar minimizaba lo que había que guardar y procesar ahí. ELT invierte el orden porque los warehouses/lakes modernos son lo bastante potentes y baratos como para cargar el dato crudo primero y transformar después, dentro del mismo almacén — que es exactamente el modelo que habilita a dbt (transforma _dentro_ del warehouse, no antes de llegar).
- **Lakehouse — por qué existe:** durante años se eligió entre un _data warehouse_ (estructurado, rápido de consultar, pero rígido y caro para datos crudos) o un _data lake_ (barato, flexible, guarda cualquier cosa, pero lento y débil para queries analíticas). El lakehouse busca combinar ambos: guarda el dato crudo con la flexibilidad de un lake, pero agrega estructura y capacidad de query eficiente encima, sin necesitar dos sistemas separados.

### Arquitectura típica

1. **Ingesta** — el dato entra de las fuentes (bases, eventos, archivos) vía streams (Kafka) o batch (jobs orquestados por Airflow).
2. **Transformación** — se limpia y modela, orquestado y versionado — típicamente dbt dentro del warehouse (ELT) o un paso explícito antes de cargar (ETL), con Spark si el volumen lo exige.
3. **Consumo** — analytics, BI, data science leen desde el lakehouse o el warehouse ya transformado, sin tocar el dato crudo original.

Cada paso de esta arquitectura corresponde a una de las piezas descritas arriba: la ingesta decide entre orquestación programada o streams en tiempo real, la transformación decide entre ETL y ELT según cuándo conviene limpiar el dato, y el resultado final vive en la forma de almacenamiento (warehouse, lake o lakehouse) que mejor sirve al consumo que se necesita.

> DataOps es ops aplicado al dato: lo mismo que los pipelines le dan al código (CI/CD) los flujos le dan a los datos — reproducible, versionado y monitoreado. El estado duradero que estos flujos escriben se respalda en [ops-backup](../ops-backup/).
