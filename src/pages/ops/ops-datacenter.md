---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Datacenter
subtitle: Operaciones y facilidades del cuarto de servidores
---

Una vez que el hardware está aprovisionado, hay que sostenerlo: donde viven las máquinas hay decisiones de espacio, energía, frío y seguridad que determinan si la infraestructura aguanta o falla.

## Gestión de Racks

El rack es la unidad física donde se acomoda el hardware.

| Concepto      | Qué es                                                       |
| ------------- | ------------------------------------------------------------ |
| **U (rack unit)**      | Unidad de altura estándar (1U ≈ 4.45 cm) para dimensionar equipos |
| **Densidad**  | Qué tan cargado está el rack en cómputo, red y energía        |
| **Cable management**   | Organización de cables de red y de alimentación para mantenimiento ordenado |
| **Ubicación & airflow**| Disposición frontal/trasera y direcciones de aire frío/caliente |

- **Densidad balanceada** — apilar demasiado cómputo en un rack exige más energía y refrigeración de las que el rack puede entregar: el cuello de botella suele pasar del cómputo a la infraestructura.
- **Etiquetado consistente** — cada puerto de switch, cada toma de energía y cada dispositivo documentado, porque a la hora de un cambio físico no hay tiempo de adivinar.

## Condicionamiento & Seguridad

Lo no-técnico que sostiene todo lo técnico.

- **Energía** — alimentación redundante: doble fuente (A/B), UPS para sostener el cuarto ante cortes, y grupos electrógenos para periodos largos.
- **Refrigeración** — el calor residual de los servidores hay que evacuarlo; sin temperatura controlada el hardware se degrada y falla antes.
- **Seguridad física** — acceso restringido al cuarto (puertas, cámara, registro de quién entra), porque el control físico es el control más fundamental de todos.

## Operaciones

El trabajo diario de operar el cuarto.

- **Monitoreo ambiental** — temperatura y humedad del cuarto junto con el estado de los servidores. Ver [ops-observability](ops-observability/).
- **Cambio de hardware** — disco fallando, RAM que se agota, tarjeta de red dañada: diagnóstico físico, reemplazo y verificación.
- **Mantenimiento planificado** — ventanas de mantenimiento documentadas, con impacto previsto y aprobación, para que nada se toque por sorpresa.
- **Inventario** — cada activo físico conocido: qué es, dónde está, a qué está conectado y qué corre encima. Esto ancla la información de [ops-hardware](ops-hardware/).

> Operar un datacenter es gestionar recursos finitos — energía, frío, espacio — con la misma disciplina con la que se gestionan los recursos de cómputo.