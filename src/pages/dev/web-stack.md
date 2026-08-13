---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Front Stack
subtitle: Las piezas con las que se arma un frontend
---

## Meta-frameworks

Se elige por el objetivo del proyecto (¿estático?, ¿SEO?, ¿mucho manejo de datos?, ¿enterprise?), no por gusto personal.

| Framework           | Bundler        | Objetivo                       | Destaca en            |
| -------------------- | -------------- | ------------------------------- | ---------------------- |
| **Astro**            | Vite           | Sitios estáticos                | Landing pages, blogs   |
| **React**            | Vite           | Interactividad                  | Ecosistema React       |
| **TanStack Start**   | Vite           | Apps con mucho manejo de datos  | Proyectos grandes      |
| **Svelte**           | Vite           | Interactividad                  | Rendimiento            |
| **Next.js**          | Turbopack      | Público / SEO                   | E-commerce             |
| **Angular**          | Vite / esbuild | Enterprise                      | Proyectos legacy       |
| **Qwik**             | Vite           | Público / Gobierno              | Carga instantánea      |

### ¿Qué es cada uno?

- **Astro**: framework enfocado en contenido, renderiza HTML estático por defecto y solo hidrata JS donde hace falta ("islas"). Ideal cuando la mayor parte del sitio no necesita interactividad.
- **React**: librería para construir interfaces por componentes. No es un framework completo por sí sola, pero tiene el ecosistema más grande (routers, meta-frameworks, librerías de estado, etc).
- **TanStack Start**: meta-framework full-stack construido sobre React y TanStack Router, pensado para apps con manejo intensivo de datos, con type-safety de punta a punta.
- **Svelte**: en vez de usar un virtual DOM, compila los componentes a JS imperativo optimizado en build time, lo que se traduce en bundles chicos y buen rendimiento.
- **Next.js**: el meta-framework de React más usado en producción, con SSR/SSG/ISR integrados y fuerte enfoque en SEO y e-commerce.
- **Angular**: framework completo (no solo librería) mantenido por Google, con TypeScript de base, inyección de dependencias y convenciones estrictas; común en entornos enterprise/legacy.
- **Qwik**: framework con "resumability" en vez de hidratación: no re-ejecuta JS en el cliente al cargar, lo que da tiempos de carga inicial muy rápidos, útil en sitios públicos de alto tráfico.

## Router

| Router               | Tamaño / filosofía   | Ideal para                                                          |
| --------------------- | --------------------- | --------------------------------------------------------------------- |
| **React Router**      | Estándar de facto     | Apps tradicionales (SPA), rutas declarativas, ecosistema React        |
| **Wouter**            | Minimalista (~2kb)    | Proyectos pequeños, cuando no necesitás abstracciones extra           |
| **TanStack Router**   | TypeScript-first      | Apps grandes con control avanzado de datos y validación de params     |

### ¿Qué es cada uno?

- **React Router**: el router más usado en el ecosistema React, con rutas declarativas mediante componentes o configuración; sólida documentación y compatibilidad con la mayoría de setups.
- **Wouter**: router ultra liviano basado en hooks, sin dependencias extra; útil cuando solo necesitás navegación básica sin el peso de una librería completa.
- **TanStack Router**: router pensado para TypeScript desde el diseño, con inferencia de tipos en rutas y params, validación de search params y buena integración con TanStack Query.

> Nota: Svelte tiene su propio router
