---
layout: ../../layouts/Layout.astro
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

## Arquitectura

### Principios

- **Separación de responsabilidades** — cada pieza se ocupa de una cosa.
- **Acoplamiento vs. cohesión** — alta cohesión dentro de cada módulo, bajo acoplamiento entre módulos.
- **Backpressure** — el consumidor lento no debería desbordar al productor.
- **Fallar de forma controlada** — errores predecibles y manejables, no crashes.
- **Observabilidad** — logs, métricas y trazas para entender qué pasa en producción.
- **Evolución segura** — cambios incrementales sin romper lo que ya funciona.
- **Arquitectura de "N" Capas** — separar la app en capas (presentación, lógica, datos).
- **KISS / YAGNI / DRY** — simplicidad, no anticipar, no repetir.

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
