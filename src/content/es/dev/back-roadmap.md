---
eyebrow: Dev
title: Back Roadmap
subtitle: El orden de aprendizaje en backend
group: Backend
order: 9
summary: "Roadmap para backend: diseño de APIs REST (filtros, paginación e idempotencia), frameworks, patrón MVC, bases de datos y ORMs, autenticación y testing."
---

## Roadmap

### 0. Conceptos

| Concepto                       | Idea                                                                                              | Fase donde se practica                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Ciclo request/response**     | Un cliente pide por HTTP, el servidor procesa y responde con un código de estado                  | Fase 1 — el binario que escucha                    |
| **Verbos y códigos de estado** | Qué implica cada verbo (leer, crear, modificar, borrar) y qué comunica cada rango (2xx, 4xx, 5xx) | Fase 3 — API JSON con los cinco verbos             |
| **Stateless vs. stateful**     | HTTP no "recuerda" nada; sesiones y tokens simulan el recuerdo                                    | Fase 7 — sesiones y cookies firmadas               |
| **Servir una API**             | Respuestas JSON/REST consumibles por cualquier cliente sin acoplarse al framework                 | Fase 3 — fetch; Fase 5 — cliente React desacoplado |

### 1. Diseño de APIs REST

Antes de elegir framework: el contrato de la API define todo lo demás. Es la parte con menos cobertura en el repo — allá se practican los cinco verbos, pero filtros, paginación e idempotencia quedan como pendiente de integrar.

#### Convenciones de la URL

La URL identifica recursos; los verbos HTTP expresan la acción sobre ellos.

- **Sustantivos, no verbos** — `/users/42` y no `/getUser?id=42`: la acción la aporta el verbo HTTP.
- **Jerarquía con moderación** — `/users/42/orders` para relaciones directas; más de dos niveles suele ser señal de endpoint mal modelado.
- **El estado vive fuera del path** — la misma URL representa siempre el mismo recurso; lo que varía (filtros, página) va en query params.

#### Filtros, orden y paginación

Todo listado que pueda crecer necesita los tres, y van como query params:

| Query param        | Uso                                                                |
| ------------------ | ------------------------------------------------------------------ |
| `?status=active`   | Filtra por atributos del recurso                                   |
| `?sort=-createdAt` | Ordena (el `-` invierte el sentido)                                |
| `?page=2&limit=20` | Paginación offset-based: simple, permite saltar a cualquier página |
| `?cursor=abc`      | Paginación cursor-based: estable ante inserciones concurrentes     |

- **Offset vs. cursor** — offset se corrompe si se insertan filas mientras se pagina; el cursor no, al costo de solo avanzar sin saltar. Offset para admin panels, cursor para feeds.
- **Límite por defecto** — todo listado sin `limit` explícito debe tener un máximo impuesto por el servidor.

#### Idempotencia

Un método es idempotente cuando repetirlo deja el mismo resultado que ejecutarlo una vez.

| Verbo  | ¿Idempotente? | Por qué                                            |
| ------ | ------------- | -------------------------------------------------- |
| GET    | Sí            | Leer no muta nada                                  |
| PUT    | Sí            | Reemplaza el recurso completo siempre con lo mismo |
| DELETE | Sí            | Borrar algo ya borrado deja el mismo estado        |
| POST   | No            | Cada llamada crea un recurso nuevo                 |

- **Por qué importa** — reintentos: si la red falla tras un timeout, el cliente puede reintentar sin miedo solo si el verbo es idempotente.
- **POST crítico** — pagos y operaciones que no deben duplicarse llevan `Idempotency-Key`: el servidor guarda la respuesta de la primera ejecución y la devuelve en los reintentos.

### 2. Frameworks

Elegir según el caso de uso (alta disponibilidad, microservicios, enterprise, ML, CRUD, edge) antes que por preferencia personal. Comparativa completa en [back-stack](../back-stack/). _En el repo:_ todo el proyecto usa `net/http` — la stdlib de Go, el caso "el lenguaje basta como framework".

### 3. Patrón MVC

**Model** (datos y lógica de negocio), **View** (lo que se devuelve al cliente, normalmente JSON) y **Controller** (recibe la request, coordina Model y View). Base conceptual de la mayoría de frameworks antes de arquitecturas más específicas — ver [dev-architectures](../dev-architectures/) para el siguiente nivel. _En el repo:_ Fase 2.

### 4. Bases de datos + ORMs

Dónde y cómo persistir: familias SQL/NoSQL, contratos ACID/BASE y un ORM por lenguaje. Completo en [back-databases](../back-databases/). _En el repo:_ Fase 4 (PostgreSQL, `pgx`, migraciones).

La persistencia trae consigo la **capa de caché**: lo que se lee muchas veces se sirve de Redis (cache-aside) y se invalida justo donde se escribe. _En el repo:_ Fase 8.

### 5. Auth

Identidad y autenticación una vez que hay API y datos que proteger: sesiones, tokens, hashing de contraseñas. Completo en [dev-auth](../dev-auth/). _En el repo:_ Fase 7.

### 6. Testing

Se practica desde el primer endpoint (`hurl --test test.hurl` vive en la raíz del repo desde la Fase 1), no al final. El último escalón es lo que se suma después: cobertura, tests de integración y E2E, y automatización en CI — ver [ops-ci](../../ops/ops-ci/). _En el repo:_ transversal a todas las fases.

### 7. Sistema distribuido

El camino continúa una vez dominado el monolito: offline-first, realtime, eventos, desacoplamiento, resiliencia y observabilidad. _En el repo:_ Fases 9–17. Teoría en [dev-architectures](../dev-architectures/) y [ops-data-modeling](../../ops/ops-data-modeling/).

## Referencia transversal: principios

No son un paso del camino: son criterios que se aplican en cada fase.

- **Separación de responsabilidades** — cada pieza se ocupa de una cosa.
- **Alta cohesión, bajo acoplamiento** — dentro de cada módulo todo pertenece; entre módulos, lo mínimo necesario.
- **Backpressure** — el consumidor lento no desborda al productor.
- **Fallar de forma controlada** — errores predecibles y manejables, no crashes.
- **Observabilidad** — logs, métricas y trazas para entender qué pasa en producción.
- **Evolución segura** — cambios incrementales sin romper lo que ya funciona.
- **KISS / YAGNI / DRY** — ver [dev-principles](../dev-principles/).

### SOLID

| Principio                   | Idea base                                                               |
| --------------------------- | ----------------------------------------------------------------------- |
| **S** Single Responsibility | Una clase debe tener una sola responsabilidad.                          |
| **O** Open/Closed           | El código debe poder extenderse sin modificar lo ya existente.          |
| **L** Liskov                | Una clase hija debe poder usarse en lugar de la clase padre sin romper. |
| **I** Interface Segregation | Mejor varias interfaces pequeñas que una interfaz gigante.              |
| **D** Dependency Inversion  | Depender de abstracciones, no de implementaciones concretas.            |
