---
layout: ../../../layouts/Layout.astro
eyebrow: Games
title: Games Graphics
subtitle: Shaders, render pipelines, and lighting
---

From data to pixel: how the GPU turns geometry and textures into the final image, and where the programmer steps in — shaders, pipeline stages, lights, and cameras.

## Render Pipeline

The chain of stages the GPU executes every frame:

| Stage               | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| **Vertex shader**   | Transforms each vertex: from model space to screen           |
| **Rasterization**   | Converts triangles into fragments (candidate pixels)         |
| **Fragment/Pixel shader** | Decides the final color of each fragment             |
| **Output merger**   | Blends (alpha blending), depth test, writes to framebuffer   |

- **Draw call** — the instruction "draw this mesh with this material"; each one has a CPU cost, which is why batching groups geometry.
- **APIs** — OpenGL/Vulkan, DirectX, Metal, and **WebGPU** as the modern cross-platform standard (wgpu and Bevy's target). Vulkan/WebGPU expose the pipeline explicitly: more control, more verbosity.
- The full flow is the same as the custom rendering of desktop apps ([desk-stack](../../dev/desk-stack/) via wgpu): a game is that, plus more content and faster.

## Shaders

Programs that run on the GPU, in massive parallelism, for every vertex and fragment.

| Type               | Runs on            | What it produces                      |
| ------------------ | ------------------- | ------------------------------------ |
| **Vertex**         | Each vertex         | Transformed position                |
| **Fragment**       | Each fragment       | Final color (with textures, lights)  |
| **Compute**        | Generic workgroups  | Any calculation: particles, physics  |

- **Languages** — GLSL (OpenGL/Vulkan), HLSL (DirectX), WGSL (WebGPU). The mental model is the same: interpolated input (`varying`/`@location`), RGBA color output.
- **UV coordinates** — how each fragment knows which texel of the texture it gets: the 2D mapping over the 3D surface.
- **Post-processing** — full-screen shaders after rendering: bloom, vignette, color grading, distortion. This is where much of a game's visual "look" lives.

## Lighting

From cheapest to most realistic:

- **Ambient** — constant global light so nothing is pure black.
- **Diffuse/Lambert** — brightness based on the angle between normal and light (where the dot product from [games-math-physics](../games-math-physics/) is useful).
- **Specular/Blinn-Phong** — the reflective shine based on camera position.
- **PBR (Physically Based Rendering)** — materials with physical properties (metalness/roughness) and energy-conserving models: the current standard of Unity, Unreal, and Godot.
- **Shadows and GI** — shadow mapping for shadows; global illumination (baked lightmaps or real-time techniques like DDGI/Lumen) for indirect light bounce.

## 2D/3D Cameras

The camera is just another transformation: it defines what part of the world the GPU sees.

- **Orthographic projection** — no perspective: far things measure the same as close things. The natural choice in 2D (and strategy/isometric).
- **Perspective projection** — conical frustum: far things shrink. The default 3D mode.
- **View/projection matrices** — the view (where the camera is and looks) multiplied by the projection (how it flattens space) gives clip space; the viewport maps that to pixels.
- **Practical 2D camera** — follow the player with smoothing (lerp), level bounds, shake for impact feedback: more design mechanics than math.

> The pipeline is universal; what changes between engines in [games-stack](../games-stack/) is how much they expose: Raylib and wgpu make you write the shaders, Unity/Godot give you visual materials with the option to drop to shader code when needed.
