---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops IaC
subtitle: Infraestructura y configuración como código
---

La infraestructura se trata como código: versionada, revisada en PR, reproducible y auditable. Se dividen dos problemas distintos — **aprovisionar** los recursos y **configurar** servidores — y hay herramientas para cada uno.

## Provisioning vs. Configuration Management

| Enfoque            | Qué resuelve                                  | Método                          |
| ------------------ | --------------------------------------------- | ------------------------------- |
| **Provisioning**   | Crear/eliminar recursos (VMs, redes, nube)    | Declaración de recursos         |
| **Configuration**  | Que un server existente tenga el estado deseado (paquetes, servicios, archivos) | Declaración de estado, idempotente |

| Plataforma      | Tipo            | Perfil                                          |
| --------------- | --------------- | ----------------------------------------------- |
| **Terraform / OpenTofu** | Provisioning | El estándar: recursos de nube declarados, plan de cambios |
| **Pulumi**      | Provisioning    | Lo mismo pero con lenguajes de programación reales |
| **Crossplane**  | Provisioning    | Control plane declarativo sobre la nube, estilo Kubernetes |
| **Ansible**     | Configuración   | Idempotente, por SSH sin agentes                |
| **SaltStack**   | Configuración   | Configuración a escala con agentes y master     |

## Idempotencia

Un paso es **idempotente** cuando ejecutarlo las veces que sea llega siempre al mismo resultado: si ya está en el estado deseado, no toca nada.

- La configuración se vuelve segura de re-ejecutar: aplicar lo mismo en un server ya configurado no rompe nada.
- Es la base para que la automatización pueda correr en cualquier momento sin miedo a "triplicar" efecto.

## Declarativo vs. imperativo

- **Declarativo** — se declara el *estado deseado* y la herramienta decide cómo llegar (el caso nativo de Terraform/Ansible).
- **Imperativo** — se escribe *cómo* hacerlo paso a paso; más frágil y re-ejecutar suele duplicar efecto.

> La filosofía es compartida con Kubernetes y GitOps: el sistema compara el estado real con el deseado y reconcilia. Ver [ops-kubernetes](ops-kubernetes/) y [ops-cd](ops-cd/).

## El flujo GitOps completo

El recorrido que une las piezas hasta un deploy reproducible:

1. **Aprovisionar** — el recurso físico/virtual se crea con declaración de infraestructura (provisioning).
2. **Configurar** — encima se aplica la configuración idempotente del server.
3. **Definir apps** — los servicios de la app se definen como composiciones/imágenes declaradas.
4. **Git como fuente** — todo lo anterior vive versionado en el repo; el cambio nace en git y se reconcilia en el mundo real.

> Todo el ciclo — de la infraestructura a la app — queda trazado y reproducible desde el repo, que es también la puerta de entrada de las estrategias de despliegue de [ops-cd](ops-cd/).