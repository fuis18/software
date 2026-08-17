---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops IaC
subtitle: Infraestructura y configuración como código
---

La infraestructura se trata como código: versionada, revisada en PR, reproducible y auditable. Se dividen dos problemas distintos — **aprovisionar** los recursos y **configurar** servidores — y hay herramientas para cada uno.

## Provisioning vs. Configuration Management

| Enfoque           | Qué resuelve                                                                    | Método                             |
| ----------------- | ------------------------------------------------------------------------------- | ---------------------------------- |
| **Provisioning**  | Crear/eliminar recursos (VMs, redes, nube)                                      | Declaración de recursos            |
| **Configuration** | Que un server existente tenga el estado deseado (paquetes, servicios, archivos) | Declaración de estado, idempotente |

La distinción importa porque son dos capas con ciclos de vida distintos: **provisioning** decide si un recurso _existe_ (crear una VM, una red, un bucket); **configuration** decide qué corre _adentro_ de un recurso que ya existe (instalar paquetes, dejar corriendo un servicio, escribir un archivo de config). Confundir las dos capas es un error común — usar una herramienta de provisioning para gestionar el estado interno de un server (o viceversa) termina forzando el modelo mental de la herramienta a un problema que no es el suyo.

### Provisioning

**Por qué existe:** los recursos de nube (VMs, redes, discos, balanceadores) se crean y destruyen vía API — provisioning es la capa que declara qué recursos deben existir y en qué configuración, en vez de crearlos a mano clic por clic en una consola.

#### Terraform / OpenTofu

**Perfil:** el estándar de facto — un lenguaje declarativo propio (HCL) para describir recursos de cualquier proveedor de nube, con un paso de `plan` que muestra qué va a cambiar antes de aplicarlo.

- **Fortalezas:** el ecosistema de _providers_ es enorme (prácticamente cualquier servicio de cualquier nube tiene uno), el `plan` da visibilidad previa de cada cambio antes de ejecutarlo (reduce sorpresas), y el _state file_ le permite saber exactamente qué recursos administra y detectar drift.
- **Casos de uso:** multi-nube o nube única, cualquier equipo que necesite reproducibilidad de infraestructura versionada en git.
- **Debilidades:** HCL es un lenguaje de dominio específico — no es un lenguaje de programación real, así que lógica condicional compleja o reutilización avanzada se vuelve incómoda; el _state file_ es una pieza crítica y delicada (hay que protegerlo, compartirlo entre el equipo, y un state corrupto o desincronizado es un dolor de cabeza real).
- **OpenTofu:** el fork open source de Terraform (mismo lenguaje, compatible con el ecosistema existente), nacido cuando Terraform cambió su licencia a una menos permisiva — la opción para quien quiere quedarse en licencia abierta sin perder el ecosistema.

#### Pulumi

**Perfil:** el mismo problema que Terraform, pero declarado con lenguajes de programación reales (Python, TypeScript, Go, etc.) en vez de un DSL propio.

- **Fortalezas:** al usar un lenguaje real, se accede a todo su tooling — loops, condicionales, funciones, tests unitarios, autocompletado de IDE — sin las limitaciones de un DSL; facilita compartir lógica con el resto del código de la organización si ya está en ese lenguaje.
- **Casos de uso:** equipos con fuerte cultura de software (no solo ops) que prefieren mantener la infraestructura en el mismo lenguaje que sus aplicaciones, o que necesitan lógica de generación de recursos genuinamente compleja.
- **Debilidades:** ecosistema y comunidad más chicos que Terraform, el poder de un lenguaje real es también un riesgo — es más fácil introducir efectos secundarios o comportamiento no-idempotente si no se tiene disciplina.

#### Crossplane

**Perfil:** un control plane declarativo sobre la nube, con el mismo modelo mental de Kubernetes — la infraestructura se define como recursos custom (CRDs) que un controlador reconcilia contra el estado real.

- **Fortalezas:** si ya se opera Kubernetes, la infraestructura de nube se gestiona con las mismas herramientas y el mismo flujo (`kubectl apply`, reconciliación continua) en vez de un tool aparte; permite construir _composiciones_ — APIs propias de más alto nivel que abstraen recursos de nube complejos detrás de una interfaz simple para otros equipos.
- **Casos de uso:** organizaciones ya profundamente invertidas en Kubernetes que quieren extender ese mismo modelo (GitOps, reconciliación, RBAC de k8s) a la gestión de infraestructura de nube.
- **Debilidades:** trae la complejidad operativa de Kubernetes como requisito previo — no tiene sentido adoptarlo solo para provisioning si no se opera ya un clúster; curva de aprendizaje más alta que Terraform para quien no viene del mundo k8s.

### Configuration Management

**Por qué existe:** una vez que un server existe, alguien tiene que asegurarse de que tenga los paquetes correctos instalados, los servicios correctos corriendo, y los archivos de configuración correctos escritos — y que eso siga siendo cierto con el tiempo, sin importar cuántas veces se re-ejecute la herramienta.

#### Ansible

**Perfil:** configuración idempotente sin agentes — se conecta por SSH a cada server y ejecuta los cambios necesarios, sin necesidad de instalar nada de antemano en el objetivo.

- **Fortalezas:** sin agentes que mantener (menos superficie operativa), curva de entrada baja (YAML legible, no requiere aprender un lenguaje nuevo), funciona igual de bien para configurar un puñado de servers que para orquestar despliegues de aplicación.
- **Casos de uso:** flotas de tamaño chico a mediano, equipos que priorizan simplicidad operativa sobre velocidad a gran escala, cualquier caso donde instalar un agente en cada máquina no es viable o deseable.
- **Debilidades:** al no tener agentes, la ejecución es más lenta a gran escala (cada corrida abre conexiones SSH y ejecuta secuencial o con paralelismo limitado) — con miles de servers, el modelo empieza a mostrar sus límites.

#### SaltStack

**Perfil:** configuración a escala, con un modelo de agentes (_minions_) que se conectan a un nodo central (_master_) por un bus de mensajes persistente, en vez de SSH por conexión.

- **Fortalezas:** mucho más rápido que Ansible a gran escala gracias al bus de mensajes persistente (no hay que abrir una conexión SSH nueva por cada corrida), soporta ejecución en tiempo casi real sobre miles de nodos.
- **Casos de uso:** flotas grandes (miles de servers) donde la velocidad y la ejecución en tiempo real justifican el costo de mantener agentes.
- **Debilidades:** requiere instalar y mantener un agente en cada máquina administrada, y operar la infraestructura del _master_ — más piezas móviles que el modelo sin agentes de Ansible.

| Plataforma               | Tipo          | Perfil                                                     |
| ------------------------ | ------------- | ---------------------------------------------------------- |
| **Terraform / OpenTofu** | Provisioning  | El estándar: recursos de nube declarados, plan de cambios  |
| **Pulumi**               | Provisioning  | Lo mismo pero con lenguajes de programación reales         |
| **Crossplane**           | Provisioning  | Control plane declarativo sobre la nube, estilo Kubernetes |
| **Ansible**              | Configuración | Idempotente, por SSH sin agentes                           |
| **SaltStack**            | Configuración | Configuración a escala con agentes y master                |

## Idempotencia

Un paso es **idempotente** cuando ejecutarlo las veces que sea llega siempre al mismo resultado: si ya está en el estado deseado, no toca nada.

- **Por qué es la propiedad central de todo IaC:** sin idempotencia, cada corrida es un riesgo — re-ejecutar un script que crea un usuario, sin verificar si ya existe, puede fallar o duplicar efecto. Con idempotencia, correr la misma automatización mil veces es tan seguro como correrla una vez.
- La configuración se vuelve segura de re-ejecutar: aplicar lo mismo en un server ya configurado no rompe nada.
- Es la base para que la automatización pueda correr en cualquier momento (programada, disparada por un cambio, o manual) sin miedo a "triplicar" efecto — y por lo tanto la base para que CI/CD pueda aplicar infraestructura de forma automática sin supervisión humana constante.

## Declarativo vs. imperativo

- **Declarativo** — se declara el _estado deseado_ y la herramienta decide cómo llegar (el caso nativo de Terraform/Ansible). La herramienta calcula el diff entre lo que existe y lo que se pidió, y ejecuta solo lo necesario para cerrar esa diferencia.
- **Imperativo** — se escribe _cómo_ hacerlo paso a paso; más frágil y re-ejecutar suele duplicar efecto, porque el script no sabe si el paso ya se hizo antes — simplemente ejecuta la secuencia de comandos otra vez.
- **Por qué casi todo IaC moderno es declarativo:** declarar el resultado deseado es lo que habilita la idempotencia — si la herramienta sabe a dónde hay que llegar, puede comparar con dónde está parada y decidir si hace falta actuar. Un script imperativo no tiene ese punto de comparación por defecto; hay que construirlo a mano (chequeos de "¿ya existe esto?" antes de cada paso).

> La filosofía es compartida con Kubernetes y GitOps: el sistema compara el estado real con el deseado y reconcilia. Ver [ops-kubernetes](../ops-kubernetes/) y [ops-cd](../ops-cd/).

## El flujo GitOps completo

El recorrido que une las piezas hasta un deploy reproducible:

1. **Aprovisionar** — el recurso físico/virtual se crea con declaración de infraestructura (provisioning): Terraform/OpenTofu, Pulumi o Crossplane deciden qué VMs, redes o servicios de nube deben existir.
2. **Configurar** — encima se aplica la configuración idempotente del server: Ansible o SaltStack aseguran que ese recurso recién creado tenga los paquetes, servicios y archivos correctos.
3. **Definir apps** — los servicios de la app se definen como composiciones/imágenes declaradas (manifiestos de Kubernetes, Compose, lo que corresponda a la plataforma de destino).
4. **Git como fuente** — todo lo anterior vive versionado en el repo; el cambio nace en git y se reconcilia en el mundo real, cerrando el círculo con el modelo de [ops-cd](../ops-cd/).

Cada paso de este flujo es, en esencia, la misma idea aplicada a una capa distinta: declarar el estado deseado y dejar que una herramienta reconcilie — provisioning reconcilia recursos, configuration management reconcilia el estado de un server, y GitOps reconcilia todo el sistema contra el repo.

> Todo el ciclo — de la infraestructura a la app — queda trazado y reproducible desde el repo, que es también la puerta de entrada de las estrategias de despliegue de [ops-cd](../ops-cd/).
