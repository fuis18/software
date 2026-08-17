---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Reliability
subtitle: Fiabilidad, chaos engineering y escalado
---

La fiabilidad no es una propiedad que se compra: se construye conociendo los límites del sistema, probando sus fallos a propósito y dándole la capacidad de aguantar y recuperarse sola.

## Capacidad y Escalado

| Pieza                 | Qué es                                                                 |
| --------------------- | ---------------------------------------------------------------------- |
| **Capacity planning** | Decidir cuánta capacidad necesita el sistema según la demanda prevista |
| **Auto-scaling**      | Crecer/shrink automático de la capacidad según la carga real           |
| **Self-healing**      | El sistema detecta y repara fallas por sí mismo                        |

Las tres piezas cubren horizontes de tiempo distintos frente al mismo problema — cuánta capacidad hace falta y qué pasa cuando algo falla: **capacity planning** mira semanas o meses hacia adelante (cuánto cómputo va a hacer falta el próximo trimestre), **auto-scaling** reacciona en minutos a la carga real del momento, y **self-healing** reacciona en segundos a una falla puntual. Ninguna reemplaza a la otra: un sistema con auto-scaling perfecto igual puede quedarse corto si el capacity planning nunca reservó cuota suficiente en el proveedor de nube, y un sistema bien planificado igual necesita self-healing para el fallo puntual que ninguna proyección predice.

### Capacity planning

- **Qué resuelve:** decidir con anticipación cuánto cómputo, red y storage va a necesitar el sistema, para no quedar corto en el peor momento (un pico de tráfico, una campaña, un evento estacional).
- **Cómo se hace:** se proyecta por métricas — uso actual, picos históricos, tendencia de crecimiento — no por intuición. Ver [ops-observability](../ops-observability/) para las señales que alimentan esta proyección.
- **El riesgo de no hacerlo bien:** sub-aprovisionar deja al sistema sin margen ante un pico real; sobre-aprovisionar significa pagar por capacidad que nunca se usa — el capacity planning es, en el fondo, un ejercicio de calibrar ese margen con datos en vez de con miedo.

### Auto-scaling

- **Qué resuelve:** dentro del límite que el capacity planning estableció, la infraestructura se adapta sola a la carga real — más réplicas cuando sube el tráfico, menos cuando baja. Ver [ops-kubernetes](../ops-kubernetes/) y [ops-cloud](../ops-cloud/).
- **Por qué importa:** sin auto-scaling, alguien tiene que estar mirando métricas y escalando a mano — lo cual no solo es lento, es directamente inviable a las 3am durante un pico inesperado.
- **El matiz:** auto-scaling reacciona a la carga _actual_, no la anticipa — si el pico es tan repentino que la infraestructura no llega a escalar a tiempo (por ejemplo, arrancar una VM nueva toma minutos), sigue haciendo falta capacity planning que deje un colchón base.

### Self-healing

- **Qué resuelve:** el sistema detecta que algo falló y actúa sin esperar a que un humano lo note — alineado con la orquestación: detecta que un pod murió y lo reemplaza, que un nodo falló y redistribuye su carga a los nodos sanos.
- **Por qué importa:** es la capa más rápida de las tres porque no depende de un ciclo de decisión humano — el tiempo entre la falla y la recuperación se mide en segundos, no en el tiempo que tarda alguien en ver una alerta y actuar.
- **El límite:** self-healing resuelve fallas de infraestructura conocidas (un proceso que murió, un nodo que no responde) — no resuelve un bug lógico en la aplicación ni una falla de diseño; para eso hace falta lo que se aprende en [ops-incident](../ops-incident/) y en chaos engineering.

## Redundancia y Multi-AZ

- **Diseño sin punto único de fallo (SPOF)** — cada pieza crítica debe existir al menos 2 veces: servidores, redes, fuentes de energía, datacenters. Un sistema con un solo componente cuya caída tira todo el sistema tiene, por definición, un techo de disponibilidad que ninguna otra práctica de esta página puede compensar.
- **Multi-zona** — replicar entre zonas de disponibilidad o datacenters distintos para que un fallo físico (corte de energía, incendio, falla de red) en un solo lugar no tire todo el sistema. Ver [ops-cloud](../ops-cloud/) para cómo se organizan regiones y zonas en los proveedores de nube.
- **Failover automático** — el sistema redirige tráfico a la réplica sana sin intervención manual. Es la pieza que convierte la redundancia (tener una copia) en disponibilidad real (que esa copia efectivamente tome la carga cuando la principal falla) — redundancia sin failover automático solo significa que alguien tiene que notar la falla y mover el tráfico a mano, lo que reintroduce el mismo problema de velocidad que resuelve self-healing en la sección anterior.

## Chaos Engineering

**Romper a propósito, en control, para descubrir cómo falla lo que se cree robusto.** En vez de esperar el incidente real, se inyectan fallas deliberadas en entornos o ventanas elegidas y se observa la reacción del sistema.

- **Por qué existe:** capacity planning, auto-scaling, self-healing y redundancia son todas apuestas sobre cómo el sistema _debería_ comportarse ante una falla — pero esa expectativa nunca se probó de verdad hasta que ocurre un incidente real. Chaos engineering adelanta esa prueba a un momento controlado, con gente mirando y con margen para intervenir, en vez de descubrirlo por primera vez en producción a las 3am.
- **La diferencia con un incidente real:** el chaos es deliberado, acotado y reversible — se elige qué se rompe, cuándo, y se puede frenar el experimento en cualquier momento; un incidente real no avisa, no tiene ventana elegida y no se puede pausar.

### ChaosMesh

**Perfil:** herramienta de inyección de fallas nativa de Kubernetes — define experimentos de caos como recursos declarativos (al estilo de cualquier otro objeto de k8s) que actúan directamente sobre pods, red o nodos del clúster.

- **Fortalezas:** se integra naturalmente al flujo de trabajo de quien ya opera Kubernetes (mismos manifiestos, mismo `kubectl`), permite experimentos muy específicos a nivel de clúster (matar un pod, inyectar latencia de red entre dos servicios, simular falla de disco).
- **Casos de uso:** equipos que ya operan Kubernetes y quieren validar la resiliencia de su propia orquestación — ¿el self-healing realmente reemplaza el pod a tiempo? ¿el service sigue balanceando bien si un pod se cuelga en vez de morir limpio?
- **Debilidades:** acotado al mundo Kubernetes — no sirve para validar resiliencia de infraestructura fuera del clúster (una VM bare-metal, un servicio gestionado de nube).

### Gremlin

**Perfil:** plataforma de chaos engineering más amplia, pensada para experimentos a escala tanto en la nube como on-premise, no limitada a Kubernetes.

- **Fortalezas:** cobertura más amplia de tipos de falla (red, recursos del host, dependencias externas, incluso fallas a nivel de región de nube), pensada como plataforma con control de acceso, programación de experimentos y "botón de pánico" para abortar de inmediato.
- **Casos de uso:** organizaciones con infraestructura heterogénea (no solo Kubernetes) que quieren un programa de chaos engineering formal, con gobernanza sobre quién puede correr qué experimento y cuándo.
- **Debilidades:** al ser una plataforma comercial más amplia, tiene un costo y una curva de adopción organizacional mayor que una herramienta nativa como ChaosMesh para quien solo necesita cubrir Kubernetes.

| Plataforma    | Perfil                            | Uso                                       |
| ------------- | --------------------------------- | ----------------------------------------- |
| **ChaosMesh** | Inyección de fallas en Kubernetes | Caos controlado sobre el clúster          |
| **Gremlin**   | Plataforma de chaos               | Experimentos a escala, en cloud y on-prem |

### Ciclo del experimento

1. **Hipótesis** — se formula qué se espera que pase: _"el sistema aguanta la caída de un nodo sin pérdida de requests"_. Sin una hipótesis clara y falsable de antemano, el experimento no tiene con qué compararse después.
2. **Inyección** — se provoca la falla real en la ventana segura elegida (fuera de horas pico, con el equipo atento, con un plan de abortar si algo se sale de control).
3. **Observación** — se mide contra la hipótesis usando las señales de observabilidad: ¿subió la tasa de error? ¿la latencia se degradó más de lo esperado? ¿el self-healing reaccionó en el tiempo que se asumía?
4. **Aprender** — si la hipótesis fallaba (el sistema no aguantó como se esperaba), ahí hay un hallazgo real que arreglar — y ese hallazgo es, en esencia, un incidente que se descubrió sin que un usuario real lo sufriera primero.

> El chaos no es vandalismo: es fallar en dosis controladas, con el objetivo explícito de descubrir los puntos débiles antes de que un incidente real lo haga por nosotros. La mejora que sale de ahí alimenta la misma cultura de aprendizaje que sostiene los post-mortems de [ops-incident](../ops-incident/) — la diferencia es que acá el aprendizaje llega antes del dolor, no después.
