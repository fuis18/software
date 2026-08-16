---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Reliability
subtitle: Fiabilidad, chaos engineering y escalado
---

La fiabilidad no es una propiedad que se compra: se construye conociendo los límites del sistema, probando sus fallos a propósito y dándole la capacidad de aguantar y recuperarse sola.

## Capacidad y Escalado

| Pieza              | Qué es                                                |
| ------------------ | ----------------------------------------------------- |
| **Capacity planning** | Decidir cuánta capacidad necesita el sistema según la demanda prevista |
| **Auto-scaling**   | Crecer/shrink automático de la capacidad según la carga real |
| **Self-healing**   | El sistema detecta y repara fallas por sí mismo       |

- **Capacity planning** — se proyecta por métricas (uso, picos históricos, crecimiento) para no quedar cortos de cómputo en el peor momento. Ver [ops-observability](../ops-observability/).
- **Auto-scaling** — dentro del límite, la infraestructura se adapta: más réplicas con carga, menos cuando calla. Ver [ops-kubernetes](../ops-kubernetes/) y [ops-cloud](../ops-cloud/).
- **Self-healing** — alineado con la orquestación: detecta que un pod murió y lo reemplaza; que un nodo falló y re-distribuye.

## Redundancia y Multi-az

- **Diseño sin punto único de fallo** — cada pieza debe existir al menos 2 veces: servidores, redes, datacenters.
- **Multi-zona** — replicar entre zonas de disponibilidad / DC para que un fallo físico no lo tire todo. Ver [ops-cloud](../ops-cloud/).
- **Failover automático** — el sistema redirige a la réplica sana sin intervención manual.

## Chaos Engineering

**Romper a propósito, en control, para descubrir cómo falla lo que creés robusto.** En vez de esperar el incidente real, se inyectan fallas deliberadas en entornos o ventanas elegidas y se observa la reacción.

| Plataforma  | Perfil                  | Uso                          |
| ----------- | ----------------------- | ---------------------------- |
| **ChaosMesh**| Inyección de fallas en Kubernetes | Caos controlado sobre el clúster |
| **Gremlin** | Plataforma de chaos     | Experimentos a escala, en cloud y on-prem |

### Ciclo del experimento

1. **Hipótesis** — "el sistema aguanta la caída de un nodo sin pérdida de requests".
2. **Inyección** — se mata el nodo en la ventana segura.
3. **Observación** — se mide contra la hipótesis con las señales de observabilidad.
4. **Aprender** — si la hipótesis fallaba, hay un hallazgo que arreglar.

> El chaos no es vandalismo: DDoS deliberado al principio, en dosis controladas, con el objetivo de descubrir los puntos débiles antes de que un incidente real lo haga por nosotros. La mejora que sale de ahí alimenta la cultura de [ops-incident](../ops-incident/).