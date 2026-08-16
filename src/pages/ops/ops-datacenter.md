---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Datacenter
subtitle: Operaciones y facilidades del cuarto de servidores
---

Una vez que el hardware está aprovisionado, hay que sostenerlo: donde viven las máquinas hay decisiones de espacio, energía, frío y seguridad que determinan si la infraestructura aguanta o falla.

## Gestión de Racks

El rack es la unidad física donde se acomoda el hardware.

| Concepto                | Qué es                                                                      |
| ----------------------- | --------------------------------------------------------------------------- |
| **U (rack unit)**       | Unidad de altura estándar (1U ≈ 4.45 cm) para dimensionar equipos           |
| **Densidad**            | Qué tan cargado está el rack en cómputo, red y energía                      |
| **Cable management**    | Organización de cables de red y de alimentación para mantenimiento ordenado |
| **Ubicación & airflow** | Disposición frontal/trasera y direcciones de aire frío/caliente             |

- **Densidad balanceada** — apilar demasiado cómputo en un rack exige más energía y refrigeración de las que el rack puede entregar: el cuello de botella suele pasar del cómputo a la infraestructura.
- **Etiquetado consistente** — cada puerto de switch, cada toma de energía y cada dispositivo documentado, porque a la hora de un cambio físico no hay tiempo de adivinar.

## Condicionamiento & Seguridad

Lo no-técnico que sostiene todo lo técnico.

### Energía

- **PDU (Power Distribution Unit):** regletas administrables montadas en el rack que distribuyen energía a los servidores y miden el consumo por toma.
- **UPS (Uninterruptible Power Supply):** baterías online que limpian la señal eléctrica y sostienen la carga al instante ante un apagón, mientras arranca la planta.
- **ATS (Automatic Transfer Switch):** conmutador que pasa de forma transparente la alimentación del datacenter de la red eléctrica comercial al generador.
- **Grupos electrógenos:** generadores a diésel que proveen autonomía eléctrica continua durante cortes prolongados.
- **Redundancia N+1 / 2N:** duplicar trayectos de energía (fuentes A y B en el servidor, conectadas a UPS distintas) para poder mantener la red eléctrica sin apagar equipos.

### Climatización

- **CRAC / CRAH:** aires acondicionados de precisión que regulan temperatura y humedad de forma continua (no están pensados para confort humano, sino para el hardware).
- **Pasillos fríos / calientes:** diseño físico que aísla la inyección de aire frío (frente del rack) de la extracción de aire caliente (trasera del rack).

### Protección contra incendios

- **Agentes limpios (FM-200, Novec 1230, Inergen):** sistemas de extinción por gas que ahogan el fuego por sofocación, sin usar agua ni dañar la electrónica.

### Seguridad física

- **CCTV y control biométrico:** monitoreo por video continuo y acceso restringido (tarjetas RFID, huella, iris) con logs auditables de entrada.

### Monitoreo ambiental

- **DCIM (Data Center Infrastructure Management):** sensores de temperatura, humedad y detección de fugas de agua integrados al sistema de gestión del datacenter, para alertar antes de un fallo térmico. Complementa el monitoreo de servidores descrito en [ops-observability](../ops-observability/).

## Operaciones

El trabajo diario de operar el cuarto.

- **Monitoreo** — temperatura y humedad del cuarto junto con el estado de los servidores. Ver [ops-observability](../ops-observability/).
- **Cambio de hardware** — disco fallando, RAM que se agota, tarjeta de red dañada: diagnóstico físico, reemplazo y verificación.
- **Mantenimiento planificado** — ventanas de mantenimiento documentadas, con impacto previsto y aprobación, para que nada se toque por sorpresa.
- **Inventario** — cada activo físico conocido: qué es, dónde está, a qué está conectado y qué corre encima. Esto ancla la información de [ops-hardware](../ops-hardware/).

> Operar un datacenter es gestionar recursos finitos — energía, frío, espacio — con la misma disciplina con la que se gestionan los recursos de cómputo.
