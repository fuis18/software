---
eyebrow: Dev
title: Dev VCS
subtitle: Control de versiones
group: Library Universal
order: 17
summary: "Control de versiones con Git: conceptos, flujos de ramas, PRs, monorepo vs polyrepo, forges (GitHub, GitLab, Codeberg) y tooling."
---

Git guarda el historial completo de cada cambio del proyecto y permite trabajar en paralelo sin pisarse: cada commit es un snapshot recuperable, cada rama un flujo aislado, y cada PR una puerta de revisión antes de integrar. El control de versiones es la práctica transversal que sostiene todo lo demás — CI/CD, GitOps y la infraestructura versionada como código.

## Conceptos de Git

- **Commit** — snapshot atemporal del proyecto con mensaje, autor y padres; el historial es inmutable y cada commit sabe de dónde viene.
- **Rama** — puntero ligero a un commit: crearla cuesta lo mismo que escribir su nombre, y el costo real está en fusionarla.
- **Merge vs rebase** — merge conserva la historia real como un grafo; rebase reescribe los commits encima de la nueva base para dejar una lineal.
- **Remote y clones** — la copia del repo en el forge (origin) se sincroniza con push/pull; cada clone es completo, con el historial entero.
- **Tags** — marcan puntos nombrables del historial (v1.0), base de las releases y del versionado semántico.

## Flujos de ramas

| Flujo            | Estructura                                                      | Cuándo                                 |
| ---------------- | --------------------------------------------------------------- | -------------------------------------- |
| **Trunk-based**  | todo en trunk, ramas de vida menor a un día, features con flags | CI madura, deploy continuo             |
| **GitHub Flow**  | main + rama por feature + PR                                    | el caso default de proyectos web       |
| **GitFlow**      | main + develop + ramas release/hotfix                           | software empaquetado por versiones     |
| **Release Flow** | main estable + rama larga por línea de release                  | varias versiones soportadas en paralelo |

- **Trunk-based** — el camino del deploy continuo: integrar a trunk varias veces al día y proteger lo no terminado con feature flags; exige CI rápida y buena cobertura de tests.
- **GitHub Flow** — lo simple para equipos que despliegan a producción desde main: rama corta, PR, merge, deploy.
- **GitFlow** — pesado para productos web con despliegue continuo, sigue siendo el ajuste para librerías o software que se empaqueta y se distribuye por versiones.
- **Release Flow** — main nunca rompe; cada versión soportada tiene su rama, de la que salen los hotfixes backporteados.

## Pull Requests

El PR es la unidad de integración: propone el diff, lo discute, dispara el pipeline y, tras la aprobación, se mergea.

- **Code review** — una aprobación mínima y checks verdes obligatorios (tests, quality gates) antes del merge; el review sirve para atrapar bugs y compartir contexto, no para policíar estilos.
- **PRs chicos** — se revisan en minutos y se mergean el mismo día; los PRs gigantes se estancan y esconden bugs.
- **Convención** — el mensaje del commit y la descripción del PR documentan el porqué, y el historial entero queda buscable.

## Monorepo vs Polyrepo

| Enfoque      | Estructura                                | Fuerte en                                            |
| ------------ | ----------------------------------------- | ---------------------------------------------------- |
| **Monorepo** | un repo para muchos servicios y librerías | cambios atómicos, tooling y dependencias compartidos |
| **Polyrepo** | un repo por servicio                      | releases independientes, permisos y ciclos simples   |

- **Monorepo** — un cambio que toca dos servicios se versiona, revisa y despliega como una unidad; el costo está en el tooling (builds incrementales, CI por paths).
- **Polyrepo** — cada servicio tiene su ritmo y su pipeline; el costo está en coordinar cambios que cruzan repos (versionar dependencias a mano).

## Forges

| Forge               | Modelo                                  | Perfil                                                     |
| ------------------- | --------------------------------------- | ---------------------------------------------------------- |
| **GitHub**          | Freemium, propietario                   | El estándar: Actions, Packages, el ecosistema más grande   |
| **GitLab**          | Freemium + Community Edition self-hosted | Todo-en-uno: repo, CI/CD, registries y security scanning  |
| **Codeberg**        | 100% libre (Forgejo), donativo          | Forge sin corporativo, respaldado por su fundación         |
| **Forgejo / Gitea** | Libre (MIT)                             | Self-hosted ligero, binario único, bajo consumo            |
| **Radicle**         | Libre, p2p (Rust)                       | Forge descentralizado, sin servidor central                |

- **Cómo elegir** — GitHub es la red por defecto donde vive la mayor parte del ecosistema; GitLab (CE) o Forgejo cuando hay que self-hoshear; Codeberg cuando el criterio es únicamente la licencia libre; Radicle para experimentar con forges peer-to-peer.

## Tooling

| Herramienta        | Perfil                                                       |
| ------------------ | ------------------------------------------------------------ |
| **git**            | CLI oficial — todo pasa por acá                              |
| **lazygit**        | TUI completa para el flujo diario                            |
| **gitui** 🦀       | TUI rápida en Rust, mínimo consumo                           |
| **delta** 🦀       | Diffs y merges con syntax highlighting                       |
| **jj** 🦀          | VCS de nueva generación sobre el formato de repos de git     |
| **gitoxide** 🦀    | Git reescrito en Rust, base del tooling moderno              |

- **jj** — elimina los estados rotos de git (índice, stash): el working copy es un commit editable y los conflictos se resuelven sin ramas especiales; trabaja sobre el mismo formato de repos, así que convive con git y los forges actuales.
- **delta** — se integra como pager de git y convierte los diffs en legibles, con resaltado de sintaxis y estructura por archivo.

> El repo es la fuente de verdad de todo el ciclo: cada push dispara CI en [ops-ci](../../ops/ops-ci/), el merge a main abre la puerta a las estrategias de [ops-cd](../../ops/ops-cd/), y la infraestructura vive versionada en git bajo [ops-iac](../../ops/ops-iac/).
