---
eyebrow: Dev
title: Dev Project Management
subtitle: Herramientas de gestión de proyectos de software
group: Project Management
order: 19
summary: "Herramientas de gestión de proyectos de software: Asana, Jira y Monday, alternativas libres (Plane, Kaneo), documentación de equipo, y cómo elegirlas según la forma de trabajar del equipo."
---

El desarrollo de software es también coordinación: quién hace qué, en qué orden y cuándo está listo. Las herramientas de gestión de proyectos organizan el trabajo en tareas, sprints y seguimiento, sin importar la metodología que el equipo use (Scrum, Kanban, o algo propio).

## Plataformas

| Plataforma | Perfil                            | Destaca en                                                 |
| ---------- | --------------------------------- | ---------------------------------------------------------- |
| **Asana**  | Gestión de proyectos flexible     | Tareas, timelines, flujos personalizados, equipos grandes |
| **Jira**   | El estándar de los equipos dev    | Issues, sprints Scrum/Kanban, integración con desarrollo  |
| **Monday** | Work management visual            | Paneles visuales, no-code, adaptación a cualquier equipo  |

- **Asana** — pensada para organizar el trabajo por proyectos y objetivos: listas, tableros, líneas de tiempo y automatizaciones. Muy flexible para distintos tipos de equipo, no solo software.
- **Jira** — la herramienta de referencia en desarrollo: _issues_ con estados, tableros de sprint, backlog y reportes, integrada al flujo de CI/CD y a los repos (cada PR puede referenciar un ticket). Es la más pesada de configurar y la más potente cuando el equipo ya trabaja con metodología ágil. En el flujo de operaciones aparece como el integrador natural de las alertas de [ops-incident](../../ops/ops-incident/).
- **Monday** — trabajo en tableros visuales muy accesibles, con automatizaciones y vistas sin escribir código. Rápida de adoptar para equipos no-técnicos que conviven con el equipo de desarrollo.

### Jira en profundidad

- **Workflows por proyecto** — cada tipo de issue recibe su flujo de estados (To Do → In Progress → Done); se diseñan por proyecto según cómo trabaja el equipo, no al revés.
- **Automation** — reglas sin código "cuando esto, haz aquello" (cuando el PR se mergea, mueve el ticket a Done; si un bloqueador se cierra, notifica al asignado) con disparadores, condiciones y acciones.
- **JQL** — el lenguaje de consulta de Jira (`project = X AND status != Done ORDER BY priority`) permite filtros arbitrarios que alimentan tableros y dashboards.
- **Dashboards** — burndown, velocidad y cumulative flow dan las métricas de ritmo del equipo, y cada uno se construye sobre filtros JQL.
- **Integración** — commits, PRs y estados de CI en el propio ticket, y las alertas de [ops-incident](../../ops/ops-incident/) abriendo tickets automáticamente.

### Alternativas libres y modernas

| Herramienta  | Licencia          | Perfil                                                       |
| ------------ | ----------------- | ------------------------------------------------------------ |
| **Plane**    | AGPL (Community)  | El moderno reemplazo de Jira: ciclos, módulos y docs; importa proyectos de Jira |
| **Kaneo**    | MIT               | Kanban minimalista estilo Linear para equipos chicos         |

- **Plane** — boards con ciclos y módulos, docs integradas e importación desde Jira; self-hosted o nube gratuita hasta 12 miembros. Es el candidato serio a reemplazar a Jira sin salir del código abierto.
- **Kaneo** — solo el tablero, nada más: Kanban ligero y rápido para equipos que no necesitan la máquina de sprints de Jira.
- **Issues del forge** — las issues nativas de GitHub, GitLab o Forgejo cubren el caso base gratis y viven junto al código (ver [dev-vcs](../dev-vcs/)).

## Documentación del equipo

El par histórico del gestor de proyectos es la wiki: Confluence dominó este espacio junto a Jira, y hoy hay alternativas libres más modernas.

| Herramienta  | Licencia                | Perfil                                                     |
| ------------ | ----------------------- | ---------------------------------------------------------- |
| **BookStack** | MIT                    | Wiki jerárquica (libro → capítulo → página), self-hosted   |
| **Docmost**  | AGPL                    | Editor moderno tipo Notion con edición en tiempo real      |
| **Wiki.js**  | AGPL                    | Contenido almacenado en git, multi-backend                 |
| **Outline**  | BSL (source-available)  | Muy rápida y moderna, SSO; no es open source OSI           |

- **BookStack** — estructura rígida y predecible para documentación ordenada; corre liviana en cualquier server.
- **Docmost** — la experiencia más actual: bloques, tiempo real y permisos por espacio.
- **Wiki.js** — cuando el contenido debe vivir versionado en git y publicarse como parte del flujo.
- **Outline** — muy pulida, pero su licencia BSL no es open source en sentido OSI (fuente disponible con restricciones comerciales).
- **Docs-as-code** — el otro camino: la documentación vive como markdown en el repo, se revisa en PR y se publica desde CI (Docusaurus, MkDocs Material, mdBook 🦀) — ver [dev-vcs](../dev-vcs/).

## Metodologías

| Metodología | Uso principal |
| ----------- | ------------- |
| **AGILE**   | Filosofía general: iteraciones cortas, feedback continuo, respuesta al cambio |
| **SCRUM**   | Framework ágil: sprints fijos (1-4 sem), roles (PO, SM, dev team), ceremonias |
| **Kanban**  | Flujo continuo: límite de WIP, tablero visual, sin sprints fijos |
| **XP**      | Prácticas técnicas: TDD, pair programming, continuous integration, refactoring |
| **Lean**    | Eliminar desperdicio: optimizar flujo de valor, reducir inventario |
| **SAFe**    | Escalar ágil a grandes organizaciones: múltiples equipos, portafolios |

### Cuándo usar cada una

- **AGILE** — no es una metodología sino una filosofía: los 4 valores del Manifiesto Ágil y sus 12 principios. Todo lo demás (Scrum, Kanban, XP) son formas de implementarlo.
- **SCRUM** — el framework más usado para construir software complejo: el trabajo se planifica en sprints de 1-4 semanas, con roles definidos (Product Owner, Scrum Master, Development Team) y ceremonias (Sprint Planning, Daily, Review, Retro). Ideal cuando el equipo necesita estructura y entregas frecuentes.
- **Kanban** — flujo continuo sin sprints fijos: se visualiza el trabajo en un tablero, se limita el trabajo en progreso (WIP) y se mide el tiempo de ciclo. Ideal para soporte, mantenimiento o cuando el equipo no puede comprometerse a duración fija de sprints.
- **XP (Extreme Programming)** — enfocado en prácticas técnicas de calidad: TDD, pair programming, continuous integration, refactoring, small releases. Complementa a Scrum cuando se quiere elevar la calidad del código.
- **Lean** — inspirationado en Toyota: eliminar desperdicio, optimizar el flujo de valor, entregar rápido y respetar a las personas. Útil para procesos que no son puramente de desarrollo de software.
- **SAFe (Scaled Agile Framework)** — escalar ágil a organizaciones grandes con múltiples equipos: define cómo alinear portafolios, programas y equipos. Complejo de adoptar, útil cuando hay dependencias fuertes entre equipos.

## Cómo elegir

- **Jira** cuando el equipo vive en tickets y sprints y necesita el vínculo directo con el código (PRs, commits, releases).
- **Plane** cuando se quiere la potencia de Jira bajo licencia libre, con despliegue propio.
- **Asana** cuando se quiere organizar proyectos y objetivos con más flexibilidad que un tablero ágil puro.
- **Monday** cuando la prioridad es una herramienta visual simple que cualquiera en la organización pueda usar.

> La herramienta no define la metodología: primero se define cómo se quiere trabajar (sprints, kanban, flujo continuo) y después se elige la plataforma que mejor lo soporte.