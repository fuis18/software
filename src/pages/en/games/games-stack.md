---
layout: ../../../layouts/Layout.astro
eyebrow: Games
title: Games Stack
subtitle: Engines and frameworks
---

The tool defines the workflow: what language you write, how much is already solved, and where the ceiling is. Here are the options, from full engine to minimalist library.

## The Engines

| Engine      | Language     | Profile                                    | Stands out in                                 |
| ----------- | ------------ | ------------------------------------------ | --------------------------------------------- |
| **Godot**   | GDScript/C#  | Open source, lightweight, all-in-one       | Excellent 2D, scenes/nodes, no royalties      |
| **Unity**   | C#           | The most widespread in the industry        | Huge ecosystem, mobile/AR/VR, asset store      |
| **Unreal**  | C++/Blueprints | AAA: the most graphically powerful       | Photorealistic 3D, Lumen/Nanite, consoles     |
| **Bevy**    | Rust         | Pure ECS, data-oriented, actively developed | Performance, native parallelism, open source |
| **Raylib**  | C/Rust bindings | Minimalist library, not an engine      | Learn without magic, prototypes, total control |

## Profiles

### Godot

Full open-source engine (MIT): lightweight editor, node and scene system to compose everything, GDScript as its own language with Python-like syntax and C# as a serious alternative. The best entry point to game development today — no licenses or accounts. Its 2D is first-class; 3D reached maturity with Godot 4 (Vulkan, Jolt for physics).

### Unity

The de facto indie/mobile standard: C# as the language, the world's largest asset and documentation ecosystem, and the widest platform target (mobile, WebGL, consoles, VR). Its downside: increasing editor complexity and controversial corporate decisions that pushed part of the community toward Godot.

### Unreal

The AAA engine: cutting-edge graphics (Nanite for massive geometry, Lumen for real-time global illumination), Blueprints for visual programming without touching C++, and absolute dominance in realistic 3D. It is heavy: large projects, long builds, steep learning curve. Free until significant revenue.

### Bevy

The Rust project: pure ECS as the foundation (everything is a component and system), automatic parallel scheduling, and hot-reloading. Cross-platform out of the box: desktop and web via WASM work today, with mobile in progress. It has no mature editor or comparable asset ecosystem, but it is the de facto choice for game development in Rust — designed for those who want to build with total control and data-oriented performance. The "engine-less engine" growing faster than any other.

### Raylib

A **library**, not an engine: windows, input, drawing, audio, and basic collisions in a simple C API (with bindings to everything). No editor, no scenes, no magic: you build every system yourself. It is the best vehicle for learning how a game works internally — the game loop, the pipeline, and the math are all exposed — and for jams/prototypes where zero friction matters.

## How to Choose

- **Learning games for the first time** → Godot: instant feedback, no setup, free.
- **Mobile/VR/team with C#** → Unity.
- **AAA 3D / cutting-edge graphics** → Unreal.
- **Already know Rust / want performance and control** → Bevy.
- **Understand how everything works underneath** → Raylib (and then any engine).

> The concept is portable: game loop, ECS, shaders, and pipelines are the same across all ([games-architecture](../games-architecture/), [games-graphics](../games-graphics/)). The first game is best finished in the easiest engine; the second can already be chosen by real requirements.
