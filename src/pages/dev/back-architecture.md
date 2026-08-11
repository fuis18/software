---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Back Architecture
subtitle: El orden de aprendizaje en backend
---

## Roadmap

### 0. Conceptops

Contruir un backned desde 0

### 1. Frameworks

Punto de partida: elegir el framework según el caso de uso (alta disponibilidad, microservicios, enterprise, ML, CRUD, edge) antes que por preferencia personal. Ver [back-stack](back-stack/).

### 2. Patrón MVC

Model-View-Controller: separa la app en tres capas — **Model** (datos y lógica de negocio), **View** (lo que se le devuelve al cliente, normalmente JSON en una API) y **Controller** (recibe la request, coordina Model y View). Es la base conceptual sobre la que se apoyan la mayoría de los frameworks backend (incluido NestJS) antes de pasar a arquitecturas más específicas.

### 3. Bases de datos + ORMs

Con el framework y el patrón resueltos, la siguiente decisión es dónde y cómo persistir datos. Ver [back-databases](back-databases/).

### 4. Auth (JWT, OAuth)

Identidad y autenticación una vez que ya hay API y datos que proteger. Ver [dev-auth](dev-auth/).

### 5. Testing

Último escalón: cubrir con tests lo que ya se construyó. Ver [dev-testing](dev-testing/).
