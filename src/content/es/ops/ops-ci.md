---
eyebrow: Ops
title: Ops CI
subtitle: Integración continua
group: CI/CD y Release Ops
order: 13
summary: "Integración continua: pipelines que compilan, prueban y escanean cada cambio de código antes de que llegue a producción."
---

La integración continua automatiza lo que pasa con el código nuevo desde que un desarrollador hace commit: cada cambio se compila, se prueba y se escanea en un pipeline, para atrapar problemas antes de que lleguen a producción.

## Pipelines

Un **pipeline** es una secuencia de pasos que se ejecuta automáticamente ante un evento (normalmente un push o un PR).

| Plataforma         | Dónde vive               | Perfil                                      | Artefactos                     |
| ------------------ | ------------------------ | ------------------------------------------- | ------------------------------ |
| **GitHub Actions** | Mismo repo que el código | CI alojada con el código, ecosistema enorme | GitHub Packages (npm, Docker)  |
| **GitLab CI**      | Con GitLab               | Pipeline en el mismo sistema que el repo    | Package Registry integrado    |
| **Jenkins**        | Self-hosted              | Control total, madurez, on-premise          | Nexus / Artifactory           |

**Cómo elegir:** si el código vive en una plataforma, el CI integrado es lo natural (menos que mantener); un CI self-hosted se justifica por requisitos de aislamiento, compliance o la necesidad de runners custom cerca de la infraestructura.

- **Artefactos por plataforma** — el registry de artefactos es parte de la plataforma, no una herramienta aparte: GitHub Actions publica en GitHub Packages (imágenes, npm, Maven), GitLab CI en su Package Registry, y un CI self-hosted apunta a Nexus o Artifactory — las imágenes de contenedor, a su vez, viven en los registries de [ops-containers](../ops-containers/).

## Fases típicas

| Fase        | Qué hace                                                     |
| ----------- | ------------------------------------------------------------ |
| **Build**   | Compila/empaqueta: del código al artefacto (imagen, bundle)  |
| **Test**    | Ejecuta pruebas automáticas contra el cambio                 |
| **Scan**    | Análisis de seguridad/calidad sobre el código y dependencias |
| **Publish** | Empuja el artefacto verificado al registry                   |
| **Alert**   | Falla visible y notificada si algún paso no pasa             |

- **Build reproducible** — un mismo commit produce siempre el mismo artefacto; sin sorpresas entre entornos.
- **Deploy no es CI** — el paso de desplegar a producción es entrega continua (ver [ops-cd](../ops-cd/)); el CI termina con el artefacto validado.

## Pipelines como código

El pipeline se versiona, se revisa en PR y se ejecuta igual en local que en CI — herramientas livianas, en Go o Rust, sin la JVM de los Jenkinsfile en Groovy.

| Herramienta       | Perfil                                                       |
| ----------------- | ------------------------------------------------------------ |
| **Dagger**        | Pipelines programables (Go, Python, TypeScript), cada paso en un contenedor |
| **Earthly**       | Builds de CI con sintaxis de Makefile, ejecutables en local  |
| **Woodpecker CI** | CI self-hosted en Go, licencia libre (fork mantenido de Drone) |
| **Tekton**        | CI/CD nativo de Kubernetes: pipelines como CRDs en el clúster |

- **Por qué existen** — el pipeline atado al YAML de una sola plataforma o al script Groovy de Jenkins no es portable ni reproducible fuera de su host; estas herramientas tratan el pipeline como código de verdad — versionado, testeable, ejecutable en cualquier lado.
- **Cómo elegir** — GitHub Actions o GitLab CI cuando el código ya vive en esa plataforma; Dagger o Earthly cuando el pipeline necesita correr idéntico en local y en CI; Woodpecker o Tekton para self-hosted libre (Tekton, sobre Kubernetes).
- **Jenkins hoy** — sigue siendo válido para flotas on-premise existentes, pero su scripting (Jenkinsfile en Groovy, JVM) es el camino legacy que estas alternativas reemplazan.

## Runner Farm

Los pipelines corren en **runners**, y "runner farm" es la gestión de esos ejecutores: cuántos, de qué tamaño y dónde.

| Sesgo         | Qué implica                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| **Autoscale** | Arrancar runner cuando hay cola, apagarlos cuando no — no pagar por runners ociosos |
| **Tipos**     | Runners por tarea: modo seguro con aislamiento vs. runner potente con GPU           |
| **Seguridad** | El runner corre trabajo de otros: se decide qué puede ver y hacer (secrets)         |

> El pipeline hereda los permisos de quien lo disparó: secrets en variables protegidas, runners aislados, y jamás código de terceros con acceso a credenciales de producción.

## Testing Automatizado en el Pipeline

El pipeline ejecuta los tests por niveles, de los más baratos a los más caros — cada nivel corre antes de pasar al siguiente:

| **Nivel**       | **Herramientas** | **Uso principal**                                      |
| --------------- | ---------------- | ------------------------------------------------------ |
| **Unit**        | Vitest / Jest    | Valida funciones aisladas, hooks y utilidades.         |
| **Integration** | Testing Library  | Verifica la interacción entre componentes y UI.        |
| **E2E**         | Playwright       | Simula flujos completos de usuario en entornos reales. |
| **Automation**  | Stagehand        | Automatización del navegador guiada por IA/scripts.    |

**Quality Gates:** El despliegue a producción se bloquea automáticamente si alguna prueba falla, o si el escaneo de código y la cobertura no alcanzan el umbral mínimo exigido.

### Selectores estables en E2E

Para que los tests de UI no se rompan con cada cambio, el selector se prioriza así (vale para librerías de testing y para browser automation):

1. **Roles (ARIA)** — lo más estable.
2. **Texto / labels / placeholders**.
3. **data-testid** — cuando no queda otra.
4. **Selectores CSS** — último recurso, se rompen fácil.

> La CI convierte el "¿anda esto?" humano en una respuesta objetiva y repetible por cada commit — la disciplina de ramas y PRs que alimenta cada commit se ve en [dev-vcs](../../dev/dev-vcs/). El eslabón siguiente — cómo se publica y despliega — se ve en [ops-cd](../ops-cd/).
