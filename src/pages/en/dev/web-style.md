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

## CSS Architecture

Conventions and methodologies for naming and organizing CSS classes, avoiding conflicts and scaling large codebases.

| Methodology | Format | Main use |
| ----------- | ------ | -------- |
| **BEM**      | `.block__element--modifier` | Naming convention: organizes classes by component and its parts |
| **SUIT**     | `.Component-property--modifier` | Naming convention: strict BEM variant with prefixes |
| **Atomic CSS** | Utility classes (one class = one property) | Approach: reusable, composable styles, foundation of Tailwind |

### BEM (Block Element Modifier)

The most used naming methodology. Separates CSS into self-contained blocks.

```css
/* Block: main component */
.card { }

/* Element: internal parts of the block */
.card__title { }
.card__image { }
.card__body { }

/* Modifier: variant of the block or element */
.card--featured { }
.card__title--large { }
```

### SUIT (Structure Use Animation Template)

A stricter BEM variant with clear naming rules.

```css
/* Component */
.Card { }
.Card-title { }
.Card-image { }

/* Utility */
.u-flex { }
.u-text-center { }

/* State */
.is-active { }
.is-hidden { }
```

### Atomic CSS

One style per class, composable in markup. The philosophy behind Tailwind.

```css
/* Each class does one thing */
.mt-4 { margin-top: 1rem; }
.text-bold { font-weight: bold; }
.bg-blue { background-color: blue; }
```

> BEM and SUIT work well with CSS Modules. Atomic CSS is the Tailwind approach: if you already use utility-first, you're already doing Atomic without knowing it.

## Atomic Design

Brad Frost's methodology for building scalable design systems. It's not just CSS — it defines how interface components are organized.

| Level | What it is | Example |
| ----- | ---------- | ------- |
| **Atoms** | Smallest, indivisible elements | Button, input, label, avatar |
| **Molecules** | Combination of atoms forming a unit | Search form (input + button) |
| **Organisms** | Complex sections composed of molecules | Header with nav, logo, and search |
| **Templates** | Page layouts without real content | Landing page structure |
| **Pages** | Templates with concrete content | Final landing page with real data |

```
Atoms → Molecules → Organisms → Templates → Pages
  ↓         ↓           ↓           ↓          ↓
button   search-form   header    layout-    home-page
input                  navbar    landing
label
```

> Atomic Design defines the component hierarchy; BEM/SUIT/Atomic CSS solve how to name the styles at each level.

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
