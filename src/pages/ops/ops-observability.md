---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Observability
subtitle: Métricas, logs y trazas
---

Cuando se corre software de verdad, lo que importa es poder responder "¿qué está pasando?" sin conjeturas. La observabilidad son las tres señales que lo permiten — métricas, logs y trazas — más los dashboards que las vuelven legibles.

## Las tres señales

| Señal     | Qué es                                                     | Responde a            |
| --------- | ---------------------------------------------------------- | --------------------- |
| **Métricas** | Números agregados en el tiempo (peticiones/s, uso de CPU, latencia) | ¿Rinde? ¿Se degrada? |
| **Logs**  | Eventos discretos con contexto (errores, requests, cambios) | ¿Qué pasó exactamente? |
| **Trazas**| El recorrido de una request por los servicios (spans)       | ¿Dónde tardó?         |

- **Métricas** ven el síntoma a nivel conjunto: el pico, la caída, la pendiente.
- **Logs** dan el detalle de un evento puntual; sin agregación se vuelven ruido.
- **Trazas** conectan el síntoma con la causa: la request que tardó, en qué servicio y brazo se quedó.

## Recolección

| Plataforma        | Tipo              | Uso                                        |
| ----------------- | ----------------- | ------------------------------------------ |
| **Prometheus**    | Métricas (scraping, series de tiempo) | El estándar de métricas, con PromQL      |
| **OpenTelemetry** | Framework de telemetría unificado      | Generar y transportar las tres señales de forma estandarizada |
| **ELK / OpenSearch** | Logs (ingestión + búsqueda + dashboard) | Centralizar logs y buscarlos |
| **Datadog**       | SaaS todo-en-uno  | Observabilidad gestionada de punta a punta |

### Cómo se articulan

- **Prometheus** junta métricas haciendo *scraping* periódico a los targets; su modelo de series de tiempo con queries es la base del monitoreo bien hecho.
- **OpenTelemetry** es el pegamento moderno: instrumenta la app una vez y transporta métricas/logs/trazas a cualquier backend.
- **ELK** centraliza logs (a veces junto a webhooks/deploy traces), y se complementa con métricas.

## Dashboards y Alertas

- **Dashboards** — agrupan las series que importan en una vista: la pantalla que alguien abre cuando "algo está raro".
- **Alertas** — la diferencia entre observar y actuar: reglas sobre las métricas que notifican cuando algo se sale de rango. El "qué se alerta y a quién" se ve en [ops-incident](ops-incident/).

### Principios

- **Métricas sobre logs** para alertar: los números son estables y baratos de evaluar; los logs son para investigar.
- **Baselines** — no hay alerta confiable sin saber el valor normal del sistema.
- **Dashboards vivos** — si una vista no se mira, no es un dashboard, es un decorado.

> La observabilidad no se agrega al final: se diseña junto al sistema. Una request sin traza y un log sin contexto no ayudan cuando el servicio se cae — y la lectura de definitiva de la salud se completa con las prácticas de [ops-reliability](ops-reliability/).