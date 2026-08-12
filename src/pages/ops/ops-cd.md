---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops CD
subtitle: Entrega y despliegue continuo
---

Si la CI termina con el artefacto validado, la **entrega continua** se encarga de llevarlo a producción con métodos que minimizan el daño de un error: despliegues progresivos, GitOps y release automation.

## Entrega vs. Despliegue

- **Entrega continua (CD)** — todo commit validado queda listo para publicarse; el pase a producción es una decisión, casi siempre automática.
- **Deploy continuo** — el artefacto validado va directo a producción sin human approval.

## GitOps

El modelo donde el **repo git es la fuente de verdad** de la infraestructura: los cambios se hacen en el repo y un agente los aplica al clúster.

| Plataforma | Perfil                        | Destaca en                                 |
| ---------- | ----------------------------- | ------------------------------------------ |
| **ArgoCD** | GitOps para Kubernetes        | UI clara, sync del clúster al repo         |
| **Flux**   | GitOps en el ecosistema k8s   | Integración con Git y Helm                 |
| **Spinnaker** | Release platform enterprise | Pipelines de deploy multicloud, approvals |

- **Declarativo + reconciliación** — el estado deseado está en git; el agente ve que el sistema está distinto y lo empuja a coincidir. El mismo principio de [ops-kubernetes](ops-kubernetes/).
- **Auditabilidad** — todo artefacto y todo entorno tienen huella en el repo: qué se cambió, cuándo y por quién.
- **Rollback natural** — revertir es volver a apuntar el repo a un commit anterior.

## Progressive Delivery

Publicar cambios en cuotas en vez de todo de golpe, midiendo el impacto antes de expandir.

| Estrategia  | Qué hace                                        |
| ----------- | ----------------------------------------------- |
| **Canary**  | Nuevo rollout a un % pequeño, luego se expande según métricas |
| **Blue/Green** | Dos entornos idénticos; se switcha el tráfico al nuevo y se puede volver al instante |
| **Feature flags** | Features ocultas detrás de un switch, encendibles sin deploy |

**Cómo elegir:**
- **Blue/Green** — cuando el switch completo de tráfico es simple y el entorno clonado es viable: rollback instantáneo.
- **Canary** — cuando se prefiere comparar el nuevo contra el viejo con tráfico real antes de comprometerse.
- **Feature flags** — para desacoplar el code de su activación y revertir sin release.

> El despliegue perfecto no existe: existe el despliegue que se sabe medir y revertir. Por eso CD trabaja de la mano de la observabilidad — ver [ops-observability](ops-observability/).