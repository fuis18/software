---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Front Style
subtitle: What's used to style the interface
---

## Styling Libraries

| Library              | Use                                                                              |
| -------------------- | -------------------------------------------------------------------------------- |
| **Tailwind CSS**     | Utility-first framework: styles directly in markup, without leaving the component |
| **Tailwind Animation** | Animation utilities (keyframes, transitions) built on Tailwind               |
| **twekcn**           | Custom color theming for shadcn/ui                                               |
| **CSS Modules**      | `.module.css` files with local scope: each class is isolated per component, standard CSS without runtime or dependencies |

### CSS Modules

**CSS with local scope per file**

- A `.module.css` is imported from the component and each class becomes a unique name generated at build time (`styles.card`) — impossible to collide with classes from another component or a library.
- It's good old CSS (native modern nesting, variables, media queries) without a framework to learn: the natural alternative when a project doesn't use Tailwind.
- Choose it for projects where the team prefers plain CSS isolated per component, or to isolate complex styles that would clutter the markup with utilities.

## Component UI

| Lib             | What it is                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **shadcn/ui**   | Not an installable library: copyable components (Radix + Tailwind) that live in your own repo for free editing           |
| **radix/ui**    | Accessible primitives without styles — the foundation on which shadcn/ui and other libraries are built                     |
| **Mantine.dev** | Complete, pre-styled component library with many utility hooks included                                                    |
| **HeadlessUI**  | Styleless (headless) components from the Tailwind team, designed to work with Tailwind CSS                                 |
| **HeroUI**      | Pre-styled component library (formerly NextUI), designed for rapid prototyping with good defaults                           |

**How to choose:** if you want full style control and don't mind having component code in your repo → **shadcn/ui** (or **radix/ui** if you need to build custom primitives). If you prefer something pre-styled and complete out of the box → **Mantine** or **HeroUI**. If you work with Tailwind and only need accessibility logic without any styling → **HeadlessUI**.

## Modern CSS Patterns

Frequently used media queries, without relying on JS to detect them.

- `prefers-color-scheme` — dark mode at the OS level, no manual toggle.
- `orientation` — different layout for landscape/portrait (useful on mobile/tablet).
- `display-mode: fullscreen` — specific styles when the app runs as a PWA in fullscreen.

## What's New
