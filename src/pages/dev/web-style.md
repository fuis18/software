---
layout: ../../layouts/Layout.astro
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

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
    color: #fff;
  }
}

@media (orientation: landscape) {
  body {
    display: flex;
    flex-direction: row;
  }
}

@media (orientation: portrait) {
  body {
    display: flex;
    flex-direction: column;
  }
}

@media (display-mode: fullscreen) {
  .fullscreen {
    width: 100vw;
    height: 100vh;
  }
}
```

- `prefers-color-scheme` — dark mode a nivel sistema operativo, sin toggle manual.
- `orientation` — layout distinto según landscape/portrait (útil en mobile/tablet).
- `display-mode: fullscreen` — estilos específicos cuando la app corre como PWA en fullscreen.

## Novedades
