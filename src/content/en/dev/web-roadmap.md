---
eyebrow: Dev
title: Front Roadmap
subtitle: Learning path for frontend web development
group: Frontend - Web
order: 1
summary: "Frontend web roadmap: which meta-framework and router support it, and how to style it."
---

## Roadmap

### 0. Concepts

- **Semantic HTML** — what tag conveys what meaning (not just what renders the same), document structure, basic accessibility; the official reference is the [HTML Living Standard](https://html.spec.whatwg.org/).
- **CSS** — box model, flexbox, grid, specificity, and cascade: how everything gets positioned and distributed before adding any style library.
- **JavaScript** — the DOM and how it is manipulated, events, closures, async (callbacks, promises, `async/await`).

### 1. Meta-framework & router

First you settle what holds the app up: the meta-framework that defines rendering, build, and conventions, and the router it navigates between views with. The choice depends on the goal of the project (static? SEO? heavy interactivity? intensive data handling? enterprise?), not on personal preference. See [front-stack](../web-stack/).

### 2. UI components

Where interface components come from: a library already styled and ready to use, accessible unstyled primitives to build on top, or copyable components that stay in the repo itself for you to edit freely. The choice depends on how much control you want over the final result vs. how much prototyping speed you need. See [front-style](../web-style/).

### 3. Folder organization — Screaming Architecture

A project's folder structure should reflect the **app domain** (features, use cases) instead of the **technical layer** (`components/`, `hooks/`, `services/`). The idea: when you open the repo, the root folder should "scream" what the app is about, not what framework it uses — the framework remains a replaceable detail, not the piece that organizes the project.

In practice: instead of grouping by type (`components/`, `hooks/`, `services/`), you group by feature (`jobs/`, `auth/`, `profile/`), and each feature folder carries its own components, hooks, and services.

The full breakdown — folder trees, the layered alternative, and how to choose — lives in [dev-architectures](../dev-architectures/).

### 4. Styling

What styles the interface on the CSS side. See [front-style](../web-style/).

### 5. State & data

Global state, data fetching, forms, tables, and drag & drop — the logic behind the interface. See [front-lib-logic](../web-lib-stack/).

### 6. Visual support libraries

Animations, charts, notifications, modals — what completes the interface. See [front-lib-style](../web-lib-style/).

### 7. Client runtime

Capabilities the browser offers to run work off the main thread or intercept the network.

| Name | Use |
| --- | --- |
| **Web worker** | Background |
| **Service worker** | Cache |
