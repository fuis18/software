---
eyebrow: Ops
title: Modern Data Stack
subtitle: Herramientas y arquitectura para plataformas de datos
group: Datos y Bases de Datos
order: 20
summary: "Modern Data Stack (MDS): ingestión, almacenamiento, transformación, consumo y herramientas transversales para plataformas de datos."
---

El Modern Data Stack (MDS) es un conjunto modular de herramientas nativas de nube, componibles y mayoritariamente open-source, diseñadas para construir plataformas de datos escalables, mantenibles y preparadas para IA. Enfatiza la flexibilidad, las capacidades en tiempo real y la fácil integración entre componentes.

## 0. Fuentes de Datos

El punto de partida de cualquier plataforma de datos: sistemas que generan la información bruta a ingerir (bases de datos, aplicaciones SaaS, APIs, eventos, logs o fuentes de streaming).

## 1. Ingestión (EL/ELT)

Herramientas encargadas de extraer y cargar datos desde las fuentes hacia el almacenamiento, ya sea por lotes (ELT) o en tiempo real (CDC/streaming).

| Herramienta | Perfil | Caso de Uso |
|---|---|---|
| [Vector (Datadog)](https://vector.dev/) | Ingestión de eventos, logs y streaming | Alta capacidad para datos de eventos, logs y streaming. La telemetría operativa vive en [ops-observability](../ops-observability/). |
| [Estuary Flow](https://estuary.dev/) | Ingestión en tiempo real (CDC) | Change Data Capture (CDC) con baja latencia, desarrollado en Rust. |
| [Meltano](https://meltano.com/) | ELT con conectores Singer | Extracción y carga desde APIs SaaS y bases de datos hacia warehouses/lakehouses. |
| [Airbyte](https://airbyte.com/) | Integración de datos (ELT) con conectores | Catálogo amplio de conectores para extraer de APIs SaaS, bases de datos y archivos hacia warehouses/lakehouses; la alternativa open source a Fivetran. |

## 2. Almacenamiento (Warehouse/Lakehouse)

Donde se almacenan los datos brutos y procesados en formato estructurado y consultable, optimizados para análisis e IA.

| Herramienta | Perfil | Caso de Uso |
|---|---|---|
| [Apache DataFusion](https://datafusion.apache.org/) | Motor de consultas de alto rendimiento | Construcción de Data Warehouses a medida o aceleración de motores como Spark. |
| [LanceDB / Lance](https://lancedb.com/) | Formato columnar con soporte para vectores | Análisis ultrarrápidos de datos estructurados con capacidades nativas de búsqueda vectorial para IA. |
| [delta-rs](https://delta-io.github.io/delta-rs/) | Lectura/escritura de tablas Delta | Acceso ligero a tablas Delta Lake sin necesidad de JVM o Spark. |

## 3. Transformación y Modelado (T)

Herramientas que limpian, modelan y validan los datos para hacerlos listos para análisis, poniendo énfasis en reproducibilidad, testing y prácticas DataOps.

| Herramienta | Perfil | Caso de Uso |
|---|---|---|
| [SDF](https://www.sdf.com/) | Compilador estático de SQL | Linaje a nivel de columna, verificación de tipos local y detección temprana de errores. |
| [SQLMesh](https://sqlmesh.readthedocs.io/) | DataOps y entornos virtuales | Previews sin duplicar datos (zero-copy), análisis semántico y cambios de esquema seguros y testeables. |
| [Sqruff / SQLFluff](https://sqlfluff.com/) | Linter y validador de SQL | Validación automática de sintaxis y calidad de SQL en CI/CD, optimizado para entornos Linux. |

## 4. Consumo (Analytics, IA & BI)

Capa donde los datos se exponen a usuarios finales, analistas, científicos de datos o agentes de IA para la toma de decisiones y exploración.

| Herramienta | Perfil | Caso de Uso |
|---|---|---|
| [Rill](https://www.rilldata.com/) | BI-as-Code y análisis operacional | Definición de métricas y dashboards en YAML/SQL, consumibles directamente vía MCP para agentes de IA (ver [ai-mcp](../../ai/ai-mcp/)). |
| [Marimo](https://marimo.io/) | Notebooks reactivos para ciencia de datos e IA | Archivos `.py` puros, sin estados ocultos, Git-friendly y ejecutables desde CLI. |
| [Quarto](https://quarto.org/) | Publicación técnica | Creación de reportes, documentos ejecutivos, libros y portales analíticos a partir de código. |
| [R Shiny](https://shiny.posit.co/) | Aplicaciones web estadísticas interactivas | Transforma análisis de R en aplicaciones web interactivas sin escribir JavaScript, CSS o HTML. |

## 5. Transversales (Soporte a la Arquitectura)

Capacidades de soporte que garantizan fiabilidad, gobernanza y automatización en toda la plataforma de datos. La observabilidad operativa — métricas, logs y trazas — vive en [ops-observability](../ops-observability/).

| Ámbito | Herramienta | Caso de Uso |
|---|---|---|
| Orquestación | [Kestra](https://kestra.io/) | Orquestación fiable de workflows para coordinar, programar y monitorizar pipelines de datos. |
| Calidad de Datos | [Soda Core](https://www.soda.io/) | Validaciones automáticas de calidad de datos, detección de anomalías y checks entre datasets. |
| Gobierno de Datos y Catálogo | [OpenLineage](https://openlineage.io/) & [Marquez](https://marquezproject.ai/) | Linaje de datos end-to-end, gestión de metadatos y descubrimiento de datos. |
| Feature Store   | [Feast](https://feast.dev/)           | Features de ML consistentes entre entrenamiento e inferencia, servidas desde el warehouse. |
| Policy as Code  | [OPA](https://www.openpolicyagent.org/) | Reglas de acceso, retención y calidad como código en Rego, evaluadas en el pipeline y en el clúster (ver [sec-runtime](../../sec/sec-runtime/)). |

- **Costo del MDS** — al correr en cloud con cobro por uso, un pipeline activo puede disparar la factura rápido: right-sizing, etiquetado y compromisos viven en [ops-cloud](../ops-cloud/) § FinOps.

## De la arquitectura clásica al MDS

Las capas de una plataforma clásica no desaparecen: se reorganizan como etapas de un pipeline. Es el reflejo en datos de la evolución de los patrones de [dev-architectures](../../dev/dev-architectures/).

| Capa clásica     | Qué era antes                      | Equivalente moderno (MDS)     | Tecnologías                                             |
| ---------------- | ---------------------------------- | ----------------------------- | ------------------------------------------------------- |
| **Presentación** | Frontend web, dashboards estáticos | Consumo dinámico + agentes    | Rill (BI-as-Code), Marimo (notebooks), MCP para agentes |
| **Aplicación**   | Backend con lógica de negocio      | Transformación + orquestación | SQLMesh (entornos virtuales), Kestra, SDF               |
| **Dominio**      | Reglas de negocio en código        | Modelos semánticos + métricas | Rill (métricas en YAML/SQL), SQLMesh, catálogo Marquez  |
| **Persistencia** | Base de datos relacional on-prem   | Warehouse/Lakehouse vectorial | LanceDB, delta-rs (sin JVM), DataFusion                 |

- **Capas → pipeline horizontal** — las capas verticales se vuelven etapas horizontales conectadas por contratos de datos: sin llamadas RPC entre capas, flujos de datos elásticos (ingesta → almacenamiento → transformación → consumo).
- **MVC → notebook reactivo + capa semántica** — el modelo son las tablas del warehouse con las métricas en YAML; la vista se desacopla y el mismo dataset sirve dashboards, notebooks, reportes y agentes a la vez.
- **Cliente-servidor → eventos + serverless** — el cliente pasa a ser agentes y notebooks, el servidor a motores de consulta y lakehouse, y la comunicación a eventos asíncronos que escalan por evento, no por instancia.

### SOA → MDS

| SOA clásico                          | MDS moderno                                       |
| ------------------------------------ | ------------------------------------------------- |
| Bus de integración central (ESB)     | Conectores open source (Airbyte, Meltano)         |
| Contratos ESB rígidos                | APIs + formatos estándar (Parquet, Delta)         |
| Servicios corporativos reutilizables | Servicios por dominio de datos (bounded contexts) |
| Gobernanza manual                    | Linaje automático (OpenLineage + Marquez)         |

## MDS vs. Stack de Datos Tradicional

| Aspecto | Stack Tradicional | Modern Data Stack (MDS) |
|---|---|---|
| Arquitectura | Monolítica y fuertemente acoplada | Modular, componible y best-of-breed |
| Despliegue | Mayormente on-premises, dependiente de JVM | Nativa de nube, ligera, basada en Rust/Go |
| Integración | Enfoque ETL rígido | Enfoque ELT, orientado a APIs, CDC y tiempo real |
| Gobernanza y Linaje | Limitado o manual | Observabilidad, linaje y calidad de datos integrados |
| Preparación para IA | No optimizado para vectores/LLMs | Diseñado para IA, MCP y cargas de trabajo vectoriales |

## Relacionados

- [ops-data-modeling](../ops-data-modeling/) — Esquema de estrella, vistas materializadas y motores columnares para analítica.
- [ops-dataops](../ops-dataops/) — Prácticas, automatización y CI/CD para flujos de trabajo de datos.
- [ops-observability](../ops-observability/) — Monitoreo, trazado y observabilidad para sistemas y datos.
- [dev-planning](../../dev/dev-planning/) — Requerimientos, documentos, diagramas y ADR antes de construir nada.
- [dev-project-management](../../dev/dev-project-management/) — La parte administrativa: plataformas de tareas, documentación del equipo y metodologías.