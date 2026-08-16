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

La diferencia entre ambas no es técnica, es de **dónde queda el gate humano**: en entrega continua existe (aunque sea un botón que alguien aprieta); en deploy continuo, no hay gate — el pipeline entero, desde el commit hasta producción, corre sin intervención. Elegir una u otra depende de qué tan confiable sea la suite de tests y qué tan barato sea revertir un error.

## GitOps

El modelo donde el **repo git es la fuente de verdad** de la infraestructura: los cambios se hacen en el repo y un agente los aplica al clúster.

- **Declarativo + reconciliación** — el estado deseado está en git; un agente corriendo dentro del clúster (no un pipeline externo empujando) observa continuamente que el sistema real coincida, y si no, lo corrige. El mismo principio de [ops-kubernetes](../ops-kubernetes/).
- **Por qué importa el sentido del pull:** en CI/CD tradicional, un pipeline externo tiene credenciales para _empujar_ cambios al clúster (push). En GitOps, el agente vive _adentro_ del clúster y _jala_ (pull) los cambios desde git — nadie externo necesita credenciales de escritura sobre producción, solo acceso de lectura al repo.
- **Auditabilidad** — todo artefacto y todo entorno tienen huella en el repo: qué se cambió, cuándo y por quién, con el historial de git como registro inmutable.
- **Rollback natural** — revertir es volver a apuntar el repo a un commit anterior; el agente se encarga de reconciliar el clúster a ese estado.

### ArgoCD

**Perfil:** GitOps nativo de Kubernetes, con foco fuerte en visibilidad — su UI muestra en tiempo real qué tan sincronizado está el clúster respecto al repo.

- **Fortalezas:** UI muy clara para ver drift (diferencias entre lo declarado y lo real) recurso por recurso, sync manual o automático configurable por aplicación, soporta multi-clúster desde una sola instancia.
- **Casos de uso:** equipos que quieren visibilidad inmediata del estado de sync y control granular de cuándo aplicar cambios (útil si todavía no se confía 100% en el deploy continuo).
- **Debilidades:** el modelo de "Application" (su unidad central) puede volverse verboso en clústeres con muchos microservicios; la lógica de templating queda fuera de ArgoCD (delega en Helm/Kustomize).

### Flux

**Perfil:** GitOps también nativo de k8s, pero más como conjunto de controladores componibles que como plataforma con UI central — pensado para integrarse a fondo con el ecosistema existente.

- **Fortalezas:** integración muy fuerte con Git (webhooks, múltiples fuentes) y con Helm (puede gestionar releases de Helm directamente como parte del flujo GitOps); más liviano y "cajas de lego" que ArgoCD — se arma con los controladores que se necesiten.
- **Casos de uso:** equipos que ya tienen mucho invertido en Helm y quieren que ese flujo se vuelva GitOps sin cambiar de herramienta de packaging; setups donde se prefiere composición sobre una UI todo-en-uno.
- **Debilidades:** su UI (Weave GitOps) es menos madura que la de ArgoCD; la curva de entender qué controlador hace qué es un poco mayor al no ser un solo producto monolítico.

### Spinnaker

**Perfil:** plataforma de release enterprise — no nació como GitOps puro sino como orquestador de pipelines de deploy, con GitOps como una de las formas de alimentarlo.

- **Fortalezas:** pipelines de deploy multicloud (no solo Kubernetes — también VMs, funciones serverless, distintos proveedores de nube en el mismo pipeline), approvals manuales integrados como parte nativa del flujo, fuerte soporte de estrategias de despliegue progresivo out-of-the-box (canary, blue/green).
- **Casos de uso:** organizaciones grandes con infraestructura heterogénea (no solo k8s) que necesitan un solo lugar para orquestar releases con aprobaciones formales entre etapas.
- **Debilidades:** mucho más pesado de operar que ArgoCD/Flux — requiere más infraestructura propia y más gente dedicada a mantenerlo; para un equipo que solo corre Kubernetes, suele ser más de lo que hace falta.

| Plataforma    | Perfil                      | Destaca en                                |
| ------------- | --------------------------- | ----------------------------------------- |
| **ArgoCD**    | GitOps para Kubernetes      | UI clara, sync del clúster al repo        |
| **Flux**      | GitOps en el ecosistema k8s | Integración con Git y Helm                |
| **Spinnaker** | Release platform enterprise | Pipelines de deploy multicloud, approvals |

## Progressive Delivery

Publicar cambios en cuotas en vez de todo de golpe, midiendo el impacto antes de expandir.

- **Por qué existe:** un deploy tradicional (todo o nada) apuesta todo el tráfico a que el cambio va a funcionar. Progressive delivery reduce esa apuesta: expone el cambio a una porción controlada del tráfico o usuarios, mide, y recién después decide si expandir o revertir — el radio de impacto de un error queda acotado desde el arranque.

### Canary

**Qué hace:** el nuevo rollout recibe un porcentaje pequeño del tráfico real; si las métricas (errores, latencia) se mantienen sanas, se expande gradualmente hasta el 100%.

- **Fortalezas:** compara la versión nueva contra la vieja con tráfico real y en simultáneo — la señal es lo más cercana posible a producción real, no a un ambiente de staging.
- **Debilidades:** requiere buena observabilidad para tomar la decisión de expandir o no (si no se puede medir bien la diferencia entre canary y estable, la estrategia pierde su valor); es más lento que un switch directo, porque el avance es gradual.
- **Cuándo elegirlo:** cuando se prefiere comparar el nuevo contra el viejo con tráfico real antes de comprometerse del todo, y se cuenta con métricas confiables para decidir.

### Blue/Green

**Qué hace:** dos entornos idénticos (blue = actual, green = nuevo) corren en paralelo; el tráfico se switchea de golpe de uno al otro, y volver atrás es re-apuntar el switch.

- **Fortalezas:** rollback instantáneo — no hay que "deshacer" un despliegue gradual, solo apuntar el tráfico de vuelta al entorno anterior, que sigue corriendo intacto.
- **Debilidades:** duplica el costo de infraestructura mientras ambos entornos coexisten (aunque sea brevemente); no sirve bien para cambios que tocan estado compartido (una migración de base de datos, por ejemplo, no se puede "switchear" tan limpio como el tráfico HTTP).
- **Cuándo elegirlo:** cuando el switch completo de tráfico es simple, el entorno clonado es viable de mantener, y se prioriza la velocidad de rollback sobre el costo de duplicar infraestructura.

### Feature Flags

**Qué hace:** el código nuevo se despliega apagado detrás de un switch remoto — el deploy y la activación quedan como dos eventos completamente separados.

- **Fortalezas:** revertir un feature problemático es apagar un flag (segundos), no hacer un rollback de deploy; permite activar features para segmentos específicos de usuarios (beta testers, un solo cliente) sin tocar infraestructura.
- **Debilidades:** el código con flags viejos que nunca se limpiaron se acumula como deuda técnica (_flag debt_); la combinatoria de flags activos/inactivos simultáneos puede volver difícil de razonar qué comportamiento tiene el sistema en un momento dado.
- **Cuándo elegirlo:** para desacoplar el código de su activación y poder revertir comportamiento sin necesidad de un release — especialmente útil cuando el riesgo está en la _lógica_ del feature, no en el despliegue en sí.

| Estrategia        | Qué hace                                                                             |
| ----------------- | ------------------------------------------------------------------------------------ |
| **Canary**        | Nuevo rollout a un % pequeño, luego se expande según métricas                        |
| **Blue/Green**    | Dos entornos idénticos; se switcha el tráfico al nuevo y se puede volver al instante |
| **Feature flags** | Features ocultas detrás de un switch, encendibles sin deploy                         |

> Las tres estrategias no son excluyentes: es común desplegar con blue/green o canary, y controlar la exposición del feature dentro de ese rollout con feature flags — el deploy y la activación resuelven problemas distintos.

> El despliegue perfecto no existe: existe el despliegue que se sabe medir y revertir. Por eso CD trabaja de la mano de la observabilidad — ver [ops-observability](../ops-observability/).
