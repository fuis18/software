---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Front Style
subtitle: Con qué se estiliza la interfaz
---

## Librerías de estilo

| Librería               | Uso                                                                             |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Tailwind CSS**       | Framework utility-first: estilos directo en el markup, sin salir del componente |
| **Tailwind Animation** | Utilidades de animación (keyframes, transiciones) sobre Tailwind                |
| **twekcn**             | Theming de colores personalizados para shadcn/ui                                |
| **CSS Modules**        | Archivos `.module.css` con scope local: cada clase vive aislada por componente, CSS estándar sin runtime ni dependencias |

### CSS Modules

**CSS con scope local por archivo**

- Un `.module.css` se importa desde el componente y cada clase se convierte en un nombre único generado en build (`styles.card`) — imposible colisionar con clases de otro componente o de una librería.
- Es CSS de toda la vida (anidamiento moderno nativo, variables, media queries) sin framework que aprender: la alternativa natural cuando un proyecto no usa Tailwind.
- Elegilo para proyectos donde el equipo prefiere CSS plano y aislado por componente, o para aislar estilos complejos que ensuciarían el markup con utilities.

## Arquitectura CSS

Convenciones y metodologías para nombrar y organizar clases CSS, evitando conflictos y escalando codebases grandes.

| Metodología | Formato | Uso principal |
| ----------- | ------- | ------------- |
| **BEM**      | `.block__element--modifier` | Naming convention: organiza clases por componente y sus partes |
| **SUIT**     | `.Component-property--modifier` | Naming convention: variante estricta de BEM con prefijos |
| **Atomic CSS** | Clases utilitarias (una clase = una propiedad) | Enfoque: estilos reutilizables y combinables, base de Tailwind |

### BEM (Block Element Modifier)

La metodología de naming más usada. Separa el CSS en bloques autocontenidos.

```css
/* Block: componente principal */
.card { }

/* Element: partes internas del block */
.card__title { }
.card__image { }
.card__body { }

/* Modifier: variante del block o element */
.card--featured { }
.card__title--large { }
```

### SUIT (Structure Use Animation Template)

Variante más estricta de BEM con reglas de nombrado claras.

```css
/* Componente */
.Card { }
.Card-title { }
.Card-image { }

/* Utilidad */
.u-flex { }
.u-text-center { }

/* Estado */
.is-active { }
.is-hidden { }
```

### Atomic CSS

Un solo estilo por clase, combinables en el markup. Filosofía detrás de Tailwind.

```css
/* Cada clase hace una sola cosa */
.mt-4 { margin-top: 1rem; }
.text-bold { font-weight: bold; }
.bg-blue { background-color: blue; }
```

> BEM y SUIT conviven bien con CSS Modules. Atomic CSS es el enfoque de Tailwind: si ya usás utility-first, ya estás aplicando Atomic sin saberlo.

## Atomic Design

Metodología de Brad Frost para construir sistemas de diseño escalables. No es solo CSS — define cómo se organizan los componentes de una interfaz.

| Nivel | Qué es | Ejemplo |
| ----- | ------ | ------- |
| **Atoms** | Elementos más pequeños e indivisibles | Botón, input, label, avatar |
| **Molecules** | Combinación de atoms que forman una unidad | Formulario de búsqueda (input + botón) |
| **Organisms** | Secciones complejas compuestas por molecules | Header con nav, logo y buscador |
| **Templates** | Layouts de página sin contenido real | Estructura de una landing page |
| **Pages** | Templates con contenido concreto | La landing page final con datos reales |

```
Atoms → Molecules → Organisms → Templates → Pages
  ↓         ↓           ↓           ↓          ↓
button   search-form   header    layout-    home-page
input                  navbar    landing
label
```

> Atomic Design define la jerarquía de componentes; BEM/SUIT/Atomic CSS resuelven cómo nombrar los estilos de cada nivel.

## Component UI

| Lib             | Qué es                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **shadcn/ui**   | No es una librería instalable: componentes copiables (Radix + Tailwind) que quedan en tu propio repo para editar libremente |
| **radix/ui**    | Primitivos accesibles sin estilos — la base sobre la que se construyen shadcn/ui y otras librerías                          |
| **Mantine.dev** | Librería de componentes completa y ya estilada, con muchos hooks utilitarios incluidos                                      |
| **HeadlessUI**  | Componentes sin estilos (headless) del equipo de Tailwind, pensados para combinar con Tailwind CSS                          |
| **HeroUI**      | Librería de componentes ya estilada (ex NextUI), pensada para prototipar rápido con buen look por defecto                   |

**Cómo elegir:** si querés control total del estilo y no te molesta tener el código de los componentes en tu repo → **shadcn/ui** (sobre **radix/ui** si necesitás construir primitivos propios). Si preferís algo ya estilado y completo de fábrica → **Mantine** o **HeroUI**. Si trabajás con Tailwind y solo necesitás la lógica de accesibilidad sin ningún estilo → **HeadlessUI**.

## Patrones de CSS moderno

Media queries de uso frecuente, sin depender de JS para detectarlas.

- `prefers-color-scheme` — dark mode a nivel sistema operativo, sin toggle manual.
- `orientation` — layout distinto según landscape/portrait (útil en mobile/tablet).
- `display-mode: fullscreen` — estilos específicos cuando la app corre como PWA en fullscreen.

## Novedades
