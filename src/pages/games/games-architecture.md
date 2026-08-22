---
layout: ../../layouts/Layout.astro
eyebrow: Games
title: Games Architecture
subtitle: Conceptos universales del diseño de juegos
---

Más allá del motor elegido, todo juego comparte la misma columna vertebral: un bucle que corre el mundo, una forma de modelar entidades, patrones para mantener el código sano y máquinas de estados para comportamientos. Estos conceptos son portables entre cualquier tecnología.

## Game Loop

El corazón del juego: un bucle infinito que actualiza el mundo y lo dibuja, frame a frame.

- **Timestep fijo vs. variable** — la física se integra mejor con timestep fijo (acumulador + pasos deterministas); el render puede ir al ritmo que dé la máquina e interpolar entre estados. Un timestep variable puro hace que la física cambie según los FPS.
- **Desacoplar update de render** — permite pausar, correr headless (servidores dedicados) o replay: la simulación no depende de cuántas veces se dibuja.
- Todo lo demás — ECS, estados, IA — vive dentro de este ciclo.

## Entity Component System (ECS)

El patrón de arquitectura dominante para organizar entidades: en vez de jerarquías de herencia (`EnemigoVolador extends Enemigo`), composición por datos.

| Pieza         | Qué es                                                         |
| ------------- | -------------------------------------------------------------- |
| **Entity**    | Solo un ID: la identidad de una cosa del mundo                 |
| **Component** | Datos puros: `Position`, `Velocity`, `Health`, `Sprite`        |
| **System**    | Lógica que procesa todas las entidades con ciertos componentes |

- **Composición sobre herencia** — un enemigo volador es `Position + Velocity + Sprite + FlyAI`; agregar comportamiento nuevo es sumar componentes y sistemas, no reorganizar el árbol de clases.
- **Localidad de datos** — los sistemas iteran arrays contiguos de componentes (data-oriented design), lo que aprovecha el cache de CPU; es la razón por la que Bevy escala a miles de entidades sin esfuerzo.
- **Dónde ya existe** — Bevy es ECS nativo; Unity tiene DOTS/ECS como capa opcional; Godot usa su modelo de nodos/escenas (otro tipo de composición). El concepto es el mismo.

## Patrones de diseño de juegos

Los patrones clásicos (Game Programming Patterns) que aparecen una y otra vez:

| Patrón          | Qué resuelve                                                         |
| --------------- | -------------------------------------------------------------------- |
| **Command**     | Input desacoplado de acciones: remapping, replay, undo               |
| **Observer**    | Eventos: "el jugador murió" avisa a logros, UI, música sin acoplarse |
| **Object Pool** | Reusar balas/partículas en vez de crearlas y destruirlas             |
| **Flyweight**   | Mil árboles comparten la misma textura/mesh, solo difiere posición   |
| **Game State**  | Menú, jugando, pausa, game over como estados globales                |
| **Dirty Flag**  | Recalcular transformaciones costosas solo si cambiaron               |

- Son los patrones de [dev-architectures](../../dev/dev-architectures/) aplicados al dominio del tiempo real: la diferencia es la restricción de presupuesto por frame (16 ms), que vuelve críticos pooling, flyweight y dirty flag.

## Máquinas de Estados

Un objeto está siempre en **uno** de un conjunto finito de estados, con transiciones definidas entre ellos.

- **FSM básica** — un enemigo: `Patrol → Chase → Attack → Flee`. Cada estado define su lógica de update y las condiciones de salida. Simple, predecible, debuggeable.
- **Jerárquica / stack-based** — estados dentro de estados (Atacar → Melee | Ranged) o pilas de estados globales (pausa encima de jugando sin perder el estado del juego).
- **Behavior trees** — la evolución para IA compleja: árboles de decisión con prioridad, más escalables que una FSM gigante cuando los comportamientos se combinan.
- **Animation state machines** — el mismo concepto gobierna las animaciones: idle/walk/jump/land con transiciones por condición; Unity y Godot las traen integradas.

> El orden natural: primero el game loop corriendo algo en pantalla, luego entidades con ECS o nodos, estados cuando el comportamiento se complica, y patrones cuando el código empieza a doler. El motor de [games-stack](../games-stack/) trae casi todo esto implementado — entenderlo igual permite saber qué está pasando debajo.
