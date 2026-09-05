---
layout: ../../../layouts/Layout.astro
eyebrow: Games
title: Games Math & Physics
subtitle: Vectors, matrices, transformations, and physics
---

Game math: every movement, rotation, and contact detection is linear algebra running 60 times per second. Here is the bare minimum and how it turns into believable physics.

## Vectors

The basic unit: a direction with magnitude. Positions, velocities, forces — almost everything in a game is a vector.

| Operation       | What it gives                         | Typical use                                  |
| --------------- | ------------------------------------- | -------------------------------------------- |
| **Add/subtract**| Combined displacement                 | Moving, calculating direction between two points |
| **Scale**       | Multiplied magnitude                  | Changing speed while keeping direction        |
| **Dot product** | Scalar: how aligned they are          | Detecting if an enemy sees you (front vs back)|
| **Cross product** | Perpendicular vector (3D)           | Surface normals, rotation axes               |
| **Normalize**   | Pure direction (length = 1)           | Movement directions, reflections             |

- **Dot product** is the most surprisingly useful operation: `dot(a, b) > 0` means "they are going the same way" — it is the basis of field of view, diffuse lighting, and reflection.
- The distance between two points is the magnitude of the subtraction: `distance(a, b) = |b - a|`.

## Matrices and Transformations

A matrix encodes a space transformation: where each point ends up when applied.

- **Translation, rotation, scale** — the three base transformations; in 2D they fit in a 3×3 matrix, in 3D in a 4×4 (with the last row/column for homogeneous perspective).
- **Composition** — applying multiple transformations is multiplying matrices: `M = T · R · S` (translate, then rotate, then scale). Order matters: rotating then translating is not the same as translating then rotating.
- **Scene hierarchy** — each object stores its local transformation relative to its parent; the world transform is the product of the entire chain (the bullet is a child of the cannon, the cannon of the turret, the turret of the tank).
- In 3D, **quaternion rotations** avoid the gimbal lock of Euler angles: it is the internal representation of almost all engines, even though interfaces expose degrees.

## Collisions

Detecting that two things touch — cheap first, precise later:

| Shape             | Cost  | What it detects                              |
| ----------------- | ----- | -------------------------------------------- |
| **Circle/Sphere** | Min   | Distance between centers vs sum of radii     |
| **AABB**          | Low   | Axis-aligned boxes, range comparison         |
| **SAT**           | Mid   | Exact convex polygons (Separating Axis Theorem) |
| **Raycast**       | Low   | A point's trajectory: hits against the world |

- **Broad phase / narrow phase** — the standard pattern: a fast phase discards impossible pairs (spatial hashing, quadtree/BVH) and only candidates pass to precise checking. Without broad phase, a thousand entities are half a million checks per frame.
- **Raycast** answers "what is on this line?": shots, line of sight, mouse clicks in the world.

## Physics Engines

The layer that turns collisions into believable behavior: bodies with mass, forces, and contact responses.

- **What they simulate** — rigid bodies, force integration per timestep, collision resolution (push and bounce with restitution/friction), joints (hinges, springs, chains).
- **Kinematic vs. dynamic** — a kinematic body moves by code and pushes others without being affected; a dynamic one obeys physics. Platforms and characters are usually kinematic with raycasts, not simulated.
- **Engines** — Box2D (2D, the classic), Jolt (3D, used by Horizon and adopted as Godot 4's default), Rapier (written in Rust, Bevy's via plugins), PhysX/Havok (integrated in major engines).
- **The practical rule** — use the engine for what feels good simulated (boxes, ragdolls, projectiles) and move by code what demands control (main character): perfect platforming does not emerge from a physics engine.

> None of this is memorized: it is understood with a prototype. A circle bouncing off walls covers vectors, normalization, and circle-AABB collision — the hello world of [games-graphics](../games-graphics/) and this page at the same time.
