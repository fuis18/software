---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Back Roadmap
subtitle: El orden de aprendizaje en backend
---

## Roadmap

### 0. Conceptos

- **Ciclo request/response** — un cliente pide algo por HTTP, el servidor procesa y devuelve una respuesta con un código de estado.
- **Verbos y códigos de estado** — qué implica cada verbo (leer, crear, modificar, borrar) y qué comunica cada rango de código (2xx, 4xx, 5xx).
- **Stateless vs. stateful** — por qué HTTP no "recuerda" nada entre requests y qué mecanismos existen para simular ese recuerdo (sesión, token).
- **Servir una API** — cómo se estructura una respuesta (JSON, REST) para que un cliente cualquiera la consuma sin acoplarse a un framework específico.

### 1. Frameworks

Punto de partida: elegir el framework según el caso de uso (alta disponibilidad, microservicios, enterprise, ML, CRUD, edge) antes que por preferencia personal. Ver [back-stack](../back-stack/).

### 2. Patrón MVC

Model-View-Controller: separa la app en tres capas — **Model** (datos y lógica de negocio), **View** (lo que se le devuelve al cliente, normalmente JSON en una API) y **Controller** (recibe la request, coordina Model y View). Es la base conceptual sobre la que se apoyan la mayoría de los frameworks backend antes de pasar a arquitecturas más específicas.

### 3. Bases de datos + ORMs

Con el framework y el patrón resueltos, la siguiente decisión es dónde y cómo persistir datos. Ver [back-databases](../back-databases/).

### 4. Auth

Identidad y autenticación una vez que ya hay API y datos que proteger. Ver [dev-auth](../dev-auth/).

### 5. Testing

Último escalón: cubrir con tests lo que ya se construyó. Ver [ops-ci](../ops/ops-ci/).

## Diseño de APIs REST

### Convenciones de la URL

La URL identifica recursos; los verbos HTTP expresan la acción sobre ellos.

- **Sustantivos, no verbos** — `/users/42` y no `/getUser?id=42`: la acción la aporta el verbo HTTP, el path solo dice qué recurso.
- **Jerarquía con moderación** — `/users/42/orders` para relaciones directas; más de dos niveles de anidación suele ser señal de un endpoint mal modelado.
- **El estado vive fuera del path** — la misma URL representa siempre el mismo recurso; lo que varía entre pedidos (filtros, página) va en query params, no en el path.

### Filtros, orden y paginación

Todo listado que pueda crecer necesita los tres, y van como **query params**:

| Query param        | Uso                                                            |
| ------------------ | -------------------------------------------------------------- |
| `?status=active`   | Filtra por atributos del recurso                               |
| `?sort=-createdAt` | Ordena (el `-` invierte el sentido)                            |
| `?page=2&limit=20` | Paginación offset-based: simple, permite saltar a cualquier página |
| `?cursor=abc`      | Paginación cursor-based: estable ante inserciones concurrentes |

- **Offset vs. cursor** — offset se corrompe si se insertan filas mientras se pagina; el cursor ("desde este último elemento") no, al costo de solo avanzar/retroceder sin saltar. Offset para admin panels, cursor para feeds.
- **Límite por defecto** — todo listado sin `limit` explícito debe tener un máximo impuesto por el servidor: devolver cien mil filas porque nadie puso paginación es un accidente esperando pasar a producción.

### Idempotencia

Un método es idempotente cuando repetirlo deja el mismo resultado que ejecutarlo una vez.

| Verbo  | ¿Idempotente? | Por qué                                            |
| ------ | ------------- | -------------------------------------------------- |
| GET    | Sí            | Leer no muta nada                                  |
| PUT    | Sí            | Reemplaza el recurso completo siempre con lo mismo |
| DELETE | Sí            | Borrar algo ya borrado deja el mismo estado        |
| POST   | No            | Cada llamada crea un recurso nuevo                 |

- **Por qué importa** — reintentos: si la red falla después de un timeout, el cliente no sabe si el servidor procesó el pedido; puede reintentar sin miedo solo si el verbo es idempotente.
- **POST crítico** — cuando un POST representa un pago u otra operación que no debe duplicarse, se agrega una clave de idempotencia (`Idempotency-Key`): el servidor guarda la respuesta de la primera ejecución y devuelve esa misma en los reintentos.

## Arquitectura

### Principios

- **Separación de responsabilidades** — cada pieza se ocupa de una cosa.
- **Acoplamiento vs. cohesión** — alta cohesión dentro de cada módulo, bajo acoplamiento entre módulos.
- **Backpressure** — el consumidor lento no debería desbordar al productor.
- **Fallar de forma controlada** — errores predecibles y manejables, no crashes.
- **Observabilidad** — logs, métricas y trazas para entender qué pasa en producción.
- **Evolución segura** — cambios incrementales sin romper lo que ya funciona.
- **Arquitectura de "N" Capas** — separar la app en capas (presentación, lógica, datos).
- **KISS / YAGNI / DRY** — ver [dev-principles](../dev-principles/).

### SOLID

| Principio                   | Idea base                                                               |
| --------------------------- | ----------------------------------------------------------------------- |
| **S** Single Responsibility | Una clase debe tener una sola responsabilidad.                          |
| **O** Open/Closed           | El código debe poder extenderse sin modificar lo ya existente.          |
| **L** Liskov                | Una clase hija debe poder usarse en lugar de la clase padre sin romper. |
| **I** Interface Segregation | Mejor varias interfaces pequeñas que una interfaz gigante.              |
| **D** Dependency Inversion  | Depender de abstracciones, no de implementaciones concretas.            |

### Estilos arquitectónicos

| Estilo                 | Idea base                                                       |
| ---------------------- | --------------------------------------------------------------- |
| **Clean Architecture** | Las reglas de negocio en el centro, dependencias hacia adentro. |
| **Hexagonal**          | Puerto-adaptador: el dominio no conoce a la infraestructura.    |
| **Onion**              | Capas concéntricas con el dominio en el núcleo.                 |
| **DDD**                | Modelar el dominio del negocio con su propio lenguaje.          |
| **MVC**                | Model / View / Controller — ver paso 2 del roadmap.             |

### Recursos

- ArchView — System Design Patterns Diagrams
- Software Architecture Diagram Examples
- Awesome Software and Architecture Design Patterns
- Digital Platform Architect — Architecture Styles & Patterns
