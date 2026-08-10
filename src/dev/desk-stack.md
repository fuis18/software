---
layout: base.njk
eyebrow: Dev
title: Desk Stack
subtitle: Frameworks para construir aplicaciones de escritorio
---

## Frameworks

| Framework   | Tipo                         | Destaca en                                 |
| ----------- | ---------------------------- | ------------------------------------------ |
| **Tauri**   | Apps web empaquetadas        | Bundle liviano, usa el webview del sistema |
| **Ratatui** | Interfaces de terminal (TUI) | Apps de terminal en Rust                   |
| **GTK**     | Apps grandes                 | Toolkit maduro, nativo en Linux            |
| **Bevy**    | Juegos                       | Motor de juegos en Rust, arquitectura ECS  |
| **egui**    | Utilidades rápidas           | Immediate-mode GUI, prototipado veloz      |
| slint       |                              |                                            |

### Tauri

**Apps web empaquetadas**

- Empaqueta un frontend web (React, Svelte, lo que sea) en un binario nativo, usando el webview del sistema operativo en vez de embeber Chromium — binarios mucho más livianos que Electron.
- El backend es Rust: acceso a filesystem, procesos y APIs nativas sin salir del modelo de seguridad de permisos explícitos.
- Elegilo cuando ya hay (o se quiere) un frontend web y el objetivo es distribuirlo como app de escritorio liviana.

### Ratatui

**Interfaces de terminal (TUI)**

- Librería para construir interfaces completas dentro de la terminal: layouts, widgets, manejo de eventos de teclado.
- Sin dependencias gráficas — corre en cualquier lado donde corra una terminal, incluido SSH.
- Elegilo para herramientas de desarrollador, dashboards de servidor o utilidades que van a vivir en la terminal.

### GTK

**Apps grandes**

- Toolkit de UI maduro y completo, nativo en el ecosistema Linux/GNOME, con bindings para Rust.
- Más pesado y con más curva de entrada que Tauri o egui, pero con un conjunto de widgets mucho más amplio para apps complejas.
- Elegilo en proyectos grandes que necesitan verse y comportarse como una app de escritorio nativa tradicional.

### Bevy

**Juegos**

- Motor de juegos en Rust con arquitectura ECS (Entity-Component-System): rendimiento predecible incluso con muchas entidades en pantalla.
- Multiplataforma de fábrica (desktop, web vía WASM, mobile en progreso).
- Elegilo para desarrollo de juegos en Rust — es la opción de facto del ecosistema.

### egui

**Utilidades rápidas**

- Immediate-mode GUI: la interfaz se redibuja cada frame a partir del estado actual, sin árbol de widgets persistente que sincronizar.
- Muy rápido de prototipar — pocas líneas de código para una ventana funcional con controles.
- Elegilo para herramientas internas, debug overlays o utilidades donde la velocidad de desarrollo importa más que la pulida visual.
