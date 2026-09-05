---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Desk Stack
subtitle: Frameworks for building desktop applications
---

## Frameworks

| Framework     | Type                            | Excels in                                            |
| ------------- | ------------------------------- | ---------------------------------------------------- |
| **Tauri**     | Packaged web apps               | Lightweight bundles, uses the system's webview       |
| **Ratatui**   | Terminal UIs (TUI)              | Terminal apps in Rust                                |
| **egui**      | Quick utilities                 | Immediate-mode GUI, rapid prototyping                |
| **Slint**     | Declarative embedded-first GUI  | Low resource usage, runs on microcontrollers         |
| **Iced**      | Reactive GUI (Elm Architecture) | Typed and predictable apps, COSMIC engine            |
| **Relm4**     | Idiomatic GTK4 wrapper          | GNOME apps with Elm-style architecture               |
| **GTK**       | Large apps                      | GNOME/Linux ecosystem, extensive widget set          |
| **libcosmic** | COSMIC desktop toolkit          | Native apps for COSMIC / Pop!\_OS                    |

### Tauri

**Packaged web apps**

- Packages a web frontend (React, Svelte, anything) into a native binary, using the OS webview instead of embedding Chromium — much lighter binaries than Electron.
- The backend is Rust: filesystem access, processes, and native APIs without leaving the explicit permissions security model.
- Choose it when you already have (or want) a web frontend and the goal is to distribute it as a lightweight desktop app.

### Ratatui

**Terminal UIs (TUI)**

- Library for building complete interfaces inside the terminal: layouts, widgets, keyboard event handling.
- No graphical dependencies — runs anywhere a terminal runs, including SSH.
- Choose it for developer tools, server dashboards, or utilities that will live in the terminal.

### egui

**Quick utilities**

- Immediate-mode GUI: the interface redraws every frame from the current state, with no persistent widget tree to synchronize.
- Very fast to prototype — a few lines of code for a functional window with controls.
- Choose it for internal tools, debug overlays, or utilities where development speed matters more than visual polish.

### Slint

**Declarative embedded-first GUI**

- UI described in its own declarative language (similar in spirit to QML) that compiles to native code — design stays separate from business logic in Rust, C++, JavaScript, or Python.
- Extremely lightweight runtime (designed to run with less than 300 KiB of RAM), making it viable on microcontrollers in addition to desktop.
- Choose it when the target includes embedded or resource-constrained hardware, or when you want a design workflow with live preview separate from the app code.

### Iced

**Reactive GUI (Elm Architecture)**

- Inspired by Elm's architecture: the UI is modeled as state + messages + a pure `view` function that renders that state — no imperative widget manipulation.
- Custom rendering on GPU (via wgpu), giving fine control over drawing instead of delegating to a system-native toolkit.
- Choose it if you prefer a predictable and typed state model over a traditional widget tree; it's the foundation that the COSMIC desktop runs on.

### Relm4

**Idiomatic GTK4 wrapper**

- Takes GTK4's widgets and engine and adds an Elm-style architecture layer (messages, components, state) to make them feel more idiomatic in Rust.
- Inherits all of GTK4's visual maturity and accessibility, but with a simpler development model than working with raw GTK.
- Choose it if you want the native GNOME look & feel combined with a more orderly state pattern than GTK's traditional callback-based approach.

### GTK

**Large apps**

- Mature and complete UI toolkit, native in the Linux/GNOME ecosystem, with Rust bindings.
- Heavier and with a steeper learning curve than Tauri or egui, but with a much more extensive widget set for complex apps.
- Choose it in large projects that need to look and behave like a traditional native desktop app.

### libcosmic

**COSMIC desktop toolkit**

- Built on top of Iced: adds the theming system, design tokens, and custom widgets used by the COSMIC desktop (from System76, base of Pop!\_OS).
- Provides automatic visual consistency with the rest of COSMIC apps (colors, spacing, light/dark mode) without having to replicate them manually.
- Choose it for apps or applets specifically designed to integrate natively with the COSMIC desktop.
