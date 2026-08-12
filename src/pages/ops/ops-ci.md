---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops CI
subtitle: Integración continua
---

La integración continua automatiza lo que pasa con el código nuevo desde que un desarrollador hace commit: cada cambio se compila, se prueba y se escanea en un pipeline, para atrapar problemas antes de que lleguen a producción.

## Pipelines

Un **pipeline** es una secuencia de pasos que se ejecuta automáticamente ante un evento (normalmente un push o un PR).

| Plataforma     | Dónde vive     | Perfil                                 |
| -------------- | -------------- | -------------------------------------- |
| **GitHub Actions** | Mismo repo que el código | CI alojada con el código, ecosistema enorme |
| **GitLab CI**  | Con GitLab      | Pipeline en el mismo sistema que el repo |
| **Jenkins**    | Self-hosted    | Control total, madurez, on-premise       |

**Cómo elegir:** si el código vive en una plataforma, el CI integrado es lo natural (menos que mantener); un CI self-hosted se justifica por requisitos de aislamiento, compliance o la necesidad de runners custom cerca de la infraestructura.

## Fases típicas

| Fase      | Qué hace                                                  |
| --------- | --------------------------------------------------------- |
| **Build** | Compila/empaqueta: del código al artefacto (imagen, bundle) |
| **Test**  | Ejecuta pruebas automáticas contra el cambio              |
| **Scan**  | Análisis de seguridad/calidad sobre el código y dependencias |
| **Publish** | Empuja el artefacto verificado al registry           |
| **Alert** | Falla visible y notificada si algún paso no pasa           |

- **Build reproducible** — un mismo commit produce siempre el mismo artefacto; sin sorpresas entre entornos.
- **Deploy no es CI** — el paso de desplegar a producción es entrega continua (ver [ops-cd](ops-cd/)); el CI termina con el artefacto validado.

## Runner Farm

Los pipelines corren en **runners**, y "runner farm" es la gestión de esos ejecutores: cuántos, de qué tamaño y dónde.

| Sesgo       | Qué implica                          |
| ----------- | ------------------------------------ |
| **Autoscale** | Arrancar runner cuando hay cola, apagarlos cuando no — no pagar por runners ociosos |
| **Tipos**   | Runners por tarea: modo seguro con aislamiento vs. runner potente con GPU |
| **Seguridad**| El runner corre trabajo de otros: se decide qué puede ver y hacer (secrets) |

> El pipeline hereda los permisos de quien lo disparó: secrets en variables protegidas, runners aislados, y jamás código de terceros con acceso a credenciales de producción.

## Testing Automatizado en el Pipeline

- **Unitario** — los tests rápidos de la lógica corren en cada push.
- **Integración** — subir el stack y probar la interacción de piezas.
- **E2E** — flujos completos de usuario sobre un entorno levantado por el pipeline.
- **Quality gates** — el deploy se bloquea si la cobertura o el scan fallan.

> La CI convierte el "¿anda esto?" humano en una respuesta objetiva y repetible por cada commit. El eslabón siguiente — cómo se publica y despliega — se ve en [ops-cd](ops-cd/).