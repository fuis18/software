---
layout: ../../../layouts/Layout.astro
eyebrow: Games
title: Games Architecture
subtitle: Universal concepts of game design
---

Beyond the chosen engine, every game shares the same backbone: a loop that runs the world, a way to model entities, patterns to keep code clean, and state machines for behavior. These concepts are portable across any technology.

## Game Loop

The heart of the game: an infinite loop that updates the world and draws it, frame by frame.

- **Fixed vs. variable timestep** — physics integrates better with a fixed timestep (accumulator + deterministic steps); rendering can run at whatever rate the machine allows and interpolate between states. A purely variable timestep makes physics change with FPS.
- **Decoupling update from render** — enables pausing, headless running (dedicated servers), or replay: the simulation does not depend on how many times it is drawn.
- Everything else — ECS, states, AI — lives within this cycle.

## Entity Component System (ECS)

The dominant architectural pattern for organizing entities: instead of inheritance hierarchies (`FlyingEnemy extends Enemy`), composition by data.

| Part          | What it is                                                        |
| ------------- | ----------------------------------------------------------------- |
| **Entity**    | Just an ID: the identity of a thing in the world                  |
| **Component** | Pure data: `Position`, `Velocity`, `Health`, `Sprite`            |
| **System**    | Logic that processes all entities with certain components         |

- **Composition over inheritance** — a flying enemy is `Position + Velocity + Sprite + FlyAI`; adding new behavior is adding components and systems, not rearranging the class tree.
- **Data locality** — systems iterate contiguous arrays of components (data-oriented design), which takes advantage of CPU cache; this is why Bevy scales to thousands of entities effortlessly.
- **Where it already exists** — Bevy is ECS native; Unity has DOTS/ECS as an optional layer; Godot uses its node/scene model (another type of composition). The concept is the same.

## Game Design Patterns

The classic patterns (Game Programming Patterns) that appear over and over:

| Pattern         | What it solves                                                        |
| --------------- | --------------------------------------------------------------------- |
| **Command**     | Input decoupled from actions: remapping, replay, undo                 |
| **Observer**    | Events: "the player died" notifies achievements, UI, music without coupling |
| **Object Pool** | Reusing bullets/particles instead of creating and destroying them     |
| **Flyweight**   | A thousand trees share the same texture/mesh, only position differs   |
| **Game State**  | Menu, playing, paused, game over as global states                     |
| **Dirty Flag**  | Recalculate expensive transforms only when they changed               |

- These are the patterns from [dev-architectures](../../dev/dev-architectures/) applied to the real-time domain: the difference is the per-frame budget constraint (16 ms), which makes pooling, flyweight, and dirty flag critical.

## State Machines

An object is always in **one** of a finite set of states, with defined transitions between them.

- **Basic FSM** — an enemy: `Patrol → Chase → Attack → Flee`. Each state defines its update logic and exit conditions. Simple, predictable, debuggable.
- **Hierarchical / stack-based** — states within states (Attack → Melee | Ranged) or global state stacks (pause on top of playing without losing the game state).
- **Behavior trees** — the evolution for complex AI: decision trees with priority, more scalable than a giant FSM when behaviors combine.
- **Animation state machines** — the same concept governs animations: idle/walk/jump/land with conditional transitions; Unity and Godot include them built-in.

> The natural order: first the game loop running something on screen, then entities with ECS or nodes, states when behavior gets complex, and patterns when the code starts to hurt. The engine in [games-stack](../games-stack/) brings almost all of this implemented — understanding it anyway lets you know what is happening underneath.
