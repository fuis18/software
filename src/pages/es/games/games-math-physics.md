---
layout: ../../../layouts/Layout.astro
eyebrow: Games
title: Games Math & Physics
subtitle: Vectores, matrices, transformaciones y física
---

Las matemáticas del juego: todo movimiento, rotación y detección de contacto es álgebra lineal corriendo 60 veces por segundo. Acá está el mínimo indispensable y cómo se convierte en física creíble.

## Vectores

La unidad básica: una dirección con magnitud. Posiciones, velocidades, fuerzas — casi todo en un juego es un vector.

| Operación       | Qué da                              | Uso típico                                    |
| --------------- | ------------------------------------ | --------------------------------------------- |
| **Suma/resta**  | Desplazamiento combinado             | Mover, calcular dirección entre dos puntos    |
| **Escala**      | Magnitud multiplicada                | Cambiar rapidez manteniendo dirección         |
| **Dot product** | Escalar: qué tan alineados van       | Detectar si un enemigo te ve (frente vs atrás) |
| **Cross product** | Vector perpendicular (3D)          | Normales de superficies, ejes de rotación     |
| **Normalizar**  | Dirección pura (largo = 1)           | Direcciones de movimiento, reflejos           |

- **Dot product** es la operación sorpresa más útil: `dot(a, b) > 0` significa "van hacia el mismo lado" — es la base del campo de visión, de la iluminación difusa y del rebote.
- La distancia entre dos puntos es la magnitud de la resta: `distance(a, b) = |b - a|`.

## Matrices y Transformaciones

Una matriz codifica una transformación del espacio: dónde va a parar cada punto cuando se aplica.

- **Traslación, rotación, escala** — las tres transformaciones base; en 2D caben en una matriz 3×3, en 3D en una 4×4 (con la última fila/columna para la perspectiva homogénea).
- **Composición** — aplicar varias transformaciones es multiplicar matrices: `M = T · R · S` (trasladar, luego rotar, luego escalar). El orden importa: rotar y luego trasladar no da lo mismo que trasladar y rotar.
- **Jerarquía de escena** — cada objeto guarda su transformación local respecto a su padre; la mundial es el producto de toda la cadena (la bala es hija del cañón, el cañón de la torreta, la torreta del tanque).
- En 3D, las **rotaciones con quaternions** evitan el gimbal lock de los ángulos de Euler: es la representación interna de casi todos los motores, aunque las interfaces expongan grados.

## Colisiones

Detectar que dos cosas se tocan — barato primero, preciso después:

| Forma            | Costo | Qué detecta                                  |
| ---------------- | ----- | -------------------------------------------- |
| **Circle/Sphere**| Mínimo| Distancia entre centros vs suma de radios    |
| **AABB**         | Bajo  | Cajas alineadas a los ejes, comparación por rangos |
| **SAT**          | Medio | Polígonos convexos exactos (Separating Axis Theorem) |
| **Raycast**      | Bajo  | Trayectoria de un punto: hits contra el mundo |

- **Broad phase / narrow phase** — el patrón estándar: una fase rápida descarta pares imposibles (spatial hashing, quadtree/BVH) y solo los candidatos pasan al chequeo preciso. Sin broad phase, mil entidades son medio millón de chequeos por frame.
- **Raycast** responde "¿qué hay en esta línea?": disparos, línea de visión, clicks del mouse en el mundo.

## Motores de física

La capa que convierte colisiones en comportamiento creíble: cuerpos con masa, fuerzas, y respuestas al contacto.

- **Qué simulan** — rigid bodies (cuerpos rígidos indeformables), integración de fuerzas por timestep, resolución de colisiones (empujar y rebote con restitution/friction), joints (bisagras, resortes, cadenas).
- **Kinematic vs. dynamic** — un cuerpo kinematic se mueve por código y empuja a otros sin ser afectado; uno dynamic obedece a la física. Plataformas y personajes suelen ser kinematic con raycasts, no simulados.
- **Motores** — Box2D (2D, el clásico), Jolt (3D, usado por Horizon y adoptado como default de Godot 4), Rapier (escrito en Rust, el de Bevy vía plugins), PhysX/Havok (integrados en motores grandes).
- **La regla práctica** — usar el motor para lo que se siente bien simulado (cajas, ragdolls, proyectiles) y mover por código lo que exige control (personaje principal): el platforming perfecto no emerge de un motor de física.

> Nada de esto se memoriza: se entiende con un prototipo. Un círculo que rebota contra paredes cubre vectores, normalización y colisión círculo-AABB — el hola mundo de [games-graphics](../games-graphics/) y de esta página a la vez.