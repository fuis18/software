---
layout: ../../layouts/Layout.astro
eyebrow: Sec
title: Sec IAM
subtitle: Gestión de identidades y accesos
---

Toda la seguridad de la infraestructura converge en una pregunta: ¿quién puede hacer qué? IAM es la disciplina de responderla con precisión — y el camino hacia la certificación AWS Security Specialty.

## Qué es IAM

**Identity and Access Management** (gestión de identidades y accesos) es el sistema que decide quién (identidad) puede hacer qué (acción) sobre qué recurso, en cualquier plataforma — nube, servidores o aplicaciones.

- **Identidades** — usuarios, grupos, cuentas de servicio/roles, y también identidades federadas (quienes entran con su SSO corporativo).
- **Políticas** — el vínculo entre identidad y permiso: qué acciones se permiten (o niegan) sobre qué recursos. En la nube se definen como documentos de política.
- **Principios** — mínimo privilegio (solo lo que la tarea necesita, nada por defecto), rotación de credenciales, MFA en lo crítico, y auditoría de quién usó qué.
- La aplicación práctica del lado operativo está en [ops-netsecurity](../../ops/ops-netsecurity/) (Control de Accesos) y en la nube en [ops-cloud](../../ops/ops-cloud/) (IAM del proveedor).

## IAM en la nube

Cada proveedor de nube implementa el mismo modelo con nombres propios: AWS (IAM), Azure (Entra ID/RBAC), GCP (Cloud IAM).

- **Roles vs. usuarios** — el patrón de la nube es que las aplicaciones no usen credenciales largas de usuario sino **roles** asumibles con credenciales temporales: la identidad se asume para una tarea y se rota sola.
- **Políticas como código** — los permisos se versionan en el repo junto con la infraestructura, vía IaC. Ver [ops-iac](../../ops/ops-iac/).
- **El riesgo real** — un usuario con permisos excesivos es una puerta abierta para todo lo demás: sin IAM estricto, el resto de los controles terminan compensando la política de accesos.

## Camino a la certificación AWS Security Specialty

La certificación **AWS Certified Security – Specialty** valida el diseño y operación segura sobre AWS: la concreción práctica de IAM y de la seguridad de nube en general.

| Área                  | Qué cubre                                        |
| --------------------- | ------------------------------------------------ |
| **IAM**               | Identidades, roles, federación, políticas        |
| **Detective controls**| CloudTrail, GuardDuty, Config: cómo se ve la actividad |
| **Infra security**    | VPCs, Security Groups, firewalls, endpoints      |
| **Data protection**   | Cifrado en reposo y en tránsito, KMS             |
| **Incident response** | Preparación y contención ante un incidente en la nube |

- **El orden de preparación** — los fundamentos de [sec-network](../sec-network/) y de nube de [ops-cloud](../../ops/ops-cloud/), luego el modelo IAM de AWS, y finalmente las áreas específicas de la certificación.
- **En la práctica** — la certificación combina el conocimiento conceptual de IAM con las herramientas concretas de AWS: el mismo terreno que cubre LocalStack cuando se desarrolla contra la API de AWS en local (ver [ops-cloud](../../ops/ops-cloud/)).

> IAM es la pieza transversal: el firewall protege la red, pero el acceso es lo que decide quién puede llegar a lo que está detrás. Sin gestión de accesos, no hay defensa perimetral que valga.