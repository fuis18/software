---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Front Architecture
subtitle: Roadmap para frontend
---

## Roadmap

### 0. Conceptos

- **HTML semántico** — qué etiqueta comunica qué significado (no solo qué se ve igual), estructura de documento, accesibilidad básica.
- **CSS** — modelo de caja, flexbox, grid, especificidad y cascada: cómo se posiciona y distribuye todo antes de sumar cualquier librería de estilos.
- **JavaScript** — el DOM y cómo se manipula, eventos, closures, asincronía (callbacks, promesas, `async/await`).

### 1. Meta-framework y router

Primero se resuelve qué sostiene la app: el meta-framework que define renderizado, build y convenciones, y el router con el que navega entre vistas. La elección depende del objetivo del proyecto (¿estático?, ¿SEO?, ¿mucha interactividad?, ¿manejo intensivo de datos?, ¿enterprise?), no de preferencia personal. Ver [front-stack](web-stack/).

### 2. Componentes de UI

De dónde salen los componentes de interfaz: puede ser una librería ya estilada y lista para usar, primitivos accesibles sin estilos para construir encima, o componentes copiables que quedan en el propio repo para editar libremente. La elección depende de cuánto control se quiere sobre el resultado final vs. cuánta velocidad de prototipado se necesita. Ver [front-style](web-style/).

### 3. Organización de carpetas — Screaming Architecture

La estructura de carpetas de un proyecto debería reflejar el **dominio de la app** (features, casos de uso) en vez de la **capa técnica** (`components/`, `hooks/`, `services/`). La idea: al abrir el repo, la carpeta raíz debería "gritar" de qué se trata la app, no qué framework usa — el framework queda como un detalle reemplazable, no la pieza que organiza el proyecto.

En la práctica: en vez de agrupar por tipo (`components/`, `hooks/`, `services/`), se agrupa por feature (`jobs/`, `auth/`, `profile/`), y cada carpeta de feature trae adentro sus propios componentes, hooks y servicios.

### 4. Estilo

Con qué se estiliza la interfaz del lado CSS. Ver [front-style](web-style/).

### 5. Estado y datos

Estado global, data fetching, formularios, tablas y drag & drop — la lógica detrás de la interfaz. Ver [front-lib-logic](web-lib-stack/).

### 6. Librerías de apoyo visual

Animaciones, gráficos, notificaciones, modales — lo que termina de completar la interfaz. Ver [front-lib-style](web-lib-style/).

### 7. Runtime del cliente

Capacidades que ofrece el navegador para ejecutar trabajo fuera del hilo principal o interceptar la red.

| Name           | Uso           |
| -------------- | ------------- |
| **Web worker** | Segundo Plano |
| **Service worker** | Cache         |
