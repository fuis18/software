---
layout: ../../../layouts/Layout.astro
eyebrow: Games
title: Games Stack
subtitle: Motores y frameworks
---

La herramienta define el flujo de trabajo: qué lenguaje se escribe, cuánto viene resuelto y dónde está el techo. Acá están las opciones, de motor completo a librería minimalista.

## Los motores

| Motor       | Lenguaje     | Perfil                                     | Destaca en                                    |
| ----------- | ------------ | ------------------------------------------ | --------------------------------------------- |
| **Godot**   | GDScript/C#  | Open source, ligero, todo-en-uno            | 2D excelente, escenas/nodos, sin regalías      |
| **Unity**   | C#           | El más extendido de la industria            | Ecosistema gigante, mobile/AR/VR, asset store  |
| **Unreal**  | C++/Blueprints | AAA: el gráficamente más potente          | 3D fotorealista, Lumen/Nanite, consolas        |
| **Bevy**    | Rust         | ECS puro, data-oriented, en desarrollo activo | Performance, paralelismo nativo, código abierto |
| **Raylib**  | C/Rust bindings | Librería minimalista, no es un motor     | Aprender sin magia, prototipos, control total  |

## Perfiles

### Godot

Motor completo open source (MIT): editor liviano, sistema de nodos y escenas para componer todo, GDScript como lenguaje propio con sintaxis Python-like y C# como alternativa seria. El mejor punto de entrada al desarrollo de juegos hoy — sin licencias ni cuentas. Su 2D es de primera clase; el 3D alcanzó madurez con Godot 4 (Vulkan, Jolt como física).

### Unity

El estándar de facto indie/mobile: C# como lenguaje, el ecosistema de assets y documentación más grande del mundo, y el target más amplio de plataformas (mobile, WebGL, consolas, VR). Su contracara: la complejidad creciente del editor, y decisiones corporativas polémicas que empujaron parte de la comunidad hacia Godot.

### Unreal

El motor AAA: gráficos de punta (Nanite para geometría masiva, Lumen para iluminación global en tiempo real), Blueprints para programar visualmente sin tocar C++, y dominio absoluto en 3D realista. Es pesado: proyectos grandes, builds largos, curva empinada. Gratis hasta ingresos significativos.

### Bevy

El proyecto Rust: ECS puro como fundamento (todo es componente y sistema), scheduling automático en paralelo, y hot-reloading. Multiplataforma de fábrica: desktop y web vía WASM corren hoy, con mobile en progreso. No tiene editor maduro ni ecosistema de assets comparable, pero es la opción de facto para desarrollo de juegos en Rust — pensada para quien quiere construir con control total y performance data-oriented. La opción "engine-less engine" que crece más rápido que ninguna otra.

### Raylib

Una **librería**, no un motor: ventanas, input, dibujo, audio y colisiones básicas en una API simple de C (con bindings a todo). Sin editor, sin escenas, sin nada mágico: cada sistema lo armás vos. Es el mejor vehículo para aprender cómo funciona un juego por dentro — el game loop, el pipeline y las matemáticas quedan expuestos — y para jams/prototipos donde la fricción cero importa.

## Cómo elegir

- **Aprender juegos por primera vez** → Godot: feedback inmediato, sin configuración, gratis.
- **Mobile/VR/equipo con C#** → Unity.
- **AAA 3D / gráficos de punta** → Unreal.
- **Ya sabés Rust / querés performance y control** → Bevy.
- **Entender cómo funciona todo por debajo** → Raylib (y después cualquier motor).

> El concepto es portable: game loop, ECS, shaders y pipelines son los mismos en todos ([games-architecture](../games-architecture/), [games-graphics](../games-graphics/)). El primer juego conviene terminarlo en el motor más fácil; el segundo ya puede elegir por requisitos reales.