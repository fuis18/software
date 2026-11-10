---
eyebrow: Dev
title: Dev Project Management
subtitle: Herramientas de gestión de proyectos de software
group: Project Management
order: 19
summary: "Herramientas de gestión de proyectos de software: Plane, Vikunja, AppFlowy, Kaneo y Teable, documentación de equipo, y cómo elegirlas según la forma de trabajar del equipo."
---

El desarrollo de software es también coordinación: quién hace qué, en qué orden y cuándo está listo. Las herramientas de gestión de proyectos organizan el trabajo en tareas, sprints y seguimiento, sin importar la metodología que el equipo use (Scrum, Kanban, o algo propio).

## Plataformas

| Plataforma     | Perfil                          | Destaca en                                    |
| -------------- | ------------------------------- | --------------------------------------------- |
| **Plane**      | Todo-en-uno de gestión ágil     | Issues, ciclos, módulos, docs integradas      |
| **Vikunja**    | Gestión de tareas (Go)          | Listas, kanban, Gantt, calendarios, CalDAV    |
| **AppFlowy** 🦀 | Workspace local-first (Rust)   | Escritorio y móvil, bloques, bases de datos   |
| **Kaneo**      | Kanban minimalista (MIT)        | Solo el tablero, estilo Linear                |
| **Teable**     | Grids no-code sobre Postgres    | Tablas, kanban, calendario, tiempo real       |

- **Plane** — el todo-en-uno más completo de la lista: _issues_ con estados, ciclos (sprints), módulos (proyectos) y docs integradas; self-hosted (AGPL) o nube gratuita hasta 12 miembros, con importación desde Jira.
- **Vikunja** — gestión de tareas en Go (AGPL): listas, kanban, Gantt y calendarios con sync CalDAV; sirve tanto al equipo de dev como a cualquier área que solo necesite organizar trabajo.
- **AppFlowy** 🦀 — workspace local-first en Rust y Flutter (AGPL): apps nativas de escritorio y móvil con bloques y bases de datos, que funcionan sin conexión y sin mandar los datos a un tercero.
- **Kaneo** — solo el tablero, nada más: Kanban ligero (MIT) para equipos chicos que no necesitan la máquina de sprints.
- **Teable** — la forma visual de Monday bajo licencia libre (AGPL): grids no-code sobre Postgres reales (SQL directo sobre los datos), con vistas de tabla, kanban y calendario.

### Plane en profundidad

- **Workflows por proyecto** — cada tipo de issue recibe su flujo de estados (To Do → In Progress → Done); se diseñan por proyecto según cómo trabaja el equipo, no al revés.
- **Automatizaciones** — reglas sin código "cuando esto, haz aquello" (cuando el PR se mergea, mueve el issue a Done; si un bloqueador se cierra, notifica al asignado) con disparadores, condiciones y acciones.
- **Vistas y filtros** — kanban, lista, spreadsheet y calendario sobre los mismos issues; los filtros guardados hacen de consultas que alimentan cada vista.
- **Cycles y modules** — los ciclos dan el ritmo de sprint y los módulos agrupan temas de largo aliento; las docs integradas dejan el contexto del proyecto dentro de la misma herramienta.
- **Integración** — importa desde Jira y GitHub, y webhooks llevan commits, PRs y estados de CI al issue, con las alertas de [ops-incident](../../ops/ops-incident/) abriendo tickets automáticamente.

## Documentación del equipo

El par histórico del gestor de proyectos es la wiki: Confluence dominó este espacio desde la suite de Atlassian, y hoy hay alternativas libres más modernas.

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

- **Plane** cuando el equipo vive en issues, ciclos y sprints y necesita el vínculo directo con el código (PRs, commits, releases).
- **Vikunja** cuando la gestión de tareas es de todo el equipo u organización (áreas no-dev incluidas) y hacen falta calendarios y Gantt.
- **AppFlowy** 🦀 cuando el trabajo tiene que ser local-first en escritorio y móvil, con los datos en la propia máquina.
- **Kaneo** cuando solo hace falta el tablero kanban, sin la máquina de sprints.
- **Teable** cuando el trabajo se organiza sobre tablas y grids visuales no-code, sobre Postgres.
- **Issues del forge** — las issues nativas de GitHub, GitLab o Forgejo cubren el caso base gratis y viven junto al código (ver [dev-vcs](../dev-vcs/)).

> La herramienta no define la metodología: primero se define cómo se quiere trabajar (sprints, kanban, flujo continuo) y después se elige la plataforma que mejor lo soporte.