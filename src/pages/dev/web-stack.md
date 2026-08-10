---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Front Stack
subtitle: Las piezas con las que se arma un frontend
---

## Meta-frameworks

Se elige por el objetivo del proyecto (¿estático?, ¿SEO?, ¿mucho manejo de datos?, ¿enterprise?), no por gusto personal.

| Framework          | Bundler        | Objetivo                       | Destaca en           |
| ------------------ | -------------- | ------------------------------ | -------------------- |
| **Astro**          | Vite           | Sitios estáticos               | landing pages, Blogs |
| **React**          | Vite           | Interactividad                 | Ecosistema React     |
| **TanStack Start** | Vite           | Apps con mucho manejo de datos | Proyectos grandes    |
| **Svelte**         | Vite           | Interactividad                 | Rendimiento          |
| **Next.js**        | Turbopack      | Público / SEO                  | E-commerce           |
| **Angular**        | Vite / esbuild | Enterprise                     | Proyectos legacy     |
| Qwik               |                | Publico / Govierno             |                      |

## Router

| Router              | Tamaño / filosofía | Ideal para                                                        |
| ------------------- | ------------------ | ----------------------------------------------------------------- |
| **React Router**    | Estándar de facto  | Apps tradicionales (SPA), rutas declarativas, ecosistema React    |
| **Wouter**          | Minimalista (~2kb) | Proyectos pequeños, cuando no necesitás abstracciones extra       |
| **TanStack Router** | TypeScript-first   | Apps grandes con control avanzado de datos y validación de params |

> Nota: Svelte tiene su propio router
