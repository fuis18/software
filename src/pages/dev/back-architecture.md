---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Back Architecture
subtitle: El orden de aprendizaje en backend
---

## Roadmap

### 0. Conceptos

- **Ciclo request/response** — un cliente pide algo por HTTP, el servidor procesa y devuelve una respuesta con un código de estado.
- **Verbos y códigos de estado** — qué implica cada verbo (leer, crear, modificar, borrar) y qué comunica cada rango de código (2xx, 4xx, 5xx).
- **Stateless vs. stateful** — por qué HTTP no "recuerda" nada entre requests y qué mecanismos existen para simular ese recuerdo (sesión, token).
- **Servir una API** — cómo se estructura una respuesta (JSON, REST) para que un cliente cualquiera la consuma sin acoplarse a un framework específico.

### 1. Frameworks

Punto de partida: elegir el framework según el caso de uso (alta disponibilidad, microservicios, enterprise, ML, CRUD, edge) antes que por preferencia personal. Ver [back-stack](back-stack/).

### 2. Patrón MVC

Model-View-Controller: separa la app en tres capas — **Model** (datos y lógica de negocio), **View** (lo que se le devuelve al cliente, normalmente JSON en una API) y **Controller** (recibe la request, coordina Model y View). Es la base conceptual sobre la que se apoyan la mayoría de los frameworks backend antes de pasar a arquitecturas más específicas.

### 3. Bases de datos + ORMs

Con el framework y el patrón resueltos, la siguiente decisión es dónde y cómo persistir datos. Ver [back-databases](back-databases/).

### 4. Auth

Identidad y autenticación una vez que ya hay API y datos que proteger. Ver [dev-auth](dev-auth/).

### 5. Testing

Último escalón: cubrir con tests lo que ya se construyó. Ver [dev-testing](dev-testing/).
