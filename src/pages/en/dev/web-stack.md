---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Front Stack
subtitle: The pieces that make up a frontend
---

## Meta-frameworks

Choose based on the project's goal (static? SEO? heavy data handling? enterprise?), not personal preference.

| Framework           | Bundler        | Goal                           | Excels at             |
| -------------------- | -------------- | ------------------------------- | ---------------------- |
| **Astro**            | Vite           | Static sites                   | Landing pages, blogs  |
| **React**            | Vite           | Interactivity                  | React ecosystem       |
| **TanStack Start**   | Vite           | Data-heavy apps                | Large projects        |
| **Svelte**           | Vite           | Interactivity                  | Performance           |
| **Next.js**          | Turbopack      | Public / SEO                   | E-commerce            |
| **Angular**          | Vite / esbuild | Enterprise                     | Legacy projects       |
| **Qwik**             | Vite           | Public / Government            | Instant loading       |

### What is each one?

- **Astro**: framework focused on content, renders static HTML by default and only hydrates JS where needed ("islands"). Ideal when most of the site doesn't need interactivity.
- **React**: library for building interfaces by components. Not a complete framework on its own, but has the largest ecosystem (routers, meta-frameworks, state libraries, etc).
- **TanStack Start**: full-stack meta-framework built on React and TanStack Router, designed for apps with intensive data handling, with end-to-end type-safety.
- **Svelte**: instead of using a virtual DOM, compiles components to optimized imperative JS at build time, resulting in small bundles and good performance.
- **Next.js**: the most used React meta-framework in production, with built-in SSR/SSG/ISR and strong focus on SEO and e-commerce.
- **Angular**: complete framework (not just library) maintained by Google, with TypeScript as the base, dependency injection, and strict conventions; common in enterprise/legacy environments.
- **Qwik**: framework with "resumability" instead of hydration: doesn't re-execute JS in the client on load, resulting in very fast initial load times, useful for high-traffic public sites.

## Router

| Router               | Size / philosophy              | Ideal for                                                              |
| --------------------- | ------------------------------ | ----------------------------------------------------------------------- |
| **React Router**      | De facto standard              | Traditional apps (SPA), declarative routes, React ecosystem            |
| **Wouter**            | Minimalist (~2kb)              | Small projects, when you don't need extra abstractions                 |
| **TanStack Router**   | TypeScript-first               | Large apps with advanced data control and param validation             |

### What is each one?

- **React Router**: the most used router in the React ecosystem, with declarative routes via components or configuration; solid documentation and compatibility with most setups.
- **Wouter**: ultra-lightweight router based on hooks, no extra dependencies; useful when you only need basic navigation without the weight of a full library.
- **TanStack Router**: router designed for TypeScript from the design, with type inference in routes and params, search params validation, and good integration with TanStack Query.

> Note: Svelte has its own router
