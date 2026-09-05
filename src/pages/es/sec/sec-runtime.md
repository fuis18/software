---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec Runtime
subtitle: Seguridad en tiempo de ejecución y políticas en Kubernetes
---

El escaneo protege el artefacto antes de que corra; la seguridad en tiempo de ejecución protege **mientras corre**. La segunda área que pocos estudian: detectar al contenedor que empieza a hacer algo raro, e imponer políticas que la infraestructura aplica sola.

## Monitoreo en tiempo de ejecución

Un contenedor o proceso puede empezar a comportarse mal en cualquier momento: llamar a un syscall inesperado, contactar una IP sospechosa, escribir donde no debería. La defensa es observar ese comportamiento.

| Herramienta | Qué hace                                                        |
| ----------- | --------------------------------------------------------------- |
| **Falco**   | Detección de comportamiento anómalo en tiempo real (en el kernel) |
| **Sysdig**  | Captura y análisis de syscalls, procesos y contenedores         |

- **Falco** — el estándar open source de runtime security: instala reglas en el kernel (vía eBPF o módulos) y alerta cuando un proceso hace algo que no debería — un syscall raro, un spawn de shell dentro de un contenedor, un acceso a un archivo sensible. Nació dentro de Sysdig.
- **Sysdig** — la plataforma detrás: captura de syscalls a nivel kernel con visibilidad de procesos, contenedores y su tráfico, usada tanto para debugging como para detección.
- **Qué monitorean** — syscalls (las llamadas al kernel), procesos (cuáles nacen, cuáles se escalan) y accesos sospechosos (a archivos, a la red). El cambio de comportamiento es la señal de que algo se comprometió en runtime.

## Políticas en Kubernetes

Muchos corren Kubernetes, pocos lo aseguran correctamente. Las **políticas de admisión** son la forma de imponer reglas que se aplican solas antes de que un recurso entre al clúster.

| Herramienta        | Qué hace                                              |
| ------------------ | ----------------------------------------------------- |
| **Kyverno**        | Políticas de Kubernetes declarativas y nativas        |
| **OPA Gatekeeper** | Políticas con lenguaje de reglas (Rego), estándar OPA |

- **Kyverno** — define políticas como recursos de Kubernetes normales: "todo pod debe correr sin root", "toda imagen debe estar firmada", "todos los contenedores deben declarar límites de recursos". Es declarativo y se integra con `kubectl`.
- **OPA Gatekeeper** — el estándar de la industria para policy-as-code: las reglas se escriben en Rego y el clúster las evalúa en la admisión de cada recurso. Más potente y más complejo que Kyverno.

### Políticas que se imponen

| Política                  | Qué previene                                              |
| ------------------------- | --------------------------------------------------------- |
| **Contenedores sin root** | Evita que un proceso comprometido corra con privilegios   |
| **Imágenes firmadas**     | Solo despliega artefactos verificados (ver [sec-supplychain](../sec-supplychain/)) |
| **Límites de recursos**   | Contiene el impacto de un contenedor que se sale de control |

- El control de quién puede hacer qué dentro del clúster (RBAC) es la otra mitad del aseguramiento de Kubernetes y vive en [ops-kubernetes](../../ops/ops-kubernetes/).

> El runtime security cierra la brecha que el escaneo deja abierta: el escaneo dice "esta imagen estaba limpia al subirla"; Falco y las políticas de admisión dicen "y si algo cambia, lo detectamos y lo impedimos mientras corre".