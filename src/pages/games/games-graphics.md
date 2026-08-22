---
layout: ../../layouts/Layout.astro
eyebrow: Games
title: Games Graphics
subtitle: Shaders, pipelines de renderizado e iluminación
---

Del dato al pixel: cómo la GPU convierte geometría y texturas en la imagen final, y dónde interviene el programador — shaders, etapas del pipeline, luces y cámaras.

## Pipeline de Renderizado

La cadena de etapas que ejecuta la GPU por cada frame:

| Etapa              | Qué hace                                                     |
| ------------------ | ------------------------------------------------------------ |
| **Vertex shader**  | Transforma cada vértice: del espacio del modelo a la pantalla |
| **Rasterización**  | Convierte triángulos en fragments (pixels candidatos)         |
| **Fragment/Pixel shader** | Decide el color final de cada fragment                |
| **Output merger**  | Mezcla (alpha blending), depth test, escribe al framebuffer   |

- **Draw call** — la instrucción "dibuja esta malla con este material"; cada uno tiene costo de CPU, por eso el batching agrupa geometría.
- **APIs** — OpenGL/Vulkan, DirectX, Metal, y **WebGPU** como el estándar moderno multiplataforma (el target de wgpu y de Bevy). Vulkan/WebGPU exponen el pipeline explícito: más control, más verbosidad.
- El flujo completo es el mismo que describe el renderizado propio de apps de escritorio ([desk-stack](../../dev/desk-stack/) via wgpu): un juego es eso, más contenido y más rápido.

## Shaders

Programas que corren en la GPU, en paralelo masivo, por cada vértice y fragmento.

| Tipo               | Corre en            | Qué produce                          |
| ------------------ | -------------------- | ------------------------------------ |
| **Vertex**         | Cada vértice         | Posición transformada                |
| **Fragment**       | Cada fragmento       | Color final (con texturas, luces)    |
| **Compute**        | Workgroups genéricos | Cualquier cálculo: partículas, física |

- **Lenguajes** — GLSL (OpenGL/Vulkan), HLSL (DirectX), WGSL (WebGPU). La estructura mental es la misma: entrada interpolada (`varying`/`@location`), salida color RGBA.
- **UV coordinates** — cómo cada fragmento sabe qué texel de la textura le toca: el mapeo 2D sobre la superficie 3D.
- **Post-procesado** — shaders de pantalla completa después del render: bloom, vignette, color grading, distorsión. Es donde vive buena parte del "look" visual de un juego.

## Iluminación

De la más barata a la más realista:

- **Ambient** — luz constante global para que nada sea negro puro.
- **Diffuse/Lambert** — brillo según el ángulo entre normal y luz (aquí sirve el dot product de [games-math-physics](../games-math-physics/)).
- **Specular/Blinn-Phong** — el brillo reflectante según cámara.
- **PBR (Physically Based Rendering)** — materiales con propiedades físicas (metalness/roughness) y modelos de energía conservada: el estándar actual de Unity, Unreal y Godot.
- **Sombras y GI** — shadow mapping para sombras; global illumination (lightmaps horneados o técnicas en tiempo real como DDGI/Lumen) para el rebote indirecto de luz.

## Cámaras 2D/3D

La cámara es solo una transformación más: define qué parte del mundo ve la GPU.

- **Proyección ortográfica** — sin perspectiva: lo lejano mide igual que lo cercano. La elección natural en 2D (y strategy/isométrico).
- **Proyección perspectiva** — frustum cónico: lo lejano se achica. El modo 3D por defecto.
- **Matrices view/projection** — la vista (dónde está y mira la cámara) multiplicada por la proyección (cómo aplana el espacio) da el clip space; el viewport mapea eso a pixels.
- **Cámara 2D práctica** — seguir al jugador con suavizado (lerp), límites del nivel, shake para feedback de impacto: mecánica de diseño más que matemática.

> El pipeline es universal; lo que cambia entre motores de [games-stack](../games-stack/) es cuánto te exponen: Raylib y wgpu te hacen escribir los shaders, Unity/Godot te dan materiales visuales con la opción de bajar a shader code cuando hace falta.