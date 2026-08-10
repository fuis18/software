---
layout: base.njk
eyebrow: Dev
title: Front Architecture
subtitle: Roadmap para frontend
---

## Roadmap

### 1. Meta-framework y router

Primero se resuelve qué sostiene la app (Astro, React Router v7, TanStack Start, Svelte, Next.js, Angular) y con qué router navega. Ver [front-stack](/dev/front-stack/).

### 2. Componentes de UI

De dónde salen los componentes: shadcn/ui, radix/ui, Mantine, HeadlessUI, HeroUI — también en [front-stack](/dev/front-stack/).

### 3. Organización de carpetas — Screaming Architecture

La estructura de carpetas de un proyecto debería reflejar el **dominio de la app** (features, casos de uso) en vez de la **capa técnica** (`components/`, `hooks/`, `services/`). La idea: al abrir el repo, la carpeta raíz debería "gritar" de qué se trata la app, no qué framework usa — el framework queda como un detalle reemplazable, no la pieza que organiza el proyecto.

En la práctica: en vez de agrupar por tipo (`components/`, `hooks/`, `services/`), se agrupa por feature (`jobs/`, `auth/`, `profile/`), y cada carpeta de feature trae adentro sus propios componentes, hooks y servicios.

### 4. Estilo

Con qué se estiliza la interfaz del lado CSS. Ver [front-style](/dev/front-style/).

### 5. Estado y datos

Estado global, data fetching, formularios, tablas y drag & drop — la lógica detrás de la interfaz. Ver [front-lib-logic](/dev/front-lib-logic/).

### 6. Librerías de apoyo visual

Animaciones, gráficos, notificaciones, modales — lo que termina de completar la interfaz. Ver [front-lib-style](/dev/front-lib-style/).
