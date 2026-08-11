---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Desk Stack
subtitle: Frameworks para construir aplicaciones de escritorio
---

## Frameworks

| Framework     | Tipo                            | Destaca en                                            |
| ------------- | ------------------------------- | ----------------------------------------------------- |
| **Tauri**     | Apps web empaquetadas           | Bundle liviano, usa el webview del sistema            |
| **Ratatui**   | Interfaces de terminal (TUI)    | Apps de terminal en Rust                              |
| **egui**      | Utilidades rápidas              | Immediate-mode GUI, prototipado veloz                 |
| **Slint**     | GUI declarativa embedded-first  | Bajo consumo de recursos, corre en microcontroladores |
| **Iced**      | GUI reactiva (Elm Architecture) | Apps tipadas y predecibles, motor de COSMIC           |
| **Relm4**     | Wrapper idiomático sobre GTK4   | Apps GNOME con arquitectura tipo Elm                  |
| **GTK**       | Apps grandes                    | Ecosistema GNOME/Linux, set de widgets amplio         |
| **libcosmic** | Toolkit del escritorio COSMIC   | Apps nativas para COSMIC / Pop!\_OS                   |

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

### egui

**Utilidades rápidas**

- Immediate-mode GUI: la interfaz se redibuja cada frame a partir del estado actual, sin árbol de widgets persistente que sincronizar.
- Muy rápido de prototipar — pocas líneas de código para una ventana funcional con controles.
- Elegilo para herramientas internas, debug overlays o utilidades donde la velocidad de desarrollo importa más que la pulida visual.

### Slint

**GUI declarativa embedded-first**

- UI descrita en un lenguaje declarativo propio (similar en espíritu a QML) que se compila a código nativo — el diseño queda separado de la lógica de negocio en Rust, C++, JavaScript o Python.
- Runtime livianísimo (pensado para correr con menos de 300 KiB de RAM), lo que lo hace viable en microcontroladores además de desktop.
- Elegilo cuando el target incluye hardware embebido o con recursos limitados, o cuando se quiere un flujo de diseño con preview en vivo separado del código de la app.

### Iced

**GUI reactiva (Elm Architecture)**

- Inspirado en la arquitectura de Elm: la UI se modela como estado + mensajes + una función `view` pura que renderiza ese estado — sin manipulación imperativa de widgets.
- Renderizado propio sobre GPU (vía wgpu), lo que le da control fino sobre el dibujado en vez de delegar en un toolkit nativo del sistema.
- Elegilo si preferís un modelo de estado predecible y tipado antes que un árbol de widgets tradicional; es la base sobre la que corre el escritorio COSMIC.

### Relm4

**Wrapper idiomático sobre GTK4**

- Toma los widgets y el motor de GTK4 y les agrega una capa de arquitectura tipo Elm (mensajes, componentes, estado) para que se sientan más idiomáticos en Rust.
- Hereda toda la madurez visual y de accesibilidad de GTK4, pero con un modelo de desarrollo más simple que trabajar con GTK crudo.
- Elegilo si querés el look & feel nativo de GNOME sumado a un patrón de estado más ordenado que el callback-based de GTK tradicional.

### GTK

**Apps grandes**

- Toolkit de UI maduro y completo, nativo en el ecosistema Linux/GNOME, con bindings para Rust.
- Más pesado y con más curva de entrada que Tauri o egui, pero con un conjunto de widgets mucho más amplio para apps complejas.
- Elegilo en proyectos grandes que necesitan verse y comportarse como una app de escritorio nativa tradicional.

### libcosmic

**Toolkit del escritorio COSMIC**

- Construido encima de Iced: agrega el sistema de theming, tokens de diseño y widgets propios que usa el escritorio COSMIC (de System76, base de Pop!\_OS).
- Da consistencia visual automática con el resto de las apps de COSMIC (colores, espaciados, modo claro/oscuro) sin tener que replicarlos a mano.
- Elegilo para apps o applets pensados específicamente para integrarse de forma nativa al escritorio COSMIC.
